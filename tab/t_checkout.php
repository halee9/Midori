<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
	include_once("t_html_head.php");
?>
<div id="closed_container">
	<div class="group_name radius_top">Sorry, We are closed at this time.</div>
	<div id="closed_body" class="radius_bottom">
		We open Monday to Friday from 10:30 AM to 08:00 PM.<br>
		We take last order via online until 7:30 PM. Thank you.
	</div>
</div>
<div id="order_container">
	<div class="group_name radius_top">Your Orders are ...</div>
	<div id="order_body" class="radius_bottom">
	</div>
</div>
<div id='checkout_container'>
	<div class='group_name radius_top'>Checking Out</div>
	<div class="radius_bottom">
		<div class="small_container">
			<div>1. Would you like to …?</div>
			<ul id="order_type" class='content'>
				<li>
					<input type='radio' id="pick_up" name='order_type' value='P' checked /><label for="pick_up">PICK UP at the restaurant.</label>
					<div class="case_pickup sub_msg">
					</div>
				</li>
				<li>
					<input type='radio' id="dine_in" name='order_type' value='H' /><label for="dine_in">DINE IN the restaurant.</label>
					<div class="case_dinein sub_msg">
						<span>We never start to cook to your orders until you arrive in the restaurant.</span>
					</div>
				</li>
				<!--<li><input type='radio' name='order_type' value='D' disabled /><span>Delivery</span></li>-->
			</ul>
		</div>
		<div class="small_container">
			<div>2. Notification when my orders are taken by cashier or ready to pick up.</div>
			<ul class='content'>
				<li>
					<input type='checkbox' id="text_me" name='text_me' value='Y' checked />
					<label for="text_me">TEXT me.</label>
				</li>
				<li>
					<input type='checkbox' id="email_me" name='text_me' value='Y'>
					<label for="email_me">EMAIL me.</label>
				</li>
			</ul>
		</div>
		<div class="small_container">
			<span class="case_pickup">3. What time would you like to pick up?</span>
			<span class="case_dinein">3. What time would you like to be in the restaurant?</span>
			<span id='desired_time_select'></span>
		</div>
		<!--
		<div class="small_container">
			<div>4. How would you like to pay for your orders? You have <span id="point"></span> points.</div>
			<ul id="payment_type" class='content'>
				<li><input type='radio' id="pay_store" name='payment_type' value='S' checked /><label for="pay_store">Pay at the store.</label></li>
				<li><input type='radio' id="pay_point" name='payment_type' value='P'><label for="pay_point">Pay with my reward points.</label></li>
			</ul>
		</div>
		-->
		<div class="small_container">
			<div>4. Would you like to set this order to the usual?</div>
			<ul id="usual_type" class='content'>
				<li><input type='radio' id="usual_y" name='usual_type' value='Y' /><label for="usual_y">Yes.</label></li>
				<li><input type='radio' id="usual_n" name='usual_type' value='N' checked /><label for="usual_n">No.</label></li>
			</ul>
		</div>
		<div class='button_container'>
			<button id='place_order' class='emphasis'>Place Order</button>
			<button id='back_to_order'>Back to Order</button>
		</div>
	</div>
</div>
<?php include_once("t_myinfo.php"); ?>
<div id="mask"></div>
<div id="order_complete" class="popup_container">
	<div class="popup_message">
		<p>Thank you for your order!!</p>
		<P>Once we receive your order, we will send you a confirmation text or email</P>
		<p>Or if notification option was not selected, You can check your order status.</p>
	</div>
	<div class="button_container">
		<button id="goto_mypage">My order status</button>
		<button id="goto_logout">Logout</button>
	</div>
</div>

<?php include_once("t_html_footer.php"); ?>

