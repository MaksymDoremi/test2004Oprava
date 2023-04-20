const dogURL = 'https://dog-api.kinduff.com/api/facts';
const cocktailURLbyLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?'; //input cocktail letter

var drinks = [];
var dogs = [];

var localDrinks = [];
var localDogs = [];

class Dog {
    constructor(id, fact) {
        this.id = id;
        this.fact = fact;
    }


}

class Drink {
    constructor(idDrink, strDrink, strCategory, strGlass) {
        this.idDrink = idDrink;
        this.strDrink = strDrink;
        this.strCategory = strCategory;
        this.strGlass = strGlass;
    }
}

$(document).ready(function() {

    let dogs = JSON.parse(localStorage.getItem("dogs"));
    localDogs = dogs;
    if (localDogs == null) {
        loadDogFact();

    } else {
        loadDogLocal();
    }

    let drinks = JSON.parse(localStorage.getItem("drinks"));
    localDrinks = drinks;
    if (localDrinks == null) {
        loadDrink();
    } else {
        loadDrinkLocal();
    }
});

let countOfDogs = 1;

function loadDogFact() {
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


            let th = $('<th  scope="row"></th>').text(countOfDogs);
            let td = $('<td></td>').text(data.facts[0]);
            tr.append(th);
            tr.append(td);
            if (localDogs == null) {
            	localDogs = [];
                localDogs[0] = new Dog(countOfDogs, data.facts[0]);
            } else {
                localDogs[localDogs.length] = new Dog(countOfDogs, data.facts[0]);
            }

            localStorage.setItem("dogs", JSON.stringify(localDogs));
            countOfDogs++;

            $("#dogFactsTable").css('opacity', 0);
            $("#dogFactsTable").append(tr);
            $("#dogFactsTable").animate({ opacity: '1' });
        },
        error: function(xhr, status, error) {
            console.error(status, error);
        }
    });
}

function loadDrink() {

    $.ajax({
        url: cocktailURLbyLetter + 'f=a',
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
            for (var i = 0; i < 10; i++) {
                let tr = $('<tr></tr>');

                let th = $('<th  scope="row"></th>').text(data.drinks[i].idDrink);
                let td1 = $('<td></td>').text(data.drinks[i].strDrink);
                let td2 = $('<td></td>').text(data.drinks[i].strCategory);
                let td3 = $('<td></td>').text(data.drinks[i].strGlass);

                tr.append(th);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                if (localDrinks == null) {
                	localDrinks = [];
                    localDrinks[0] = new Drink(data.drinks[i].idDrink, data.drinks[i].strDrink, data.drinks[i].strCategory, data.drinks[i].strGlass)

                } else {
                    localDrinks[localDrinks.length] = new Drink(data.drinks[i].idDrink, data.drinks[i].strDrink, data.drinks[i].strCategory, data.drinks[i].strGlass)
                }
                localStorage.setItem("drinks", JSON.stringify(localDrinks));
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



function loadDrinkByLetter() {
    var letter = $("#inputLetter").val();
    console.log("letter " + letter);
    $.ajax({
        url: cocktailURLbyLetter + 'f=' + letter,
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
            for (var i = 0; i < data.drinks.length; i++) {
                let tr = $('<tr></tr>');

                let th = $('<th  scope="row"></th>').text(data.drinks[i].idDrink);
                let td1 = $('<td></td>').text(data.drinks[i].strDrink);
                let td2 = $('<td></td>').text(data.drinks[i].strCategory);
                let td3 = $('<td></td>').text(data.drinks[i].strGlass);

                tr.append(th);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                if (localDrinks == null) {
                	localDrinks = [];
                    localDrinks[0] = new Drink(data.drinks[i].idDrink, data.drinks[i].strDrink, data.drinks[i].strCategory, data.drinks[i].strGlass)

                } else {
                    localDrinks[localDrinks.length] = new Drink(data.drinks[i].idDrink, data.drinks[i].strDrink, data.drinks[i].strCategory, data.drinks[i].strGlass)

                }
                localStorage.setItem("drinks", JSON.stringify(localDrinks));



                $("#drinks").append(tr);

            }
            $("#drinks").animate({ opacity: '1' });



        },
        error: function(xhr, status, error) {
            console.error(status, error);
        }
    });
}

function loadDogLocal() {
    $("#dogFactsTable").css('opacity', 0);
    for (var i = 0; i < localDogs.length; i++) {
        let tr = $('<tr></tr>');


        let th = $('<th  scope="row"></th>').text(localDogs[i].id);
        let td = $('<td></td>').text(localDogs[i].fact);
        tr.append(th);
        tr.append(td);


        $("#dogFactsTable").append(tr);

    }
    $("#dogFactsTable").animate({ opacity: '1' });

}

function loadDrinkLocal() {
    for (var i = 0; i < localDrinks.length; i++) {
        let tr = $('<tr></tr>');

        let th = $('<th  scope="row"></th>').text(localDrinks[i].idDrink);
        let td1 = $('<td></td>').text(localDrinks[i].strDrink);
        let td2 = $('<td></td>').text(localDrinks[i].strCategory);
        let td3 = $('<td></td>').text(localDrinks[i].strGlass);

        tr.append(th);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);



        $("#drinks").css('opacity', 0);
        $("#drinks").append(tr);
        $("#drinks").animate({ opacity: '1' });


    }
}

function deleteDrinks() {
    localDrinks = [];
    localStorage.setItem("drinks", JSON.stringify(localDrinks));
    $("#drinks").html('');
}

function deleteDogs() {
    localDogs = [];
    localStorage.setItem("dogs", JSON.stringify(localDogs));
    $("#dogFactsTable").html('');
}