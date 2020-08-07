var roleListTable = function () {

    var dataTable;
    var zTreeObj;
    var $table = $("#dataTable");
    var zNodes;
    var userList;
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery: function (data) {
                data.roleName = $("#roleNameQuery").val().trim();
                data.description = $("#descriptionQuery").val().trim();
            },
            dataTable: {
                responsive: true,
                "ajax": {
                    "url": "/core/role/getRoleListPage" // ajax source
                },
                "columns": [
                    {data: 'roleName', orderable: true, className:'control'},
                    {data: 'description', orderable: true},
                    {data: 'userList', orderable: false,
                        render: function (data, type, full) {
                            return template("userTable",{userList: data})
                        }
                    },
                    {
                        data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return template("actionBtn", {data: data, type: type, full: full});
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addRole").on("click", function () {
            var templateHtml = customGlobal.remoteTemplate("template/core/role/addRole.html", {userList: userList});
            $("#modalDialog").html(templateHtml).modal("show");
            zTreeInit();
            $('#usernameList').select2({ language:'zh-CN'});
            initAddBtn();
        });

        function initAddBtn() {

            $("#addBtn").on("click", function () {

                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    $.ajax({
                        url: "/b/core/role",
                        data: JSON.stringify({
                            roleName: $.trim($("#roleName").val()),
                            description: $.trim($("#description").val()),
                            userList: $("#usernameList").val(),
                            permTokenList: getPermTokens()
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

        function getPermTokens() {
            var nodes = zTreeObj.getCheckedNodes();
            //去掉重复的permToken
            var permTokenObj = {};
            for (var node in nodes) {
                if (nodes[node].permToken != "") {
                    permTokenObj[nodes[node].permToken] = nodes[node].permToken;
                }
            }
            var permTokens = [];
            for (node in permTokenObj) {
                permTokens.push(permTokenObj[node]);
            }
            return permTokens;
        }

        $table.on("click", "a.edit", function () {

            $.get("/b/core/role/" + $(this).attr("roleId"), function (data) {

                var role = data.returnData.role;
                var templateHtml = customGlobal.remoteTemplate("template/core/role/updateRole.html",
                    {
                        role: role,
                        userList: userList
                    });
                var $template = $(templateHtml);

                var $usernameList = $template.find("#usernameList");
                $usernameList.find("option").removeAttr("selected");
                var usernameList = data.returnData.usernameList;

                for (var i = 0; i < usernameList.length; i++) {
                    var str = "option[value=" + usernameList[i].userId + "]";
                    $usernameList.find(str).attr("selected", "selected")
                }

                $usernameList.select2({ language:'zh-CN'});
                $("#modalDialog").html($template).modal("show");
                zTreeInit(data.returnData.permTokenTree);
                initUpdateBtn();
            });
        });

        function initUpdateBtn() {
            $("#updateBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    var data = {
                        roleId: $("#roleId").val(),
                        roleName: $.trim($("#roleName").val()),
                        description: $.trim($("#description").val()),
                        userList: $("#usernameList").val(),
                        permTokenList: getPermTokens()
                    };

                    $.ajax({
                        url: "/b/core/role",
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
                    url: "/b/core/role/" + $table.DataTable().row($this.parents('tr')[0]).data().roleId,
                    dataType: "json",
                    type: "DELETE"
                }).done(function (data) {
                    $("#confirmDialog").modal("hide");
                    if (customGlobal.ajaxCallback(data)) {
                        dataTable.reloadTable();
                    }
                })
            })
        });
    };

    var zTreeInit = function (node) {
        node = node == undefined ? zNodes : node;
        zTreeObj = $.fn.zTree.init($("#permissionTree"), {
            check: {
                enable: true
            },
            view: {
                showLine: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        }, node);
    };

    return {
        init: function (zTreeNodes, userListData) {
            handleRecords();
            handleEvent();
            zNodes = zTreeNodes;
            userList = userListData;
        }
    };
}();
