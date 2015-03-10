var SumheaderView = function (container, model) {
  
  // Functions
  this.setNumberOfGuests = function() {
    container.append('<h2 class="mydinner-header col-xs-8">'+
                          'My Dinner: '+model.getNumberOfGuests()+
                          ' people</h2>'+
                          '<div class="col-xs-4">'+
                          '<a href="selectdish.html" class="btn start-button back-button">'+
                          'Go back and edit dinner</a></div>'
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
    this.backButton = container.find('.back-button');
  };

  //Fields
  this.backButton = container.find('.back-button'); 

  // Init
  this.update(); 
};