<?php include '../common/session_check.php' ?>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" name="viewport">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon-precomposed" href="../common/img/TO_icon.png">
    <title>TeriyakiOnline.com</title>
    
    <script src="../common/jquery/jquery-1.5.min.js"></script>
    <script src="../common/jquery/jquery_cookie/jquery.cookie.js"></script>
    <script src="../common/JSON/json2.js"></script>
    <script src="../common/store_json.js"></script>
    <script src="<? echo $purename . '.js'; ?>"></script>
    <script src="mheader.js"></script>
    <script src="mfooter.js"></script>
    <script src="../common/store_common.js"></script>
    <link href="mstore.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="message"></div>
<div id='header'>
	<div class='left'><button class='left_button'>Left</button></div>
	<div class='right'><button class='right_button'>Right</button></div>
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
