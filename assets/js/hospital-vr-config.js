/* 医院VR导览配置文件
 * 后期新增/修改医院，只改这里即可：
 * 1）复制一个 hospital 对象
 * 2）把 panorama、layoutScenes[*].pano/image/video 改成真实文件路径
 * 3）把 layoutScenes[*].hotspot 的 x/y 改成该医院该全景图上的按钮位置
 * 4）有真实全景图后，把 showHotspots 改为 true，即可显示图中悬浮热点
 */
window.HOSPITAL_VR_CONFIG = {
  showHotspots: false, // 当前无真实720图，默认隐藏热点；后期改 true 显示每家医院独立热点
  hospitals: [
    {
      id:'sd-wch', name:'山东省妇幼保健院', sub:'产科门诊 · 济南', city:'济南',
      desc:'用于展示孕产妇建档、产检、候诊、缴费及检查区域的导览动线。后期可替换为真实医院720°全景图。',
      tags:['省级妇幼','产检门诊','孕产服务'],
      panorama:'assets/media/hospital-vr/sd-wch.jpg', pos:[58,52],
      layoutScenes:[
        {id:'entrance', name:'门诊入口/孕产妇入口', icon:'🏥', floor:'1F', time:'3-5分钟', desc:'孕妇最先需要确认的入口位置，方便家属接送、网约车上下车和雨雪天气避让。', prep:['确认门诊入口开放时间','优先选择无台阶/坡道入口','记录附近无障碍卫生间位置'], pano:'assets/media/hospital-vr/hospitals/sd-wch/entrance.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/entrance.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/entrance-route.mp4', hotspot:{x:18,y:24,yaw:-55,pitch:2}},
        {id:'registration', name:'建档/挂号/缴费', icon:'🧾', floor:'1F', time:'5-15分钟', desc:'熟悉建档、挂号、自助机、医保结算位置，减少现场排队焦虑。', prep:['携带身份证/医保卡','提前完成线上预约','确认建档资料是否齐全'], pano:'assets/media/hospital-vr/hospitals/sd-wch/registration.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/registration.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/registration-route.mp4', hotspot:{x:23,y:43,yaw:-25,pitch:0}},
        {id:'ob-clinic', name:'产科门诊/产检中心', icon:'🤰', floor:'2F/3F', time:'20-60分钟', desc:'核心产检区域，展示候诊、叫号、医生诊室和产检动线。', prep:['携带产检手册','整理既往检查单','按预约时间候诊'], pano:'assets/media/hospital-vr/hospitals/sd-wch/ob-clinic.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/ob-clinic.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/ob-clinic-route.mp4', hotspot:{x:70,y:33,yaw:20,pitch:1}},
        {id:'ultrasound', name:'超声/B超检查区', icon:'🖥️', floor:'检查区', time:'20-90分钟', desc:'孕妈最常找不到、也最容易排队的区域之一，适合加入排队提示和检查前准备。', prep:['按项目确认是否憋尿','保留叫号凭证','检查后保存报告'], pano:'assets/media/hospital-vr/hospitals/sd-wch/ultrasound.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/ultrasound.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/ultrasound-route.mp4', hotspot:{x:25,y:56,yaw:-5,pitch:0}},
        {id:'lab', name:'抽血/检验/尿检区', icon:'🧪', floor:'检验区', time:'15-60分钟', desc:'糖耐、血常规、尿常规等高频检查均会用到，建议展示空腹检查路线。', prep:['确认是否空腹','带好水和小零食','留意取报告时间'], pano:'assets/media/hospital-vr/hospitals/sd-wch/lab.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/lab.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/lab-route.mp4', hotspot:{x:72,y:50,yaw:42,pitch:-2}},
        {id:'monitor', name:'胎心监护室', icon:'💗', floor:'产检区', time:'20-40分钟', desc:'孕晚期高频场景，孕妈需要知道候诊、躺卧位置和家属等待区。', prep:['提前吃点东西','保持胎动记录','穿宽松衣物'], pano:'assets/media/hospital-vr/hospitals/sd-wch/monitor.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/monitor.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/monitor-route.mp4', hotspot:{x:22,y:72,yaw:78,pitch:-1}},
        {id:'emergency', name:'产科急诊/夜间入口', icon:'🚑', floor:'急诊区', time:'紧急场景', desc:'破水、规律宫缩、出血、胎动明显异常时，孕妈和家属最需要快速找到的位置。', prep:['收藏夜间入口','保存科室电话','提前了解陪护要求'], pano:'assets/media/hospital-vr/hospitals/sd-wch/emergency.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/emergency.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/emergency-route.mp4', hotspot:{x:20,y:84,yaw:122,pitch:0}},
        {id:'delivery', name:'住院办理/产房路线', icon:'🛏️', floor:'住院部', time:'10-30分钟', desc:'临产入院时最关键的路线，建议后期插入从门诊或急诊到住院办理处的全景视频。', prep:['准备待产包','携带住院证件','确认家属等待区'], pano:'assets/media/hospital-vr/hospitals/sd-wch/delivery.jpg', image:'assets/media/hospital-vr/hospitals/sd-wch/delivery.jpg', video:'assets/media/hospital-vr/hospitals/sd-wch/delivery-route.mp4', hotspot:{x:73,y:82,yaw:160,pitch:-2}}
      ]
    },
    {
      id:'jinan-mch', name:'济南市妇幼保健院', sub:'产检中心 · 济南', city:'济南',
      desc:'展示妇幼专科医院产检中心、胎心监护、宣教与候诊区域。', tags:['妇幼专科','产检中心','济南'], panorama:'assets/media/hospital-vr/jinan-mch.jpg', pos:[54,39],
      layoutScenes:[
        {id:'entrance', name:'医院主入口', icon:'🏥', floor:'1F', time:'3-5分钟', desc:'确认入口、安检、无障碍通道和家属等待位置。', prep:['确认门诊入口','记录轮椅/坡道位置','查看卫生间位置'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/entrance.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/entrance.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/entrance-route.mp4', hotspot:{x:16,y:24,yaw:-70,pitch:1}},
        {id:'parking', name:'停车场/落客区', icon:'🚗', floor:'院区外/B1', time:'5-10分钟', desc:'家属陪诊高频需求，适合插入停车场到门诊入口的全景路线。', prep:['记录最近电梯','确认缴费方式','预留停车时间'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/parking.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/parking.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/parking-route.mp4', hotspot:{x:74,y:22,yaw:-20,pitch:0}},
        {id:'registration', name:'挂号/缴费', icon:'🧾', floor:'1F', time:'5-15分钟', desc:'展示自助机、人工窗口、医保结算和取号流程。', prep:['带身份证/医保卡','提前线上预约','保存缴费凭证'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/registration.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/registration.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/registration-route.mp4', hotspot:{x:20,y:42,yaw:15,pitch:0}},
        {id:'ob-clinic', name:'产科门诊', icon:'🤰', floor:'2F', time:'20-60分钟', desc:'展示产科候诊区、叫号屏、医生诊室与检查动线。', prep:['携带产检手册','整理检查单','按号候诊'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/ob-clinic.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/ob-clinic.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/ob-clinic-route.mp4', hotspot:{x:73,y:38,yaw:48,pitch:1}},
        {id:'ultrasound', name:'超声检查区', icon:'🖥️', floor:'检查区', time:'20-90分钟', desc:'B超、系统超声等高频区域，后期可配路线视频。', prep:['确认是否憋尿','保留叫号凭证','检查后保存报告'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/ultrasound.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/ultrasound.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/ultrasound-route.mp4', hotspot:{x:22,y:57,yaw:85,pitch:-1}},
        {id:'lab', name:'抽血/检验', icon:'🧪', floor:'检验区', time:'15-60分钟', desc:'糖耐、血常规、尿常规等项目常用。', prep:['确认空腹要求','带水和小零食','关注取报告时间'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/lab.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/lab.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/lab-route.mp4', hotspot:{x:73,y:55,yaw:120,pitch:-2}},
        {id:'monitor', name:'胎心监护室', icon:'💗', floor:'产检区', time:'20-40分钟', desc:'孕晚期常见场景，展示监护床位、候诊区和家属等候位置。', prep:['提前吃点东西','带胎动记录','穿宽松衣物'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/monitor.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/monitor.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/monitor-route.mp4', hotspot:{x:20,y:72,yaw:168,pitch:0}},
        {id:'delivery', name:'产房/住院办理', icon:'🛏️', floor:'住院部', time:'10-30分钟', desc:'临产入院路线，适合后期用全景视频展示。', prep:['准备待产包','携带住院证件','确认陪护要求'], pano:'assets/media/hospital-vr/hospitals/jinan-mch/delivery.jpg', image:'assets/media/hospital-vr/hospitals/jinan-mch/delivery.jpg', video:'assets/media/hospital-vr/hospitals/jinan-mch/delivery-route.mp4', hotspot:{x:73,y:84,yaw:-150,pitch:-1}}
      ]
    },
    {
      id:'qilu', name:'山东大学齐鲁医院', sub:'妇产科门诊 · 济南', city:'济南', desc:'综合医院妇产科就诊导览，适合展示挂号、候诊、产科门诊与检查区域。', tags:['三甲医院','妇产科','综合医疗'], panorama:'assets/media/hospital-vr/qilu.jpg', pos:[50,46], layoutScenes:null
    },
    {id:'provincial', name:'山东省立医院', sub:'妇产医学中心 · 济南', city:'济南', desc:'展示综合医院孕产妇就诊入口、门诊、检查与住院衔接动线。', tags:['三甲医院','产科','济南'], panorama:'assets/media/hospital-vr/provincial.jpg', pos:[44,43], layoutScenes:null},
    {id:'qduh', name:'青岛大学附属医院', sub:'产科门诊 · 青岛', city:'青岛', desc:'青岛区域综合医院产科门诊导览，后期可接入真实全景图片和科室说明。', tags:['青岛','三甲医院','产科'], panorama:'assets/media/hospital-vr/qduh.jpg', pos:[78,58], layoutScenes:null},
    {id:'yuhuangding', name:'烟台毓璜顶医院', sub:'妇产科门诊 · 烟台', city:'烟台', desc:'烟台区域孕产妇产检与妇产科门诊导览。', tags:['烟台','三甲医院','妇产科'], panorama:'assets/media/hospital-vr/yuhuangding.jpg', pos:[72,27], layoutScenes:null},
    {id:'weifang', name:'潍坊市人民医院', sub:'产科门诊 · 潍坊', city:'潍坊', desc:'潍坊区域孕产妇产检及门诊动线导览。', tags:['潍坊','三甲医院','产科'], panorama:'assets/media/hospital-vr/weifang.jpg', pos:[66,50], layoutScenes:null},
    {id:'linyi', name:'临沂市人民医院', sub:'产检门诊 · 临沂', city:'临沂', desc:'临沂区域孕产妇检查、候诊、产科门诊导览。', tags:['临沂','产检','三甲医院'], panorama:'assets/media/hospital-vr/linyi.jpg', pos:[58,77], layoutScenes:null}
  ],
  defaultLayoutScenes: [
    {id:'entrance', name:'医院主入口/门诊入口', icon:'🏥', floor:'1F', time:'3-5分钟', desc:'孕妇最先需要确认的入口位置，方便家属接送、网约车上下车和雨雪天气避让。', prep:['确认门诊入口开放时间','优先选择无台阶/坡道入口','记录附近无障碍卫生间位置'], pano:'assets/media/hospital-vr/layout/entrance.jpg', image:'assets/media/hospital-vr/layout/entrance.jpg', video:'assets/media/hospital-vr/layout/entrance-route.mp4', hotspot:{x:18,y:24,yaw:-50,pitch:0}},
    {id:'parking', name:'停车场/即停即走区', icon:'🚗', floor:'B1/院区外', time:'5-10分钟', desc:'家属陪诊时最关心停车、落客和返回路线。', prep:['标记最近电梯口','记录缴费方式','准备雨伞或轮椅通道信息'], pano:'assets/media/hospital-vr/layout/parking.jpg', image:'assets/media/hospital-vr/layout/parking.jpg', video:'assets/media/hospital-vr/layout/parking-route.mp4', hotspot:{x:72,y:24,yaw:-10,pitch:0}},
    {id:'registration', name:'挂号/缴费/医保窗口', icon:'🧾', floor:'1F', time:'5-15分钟', desc:'提前熟悉自助机、人工窗口和医保结算位置，可减少现场排队焦虑。', prep:['携带身份证/医保卡','提前完成线上预约','确认产检项目是否需先缴费'], pano:'assets/media/hospital-vr/layout/registration.jpg', image:'assets/media/hospital-vr/layout/registration.jpg', video:'assets/media/hospital-vr/layout/registration-route.mp4', hotspot:{x:20,y:42,yaw:20,pitch:0}},
    {id:'ob-clinic', name:'产科门诊/产检中心', icon:'🤰', floor:'2F/3F', time:'20-60分钟', desc:'核心产检区域，适合展示候诊、叫号、医生诊室和产检动线。', prep:['携带产检手册','提前整理既往检查单','按预约时间候诊'], pano:'assets/media/hospital-vr/layout/ob-clinic.jpg', image:'assets/media/hospital-vr/layout/ob-clinic.jpg', video:'assets/media/hospital-vr/layout/ob-clinic-route.mp4', hotspot:{x:72,y:42,yaw:60,pitch:0}},
    {id:'ultrasound', name:'超声/B超检查区', icon:'🖥️', floor:'检查区', time:'20-90分钟', desc:'孕妈最常找不到、也最容易排队的区域之一。', prep:['按项目确认是否憋尿','保留叫号凭证','检查后保存报告'], pano:'assets/media/hospital-vr/layout/ultrasound.jpg', image:'assets/media/hospital-vr/layout/ultrasound.jpg', video:'assets/media/hospital-vr/layout/ultrasound-route.mp4', hotspot:{x:21,y:58,yaw:95,pitch:-1}},
    {id:'lab', name:'抽血/检验/尿检区', icon:'🧪', floor:'检验区', time:'15-60分钟', desc:'糖耐、血常规、尿常规等高频检查均会用到。', prep:['确认是否空腹','带好水和小零食','留意取报告时间'], pano:'assets/media/hospital-vr/layout/lab.jpg', image:'assets/media/hospital-vr/layout/lab.jpg', video:'assets/media/hospital-vr/layout/lab-route.mp4', hotspot:{x:72,y:58,yaw:135,pitch:-2}},
    {id:'monitor', name:'胎心监护室', icon:'💗', floor:'产检区', time:'20-40分钟', desc:'孕晚期高频场景，孕妈需要知道候诊、躺卧位置和家属等待区。', prep:['提前吃点东西','保持胎动记录','穿宽松衣物'], pano:'assets/media/hospital-vr/layout/monitor.jpg', image:'assets/media/hospital-vr/layout/monitor.jpg', video:'assets/media/hospital-vr/layout/monitor-route.mp4', hotspot:{x:20,y:74,yaw:175,pitch:0}},
    {id:'delivery', name:'产房/住院办理路线', icon:'🛏️', floor:'住院部', time:'10-30分钟', desc:'临产入院时最关键的路线，建议后期插入从门诊或急诊到住院办理处的全景视频。', prep:['准备待产包','携带住院证件','确认家属等待区'], pano:'assets/media/hospital-vr/layout/delivery.jpg', image:'assets/media/hospital-vr/layout/delivery.jpg', video:'assets/media/hospital-vr/layout/delivery-route.mp4', hotspot:{x:74,y:80,yaw:-140,pitch:-1}}
  ]
};
