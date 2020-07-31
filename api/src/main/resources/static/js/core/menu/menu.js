var menuTree = function () {

    var setting = {
        check: {
            enable: true
        },
        view: {
            addDiyDom: addDiyDom,
            selectedMulti: false,
            showIcon: false,
            showLine: false
        },
        data: {
            simpleData: {
                rootPId: -1,
                enable: true
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
    var zTreeObj;

    function initTree() {
        $.get("/b/core/menu/getMenuTree", function (data) {
            zTreeObj = $.fn.zTree.init($("#menuTree"), setting, data.returnData);
        });
    }

    function addDiyDom(treeId, treeNode) {
        var menuIcon = treeNode.menuIcon == undefined ? "" : treeNode.menuIcon;
        var afterString =
            "<span class='diy-dom font-blue'>menuId:</span>" + treeNode.id +
                "<span class='diy-dom font-blue'>permToken:</span>" + treeNode.permToken +
                "<span class='diy-dom font-blue'>level:</span>" + treeNode.level;
        if (treeNode.menuUrl) {
            afterString = afterString + "<span class='diy-dom font-blue'>url:</span>" + treeNode.menuUrl;
        }
        if (treeNode.memo) {
            afterString = afterString + "<span class='diy-dom font-blue'>备注:</span>" + treeNode.memo;
        }
        $("#" + treeNode.tId + "_a")
            .before("<i class='" + menuIcon + "'></i>")
            .after(afterString)
    }

    function onRightClick(event, treeId, treeNode) {
        if (treeNode) {
            zTreeObj.selectNode(treeNode);
            showContextMenu(treeNode.leaf, event.clientX + 5, event.clientY + 10);
        }
    }

    function showContextMenu(leaf, x, y) {
        $("#treeContextMenu").css({"top": y + "px", "left": x + "px"}).show();
        if(leaf){
            $(".dropdown-menu").find("li:first").hide();
        }else{
            $(".dropdown-menu").find("li").show();
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

    function validateMenu(menu) {
        if (menu.menuId == "" ||menu.menuName == "" || menu.leaf == "" || menu.status == "") {
            toast.error(i18n.menu.fillRequired);
            return false;
        }
        return true;
    }

    var handleEvent = function () {
        $("#treeReload").on("click", initTree);

        $("#addChildMenu").on("click", function () {
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            if (selectedNode.leaf == 1) {
                toast.error(i18n.menu.leafUnableAdd);
                return;
            }
            var templateHtml = customGlobal.remoteTemplate("template/core/menu/addMenu.html",
                {
                    title: i18n.menu.addSub,
                    pid: selectedNode.id,
                    prefix_id: selectedNode.id,
                    level: parseInt(selectedNode.level, 10) + 1,
                    sortId:1000
                });
            $("#modalDialog").html(templateHtml).modal("show");
            initAddBtn();
        });
        $("#addSiblingMenu").on("click", function () {
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            var templateHtml = customGlobal.remoteTemplate("template/core/menu/addMenu.html",
                {
                    title: i18n.menu.addSibling,
                    pid: selectedNode.pId,
                    level: selectedNode.level,
                    sortId:parseFloat(selectedNode.sortId) + 1
                });
            $("#modalDialog").html(templateHtml).modal("show");
            initAddBtn();
        });
        function initAddBtn() {
            $("#addBtn").on("click", function () {
                var menu = {
                    menuId: $("#myMenuId").val(),
                    menuName: $("#menuName").val(),
                    icon: $("#icon").val(),
                    url: $("#url").val(),
                    permToken: $("#permToken").val(),
                    parentId: $("#parentId").val(),
                    level: $("#level").val(),
                    leaf: $("input[name=leaf]:checked").val(),
                    sortId: $("#sortId").val(),
                    memo: $("#memo").val(),
                    status: $("input[name=status]:checked").val()
                }
                if (!validateMenu(menu)) {
                    return;
                }
                $.post("/b/core/menu", menu, function (data) {

                    /**
                     * 此段为获得添加菜单的sql
                     */
                    var split = $("#modalTitle").html() + " : " + $("#menuName").val() + "\n\n";
                    getAddSql(split, menu);

                    if (customGlobal.ajaxCallback(data)) {
                        $("#modalDialog").modal("hide");
                        initTree();
                    }
                });
            });
        }
        //获取新增的sql
        $("#addSqlBtn").on("click", function () {
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            var menu = {
                menuId:selectedNode.id,
                menuName: selectedNode.name,
                icon: selectedNode.menuIcon,
                url: selectedNode.menuUrl,
                permToken: selectedNode.permToken,
                parentId: selectedNode.pId,
                level: selectedNode.level,
                leaf: selectedNode.leaf,
                sortId: selectedNode.sortId,
                memo: selectedNode.memo,
                status: $("input[name=status]:checked").val()
            }

            var split = i18n.menu.addSqlBtn+" : "+selectedNode.name+"\n\n";
            getAddSql(split,menu);
            hideContextMenu();
        });

        $("#toUpdateBtn").on("click", function () {
            $.get("/b/core/menu/" + zTreeObj.getSelectedNodes()[0].id, function (data) {
                var menu = data.returnData;
                var templateHtml = customGlobal.remoteTemplate("template/core/menu/updateMenu.html", { menu: menu});
                $("#modalDialog").html(templateHtml).modal("show");
                initUpdateBtn()
            })
        });
        $("#deleteBtn").on("click",function(){
            customGlobal.showConfirm();
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/menu/" + zTreeObj.getSelectedNodes()[0].id,
                    type: "DELETE",
                    dataType:"json",
                    success: function (data) {
                        var split = i18n.common.delete+" : "+zTreeObj.getSelectedNodes()[0].name+"\n\n";
                        getDeleteSql(split);

                        $("#confirmDialog").modal("hide");
                        if (customGlobal.ajaxCallback(data)) {
                            initTree();
                        }
                    }
                })
            });
        })

        $("#deleteSqlBtn").on("click", function () {
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            var split = i18n.menu.deleteSqlBtn+" : "+selectedNode.name+"\n\n";
            getDeleteSql(split);
        })

        function getDeleteSql(split) {
            var selectedNode = zTreeObj.getSelectedNodes()[0];
            var sql = getSqlOfDeleteMenu(selectedNode.id, selectedNode.permToken);
            $("#sqlArea").val($("#sqlArea").val() != "" ? $("#sqlArea").val() + "\n\n\n" + split + sql : split + sql);
            var scrollTop = $("#sqlArea")[0].scrollHeight;
            $("#sqlArea").scrollTop(scrollTop);
            hideContextMenu();
        }

        function getAddSql(split,menu){
            var sql = getSqlOfAddMenu(menu);
            $("#sqlArea").val($("#sqlArea").val() != "" ? $("#sqlArea").val() + "\n\n\n" + split + sql : split + sql);
            var scrollTop = $("#sqlArea")[0].scrollHeight;
            $("#sqlArea").scrollTop(scrollTop);
            hideContextMenu();
        }
    };

    function initUpdateBtn() {
        $("#updateBtn").on("click", function () {

            var menu = {
                menuId: $("#myMenuId").val(),
                menuName: $("#menuName").val(),
                icon: $("#icon").val(),
                url: $("#url").val(),
                permToken: $("#permToken").val(),
                parentId: $("#parentId").val(),
                level: $("#level").val(),
                leaf: $("input[name=leaf]:checked").val(),
                sortId: $("#sortId").val(),
                memo: $("#memo").val(),
                status: $("input[name=status]:checked").val()
            }
            if (!validateMenu(menu)) {
                return;
            }
            $.ajax({
                url: "/b/core/menu",
                data: menu,
                type: "put",
                dataType: "json",
                success: function (data) {

                    /**
                     * 此段为获得修改菜单的sql
                     */
                    var split = $("#modalTitle").text() + " : " + $("#menuName").val() + "\n\n";
                    getUpdateSql(split, menu);

                    if (customGlobal.ajaxCallback(data)) {
                        $("#modalDialog").modal("hide");
                        initTree();
                    }
                }
            })

            function getUpdateSql(split, menu) {
                var sql = getSqlOfUpdateMenu(menu);
                $("#sqlArea").val($("#sqlArea").val() != "" ? $("#sqlArea").val() + "\n\n\n" + split + sql : split + sql);
                var scrollTop = $("#sqlArea")[0].scrollHeight;
                $("#sqlArea").scrollTop(scrollTop);
                hideContextMenu();
            }
        });
    }

    $("#saveOrder").on("click", function () {
        var zTreeNodes = zTreeObj.transformToArray(zTreeObj.getNodes());
        var nodeArray = [];
        for (var i = 0, ii = zTreeNodes.length; i < ii; i++) {
            var node = zTreeNodes[i];
            nodeArray.push({
                menuId: node.id,
                parentId: node.pId,
                level: node.level,
                leaf: !node.isParent,
                sortId: i,
                status: node.checked
            })
        }
        $.ajax({
            url: "/b/core/menu/updateMenuOrder",
            data: JSON.stringify(nodeArray),
            type: "put",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (customGlobal.ajaxCallback(data)) {
                    $("#modalDialog").modal("hide");
                    initTree();
                }
            }
        });
    });

    var getSqlOfDeleteMenu = function(menuId, permToken){

        var aclPermissionSql = "DELETE FROM sys_permission WHERE perm_token=#{permToken};";
        var aclRolePermissionSql = "DELETE FROM sys_role_permission where perm_token=#{permToken};";
        var aclMenuSql = "DELETE FROM sys_menu WHERE menu_id=#{menuId};";

        aclPermissionSql = aclPermissionSql.replace("#{permToken}", "'" + permToken + "'");
        aclRolePermissionSql = aclRolePermissionSql.replace("#{permToken}", "'" + permToken + "'");
        aclMenuSql = aclMenuSql.replace("#{menuId}", "'" + menuId + "'");

        return aclPermissionSql +" \n"+ aclRolePermissionSql +" \n"+ aclMenuSql;
    }

    var getSqlOfAddMenu = function(menu){

        var aclMenuSql = "INSERT INTO sys_menu(menu_id,menu_name,icon,url,perm_token,parent_id,level,leaf,sort_id,memo,status) VALUES (" +
            "#{menuId},#{menuName},#{icon},#{url},#{permToken},#{parentId},#{level},#{leaf},#{sortId},#{memo},#{status});";

        var aclPermissionSql = "INSERT INTO sys_permission (perm_token,description,parent_id) VALUES (#{permToken},#{description},#{parentId});";

        if(menu.menuId != ""){
            aclMenuSql = aclMenuSql.replace("#{menuId}", "'" + menu.menuId + "'");
        }else{
            aclMenuSql = aclMenuSql.replace("#{menuId}", "''");
        }

        if (menu.menuName != "") {
            aclMenuSql = aclMenuSql.replace("#{menuName}", "'" + menu.menuName + "'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{menuName}", "''");
        }

        if (menu.icon != "") {
            aclMenuSql = aclMenuSql.replace("#{icon}", "'" + menu.icon + "'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{icon}", "''");
        }

        if (menu.url != "") {
            aclMenuSql = aclMenuSql.replace("#{url}", "'" + menu.url + "'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{url}", "''");
        }

        if (menu.permToken != "") {
            aclMenuSql = aclMenuSql.replace("#{permToken}", "'" + menu.permToken + "'");
            aclPermissionSql = aclPermissionSql.replace("#{permToken}", "'" + menu.permToken + "'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{permToken}", "''");
            aclPermissionSql = aclPermissionSql.replace("#{permToken}", "''");
        }

        if (menu.parentId != "") {
            aclMenuSql = aclMenuSql.replace("#{parentId}", "'" + menu.parentId + "'");
            aclPermissionSql = aclPermissionSql.replace("#{parentId}", "'" + menu.parentId + "'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{parentId}", "''");
            aclPermissionSql = aclPermissionSql.replace("#{parentId}", "''");
        }

        if (menu.level != "") {
            aclMenuSql = aclMenuSql.replace("#{level}", "'" + menu.level + "'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{level}", "''");
        }

        if (menu.leaf != "") {
            aclMenuSql = aclMenuSql.replace("#{leaf}", "'1'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{leaf}", "'0'");
        }

        aclMenuSql = aclMenuSql.replace("#{sortId}", "'" + menu.sortId + "'");

        if (menu.memo != "" && menu.memo != null) {
            aclMenuSql = aclMenuSql.replace("#{memo}", "'" + menu.memo + "'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{memo}", "''");
        }

        if (menu.status != "") {
            aclMenuSql = aclMenuSql.replace("#{status}", "'1'");
        } else {
            aclMenuSql = aclMenuSql.replace("#{status}", "'0'");
        }

        if (menu.menuName != "") {
            aclPermissionSql = aclPermissionSql.replace("#{description}", "'" + menu.menuName + "'");
        } else {
            aclPermissionSql = aclPermissionSql.replace("#{description}", "''");
        }

        return aclMenuSql +" \n"+ aclPermissionSql;
    }

    var getSqlOfUpdateMenu = function(menu) {

        var deletePermissionSql = "DELETE FROM sys_permission WHERE perm_token=#{permToken};";
        var addPermissionSql =  "INSERT INTO sys_permission (perm_token,description,parent_id) VALUES (#{permToken},#{description},#{parentId});";
        var updateMenuSql = "UPDATE sys_menu SET menu_name=#{menuName},icon=#{icon},url=#{url},perm_token=#{permToken},parent_id=#{parentId},"+
            "level=#{level},leaf=#{leaf},sort_id=#{sortId},memo=#{memo},status=#{status}"+
            " WHERE menu_id=#{menuId};";


        deletePermissionSql = deletePermissionSql.replace("#{permToken}", "'" + menu.permToken + "'");

        addPermissionSql = addPermissionSql.replace("#{permToken}", "'" + menu.permToken + "'");
        addPermissionSql = addPermissionSql.replace("#{description}", "'" + menu.menuId + "'");
        addPermissionSql = addPermissionSql.replace("#{parentId}", "'" + menu.menuName + "'");


        updateMenuSql = updateMenuSql.replace("#{menuId}", "'" + menu.menuId + "'");

        if (menu.menuName != "") {
            updateMenuSql = updateMenuSql.replace("#{menuName}", "'" + menu.menuName + "'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{menuName}", "''");
        }

        if (menu.icon != "") {
            updateMenuSql = updateMenuSql.replace("#{icon}", "'" + menu.icon + "'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{icon}", "''");
        }

        if (menu.url != "") {
            updateMenuSql = updateMenuSql.replace("#{url}", "'" + menu.url + "'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{url}", "''");
        }

        if (menu.permToken != "") {
            updateMenuSql = updateMenuSql.replace("#{permToken}", "'" + menu.permToken + "'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{permToken}", "''");
        }

        if (menu.parentId != "") {
            updateMenuSql = updateMenuSql.replace("#{parentId}", "'" + menu.parentId + "'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{parentId}", "''");
        }

        if (menu.level != "") {
            updateMenuSql = updateMenuSql.replace("#{level}", "'" + menu.level + "'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{level}", "''");
        }

        if (menu.leaf != "") {
            updateMenuSql = updateMenuSql.replace("#{leaf}", "'1'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{leaf}", "'0'");
        }

        updateMenuSql = updateMenuSql.replace("#{sortId}", "'" + menu.sortId + "'");

        if (menu.memo != "" && menu.memo != null) {
            updateMenuSql = updateMenuSql.replace("#{memo}", "'" + menu.memo + "'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{memo}", "''");
        }

        if (menu.status != "") {
            updateMenuSql = updateMenuSql.replace("#{status}", "'1'");
        } else {
            updateMenuSql = updateMenuSql.replace("#{status}", "'0'");
        }

        return deletePermissionSql +" \n"+ addPermissionSql +" \n"+ updateMenuSql;
    }

    return {
        init: function () {
            initTree();
            handleEvent();
        }
    };
}();
