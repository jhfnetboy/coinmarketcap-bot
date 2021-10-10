var xlsx = require('node-xlsx');
var fs = require('fs');
 
try{
    var excelData = [];
    //表1
    {
        //添加数据
        var addInfo = {};
        //名称
        addInfo.name = "用户表";
        //数据数组
        addInfo.data = [
            ["用户ID", "用户昵称", "用户性别", "用户年龄"],
        ];
 
        //添加数据
        addInfo.data.push([10000,"张三","男",15]);
        addInfo.data.push([10001,"李四","男",40]);
 
        //添加数据
        excelData.push(addInfo);
    }
 
    //表2
    {
        //添加数据
        var addInfo = {};
        //名称
        addInfo.name = "部门表";
        //数据数组
        addInfo.data = [
            ["部门ID", "部门名称"],
        ];
 
        //添加数据
        addInfo.data.push([10000,"技术部"]);
        addInfo.data.push([10001,"财务部"]);
 
        //添加数据
        excelData.push(addInfo);
    }
    
    // 写xlsx
    var buffer = xlsx.build(excelData);
    //写入数据
    fs.writeFile('./data.xls', buffer, function (err) {
        if (err)
        {
            throw err;
        }
        //输出日志
        console.log('Write to xls has finished');
    });
}
catch(e){
    //输出日志
    console.log("excel写入异常,error=%s", e.stack);
}