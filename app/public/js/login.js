
var login=function()
{
	const ADMIIN = 1;
	const GSUSER = 2;
	const PTUSER = 3;
	const ONLINE = 1;   // for user status
	const OFFLINE = 0;

	var usersAndKeys = [2]; 
	var correntUser=[2];	

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
						"<input id='username' type='text' placeholder='הכנס שם משתמש'/>"+
						"<input id='password' type='password' placeholder='הכנס סיסמה'/>"+
						"<button id = 'cmdLogin' >התחבר</button>"+
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
						if(allUsers[k].status == ONLINE)
						{
							allreadyOnline();
						}
						else
						{
							// set online
							firebase.database().ref('users/' + k + '/status').set(1)
							// load next page after set user status
							.then(function(data)		
							{
								mainPage.openMainPage(correntUser[0]);
							});	
						}
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
// set user status to offline
	window.onbeforeunload = function () {
		if(correntUser[0] !== undefined)
			firebase.database().ref('users/'+ correntUser[0].userKey + '/status').set(OFFLINE);			//change field in database  
	};



	
return { initModule : initModule, usersAndKeys:usersAndKeys,correntUser:correntUser,getObj:getObj};
}();

$(document).ready(function() {login.initModule($("#login")) ; });