<?php
//include '/home/ddaji/batch/config.php';
require 'phpclass/ThumbnailImage.php';

$path = @$_GET["path"];
$maxsize = @$_GET["size"];
$mode = @$_GET["mode"];
if (!isset($maxsize)){
	$maxsize=100;
}
if (!isset($mode)){
	$mode=true;
}
else $mode=false;

//if ($mode == 'true') $mode = true;
//if ($mode == 'false') $mode = false;

if ($mode == true) {
	if (!is_file($path)){
		$path = "img/noPicture.gif";
	}
}

if(isset($path)){
  $thumb = new ThumbnailImage($path, $maxsize, $mode);	
  $thumb->getImage();
}
?>
