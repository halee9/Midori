<?php
//requires GD 2.0.1 or higher
//note about gif
class ThumbnailImage{
	private $image;
	//not applicable to gif or png
	private $quality = 100;
	private $mimetype;
	private $imageproperties;
	private $initialfilesize;
	private $mode;
////////////////////////////////////////////////////////
//constructor
////////////////////////////////////////////////////////
	public function __construct($file, $thumbnailsize = 100, $mode){
		//check path
		if ($mode == true) {
			is_file($file) or die ("File: $file doesn't exist.");
			$this->initialfilesize = filesize($file);
		}
		$this->imageproperties = getimagesize($file) or die ("Incorrect file type.");
		// new function image_type_to_mime_type
		$this->mimetype = image_type_to_mime_type($this->imageproperties[2]);	
		$this->mode = $mode;
		//create image
		switch($this->imageproperties[2]){
			case IMAGETYPE_JPEG:
				$this->image = imagecreatefromjpeg($file);	
				break;
			case IMAGETYPE_GIF:	
				$this->image = imagecreatefromgif($file);
				break;
			case IMAGETYPE_PNG:
				$this->image = imagecreatefrompng($file);
				break;
			default:
				die("Couldn't create image.");
		}
		$this->createThumb($thumbnailsize);
	}
////////////////////////////////////////////////////////
//destructor
////////////////////////////////////////////////////////
	public function __destruct(){
		if(isset($this->image)){
			imagedestroy($this->image);			
		}
	}
////////////////////////////////////////////////////////
//public methods
////////////////////////////////////////////////////////
	public function getImage(){
		header("Content-type: $this->mimetype");
		switch($this->imageproperties[2]){
			case IMAGETYPE_JPEG:
				imagejpeg($this->image,"",$this->quality);
				break;
			case IMAGETYPE_GIF:
				imagegif($this->image);
				break;
			case IMAGETYPE_PNG:
				imagepng($this->image);
				break;
			default:
				die("Couldn't create image.");
		}
	}
////////////////////////////////////////////////////////
	public function saveImage($path){
		//header("Content-type: $this->mimetype");
		switch($this->imageproperties[2]){
			case IMAGETYPE_JPEG:
				imagejpeg($this->image,$path,$this->quality);
				break;
			case IMAGETYPE_GIF:
				imagegif($this->image,$path);
				break;
			case IMAGETYPE_PNG:
				imagepng($this->image,$path);
				break;
			default:
				die("Couldn't create image.");
		}
	}
////////////////////////////////////////////////////////
	public function getSize($path){
		$this->imageproperties = getimagesize($path) or die ("Incorrect file type.");
		return $this->imageproperties;
	}
////////////////////////////////////////////////////////
	public function getMimeType(){
  
		return $this->mimetype;
	}
////////////////////////////////////////////////////////
	public function getQuality(){
		$quality = null;
		if($this->imageproperties[2] == IMAGETYPE_JPEG){
			$quality = $this->quality;
		}
		return $quality;
	}
////////////////////////////////////////////////////////
	public function setQuality($quality){
		if($quality > 100 || $quality  <  1){
			$quality = 75;
    }
		if($this->imageproperties[2] == IMAGETYPE_JPEG){
			$this->quality = $quality;
		}
	}
////////////////////////////////////////////////////////
	public function getInitialFileSize(){	
		return $this->initialfilesize;
	}
////////////////////////////////////////////////////////
//private methods
////////////////////////////////////////////////////////
	private function createThumb($thumbnailsize){
		//array elements
		$srcW = $this->imageproperties[0];
		$srcH = $this->imageproperties[1];
		//only adjust if larger than reduction size
		if($srcW >$thumbnailsize || $srcH > $thumbnailsize){
			$reduction = $this->calculateReduction($thumbnailsize);
			//get proportions
	  		$desW = $srcW/$reduction;
	  		$desH = $srcH/$reduction;								
			$copy = imagecreatetruecolor($desW, $desH);			
			imagecopyresampled($copy,$this->image,0,0,0,0,$desW, $desH, $srcW, $srcH)
				 or die ("Image copy failed.");			
			//destroy original
			imagedestroy($this->image);
			$this->image = $copy;			
		}
	}
////////////////////////////////////////////////////////
	private function calculateReduction($thumbnailsize){
		//adjust
		$srcW = $this->imageproperties[0];
		$srcH = $this->imageproperties[1];
		if ($this->mode == true) {
			$option = $thumbnailsize * 3 / 4;
			if (($srcH / $srcW) > ($option / $thumbnailsize)) {
				$reduction = $srcH/$option;
	//  	if($srcW < $srcH){
	//  		$reduction = round($srcH/$thumbnailsize);
	  	}else{  			
	  		$reduction = $srcW/$thumbnailsize;
	  	}
	  }
	  else {
  		$sizeW = $srcW/$thumbnailsize;
  		$sizeH = $srcH/$thumbnailsize;
  		if ($sizeW > $sizeH) $reduction = $sizeH;
  		else $reduction = $sizeW;
	  }
  	
		return $reduction;
	}
}//end class
////////////////////////////////////////////////////////
?>
