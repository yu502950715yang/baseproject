<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <!-- <base href="/static/"> -->
    <link type="text/css" rel="stylesheet" href="dist/css/login2.css">
    <link type="text/css" rel="stylesheet" href="dist/css/login.css">
    <link type="text/css" rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
    <!--[if IE]>
    <script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
    <![endif]-->
    <link type="text/css" href="dist/css/font-awesome.css" rel="stylesheet">
</head>
<body>
<div class="cont">
    <div class="demo">
        <div class="login">
            <form class="login__form" method="post">
                <input type="hidden" id="submitFail" value="${msg!}">
                <h3>用户登录</h3>
                <p>欢迎登录XXX后台管理系统</p>
                <div class="login__row input-group">
                    <span class="glyphicon glyphicon-user"></span>
                    <input type="text" class="login__input name" placeholder="用户名" name="username" id="username">

                </div>
                <div class="login__row input-group">
                    <span class="glyphicon glyphicon-lock"></span>
                    <input type="password" class="login__input pass" placeholder="密码" name="password" id="password">
                </div>
                <button type="button" id="loginBtn" class="login__submit">登 录</button>
                <!--按钮模块-->
                <div class="outside-login">
                    <div class="outside-login-tit">
                        <span>友情链接</span>
                    </div>
                    <div class="outside-login-cot">
                        <a class="outside-login-btn wxoa actived oschina J-btnSwitchLoginType" target="_Blank"
                           href="https://www.baidu.com/">
                            <em><i class="fa fa-home"></i></em>
                            <span>百度</span>
                        </a>
                        <a class="outside-login-btn wxoa actived git J-btnSwitchLoginType" target="_Blank"
                           href="https://github.com/">
                            <em><i class="fa fa-github"></i></em>
                            <span>Github</span>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="sys_info">
        <div class="sys_title">
            <h3>
                欢迎使用 <strong>后台管理系统</strong>
            </h3>
            <ul>
                <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i>FreeMarker</li>
                <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i>SpringBoot</li>
                <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i>MyBatis-plus</li>
                <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i>MySql</li>
            </ul>
        </div>
    </div>
</div>


<script type="text/javascript" src="dist/js/pages/login2.js"></script>
<!-- jQuery 2.2.3 -->
<script type="text/javascript" src="plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="plugins/validate/messages_zh.min.js"></script>
<script type="text/javascript" src="plugins/jquery.tips.js"></script>
<script>
    $(document).ready(function () {
        var submitFail = $("#submitFail").val();
        if (submitFail != '') {
            console.log("submitFail:" + submitFail);
            if (submitFail === "用户不存在！") {
                $("#submitFail").val('');
                $("#username").tips({
                    side: 1,
                    msg: submitFail,
                    bg: '#AE81FF',
                    time: 3
                });
            } else {
                $("#submitFail").val('');
                $("#password").tips({
                    side: 3,
                    msg: submitFail,
                    bg: '#AE81FF',
                    time: 3
                });
            }
        }
        $('#loginBtn').on('click', function (e) {
            if (check()) {
                submitForm();
            }
            return false;
        });

        function submitForm() {
            var options = {
                url: '/login',
                type: 'post',
                dataType: 'text',
                data: $(".login__form").serialize(),
                success: function (data) {
                    $(".login__submit").removeClass('processing');
                    window.location = "login";
                }
            }

            $.ajax(options);
        };

        function check() {
            if ($("#username").val() == "") {
                $("#username").tips({
                    side: 1,
                    msg: '用户名不得为空',
                    bg: '#AE81FF',
                    time: 3
                });
                $("#username").focus();
                return false;
            } else {
                $("#username").val(jQuery.trim($('#username').val()));
            }
            if ($("#password").val() == "") {

                $("#password").tips({
                    side: 3,
                    msg: '密码不得为空',
                    bg: '#AE81FF',
                    time: 3
                });
                $("#password").focus();
                return false;
            }
            return true;
        };
    });
</script>
</body>
</html>