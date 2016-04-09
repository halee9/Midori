function create_menu(menu){
    var win_w = $(window).width();
    var html = "<div>"
    	+ "<li style='background-color:#ddd;'><span class='price'>$" + menu.price + "</span><span class='name'>" + menu.name + "</span></li>"
    	+ "<div class='image_container' style='text-align:center;'></div>"
        + "<div style='padding:10px;'>" + menu.description + "</div>"
        + "</div>";
        
    $('#main_container').html(html);
    set_photo(menu);
    
    var supportsOrientationChange = "onorientationchange" in window,
	orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function() {
	//alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
	set_photo(menu);
    }, false);

    var html = "<div id='add_order' style='padding: 10px'></div>";
    $('#main_container').append(html);
    
    var qty_html = "<select id='menu_qty' style='font-size:16px;'>";
    for (var j=0; j < 5; j++) {
            qty_html += "<option value=" + (j+1) + ">" + (j+1) + "</option>"
    }
    qty_html += "</select>";
    var html = "<div class='order_type_name'><span style='width:70px'>Quantity: </span>"
        + "<span style='font-size:20px; margin-right:20px;'>" + qty_html + "</span>"
        + "<span class='text_box' id='show_options'></span></div>";
    $('#add_order').append(html);
    var html = "<div id='option_container'></div>";
    $('#add_order').append(html);
    var show_me = "View Options";
    var close_me = "Hide Options";
    $('#show_options').html(show_me);
    $('#option_container').hide();
    
    $('#show_options').click(function(){
        if ($('#option_container').is(":visible")) {
            $('#option_container').hide();
            $('#show_options').html(show_me);
        }
        else {
            $('#option_container').show();
            $('#show_options').html(close_me);
        }
    });

    var options = rearrange_options(menu.options, G_options, G_option_type);
    
    for (var i=0; i<options.length; i++) {
        var html = "<div class='order_type_name'>" + options[i].type_name + "</div>";
        if (options[i].choice_type == 'Single') var single_class = " class='sameclass" + i + "'";
        else var single_class = "";
        for (var j=0; j<options[i].items.length; j++) {
            html += "<div class='order_elements'>"
                + "<span><input id='hidden_option_name' type='hidden' value='" + options[i].items[j].id + "'><input type='checkbox'" + single_class + " value=" + options[i].items[j].price + "></span>"
                + "<span style='padding-left:5px'>" +options[i].items[j].name + "</span>"
                + "<span style='padding-left:5px; color:red;'>(+ $" + options[i].items[j].price + ")</span>"
                + "</div>";
        }
        $('#option_container').append(html);
    }
    var html = "<div class='order_type_name'>Special Instructions</div>"
            + "<div class='order_elements' style='padding-top:10px; text-align:right;'>"
            + "<textarea id='special_instruction' style='overflow:auto; width: 100%; height: 60px; font-size:16px;'>Write Your Special Instructions...</textarea>"
            + "<span style='font-size:12px;'> * Additional charges may apply.</span></div>";
    $('#option_container').append(html);
    
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

    var html = "<div class='sum_container'>"
        + "<div class='sum_item'><span class='sum_title'>Subtotal : </span><span id='subtotal' class='sum_data'></span></div>"
        + "<div class='sum_item'><span class='sum_title'>Tax : </span><span id='tax' class='sum_data'></span></div>"
        + "<div class='sum_item sum_last_item'><span class='sum_title'>Total : </span><span id='total' class='sum_data'></span></div>"
        + "</div>";
    $('#add_order').append(html);
    
    recalcurating_price(menu);
    
    $('.order_elements input:checkbox').click(function(){
        var sameclass = $(this).attr('className');
        if (sameclass) {
                $('.'+sameclass).filter(':checked').not(this).removeAttr('checked');
        }
    });
    $('#add_order #special_instruction').change(function(){
        recalcurating_price(menu);
    });
    $('#add_order input').change(function(){
        recalcurating_price(menu);
    });
    $('#add_order select').change(function(){
        recalcurating_price(menu);
    });

    var html = "<div class='button_container'>"
        + "<div><button id='put_order_list' class='main'>Add Order</button></div>"
        + "<div><button id='back_to_menu'>Back to Menu List</button></div>"
        + "</div>";
    $('#add_order').append(html);
    
    $('#back_to_menu').click(function(){
        history.go(-1);
    });
    
    $('#put_order_list').click(function(){
        var order = recalcurating_price(menu);
        set_cookie_order(order);
        location.href = "mcart.php";
    });
}

function set_photo(menu){
    if (menu.pic) {
	var win_w = $(window).width();
	var html = "<img src='../common/getthumb.php?path=menupic/" +  menu.pic + "&amp;size=" + win_w + "' style='text-align:center'>";
	$('.image_container').html(html);
    }
}

function init() {
    $(document).ready(function() {
	var menu = G_menu[G_menu_id];
        document.title = menu.name + " - " + G_store.name;
        create_header(G_store.name, 'Menu', 'H', 'C');
        create_menu(menu);
    });
}

window.onload = init;
