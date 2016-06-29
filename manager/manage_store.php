<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php include 'manager_header.php' ?>

<div id='main_container'>
	<div class="group_name radius_top">Store Open Hours</div>
	<div class="group_body radius_bottom">
		<div id="forsed_closed">
			<span>Forced : </span>
			<span><input type="radio" id="scheduled" name='open_hour' value="S"><label for="scheduled">Scheduled</laber></span>
			<span><input type="radio" id="forsed_open" name='open_hour' value="N"><label for="forsed_open">Open</laber></span>
			<span><input type="radio" id="forsed_close" name='open_hour' value="Y"><label for="forsed_close">Close</laber></span>
		</div>
		<div><button id="open_hour_submit">Update</button></div>
		<div id="forsed_closed_msg"></div>
	</div>
	<div class="group_name radius_top">Cashier Information</div>
	<div class="group_body radius_bottom">
		<div>
			<span>Cashier: </span>
			<span><select id="cashiers_name"></select></span>
			<span id="cashier_phone"></span>
		</div>
		<div>
			<span><input type="checkbox" id="get_text" checked><label for="get_text">Texting me when orders are placed.</label></span>
		</div>
		<div><button id="cashier_submit">Update</button></div>
		<div id="cashier_msg"></div>
	</div>
	<div class="group_name radius_top">Active Menu</div>
	<div class="group_body radius_bottom">
		<div id="specials">
		</div>
		<div><button id="special_submit">Update</button></div>
		<div id="special_updated_msg"></div>
	</div>
</div>

</body>
</html>
