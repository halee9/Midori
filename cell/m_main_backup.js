window.addEventListener("load",function(){ 
    setTimeout(scrollTo,0,0,1); 
},false); 

var hash = location.hash;
setInterval(function(){
    if (location.hash != hash)    {
        //alert("Changed from " + hash + " to " + location.hash);
        $(hash).removeClass("current").hide();
        hash = location.hash;
        $(location.hash).css("top","0px").addClass("current").show();
        /*
		$(location.hash).css("left","-100%").css("top","0px").addClass("current").show();
		$(hash).addClass("animatedScreen");
		$(location.hash).addClass("animatedScreen");
		setTimeout(
			function(){
				$(hash).css("left","100%");
				$(location.hash).css("left","0%");
			},0
		);
		setTimeout(
			function(){
				$(hash).hide();
			},300
		);
        hash = location.hash;
        */
   }
}, 100);


var TouchMove = false;

var isIOS = ((/iphone|ipad/gi).test(navigator.appVersion));
//var myUp = isIOS ? "touchend" : "mouseup";
var myUp = isIOS ? "touchend" : "click";


var Page = {
    'H' : { name : 'Home' , id : 'home_button' , link : 'mstore.php' } ,
    'I' : { name : 'Info' , id : 'info_button' , link : 'mstoreinfo.php' } ,
    'C' : { name : 'Cart' , id : 'cart_button' , link : 'mcart.php' } ,
    'SI' : { name : 'Sign In' , id : 'signin_button' , link : 'msignin.php' } ,
    'SO' : { name : 'Sign Out' , id : 'signout_button' , link : 'msignin.php' } ,
    'MP' : { name : 'My Page' , id : 'mypage_button' , link : 'mmypage.php' } ,
    'B' : { name : 'Back' , id : 'back_button' , link : 'mmypage.php' }
}
//var First_page_id = 'top_menu_container';
//var First_page_id = "menu_group_container";
var Div_stack = [];
var G_href = "menu_group_container";
var G_menu_id = "";

var Header_Info = {
	/*
	'top_menu_container' : {
		title : 'Teriyaki Online',
		left : 'N', right : 'N'
	},
	*/
	'menu_group_container' : {
		title : 'Teriyaki Online',
		left : 'N', right : 'C'
	},
	'menu_list_container' : {
		title : 'Teriyaki Online',
		left : 'B', right : 'C'
	},
	'menu_item_container' : {
		title : 'Menu',
		left : 'B', right : 'C'
	},
	'cart_container' : {
		title : 'Your Orders',
		left : 'B', right : 'C'
	},
	'signin_container' : {
		title : 'Sign In',
		left : 'B', right : 'C'
	},
	'signup_container' : {
		title : 'Sign Up',
		left : 'B', right : 'C'
	},
	'checkout_container' : {
		title : 'Checking Out',
		left : 'B', right : 'I'
	},
	'my_page_container' : {
		title : 'My Page',
		left : 'B', right : 'C'
	},
	'order_complete' : {
		title : 'Orders Placed',
		left : 'H', right : 'I'
	},
	'order_sheet_container' : {
		title : 'Order Sheet',
		left : 'B', right : 'I'
	},
	'store_info_container' : {
		title : 'Store Info.',
		left : 'B', right : 'C'
	}
}

function BlockMove(event) {
  // Tell Safari not to move the window.
  event.preventDefault() ;
}

function set_header_menu(container_id) {
	if (!$("#"+container_id+" #user_container").length) {
		$('#user_container').clone().prependTo('#'+container_id);
	}
	if (!$("#"+container_id+" #header").length) {
		$('#header').clone().prependTo('#'+container_id);
	}
	if (!$("#"+container_id+" #footer").length) {
		$('#footer').clone().appendTo('#'+container_id);
	}

	var x = Header_Info[container_id];
	$("#"+container_id+" #header .center").html(x.title);
	
    if (x.left) {
        if (x.left == "N") {
        	$('#'+container_id+' #header .left_button').css("visibility", "hidden");
        }
        else {
        	var p = Page[x.left];
	        $('#'+container_id+' #header .left_button').html(p.name);
	        $('#'+container_id+' #header .left_button').attr('id',p.id);
	        $('#'+container_id+' #header .left_button').css("visibility", "visible");
	    }
    }
    if (x.right) {
        if (x.right == "N") {
        	$('#'+container_id+' #header .right_button').css("visibility", "hidden");
        }
        else {
        	var p = Page[x.right];
	        $('#'+container_id+' #header .right_button').html(p.name);
	        $('#'+container_id+' #header .right_button').attr('id',p.id);
	        $('#'+container_id+' #header .right_button').css("visibility", "visible");
	    }
    }
    
    if ($('#'+container_id+' #header .right_button').attr('id') == 'cart_button') {
        var order_total = recalc_cookie_orders_total().total;
        if (order_total > 0) {
        	$('#'+container_id+' #header .right_button').html("$"+order_total.toFixed(2));
        }
        else {
        	$('#'+container_id+' #header .right_button').css("visibility", "hidden");
        }
    }
    
    if (ss_username) {
    	$("#"+container_id+" #user_name").html(ss_username);
    	//$("#user_container").show();
    	$("#"+container_id+" #user_container").show();
    	$("#"+container_id+" #signin_button").hide();
    	$("#"+container_id+" #signout_button").show();
    	$("#"+container_id+" #mypage_button").show();
    	$("#"+container_id+" #info_button").show();
    }
    else {
    	$("#"+container_id+" #signin_button").show();
    	$("#"+container_id+" #info_button").show();
    }
    $("#"+container_id+" #header").show();
    $("#"+container_id+" #footer").show();

}

function select_usual() {
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=select_usual&user=" + ss_userid,
        dataType: "json",
        success: function(json){
        	if (json) {
        		delete_all_order_cookies();
	        	for (var j in json.items) {
	        		reset_order_cookie(json.items[j]);
	        	}
	        	create_cart_orders();
	        	hiding_and_show($("#cart_container"));
	        }
        }
    });
	
}
/*
function top_menu() {
	$("#usual").bind(myUp, function(){
		if (TouchMove == true) return;
		if (ss_userid) {
			select_usual();
		}
		else {
			G_href = "cart_container";
			user_check_in();
		}
	});
	$("#show_menu").bind(myUp, function(){
		if (TouchMove == true) return;
		hiding_and_show($("#menu_group_container"));
	});
	hiding_and_show($("#top_menu_container"));
	$("#top_menu_container").show();
	create_group_list();
}
*/

function set_header_and_footer(container_id) {
	if (!$("#"+container_id+" #user_container").length) {
		$('#user_container').clone().prependTo('#'+container_id);
	}
	if (!$("#"+container_id+" #header").length) {
		$('#header').clone().prependTo('#'+container_id);
	}
	if (!$("#"+container_id+" #footer").length) {
		$('#footer').clone().appendTo('#'+container_id);
	}
    var order_total = recalc_cookie_orders_total().total;
    if (order_total > 0) {
    	$('#'+container_id+' #header .right #cart_button').html("$"+order_total.toFixed(2));
    }
    else {
    	$('#'+container_id+' #header .right #cart_button').css("visibility", "hidden");
    }
    if (ss_username) {
    	$("#"+container_id+" #user_name").html(ss_username);
    	//$("#user_container").show();
    	$("#"+container_id+" #user_container").show();
    	$("#"+container_id+" #signin_button").hide();
    	$("#"+container_id+" #signout_button").show();
    	$("#"+container_id+" #mypage_button").show();
    	$("#"+container_id+" #info_button").show();
    }
    else {
    	$("#"+container_id+" #signin_button").show();
    	$("#"+container_id+" #info_button").show();
    }
    if (container_id == "menu_group_container") $('#'+container_id+' #header #back_button').css("visibility", "hidden");
    $("#"+container_id+" #header").show();
    $("#"+container_id+" #footer").show();
	//alert($('#menu_group_container').html());
}

function create_group_list(){
	var $main = $('#menu_group_container');
    var html = "<div class='group_big_container'>";
        
    for (var k in G_menugroup) {
    	//alert(G_menugroup[k].pic);
    	var path = "../common/menusmall/" + G_menugroup[k].pic.replace("t1_","");
		var photo = "<img src='../common/" + path + "'>";
		var back_image = "background-image:url(\""+path+"\")";
    	html += "<div class='menugroup_container'>"
    		 	+ "<div class='menugroup'><a href='#menu_list_container'>"
    		 		+ "<input type='hidden' class='hidden_id' value=" + G_menugroup[k].id + ">"
    		 		//+ "<div class='menugroup_pic radius_top'>" + photo + "</div>"
    		 		+ "<div class='menugroup_pic radius_top' style='" + back_image + "'></div>"
    		 		+ "<div class='menugroup_name radius_bottom'>" + G_menugroup[k].name + "</div>"
    		 	+ "</a></div>"
    		 + "</div>";
    		 
    }
    html += "</div>";
    $main.html(html);
    
    var html = "<div class='button_container'><button id='usual' class='main'>I'll have the usual.</button></div>";
    $main.append(html);
    
	set_header_and_footer($main.attr("id"));
	
	$("#usual").bind(myUp, function(){
		if (TouchMove == true) return;
		if (ss_userid) {
			select_usual();
		}
		else {
			G_href = "cart_container";
			user_check_in();
		}
	});
    
    //hiding_and_show($("#menu_group_container"));
    $main.show();
    
    $main.find('.menugroup a').bind(myUp, function () {
    	//alert(TouchMove);
		if (TouchMove == true) return;
    	//$(this).css('background-color','#aaa');
    	var group_id = $(this).parent().find(".hidden_id").val();
    	create_menu_list(G_menugroup[group_id]);
	});
}



function create_menu_list(menugroup){
	var $main = $('#menu_list_container');
    var html = "";
    var menu_ids = menugroup.menus.split(",");
    for (var x=0;x < menu_ids.length; x++) {
        var i = menu_ids[x];
        var photo = get_photo_path(G_menu[i].pic);
		html += "<div class='menu_container'><a href='#menu_item_container'>"
				+ "<div class='menu_header'>"
					+ "<input type='hidden' class='hidden_id' value=" + G_menu[i].id + ">"
					+ "<span class='menu_name'>" + G_menu[i].name + "</span>"
					//+ "<span class='get_button buy_it'>BUY</span>"
					+ "<span class='menu_price'>$" + G_menu[i].price + "</span>"
				+ "</div>"
				+ "<div class='menu_body'>"
					+ "<div class='menu_photo'>" + photo + "</div>"
					+ "<div class='menu_description'>" + G_menu[i].description + "</div>"
				+ "</div>"
			  + "</a></div>";
    }
        
    //html += "<div class='group_name'>" + menugroup.name + "</div>";
        
    $main.html(html);
    $(".menu_container:even").css("background-color","#eee");
    $(".menu_container:odd").css("background-color","#ccc");
    
    set_header_and_footer($main.attr("id"));
    //hiding_and_show($("#menu_list_container"));
    
    $main.find('.menu_container').bind(myUp, function () {
		if (TouchMove == true) return;
    	//$(this).css('background-color','#aaa');
    	var menu_id = $(this).find(".hidden_id").val();
    	create_menu_item(G_menu[menu_id]);
	});
}

function get_photo_path(pic){
	if (pic != '') {
		var path = "menusmall/" + pic.replace("t1_","");
		var photo = "<img src='../common/" + path + "'>";
        return photo;
	}
	else return "";
}

function create_menu_item(menu){
	
    G_menu_id = menu.id;
    //var win_w = $(window).width();
    $("#menu_item_container .menu_price").html("$"+menu.price);
    $("#menu_item_container .menu_name").html(menu.name);
    $("#menu_item_container .menu_description").html(menu.description);
    if (menu.soldout == "C") {
    	show_combination_table();
    }
    else {
	    set_photo(menu);
	    
	    var supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
	    window.addEventListener(orientationEvent, function() {
			//alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
			set_photo(menu);
	    }, false);
	}
    
    set_total_price(menu, '#menu_item_container');

    $('#menu_item_container select').change(function(){
        set_total_price(G_menu[G_menu_id], '#menu_item_container');
    });
    
    var show_me = "View Options";
    var close_me = "Hide Options";
    $('#show_options').html(show_me);
    $('#option_container').hide();
    
    if (menu.option_display == 'N') {
    	$("#option_container").hide();
    	$('#show_options').hide();
    }
    
    //alert(menu.extra_option);
    reset_option_form(menu);
    
    $('#show_options').unbind('touchend');
    $('#show_options').bind(myUp, function(){
		if (TouchMove == true) return;
        if ($('#option_container').is(":visible")) {
            $('#option_container').hide();
            $('#show_options').html(show_me);
        }
        else {
            $('#option_container').show();
            $('#show_options').html(close_me);
        }
    });
    
    $('#option_container input').unbind('change');
    
    $("#side_menu input").change(function(){
    	var id = $(this).attr("id");
    	//alert(id);
    	if (id == "side1" || id == "side2" || id == "side4") {
    		showTypeOfRice();
    	}
    	else {
    		$("#rice_type").hide();
    		$("#rice_type input:checked").attr("checked",false);
    	}
    });
    
    $("#make_spicy input").change(function(){
		var id = $(this).attr("id");
		if (id == "spicy_y") {
			showHowSpicy();
		}
		else {
			$("#how_spicy").hide();
			$("#how_spicy input:checked").attr("checked",false);
		}
    });
    
    $('#special_instruction')
        .focus(function(){
            if (this.value === this.defaultValue) {
                    this.value = '';
            }
        })
        .blur(function(){
            if (this.value === '') {
                    this.value = this.defaultValue;
            }
    });
    
    $('#option_container input').change(function(){
        set_total_price(G_menu[G_menu_id], '#menu_item_container');
    });
    $('#option_container #special_instruction').change(function(){
        set_total_price(G_menu[G_menu_id], '#menu_item_container');
    });
    
    
    $('#menu_item_container #add_order').unbind('touchend');
    $('#menu_item_container #add_order').bind(myUp, function(){
		if (TouchMove == true) return;
        var order = set_total_price(G_menu[G_menu_id], '#menu_item_container');
        set_cookie_order(order);
        create_cart_orders();
        hiding_and_show($("#cart_container"));
    });
    
    hiding_and_show($("#menu_item_container"));
    
}


function set_photo(menu){
    if (menu.pic) {
		var win_w = $(window).width();
		if (win_w > 400) win_w = 400;
		//var html = "<img src='../common/getthumb.php?path=menupic/" +  menu.pic + "&amp;size=" + win_w + "' style='text-align:center'>";
		var html = "<img src='../common/menupic/" + menu.pic + "' width='" + win_w + "' style='text-align:center'>";
		$('#menu_item_container .menu_photo').html(html);
    }
}

function create_cart_orders(){

	var cart = get_cookie_orders();
	
    var html = "<div class='cart'>"
        + "<div class='cart_label'>"
        + "<span style='float:right; padding:0 3%;'><img src='../common/img/small_x.png'></span>"
        + "<span style='float:right; width:18%; text-align:right;'>Price</span>"
        + "<span style='float:right; width:6%'>Qty</span>"
        + "<span style='width:60%;'>Name</span>"
        + "</div>";
    for (var i in cart){
        html += "<div class='cart_item' id='cart_item" + i + "'>"
            + "<div style='padding: 5px 0;'>"
                + "<span onclick='delete_cart_item(" + i + ")' style='float:right; padding:0 3%;'><img src='../common/img/small_x.png'></span>"
                + "<span style='float:right; width:18%; text-align:right;'>$" + cart[i].subtotal + "</span>"
                + "<span style='float:right; width:6%; text-align:center;'>" + cart[i].qty + "</span>"
                + "<span style='width:60%; padding-left:3%; line-height: 120%;'>" + cart[i].menu_name + "</span>"
            + "</div>";
        for (var j=0; j<cart[i].option.length; j++){
            html += "<div class='cart_item_option'>"
                + "<span>" + cart[i].option[j].abbr + " " + cart[i].option[j].name
                + "<span style='padding-left:10px;'> ($" + cart[i].option[j].price + ")</span>"
                + "</div>";
        }
        if (cart[i].special_instruction){
            html += "<div class='cart_item_special'>"
                + cart[i].special_instruction + "</div>";
        }
        html += "</div>";
    }
    html += "</div>";
    $('#cart_container').html(html);
    
    var html = "<div id='order_cart' class='sum_container'>"
        + "<div class='sum_item'><span class='sum_title'>Subtotal : </span><span id='subtotal' class='sum_data'></span></div>"
        + "<div class='sum_item'><span class='sum_title'>Tax : </span><span id='tax' class='sum_data'></span></div>"
        + "<div class='sum_item sum_last_item'><span class='sum_title'>Total : </span>"
        + "<span id='total' class='sum_data'></span></div>"
        + "</div>";
    $('#cart_container').append(html);
    
    set_summary_total();
    
    /*
    var html = "<ul class='order_type'>"
        + "<li><input type='radio' name='order_type' value='P' checked /><span>Pick-up</span></li>"
        + "<li><input type='radio' name='order_type' value='H' /><span>For Here</span></li>"
        + "<li><input type='radio' name='order_type' value='D' disabled /><span>Delivery</span></li>"
        + "</ul>";
    $('#main_container').append(html);
    */
    
    var html = "<div class='button_container'>"
        + "<button id='checkout' class='main'>Checkout</button>"
        + "</div>";
    $('#cart_container').append(html);
    
    //hiding_and_show($("#cart_container"));
    
    $('#checkout').bind(myUp, function(){
		if (TouchMove == true) return;
    	//alert("checkout button");
        if (ss_userid) {
            hiding_and_show($("#checkout_container"));
        }
        else {
        	G_href = "checkout_container";
            user_check_in();
        }
    });
    
}

function delete_cart_item(item_no) {
    $('#cart_item'+item_no).remove();
    $.cookie("order"+item_no,null);
    set_summary_total();
}

function check_store_open(open) {
	if (open == false) {
		$("#closed_body").show();
		$('#place_order').hide();
		
	}
	else {
		$("#closed_body").hide();
		$('#place_order').show();
	}
}

function create_checkout(){

    get_open_now();
    $("#closed_body").hide();
    $('#place_order').hide();
    
    var itv = setInterval(function() {
    	if (G_store_open != null) {
    		check_store_open(G_store_open);
    		clearInterval(itv);
    	}
	}, 500);

    $(".case_dinein").hide();
    var cart = get_cookie_orders();

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
    	}
    })
    
    
    if (get_order_total().amount == 0) {
    	$("#place_order").attr("disabled","disabled").css({ opacity: 0.5 }).css("cursor","default");
    }
    if (ss_point_usable < (get_order_total().amount*100)) {
     	$("#payment_type[value='P']").attr("disabled",true);
    }
    else {
	    $("#payment_type[value='P']").attr("disabled",false);
    }
    
    //hiding_and_show($("#checkout_container"));

    $('#place_order').bind(myUp, function(){
		if (TouchMove == true) return;
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
        $("#order_type:checked").each(function() {
        	p_order.order_type = $(this).val();
        });
        $("#payment_type:checked").each(function() {
        	p_order.payment_type = $(this).val();
        });
        $("#usual_type:checked").each(function() {
        	p_order.usual = $(this).val();
        });
        if ($("#text_me").is(":checked")){
            p_order.text_me = "Y";
        }
        else p_order.text_me = 'N';
        if ($("#email_me").is(":checked")){
            p_order.email_me = "Y";
        }
        else p_order.email_me = 'N';
        p_order.from_where = 'C';
    
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
                    delete_all_order_cookies();
                    hiding_and_show($("#order_complete"));
                    order_complete_action(order_id);
               }
            }
        });
        return false;
    
    });
    
}

function create_signin(){
    if ($.cookie("useremail")) {
        $('#signin_email').val($.cookie("useremail"));
        $('#signin_password').focus();
        if ($.cookie("userpass")) {
	        $('#signin_password').val($.cookie("userpass"));
	        $('#savePass').attr("checked","checked");
	        $('#signin').focus();
        }
    }
    else {
    	$('#signin_email').focus();
    }
    $('#signin_form .sign_in_err_msg').hide();
    $('#signin_form .sign_in_err_msg').css("color","red");
    $('#signin_form .sign_in_err_msg').css("text-align","center");
    
    $('#signin').bind(myUp, function(){
        $('#signin').attr("disabled","true");
        var data = $('#signin_form').serialize();
        $.ajax({
            type: "POST",
            url: "../common/User.php",
            data: "action=signin&" + data,
            success: function(res){
                eval(res);
                if (result == 0) {
                    $('#signin_form #wrong_email').show();
                    $('#signin_email').focus();
                    $('#signin').attr("disabled","");
                }
                else if (result == -1) {
                    $('#signin_form #wrong_password').show();
                    $('#signin_password').focus();
                    $('#signin').attr("disabled","");
                }
                else {
                	$('#signin_form #sign_in_err_msg').hide();
                    set_message("Thank you for signing in.");
                    ss_userid = userid;
                    ss_username = username;
                    ss_userphone = userphone;
                    ss_useremail = useremail;
                    if ($("#saveid").is(":checked")) {
                    	$.cookie("useremail", useremail, { expires: 30 });
                    }
                    else {
                    	$.cookie("useremail", null);
                    }
                    if ($("#savePass").is(":checked")) {
                    	$.cookie("userpass", $("#signin_password").val(), { expires: 30 });
                    }
                    else {
                    	$.cookie("userpass", null);
                    }
                    check_go_where(G_href);
                }
            }
        });
		return false;
    });
    
    $('#signup_form input')
        .focus(function(){
            if (this.value === this.defaultValue) {
                this.value = '';
				$(this).css("color","#000");
				//$(this).next('.input_errmsg').remove();
                //this.setSelectionRange(0,0);
            }
        })
        .keydown(function(){
            if (this.value === this.defaultValue) {
                this.value = '';
				$(this).css("color","#000");
				$(this).next('.input_errmsg').remove();
            }
        })
        .blur(function(){
            if (this.value === '') {
                this.value = this.defaultValue;
				$(this).css("color","#777");
            }
			this.value = removeFrontSpaces(this.value);
			if ($(this).attr("id") == "first_name" || $(this).attr("id") == "last_name") {
				this.value = capitalizeWords(this.value);
			}
    });
    $('#cancel').click(function(){
		$('#signup_container').hide();
		$('#signin_container').show();
    });
    
    $('#signup').bind(myUp, function(){
        if (!check_signup_form()) return false;
        $('#signup').attr("disabled","true");
        var data = $('#signup_form').serialize();
        //alert(data);
        $.ajax({
            type: "POST",
            url: "../common/User.php",
            data: "action=signup&" + data,
            success: function(res){
                eval(res);
                if (result == 0) {
                    $('#email_msg').html('Your email is already signed up. Check your email or try another email please.');
                    $('#email').focus();
                    //return false;
                }
                else {
                    var html = "<div>Thank you for signing up teriyakionline. </br>You've been signed up now.</div>"
                        + "<div><button id='goto_signin' type='button'>Go to Sign In Page</button></div>";
                    $('#signup_form .button_container').html(html);
				    $('#goto_signin').click(function(){
						$('#signup_container').hide();
						$('#signin_container').show();
						$("#email").focus();
				    });
                    //return false;
                }
            }
        });
        return false;
    });

    $('#signup').bind(myUp, function(){
		if (TouchMove == true) return;
    	hiding_and_show($("#signup_container"));
    });
	
}

function check_go_where(link) {
	if (link == "cart_container") {
		select_usual();
	} 
	else {
		hiding_and_show($("#"+link));
	} 
}

function user_check_in() {
	
	hiding_and_show($("#signin_container"));

}

function order_complete_action(order_id) {
    $("#goto_mypage").bind(myUp, function(){
		if (TouchMove == true) return;
    	//create_my_page();
    	get_selected_order(order_id)
    });
    $("#goto_logout").bind(myUp, function(){
		if (TouchMove == true) return;
    	logging_out("cell");
    });
}

var G_last_order_no = 0;
var G_history_displayed = false;
var G_display_count = 20;

function create_order_history_header(){
    var html = "<div class='cart_label' style='clear:both'>"
        + "<span style='float:right; width:17%; text-align:right; padding-right: 3%;'>Price</span>"
        + "<span style='width:23%;'>Date</span>"
        + "<span style='width:57%;'>Orders</span>"
        + "</div>"
        + "<div id='history_body'></div>";
    $('#order_history').html(html);
}

function create_order_history(order){
    $('#order_history .loading').remove();
    var order_count = 0;
    var direction = check_order_json(order);
    for (var i in order){
        order_count++;
        var cnt = 0;
        var first = 0;
        for (var j in order[i].items){
                if (cnt == 0) first = j;
                cnt++;
        }
        var more = "";
        if (cnt > 1) more = " +";
        html = "<li>"
            + "<input type='hidden' class='hidden_order_id' value=" + order[i].id + ">"
            + "<span class='price'>$" + order[i].total + "</span>"
            + "<span class='date'>" + format_time_db(order[i].dateCreated).date_small + "</span>"
            + "<span class='name' style='width:53%;'>" + order[i].items[first].name + more + "</span>"
            + "</li>";
        if (direction == "asc") {
        	$('#order_history #history_body').prepend(html);
        }
        else {
        	$('#order_history #history_body').append(html);
        }
        //alert(i + " " + order[i].id);
        //G_last_order_no = order[i].id;
    }
    G_history_displayed = true;
    if (order_count < G_display_count) G_history_displayed = false;
    
    hiding_and_show($("#my_page_container"));
    
    $('#order_history #history_body li').bind(myUp, function () {
		if (TouchMove == true) return;
    	var order_id = $(this).children(".hidden_order_id").val();
    	get_selected_order(order_id);
	});

}

function get_selected_order(order_id) {
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=selectone&order=" + order_id,
        dataType: "json",
        success: function(json){
            create_order_sheet(json);
            set_status(json);
			if (json.status != "D" && json.status != "X")	{
				$("#status_progress_msg").show();
		        var itv = setInterval(function() {
				    $.ajax({
				        type: "POST",
				        url: "../common/Orders.php",
				        data: "action=get_status&order=" + order_id,
				        dataType: "json",
				        success: function(data){
				            set_status(data);
				            if (data.status == "D" || data.status == "X") {
					            clearInterval(itv);
					            $("#status_progress_msg").hide();
				            }
				        }
				    });
		        }, 30000);
		    }
        }
    });
	
}

function set_status(order) {
	var status = order.status;
	var st_name = G_order_status[status].name.toUpperCase();
	$("#status_name").html(st_name);
}

function create_order_sheet(order){
    var html = "<div style='font-weight:bold; font-size:20px; text-align: center; clear:both; line-height:200%;'>"
        + "<div style='font-weight:bold; font-size:20px;'>Your Orders are NOW</div>"
        + "<div id='status_name' style='font-size: 30px; line-height:150%;margin-bottom:10px;'>" + G_order_status[order.status].name + ".</div>"
        + "<div id='status_progress_msg' style='font-size:12px;text-align:center;display:none;line-height:110%;margin-bottom:10px;'>This information will be updated <br>every 30 seconds.</div>"
        + "</div>";
    $('#order_sheet_container').html(html);

    var html = "<div class='order_sheet'>"
        + "<div class='cart_label' style='clear:both'>"
        + "<span style='float:right; width:18%; text-align:right; padding-right: 3%;'>Price</span>"
        + "<span style='float:right; width:6%'>Qty</span>"
        + "<span style='width:60%;'>Name</span>"
        + "</div>";
    for (var i in order.items){
        html += "<div class='cart_item' id='cart_item" + i + "'>"
            + "<div style='padding: 5px 0;'>"
                + "<span style='float:right; width:18%; text-align:right; padding-right: 3%;'>$" + order.items[i].price + "</span>"
                + "<span style='float:right; width:6%; text-align:center;'>" + order.items[i].count + "</span>"
                + "<span style='width:60%; padding-left:3%; line-height: 120%;'>" + order.items[i].name + "</span>"
            + "</div>";
        for (var j in order.items[i].options){
            html += "<div class='cart_item_option'>"
                + "<span>" + order.items[i].options[j].option_abbr + " " + order.items[i].options[j].option_name
                + "<span style='padding-left:10px;'> ($" + order.items[i].options[j].option_price + ")</span>"
                + "</div>";
        }
        if (order.items[i].special_instruction){
            html += "<div class='cart_item_special'>"
                + order.items[i].special_instruction + "</div>";
        }
        html += "</div>";
    }
    html += "</div>";
    $('#order_sheet_container').append(html);
    
    var html = "<div class='sum_container'>"
        + "<div class='sum_item'><span class='sum_title'>Subtotal : </span><span id='subtotal' class='sum_data'>$" + order.subtotal + "</span></div>"
        + "<div class='sum_item'><span class='sum_title'>Tax : </span><span id='tax' class='sum_data'>$" + order.tax + "</span></div>"
        + "<div class='sum_item' style='color:red; border-top: 1px solid #aaa;'><span class='sum_title'>Total : </span>"
        + "<span id='total' class='sum_data'>$" + order.total + "</span></div>"
        + "</div>";
    $('#order_sheet_container').append(html);
    $('.sum_item').css('margin-right','0px');

    hiding_and_show($("#order_sheet_container"));

}

function create_user_info(user){
    var html = "<div class='group_name'>Customer Information</div>"
        + "<li><span class='field'>Name: </span><span class='data'>" + user.first_name + " " + user.last_name + "</span></li>"
        + "<li><span class='field'>E-mail: </span><span class='data'>" + user.email + "</span></li>"
        + "<li><span class='field'>Phone: </span><span class='data'>" + format_phone_number(user.phone) + "</span></li>"
        ;
    $('#user_info').html(html);
}

function get_order_history(user_id, count, order_id) {
    $('#order_history').append("<div class='loading'></div>");
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=select&user=" + user_id + "&count=" + count + "&order=" + order_id,
        dataType: "json",
        success: function(json){
            create_order_history(json);
        }
    });
} 

function create_my_page() {
    $('#user_info').append("<div class='loading'></div>");
    $.ajax({
        type: "POST",
        url: "../common/User.php",
        data: "action=select&store=1&user=" + ss_userid,
        dataType: "json",
        success: function(json){
            $('#user_info .loading').remove();
            create_user_info(json);
        }
    });
    
    create_order_history_header();
    get_order_history(ss_userid, G_display_count, G_last_order_no);
    
}

function create_store_info(store){
    var html = "<div>"
        + "<li><span class='field'>Name</span><span class='data'>" + store.name + "</span></li>"
        + "<li><span class='field'>Address</span><span class='data'>" + store.address + "</br>" + store.city + ", " + store.state + " " + store.zip + "</br>"
        + "<a href='http://maps.google.com/maps?q=1120+howell+st,+seattle&hl=en&ll=47.61694,-122.331519&spn=0.009633,0.014226&sll=47.603123,-122.15111&sspn=0.009636,0.014226&vpsrc=6&z=16' target='_blank'>Map It</a></span></li>"
        + "<li><span class='field'>Phone</span><span class='data'><a href='tel:" + store.phone + "'>" + format_phone_number(store.phone) + "</a></span></li>"
        + "<li><span class='field'>Fax</span><span class='data'>" + format_phone_number(store.fax) + "</span></li>"
        + "<li><span class='field'>E-mail</span><span class='data'>" + store.email + "</span></li>"
        + "</div>";
    $('#store_info_container').html(html);
    
    //hiding_and_show($("#store_info_container"));
}


function hiding_and_show($div, no_stack, go_back) {
	$("#loading_container").hide();
	var $from = null;
	$(".page_container").each(function(){
		if ($(this).css("display") == "block") {
			$from = $(this);
			return false;
		}
	});
	if (no_stack != true){
		if (Div_stack[Div_stack.length-1] != $div.attr("id")) {
			Div_stack[Div_stack.length] = $div.attr("id");
		}
	}
	//alert(Div_stack);
	//set_header_menu($div.attr("id"));
	if ($from != null) {
		//reset_event_handler($from.attr("id"), $div.attr("id"));
		//$from.hide();
		//$div.show();

		/*
		if (go_back != true) {
			$div.css("left","100%").show();
			$from.addClass("animatedScreen");
			$div.addClass("animatedScreen");
			setTimeout(
				function(){
					$from.css("left","-100%");
					$div.css("left","0%");
				},0
			);
			setTimeout(
				function(){
					$from.hide();
				},300
			);
		}
		else {
			$div.css("left","-100%").show();
			$from.addClass("animatedScreen");
			$div.addClass("animatedScreen");
			setTimeout(
				function(){
					$from.css("left","100%");
					$div.css("left","0%");
				},0
			);
			setTimeout(
				function(){
					$from.hide();
				},300
			);
		}
		*/
		//$from.css("left","-320px");
		/*
		if (go_back != true) {
			$from.effect("slide", { direction: "left", mode: "hide" }, 200, function(){
			$div.effect("slide", { direction: "right", mode: "show" }, 200);
			window.scrollTo(0,0);
			});
		}
		else {
			$from.effect("slide", { direction: "right", mode: "hide" }, 200, function(){
			  $div.effect("slide", { direction: "left", mode: "show" }, 200);
			  window.scrollTo(0,0);
			});
		*/
	}
	/*
	if ($div.attr("id") == First_page_id) {
		$("#"+First_page_id+" #header").hide();
		$("#"+First_page_id+" #user_container").hide();
		$("#"+First_page_id+" #footer").hide();
	}
	*/
}

function reset_event_handler(from_id, container_id) {
	$('#'+from_id+' #home_button').unbind();
	$('#'+from_id+' #info_button').unbind();
	$('#'+from_id+' #cart_button').unbind();
	$('#'+from_id+' #back_button').unbind();
	
    $('#'+container_id+' #home_button').bind(myUp, function() {
		if (TouchMove == true) return;
    	//alert("home");
    	hiding_and_show($("#menu_group_container"));
    });
    
    $('#'+container_id+' #info_button').bind(myUp, function() {
		if (TouchMove == true) return;
        //create_store_info(G_store);
        hiding_and_show($("#store_info_container"));
    });
    
    $('#'+container_id+' #cart_button').bind(myUp, function() {
		if (TouchMove == true) return;
    	if ($("#cart_container .cart").length < 1) {
    		create_cart_orders();
    	}
        hiding_and_show($("#cart_container"));
    });
    /*
    $('#'+container_id+' #back_button').bind(myUp, function() {
		if (TouchMove == true) return;
		//history.go(-1);
    	goto_back();
    });
    */
}

function goto_back() {
    Div_stack.pop();
    var $prev = $("#"+Div_stack[Div_stack.length-1]);
    hiding_and_show($prev, true, true);
}

function create_button_event(){
	//reset_event_handler();
    $('#back_button').bind(myUp, function() {
		if (TouchMove == true) return;
		history.go(-1);
    });
    $('#home_button').bind(myUp, function() {
		if (TouchMove == true) return;
		location.hash = "#menu_group_container";
    });
	
    $('#signout_button').bind(myUp, function() {
		if (TouchMove == true) return;
    	logging_out("cell");
    });
       
    $('#signin_button').bind(myUp, function() {
		if (TouchMove == true) return;
    	hiding_and_show($("#signin_container"));
    });
    
    $('#mypage_button').bind(myUp, function() {
		if (TouchMove == true) return;
    	//alert("my_page");
        create_my_page();
    });
    
}

function init() {
    $(document).ready(function() {
    	location.hash = "#menu_group_container";
    	//document.ontouchmove = function(e){ e.preventDefault(); }
		$("body").bind("touchmove touchend", function(e) {
			if (e.type == "touchmove")	TouchMove = true;
			if (e.type == "touchend") TouchMove = false;
		});
        document.title = G_store.name;
        create_group_list();
        create_button_event();
        create_checkout();
		create_signin();
		create_store_info(G_store);
		//order_complete_action();
		//alert("change9999");
    });
}

window.onload = init;
