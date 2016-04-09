var G_last_order_no = 0;
var G_history_displayed = false;
var G_display_count = 20;
var auto_taken = true;

var fireOnline = new Firebase('https://midori.firebaseio.com/neworders/');
var fireCounter = new Firebase('https://midori.firebaseio.com/register/orderId/counter/');

function convertTime(t) {
	var arr = t.split(" ");
	var ampm = arr[1];
	console.log(ampm);
	var arr2 = arr[0].split(":");
	var hour = parseInt(arr2[0]);
	var min = parseInt(arr2[1]);
	//hour = (hour == 12 && ampm == "AM") ? 0 : hour;
	hour = (ampm == "AM" || ( hour == 12 && ampm == "PM" )) ? hour : hour+12;
	var d = new Date();
	d.setHours(hour);
	d.setMinutes(min);
	return (new Date(d)).toJSON();
}

function setFireOnline(teo) {
	console.log(teo);
	var order = {};
	order.items = [];
	var index = 0;
	for (var i in teo.items) {
		order.items[index] = {};
		order.items[index].name = teo.items[i].name;
		if (G_menu[teo.items[i].menu_id].abbr_name == "") var abbr = teo.items[i].name;
		else var abbr = G_menu[teo.items[i].menu_id].abbr_name;
		order.items[index].abbr = abbr;
		order.items[index].qty = teo.items[i].count;
		order.items[index].price = teo.items[i].price;
		order.items[index].job = G_menu[teo.items[i].menu_id].job;
		
		order.items[index].options = [];
		for (var j in teo.items[i].options){
			order.items[index].options[j] = {};
			order.items[index].options[j].name = teo.items[i].options[j].option_name;
			//console.log("index="+index+" j="+j+" "+order.items[index].options[j].name);
			//if (teo.items[i].options[j].option_id == "0") var abbr = teo.items[i].options[j].option_name;
			//else var abbr = G_options[teo.items[i].options[j].option_id].abbr_name;
			//order.items[index].options[j].abbr = abbr;
			order.items[index].options[j].abbr = teo.items[i].options[j].option_name;
			order.items[index].options[j].price = teo.items[i].options[j].option_price;
		}
		if (teo.items[i].special_instruction) {
			order.items[index].special_instruction = teo.items[i].special_instruction;
		};
		index++;
	}
	order.total = teo.total;
	order.subtotal = teo.subtotal;
	order.tax = teo.tax;
	order.orderType = "Online";
	if (teo.order_type == "P") order.htType = "Togo";
	else order.htType = "Here";
	
	order.paymentType = "Unpaid";
	order.number = "";
	order.state = "Taken";
	order.customer_name = teo.cust_name;
	order.orderPlacedTime = (new Date()).toJSON();
	if (teo.cust_pickup_time != "ASAP") {
		//console.log(teo.cust_pickup_time);
		order.reserved_time = convertTime(teo.cust_pickup_time);
		var d = new Date();
		order.orderPlacedTime = (new Date(d.setMinutes(d.getMinutes()-15))).toJSON();
	}
	else {
		var d = new Date();
		if (order.htType == "Here") {
			order.orderPlacedTime = (new Date(d.setMinutes(d.getMinutes()+10))).toJSON();
		}
		else {
			order.orderPlacedTime = (new Date()).toJSON();
		}
	}
	order.created_at = (new Date()).toJSON();
	order.onlineId = teo.id;
	//order.created_at = new Date();
	//console.log(order.created_at);
	console.log(order);
	
	fireCounter.transaction(function(currentCount) {
    		if (!currentCount) return 1;   // Initial value for counter.
    		if (currentCount < 0) return;  // Return undefined to abort transaction.
    		if (currentCount > 999) currentCount = 0;
    		return currentCount + 1;       // Increment the count by 1.
		}, function(error, committed, snapshot) {
		    if (!snapshot) {
		        console.log("error");
		    } else {
		    	//console.log(snapshot.val());
				var n_date = format_datetime(new Date()).yyyymmdd;
				order.number = snapshot.val();
		    	order.id = n_date + pad(order.number, 3);
		    	fireOnline.push(order);
		    }
		});
	
	//fireOnline.push(order);
	
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


function create_order_status_button(order_status) {
    var html = "";
    for (var i in G_order_status) {
        var style = "";
        if (i == order_status) {
            style = " style='background-color:" + G_order_status[i].color + "';";
        }
        html += "<button" + style + ">" + G_order_status[i].name + "</button>";
    }
    return html;
}

function get_background_color_by_status(order_status) {
    for (var i in G_order_status) {
        var style = "";
        if (i == order_status) {
            return G_order_status[i].color;
        }
    }
	return "transparent";
}

function update_order_status(id, status, order) {
	if (status != "P") {
		$("#beep").get(0).pause();
	}
    $.ajax({
    	type: "POST",
    	url: "../common/Orders.php",
    	data: "action=update_status&store=1&id=" + id + "&status=" + status,
        dataType: "json",
     	success: function(json){
            //create_order_list(json);
            console.log(json);
            if (json == "auto_transfer") {
	            setFireOnline(order);
            }
    	}
    });
}

function have_placed_orders(order) {
    for (var i in order){
		if (order[i].status == "P") {
			if (auto_taken == true) {
				order[i].status = "T";
				update_order_status(i, "T", order[i]);
			}
			return true;
		}
	}
	return false;
}

function go_customer_page(user_id) {
	//location.href = "../tab/t_mypage.php?user=" + user_id;
	redirect("../tab/t_mypage.php?user=" + user_id);
}

function create_order_list(order){
	if (have_placed_orders(order)) {
		$("#beep").get(0).play();
	}
	else {
		$("#beep").get(0).pause();
	}
    $('#order_list').html("");
	var cnt = 0;
	var direction = check_order_json(order);
    for (var i in order){
		cnt++;
		var center_html = "<table cellpadding=0 cellspacing=0>";
        for (var j in order[i].items){
			var option_array = new Array();
			var array_cnt = 0;
			var o = order[i];
			for (var k in o.items[j].options) {
				//var abbr_name = G_options[o.items[j].options[k].option_id].abbr_name;
				option_array[array_cnt] = o.items[j].options[k].option_name;
				array_cnt++;
			}
			if (o.items[j].special_instruction) {
				//alert(o.items[j].special_instruction);
				option_array[array_cnt] = o.items[j].special_instruction;
			}
			var option_html = "";
			if (option_array.length > 0) {
				option_html = "<span style='color:royalBlue; padding-left:5px;'>" + option_array.join(",&nbsp;") + "</span>";
			}
			var num_orders = " ";
			if (o.items[j].count > 1) num_orders = o.items[j].count;
			center_html += "<tr style='border-bottom:1px solid #aaa !important'>"
				+ "<td valign='top' width='15px' align='center' style='color:red'>" + num_orders + "</td>"
				//+ "<td valign='top' width='80px'>" + G_menu[o.items[j].menu_id].abbr_name + "</td>"
				+ "<td valign='top'>" + o.items[j].name + "</td>"
				+ "<td>" + option_html + "</td>"
				+ "</tr>";
        }
		center_html += "</table>";
		
		var right_html = "<div style='text-align:right;padding:0 10px;'><a href='#' onclick='go_customer_page(" + o.user + ")'>" + o.cust_name + "</a></div>";
		right_html += "<div style='float:right'>";
		if (o.order_type != "P") right_html += "<span style='text-align:rignt;padding:0 10px;color:red;'>HERE</span>"; 
		if (o.cust_pickup_time != "ASAP") right_html += "<span style='text-align:rignt;padding:0 10px;color:red;'>" + o.cust_pickup_time + "</span>"; 
		right_html += "</div>";
		
		var html 
			= "<div class='order_processing_list' style='border-bottom: 1px solid #aaa; background-color:#eee;'>"
            + 	"<div class='hg_container' style='font-weight:bold; line-height:150%; padding:10px 0; background-color:" + get_background_color_by_status(o.status) + ";'>"
			+ 		"<div class='hg_center hg_column'>" + center_html + "</div>"
			+ 		"<div class='hg_left hg_column'><a href='mordersheet.php?order=" + o.id + "'>"
			+ 			"<span style='padding-left:10px'>" + o.daily_no + "</span></a></div>"
			+ 		"<div class='hg_right hg_column'>" + right_html + "</div>"
			+ 	"</div>"
			+ 	"<div style='text-align:right; background-color:#ddd;'>"
			+ 		"<input type='hidden' class='hidden_id' value='" + o.id + "'>"
			+ 		"<span style='padding-right:10px;'>" + o.text_me + "</span>"
			+ 		"<span style='padding-right:10px;'>" + o.email_me + "</span>"
			+ 		"<span style='padding-right:10px;'>" + o.payment_type + "</span>"
			+ 		"<span style='padding-right:10px;'>" + o.from_where + "</span>"
			+ 		"<span style='padding-right:10px;'>$" + o.total + "</span>"
			+ 		"<span style='padding-right:10px;'>" + format_time_db(o.time_first).time + "</span>"
			+ 	create_order_status_button(o.status) + "</div>"
			+ "</div>";
			
		if (direction == "asc") {
			$('#order_list').prepend(html);
		}
		else {
			$('#order_list').append(html);
		}
		G_last_order_no = o.id;
    }
	$('.order_count').html(cnt);
	var d = new Date();
	$('.refresh_time').html(format_datetime(d).time);
	
	var obj = "#order_list";
	set_holy_grail("30px","190px");
	var center_width = $('#order_list').width() - $('#order_list .customer').width()
					- $('#order_list .number').width() - 40;

    G_history_displayed = true;
    //if (order_count < G_display_count) G_history_displayed = false;
    
    //$('.order_processing_list:even').css('background-color','#fff');
    //$('.order_processing_list:odd').css('background-color','#eee');

    $('#order_list button').click(function(){
        for (var i in G_order_status) {
            if (G_order_status[i].name == $(this).html()) {
                var id = $(this).siblings('.hidden_id').val();
                update_order_status(id, i);
            }
        }
    });
}
/*
function set_holy_grail(obj, left_width, right_width) {
	$(obj+" .hg_container").css("padding-left",left_width);
	$(obj+" .hg_container").css("padding-right",right_width);
	$(obj+" .hg_left").css("width",left_width);
	$(obj+" .hg_left").css("right",left_width);
	$(obj+" .hg_right").css("width",right_width);
	$(obj+" .hg_right").css("margin-right","-"+right_width);
}
*/
function PlaySound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.Play();
}

function create_user_info(user){
    var html = "<div class='group_name'>Customer Information</div>"
        + "<li><span class='field'>Name: </span><span class='data'>" + user.first_name + " " + user.last_name + "</span></li>"
        + "<li><span class='field'>E-mail: </span><span class='data'>" + user.email + "</span></li>"
        + "<li><span class='field'>Phone: </span><span class='data'>" + format_phone_number(user.phone) + "</span></li>"
        ;
    $('#user_info').html(html);
}

function get_order_processing(store_id) {
	var show_all = "N";
	if ($("#show_all").attr("checked")) show_all = "Y";
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=processing&store=" + store_id + "&show_all=" + show_all,
        dataType: "json",
        success: function(json){
            create_order_list(json);
        }
    });
} 

function init() {
    $(document).ready(function() {
        get_order_processing(1);
        $("#show_all").change(function(){
	        get_order_processing(1);
	    });
        $("#auto_taken").change(function(){
	        if ($("#auto_taken").attr("checked")) auto_taken = true; 
	        else auto_taken = false; 
	    });
        setInterval(function() {
            get_order_processing(1);
        }, 15000);
        $("#main_container").show();

    });
}

window.onload = init;
