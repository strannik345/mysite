window.addEventListener("load", function(){
	let for_change;
	$(".position").on('contextmenu', function(event) {
		event.preventDefault();
		$("#contextmenu").show(400).
	    	css({
	    		position: 'absolute',
     			top: event.pageY + "px",
      			left: event.pageX + "px"
    		});
    	for_change=event.currentTarget.cells[0].textContent;
	}); 
	$("body").on('click', function(event) {
		$("#contextmenu").hide();
	});
	$(".around-form").on('click', function(event) {    	    		
      $(".around-form").hide();
      $("#rate-enter").hide();	
      $("#position-enter").hide();
  });
  $(".around-form").on('click', function(event) {    	    		
    $(".around-form").hide();
    $("#sallary-enter").hide();	
      });
  $("#change_sallary").on('click', function(event) {
    console.log("hello");
    var csrftoken = getCookie('csrftoken');      
    $.ajax({
      url: "http://93.125.18.60/position/current_sallary",
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }          
      },
      type: "POST",
      dataType: "JSON",		   
      data: {'id' : for_change,
            },
    })
      .done(function(sallary){ 
        console.log(sallary);
        $("#current-sallary-value").text(sallary);
        $("#contextmenu").hide();
        $(".around-form").show();
        $("#sallary-enter").css('display', 'grid');			                                                              
      })
      .fail(function () {
        console.log('error');
      });
  });
  $("#save-new-sallary").on('click', function(event) {
		event.preventDefault();
		var csrftoken = getCookie('csrftoken');      
		  $.ajax({
		    url: "http://93.125.18.60/position/save_sallary",
		    beforeSend: function(xhr, settings) {
		        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		            xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
		        
		    },
		    type: "POST",		   
		    data: {	'sallary' : $("#new-sallary-input").val(),
		    		'id' : for_change,
		          },
		  })
		    .done(function(rate){ 
		      $(".around-form").hide();
		      $("#sallary-enter").hide();		      			                                                              
		    })
		    .fail(function () {
		      console.log('error');
        });  
        document.location.reload(true);  
  });

  $("#new_position").on('click', function(){
    $(".around-form").show();
    $("#position-enter").css('display','grid');
  });

  $("#save-position").on('click', function(event) {
		event.preventDefault();
		var csrftoken = getCookie('csrftoken');      
		  $.ajax({
		    url: "http://93.125.18.60/position/save_position",
		    beforeSend: function(xhr, settings) {
		        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		            xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
		        
		    },
		    type: "POST",		   
		    data: {	'position' : $("#position-input").val(),
		    		  'sallary' : $("#position-sallary-input").val(),
		          },
		  })
		    .done(function(rate){ 
		      $(".around-form").hide();
		      $("#position-enter").hide();		      			                                                              
		    })
		    .fail(function () {
		      console.log('error');
        });  
        document.location.reload(true);  
  });
});


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