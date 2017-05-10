var deviceType;

var homePagePT = function()
{
		var pagePT = {
		
			inputSection:
			  '<div class = "+deviceType+">'+
          '<div class= "logout">התנתק</a> </div>' + 
     
          '<nav id="header" class="nav-bar">'+
              '<input type="button" id="buttons" class="dropbtn" value=" טפסים" onclick="myFunction()"/>'+
              '<input type="button" id="buttons" class="dropbtn" value="הודעות" onclick="myFunction()"/>'+
              '<input type="button" id="buttons" value=" דף הבית" onclick="myFunction()"/>'+
              '<div class="dropdown-content" id="myDropdown">'+
                  '<a href="#">Link 1</a>'+
                  '<a href="#">Link 2</a>'+
                  '<a href="#">Link 3</a>'+
               '</div>'+
          '</nav>'+

        '<div id="box">'+
            '<div id="Subject">'+
                '<span id="author"> massage from:<span id="authorName" > arik96</span></span>'+
                '<div id="msgTitle" value="">טיול בעין יעל עם הקקות</div>'+
            '</div>'+
        '<div id="msgContiner">תוכן....</div>'+
        '<div id="msgFooter">מחק הודעה</div>'+
		'</div>'
		}
		var stateMap = {$container : null };
		
		var initModule = function($container) 
		{
			stateMap.$container = $container;
			database = firebase.database();			// A reference for the database
			deviceType = login.deviceType;
    	$("body").html("");
			$("body").html(pagePT.inputSection);

		
		};

    function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    }

    /*
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(e) {
      if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
          if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
          }
      }
    }*/
		
		return { initModule : initModule };

}();