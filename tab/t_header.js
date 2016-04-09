function create_header(store_name, order_view, action){
	
    if (Timeout == true) {
	    delete_all_order_cookies();
    	set_message("Your session is over..", "../");
    }
    
    if (G_store.forced_closed == "Y") {
	    set_message("Our online ordering system is closed now.");
    }
    if (ss_userid) {
    	//$("#header #header_user").html("Hi, "+ss_username).show();
    	$("#header #sign_in_button").hide();
    	$("#header #sign_out_button").show();
    	$("#header #sign_out_button").click(function(){
    		logging_out();
    	});
    }
    else {
	    $("#header #sign_out_button").hide();
	    $("#header #sign_in_button").show();
    }
    
    $('#header #sign_in_button').click(function(){
        //location.href = "t_signin.php?hr=" + G_PGM + ".php&v="+ts;
        redirect("t_signin.php?hr=" + G_PGM + ".php");
    });
    
    $('#header #header_logo').click(function(){
        //location.href = "t_store.php?v="+ts;
        redirect("t_store.php");
    });
    $('#header #header_title').click(function(){
        redirect("t_store.php");
    });
    
	if (G_PGM == "t_signin" || G_PGM == "t_order_status" || G_PGM == "t_forgot_password") {
		$("#right_container").remove();
		$("#left_container").css("width","100%");
		$('#order_total_top').hide();
		return;
	}
	else {
		$("#right_container").css("width","246px");
	}
    
    //get_open_now();
    
    $('#checkout').click(function(e){
        //location.href = "t_checkout.php?v="+ts;
        redirect("t_checkout.php");
        e.stopPropagation();
    });
    $('#checkout_in_cart').click(function(){
        //location.href = "t_checkout.php?v="+ts;
        redirect("t_checkout.php");
    });
       
    $('#order_total_top').mouseenter(function(){
        //alert("enter");
        $('#orderlist').slideDown('slow');
    });
    $('#order_total_top').click(function(){
        //alert("enter");
        $('#orderlist').slideDown('slow');
    });
    /*
    $("#order_total_top").bind("touchdown", function () {
        $('#header #orderlist').slideDown('slow');
    });
    */
    
    $("#order_total_top").hide();
    var total = get_order_total();
    //alert(total.count);
    if (total.count > 0) {
        $("#order_total_top").show();
        create_cart_view();
        //$('#header #orderlist').slideDown('slow');
    }
    else {
    	$("#checkout_in_cart").hide();
    	//set_usual_cookie();
    }
    
    $(window).scroll(function(){
        $('#orderlist').hide();
    });
    $("#close_cart").click(function(){
        $('#orderlist').hide();
    });
    
	if (G_store.open_status == "N") {
    	$("#under_order_cart").show();
    	$("span#checkout").css("visibility","hidden");
    	$("button#checkout_in_cart").hide();
	}
	else $("#under_order_cart").hide();
    
    
    
    
}
