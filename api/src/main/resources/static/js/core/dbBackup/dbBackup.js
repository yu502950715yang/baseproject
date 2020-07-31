var dbbackuplistTable = function () {

    var dataTable;
    var $table = $("#dataTable");
    /**
     * dataTable事件初始化方法
     */
    var handleRecords = function () {
        dataTable = new Datatable();
        dataTable.init({
            src: $table,
            dataTable: {
                "ajax": {
                    "url": "/b/core/dbBackup/getDbBackupListPage"
                },
                "columns": [
                    {data: 'backupTime', orderable: true},
                    {
                        data: 'backupType', orderable: false, render: function (data, type, full) {
                            return customGlobal.getDictValue("backupType", data);
                        }
                    },
                    {data: 'operatorName', orderable: false},
                    {data: 'operatorId', orderable: true},
                    {data: 'backupMemo', orderable: false},
                    {data: 'sqlPath', orderable: false}
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#manualBackup").on("click", function () {
            var templateHtml = customGlobal.remoteTemplate("template/core/system/dbbackup/manualBackup.html", {i18n: i18n});
            $("#modalDialog").html(templateHtml).modal("show");
            initAddBtn();
        });

        function initAddBtn() {
            $("#addBtn").on("click", function () {
                var dbbackup = {
                    backupType: "2",
                    backupMemo: $.trim($("#backupReasons").val()).trim()
                };
                $.ajax({
                    url: "/b/core/dbBackup/manualBackup",
                    data: JSON.stringify(dbbackup),
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (customGlobal.ajaxCallback(data)) {
                            $("#modalDialog").modal("hide");
                            dataTable.reloadTable();
                        }
                    }
                })
            })
        }

    };

    return {
        init: function () {
            handleRecords();
            handleEvent();
        }
    };
}();
