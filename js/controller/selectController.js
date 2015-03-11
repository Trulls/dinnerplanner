var SelectController = function (view, model) {
  _.bindAll(view, 'update');

  // Variables
  var categories = {Main: 'main dish',
                    Dessert: 'dessert',
                    Starter: 'starter',
                    Other: 'other'};

  var target = document.getElementById('spin-city');

  // Observer
  this.addObserver = function() {
    model.addObserver(view);
  };

  // Elements
  view.dishLink.click(function(e) {
    e.preventDefault();
    view.spinner.spin(target);
    model.getDish($(e.target).parents('a').attr('data-id'), 'description');
  });
  view.dropDown.change(function(e) {
    e.preventDefault();
    view.spinner.spin(target);
    model.getAllRecipes(categories[$(e.target).find('option:selected').text()])
  });
  view.input.on('input', function(e) {
    e.preventDefault();
    view.spinner.spin(target);
    model.getAllRecipes(categories[$('select option:selected').text()], $(e.target).val())
  });
  
  // Init
  this.addObserver();
  view.spinner.spin(target);
};