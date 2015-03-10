var SumheaderController = function (view, model) {
  _.bindAll(view, 'update');
  this.addListeners = function() {
    model.addObserver(view.update);
  };
  view.backButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('select');
  });
  this.addListeners();
};