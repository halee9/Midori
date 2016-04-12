<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
    $id = @$_GET['id'];
    if (!$id) $id = 1;
    $action = @$_GET['action'];
    $order_no = @$_GET['order_no'];
    echo "<script>var G_menu_id = '" . $id . "'; var G_action = '" . $action . "'; var G_order_no = '" . $order_no . "';</script>";

	include_once("t_html_head.php");
?>
<div id='menu_container'>
	<div class='menu_header radius_top'>
		<span class='menu_name'></span>
		<span class='menu_price'></span>
	</div>
	<div class="radius_bottom">
		<div class="menu_basic">
			<div class='menu_body'>
				<div class='menu_photo'></div>
				<div class='menu_description'></div>
			</div>
			<div class='order_summary'>
				<div class='select_container'>
					<div id="combo_name"></div>
					<span>Quantity: </span>
					<span class='qty_selector'></span>
					<span>&nbsp;X&nbsp;</span>
					<span id='unit_price'></span>
					<div id='option_display'></div>
				</div>
				<hr style='margin: 5px 10px;'>
				<div class='price_container'>
					<div><span>Subtotal: </span><span id='subtotal'></span></div>
					<div><span>Tax: </span><span id='tax'></span></div>
					<hr>
					<div><span style='color: #660000;'>Total: </span><span id='total'></span></div>
				</div>
				<div class='button_container'>
					<button id='back_to_menu' style='width:150px'>Back to Menu</button>
					<button id='add_order' style='width:150px' class='emphasis'>Buy This</button>
				</div>
			</div>
		</div>
		<div id='option_container'>
			<div id="option_button" class="tiny_button">Click here for more options<br>on this menu.</div>
			<table id='option_table' border='0'>
				<tr><th width='170px'>Type</th><th>Choose the Options</th></tr>
				<tr id="side_menu">
					<td class='left_title'>Rice / Salad</td>
					<td class='option_elements'>
						<!--
						<div class='both'><input type='radio' name='side_name' id='side1' value=0><label for='side1'>Rice and Salad</label></div>
						<div class='both'><input type='radio' name='side_name' id='side2' value=0><label for='side2'>No Salad, More Rice</label></div>
						<div class='both'><input type='radio' name='side_name' id='side3' value=0><label for='side3'>No Rice, More Salad</label></div>
						-->
						<div class='rice'><input type='radio' name='side_name' id='side4' value=0><label for='side4'>Rice</label></div>
						<div class='rice'><input type='radio' name='side_name' id='side5' value=0><label for='side5'>No Rice</label></div>
						<!--
						<div class='rice'><span><input type='radio' name='side_name' id='side6' value=0><label for='side6'>No Rice, More Veggie</label></div>-->
					</td>
				</tr>
				<tr id="rice_type">
					<td class='left_title'>Type of Rice</td>
					<td class='option_elements'>
						<div><input type='radio' name='rice_type' id='rice1' value=0><label for='rice1'>White Rice</label></div>
						<div><input type='radio' name='rice_type' id='rice2' value='0.50'><label for='rice2'>Brown Rice</label></div>
					</td>
				</tr>
				<tr id="make_spicy">
					<td class='left_title'>Make it Spicy</td>
					<td class='option_elements'>
						<div><input type='radio' name='make_spicy' id='spicy_n' value=0><label for='spicy_n'>No Spicy</label></div>
						<div><input type='radio' name='make_spicy' id='spicy_y' value=0><label for='spicy_y'>Spicy</label></div>
					</td>
				</tr>
				<!--
				<tr id="how_spicy">
					<td class='left_title'>How Spicy</td>
					<td class='option_elements'>
						<div><span><input type='radio' name='how_spicy' id='mild' value=0><label for='mild'>Mild Spicy</label></div>
						<div><span><input type='radio' name='how_spicy' id='regular' value=0><label for='regular'>Regular Spicy</label></div>
						<div><span><input type='radio' name='how_spicy' id='extra' value=0><label for='extra'>Extra Spicy</label></div>
					</td>
				</tr>
				-->
				<tr id="substitute">
					<td class='left_title'>Substitute with</td>
					<td class='option_elements'>
						<div><input type='checkbox' name='white_meat' id='white_meat' value='1.00'><label for='white_meat'>Chicken Breast</label>
						</div>
					</td>
				</tr>
				<tr id="extra_order">
					<td class='left_title'>Extra Meat</td>
					<td class='option_elements'>
						<div class='extra_yes'><input type='checkbox' name='extra_meat' id='extra_meat'><label for='extra_meat'></label></div>
						<div class='extra_no'>Not Applicable</div>
					</td>
				</tr>
    			<tr id='special_area'>
    				<td class='left_title'>Special Instructions</td>
            		<td class='option_elements'>
            			<input id='special_instruction' name='special_instruction' type='text' style='width: 100%; font-size:16px;' value='Write Your Special Instructions…'>
           				<span style='font-size:12px; text-align:left;font-weight:normal'>Specify any ingredients you don’t want in it<br>Additional substitutions may have additional charges</span>
            		</td>
            	</tr>
			</table>
		</div>
	</div>
</div>
<?php include_once("t_html_footer.php"); ?>
<!-- carousel test
<div id='main_container'>
	<div id="wrapper">
	  <div id="scroller">
		<ul>
		  <li><div id='left_page'></div></li>
		  <li><div id='center_page'></div></li>
		  <li><div id='right_page'></div></li>
		</ul>
	  </div>
	</div>
	<div id="indicator">
	  <ul>
		<li><span>1</span></li>
		<li><span>2</span></li>
		<li><span>3</span></li>
	  </ul>
	</div>
</div>
-->
