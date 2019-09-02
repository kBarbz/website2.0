$(function(){
let chosenName;
let chosenTeam;
let chosenStat; 
let statPrint;
let $restartButton = $('#restart').detach();
let totalData;
let statNum;
let baseball;

function getRand(min, max) {
   min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

$.get("/baseballStats", function(data) {
		if(!data){
			console.log("No data received");	
		}
		baseball = data;
		});

$('#dropdown-team').change(function() {
		$('.pre-value1').remove();
	chosenTeam = $("#dropdown-team :selected").text() 	// Variable equals what was selected
	$('.currentTeam').remove()		// Remove the current options

	$.get("/baseballStats", function(data) {
		if(!data){
			console.log("No data received");	
		}
		baseball = data;
		console.log(baseball[0]);
	});

	$.get("/teamName", chosenTeam, function(data) {
		if(!data){
			console.log("No data received");	
		}
		console.log("Received data");
		chosenStat = $("#dropdown-stat :selected").val();
		console.log(chosenStat);
		totalData = data;
		console.log(totalData);
		switch(chosenTeam){
			case "Bedford":
			for (let i = 0; i < data.length-1; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Bayswater Morley 1":
			for (let i = 0; i < data.length-1; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Bayswater Morley 2":
			for (let i = 0; i < data.length-1; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Bayswater Morley 3":
			for (let i = 0; i < data.length-1; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Fremantle 1":
			for (let i = 0; i < data.length-1; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Fremantle 2":
			for (let i = 0; i < data.length-1; i++){
			$('.teamName').append("<option class='currentTeam' value='" + data[i]['Name'] + "'>" + data[i]['Name'] + "</option>")	
			}
			break;
			case "Geraldton":
			for (let i = 0; i < data.length-1; i++){
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
	chosenStat = $("#dropdown-stat :selected").val();
	
});

let checked;
$('input[type="checkbox"]').click(function(){
            if($(this).prop("checked") == true){
                alert("Weston mode engaged");
                checked = true
            }
            else if($(this).prop("checked") == false){
                alert("Weston Mode disengaged");
                checked = false
            }
        });

// creates new layout with statistic shown
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
	$detached = $('.main1').detach();
	$('.main').prepend(main2);

	
	function filterByAtBats(item) {
  	if (item["At Bats"] == chosenObj["At Bats"]) {
    return true;
  	} 
  	return false; 
	}

	let baseballPlayers = baseball.filter(filterByAtBats);
	let rand = getRand(0, baseballPlayers.length);

	function filterByChosen(item) {
		if (item[chosenStat] == chosenObj[chosenStat]) {
			return true;
		}
		return false;
	}

	let westyPlayer = baseball.filter(filterByChosen);
	let westyRand = getRand(0, westyPlayer.length);

	let baseballFact = '<div class="baseballFact"><div class="d-flex justify-content-center"><p>In the same weekend, <span id="bold">' + baseballPlayers[rand]["Name"] + '</span> had</p></div><div class="d-flex justify-content-center"><span id="number">' + baseballPlayers[rand][chosenStat] + '</span></div></div>'
	
	console.log(checked)

	if (checked) {
		baseballFact = '<div class="baseballFact"><div class="d-flex justify-content-center"><p>In the same weekend, <span id="bold">' + westyPlayers[westyRand]["Name"] + '</span>also had</p></div><div class="d-flex justify-content-center"><span id="number">' + westyPlayer[rand][chosenStat] + '</span></div></div>'
	} 

	$('#baseballFact').append(baseballFact);
	$('#restart-button').append($restartButton);



	})

// button to go back to original layout
$('#restart-button').click(function() {	
	$('#title').text('Silly Statistics');
	$('.main').prepend($detached);
	$('#restart').detach();
	$main2 = $('.main2').detach();
	$baseballFact = $('.baseballFact').detach();

});

});
