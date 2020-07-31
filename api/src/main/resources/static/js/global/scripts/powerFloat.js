


function initRange() {
    $(".rangeQuery").powerFloat({
        eventType: "click",
        target: "template/core/system/range.html",
        targetMode: "ajax",
        showCall:function(){
            var $this = $(this);
            $(".confirmRange").on("click",function () {
                if($("#rangeForm").validate().form()){
                    $this.val($("#valuefrom").val()+"-"+$("#valueto").val());
                    $("#editableform").hide();
                }
            });
            $(".cancelRange").on("click",function () {
                $("#valuefrom").val("");
                $("#valueto").val("");
            })
        }
    });


}

