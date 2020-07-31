var Index = function () {

    var getNode = function () {
        customGlobal.blockUI("nodeRow");
        $.ajaxSetup({async: false});
        $("#nodeRow").find("input").each(function () {
            var $this = $(this);
            $.get($this.val(), function (data) {
                $("#nodeRow").append(data);
            });
        });
        $.ajaxSetup({async: true});
        App.unblockUI("nodeRow");
    };

    return {
        //main function to initiate the module
        init: function () {
            getNode();
        }
    };

}();