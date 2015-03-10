var ConfirmController = function (view, model) {
  _.bindAll(view, 'update');
  this.addListeners = function() {
    model.addObserver(view.update);
  };
  view.printButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('print');
  });
  this.addListeners();
};