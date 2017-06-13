var login=function()
{
	const PUSER = 0;
	const TUSER = 1;
	const GSUSER = 2;
	const SWUSER = 3;
	const ADMIN = 4;

	var usersAndKeys = [2]; 
	var correntUser=[2];	
	var correntClub=[1];

	var deviceType;
	var database;

	var connectionPage = {
		inputSection:
			"<div class = '+deviceType+'>"+
			"<div class='login-page'>"+

				"<div class='form'>"+
					"<div class='login-form'>"+
						"<img src ='images/pictureLogo.jpg' width='200' height='110'/>"+
						"<input id='username' type='text' placeholder='הכנס שם משתמש'/>"+
						"<input id='password' type='password' placeholder='הכנס סיסמה'/>"+
						"<button id = 'cmdLogin' >התחבר</button></br>"+
						"<img id='loader' src='images/homepreloader.gif'/ width ='40%'>"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</div>"
	};
		
	var stateMap = {$container : null };
	
	var initModule = function($container) 
	{
		database = firebase.database();			// A reference for the database
		stateMap.$container = $container;
		$("body").html(connectionPage.inputSection);
		$("#cmdLogin").click(loginClick);
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
		validateAndPushUser(username,password);
	};

//---------------------------------------------------------------------------------------------------//	
// main login function, handles authentication and connects to system.
	var validateAndPushUser = function(nameArg,passwordArg)
	{
		var ref = firebase.database().ref("users");
		ref.once("value")
		.then(function(data)		
		{
			// in case the root is empty  ->  name is not exist
			if (data.val() == null)
			{
				alert("לא נמצאו משתמשים במערכת");
				return; 
			}

			var allUsers = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(allUsers);	// get all keys
			
			usersAndKeys[0]= allUsers;
			usersAndKeys[1] = keys;
			

			// loop on the answere array to find clubhouse name.
			for(var i =0; i<keys.length;i++)
			{
				var k = keys[i];
				var tempUserName = allUsers[k].username;
				var tempUserPassword = allUsers[k].password;

				if( tempUserName == nameArg && tempUserPassword == passwordArg)
				{
					correntUser[1]=k; 
					correntUser[0] = allUsers[k];
					correntClub[0]=correntUser[0].clubhouseKey;
					$("#loader").css("display", "inline-block");
					setTimeout(function()
					{ 
						mainPage.openMainPage(correntUser[0]); 
					}, 500);
					
					return;
				}
			}
			rejectUser(); // username or password incorrect 
		});
	}

//-------------------------------------------------------------------------------------------
	
	var rejectUser = function(data)			// in case password or username are not exist
	{
		alert("שם משתמש או סיסמה אינם נכונים");
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

//---------------------------------------------------------------------------------------------------
	
	var getObj=function(key)
	{
		return usersAndKeys[0][key];	
	}

//---------------------------------------------------------------------------------------------------//	
   	
return { initModule : initModule,
		 usersAndKeys:usersAndKeys,
		 correntUser:correntUser,
		 correntClub:correntClub,
		 getObj:getObj};
}();

$(document).ready(function() {login.initModule($("#login")) ; });