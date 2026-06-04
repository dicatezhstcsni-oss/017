(function(){
  const STORE_KEY='maternal_home_tools_enabled_v1';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const cfg=window.APP_CONFIG||{tools:[],modules:{}};
  function saved(){try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch(e){return {}}}
  function persist(map){localStorage.setItem(STORE_KEY,JSON.stringify(map));}
  function isEnabled(tool,map=saved()){return Object.prototype.hasOwnProperty.call(map,tool.id)?!!map[tool.id]:tool.enabled!==false}
  function safe(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

  function iconHTML(tool){
    const icon=tool.icon||'';
    if(/\.(svg|png|jpg|jpeg|webp|gif)(\?.*)?$/i.test(icon)) return `<img class="pastel3d-icon-img" src="${safe(icon)}" alt="${safe(tool.label||'')}" loading="lazy">`;
    return safe(icon);
  }
  function renderTools(){
    const grid=$('#homeToolsGrid')||$('.tools-section .tools-grid'); if(!grid||!cfg.tools)return;
    const map=saved();
    grid.innerHTML=cfg.tools.filter(t=>isEnabled(t,map)).map(t=>`<div class="tool-item" data-tool="${safe(t.id)}" data-home-action="${safe(t.action||'tool')}" id="${t.id==='panorama'?'shandongGuideEntry':''}"><div class="tool-icon">${iconHTML(t)}</div><span class="tool-label">${safe(t.label)}</span></div>`).join('');
  }
  function openEditor(){
    let mask=$('.tool-editor-mask'), panel=$('.tool-editor');
    if(!mask){
      document.body.insertAdjacentHTML('beforeend',`<div class="tool-editor-mask"></div><div class="tool-editor"><div class="tool-editor-head"><div><div class="tool-editor-title">编辑全能工具</div><div class="tool-editor-subtitle">打开/关闭模块后，首页工具栏会自动更新</div></div><button class="tool-editor-close" type="button">×</button></div><div class="tool-editor-list"></div></div>`);
      mask=$('.tool-editor-mask'); panel=$('.tool-editor');
      mask.onclick=closeEditor; $('.tool-editor-close').onclick=closeEditor;
    }
    const map=saved(); const list=$('.tool-editor-list',panel);
    list.innerHTML=cfg.tools.map(t=>`<div class="tool-editor-item"><div class="tool-editor-icon">${iconHTML(t)}</div><div class="tool-editor-name">${safe(t.label)}</div><button class="tool-switch ${isEnabled(t,map)?'active':''}" data-id="${safe(t.id)}" type="button" aria-label="切换${safe(t.label)}"></button></div>`).join('');
    list.querySelectorAll('.tool-switch').forEach(btn=>btn.onclick=function(){const m=saved(); m[this.dataset.id]=!this.classList.contains('active'); persist(m); this.classList.toggle('active',m[this.dataset.id]); renderTools();});
    mask.classList.add('active'); panel.classList.add('active');
  }
  function closeEditor(){ $('.tool-editor-mask')?.classList.remove('active'); $('.tool-editor')?.classList.remove('active'); }

  function moduleEmoji(id){ return id==='expert-course'?'👩‍⚕️':id==='encyclopedia'?'📚':id==='treasure-tips'?'🎒':'💡'; }
  function ensureModuleSheet(){
    let mask=$('.module-sheet-mask'), panel=$('.module-sheet');
    if(!mask){
      document.body.insertAdjacentHTML('beforeend',`<div class="module-sheet-mask"></div><div class="module-sheet"><div class="module-sheet-head"><div><div class="module-sheet-title"></div><div class="module-sheet-subtitle"></div></div><button class="module-sheet-close" type="button">×</button></div><div class="module-sheet-body"></div></div>`);
      mask=$('.module-sheet-mask'); panel=$('.module-sheet');
      mask.onclick=closeModule; $('.module-sheet-close').onclick=closeModule;
    }
    return {mask,panel};
  }
  function openModule(id){
    const mod=cfg.modules&&cfg.modules[id]; if(!mod) return false;
    const {mask,panel}=ensureModuleSheet();
    panel.classList.remove('treasure-detail-mode');
    $('.module-sheet-title',panel).textContent=mod.title||''; $('.module-sheet-subtitle',panel).textContent=mod.subtitle||'';
    if(id==='treasure-tips') renderTreasureModule(panel,mod); else renderSimpleModule(panel,mod,id);
    mask.classList.add('active'); panel.classList.add('active'); return true;
  }
  function renderSimpleModule(panel,mod,id){
    const fallback=moduleEmoji(id);
    const cover=mod.cover?`<div class="module-cover"><img src="${safe(mod.cover)}" onerror="this.remove();this.parentElement.textContent='${fallback}'"></div>`:`<div class="module-cover">${fallback}</div>`;
    const video=mod.video?`<div class="module-video-placeholder">视频预留位：${safe(mod.video)}<br>后期把课程视频放到 assets/media/，并在 app-config.js 中修改 video 路径。</div>`:'';
    const items=(mod.items||[]).map(it=>`<div class="module-item"><div class="module-item-top"><div class="module-item-title">${safe(it.title)}</div><div class="module-item-tag">${safe(it.tag||'内容')}</div></div><div class="module-item-desc">${safe(it.desc||'')}</div></div>`).join('');
    $('.module-sheet-body',panel).innerHTML=cover+video+items+`<div class="module-edit-note">维护提示：本模块内容来自 <b>assets/js/app-config.js</b>。图片、视频建议统一放在 <b>assets/media/</b> 文件夹。</div>`;
  }
  function renderTreasureModule(panel,mod){
    panel.classList.remove('treasure-detail-mode');
    const stages=mod.stages||[];
    const resources=mod.resources||[];
    const defaultStage=stages[0]?.id||'all';
    const stageTabs=stages.map((s,i)=>`<button class="treasure-stage ${i===0?'active':''}" type="button" data-stage="${safe(s.id)}">${safe(s.label)}</button>`).join('');
    const hero=`<div class="treasure-hero"><div class="treasure-hero-badge">孕产资源导航中心</div><h3>孕产百宝锦囊</h3><p>把官方入口、医院服务、APP、小程序、线下地址和使用教程整理成可点击的资源说明书。</p><div class="treasure-search"><span>🔎</span><input id="treasureSearchInput" type="search" placeholder="搜索：建档、B超、唐筛、无创DNA、分娩、疫苗"></div></div>`;
    const cards=`<div class="treasure-quick-row">${(mod.quickCards||[]).map(c=>`<div class="treasure-quick-card"><div>${safe(c.icon||'✨')}</div><b>${safe(c.title)}</b><span>${safe(c.desc)}</span></div>`).join('')}</div>`;
    const guide=`<div class="treasure-template-tip"><b>统一详情模板</b><span>每个工具均包含：是什么、解决问题、核心功能、适用人群、使用教程、注意事项、推荐理由、可点击官方入口，并预留视频插入位。</span></div>`;
    const tabs=`<div class="treasure-stage-tabs">${stageTabs}</div>`;
    const list=`<div class="treasure-resource-list" id="treasureResourceList"></div>`;
    $('.module-sheet-body',panel).innerHTML=hero+cards+guide+tabs+list+`<div class="module-edit-note">维护提示：新增资源请继续在 <b>assets/js/app-config.js</b> 的 <b>treasure-tips.resources</b> 中补充，页面会自动生成。</div>`;
    function draw(){
      const active=$('.treasure-stage.active',panel)?.dataset.stage||defaultStage;
      const q=($('#treasureSearchInput',panel)?.value||'').trim().toLowerCase();
      const filtered=resources.filter(r=>{
        const inStage=active==='all'||(r.stages||[]).includes(active);
        const text=[r.name,r.intro,r.type,r.scene,r.what?.background,r.what?.services,(r.problems||[]).join(' '),(r.features||[]).map(f=>Object.values(f).join(' ')).join(' '),(r.keywords||[]).join(' ')].join(' ').toLowerCase();
        return inStage && (!q || text.includes(q));
      });
      $('#treasureResourceList',panel).innerHTML=filtered.length?filtered.map((r,i)=>resourceCard(r,i)).join(''):`<div class="module-item"><div class="module-item-title">没有匹配结果</div><div class="module-item-desc">可以换一个关键词，例如“挂号、建档、B超、唐筛、无创DNA、疫苗、黄疸”。</div></div>`;
      $$('.treasure-view-btn',panel).forEach(btn=>btn.onclick=function(){ const idx=Number(this.dataset.index); const item=filtered[idx]; if(item) renderTreasureDetail(panel,mod,item); });
    }
    $$('.treasure-stage',panel).forEach(btn=>btn.onclick=function(){ $$('.treasure-stage',panel).forEach(b=>b.classList.remove('active')); this.classList.add('active'); draw(); });
    $('#treasureSearchInput',panel)?.addEventListener('input',draw);
    draw();
  }
  function resourceCard(r,i){
    const tags=[r.type,r.scene].filter(Boolean).map(t=>`<span>${safe(t)}</span>`).join('');
    const topFeatures=(r.features||[]).slice(0,3).map(f=>`<li><b>${safe(f.name)}</b>：${safe(f.intro)}</li>`).join('');
    const stars='★'.repeat(Math.max(1,Math.min(5,Number(r.rating||5))));
    return `<article class="treasure-resource-card"><div class="treasure-card-head"><div class="treasure-card-icon">${safe(r.icon||'📌')}</div><div><h4>${safe(r.name)}</h4><div class="treasure-card-intro">${safe(r.intro||'')}</div><div class="treasure-tags">${tags}</div></div></div><ul>${topFeatures}</ul><div class="treasure-card-foot"><span>推荐指数：${stars}</span><button class="treasure-open treasure-view-btn" type="button" data-index="${i}">查看完整介绍</button></div></article>`;
  }
  function yesNo(v){return v===true?'是':v===false?'否':safe(v||'待补充')}
  function section(title,html){return `<section class="treasure-detail-section"><h3>${title}</h3>${html}</section>`}
  function isClickableUrl(v){return typeof v==='string' && /^(https?:\/\/|tel:|mailto:)/i.test(v.trim())}
  function officialLinkRows(entry){
    const pairs=[['官网',entry.website],['APP下载/官方页',entry.app],['微信小程序入口',entry.miniProgram],['公众号入口',entry.wechat],['客服电话',entry.phone]];
    const rows=pairs.filter(([,v])=>isClickableUrl(v)).map(([k,v])=>`<a class="treasure-link-row" href="${safe(v.trim())}" target="_blank" rel="noopener"><b>${safe(k)}</b><span>${safe(v.trim())}</span><em>打开</em></a>`).join('');
    return rows||`<div class="treasure-empty-links">暂无可点击官方链接。后期在 <b>assets/js/app-config.js</b> 的 entry 字段填写 https:// 开头的网址后，会自动显示为按钮。</div>`;
  }
  function treasureVideoSlot(r){
    const video=r.video||'';
    const id=(r.name||'resource').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g,'-').replace(/^-|-$/g,'');
    if(isClickableUrl(video)) return `<section class="treasure-video-slot"><div class="treasure-video-head"><b>▶ 视频讲解</b><span>已接入视频链接</span></div><div class="treasure-video-frame"><iframe src="${safe(video)}" title="${safe(r.name||'视频讲解')}" loading="lazy" allowfullscreen></iframe></div></section>`;
    if(/\.(mp4|webm|ogg)(\?.*)?$/i.test(video)) return `<section class="treasure-video-slot"><div class="treasure-video-head"><b>▶ 视频讲解</b><span>已接入本地视频</span></div><video class="treasure-video-player" src="${safe(video)}" controls preload="metadata"></video></section>`;
    return `<section class="treasure-video-slot treasure-video-empty"><div class="treasure-video-head"><b>▶ 视频插入位</b><span>每个工具预留</span></div><p>后期可放：官方使用教程、医院路线讲解、孕妇课堂短视频、APP操作录屏。</p><code>建议路径：assets/media/treasure-videos/${safe(id)}.mp4</code></section>`;
  }
  function renderTreasureDetail(panel,mod,r){
    panel.classList.add('treasure-detail-mode');
    $('.module-sheet-title',panel).textContent=r.name||'百宝锦囊详情';
    $('.module-sheet-subtitle',panel).textContent=r.intro||'';
    const what=r.what||{};
    const problems=(r.problems||[]).map(p=>`<span>✓ ${safe(p)}</span>`).join('');
    const features=(r.features||[]).map(f=>`<div class="treasure-feature-card"><div><b>${safe(f.name)}</b><em>${safe(f.stage||'全阶段')}</em></div><p>${safe(f.intro||'')}</p><footer>推荐指数：${'★'.repeat(Math.max(1,Math.min(5,Number(f.rating||5))))}</footer></div>`).join('');
    const people=(r.people||[]).map(p=>`<span>${safe(p)}</span>`).join('');
    const steps=(r.steps||[]).map((s,i)=>`<li><b>${i+1}</b><span>${safe(s)}</span></li>`).join('');
    const notes=(r.notes||[]).map(n=>`<li>${safe(n)}</li>`).join('');
    const reasons=(r.reasons||[]).map(n=>`<li>${safe(n)}</li>`).join('');
    const entry=r.entry||{};
    const entryRows=officialLinkRows(entry);
    $('.module-sheet-body',panel).innerHTML=`
      <button class="treasure-back" type="button">← 返回百宝锦囊</button>
      <div class="treasure-detail-hero"><div class="treasure-detail-icon">${safe(r.icon||'📌')}</div><h2>${safe(r.name)}</h2><p>${safe(r.intro||'')}</p></div>
      ${treasureVideoSlot(r)}
      ${section('这个工具是什么',`<div class="treasure-info-grid"><div><b>官方背景</b><span>${safe(what.background||'待补充')}</span></div><div><b>服务内容</b><span>${safe(what.services||'待补充')}</span></div><div><b>是否免费</b><span>${yesNo(what.free)}</span></div><div><b>是否需要预约</b><span>${yesNo(what.needAppointment)}</span></div><div><b>使用条件</b><span>${safe(what.conditions||'无特殊条件')}</span></div></div>`)}
      ${section('能解决什么问题',`<div class="treasure-problem-tags">${problems}</div>`)}
      ${section('核心功能',`<div class="treasure-feature-grid">${features}</div>`)}
      ${section('适用人群',`<div class="treasure-people-tags">${people}</div>`)}
      ${section('使用教程',`<ol class="treasure-steps">${steps}</ol>`)}
      ${section('注意事项',`<ul class="treasure-note-list">${notes}</ul>`)}
      ${section('推荐理由',`<ul class="treasure-note-list">${reasons}</ul>`)}
      ${section('官方入口',`<div class="treasure-link-list">${entryRows}</div>`)}
    `;
    $('.treasure-back',panel).onclick=function(){renderTreasureModule(panel,mod)};
  }
  function closeModule(){ $('.module-sheet-mask')?.classList.remove('active'); $('.module-sheet')?.classList.remove('active'); }
  function routeTool(el){
    const id=el.dataset.tool;
    if(el.dataset.homeAction==='module'){ openModule(id); return; }
    if(id==='panorama'){ if(typeof window.openShandongGuide==='function') window.openShandongGuide(); else document.dispatchEvent(new CustomEvent('open-panorama-guide')); return; }
    if(id==='bag'){
      if(typeof window.openBagPage==='function') { window.openBagPage(); return; }
      document.dispatchEvent(new CustomEvent('open-maternity-bag'));
      return;
    }
    const old=document.querySelector(`.tools-grid:not(#homeToolsGrid) [data-tool="${CSS.escape(id)}"]`);
    if(old&&old!==el){ old.click(); return; }
    const tabMap={weight:'weight',kick:'kick',music:'music',checkup:'checkup'};
    if(tabMap[id]) document.querySelector(`.tab-btn[data-tab="${tabMap[id]}"]`)?.click();
  }
  function bind(){
    renderTools();
    $('#toolEditBtn')?.addEventListener('click',openEditor);
    document.addEventListener('click',function(e){const item=e.target.closest&&e.target.closest('#homeToolsGrid .tool-item'); if(!item)return; e.preventDefault(); e.stopPropagation(); routeTool(item);},true);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind); else bind();
})();
