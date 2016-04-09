function create_order_status(order){
    for (var i in order){
        if (order[i].status != 'C') {
            create_order_sheet(order[i]);
        }
    }
    
    var html = "<div class='button_container' style='text-align:center; clear:both;'>"
        + "<button id='back_to_menu'>Back to Menu</button>"
        + "<button id='sighout' style='margin-left:10px'>Sign Out</button>"
        + "</div>";
    $('#main_container').append(html);
    
    $('#back_to_menu').click(function(){
        location.replace('mstore.php');
    });
    
    $('#signout').click(function(){
        //location.href = 'mcheckout.php?type=P';
    });
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

function init() {
    $(document).ready(function() {
        create_header(G_store.name, "Status");
        
        $.ajax({
            type: "POST",
            url: "Orders.php",
            data: "action=select&user=" + ss_userid,
            dataType: "json",
            success: function(json){
                create_order_status(json);
            }
        });
        create_footer();
    });
}

window.onload = init;
