//DinnerModel Object constructor
var DinnerModel = function() {

	this.numberOfGuests = 0;
	this.selectedDishes = {};
	this._recipes = [];

	//Sets the number of guests
	this.setNumberOfGuests = function(num) {
		console.log("Function called: setNumberOfGuests()");
		this.numberOfGuests = num;
		this.notifyObservers();
	};

	//Returns the number of guests
	this.getNumberOfGuests = function() {
		console.log("Function called: getNumberOfGuests()");
		return this.numberOfGuests;
	};

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		console.log("Function called: getSelectedDish()");
		return this.selectedDishes[type];
	};

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		console.log("Function called: getFullMenu()");
		return dishes;
	};

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		console.log("Function called: getAllIngredients()");
		ingredients = [];
		dishes.forEach(function(dish) {
			ingredients.push(_.pluck(dish.ingredients, 'name'));
		});
		return _.uniq(_.flatten(ingredients));
	};

	//Gets the price of a specific dish
	this.getDishPrice = function(id) {
		console.log("Function called: getDishPrice()");
		price = 0;
		dish = this.getDish(id);
		dish.ingredients.forEach(function(ingredient) {
			price += ingredient.price;
		});
		return price;
	};

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		console.log("Function called: getTotalMenuPrice()");
		var unitCost = 0;
		_.each(this.selectedDishes, function(dish) {
			unitCost += this.getDishPrice(dish.id);
		}, this);
		return unitCost * this.numberOfGuests;
	};

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		console.log("Function called: addDishToMenu()");
		selectedDish = _.find(dishes, function(dish) {
			return dish.id === id;
		});
		this.selectedDishes[selectedDish.type] = selectedDish;
		this.notifyObservers();
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		console.log("Function called: removeDishFromMenu()");
		_.reject(this.selectedDishes, function(dish) {
			return dish.id === id;
		});
		this.notifyObservers();
	}

	//Function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
		console.log("Function called: getAllDishes()");
	  	return $(dishes).filter(function(index,dish) {
			var found = true;
			if(filter){
				found = false;
				$.each(dish.ingredients,function(index,ingredient) {
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
	};
	this.getAllRecipes = function (type, filter) {
		console.log("Function called: getAllRecipes()");
		var apiKey = "dvx6H6QTYoSVG1J9p9BaIcf097ZInDlP";
		var pg = "1";
		var rpp = "25";
		type = "&any_kw='" + type + "'";
		if (filter) {
			filter = "&any_kw='" + filter + "'";
		}
		var url = 	"http://api.bigoven.com/recipes?api_key=" + apiKey +
					"&pg=" + pg + "&rpp=" + rpp + type + filter;
		console.log(url);

		$.ajax({
	        type: "GET",
	        dataType: 'json',
	        cache: false,
	        url: url,
	        success: function (data) {
	            console.log("SUCCESS: ajax");
	            this.convert(data);
	            notifyObservers(this._recipes);
	            console.log(data.Title);
	        }
	    });
    };

	// Function that returns a dish of specific ID
	this.getDish = function (id) {
	  	for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	};
	this.getRecipe = function (id) {
	  	for(key in this._recipes){
			if(this._recipes[key].id == id) {
				return this._recipes[key];
			}
		}
	};

	

	this.convert = function (data) {
		console.log("Function called: convert()");
		_.each(data,function(recipe){
			var recipe = {
				'id':data.RecipeID,
				'name':data.Title,
				'type':data.Category,
				'image':data.ImageURL,
				'description':data.Instruction,
				//'description':data.Description,
				//'instruction':data.Instruction,
				'ingredients':[{
					'name':'cookies',
					'quantity':2,
					'unit':'',
					'price':1
					},{
					'name':'milk',
					'quantity':2,
					'unit':'dl',
					'price':1
				}]
			}
			this._recipes.push(recipe);
		})
		
	};

	

	/*****************************************  
	      Observable implementation    
	*****************************************/

	/*this.listeners = [];

	this.listenTo = function(fun) {
		console.log("Function called: listenTo()");
		this.listeners.push(fun);
	};

	this.notify = function() {
		console.log("Function called: notify()");
		_.each(this.listeners, function(listener) {
			listener();
		});
	};*/

	this._observers = [];

	this.addObserver = function(observer) {
		console.log("Function called: addObserver()");
		this._observers.push(observer);
	}

	this.notifyObservers = function() {
		console.log("Function called: notifyObservers()");
		console.log(this._observers);
		for(var i=0; i<this._observers.length; i++) {
			this._observers[i].update();
		}	
	}




	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"Lovely french toast!",
		'instruction':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Hm hm!!",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"How can anyone resist it?!",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Lovely Mother Scans Meatballs!!",
		'instruction':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"I'm not even sure myself!",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Some other kind of meatballs I suppose",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Lore ipsum description",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Lore ipsum description",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Lore ipsum description",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Lore ipsum description",
		'instruction':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}