<?php
include "config.php";

$con = mysql_connect($hostname,$username,$password);
mysql_select_db($databasename, $con);

include "getStoreMenu.php";

mysql_close($con);

?>