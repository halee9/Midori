<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
    $href = @$_GET['hr'];
    echo "<script>var G_href = '" . $href . "';</script>";
    $action = @$_GET['action'];
    echo "<script>var G_action = '" . $action . "';</script>";
?>
<?php include 'm_header.php' ?>

	<div id='signin_container' class='form_container'>
		<form id='signin_form'>
			<div>E-mail :</div>
			<div><input type='text' id='signin_email' name='email' /></div>
			<div>Password :</div>
			<div><input type='password' id='signin_password' name='password' /></div>
			<table><tr>
				<td><input type='checkbox' id='saveid' name='saveid' value='Yes' checked='checked' style='width:20px;' /></td>
				<td valign='middle'>Remember e-mail on this device</td>
			</tr></table>
			<table><tr>
				<td><input type='checkbox' id='savePass' name='savePass' value='Yes' style='width:20px;' /></td>
				<td valign='middle'>Remember password on this device</td>
			</tr></table>
			<div class='button_container'>
				<button type='submit' id='signin' class='emphasis'>Sign in</button>
				<div>Or</div>
				<button type='button' id='signup'>Go to Sign Up</button>
			</div>
		</form>
	</div>
    <div id='signup_container' class='form_container radius_all'>
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

<?php include 'm_footer.php' ?>
