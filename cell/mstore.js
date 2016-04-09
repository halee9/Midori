
function create_menu(){
    var html = "";
        
    for (var k in G_menugroup) {
        html += "<div class='group_name'>" + G_menugroup[k].name + "</div>";
        var menu_ids = G_menugroup[k].menus.split(",");
        G_menugroup[k].menus = menu_ids;
        html += "<ul class='menu'>";
        for (var x=0;x < menu_ids.length; x++) {
            var i = menu_ids[x];
            html += "<a href='mmenu.php?id=" + G_menu[i].id + "'>"
                + "<li>"
                + "<span class='price' style='width:17%; float:right; padding-right:3%;'>$" + G_menu[i].price + "</span>"
                + "<span class='name' style='width:77%; padding-left:3%;'>" + G_menu[i].name + "</span>"
                + "</li>"
                + "</a>";
        }
        html += "</ul>";
        
    }
    $('#main_container').html(html);
    
    //$('a').click( function() { location.href = $( this ).attr( "href" ); return false; });
    $("a").click(function (event) {
    	//alert("a");
    	event.preventDefault();
    	window.location = $(this).attr("href");
	});
	
    $('#main_container a').click(function(){
       $(this).css('background-color','#aaa'); 
    });
}

function init() {
    $(document).ready(function() {
        document.title = G_store.name;
        create_header(G_store.name, 'Teriyaki Online', 'I', 'C');
        create_menu();
    });
}

window.onload = init;
