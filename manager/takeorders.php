<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php include 'manager_header.php' ?>

<div id='main_container'>
	<div id="head_line" class="radius_top">
		<span><input type="checkbox" id="show_all"><label for="show_all">Show All </label></span>
		<span><input type="checkbox" id="auto_taken" checked="checked"><label for="auto_taken">Auto Taken</label></span>
		<div class="right_corner">
			<span class='order_count'></span>
			<span>&nbsp;orders, Refreshed at&nbsp;</span>
			<span class='refresh_time'></span>
		</div>
	</div>
	<!--
	<div id='order_header' style='clear:both'>
		<span class="right_corner">Customer</span>
		<span style='width:50px;'>No</span>
		<span style='width:100px;'>Orders</span>
    </div>
    -->
	<div id='order_list'>
	</div>
	<div class="radius_bottom"></div>
	<!--<embed src="SomeoneLikeYou.wav" autostart="false" width="0" height="0" id="sound1" enablejavascript="true">-->
</div>
<center><audio id="beep" loop="loop" controls>
  <source src="beep-1.mp3" type="audio/mpeg">
</audio>
</center>
</body>
</html>