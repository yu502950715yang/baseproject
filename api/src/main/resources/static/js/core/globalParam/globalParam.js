/**
 * Created by dell on 3/17/15.
 */
var globalParamObj = function () {

    var dataTable;
    var $table = $("#dataTable");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            onQuery: function (data) {
                data.paramName = $("#paramNameQuery").val();
                data.paramValue = $("#paramValueQuery").val();
                data.paramDescription = $("#descriptionQuery").val();
            },
            dataTable: {
                "ajax": {
                    "url": "/b/core/globalParam/getGlobalParamListPage" // ajax source
                },
                "columns": [
                    {data: 'paramName', orderable: true},
                    {data: 'paramValue', orderable: true},
                    {data: 'paramDescription', orderable: true},
                    {data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return template("actionBtn",{data:data,type:type,full:full,i18n:i18n});
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addGlobalParam").on("click", function () {
            var templateHtml = customGlobal.remoteTemplate("emplate/core/globalParam/addGlobalParam.html", {i18n:i18n});
            $("#modalDialog").html(templateHtml).modal("show");
            $("#paramName").removeAttr("readonly");
            initAddBtn();
        });

        function initAddBtn() {
            $("#addBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    $.ajax({
                        url: "/b/core/globalParam",
                        data: JSON.stringify({
                            paramName: $("#paramName").val(),
                            paramValue: $("#paramValue").val(),
                            paramDescription: $("#paramDescription").val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        type: "post",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialog").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
            });
        }

        $table.on("click", "a.edit", function () {
            var globalParam={
                paramName:$(this).attr("paramName"),
                paramValue:$(this).attr("paramValue"),
                paramDescription:$(this).attr("paramDescription")
            };
            var templateHtml = customGlobal.remoteTemplate("template/core/globalParam/updateGlobalParam.html",{globalParam:globalParam,i18n:i18n});
            var $template = $(templateHtml);
            $("#modalDialog").html($template).modal("show");
            initUpdateBtn();
        });

        function initUpdateBtn(){
            $("#updateBtn").on("click", function () {

                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    var data = {
                        paramValue: $("#paramValue").val(),
                        paramName: $("#paramName").val(),
                        paramDescription: $("#paramDescription").val()
                    };
                    $.ajax({
                        url: "/b/core/globalParam",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        type: "put",
                        success: function (data) {
                            if (customGlobal.ajaxCallback(data)) {
                                $("#modalDialog").modal("hide");
                                dataTable.reloadTable();
                            }
                        }
                    });
                }
            });
        }

        $table.on("click", "a.delete", function () {
            customGlobal.showConfirm();
            var $this = $(this);
            //confirm中确认按钮事件，此处需要unbind，否则点击取消时下次再点击删除按钮会重复绑定click。
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/globalParam/" + $table.DataTable().row($this.parents('tr')[0]).data().paramName,
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
        });
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();
