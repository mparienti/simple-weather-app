
$(document).ready(function () {
  $("#search-inpt").keydown(function(event){
    if(event.which == 13 || event.keyCode == 13){
      event.preventDefault();
      $("#search-btn").click();
    }
    if ($('#search-inpt').val() == '') {
      $('#places').remove();
    }
  });
  $('#search-btn').click(function(e) {
    //suppress open class?
    $('#places').remove();
    if ($('#search-inpt').val() != '') {
      $.ajax({
               type: 'GET',
        url: '/autocomplete?term=' + $('#search-inpt').val(),
        dataType: 'json',
        success: showPlace,
        error: function (err) {
          console.log('Request failed to load suggestions.');
        },
        timeout: 3000
      });
    }
  });
  var clickOnPlaces = function (e) {
    e.preventDefault();
    var elem, evt = e ? e:event;
    if (evt.srcElement)  elem = evt.srcElement;
    else if (evt.target) elem = evt.target;
    $('#places').remove();
    $('#place-id').val(elem.id);
    $('#place-form').submit();
  };
  var showPlace = function(data) {
    var dropdownlist = "<ul class=\"dropdown-menu\" id=\"places\">";
    $.map(data, function (listItem) {
      dropdownlist += '<li><a id="'+listItem.id +'" href="#">' + listItem.label + '</a></li>';
    });
    dropdownlist += "</ul>";
    //$('#search-inpt').
    $('#place-form').append(dropdownlist).addClass('open');
    $('#places').click(clickOnPlaces);
  };
})
