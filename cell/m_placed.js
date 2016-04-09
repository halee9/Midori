function init() {
    $(document).ready(function() {
		create_header(G_store.name, "Order Placed", 'H', 'B');
        $("#goto_mypage").click(function(){
        	location.replace('mmypage.php');
        });
        $("#goto_logout").click(function(){
        	logging_out("cell");
        });
    });
}

window.onload = init;
