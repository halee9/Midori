var Store_id = 1;

function get_todays_special(store_id) {
    $.ajax({
        type: "POST",
        url: "../common/Menu.php",
        data: "action=get_specials",
        dataType: "json",
        success: function(specials){
        	for (var i in specials) {
	        	console.log(specials[i]);
	        	var checked = (specials[i].soldout == 'N') ? "checked" : "";
	        	var html = "<input type='checkbox' name='special' value=" + specials[i].id + " " + checked + ">" + specials[i].name + "<br>";
	        	$("#specials").append(html);
        	}
        }
    });
}

function set_todays_special(ids) {
    $.ajax({
        type: "POST",
        url: "../common/Menu.php",
        data: "action=set_specials&ids="+ids,
        success: function(res){
        	location.reload();
        	//eval(res);
            //if (result == true) location.reload();
        }
    });
}


function get_cashier_name(store_id) {
    $.ajax({
        type: "POST",
        url: "../common/User.php",
        data: "action=get_cashiers&store=" + store_id,
        dataType: "json",
        success: function(cashiers){
        	for (var i in cashiers) {
	        	//alert(cashiers[i].first_name);
	        	var html = "<option value=" + cashiers[i].id + ">" + cashiers[i].first_name + " " + cashiers[i].last_name + " (" + cashiers[i].phone + ")</option>";
	        	$("#cashiers_name").append(html);
        	}
        	get_store_info(store_id);
        }
    });
}

function get_store_info(store_id) {
    $.ajax({
        type: "POST",
        url: "../common/Store.php",
        data: "action=get_store_info&store=" + store_id,
        dataType: "json",
        success: function(store){
        	var closed = store.forced_closed;
        	$("#forsed_closed input").each(function(){
        		if ($(this).val() == closed) {
            		$(this).attr("checked",true);
        		}
        		else $(this).attr("checked",false);
        	});
        	var cashier_id = store.cashier_id;
        	$("#cashiers_name option").each(function(){
        		if ($(this).val() == cashier_id) {
	        		$(this).attr("selected",true);
        		}
        		else $(this).attr("selected",false);
        	});
        	if (store.cashier_text == "Y") $("#get_text").attr("checked",true);
        	else $("#get_text").attr("checked",false);
        	
        	$("#main_container").show();
        }
    });
}
function set_forced_closed(store, closed) {
    $.ajax({
        type: "POST",
        url: "../common/Store.php",
        data: "action=set_forced_closed&store=" + store + "&closed=" + closed,
        success: function(res){
        	eval(res);
            if (result == true) location.reload();
            else $("#forsed_closed_msg").html("Not Updated!");
        }
    });
}
function set_cashier_info(store, cashier_id, texting) {
    $.ajax({
        type: "POST",
        url: "../common/Store.php",
        data: "action=set_cashier_info&store=" + store + "&cashier=" + cashier_id + "&text=" + texting,
        success: function(res){
        	eval(res);
            if (result == true) location.reload();
            else $("#cashier_msg").html("Not Updated!");
        }
    });
}

function init() {
    $(document).ready(function() {
	    get_todays_special(Store_id);
	    $("#special_submit").click(function(){
	    	var vals = [];
	    	$("#specials input:checked").each(function(){
	    		
	    		vals.push($(this).val());
	    	});
	    	set_todays_special(vals.join());
	    	console.log(vals.join());
	    	//alert(val);
	    	//var closed = "N";
	    	//if (val == true) var closed = "Y";
	    	//set_forced_closed(Store_id, val);
	    });
	    get_cashier_name(Store_id);
	    $("#open_hour_submit").click(function(){
	    	var val = $("#forsed_closed input:checked").val();
	    	//alert(val);
	    	//var closed = "N";
	    	//if (val == true) var closed = "Y";
	    	set_forced_closed(Store_id, val);
	    });
	    $("#cashier_submit").click(function(){
	    	var cashier_id = $("#cashiers_name option:selected").val();
	    	var texting = "N";
	    	if ($("#get_text").attr("checked") == true) texting = "Y";
	    	set_cashier_info(Store_id, cashier_id, texting);
	    });
    });
}

window.onload = init;
