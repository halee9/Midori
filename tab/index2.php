<?php include '../common/session_check.php' ?>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" name="viewport">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon-precomposed" href="../common/img/TeO.png">
    <link rel="shortcut icon" href="../common/img/Te.ico">
    <title>TeriyakiOnline.com</title>
    <script src="../common/jquery/jquery-1.5.min.js"></script>
    
<script>
    $(document).ready(function() {
    	$("#usual").click(function(){
			if (ss_userid) {
				location.href = "t_checkout.php?action=usual";
			}
			else {
				location.href = "t_signin.php?hr=t_checkout.php";
			}
    	});
    	$("#show_menu").click(function(){
    		location.href = "t_store.php";
    	});
    });


function select_usual() {
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=select_usual&user=" + ss_userid,
        dataType: "json",
        success: function(json){
        	if (json) {
        		delete_all_order_cookies();
	        	for (var j in json.items) {
	        		reset_order_cookie(json.items[j]);
	        	}
	        	create_cart_view();
	        	hiding_and_show($("#cart_container"));
	        }
        }
    });
	
}

</script>
<style type="text/css">
body {
	font-family: Helvetica, Arial,sans-serif;
	font-size: 16px;
	padding: 0px;
	margin: 0px;
	font-weight: bold;
	-webkit-text-size-adjust:none; 
	background-image: url(../common/img/grey_bg.png);
}
.first_page {
	background-image: url("../common/img/collage_1088.png");
	background-position: center top;
	height: 100%;
	min-height: 700px;
}
#main_container {
	position:relative;
	max-width: 1088px;
	/*max-width: 768px;*/
	min-width: 768px;
	width: 100%;
	margin: 0 auto;
	padding: 0px;
	/*background-color: #222;*/
	overflow: hidden;
}
span {
	display: inline-block;
}
#site_title {
	margin: 50px auto;
	width: 360px;
	padding: 30px;
	background-color: #660000;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	border: 1px solid #000;
	vertical-align: middle;
}
#site_logo {
	background-image: url(../common/img/TeO.png);
	width: 60px;
	height: 40px;
	float: left;
}
#site_name {
	color: #eee;
	font-size: 36px;	
	height: 40px;
	margin-left: 20px;
}
button {
	font-size:30px;
	padding: 10px;
	border-radius:10px;
	background-color: #eee;
	color: #333;
	font-weight: bold;
	cursor: pointer;
	margin: 20px;
}

#buttons {
	text-align: center;
	position: absolute;
	bottom: 200px;
	width: 100%;
}
#buttons button {
	width: 340px;
	display: block;
}
</style>
</head>
<body>
<div id='main_container' class="first_page">
	<div id="site_title">
		<span id="site_logo"></span>
		<span id="site_name">Teriyaki Online</span>
	</div>
	<div id="buttons">
		<center>
		<button id="usual">I'll have the usual.</button>
		<button id="show_menu">Show me the menu.</button>
		</center>
	</div>
</div>
		





