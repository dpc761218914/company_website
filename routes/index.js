var Index = require('../controller/web/index');



module.exports = function(app) {
  //首页
  app.get('/', Index.index);

  //走进车协
  app.get('/company_intro', Index.company_intro);
  app.get('/culture', Index.culture);
  app.get('/organize', Index.organize);
  app.get('/process', Index.process);

  //新闻中心
  app.get('/company_dynamic', Index.company_dynamic);
  app.get('/media_report', Index.media_report);
  app.get('/activity_report', Index.activity_report);

  //服务中心
  app.get('/services1', Index.services1);
  app.get('/services2', Index.services2);
  app.get('/services3', Index.services3);

  //合作伙伴
  app.get('/partner', Index.partner);

  //人力资源
  app.get('/recruit', Index.recruit);
  app.get('/benefits', Index.benefits);
  app.get('/staff_style', Index.staff_style);
  app.get('/quit_notice', Index.quit_notice);

  //联系我们
  app.get('/contact_us', Index.contact_us);

  //首页获取新闻
  app.get('/web/get_news', Index.get_news);
  //首页获取招聘信息
  app.get('/web/get_recruits', Index.get_recruits);
  //首页获取离职公告信息
  app.get('/web/get_quits', Index.get_quits);
  //分类获取新闻
  app.post('/web/get_news_by_Category', Index.get_news_by_Category);

  //获取公司动态
  app.get('/news_detail/:id', Index.get_news_detail);
  //获取公司动态
  app.post('/news_detail/:id', Index.post_news_detail);
  //获取媒体报道
  app.get('/media_report_detail/:id', Index.get_media_report_detail);
  //获取媒体报道
  app.post('/media_report_detail/:id', Index.post_media_report_detail);
  //获取活动报道
  app.get('/activity_report_detail/:id', Index.get_activity_report_detail);
  //获取活动报道
  app.post('/activity_report_detail/:id', Index.post_activity_report_detail);

  //人力资源页面
  //分页获取招聘信息
  app.post('/web/get_recruits_page', Index.get_recruits_page);
  //分页获取离职信息
  app.post('/web/get_quit_page', Index.get_quit_page);

  //跳转到招聘详情页面
  app.get('/recruit_requirment/:id', Index.get_recruit_requirment);
  //获取招聘详情信息
  app.post('/recruit_requirment/:id', Index.post_recruit_requirment);


  //用户添加反馈信息
  app.post('/post_feedback', Index.post_feedback);






};