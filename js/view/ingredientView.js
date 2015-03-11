var IngredientView = function (container, model) {

  // Fields
  var ingredientContainer = container.find('#ingredient-list');
  var guestContainer = container.find('#ingredient-guests');
  this.confirmButton = container.find('.confirm-dish');

  // Functions

  this.setNumberOfGuests = function() {
    guestContainer.append('<h3>INGREDIENTS FOR '+model.getNumberOfGuests()+' PEOPLE</h3>');
  };

  this.addIngredients = function(dish) {
    _.each(dish.ingredients, function(ingredient) {
      ingredientContainer.append('<div class="row">'+
                '<div class="col-xs-2">'+ingredient.quantity+'</div>'+
                '<div class="col-xs-6">'+ingredient.name+'</div>'+
                '<div class="col-xs-2">SEK</div>'+
                '<div class="col-xs-2">'+ingredient.price+'</div>'+
              '</div>')
    });
  };

  this.setTotalPrice = function(dish) {
    container.find('#price-per-dish').html(dish.price);
  };

  this.show = function() {
    container.show();
  };

  this.hide = function() {
    container.hide();
  };

  this.update = function(dish) {
    // console.log("Update called: IngredientView");
    if (dish != undefined) {
      ingredientContainer.html('');
      guestContainer.html('')
      this.setNumberOfGuests();
      this.addIngredients(dish);
      this.setTotalPrice(dish);
    };
  };
};
