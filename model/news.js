/**
 * Created by 1 on 2016/5/16.
 */
var mongoose=require('mongoose');

var  newsschema=new mongoose.Schema({
    title:String,
    content:String,
    time:String,
    category:String,
    from:String,
});

mongoose.model('News',newsschema);