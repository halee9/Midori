/*
var fireOnline = new Firebase('https://midori.firebaseio.com/neworders/');

function setFireOnline(teo) {
	console.log(teo);
	var order = {};
	order.items = [];
	var index = 0;
	for (var i in teo.items) {
		order.items[index] = {};
		order.items[index].name = teo.items[i].menu_name;
		order.items[index].abbr = teo.items[i].menu_name;
		order.items[index].qty = teo.items[i].qty;
		order.items[index].price = teo.items[i].subtotal;
		order.items[index].options = [];
		for (var j=0; j<teo.items[i].option.length; j++){
			order.items[index].options[j] = {};
			order.items[index].options[j].name = teo.items[i].option[j].name;
			console.log("index="+index+" j="+j+" "+order.items[index].options[j].name);
			order.items[index].options[j].abbr = teo.items[i].option[j].name;
			order.items[index].options[j].price = teo.items[i].option[j].price;
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
	order.number = "No";
	order.state = "Placed";
	order.customer_name = teo.username;
	if (teo.pickup_time != "ASAP") {
		var t = teo.pickup_time;
		var ampm = t.substr(6,2);
		var hour = parseInt(t.substr(0,2));
		var min = parseInt(t.substr(3,2));
		hour = (hour == 12 && ampm == "PM") ? 0 : hour;
		hour = (ampm == "PM") ? hour + 12 : hour;
		var d = new Date();
		d.setHours(hour, min);
		order.reserved_time = d.toJSON();
	}
	order.created_at = (new Date()).toJSON();
	console.log(order.created_at);
	
	fireOnline.push(order);
	
}
*/

var G_option_type = {
	'A' : { code : 'A' , name : 'Add Extra' , abbr: 'Extra', choice_type : 'Multiple' } ,
	'B' : { code : 'B' ,name : 'Chicken Substitute' , abbr: 'Chicken Subst:', choice_type : 'Single' } ,
	'C' : { code : 'C' ,name : 'Choice of Rice' , abbr: '', choice_type : 'Single' },
	'D' : { code : 'D' ,name : 'Choice of Drink' , abbr: '', choice_type : 'Single' }
	};
var G_order_status = { 
		"X" : { name : "Canceled",
				color : "#aaa" },
		"P" : { name : "Placed",
				color : "#ffff99" },
		"T" : { name : "Taken",
				color : "#ffcc66" },
		"R" : { name : "Ready",
				color : "#99ff99" },
		"D" : { name : "Done",
				color : "#aaa" }
};
var G_store_open = null;

/*
function redirect(loc) {
	alert(loc);
	window.location.replace("http://teriyakionline.com/store/"+loc);
}
*/
	
function redirect(loc, mode) {
	var ts = new Date().getTime();
	if (loc.indexOf("?") > 0) {
		var tail = "&v=" + ts;
	}
	else {
		var tail = "?v=" + ts;
	}
	if (mode == "rep") {
		window.location.replace(loc+tail);
	}
	else {
		window.location.href = loc+tail;
	}
}
	
function popupOpen(id) {
	//Get the screen height and width
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();

	//Set heigth and width to mask to fill up the whole screen
	$('#mask').css({'width':maskWidth,'height':maskHeight});
	//$('#mask').css('position', 'fixed');
	
	//transition effect		
	//$('#mask').show(0,0.4);	
	//$('#mask').fadeIn(0);	
	$('#mask').fadeTo(0,0.5);	

	//Get the window height and width
	var winH = $(window).height();
	var winW = $(window).width();
            
	//Set the popup window to center
	//alert(getPosition(document.getElementById('popup'))) ;
	var scrollTop = $(window).scrollTop();
	//alert(scrollTop);

	$(id).css('top',  winH/2-$(id).height()/2 + scrollTop);
	//$(id).css('top',  maskHeight/2-$(id).height()/2);
	$(id).css('left', winW/2-$(id).width()/2);
	//$(id).css('position', 'fixed');
	//alert($(id).height() + " " + $(id).width());
	//$('html').css('overflow', 'hidden'); 
	//transition effect
	$(id).show();
	//$(id).fadeIn(); 
	
	$('#mask').click(function () {
		if (id == '#popup') {
			$(id).hide();
			$('#mask').hide();
		}
	});			
	$('.closeImg').click(function () {
		$(id).hide();
		$('#mask').hide();
	});			
	
	//if window is resized
	$(window).resize(function () {
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		//Set heigth and width to mask to fill up the whole screen
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
		//Set the popup window to center
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	});
}

function popupClose(id) {
		$(id).hide();
		$('#mask').hide();
}


function getPosition(who){
    var T= 0,L= 0;
    while(who){
        L+= who.offsetLeft;
        T+= who.offsetTop;
        who= who.offsetParent;
    }
    return [L,T];    
}

function format_phone_number(phone) {
	return phone.substr(0,3) + "-" + phone.substr(3,3) + "-" + phone.substr(6,4);
}

function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function format_datetime(d) {
	var month = d.getMonth()+1;
	var dd = d.getDate();
	var year = d.getFullYear();
	
	var hh = (d.getHours()>12) ? d.getHours()-12 : d.getHours();
	var ampm = (d.getHours()<12) ? 'AM' : 'PM';
	var mm = d.getMinutes();
	var mm = (mm < 10) ? '0'+mm : mm;
	var ss = d.getSeconds();
	var ss = (ss < 10) ? '0'+ss : ss;
	
	var datetime = {};
	datetime.date = month + "/" + dd + "/" + year;
	datetime.time = hh + ":" + mm + ":" + ss + " " + ampm;
	return datetime;
}

function format_time(d) {
	var hh = (d.getHours()>12) ? d.getHours()-12 : d.getHours();
	var ampm = (d.getHours()<12) ? 'AM' : 'PM';
	var mm = d.getMinutes();
	var mm = (mm < 10) ? '0'+mm : mm;
	return pickup_time = hh + ":" + mm + " " + ampm;
}

function format_time_db(d) {
	var yy = d.substr(0,4);
	var yy_2 = d.substr(2,2);
	var mm = d.substr(5,2);
	var dd = d.substr(8,2);
	var hh = d.substr(11,2);
	var bb = d.substr(14,2);
	if (hh >= 12) {
		var ampm = 'PM';
		if (hh > 12) hh -= 12;
	}
	else var ampm = 'AM'
	var dateformat = {};
	dateformat.date = mm + "/" + dd + "/" + yy;
	dateformat.date_small = mm + "/" + dd + "/" + yy_2;
	dateformat.time = hh + ":" + bb + " " + ampm;
	return dateformat;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function get_window_width() {
	//var wid = $(window).width();
	//var hei = $(window).height();
	var wid = screen.width;
	var hei = screen.height;
	var width = (wid > hei) ? hei : wid;
	return width = (width>736) ? 736 : width;
}


//---------------------------------------------------------------------------------

function rearrange_options(menu_option_string, option_item, option_type) {
	var str = String(menu_option_string);
	var menu_options = str.split(",");
	var temp_option_type = "";
	var opt = [];
	if (menu_options[0]) {
		var k = -1;
		for (var i=0; i<menu_options.length; i++) {
			var x = menu_options[i];
			if (option_item[x].type != temp_option_type) {
				temp_option_type = option_item[x].type;
				k++;
				opt[k] = {};
				opt[k].type_code = option_type[option_item[x].type].code;
				opt[k].type_name = option_type[option_item[x].type].name;
				opt[k].choice_type = option_type[option_item[x].type].choice_type;
				opt[k].items = [];
				var j = 0;
			}
			opt[k].items[j] = {};
			opt[k].items[j].id = option_item[x].id;
			opt[k].items[j].name = option_item[x].name;
			opt[k].items[j].price = option_item[x].price;
			//alert(k+" "+opt[k].type_name+" "+opt[k].choice_type+" "+opt[k].items[j].name+" "+opt[k].items[j].price);
			j++;
		}
	}
	return opt;
}

function set_total_price(menu, jquery_id) {
	var order = {};
	order.menu_id = menu.id;
	order.menu_name = menu.name;
	var menu_qty = $(jquery_id+' #menu_qty').val();
	order.qty = parseInt(menu_qty);
	order.option = [];
	order.price_one = parseFloat(menu.price);
	var i=0;
	$('#option_display').html("");
	$(jquery_id+' #option_container input:checked').each(function(){
		var id = $(this).attr("id");
		if (id == "side1" || id == "side4" || id == "rice1" || id == "spicy_n" || id == "regular" || id == "white_n") {
			return;
		}
		else {
			var text = $(this).next().html();
			var price = $(this).val();
			order.option[i] = {};
			order.price_one += parseFloat($(this).val());
			order.option[i].id = i;
			//order.option[i].abbr = G_option_type[G_options[order.option[i].id].type].abbr;
			order.option[i].abbr = "";
			//order.option[i].name = G_options[order.option[i].id].name;
			order.option[i].name = text;
			order.option[i].price = price;
			var op = order.option[i].name;
			if (order.option[i].price > 0) {
			 	op += " $" + order.option[i].price;
			}
			$('#option_display').append("<li>"+op+"</li>");
			i++;
		}
	});

	var subtotal = menu_qty * order.price_one;
	subtotal = parseFloat(subtotal.toFixed(2));
	//$('#add_order #subprice').html(price);
	$(jquery_id+' #unit_price').html("$"+order.price_one.toFixed(2));
	$(jquery_id+' #subtotal').html("$"+subtotal.toFixed(2));
	var tax = subtotal * G_store.tax_rate /100;
	tax = parseFloat(tax.toFixed(2));
	$(jquery_id+' #tax').html("$"+tax.toFixed(2));
	var total = subtotal + tax;
	total = parseFloat(total.toFixed(2));
	$(jquery_id+' #total').html("$"+total.toFixed(2));
	order.subtotal = subtotal;
	order.tax = tax;
	order.total = total;
	
	$(jquery_id+' #special_instruction').each(function(){
		if (this.value !== this.defaultValue) {
			order.special_instruction = this.value;
			$('#option_display').append("<li>"+order.special_instruction+"</li>");
		}
	});
	return order;
}

function recalcurating_price(menu) {
	var order = {};
	order.menu_id = menu.id;
	order.menu_name = menu.name;
	var menu_qty = $('#add_order #menu_qty').val();
	order.qty = parseInt(menu_qty);
	order.option = [];
	order.price_one = parseFloat(menu.price);
	var i=0;
	$('#add_order input:checked').each(function(){
		order.option[i] = {};
		order.price_one += parseFloat($(this).val());
		order.option[i].id = $(this).prev().val();
		order.option[i].abbr = G_option_type[G_options[order.option[i].id].type].abbr;
		order.option[i].name = G_options[order.option[i].id].name;
		order.option[i].price = $(this).val();
		i++;
	});

	var subtotal = menu_qty * order.price_one;
	subtotal = parseFloat(subtotal.toFixed(2));
	//$('#add_order #subprice').html(price);
	$('#add_order #subtotal').html(subtotal.toFixed(2));
	var tax = subtotal * G_store.tax_rate /100;
	tax = parseFloat(tax.toFixed(2));
	$('#add_order #tax').html(tax.toFixed(2));
	var total = subtotal + tax;
	total = parseFloat(total.toFixed(2));
	$('#add_order #total').html(total.toFixed(2));
	order.subtotal = subtotal;
	order.tax = tax;
	order.total = total;
	
	$('#add_order #special_instruction').each(function(){
		if (this.value !== this.defaultValue) {
			order.special_instruction = this.value;
		}
	});
	return order;
}


function is_cookie_orders(){
    if ($.cookie("order_no")) return $.cookie("order_no");
	else return false;
}


function get_cookie_orders(){
    var cart = {};
    if ($.cookie("order_no")) {
        var order_no = $.cookie("order_no");
        for (var i=1; i<=order_no; i++){
            if ($.cookie("order"+i)){
                cart[i] = {};
                cart[i] = JSON.parse($.cookie("order"+i));
            }
        }
    }
    return cart;
}

function get_cookie_orders_total(){
    var total = 0;
    if ($.cookie("order_no")) {
        var order_no = $.cookie("order_no");
        for (var i=1; i<=order_no; i++){
            if ($.cookie("order"+i)){
                var item = JSON.parse($.cookie("order"+i));
				total += parseFloat(item.subtotal.toFixed(2));
            }
        }
    }
    return total;
}

function get_cookie_order(cookie_no){
    if ($.cookie("order"+cookie_no)){
        return cart = JSON.parse($.cookie("order"+cookie_no));
    }
    else return false;
}


function delete_all_order_cookies(){
    if ($.cookie("order_no")) {
        var order_no = $.cookie("order_no");
        for (var i=1; i<=order_no; i++){
            $.cookie("order"+i,null);
            //delete_order_item(i);
        }
        $.cookie("order_no",null);
    }
}


function get_order_total(){
    var total = {};
	total.amount = 0;
	total.count = 0;
    if ($.cookie("order_no")) {
        var order_no = $.cookie("order_no");
        for (var i=1; i<=order_no; i++){
            if ($.cookie("order"+i)){
                var item = JSON.parse($.cookie("order"+i));
				total.amount += parseFloat(item.subtotal.toFixed(2));
				total.count++;
            }
        }
    }
    return total;
}

function set_summary_total() {
    var sum = recalc_cookie_orders_total();
    $('#order_cart #subtotal').html('$'+sum.subtotal.toFixed(2));
    $('#order_cart #tax').html('$'+sum.tax.toFixed(2));
    $('#order_cart #total').html('$'+sum.total.toFixed(2));
    $('#total_qty').html(sum.count);
    $('#total_amount').html('$'+sum.total.toFixed(2));
    $('#cart_container #cart_button').html('$'+sum.total.toFixed(2));

    if (G_store.open_status == "Y") {
	    if (get_order_total().amount < 1) {
	    	$("span#checkout").css("visibility","hidden");
	    	$("button#checkout_in_cart").hide();
	    }
	    else {
	    	$("span#checkout").css("visibility","visible");
	    	$("button#checkout_in_cart").show();
	    }
	}
}

function recalc_cookie_orders_total(){
    var cart = get_cookie_orders();
    var sum = {};
    sum.subtotal = 0;
    sum.tax = 0;
    sum.total = 0;
    sum.count = 0;
    for (var i in cart){
        sum.subtotal += parseFloat(cart[i].subtotal.toFixed(2));
        sum.count += parseFloat(cart[i].qty);
    }
    sum.subtotal = parseFloat(sum.subtotal.toFixed(2));
    sum.tax = sum.subtotal * G_store.tax_rate /100;
    sum.tax = parseFloat(sum.tax.toFixed(2));
    sum.total = sum.subtotal + sum.tax;
    sum.total = parseFloat(sum.total.toFixed(2));
    
    return sum;
}

function get_desired_select_time(prep, interval, rep) {
	var d = new Date(); 
	d.setMinutes(d.getMinutes() + parseInt(prep));
	var min = d.getMinutes();
	var min = Math.ceil(min/10)*10;
	
	var html = "<select id='select_pickup_time'>"
		+ "<option selected='selected'>ASAP</option>";
	for (var i=0; i < rep; i++) {
		if (i ==0) d.setMinutes(min);
		else d.setMinutes(d.getMinutes()+interval);
		html += "<option>" + format_time(d) + "</option>";
	}
	html += "</select>";
	return html;
}


function set_cookie_order(order, cookie_no) {
    var json_order = JSON.stringify(order);
    //alert(json_order);
    if (!cookie_no) {
	    if ($.cookie("order_no")) {
	        cookie_no = parseInt($.cookie("order_no")) + 1;
	    }
	    else {
	        cookie_no = 1;
	    }
    	$.cookie("order_no", cookie_no);
	}
    $.cookie("order"+cookie_no, json_order);
}

function removeFrontSpaces(str) {
	return str.replace(/^ +/gm, '');
}

function capitalizeWords(str) {
	str = str.replace(/^ +/gm, '');
	str = str.replace(/\s{2,}/g, " ");
	var words = str.split(" ");
	for (var i=0; i<words.length; i++) {
		words[i] = words[i].toUpperCase().substr(0,1) + words[i].slice(1);
	}
	return words.join(" ");
}

function set_holy_grail(left_width, right_width) {
	$('.hg_container').css('padding-left',left_width);
	$('.hg_container').css('padding-right',right_width);
	$('.hg_left').css('width',left_width);
	$('.hg_left').css('right',left_width);
	$('.hg_right').css('width',right_width);
	$('.hg_right').css('margin-right','-'+right_width);
}


function check_sidebar(){
   if ($('#main_container').width() < 1024) {
        $('#left_container').css("width","100%");
        $('#right_container').css("display","none");
        $('#close_cart').css("display","inline-block");
        $("#order_cart").appendTo("#orderlist").css("position","relative").css("width","310px");
   }
   else {
        $('#left_container').css("width","768px");
        $('#right_container').css("display","block");
        $('#close_cart').css("display","none");
        var w = $('#main_container').width() - 768;
        $('#right_container').css("width",w+"px");
        var cart_w = w - 10;
        //$("#order_cart").appendTo("#right_container").css("position","fixed").css("width",cart_w+"px");
        $("#order_cart").appendTo("#right_container").css("width",cart_w+"px");
        if (G_PGM == "t_store") {
        	cart_positioning();
        }
    }
	if (G_PGM == "t_signin" || G_PGM == "t_takeorders") {
		$("#right_container").remove();
		$("#left_container").css("width","100%");
	}
}


function set_order_cart(order, id){
	
    var option_arr = [];
    for (var j=0; j<order.option.length; j++){
        option_arr[option_arr.length] = order.option[j].abbr + " " + order.option[j].name;
    }
    if (order.special_instruction){
        option_arr[option_arr.length] = order.special_instruction;
    }
    $("#cart_row .option").html(option_arr.join(", "));
	$("#cart_row .order_name").html(order.menu_name);
		
	$("#cart_row .order_qty select option").removeAttr("selected");
	$("#cart_row .order_qty select option").each(function(){
		//if ($(this).attr("selected") == true) {
		//	$(this).removeAttr("selected");
		//}
		if ($(this).text() == order.qty) {
			this.setAttribute("selected","selected");
			return false;
		}
	});
	$("#cart_row .order_qty .just_display").html(order.qty).hide();
	$("#cart_row .order_qty select").attr("onChange","renew_order_item("+id+")");
	
	$("#cart_row .order_subtotal").html(order.subtotal.toFixed(2));
	$("#cart_row .order_del").attr("onClick","delete_order_item("+id+")");
	$("#cart_row").clone().appendTo("#order_cart_main .table_body").attr("id","cart_row"+id).show();
	
	check_sidebar();
	set_summary_total();
	
	$("#order_total_top").show();
}

function cart_positioning(){
	var winH = $(window).height();
	var cartH = $("#order_cart").height() + 60;
	if (cartH > winH) {
		$("#order_cart").css("position","relative");
	}
	else {
		$("#order_cart").css("position","fixed");
	}
}

function renew_order_item(id) {
	var order = get_cookie_order(id);
	order.qty = $("#cart_row"+id+" select option:selected").val();
	var tt = compute_order_total(order.price_one, order.qty);
	order.subtotal = tt.subtotal;
	order.tax = tt.tax;
	order.total = tt.total;
	set_cookie_order(order, id);
	$("#cart_row"+id+" .order_subtotal").html(order.subtotal.toFixed(2));
	set_summary_total();
}

function set_default_order(menu) {
	var order = {};
	order.menu_id = menu.id;
	order.menu_name = menu.name;
	order.qty = 1;
	order.option = [];
	order.price_one = parseFloat(menu.price);
	var tt = compute_order_total(order.price_one, order.qty);
	order.subtotal = tt.subtotal;
	order.tax = tt.tax;
	order.total = tt.total;
	return order;	
}

function compute_order_total(price, qty) {
	var sum = {};
	sum.subtotal = parseFloat(qty) * parseFloat(price);
	sum.subtotal = parseFloat(sum.subtotal.toFixed(2));
	sum.tax = sum.subtotal * G_store.tax_rate /100;
	sum.tax = parseFloat(sum.tax.toFixed(2));
	sum.total = sum.subtotal + parseFloat(sum.tax);
	sum.total = parseFloat(sum.total.toFixed(2));
	return sum;
}

function delete_order_item(item_no) {
    $('#cart_row'+item_no).remove();
    check_sidebar();
    var tt = get_cookie_order(item_no);
    //alert(tt.subtotal+" "+item_no);
    $.cookie("order"+item_no,null);
    set_summary_total();
}


function set_message(msg, loc) {
	$("#message").html(msg).slideDown('slow');
	//setTimeout(function(){
		$('#message').hide();
		if (loc) {
			redirect(loc,"rep");
			//var ts = new Date().getTime();
			//location.replace(loc+"?v="+ts);
		}
	//},2000);
}

function logging_out(device) {
    $.ajax({
        type: "POST",
        url: "../common/User.php",
        data: "action=signout",
        async: false,
        success: function(res){
            ss_userid = "";
            ss_username = "";
            ss_userphone = "";
            ss_useremail = "";
            delete_all_order_cookies();
            if (device == "cell") {
            	var goto = "index.php";
            }
            else var goto = "t_store.php";
            set_message("You have signed out.", goto);
        }
    });
}


function get_user_info(user_id) {
    $.ajax({
        type: "POST",
        url: "../common/User.php",
        data: "action=select&store=1&user=" + user_id,
        dataType: "json",
        success: function(json){
            var user = json;
            $("#first_name").html(user.first_name);
            $("#last_name").html(user.last_name);
            $("#email").html(user.email);
            $("#phone").html(format_phone_number(user.phone));
            $("#carrier").html(user.carrier);
            $("#saved_points").html(user.point_usable);
            
            if (user.point_usable >= get_order_total().amount) {
            	$("#payment_type[value='P']").removeAttr("disabled");
            }
		    
		    $('#modify_info').click(function(){
		        //location.replace('t_signin.php?action=modify&hr='+G_PGM+'.php');
		        redirect('t_signin.php?action=modify&hr='+G_PGM+'.php',"rep");
		    });
    	}
    });
}

//---- Sing in and up Functions ----

function set_signin_info(){

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
}

function submit_signin() {
    $('#signin_form').submit(function(){
        //$('#signin').attr("disabled","true");
        $('#signin').hide();
        $("div.loading").show();
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
                    $('#signin').show();
                    $("div.loading").hide();
                }
                else if (result == -1) {
                    $('#signin_form #wrong_password').show();
                    $('#signin_password').focus();
                    $('#signin').show();
                    $("div.loading").hide();
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
}

function check_go_where(link) {
	if (!link) link = 't_store.php';
	//var ts = new Date().getTime();
	//location.replace(link+"?v="+ts);
	redirect(link, "rep");
}

function set_signup_info(){
	
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
	
    /*
    $('#phone').keydown(function(event){
		// 0: 48, 9: 57, -: 109, backspace: 8, delete: 46, tab: 9, arrow left:37, arrow right:39, insert:45
        if (event.keyCode < 47 ) {
			return true;
		}
		else {
			if ($(this).val().length < 10) {
				if (event.keyCode >= 48 && event.keyCode <= 57) {
					return true;
				}
				else {
					return false;
				}
			}
			else return false;
		}
    });
    */
}

function signup_submit() {
    
    $('#cancel').click(function(){
		$('#signup_container').hide();
		$('#signin_container').show();
    });
    
    $('#signup_form').submit(function(){
        if (!check_signup_form()) return false;
        //$('#signup').attr("disabled","true");
        $('#signup').hide();
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
			        $('#signup').show();
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

}

function check_signup_form() {
	
    var re_name = /^[a-zA-Z0-9_-]{1,16}$/;
    var re_pass = /^[a-zA-Z0-9_-]{1,16}$/;
    var re_email = /^([\w\.-]+)@([a-z\d\.-]+)\.([a-z\.]{2,6})$/;
    var re_url = /^(https?:\/\/)?([a-z\d\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
    var re_phone = /^[0-9]{10,10}$/;
    
	var status = true;
	$('.input_errmsg').remove();
	
	var carrier = $("#carrier option:selected").text();
	if (carrier == "Select") {
		$("#carrier").parent().parent().after("<div class='input_errmsg'>Please select the name of your carrier.</div>");
		//$("#carrier").focus();
		status = false;
		return false;
	}
	
	$('#signup_form input').each(function(){
		//$(this).next('.input_errmsg').remove();
		if (this.value === this.defaultValue) {
			$(this).focus();
			$(this).after("<div class='input_errmsg'>No data entry!</div>");
			status = false;
			return false;
		}
		if ($(this).attr("id") == "first_name" || $(this).attr("id") == "last_name" ) {
			if (re_name.test($(this).val()) != true) {
				$(this).after("<div class='input_errmsg'>Please check your name again.</div>");
				$(this).focus();
				status = false;
				return false;
			}
		}
		if ($(this).attr("id") == "phone") {
			if (re_phone.test($(this).val()) != true) {
				$(this).after("<div class='input_errmsg'>Please check your phone number.</div>");
				$(this).focus();
				status = false;
				return false;
			}
		}
		if ($(this).attr("id") == "email") {
			if (re_email.test($(this).val()) != true) {
				$(this).after("<div class='input_errmsg'>Please check your e-mail.</div>");
				$(this).focus();
				status = false;
				return false;
			}
		}
		if ($(this).attr("id") == "password") {
			if (re_pass.test($(this).val()) != true) {
				$(this).after("<div class='input_errmsg'>Please check your password.</div>");
				$(this).focus();
				status = false;
				return false;
			}
		}
	});
	if (status == false) return false;
	else return true;
}

function modify_user_info(user_id) {
    $.ajax({
        type: "POST",
        url: "../common/User.php",
        data: "action=select&store=1&user=" + user_id,
        dataType: "json",
        success: function(json){
            var user = json;
            $("#signup_container .title_head").html("Modifying User Info");
            $("#first_name").val(user.first_name);
            $("#last_name").val(user.last_name);
            $("#phone").val(user.phone);
            $("#carrier option").filter(function() {
    			//may want to use $.trim in here
    			return $(this).text() == user.carrier; 
			}).attr('selected', true);
            $("#email").val(user.email);
            $("button#signup").html("Submit");
            
            submit_modify_user();
            
            $("button#cancel").click(function(){
            	//location.replace(G_href);
            	redirect(G_href, "rep");
            });
      	}
    });
}

function submit_modify_user() {
    $('#signup_form').submit(function(){
        if (!check_signup_form()) return false;
        $('#signup').attr("disabled","true");
        var data = $(this).serialize();
        //alert(data);
        $.ajax({
            type: "POST",
            url: "../common/User.php",
            data: "action=modify&user=" + ss_userid + "&" + data,
            success: function(res){
                eval(res);
                if (result == 0) {
                    $('#password_msg').html('Your password is not correct. Please try again.');
                    $('#password').focus();
                    //return false;
                }
                else {
                    var html = "<div>Your Information has been modified.</div>"
                        + "<div><button id='goto_back' type='button'>Go Back</button></div>";
                    $('#signup_form .button_container').html(html);
				    $('#goto_back').click(function(){
				    	//location.replace(G_href);
				    	redirect(G_href,"rep");
				    });
                    //return false;
                }
            }
        });
        return false;
    });
	
}

//--- End of Sign in Fuctions ---

function check_order_json(json) {
	var indexes = Object.keys(json);
	if (parseInt(indexes[0]) > parseInt(indexes[indexes.length-1])) {
		return "desc";
	}
	else {
		return "asc";
	}
	/*
	var cnt = 0;
	var first = 0;
	var last = 0;
	$.each(json, function(i) {
		if (cnt==0) first = parseInt(i);
		last = parseInt(i);
		cnt++;
	});
	alert(first+" "+last);
	if (first > last) {
		return "desc";
	}
	else {
		return "asc";
	}
	*/
}

function create_cart_view(){
	var cart = get_cookie_orders();
    for (var i in cart){
    	set_order_cart(cart[i], i);
    }
}

function reset_order_cookie(obj) {
	//alert(obj.name);
	var order = {};
	order.menu_id = obj.menu_id;
	order.menu_name = obj.name;
	order.qty = parseInt(obj.count);
	order.option = [];
	order.price_one = parseFloat(obj.price/obj.count);
	var i = 0;
	for (var k in obj.options) {
		order.option[i] = {};
		order.option[i].id = obj.options[k].option_id;
		order.option[i].abbr = obj.options[k].option_abbr;
		order.option[i].name = obj.options[k].option_name;
		order.option[i].price = obj.options[k].option_price;
		i++;
	}
	var subtotal = order.qty * order.price_one;
	subtotal = parseFloat(subtotal.toFixed(2));
	var tax = subtotal * G_store.tax_rate /100;
	tax = parseFloat(tax.toFixed(2));
	var total = subtotal + tax;
	total = parseFloat(total.toFixed(2));
	order.subtotal = subtotal;
	order.tax = tax;
	order.total = total;
	order.special_instruction = obj.special_instruction;
	
	set_cookie_order(order);
}

function reset_option_form(menu) {
    $("#option_display li").remove();
   	$("#menu_qty option").removeAttr("selected");
   	$("#menu_qty option:first-child").attr("selected",true);

    if (menu.side_type == "R+S") {
    	$("#side_menu .both").show();
    	$("#side_menu .rice").hide();
    	$("#side_menu #side1").attr("checked",true);
    	showTypeOfRice();
    }
    else if (menu.side_type == "2R" || menu.side_type == "1R") {
    	$("#side_menu .rice").show();
    	$("#side_menu .both").hide();
    	$("#side_menu #side4").attr("checked",true);
    	showTypeOfRice();
    }
    else if (menu.side_type == "BR") {
    	$("#side_menu").hide();
    	showTypeOfRice();
    }
    else { // Menu_side is none
    	$("#side_menu").hide();
    	$("#rice_type").hide();
    }
    
    if (menu.spicy_option == "Y") {
    	$("#make_spicy div").show();
    	$("#make_spicy #spicy_n").attr("checked",true);
    }
    else {
    	$("#make_spicy").hide();
    }

    //if (menu.is_spicy == "Y") {
    //	showHowSpicy();
    //}
    //else {
    //	$("#how_spicy").hide();
    //}
    
    if (menu.breast_option == "Y") {
    	$("#substitute div").show();
    	$("#substitute #white_meat").attr("checked",false);
    }
    else {
    	$("#substitute").hide();
    }
    
    if (menu.extra_option == "Y") {
    	var exOpt = getOptionsByCode(G_options, menu.extra_code);
    	if (exOpt) {
    		$("#extra_order label").html(exOpt.name);
    		$("#extra_meat").val(exOpt.price);
    		$("#extra_order div.extra_yes").show();
    		$("#extra_order div.extra_no").hide();
    	}
    }
    else {
    	$("#extra_order div.extra_no").show();
    	$("#extra_order div.extra_yes").hide();
    	
    }
    
	$('input#special_instruction').each(function(){
		this.value = this.defaultValue;
	});
	
    $("#special_area div").show();
    
    
    $("#option_container label").each(function(){
    	var price = $(this).prev().val();
    	if (price > 0) {
    		$(this).siblings("span").remove();
    		$(this).after("<span>&nbsp;(+$"+price.toString(2)+")</span>");
    	}
    });
    
    set_total_price(menu, '#menu_container');
}
function showTypeOfRice() {
	$("#rice_type").show();
	$("#rice_type div").show();
	$("#rice_type #rice1").attr("checked",true);
}
function showHowSpicy() {
	$("#how_spicy").show();
	$("#how_spicy div").show();
	$("#how_spicy #regular").attr("checked",true);
}

function getOptionsByCode(options, code) {
	for (var i in options) {
		if (options[i].code == code) {
			return options[i];
		}
	}
	return false;
}



function show_combination_table() {
	$('.order_summary').hide();
	$('.menu_photo').html("<table id='combination_table'></table>").show();
	for (var i in G_menu) {
		if (G_menu[i].combination == "Y") {
			var html = "<tr><td width='30' align='center' class='combo'><input type='checkbox' id='combo" + G_menu[i].id + "' value='" + G_menu[i].short_name + "'></td>";
			html += "<td><label for='combo" + G_menu[i].id + "'>" + G_menu[i].name + "</label>";
			if (G_menu[i].spicy_option == "Y") {
				html += "<span class='spicy' style='float:right; font-weight:normal'><input type='checkbox' id='spicy" + G_menu[i].id + "' value='spicy'>";
				html += "<label for='spicy" + G_menu[i].id + "'>Spicy</label></span>";
			}
			html += "</td></tr>";
			$("#combination_table").append(html);
		}
	}
	$("#combination_table .spicy input").attr("disabled",true);
	$("#combination_table").css("width","100%");
	$("#combination_table tr").css("height","30px");
	$("#combination_table td").css("padding","10px");
	$("#combination_table tr:even").addClass("even_bg");
    $("#combination_table tr:odd").addClass("odd_bg");
    
    var defalt_name = $(".menu_name").html();
    var defalt_price = $(".menu_price").html();
    
    $("#combination_table .combo input").change(function(){
		var len = $(".combo input:checked").length;
		if (len > 2) {
			$(this).attr("checked",false);
		}
		else if (len == 2) {
			set_combo_name_price();
		}
		else {
			$(".menu_name").html(defalt_name);
			$(".menu_price").html(defalt_price);
			$('.order_summary').hide();
		}
		
    	var id = $(this).attr("id").replace("combo","spicy");
    	if ($(this).is(":checked")) {
    		$("#"+id).attr("disabled",false);
    	}
    	else {
    		$("#"+id).attr("disabled",true);
    		$("#"+id).attr("checked",false);
    	}
    });
    
    $("#combination_table .spicy input").change(function(){
    	check_combo_done();
    });
    
}

function check_combo_done() {
	var len = $(".combo input:checked").length;
	if (len == 2) {
		set_combo_name_price();
	}
}

function set_combo_name_price(){
	var combo = making_combo_name($(".combo input:checked"));
	$(".menu_name").html(combo.name);
	$(".menu_price").html("$"+combo.price.toFixed(2));
	$("#unit_price").html("$"+combo.price.toFixed(2));
	G_menu[G_menu_id].name = combo.name;
	G_menu[G_menu_id].price = combo.price;
	set_total_price(G_menu[G_menu_id], '#menu_container');
	set_total_price(G_menu[G_menu_id], '#menu_item_container');
	$('.order_summary').show();
}

function making_combo_name($obj) {
	var price = 9.49;
	var name = Array();
	var i=0;
	$obj.each(function(){
		var id = $(this).attr("id").replace("combo","spicy");
		if ($("#"+id).attr("checked") == true) {
			name[i] = "Spicy ";
			price += 0.5;
		}
		else name[i] = "";
		name[i] += $(this).val();
		if ($(this).val() == "Chicken") {
			price -= 1;
		}
		else if ($(this).val() == "Gyoza") {
			price -= 0.5;
		}
		i++;
	});
	var combo = {};
	combo.name = name.join(" + ");
	combo.price = price;
	//alert(price);
	return combo;
}

function get_open_now() {
    $.ajax({
        type: "POST",
        url: "../common/Store.php",
        data: "action=get_open_now&store=1",
        success: function(res){
            eval(res);
            G_store_open = result;
        }
    });
}



