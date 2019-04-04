window.addEventListener("load", function(){
	let for_change;
	$(".employee").on('contextmenu', function(event) {
		event.preventDefault();
		$("#contextmenu").show(400).
	    	css({
	    		position: 'absolute',
     			top: event.pageY + "px",
      			left: event.pageX + "px"
    		});
    	for_change=event.currentTarget.cells[0].textContent;
	});
	$("#delete").on('click', function(event) {
		event.preventDefault();
		var csrftoken = getCookie('csrftoken');      
		  $.ajax({
		    url: "http://127.0.0.1:8000/employee/delete",
		    beforeSend: function(xhr, settings) {
		        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		            xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
		        
		    },
		    type: "POST",		   
		    data: {'id' : for_change,
		          },
		  })
		    .done(function(){ 
		      $("body").load("list")		
		      console.log('done')		                                                              
		    })
		    .fail(function () {
		      console.log('error');
		    });
	});
	// $("#increase-sallary-rate").on('click', function(event) {
	// 	event.preventDefault();
	// 	var csrftoken = getCookie('csrftoken');      
	// 	  $.ajax({
	// 	    url: "http://127.0.0.1:8000/employee/delete",
	// 	    beforeSend: function(xhr, settings) {
	// 	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	// 	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	// 	        }
		        
	// 	    },
	// 	    type: "POST",
	// 	    data: "JSON",		   
	// 	    data: {'id' : for_change,
	// 	          },
	// 	  })
	// 	    .done(function(){ 
	// 	      $("body").load("list")		
	// 	      console.log('done')		                                                              
	// 	    })
	// 	    .fail(function () {
	// 	      console.log('error');
	// 	    });
	// });


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