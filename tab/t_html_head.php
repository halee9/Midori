<?php 

include '../common/session_check.php'; 
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--<meta content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" name="viewport">-->
    <meta content="user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimum-scale=0, width=device-width" name="viewport">
    <!--<meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon-precomposed" href="../common/img/TeO.png">-->
    <link rel="shortcut icon" href="../common/img/Te.ico">
    <title>TeriyakiOnline.com - Midori Teriyaki at Downtown Seattle</title>
	<!--
	<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>-->
    
    <script src="../common/jquery/jquery-1.5.min.js"></script>
    <script src="../common/jquery/jquery.effects.core.js"></script>
    <script src="../common/jquery/jquery.effects.transfer.js"></script>
    <script src="../common/jquery/jquery_cookie/jquery.cookie.js"></script>
    <script src="../common/JSON/json2.js"></script>
    <script src="../common/store_json.js?v=<?=$vt?>"></script>
    <script src="<? echo $purename . '.js?v='.$vt ?>"></script>
    <script src="t_header.js?v=<?=$vt?>"></script>
    <script src="../common/store_common.js?v=<?=$vt?>"></script>
    <link href="t_store.css?v=<?=$vt?>" rel="stylesheet" type="text/css" />

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
<div id="message" class="radius_bottom"></div>
<div id='header'>
	<div class='main'>
		<div id="header_logo"></div>
		<div id="header_title">TERIYAKI ONLINE</div>
		<!--<div id="header_user"></div>-->
		<div id="sign_in_button" class="tiny_button">Sign In</div>
		<div id="sign_out_button" class="tiny_button">Sign Out</div>
		<div id="header_right">
			<div id="order_total_top">
				<span>&nbsp;Your orders:&nbsp;</span><span id='total_qty'>0</span>
            	<span>&nbsp;for&nbsp;</span>
            	<span id='total_amount'>$ 0.00</span>
            	<span id='checkout' class="tiny_button">Checkout</span>
			</div>
		</div>
	</div>
</div>			
<div id="orderlist"></div>
<div id='main_container'>
	<div id="left_container">



