(function () {
  const state = { flat: [], current: null, audio: null, playing: false, currentSection: null };

  function lib() { return window.PRENATAL_MUSIC_LIBRARY || []; }
  function flattenLibrary() {
    state.flat = [];
    lib().forEach((section, sectionIndex) => {
      (section.items || []).forEach((item, itemIndex) => state.flat.push({ ...item, section: section.group, sectionKey: section.key, sectionIndex, itemIndex, sectionType: section.type || '' }));
    });
  }
  function formatTime(sec) {
    if (!Number.isFinite(sec)) return '00:00';
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  function coverStyle(item) { return item.cover ? `style="background-image:url('${item.cover}')"` : ''; }
  function itemKey(item) { return `${item.sectionKey || item.section || ''}__${item.title}`; }

  function pageTemplate() {
    const library = lib();
    return `
      <div class="pm-page">
        <div class="pm-top">
          <div class="pm-titlebar">
            <button class="pm-back" type="button" aria-label="返回" id="pmPageBack">‹</button>
            <div class="pm-title">音乐天地-孕期⌄</div>
            <button class="pm-search" type="button" aria-label="搜索" id="pmSearchBtn">⌕</button>
          </div>
          <div class="pm-tabs"><span class="pm-tab active">推荐</span></div>
        </div>

        <div class="pm-hero">
          <div class="pm-card pm-card-small" data-open-section="top20"><h3>热门胎教</h3><p>TOP20</p><span class="pm-bubble">▶️</span></div>
          <div class="pm-card pm-card-wide" data-open-section="parent-voice"><h3>爸妈原声讲故事</h3><p>复制父母语音，替换故事语音</p><span class="pm-bubble">😊</span></div>
        </div>

        <div class="pm-quick">
          <div class="pm-quick-item" data-open-section="kidsong"><div class="pm-quick-icon">🐟</div>胎教儿歌</div>
          <div class="pm-quick-item" data-open-section="parent-voice"><div class="pm-quick-icon">👨‍👩‍👧</div>爸妈原声</div>
          <div class="pm-quick-item" data-open-section="soft"><div class="pm-quick-icon">🎵</div>舒缓轻音乐</div>
          <div class="pm-quick-item" data-open-section="nature"><div class="pm-quick-icon">🌲</div>大自然胎教</div>
          <div class="pm-quick-item" data-open-section="story"><div class="pm-quick-icon">👶</div>胎教故事</div>
        </div>

        <div class="pm-history"><span id="pmHistoryBtn">◉ 历史播放</span><span>|</span><span id="pmLikeBtn">♡ 我喜欢的</span></div>

        ${library.map(section => `
          <section class="pm-section" data-section-key="${section.key || section.group}">
            <div class="pm-section-head">
              <div class="pm-section-title">${section.group}</div>
              <button class="pm-section-more" type="button" data-open-section="${section.key || section.group}">共${(section.items || []).length}张专辑 ›</button>
            </div>
            <div class="pm-grid">
              ${(section.items || []).slice(0, 3).map(item => `
                <div class="pm-album" data-track-key="${section.key || section.group}__${item.title}">
                  <div class="pm-cover" data-plays="${item.plays || ''}" ${coverStyle(item)}>${item.cover ? '' : (item.emoji || '🎵')}</div>
                  <div class="pm-album-title">${item.title}</div>
                </div>
              `).join('')}
            </div>
          </section>
        `).join('')}
      </div>

      <div class="pm-player">
        <div class="pm-mini">
          <div class="pm-mini-cover" id="pmMiniCover">🎵</div>
          <div class="pm-mini-name" id="pmMiniName">请选择一首音乐</div>
          <button class="pm-mini-btn" id="pmMiniPlay" type="button">▶</button>
          <button class="pm-list-btn" id="pmOpenModal" type="button">☰</button>
        </div>
      </div>

      <div class="pm-section-panel" id="pmSectionPanel">
        <div class="pm-section-page">
          <div class="pm-section-page-head"><button class="pm-section-back" id="pmSectionBack" type="button">‹</button><div><div class="pm-section-page-title" id="pmSectionTitle">专辑</div><div class="pm-section-page-sub" id="pmSectionSub">点击任一内容进入播放或流程</div></div></div>
          <div class="pm-section-list" id="pmSectionList"></div>
        </div>
      </div>

      <div class="pm-voice-panel" id="pmVoicePanel">
        <div class="pm-voice-page">
          <div class="pm-section-page-head"><button class="pm-section-back" id="pmVoiceBack" type="button">‹</button><div><div class="pm-section-page-title">爸妈原声讲故事</div><div class="pm-section-page-sub">流程演示：复制语音 → 替换故事语音</div></div></div>
          <div class="pm-voice-body">
            <div class="pm-voice-step active"><div class="pm-voice-num">1</div><div><h4>复制父母语音</h4><p>录入爸爸或妈妈 30-60 秒自然朗读音频，后期可接入真实声音克隆接口。</p><button class="pm-voice-btn" type="button" id="pmRecordDemo">🎙️ 模拟录入声音</button></div></div>
            <div class="pm-voice-step"><div class="pm-voice-num">2</div><div><h4>选择故事文本</h4><p>选择睡前故事、胎教故事或自己上传的故事文本。</p><select class="pm-voice-select"><option>小兔子的月亮船</option><option>森林里的晚安钟</option><option>给宝宝的一封信</option></select></div></div>
            <div class="pm-voice-step"><div class="pm-voice-num">3</div><div><h4>替换以后的故事语音</h4><p>用复制后的爸爸/妈妈声音生成故事音频，确认后加入播放列表。</p><button class="pm-voice-btn primary" type="button" id="pmGenerateDemo">生成替换后故事语音</button></div></div>
            <div class="pm-voice-result" id="pmVoiceResult">当前为前端流程占位：后期可接入语音克隆/文字转语音 API。</div>
          </div>
        </div>
      </div>

      <div class="pm-modal" id="pmModal">
        <div class="pm-modal-bg" id="pmModalBg"></div>
        <div class="pm-modal-main">
          <div class="pm-modal-head"><button class="pm-close" id="pmClose" type="button">‹</button><div class="pm-now-title" id="pmNowTitle">音乐天地</div><button class="pm-close" type="button" id="pmSearchInside">⌕</button></div>
          <div class="pm-disc-wrap"><div class="pm-disc" id="pmDisc"><div class="pm-disc-cover" id="pmDiscCover">🎵</div></div></div>
          <div class="pm-meta" id="pmMeta">轻柔播放 · 音量建议保持舒适</div>
          <input class="pm-range" id="pmProgress" type="range" min="0" max="100" value="0" step="0.1">
          <div class="pm-time-row"><span id="pmCurrentTime">00:00</span><span id="pmDuration">00:00</span></div>
          <div class="pm-control-row"><button class="pm-ctrl" id="pmPrev" type="button">⏮</button><button class="pm-main-play" id="pmMainPlay" type="button">▶</button><button class="pm-ctrl" id="pmNext" type="button">⏭</button></div>
          <div class="pm-speed-row" id="pmSpeedRow"><button class="pm-speed" data-speed="0.75">0.75x</button><button class="pm-speed active" data-speed="1">1x</button><button class="pm-speed" data-speed="1.25">1.25x</button><button class="pm-speed" data-speed="1.5">1.5x</button><button class="pm-speed" data-speed="2">2x</button></div>
          <div class="pm-source-tip">外部资源可能受网络或跨域策略影响。后期可在 <b>assets/js/prenatal-music-config.js</b> 替换音频和封面。<br><span class="pm-open-source" id="pmSourceText">来源：未选择</span></div>
        </div>
      </div>`;
  }

  function renderMusicTracks() {
    flattenLibrary();
    let page = document.getElementById('musicWorldPage');
    if (!page) {
      document.body.insertAdjacentHTML('beforeend', '<div class="music-world-page" id="musicWorldPage"></div>');
      page = document.getElementById('musicWorldPage');
    }
    page.innerHTML = pageTemplate();
    bindEvents(page);
    selectTrack(state.current || state.flat.find(i => i.url) || state.flat[0], false);
    updateAllScrollLocks();
    window.addEventListener('resize', updateAllScrollLocks, { passive: true });
    const tab = document.getElementById('tab-music');
    if (tab) tab.innerHTML = '<div class="pm-tab-placeholder"><button type="button" onclick="window.openPrenatalMusicPage&&window.openPrenatalMusicPage()">打开音乐天地</button></div>';
  }


  function updateScrollLock(target){
    if (!target) return;
    requestAnimationFrame(() => {
      const canScroll = target.scrollHeight > target.clientHeight + 2;
      target.classList.toggle('pm-no-scroll', !canScroll);
    });
  }
  function updateAllScrollLocks(){
    updateScrollLock(document.getElementById('musicWorldPage'));
    updateScrollLock(document.querySelector('#pmModal .pm-modal-main'));
    updateScrollLock(document.getElementById('pmSectionPanel'));
    updateScrollLock(document.getElementById('pmVoicePanel'));
  }

  function openMusicPage(){ const p=document.getElementById('musicWorldPage'); p?.classList.add('active'); updateScrollLock(p); }
  function closeMusicPage(){ document.getElementById('musicWorldPage')?.classList.remove('active'); }
  function ensureAudio() {
    if (state.audio) return state.audio;
    state.audio = new Audio();
    state.audio.preload = 'metadata';
    state.audio.addEventListener('timeupdate', syncProgress);
    state.audio.addEventListener('loadedmetadata', syncProgress);
    state.audio.addEventListener('ended', nextTrack);
    state.audio.addEventListener('error', () => {
      state.playing = false; syncButtons();
      const meta = document.getElementById('pmMeta');
      if (meta) meta.textContent = '当前外链暂时无法播放，可后期替换为本地音频或其他稳定链接。';
    });
    return state.audio;
  }
  function selectTrack(item, autoPlay) {
    if (!item) return;
    if (item.sectionType === 'voiceClone' || item.sectionKey === 'parent-voice') { openVoicePanel(); return; }
    state.current = item;
    const audio = ensureAudio();
    if (item.url) { audio.src = item.url; audio.load(); } else { audio.removeAttribute('src'); }
    const emoji = item.emoji || '🎵', cover = item.cover || '';
    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    setText('pmMiniName', item.title); setText('pmNowTitle', item.title);
    setText('pmMeta', `${item.artist || '音乐天地'} · ${item.mood || '轻柔播放'} · ${item.section || ''}`);
    setText('pmSourceText', `来源：${item.source || '外部资源'}${item.url ? '' : '｜当前为占位，等待替换音频'}`);
    ['pmMiniCover','pmDiscCover'].forEach(id => { const el = document.getElementById(id); if (!el) return; el.textContent = cover ? '' : emoji; el.style.backgroundImage = cover ? `url('${cover}')` : ''; });
    const bg = document.getElementById('pmModalBg');
    if (bg) bg.style.backgroundImage = cover ? `url('${cover}')` : 'linear-gradient(135deg,#ffe4ec,#e8f8ff)';
    document.querySelectorAll('.music-world-page .pm-album,.music-world-page .pm-list-row').forEach(el => el.classList.toggle('active', el.dataset.trackKey === itemKey(item)));
    syncProgress();
    if (autoPlay) playTrack(); else { state.playing = false; syncButtons(); }
  }
  function playTrack() {
    const item = state.current; if (!item) return;
    if (!item.url) { const meta = document.getElementById('pmMeta'); if (meta) meta.textContent = '这是占位内容：后期把音频链接填入配置文件即可播放。'; openModal(); return; }
    const audio = ensureAudio();
    audio.play().then(() => { state.playing = true; syncButtons(); openModal(); }).catch(() => {
      state.playing = false; syncButtons(); openModal();
      const meta = document.getElementById('pmMeta'); if (meta) meta.textContent = '浏览器拦截或外链不可用，请再次点击播放，或替换为本地音频。';
    });
  }
  function pauseTrack(){ if(state.audio) state.audio.pause(); state.playing=false; syncButtons(); }
  function togglePlay(){ state.playing ? pauseTrack() : playTrack(); }
  function syncButtons(){ const text=state.playing?'⏸':'▶'; ['pmMiniPlay','pmMainPlay'].forEach(id=>{const el=document.getElementById(id); if(el) el.textContent=text;}); const disc=document.getElementById('pmDisc'); if(disc) disc.classList.toggle('playing',state.playing); }
  function syncProgress(){ const audio=state.audio, range=document.getElementById('pmProgress'), cur=document.getElementById('pmCurrentTime'), dur=document.getElementById('pmDuration'); if(!audio||!range)return; const duration=Number.isFinite(audio.duration)?audio.duration:0, current=Number.isFinite(audio.currentTime)?audio.currentTime:0; range.value=duration?(current/duration*100):0; if(cur)cur.textContent=formatTime(current); if(dur)dur.textContent=duration?formatTime(duration):'00:00'; }
  function playableFlat(){ return state.flat.filter(i => i.sectionKey !== 'parent-voice' && i.sectionType !== 'voiceClone'); }
  function nextTrack(){ const arr=playableFlat(); if(!arr.length||!state.current)return; const idx=arr.findIndex(i=>itemKey(i)===itemKey(state.current)); selectTrack(arr[(idx+1)%arr.length], true); }
  function prevTrack(){ const arr=playableFlat(); if(!arr.length||!state.current)return; const idx=arr.findIndex(i=>itemKey(i)===itemKey(state.current)); selectTrack(arr[(idx-1+arr.length)%arr.length], true); }
  function setOverlayMode(on){
    const page = document.getElementById('musicWorldPage');
    if (page) page.classList.toggle('pm-overlay-open', !!on);
  }
  function openModal(){
    document.getElementById('pmModal')?.classList.add('active');
    setOverlayMode(true);
    updateScrollLock(document.querySelector('#pmModal .pm-modal-main'));
  }
  function closeModal(){
    document.getElementById('pmModal')?.classList.remove('active');
    setOverlayMode(document.getElementById('pmSectionPanel')?.classList.contains('active') || document.getElementById('pmVoicePanel')?.classList.contains('active'));
  }

  function openSection(key) {
    const section = lib().find(s => (s.key || s.group) === key);
    if (!section) return;
    if (section.type === 'voiceClone' || key === 'parent-voice') { openVoicePanel(); return; }
    state.currentSection = section;
    const title = document.getElementById('pmSectionTitle'), sub = document.getElementById('pmSectionSub'), list = document.getElementById('pmSectionList');
    if (title) title.textContent = section.group;
    if (sub) sub.textContent = `共${(section.items || []).length}张专辑，点击播放`;
    if (list) list.innerHTML = (section.items || []).map(item => `
      <div class="pm-list-row" data-track-key="${section.key || section.group}__${item.title}">
        <div class="pm-list-cover" ${coverStyle(item)}>${item.cover ? '' : (item.emoji || '🎵')}</div>
        <div class="pm-list-main"><div class="pm-list-title">${item.title}</div><div class="pm-list-meta">${item.artist || '音乐天地'} · ${item.mood || ''} · ${item.source || ''}</div></div>
        <div class="pm-list-play">${item.url ? '▶' : '待替换'}</div>
      </div>`).join('');
    const panel=document.getElementById('pmSectionPanel');
    panel?.classList.add('active');
    setOverlayMode(true);
    bindSectionRows();
    updateScrollLock(panel);
  }
  function closeSection(){
    document.getElementById('pmSectionPanel')?.classList.remove('active');
    setOverlayMode(document.getElementById('pmModal')?.classList.contains('active') || document.getElementById('pmVoicePanel')?.classList.contains('active'));
  }
  function openVoicePanel(){
    const panel=document.getElementById('pmVoicePanel');
    panel?.classList.add('active');
    setOverlayMode(true);
    updateScrollLock(panel);
  }
  function closeVoicePanel(){
    document.getElementById('pmVoicePanel')?.classList.remove('active');
    setOverlayMode(document.getElementById('pmModal')?.classList.contains('active') || document.getElementById('pmSectionPanel')?.classList.contains('active'));
  }
  function bindSectionRows(){
    document.querySelectorAll('.music-world-page .pm-list-row').forEach(row=>{
      row.onclick=()=>{ const item=state.flat.find(i=>itemKey(i)===row.dataset.trackKey); closeSection(); selectTrack(item,true); openModal(); };
    });
  }
  function bindEvents(root) {
    root.querySelectorAll('[data-track-key]').forEach(card => card.addEventListener('click', () => { const item=state.flat.find(i=>itemKey(i)===card.dataset.trackKey); selectTrack(item,true); openModal(); }));
    root.querySelectorAll('[data-open-section]').forEach(btn => btn.addEventListener('click', (e)=>{e.stopPropagation(); openSection(btn.dataset.openSection);}));
    const bind=(id,fn)=>{const el=document.getElementById(id); if(el) el.addEventListener('click',fn);};
    bind('pmPageBack', closeMusicPage); bind('pmMiniPlay', togglePlay); bind('pmMainPlay', togglePlay); bind('pmOpenModal', openModal); bind('pmClose', closeModal); bind('pmNext', nextTrack); bind('pmPrev', prevTrack); bind('pmSectionBack', closeSection); bind('pmVoiceBack', closeVoicePanel);
    bind('pmSearchBtn', ()=>alert('搜索预留：后期可接入音乐/故事搜索。'));
    bind('pmHistoryBtn', ()=>alert('历史播放预留：可接入 localStorage 播放记录。'));
    bind('pmLikeBtn', ()=>alert('我喜欢的预留：可接入收藏列表。'));
    bind('pmRecordDemo', ()=>{ const r=document.getElementById('pmVoiceResult'); if(r) r.textContent='已模拟录入 45 秒父母声音。下一步：选择故事并生成替换后的故事语音。'; });
    bind('pmGenerateDemo', ()=>{ const r=document.getElementById('pmVoiceResult'); if(r) r.textContent='已生成示例故事语音。当前为前端流程演示，后期接入真实 TTS/声音克隆接口即可。'; });
    const range=document.getElementById('pmProgress');
    if(range) range.addEventListener('input',()=>{const audio=ensureAudio(); if(Number.isFinite(audio.duration)) audio.currentTime=audio.duration*Number(range.value)/100;});
    document.querySelectorAll('#pmSpeedRow .pm-speed').forEach(btn=>btn.addEventListener('click',()=>{const speed=Number(btn.dataset.speed||1); ensureAudio().playbackRate=speed; document.querySelectorAll('#pmSpeedRow .pm-speed').forEach(b=>b.classList.toggle('active',b===btn));}));
  }

  window.initMusicApp = renderMusicTracks;
  window.renderMusicTracks = renderMusicTracks;
  window.openPrenatalMusicPage = function(){ if(!document.getElementById('musicWorldPage')) renderMusicTracks(); openMusicPage(); };
  window.closePrenatalMusicPage = closeMusicPage;
  window.selectMusicTrack = function(index){ selectTrack(state.flat[index] || state.flat[0], false); };
  window.startMusic = playTrack; window.stopMusic = pauseTrack;

  document.addEventListener('click', function(e){
    const item = e.target.closest && e.target.closest('[data-tool="music"],[data-tool="prenatal-music"]');
    if(!item) return;
    e.preventDefault(); e.stopPropagation(); window.openPrenatalMusicPage();
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderMusicTracks);
  else renderMusicTracks();
})();
