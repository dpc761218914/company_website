/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

var  recruitschema=new mongoose.Schema({
    //职位
    position:String,
    //要求
    requirement:String,
    //类型
    category:String,
    //部门
    department:String,
    //time
    time:String
});

mongoose.model('Recruit',recruitschema);