<?php
session_start();
include "config.php";
include "../common/phpclass/Texting.php";

require("phpclass/class.phpmailer.php");
//require("phpclass/class.smtp.php");

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

$action = @$_POST['action'];


switch ( $action ) {
	case "signin": 
		$email=$_POST['email'];
		$password=$_POST['password'];

		//$clean_username = strip_tags(stripslashes(mysql_real_escape_string($username)));
		$clean_password = sha1(strip_tags(stripslashes(mysql_real_escape_string($password))));

		//$sql="SELECT * FROM User WHERE email='$email' and password='$clean_password'";
		$sql="SELECT * FROM User WHERE email='$email' LIMIT 1";
		$rs = mysql_query($sql) or die ("Query failed - ".$sql);
		$numofrows = mysql_num_rows($rs);
		//$numofrows = 1;
		if($numofrows > 0){
			$row = mysql_fetch_array($rs);
			if ($row['password'] == $clean_password) {
				$susername = $row['first_name'];
				$sphone = $row['phone'];
				$suserid = $row['id'];
				$suseremail = $row['email'];
				$user_type = $row['type'];
				
				//var_dump($row);
				
				$sql2 = "SELECT * FROM Store_User WHERE user = $suserid AND store = 1 LIMIT 1";
				$rs2 = mysql_query($sql2) or die ("Query failed - ".$sql2);
				if (mysql_num_rows($rs2) > 0) {
					$row2 = mysql_fetch_array($rs2);
					$point_usable = $row2['point_usable'];
				}
				else $point_usable = 0;
				
				/*
				session_register("username");
				session_register("usertype");
				session_register("userid");
				session_register("userphone");
				session_register("useremail");
				session_register("point_usable");
				*/
				$_SESSION['timeout'] = time();
				$_SESSION['username'] = $susername;
				$_SESSION['usertype'] = $user_type;
				$_SESSION['userid'] = $suserid;
				$_SESSION['userphone'] = $sphone;
				$_SESSION['useremail'] = $suseremail;
				$_SESSION['point_usable'] = $point_usable;
				echo "var result = 1;";
				echo "var usertype = '".$_SESSION['usertype']."';";
				echo "var userid = ".$_SESSION['userid'].";";
				echo "var username = '".$_SESSION['username']."';";
				echo "var userphone = '".$_SESSION['userphone']."';";
				echo "var useremail = '".$_SESSION['useremail']."';";
				echo "var point_usable = '".$_SESSION['point_usable']."';";
				echo "var result = 1;";
			}
			else {
				echo "var result = -1;";
			}
		}
		else {
			echo "var result = 0;";
		}
		//echo "+++".session_save_path();

		break;
		
	case "signup": 
		$first_name = $_POST['first_name'];
		$last_name = $_POST['last_name'];
		$phone = str_replace("-","",$_POST['phone']);
		$carrier = $_POST['carrier'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		
		$clean_password = sha1(strip_tags(stripslashes(mysql_real_escape_string($password))));

		$sql="SELECT * FROM User WHERE email = '$email'";
		$rs = mysql_query($sql) or die ("Query failed");

		$numofrows = mysql_num_rows($rs);

		if($numofrows>0){
			echo "var result = 0;";
		}
		else {
			$now = date("Y-m-d H:i:s");
			$sql = "INSERT INTO User VALUES ( 0, '$first_name', '$last_name', '$phone', '$carrier', '$email', '$clean_password', 'A', '$now', '','', 'N', 'N' )";
			mysql_query($sql);
			$user_id = mysql_insert_id();
			$sql2 = "INSERT INTO Store_User VALUES ( 1, $user_id, 0, 0, 0 )";
			mysql_query($sql2);
			
			echo "var result = 1;";
			Cell::send($phone,$carrier,'Thank you for signing up at Teriyaki Online.');
		}
		break;
		
	case "modify": 
		$user = $_POST['user'];
		$password = $_POST['password'];
		$clean_password = sha1(strip_tags(stripslashes(mysql_real_escape_string($password))));
		
		$sql = "SELECT password FROM User WHERE id = $user ";
		$rs = mysql_query($sql) or die ("Query failed");
		$row = mysql_fetch_array($rs);
		
		if ($clean_password != $row[0]) {
			echo "var result = 0;";
			break;
		}
		
		$first_name = $_POST['first_name'];
		$last_name = $_POST['last_name'];
		$phone = str_replace("-","",$_POST['phone']);
		$carrier = $_POST['carrier'];
		$email = $_POST['email'];
				
		$sql = "UPDATE User SET first_name = '$first_name', last_name = '$last_name', phone = '$phone', carrier = '$carrier',
								email = '$email', password = '$clean_password' WHERE id = $user";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error());
		echo "var result = 1;";
		Cell::send($phone,$carrier,'Your information has changed.');
		//sending_text($phone,$carrier,'Your information has changed.');
		
		break;
		
	case "change_password": 
		$user = $_POST['user'];
		$password = $_POST['password'];
		$clean_password = sha1(strip_tags(stripslashes(mysql_real_escape_string($password))));
						
		$sql = "UPDATE User SET password = '$clean_password' WHERE id = $user";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error());
		echo "var result = 1;";
		Cell::send($phone,$carrier,'Your password has changed.');
		
		break;
		
	case "signout":
		session_destroy();
		echo "var result = 1;";
		break;
		
	case "select":
		$user = $_POST['user'];
		$store = $_POST['store'];
		$sql = "SELECT * FROM User, Store_User WHERE id = $user AND store = $store AND User.id = Store_User.user LIMIT 1";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error());
		$row = mysql_fetch_assoc($rs);
		
		$user = array();
		$user = $row;
		echo json_encode($user);
		break;
	
	case "select_all":
		$store = $_POST['store'];
		$sql = "SELECT * FROM User, Store_User WHERE store = $store AND User.id = Store_User.user ORDER BY id DESC";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error());
		$user = array();
		while($row = mysql_fetch_assoc($rs)){
			$user[$row['id']] = $row;
		}
		echo json_encode($user);
		break;
		
	case "get_cashiers":
		$store = $_POST['store'];
		$sql = "SELECT * FROM User, Store_User WHERE store = $store AND User.id = Store_User.user AND User.type = 'C'";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error()."sql=".$sql);
		$cashier = array();
		while($row = mysql_fetch_assoc($rs)){
			$cashier[$row['id']] = $row;
		}
		echo json_encode($cashier);
		break;
		
	case "reset_password":
		$email = $_POST['email'];
		$sql = "SELECT * FROM User WHERE email ='$email' LIMIT 1";
		$rs = mysql_query($sql) or die ("Query failed");
		$is_user = false;
		while($row = mysql_fetch_array($rs)) {
			$is_user = true;
			$user = $row['id'];
			$name = $row['first_name']." ".$row['last_name'];
		}
		if ($is_user == false) {
			echo "var result = 0";
			break;
		}
		
		$token = sha1($user.$time).dechex(time()).dechex($user);
		//$link = "http://teriyakionline.com/restorepassword/?token=$token";
		$expiry = date("Y-m-d H:i:s",time()+60*60);
		$sql = "UPDATE User SET token = '$token', expiry = '$expiry' WHERE id = $user";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error());
		
		mail_reset_password($email, $name, $token);
		echo "var result = 1";
		break;
	
	default:
		echo "var result = 0;";
		break;
}



function mail_reset_password($email, $name, $token) {

	try {
		$mail = new PHPMailer(true); //New instance, with exceptions enabled
	
		//$body             = file_get_contents('contents.html');
		//$body             = preg_replace('/\\\\/','', $body); //Strip backslashes
		$body = HTML_reset_password($name, $token);
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
	
		$mail->Subject  = "Message for resetting your password - TeriyakiOnline";
	
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

function HTML_reset_password($name, $token) {
	$html = "Dear ".$name.",<br><br>";
	$html .= "This notification is generated automatically as a service to you.<br>";
	$html .= "We have received a request that you want to change your password.<br><br>";
	$html .= "To change your password for your account click here <br>";
	$html .= "http://teriyakionline.com/dev/common/password_reset.php?token=".$token."<br><br>";
	$html .= "Thank you for using TeriyakiOnline.com.";
	return $html;
}

?>

