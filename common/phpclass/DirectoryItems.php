<?php
class DirectoryItems{
	//data members
	private $filearray = array();
	private $replacechar;
	private $directory;
//////////////////////////////////////////////////////////////////
//constructor
/////////////////////////////////////////////////////////////////
  public function __construct($directory, $pattern, $replacechar=" "){
		$this->directory=$directory;
		$this->replacechar=$replacechar;
		$d="";
  	if(is_dir($directory)){
  		$d=opendir($directory) or die("Failed to open directory.");
  		if ($pattern) {
  			foreach (glob($directory."/".$pattern) as $f) {
  				$f = substr($f,strripos($f,"/")+1);
  				$title=$this->createTitle($f);;
  				$this->filearray[$f]['title']=$title;
				$file = $directory."/".$f;
 				$imageproperties = getimagesize($file);
				$this->filearray[$f]['width'] = $imageproperties[0];
				$this->filearray[$f]['height'] = $imageproperties[1];
  			}
  		}
  		else {
  			while(false!==($f=readdir($d))){
    			if(is_file("$directory/$f")){
						$title=$this->createTitle($f);
						$this->filearray[$f]=$title;
    			}
  			}
  		}
			closedir($d);
		}else{
			//error
			//die("Must pass in a directory.");
			return false;
		}
	}
//////////////////////////////////////////////////////////////////
//destructor
//////////////////////////////////////////////////////////////////
	public function __destruct(){
		unset($this->filearray);
	}
//////////////////////////////////////////////////////////////////
//public fuctions
//////////////////////////////////////////////////////////////////
	public function getDirectoryName(){
		return $this->directory;
	}
//////////////////////////////////////////////////////////////////
	public function indexOrder(){
		sort($this->filearray);
	}
//////////////////////////////////////////////////////////////////
	public function naturalCaseInsensitiveOrder(){
		natcasesort($this->filearray);
	}
//////////////////////////////////////////////////////////////////
//returns false if files are not all images of these types
//////////////////////////////////////////////////////////////////
	public function checkAllImages(){
		$bln=true;
		$extension="";
		$types= array("jpg", "jpeg", "gif", "png");
		foreach ($this->filearray as $key => $value){
			$extension=substr($key,(strpos($key, ".")+1));
			$extension= strtolower($extension);
			if(!in_array($extension, $types)){
				$bln=false;
				break;
			}
		}
		return $bln;
	}
//////////////////////////////////////////////////////////////////
//returns false if not all specified extension 
//////////////////////////////////////////////////////////////////
	public function checkAllSpecificType($extension){
		$extension=strtolower($extension);
		$bln=true;
		$ext="";
		foreach ($this->filearray as $key => $value){
			$ext=substr($key,(strpos($key, ".")+1));
			$ext= strtolower($ext);
			if($extension!=$ext){
				$bln=false;
				break;
			}
		}
		return $bln;
	}
//////////////////////////////////////////////////////////////////
	public function getCount(){
		return count($this->filearray);
	}
//////////////////////////////////////////////////////////////////
	public function getFileArray(){
		return $this->filearray;
	}
//////////////////////////////////////////////////////////////////
//eliminate all elements from array except specified extension - Phase 2
/////////////////////////////////////////////////////////////////
	public function filter($extension){
		$extension=strtolower($extension);
		foreach ($this->filearray as $key => $value){
			$ext=substr($key,(strpos($key, ".")+1));
			$ext= strtolower($ext);
			if($ext!=$extension){
				unset($this->filearray[$key]);
			}
		}
	}
//////////////////////////////////////////////////////////////////
//eliminate all elements from array except images - Phase 2
/////////////////////////////////////////////////////////////////
	public function imagesOnly(){
		$extension="";
		$types= array("jpg", "jpeg", "gif", "png");
		foreach ($this->filearray as $key => $value){
			$extension=substr($key,(strpos($key, ".")+1));
			$extension= strtolower($extension);
			if(!in_array($extension, $types)){
				unset($this->filearray[$key]);
			}
		}	
	}
//////////////////////////////////////////////////////////////////
//recreate array after filtering - Phase 2
/////////////////////////////////////////////////////////////////
	public function removeFilter(){
		unset($this->filearray);
		$d="";
		$d=opendir($this->directory) or die($php_errormsg);
		while(false!==($f=readdir($d))){
  		if(is_file("$this->directory/$f")){
				$title=$this->createTitle($f);
				$this->filearray[$f]=$title;
  		}
		}
		closedir($d);
	}	
//////////////////////////////////////////////////////////////////
//get JSON file
////////////////////////////////////////////////////////////////////
	public function getJSON() {
		$pic = array();
		$i=0;
		if(isset($this->filearray)){
  			foreach($this->filearray as $key => $value ){
  				$pic[$i]['fname'] = addslashes($key);
  				$pic[$i]['title'] = addslashes($value['title']);
 				$pic[$i]['width'] = addslashes($value['width']);
 				$pic[$i]['height'] = addslashes($value['height']);
				$i++;
			}
		}
		return json_encode($pic);
	}
//////////////////////////////////////////////////////////////////
//private functions
/////////////////////////////////////////////////////////////////
	private function createTitle($title){
		//strip extension
		$title=substr($title,0,strrpos($title, "."));
		//replace word separator
		$title=str_replace($this->replacechar," ",$title);
		return $title;
	}
}//end class	
?>
