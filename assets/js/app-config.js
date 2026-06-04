// 首页工具与内容模块配置文件
// 后期新增/删除工具、替换图片/视频，优先改这里，不需要改 index.html。
window.APP_CONFIG = {
  tools: [
    { id: 'weight', label: '体重记录', icon: 'assets/icons/pastel3d/weight.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'checkup', label: '产检表', icon: 'assets/icons/pastel3d/checkup.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'kick', label: '数胎动', icon: 'assets/icons/pastel3d/fetal-move.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'food', label: '能不能吃', icon: 'assets/icons/pastel3d/nutrition.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'music', label: '音乐天地', icon: 'assets/icons/pastel3d/music.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'calendar', label: '孕期日历', icon: 'assets/icons/pastel3d/calendar.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'bag', label: '待产包', icon: 'assets/icons/pastel3d/hospital-bag.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'remind', label: '产检提醒', icon: 'assets/icons/pastel3d/reminder.svg', action: 'tool', enabled: true, fixed: false },
    { id: 'panorama', label: '全景导览', icon: 'assets/icons/pastel3d/hospital-map.svg', action: 'panorama', enabled: true, fixed: false },
    { id: 'expert-course', label: '专家课程', icon: 'assets/icons/pastel3d/course.svg', action: 'module', enabled: true, fixed: false },
    { id: 'encyclopedia', label: '孕育百科', icon: 'assets/icons/pastel3d/encyclopedia.svg', action: 'module', enabled: true, fixed: false },
    { id: 'treasure-tips', label: '百宝锦囊', icon: 'assets/icons/pastel3d/tips.svg', action: 'module', enabled: true, fixed: false }
  ],
  modules: {
    'expert-course': {
      title: '专家课程',
      subtitle: '可放置医生课程、直播回放、孕妇课堂视频',
      cover: 'assets/media/expert-course-cover.jpg',
      video: 'assets/media/expert-course-demo.mp4',
      items: [
        { title: '孕早期营养与产检重点', desc: '建议后期替换为真实专家视频或医院课程链接。', tag: '课程' },
        { title: '孕晚期分娩准备课', desc: '支持视频、图片、图文说明扩展。', tag: '课堂' }
      ]
    },
    'encyclopedia': {
      title: '孕育百科',
      subtitle: '按孕周、产检、营养、护理分类维护百科内容',
      cover: 'assets/media/encyclopedia-cover.jpg',
      items: [
        { title: '孕周知识', desc: '每周胎儿发育、妈妈变化、注意事项。', tag: '孕周' },
        { title: '产检解读', desc: 'B 超、血常规、糖耐等常见检查说明。', tag: '产检' }
      ]
    },
    'treasure-tips': {
      title: '孕产百宝锦囊',
      subtitle: '官方链接、医院服务、APP、小程序与视频教程的一站式导航',
      cover: 'assets/media/treasure-tips-cover.jpg',
      stages: [
        { id: 'all', label: '全部' },
        { id: 'prepare', label: '备孕期' },
        { id: 'early', label: '孕早期' },
        { id: 'middle', label: '孕中期' },
        { id: 'late', label: '孕晚期' },
        { id: 'postpartum', label: '月子/育儿' },
        { id: 'urgent', label: '紧急' }
      ],
      quickCards: [
        { icon: '🏥', title: '医院入口', desc: '建档、挂号、缴费、报告、院内路线' },
        { icon: '📱', title: '常用APP', desc: '孕周记录、问诊、饮食、育儿工具' },
        { icon: '🎓', title: '孕妇课堂', desc: '分娩、母乳、新生儿护理课程' },
        { icon: '🚨', title: '紧急处理', desc: '破水、出血、胎动异常优先线下' }
      ],
      resources: [
        {
          name: '本地妇幼保健院 / 产科医院官方入口', icon: '🏥', type: '线下+公众号+小程序', scene: '建档产检', rating: 5,
          intro: '孕期最重要的本地就医入口，适合处理建档、挂号、B超、胎监、住院和分娩路线。',
          stages: ['prepare','early','middle','late','postpartum','urgent'], keywords: ['建档','挂号','B超','唐筛','无创DNA','分娩','住院','胎监','产科'],
          what: { background: '当地妇幼保健院、综合医院产科或合作医院官方服务入口。', services: '预约挂号、建档说明、缴费、报告查询、产科门诊、住院须知、院内导航。', free: '部分服务免费，挂号/检查按医院收费', needAppointment: '多数产检和专家号需要预约', conditions: '按医院要求准备身份证、医保卡、既往检查资料、孕产妇保健手册等。' },
          problems: ['建档','挂号','B超','唐筛','无创DNA','分娩','月子','儿保'],
          features: [
            { name: '建档流程查询', intro: '查看建档时间、所需材料、检查项目和科室位置。', stage: '孕早期', rating: 5 },
            { name: '产检预约与报告查询', intro: '完成挂号、缴费、检查报告查询，减少窗口排队。', stage: '孕早期-孕晚期', rating: 5 },
            { name: '医院VR导览联动', intro: '后期可接入你的720全景模块，展示停车场、产科门诊、B超室、胎监室、病房路线。', stage: '全孕期', rating: 5 }
          ],
          people: ['备孕期','孕早期','孕中期','孕晚期','月子期','0-1岁宝宝'],
          steps: ['搜索并关注目标医院官方公众号或小程序。','进入“就医服务/智慧医院/互联网医院”入口。','选择产科、妇科、儿保或新生儿科。','根据提示预约挂号、查看建档材料或查询报告。','如已接入院内VR导览，可点击路线查看具体位置。'],
          notes: ['不同医院建档时间、材料和检查顺序不同，以医院官方通知为准。','产检高峰期建议提前预约。','急诊、破水、出血、胎动异常不要只在线查询，应直接联系产科或急诊。'],
          reasons: ['最贴近真实就医场景，是孕产妇最常用、最刚需的入口。','可与应用内“医院全景导览”深度结合，形成差异化功能。','后期适合接入合作医院，做成地区孕产服务导航。'],
          entry: { website: '预留：填写合作医院官网', app: '预留：医院官方APP或区域健康APP', miniProgram: '预留：医院微信小程序名称', wechat: '预留：医院官方公众号', phone: '预留：产科门诊/导诊电话', address: '预留：医院地址' }
        },
        {
          name: '国家政务服务平台 / 地方医保与生育服务', icon: '🏛️', type: '官方网站+小程序', scene: '医保政策', rating: 5,
          intro: '用于查询生育登记、医保报销、生育津贴、出生医学证明等政策类事项。',
          stages: ['prepare','early','late','postpartum'], keywords: ['医保','生育津贴','出生证明','报销','生育登记','产假'],
          what: { background: '国家及地方政务服务、医保服务平台。', services: '医保电子凭证、生育登记、办事指南、材料清单、部分地区线上办理。', free: true, needAppointment: '线上查询通常不需要，线下办理按当地要求', conditions: '需要实名登录，部分事项需身份证、医保信息、结婚证、出生医学证明等材料。' },
          problems: ['建档','分娩','月子','育儿','疫苗','儿保'],
          features: [
            { name: '生育登记与办事指南', intro: '查询办理条件、办理材料、办理地点和线上入口。', stage: '备孕期-孕早期', rating: 5 },
            { name: '医保报销与生育津贴', intro: '查看医保参保、报销政策、生育津贴申领路径。', stage: '孕晚期-产后', rating: 5 },
            { name: '出生相关事项', intro: '辅助查询出生医学证明、户籍、医保参保等事项路径。', stage: '产后育儿', rating: 4 }
          ],
          people: ['备孕期','孕早期','孕晚期','月子期','0-1岁宝宝'],
          steps: ['打开国家政务服务平台或本地政务/医保小程序。','实名登录并定位所在城市。','搜索“生育登记”“生育津贴”“医保报销”“出生医学证明”。','查看办理条件、材料清单和办理入口。','把本地入口收藏到百宝锦囊，方便产后办理。'],
          notes: ['政策具有地区差异，务必以当地页面为准。','涉及报销和津贴时，注意材料保存，例如发票、费用清单、出院记录。','不确定时建议咨询单位人事、医保窗口或政务热线。'],
          reasons: ['解决孕产妇最容易遗漏的政策和报销问题。','官方入口权威，适合放入百宝锦囊作为政策导航。','与医院入口结合后，可形成从产检到报销的完整闭环。'],
          entry: { website: 'https://gjzwfw.www.gov.cn/', app: '国家政务服务平台/地方医保APP', miniProgram: '国家政务服务平台小程序/地方医保小程序', wechat: '当地医保、政务服务公众号', phone: '12345 或当地医保咨询电话', address: '当地政务服务中心/医保服务窗口' }
        },
        {
          name: '丁香妈妈 / 丁香医生', icon: '🌿', type: 'APP+公众号', scene: '科普问诊', rating: 5,
          intro: '适合查看孕期、育儿、用药、儿科问题的医学科普，也可作为非急症线上咨询入口。',
          stages: ['prepare','early','middle','late','postpartum','urgent'], keywords: ['问诊','科普','产检','用药','儿科','疫苗','黄疸','发热'],
          what: { background: '面向大众健康科普和在线医疗咨询的平台。', services: '医学科普、孕育知识、儿科问题、用药咨询、在线问诊等。', free: '科普内容部分免费，问诊等服务通常收费', needAppointment: '阅读内容不需要，问诊需按平台流程选择医生/服务', conditions: '需要手机注册；问诊时需准确填写孕周、症状、检查结果。' },
          problems: ['B超','唐筛','无创DNA','月子','育儿','疫苗','儿保'],
          features: [
            { name: '孕育科普查询', intro: '查询孕周变化、产检项目、常见不适和育儿知识。', stage: '全阶段', rating: 5 },
            { name: '妇产/儿科咨询', intro: '非急症问题可先做线上咨询分流。', stage: '孕期-育儿期', rating: 4 },
            { name: '用药与症状解释', intro: '辅助了解孕期/哺乳期用药注意事项和儿童常见症状。', stage: '孕期-产后', rating: 5 }
          ],
          people: ['备孕期','孕早期','孕中期','孕晚期','月子期','0-1岁宝宝','1-3岁宝宝'],
          steps: ['下载APP或关注公众号。','搜索关键词，例如“唐筛”“无创DNA”“黄疸”“发热”。','阅读科普内容，记录关键注意事项。','如需要问诊，准备孕周、症状、检查报告、用药信息。','若出现急症信号，立即转线下医院。'],
          notes: ['线上科普不能替代医生面诊。','涉及孕期用药、儿童发热、黄疸等情况，要结合线下医生建议。','急症不要等待线上回复。'],
          reasons: ['医学内容体系较完整，适合放入“查知识、问问题”的入口。','覆盖孕期和育儿两端，适合长期使用。','可与应用内百科、能不能吃、疫苗提醒形成互补。'],
          entry: { website: 'https://dxy.com/', app: '丁香医生 / 丁香妈妈', miniProgram: '预留：微信内搜索', wechat: '丁香妈妈 / 丁香医生', phone: '预留', address: '线上服务' }
        },
        {
          name: '好大夫在线', icon: '👩‍⚕️', type: 'APP+网站', scene: '找医生问诊', rating: 4,
          intro: '适合查找医生、了解医院科室方向，并进行非急症图文或电话咨询。',
          stages: ['prepare','early','middle','late','postpartum','urgent'], keywords: ['找医生','问诊','复诊','妇产科','儿科','专家'],
          what: { background: '面向患者找医生和在线咨询的互联网医疗平台。', services: '医生检索、线上问诊、复诊咨询、病情资料整理。', free: '医生信息查询部分免费，咨询服务多为收费', needAppointment: '线上咨询需选择医生和服务类型', conditions: '需要注册账号并准备病情描述、检查报告、图片资料。' },
          problems: ['挂号','唐筛','无创DNA','分娩','育儿','儿保'],
          features: [
            { name: '按医院/科室找医生', intro: '适合查找妇产科、儿科、新生儿科等医生信息。', stage: '全阶段', rating: 4 },
            { name: '线上咨询', intro: '非急症问题可上传报告进行图文咨询。', stage: '全阶段', rating: 4 },
            { name: '复诊沟通', intro: '适合复诊、报告解读、治疗后随访咨询。', stage: '孕期-育儿期', rating: 4 }
          ],
          people: ['备孕期','孕早期','孕中期','孕晚期','月子期','0-1岁宝宝','1-3岁宝宝'],
          steps: ['打开好大夫在线APP或网站。','搜索医院、科室或医生姓名。','查看医生擅长方向和服务方式。','整理问题、症状、检查报告后发起咨询。','医生建议线下就诊时，及时去医院。'],
          notes: ['线上问诊适合非急症分流，不适合抢救和紧急情况。','问题描述越清楚，医生越容易判断。','涉及产科急症、儿童高热惊厥等情况，应立即线下就医。'],
          reasons: ['适合解决“该找哪个医生、该去哪个科”的问题。','对报告咨询和复诊沟通有实际帮助。','可作为百宝锦囊中的“医生资源入口”。'],
          entry: { website: 'https://www.haodf.com/', app: '好大夫在线', miniProgram: '预留：微信内搜索', wechat: '好大夫在线', phone: '预留', address: '线上服务' }
        },
        {
          name: '美柚', icon: '🌸', type: 'APP', scene: '备孕孕周记录', rating: 4,
          intro: '适合记录经期、排卵期、备孕状态和孕周变化，偏日常工具与社区交流。',
          stages: ['prepare','early','middle','late'], keywords: ['月经','排卵','备孕','孕周','社区','记录'],
          what: { background: '女性健康与孕育记录类APP。', services: '经期记录、排卵期预测、备孕管理、孕周提醒、社区内容。', free: '基础功能通常免费，部分增值服务可能收费', needAppointment: false, conditions: '需要填写经期、末次月经、孕周等基础信息。' },
          problems: ['建档','B超','唐筛','无创DNA','分娩'],
          features: [
            { name: '经期与排卵记录', intro: '辅助备孕期判断易孕窗口。', stage: '备孕期', rating: 4 },
            { name: '孕周提醒', intro: '根据末次月经或预产期推算孕周事项。', stage: '孕早期-孕晚期', rating: 4 },
            { name: '孕妈社区', intro: '查看同阶段经验，但需注意甄别。', stage: '全孕期', rating: 3 }
          ],
          people: ['备孕期','孕早期','孕中期','孕晚期'],
          steps: ['下载APP并选择备孕或怀孕状态。','填写末次月经、周期长度或预产期。','查看当日提示、孕周任务和产检提醒。','将重要事项同步到本应用的产检提醒或孕期日历。'],
          notes: ['排卵预测只能作为参考。','社区经验不等同于医学建议。','月经不规律或备孕困难时，建议线下就诊。'],
          reasons: ['适合日常记录和备孕管理。','与本应用“好孕计划”“孕期日历”功能方向一致。','可作为百宝锦囊中面向用户习惯的常用APP入口。'],
          entry: { website: 'https://www.meiyou.com/', app: '美柚', miniProgram: '预留', wechat: '预留', phone: '预留', address: '线上服务' }
        },
        {
          name: '宝宝树孕育', icon: '🍼', type: 'APP+社区', scene: '孕育社区', rating: 4,
          intro: '适合查看孕周变化、育儿经验、母婴社区和宝宝成长内容。',
          stages: ['prepare','early','middle','late','postpartum'], keywords: ['孕周','胎儿发育','育儿','社区','宝宝'],
          what: { background: '母婴孕育内容与社区平台。', services: '孕周知识、育儿内容、妈妈社区、母婴消费参考。', free: '基础内容通常免费，部分服务可能收费', needAppointment: false, conditions: '需要设置备孕/怀孕/育儿阶段信息。' },
          problems: ['B超','唐筛','分娩','月子','育儿','疫苗','儿保'],
          features: [
            { name: '胎儿发育与妈妈变化', intro: '按孕周查看发育变化和注意事项。', stage: '孕期', rating: 4 },
            { name: '育儿内容', intro: '覆盖喂养、睡眠、护理、成长发育等。', stage: '产后育儿', rating: 4 },
            { name: '同阶段交流', intro: '适合查看同孕周或同龄宝宝经验。', stage: '全阶段', rating: 3 }
          ],
          people: ['备孕期','孕早期','孕中期','孕晚期','月子期','0-1岁宝宝','1-3岁宝宝'],
          steps: ['下载APP并选择当前阶段。','填写预产期或宝宝出生日期。','查看孕周/宝宝月龄内容。','收藏对自己有用的内容，并与医院建议核对。'],
          notes: ['社区内容需筛选，不建议照搬他人经验。','涉及疾病、用药、发育异常时应咨询医生。'],
          reasons: ['覆盖从怀孕到育儿的连续场景。','适合补充情绪支持和经验交流。','可作为百宝锦囊中的社区类入口。'],
          entry: { website: 'https://www.babytree.com/', app: '宝宝树孕育', miniProgram: '预留', wechat: '宝宝树孕育', phone: '预留', address: '线上服务' }
        },
        {
          name: '薄荷健康', icon: '🥗', type: 'APP', scene: '饮食营养体重', rating: 4,
          intro: '适合查询食物热量、营养成分，辅助孕期和产后体重管理。',
          stages: ['prepare','early','middle','late','postpartum'], keywords: ['饮食','热量','营养','体重','能不能吃','控糖'],
          what: { background: '饮食营养与体重管理工具。', services: '食物营养查询、饮食记录、体重记录、热量参考。', free: '基础查询通常免费，部分服务可能收费', needAppointment: false, conditions: '需要填写身高、体重、目标等基础信息。' },
          problems: ['B超','唐筛','无创DNA','月子','育儿'],
          features: [
            { name: '食物营养查询', intro: '查看热量、蛋白质、碳水、脂肪等信息。', stage: '全阶段', rating: 4 },
            { name: '孕期体重管理参考', intro: '辅助记录体重变化，与产检建议结合。', stage: '孕期', rating: 4 },
            { name: '产后饮食记录', intro: '帮助产后恢复期做饮食记录。', stage: '月子期', rating: 3 }
          ],
          people: ['备孕期','孕早期','孕中期','孕晚期','月子期'],
          steps: ['下载APP并设置基础资料。','搜索食物名称，查看营养成分。','记录每日饮食和体重。','孕期控糖、贫血、体重异常等情况，结合医生或营养师建议。'],
          notes: ['孕期不建议自行节食减重。','妊娠期糖尿病、贫血、高血压等情况需遵医嘱。','食物数据库仅做参考。'],
          reasons: ['可与应用内“能不能吃”“体重记录”形成联动。','适合解决孕期饮食焦虑。','后期可扩展为孕期营养专题。'],
          entry: { website: 'https://www.boohee.com/', app: '薄荷健康', miniProgram: '预留', wechat: '薄荷健康', phone: '预留', address: '线上服务' }
        },
        {
          name: '孕妇学校 / 医院产前课程', icon: '🎓', type: '线下+直播课', scene: '孕妈课堂', rating: 5,
          intro: '适合系统学习分娩准备、母乳喂养、新生儿护理和产后康复。',
          stages: ['early','middle','late','postpartum'], keywords: ['孕妇学校','分娩','母乳','待产包','新生儿护理','课程'],
          what: { background: '医院产科、妇幼保健院或专业机构开设的孕产课程。', services: '产检知识、分娩方式、镇痛分娩、母乳喂养、待产包、新生儿护理。', free: '医院公益课多为免费，部分精品课可能收费', needAppointment: '热门线下课通常需要预约', conditions: '按课程要求报名，部分课程建议家属共同参加。' },
          problems: ['分娩','月子','育儿','儿保'],
          features: [
            { name: '分娩准备课', intro: '了解入院流程、分娩信号、顺产/剖宫产基本流程。', stage: '孕晚期', rating: 5 },
            { name: '母乳喂养课', intro: '学习开奶、衔乳、涨奶、堵奶等常见问题处理。', stage: '孕晚期-月子期', rating: 5 },
            { name: '新生儿护理课', intro: '学习洗澡、脐带护理、拍嗝、黄疸观察等。', stage: '孕晚期-0-1岁', rating: 5 }
          ],
          people: ['孕早期','孕中期','孕晚期','月子期','0-1岁宝宝'],
          steps: ['关注目标医院产科或妇幼保健院公众号。','查找“孕妇学校/孕妈课堂/产前课程”。','选择适合孕周的课程并预约。','上课前准备产检资料和想问的问题。','课后把待办事项记录到应用中。'],
          notes: ['课程信息以医院官方发布为准。','临近预产期建议优先参加分娩和母乳课程。','线上课程适合补充学习，但线下实操更直观。'],
          reasons: ['能够降低分娩和育儿焦虑。','适合与医院合作资源结合。','可扩展为应用内“专家课程”的内容来源。'],
          entry: { website: '预留：医院课程页面', app: '预留：医院APP', miniProgram: '预留：医院孕妇学校小程序入口', wechat: '预留：医院产科/孕妇学校公众号', phone: '预留：孕妇学校电话', address: '预留：线下教室地址' }
        },
        {
          name: '120 / 医院急诊 / 产科急诊', icon: '🚑', type: '线下急救', scene: '紧急情况', rating: 5,
          intro: '出现破水、出血、胎动明显减少、剧烈腹痛、持续高热等危险信号时，优先联系医院或急救。',
          stages: ['urgent','early','middle','late','postpartum'], keywords: ['破水','见红','胎动减少','腹痛','发热','出血','急诊','120'],
          what: { background: '急救系统、医院急诊和产科急诊服务。', services: '急症评估、急救转运、产科急诊处理、住院分流。', free: '急救和诊疗按当地政策及医院收费', needAppointment: false, conditions: '出现危险信号时直接拨打120或前往急诊；尽量携带产检资料。' },
          problems: ['分娩','月子','育儿'],
          features: [
            { name: '孕期危险信号处理', intro: '破水、阴道出血、规律宫缩、剧烈腹痛、胎动明显异常。', stage: '孕期', rating: 5 },
            { name: '产后急症处理', intro: '产后大出血、严重头痛、胸闷气短、发热等。', stage: '月子期', rating: 5 },
            { name: '宝宝急症处理', intro: '呼吸困难、抽搐、持续高热、精神反应差等。', stage: '0-3岁', rating: 5 }
          ],
          people: ['孕早期','孕中期','孕晚期','月子期','0-1岁宝宝','1-3岁宝宝'],
          steps: ['判断是否存在危险信号。','立即联系产科急诊、医院总机或拨打120。','准备身份证、医保卡、孕产妇手册、近期检查报告。','不要自行长时间开车奔波，必要时等待急救。','到院后直接说明孕周、症状开始时间、胎动变化和既往病史。'],
          notes: ['胎动明显减少、阴道出血、破水、剧烈腹痛等不要只在网上搜索。','孕晚期去医院前尽量联系家属陪同。','宝宝精神差、呼吸异常、抽搐等情况也应及时急诊。'],
          reasons: ['明确告诉用户何时不能依赖线上工具。','提升应用安全边界，避免延误就医。','适合作为百宝锦囊中的固定置顶入口。'],
          entry: { website: '预留：目标医院急诊页面', app: '预留：医院APP急诊入口', miniProgram: '预留：医院小程序急诊导航', wechat: '预留：医院公众号', phone: '120 / 医院急诊电话预留', address: '预留：医院急诊/产科急诊地址' }
        }
      ]
    }
  }
};
