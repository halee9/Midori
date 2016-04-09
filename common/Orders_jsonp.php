<?php
include "config.php";
require("phpclass/class.phpmailer.php");

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

$action = $_GET['action'];
if ($action == 'update_status') {
	//echo callback("start");
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
