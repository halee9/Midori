<?php
class Points {
	//data members
	private $user_id;
	private $store_id;
	private $point_total;
	private $point_used;
	private $point_usable;
	private $is_table;
	
	public function __construct($user_id, $store_id){
		$this->point_total = 0;
		$this->point_used = 0;
		$this->point_usable = 0;
		$this->is_table = "N";
		
		$this->user_id = $user_id;
		$this->store_id = $store_id;
		$sql = "SELECT * FROM Store_User WHERE store = $store_id AND user = $user_id LIMIT 1";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error() . " SQL=".$sql);
		while($row = mysql_fetch_array($rs)) {
			$this->point_total = $row['point_accumulated'];
			$this->point_used = $row['point_used'];
			$this->point_usable = $row['point_usable'];
			$this->is_table = "Y";
		}
	}
	
	public function __destruct(){
		unset($this->user_id);
		unset($this->store_id);
		unset($this->point_total);
		unset($this->point_used);
		unset($this->point_usable);
		unset($this->is_table);
	}
	
	public function resetPoints() {
		$this->point_total = $this->getTotalPoints();
		$this->point_used = $this->getUsedPoints();

		$this->point_usable = $this->point_total + $this->point_used;
		//echo "++ total=".$this->point_total." used=".$this->point_used." usable=".$this->point_usable."<br>";
		if ($this->is_table == "Y") {
			$this->updatePoints();
		}
		else {
			$sql = "INSERT INTO Store_User VALUES ( $this->store_id, $this->user_id, $this->point_total, 0, $this->point_total )";
			$rs = mysql_query($sql) or die ("Error: " .mysql_error() . " SQL=".$sql);
		}
		return $this->point_usable;
	}
	
	public function usePoints($point) {
		$this->point_total = $this->getTotalPoints();
		$this->point_used = $this->point_used + (int)$point;
		$this->point_usable = $this->point_total + $this->point_used;
		$this->updatePoints();
		return $this->point_used;
	}
	
	public function getTotalPoints() {
		$sql = "SELECT SUM(point) FROM Orders WHERE store = $this->store_id AND user = $this->user_id AND status = 'D' AND point > 0 LIMIT 1";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error() . " SQL=".$sql);
		$point_total = 0;
		while($row = mysql_fetch_array($rs)) {
			if (is_numeric($row[0])) {
				$point_total = $row[0];
			}
		}
		return $point_total;
	}
	public function getUsedPoints() {
		$sql = "SELECT SUM(point) FROM Orders WHERE store = $this->store_id AND user = $this->user_id AND status = 'D' AND point < 0 LIMIT 1";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error() . " SQL=".$sql);
		$point_used = 0;
		while($row = mysql_fetch_array($rs)) {
			if (is_numeric($row[0])) {
				$point_used = $row[0];
			}
		}
		return $point_used;
	}

	public function updatePoints() {
		$sql = "UPDATE Store_User SET point_accumulated = $this->point_total, point_usable = $this->point_usable, point_used = $this->point_used ";
		$sql .= "WHERE store = $this->store_id AND user = $this->user_id";
		$rs = mysql_query($sql) or die ("Error: " .mysql_error() . " SQL=".$sql);
	}
	
	public function getPointsUsable() {
		return $this->point_usable;
	}
}
?>


