<?php
include "config.php";
include "phpclass/Texting.php";
include "phpclass/Points.php";
require("phpclass/class.phpmailer.php");
//include "firebasePHP/firebaseLib.php";

$point_rate = 5;

$cashier_phone = "2069724011";
//$cashier_phone = "2063834140";
$cashier_carrier = "AT&T";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);


$now = date("Y-m-d H:i:s");
$action = $_POST['action'];

$action_p = $_GET['action'];

if ($action_p == 'update_status_jsonp') {
    $id = $_GET['id'];
    $status = $_GET['status'];
    
    $sql = "SELECT status FROM Orders WHERE id = $id LIMIT 1";
    $rs = mysql_query($sql) or die ("Error: " .mysql_error());
    while($row = mysql_fetch_array($rs)) {
    	if ($row[0] != $status) {
	    	update_order_status($id, $status);
	    	echo $_GET['callback'] . '(' . "{'result' : 'Done'}" . ')';
	    	//update 3/17/2014 for firebase
	    }
	    else echo $_GET['callback'] . '(' . "{'result' : 'Already Updated'}" . ')';
    }
}


if ($action == 'get_status') {
    $id = $_POST['order'];
    
    $sql = "SELECT * FROM Orders WHERE id = $id LIMIT 1";
    $rs = mysql_query($sql) or die ("Error: " .mysql_error());
    $order = array();
    while($row = mysql_fetch_array($rs)) {
    	$order = $row;
    }
    echo json_encode($order);

}

if ($action == 'update_status') {
    $id = $_POST['id'];
    $status = $_POST['status'];
    
    $sql = "SELECT status FROM Orders WHERE id = $id LIMIT 1";
    $rs = mysql_query($sql) or die ("Error: " .mysql_error());
    while($row = mysql_fetch_array($rs)) {
    	if ($row[0] != $status) {
	    	update_order_status($id, $status);
	    	//update 3/17/2014 for firebase
	    	if ($status == 'T' && $row[0] == 'P') {
		    	echo json_encode("auto_transfer");
		    	
	    	}
	    	else {
	    		$action = 'processing';
	    	}
	    }
    }
}

if ($action == 'processing') {
	$order = array();
	$today = @date("Y-m-d");
	$store_id = $_POST['store'];
	$show_all = $_POST['show_all'];
	//$sql = "SELECT * FROM Orders WHERE status <> 'Z' AND store = $store_id AND dateCreated = '$today' ORDER BY id DESC";
	//$sql = "SELECT * FROM Orders WHERE status <> 'D' AND store = $store_id ORDER BY id DESC";
	if ($show_all == "Y") $sql = "SELECT * FROM Orders WHERE store = $store_id AND dateCreated = '$today' ORDER BY id DESC";
	else $sql = "SELECT * FROM Orders WHERE status <> 'D' AND status <> 'X' AND store = $store_id AND dateCreated = '$today' ORDER BY id DESC";
	$rs = mysql_query($sql) or die ("Error: " .mysql_error());
	while($row = mysql_fetch_assoc($rs)){
		$order[$row['id']] = $row;
		$order[$row['id']]['items'] = array();
		
		$order_id = $row['id'];
		$sql2 = "SELECT * FROM Order_item WHERE order_id = $order_id";
		$rs2 = mysql_query($sql2) or die ("Error: " .mysql_error());
		while($row2 = mysql_fetch_assoc($rs2)){
			$order[$row['id']]['items'][$row2['no']] = $row2;
			$order[$row['id']]['items'][$row2['no']]['options'] = array();
			
			$item_no = $row2['no'];
			$sql3 = "SELECT * FROM Order_item_option WHERE order_id = $order_id AND item_no = $item_no ";
			$rs3 = mysql_query($sql3) or die ("Error: " .mysql_error());
			while($row3 = mysql_fetch_assoc($rs3)){
				$order[$row['id']]['items'][$row2['no']]['options'][$row3['option_no']] = $row3;
			}
		}
	}
	echo json_encode($order);
}

if ($action == 'select') {
	$order = array();
	$user = $_POST['user'];
	$count = $_POST['count'];
	if (!$count) $count = 0;
	$order_id = $_POST['order'];
	if ($order_id == 0) $order_id = 99999999;
	$sql = "SELECT * FROM Orders WHERE user = $user AND id < $order_id ORDER BY id DESC LIMIT $count";
	$rs = mysql_query($sql) or die ("Error: " .mysql_error());
	while($row = mysql_fetch_assoc($rs)){
		$order[$row['id']] = $row;
		$order[$row['id']]['items'] = array();
		
		$order_id = $row['id'];
		$sql2 = "SELECT * FROM Order_item WHERE order_id = $order_id";
		$rs2 = mysql_query($sql2) or die ("Error: " .mysql_error());
		while($row2 = mysql_fetch_assoc($rs2)){
			$order[$row['id']]['items'][$row2['no']] = $row2;
			$order[$row['id']]['items'][$row2['no']]['options'] = array();
			
			$item_no = $row2['no'];
			$sql3 = "SELECT * FROM Order_item_option WHERE order_id = $order_id AND item_no = $item_no ";
			$rs3 = mysql_query($sql3) or die ("Error: " .mysql_error());
			while($row3 = mysql_fetch_assoc($rs3)){
				$order[$row['id']]['items'][$row2['no']]['options'][$row3['option_no']] = $row3;
			}
		}
	}
	echo json_encode($order);
}

if ($action == 'selectone') {
	$order = "";
	$order_id = $_POST['order'];
	$sql = "SELECT * FROM Orders WHERE id = $order_id LIMIT 1";
	$rs = mysql_query($sql) or die ("Error: " .mysql_error());
	while($row = mysql_fetch_assoc($rs)){
		$order = $row;
		$order['items'] = array();
		
		$sql2 = "SELECT * FROM Order_item WHERE order_id = $order_id";
		$rs2 = mysql_query($sql2) or die ("Error: " .mysql_error());
		while($row2 = mysql_fetch_assoc($rs2)){
			$order['items'][$row2['no']] = $row2;
			$order['items'][$row2['no']]['options'] = array();
			
			$item_no = $row2['no'];
			$sql3 = "SELECT * FROM Order_item_option WHERE order_id = $order_id AND item_no = $item_no ";
			$rs3 = mysql_query($sql3) or die ("Error: " .mysql_error());
			while($row3 = mysql_fetch_assoc($rs3)){
				$order['items'][$row2['no']]['options'][$row3['option_no']] = $row3;
			}
		}
	}
	echo json_encode($order);
}

if ($action == 'select_usual') {
	$order = "";
	$user_id = $_POST['user'];
	$sql = "SELECT * FROM Orders WHERE user = $user_id AND usual = 'Y' ORDER BY id DESC LIMIT 1";
	//echo "++ ".$sql;
	$rs = mysql_query($sql) or die ("Error: " .mysql_error());
	while($row = mysql_fetch_assoc($rs)){
		$order = $row;
		$order_id = $row['id'];
		$order['items'] = array();
		
		$sql2 = "SELECT * FROM Order_item WHERE order_id = $order_id";
		$rs2 = mysql_query($sql2) or die ("Error: " .mysql_error());
		while($row2 = mysql_fetch_assoc($rs2)){
			$order['items'][$row2['no']] = $row2;
			$order['items'][$row2['no']]['options'] = array();
			
			$item_no = $row2['no'];
			$sql3 = "SELECT * FROM Order_item_option WHERE order_id = $order_id AND item_no = $item_no ";
			$rs3 = mysql_query($sql3) or die ("Error: " .mysql_error());
			while($row3 = mysql_fetch_assoc($rs3)){
				$order['items'][$row2['no']]['options'][$row3['option_no']] = $row3;
			}
		}
	}
	echo json_encode($order);
}

if ($action == 'placeorder') {
	echo "var code = 0;";
	
	$order = json_decode(stripslashes(@$_POST['order']),true);
	//var_dump($order);	
	
	
	$subtotal = $order['subtotal'];
	$tax = $order['tax'];
	$total = $order['total'];
	$cust_name = addslashes($order['username']);
	$cust_phone = $order['userphone'];
	$cust_email = $order['useremail'];
	$user = (int) $order['userid'];
	$cust_pickup_time = $order['pickup_time'];
	$store = (int) $order['store'];
	$order_type = $order['order_type'];
	$payment_type = $order['payment_type'];
	
	$text_me = $order['text_me'];
	$email_me = $order['email_me'];
	$cal_point = round($total * $point_rate);
	if ($payment_type == "S") { 
		$point = $cal_point; 
		// No more point system 01/09/2014
		$point = 0; 
	}
	else { 
		$point = (0 - ($total*100)); 
		$payment_type = "P";
	}
	//echo "var point = " . $point . ";";
	$usual = $order['usual'];
	$from_where = $order['from_where'];
	
	$sql = "SELECT * FROM User WHERE id = $user LIMIT 1";
	$rs1 = mysql_query($sql) or die ("Error: " .mysql_error());
	$row1 = mysql_fetch_assoc($rs1);
	$cust_name = $row1['first_name']." ".$row1['last_name'];
	$cust_phone = $row1['phone'];
	$cust_carrier = $row1['carrier'];
	$cust_email = $row1['email'];

	$msg = array();
	
	/*
	$expire=time()+60*60*24*365;
	setcookie("cust_name", $cust_name, $expire);
	setcookie("cust_phone", $cust_phone, $expire);
	 * */
	//setcookie("prev_order", $order, $expire);
	
	$today = date("Y-m-d");
	$sql = "SELECT daily_no FROM Orders WHERE store = $store AND dateCreated = '$today' ORDER BY id DESC LIMIT 1";
	$rs = mysql_query($sql) or die ("Error: " .mysql_error());
	if (mysql_num_rows($rs) > 0) {
			$row = mysql_fetch_array($rs);
			$daily_no = $row[0] + 1;
	}
	else {
			$daily_no = 1;
	}
	//$cust_carrier = "AT&T";
	
	$sql = "INSERT INTO Orders VALUES ( 0, $daily_no, $subtotal, $tax, $total, '$cust_name', '$cust_phone', '$cust_carrier', '$cust_pickup_time', '$cust_email', $user, '$now', 'P', $store, '$order_type', '$text_me', '$email_me', $point, '$now', NULL,NULL,NULL,NULL, '$usual', '$payment_type', '$from_where' )";
	
	//echo "sql=". $sql . "=end";
	
	mysql_query($sql) or die ("Error: " .mysql_error());
	
	$order_id = mysql_insert_id();
	
	$items = $order['items'];
	
	$i=0;
	foreach ($items as $item) {
		$menu_id = $item['menu_id'];
		
		$sql = "SELECT * FROM N_Menu WHERE id = $menu_id LIMIT 1";
		$rs1 = mysql_query($sql) or die ("Error: " .mysql_error());
		$row1 = mysql_fetch_assoc($rs1);
		$abbr = $row1["abbr_name"];
		$job = $row1["job"];
		
		$name = addslashes($item['menu_name']);
		$count = $item['qty'];
		$price = $item['subtotal'];
		//$option = addslashes($item['option']);
		$special_instruction = "";
		if (@$item['special_instruction']) {
			$special_instruction = addslashes($item['special_instruction']);
		}
		
		$sql = "INSERT INTO Order_item VALUES ( $order_id, $i+1, $menu_id, '$name', $count, $price, '$special_instruction', '$abbr', '$job' )";
		mysql_query($sql) or die ("Error: " .mysql_error());
		$msg[] = $count . " " . $name;
		
		$option = $item['option'];
		for ($j=0; $j < count($option); $j++) {
			$option_id = $option[$j]['id'];
			$option_abbr= $option[$j]['abbr'];
			$option_name= $option[$j]['name'];
			$option_price= $option[$j]['price'];
			
			$sql = "INSERT INTO Order_item_option VALUES ( $order_id, $i+1, $j+1, $option_id, '$option_abbr', '$option_name', $option_price )";
			mysql_query($sql) or die ("Error: " .mysql_error());
		}
		$i++;
	}
	echo "var payment_type = '".$payment_type."';";
	if ($payment_type == "P") {
		$p = new Points($user, $store);
		$p->usePoints($point);
		@session_start();
		$_SESSION['point_usable'] = $p->getPointsUsable();
	}
	
	echo "var code = 1;";
	echo "var order_id = " . $order_id . ";";
	
	$sql = "SELECT cashier_phone, cashier_carrier, cashier_text FROM Store WHERE id = $store LIMIT 1";
	$rs = mysql_query($sql) or die ("Error: " .mysql_error());
	while($row = mysql_fetch_array($rs)) {
		if ($row[2] == "Y") {
			$cashier_phone = $row[0];
			$cashier_carrier = $row[1];
			$cell_msg = implode(", ", $msg);
			Cell::send($cashier_phone, $cashier_carrier,'You got '.$cell_msg.".");
		}
	}
	
	//set_Firebase($order);
	

}
/*
function set_Firebase($order) {
	const DEFAULT_URL = 'https://halee.firebaseio.com/';
	const DEFAULT_TOKEN = 'JMhEG8CGeGKh1VWB731evuteverSQwkJQCRGwQOe';
	const DEFAULT_ORDER_PATH = '/orders';
	
	$firebase = new Firebase(DEFAULT_URL, DEFAULT_TOKEN);
	
	$todoMilk = array(
		'name' => 'Pick the milk',
		'priority' => 1
	);
	
	
	$firebase->set(DEFAULT_ORDER_PATH, $todoMilk);

}
*/

function send_mail($email, $message) {

	try {
		$mail = new PHPMailer(true); //New instance, with exceptions enabled
	
		//$body             = file_get_contents('contents.html');
		//$body             = preg_replace('/\\\\/','', $body); //Strip backslashes
		$body = $message;
		//$body = "Test Test";
	
		$mail->IsSMTP();                           // tell the class to use SMTP
		$mail->SMTPAuth   = true;                  // enable SMTP authentication
		$mail->Port       = 26;                    // set the SMTP server port
		$mail->Host       = "mail.teriyakionline.com"; // SMTP server
		//$mail->Username   = "admin@teriyakionline.com";     // SMTP server username
		//$mail->Password   = "coven1313";            // SMTP server password
	
		$mail->IsSendmail();  // tell the class to use Sendmail
	
		$mail->AddReplyTo("admin@teriyakionline.com","Teriyaki Online");
	
		$mail->From       = "admin@teriyakionline.com";
		$mail->FromName   = "Teriyaki Online";
	
		$to = $email;
	
		$mail->AddAddress($to);
	
		$mail->Subject  = $message;
	
		$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
		$mail->WordWrap   = 80; // set word wrap
	
		$mail->MsgHTML($body);
	
		$mail->IsHTML(true); // send as HTML
	
		$mail->Send();
		//echo 'Message has been sent.';
	} 
	
	catch (phpmailerException $e) {
		//echo $e->errorMessage();
	}
	
}

function update_order_status($id, $status) {
    
    $now = date("Y-m-d H:i:s");
    if ($status == "T") {
	    $sql = "UPDATE Orders SET  status = '$status', time_second = '$now' WHERE id = $id ";
    }
    else if ($status == "R") {
	    $sql = "UPDATE Orders SET  status = '$status', time_third = '$now' WHERE id = $id ";
    }
    else if ($status == "D") {
	    $sql = "UPDATE Orders SET  status = '$status', time_forth = '$now' WHERE id = $id ";
    }
    else if ($status == "X") {
	    $sql = "UPDATE Orders SET  status = '$status', time_fifth = '$now' WHERE id = $id ";
    }
    else {
	    $sql = "UPDATE Orders SET  status = '$status' WHERE id = $id ";
    }
    mysql_query($sql) or die ("Error: " .mysql_error());
    
    /* No more point system 01/09/2014
    if ($status == "D") {
	    $sql2 = "SELECT user, store FROM Orders WHERE id = $id LIMIT 1";
	    $rs2 = mysql_query($sql2) or die ("Error: " .mysql_error());
		while($row2 = mysql_fetch_array($rs2)) {
			$user = $row2[0];
			$store = $row2[1];
			$p = new Points($user, $store);
			$p->resetPoints();
		}
    }
    */
    
    if ($status == "T" || $status == "R") {
		$sql = "SELECT * FROM Orders WHERE id = $id ";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error());
		$row = mysql_fetch_assoc($rs);
    	if ($status == "T") {
			$cell_msg = "Your orders are taken by the cashier. Thank you for ordering.";
    		if ($row['text_me'] == "Y") {
				Cell::send($row['cust_phone'], $row['cust_carrier'], $cell_msg);
			}
			if ($row['email_me'] == "Y") {
				send_mail($row['cust_email'], $cell_msg);
			}
		}
    	if ($status == "R" && $row['order_type'] == "P") {
			$cell_msg = "Your orders are ready for pick-up now. Thank you.";
    		if ($row['text_me'] == "Y") {
				Cell::send($row['cust_phone'], $row['cust_carrier'], $cell_msg);
			}
			if ($row['email_me'] == "Y") {
				send_mail($row['cust_email'], $cell_msg);
			}
		}
    }
}
?>
