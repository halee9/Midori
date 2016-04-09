<?php
session_start();
if (isset($_SESSION['timeout'])) {
	if ($_SESSION['timeout'] + 20 * 60 < time()) {
	    //echo "<script>location.href='../';</script>";
	    echo "<script>var Timeout = true;</script>";
	    session_destroy();
	    $_SESSION['timeout'] = time();
	}
	else {
		echo "<script>var Timeout = false;</script>";
		$_SESSION['timeout'] = time();
	}
}
else {
	$_SESSION['timeout'] = time();
	echo "<script>var Timeout = false;</script>";
}

echo "<script type='text/javascript'>var ss_userid=''; var ss_usertype=''; var ss_username=''; var ss_userphone=''; var ss_useremail=''; var ss_point_usable = '';";
//echo "alert('"."OKo".$_SESSION['userid']." ".session_save_path()."');";
//echo "alert('".session_save_path()."');";
if (isset($_SESSION['userid'])) {
	$ss_userid = @$_SESSION['userid'];
	$ss_username = @$_SESSION['username'];
	$ss_usertype = @$_SESSION['usertype'];
	$ss_userphone = @$_SESSION['userphone'];
	$ss_useremail = @$_SESSION['useremail'];
	$ss_point_usable = @$_SESSION['point_usable'];
	echo "ss_userid = '" . $ss_userid . "';";
	echo "ss_usertype = '" . $ss_usertype . "';";
	echo "ss_username = '" . $ss_username . "';";
	echo "ss_userphone = '" . $ss_userphone . "';";
	echo "ss_useremail = '" . $ss_useremail . "';";
	echo "ss_point_usable = '" . $ss_point_usable . "';";
}

$vt = mktime();

$arr = explode("/",$_SERVER['PHP_SELF']);
$pgmname = $arr[count($arr)-1];
$subdir = $arr[count($arr)-2];
$arr = explode(".",$pgmname);
$purename = $arr[0];
echo "var G_PGM = '" . $purename . "';";

if ($purename == "t_checkout" || $purename == "t_mypage") {
	if ($ss_userid == "") {
		echo "location.href = 't_signin.php?hr=" . $purename . ".php';";
		//header( 'Location: http://www.teriyakionline.com/dev/tab/t_signin.php' );
	}
}
if ($subdir == "manager") {
	if ($ss_usertype != "C") echo "location.href = '../tab/t_signin.php?hr=../manager/" . $purename . ".php';";
}
echo "</script>\n";

?>
