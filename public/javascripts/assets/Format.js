Date.prototype.Format = function (fmt) {
    var o = {
        "y+":this.getYear(),
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds(), //毫秒

    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function TimeSub(low_time,up_time){
    var t=Date.parse(up_time)-Date.parse(low_time);
    var seconds = ('0'+Math.floor( (t/1000) % 60 )).slice(-2);
    var minutes = ('0'+Math.floor( (t/1000/60) % 60 )).slice(-2);
    var hours = ('0'+Math.floor( (t/(1000*60*60)) % 24 )).slice(-2);
    var days = Math.floor( t/(1000*60*60*24) );
    var time=hours+":"+minutes+":"+seconds;
    return time;

};

function TimeLeft(){
    var today=new Date();
    var d=today.getDate()+1;
    var m=today.getMonth()+1;
    var y="20"+(today.getYear()).toString().substring(1);
    var tomorrow=y+"-"+m+"-"+d+" 00:00:00";
    var left=TimeSub(today,tomorrow);
    return left;
};
