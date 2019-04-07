$( function() {
    $( "#id_checkin_date" ).datepicker({
      showOn: "button",
      buttonImage: "/static/booking/calendar.gif",
      minDate: 0,
      buttonImageOnly: true,
      buttonText: "Select date",
      onSelect: function(){       
        $( "#id_checkout_date" ).datepicker( "option", { minDate: getDate(), disabled: false} );  
        document.getElementById('id_room_number').value='';              
      },
    });
  }
);
function getDate(){
  var currentDate = $( "#id_checkin_date" ).datepicker( "getDate" );
  return currentDate; 
}
$( function() {   
    $( "#id_checkout_date" ).datepicker({
      showOn: "button",
      buttonImage: "/static/booking/calendar.gif",
      disabled: true,      
      buttonImageOnly: true,
      buttonText: "Select date",
      onSelect: ajax,
    });
  }
);
function ajax(){   
  document.getElementById('id_room_number').value='';            
  var csrftoken = getCookie('csrftoken');      
  $.ajax({
    url: "http://93.125.18.60/booking/check_in",
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
        
    },
    type: "POST",
    dataType: "JSON",
    data: {'checkin_date' : $( "#id_checkin_date" ).val(),
           'checkout_date' : $( "#id_checkout_date" ).val(),
          },
  })
    .done(function(data){ 
      console.log(data);
      console.log(typeof(data)); 
      var elem = document.getElementById('container_form_right')
      for(var i=0; i < elem.childNodes.length; i++)
      {
        for(var j=0; j < elem.childNodes[i].childNodes.length; j++)
        {
          elem.childNodes[i].childNodes[j].className = 'btn'
          for(var k=0; k<data.length;k++)
          {
            if(elem.childNodes[i].childNodes[j].textContent == data[k])
            {
              elem.childNodes[i].childNodes[j].className = 'occupied';                 
            } 
          }
        }                               
        btn_class();
      }
                                                              
    })
    .fail(function () {
      console.log('error');
    });
    enable();
    document.getElementById("disabled_right").style.display = 'none';
}
function openNav() {
    document.getElementById("sideMenu").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("backSideMenu").style.display = 'block';    
}
function closeNav() {
    document.getElementById("sideMenu").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("backSideMenu").style.display = 'none'; 

}
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function btn_class(){
  var btns = document.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) 
  {
    btns[i].addEventListener("click", a);
  }
}
function a()
{   
    var rNum = document.getElementById('id_room_number');
    var current = document.getElementsByClassName("booking");
    if(current[0]!=null)
    {          
      current[0].className = current[0].className.replace(" booking", "");        
    }
    if(this.className != 'occupied')
    {
      this.className += " booking";
      rNum.value = parseInt(this.textContent); 
    }
}
function disable(){
  document.getElementById("id_first_name").disabled = true;
  document.getElementById("id_surname").disabled = true;
  document.getElementById("id_patronymic").disabled = true;
  document.getElementById("id_passportID").disabled = true;
  document.getElementById("id_adress").disabled = true;
}
function enable(){
  document.getElementById("id_first_name").disabled = false;
  document.getElementById("id_surname").disabled = false;
  document.getElementById("id_patronymic").disabled = false;
  document.getElementById("id_passportID").disabled = false;
  document.getElementById("id_adress").disabled = false;
}
window.addEventListener('load', function(){  
  if(sessionStorage.getItem('room'))
  {
    rNum.value = sessionStorage.getItem('room');
  }  
  btn_class();
  disable();
  document.getElementById("disabled_right").style.display = 'block';  
  document.getElementById("backSideMenu").addEventListener('click', function(){
      document.getElementById("sideMenu").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      document.getElementById("backSideMenu").style.display = 'none'; 
    });  
});