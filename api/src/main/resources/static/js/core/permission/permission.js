var permissionListTable = function () {

    var dataTable;
    var $table = $("#dataTable");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        handlePermissionEvent.hideAdd();
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery: function (data) {
                data.permToken = $("#permTokenQuery").val();
                data.description = $("#descriptionQuery").val();
            },
            dataTable: {
                "ajax": {
                    "url": "/b/core/permission/getPermissionListPage" // ajax source
                },
                "order": [],
                "columns": [
                    {data: null, targets:0},
                    {data: 'permToken', orderable: true},
                    {data: 'description', orderable: true},
                    {data: 'parentId', orderable: true},
                    {
                        data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return template("actionBtn", {data: data, type: type, full: full, i18n: i18n});
                        }
                    }
                ],
                "drawCallback": function (oSettings) { // run some code on table redraw
                    var api = this.api();
                    var startIndex = api.context[0]._iDisplayStart;//获取到本页开始的条数 　
                    api.column(0).nodes().each(function (cell, i) {
                        cell.innerHTML = startIndex + i + 1;
                    });
                }
            }
        });
    };

    var handlePermissionEvent = {

        isEditable: true,
        editPermission: {
            permToken: "",
            parentId: "",
            description: ""
        },
        showAdd: function () {
            if (!handlePermissionEvent.isEditable) {
                toast.error(i18n.common.completeEditor);
                return;
            }
            handlePermissionEvent.isEditable = false;
            $("#addPermissionForm").show();
        },
        hideAdd: function () {
            handlePermissionEvent.isEditable = true;
            $("#addPermissionForm").hide()
        },
        addPermission: function () {
            var data = {
                permToken: $("#addPermToken").val(),
                parentId: $("#addParentId").val(),
                description: $("#addDescription").val()
            };
            $.ajax({
                url: "/b/core/permission",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (customGlobal.ajaxCallback(data)) {
                        handlePermissionEvent.isEditable = true;
                        handlePermissionEvent.hideAdd();
                        dataTable.reloadTable(false);
                    }
                }
            })
        },
        deletePermission: function (table) {
            customGlobal.showConfirm();
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/permission/" + $table.DataTable().row(table.parents('tr')[0]).data().permToken,
                    dataType: "json",
                    type: "DELETE",
                    success: function (data) {
                        $("#confirmDialog").modal("hide");
                        if (customGlobal.ajaxCallback(data)) {
                            dataTable.reloadTable();
                        }
                    }
                })
            })
        },
        showInput: function (table) {
            if (!handlePermissionEvent.isEditable) {
                toast.error(i18n.common.completeEditor);
                return;
            }
            handlePermissionEvent.isEditable = false;
            var nRow = table.parents('tr')[0];
            var permission = $table.DataTable().row(nRow).data();
            handlePermissionEvent.editPermission.permToken = permission.permToken;
            handlePermissionEvent.editPermission.parentId = permission.parentId;
            var jqTds = $('>td', nRow);
            jqTds[1].innerHTML = '<input type="text" id="updateDescription" class="form-control input-sm" value="' + permission.description + '">';
            jqTds[2].innerHTML = '<input type="text" id="updateParentId" class="form-control input-sm" value="' + permission.parentId + '">';
            jqTds[3].innerHTML = '<a class="update btn btn-xs green" href="javascript:;"><i class="fa fa-edit"></i>' + i18n.common.save + '</a>&nbsp;' +
                '<a class="cancel btn btn-outline grey-gallery btn-xs" href="javascript:;"><i class="fa fa-times"></i>' + i18n.common.cancel + '</a>';
        },
        hideInput: function () {
            handlePermissionEvent.isEditable = true;
            dataTable.reloadTable(false);
        },
        updatePermission: function () {
            handlePermissionEvent.editPermission.description = $("#updateDescription").val();
            handlePermissionEvent.editPermission.parentId = $("#updateParentId").val();
            $.ajax({
                url: "/b/core/permission",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(handlePermissionEvent.editPermission),
                type: "PUT",
                success: function (data) {
                    $("#confirmDialog").modal("hide");
                    if (customGlobal.ajaxCallback(data)) {
                        dataTable.reloadTable();
                        handlePermissionEvent.isEditable = true;
                    }
                }
            })
        }
    };
    var handleEvent = function () {
        $("#showAddPermission").on("click", handlePermissionEvent.showAdd);
        $("#cancelAdd").on("click", handlePermissionEvent.hideAdd);
        $("#addPermissionButton").on("click", handlePermissionEvent.addPermission);
        $table.on("click", "a.delete", function () {
            handlePermissionEvent.deletePermission($(this));
        });
        $table.on("click", "a.update", handlePermissionEvent.updatePermission);
        $table.on("click", "a.edit", function () {
            handlePermissionEvent.showInput($(this));
        });
        $table.on("click", "a.cancel", handlePermissionEvent.hideInput);
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();
