const dogURL = 'https://dog-api.kinduff.com/api/facts';
const cocktailURLbyLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='; //input cocktail letter


$(document).ready(function() {
	loadDogFact();
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