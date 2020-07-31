var jobListTable = function () {

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
                data.username = jQuery.trim($("#usernameQuery").val());
                data.nickname = jQuery.trim($("#nicknameQuery").val());
                data.emailAddress = jQuery.trim($("#emailAddressQuery").val());
            },
            dataTable: {
                "ajax": {
                    "url": "/b/core/job/getJobTaskListPage"
                },
                "columns": [
                    {data: 'jobName', orderable: false},
                    {data: 'jobGroupName', orderable: false},
                    {data: 'jobClassName', orderable: false},
                    {data: 'cronExpression', orderable: false},
                    {data: 'prevFireTime', orderable: false},
                    {data: 'nextFireTime', orderable: false},
                    {data: 'triggerState', orderable: false},
                    {
                        data: 'operate', orderable: false,
                        render: function (data, type, full) {
                            return template("actionBtn", {data: data, type: type, full: full, i18n: i18n});
                        }
                    }
                ]
            }
        });
    };

    var handleEvent = function () {
        $("#addJob").on("click", function () {
            var $templateHtml = $(customGlobal.remoteTemplate("template/core/job/addJob.html", {i18n: i18n}));
            customGlobal.inputInit($templateHtml);
            $("#modalDialog").html($templateHtml).modal("show");
            initAddBtn();
        });

        function initAddBtn() {
            $("#addBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    $.ajax({
                        url: "/b/core/job/add",
                        data: {
                            jobClassName: $.trim($("#jobClassName").val()),
                            jobGroupName: $.trim($("#jobGroupName").val()),
                            cronExpression: $.trim($("#cronExpression").val())
                        },
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
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


        $table.on("click", "a.edit", function () {
            var $this = $(this);
            $.ajax({
                url: "/b/core/job/getJobTaskDetail",
                data: JSON.stringify({
                    jobClassName: $this.attr("jobClassName"),
                    jobGroupName: $this.attr("jobGroupName")
                }),
                contentType: "application/json; charset=utf-8",
                type: "post",
                dataType: "json"
            }).done(function (data) {
                if (data.ok) {
                    var jobAndTriggerDto = data.returnData.jobAndTriggerDto;
                    var $templateHtml = $(customGlobal.remoteTemplate("template/core/job/updateJob.html", {
                        jobAndTriggerDto: jobAndTriggerDto,
                        i18n: i18n
                    }));
                    customGlobal.inputInit($templateHtml);
                    $("#modalDialog").html($templateHtml).modal("show");
                    initUpdateBtn();
                }
            });


        });


        function initUpdateBtn() {
            $("#updateBtn").on("click", function () {
                if ($("#dialogForm").validate().form()) {
                    customGlobal.blockUI("#modalContent");
                    $.ajax({
                        url: "/b/core/job/reschedule",
                        data: {
                            jobClassName: $.trim($("#jobClassName").val()),
                            jobGroupName: $.trim($("#jobGroupName").val()),
                            cronExpression: $.trim($("#cronExpression").val())
                        },
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
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


        $table.on("click", "a.delete", function () {
            var $this = $(this);
            customGlobal.showConfirm();
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/job/del",
                    data: {
                        jobClassName: $this.attr("jobClassName"),
                        jobGroupName: $this.attr("jobGroupName")
                    },
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    type: "post",
                    dataType: "json"
                }).done(function (data) {
                    $("#confirmDialog").modal("hide");
                    if (customGlobal.ajaxCallback(data)) {
                        dataTable.reloadTable();
                    }
                })
            })
        });
        var defaultOptions = {
            confirmTitle: "确认",
            confirmContent: "您确定想要删除这条数据吗?",
            confirmBtn: "确认",
            cancelBtn: "取消",
            confirmDialogId: "confirmDialog",
            confirmBtnId: "confirmBtn",
            confirmDialogWrapperId: "confirmDialogWrapper"
        };

        $table.on("click", "a.pause", function () {
            var $this = $(this);
            defaultOptions.confirmContent="您确定想要暂停这个任务吗";
            customGlobal.showConfirm(defaultOptions);
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/job/pause",
                    data: {
                        jobClassName: $this.attr("jobClassName"),
                        jobGroupName: $this.attr("jobGroupName")
                    },
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    type: "post",
                    dataType: "json"
                }).done(function (data) {
                    $("#confirmDialog").modal("hide");
                    if (customGlobal.ajaxCallback(data)) {
                        dataTable.reloadTable();
                    }
                })
            })
        });

        $table.on("click", "a.resume", function () {
            var $this = $(this);
            defaultOptions.confirmContent="您确定想要恢复这个任务吗";
            customGlobal.showConfirm(defaultOptions);
            $("#confirmBtn").on("click.deleteRow", function () {
                $.ajax({
                    url: "/b/core/job/resume",
                    data: {
                        jobClassName: $this.attr("jobClassName"),
                        jobGroupName: $this.attr("jobGroupName")
                    },
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    type: "post",
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
