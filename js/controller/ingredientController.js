var IngredientController = function (view, model) {
  _.bindAll(view, 'update');
  // currentDish = undefined;
  this.addObserver = function() {
    model.addObserver(view);
  };
  // this.selectDish = function(dish) {
    // view.update(model.getDish(dish));
    // currentDish = dish;
  // };
  view.confirmButton.click(function(e) {
    e.preventDefault();
    // model.addDishToMenu(parseInt(currentDish));
    model.addDishToMenu();
    window.app.switchView('select');
  });

  // Init
  this.addObserver();
};