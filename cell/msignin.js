function init() {
    $(document).ready(function() {
        create_header(G_store.name, "Sign In", 'H', 'B');
        create_signin();
		create_signup();
		$('#signup_container').hide();
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
