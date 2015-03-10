var ConfirmController = function (view, model) {
  _.bindAll(view, 'update');
  this.addObserver = function() {
    model.addObserver(view);
  };
  view.printButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('print');
  });
  view.backButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('select');
  });
  this.addObserver();
};