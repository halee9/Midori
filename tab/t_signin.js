
function create_signin(){
	set_signin_info();
	submit_signin();

    $('#signup').click(function(){
		$('#signin_container').hide();
		$('#signup_container').show();
    });

}

function create_signup(){
	set_signup_info();
}

function init() {
    $(document).ready(function() {
        create_header(G_store.name);
        create_signin();
		create_signup();
		$("#main_container").show();
		$('#signin_container').show();
		if (G_action == "modify") {
			modify_user_info(ss_userid);
			$('#signin_container').hide();
			$('#signup_container').show();
		}
		else {
			signup_submit();
		}
    });
}

window.onload = init;
