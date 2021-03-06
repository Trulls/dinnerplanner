var App = function(model) {
  var views = {
    selectView: new SelectView($(".select-container"), model),
    descriptionView: new DescriptionView($(".description-container"), model),
    confirmView: new ConfirmView($('.confirm-container'), model),
    printView: new PrintView($('.print-container'), model),
    summaryView: new SummaryView($(".summary-container"), model),
    ingredientView: new IngredientView($(".ingredient-container"),model)};

  var controllers = {
    summaryController: new SummaryController(views.summaryView, model),
    selectController: new SelectController(views.selectView, model),
    descriptionController: new DescriptionController(views.descriptionView, model),
    ingredientController: new IngredientController(views.ingredientView, model),
    confirmController: new ConfirmController(views.confirmView, model),
    printController: new PrintController(views.printView, model)};

  var viewsShown = {
        select: function() {
          this.hideAll();
          views.selectView.show();
          views.summaryView.show();
        },
        description: function(choice) {
          this.hideAll();
          views.descriptionView.show();
          views.summaryView.show();
          views.ingredientView.show();
        },
        confirm: function() {
          this.hideAll();
          views.confirmView.show();
        },
        print: function() {
          this.hideAll();
          views.printView.show();
        },
        hideAll: function() {
          _.each(views, function(v, i) {
            v.hide();
          });
        }
      };

  this.switchView = function(view, choice) {
    viewsShown[view](choice);
    model.notifyObservers();
  };

  this.startSpinning = function() {
    views.selectView.startSpinner();
  };
};

$(function() {
  //console.log("Instantiating model, controllers and views");
	var model = new DinnerModel();
  window.app = new App(model);
  
  app.switchView('select')
  app.startSpinning();
  model.getAllRecipes('Main dish');

});