
(function(){
  const HVT_CFG = window.HOSPITAL_VR_CONFIG || {};
  const scenes = (HVT_CFG.hospitals || []).map(h => ({
    ...h,
    pano: h.panorama || h.pano,
    layoutScenes: h.layoutScenes || null
  }));
  const defaultLayoutScenes = HVT_CFG.defaultLayoutScenes || [];
  function getLayoutItems(){
    const h = scenes[current] || {};
    return (h.layoutScenes && h.layoutScenes.length ? h.layoutScenes : defaultLayoutScenes).map(item => ({...item}));
  }
  function hotspotsEnabled(){ return !!(HVT_CFG.showHotspots || (scenes[current] && scenes[current].showHotspots)); }
  let page, viewer, layoutViewer, current = 0, rotating = false, layoutRotating=false, layoutCurrent = 0;
  function $(id){return document.getElementById(id)}
  function ensure(){
    if($('hospitalTourPage')){ page=$('hospitalTourPage'); return; }
    const div=document.createElement('section'); div.id='hospitalTourPage'; div.setAttribute('aria-label','山东省医院全景导览');
    div.innerHTML=`<main class="hvt-shell">
      <section id="hvtPano" class="hvt-pano" aria-label="720度全景展示区"></section>
      <header class="hvt-header"><button class="hvt-back" id="hvtClose">‹</button><div class="hvt-brand"><div class="hvt-logo">VR</div><div><div class="hvt-title">山东省医院全景导览</div><div class="hvt-sub">Shandong Hospital Virtual Tour</div></div></div><div class="hvt-scene-heading"><strong id="hvtCurrentName"></strong><span id="hvtCurrentSub"></span></div></header>
      <nav class="hvt-toolbar" aria-label="全景功能操作栏"><button data-hvt-panel="hvtScenePanel">▦<span>医院</span></button><button id="hvtRotate">↻<span>旋转</span></button><button data-hvt-panel="hvtMapPanel">⌖<span>地图</span></button><button data-hvt-panel="hvtIntroPanel">ⓘ<span>说明</span></button><button data-hvt-panel="hvtSharePanel">⤴<span>分享</span></button><button id="hvtFull">⛶<span>全屏</span></button></nav>
      <button class="hvt-layout-entry" id="hvtLayoutEntry"><span>🏥</span><strong>进入院内布局</strong><em>产检动线 / VR地图 / 视频路线</em></button><input id="hvtUpload" type="file" accept="image/*" class="hvt-hidden">
      <footer class="hvt-bottom"><button class="hvt-round" id="hvtPrev">‹</button><div class="hvt-bottom-title"><strong id="hvtBottomName"></strong><span>拖动画面查看四周，点击右侧按钮切换医院、地图、说明和分享</span></div><button class="hvt-round" id="hvtNext">›</button></footer>
      <section class="hvt-panel" id="hvtScenePanel"><button class="hvt-panel-close" data-hvt-close>×</button><div class="hvt-panel-title">山东省部分医院导览</div><div class="hvt-scene-grid" id="hvtSceneGrid"></div></section>
      <section class="hvt-panel" id="hvtMapPanel"><button class="hvt-panel-close" data-hvt-close>×</button><div class="hvt-panel-title">医院定位地图</div><p class="hvt-note">当前为示意地图，后期可替换为真实山东地图或医院院区平面图。</p><div class="hvt-map" id="hvtMap"></div></section>
      <section class="hvt-panel hvt-intro" id="hvtIntroPanel"><button class="hvt-panel-close" data-hvt-close>×</button><div class="hvt-panel-title">导览说明</div><h2>山东省医院孕产服务导览</h2><p>本模块已移除山东省脐血库展馆内容，改为山东省部分医院产科/妇产科/妇幼机构导览。适合后续接入医院门诊、产检中心、住院部、停车场、缴费窗口等真实720°图片。</p><ul><li><b>适用对象：</b>孕产妇及家属。</li><li><b>核心用途：</b>提前熟悉医院环境、产检动线、候诊区域和重点位置。</li><li><b>后期扩展：</b>可加入医院介绍视频、路线导航、科室电话和预约入口。</li></ul></section>
      <section class="hvt-panel" id="hvtSharePanel"><button class="hvt-panel-close" data-hvt-close>×</button><div class="hvt-panel-title">分享导览</div><div class="hvt-share-card"><div class="hvt-qr">VR</div><p class="hvt-note">复制当前链接，后期可替换为正式二维码或医院导览海报。</p><button class="hvt-primary" id="hvtCopy">复制链接</button></div></section>
      <section class="hvt-layout-page" id="hvtLayoutPage" aria-label="医院内部全景布局"><div id="hvtLayoutPano" class="hvt-layout-pano"></div><header class="hvt-layout-vr-header"><button class="hvt-layout-back" id="hvtLayoutBack">‹</button><div><h2 id="hvtLayoutHospital">医院内部全景布局</h2><p id="hvtLayoutSceneSub">孕妇视角：入口、产检、检查、急诊和住院路线</p></div></header><nav class="hvt-layout-vr-toolbar"><button id="hvtLayoutSceneBtn">▦<span>场景</span></button><button id="hvtLayoutRotate">↻<span>旋转</span></button><button id="hvtLayoutRouteBtn">▶<span>路线</span></button><button id="hvtUploadShortcut">⤴<span>替换</span></button></nav><div class="hvt-layout-hotspots" id="hvtLayoutHotspots"></div><footer class="hvt-layout-vr-bottom"><button class="hvt-round" id="hvtLayoutPrev">‹</button><div><strong id="hvtLayoutSceneName"></strong><span id="hvtLayoutSceneDesc"></span></div><button class="hvt-round" id="hvtLayoutNext">›</button></footer><section class="hvt-layout-scenes-panel" id="hvtLayoutScenesPanel"><button class="hvt-panel-close" id="hvtLayoutScenesClose">×</button><div class="hvt-panel-title">院内全景场景</div><div class="hvt-layout-list" id="hvtLayoutList"></div></section></section>
      <section class="hvt-layout-detail" id="hvtLayoutDetail" aria-label="院内场景详情"><header class="hvt-layout-header"><button class="hvt-layout-back" id="hvtDetailBack">‹</button><div><h2 id="hvtDetailTitle"></h2><p id="hvtDetailSub"></p></div></header><div class="hvt-detail-body"><div class="hvt-media-slot" id="hvtDetailImage"><span>图片预留位</span><small>后期替换真实科室/路线图</small></div><div class="hvt-video-slot" id="hvtDetailVideo"><span>▶ 全景视频路线预留</span><small>可放入口→科室的720视频或普通导览视频</small></div><article class="hvt-detail-card"><h3>为什么孕妈需要看这里</h3><p id="hvtDetailDesc"></p></article><article class="hvt-detail-card"><h3>到院前准备</h3><ul id="hvtDetailPrep"></ul></article></div></section>
      <div class="hvt-toast" id="hvtToast">已复制链接</div>
    </main>`;
    document.body.appendChild(div); page=div; bind(); renderLists();
  }
  function renderLists(){
    $('hvtSceneGrid').innerHTML=scenes.map((s,i)=>`<button class="hvt-scene-card ${i===current?'active':''}" data-index="${i}"><img src="${s.pano}" alt="${s.name}"><div><strong>${s.name}</strong><span>${s.sub}</span></div></button>`).join('');
    $('hvtMap').innerHTML=scenes.map((s,i)=>`<button class="hvt-node ${i===current?'active':''}" data-index="${i}" style="left:${s.pos[0]}%;top:${s.pos[1]}%">${s.name.replace('山东省','').replace('山东大学','齐鲁').replace('济南市','济南')}</button>`).join('');
    document.querySelectorAll('.hvt-scene-card,.hvt-node').forEach(el=>el.onclick=()=>{setScene(+el.dataset.index);closePanels();});
  }
  function createViewer(pano){
    const box=$('hvtPano'); if(!box) return; box.innerHTML='';
    try{ if(viewer && viewer.destroy) viewer.destroy(); }catch(e){}
    if(window.pannellum){
      viewer=pannellum.viewer('hvtPano',{type:'equirectangular',panorama:pano,autoLoad:true,showControls:false,hfov:100,pitch:0,yaw:0});
    } else {
      box.style.backgroundImage=`url(${pano})`; box.style.backgroundSize='cover'; box.style.backgroundPosition='center';
      viewer=null;
    }
  }
  function setScene(i){
    if(!scenes.length) return; current=(i+scenes.length)%scenes.length; const s=scenes[current];
    $('hvtCurrentName').textContent=s.name; $('hvtCurrentSub').textContent=s.sub; $('hvtBottomName').textContent=s.name;
    createViewer(s.pano); renderLists(); renderLayout();
  }
  function createLayoutViewer(pano){
    const box=$('hvtLayoutPano'); if(!box) return; box.innerHTML='';
    try{ if(layoutViewer && layoutViewer.destroy) layoutViewer.destroy(); }catch(e){}
    if(window.pannellum){
      layoutViewer=pannellum.viewer('hvtLayoutPano',{type:'equirectangular',panorama:pano,autoLoad:true,showControls:false,hfov:105,pitch:0,yaw:0});
    }else{
      box.style.backgroundImage=`url(${pano})`; box.style.backgroundSize='cover'; box.style.backgroundPosition='center'; layoutViewer=null;
    }
  }
  function setLayoutScene(i){
    const items=getLayoutItems(); layoutCurrent=(i+items.length)%items.length; const item=items[layoutCurrent];
    $('hvtLayoutSceneName').textContent=item.icon+' '+item.name;
    $('hvtLayoutSceneSub').textContent=item.floor+' · 预计 '+item.time;
    $('hvtLayoutSceneDesc').textContent=item.desc;
    createLayoutViewer(item.pano || item.image || scenes[current].pano);
    renderLayout();
  }
  function renderLayout(){
    if(!$('hvtLayoutList')) return;
    const hospital=scenes[current]; $('hvtLayoutHospital').textContent=hospital.name + ' · 院内全景';
    const items=getLayoutItems();
    $('hvtLayoutList').innerHTML=items.map((it,i)=>`<button class="hvt-layout-card ${i===layoutCurrent?'active':''}" data-layout-index="${i}"><div class="hvt-layout-icon">${it.icon}</div><div><strong>${it.name}</strong><p>${it.desc}</p><em>${it.floor} · ${it.time}</em></div><span>›</span></button>`).join('');
    $('hvtLayoutHotspots').classList.toggle('hvt-hotspots-disabled', !hotspotsEnabled());
    $('hvtLayoutHotspots').innerHTML=items.map((it,i)=>{ const hp=it.hotspot||{}; const x=hp.x ?? (18+(i%2)*54); const y=hp.y ?? (22+Math.floor(i/2)*12); return `<button class="hvt-vr-hotspot ${i===layoutCurrent?'active':''}" data-layout-index="${i}" style="left:${x}%;top:${y}%"><span>${it.icon}</span>${it.name.split('/')[0]}</button>`; }).join('');
    document.querySelectorAll('[data-layout-index]').forEach(el=>el.onclick=()=>{setLayoutScene(+el.dataset.layoutIndex); if(el.closest('#hvtLayoutList')) $('hvtLayoutScenesPanel').classList.remove('active');});
  }
  function openLayoutPage(){ closePanels(); $('hvtLayoutPage').classList.add('active'); setLayoutScene(layoutCurrent||0); }
  function closeLayoutPage(){ $('hvtLayoutPage').classList.remove('active'); $('hvtLayoutScenesPanel').classList.remove('active'); try{ if(layoutViewer && layoutViewer.stopAutoRotate) layoutViewer.stopAutoRotate(); }catch(e){} layoutRotating=false; }
  function openLayoutDetail(i){
    setLayoutScene(i);
    const item=getLayoutItems()[layoutCurrent];
    $('hvtDetailTitle').textContent=item.name; $('hvtDetailSub').textContent=item.floor+' · 预计 '+item.time;
    $('hvtDetailDesc').textContent=item.desc;
    $('hvtDetailPrep').innerHTML=item.prep.map(x=>`<li>${x}</li>`).join('');
    $('hvtDetailImage').style.backgroundImage=`linear-gradient(135deg, rgba(255,142,157,.22), rgba(238,248,255,.95)), url('${item.image}')`;
    $('hvtDetailImage').dataset.path=item.image;
    $('hvtDetailVideo').dataset.path=item.video;
    $('hvtLayoutDetail').classList.add('active');
  }
  function closeLayoutDetail(){ $('hvtLayoutDetail').classList.remove('active'); }
  function closePanels(){ document.querySelectorAll('.hvt-panel').forEach(p=>p.classList.remove('active')); }
  function bind(){
    $('hvtClose').onclick=closeHospitalTour; $('hvtPrev').onclick=()=>setScene(current-1); $('hvtNext').onclick=()=>setScene(current+1); $('hvtLayoutEntry').onclick=openLayoutPage; $('hvtLayoutBack').onclick=closeLayoutPage; $('hvtDetailBack').onclick=closeLayoutDetail; $('hvtUploadShortcut').onclick=()=>$('hvtUpload').click(); $('hvtLayoutSceneBtn').onclick=()=>$('hvtLayoutScenesPanel').classList.add('active'); $('hvtLayoutScenesClose').onclick=()=>$('hvtLayoutScenesPanel').classList.remove('active'); $('hvtLayoutPrev').onclick=()=>setLayoutScene(layoutCurrent-1); $('hvtLayoutNext').onclick=()=>setLayoutScene(layoutCurrent+1); $('hvtLayoutRouteBtn').onclick=()=>openLayoutDetail(layoutCurrent); $('hvtLayoutRotate').onclick=function(){ if(!layoutViewer) return; if(layoutRotating){layoutViewer.stopAutoRotate(); this.querySelector('span').textContent='旋转';} else {layoutViewer.startAutoRotate(-2); this.querySelector('span').textContent='停止';} layoutRotating=!layoutRotating; };
    document.querySelectorAll('[data-hvt-panel]').forEach(btn=>btn.onclick=()=>{const p=$(btn.dataset.hvtPanel); const active=p.classList.contains('active'); closePanels(); if(!active)p.classList.add('active');});
    document.querySelectorAll('[data-hvt-close]').forEach(btn=>btn.onclick=closePanels);
    $('hvtRotate').onclick=function(){ if(!viewer) return; if(rotating){viewer.stopAutoRotate(); this.querySelector('span').textContent='旋转';} else {viewer.startAutoRotate(-2); this.querySelector('span').textContent='停止';} rotating=!rotating; };
    $('hvtFull').onclick=()=>{ try{ if(viewer) viewer.toggleFullscreen(); else page.requestFullscreen && page.requestFullscreen(); }catch(e){} };
    $('hvtUpload').onchange=function(e){ const file=e.target.files&&e.target.files[0]; if(!file)return; const r=new FileReader(); r.onload=evt=>{ if($('hvtLayoutPage')?.classList.contains('active')) createLayoutViewer(evt.target.result); else createViewer(evt.target.result); }; r.readAsDataURL(file); };
    $('hvtCopy').onclick=function(){ const done=()=>showToast('已复制链接'); if(navigator.clipboard) navigator.clipboard.writeText(location.href).then(done).catch(done); else done(); };
  }
  function showToast(t){ const el=$('hvtToast'); if(!el)return; el.textContent=t; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),1600); }
  function openHospitalTour(){ ensure(); document.getElementById('shandongPreGuide')?.classList.remove('active'); document.getElementById('qyTourMapPage')?.classList.remove('qy-active'); document.getElementById('qyVRPage')?.classList.remove('qy-active'); page.classList.add('active'); document.body.style.overflow='hidden'; setScene(current); }
  function closeHospitalTour(){ if(page) page.classList.remove('active'); document.body.style.overflow=''; closePanels(); $('hvtLayoutPage')?.classList.remove('active'); $('hvtLayoutDetail')?.classList.remove('active'); try{ if(viewer && viewer.stopAutoRotate) viewer.stopAutoRotate(); }catch(e){} rotating=false; }
  window.openHospitalTour=openHospitalTour; window.closeHospitalTour=closeHospitalTour; window.openShandongGuide=openHospitalTour;
  document.addEventListener('open-panorama-guide', openHospitalTour);
  document.addEventListener('click',function(e){
    const entry=e.target.closest&&e.target.closest('[data-tool="panorama"],#shandongGuideEntry');
    if(entry){ e.preventDefault(); e.stopPropagation(); openHospitalTour(); }
  },true);
})();
