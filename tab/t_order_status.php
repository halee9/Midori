<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
$order_id = @$_GET['order_id'];
if ($order_id) {
	echo "<script>var G_order_id = ".$order_id.";</script>";
}
else {
	header( 'Location: t_store.php' ) ;
}
include_once("t_html_head.php");
?>
<div id="order_information">
	<div class="title_bar radius_top">
		<span>My Orders Information</span>
	</div>
	<div class="radius_bottom">
		<div id="order_table">
			<table id="order_list" cellspacing="0" cellpadding="0">
				<thead>
					<tr><th>Orders</th><th class='qty'>Qty</th><th class='price'>Price</th></tr>
				</thead>
				<tbody></tbody>
			</table>
			<table id="order_summary">
				<tr><td>Subtotal:</td><td id='subtotal'></td></tr>
				<tr><td>Tax:</td><td id='tax'></td></tr>
				<tr><td>Total:</td><td id='total'></td></tr>
			</table>
		</div>
		<div id="order_detail">
			<table id="detail_table">
				<tr><td class="detail_name">Date of Orders : </td><td id="order_date"></td></tr>
				<tr><td class="detail_name">Pick-up / Here : </td><td id="order_type"></td></tr>
				<tr><td class="detail_name">Desired Time : </td><td id="cust_pickup_time"></td></tr>
				<tr><td class="detail_name">Payment : </td><td id="payment_type"></td></tr>
				<tr><td class="detail_name">Set as Usual : </td><td id="usual"></td></tr>
				<tr><td class="detail_name">Texting Me : </td><td id="text_me"></td></tr>
				<tr><td class="detail_name">Emailing Me : </td><td id="email_me"></td></tr>
				<tr><td class="detail_name">Point you earned : </td><td id="point"></td></tr>
				<tr><td class="detail_name">Customer Name : </td><td id="cust_name"></td></tr>
				<tr><td class="detail_name">Customer Phone : </td><td id="cust_phone"></td></tr>
				<tr><td class="detail_name">Customer Carrier : </td><td id="cust_carrier"></td></tr>
				<tr><td class="detail_name">Customer Email : </td><td id="cust_email"></td></tr>
			</table>
		</div>
	</div>
</div>
<div id="order_status">
	<div class="title_bar radius_top">
		<span>ORDER STATUS</span>
	</div>
	<div class="radius_bottom">
		<div id="status_head">
			<div>Your orders are NOW</div>
			<div id="status">PLACED</div>
		</div>
		<div id="status_progress">
			<div id="st_p"><span class="status_box">PLACED</span><span class="status_time"></span></div>
			<div class="middle_line">|</div>
			<div id="st_t"><span class="status_box">TAKEN</span><span class="status_time"></span></div>
			<div class="middle_line">|</div>
			<div id="st_r"><span class="status_box">READY</span><span class="status_time"></span></div>
			<div class="middle_line">|</div>
			<div id="st_d"><span class="status_box">DONE</span><span class="status_time"></span></div>
			<div id="status_progress_msg">This information will be updated <br>every 30 seconds.</div>
		</div>
	</div>
</div>

<?php include_once("t_html_footer.php"); ?>















