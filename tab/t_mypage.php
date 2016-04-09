<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php 
    $user_id = @$_GET['user'];
    if ($user_id) {
    	echo "<script>var G_user_id = '" . $user_id . "';</script>";
    }
?>
<?php include_once("t_html_head.php"); ?>
<?php include_once("t_myinfo.php"); ?>
<div id="order_history_container">
	<div class="title_bar radius_top">
		<span>Order History</span>
	</div>
	<div class="radius_bottom">
		<div class="table_head hg_container">
			<div class="hg_center hg_column">Orders</div>
			<div class="hg_left hg_column">Date</div>
			<div class="hg_right hg_column">
				<span class="price">Price</span>
				<span class="status">Point</span>
			</div>
		</div>
		<div class="table_body">
			<div id="order_history_sheet" class="table_rows hg_container">
				<div class="hg_center hg_column">
					<div id="order_detail">
						<span class="num_order">1</span>
						<span class="order_name">Test Chicken Teriyaki</span>
						<span class="option_name">Brown Rice, Extra chicken, Brown Rice, Extra  </span>
					</div>
				</div>
				<div class="hg_left hg_column">
					<span class="order_date">03-31-2012</span>
					<input type="hidden" id="order_id">
				</div>
				<div class="hg_right hg_column">
					<span class="price">$45.06</span>
					<span class="point"></span>
				</div>
			</div>
		</div>
		<div class="table_bottom"></div>
	</div>
</div>
<?php include_once("t_html_footer.php"); ?>