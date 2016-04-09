function create_checkout(cart){

    $(".case_dinein").hide();

    var html = get_desired_select_time(G_store.pickup_interval_time, 10, 15);
    $('#desired_time_select').html(html);
    
    $("input[name='order_type']").change(function(){
    	if ($("input[name='order_type']:checked").val() == "P") {
    		$(".case_dinein").hide();
    		$(".case_pickup").show();
    		//$("input[name='text_me']").attr("checked","checked");
    	}
    	else {
    		$(".case_pickup").hide();
    		$(".case_dinein").show();
    		$("input[name='text_me']").attr("checked","");
    	}
    })
    
    
    if (get_order_total().amount == 0) {
    	$("#place_order").attr("disabled","disabled").css({ opacity: 0.5 }).css("cursor","default");
    }
    
    $("#payment_type[value='P']").attr("disabled","disabled");

    $('#back_to_order').click(function(){
        history.go(-1);
    });
    
    $('#place_order').click(function(){
        $('#place_order').attr("disabled","true");

        var p_order = {};

        p_order.store = G_store.id;
        p_order.userid = ss_userid;
        p_order.username = ss_username;
        p_order.userphone = ss_userphone;
        p_order.useremail = ss_useremail;

        p_order.items = get_cookie_orders();
        var sum = recalc_cookie_orders_total();
        p_order.subtotal = sum.subtotal;
        p_order.tax = sum.tax;
        p_order.total = sum.total;
        
        p_order.pickup_time = $('#select_pickup_time option:selected').text();
        //p_order.order_type = G_type;
        if ($("#order_type").is(":checked")) {
        	p_order.order_type = $("#order_type:checked").val();
        }
        if ($("#text_me").is(":checked")){
            p_order.text_me = "Y";
        }
        else p_order.text_me = 'N';
        /*
        if ($('#email_me:checked').val()){
            p_order.email_me = $('#email_me:checked').val();
        }
        else p_order.email_me = 'N';
        */
        p_order.email_me = 'Y';
    
        var postData = encodeURIComponent(JSON.stringify(p_order));
	    
        $.ajax({
            type: "POST",
            url: "../common/Orders.php",
            data: "action=placeorder&order=" + postData,
            //dataType: "json",
            success: function(res){
                eval(res);
                if (code != 1) {
                    alert("There are problems in our database. Try agin later. Sorry.");
                }
                else {
                    //alert("Thank you for ordering. ");
                    delete_all_order_cookies();
                    location.replace('m_placed.php');
                    //location.replace('mstore.php');
               }
            }
        });
        return false;
    
    });
    
}

function init() {
    $(document).ready(function() {
        create_header(G_store.name, "Checkout", 'H', 'B');
        var cart_items = get_cookie_orders();
        create_checkout(cart_items);
    });
}

window.onload = init;
