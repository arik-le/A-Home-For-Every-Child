

var login=function()
{
		var deviceType;
		var database;
		var usersRef;
		
		var configMap = {
			inputSection:
			 "<div class = '+deviceType+'>"+
				"<div class='login-page'>"+
					"<div class='form'>"+
						"<div class='login-form'>"+
						    "<img src ='images/pictureLogo.jpg' width='200' height='110'/>"+
							"<input id='username' type='text' placeholder='username'/>"+
							"<input id='password' type='password' placeholder='password'/>"+
							"<button id = 'cmdLogin' >login</button>"+
							"<button id = 'cmdCreate' >create</button>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>"
		};
		
		var stateMap = {$container : null };
		
		var initModule = function($container) 
		{
			stateMap.$container = $container;
			database = firebase.database();			// A reference for the database
			usersRef = database.ref('users');
	
			$("#login").html(configMap.inputSection);
			$("#cmdLogin").click(loginClick);
			$("#cmdCreate").click(createClick);
			
			if(deviceType=="col-md-12")
				$(".login-page").css('margin-top','10%');
		};
		
		var loginClick = function(e)
		{
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
		
			if(username == "" || password == "")
			{
					alert("אנא הכנס שם משתמש וסיסמה");
					return;
			}
			
			var userKey = locateUserFromDB(username,password);
			
			if(userKey)			
			{
				//check if not undefined
				homePagePT.initModule();
			}
			else
			{
				alert("שם המשתמש או הסיסמא שהוכנסו שגויים");
				document.getElementById("username").value = "";
				document.getElementById("password").value = "";
			}
	
		};

		var createClick = function(e) 
		{
			var username=$("#username").val();
			var password=$("#password").val();
			var obj={password:password,username:username}		//object that send to database 
		
			usersRef.push(obj);
		};

		// Michael.
		// the function check if user exist 
		// and returns newObj{ userKEY, username } or undefined
		var locateUserFromDB = function (usernameArg,passwordArg)
		{
			var values = []; 
			var usersRef = database.ref('users'); // refernce to users root

			// Query that inserts all users keys and names to an array.
			usersRef.orderByChild("username").on("child_added", function(snapshot) { 
			values.push({userKey:snapshot.key, username:snapshot.val().username,password:snapshot.val().password});
			});
			
			// loop on the answere array to find username, and confirm password.
			for(var i =0; i<values.length;i++)
			{
				
				if (values[i].username == usernameArg && values[i].password == passwordArg)
				{
					console.log(values[i].userKey);
					return values[i].userKey;
				}
			}
			// case not found return undefined.
			return undefined;
		};


    return { initModule : initModule };
}();

$(document).ready(function() {login.initModule($("#login")) ; });

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

