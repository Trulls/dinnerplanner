var ConfirmView = function (container, model) {

  // Variables
  var opts = {
    lines: 13, // The number of lines to draw
    length: 12, // The length of each line
    width: 6, // The line thickness
    radius: 11, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };

  // Fields
  var guestsContainer = container.find('#sumheader-numbers');
  var dishesContainer = container.find('#dinner-container');
  
  // Elements
  this.printButton = container.find('.print-button');
  this.backButton = container.find('.back-button');
  this.dishLink = container.find('.dish-shower');
  this.spinner = new Spinner(opts);

  // Functions
  this.setNumberOfGuests = function() {
    guestsContainer.append('<h2 class="mydinner-header col-xs-9">'+
                            'My Dinner: '+model.getNumberOfGuests()+
                            ' people</h2>'
                            );
  };
  this.addDishToSelected = function(dish, update) {
    dishesContainer.append('<div class="course-container col-xs-3">' +
                            '<a href="description.html" data-id="'+dish.id+'">' +
                              '<div class="course-box">' +
                                '<img src="'+dish.image+'"></img>' +
                                '<div class="course-name">'+dish.name+'</div>' +
                              '</div>' +
                            '</a>' +
                          '</div>');
  };
  this.setMenuPrice = function() {
    container.find('.menu-price').html((model.getTotalMenuPrice()).toFixed(2));
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function() {
    //console.log("Update called: ConfirmView");
    this.spinner.stop();
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