var languageObj = function () {

    var dataTable;
    var $table = $("#dataTable");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            order:[],
            onQuery: function (data) {
                data.localeStr = $.trim($("#localeQuery").val());
                data.languageName = $.trim($("#languageNameQuery").val());
            },
            dataTable: {
                order:[],
                "ajax": {
                    "url": "/b/core/language/getLanguageListPage"
                },
                "columns": [
                    {data: 'locale', orderable: false},
                    {data: 'languageName', orderable: false},
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
        $("#addLanguage").on("click", function () {
            var templateHtml = customGlobal.remoteTemplate("template/core/language/addLanguage.html", {i18n:i18n});
            $("#modalDialog").html(templateHtml).modal("show");
            initAddBtn();
            $.iType();
        });

        function initAddBtn(){
            $("#addBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    $.ajax({
                        url: "/b/core/language",
                        data: JSON.stringify({
                            locale: $("#locale").val(),
                            languageName: $("#languageName").val()
                        }),
                        contentType: "application/json; charset=utf-8",
                        type: "post",
                        dataType:"json"
                    }).done(function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            dataTable.reloadTable();
                        }
                    });
                }
            });
        }

        $table.on("click", "a.edit", function () {
            $.get("/b/core/language/" + $(this).attr("id"), function (data) {
                var language = data.returnData;
                var templateHtml = customGlobal.remoteTemplate("template/core/language/updateLanguage.html",
                    {
                        language: language,
                        i18n:i18n
                    });
                var $template = $(templateHtml);
                $("#modalDialog").html($template).modal("show");
                $.iType();
                initUpdateBtn();
            });
        });


        function initUpdateBtn() {
            $("#updateBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    var data = {
                        id: $("#id").val(),
                        locale: $("#locale").val(),
                        languageName: $("#languageName").val()
                    };
                    $.ajax({
                        url: "/b/core/language",
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
                    url: "/b/core/language/" + $table.DataTable().row($this.parents('tr')[0]).data().id,
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
    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();
