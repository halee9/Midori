<?php
include "config.php";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

$store_id = 1;

$action = @$_POST['action'];

if ($action == 'get_specials') {
	$q = "SELECT * FROM N_Menu WHERE store = $store_id AND ( id > 70 AND id < 80 )";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	$menu = array();
	while($row = mysql_fetch_assoc($res)){
		$menu[$row['id']] = $row;
	}
	echo json_encode($menu);
}

if ($action == 'set_specials') {
	
	$ids = explode(",",@$_POST['ids']);
	$q = "UPDATE N_Menu SET soldout = 'Y' WHERE id > 70 AND id < 80";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	foreach ($ids as $id) {
		$q = "UPDATE N_Menu SET soldout = 'N' WHERE id = $id";
		$res = mysql_query($q) or die ("Error: " . mysql_error());
	}
	
	include "getStoreMenu.php";
	
}




mysql_close($con);

?>