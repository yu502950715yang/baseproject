var dictDefineObj = function () {
    var dataTable;
    var $table = $("#dataTable");

    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery: function (data) {
                data.dictName = $("#dictNameQuery").val();
                data.description = $("#describeQuery").val();
            },
            dataTable: {
                "ajax": {
                    "url": "/b/core/dictValue/getDictDefineListPage" // ajax source
                },
                "columns": [
                    {data: 'dictName', orderable: true},
                    {data: 'description', orderable: true},
                    {
                        data: 'actions', orderable: false,
                        render: function (data, type, full) {
                            return template("actionBtn", {data: data, type: type, full: full, i18n: i18n});
                        }
                    }
                ]
            }
        });
    };
    var isEditing = false;

    /**  主页DictDefine 事件绑定    */
    var handleEvent = function () {
        $("#showAddDictDefine").on("click", function () {
            //打开新增DictDefine输入框方法
            if (isEditing) {
                toast.warning(i18n.common.completeEditor);
                return;
            }
            var templateHtml = customGlobal.remoteTemplate("template/core/dictValue/addDictDefine.html", {i18n:i18n});
            $("#addDictDefineForm").html(templateHtml).show();
            isEditing = true;
        });
        $table.on("click", "#addDictDefineBtn", function () {
                // 新增dictDefine保存方法
                if ($("#mainForm").validate().form()) {
                    var data = {
                        dictName: $("#addDictName").val(),
                        description: $("#addDescription").val()
                    };
                    $.ajax({
                        url: "/b/core/dictValue/dictDefine",
                        type: "post",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            dataTable.reloadTable(false);
                            $("#addDictDefineForm").hide();
                            isEditing = false;
                        }
                    });
                }
            })
            .on("click", "#cancelAdd", function () {
                // 隐藏新增dictDefine form
                $("#addDictDefineForm").hide();
            })
            .on("click", "a.delete", function () {
                //删除dictDefine
                if (isEditing) {
                    toast.warning(i18n.common.completeEditor);
                    return;
                }
                var deleteBtn = $(this);
                customGlobal.showConfirm();
                $("#confirmBtn").off("click.deleteRow").on("click.deleteRow", function () {
                    $.ajax({
                        url: "/b/core/dictValue/dictDefine?dictName=" + $table.DataTable().row(deleteBtn.parents('tr')[0]).data().dictName,
                        dataType: "json",
                        type: "DELETE"
                    }).done(function (data) {
                        $("#confirmDialog").modal("hide");
                        if (customGlobal.ajaxCallback(data)) {
                            dataTable.reloadTable(false);
                        }
                    })
                })
            })
            .on("click", "a.edit", function () {
                // 点击编辑按钮
                if (isEditing) {
                    toast.warning(i18n.common.completeEditor);
                    return;
                }
                var updateBtn = $(this);
                var nRow = updateBtn.parents('tr')[0];
                var dictDefine = $table.DataTable().row(nRow).data();

                var templateHtml = customGlobal.remoteTemplate("template/core/dictValue/updateDictDefine.html", {dictDefine: dictDefine,i18n:i18n});
                $("#tbody").find("tr:eq(" + nRow._DT_RowIndex + ")").html(templateHtml);
                isEditing = true;
            })
            .on("click", "a.update", function () {
                // 编辑保存
                if ($("#mainForm").validate().form()) {
                    var $updateDictName = $("#updateDictName");
                    var data = {
                        dictName: $updateDictName.val(),
                        description: $("#updateDescription").val()
                    };

                    $.ajax({
                        url: "/b/core/dictValue/dictDefine?oriDictName=" + $updateDictName.data("dictName"),
                        type: "put",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            dataTable.reloadTable(false);
                            isEditing = false;
                        }
                    });
                }
            })
            .on("click", "a.cancel", function () {
                // 取消编辑
                dataTable.reloadTable(false);
                isEditing = false;
            })
            .on("click", "a.showDict", function () {
                // 显示dictValue
                var dictName = $table.DataTable().row($(this).parents('tr')[0]).data().dictName;
                dictValueObj.showDialog(dictName);
            });
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();
