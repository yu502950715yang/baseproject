var organTree = function () {
    var setting = {
        check: {
            enable: false
        },
        view: {
            showIcon: showIconForTree,
            /*addDiyDom: addDiyDom,*/
            selectedMulti: false
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
        },
        edit: {
            drag: {
                isCopy: false
            },
            enable: true,
            showRenameBtn: false,
            showRemoveBtn: false
        },
        callback: {
            onRightClick: onRightClick
        }
    };

    function showIconForTree() {
        return false;
    }

    var zTreeObj;

    function initTree() {
        $.get("/b/core/organ/getOrganTreeList", function (data) {
            zTreeObj = $.fn.zTree.init($("#organTree"), setting, data.returnData);
            zTreeObj.expandAll(true);
        });
    }

    function onRightClick(event, treeId, treeNode) {
        if (treeNode) {
            zTreeObj.selectNode(treeNode);
            showContextMenu(treeNode.organizationId, treeNode.leaf, event.clientX + 5, event.pageY + 10);
        }
    }

    function showContextMenu(type, leaf, x, y) {
        $("#treeContextMenu").css({"top": y + "px", "left": x + "px"}).show();
        if (type == -1) {
            $("#toUpdateBtn").hide();
            $("#deleteBtn").hide();
        }
        else {
            $("#toUpdateBtn").show();
            $("#deleteBtn").show();
        }
        if (leaf) {
            $("#addChildOrgan").hide();
        } else {
            $("#addChildOrgan").show();
        }
        $("body").on("mousedown", onBodyMouseDown);
    }

    function hideContextMenu() {
        $("#treeContextMenu").hide();
        $("body").off("mousedown", onBodyMouseDown);
    }

    function onBodyMouseDown(event) {
        if (!(event.target.id == "treeContextMenu" || $(event.target).parents("#treeContextMenu").length > 0)) {
            hideContextMenu();
        }
    }

    var handleEvent = function () {
        $("#treeReload").on("click", initTree);
        function initUserList1() {
            $.get("/b/core/organ/getUserListToAddOrgan", function (data) {
                var userList = data.returnData;
                $("#originalSelect").empty();
                for (var i = 0; i < userList.length; i++) {
                    $("#originalSelect").append('<option value=' + userList[i].userId + '>' + userList[i].username + '</option>');
                }
            });
        }

        function initUserList2(organId) {
            var param = {
                organId: organId
            };
            $.get("/b/core/organ/getUserListToUpdateOrgan", param, function (data) {
                var userList = data.returnData;
                $("#originalSelect").empty();
                for (var i = 0; i < userList.length; i++) {
                    $("#originalSelect").append('<option value=' + userList[i].userId + '>' + userList[i].username + '</option>');
                }
            });
        }

        $("#addChildOrgan").on("click", function () {
            //validator.resetForm();
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            selectedNode.level=parseInt(selectedNode.level, 10) + 1;
            var templateHtml = customGlobal.remoteTemplate("template/core/organization/addOrganization.html",
                {
                    selectedNode:selectedNode,
                    i18n:i18n
                });
            $("#modalDialog").html(templateHtml).modal("show");
            $("#targetSelect").empty();
            initUserList1();
            initAddBtn();
        });

        function getUserList() {
            var userList = [];
            var $organSelectList = $("#targetSelect");
            $organSelectList.find("option").each(function () {
                var $this = $(this);
                userList.push({
                    userId: $this.val()
                })
            });
            return userList;
        }

        function getNoOrganUserList() {
            var userList = [];
            var $organSelectList = $("#originalSelect");
            $organSelectList.find("option").each(function () {
                var $this = $(this);
                userList.push({
                    userId: $this.val()
                })
            });
            return userList;
        }

        function initAddBtn() {
            $("#addBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    $.ajax({
                        url: "/b/core/organ",
                        data: JSON.stringify({
                            organizationId: $("#organId").val(),
                            organizationName: $("#organName").val(),
                            parentId: $("#parentId").val(),
                            level: $("#level").val(),
                            leaf: $("input[name=leaf]:checked").val(),
                            sortId: $("#sortId").val(),
                            state: $("input[name=state]:checked").val(),
                            userList: getUserList()
                        }),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "post"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            initTree();
                        }
                    });
                }
            });
        }

        $("#toUpdateBtn").on("click", function () {
            //validator.resetForm();
            $.get("/b/core/organ/" + zTreeObj.getSelectedNodes()[0].organizationId, function (data) {
                var organ = data.returnData;
                var templateHtml = customGlobal.remoteTemplate("template/core/organization/updateOrganization.html",
                    {
                        organ: organ,
                        i18n:i18n
                    });
                var $template = $(templateHtml);
                $("#modalDialog").html($template).modal("show");
                $("input[name=leaf]").removeAttr("checked").filter("[value=" + (organ.leaf ? "true" : "false") + "]").prop("checked", true);
                $("input[name=state]").removeAttr("checked").filter("[value=" + (organ.state ? "true" : "false") + "]").prop("checked", true);
                initUserList2(organ.organizationId);
                var userList = organ.userList;
                $("#targetSelect").empty();
                for (var i = 0; i < userList.length; i++) {
                    $("#targetSelect").append('<option value=' + userList[i].userId + '>' + userList[i].username + '</option>');
                }
                initUpdateBtn();
            })
        });

        function initUpdateBtn() {
            $("#updateBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    var data = {
                        organizationId: $("#organId").val(),
                        organizationName: $("#organName").val(),
                        parentId: $("#parentId").val(),
                        level: $("#level").val(),
                        leaf: $("input[name=leaf]:checked").val(),
                        sortId: $("#sortId").val(),
                        state: $("input[name=state]:checked").val(),
                        userList: getUserList(),
                        userNoOrganList: getNoOrganUserList()
                    };
                    $.ajax({
                        url: "/b/core/organ",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "put"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            initTree();
                        }
                    })
                }
            });
        }
        $("#deleteBtn").on("click",function(){
            customGlobal.showConfirm({
                confirmContent:i18n.org.deleteOrganizationConfirm
            });
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/organ/" + zTreeObj.getSelectedNodes()[0].organizationId,
                    type: "DELETE",
                    success: function (data) {
                        $("#confirmDialog").modal("hide");
                        if (customGlobal.ajaxCallback(data)) {
                            initTree();
                        }
                    }
                })
            });
        })
    };

    var validator;
    var initValidator = function () {
        validator = $("#dialogForm").validate(
            {
                rules: {
                    organizationId: {
                        required: true,
                        digits: true,
                        maxlength: 11
                    },
                    organName: {
                        required: true,
                        maxlength: 200
                    },
                    sortId:{
                        digits: true
                    }
                }
            }
        );
    };

    return {
        init: function () {
            initTree();
            handleEvent();
            initValidator();
        }
    }
}();
