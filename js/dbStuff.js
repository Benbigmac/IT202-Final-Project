$(document).ready(function() {

  var webAppUrl = 'https://script.google.com/macros/s/AKfycbx-HK7m1-nFtd7oILF1BochINk1LTD8UGMphgDOA_jUhiQ_PqjB/exec?';

  var sheet = "Sheet1";

  var filters = "stuff";

  var url = webAppUrl + "dataset=" + sheet + "&" + filters;

  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'callback',
    //contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
      console.log(json.length);
      console.log(json);
      $.each(json, function(i, entry) {
        $("body").append("<p>" + JSON.stringify(entry) + "</p>");
          var marker = new google.maps.Marker({
                         position: {lat: parseFloat(entry.LocationX), lng: parseFloat(entry.LocationY)},
                         map: map,
                         title: entry.Event_Name
                         });
           
                   var infowindow = new google.maps.InfoWindow({
                    content: "<h1>" + entry.Event_Name + "</h1>"+"<br>"+ "<h1>"+ entry.Event_Date+" "+entry.Description+"</h1>"
                  });
            marker.addListener('click', function() {
                    infowindow.open(map, marker);
                  });              

      });
    },
    error: function(e) {
      console.log(e.message);
    }
  });

});
