<?php
require '../phpclass/ThumbnailImage.php';
/*
Uploadify v2.1.4
Release Date: November 8, 2010

Copyright (c) 2010 Ronnie Garcia, Travis Nickels

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

$prefix = @$_GET['prefix'];
if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'] . '/';
	$targetPath =  str_replace('//','/',$targetPath);
	$fileName = $_FILES['Filedata']['name'];
	$targetFile =  $targetPath . $prefix . $fileName;
	//$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
	
	$fileTypes  = str_replace('*.','',$_REQUEST['fileext']);
	$fileTypes  = str_replace(';','|',$fileTypes);
	$typesArray = split('\|',$fileTypes);
	$fileParts  = pathinfo($_FILES['Filedata']['name']);
	
	$i = 2;
	$parts = explode('.', $fileName);
	while (is_file($targetFile)) {
		$fileNameTemp = $parts[0] . "_(" . $i . ")." . $parts[1];
		$targetFile =  $targetPath . $prefix . $fileNameTemp;
		$i++;
	}
	
	if (in_array(strtolower($fileParts['extension']),$typesArray)) {
	    $thumb = new ThumbnailImage($tempFile, 400, true);	
	    $thumb->saveImage($targetFile);
		// Uncomment the following line if you want to make the directory if it doesn't exist
		//mkdir(str_replace('//','/',$targetPath), 0755, true);
		
		//move_uploaded_file($tempFile,$targetFile);
		$output = str_replace($_SERVER['DOCUMENT_ROOT'],'',$targetFile);
		$size = $thumb->getSize($targetFile);
		$width = $size[0];
		$height = $size[1];
		$temp = explode('/',$output);
		$name = $temp[count($temp)-1];
		echo "var code = 1; ";
		echo "var file = {};";
		echo "file.fname = '" . $name . "';";
		echo "file.width = " . $width . ";";
		echo "file.height = " . $height . ";";
	} else {
	 	echo "var code = 0; var msg = 'Invalid file type.';";
	}
}
?>