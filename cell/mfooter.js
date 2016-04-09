function create_footer(store){
    var html = "<div class='button_container'></div>";
    $('#footer').html(html);
    
    var html = "<button id='signin'>Sign In</button>"
        + "<button id='store_info'>Store Info</button>";
    $('#footer .button_container').append(html);

    if (ss_userid) {
        $('.button_container button#signin').html('Sign Out');
        $('.button_container button#signin').attr('id','sign_out');
    }
    
    $('.button_container #signin').click(function() {
        location.href = "msignin.php?hr=" + encodeURI(location.href);
    });
    
    $('.button_container #sign_out').click(function() {
        var html = "<div class='message'></div>";
        $('body').prepend(html);
        $('.message').focus();
        /*
        $.ajax({
            type: "POST",
            url: "User.php",
            data: "action=signout",
            success: function(res){
                    ss_userid = "";
                    ss_username = "";
                    ss_userphone = "";
                    ss_useremail = "";
                    location.href = "mstore.php"
            }
        });
        */
    });
    
    
    
    
    
    $('.button_container #store_info').click(function() {
        location.href = "mstore_info.php";
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
    
    $('#signout_button').click(function() {
        location.href = "msignin.php?hr=" + encodeURI(location.href);
    });
    
    $('#mypage_button').click(function() {
        location.href = "mmypage.php";
    });

}
