
var formatDat ={
    // 乘法精度问题
     mul:function(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },
    // 加法
    add:function(num1, num2) {  
        var baseNum, baseNum1, baseNum2;  
        try {  
            baseNum1 = num1.toString().split(".")[1].length;  
        } catch (e) {  
            baseNum1 = 0;  
        }  
        try {  
            baseNum2 = num2.toString().split(".")[1].length;  
        } catch (e) {  
            baseNum2 = 0;  
        }  
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));  
        return (num1 * baseNum + num2 * baseNum) / baseNum;  
    },
    //减法函数
    Subtr:function(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //last modify by deeka
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    //除法函数
    // accDiv:function(arg1, arg2) {
    //     var t1 = 0, t2 = 0, r1, r2;
    //     try {
    //         t1 = arg1.toString().split(".")[1].length;
    //     }
    //     catch (e) {
    //     }
    //     try {
    //         t2 = arg2.toString().split(".")[1].length;
    //     }
    //     catch (e) {
    //     }
    //     with (Math) {
    //         r1 = Number(arg1.toString().replace(".", ""));
    //         r2 = Number(arg2.toString().replace(".", ""));
    //         return (r1 / r2) * pow(10, t2 - t1);
    //     }
    // } 
};
export default formatDat