

var deviceType;
var database;


var login=function()
{
		var loginPage = {
		
			inputSection:
			 '<div class = "+deviceType+">'+
				'<div class="login-page">'+
					'<div class="form">'+
						'<form class="login-form">'+
						    '<img src ="images/pictureLogo.jpg" width="200" height="110"/>'+
							'<input id="username" type="text" placeholder="username"/>'+
							'<input id="password" type="password" placeholder="password"/>'+
							'<button id = "cmdLogin" >login</button>'+
							'<button id = "cmdCreate" >create</button>'+
						'</form>'+
					'</div>'+
				'</div>'+
			'</div>'
		}
		var stateMap = {$container : null };
		
		var initModule = function($container) 
		{
			stateMap.$container = $container;
			database = firebase.database();			// A reference for the database
			//console.log(database.app.database());
			deviceType=screenSize.type();
			$("body").html(loginPage.inputSection);
			$("#cmdLogin").click(loginClick);
			$("#cmdCreate").click(createClick);

			if(deviceType=="col-md-12")
				$(".login-page").css('margin-top','10%');
		};
		    
	
		var loginClick = function()
		{
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;

			if(!username || username == "" || !password || password == "")
			{
				alert("username or password are empty");
				return;
			}

			//
			if(username == "admin" && password == "123456")
			{
				//check username and password in DB - need to create a function that return user type
				homePagePT.initModule();
			}
			///
			else
				alert("username or password are incorrect");
		}

		var createClick = function()
		{
			writeUserData();
			console.log("dfsfdsfsdfdsaf");
		}

		var writeUserData=	function () 
		{
			var username=$("#username").val();
			var password=$("#password").val();
			var obj={username:username,password:password}		//object that send to database 
			var usersRef = database.ref('users');				//upload to tree of 'users'

			/*var promisePush = usersRef.push({user:obj})
			promisePush.then(function() { console.log("user uploaded");});*/
	//		usersRef.push({user:obj});
			for(var i=0;i<100;i++)	
				console.log(i);
		};	
		
		return { initModule : initModule };

}();

var screenSize=function()
{
    var type=function()
    {
        var sizeWidth =window.screen.availWidth;
        if(sizeWidth>1300)
             return "col-md-12";
        if(sizeWidth>740)
            return "col-sm-12";
        else
            return "col-xs-12";
    }
    return{type:type};
}();

$(document).ready(function() {login.initModule($("body")); });
