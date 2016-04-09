<?php
include "../common/config.php";
include "../common/phpclass/Points.php";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

$point_rate = 10;

/*
$rs = mysql_query("SELECT * FROM Orders");
while($row = mysql_fetch_array($rs)) {
	$id = $row['id'];
	$payment_type = $row['payment_type'];
	$total = $row['total'];
	$cal_point = round($total * $point_rate);
	if ($payment_type == "S") $point = $cal_point;
	else if ($payment_type == "P") $point = 0 - ($total*100);
	else {
		$point = 0;
		echo "===".$row[cust_name];
	}
	echo "++ type=".$payment_type." point=".$point." ".$id."<br>";
	mysql_query("UPDATE Orders SET point = $point WHERE id = $id") or die ("Error: " .mysql_error());
	
}
*/

$rs = mysql_query("SELECT id FROM User");
while($row = mysql_fetch_array($rs)) {
	$p = new Points($row[0],1);
	$p->resetPoints();
	
}

?>