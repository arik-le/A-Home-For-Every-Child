

var login=function()
{
		var ADMIIN = 1;
		var GSUSER = 2;
		var PTUSER = 3;

		var deviceType;
		var database;
		var usersRef;
		
		var connectionPage = {
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
	
			$("#login").html(connectionPage.inputSection);
			$("#cmdLogin").click(loginClick);
			$("#cmdCreate").click(createClick);
			
			if(deviceType=="col-md-12")
				$(".login-page").css('margin-top','10%');
		};
		


		var createClick = function(e) 
		{
			user.username=$("#username").val();
			var password=$("#password").val();
			var obj={password:password,username:username,type:PTUSER}		//object that send to database */
		
			var key = usersRef.push(user);
		};


		// login click listener - make DB user tree request, continuing from event gotUserData
		var loginClick = function(e)
		{
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
		
			if(username == "" || password == "")
			{
					alert("אנא הכנס שם משתמש וסיסמה");
					return;
			}
			// attach listeners on  usersRef to get users tree
			// the answere will be on gotUserData function if success or in errUserData on failure 
			usersRef.on("value",gotUserData,errUserData);
		};
	
		/*
			 התבנית של קבלת עץ של אובייקטים.
			 כאן כאשר מגיע כל העץ שולפים את הערכים באמצעות המפתחות
			 וניתן לבצע שאילתות על הערך החוזר
		*/
		// value eventlistener fired when value got from DB
		var gotUserData = function (userData) 
		{ 
			// username and password from textboxes
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value

			//values.push({userKey:snapshot.key, username:snapshot.val().username,password:snapshot.val().password});
			var allUsers = userData.val();   
			var keys = Object.keys(allUsers);
		
			// loop on the answere array to find username, and confirm password.
			for(var i =0; i<keys.length;i++)
			{
				var k = keys[i];
				var tempUsername  = allUsers[k].username;
				var tempPassword  = allUsers[k].password;
				if ( tempUsername == username && tempPassword == password )
				{
					// loads the next page by user typeca
					acceptUser(allUsers[k]);
					return;
				}
			}
			rejectUser();
		}
			
		// in case DB request failed
		var errUserData = function (data) 
		{ 
			console.log(err);	
		}
		
		// in case username and password are correct.
		// start initmodule of the next page per user.
		var acceptUser = function(user)
		{
			/*if(user.type)
			{
				/*if(user.type == ADMIN)
					mainPage.addHeader();
				if(user.type == GSUSER)
					mainPage.addHeader();
				if(user.type == PTUSER)
				{
							alert("here");
							
					mainPage.addHeader();

				}
			}*/
			mainPage.addHeader(user);
			
		}

		// in case password or username are not exist
		var rejectUser = function(data)
		{
			alert('username or password are incorrect');
			document.getElementById("username").value = "";
			document.getElementById("password").value = "";
		}
	

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
