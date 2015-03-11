var DescriptionController = function (view, model) {
  _.bindAll(view, 'update');
  // this.currentDish = undefined;
  this.addObserver = function() {
    model.addObserver(view);
  };
  // this.selectDish = function(dish){
    // view.update(model.getDish(dish));
    // currentDish = dish;
  view.backButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('select');
  });
  // };

  // Init
  this.addObserver();
};