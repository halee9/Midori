
function set_resetting(){
	if ($.cookie("useremail")) {
        $('#signin_email').val($.cookie("useremail"));
    }
    else {
    	$('#signin_email').focus();
    }
    $("#wrong_email").hide();
    $("#sent_email").hide();
    
    $("#reset_password").click(function(){
        $.ajax({
            type: "POST",
            url: "../common/User.php",
            data: "action=reset_password&email=" + $('#signin_email').val(),
            success: function(res){
                eval(res);
                if (result == 0) {
                	$("#wrong_email").show();
                }
                else {
	                $("#sent_email").show();
	                $("#reset_password").hide();
                }
            }
	    });
    });

}


function init() {
    $(document).ready(function() {
        create_header(G_store.name);
        set_resetting();
        $("#main_container").show();
    });
}

window.onload = init;
