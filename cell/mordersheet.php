<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
    $order_id = @$_GET['order'];
    echo "<script>var G_order_id = " . $order_id . ";</script>";
?>
<?php include 'm_header.php' ?>
<?php include 'm_footer.php' ?>
