<?php 
include "config.php";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

$action = $_POST["action"]; 
$store_id = $_POST["store"]; 

if ($action == 'selectone') {
	$option_id = @$_POST["id"]; 
	$option = array();
	$q = "SELECT * FROM Options WHERE store = $store_id AND id = $option_id ";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	while($row = mysql_fetch_array($res)){
		$option['id'] = $row['id'];
		$option['name'] = $row['name'];
		$option['price'] = $row['price'];
		$option['type'] = $row['type'];
	}
	echo json_encode($option);
}

if ($action == 'select') {
	$option = array();
	$q = "SELECT * FROM Options WHERE store = $store_id ORDER BY type";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	$i=0;
	while($row = mysql_fetch_array($res)){
		$option[$i]['id'] = $row['id'];
		$option[$i]['name'] = $row['name'];
		$option[$i]['price'] = $row['price'];
		$option[$i]['type'] = $row['type'];
		$i++;
	}
	echo json_encode($option);
}

if ($action == 'insert') {
	$max_id = 0;
	$q = "SELECT MAX(id) FROM Options WHERE store = $store_id";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	while($row = mysql_fetch_array($res)){
		$max_id = $row[0];
	}
	$max_id++;
	
	$name = addslashes(@$_POST["name"]); 
	$price = @$_POST["price"]; 
	$type = @$_POST["type"]; 
	
	$q = "INSERT INTO Options VALUE ($store_id, $max_id, '$name' , $price, '$type' ) ";
	//echo $q;
	mysql_query($q) or die ("Error: " . mysql_error());
	echo "OK";
}

if ($action == 'update') {
	$para = array();
	$option_id = @$_POST["id"];

	if (@$_POST["name"]) $para[] = " name = '" . addslashes($_POST["name"]) . "'";
	if (@$_POST["price"]) $para[] = " price = " . $_POST["price"] . "";
	if (@$_POST["type"]) $para[] = " type = '" . $_POST["type"] . "'";

	$parameters = implode(",",$para);
	$q = "UPDATE Options SET " . $parameters . " WHERE store = $store_id AND id = $option_id ";
	//echo $q;
		
	mysql_query($q) or die ("Error: " . mysql_error());
	echo "OK";
}

if ($action == 'delete') {
	$option_id = @$_POST["id"];
	$q = "DELETE FROM Options WHERE store = $store_id AND id = $option_id ";
	//echo $q;
		
	mysql_query($q) or die ("Error: " . mysql_error());
	echo "OK";
} 

mysql_close($con);

function format_phone_no($phone) {
	return substr($phone,0,3) . "-" . substr($phone,3,3) . "-" . substr($phone,6,4);
}

?>