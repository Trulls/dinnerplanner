var DescriptionController = function (view, model) {
  _.bindAll(view, 'update');
  this.addObserver = function() {
    model.addObserver(view);
  };
  view.backButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('select');
  });

  // Init
  this.addObserver();
};