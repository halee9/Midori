<?php
session_start();
include "config.php";
include "setStoreOpenStatus.php";
include "resetStoreJson.php";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);


$store_id = 1;
$open_status = setStoreOpenStatus($store_id);

if ($open_status == "Y") $msg = "OPEN";
else $msg = "CLOSED";

echo "The store is $msg at ".date("H:i:s").".";

resetStoreJson($store_id);

?>