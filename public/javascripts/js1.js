$(function(){
let chosenName;
let chosenTeam;
let chosenStat; 
let statPrint;
let $restartButton = $('#restart').detach();
let totalData;
let statNum;

$('#dropdown-team').change(function() {

	$('.pre-value1').remove();
	chosenTeam = $("#dropdown-team :selected").text() 	// Variable equals what was selected
	$('.currentTeam').remove()		// Remove the current options

	$.get("/teamName", chosenTeam, function(data) {
		if(!data){
			console.log("No data received");	
		}
		console.log("Received data");
		totalData = data;
		switch(chosenTeam){
			case "Bedford":
			for (let i = 0; i < data.length; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Bayswater Morley 1":
			for (let i = 0; i < data.length; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Bayswater Morley 2":
			for (let i = 0; i < data.length; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Bayswater Morley 3":
			for (let i = 0; i < data.length; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Fremantle 1":
			for (let i = 0; i < data.length; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Fremantle 2":
			for (let i = 0; i < data.length; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
		}
		})
});

$('#dropdown-name').change(function() {
	  		chosenName = $("#dropdown-name :selected").text()
	  	});


$('#dropdown-stat').change(function() {
	$('.pre-value2').remove();
	chosenStat = $("#dropdown-stat :selected").text();
	
});


$('.calculate').click(function() {

	chosenTeam = $("#dropdown-team :selected").text();
	chosenName = $("#dropdown-name :selected").text();
	chosenStat = $("#dropdown-stat :selected").val();
	statPrint =  $("#dropdown-stat :selected").text();
	

	let chosenObj = totalData.find(o => o['Name'] == chosenName);
	
	if (chosenObj[chosenStat] != "") {
		statNum = chosenObj[chosenStat];
	} else {
		statNum = 0;
	}

	let main2 = '<div class="main2"><div class="d-flex justify-content-center"><h2 id="statistic">' + statPrint + '</h2></div><div class="d-flex justify-content-center"><span id="number">' + statNum + '</span></div></div>';
	$('#title').text(chosenName);
	$('#restart-button').append($restartButton);
	$detached = $('.main1').detach();
	$('.main').prepend(main2);

	})


$('#restart-button').click(function() {	
	$('#title').text('Silly Statistics');
	$('.main').prepend($detached);
	$('#restart').detach();
	$main2 = $('.main2').detach();

});

});
