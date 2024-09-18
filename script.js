// color theme
// if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     document.documentElement.classList.add('dark');
// } else {
//     document.documentElement.classList.remove('dark');
// }


// var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
// var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// var themeToggleDarkIcon_2 = document.getElementById('theme-toggle-dark-icon-2');
// var themeToggleLightIcon_2 = document.getElementById('theme-toggle-light-icon-2');

// // Change the icons inside the button based on previous settings
// if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia(
//     '(prefers-color-scheme: dark)').matches)) {
//     themeToggleLightIcon.classList.remove('hidden');
//     if (themeToggleDarkIcon_2) {
//         themeToggleLightIcon_2.classList.remove('hidden');
//     }
// } else {
//     themeToggleDarkIcon.classList.remove('hidden');
//     if (themeToggleDarkIcon_2) {
//         themeToggleDarkIcon_2.classList.remove('hidden');
//     }
// }


// var themeToggleBtn_2 = document.getElementById('theme-toggle-2');
// if (themeToggleBtn_2) {

//     themeToggleBtn_2.addEventListener('click', function () {

//         // toggle icons inside button
//         themeToggleDarkIcon_2.classList.toggle('hidden');
//         themeToggleLightIcon_2.classList.toggle('hidden');

//         sync_theme()

//     });
// }


// var themeToggleBtn = document.getElementById('theme-toggle');

// themeToggleBtn.addEventListener('click', function () {

//     // toggle icons inside button
//     themeToggleDarkIcon.classList.toggle('hidden');
//     themeToggleLightIcon.classList.toggle('hidden');

//     sync_theme()


// });


// function sync_theme() {
//     // if set via local storage previously
//     if (localStorage.getItem('color-theme')) {
//         if (localStorage.getItem('color-theme') === 'light') {
//             document.documentElement.classList.add('dark');
//             localStorage.setItem('color-theme', 'dark');
//         } else {
//             document.documentElement.classList.remove('dark');
//             localStorage.setItem('color-theme', 'light');
//         }
//         // if NOT set via local storage previously
//     } else {
//         if (document.documentElement.classList.contains('dark')) {
//             document.documentElement.classList.remove('dark');
//             localStorage.setItem('color-theme', 'light');
//         } else {
//             document.documentElement.classList.add('dark');
//             localStorage.setItem('color-theme', 'dark');
//         }
//     }

// }


// responsive navbar
document.addEventListener('DOMContentLoaded', function () {
    // open
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', function () {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    // close
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function () {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }


    if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', function () {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
});


// open modal
window.openModal = function (modalId) {
    document.getElementById(modalId).style.display = 'block'
    document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
}

// close modal
window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = 'none'
    document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
}

// Close all modals when press ESC
document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode === 27) {
        document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
        let modals = document.getElementsByClassName('modal');
        Array.prototype.slice.call(modals).forEach(i => {
            i.style.display = 'none'
        })
    }
};

// APIs, accesing all required elements
const searchBox = document.querySelector('#search-input');
const searchRecipe = document.querySelector('#search-recipe');

// mobile input and search
const searchBoxMobile = document.querySelector('#search-input-mobile');
const searchRecipeMobile = document.querySelector('#search-recipe-mobile');


const hero = document.getElementById('hero');

// main recipe containers and view recipe
const recipeContainer = document.getElementById('recipe-container');
const recipeDetailsContent = document.getElementById('recipe-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// function to fetch API
const fetchRecipes = async (query) => {

    recipeContainer.innerHTML = "<h2>Finding the best recipes for you...!</h2>";

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`); // API
        const response = await data.json(); // converting data in json which we get in response

        recipeContainer.innerHTML = ""; // initialize empty at first

        // iterating all meal which is in array form
        response.meals.forEach(meal => {

            // creating div to show all reqiured info
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe'); // addind class recipe to style it later

            // displaying image, name, area, category of the meal
            recipeDiv.innerHTML = `
                <img src = "${meal.strMealThumb}" >
                <h3>${meal.strMeal}</h3>
                <h4>${meal.strArea} Dish</h4>
                <h5>Belongs to <span>${meal.strCategory}</span></h5>
            `
            // creating button
            const button = document.createElement('button');

            button.textContent = 'View Recipe'; // adding content in button as it is
            button.classList.add('btn'); // adding class to style it later
            recipeDiv.appendChild(button); // addind button inside recipe Div

            // adding addeventlistener on button to open recipe popup
            button.addEventListener("click", () => {
                openRecipePopup(meal); // calling function openRecipePopup
            });

            recipeContainer.appendChild(recipeDiv); // addind recipeDiv into recipe container

        });
    } catch (error) { // using try and catch to display no recipes found in API
        recipeContainer.innerHTML = "<h2>We can not find the recipe for the given Cuisine</h2>";
        setTimeout(() => {
            recipeContainer.innerHTML = "";
            hero.classList.remove("hidden");
        }, 4000);
    }
}

// fetching ingredients
const fetchIngredients = (meal) => {

    let ingredientsList = ""; // initializing empty to store later

    // In API, we have Ingredients from 1 to 20
    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`]; // accesing ingredients

        if (ingredient) {

            const measure = meal[`strMeasure${i}`]; // accesing measurement for ingredients
            ingredientsList += `<li>${measure} ${ingredient}</li>` // updating ingredients list by adding measure and ingredients

        } else {
            break; // if ingredient not available then it break loop and exit
        }
    }

    return ingredientsList; // returning ingredients list
};

//Opening popup for view recipe
const openRecipePopup = (meal) => {

    // displaying image, name, ingredients, recipe instructions of the meal in view recipe
    recipeDetailsContent.innerHTML = `
    <img src = "${meal.strMealThumb}" >
        <h2 class = "recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class = "ingredientList">${fetchIngredients(meal)}</ul>
        <div class = "recipeInstructions">
             <h3>Instructions: </h3>
             <p>${meal.strInstructions}</p>
        </div>

    `
    recipeDetailsContent.parentElement.style.display = "block"; // making display block of parent element of recipe details content which is diplay none when initializing

};

// recipe closed popup button
recipeCloseBtn.addEventListener('click', () => {

    recipeDetailsContent.parentElement.style.display = "none"; // making display none

});

// adding addeventlistener to search Given meals and fetch it
searchRecipe.addEventListener('click', () => {
    //accesing value of input box
    const searchInput = searchBox.value.trim(); // trim removes extra leading spaces

    // if input box is empty, it displays below message
    if (!searchInput) {
        document.getElementById("get").innerHTML = `<h2>Type the Cuisine in the search box to get the best recipes.</h2>`;
        return;
    }

    fetchRecipes(searchInput); // callling fetch recipes
    hero.classList.add("hidden"); // after searching recipes, making hero section hidden

});


// working function of search button for mobile and small width devices
const navClose = document.getElementById('navbar-menu');

searchRecipeMobile.addEventListener('click', () => {

    const searchInputMobile = searchBoxMobile.value.trim(); // trim removes extra leading spaces

    if (!searchInputMobile) {
        document.getElementById("theme-toggle-2").innerHTML = `<h2>Type the Cuisine in the search box to get the best recipes.</h2>`;
        return;
    }

    fetchRecipes(searchInputMobile);
    hero.classList.add("hidden");
    navClose.classList.add("hidden"); // after searching recipes, making navbar section

});

