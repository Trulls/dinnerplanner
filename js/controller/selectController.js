var SelectController = function (view, model) {
  _.bindAll(view, 'update');
  categories = {
    Main: 'main dish',
    Dessert: 'dessert',
    Starter: 'starter',
    Other: 'other'
  };
  this.addObserver = function() {
    model.addObserver(view);
  };
  view.dishLink.click(function(e) {
    e.preventDefault();
    window.app.switchView('description', $(e.target).parents('a').attr('data-id'));
  });
  view.dropDown.change(function(e) {
    model.getAllRecipes(categories[$(e.target).find('option:selected').text()])
    view.update(categories[$(e.target).find('option:selected').text()]);
  });
  // Init
  view.update('main dish');
  this.addObserver();
};