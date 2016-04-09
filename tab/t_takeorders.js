var G_last_order_no = 0;
var G_history_displayed = false;
var G_display_count = 20;

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

function update_order_status(id, status) {
    $.ajax({
    	type: "POST",
    	url: "../common/Orders.php",
    	data: "action=update_status&store=1&id=" + id + "&status=" + status,
        dataType: "json",
     	success: function(json){
            create_order_list(json);
    	}
    });
     
}

function create_order_list(order){
	//PlaySound("sound1");
    $('#order_list').html("");
	var cnt = 0;
	var direction = check_order_json(order);
    for (var i in order){
		cnt++;
		var center_html = "<table cellpadding=0 cellspacing=0>";
        for (var j in order[i].items){
			var option_array = new Array();
			var array_cnt = 0;
			for (var k in order[i].items[j].options) {
				//var abbr_name = G_options[order[i].items[j].options[k].option_id].abbr_name;
				option_array[array_cnt] = order[i].items[j].options[k].option_name;
				array_cnt++;
			}
			if (order[i].items[j].special_instruction) {
				option_array[array_cnt] = order[i].items[j].special_instruction;
			}
			var option_html = "";
			if (array_cnt > 0) {
				option_html = "<span style='color:#555; padding-left:5px;'>" + option_array.join(",&nbsp;") + "</span>";
			}
			var num_orders = " ";
			if (order[i].items[j].count > 1) num_orders = order[i].items[j].count;
			center_html += "<tr style='border-bottom:1px solid #aaa !important'>"
				+ "<td valign='top' width='15px' align='center' style='color:red'>" + num_orders + "</td>"
				//+ "<td valign='top' width='80px'>" + G_menu[order[i].items[j].menu_id].abbr_name + "</td>"
				+ "<td valign='top'>" + order[i].items[j].name + "</td>"
				+ "<td>" + option_html + "</td>"
				+ "</tr>";
        }
		center_html += "</table>";
		var html = "<div class='order_processing_list' style='border-bottom: 1px solid #aaa; background-color:#eee;'>"
            + "<div class='hg_container' style='font-weight:bold; line-height:150%; padding:10px 0;'>"
			+ "<div class='hg_center hg_column'>" + center_html + "</div>"
			+ "<div class='hg_left hg_column'><a href='mordersheet.php?order=" + order[i].id + "'>"
			+ "<span style='padding-left:10px'>" + order[i].daily_no + "</span></a></div>"
			+ "<div class='hg_right hg_column'>"
				+ "<span style='width:20px;text-align:center;'>" + order[i].order_type + "</span>"
				+ "<span style='width:60px;text-align:center;'>" + order[i].cust_pickup_time + "</span>"
				+ "<span style='width:100px;text-align:center;'>" + order[i].cust_name + "</span>"
			+ "</div>"
			+ "</div>"
			+ "<div style='text-align:right; background-color:#ddd;'>"
			+ "<input type='hidden' class='hidden_id' value='" + order[i].id + "'>"
			+ "<span style='padding-right:10px;'>" + format_time_db(order[i].time_first).time + "</span>"
			+ create_order_status_button(order[i].status) + "</div>"
			+ "</div>";
		if (direction == "asc") {
			$('#order_list').prepend(html);
		}
		else {
			$('#order_list').append(html);
		}
		G_last_order_no = order[i].id;
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
                update_order_status(id, i)
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
    $.ajax({
        type: "POST",
        url: "../common/Orders.php",
        data: "action=processing&store=" + store_id,
        dataType: "json",
        success: function(json){
            create_order_list(json);
        }
    });
} 

function init() {
    $(document).ready(function() {
        document.title = G_store.name;
        create_header(G_store.name, "Y");

		$('#order_list').append("<div class='loading'></div>");
        get_order_processing(1);
        setInterval(function() {
            get_order_processing(1);
        }, 15000);
        $("#main_container").show();

    });
}

window.onload = init;
