var G_last_order_no = 0;
var G_history_displayed = false;
var G_display_count = 200;

function serialize_options(option_array, special) {
	var ser_arr = new Array();
	var cnt=0;
	for (var i in option_array) {
		ser_arr[cnt] = option_array[i].option_abbr + " " + option_array[i].option_name;
		cnt++;
	}
	if (special) {
		ser_arr[cnt] = special;
	}
	return ser_arr.join(", ");
}

function convert_order_status(status) {
	
	return G_order_status[status].name;
}

function create_order_history(order){
    //$('#order_list').html("");
	var cnt = 0;
	$('#order_history_sheet').hide();
	$('#order_history_sheet #order_detail').hide();
	var direction = check_order_json(order);
	//alert(direction);
    
    $.each(order, function(i) {
		//alert(i+" "+order[i].id);
    	$('#order_history_sheet #order_details').remove();
    	$('#order_history_sheet #order_id').val(order[i].id);
    	$('#order_history_sheet .order_date').html(format_time_db(order[i].dateCreated).date);
    	$('#order_history_sheet .price').html("$"+order[i].total);
    	if (order[i].status == "D") $('#order_history_sheet .point').html(order[i].point);
    	else $('#order_history_sheet .point').html("N/A");
        for (var j in order[i].items){
        	$('#order_history_sheet #order_detail .num_order').html(order[i].items[j].count);
        	$('#order_history_sheet #order_detail .order_name').html(order[i].items[j].name);
        	$('#order_history_sheet #order_detail .option_name').html(serialize_options(order[i].items[j].options, order[i].items[j].special_instruction));
        	$('#order_history_sheet #order_detail').clone().prependTo('#order_history_sheet .hg_center').attr("id","order_details").show();
        }
        if (direction == "asc") {
        	$('#order_history_sheet').clone().prependTo('#order_history_container .table_body').attr("id","order_history"+cnt).show();
        }
        else {
        	$('#order_history_sheet').clone().appendTo('#order_history_container .table_body').attr("id","order_history"+cnt).show();
        }
		cnt++;
    });
    $("#order_history_container .table_body .table_rows").css("cursor","pointer");
    $("#order_history_container .table_body .table_rows").click(function(){
    	var id = $(this).find("#order_id").val();
    	//location.href = "t_order_status.php?order_id="+id;
    	redirect("t_order_status.php?order_id="+id);
    });
}

function get_order_history(user_id, count, order_id) {
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

function init() {
    $(document).ready(function() {
        document.title = G_store.name;
        create_header(G_store.name, "Y");
        
        set_holy_grail("120px","170px");

		//$('#order_list').append("<div class='loading'></div>");
		
		if (typeof G_user_id != 'undefined' && ss_usertype == "C") {
			var disp_user = G_user_id;
		}
		else {
			var disp_user = ss_userid;
		}
		get_user_info(disp_user);
        get_order_history(disp_user, G_display_count, G_last_order_no);
        $("#main_container").show();
		
		check_sidebar();
        $(window).resize(function() {
            check_sidebar();
        });
    });
}

window.onload = init;
