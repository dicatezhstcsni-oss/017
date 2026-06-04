// 音乐天地外部资源配置
// 说明：
// 1. cover 可先用 emoji，后期改为 assets/media/xxx.jpg 或外链图片。
// 2. url 可替换为稳定 mp3/ogg 外链或本地 assets/media/xxx.mp3。
// 3. count 不需要手写，页面会按 items.length 自动生成“共XX张专辑”。
// 4. 热门胎教 TOP20 按常见胎教/舒缓古典曲目整理，并优先筛选 Internet Archive/Musopen 等可外链公共资源。
window.PRENATAL_MUSIC_LIBRARY = [
  {
    group: '热门胎教 TOP20',
    key: 'top20',
    desc: '常见胎教榜单高频曲目，优先使用可外链公共音频资源。',
    items: [
      { title: '小星星变奏曲', artist: 'Mozart', emoji: '⭐', mood: '启蒙轻听', plays: '999万+', url: 'https://archive.org/download/BELullabyClassics/01.%20Variations%20%28Twinkle%2C%20Twinkle%29%20K265%20%2C%20K300e%2C%20Mozart.mp3', source: 'Internet Archive' },
      { title: 'G大调小步舞曲', artist: 'Bach', emoji: '🎹', mood: '古典入门', plays: '873万+', url: 'https://archive.org/download/BELullabyClassics/02.%20Minuet%20in%20G%20from%20Anna%20Magdalena%2C%20Bach.mp3', source: 'Internet Archive' },
      { title: 'C大调奏鸣曲 K545', artist: 'Mozart', emoji: '🎼', mood: '明亮舒缓', plays: '821万+', url: 'https://archive.org/download/BELullabyClassics/03.%20Piano%20Sonata%20in%20C%2C%20K%20545%2C%20Mozart.mp3', source: 'Internet Archive' },
      { title: '春之歌', artist: 'Mendelssohn', emoji: '🌸', mood: '午后放松', plays: '799万+', url: 'https://archive.org/download/BELullabyClassics/04.%20Spring%20Song%2C%20Mendelssohn.mp3', source: 'Internet Archive' },
      { title: 'D大调奏鸣曲 K576', artist: 'Mozart', emoji: '🌤️', mood: '轻快不刺激', plays: '752万+', url: 'https://archive.org/download/BELullabyClassics/05.%20Piano%20Sonata%20in%20D%2C%20K%20576%2C%20Mozart.mp3', source: 'Internet Archive' },
      { title: '耶稣，人类喜悦之源', artist: 'Bach', emoji: '🕊️', mood: '稳定情绪', plays: '720万+', url: 'https://archive.org/download/BELullabyClassics/06.%20Jesu%2C%20Joy%20of%20Man%27s%20Desiring%2C%20Bach.mp3', source: 'Internet Archive' },
      { title: 'D大调卡农', artist: 'Pachelbel', emoji: '💧', mood: '睡前放松', plays: '999万+', url: 'https://archive.org/download/BELullabyClassics/07.%20Canon%2C%20Pachebel.mp3', source: 'Internet Archive' },
      { title: '伏尔塔瓦河', artist: 'Smetana', emoji: '🌊', mood: '自然流动感', plays: '579万+', url: 'https://archive.org/download/BELullabyClassics/08.%20The%20Moldau%2C%20Smetana.mp3', source: 'Internet Archive' },
      { title: '月光奏鸣曲', artist: 'Beethoven', emoji: '🌙', mood: '夜间安睡', plays: '628万+', url: 'https://archive.org/download/BELullabyClassics/10.%20Sonata%20No.%2014%20%28Moonlight%29%2C%20Beethoven.mp3', source: 'Internet Archive' },
      { title: '致爱丽丝', artist: 'Beethoven', emoji: '🎀', mood: '经典旋律', plays: '799万+', url: 'https://archive.org/download/BELullabyClassics/12.%20F%C3%BCr%20Elise%2C%20WoO%2059%2C%20Beethoven.mp3', source: 'Internet Archive' },
      { title: '四季·冬', artist: 'Vivaldi', emoji: '❄️', mood: '轻听版本', plays: '713万+', url: 'https://archive.org/download/BELullabyClassics/13.%20The%20Four%20Seasons%2C%20Winter%2C%20Vivaldi.mp3', source: 'Internet Archive' },
      { title: 'G弦上的咏叹调', artist: 'Bach', emoji: '🎻', mood: '温和舒缓', plays: '761万+', url: 'https://archive.org/download/BELullabyClassics/14.%20Orchestral%20Suite%20No.%203%20In%20D%20BWV%201068%2C%20Bach.mp3', source: 'Internet Archive' },
      { title: '摇篮曲', artist: 'Brahms', emoji: '🛏️', mood: '睡前安抚', plays: '999万+', url: 'https://archive.org/download/BELullabyClassics/09.%20Lullaby%2C%20Brahms.mp3', source: 'Internet Archive' },
      { title: '天鹅湖选段', artist: 'Tchaikovsky', emoji: '🦢', mood: '优雅舒缓', plays: '697万+', url: '', source: '待替换外链' },
      { title: '蓝色多瑙河', artist: 'Strauss', emoji: '💙', mood: '轻快圆舞曲', plays: '680万+', url: '', source: '待替换外链' },
      { title: '梦幻曲', artist: 'Schumann', emoji: '☁️', mood: '柔和安静', plays: '612万+', url: '', source: '待替换外链' },
      { title: '晨曲', artist: 'Grieg', emoji: '🌅', mood: '清晨唤醒', plays: '590万+', url: '', source: '待替换外链' },
      { title: '圣母颂', artist: 'Schubert', emoji: '🕯️', mood: '平静陪伴', plays: '566万+', url: '', source: '待替换外链' },
      { title: '降E大调夜曲', artist: 'Chopin', emoji: '🌌', mood: '夜间轻听', plays: '552万+', url: '', source: '待替换外链' },
      { title: '睡美人圆舞曲', artist: 'Tchaikovsky', emoji: '👑', mood: '梦幻舒缓', plays: '520万+', url: '', source: '待替换外链' }
    ]
  },
  {
    group: '舒缓轻音乐',
    key: 'soft',
    items: [
      { title: '春之歌', artist: 'Mendelssohn', emoji: '🌸', mood: '放松', plays: '376万+', url: 'https://archive.org/download/BELullabyClassics/04.%20Spring%20Song%2C%20Mendelssohn.mp3', source: 'Internet Archive' },
      { title: 'D大调卡农', artist: 'Pachelbel', emoji: '💧', mood: '睡前', plays: '761万+', url: 'https://archive.org/download/BELullabyClassics/07.%20Canon%2C%20Pachebel.mp3', source: 'Internet Archive' },
      { title: '月光奏鸣曲', artist: 'Beethoven', emoji: '🌙', mood: '安睡', plays: '628万+', url: 'https://archive.org/download/BELullabyClassics/10.%20Sonata%20No.%2014%20%28Moonlight%29%2C%20Beethoven.mp3', source: 'Internet Archive' }
    ]
  },
  {
    group: '大自然胎教',
    key: 'nature',
    items: [
      { title: '轻雨白噪音', artist: '可替换资源', emoji: '🌧️', mood: '睡前陪伴', plays: '251万+', url: '', source: '本地占位' },
      { title: '森林风声', artist: '可替换资源', emoji: '🌲', mood: '冥想休息', plays: '190万+', url: '', source: '本地占位' },
      { title: '海浪呼吸', artist: '可替换资源', emoji: '🌊', mood: '放松解压', plays: '330万+', url: '', source: '本地占位' }
    ]
  },
  {
    group: '胎教儿歌',
    key: 'kidsong',
    items: [
      { title: '小星星变奏曲', artist: 'Mozart', emoji: '⭐', mood: '启蒙', plays: '999万+', url: 'https://archive.org/download/BELullabyClassics/01.%20Variations%20%28Twinkle%2C%20Twinkle%29%20K265%20%2C%20K300e%2C%20Mozart.mp3', source: 'Internet Archive' },
      { title: '摇篮曲', artist: 'Brahms', emoji: '🛏️', mood: '睡前', plays: '999万+', url: 'https://archive.org/download/BELullabyClassics/09.%20Lullaby%2C%20Brahms.mp3', source: 'Internet Archive' },
      { title: 'G大调小步舞曲', artist: 'Bach', emoji: '🎹', mood: '轻松', plays: '792万+', url: 'https://archive.org/download/BELullabyClassics/02.%20Minuet%20in%20G%20from%20Anna%20Magdalena%2C%20Bach.mp3', source: 'Internet Archive' }
    ]
  },
  {
    group: '胎教故事',
    key: 'story',
    items: [
      { title: '小月姐姐睡前故事', artist: '可替换资源', emoji: '🌙', mood: '睡前故事', plays: '713万+', url: '', source: '本地占位' },
      { title: '温柔动物故事', artist: '可替换资源', emoji: '🦦', mood: '轻柔陪伴', plays: '579万+', url: '', source: '本地占位' },
      { title: '小太阳的胎教故事', artist: '可替换资源', emoji: '☀️', mood: '亲子陪伴', plays: '628万+', url: '', source: '本地占位' }
    ]
  },
  {
    group: '爸妈原声讲故事',
    key: 'parent-voice',
    type: 'voiceClone',
    items: [
      { title: '复制妈妈声音', artist: '流程演示', emoji: '👩‍🍼', mood: '第1步：录入声音', plays: '体验', url: '', source: '流程占位' },
      { title: '复制爸爸声音', artist: '流程演示', emoji: '👨‍🍼', mood: '第1步：录入声音', plays: '体验', url: '', source: '流程占位' },
      { title: '替换故事语音', artist: '流程演示', emoji: '📖', mood: '第2步：选择故事并替换声音', plays: '体验', url: '', source: '流程占位' }
    ]
  },
  {
    group: '妈妈知道',
    key: 'mom-know',
    items: [
      { title: '孕期音乐怎么听', artist: '知识卡片', emoji: '🎧', mood: '控制音量和时长', plays: '284万+', url: '', source: '图文占位' },
      { title: '什么时候开始胎教', artist: '知识卡片', emoji: '🤰', mood: '常见从胎动明显后开始', plays: '490万+', url: '', source: '图文占位' },
      { title: '亲子关系每日胎教', artist: '知识卡片', emoji: '💗', mood: '沟通陪伴', plays: '678万+', url: '', source: '图文占位' }
    ]
  }
];
