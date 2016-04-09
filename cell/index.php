<?php include '../common/session_check.php' ?>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" name="viewport">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!--<link rel="apple-touch-icon-precomposed" href="../common/img/TeO.png">
    <!--<link rel="shortcut icon" href="../common/img/Te.ico">-->
    <title>TeriyakiOnline.com</title>
    <script src="../common/jquery/jquery-1.5.min.js"></script>
    <script src="../common/jquery/jquery.effects.core.js"></script>
    <script src="../common/jquery/jquery.effects.slide.js"></script>
    <script src="../common/jquery/jquery_cookie/jquery.cookie.js"></script>
    <script src="../common/JSON/json2.js"></script>
    <script src="../common/store_json.js?v=<?=$vt?>"></script>
    <script src="m_main.js?v=<?=$vt?>"></script>
    <script src="../common/store_common.js?v=<?=$vt?>"></script>
    <link href="m_main.css" rel="stylesheet" type="text/css" />
<style type="text/css">
#site_title {
	margin: 0 auto;
	margin-top: 30px;
	width: 250px;
	padding: 10px;
	background-color: #660000;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	border: 1px solid #000;
}
#site_logo {
	background-image: url(../common/img/TeO_30.png);
	width: 45px;
	height: 30px;
	float: left;
}
#site_name {
	color: #eee;
	font-size: 26px;
	height: 30px;
	margin-left: 10px;
	line-height: 100%;
}

#buttons {
	text-align: center;
	position: absolute;
	bottom: 30px;
	width: 100%;
}
#buttons button {
	width: 140px;
	display: block;
	margin: 10px;
}
</style>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-35555192-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</head>
<body>
<div id="message"></div>
<div id='header'>
	<div class='left'><button id='back_button'>Back</button></div>
	<div class='right'><button id='cart_button'></button></div>
	<div class='center'>Teriyaki Online</div>
</div>
<div id="user_container">
	<div class="user_left">
		<span>Hi,&nbsp;</span>
		<span id='user_name'>Lee</span>
	</div>
	<div class="user_right"></div>
</div>
<div id='main_container'>
	<div id="loading_container" class="page_container"></div>
	<div id="menu_group_container" class="page_container"></div>
	<div id="menu_list_container" class="page_container"></div>
	<?php include "menu_item_container.html"; ?>
	<div id="cart_container" class="page_container"></div>
	<div id="checkout_container" class="page_container">
		<div id="closed_body" style="padding:10px;color:#660000;">
		We open Monday to Friday from 10:00 AM to 04:00 PM.<br>
		We take last order via online until 3:30 PM. Thank you.
		</div>
		<div class="small_container">
			<div class="group_name">1. Would you like to …?</div>
			<ul id="order_type" class='content'>
				<li>
					<input type='radio' id="pick_up" name='order_type' value='P' checked /><label for="pick_up">PICK UP at the restaurant.</label>
					<div class="case_pickup sub_msg">
					</div>
				</li>
				<li>
					<input type='radio' id="dine_in" name='order_type' value='H' /><label for="dine_in">DINE IN the restaurant.</label>
					<div class="case_dinein sub_msg">
						<span>We never start to cook to your orders until you arrive in the restaurant.</span>
					</div>
				</li>
				<!--<li><input type='radio' name='order_type' value='D' disabled /><span>Delivery</span></li>-->
			</ul>
		</div>
		<div class="small_container">
			<div class="group_name">2. Notification when my orders are taken by cashier or ready to pick up.</div>
			<ul class='content'>
				<li>
					<input type='checkbox' id="text_me" name='text_me' value='Y' checked />
					<label for="text_me">TEXT me.</label>
				</li>
				<li>
					<input type='checkbox' id="email_me" name='text_me' value='Y'>
					<label for="email_me">EMAIL me.</label>
				</li>
			</ul>
		</div>
		<div class="small_container">
			<div class="group_name">
				<span class="case_pickup">3. What time would you like to pick up?</span>
				<span class="case_dinein">3. What time would you like to be in the restaurant?</span>
			</div>
			<ul class='content'>
				<li id='desired_time_select'></li>
			</ul>
		</div>
		<!--
		<div class="small_container">
			<div class="group_name">4. How would you like to pay for your orders? You have <span id="point"></span> points.</div>
			<ul id="payment_type" class='content'>
				<li><input type='radio' id="pay_store" name='payment_type' value='S' checked /><label for="pay_store">Pay at the store.</label></li>
				<li><input type='radio' id="pay_point" name='payment_type' value='P'><label for="pay_point">Pay with my reward points.</label></li>
			</ul>
		</div>
	-->
		<div class="small_container">
			<div class="group_name">4. Would you like to set this order to the usual?</div>
			<ul id="usual_type" class='content'>
				<li><input type='radio' id="usual_y" name='usual_type' value='Y' /><label for="usual_y">Yes.</label></li>
				<li><input type='radio' id="usual_n" name='usual_type' value='N' checked /><label for="usual_n">No.</label></li>
			</ul>
		</div>
		<div class='button_container'>
			<button id='place_order' class='main'>Place Order</button>
		</div>
	</div>
	<div id='signin_container' class='page_container'>
		<form id='signin_form' class='form_container'>
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
				<button type='button' id='signin' class='main'>Sign in</button>
				<div>Or</div>
				<button type='button' id='go_signup'>Go to Sign Up</button>
			</div>
		</form>
	</div>
    <div id='signup_container' class='page_container'>
		<form id='signup_form' class='form_container'>
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
				<button type='button' id='signup' class='main'>Sign Me Up</button>
			</div>
        </form>
	</div>
	<div id="order_complete" class="page_container">
		<div class="thanks_message" style="text-align:center;">
			<p>Thank you for ordering. <br>Your orders have been placed.</p>
		</div>
		<div class="button_container">
			<button id="goto_mypage">My orders status</button>
			<button id="goto_logout">Logout</button>
		</div>
	</div>
	<div id="my_page_container" class="page_container">
		<div id='user_info'></div>
        <div id='order_history'></div>
    </div>
	<div id="order_sheet_container" class="page_container">
    </div>
	<div id="store_info_container" class="page_container">
    </div>

</div>

<div id='footer'>
	<div class='button_container'>
		<button id='signin_button'>Sign In</button>
		<button id='signout_button'>Sign Out</button>
        <button id='mypage_button'>My Page</button>
        <button id='info_button'>Store Info</button>
	</div>
</div>

</body>
</html>
