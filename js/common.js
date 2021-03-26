//输入金额校验
function clearNoNum(obj) {
    //修复第一个字符是小数点 的情况.  
    if (obj.value != '' && obj.value.substr(0, 1) == '.') {
        obj.value = "";
    }
    obj.value = obj.value.replace(/^0*(0\.|[1-9])/, '$1'); //解决 粘贴不生效  
    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的       
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数       
    if (obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        if (obj.value.substr(0, 1) == '0' && obj.value.length == 2) {
            obj.value = obj.value.substr(1, obj.value.length);
        }
    }
}

//深克隆一个对象
function cloneObj(obj) {
  var o = obj instanceof Array ? [] : {};
  for(var k in obj) {
	o[k] = typeof obj[k] === Object ? cloneObj(obj[k]) : obj[k];
  }
  return o;
}