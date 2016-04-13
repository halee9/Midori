var EVEN = 0;
var ODD = 1;

function create_menu(menugroup, menu){
    var row_no=0;
    var menu_no=0;
    var group_no = 0;
    $("#menugroup_container").hide();
    for (var k in menugroup) {
    	$("#menugroup_container .menugroup_name").html(menugroup[k].name);
    	var menu_group_id = "menugroup_container"+group_no;
        $('#menugroup_container').clone().appendTo('#menu_group').attr("id",menu_group_id).show();
       	var str = String(menugroup[k].menus);
        var menu_ids = str.split(",");
        var cnt = 0; var row_cnt = 0;
        for (var x=0;x < menu_ids.length; x++) {
        	var i = menu_ids[x];
            menu_no++;
            if ((cnt%2) == EVEN) {
            	if (set_menu_data('#menu_row .menu_left .menu_container', menu[i])) {
	            	if ((x+1) == menu_ids.length) {
	            		copy_row("#"+menu_group_id+" .menu_table", row_no);
	            		row_no++;
	            	}
	            }
            }
            else {
            	if (set_menu_data('#menu_row .menu_right .menu_container', menu[i])) {
            		copy_row("#"+menu_group_id+" .menu_table", row_no);
            		row_no++;
            	}
            }
            cnt++;
        }
 	    group_no++;
    }
    $(".menu_table tr:even").addClass("even_bg");
    $(".menu_table tr:odd").addClass("odd_bg");
    $(".menu_table tr:even td:odd").addClass("odd_bg");
    $(".menu_table tr:odd td:odd").addClass("even_bg");


    $('.buy_it').click(function(e){
    	$('#orderlist').show();
    	e.stopPropagation();
		var h_id = $(this).siblings('.hidden_id').val();
        var order = set_default_order(menu[h_id]);
        set_cookie_order(order);
        var cookie_no = is_cookie_orders();

        set_order_cart(order, cookie_no);

        /*
        if (!$.browser.msie) {
	        $("#cart_row"+cookie_no).css("visibility", "hidden");
	        $(this).parent().parent().effect("transfer", { to: $("#cart_row"+cookie_no) }, 500,
	        	function() {
	      			$("#cart_row"+cookie_no).css("visibility", "visible");
	  			}
	  		);
	  	}
	  	*/
    });

	$('.menu_container').click(function(){
		var h_id = $(this).find('.hidden_id').val();
        //location.href = "t_menu.php?id="+h_id;
        redirect("t_menu.php?id="+h_id);
	});

}

function copy_row(target_table, row_id) {
	$('#menu_row').clone().appendTo(target_table).attr("id","menu_row"+row_id).show();
	clear_menu_data("#menu_row .menu_left .menu_container");
	clear_menu_data("#menu_row .menu_right .menu_container");
}

function set_menu_data(obj, data) {
	if (typeof data === "undefined") return false;
    $(obj+' .hidden_id').val(data.id);
    $(obj+' .menu_name').html(data.name);
    $(obj+' .menu_price').html("$"+data.price);
    $(obj+' .get_button').show();
    $(obj+' .menu_description').html(data.description);
	if (data.pic != '') {
		//var path = "menupic/" + data.pic;
		//var photo = "<img src='../common/getthumb.php?path=" + path + "&amp;size=100'>";
		//var photo = "<img src='../common/" + path + "'>";
		//var path = "menusmall/" + data.pic.replace("t1_","");
        var path = "../common/menupic/" + data.pic;
		var photo = "<img src='" + path + "' width='100px'>";
        $(obj+' .menu_photo').html(photo).show();
	}
	if (data.soldout == "C") {
		$(obj+' .get_button').hide();
	}
	else if (data.soldout == "Y") {
		$(obj+' .get_button').html("SOLD");
		$(obj+' .get_button').removeClass("buy_it");
		$(obj+' .get_button').css({ opacity: 0.5 }).css("cursor","default");
	}
	return true;
}

function clear_menu_data(obj) {
    $(obj+' .hidden_id').val("");
    $(obj+' .menu_name').html("");
    $(obj+' .menu_price').html("");
    $(obj+' .menu_description').html("");
    $(obj+' .menu_photo').hide();
    $(obj+' .get_button').hide();
    $(obj+' .get_button').html("BUY");
    $(obj+' .get_button').addClass("buy_it");
    $(obj+' .get_button').css({ opacity: 1.0 }).css("cursor","pointer");
}

function set_header_fixed() {
	$("#header").css("position","fixed");
	$("#header").css("left","0px");
	$("#header").css("right","0px");
	$("#main_container").css("padding-top","44px");
	$("#orderlist").css("position","fixed");
	$("#orderlist").css("top","40px");
	$("#orderlist").css("right","0px");
}

function create_user_profile() {
	$("#user_profile #user_name").html(ss_username);
	//$("#user_profile #user_point").html(ss_point_usable);
	$("#user_profile").show();
	/*
    $.ajax({
        type: "POST",
        url: "../common/User.php",
        data: "action=select&store=1&user=" + ss_userid,
        dataType: "json",
        success: function(json){
            var user = json;
            $("#user_profile #user_name").html(user.first_name + " " + user.last_name);
            //$("#email").html(user.email);
            //$("#phone").html(format_phone_number(user.phone));
            //$("#carrier").html(user.carrier);
            $("#user_profile #user_point").html(user.point_usable);
            $("#user_profile").show();
    	}
    });
    */
    //-- search usuals
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=select_usual&user=" + ss_userid,
        dataType: "json",
        success: function(json){
        	if (json) {
        		set_usual_orders(json);
		        $("#the_usual #usual_order").show();
		        $("#the_usual #usual_order_no").hide();
		        $("#the_usual #usual_button").show();
		        $("#the_usual #usual_button").click(function(){
	        		delete_all_order_cookies();
		        	for (var j in json.items) {
		        		reset_order_cookie(json.items[j]);
		        	}
		        	//location.href = "t_checkout.php";
		        	redirect("t_checkout.php");
		        });
	        }
	        else {
		        $("#the_usual #usual_order_no").show();
		        $("#the_usual #usual_order").hide();
		        $("#the_usual #usual_button").hide();
	        }
        }
    });

}
/*
function set_usual_cookie() {
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
	        	create_cart_view();
	        	$("#order_total_top").show();
	        }
        }
    });

}
*/
function set_usual_orders(order) {
	$("#usual_order_item").hide();
	for (var i in order.items) {
	    var option_arr = [];
	    for (var j in order.items[i].options){
	        option_arr[option_arr.length] = order.items[i].options[j].option_abbr + " " + order.items[i].options[j].option_name;
	    }
	    if (order.items[i].special_instruction){
	        option_arr[option_arr.length] = order.items[i].special_instruction;
	    }
	    $("#usual_order_item .option").html(option_arr.join(", "));
		$("#usual_order_item .name").html(order.items[i].name);
		$("#usual_order_item .count").html(order.items[i].count);
		$("#usual_order_item").clone().appendTo("#usual_order").attr("id","#usual_"+i).show();
	}
	$("#my_page_button").click(function(){
		//location.href = "t_mypage.php";
		redirect("t_mypage.php");
	});
}

function init() {
    document.title = G_store.name;
    create_header(G_store.name);
    set_header_fixed();
	check_sidebar();
    create_menu(G_menugroup, G_menu);
    $("#main_container").show();
	if (ss_username) {
		//$("#customer_message").show();
    	create_user_profile();
    }
    else {
        $("#customer_message").show();
		$("#customer_message #sign_in").click(function(){
			//location.href = "t_signin.php?hr=" + G_PGM + ".php";
			redirect("t_signin.php?hr=" + G_PGM + ".php");
		});
    }
    //create_footer();
    $(window).resize(function() {
        check_sidebar();
    });
}


//window.onload = init;

window.onload = function() {

	setTimeout(function() {
		// preload image
		for (var i in G_menu) {
			if (G_menu[i].pic != '') {
                //var path = "menusmall/" + G_menu[i].pic.replace("t1_","");
                var path = "menupic/" + G_menu[i].pic;
				new Image().src = "../common/" + path;
			}
		}
	}, 1000);

    $(document).ready(function() {
    	init();
		//$.ajax({
		//    url: '../common/store_json.js',
		//    dataType: 'script',
		//    async: true,
		//    success: init()
		//});
    });

};

