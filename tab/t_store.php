<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php include_once("t_html_head.php"); ?>


<div id="customer_message" class="radius_bottom top_container">
	<div class="welcome_container">
		<div>Welcome, Customer!<br>
			Every regular meal ordered online,
			comes with soda or water bottle! <br>
		</div>
	</div>
	<!--
	<div class="special_box">
		<div class="special_box_title radius_top_5px" style="color: Blue"></div>
		<div class="special_box_body radius_bottom_5px">
		</div>
	</div>
	<!--<p>We will never give your contact information to third parties.</p>-->
</div>
<div id="user_profile" class="radius_bottom top_container">
	<div id="user_welcome" class="welcome_container">
		<div>Welcome,&nbsp;<span id="user_name">John</span>!<br>Click&nbsp;
			<a href="#" id="my_page_button">here</a>
			&nbsp;to see your infomation and order history. <br>
			Every regular meal ordered online,
			comes with soda or water bottle! <br>
		</div>
	</div>
	<div id="the_usual" class="special_box">
		<div id="usual_title" class="special_box_title radius_top_5px">Usual Order</div>
		<div id="usual_body" class="special_box_body radius_bottom_5px">
			<div id="usual_order_no">You have NO usual orders.</div>
			<div id="usual_order">
				<div id="usual_order_item">
					<span class="count"></span>
					<span class="name"></span>
					<span class="option"></span>
				</div>
			</div>
			<button id="usual_button">I'll have the usual.</button>
		</div>
	</div>
</div>
<div id="menu_group">
	<div id="menugroup_container" class="menugroup_container">
		<div class="menugroup_head radius_top">
			<span class="menugroup_name"></span>
		</div>
		<div class="radius_bottom">
			<table class="menu_table"></table>
		</div>
	</div>
</div>
<table style="display: none">
	<tr id="menu_row">
		<td class="menu_left">
			<div class="menu_container">
				<div class="menu_header">
					<input type="hidden" class="hidden_id">
					<span class="menu_name"></span>
					<span class="get_button buy_it">BUY</span>
					<span class="menu_price"></span>
				</div>
				<div class="menu_body">
					<div class="menu_photo"></div>
					<div class="menu_description"></div>
				</div>
			</div>
		</td>
		<td class="menu_right">
			<div class="menu_container">
				<div class="menu_header">
					<input type="hidden" class="hidden_id">
					<span class="menu_name"></span>
					<span class="get_button buy_it">BUY</span>
					<span class="menu_price"></span>
				</div>
				<div class="menu_body">
					<div class="menu_photo"></div>
					<div class="menu_description"></div>
				</div>
			</div>
		</td>
	</tr>
</table>

<?php include_once("t_html_footer.php"); ?>

