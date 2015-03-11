var IngredientController = function (view, model) {
  _.bindAll(view, 'update');
  this.addObserver = function() {
    model.addObserver(view);
  };
  view.confirmButton.click(function(e) {
    e.preventDefault();
    model.addDishToMenu();
    window.app.switchView('select');
  });

  // Init
  this.addObserver();
};