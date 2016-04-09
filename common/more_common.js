var G_order_status = { 
		"X" : { name : "Canceled",
				color : "#aaa" },
		"P" : { name : "Placed",
				color : "#ffff99" },
		"T" : { name : "Taken",
				color : "#ffcc66" },
		"R" : { name : "Ready",
				color : "#99ff99" },
		"D" : { name : "Done",
				color : "#aaa" }
};

function set_holy_grail(left_width, right_width) {
	$('.hg_container').css('padding-left',left_width);
	$('.hg_container').css('padding-right',right_width);
	$('.hg_left').css('width',left_width);
	$('.hg_left').css('right',left_width);
	$('.hg_right').css('width',right_width);
	$('.hg_right').css('margin-right','-'+right_width);
}

function check_order_json(json) {
	var indexes = Object.keys(json);
	if (parseInt(indexes[0]) > parseInt(indexes[indexes.length-1])) {
		return "desc";
	}
	else {
		return "asc";
	}
}

function redirect(loc, mode) {
	var ts = new Date().getTime();
	if (loc.indexOf("?") > 0) {
		var tail = "&v=" + ts;
	}
	else {
		var tail = "?v=" + ts;
	}
	if (mode == "rep") {
		window.location.replace(loc+tail);
	}
	else {
		window.location.href = loc+tail;
	}
}

function getPosition(who){
    var T= 0,L= 0;
    while(who){
        L+= who.offsetLeft;
        T+= who.offsetTop;
        who= who.offsetParent;
    }
    return [L,T];    
}

function format_phone_number(phone) {
	return phone.substr(0,3) + "-" + phone.substr(3,3) + "-" + phone.substr(6,4);
}

function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function format_datetime(d) {
	var month = d.getMonth()+1;
	var dd = d.getDate();
	var year = d.getFullYear();
	
	var hh = (d.getHours()>12) ? d.getHours()-12 : d.getHours();
	var ampm = (d.getHours()<12) ? 'AM' : 'PM';
	var mm = d.getMinutes();
	var mm = (mm < 10) ? '0'+mm : mm;
	var ss = d.getSeconds();
	var ss = (ss < 10) ? '0'+ss : ss;
	
	var datetime = {};
	datetime.date = month + "/" + dd + "/" + year;
	datetime.time = hh + ":" + mm + ":" + ss + " " + ampm;
	datetime.yyyymmdd = year.toString() + mm.toString() + dd.toString();
	return datetime;
}

function format_time(d) {
	var hh = (d.getHours()>12) ? d.getHours()-12 : d.getHours();
	var ampm = (d.getHours()<12) ? 'AM' : 'PM';
	var mm = d.getMinutes();
	var mm = (mm < 10) ? '0'+mm : mm;
	return pickup_time = hh + ":" + mm + " " + ampm;
}

function format_time_db(d) {
	var yy = d.substr(0,4);
	var yy_2 = d.substr(2,2);
	var mm = d.substr(5,2);
	var dd = d.substr(8,2);
	var hh = d.substr(11,2);
	var bb = d.substr(14,2);
	if (hh >= 12) {
		var ampm = 'PM';
		if (hh > 12) hh -= 12;
	}
	else var ampm = 'AM'
	var dateformat = {};
	dateformat.date = mm + "/" + dd + "/" + yy;
	dateformat.date_small = mm + "/" + dd + "/" + yy_2;
	dateformat.time = hh + ":" + bb + " " + ampm;
	return dateformat;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
