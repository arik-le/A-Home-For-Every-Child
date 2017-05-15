var login=function()
{
		var ADMIIN = 1;
		var GSUSER = 2;
		var PTUSER = 3;

		var deviceType;
		var database;
		var usersRef;
		var correntUser;
		var userExist = false;

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
	
			$("body").html(connectionPage.inputSection);
			$("#cmdLogin").click(loginClick);
			$("#cmdCreate").click(createClick);
		};
		
//---------------------------------------------------------------------------------------------------//

		var createClick = function(e) 
		{
			var username=$("#username").val();
			var password=$("#password").val();
			var newUser = User.create(username,password,"admin","istrator","A",3);
		
			var key = usersRef.push(newUser);
		};

//---------------------------------------------------------------------------------------------------//

		var loginClick = function(e)
		{
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
		
			if(username == "" || password == "")
			{
					alert("אנא הכנס שם משתמש וסיסמה");
					return;
			}
			usersRef.on("value",gotUserData,errUserData);
		};

//---------------------------------------------------------------------------------------------------//

		var gotUserData = function (userData) 
		{ 
			if(!(document.getElementById("username")))
				return;
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
				if (tempUsername == username && tempPassword == password )
				{
					userExist = true;
					correntUser = allUsers[k];
					if(allUsers[k].status == 1)
					{
						allreadyOnline();
						return;
					}
					mainPage.openMainPage(correntUser);
					firebase.database().ref('users/' + k + '/userKey').set(k);					//change filed in database
					firebase.database().ref('users/' + k + '/status').set(1);					//change filed in database
					return;
				}
			}
			if(!userExist)
				rejectUser();
		}

//---------------------------------------------------------------------------------------------------//

		var errUserData = function (data) 
		{ 
			console.log(err);
			alert("התרחשה שגיאה כלשהי,אנא נסה מאוחר יותר");
		}

//---------------------------------------------------------------------------------------------------//

		var rejectUser = function(data)			// in case password or username are not exist
		{
			alert('username or password are incorrect');
			document.getElementById("username").value = "";
			document.getElementById("password").value = "";
		}

//---------------------------------------------------------------------------------------------------//

		var allreadyOnline = function()
		{
			alert("המשתמש כבר נמצא במערכת - במידה ונתקלת בבעיה פנה למנהל המורשה");
			document.getElementById("username").value = "";
			document.getElementById("password").value = "";
		};

//---------------------------------------------------------------------------------------------------//	

    return { initModule : initModule};
}();

$(document).ready(function() {login.initModule($("#login")) ; });
