function carousel(){
    setTimeout(function () {
        var iscroll = new iScroll('wrapper', {
          snap: 'li',
          momentum: false,
          hScrollbar: false,
          vScrollbar: false,
          //lockDirection: false,
          onScrollEnd: function() {
            $('#indicator li').each(function(i, node) {
              if(i === iscroll.currPageX) {
                $(node).addClass('active');
              } else {
                $(node).removeClass('active');
              }
            });
          }
        });
        //iscroll.scrollToPage(0);
        iscroll.refresh();
    },0);
}

function create_menu_info(menu){
    $('.menu_name').html(menu.name);
    $('.menu_price').html("$"+menu.price);
    if (menu.soldout == "C") {
    	show_combination_table();
    }
    else {
	    if (menu.pic != '') {
	        var photo_width = get_window_width() - 32;
	        var path = "../common/menupic/" + menu.pic;
	        var photo = "<img src='" + path + "' style='width:400px;'>";
	        $('.menu_photo').html(photo).show();
	        //$('.menu_photo img').css("width",photo_width+"px");
	    }
	}
    $('.menu_description').html(menu.description);
}


function create_order_summary(menu){
    var qty_html = "<select id='menu_qty' style='font-size:16px;'>";
    for (var j=0; j < 5; j++) {
        qty_html += "<option value=" + (j+1) + ">" + (j+1) + "</option>"
    }
    qty_html += "</select>";
    $('.qty_selector').html(qty_html);
    $("#menu_qty option:first-child").attr("selected",true);
    set_total_price(G_menu[G_menu_id], '#menu_container');

    $('#menu_container select').change(function(){
        set_total_price(G_menu[G_menu_id], '#menu_container');
    });
    
    /*
    var leftH = $(".menu_body").height();
    var rightH = $(".order_summary").height();
    if (leftH > rightH) {
    	$(".order_summary").css("height",leftH+"px");
    }
    */
}



function create_option(menu){
	reset_option_form(menu);    
    // After action 
    
    $("#side_menu input").change(function(){
    	var id = $(this).attr("id");
    	//alert(id);
    	if (id == "side1" || id == "side2" || id == "side4") {
    		showTypeOfRice();
    	}
    	else {
    		$("#rice_type").hide();
    		$("#rice_type input:checked").attr("checked",false);
    	}
    });
    
    $("#make_spicy input").change(function(){
		var id = $(this).attr("id");
		if (id == "spicy_y") {
			showHowSpicy();
		}
		else {
			$("#how_spicy").hide();
			$("#how_spicy input:checked").attr("checked",false);
		}
    });
    
    $("#substitute input").change(function(){
    	if ($(this).attr("checked") == true) {
	    	//alert("checked");
	    	$("#extra_order label").html("Extra Chicken Breast");
	    	var price = "3.00";
    		$("#extra_meat").val(price);
    		$("#extra_meat").siblings("span").remove();
    		$("#extra_order label").after("<span>&nbsp;(+$"+price.toString(2)+")</span>");    	
    	}
    	else {
	    	$("#extra_order label").html("Extra Chicken");
	    	var price = "2.50";
    		$("#extra_meat").val(price);
    		$("#extra_meat").siblings("span").remove();
    		$("#extra_order label").after("<span>&nbsp;(+$"+price.toString(2)+")</span>");    	
    	}
    });
    
    $('#special_instruction')
        .focus(function(){
            if (this.value === this.defaultValue) {
                    this.value = '';
            }
        })
        .blur(function(){
            if (this.value === '') {
                    this.value = this.defaultValue;
            }
    });
    $('#option_container input').change(function(){
        set_total_price(G_menu[G_menu_id], '#menu_container');
    });
    $('#option_container #special_instruction').change(function(){
        set_total_price(G_menu[G_menu_id], '#menu_container');
    });
}


function create_menu(menu){
    create_menu_info(menu);
    create_order_summary(menu);
    if (menu.option_display == 'N') {
    	$("#option_container").hide();
    }
    create_option(menu);
    
    $("#option_button").click(function(){
    	$("#option_table").show();
    	$(this).hide();
    });
    
    //$('.order_summary').clone().appendTo('#menu_container');

    $('#back_to_menu').click(function(){
        //history.go(-1);
        //location.href = "t_store.php";
        redirect("t_store.php");
    });
    
    if (menu.soldout == "Y") {
    	$('#add_order').html("Sold Out").attr("disabled","disabled").css({ opacity: 0.5 }).css("cursor","default");
    }
    else {
	    $('#add_order').click(function(){
	        var order = set_total_price(G_menu[G_menu_id], '#menu_container');
	        set_cookie_order(order);
	        var cookie_no = is_cookie_orders();
	        var order = get_cookie_order(cookie_no);
	        set_order_cart(order, cookie_no);
	        $("#option_button").show();
	        $("#option_table").hide();
	        reset_option_form(menu);
	        
	        if (!$.browser.msie) {
		        $("#cart_row"+cookie_no).css("visibility", "hidden");
		        $(".menu_photo").effect("transfer", { to: $("#cart_row"+cookie_no) }, 500, 
		        	function() {
		        		$('#orderlist').show();
		      			$("#cart_row"+cookie_no).css("visibility", "visible");
		  			}
		  		);
		  	}
		  	else {
	        	$('#orderlist').show();
		  	}
	  		
	    });
	}

}

function set_photo(menu){
    if (menu.pic) {
	var win_w = $(window).width();
	var html = "<img src='getthumb.php?path=../common/menupic/" +  menu.pic + "&amp;size=" + win_w + "' style='text-align:center'>";
	$('.image_container').html(html);
    }
}

function reset_form($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
    
}

function init() {
    $(document).ready(function() {
        var menu = G_menu[G_menu_id];
        document.title = menu.name + " - " + G_store.name;
        create_header(G_store.name);
        create_menu(menu);
        $("#main_container").show();
		check_sidebar();
        $(window).resize(function() {
            check_sidebar();
        });
    });
}


window.onload = init;
