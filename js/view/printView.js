var PrintView = function (container, model) {

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
  var dishesContainer = container.find('#print-view-box')
  
  // Elements
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
  this.addDishToSelected = function(dish) {
    dishesContainer.append('<div class="row">' +
                            '<div class="course-container col-xs-3">' +
                              '<a href="description.html" data-id="' + dish.id+'">' +
                                '<div class="course-box">' +
                                  '<img src="' + dish.image + '"></img>' +
                                  '<div class="course-name">' + dish.name + '</div>' +
                                '</div>' +
                              '</a>' +
                            '</div>' +
                            '<div class="col-xs-3">' +
                                '<h3>Description</h3>' +
                                '<br/>' +
                                '<p>'+dish.description+'</p>' +
                            '</div>' +
                            '<div class="col-xs-5">' +
                                '<h3>Preparation</h3>' +
                                '<br/>' +
                                '<p>' + dish.instruction + '</p>' +
                            '</div>' +
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
    this.spinner.stop();
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