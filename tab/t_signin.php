<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
    $href = @$_GET['hr'];
    echo "<script>var G_href = '" . $href . "';</script>";
    $action = @$_GET['action'];
    echo "<script>var G_action = '" . $action . "';</script>";
    include_once("t_html_head.php");
?>
<div class="sign_body_container">
	<div id='signin_container' class='form_container'>
		<div class='title_head radius_top'>Sign In</div>
		<div class="radius_bottom">
			<form id='signin_form'>
				<div>E-mail :</div>
				<div><input type='text' id='signin_email' name='email' /></div>
				<div>Password :</div>
				<div><input type='password' id='signin_password' name='password' /></div>
				<div style="text-align:center; font-size: 12px;"><a href="t_forgot_password.php">Forgot Password?</a></div>
				<table><tr>
					<td><input type='checkbox' id='saveid' name='saveid' value='Yes' checked='checked' style='width:20px;' /></td>
					<td valign='middle'>Remember e-mail on this device</td>
				</tr></table>
				<table><tr>
					<td><input type='checkbox' id='savePass' name='savePass' value='Yes' style='width:20px;' /></td>
					<td valign='middle'>Remember password on this device</td>
				</tr></table>
				<p id='wrong_email' class='sign_in_err_msg'>You have wrong email. Try again.</p>
				<p id='wrong_password' class='sign_in_err_msg'>You have wrong password. Try again.</p>
				<div class='button_container'>
					<button type='submit' id='signin' class='emphasis'>Sign in</button>
					<div class="loading"></div>
					<div>Or</div>
					<button type='button' id='signup'>Go to Sign Up</button>
				</div>
			</form>
		</div>
	</div>
    <div id='signup_container' class='form_container radius_all'>
		<div class='title_head radius_top'>Sign Up</div>
		<div class="radius_bottom">
			<form id='signup_form'>
				<div class='title'>First Name : </div>
				<div><input type='text' id='first_name' name='first_name' value='Required.'></div>
				<div id='first_name_msg' class='message'></div>
				<div class='title'>Last Name : </div>
				<div><input type='text' id='last_name' name='last_name' value='Required.'></div>
				<div id='last_name_msg' class='message'></div>
				<div class='title'>Cell Phone Number : </div>
				<div><input type='text' id='phone' name='phone' value='2060001234 - 10 digits only'></div>
				<div><span class='title'>Carrier : </span>
				<span>
					<select id="carrier" name="carrier">
						<option>Select</option>
						<option>AT&T</option>
						<option>SPRINT</option>
						<option>T-MOBILE</option>
						<option>US CELLULAR</option>
						<option>VERIZON</option>
						<option>VIRGIN MOBILE</option>
					</select>
				</span>
				</div>
				<div id='phone_msg' class='message'></div>
				<div class='title'>E-mail Address : </div>
				<div><input type='text' id='email' name='email' value='you@email.com'></div> 
				<div id='email_msg' class='message'></div>
				<div class='title'>Password : </div>
				<div><input type='password' id='password' name='password'></div>
				<div id='password_msg' class='message'></div>
				<div class='button_container'>
					<button type='button' id='cancel'>Cancel</button>
					<button type='submit' id='signup' class='emphasis'>Sign Me Up</button>
				</div>
	        </form>
		</div>
	</div>
	
	<div id='sign_comment'>
		<p>With your account you can..</p>
		<ul>
			<li><b>Order anywhere</b> (desktop, tablet or smartphone)</li>
			<li><b>Save money with points</b> you earn from every order</li>
			<li>View your <b>order history</b></li>
			<li>Select certain items to your <b>usual (favorite)</b></li>
		</ul>
		<p>The information provided will be <b>confidential</b> and will only be used to <b>better our service</b></p>
	</div>
</div>	

<?php include_once("t_html_footer.php"); ?>
