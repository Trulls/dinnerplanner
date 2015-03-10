var SumheaderView = function (container, model) {
  
  // Fields
  var numbersContainer = container.find('#sumheader-numbers');
  this.backButton = container.find('.back-button'); 

  // Functions
  this.setNumberOfGuests = function() {
    numbersContainer.append('<h2 class="mydinner-header col-xs-8">'+
                            'My Dinner: '+model.getNumberOfGuests()+
                            ' people</h2>'
                            );
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function() {
    console.log("Update called: SumheaderView");
    container.html('');
    this.setNumberOfGuests();
  };


  // Init
  this.update(); 
};