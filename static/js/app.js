$(document).ready(function(){
// Inital functions to hide all views and load dashboard updates.
    loadDashboardUpdates();
    hideAllViews();
    showView("dashboard-view");
// Bind all Views with Side Navlinks
    $("[class$=-hyperlink]").click(function(e){
    e.preventDefault();
    hideAllViews();
    showView($(this).attr("view"));
    loadDashboardUpdates();
    });
});

var loadDashboardUpdates = function(){


}
var loadStatus=function(){


}

var hideAllViews=function(){
$("[class$=-view]").hide(); //hide all class that ends with '-view'
};

var showView=function(viewname){
    $("."+viewname+"").show();
}

var loadTemplates = function () {
    
    }

var getJSON = function(apiPath){
    var defer = new $.Deferred();
    var data;
    $.ajax({
              type: "GET",
              url: "http://10.223.251.165:4000"+apiPath,
              success: function (response) {
                  data=response;
                  console.log(data);
            defer.resolve(response);
          //console.log(data);
              },
              error: function (i) {
                console.log("error");
                  console.log(i.statusText);
              },
              dataType: 'json'
          });
    return defer;
  }


