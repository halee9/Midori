<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
    include_once("t_html_head.php");
?>
<div class="sign_body_container" style="width:300px">
	<div class='form_container' style="display:block">
		<div class='title_head radius_top'>Resetting Password</div>
		<div id="signin_form" class="radius_bottom">
			<div>Your e-mail :</div>
			<div><input type='text' id='signin_email' name='email' /></div>
			<div class='button_container'>
				<button type='submit' id='reset_password' class='emphasis'>I want to reset my passoword.</button>
			</div>
			<div id="wrong_email">Your email is not on the TeriyakiOnline.com. Try again.</div>
			<div id="sent_email">We have sent you an email for resetting your password.</div>
		</div>
	</div>
</div>


<?php include_once("t_html_footer.php"); ?>

