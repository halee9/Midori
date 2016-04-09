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
        html = "<a href='mordersheet.php?order=" + order[i].id + "'>"
        		+ "<li>"
            + "<span class='price'>$" + order[i].total + "</span>"
            + "<span class='date'>" + format_time_db(order[i].dateCreated).date_small + "</span>"
            + "<span class='name' style='width:53%;'>" + order[i].items[first].name + more + "</span>"
            + "</li></a>";
        if (direction == "asc") {
        	$('#order_history #history_body').prepend(html);
        }
        else {
        	$('#order_history #history_body').append(html);
        }
        //alert(i + " " + order[i].id);
        G_last_order_no = order[i].id;
    }
    G_history_displayed = true;
    if (order_count < G_display_count) G_history_displayed = false;



    //var wid = ($(window).width() - 160) + "px";
    //$('span.name').css('width',wid);
    /*
    $('#back_to_menu').click(function(){
        location.replace('mstore.php');
    });
    
    $('#signout').click(function(){
        //location.href = 'mcheckout.php?type=P';
    });
    */
}

function create_order_sheet(order){
    var html = "<div style='font-weight:bold; font-size:20px; text-align: center; clear:both; line-height:200%'>"
        + "<div style='font-weight:bold; font-size:20px;'>Your Orders are NOW</div>"
        + "<div style='font-size: 30px; line-height:200%;'>" + G_order_status[order.status].name + ".</div>"
        + "</div>";
    $('#main_container').append(html);
    
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
        for (var j=0; j<order.items[i].options.length; j++){
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
    $('#main_container').append(html);
    
    var html = "<div class='sum_container'>"
        + "<div class='sum_item'><span class='sum_title'>Subtotal : </span><span id='subtotal' class='sum_data'>$" + order.subtotal + "</span></div>"
        + "<div class='sum_item'><span class='sum_title'>Tax : </span><span id='tax' class='sum_data'>$" + order.tax + "</span></div>"
        + "<div class='sum_item' style='color:red; border-top: 1px solid #aaa;'><span class='sum_title'>Total : </span>"
        + "<span id='total' class='sum_data'>$" + order.total + "</span></div>"
        + "</div>";
    $('#main_container').append(html);
    $('.sum_item').css('margin-right','0px');
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

function init() {
    $(document).ready(function() {
        create_header(G_store.name, "My Page", "H", "C");
        var html = "<div id='user_info'></div>"
            + "<div id='order_history'></div>";
        $('#main_container').html(html);
        
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

        /*
        $(window).scroll(function(e){
            if (G_history_displayed == true) {
                if($(document).height() < $(window).scrollTop() + $(window).height() + 5){
                    G_history_displayed = false;
                    get_order_history(ss_userid, G_display_count, G_last_order_no);
                    //alert($(document).height() + " : " + $(window).scrollTop() + " : " + $(window).height());
                }
            }
        });
        
        $(window).bind("touchmove", function(e) {
            if (G_history_displayed == true) {
                if($(document).height() < $(window).scrollTop() + $(window).height() + 100){
                    G_history_displayed = false;
                    get_order_history(ss_userid, G_display_count, G_last_order_no);
                    //alert($(document).height() + " : " + $(window).scrollTop() + " : " + $(window).height());
                }
            }
        });
        */
    });
}

window.onload = init;
