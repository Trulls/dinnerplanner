var PrintController = function (view, model) {
  _.bindAll(view, 'update');
  this.addObserver = function() {
    model.addObserver(view);
  };
  this.addObserver();
};