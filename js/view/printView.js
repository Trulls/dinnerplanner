var PrintView = function (container, model) {

  // Fields
  var guestsContainer = container.find('#sumheader-numbers');
  var dishesContainer = container.find('#print-view-box')
  
  // Buttons
  this.backButton = container.find('.back-button');

  // Functions
  this.setNumberOfGuests = function() {
    guestsContainer.append('<h2 class="mydinner-header col-xs-8">'+
                            'My Dinner: '+model.getNumberOfGuests()+
                            ' people</h2>'
                            );
  };
  this.addDishToSelected = function(dish) {
    dishesContainer.append('<div class="row">'+
                              '<div class="course-container course-box col-xs-2"><img src="images/'+dish.image+'"></img></div>'+
                              '<div class="course-container col-xs-4">'+
                                  '<h1>'+dish.name+'</h1>'+
                                  '<br/>'+
                                  '<p>'+dish.description+'</p>'+
                              '</div>'+
                              '<div class="course-container col-xs-4">'+
                                  '<h2>PREPARATION</h2>'+
                                  '<br/>'+
                                  '<p>'+dish.instruction+'</p>'+
                              '</div>'+
                            '</div>');
  };
  this.show = function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function() {
    console.log("Update called: PrintView");
    guestsContainer.html('');
    dishesContainer.html('');
    _.each(model.selectedDishes,function(dish) {
      this.addDishToSelected(dish);
    }, this);
    this.setNumberOfGuests();
  };

  // Main
  this.update();
  this.numberOfGuests = container.find("#number-people");
};