/**
 * Created by minlai on 2016/11/16.
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "y+":this.getFullYear(),
        "M":['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.getMonth()],
        "d": this.getDate(),
        "h+": this.getHours()%12 || 12,
        "n+": this.getMinutes(),
        "p": this.getHours() < 12 ? 'AM' : 'PM',
        "w":['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.getDay()]


    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

