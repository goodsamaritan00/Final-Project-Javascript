// Main drinks div
const drinksDiv = document.querySelector('#drinks-div')

// Filter input
const cocktailInput = document.querySelector('#cocktail-input')

// Filter buttons
const alcoholicFilter = document.querySelector('#alcoholicFilter');
const nonAlcoholicFilter = document.querySelector('#nonAlcoholicFilter')
const allFilter = document.querySelector('#allFilter')

// Sidebar drinks div
const drinksSidebar = document.querySelector('#drinksSidebar')

// API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0b77ce5851mshaa9b819cb6abbacp1a2e77jsnff4965e0f865',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

fetch('https://the-cocktail-db.p.rapidapi.com/search.php?s', options)
	.then(response => response.json())
	.then((data) => {

        // grab X drinks
            const sliced = data.drinks.slice(0, 150);

            let drinks = sliced;

        // Render drinks
            displayDrinks(drinks)

        // Filter Drinks
        cocktailInput.addEventListener('keyup', (e) => {
             
            const searchString = e.target.value.toUpperCase()
            const filteredDrinks = drinks.filter((drink) => {
                return drink.strDrink.toUpperCase().includes(searchString);
            }); 

            displayDrinks(filteredDrinks);

            // New add event listener because function created new div
            const drinkThumbs = document.querySelectorAll('.drink-thumb');

            for(i = 0; i < drinks.length; i++) {
                drinkThumb = drinkThumbs[i];
                drinkThumb.addEventListener('click', addToSidebar)
            }

            const infoBtns = document.querySelectorAll('.fa-circle-info');

                for(i = 0; i < infoBtns.length; i++) {
                infoBtn = infoBtns[i];
                infoBtn.addEventListener('click', showInfo)
            }

            });
        
        // All filter
        allFilter.addEventListener('click', () => {
            displayDrinks(drinks);

            // New add event listener because function created new div
            const drinkThumbs = document.querySelectorAll('.drink-thumb');

            for(i = 0; i < drinkThumbs.length; i++) {
                    drinkThumb = drinkThumbs[i];
                    drinkThumb.addEventListener('click', addToSidebar)
            }

            const infoBtns = document.querySelectorAll('.fa-circle-info');

            for(i = 0; i < infoBtns.length; i++) {
                    infoBtn = infoBtns[i];
                    infoBtn.addEventListener('click', showInfo)
            }

        })

        // Alcoholic drinks filter
        alcoholicFilter.addEventListener('click', () => { 
            
            const searchString = 'Alcoholic'.toUpperCase();
            const filteredDrinks = drinks.filter((drink) => {

                return drink.strAlcoholic.toUpperCase().includes(searchString);

            }); 

            displayDrinks(filteredDrinks)

            // New add event listener because function created new div
            const drinkThumbs = document.querySelectorAll('.drink-thumb');

            for(i = 0; i < drinkThumbs.length; i++) {

                    drinkThumb = drinkThumbs[i];
                    drinkThumb.addEventListener('click', addToSidebar)

            }

            const infoBtns = document.querySelectorAll('.fa-circle-info');

            for(i = 0; i < infoBtns.length; i++) {

            infoBtn = infoBtns[i];
            infoBtn.addEventListener('click', showInfo)

            }

        });

        // Non Alocholic drinks filter
        nonAlcoholicFilter.addEventListener('click', () => {
            const searchString = 'Non Alcoholic'.toUpperCase();
            const filteredDrinks = drinks.filter((drink) => {

                return drink.strAlcoholic.toUpperCase().includes(searchString);

            }); 

            displayDrinks(filteredDrinks);

            // New add event listener because function created new div
            const drinkThumbs = document.querySelectorAll('.drink-thumb');

            for(i = 0; i < drinkThumbs.length; i++) {

                drinkThumb = drinkThumbs[i];
                drinkThumb.addEventListener('click', addToSidebar);

            };

            const infoBtns = document.querySelectorAll('.fa-circle-info');

            for(i = 0; i < infoBtns.length; i++) {

                infoBtn = infoBtns[i];
                infoBtn.addEventListener('click', showInfo);

            };

        });

        //Function drink div
        function displayDrinks(drinks) {
        
            // Create drink div string
            const stringHtml = drinks.map((drink) => {

            // Create random prices between 10 and 25€
            function definePrices(min,max) {
                return (Math.random() * (max - min) + min).toFixed(0);
            }

            const price = definePrices(3,15);

            // HTML string
            return `
            <div class="drink-div">
                <h3 class="drink-name">${drink.strDrink}</h3>
                <i class="drink-price">${price}.00€</i>
                <small class="drink-category">${drink.strCategory}</small>
                <img class="drink-thumb" src="${drink.strDrinkThumb}">
                <span class="add">ADD</span> 
                <i class="fas fa-circle-info"></i>
                <div class="info-layer">
                    <h3>Ingredients:</h3>
                    <p class="ingredient">${drink.strIngredient1}</p>
                    <p class="ingredient">${drink.strIngredient2}</p>
                    <p class="ingredient">${drink.strIngredient3}</p>
                    <p class="ingredient">${drink.strIngredient4}</p>
                    <p class="ingredient">${drink.strIngredient5}</p>
                    <h3>Recipe:</h3>
                    <small >${drink.strInstructions}</small>
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>  
            </div>
            `
            }).join('');

            drinksDiv.innerHTML = stringHtml;

        };

        // Info button
        const infoBtns = document.querySelectorAll('.fa-circle-info');

        for(i = 0; i < infoBtns.length; i++) {
            infoBtn = infoBtns[i];
            infoBtn.addEventListener('click', showInfo)
        }

        function showInfo(e) {

            // If ingredient is null
            const ingredients = document.querySelectorAll('.ingredient');

            for(i = 0; i < ingredients.length; i++) {
            ingredient = ingredients[i]

                if(ingredient.innerHTML === 'null') {
                ingredient.innerHTML = ''
                }
            }

            // Show Info
            const button = e.target
            const divItem = button.parentElement;

            divItem.querySelectorAll('.info-layer')[0].classList.add('layer-active')
            divItem.querySelectorAll('.fa-circle-xmark')[0].addEventListener('click', () => 
            divItem.querySelectorAll('.info-layer')[0].classList.remove('layer-active')
            )

        }

        // SIDEBAR
        let totalPriceText = document.querySelector('.total-price');   

        // Total Price
        let totalPrice = 0
        totalPriceText.innerHTML = totalPrice.toFixed(2) + '€';

        // Add to sidebar
        const drinkThumbs = document.querySelectorAll('.drink-thumb');

        for(i = 0; i < drinkThumbs.length; i++) {

            drinkThumb = drinkThumbs[i];
            drinkThumb.addEventListener('click', addToSidebar)

        }

        // Create and add drink for sidebar function
        function addToSidebar(e) {

            // Limit number of drinks in sidebar
            if(drinksSidebar.childElementCount > 7) {

                alert('Cart is full')
                return

            }

            // Add sidebar drink
            const click = e.target;
            const divItem = click.parentElement;
                
            const imgSrc = divItem.querySelectorAll('.drink-thumb')[0].src
            const nameDrink = divItem.querySelectorAll('.drink-name')[0].innerHTML;
            const priceDrink = divItem.querySelectorAll('.drink-price')[0].innerHTML;


            // If already contains drink
            const sideDrinkName = document.querySelectorAll('.side-drink-name');

            for(let i = 0; i < sideDrinkName.length; i++) {
                
                if(sideDrinkName[i].innerHTML === nameDrink) {

                    alert('Drink already in the cart!')
                    return

                }
            }

            // Update total

            totalPrice += parseFloat(priceDrink)
            console.log(totalPrice)

            totalPriceText.innerHTML = totalPrice.toFixed(2) + '€'

            // Create sidebar drink
            const sidebarDrinkDiv = document.createElement('div')
            sidebarDrinkDiv.classList.add('sidebar-drink')
                

            sidebarDrinkDiv.innerHTML = `
                <img src="${imgSrc}" class="side-drink-thumb">
                <div class="name-price">
                    <p class="side-drink-name">${nameDrink}</p>
                    <p class="side-drink-price">${priceDrink}</p>
                </div>
                <div class="increase-decrease-delete">
                    <div class="increase-decrease">
                        <i class="fa-solid fa-caret-up"></i>
                        <span class="drink-amount">1</span>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
                `
        
            // Update quantity and specific drink price / If already contais a drink

            const sidePrice = sidebarDrinkDiv.querySelectorAll('.side-drink-price')[0];
            const sideAmount = sidebarDrinkDiv.querySelectorAll('.drink-amount')[0];
            const increment = sidebarDrinkDiv.querySelectorAll('.fa-caret-up')[0];
            const decrement = sidebarDrinkDiv.querySelectorAll('.fa-caret-down')[0];
            const remove = sidebarDrinkDiv.querySelectorAll('.fa-xmark')[0];

            // Increment amount and price
            increment.addEventListener('click', incrementPrice)
        
            function incrementPrice() {

                // If amount above 10
                if(parseFloat(sideAmount.innerHTML) === 10) {
                    return
                }
                
                parseFloat(sideAmount.innerHTML++)
                    
                sidePrice.innerHTML = (parseFloat(priceDrink) * parseFloat(sideAmount.innerHTML)).toFixed(2) + '€'

                totalPrice += parseFloat(priceDrink);
                    
                totalPriceText.innerHTML =  totalPrice.toFixed(2) + ' €'
                console.log(totalPrice)

            }

            // Increment amount and price
            decrement.addEventListener('click', decrementPrice)
        
            function decrementPrice() {
                
                // If amount below 1
                if(parseFloat(sideAmount.innerHTML) === 1) {
                    return
                }

                parseFloat(sideAmount.innerHTML--)
                
                sidePrice.innerHTML = (parseFloat(priceDrink) * parseFloat(sideAmount.innerHTML)).toFixed(2) + '€'

                totalPrice -= parseFloat(priceDrink);
                
                totalPriceText.innerHTML =  totalPrice.toFixed(2) + '€'
                console.log(totalPrice)

            }

            // Remove
            remove.addEventListener('click', removeDrink)

            function removeDrink() {
                drinksSidebar.removeChild(sidebarDrinkDiv)

                totalPrice -= parseFloat(sidePrice.innerHTML);

                totalPriceText.innerHTML = totalPrice.toFixed(2) + '€'

            }

            // Append drink to the sidebar
            drinksSidebar.appendChild(sidebarDrinkDiv)
    
            }
        // End of add to sidebar function

        // Proceed Button
        document.querySelector('#proceedBtn').addEventListener('click', () => {

            drinksSidebar.innerHTML = ''
            alert('Thank you for your purchase, the total price is ' + document.querySelector('.total-price').innerHTML)

            totalPrice = 0
            totalPriceText.innerHTML =  totalPrice.toFixed(2) + '€'
        })

         console.log(drinks)  

    })
	.catch(err => console.error(err));


        
   
  

    
    
    
    



    

    



  
    
    