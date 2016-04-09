<?php include '../common/session_check.php' ?>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" name="viewport">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon-precomposed" href="../common/img/TeO.png">
    <link rel="shortcut icon" href="../common/img/Te.ico">
    <title>TeriyakiOnline.com</title>
    
    <script src="../common/jquery/jquery-1.5.min.js"></script>
    <script src="../common/jquery/jquery_cookie/jquery.cookie.js"></script>
    <script type='text/javascript' src='https://cdn.firebase.com/js/client/1.0.6/firebase.js'></script>
    <script src="../common/store_json.js"></script>
    <script src="<? echo $purename . '.js'; ?>"></script>
    <script src="../common/more_common.js"></script>
<script>
$(document).ready(function() {
	$("#header #go_orders").click(function(){
		//location.href = "takeorders.php";
		redirect("takeorders.php");
	});
	$("#header #go_store").click(function(){
		//location.href = "manage_store.php";
		redirect("manage_store.php");
	});
	$("#header #go_menu").click(function(){
		//location.href = "manage_menu.php";
		redirect("manage_menu.php");
	});
	$("#header #go_user").click(function(){
		//location.href = "manage_user.php";
		redirect("manage_user.php");
	});

});
</script>

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
	background-image: url("../common/img/grey_bg.png");
}
#header {
	width: 100%;
	height: 44px;
	background-image: url("../common/img/bar_red.png");
}
#header #main{
	max-width: 1014px;
	min-width: 758px;
	margin: 0 auto;
	padding: 5px 0;
}
#header #main #menu {
	float: right;
	padding: 5px 10px;
}
#header #main #menu span {
	color: white;
	padding: 0px 10px;
	cursor: pointer;
}
#header #header_logo {
	float:left; 
	width: 45px;
	height: 30px;
	margin: 0px 10px;
	cursor: pointer;
	background-image: url("../common/img/TeO_30.png");
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
	max-width: 1004px;
	min-width: 748px;
	margin: 0 auto;
	padding: 10px;
	overflow: hidden;
	display: none;
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

.group_name {
	padding: 5px 10px;
	background-color: #333;
	color: #fff;
}
.group_body {
	padding: 10px;
	margin-bottom: 10px;
}


/* Radius Definition */

.radius_all {
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	border: 1px solid #000;
}
.radius_top {
	-webkit-border-top-right-radius: 10px;
	-webkit-border-top-left-radius: 10px;
	-moz-border-radius-topright: 10px;
	-moz-border-radius-topleft: 10px;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	border-top: 1px solid #000;
	border-left: 1px solid #000;
	border-right: 1px solid #000;
}
.radius_bottom {
	-webkit-border-bottom-right-radius: 10px;
	-webkit-border-bottom-left-radius: 10px;
	-moz-border-radius-bottomright: 10px;
	-moz-border-radius-bottomleft: 10px;
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;
	border-bottom: 1px solid #000;
	border-left: 1px solid #000;
	border-right: 1px solid #000;
	background-color: #eee;
	min-height: 10px;
}

/*----------------------*/
/*------ Holy Grail -------*/
.hg_container {		/* Holy Grail Container */
		padding-left: 100px;		/* LC width */
		padding-right: 100px;	/* RC width */
		overflow: hidden;
}
.hg_column {	/* all columns */
		float: left;
		position: relative;
}
.hg_center {	/* Center */
		width: 100%;
}
.hg_left {	/* Left */
		width: 100px;	/* LC width */
		margin-left: -100%;
		right: 100px;	/* LC width */
}
.hg_right {	/* Right */
		width: 100px;	/* RC width */
		margin-right: -100px;	/* RC width */
}
/*** IE6 Fix ***/
* html .hg_container .hg_left {
		left: 100px;           /* RC width */
}
/*---------------------------*/


#head_line {
	background-color:#333;
	color:#ddd;
	padding:10px;
}
#order_header {
	background-color:#ccc;
	padding:10px;	
}
.right_corner {
	float: right;
	/*width: 200px;*/
}
</style>

</head>

<body>
<div id='header'>
	<div id='main'>
		<div id="header_logo"></div>
		<div id="header_title">TERIYAKI ONLINE</div>
		<div id="menu">
			<span id="go_orders">Orders</span>
			<span id="go_store">Store</span>
			<span id="go_menu">Menu</span>
			<span id="go_user">User</span>
		</div>
	</div>
</div>	
