

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
		
			var user = locateUserFromDB(username,password);
			// check if not undefined
			console.log(user);
			if(user)
			{
			
				// need to pass user key as argument to next screen.
				// or get data here and send object....
				//homePagePT.initModule();
				
				mainPage.addHeader(user);
			}


			/*writeUserData();
			var a={username:username,type:2}*/

			// returns object with user key and name or undefined if not exist.
			//mainPage.addHeader(a);
			
/*
			if(!username || username == "" || !password || password == "")
			{
				alert("username or password are empty");
				return;
			}

			//
			if(username == "admin" && password == "123456")
			{
				//check username and password in DB - need to create a function that return user type
				//	homePagePT.initModule();
				var a={username:username,type:2}
				mainPage.addHeader(a);
			}
			///
			else
				alert("username or password are incorrect");*/
		}

		var createClick = function()
		{
			writeUserData();
		}

		var writeUserData=	function () 
		{
			
			var username=$("#username").val();
			var password=$("#password").val();
			var obj={username:username,password:password}		//object that send to database 
			
			database = firebase.database();			// A reference for the database
			usersRef = database.ref('users');				//upload to tree of 'users'
			console.log("usersRef");
			/*var promisePush = usersRef.push({user:obj})
			promisePush.then(function() { console.log("user uploaded");});*/

			usersRef.push(obj);
		
		};		
		
		return { initModule : initModule };

}();

	// Michael.
	// the function check if user exist 
	// and returns newObj{ userKEY, username } or undefined
	var locateUserFromDB = function (usernameArg,passwordArg)
	{
		var pos=0
		var values=[]; 
		var usersRef = database.ref('users'); // refernce to users root

		// Query that inserts all users keys and names to an array.
		usersRef.orderByChild("username").on("child_added", function(snapshot) { 
		values.push({userKey:snapshot.key, username:snapshot.val().username,password:snapshot.val().password});
		});

		// loop on the answere array to find username, and confirm password.
		for(var i =0; i<values.length;i++)
		{
			if (values[i].username == usernameArg && values[i].password == passwordArg)
				return values[i];
		}
		// case not found return undefined.
		return undefined;
	}




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
