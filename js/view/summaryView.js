var SummaryView = function (container, model) {

  var dishesContainer = $('#selected-dishes');

  this.numberPeople = container.find('#number-people');
  this.confirmButton = container.find('.confirm-dinner');

  this.addDishToSelected = function(dish) {
    dishesContainer.append('<div>' + 
                              '<div class="col-xs-8">' + dish.name + '</div>' + 
                              '<div class="col-xs-4">' + dish.price.toFixed(2) + '</div>' + 
                            '</div>');
  };

  this.setMenuPrice = function() {
    container.find('.menu-price').html((model.getTotalMenuPrice()).toFixed(2));
  };

  this.setNumberOfGuests = function(n) {
    model.setNumberOfGuests(n);
  };

  this.hide = function() {
    container.hide();
  };

  this.show =function() {
    container.show();
  };

  this.update = function() {
    // console.log("Update called: SummaryView");
    dishesContainer.html('');
    _.each(model.selectedDishes,function(dish) {
      this.addDishToSelected(dish);
    }, this);
    this.setMenuPrice();
  };

  // Init
  this.update();
};