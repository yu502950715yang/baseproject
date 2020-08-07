<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <#include "../../includes/head.ftl">
    <title>${menu.menuName}</title>
    <link href="/js/bower_lib/select2/dist/css/select2.min.css" rel="stylesheet" type="text/css"/>
    <link href="/js/bower_lib/select2-bootstrap-theme/dist/select2-bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="/js/bower_lib/ztree_v3/css/zTreeStyle/zTreeStyle.css"/>
    <link rel="stylesheet" type="text/css" href="/css/global/ztree_custom.css"/>
    <style>
        table.dataTable>tbody>tr.child ul{
            width: 98.2%;
        }
    </style>
</head>
<body class="<#include "../../includes/bodyClass.ftl">">
<#include "../../includes/top.ftl">
<div class="page-container">
    <#include "../../includes/sidebar.ftl">
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="row">
                <div class="col-md-12">
                    <div class="portlet light portlet-fit portlet-datatable bordered">
                        <div class="portlet-title">
                            <div class="caption font-green-sharp">
                                <i class="${menu.icon} font-green-sharp"></i>
                                <span class="caption-subject bold uppercase">${menu.menuName}</span>
                            </div>
                            <div class="actions">
                                <a href="javascript:;" class="btn green" id="addRole"><i
                                        class="fa fa-plus"></i><span class="hidden-480"> 新增</span></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-container">
                                <table class="table table-striped table-bordered table-hover dt-responsive" id="dataTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th class="all" data-priority="1">角色名</th>
                                        <th>描述</th>
                                        <th class="none"></th>
                                        <th>操作</th>

                                    </tr>
                                    <tr role="row" class="filter">
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm"
                                                   data-gautoflag="gAutoRoleName" name="roleNameQuery" id="roleNameQuery"  placeholder="角色名">
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-filter input-sm"
                                                   name="descriptionQuery" id="descriptionQuery"  placeholder="描述">
                                        </td>
                                        <th class="none" style="display: none;"></th>
                                        <td>
                                            <div class="margin-bottom-5">
                                                <a class="btn btn-sm green btn-outline filter-submit margin-bottom">
                                                    <i class="fa fa-search"></i> 查询</a>
                                            </div>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalDialog" tabindex="-1" data-keyboard="false" aria-hidden="true"
     data-backdrop="static">
</div>
<#include "../../includes/footer.ftl">
<#include "../../includes/bottomscript.ftl">
<script id="actionBtn" type="text/html">
    <a class="edit btn btn-outline btn-xs purple" roleId="{{full.roleId}}"><i class="fa fa-edit"></i> 编辑</a>
    <a class="delete btn btn-outline btn-xs red"><i class="fa fa-times"></i> 删除</a>
</script>
<script id="userTable" type="text/html">
    <table class="table table-bordered">
        <tr role="row" class="heading">
            <th>用户名</th>
            <th>姓名</th>
        </tr>
        {{each userList as user}}
        <tr role="row" class="filter">
            <td>{{user.username}}</td>
            <td>{{user.nickname}}</td>
        </tr>
        {{/each}}
    </table>
</script>
<script src="/js/bower_lib/select2/dist/js/select2.full.min.js" type="text/javascript"></script>
<script src="/js/bower_lib/select2/dist/js/i18n/zh-CN.js" type="text/javascript"></script>
<script type="text/javascript" src="/js/bower_lib/ztree_v3/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="/js/bower_lib/ztree_v3/js/jquery.ztree.excheck-3.5.min.js"></script>
<script src="/js/core/role/role.js"></script>
<script type="text/javascript">
    $(function () {
        roleListTable.init(${tree},${userList});
    });
</script>
</body>
</html>
