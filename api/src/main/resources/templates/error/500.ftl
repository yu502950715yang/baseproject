<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <title>500</title>
    <#include "../includes/head.ftl">
    <link href="/assets/pages/css/error.css" rel="stylesheet" type="text/css"/>
</head>
<body class="<#include "../includes/bodyClass.ftl">">
<div class="page-header navbar navbar-fixed-top">
    <div class="page-header-inner">
        <div class="page-logo">
            <a href=""><img src="/img//logo-big4.png" alt="logo" class="logo-default" style="height:33px"/></a>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<div class="page-container">
    <#include  "../includes/sidebar.ftl">
    <div class="page-content-wrapper">
        <div class="page-content">
            <h3 class="page-title">
                500 ERROR
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="">主页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <span>500</span>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12 page-500">
                    <div class=" number">
                        500
                    </div>
                    <div class=" details">
                        <h3>Oops! 出错了！</h3>
                        <p>
                            请联系管理员,<br/>
                            或稍后重试。<br/>
                            <a href="">返回主页</a>
                            <br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<#include "../includes/footer.ftl">
<#include "../includes/bottomscript.ftl">
</body>
</html>
