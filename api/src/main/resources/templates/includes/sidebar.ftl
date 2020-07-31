<div class="page-sidebar-wrapper" id="sidebarWrapper">
    <div class="page-sidebar navbar-collapse collapse">
        <!-- BEGIN SIDEBAR MENU -->
        <ul class="page-sidebar-menu page-header-fixed " data-keep-expanded="true" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px"></ul>
        <!-- END SIDEBAR MENU -->
    </div>
</div>
<#--<input type="hidden" id="menuParentId" value="${menu.parentId}"/>-->
<input type="hidden" id="menuId" value="${(menu.menuId)!''}"/>
<#--<%-->
    <#--SecurityUtils.getSubject().getSession().beforeResponse("requestNo",(Integer) session.getAttribute("requestNo")+1);-->
<#--%>-->
<script>
    var requestNo = "${Session.sessionId}"
</script>

<script type="text/html" id="menuItem">
    {{each children as temp}}
    <li id="{{temp.menuId}}" class="nav-item">
        <a href="{{if temp.leaf}}{{temp.url}}{{else}}javascript:;{{/if}}" class="level1-menu nav-link {{if temp.leaf}}{{temp.url}}{{else}}nav-toggle{{/if}}">

            <span class="title">{{temp.menuName}}</span>
            <span class="selected"></span>
            {{if !temp.leaf}}
            <span class="arrow"></span>
            {{/if}}
        </a>
        {{if !temp.leaf}}
        <ul class="sub-menu">
            {{include 'menuItem' temp}}
        </ul>
        {{/if}}
    </li>
    {{/each}}
</script>

<script type="text/html" id="sidebar">
    <li class="sidebar-toggler-wrapper hide">
        <div class="sidebar-toggler"><span></span></div>
    </li>
    <li class="sidebar-search-wrapper">
        <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
        <!-- END RESPONSIVE QUICK SEARCH FORM -->
        <div class="sidebar-search">
            <a href="javascript:;" class="remove">
                <i class="icon-close"></i>
            </a>
            <div class="input-group">
                <input type="text" class="form-control" data-gautoflag=""
                       data-req-url="{{basePath}}customAutoComplete/gAutoMenuList/{{userId}}" placeholder="菜单搜索"
                       id="menuSearch" autocomplete="on">
                <span class="input-group-btn">
    <a href="javascript:;" class="btn submit" id="menuSearchBtn"><i class="icon-magnifier"></i></a>
    </span>
            </div>
        </div>
    </li>
    {{each menus as menu}}
    {{include 'menuItem' menu}}
    {{/each}}
</script>