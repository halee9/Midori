function create_checkout(){

    $(".case_dinein").hide();
    $(".order_del").hide();
    $("#checkout_in_cart").hide();
    $(".order_qty select").hide();
    $(".order_qty .just_display").show();
    //$("span#checkout").css("visibility","hidden");
    $("#order_cart_main .button_container").hide();



    //$('#pickup_interval_time').html(G_store.pickup_interval_time);
    var html = get_desired_select_time(G_store.pickup_interval_time, 10, 15);
    $('#desired_time_select').html(html);

    $("#order_type input").change(function(){
    	if ($("#order_type #pick_up").attr("checked") == true) {
    		$(".case_dinein").hide();
    		$(".case_pickup").show();
    		//$("input[name='text_me']").attr("checked","checked");
    	}
    	else {
    		$(".case_pickup").hide();
    		$(".case_dinein").show();
    	}
    })


    if (get_order_total().amount == 0) {
    	$("#place_order").attr("disabled","disabled").css({ opacity: 0.5 }).css("cursor","default");
    }

    $("#point").html(ss_point_usable);
    if (ss_point_usable < (get_order_total().amount*100)) {
     	$("#pay_point").attr("disabled",true);
    }
    else {
	    $("#pay_point").attr("disabled",false);
    }

    //if (user.)

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

        p_order.order_type = $("#order_type input:checked").val();
        /*
        if ($("#pick_up").is(":checked")) {
        	p_order.order_type = $("#pick_up").val();
        }
        else if ($("#dine_in").is(":checked")) {
        	p_order.order_type = $("#dine_in").val();
        }
        else {
        	p_order.order_type = $("#pick_up").val();
        }
        */
        // ***** deleted 4/3/2016
        //p_order.payment_type = $("#payment_type input:checked").val();
        p_order.payment_type = 'S';

        /*
        if ($("#pay_store").is(":checked")) {
        	p_order.payment_type = $("#pay_store").val();
        }
        else if ($("#pay_point").is(":checked")) {
        	p_order.payment_type = $("#pay_point").val();
        }
        else {
        	p_order.payment_type = $("#pay_store").val();
        }
        */

        p_order.usual = $("#usual_type input:checked").val();
        /*
        if ($("#usual_y").is(":checked")) {
        	p_order.usual = $("#usual_y").val();
        }
        else if ($("#usual_n").is(":checked")) {
        	p_order.usual = $("#usual_n").val();
        }
        else {
        	p_order.usual = $("#usual_n").val();
        }
        */

        if ($("#text_me").is(":checked")){
            p_order.text_me = "Y";
        }
        else p_order.text_me = 'N';
        if ($("#email_me").is(":checked")){
            p_order.email_me = "Y";
        }
        else p_order.email_me = 'N';
        p_order.from_where = 'T';

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
                    //setFireOnline(p_order);
                    delete_all_order_cookies();
                    $("#mask").appendTo("body");
                    $(".popup_container").appendTo("body");
                    popupOpen("#order_complete");
                    //location.replace('t_mypage.php');

                    $("#goto_mypage").click(function(){
                    	//location.replace('t_order_status.php?order_id='+ order_id);
                    	redirect('t_order_status.php?order_id='+ order_id,"rep");
                    });
                    $("#goto_logout").click(function(){
                    	logging_out();
                    });
                }
            }
        });
        return false;

    });

}

function reverse_left_to_right() {
	//alert("reverse");
	$("#left_container").css("float","right");
	$("#right_container").css("float","right");
}

function create_order() {
	$("#order_cart_main").appendTo("#order_body").css("width","100%");
	$("#order_cart_main div").removeClass("radius_top").removeClass("radius_bottom").removeClass("body_line");
	$("#right_container").remove();
	$("#order_total_top").hide();
}

function check_store_open(open) {
	if (open == "N") {
		$("#closed_container").show();
		$("#checkout_container").hide();
		//$('#place_order').attr("disabled","true");

	}
	else {
		$("#closed_container").hide();
		$("#checkout_container").show();
	}
}

function init() {
    $(document).ready(function() {
    	//reverse_left_to_right();
    	$("#checkout_container").hide();
        document.title = G_store.name;
        create_header(G_store.name, "Y");
        create_order();

        check_store_open(G_store.open_status);

		create_checkout();

        get_user_info(ss_userid);
        $("#main_container").show();

		check_sidebar();
        $(window).resize(function() {
            check_sidebar();
        });
    });
}

window.onload = init;

