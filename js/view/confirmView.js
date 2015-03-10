var ConfirmView = function (container, model) {

  // Fields
  var guestsContainer = container.find('#sumheader-numbers');
  var dishesContainer = container.find('#dinner-container');
  
  // Buttons
  this.printButton = container.find('.print-button');
  this.backButton = container.find('.back-button');

  // Functions
  this.setNumberOfGuests = function() {
    guestsContainer.append('<h2 class="mydinner-header col-xs-8">'+
                            'My Dinner: '+model.getNumberOfGuests()+
                            ' people</h2>'
                            );
  };
  this.addDishToSelected = function(dish, update) {
    console.log("Function called: addDishToSelected()");
    dishesContainer.append('<div class="col-xs-3">'+
                            '<div class="course-box">'+
                              '<img src="'+dish.image+'"></img>'+
                              '<div class="course-name">'+dish.name+'</div>'+
                            '</div>'+
                          '</div>');
  };
  this.setMenuPrice = function() {
    container.find('.menu-price').html(model.getTotalMenuPrice());
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function() {
    //console.log("Update called: ConfirmView");
    guestsContainer.html('');
    dishesContainer.html('');
    _.each(model.selectedDishes,function(dish) {
      this.addDishToSelected(dish);
      this.setMenuPrice();
    }, this);
    this.setNumberOfGuests();
  };

  // Main
  this.update();
  this.setMenuPrice();
};