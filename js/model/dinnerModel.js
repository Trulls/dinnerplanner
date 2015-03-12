//DinnerModel Object constructor
var DinnerModel = function () {

	this.numberOfGuests = 4;
	this.selectedDishes = {};
	this.currentDish = undefined;
	this._observers = [];
	var dishes = [];

	

	this.addObserver = function (observer) {
		//console.log("Function called: addObserver()");
		this._observers.push(observer);
	}

	this.notifyObservers = function (data) {
		//console.log("Function called: notifyObservers()");
		for(var i=0; i<this._observers.length; i++) {
			this._observers[i].update(data);
		}	
	}

	//Sets the number of guests
	this.setNumberOfGuests = function (num) {
		//console.log("Function called: setNumberOfGuests()");
		this.numberOfGuests = num;
		this.notifyObservers();
	};

	//Returns the number of guests
	this.getNumberOfGuests = function () {
		//console.log("Function called: getNumberOfGuests()");
		return this.numberOfGuests;
	};

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function (type) {
		//console.log("Function called: getSelectedDish()");
		return this.selectedDishes[type];
	};

	//Returns all the dishes on the menu.
	this.getFullMenu = function () {
		//console.log("Function called: getFullMenu()");
		return dishes;
	};

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function () {
		//console.log("Function called: getAllIngredients()");
		ingredients = [];
		dishes.forEach(function (dish) {
			ingredients.push(_.pluck(dish.ingredients, 'name'));
		});
		return _.uniq(_.flatten(ingredients));
	};

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function () {
		//console.log("Function called: getTotalMenuPrice()");
		var unitCost = 0;
		_.each(this.selectedDishes, function (dish) {
			unitCost += dish.price;
		}, this);
		return unitCost * this.numberOfGuests;
	};

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function () {
		this.selectedDishes[currentDish.type] = currentDish;
		this.notifyObservers();
	}

	//Removes dish from menu
	this.removeDishFromMenu = function (id) {
		//console.log("Function called: removeDishFromMenu()");
		_.reject(this.selectedDishes, function (dish) {
			return dish.id === id;
		});
		this.notifyObservers();
	}

	//Function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
		//console.log("Function called: getAllDishes()");
		if(type){
			return $(dishes).filter(function (index,dish) {
				var found = true;
				if(filter){
					found = false;
					$.each(dish.ingredients,function (index,ingredient) {
						if(ingredient.name.indexOf(filter)!=-1) {
							found = true;
						}
					});
					if(dish.name.indexOf(filter) != -1)
					{
						found = true;
					}
				}
				return dish.type == type && found;
			});
		}
		else {
			return dishes;
		}
	};

	this.getAllRecipes = function (type, filter) {
		//console.log("Function called: getAllRecipes()");
		var apiKey = "dvx6H6QTYoSVG1J9p9BaIcf097ZInDlP";
		var pg = "1";
		var rpp = "15";
		var typeq = "&any_kw='" + type + "'";
		var filterq = "";
		if (filter) {
			filterq = "&any_kw='" + filter + "'";
		}
		var url = 	"http://api.bigoven.com/recipes?api_key=" + apiKey +
					"&pg=" + pg + "&rpp=" + rpp + typeq + filterq;
		var myModel = this;

		$.ajax({
	        type: "GET",
	        dataType: 'json',
	        cache: false,
	        url: url,
	        success: function (data) {
	            //console.log("SUCCESS: ajax");
	            var _recipes = [];
	            for (var i=0; i<data.Results.length; i++) {
	            	var dish = data.Results[i];
	            	var recipe = {
						'id':dish.RecipeID,
						'name':dish.Title,
						'type':type,
						'image':dish.ImageURL
					}
					_recipes.push(recipe);
				}
				//console.log("Request done");
				dishes = _recipes;
				myModel.notifyObservers();
				// spinner.stop();
            }
	    });
    };

	// Function that returns a dish of specific ID
	this.getDish = function (id, view) {
		//console.log("Function called: getDish(id)");
		var apiKey = "dvx6H6QTYoSVG1J9p9BaIcf097ZInDlP";
		var url = 	"http://api.bigoven.com/recipe/" + id + "?api_key=" + apiKey;
		var myModel = this;

		$.ajax({
	        type: "GET",
	        dataType: 'json',
	        cache: true,
	        url: url,
	        success: function (data) {
	            //console.log("SUCCESS: ajax");
	            var dish = data;
            	var _recipe = {
					'id':dish.RecipeID,
					'name':dish.Title,
					'type':dish.Category,
					'image':dish.ImageURL,
					'description':dish.Description,
					'instruction':dish.Instructions,
				}

				var _ingredients = [];
				var _totalPrice = 0;

				dish.Ingredients.forEach(function (ingredient) {
					var _quantity = ingredient.Quantity;
					var _price = _quantity;
					_totalPrice += _price;

					var _ingredient = {
						'name':ingredient.Name,
						'quantity':_quantity,
						'unit':ingredient.Unit,
						'price':_price
					}
					_ingredients.push(_ingredient);
				});

				_recipe.ingredients = _ingredients;
				_recipe.price = _totalPrice;

				//console.log("Request done");
				window.app.switchView(view);
				myModel.notifyObservers(_recipe);
				currentDish = _recipe;
				return _recipe;
            }
	    });
	};
	

}