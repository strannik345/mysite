var floor = 1;
window.addEventListener('load',function(){
	var rooms=document.getElementsByClassName('room');
	for (var i = 0; i < rooms.length; i++) {
		rooms[i].addEventListener('click', show);
	}
	var cross=document.getElementsByClassName('cross');
	cross[0].addEventListener('click', hide);
	var around_modal=document.getElementsByClassName("around_modal");
	window.onclick = function(event) {
    	if (event.target == around_modal[0]) {
        hide();
    	}
	};
	document.getElementById("backSideMenu").addEventListener('click', function(){
      document.getElementById("sideMenu").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      document.getElementById("backSideMenu").style.display = 'none'; 
    });

    
    let btnContainer  = document.getElementsByClassName("floor_container");
	let btns = document.getElementsByClassName("floor_button");
	for (let i = 0; i < btns.length; i++) 
	{
 		btns[i].addEventListener("click", function(){ 			
 			let topContainer = document.getElementsByClassName("container_top");
			let roomTop = topContainer[0].getElementsByClassName("room");
			let botContainer = document.getElementsByClassName("container_bottom");
			let roomBot = botContainer[0].getElementsByClassName("room");

			roomTop[0].firstChild.textContent=1;
			roomBot[0].firstChild.textContent=2;
			for(let j=1; j<roomTop.length; j++)
			{
				roomTop[j].firstChild.textContent=+roomTop[j-1].firstChild.textContent+2;
				roomBot[j].firstChild.textContent=+roomBot[j-1].firstChild.textContent+2;
			}

			let current = document.getElementsByClassName("active");
			if(current[0]!=null)
			{
				current[0].className = current[0].className.replace(" active", "");	
			}    		
			this.className += " active";
			floor=+this.textContent
			
			for(let y = 0; y<roomTop.length; y++)
			{
				let rmNTop=+roomTop[y].firstChild.textContent;
				let rmNBot=+roomBot[y].firstChild.textContent;
				roomTop[y].firstChild.textContent = rmNTop+100*(i+1);		
				roomBot[y].firstChild.textContent = rmNBot+100*(i+1);	
			}
			ajax();
 		});
 	}
 	ajax();
  
});

function ajax(){
	var csrftoken = getCookie('csrftoken');
 	$.ajax({
    url: "http://127.0.0.1:8000/floorView/rooms_occupied",
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
        
    },
    type: "POST",
    dataType: "JSON",
    data: {'floor' : floor, },
  })
    .done(function(data){ 
      console.log(data);
      console.log(typeof(data)); 
      var elem = document.getElementsByClassName('container_top')[0]
      for(var i=0; i < elem.childNodes.length; i++)
      {
      	  elem.childNodes[i].className = 'room';         
          for(var k=0; k<data.length;k++)
          {

            if(elem.childNodes[i].textContent == data[k])
            {
              elem.childNodes[i].className += ' occupied';                 
            } 
          }
      }
      var elemBtn = document.getElementsByClassName('container_bottom')[0]
      for(var i=0; i < elemBtn.childNodes.length; i++)
      {
          elemBtn.childNodes[i].className = 'room';         
          for(var k=0; k<data.length;k++)
          {

            if(elemBtn.childNodes[i].textContent == data[k])
            {
              elemBtn.childNodes[i].className += ' occupied';                 
            } 
          }
      }                                                              
    })
    .fail(function () {
      console.log('error');
    });
}
function ajax_room(room){
	var csrftoken = getCookie('csrftoken');
 	$.ajax({
    url: "http://127.0.0.1:8000/floorView/room_info",
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }        
    },
    type: "POST",
    dataType: "JSON",
    data: {'room' : room, },
  })
    .done(function(data){ 
      console.log(data.capacity);
      console.log(data.room_number);
      console.log(data.price_per_night);
      console.log(typeof(data)); 
      document.getElementById("price_per_night").textContent = data.price_per_night + '$';
      document.getElementById("capacity").textContent = data.capacity + 'ч';
      document.getElementById("status");
      status = sessionStorage.getItem('room');
      console.log(typeof(status));
      console.log(status);
      console.log(status.indexOf("occupied"));
      console.log(typeof(status.indexOf("occupied")));
      if(status.indexOf("occupied")>-1)
      {
        console.log("occupied");
        document.getElementById("status").textContent = "Занято";
      }
      else
      {
        document.getElementById("status").textContent = "Свободен";
      }
       
                                                              
    })
    .fail(function () {
      console.log('error');
    });
}
function show() {
  console.log(this.className);
  sessionStorage.setItem('room', this.className);
	var modal=document.getElementsByClassName("grid_container");
	var around_modal=document.getElementsByClassName("around_modal");
	var number=document.getElementsByClassName("number");
	room=+this.firstChild.textContent;
	number[0].firstChild.textContent="Номер " + this.firstChild.textContent;
	modal[0].style.display = 'grid';
	around_modal[0].style.display = 'block';	
	ajax_room(room);
				
}
function hide(){
	var modal=document.getElementsByClassName("grid_container");
	var around_modal=document.getElementsByClassName("around_modal");
	modal[0].style.display = 'none';
	around_modal[0].style.display = 'none';
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