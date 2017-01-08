/**
 * 离职公示
 */
var mongoose=require('mongoose');

var  feedbackschema=new mongoose.Schema({
    //姓名
    name:String,
    //email
    email:String,
    //time
    time:String,
    //电话
    phone:String,
    //信息
    message:String,
    //状态
    status:String

});

mongoose.model('Feedback',feedbackschema);