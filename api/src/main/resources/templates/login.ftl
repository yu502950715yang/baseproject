<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <#include "includes/head.ftl">
    <link href="/assets/pages/css/login-4.min.css" rel="stylesheet" type="text/css"/>
</head>
<body class="login">
<div class="logo">
    <a href="tologin">
    <img src="/img//logo_lovcreate_white.svg" alt="" style="height:50px"/>
    </a>
</div>
<div class="menu-toggler sidebar-toggler">
</div>
<div class="content">
    <!-- BEGIN LOGIN FORM -->
    <form id="login-form"  class="login-form" action="login" method="post">
    <h3 class="form-title">登录</h3>
    <div class="alert alert-danger display-hide">
        <button class="close" data-close="alert"></button>
        <span></span>
    </div>
    <div class="form-group">
        <label class="control-label visible-ie8 visible-ie9">用户名</label>
        <div class="input-icon">
            <i class="fa fa-user"></i>
            <input class="form-control placeholder-no-fix" type="text" autocomplete="off"
                   placeholder="用户名" name="username" id="username" value="admin"/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label visible-ie8 visible-ie9">密码</label>
        <div class="input-icon">
            <i class="fa fa-lock"></i>
            <input id="password" class="form-control placeholder-no-fix" type="password" autocomplete="off"
                   placeholder="密码" name="password" value="admin"/>
        </div>
    </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">验证码</label>
            <div class="input-icon">
                <i class="fa fa-check-circle"></i>
                <img class="pull-right " title="验证码" id="captchaImage" src="login/captcha">
                <input id="captcha" class="form-control placeholder-no-fix" type="text" autocomplete="off" maxlength="4" style="width: 200px;"
                       placeholder="验证码" name="captcha" />

            </div>
        </div>

    <div class="form-actions">
        <label class="checkbox"></label>
        <button type="button" id="loginBtn" class="btn blue pull-right">登录<i class="m-icon-swapright m-icon-white"></i>
        </button>
    </div>
    </form>
    <!-- END LOGIN FORM -->
</div>
<#include "includes/bottomscript.ftl">
<script src="/js/bower_lib/jquery-backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
<script src="/js/core/login.js" type="text/javascript"></script>
<script>
    $(function(){
        Login.init();
        <#if Request.message??>
        toast.error("${Request.message}");
        </#if>
    })
</script>
</body>
</html>