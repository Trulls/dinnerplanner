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
    model.getDish($(e.target).parents('a').attr('data-id'), 'description');
  });
  view.dropDown.change(function(e) {
    model.getAllRecipes(categories[$(e.target).find('option:selected').text()])
  });
  view.input.on('input', function(e) {
    // filter = $(e.target).val();
    model.getAllRecipes(categories[$('select option:selected').text()], $(e.target).val())
    // view.update(categories[$('select option:selected').text()], filter);
  });
  
  // Init
  this.addObserver();
};