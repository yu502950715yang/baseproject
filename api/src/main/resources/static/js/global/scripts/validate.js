/**
 * 复选框校验方法
 * @param checkboxName
 * @return {bool}若为true不可继续操作，调用此函数的方法需要return;
 */


function checkValidate(checkboxName) {
    var $checkbox = $("input[name=" + checkboxName + "]:checkbox");
    if ($checkbox.size() <= 0) {
        toast.warning("Remarks cannot be empty!");
        return true;
    }
    if ($checkbox.filter(":checked").size() < 1) {
        toast.warning("Please select at least one record!");
        return true
    }
    return false;
}

function getCheckedVal(checkboxName) {
    var checkIds = [];
    $("input[name=" + checkboxName + "]:checked").each(function () {
        checkIds.push(this.value);
    });
    return checkIds;
}

//导出excel取动态显示列的值
function getCheckedColumnsNum(){
    return $("#dataTableToggleColumn").find("input:checked").size();
}

//验证单个标签是中文方法 target是目标标签的id
function validateZHCode(target,message){
    target="#"+target;
    var flag = false;
    if(/[\u4E00-\u9FA5\uF900-\uFA2D]/.test($(target).val())){
        toast.error(message);
        flag =true;
    }
    return flag;
};

/**
 * jquery,validate框架.公共验证方法
 */
$(function(){
    //验证框架: 开始日期不能晚于结束日期(可以等于)
    jQuery.validator.addMethod("compareDate", function(value, element,param) {
        var startStrArray = jQuery("#"+param).val().split("-");
        var endStrArray = value.split("-");

        var startDate = new Date(startStrArray[0],startStrArray[1],startStrArray[2]);
        var endDate = new Date(endStrArray[0],endStrArray[1],endStrArray[2]);

        return startDate <= endDate;

    }, "开始日期不能晚于结束日期");

    //验证框架: google框不能为空,就是必须选择google框中的值
    jQuery.validator.addMethod("googleNotNull", function(value, element,param) {
        if(param){
            var hiddenValue = jQuery("#"+element.id).getGAutoHiddenValue();
            if(hiddenValue==""){
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    },function(param,element){
        return jQuery("#"+element.id).attr("placeholder");
    });

    //验证框架: 时间格式验证,带+-,以及"0"
    jQuery.validator.addMethod("timeType", function(value, element,param) {
        if(param){
            var value = jQuery("#"+element.id).val();
            // XX:XX:XX -XX:XX:XX +XX:XX:XX 0-true
            if(value=="0"){
                return true;
            }else{
                var reg=/^[+|-]?(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/;//匹配 HH:mm:ss , -HH:mm:ss , +HH:mm:ss
                if(reg.test(value)){
                    return true;
                }else{
                    return false;
                }
            }

        }else{
            return true;
        }
    }, "不是时间格式");

    //验证框架: 输入不能相同
    jQuery.validator.addMethod("notEqualTo", function(value, element,param) {

        var a = jQuery("#"+element.id).val();
        var b = jQuery("#"+param).val();

        if(a==b){
            return false;
        }else{
            return true;
        }

    },  "输入不能相同");

    //验证框架: 特殊字符
    jQuery.validator.addMethod("specialCharacters", function(value) {
        return /^[^\`~#$^&*={}'<>——]*$/.test(value);
    }, "请不要输入特殊字符");
    //验证框架: 特殊字符(包括百分号)
    jQuery.validator.addMethod("specialCharactersForIndicators", function(value) {
        return /^[^\`~#$^&%*={}'<>]*$/.test(value);
    }, "请不要输入特殊字符");
    //验证框架: 非中文
    jQuery.validator.addMethod("nonChinese", function(value) {
        return /^[^\u4E00-\u9FA0]+$/.test(value);
    },  "请不要输入中文");

    //验证框架: 浮点数
    jQuery.validator.addMethod("floatNum", function(value) {
        return !/^(-?\\d+)(\\.\\d+)?$/.test(value);
    }, "请输入浮点数");

    jQuery.validator.addMethod("emailRight", function (value) {
       return  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "请输入正确格式的邮箱地址");
    jQuery.validator.addMethod("mobileRight", function (value) {
        var myRegTel = /(\d{2,5}-\d{7,8}(-\d{1,})?)/;
        var myRegMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(14[5-7]{1})|(17[0135678]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!myRegMobile.test(value) && mobile != "" && mobile != undefined) {
            if (!myRegTel.test(value) && mobile != "" && mobile != undefined) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, "请输入正确格式的电话");
});
