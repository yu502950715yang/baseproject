var userListTable = function () {

    var dataTable;
    var zTreeObj;
    var $table = $("#dataTable");
    var zNodes;
    var roleList;
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery: function (data) {
                data.username = jQuery.trim($("#usernameQuery").val());
                data.nickname = jQuery.trim($("#nicknameQuery").val());
                data.phone = jQuery.trim($("#phoneQuery").val());
            },
            dataTable: {
                "ajax": {
                    "url": "/b/core/user/getUserListPage"
                },
                "columns": [
                    {data: 'username', orderable: true},
                    {data: 'nickname', orderable: true},
                    {data: 'phone', orderable: false},
                    {data: 'roleName', orderable: false},
                    {
                        data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return template("actionBtn", {data: data, type: type, full: full, i18n: i18n});
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addUser").on("click", function () {
            var $templateHtml = $(customGlobal.remoteTemplate("template/core/user/addUser.html", {
                roleList: roleList,
                i18n: i18n
            }));
            customGlobal.inputInit($templateHtml);
            $("#modalDialog").html($templateHtml).modal("show");
            $('#roleList').select2();
            initAddBtn();
        });

        function initAddBtn() {
            $("#addBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    $.ajax({
                        url: "/b/core/user",
                        data: JSON.stringify({
                            username: $.trim($("#username").val()),
                            nickname: $.trim($("#nickname").val()),
                            phone: $.trim($("#phone").val()),
                            password: $.trim($("#password").val()).md5(),
                            roleList: $("#roleList").val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        type: "post",
                        dataType: "json"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            dataTable.reloadTable();
                        }
                    });
                }
            });
        }

        function getOrgans() {
            var nodes = zTreeObj.getCheckedNodes();
            //去掉重复的organ
            var organObj = {};
            for (var node in nodes) {
                if (nodes[node].organizationId != "") {
                    organObj[nodes[node].organizationId] = nodes[node].organizationId;
                }
            }
            var organs = [];
            for (node in organObj) {
                organs.push(organObj[node]);
            }
            return organs;
        }

        $table.on("click", "a.edit", function () {
            $.get("/b/core/user/" + $(this).attr("userId"), function (data) {
                var user = data.returnData.user;
                var $templateHtml = $(customGlobal.remoteTemplate("template/core/user/updateUser.html", {
                    user: user,
                    roleList: roleList,
                    i18n: i18n
                }));
                customGlobal.inputInit($templateHtml);
                var $roleList = $templateHtml.find("#roleList");
                $roleList.find("option").removeAttr("selected");
                var roleListData = data.returnData.roleList;
                for (var i = 0; i < roleListData.length; i++) {
                    var str = "option[value=" + roleListData[i].roleId + "]";
                    $roleList.find(str).attr("selected", "selected")
                }
                $roleList.select2();
                $("#modalDialog").html($templateHtml).modal("show");
                initUpdateBtn();
            });
        });


        function initUpdateBtn() {
            $("#updateBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    var data = {
                        userId: $.trim($("#userId").val()),
                        username: $.trim($("#username").val()),
                        nickname: $.trim($("#nickname").val()),
                        phone: $.trim($("#phone").val()),
                        roleList: $("#roleList").val()
                    };
                    var $password = $("#password");
                    if ($password.val() != "") {
                        data.password = $.trim($password.val()).md5();
                    }
                    $.ajax({
                        url: "/b/core/user",
                        data: JSON.stringify(data),
                        type: "put",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            dataTable.reloadTable();
                        }
                    });
                }
            });
        }

        $table.on("click", "a.delete", function () {
            var $this = $(this);
            customGlobal.showConfirm();
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/user/" + $table.DataTable().row($this.parents('tr')[0]).data().userId,
                    type: "DELETE",
                    dataType: "json"
                }).done(function (data) {
                    $("#confirmDialog").modal("hide");
                    if (customGlobal.ajaxCallback(data)) {
                        dataTable.reloadTable();
                    }
                })
            })
        });

        $("#exportUser").on("click", function () {
            customGlobal.formSubExport("/b/core/user/exportUser", dataTable.getQueryArray());
        });

        $("#importUser").on("click", function () {
            var $templateHtml = $(customGlobal.remoteTemplate("template/core/importExcel/importExcelCommon.html",
                {i18n: i18n}));
            $("#modalDialog").html($templateHtml).modal("show");
            initImportExcel();
            $("#downloadFail").hide();
        });

        $("#downloadExcel").on("click", function () {
            window.location.href = basePath + "download/" + $(this).attr("downloadName");
        })
    };
    var zTreeInit = function (node) {
        node = node == undefined ? zNodes : node;
        zTreeObj = $.fn.zTree.init($("#organizationTree"), {
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: {"Y": "", "N": ""}
            },
            view: {
                showLine: false
            },
            data: {
                key: {
                    name: "organizationName"
                },
                simpleData: {
                    enable: true,
                    idKey: "organizationId",
                    pIdKey: "parentId"
                }
            }
        }, node);
    };

    var initDownloadFail = function (path) {
        var $downLoadFail = $("#downloadFail");
        $downLoadFail.show();
        $downLoadFail.on("click", function () {
            window.location.href = basePath + "/b/core/user/downloadFail?path=" + path;
        })
    };

    var initImportExcel = function () {
        $("#excelFileOne").fileinput({
            'theme': 'explorer-fa',
            language: 'zh', //设置语言
            uploadUrl: "/b/core/user/importUser",
            enctype: 'multipart/form-data',
            uploadExtraData: {"id": 1},
            uploadAsync: true, //默认异步上传
            showCaption: true,//是否显示标题
            showUpload: true, //是否显示上传按钮
            showClose: false,//关闭按钮
            showRemove: true,//移除按钮
            showCancel: false,//取消按钮
            browseOnZoneClick: true,//点击列表区域打开查找文件
            browseClass: "btn btn-primary", //按钮样式
            allowedFileExtensions: ["xls", "xlsx"], //接收的文件后缀
            maxFileCount: 1,//最大上传文件数限制
            minFileCount: 1,
            previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
            showPreview: true, //是否显示预览
            previewFileIconSettings: {
                'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
                'xls': '<i class="fa fa-file-excel-o text-success"></i>'
            },
            dropZoneTitle: '拖拽文件到这里 &hellip;',
            dropZoneClickTitle: '',
            msgPlaceholder: '选择文件',
            fileActionSettings: {
                showRemove: true,
                showUpload: false,
                showDownload: false,
                showZoom: false,
                showDrag: false
            }
        }).on("fileuploaderror", function (msg, params, event) {
            if (!params.response.ok) {
                toast.error(params.response.error);
                initDownloadFail(params.response.returnData.path);
            }
        }).on("fileuploaded", function (event, data, previewId, index) {
            $("#modalDialog").modal("hide");
            dataTable.reloadTable();
        })
    };

    return {
        init: function (roleListData) {
            handleRecords();
            handleEvent();
            roleList = roleListData;
        }
    };
}();
