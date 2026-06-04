(function(){
  const DATA = window.FOOD_KNOWLEDGE_DATA || [];
  const META = window.FOOD_KNOWLEDGE_META || {};
  const statusMap = { '可吃':'ok', '少吃':'little', '慎吃':'caution', '不能吃':'no' };
  const statusIcon = { '可吃':'✓', '少吃':'…', '慎吃':'!', '不能吃':'×' };
  const catIcons = {
    '五谷杂粮':'🌽','蔬菜菌类':'🥬','肉类/蛋类':'🥩','水产/海鲜':'🦐','水果':'🍓','坚果类':'🥜','豆/奶制品':'🥛','加工食品':'🍱','调味品':'🧂','补品/草药':'🍯','饮品/零食':'🧋'
  };
  let stage = 'pregnancy';
  let currentCat = '全部';
  let currentStatus = '全部';
  let keyword = '';
  function $(id){ return document.getElementById(id); }
  function cls(s){ return statusMap[s] || 'ok'; }
  function statusOf(f){ return stage === 'lactation' ? f.lactation : f.pregnancy; }
  function stageName(){ return stage === 'lactation' ? '哺乳期' : '孕期'; }
  function ensurePage(){
    const page = $('foodV2Page');
    if(!page) return;
    page.className = 'food-v2-page food-knowledge-page';
    page.innerHTML = `
      <div class="food-knowledge-top">
        <div class="food-knowledge-title-row">
          <button class="food-knowledge-back" id="foodKnowledgeBack" type="button">‹</button>
          <div class="food-knowledge-title">能不能吃</div>
          <button class="food-knowledge-share" type="button" aria-label="分享">↗</button>
        </div>
        <div class="food-knowledge-search"><span>🔍</span><input id="foodKnowledgeSearch" type="text" placeholder="查查什么能吃" autocomplete="off"></div>
      </div>
      <div class="food-knowledge-stage">
        <button class="food-knowledge-stage-btn active" data-stage="pregnancy" type="button">孕期</button>
        <button class="food-knowledge-stage-btn" data-stage="lactation" type="button">哺乳期</button>
      </div>
      <div class="food-knowledge-cats" id="foodKnowledgeCats"></div>
      <div class="food-knowledge-black">
        <div class="food-knowledge-black-head">
          <div class="food-knowledge-black-title">食物黑白榜 <span class="food-knowledge-help">?</span></div>
        </div>
        <div class="food-knowledge-tabs" id="foodKnowledgeStatusTabs"></div>
      </div>
      <div class="food-knowledge-list-wrap">
        <div class="food-knowledge-list-title" id="foodKnowledgeListTitle">大家都关注</div>
        <div class="food-knowledge-count" id="foodKnowledgeCount"></div>
        <div class="food-knowledge-list" id="foodKnowledgeList"></div>
      </div>`;
    const sheet = $('foodV2Sheet');
    if(sheet) sheet.className = 'food-v2-sheet food-knowledge-sheet';
    bindInside();
  }
  function categories(){ return ['全部', ...Array.from(new Set(DATA.map(x=>x.category)))]; }
  function renderCats(){
    const el = $('foodKnowledgeCats'); if(!el) return;
    el.innerHTML = categories().map(c=>`<button class="food-knowledge-cat ${c===currentCat?'active':''}" data-cat="${c}" type="button"><div class="food-knowledge-cat-icon">${c==='全部'?'🍽️':(catIcons[c]||'🍽️')}</div><div>${c}</div></button>`).join('');
    el.querySelectorAll('.food-knowledge-cat').forEach(btn=>btn.onclick=()=>{ currentCat=btn.dataset.cat; currentStatus='全部'; renderAll(); });
  }
  function renderStatusTabs(){
    const el = $('foodKnowledgeStatusTabs'); if(!el) return;
    const tabs = ['全部','可吃','少吃','慎吃','不能吃'];
    el.innerHTML = tabs.map(s=>{
      const c = s==='全部'?'ok':cls(s);
      return `<button class="food-knowledge-status-tab ${c} ${s===currentStatus?'active':''}" data-status="${s}" type="button">${s==='全部'?'全部':s} ›</button>`;
    }).join('');
    el.querySelectorAll('.food-knowledge-status-tab').forEach(btn=>btn.onclick=()=>{ currentStatus=btn.dataset.status; renderAll(); });
  }
  function filtered(){
    return DATA.filter(f=>{
      const st = statusOf(f);
      const matchCat = currentCat==='全部' || f.category===currentCat;
      const matchStatus = currentStatus==='全部' || st===currentStatus;
      const matchKey = !keyword || f.name.includes(keyword) || f.category.includes(keyword) || f.reason.includes(keyword);
      return matchCat && matchStatus && matchKey;
    });
  }
  function renderList(){
    const list=$('foodKnowledgeList'), count=$('foodKnowledgeCount'), title=$('foodKnowledgeListTitle'); if(!list) return;
    const rows = filtered();
    title.textContent = keyword ? `搜索“${keyword}”` : (currentCat==='全部' && currentStatus==='全部' ? '大家都关注' : `${currentCat}${currentStatus==='全部'?'':' · '+currentStatus}`);
    count.textContent = `${stageName()}共收录 ${rows.length} 种｜当前食物库共 ${DATA.length} 种`;
    if(!rows.length){ list.innerHTML = '<div class="food-knowledge-empty">没有找到相关食物，换个关键词试试</div>'; return; }
    list.innerHTML = rows.map((f)=>{
      const st = statusOf(f);
      return `<button class="food-knowledge-item" data-name="${f.name}" type="button">
        <div class="food-knowledge-item-icon">${f.icon || catIcons[f.category] || '🍽️'}</div>
        <div class="food-knowledge-item-main"><div class="food-knowledge-item-name">${f.name}</div><div class="food-knowledge-item-desc">${f.reason}</div></div>
        <div class="food-knowledge-badges"><span class="food-knowledge-badge ${cls(f.pregnancy)}">孕 ${f.pregnancy}</span><span class="food-knowledge-badge ${cls(f.lactation)}">哺 ${f.lactation}</span></div>
      </button>`;
    }).join('');
    list.querySelectorAll('.food-knowledge-item').forEach(btn=>btn.onclick=()=>showDetail(DATA.find(x=>x.name===btn.dataset.name)));
  }
  function renderAll(){ renderCats(); renderStatusTabs(); renderList(); }
  function showDetail(f){
    if(!f) return;
    const detail = $('foodV2Detail'), mask=$('foodV2Mask'), sheet=$('foodV2Sheet'); if(!detail||!mask||!sheet) return;
    detail.innerHTML = `<div class="food-knowledge-detail-head"><div class="food-knowledge-detail-icon">${f.icon || catIcons[f.category] || '🍽️'}</div><div><div class="food-knowledge-detail-name">${f.name}</div><div class="food-knowledge-detail-cat">${f.category}</div></div></div>
      <div class="food-knowledge-detail-grid">
        <div class="food-knowledge-detail-card ${cls(f.pregnancy)}"><div class="food-knowledge-detail-label">孕期</div><div class="food-knowledge-detail-status">${statusIcon[f.pregnancy]||''} ${f.pregnancy}</div></div>
        <div class="food-knowledge-detail-card ${cls(f.lactation)}"><div class="food-knowledge-detail-label">哺乳期</div><div class="food-knowledge-detail-status">${statusIcon[f.lactation]||''} ${f.lactation}</div></div>
      </div>
      <div class="food-knowledge-detail-block"><b>判断原因：</b>${f.reason}</div>
      <div class="food-knowledge-detail-block"><b>使用建议：</b>优先选择新鲜、熟透、少油少盐的做法；出现过敏、腹痛、腹泻、血糖异常或医生特殊限制时，以医生建议为准。</div>
      <div class="food-knowledge-source"><b>参考依据：</b>${(META.sources||[]).join('、')}。${META.disclaimer||''}</div>`;
    mask.classList.add('active'); sheet.classList.add('active');
  }
  function closeDetail(){ $('foodV2Mask')?.classList.remove('active'); $('foodV2Sheet')?.classList.remove('active'); }
  function openFoodKnowledge(e){
    if(e){ e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation&&e.stopImmediatePropagation(); }
    ensurePage(); keyword=''; currentCat='全部'; currentStatus='全部'; stage='pregnancy';
    const page=$('foodV2Page'); if(page){ page.classList.add('active'); page.setAttribute('aria-hidden','false'); }
    renderAll(); return false;
  }
  function closeFoodKnowledge(){ const page=$('foodV2Page'); if(page){ page.classList.remove('active'); page.setAttribute('aria-hidden','true'); } }
  function bindInside(){
    $('foodKnowledgeBack') && ($('foodKnowledgeBack').onclick=closeFoodKnowledge);
    $('foodV2Close') && ($('foodV2Close').onclick=closeDetail);
    $('foodV2Mask') && ($('foodV2Mask').onclick=closeDetail);
    $('foodKnowledgeSearch') && ($('foodKnowledgeSearch').oninput=e=>{ keyword=e.target.value.trim(); currentCat='全部'; currentStatus='全部'; renderAll(); });
    document.querySelectorAll('.food-knowledge-stage-btn').forEach(btn=>btn.onclick=()=>{ stage=btn.dataset.stage; document.querySelectorAll('.food-knowledge-stage-btn').forEach(b=>b.classList.toggle('active',b===btn)); renderAll(); });
  }
  function bindTool(){
    window.openFoodV2 = openFoodKnowledge;
    window.openFoodKnowledge = openFoodKnowledge;
    document.addEventListener('click',function(e){
      const item=e.target.closest && e.target.closest('[data-tool="food"]');
      if(!item) return;
      openFoodKnowledge(e);
    },true);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{ensurePage();bindTool();}); else {ensurePage();bindTool();}
})();

/* =========================================================
   兜底修复：能不能吃列表项事件代理
   说明：避免列表重新渲染、旧脚本覆盖 onclick 或点击到子元素时详情不弹出。
   ========================================================= */
(function(){
  function activateSheet(){
    var mask = document.getElementById('foodV2Mask');
    var sheet = document.getElementById('foodV2Sheet');
    if(mask) mask.classList.add('active');
    if(sheet) sheet.classList.add('active');
  }
  document.addEventListener('click', function(e){
    var item = e.target && e.target.closest && e.target.closest('.food-knowledge-item, .food-v2-item');
    if(!item) return;
    setTimeout(activateSheet, 0);
  }, false);
  window.forceOpenFoodDetailSheet = activateSheet;
})();
