<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
include "config.php";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

$token = @$_GET['token'];
$now = date("Y-m-d H:i:s");

$sql = "SELECT * FROM User WHERE token = '$token' AND expiry >= '$now' LIMIT 1";
$rs = mysql_query($sql) or die ("Query failed");
$is_row = false;
while($row = mysql_fetch_array($rs)) {
	$is_row = true;
	$user = $row['id'];
	$email = $row['email'];
	echo "<script>var User_id = ".$user.";</script>";
}
if ($is_row == false) {
	echo "<script>var Valid = false;</script>";
}
else {
	echo "<script>var Valid = true;</script>";
}
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" name="viewport">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>TeriyakiOnline.com</title>
    <script src="../common/jquery/jquery-1.5.min.js"></script>
    <script src="../common/jquery/jquery_cookie/jquery.cookie.js"></script>
<style type="text/css">
body {
	font-family: Helvetica, Arial,sans-serif;
	font-size: 16px;
	padding: 0px;
	background-color: #222;
	margin: 0px;
	line-height: 120%;
	font-weight: bold;
	-webkit-text-size-adjust:none; 
	background-image: url("img/grey_bg.png");
}
#header {
	width: 100%;
	height: 44px;
	background-image: url("img/bar_red.png");
}
#header .main{
	margin: 0 auto;
	width: 250px;
	padding: 5px 0;
}
#header #header_logo {
	float:left; 
	width: 45px;
	height: 30px;
	margin: 0px 10px;
	cursor: pointer;
	background-image: url("img/TeO_30.png");
	background-repeat: no-repeat;
}
#header #header_title {
	float:left; 
	margin: 5px 0px;
	font-size: 20px;
	color: #ddd;
	cursor: pointer;
}
#main_container {
	width: 320px;
	margin: 0 auto;
	padding: 10px;
	overflow: hidden;
}
.box_container {
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	border: 1px solid #000;
	background-color: #eee;
	padding: 20px 10px;
}
.box_container div {
	text-align: center;
	margin: 5px;
}
input, select {
	font-family: Helvetica, Arial,sans-serif;
	font-size: 16px;
	font-weight: bold;
}
button {
	font-size:16px;
	padding: 5px 10px;
	border-radius:7px;
	background-color: #eee;
	color: #333;
	font-weight: bold;
	cursor: pointer;
	margin: 5px;
}
button.emphasis {
	background-color: #660000;
	color: #fff;
}
#password_msg {
	font-weight: normal;
	font-size: 12px;
}
</style>

<script>

$(document).ready(function() {
	if (Valid == true) {
		$(".access").show();
		$(".no_access").hide();
	}
	else {
		$(".no_access").show();
		$(".access").hide();
	}
	$("#success_msg").hide();
	
	$("#change_password").click(function(){
		if (check_password()) {
			$("#change_password").attr("disabled","true");
	        $.ajax({
	            type: "POST",
	            url: "User.php",
	            data: "action=change_password&user=" + User_id + "&password=" + $("#password").val(),
	            success: function(res){
	                eval(res);
	                if (result == 1) {
	                	$("#success_msg").show();
	                }
	            }
	        });
		}
		else {
			alert("password must be at least 5 chracters!");
			//$("#password").focus();
		}
	});
	
});

function check_password(){
	var value = $("#password").val();
	if (value.length < 5) {
		return false;
	}
	return true;
}
</script>

</head>
<body>
<div id='header'>
	<div class='main'>
		<div id="header_logo"></div>
		<div id="header_title">TERIYAKI ONLINE</div>
	</div>
</div>	
		
<div id='main_container'>
	<div class="box_container">
		<div class="no_access">You can't change the password. <br>Try again asking to reset your password.</div>
		<div class="access">
			<div>Enter your new password :</div>
			<div><input type='password' id='password' name='password' /></div>
			<div id="password_msg">Use at least 5 characters.</div>
			<div class='button_container'>
				<button type='button' id='change_password' class='emphasis'>Submit</button>
			</div>
			<div id="success_msg">Your password has changed.<br>Thank you.</div>
		</div>
	</div>
</div>

</body>
</html>

