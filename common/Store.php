<?php
session_start();
include "config.php";
include "setStoreOpenStatus.php";
include "resetStoreJson.php";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

$action = @$_POST['action'];
$store_id = @$_POST['store'];

if ($action == "get_open_now") {
	echo "var result = false;";
	$sql = "SELECT * FROM Store WHERE id = $store_id LIMIT 1";
	$rs = mysql_query($sql) or die ("Query failed - ".$sql);
	while($row = mysql_fetch_array($rs)) {
		$forced_closed = $row['forced_closed'];
		$business_days = $row['business_days'];
		$business_hours_from = $row['business_hours_from'];
		$business_hours_to = $row['business_hours_to'];
	}
	if ($forced_closed == "Y") {
		echo "result = false;";
		return;
	}
	else if ($forced_closed == "N") {
		echo "result = true;";
		return;
	}
	else {
		$biz_days = explode(",",$business_days);
		$dw = date("w");
		if (in_array($dw,$biz_days)) {
			$now = date("H:i:s");
			$before_close = 30;
			$last_order_hour = date("H:i:s",strtotime($business_hours_to) - ($before_close * 60));
			if ($now >= $business_hours_from && $now <= $last_order_hour) {
				echo "result = true;";
			}
			else echo "result = false;";
		}
		else {
			echo "result = false;";
		}
	}
}
if ($action == "get_store_info") {
	$sql = "SELECT * FROM Store WHERE id = $store_id LIMIT 1";
	$rs = mysql_query($sql) or die ("Query failed - ".$sql);
	$store = array();
	while($row = mysql_fetch_array($rs)) {
		$store = $row;
	}
	echo json_encode($store);
}

if ($action == "get_forced_closed") {
	echo "var result = false;";
	$sql = "SELECT forced_closed FROM Store WHERE id = $store_id LIMIT 1";
	$rs = mysql_query($sql) or die ("Query failed - ".$sql);
	while($row = mysql_fetch_array($rs)) {
		echo "var closed = '".$row[0]."';";
		echo "result = true;";
	}
}

if ($action == "set_forced_closed") {
	echo "var result = false;";
	$closed = @$_POST['closed'];
	if ($closed == "Y" || $closed == "N" || $closed == "S") {
		$sql = "UPDATE Store SET forced_closed = '$closed' WHERE id = $store_id";
		$rs = mysql_query($sql) or die ("Query failed - ".$sql);
		echo "result = true;";
		setStoreOpenStatus($store_id);
		resetStoreJson($store_id);
	}
}

if ($action == "set_cashier_info") {
	echo "var result = false;";
	$cashier = @$_POST['cashier'];
	$texting = @$_POST['text'];
	$sql = "SELECT phone, carrier FROM User WHERE id = $cashier LIMIT 1";
	$rs = mysql_query($sql) or die ("Query failed - ".$sql);
	while($row = mysql_fetch_array($rs)) {
		$phone = $row[0];
		$carrier = $row[1];
		$sql2 = "UPDATE Store SET cashier_id = $cashier, cashier_phone = '$phone', cashier_carrier = '$carrier', cashier_text = '$texting' WHERE id = $store_id";
		$rs2 = mysql_query($sql2) or die ("Query failed - ".$sql2);
		echo "result = true;";
	}
}


?>