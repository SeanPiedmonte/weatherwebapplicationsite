//getZip();
var latval = "";
var lonval = "";
const latLong = new Array();
function getZip() {
	var code = $("#zipcode").val();
	
	a=$.ajax({
		url: 'https://api.clearllc.com/api/v2/miamidb/_table/zipcode?',
		method: "GET",
		data: {
			"api_key": "bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818",
			"ids": code
		}
	}).done(function(data) {
		resData="";
		for (const prop in data.resource[0]) {
			resData += prop + ": " + data.resource[0][prop] + ", ";
		}
		$("#zipdata").html(resData);
		console.log(data);
	}).fail(function(error) {
		console.log(error);
	});
}
var zipcode;
function getCoordinate() {
	zipcode = $("zipcode").val();
	
		a=$.ajax({
		url: 'https://api.clearllc.com/api/v2/miamidb/_table/zipcode?',
		method: "GET",
		data: {
			"api_key": "bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818",
			"ids": zipcode
		}
	}).done(function(data) {
		latval = data.resource[0].latitude;
		lonval = data.resource[0].longitude;
		//console.log(data.resource[0]);
		latLong[0] = latval;
		latLong[1] = lonval;
		return latLong;
	}).fail(function(error) {
		console.log(error);
	});
}
const latLongData = getCoordinate();

function toFhr(temp) {
	return Math.round((temp-273.15) * 9/5 + 32);
}

//position represents a day that we want to get from the current day
function getDay(position) {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var date = "";
	if (day >= 28 && month == 2) {
		date = year + "-" + month+1 + "-" + position;
	} else if (day >= 30 && (month == 4 || month == 6 || month == 9 || month == 11)) {
		date = year + "-" + (month+1) + "-" + position;
	} else if (day >= 31 && month == 12) {		
		date = (year+1) + "-" + "1" + "-" + postion;
	} else if (day >= 31 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10)) {
		date = year + "-" + (month+1) + "-" + postion;
	} else {
		date = year + "-" + month + "-" + (day+position);
	}
	return date;
}

const setTempArr = new Array();
zipcode = $("#zipcode").val();
function getForecast() {
	a=$.ajax({
		url: 'https://api.openweathermap.org/data/2.5/onecall?',
		method: "GET",
		data: {
			//lat:"33.441792",
			//lon:"-94.037689",
			lat: latLong[0],
			lon: latLong[1],
			exclude:'hourly',
			appid:'b60fd5e075f94db9cbcf7312224386ee'
		}
	}).done(function(data) {
		setTempArr[0] = zipcode;
		setTempArr[1] = getDay(0);
		setTempArr[2] = data.daily[0].temp.max;
		setTempArr[3] = data.daily[0].temp.min;
		setTempArr[4] = data.daily[0].weather[0].main;
		for (i=0;i < 7;i++) {
			var src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";
			$("#forecasts").append("<tr class='d-flex'><td class='col-1'>" + getDay(i) + "<td class='col-1'>" + toFhr(data.daily[i].temp.max) + "</td><td class='col-1'>" + toFhr(data.daily[i].temp.min) + "</td><td class='col-1'>" + toFhr(data.daily[i].temp.day) + "</td><td class='col-1'>" + toFhr(data.daily[i].temp.night) + "</td><td class='col-1'>" + data.daily[i].wind_speed + "</td><td class='col-1'>" + data.daily[i].weather[0].main + " " + "<img src = " + src + ">" + "</td><td class='col-1'>" + data.daily[i].humidity + "</td></tr>"); 
		}
		console.log(data);
		storeData();
	}).fail(function(error) {
		console.log(error);
	});
}

function storeData() {
	a=$.ajax({
		url: "https://piedmosp.aws.csi.miamioh.edu/final/final.php?",
		method: "setTemp",
		data: {
			location: setTempArr[0],
			date: setTempArr[1],
			Low: setTempArr[2],
			High: setTempArr[3],
			Forecast: setTempArr[4]
		}
	}).done(function(data) {
		console.log(setTempArr);
	}).fail(function(error) {
		console.log(error);
	});
}

function getData() {
	var date = $('#date').val();
	var sort = $('#sort').val();
	a=$.ajax({
		url: "https://piedmosp.aws.csi.miamioh.edu/final/final.php",
		method: "getTemp",
		data: {
			date: date,
			sort: sort
		}
	}).done(function(data) {
		//$('#getdata').append("<tr class='d-flex'>" + data.message[0] + 
		console.log(data);
	}).fail(function(error) {
		console.log(error);
	});
}
/*$(document).ready(function() {
	var button = document.getElementById("zipbutton");
	if (button.addEventListener)
		button.addEventListener("click", getZip, false);
	else if (button.attachEvent)
		button.attachEvent('onclick', getZip);
}*/