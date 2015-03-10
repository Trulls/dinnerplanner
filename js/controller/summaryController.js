var SummaryController = function (view, model) {
  _.bindAll(view, 'update');
  this.addObserver = function() {
    model.addObserver(view);
  };
  view.numberPeople.change(function(e) {
    model.setNumberOfGuests($(e.target).val());
  });
  view.confirmButton.click(function(e) {
    e.preventDefault();
    window.app.switchView('confirm');
  });
  this.addObserver();
};