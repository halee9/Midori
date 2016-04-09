/*
window.addEventListener("load",function(){ 
    setTimeout(scrollTo,0,0,1); 
    },false); 
*/

function create_header(top_title, main_title, left_link_page, right_link_page){

    if (ss_username) {
    	$("#user_name").html(ss_username);
    	$("#user_container").show();
    	$("#signout_button").show();
    	$("#mypage_button").show();
    	$("#info_button").show();
    	$("#user_name").click(function(){
    		location.href = "mmypage.php";
    	});
    }
    else {
    	$("#signin_button").show();
    	$("#info_button").show();
    }
    
    $("#header .center").html(main_title);
    
    var page = {
        'H' : { name : 'Home' , id : 'home_button' , link : 'mstore.php' } ,
        'I' : { name : 'Info' , id : 'info_button' , link : 'mstoreinfo.php' } ,
        'C' : { name : 'Cart' , id : 'cart_button' , link : 'mcart.php' } ,
        'SI' : { name : 'Sign In' , id : 'signin_button' , link : 'msignin.php' } ,
        'SO' : { name : 'Sign Out' , id : 'signout_button' , link : 'msignin.php' } ,
        'MP' : { name : 'My Page' , id : 'mypage_button' , link : 'mmypage.php' } ,
        'B' : { name : 'Back' , id : 'back_button' , link : 'mmypage.php' }
    }
    
    //var html = "<div class='header_title'>" + top_title + "</div>"
    //    + "<div class='header_button_container'></div>";
    if (left_link_page) {
        var p = page[left_link_page];
        $('#header .left_button').html(p.name);
        $('#header .left_button').attr('id',p.id);
    }
    if (right_link_page) {
        var p = page[right_link_page];
        $('#header .right_button').html(p.name);
        $('#header .right_button').attr('id',p.id);
    }
    
    if ($('#header .right_button').attr('id') == 'cart_button') {
        var order_total = recalc_cookie_orders_total().total;
        $('#header .right_button').html("$"+order_total.toFixed(2));
    }
    
    //---------- footer --------------
    
    $('#signout_button').click(function() {
    	logging_out("cell");
    });
    

    $('#home_button').click(function() {
        location.href = "mstore.php";
    });
    
    $('#info_button').click(function() {
        location.href = "mstoreinfo.php";
    });
    
    $('#cart_button').click(function() {
        location.href = "mcart.php";
    });
    
    $('#signin_button').click(function() {
        location.href = "msignin.php?hr=" + encodeURI(location.href);
    });
    
    $('#mypage_button').click(function() {
        location.href = "mmypage.php";
    });
    $('#back_button').click(function() {
        history.go(-1);
    });
    
}



