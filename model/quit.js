/**
 * 离职公示
 */
var mongoose=require('mongoose');

var  quitschema=new mongoose.Schema({
    //职位
    name:String,
    //部门
    department:String,
    //time
    time:String
});

mongoose.model('Quit',quitschema);