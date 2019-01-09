window.addEventListener('load',function(){
	var btnContainer  = document.getElementsByClassName("floor_container");
	var btns = document.getElementsByClassName("floor_button");
	for (var i = 0; i < btns.length; i++) 
	{
 		btns[i].addEventListener("click", function() {

 			var topContainer = document.getElementsByClassName("container_top");
 			var roomTop = topContainer[0].getElementsByClassName("room");
 			var botContainer = document.getElementsByClassName("container_bottom");
 			var roomBot = botContainer[0].getElementsByClassName("room");

 			roomTop[0].firstChild.textContent=1;
 			roomBot[0].firstChild.textContent=2;
 			for(var j=1; j<roomTop.length; j++)
 			{
 				roomTop[j].firstChild.textContent=+roomTop[j-1].firstChild.textContent+2;
 				roomBot[j].firstChild.textContent=+roomBot[j-1].firstChild.textContent+2;
 			}

    		var current = document.getElementsByClassName("active");
    		if(current[0]!=null)
    		{
    			current[0].className = current[0].className.replace(" active", "");	
    		}    		
    		this.className += " active";
    		
			for(var y = 0; y<roomTop.length; y++)
			{
				var rmNTop=+roomTop[y].firstChild.textContent;
				var rmNBot=+roomBot[y].firstChild.textContent;
				roomTop[y].firstChild.textContent = rmNTop+100*(i+1);		
				roomBot[y].firstChild.textContent = rmNBot+100*(i+1);	
			}	
  		} );
	}
});
