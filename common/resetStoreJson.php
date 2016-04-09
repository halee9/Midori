<?php
function resetStoreJson($store_id) {
	$file = fopen("store_json.js","w");
	
	$q = "SELECT * FROM Store WHERE id = $store_id ";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	$store = array();
	while($row = mysql_fetch_assoc($res)){
		$store = $row;
	}
	$content = "var G_store = " . json_encode($store) . ";";
	
	$q = "SELECT * FROM N_Menu WHERE store = $store_id ";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	$menu = array();
	while($row = mysql_fetch_assoc($res)){
		$menu[$row['id']] = $row;
	}
	$content .= "var G_menu = " . json_encode($menu) . ";";
	
	$q = "SELECT * FROM N_Menugroup WHERE store = $store_id ";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	$menugroup = array();
	while($row = mysql_fetch_assoc($res)){
		$menugroup[$row['id']] = $row;
	}
	$content .= "var G_menugroup = " . json_encode($menugroup) . ";";
	
	$q = "SELECT * FROM N_Options WHERE store = $store_id ";
	$res = mysql_query($q) or die ("Error: " . mysql_error());
	$options = array();
	while($row = mysql_fetch_assoc($res)){
		$options[$row['id']] = $row;
	}
	$content .= "var G_options = " . json_encode($options) . ";";
	
	//echo "New Store Json File Created!";
	
	fwrite($file,$content);
	
	fclose($file);
}
?>
