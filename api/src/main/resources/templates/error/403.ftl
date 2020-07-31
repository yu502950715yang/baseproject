<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <title>403</title>
    <#import "../includes/spring.ftl" as spring/>
    <#include "../includes/head.ftl">
    <link href="/assets/pages/css/error.css" rel="stylesheet" type="text/css"/>
</head>
<body class="<#include "../includes/bodyClass.ftl">">
<#include "../includes/top.ftl">
<div class="page-container">
    <#include "../includes/sidebar.ftl">
    <div class="page-content-wrapper">
        <div class="page-content">
            <h3 class="page-title">
                403 Forbidden
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="">主页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <span>403</span>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12 page-500">
                    <div class=" number">
                        403
                    </div>
                    <div class=" details">
                        <h3>Oops! 您没有访问权限！</h3>
                        <p>
                            请联系管理员,<br/>
                            或分配权限后重试。<br/><br/>
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