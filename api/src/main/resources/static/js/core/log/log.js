var LogListTable = function () {

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
                data.username = $("#usernameQuery").val().trim();
                var createDateQuery = $("#createDateQuery");
                data.createDateQueryFrom = $.trim(createDateQuery.data("from"));
                data.createDateQueryTo = $.trim(createDateQuery.data("to"));
                data.handle = $("#handleQuery").val().trim();
                data.module = $("#moduleQuery").val().trim();
                data.requestUri = $("#requestUriQuery").val().trim();
                data.requestMethod = $("#requestMethodQuery").val().trim();
                data.responseResult = $("#responseResultQuery").val().trim();
                data.requestParams = $("#requestParamsQuery").val().trim();
            },
            dataTable: {
                order: [[1, "desc"]],
                "ajax": {
                    "url": "/b/core/log/getLogListPage"
                },
                "columns": [
                    {data: 'username', orderable: true},
                    {data: 'createDate', orderable: true},
                    {data: 'requestUri', orderable: true},
                    {data: 'module', orderable: true},
                    {data: 'handle', orderable: true},
                    {data: 'requestMethod', orderable: true},
                    {data: 'requestParams', orderable: true},
                    {data: 'responseResult', orderable: true},
                    {data: 'responseTime', orderable: true},
                    {
                        data: 'handle', orderable: false,
                        render: function () {
                            return ""
                        }
                    }
                ]
            }
        });
    };

    var initDatePicker = function () {
        $(".date-picker").datetimepicker({
            language: 'zh-CN',
            format: "yyyy-mm-dd",
            todayBtn: true,
            minView: 2,
            autoclose: true,
            todayHighlight: true
        });
    };
    return {
        init: function () {
            handleRecords();
            initDatePicker();
        }
    };
}();