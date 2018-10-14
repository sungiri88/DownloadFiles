$(document).ready(function(){
    $( "#datepicker" ).datepicker();
    var domain=['soa_server1','soa_server2']
    $.each(domain,function(i,v){
      $("#domain").append('<option>'+v+'</option>');
    })
// Inital functions to hide all views and load dashboard updates.
    loadDashboardUpdates();
    hideAllViews();
    showView("dashboard-view");
    $( "#searchForm" ).submit(function( event ) {
      var domain=$("#domain option:selected").text();
      var selectedDate=$("#datepicker").val();
      searchFiles(selectedDate,domain);
     event.preventDefault();
    });
// Bind all Views with Side Navlinks
    $("[class$=-hyperlink]").click(function(e){
    e.preventDefault();
    hideAllViews();
    showView($(this).attr("view"));
    loadDashboardUpdates();
    });
});

var searchFiles=function(inputDate,inputDomain){
  var data={date:"",domain:"test"};
  data.date=inputDate 
  data.domain=inputDomain 
  $.when(postJSON("/api/files",data)).done(function(result){
    var fileHtml='<ul>';
    if(result.length > 0)
    {
      $.each(result,function(i,v){
        fileHtml+='<li><a href="/api/downloadlogfile/'+v+'">'+v+'</a></li>'
        console.log(fileHtml)
      })
    }
    else
      fileHtml+='<li>No Records Found!</li>'
    fileHtml+='</ul>';
    console.log(fileHtml);          
    $("#fileList").html(fileHtml);
  })
          
}
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



var postJSON = function(apiPath,inputdata){
    var defer = new $.Deferred();
    var data;
    $.ajax({
              method: "POST",
              processData: "false",
              dataType: 'json',
              headers: {
                "content-type": "application/json",
                "cache-control": "no-cache"                
              },
              url: apiPath,
              data: JSON.stringify(inputdata),
              success: function (response) {
                  data=response;
                  console.log(data);
                  defer.resolve(response);
              },
              error: function (i) {
                console.log("error");
                  console.log(i.statusText);
              }
          });
    return defer;
  }

var getJSON = function(apiPath){
    var defer = new $.Deferred();
    var data;
    $.ajax({
              type: "GET",
              url: apiPath,
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


