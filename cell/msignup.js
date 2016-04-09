function check_signup_form() {
    var re_name = /^[a-zA-Z0-9_-]{1,16}$/;
    var re_pass = /^[a-zA-Z0-9_-]{5,16}$/;
    var re_mail = /^([\w\.-]+)@([a-z\d\.-]+)\.([a-z\.]{2,6})$/;
    var re_url = /^(https?:\/\/)?([a-z\d\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
    var re_phone = /^[0-9]{10,10}$/;
    var status = true;
    var err_msg = "Please check the field.";
    $('.message').html("");
    
    if (re_pass.test($('#password').val()) != true) {
        $('#password_msg').html(err_msg);
        $('#password').focus();
        status = false;
    }
    if (re_mail.test($('#email').val()) != true) {
        $('#email_msg').html(err_msg);
        $('#email').focus();
        status = false;
    }
    if (re_phone.test($('#phone').val()) != true) {
        $('#phone_msg').html(err_msg);
        $('#phone').focus();
        status = false;
    }
    if (re_name.test($('#last_name').val()) != true) {
        $('#last_name_msg').html(err_msg);
        $('#last_name').focus();
        status = false;
    }
    if (re_name.test($('#first_name').val()) != true) {
        $('#first_name_msg').html(err_msg);
        $('#first_name').focus();
        status = false;
    }
    return status;
}


function create_signup (){
    var html = "<div class='signup_container'><form id='signup_form'>"
        + "<div class='title'>First Name : </div>"
        + "<div><input type='text' id='first_name' name='first_name'></div>" 
        + "<div id='first_name_msg' class='message'></div>"
        + "<div class='title'>Last Name : </div>"
        + "<div><input type='text' id='last_name' name='last_name'></div>" 
        + "<div id='last_name_msg' class='message'></div>"
        + "<div class='title'>Phone Number : </div>"
        + "<div><input type='text' id='phone' name='phone'></div>" 
        + "<div id='phone_msg' class='message'></div>"
        + "<div class='title'>E-mail Address : </div>"
        + "<div><input type='text' id='email' name='email'></div>" 
        + "<div id='email_msg' class='message'></div>"
        + "<div class='title'>Password : </div>"
        + "<div><input type='password' id='password' name='password'></div>" 
        + "<div id='password_msg' class='message'></div>"
        + "<div class='button_container'>"
        + "<button id='cancel'>Cancel</button>"
        + "<button type='submit' id='signup'>Sign Me Up</button>"
        + "<div>"
        + "</form></div>";

    $('#main_container').html(html);
    
    $('#phone').keydown(function(event){
        if (event.keyCode == 109 || event.keyCode == 189) {
            return false;
        }
    });
    
    $('#cancel').click(function(){
        history.go(-1);
    });
    
    $('#signup_form').submit(function(){
        if (check_signup_form() == false) return false;
        $('#signup').attr("disabled","true");
        var data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "User.php",
            data: "action=signup&" + data,
            success: function(res){
                eval(res);
                if (result == 0) {
                    $('#email_msg').html('Your email is already signed up. Check your email or try another email please.');
                    $('#email').focus();
                    //return false;
                }
                else {
                    var html = "<div>Thank you for signing up teriyakionline. </br>You've been signed up now.</div>"
                        + "<div><button id='ok'>Go to Sign In Page</button></div>";
                    $('.button_container').html(html);
                    $('#ok').click(function(){
                        location.replace('msignin.php');
                    });
                    //return false;
                }
            }
        });
        return false;
    });

}

function init() {
    $(document).ready(function() {
        create_header(G_store.name, "Sign Up", 'H', 'C');
        create_signup();
    });
}

window.onload = init;
