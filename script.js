const dogURL = 'https://dog-api.kinduff.com/api/facts';
const cocktailURLbyLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?'; //input cocktail letter


$(document).ready(function() {
	loadDogFact();
	loadDrink();
});

let countOfDogs = 1;

function loadDogFact(){
	$.ajax({
		url: dogURL,
		type: "GET",
		crossDomain: true,
		success: function(data) {
			console.log(data);

			/*
			<tr>
					<th scope="row">1</th>
					<td>a</td>
					
				</tr>
			*/
			let tr = $('<tr></tr>');
			countOfDogs++;

			let th = $('<th  scope="row"></th>').text(countOfDogs);
			let td = $('<td></td>').text(data.facts[0]);
			tr.append(th);
			tr.append(td);

			

			$("#dogFactsTable").css('opacity', 0);
			$("#dogFactsTable").append(tr);
			$("#dogFactsTable").animate({ opacity: '1' });
		},
		error: function(xhr, status, error) {
			console.error(status, error);
		}
	});
}

function loadDrink(){

	$.ajax({
		url: cocktailURLbyLetter+'f=a',
		type: "GET",
		crossDomain: true,
		success: function(data) {
			console.log(data);

			/*
			<tr>
					<th scope="row">1</th>
					<td>a</td>
					<td>a</td>
					<td>a</td>
				</tr>
			*/
			for(var i = 0; i < 10; i ++){
				let tr = $('<tr></tr>');

				let th = $('<th  scope="row"></th>').text(data.drinks[i].idDrink);
				let td1 = $('<td></td>').text(data.drinks[i].strDrink);
				let td2 = $('<td></td>').text(data.drinks[i].strCategory);
				let td3 = $('<td></td>').text(data.drinks[i].strGlass);
				
				tr.append(th);
				tr.append(td1);
				tr.append(td2);
				tr.append(td3);



				$("#drinks").css('opacity', 0);
				$("#drinks").append(tr);
				$("#drinks").animate({ opacity: '1' });
			}

			

		},
		error: function(xhr, status, error) {
			console.error(status, error);
		}
	});
}

function loadDrinkByLetter(){
	var letter = $("#inputLetter").val();
	console.log("letter "+letter);
	$.ajax({
		url: cocktailURLbyLetter+'f='+letter,
		type: "GET",
		crossDomain: true,
		success: function(data) {
			console.log(data);

			/*
			<tr>
					<th scope="row">1</th>
					<td>a</td>
					<td>a</td>
					<td>a</td>
				</tr>
			*/
			$("#drinks").css('opacity', 0);
			for(var i = 0; i < data.drinks.length; i++){
				let tr = $('<tr></tr>');

				let th = $('<th  scope="row"></th>').text(data.drinks[i].idDrink);
				let td1 = $('<td></td>').text(data.drinks[i].strDrink);
				let td2 = $('<td></td>').text(data.drinks[i].strCategory);
				let td3 = $('<td></td>').text(data.drinks[i].strGlass);
				
				tr.append(th);
				tr.append(td1);
				tr.append(td2);
				tr.append(td3);



				
				$("#drinks").append(tr);
				
			}
			$("#drinks").animate({ opacity: '1' });

			

		},
		error: function(xhr, status, error) {
			console.error(status, error);
		}
	});
}