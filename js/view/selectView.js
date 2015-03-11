//ExampleView Object constructor
var SelectView = function (container, model, router) {

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
  var menuContainer = container.find('#menu-container');

  // Elements
  this.spinner = new Spinner(opts);
  this.dishLink = container.find('.dish-picker');
  this.dropDown = container.find('select');
  this.input = container.find('input');

  // Functions
  this.startSpinner = function () {
    var target = document.getElementById('spin-city');
    this.spinner.spin(target);
  }
  this.addDishToMenu = function(dish) {
    menuContainer.append('<div class="course-container col-xs-3">' +
                            '<a href="description.html" data-id="'+dish.id+'">' +
                              '<div class="course-box">' +
                                '<img src="'+dish.image+'"></img>' +
                                '<div class="course-name">'+dish.name+'</div>' +
                              '</div>' +
                            '</a>' +
                          '</div>');
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function(category, filter) {
    // console.log("Update called: SelectView");
    this.spinner.stop();
    menuContainer.html('');
    filter = filter === '' ? undefined : filter
    _.each(model.getAllDishes(category, filter), function(dish) {
      this.addDishToMenu(dish);
    }, this);
  };
};
