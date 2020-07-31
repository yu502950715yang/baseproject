<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <#include "includes/head.ftl">
    <title>主页</title>
</head>
<body class="page-sidebar-closed-hide-logo page-content-white page-header-fixed page-sidebar-fixed">
<#include "includes/top.ftl">
<div class="page-container">
    <#include  "includes/sidebar.ftl">
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <!-- BEGIN PAGE HEADER-->
            <h3 class="page-title">
               欢迎
            </h3>
            <!-- END PAGE HEADER-->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<#include "includes/footer.ftl">
<#include "includes/bottomscript.ftl">
<script src="/js/core/index.js"></script>
</body>
</html>
<script>
jQuery(document).ready(function() {
    Index.init();
});
</script>
