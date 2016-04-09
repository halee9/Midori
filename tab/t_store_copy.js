
function create_menu(menugroup, menu){
    var row_no=0;
    var menu_no=0;
    for (var k in menugroup) {
        var html = "<div class='menugroup_container'><div style='padding: 0 10px;'>" + menugroup[k].name + "</div></div>";
        $('#main_container').append(html);
        var str = String(menugroup[k].menus);
        var menu_ids = str.split(",");
        var cnt = 0; var row_cnt = 0;
        for (var x=0;x < menu_ids.length; x++) {
            menu_no++;
            if ((cnt%2) == 0) {
                row_no++;
                row_cnt++;
                $('#main_container').append("<div class='menu_container_row' id='row"+row_no+"'></div>");
                if ((row_cnt%2) == 0) {
                    $('#row'+row_no).css("background-color","#ddd");
                }
                else {
                    $('#row'+row_no).css("background-color","#eee");
                }
            }
            if ((cnt%4) == 0 || (cnt%4) == 3) {
                $('#menu_container').css("background-color","#ddd");
            }
            else {
                $('#menu_container').css("background-color","#eee");
            }
            var i = menu_ids[x];
            $('#menu_container .hidden_id').val(menu[i].id);
            $('#menu_container .menu_name').html(menu[i].name);
            $('#menu_container .menu_price').html("$"+menu[i].price);
            $('#menu_container .menu_description').html(menu[i].description);
			if (menu[i].pic != '') {
				var path = "menupic/" + menu[i].pic;
				//var photo = "<img src='http://www.teriyakionline.com/dev/common/getthumb.php?path=" + path + "&amp;size=100'>";
				var photo = "<img src='../common/getthumb.php?path=" + path + "&amp;size=100'>";
                $('#menu_container .menu_photo').html(photo).show();
			}
            $('#menu_container').clone().appendTo('#main_container #row'+row_no).attr("id","menu_container"+menu_no).show();
            /*
            if ((cnt%2) == 1) {
                var left_h = $('#menu_container'+(menu_no-1)).height();
                var right_h = $('#menu_container'+(menu_no)).height();
                if (left_h < right_h) {
                    alert(left_h+" "+right_h);
                    $('#menu_container'+(menu_no-1)).height(right_h);
                }
                else {
                    $('#menu_container'+(menu_no)).height(left_h);
                }
            }
            */
            cnt++;
        }
    }
    
	$('.menutag_container').click(function(){
		var h_id = $(this).children('.hidden_id').val();
        location.href = "t_menu.php?id="+h_id;
	});

}

function init() {
    $(document).ready(function() {
        document.title = G_store.name;
        create_header(G_store.name);
        create_menu(G_menugroup, G_menu);
        //create_footer();
    });
}

window.onload = init;
