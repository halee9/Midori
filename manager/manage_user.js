var Store_id = 1;

function get_users_info(store) {
    $.ajax({
        type: "POST",
        url: "../common/User.php",
        data: "action=select_all&store=" + store,
        dataType: "json",
        success: function(users){
        	for (var i in users) {
	        	//alert(users[i].first_name);
	        	var html = "<tr>"
	        			 + "<td>" + users[i].id + "</td>"
	        			 + "<td>" + users[i].first_name + "</td>"
	        			 + "<td>" + users[i].last_name + "</td>"
	        			 + "<td>" + users[i].phone + "</td>"
	        			 + "<td>" + users[i].carrier + "</td>"
	        			 + "<td>" + users[i].email + "</td>"
	        			 + "<td>" + users[i].type + "</td>"
	        			 + "<td>" + users[i].point_accumulated + "</td>"
	        			 + "<td>" + users[i].point_used + "</td>"
	        			 + "<td>" + users[i].point_usable + "</td>"
	        			 + "</tr>";
	        	$("#user_list").append(html);
	        	$("#main_container").show();
        	}
        }
    });
}



function init() {
    $(document).ready(function() {
	    get_users_info(Store_id);
    });
}

window.onload = init;
