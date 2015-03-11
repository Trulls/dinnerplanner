var DescriptionView = function (container, model) {

  // Fields
  var dishDescription = container.find('#dish-description');
  var dishPreparation = container.find('#dish-preparation');
  this.backButton = container.find('.back-button');

  // Functions
  this.addDishToDescription = function(dish) {
    dishDescription.append(
              '<h2>' + dish.name+'</h2>' +
              '<img class="course-container course-box" src="' + dish.image + '"></img>');
    if (dish.description.length > 0) {
      dishDescription.append(
              '<h3>Description</h3>' + 
              '<p>' + dish.description + '</p>');
    };
    if (dish.instruction.length > 0) {
      dishPreparation.append(
              '<h3>Preparation</h3>' +
              '<p>' + dish.instruction + '</p>');
    }
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
