var dictValueObj = function () {

    var currentDictName;
    var statusList;
    var languageList;
    var isEditing = false;

    /**  第一弹出页  DictValue 事件绑定    */
    var handleEvent = function () {

        $("#dictDialog")
            .on("click", "#showAddDictValue", function () {
                if (isEditing) {
                    toast.warning(i18n.common.completeEditor);
                    return;
                }
                var templateHtml = customGlobal.remoteTemplate("template/core/dictValue/addDictValue.html", {
                    statusList: statusList,
                    languageList: languageList,
                    i18n:i18n
                });
                $("#addDictValueForm").html(templateHtml).show();
                isEditing = true;
            })
            .on("click", "#addDictBtn", function () {
                if ($("#detailDialogForm").validate().form()) {
                    $.ajax({
                        url: "/b/core/dictValue",
                        type: "POST",
                        data: JSON.stringify({
                            dictName: currentDictName,
                            dictCode: $("#dictCode").val(),
                            dictValue: $("#dictValue").val(),
                            locale: $("#dictLocale").val(),
                            status: $("#status").val(),
                            sortId: $("#sortId").val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#addDictValueForm").hide();
                            initDialog();
                            isEditing = false;
                        }
                    })
                }
            })
            .on("click", "#cancelAddDictValue", function () {
                $("#addDictValueForm").hide();
                isEditing = false;
            })
            .on("click", "a.delete", function () {
                if (isEditing) {
                    toast.error(i18n['pleaseEditTable']);
                    return;
                }
                customGlobal.showConfirm();
                var dictId = $(this).data("dictId");
                $("#confirmBtn").on("click.deleteRow", function () {
                    $.ajax({
                        url: "/b/core/dictValue/" + dictId,
                        dataType: "json",
                        type: "DELETE"
                    }).done(function (data) {
                        $("#confirmDialog").modal("hide");
                        if (customGlobal.ajaxCallback(data)) {
                            initDialog();
                        }
                    });
                })
            })
            .on("click", "#dictTableReload", initDialog)
            .on("click", "a.edit", function () {
                if (isEditing) {
                    toast.warning(i18n.common.completeEditor);
                    return;
                }
                var dictId = $(this).data("dictId");
                $.ajax({
                    url: "/b/core/dictValue/" + dictId,
                    type: "GET",
                    dataType: "json"
                }).done(function (data) {
                    var dictValue = data.returnData;
                    if (data.ok) {
                        var templateHtml = customGlobal.remoteTemplate("template/core/dictValue/updateDictValue.html", {
                            //此处不能用dictValue作为key，否则会跟生命的dictValue工具函数冲突
                            dict: dictValue,
                            statusList: statusList,
                            languageList: languageList,
                            i18n:i18n
                        });
                        $("#dictTr" + dictId).html(templateHtml);
                        isEditing = true;
                    }
                });
            })
            .on("click", "#updateDictBtn", function () {
                // 编辑保存
                if ($("#detailDialogForm").validate().form()) {
                    var dictId = $(this).data("dictId");
                    $.ajax({
                        url: "/b/core/dictValue",
                        type: "put",
                        data: JSON.stringify({
                            dictId: dictId,
                            dictCode: $("#dictCode").val(),
                            dictValue: $("#dictValue").val(),
                            dictName:$("#dictName").val(),
                            locale: $("#dictLocale").val(),
                            status: $("#status").val(),
                            sortId: $("#sortId").val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            initDialog();
                            isEditing = false;
                        }
                    });
                }
            })
            .on("click", "a.cancel", initDialog);
    };


    /* 主页  DictDefine : Detail : 初始化第一弹出页DictValue 方法*/
    var initDialog = function () {
        $.ajax({
            url: "/b/core/dictValue/dictValueList?dictName=" + currentDictName,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            if (data.ok) {
                var templateHtml = customGlobal.remoteTemplate("template/core/dictValue/detailDictValue.html", {
                    dictValueList: data.returnData,i18n:i18n
                });
                $("#dictDialog").html(templateHtml).modal("show");
                isEditing = false;
                $("#addDictValueForm").hide();
            }
        });
    };

    return {
        init: function (statusListData, languageListData) {
            statusList = statusListData;
            languageList = languageListData;
            handleEvent();
        },
        showDialog: function (dictName) {
            currentDictName = dictName;
            initDialog();
        }
    };
}();

