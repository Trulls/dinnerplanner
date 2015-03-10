var SumheaderController = function (view, model) {
  _.bindAll(view, 'update');
  this.addObserver = function() {
    model.addObserver(view);
  };
  view.backButton.click(function(e) {
  	console.log("e: " + e);
    e.preventDefault();
    console.log("preventDefault")
    window.app.switchView('select');
  });
  this.addObserver();
};