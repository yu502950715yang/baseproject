<div class="page-header navbar navbar-fixed-top">
    <div class="page-header-inner">
        <div class="page-logo">
            <a href="/"><img src="/img//logo_lovcreate_white.svg" alt="logo" class="logo-default" style="height:33px"/></a>
            <div class="menu-toggler sidebar-toggler"><span></span></div>
        </div>
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"><span></span></a>
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <li class="dropdown dropdown-user">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <span class="username username-hide-on-mobile">欢迎:${Session.user.nickname}</span> <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="javascript:;" id="updatePass"><i class="icon-lock"></i>修改密码</a></li>
                        <li><a href="logout"><i class="icon-key"></i>登出</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="modal fade" id="updatePasswordModal" tabindex="-1" data-keyboard="false" aria-hidden="true" data-backdrop="static"></div>
<div class="clearfix"></div>
