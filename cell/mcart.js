function create_cart_view(cart){
    var html = "<div class='cart'>"
        + "<div class='cart_label'>"
        + "<span style='float:right; padding:0 3%;'><img src='../common/img/small_x.png'></span>"
        + "<span style='float:right; width:18%; text-align:right;'>Price</span>"
        + "<span style='float:right; width:6%'>Qty</span>"
        + "<span style='width:60%;'>Name</span>"
        + "</div>";
    for (var i in cart){
        html += "<div class='cart_item' id='cart_item" + i + "'>"
            + "<div style='padding: 5px 0;'>"
                + "<span onclick='delete_order_item(" + i + ")' style='float:right; padding:0 3%;'><img src='../common/img/small_x.png'></span>"
                + "<span style='float:right; width:18%; text-align:right;'>$" + cart[i].subtotal + "</span>"
                + "<span style='float:right; width:6%; text-align:center;'>" + cart[i].qty + "</span>"
                + "<span style='width:60%; padding-left:3%; line-height: 120%;'>" + cart[i].menu_name + "</span>"
            + "</div>";
        for (var j=0; j<cart[i].option.length; j++){
            html += "<div class='cart_item_option'>"
                + "<span>" + cart[i].option[j].abbr + " " + cart[i].option[j].name
                + "<span style='padding-left:10px;'> ($" + cart[i].option[j].price + ")</span>"
                + "</div>";
        }
        if (cart[i].special_instruction){
            html += "<div class='cart_item_special'>"
                + cart[i].special_instruction + "</div>";
        }
        html += "</div>";
    }
    html += "</div>";
    $('#main_container').html(html);
    
    var html = "<div id='order_cart' class='sum_container'>"
        + "<div class='sum_item'><span class='sum_title'>Subtotal : </span><span id='subtotal' class='sum_data'></span></div>"
        + "<div class='sum_item'><span class='sum_title'>Tax : </span><span id='tax' class='sum_data'></span></div>"
        + "<div class='sum_item sum_last_item'><span class='sum_title'>Total : </span>"
        + "<span id='total' class='sum_data'></span></div>"
        + "</div>";
    $('#main_container').append(html);
    
    set_summary_total();
    
    /*
    var html = "<ul class='order_type'>"
        + "<li><input type='radio' name='order_type' value='P' checked /><span>Pick-up</span></li>"
        + "<li><input type='radio' name='order_type' value='H' /><span>For Here</span></li>"
        + "<li><input type='radio' name='order_type' value='D' disabled /><span>Delivery</span></li>"
        + "</ul>";
    $('#main_container').append(html);
    */
    
    var html = "<div class='button_container'>"
        + "<button id='checkout' class='main'>Checkout</button>"
        + "<button id='back_to_menu'>Back to Menu List</button>"
        + "</div>";
    $('#main_container').append(html);
    
    $('#back_to_menu').click(function(){
        location.replace('mstore.php');
    });
    
    $('#checkout').click(function(){
        if (ss_userid) {
            location.href = 'mcheckout.php?type=P';
        }
        else {
            location.href = "msignin.php?hr=" + encodeURI(location.href);
        }
    });
    
}

function delete_order_item(item_no) {
    $('#cart_item'+item_no).remove();
    $.cookie("order"+item_no,null);
    set_summary_total();
}


function create_header(menu){
    var html = "<div class='store_name'>" + G_store.name + "</div>";
    $('#header').html(html);
}

function init() {
    $(document).ready(function() {
        document.title = "Orders - " + G_store.name;
        create_header(G_store.name, "Orders", 'H', 'B');
        var cart_items = get_cookie_orders();
        create_cart_view(cart_items);
    });
}

window.onload = init;
