var ConfirmController = function (view, model) {
  _.bindAll(view, 'update');
  this.addObserver = function() {
    model.addObserver(view);
  };
  
  var target = document.getElementById('spin-city');

  view.printButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('print');
  });
  view.backButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('select');
  });
  view.dishLink.click(function(e) {
    e.preventDefault();
    view.spinner.spin(target);
    model.getDish($(e.target).parents('a').attr('data-id'), 'description');
  });
  this.addObserver();
};