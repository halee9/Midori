function create_store_info(store){
    var html = "<div>"
        + "<li><span class='field'>Name</span><span class='data'>" + store.name + "</span></li>"
        + "<li><span class='field'>Address</span><span class='data'>" + store.address + "</br>" + store.city + ", " + store.state + " " + store.zip + "</br>"
        + "<a href='http://maps.google.com/maps?q=1120+howell+st,+seattle&hl=en&ll=47.61694,-122.331519&spn=0.009633,0.014226&sll=47.603123,-122.15111&sspn=0.009636,0.014226&vpsrc=6&z=16' target='_blank'>Map It</a></span></li>"
        + "<li><span class='field'>Phone</span><span class='data'><a href='tel:" + store.phone + "'>" + format_phone_number(store.phone) + "</a></span></li>"
        + "<li><span class='field'>Fax</span><span class='data'>" + format_phone_number(store.fax) + "</span></li>"
        + "<li><span class='field'>E-mail</span><span class='data'>" + store.email + "</span></li>"
        + "</div>";
    $('#main_container').append(html);
}

function init() {
    $(document).ready(function() {
        create_header(G_store.name, "Store Info", 'H', 'C');
        create_store_info(G_store);
    });
}

window.onload = init;
