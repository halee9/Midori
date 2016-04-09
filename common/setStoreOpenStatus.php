<?php
function setStoreOpenStatus($store_id) {

	$sql = "SELECT * FROM Store WHERE id = $store_id LIMIT 1";
	$rs = mysql_query($sql) or die ("Query failed - ".$sql);
	while($row = mysql_fetch_array($rs)) {
		$forced_closed = $row['forced_closed'];
		$business_days = $row['business_days'];
		$business_hours_from = $row['business_hours_from'];
		$business_hours_to = $row['business_hours_to'];
	}
	
	$open_status = "Y";
	
	if ($forced_closed == "Y") {
		$open_status = "N";
	}
	else if ($forced_closed == "N") {
		$open_status = "Y";
	}
	else {
		$biz_days = explode(",",$business_days);
		$dw = date("w");
		if (in_array($dw,$biz_days)) {
			$now = date("H:i:s");
			$before_close = 30;
			$last_order_hour = date("H:i:s",strtotime($business_hours_to) - ($before_close * 60));
			if ($now >= $business_hours_from && $now <= $last_order_hour) {
				$open_status = "Y";
			}
			else $open_status = "N";
		}
		else {
			$open_status = "N";
		}
	}
	
	$sql = "UPDATE Store SET open_status = '$open_status' WHERE id = $store_id";
	mysql_query($sql) or die ("Query failed - ".$sql);
	
	return $open_status;
}	
?>