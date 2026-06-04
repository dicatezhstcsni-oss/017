(function(){
  const STORE='checkup_reminder_beauty_v2';
  const MS_DAY=86400000;
  const schedule=[
    {id:'first',week:6,range:'孕6-8周',name:'早孕确认',duration:'约30-60分钟',fasting:'通常不需要',level:'★★★★☆',why:'确认宫内孕、胎心胎芽和孕周。',prep:[['携带身份证/医保卡','便于挂号和建档','must'],['记录末次月经日期','用于医生核算孕周','must'],['如腹痛出血提前就医','不要等到预约日期','ready']],flow:['挂号/问诊','B超或抽血确认','医生评估孕周','安排下次检查']},
    {id:'nt',week:12,range:'孕11-13+6周',name:'建档 + NT检查',duration:'约1-2小时',fasting:'以医院要求为准',level:'★★★★★',why:'建立孕产档案，评估早期胎儿颈项透明层。',prep:[['提前预约NT','错过孕周窗口可能无法检查','must'],['带齐既往检查单','便于医生连续评估','must'],['准备产检手册/母子健康手册','建档常用资料','must']],flow:['身份信息登记','基础化验/问诊','NT超声检查','医生确认后续产检计划']},
    {id:'screen',week:16,range:'孕15-20周',name:'唐筛 / 无创评估',duration:'约30-60分钟',fasting:'通常不需要',level:'★★★★☆',why:'评估常见染色体异常风险，具体方案听医生建议。',prep:[['确认检查类型','唐筛、无创或产前诊断需医生评估','must'],['了解出报告时间','方便安排复诊','ready'],['带上既往NT结果','医生会结合前期结果判断','must']],flow:['医生评估风险因素','选择检查项目','抽血送检','等待报告并复诊']},
    {id:'anomaly',week:22,range:'孕20-24周',name:'系统超声 / 大排畸',duration:'约30-90分钟',fasting:'不需要',level:'★★★★★',why:'系统观察胎儿结构、胎盘和羊水情况。',prep:[['务必提前预约','热门医院排期紧张','must'],['穿宽松衣物','方便超声检查','ready'],['预留等待时间','胎位不合适时可能需要走动后复查','ready']],flow:['签到候诊','超声检查','胎位不佳时适当活动','医生查看报告并安排复查']},
    {id:'ogtt',week:25,range:'孕24-28周',name:'糖耐量检查 OGTT',duration:'约2-3小时',fasting:'通常需要空腹',level:'★★★★★',why:'筛查妊娠期糖尿病。',prep:[['按医院要求空腹','通常需前一晚开始禁食，具体听医院要求','must'],['带水杯和少量食物','检查结束后可及时补充能量','ready'],['预留半天时间','需多次抽血，等待时间较长','must']],flow:['空腹抽血','喝葡萄糖水','1小时抽血','2小时抽血','完成后进食并等候医嘱']},
    {id:'late',week:30,range:'孕28-32周',name:'晚孕常规产检',duration:'约30-60分钟',fasting:'通常不需要',level:'★★★★☆',why:'关注血压、体重、尿检、胎心和胎儿生长。',prep:[['记录胎动情况','便于医生判断胎儿状态','must'],['带产检手册','连续记录血压体重等数据','must'],['如水肿头痛及时告知','注意高血压相关风险','ready']],flow:['测体重血压','尿检/血常规按医嘱','听胎心','医生评估水肿和胎儿生长']},
    {id:'growth',week:32,range:'孕32-34周',name:'胎儿生长评估',duration:'约30-60分钟',fasting:'不需要',level:'★★★★☆',why:'评估胎儿大小、胎位、胎盘成熟度和羊水。',prep:[['提前确认是否需预约B超','不同医院安排不同','ready'],['记录胎动和不适','复诊时主动说明','must'],['带上大排畸报告','便于对照胎儿生长趋势','ready']],flow:['常规测量','超声评估','医生判断胎位/羊水','安排晚孕复查频率']},
    {id:'gbs',week:36,range:'孕35-37周',name:'GBS筛查 + 分娩评估',duration:'约30-60分钟',fasting:'通常不需要',level:'★★★★☆',why:'为分娩用药和入院准备提供依据。',prep:[['准备待产包清单','可开始查缺补漏','ready'],['确认分娩医院流程','了解入院证件和急诊入口','must'],['询问临产信号','破水、规律宫缩、胎动异常需及时处理','must']],flow:['常规产检','GBS或相关检查','分娩方式评估','确认入院注意事项']},
    {id:'weekly37',week:37,range:'孕37周起',name:'足月后每周产检',duration:'约30-90分钟',fasting:'以检查项目为准',level:'★★★★★',why:'足月后重点监测胎心、胎动、羊水、胎盘和临产迹象。',prep:[['每周按时复查','足月后检查频率增加','must'],['每天关注胎动','明显减少需及时就医','must'],['待产包放在固定位置','方便随时入院','ready']],flow:['测血压体重尿检','胎心监护','医生评估胎位和宫缩','确认下次复诊或入院指征']},
    {id:'due',week:40,range:'孕40周',name:'预产期产检',duration:'以医院安排为准',fasting:'以医院要求为准',level:'★★★★★',why:'超过或接近预产期时加强监测，评估是否需要干预。',prep:[['按医生要求复诊','不要自行等待过久','must'],['携带全部产检资料','便于入院评估','must'],['出现破水立即就医','破水后不要洗澡或久站','must']],flow:['胎心监护','超声/宫颈评估按医嘱','医生判断等待或干预','确认入院安排']}
  ];

  const detailMap={
    first:{hero:'🤰',image:'assets/media/checkup/early-confirm.jpg',video:'assets/media/checkup/early-confirm.mp4',summary:'早孕确认主要用于确认是否为宫内妊娠、核对孕周，并观察胎心胎芽发育情况。',detail:'一般医生会结合末次月经、血HCG/孕酮、超声结果综合判断。若出现腹痛、阴道出血、明显头晕等情况，不建议等待预约日期，应及时就医。',notes:['记录末次月经第一天，方便医生推算孕周。','首次检查不必过度紧张，重点是确认位置和发育趋势。','若胎心胎芽暂未显示，医生可能会建议间隔复查。'],mediaTip:'后期可替换为早孕B超示意图、挂号流程图或医生讲解短视频。'},
    nt:{hero:'📘',image:'assets/media/checkup/nt.jpg',video:'assets/media/checkup/nt-guide.mp4',summary:'建档和NT检查是孕早期非常关键的一次产检，通常用于建立孕产档案并评估早期胎儿结构风险。',detail:'NT检查有明确孕周窗口，错过后可能无法准确完成。建档时通常会涉及基础信息登记、既往病史询问、基础化验和后续产检计划安排。',notes:['提前预约，热门医院NT排期较紧。','带齐身份证、医保卡、既往检查单和母子健康手册。','检查结果需由医生结合孕周和其他指标判断。'],mediaTip:'可放NT检查流程图、建档材料清单图、医院预约教程视频。'},
    screen:{hero:'🧬',image:'assets/media/checkup/screening.jpg',video:'assets/media/checkup/screening.mp4',summary:'唐筛、无创DNA或产前诊断属于染色体异常风险评估相关项目，具体选择应听从医生建议。',detail:'不同孕妇年龄、既往史、NT结果和家族史不同，适合的筛查路径也不同。页面只做提醒，不替代医生对检查方式的判断。',notes:['确认是唐筛、无创还是进一步产前诊断。','抽血前通常不需要空腹，但以医院要求为准。','关注出报告时间，及时复诊。'],mediaTip:'可放唐筛/无创区别图、报告领取流程视频。'},
    anomaly:{hero:'🖥️',image:'assets/media/checkup/anomaly-scan.jpg',video:'assets/media/checkup/anomaly-scan.mp4',summary:'系统超声/大排畸是孕中期重点检查，用于系统观察胎儿结构、胎盘、羊水等情况。',detail:'检查过程中若胎位不佳，可能需要走动、进食或稍后复查。检查时间较长，建议预留充足时间。',notes:['务必提前预约。','穿宽松、方便检查的衣物。','胎位不合适时保持耐心，不代表一定异常。'],mediaTip:'可放超声检查室图片、大排畸流程动画或注意事项短视频。'},
    ogtt:{hero:'🥤',image:'assets/media/checkup/ogtt.jpg',video:'assets/media/checkup/ogtt.mp4',summary:'糖耐量检查OGTT主要用于筛查妊娠期糖尿病，是孕中期非常重要的检查。',detail:'通常需要空腹，并按流程完成多次抽血。喝糖水后不要随意进食或大量活动，具体流程以医院安排为准。',notes:['检查前几天不要刻意节食。','按医院要求空腹，带好水杯和少量食物。','检查结束后再进食，避免低血糖不适。'],mediaTip:'可放糖耐流程图、喝糖水注意事项视频。'},
    late:{hero:'🩺',image:'assets/media/checkup/late-check.jpg',video:'assets/media/checkup/late-check.mp4',summary:'晚孕常规产检重点关注血压、体重、尿检、胎心、胎动和水肿情况。',detail:'孕晚期身体负担增加，医生会更关注妊娠高血压、贫血、胎儿生长和胎动变化。',notes:['记录近期胎动。','如头痛、眼花、水肿明显，应主动告知医生。','每次都带产检手册，便于连续评估。'],mediaTip:'可放血压测量图、胎动记录图或晚孕产检提醒视频。'},
    growth:{hero:'📏',image:'assets/media/checkup/growth.jpg',video:'assets/media/checkup/growth.mp4',summary:'胎儿生长评估用于观察胎儿大小、胎位、羊水、胎盘成熟度等情况。',detail:'医生会结合前后多次检查结果判断生长趋势，而不是只看单次数据。若提示偏大或偏小，应按医嘱复查。',notes:['带上既往超声报告便于对比。','关注胎动变化。','如医生建议复查，不代表一定异常。'],mediaTip:'可放胎儿生长曲线图、胎位示意图。'},
    gbs:{hero:'🏥',image:'assets/media/checkup/gbs.jpg',video:'assets/media/checkup/gbs.mp4',summary:'GBS筛查和分娩评估通常发生在临近足月阶段，用于辅助分娩管理。',detail:'此阶段需要了解入院流程、临产信号和分娩医院要求，同时开始检查待产包是否准备齐全。',notes:['确认分娩医院急诊入口和入院材料。','了解破水、规律宫缩、胎动异常等就医信号。','待产包放在家人都知道的位置。'],mediaTip:'可放入院流程图、临产信号科普视频。'},
    weekly37:{hero:'👶',image:'assets/media/checkup/weekly.jpg',video:'assets/media/checkup/weekly.mp4',summary:'足月后一般产检频率增加，重点监测胎心、羊水、胎盘、胎动和临产迹象。',detail:'足月后变化可能较快，按时复查很重要。若出现破水、规律宫缩、胎动明显异常等情况，应及时就医。',notes:['每天关注胎动。','待产包和证件保持随时可拿。','按医生安排进行胎心监护。'],mediaTip:'可放胎心监护示意图、足月入院提醒视频。'},
    due:{hero:'🎒',image:'assets/media/checkup/due-date.jpg',video:'assets/media/checkup/due-date.mp4',summary:'接近或超过预产期时，需要加强监测并由医生评估是否继续等待或进行干预。',detail:'预产期并不是必须当天分娩，医生会根据胎心、羊水、胎盘、宫颈条件等综合判断。',notes:['不要自行长期等待，按医嘱复诊。','出现破水应立即就医。','携带全部产检资料和待产包。'],mediaTip:'可放预产期提醒图、入院准备视频。'}
  };
  schedule.forEach(x=>Object.assign(x, detailMap[x.id]||{}));

  function $(s,r=document){return r.querySelector(s)}
  function $all(s,r=document){return Array.from(r.querySelectorAll(s))}
  function today(){const d=new Date();d.setHours(0,0,0,0);return d}
  function parse(v){ if(!v)return null; const d=new Date(v+'T00:00:00'); return isNaN(d)?null:d; }
  function fmt(d){return d?`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`:''}
  function add(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x}
  function state(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){return{}}}
  function save(s){localStorage.setItem(STORE,JSON.stringify(s||{}))}
  function calc(){const s=state();let lmp=parse(s.lmp),due=parse(s.due);if(!lmp&&due)lmp=add(due,-280);if(!due&&lmp)due=add(lmp,280);return{...s,lmp,due}}
  function curWeek(lmp){if(!lmp)return'-'; const diff=Math.floor((today()-lmp)/MS_DAY); const w=Math.max(1,Math.min(42,Math.floor(diff/7)+1)); const day=Math.max(0,diff%7); return `孕${w}周+${day}天`;}
  function dateByWeek(lmp,w){return add(lmp,(w-1)*7)}
  function items(lmp){return schedule.map(x=>({...x,date:lmp?dateByWeek(lmp,x.week):null}))}
  function nextItem(list){const n=today();return list.find(x=>x.date>=n)||list[list.length-1]}
  function inject(){
    const page=document.getElementById('checkupReminderPage'); if(!page)return;
    page.innerHTML=`<div class="cr-page">
      <div class="cr-topbar"><button class="cr-back" id="crClose" type="button">←</button><div class="cr-title">产检提醒</div><button class="cr-save" id="crSmart" type="button">智能设置</button></div>
      <div class="cr-body">
        <div class="cr-card cr-setup"><div class="cr-setup-title">🗓️ 设置孕周后自动生成提醒</div><div class="cr-form"><div class="cr-field"><label>末次月经</label><input id="crLmp" type="date"></div><div class="cr-field"><label>预产期</label><input id="crDue" type="date"></div></div><button class="cr-primary-btn" id="crSave" type="button">保存并生成产检提醒</button></div>
        <div class="cr-card"><div class="cr-hero"><div class="cr-week" id="crWeek">🌸 未设置孕周</div><div class="cr-next-label">下一次产检</div><div class="cr-next-name" id="crNextName">请先设置末次月经或预产期</div><div class="cr-countdown" id="crCountdown">设置后自动计算检查日期、准备事项和流程</div><div class="cr-hero-grid"><div class="cr-mini"><div class="cr-mini-label">建议孕周</div><div class="cr-mini-val" id="crRange">-</div></div><div class="cr-mini"><div class="cr-mini-label">是否空腹</div><div class="cr-mini-val" id="crFasting">-</div></div><div class="cr-mini"><div class="cr-mini-label">预计耗时</div><div class="cr-mini-val" id="crDuration">-</div></div></div></div><div class="cr-actions"><button class="cr-action primary" id="crAddCalendar" type="button">加入手机日历</button><button class="cr-action secondary" id="crAddRecord" type="button">记录预约</button></div></div>
        <div class="cr-tabs"><button class="cr-tab active" data-cr-tab="guide" type="button">检查攻略</button><button class="cr-tab" data-cr-tab="prep" type="button">检查准备</button><button class="cr-tab" data-cr-tab="map" type="button">孕期地图</button><button class="cr-tab" data-cr-tab="record" type="button">预约记录</button></div>
        <div class="cr-panel active" id="crPanelGuide"><div class="cr-card"><div class="cr-section-title"><span>本次检查重点</span><span class="cr-section-sub" id="crLevel">重要程度 -</span></div><div class="cr-guide"><div class="cr-info-grid"><div class="cr-info"><div class="cr-info-label">为什么做</div><div class="cr-info-val" id="crWhy">设置后显示</div></div><div class="cr-info"><div class="cr-info-label">建议安排</div><div class="cr-info-val" id="crWhen">请结合医生医嘱</div></div></div><div class="cr-section-sub">检查流程</div><div class="cr-process" id="crProcess"></div></div></div></div>
        <div class="cr-panel" id="crPanelPrep"><div class="cr-card"><div class="cr-section-title"><span>检查前准备清单</span><span class="cr-section-sub">可勾选</span></div><div class="cr-check-list" id="crPrepList"></div></div><div class="cr-warning">提示：本页面只做产检提醒和准备清单，不替代医生诊疗意见；实际项目、是否空腹和检查频率以建档医院安排为准。</div></div>
        <div class="cr-panel" id="crPanelMap"><div class="cr-card"><div class="cr-section-title"><span>整个孕期产检地图</span><span class="cr-section-sub" id="crDoneText">-</span></div><div class="cr-timeline" id="crTimeline"></div></div><div class="cr-warning" id="crMissWarning">设置孕周后，将自动提示当前阶段是否有可能漏检的项目。</div></div>
        <div class="cr-panel" id="crPanelRecord"><div class="cr-card"><div class="cr-section-title"><span>预约记录</span><span class="cr-section-sub">可手动记录</span></div><div class="cr-record-list" id="crRecords"></div></div></div>
        <div class="cr-note">产检时间存在医院差异，请以医生和建档医院安排为准。</div>
      </div>
      <div class="cr-detail-page" id="crDetailPage" aria-hidden="true">
        <div class="cr-detail-top"><button class="cr-back" id="crDetailClose" type="button">←</button><div class="cr-detail-title" id="crDetailTitle">产检详情</div><span class="cr-detail-placeholder"></span></div>
        <div class="cr-detail-body" id="crDetailBody"></div>
      </div>
    </div>`;
  }
  function render(){
    const s=calc();
    const lmp=s.lmp,due=s.due;
    if($('#crLmp'))$('#crLmp').value=s.lmp?fmt(s.lmp):(s.lmp?fmt(s.lmp):state().lmp||'');
    if($('#crDue'))$('#crDue').value=s.due?fmt(s.due):(state().due||'');
    const list=items(lmp); const next=lmp?nextItem(list):null; const now=today();
    $('#crWeek') && ($('#crWeek').textContent=lmp?`🌸 ${curWeek(lmp)}`:'🌸 未设置孕周');
    if(!lmp||!next){
      ['crNextName','crCountdown','crRange','crFasting','crDuration','crWhy','crWhen','crLevel'].forEach(id=>{const el=$('#'+id); if(el) el.textContent=id==='crNextName'?'请先设置末次月经或预产期':'-'});
      if($('#crProcess'))$('#crProcess').innerHTML=''; if($('#crPrepList'))$('#crPrepList').innerHTML='<div class="cr-record-empty">设置孕周后显示准备清单</div>'; if($('#crTimeline'))$('#crTimeline').innerHTML='<div class="cr-record-empty">设置孕周后生成孕期产检地图</div>'; return;
    }
    const days=Math.ceil((next.date-now)/MS_DAY); const done=list.filter(x=>x.date<now).length;
    $('#crNextName').textContent=next.name; $('#crCountdown').textContent=days>0?`${fmt(next.date)}｜还有 ${days} 天`:days===0?`${fmt(next.date)}｜今天记得产检`:`${fmt(next.date)}｜建议按医嘱复查`;
    $('#crRange').textContent=next.range; $('#crFasting').textContent=next.fasting; $('#crDuration').textContent=next.duration; $('#crWhy').textContent=next.why; $('#crWhen').textContent=`预计 ${fmt(next.date)}，${next.range}`; $('#crLevel').textContent=`重要程度 ${next.level}`;
    $('#crProcess').innerHTML=next.flow.map((t,i)=>`<div class="cr-process-item"><div class="cr-num">${i+1}</div><div><div class="cr-process-title">${t}</div><div class="cr-process-text">按医院现场流程执行，遇到排队或胎位不佳需耐心等待。</div></div></div>`).join('');
    const checked=s.checked||{};
    $('#crPrepList').innerHTML=next.prep.map((p,i)=>{const key=next.id+'_'+i;return `<label class="cr-check"><input type="checkbox" data-cr-check="${key}" ${checked[key]?'checked':''}><div class="cr-check-main"><div class="cr-check-title">${p[0]}</div><div class="cr-check-desc">${p[1]}</div></div><span class="cr-tag ${p[2]==='must'?'must':'ready'}">${p[2]==='must'?'必须':'可准备'}</span></label>`}).join('');
    $('#crDoneText').textContent=`已过 ${done} 项 / 共 ${list.length} 项`;
    $('#crTimeline').innerHTML=list.map(x=>{const isDone=x.date<now, isCur=x.id===next.id;return `<button class="cr-tl-item ${isDone?'done':''} ${isCur?'current':''}" type="button" data-cr-detail="${x.id}"><div class="cr-tl-dot">${isDone?'✓':isCur?'!':'•'}</div><div class="cr-tl-body"><div class="cr-tl-top"><div class="cr-tl-name">${x.name}</div><div class="cr-tl-week">${x.range}</div></div><div class="cr-tl-desc">预计：${fmt(x.date)}｜${x.why}</div><div class="cr-tl-more">点击查看图片、视频、详细说明与注意事项 ›</div></div></button>`}).join('');
    const possibleMiss=list.filter(x=>x.date<now && now-x.date<35*MS_DAY).slice(-2);
    $('#crMissWarning').textContent=possibleMiss.length?`漏检提醒：若 ${possibleMiss.map(x=>x.name).join('、')} 尚未完成，建议尽快咨询建档医院。`:'当前没有明显漏检提示。';
    renderRecords();
  }

  function openDetail(id){
    const item=schedule.find(x=>x.id===id); if(!item)return;
    const page=$('#crDetailPage'), body=$('#crDetailBody'); if(!page||!body)return;
    $('#crDetailTitle').textContent=item.name;
    body.innerHTML=`
      <div class="cr-detail-hero"><div class="cr-detail-emoji">${item.hero||'🏥'}</div><div><div class="cr-detail-name">${item.name}</div><div class="cr-detail-range">${item.range}｜${item.level||''}</div></div></div>
      <div class="cr-media-card"><div class="cr-media-label">图片预留区</div><div class="cr-image-slot" data-image-path="${item.image||''}"><div class="cr-slot-emoji">${item.hero||'🖼️'}</div><div class="cr-slot-text">后期替换图片：${item.image||'assets/media/checkup/xxx.jpg'}</div></div></div>
      <div class="cr-media-card"><div class="cr-media-label">视频预留区</div><div class="cr-video-slot" data-video-path="${item.video||''}"><div class="cr-slot-emoji">▶</div><div class="cr-slot-text">后期替换视频：${item.video||'assets/media/checkup/xxx.mp4'}</div></div></div>
      <div class="cr-detail-card"><div class="cr-detail-card-title">检查说明</div><p>${item.summary||item.why}</p><p>${item.detail||''}</p></div>
      <div class="cr-detail-card"><div class="cr-detail-card-title">检查前准备</div><div class="cr-detail-prep">${(item.prep||[]).map(p=>`<div class="cr-detail-prep-item"><span class="cr-tag ${p[2]==='must'?'must':'ready'}">${p[2]==='must'?'必须':'可准备'}</span><div><b>${p[0]}</b><small>${p[1]}</small></div></div>`).join('')}</div></div>
      <div class="cr-detail-card"><div class="cr-detail-card-title">检查流程</div><div class="cr-process">${(item.flow||[]).map((t,i)=>`<div class="cr-process-item"><div class="cr-num">${i+1}</div><div><div class="cr-process-title">${t}</div><div class="cr-process-text">按建档医院现场安排执行。</div></div></div>`).join('')}</div></div>
      <div class="cr-detail-card"><div class="cr-detail-card-title">注意事项</div><ul class="cr-note-list">${(item.notes||[]).map(n=>`<li>${n}</li>`).join('')}</ul></div>
      <div class="cr-warning">${item.mediaTip||'图片和视频均已预留位置，后期可替换为真实素材。'} 实际检查项目和时间以医生及医院安排为准。</div>
    `;
    page.classList.add('active'); page.setAttribute('aria-hidden','false');
  }
  function closeDetail(){const page=$('#crDetailPage'); if(page){page.classList.remove('active');page.setAttribute('aria-hidden','true')}}

  function renderRecords(){const s=state();const arr=s.records||[]; const box=$('#crRecords'); if(!box)return; box.innerHTML=arr.length?arr.map((r,i)=>`<div class="cr-record"><div><div class="cr-record-title">${r.name}</div><div class="cr-record-desc">${r.date}｜${r.hospital||'未填写医院'}｜${r.time||'未填写时间'}</div></div><button class="cr-action secondary" style="padding:8px 10px;flex:0" data-del-record="${i}" type="button">删除</button></div>`).join(''):'<div class="cr-record-empty">暂无预约记录，点击“记录预约”可添加下一次产检。</div>'}
  function saveDates(){const s=state();let lmp=$('#crLmp')?.value||'',due=$('#crDue')?.value||''; if(!lmp&&due)lmp=fmt(add(parse(due),-280)); if(!due&&lmp)due=fmt(add(parse(lmp),280)); s.lmp=lmp;s.due=due;save(s);render(); if(window.showToast)showToast('产检提醒已生成')}
  function open(){inject(); render(); $('#checkupReminderPage')?.classList.add('active'); document.body.style.overflow='hidden';}
  function close(){ $('#checkupReminderPage')?.classList.remove('active'); document.body.style.overflow='';}
  function downloadICS(){const s=calc(); if(!s.lmp){alert('请先设置末次月经或预产期');return} const n=nextItem(items(s.lmp)); const start=fmt(n.date).replaceAll('-',''); const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${n.name}\nDTSTART;VALUE=DATE:${start}\nDESCRIPTION:${n.range} ${n.why}\nEND:VEVENT\nEND:VCALENDAR`; const blob=new Blob([ics],{type:'text/calendar'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`${n.name}.ics`; a.click(); URL.revokeObjectURL(a.href);}
  function addRecord(){const s=calc(); if(!s.lmp){alert('请先设置末次月经或预产期');return} const n=nextItem(items(s.lmp)); const hospital=prompt('填写预约医院（可留空）',''); const time=prompt('填写预约时间（如 09:00，可留空）',''); const st=state(); st.records=st.records||[]; st.records.unshift({name:n.name,date:fmt(n.date),hospital:hospital||'未填写医院',time:time||'未填写时间'}); save(st); renderRecords(); document.querySelector('[data-cr-tab="record"]')?.click();}
  document.addEventListener('DOMContentLoaded',function(){
    inject(); render();
    document.addEventListener('click',function(e){const t=e.target.closest('[data-tool="remind"],[data-tool="checkup-reminder"]'); if(t){e.preventDefault();e.stopImmediatePropagation();open();}},true);
    document.addEventListener('click',function(e){
      if(e.target.closest('#crClose')) close();
      if(e.target.closest('#crDetailClose')) closeDetail();
      if(e.target.closest('#crSave')) saveDates();
      if(e.target.closest('#crSmart')) { const w=prompt('输入当前孕周数字，例如 24'); const num=parseInt(w,10); if(num>0&&num<=42){const lmp=add(today(),-(num-1)*7); const st=state(); st.lmp=fmt(lmp); st.due=fmt(add(lmp,280)); save(st); render();} }
      const tab=e.target.closest('[data-cr-tab]'); if(tab){$all('.cr-tab').forEach(x=>x.classList.remove('active')); tab.classList.add('active'); $all('.cr-panel').forEach(x=>x.classList.remove('active')); $('#crPanel'+tab.dataset.crTab.charAt(0).toUpperCase()+tab.dataset.crTab.slice(1))?.classList.add('active');}
      const chk=e.target.closest('[data-cr-check]'); if(chk){const st=state(); st.checked=st.checked||{}; st.checked[chk.dataset.crCheck]=chk.checked; save(st);}
      if(e.target.closest('#crAddCalendar')) downloadICS();
      if(e.target.closest('#crAddRecord')) addRecord();
      const detail=e.target.closest('[data-cr-detail]'); if(detail){openDetail(detail.dataset.crDetail);}
      const del=e.target.closest('[data-del-record]'); if(del){const st=state(); st.records=st.records||[]; st.records.splice(+del.dataset.delRecord,1); save(st); renderRecords();}
    });
  });
  window.openCheckupReminderPage=open;
})();
