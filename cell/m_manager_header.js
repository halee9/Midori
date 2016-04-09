window.addEventListener("load",function(){ 
    setTimeout(scrollTo,0,0,1); 
    },false); 

function create_header(store_name, title_name){
    var html = "<div class='message'></div>";
    $('body').prepend(html);
    $('.message').hide();
 
    var html = "<div class='header_title' style='float:left; padding: 10px;'>" + store_name + " - " + title_name + "</div>"
            + "<div class='clock' style='float:right;padding:10px;'></div>"; 
    $('#header').html(html);
    
    var d = new Date
    $('.clock').text(format_datetime(d).time+" "+format_datetime(d).date);
    setInterval(function() {
        var d = new Date
        $('.clock').text(format_datetime(d).time+" "+format_datetime(d).date);
    }, 1000);
    
    //---------- footer --------------
    
    var html = "<div class='button_container'></div>";
    $('#footer').html(html);
    
    var html = "<button id='signin_button'>Sign In</button>"
        + "<button id='mypage_button'>My Page</button>"
        + "<button id='info_button'>Store Info</button>";
    $('#footer .button_container').append(html);
    $('#footer #mypage_button').hide();

    if (ss_userid) {
        $('.button_container button#signin_button').html('Sign Out');
        $('.button_container button#signin_button').attr('id','signout_button');
        $('#mypage_button').show();
    }
    
    $('#signout_button').click(function() {
        $.ajax({
            type: "POST",
            url: "User.php",
            data: "action=signout",
            success: function(res){
                ss_userid = "";
                ss_username = "";
                ss_userphone = "";
                ss_useremail = "";
                $('.message').html("You have signed out.").show();
                setTimeout("$('.message').hide(); location.href = 'mstore.php';",3000);
            }
        });
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



