<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php include 'm_header.php' ?>
<div id='checkout_container'>
	<div class="small_container">
		<div class="group_name">1. Would you like to …?</div>
		<ul id="pickup_type" class='content'>
			<li>
				<input type='radio' id="order_type" name='order_type' value='P' checked /><span>PICK UP at the restaurant.</span>
				<div class="case_pickup sub_msg">
					<input type="checkbox" id="text_me" name="text_me" value="Y" checked />
					TEXT me when my orders are ready to pick up.
				</div>
			</li>
			<li>
				<input type='radio' id="order_type" name='order_type' value='H' /><span>DINE IN the restaurant.</span>
				<div class="case_dinein sub_msg"><span>We never start to cook to your orders until you arrive in the restaurant.</span></div>
			</li>
			<!--<li><input type='radio' name='order_type' value='D' disabled /><span>Delivery</span></li>-->
		</ul>
	</div>
	<div class="group_name">
		<span class="case_pickup">2. What time would you like to pick up?</span>
		<span class="case_dinein">2. What time would you like to be in the restaurant?</span>
		<span id='desired_time_select'></span>
	</div>
	<div class="small_container">
		<div class="group_name">3. How would you like to pay for your orders?</div>
		<ul class='content'>
			<!--<li>Your Total Payment : <span id='total_payment'></span></li>-->
			<li><input type='radio' id="payment_type" name='payment_type' value='S' checked /><span>Pay at the store.</span></li>
			<li><input type='radio' id="payment_type" name='payment_type' value='P'><span>Pay with my reward points.</span></li>
		</ul>
	</div>
	<div class='button_container'>
		<button id='place_order' class='emphasis'>Place Order</button>
		<button id='back_to_order'>Back to Order</button>
	</div>
</div>

<?php include 'm_footer.php' ?>
