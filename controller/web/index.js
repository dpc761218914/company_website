/**
 * Created by 1 on 2016/5/16.
 */
// index page

var mongoose=require('mongoose');
var News =mongoose.model('News');
var Recruit =mongoose.model('Recruit');
var Quit =mongoose.model('Quit');
var Feedback=mongoose.model('Feedback');
/*处理时间*/
var Moment = require('moment');

// 首页
exports.index = function(req, res) {
    res.render('website/index/index');
};
// 走进车协
exports.company_intro = function(req, res) {
    res.render('website/company/company_intro');
};
exports.culture = function(req, res) {
    res.render('website/company/culture');
};
exports.organize = function(req, res) {
    res.render('website/company/organize');
};
exports.process = function(req, res) {
    res.render('website/company/process');
};
// 新闻中心
exports.company_dynamic = function(req, res) {
    res.render('website/news/company_dynamic');
};
exports.media_report = function(req, res) {
    res.render('website/news/media_report');
};
exports.activity_report = function(req, res) {
    res.render('website/news/activity_report');
};
// 服务中心
exports.services1 = function(req, res) {
    res.render('website/services/services1');
};
exports.services2 = function(req, res) {
    res.render('website/services/services2');
};
exports.services3 = function(req, res) {
    res.render('website/services/services3');
};

//合作伙伴
exports.partner = function(req, res) {
    res.render('website/partner/partner');
};

// 人力资源
exports.recruit = function(req, res) {
    res.render('website/human_resources/recruit');
};
exports.benefits = function(req, res) {
    res.render('website/human_resources/benefits');
};
exports.staff_style = function(req, res) {
    res.render('website/human_resources/staff_style');
};
exports.quit_notice = function(req, res) {
    res.render('website/human_resources/quit_notice');
};

// 联系我们
exports.contact_us = function(req, res) {
    res.render('website/contact_us/contact_us');
};


// 首页获取6条新闻
exports.get_news= function(req, res) {
    //获取新闻处理逻辑
    News.find({category:'0'}).sort('-_id').limit(6).exec(function(err,datas){
        if(err){
            console.log('获取数据失败');
            var data={
                status: 'failed',
            };
            res.json(data);
        }else{
            var data={
                status: 'success',
                datas: datas
            };
            res.json(data);
        }
    });
};

// 首页获取3条招聘
exports.get_recruits= function(req, res) {
    //获取招聘处理逻辑
    Recruit.find({}).sort('-_id').limit(3).exec(function(err,datas){
        if(err){
            console.log('获取数据失败');
            var data={
                status: 'failed',
            };
            res.json(data);
        }else{
            var data={
                status: 'success',
                datas: datas
            };
            res.json(data);
        }
    });
};

// 首页获取2条离职公告
exports.get_quits= function(req, res) {
    //获取招聘处理逻辑
    Quit.find({}).sort('-_id').limit(2).exec(function(err,datas){
        if(err){
            console.log('获取数据失败');
            var data={
                status: 'failed',
            };
            res.json(data);
        }else{
            var data={
                status: 'success',
                datas: datas
            };
            res.json(data);
        }
    });
};

// 根据类别号分类获取新闻
exports.get_news_by_Category= function(req, res) {
    //获取新闻处理逻辑
    var curr=req.body.curr;
    var category=req.body.category;
    //每页大小为10
    var query=News.find({category:category});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            News.find({},function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};

//跳转到公司动态详情页面
exports.get_news_detail= function(req, res) {
    res.render('website/news/company_dynamic_detail');
};
//获取公司动态详情
exports.post_news_detail= function(req, res) {
    var id=req.params.id;
    News.findOne({_id:id},function(err,data){
        if(err){
            res.json({"status":"failed"});
        }else{
            res.json({"status":"success","data":data});
        }
    });
};

//跳转媒体报道详情页面
exports.get_media_report_detail= function(req, res) {
    res.render('website/news/media_report_detail');
};
//获取媒体报道详情
exports.post_media_report_detail= function(req, res) {
    var id=req.params.id;
    News.findOne({_id:id},function(err,data){
        if(err){
            res.json({"status":"failed"});
        }else{
            res.json({"status":"success","data":data});
        }
    });
};

//跳转活动报道详情页面
exports.get_activity_report_detail= function(req, res) {
    res.render('website/news/activity_report_detail');
};
//获取活动报道详情
exports.post_activity_report_detail= function(req, res) {
    var id=req.params.id;
    News.findOne({_id:id},function(err,data){
        if(err){
            res.json({"status":"failed"});
        }else{
            res.json({"status":"success","data":data});
        }
    });
};

//人力资源
// 分页获取招聘信息
exports.get_recruits_page= function(req, res) {
    //获取新闻处理逻辑
    var curr=req.body.curr;
    //每页大小为10
    var query=Recruit.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Recruit.find({},function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};
// 分页获取离职信息
exports.get_quit_page= function(req, res) {
    //获取新闻处理逻辑
    var curr=req.body.curr;
    //每页大小为10
    var query=Quit.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Quit.find({},function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};


//跳转到公司动态详情页面
exports.get_recruit_requirment= function(req, res) {
    res.render('website/human_resources/recruit_requirment');
};
//获取公司动态详情
exports.post_recruit_requirment= function(req, res) {
    var id=req.params.id;
    Recruit.findOne({_id:id},function(err,data){
        if(err){
            res.json({"status":"failed"});
        }else{
            res.json({"status":"success","data":data});
        }
    });
};

//联系我们页面用户反馈
//添加用户反馈
exports.post_feedback = function(req, res) {
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var message=req.body.message;
    var time=Moment().format('YYYY-MM-DD HH:mm');

    var data=new Feedback(
        {
            name:name,
            email:email,
            phone:phone,
            message:message,
            time:time,
            status:'0'
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};







