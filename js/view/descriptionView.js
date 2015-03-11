var DescriptionView = function (container, model) {

  // Fields
  var dishDescription = container.find('#dish-description');
  var dishPreparation = container.find('#dish-preparation');
  this.backButton = container.find('.back-button');

  // Functions
  this.addDishToDescription = function(dish) {
    dishDescription.append(
            '<h1>'+dish.name+'</h1>' +
            '<img class="course-container course-box col-xs-6" src="'+dish.image+'"></img>' +
            '<p>'+dish.description+'</p>');

    dishPreparation.append(
            '<h2>PREPARATION</h2>'+
            '<p>'+dish.instruction+'</p>');
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function(dish) {
    // console.log("Update called: DescriptionView");
    if (dish != undefined) {
      dishDescription.html('');
      dishPreparation.html('');
      this.addDishToDescription(dish);
    };
  };
};
