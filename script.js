const dogURL = 'https://dog-api.kinduff.com/api/facts';
const cocktailURLbyLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='; //input cocktail letter


$(document).ready(function() {
	loadDogFact();
});

function loadDogFact(){
	$.ajax({
		url: dogURL,
		type: "GET",
		crossDomain: true,
		success: function(data) {
			console.log(data);
		},
		error: function(xhr, status, error) {
			console.error(status, error);
		}
	});
}