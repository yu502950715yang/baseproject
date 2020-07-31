var codeGenerator = function () {
    var JAVA_FIELD_TYPES = ["String", "Double", "Integer", "Date", "BigDecimal"];
    //记录当前表的数据库信息，包括表信息及列信息
    var currentTable;

    function underlineToCamel(str) {
        var arr = str.split('_');
        for (var i = 1; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
        }
        return arr.join('')
    }

    function getCodeGenerator() {
        return {
            projectName: $("#projectName").val().trim(),
            prefix: $("#prefix").val().trim(),
            javaPath: $("#javaPath").val().trim(),
            webPath: $("#webPath").val().trim(),
            parentMenuId: $("#parentMenuId").val().trim(),
            table: {
                tableName: currentTable.tableName,
                modelName: $("#modelName").val().trim(),
                modelNameFirstCapital: firstCapital($("#modelName").val().trim()),
                menuName: $("#menuName").val().trim(),
                dialogClass: $("#dialogClass").val(),
                hasAdvancedQuery: $(".isAdvancedQuery:checked").size() != 0,
                defaultSortField: $("#defaultSortField").val(),
                defaultSortOrder: $("#defaultSortOrder").val(),
                tableColumnList: getTableColumnList()
            }
        }
    }

    function handleEvent() {
        $("#generate").click(function () {
            if (!$("#codeGeneratorForm").validate().form()) {
                return
            }
            customGlobal.blockUI(".portlet-body");
            $.ajax({
                url: "/b/core/codeGenerator",
                data: JSON.stringify(getCodeGenerator()),
                contentType: "application/json; charset=utf-8",
                type: "post",
                dataType: "json"
            }).done(function (data) {
                customGlobal.ajaxCallback(data)
            });
        });
        $("#dialogClass").select2();
        $('#selectedTable').select2()
            .on('select2:select', getTableInfoFromDatabase);
        $("#reloadDatabaseInfo").on("click",getTableInfoFromDatabase);
        $("#parentMenuId").focus(function () {
            var $parentMenuId = $("#parentMenuId");
            var offset = $parentMenuId.offset();
            $("#menuContent").css({
                left: offset.left + "px",
                top: offset.top + $parentMenuId.outerHeight() + "px"
            }).slideDown("fast");
            $("#menuTree").width($parentMenuId.width() + parseFloat($parentMenuId.css("padding-left").replace("px", "")) + parseFloat($parentMenuId.css("padding-right").replace("px", "")) - 10);
            $("body").bind("mousedown", onBodyDown);
        });

        $.validator.addMethod("sortEnable", function (value, element, param) {
            var trIndex = $(element).find("option:selected").data("index");
            if (trIndex !== '') {
                return $("#columnTr" + trIndex).find(".isShow").prop("checked")
            }
            return true;
        }, "默认排序字段必须在列表显示");
    }

    function onBodyDown(event) {
        if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            $("#menuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }
    }
    function getTableInfoFromDatabase() {
        customGlobal.blockUI(".portlet-body");
        $.ajax({
            url: "/b/core/codeGenerator/getTable",
            data: {
                tableName: $('#selectedTable').val()
            },
            type: "get",
            dataType: "json"
        }).done(function (data) {
            customGlobal.unblockUI();
            currentTable = data.returnData;
            $("#menuName").val(currentTable.tableComment);
            $("#modelName").val(getModelNameFromTableName());
            initColumnTable();
            $("#defaultSortFieldDiv").html(template("defaultSortFieldHtml", {table: currentTable})).find(".select2").select2();
        });
    }

    function getTableColumnList() {
        var tableColumnList = [];
        var columnList = currentTable.tableColumnList;
        $(".columnTr").each(function () {
            var trIndex = $(this).data("trIndex");
            var column = columnList[trIndex];
            var $tr = $(this);
            var $detailTr = $("#detailTr" + trIndex);
            var thisColumn = {
                columnName: column.columnName,
                columnKey: column.columnKey,
                dataType: column.dataType,
                show: $tr.find(".isShow").bootstrapSwitch('state'),
                query: $tr.find(".isQuery").bootstrapSwitch('state'),
                manage: $tr.find(".isManage").bootstrapSwitch('state'),
                dict: $tr.find(".isDict").bootstrapSwitch('state'),
                required: $tr.find(".isRequired").bootstrapSwitch('state'),
                advancedQuery: $tr.find(".isAdvancedQuery").bootstrapSwitch('state'),
                likeQuery: $tr.find(".isLikeQuery").bootstrapSwitch('state'),
                sort: $tr.find(".sort").val(),
                maxLength: $tr.find(".maxLength").val(),
                columnComment: $detailTr.find(".columnComment").val().trim(),
                fieldDataType: $detailTr.find(".fieldDataType").val(),
                inputType: $detailTr.find(".inputType").val(),
                fieldName: $detailTr.find(".fieldName").val(),
                fieldNameFirstCapital: firstCapital($detailTr.find(".fieldName").val()),
                otherAttr: $detailTr.find(".otherAttr").val()
            };
            if (thisColumn.dict) {
                var $dictTr = $("#dictTr" + trIndex);
                thisColumn.dictName = $dictTr.find(".dictName").val().trim();
                thisColumn.dictValue = $dictTr.find(".dictValue").val().trim();
            }
            tableColumnList.push(thisColumn)
        });
        return tableColumnList;
    }

    function getModelNameFromTableName() {
        var modelName = currentTable.tableName;
        var prefix = $("#prefix").val();
        if (prefix != "") {
            modelName = modelName.replace(prefix, "");
        }
        return underlineToCamel(modelName);
    }

    /**
     * 将数据库信息传给模板，渲染出html后绑定事件，并返回绑定好事件的所有tr
     * @returns {*|jQuery}
     */
    function getColumnTableDom() {
        return $(template("columnTr", {table: currentTable, fieldDataTypes: JAVA_FIELD_TYPES}))
            .find(".popovers").popover()
            .end().find(".isAdvancedQuery,.isLikeQuery,.isRequired").bootstrapSwitch()
            .end().find(".isQuery").bootstrapSwitch({
                onSwitchChange: function (event, state) {
                    var $parentTr = $(this).parents("tr");
                    var $isAdvancedQuery = $parentTr.find(".isAdvancedQuery");
                    state && $isAdvancedQuery.bootstrapSwitch('state', false, true);
                    $isAdvancedQuery.bootstrapSwitch('disabled', state, true);
                }
            })
            .end().find(".isShow").bootstrapSwitch({
                onSwitchChange: function (event, state) {
                    var $parentTr = $(this).parents("tr");
                    var $isQuery = $parentTr.find(".isQuery");
                    !state && $isQuery.bootstrapSwitch('state', false, true);
                    $isQuery.bootstrapSwitch('disabled', !state, true);
                    $parentTr.find(".isAdvancedQuery").bootstrapSwitch('disabled', state, true);
                    $parentTr.find(".sort").prop('disabled', !state);
                }
            })
            .end().find('.isManage').bootstrapSwitch({
                onSwitchChange: function (event, state) {
                    var $parentTr = $(this).parents("tr");
                    var $isDict = $parentTr.find(".isDict");
                    !state && $isDict.bootstrapSwitch('state', false, true);
                    $isDict.bootstrapSwitch('disabled', !state, true);
                    $parentTr.find(".isRequired").bootstrapSwitch('disabled', !state, true);
                    $parentTr.find(".maxLength").prop("disabled", !state);
                    var trIndex = $parentTr.data("trIndex");
                    $("#detailTr" + trIndex).find(".inputType,.fieldName,.otherAttr").prop("disabled", !state)
                }
            })
            .end().find('.isDict').bootstrapSwitch({
                onSwitchChange: function (event, state) {
                    var $parentTr = $(this).parents("tr");
                    var trIndex = $parentTr.data("trIndex");
                    var $detailTr = $("#detailTr" + trIndex);
                    $parentTr.find(".maxLength").prop("disabled", state);
                    $detailTr.find(".inputType").prop("disabled", state);
                    if (state) {
                        $detailTr.after(template("dictTr", {
                            i: trIndex,
                            dictName: $("#modelName").val() + firstCapital($detailTr.find(".fieldName").val()),
                            dictValue: getDictValueFromColumnComment(trIndex)
                        }))
                    } else {
                        $("#dictTr" + trIndex).remove();
                    }
                }
            }).end();
    }

    var dataTable;

    function initColumnTable() {
        dataTable && dataTable.destroy();
        var $columnTBody = $("#columnTBody");
        $columnTBody.html(getColumnTableDom());
        dataTable = $('#columnTable').DataTable({
            "dom": "<'table-responsive't>",
            fixedHeader: {
                header: true,
                headerOffset: getFixedHeaderOffset()
            },
            autoWidth: true,
            paging: false,
            searching: false,
            ordering: false
        });
        //此处因为datatable不支持colspan，所以先载入多个td，然后再将无用的删掉
        $(".detailTr").each(function () {
            $(this).find("td:gt(0)").remove()
        });
        //此处延后加载select2是因为chrome下，在内存中的dom初始化select2会导致宽度不正确
        $columnTBody.find(".select2").select2();
    }

    function getFixedHeaderOffset() {
        var $pageHeader = $('.page-header');
        if (App.getViewPort().width < App.getResponsiveBreakpoint('md')) {
            if ($pageHeader.hasClass('page-header-fixed-mobile')) {
                return $pageHeader.outerHeight(true);
            }
        } else if ($pageHeader.hasClass('navbar-fixed-top')) {
            return $pageHeader.outerHeight(true);
        }
        return 0;
    }

    function getDictValueFromColumnComment(trIndex) {
        var dictValue = currentTable.tableColumnList[trIndex].columnComment;
        if (dictValue.indexOf("@") != -1) {
            return dictValue.replace(/.*@/, "")
        } else {
            return "";
        }
    }

    function firstCapital(str) {
        if (str.length > 0) {
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        } else {
            return str;
        }
    }

    function initTree() {
        $.get("/b/core/menu/getMenuTree", function (data) {
            $.fn.zTree.init($("#menuTree"), {
                view: {
                    dblClickExpand: false
                },
                data: {
                    simpleData: {
                        rootPId: -1,
                        enable: true
                    }
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        $("#parentMenuId").val(treeNode.id)
                    }
                }
            }, data.returnData.tree);
        });
    }

    return {
        init: function () {
            handleEvent();
            initTree();
        }
    };
}();
