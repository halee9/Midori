function init() {
    $(document).ready(function() {
        document.title = G_store.name;
        create_header(G_store.name, "Y");
        
        get_order_info(G_order_id);
        
        $("#main_container").show();
		
		check_sidebar();
        $(window).resize(function() {
            check_sidebar();
        });
    });
}

window.onload = init;

function get_order_info(order_id) {
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=selectone&order=" + order_id,
        dataType: "json",
        success: function(json){
            create_order_info(json);
            set_status(json);
			if (json.status != "D" && json.status != "X")	{
				$("#order_status #status_progress #status_progress_msg").show();
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
					            $("#order_status #status_progress #status_progress_msg").hide();
				            }
				        }
				    });
		        }, 30000);
		    }
        }
    });
}
/*
function get_order_status(order_id) {
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=get_status&order=" + order_id,
        dataType: "json",
        success: function(json){
            set_status(json);
        }
    });
}
*/
function set_status(order) {
	$("#status_progress .status_box").css("background-color","#fff");
	var status = order.status;
	var st_name = G_order_status[status].name.toUpperCase();
	$("#order_status #status_head #status").html(st_name);
	var st_color = G_order_status[status].color;
	if (status == "P") $("#status_progress #st_p .status_box").css("background-color",st_color);
	else if (status == "T") $("#status_progress #st_t .status_box").css("background-color",st_color);
	else if (status == "R") $("#status_progress #st_r .status_box").css("background-color",st_color);
	else if (status == "D") $("#status_progress #st_d .status_box").css("background-color",st_color);
	if (order.time_first) 
		$("#status_progress #st_p .status_time").html("at "+format_time_db(order.time_first).time);
	if (order.time_second) 
		$("#status_progress #st_t .status_time").html("at "+format_time_db(order.time_second).time);
	if (order.time_third) 
		$("#status_progress #st_r .status_time").html("at "+format_time_db(order.time_third).time);
	if (order.time_forth) 
		$("#status_progress #st_d .status_time").html("at "+format_time_db(order.time_forth).time);
	
}

function create_order_info(order) {
	var oo = convert_order(order);
	for (var i=0; i<oo.length; i++) {
		var html = "<tr>"
				 + "<td>" + oo[i].name + " " + oo[i].option + "</td>"
				 + "<td class='qty'>" + oo[i].count + "</td>"
				 + "<td class='price'>$" + oo[i].price + "</td>"
				 + "</tr>";
		$("#order_list tbody").append(html);
	}
	$("#order_summary #subtotal").html("$"+order.subtotal);
	$("#order_summary #tax").html("$"+order.tax);
	$("#order_summary #total").html("$"+order.total);
	
	$("#order_detail #order_date").html(format_time_db(order.dateCreated).date);
	$("#order_detail #order_type").html((order.order_type == "P") ? "Pick Up" : "Here");
	$("#order_detail #cust_pickup_time").html(order.cust_pickup_time);
	$("#order_detail #payment_type").html((order.payment_type == "S") ? "at Store" : "with my Points");
	$("#order_detail #usual").html((order.usual == "Y") ? "Yes" : "No");
	$("#order_detail #text_me").html((order.text_me == "Y") ? "Yes" : "No");
	$("#order_detail #email_me").html((order.email_me == "Y") ? "Yes" : "No");
	$("#order_detail #point").html(order.point);
	$("#order_detail #cust_name").html(order.cust_name);
	$("#order_detail #cust_phone").html(format_phone_number(order.cust_phone));
	$("#order_detail #cust_carrier").html(order.cust_carrier);
	$("#order_detail #cust_email").html(order.cust_email);

}

function convert_order(order) {
	var output = new Array();
	var cnt = 0;
	for (var i in order.items) {
		
		var option_array = new Array();
		var array_cnt = 0;
		var o = order.items[i];
		for (var k in o.options) {
			option_array[array_cnt] = o.options[k].option_name;
			array_cnt++;
		}
		if (o.special_instruction) {
			//alert(o.items[j].special_instruction);
			option_array[array_cnt] = o.special_instruction;
		}
		var option_html = "";
		if (option_array.length > 0) {
			option_html = option_array.join(",&nbsp;");
		}
		output[cnt] = {};
		output[cnt].option = option_html;
		output[cnt].name = o.name;
		output[cnt].count = o.count;
		output[cnt].price = o.price;
		cnt++;
	}
	return output;
}