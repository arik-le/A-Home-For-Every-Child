var usersManagement = function()
{
	const PUSER = 0;
	const TUSER = 1;
	const GSUSER = 2;
	const SWUSER = 3;
	const ADMIN = 4;

	const FAIL = -1;
	const ADDPAGE = 1;
	const EDITPAGE = 2;
	var clubhousesInfo = []; // key and name

	var page;
	var addPrevType;
	var AddSectionClubName;
	var EditSectionClubName;
	var clubIndex_Edit;
	var userToEdit;
     //-------------------------------------------------------------------------------------------------
     var UserPage={
        inputSection:
        '<div class="container">'+
            	'<div class="row main">'+
				'<div class="panel-heading">'+
	               '<div  class="panel-title text-center">'+
	               		'<h2 id="registerTitle" class="registerTitle">רישום משתמש</h2>'+
	                '</div>'+
	            '</div> '+

			'<div class="main-login main-center">'+
				'<form class="form-horizontal" method="post" action="#">'+
					
					'<div class="form-group">'+
						'<label for="name" class="col-sm-2 controlLabel" >:שם פרטי</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
								'<input type="text" class="form-control" name="name" id="UserPName" placeholder="הכנס שם פרטי" dir="rtl" />'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="UserLastName" class="col-sm-2 controlLabel" id="formTxts">:שם משפחה</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
								'<input type="text" class="form-control" name="UserLastName" id="UserLName" placeholder="הכנס שם משפחה" dir="rtl"/>'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="username" class="col-sm-2 controlLabel">:שם משתמש</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>'+
								'<input type="text" class="form-control" name="username" id="username"  placeholder="הכנס שם משתמש" dir="rtl"/>'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="username" class="col-sm-2 controlLabel">:סוג משתמש</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-slideshare" aria-hidden="true"></i></span>'+
								'<select type="text" class="form-control" id="userType">'+
									'<option value = "0" class="ptUser">הורה</option>'+
									'<option value = "1" class="tcUser">מורה</option>'+
									'<option value = "2" class="GuUser">מדריך</option>'+
									'<option value = "3" class="SWUser">עו"ס</option>'+
									'<option value = "4" class="AdmUser">מנהל</option>'+
								'</select>'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="password" class="col-sm-2 controlLabel">:סיסמא</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
								'<input type="password" class="form-control" name="password" id="password" placeholder="הכנס סיסמה"/>'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="confirm" class="col-sm-2 controlLabel">:אימות סיסמא</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
								'<input type="password" class="form-control" name="confirm" id="confirm"  placeholder="אמת בשנית סיסמה"/>'+
							'</div>'+
						'</div>'+
					'</div>'+

						'<div id="selectCHSection" class="form-group">'+
						'<label for="clubHouseName" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
								'<select type="text" id="clubhouse_select_Add" class="form-control clubHouseName"  placeholder="בחר מועדונית מתוך הרשימה">'+
								'</select>'+
							'</div>'+
						'</div>'+
						'</div>'+
					'<div class="form-group" id="buttons_area">'+
						
					'</div>'+
				'</form>'+
			'</div>'+
	'</div>'
     }
       //-------------------------------------------------------------------------------------------------
        var EditUserOp={
        inputSection:
			'<div class="container">'+
				'<label id="selectCHLabel" for="clubBottunGroup" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
				'<br>'+

			'<div class="row">'+
				'<div id = "clubBottunGroup" class="col-md-4 text-center">'+
				
				'</div>'+
			'</div>'+
				'</div>'+
				'<br>'+
				'<label id="userSelEdit" for="clubHouseUsers" class="col-sm-2 controlLabel">:בחר משתמש</label>'+
				'</br>'+
				'<div class="input-group">'+
						'<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>'+
						'<select type="text" id="usersInCH" class="form-control" >'+
						'</select>'+
				'</div>'+
				'</br>'+
				'<div class="col-md-4 text-center">'+
					'<button type="button" id="openUserEditBtn" class="btn btn-warning btn3d">לחץ כאן לערוך</button>'+
				'</div>'+
			'</div>'
        }
		var EditUserButtons={
        inputSection:
			'</br>'+
			'<button id ="change-button" type="button" class="btn btn-primary btn-block btn-lg edit-button"  >עריכה</button>'+
			'<button id ="delete-button" type="button" class="btn-danger btn-danger btn-block btn-lg  delete-button"  >מחיקת משתמש</button>'
	}
	var addUserButton={
        inputSection:
	'</br>'+
	'<button type="button" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" id="addUser" >הרשמה</button>'
	}

	/////////////////////////////////////////////////////////////////////
	//			ADD USER											   //
	/////////////////////////////////////////////////////////////////////

    var addUser=function()
    {
		page = ADDPAGE;
		clubhousesInfo = [];
		loadClubhousesData();
        $('.Nav').collapse('hide');
        $("#body").html(UserPage.inputSection);
		$('#buttons_area').html(addUserButton.inputSection);
        $("#addUser").click(createUser);
		addPrevType=0;
		$('#userType').click(updateType);
    }

    //-------------------------------------------------------------------------------------------------
    var createUser=function()
    {
        var firstName=document.getElementById("UserPName").value;
        var lastName=document.getElementById("UserLName").value;
        var username=document.getElementById("username").value;
		console.log(username);
		if (firstName == "" || lastName == "" || username == "")
		{
			alert("אנא מלא את כל השדות הנדרשים");
			return;
		}
        // selecting the clubhouse
		var e;
		if (page == ADDPAGE)
        	e = document.getElementById("clubhouse_select_Add");

		if(e.selectedIndex == -1)// when there are no clubhouses at DB
		{
			alert("אנא הזן מועדוניות לפני יצירת משתמשים במערכת");
			return;
		}

        var Uclubhouse = e.options[e.selectedIndex].text;
		var clubKey = getClubKeyByName(Uclubhouse);

        for(var i=0;i<login.usersAndKeys[0].length;i++)
        {
            if(login.usersAndKeys[0][i].username==username )
            {
                alert("שם משתמש כבר קיים");
                return;
            }
        }
        var fPassword=document.getElementById("password").value;
        var sPassword=document.getElementById("confirm").value;
        if( sPassword!=fPassword && fPassword != "" )//&& fPassword < 4)
        {
            alert(" הסיסמאות שהוזנו אינן תואמות");
            return;
        }
        e=document.getElementById("userType");
		var type = e.selectedIndex;
	
		if(type < 0 )
		{
			alert("אנא מלא את כל השדות הנדרשים");
			return;
		}
		
        var database = firebase.database();	
		if(isUserExist(username) == true)
		{
			alert('שם המשתמש שהוזן כבר קיים');
			// clear all fields
			return;
		}
        var usersRef = database.ref('users');
        var newUser = User.create(username,fPassword,firstName,lastName,type,clubKey);
        var key = usersRef.push(newUser);
        // firebase.database().ref('users/' + key.key + '/userKey').set(key.key);
		// updateClubhouse(Uclubhouse,type,key.key,username);
        alert("הוזן בהצלחה");
		addUser();
    }

	var isUserExist = function(usernameArg)
	{
		var res = false;
		firebase.database().ref('users').once('value')
		.then(function(data)
		{
			var allusers = data.val();
			var keys = Object.keys(allusers);
			for(var i =0 ; i< keys.length ; i++)
			{
				var k = keys[i];
				console.log(allusers[k].username  + '  ' + usernameArg);
				if(allusers[k].username == usernameArg)
					res=true;
			}
		});
		console.log(res);
		return res;
		
	}

	var updateClubhouse = function(clubName,typeArg,keyArg,usernameArg)
	{
		var index = getClubKeyIndex(clubName);
		if(index == FAIL)
		{
			alert("לא נמצאה מועדונית תואמת");
			return;
		}
		var key = clubhousesInfo[index].key;
		firebase.database().ref('clubhouse/'+key+'/usersList')
		.push({userkey:keyArg,username:usernameArg,type:typeArg});
	};

	/////////////////////////////////////////////////////////////////
	// addPrevType holds the last value on selectbox
	var updateType = function(e)
	{
		var type = e.target.value;
		var input;
		if(addPrevType !=type && type == ADMIN)
		{
			// inject for admin 
			$('#selectCHSection').html("");
		}
		else if(addPrevType !=type && type == SWUSER)
		{
			// inject for social worker
		}
		else
		{
			// inject for regualar users , guide parent teacer
			input ='<label for="clubHouseName" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
								'<select type="text" id="clubhouse_select_Add" class="form-control clubHouseName"  placeholder="בחר מועדונית מתוך הרשימה">'+
								'</select>'+
							'</div>'+
						'</div>';
			$('#selectCHSection').html(input);

			for(var i =0; i<clubhousesInfo.length;i++)
				$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
		}
		addPrevType = type;
	}

	

	var addClubSelectValue = function()
	{
		var index = document.getElementById("clubhouse_select_Add").value;
		if (index > clubhousesInfo.length)
			return;
		if(AddSectionClubName == clubhousesInfo[index].name)
			return;
		AddSectionClubName = clubhousesInfo[index].name;
		return AddSectionClubName;
	}


	/////////////////////////////////////////////////////////////////////
	//			EDIT USER											   //
	/////////////////////////////////////////////////////////////////////
	// Edit user function 
     var editUser=function()
    {
		page = EDITPAGE;
        $("#body").html(EditUserOp.inputSection);
        $('.Nav').collapse('hide');
		clubhousesInfo = [];
		loadClubhousesData(); 	// attach listeners after loading clubhouses
		$('#openUserEditBtn').click(editUserListener);
    }

	//======================================================================================
	// show user list from a selected clubhouse
    var  showUsersPerCH = function(clubhouseSelected)
    {
		document.getElementById('usersInCH').innerHTML = "";
	    var tmpIndex = getClubKeyIndex(clubhouseSelected);
        if(tmpIndex == FAIL)
		{
			alert("לא נמצאה מועדונית ");
			return;
		}
		var ClubKey = clubhousesInfo[tmpIndex].key;
		
	    var ref = firebase.database().ref("clubhouse/"+ClubKey+"/usersList");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			if (data.val() == null)
			{
				alert("לא נמצאו משתמשים להציג ");
				return;
			}
			var users = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(users);	// get all keys
				
			for(var i =0; i<keys.length;i++)
			{
				var k = keys[i];
				var name = users[k].username;
				$('#usersInCH').append('<option value="'+i+'">'+name+'</option>');
			}
		
		});
    }


	var editUserListener= function()
	{
		var e = document.getElementById("usersInCH");
		 if(e.selectedIndex<0)
		 {
			 alert('לא נבחר שם משתמש');
			 return;
		 }
		var userName = e.options[e.selectedIndex].text;
		var user = loadUserDetails(userName);

	};

	// load user data when selected
	var loadUserDetails = function(username)
	{
		var clubKey = clubhousesInfo[clubIndex_Edit].key;
		firebase.database().ref("clubhouse/"+clubKey+'/usersList').once("value")
		.then(function (data) // get user key from club users list
		{
			if (data.val() == null)
			{
				alert("לא נמצאו משתמשים להציג ");
				return;
			}
			var userList = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(userList);	// get all keys
			for (var i = 0 ; i<keys.length;i++)
			{
				if(username == userList[keys[i]].username)
				{
					return userList[keys[i]].userkey;
				}
			}

		}).then(function (key) // get the user object
		{
			if(!key)
			{
				alert('Keyerr '+key);
				return;
			}
			// get the user object
			firebase.database().ref("users/"+key).once("value")
			.then(function(data)
			{
				var user = data.val();
				if(user)
				{
					userToEdit = user;
					injectEditPage(user)
				}
			});
		});
	}

	var injectEditPage = function (user)
	{
		$('#body').html(UserPage.inputSection);
		document.getElementById('registerTitle').innerHTML ="עריכת/מחיקת משתמש";
		$('#UserPName').val(user.firstName);
		$('#UserLName').val(user.lastName);
		$('#username').val(user.username);
		$('#password').val(user.password);
		$('#confirm').val(user.password);
		$('#userType').val(user.userType);	

		var tempIndex;
		for(var i =0; i<clubhousesInfo.length;i++)
		{
			if (clubhousesInfo[i].key == user.clubhouseKey)
				tempIndex = i;
			$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
		}

		$('#clubhouse_select_Add').val(tempIndex);
		$('#buttons_area').html(EditUserButtons.inputSection);
		$('#change-button').click(changeUserInfo);
		$('#delete-button').click(deleteUser);
	}

	var changeUserInfo = function()
	{
		var obj={};
		var firstName = $('#UserPName').val();
		var lastName = $('#UserLName').val();
		var Nusername = $('#username').val();
		var password = $('#password').val();
		var confirm = $('#confirm').val();
		var userType = $('#userType').val();

		var currClubIndex = $('#clubhouse_select_Add').val();

		var currClubKey = clubhousesInfo[currClubIndex].key;
		if (password != confirm)
		{
			alert('הסיסמאות אינן תואמות');
			return;
		}
		if (userToEdit.firstName != firstName)
			obj.firstName = firstName;
		if (userToEdit.lastName != lastName)
			obj.lastName = lastName;
		if (userToEdit.username != Nusername)
			obj.username = Nusername;
		if (userToEdit.password != password)
			obj.password = password;
		if(userToEdit.userType != userType)
			obj.userType = userType;
		if(userToEdit.clubhouseKey != currClubKey) // clubhouse changed
		{
			// update new clubhouse
			firebase.database().ref('clubhouse/'+currClubKey+'/usersList')
				.push({userkey:userToEdit.userKey,username:Nusername,type:userType});
			
			// remove from old clubhouse 
			removeUserFromClubOnly(userToEdit.clubhouseKey);
			
			obj.clubhouseKey = currClubKey; // update user object
		}
		
		var e = document.getElementById("clubhouse_select_Add");
		var userRef = firebase.database().ref('users/');
		userRef.child(userToEdit.userKey).update(obj);
	}

	var deleteUser = function()
	{
		var clubKey = clubhousesInfo[clubIndex_Edit].key; 
		firebase.database().ref("clubhouse/"+clubKey+"/usersList").once("value")
		.then(function(data)
		{
			if (data.val() == null)
			{
				alert("לא נמצאו משתמשים להציג ");
				return;
			}
			var users = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(users);	// get all keys
				
			for(var i =0; i<keys.length;i++)
			{
				var key = users[keys[i]].userkey;
				var k = keys[i];
				if(userToEdit.userKey == users[keys[i]].userkey)
				{
					firebase.database().ref("clubhouse/"+clubKey+"/usersList").child(k).remove();
					return "true";
				}
			}
			return ("false")
		}).then(function(res)
		{
			if(res == "true")
				firebase.database().ref("users/"+userToEdit.userKey).remove();
		});
	}


	var removeUserFromClubOnly = function(clubKey)
	{
		firebase.database().ref("clubhouse/"+clubKey+"/usersList").once("value")
		.then(function(data)
		{
			if (data.val() == null)
			{
				alert("לא נמצאה מועדונית ");
				return;
			}
			var users = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(users);	// get all keys
				
			for(var i =0; i<keys.length;i++)
			{
				var key = users[keys[i]].userkey;
				var k = keys[i];
				if(userToEdit.userKey == users[keys[i]].userkey)
				{
					firebase.database().ref("clubhouse/"+clubKey+"/usersList").child(k).remove();
				}
			}
		});
	}



	// listener for clubhouse Buttons for user edit
	var EditClubselectValue = function(e)
	{
		EditSectionClubName = e.target.innerText;
		if(e.target.innerText == "")
		{
			alert("לא נבחר משתמש");
			return;
		}
		clubIndex_Edit = getClubKeyIndex(e.target.innerText.trim());
		showUsersPerCH(e.target.innerText);
	}


	/////////////////////////////////////////////////////////////////////
	//			LOAD DATA											   //
	/////////////////////////////////////////////////////////////////////
	// Updates clubhousesInfo array
	var loadClubhousesData = function()
	{	
		var ref = firebase.database().ref("clubhouse");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			if (data.val() == null)
			{
				alert("לא נמצאו מועדוניות להציג");
				return;
			}
			allClubhousesObjects = data.val();
			var allClubhouses = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(allClubhouses);	// get all keys
				
			for(var i =0; i<keys.length;i++)
			{
				var tempName = allClubhouses[keys[i]].name;
				clubhousesInfo[i] = {key:keys[i],name:tempName}
				if (page == EDITPAGE)
				{
					var tempBtnID = 'btn'+i;
					// var btnInput = '<button id = '+tempBtnID+' type="button" class="btn btn-default">'+
					// 				'<span class="glyphicon glyphicon-home"></span> '+tempName+
					// 			'</button>';
					
					var btnInput = 
					'<a href="#" id="'+tempBtnID+'" class="btn btn-sq-sm btn-success">'+
					'<i class="fa fa-home fa-2x"></i><br/> '
					+tempName+
					'</a>';
					if ( i%3 == 2 && i>1 )
						btnInput += '</p>';
					$('#clubBottunGroup').append(btnInput);
					$('#'+tempBtnID).click(EditClubselectValue);
				}
				if (page == ADDPAGE)
					$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
			}
		});
	}



	/////////////////////////////////////////////////////////////////////
	//			GENERAL METHODS										   //
	/////////////////////////////////////////////////////////////////////
	var getTypeAsString = function(type)
	{	
		if(type == PUSER)
			return "הורה";
		if(type == TUSER)
			return "מורה";
		if(type == GSUSER)
			return "מדריך";
		if(type == SWUSER)
			return 'עו"ס';
		if(type == ADMIN)
			return "מנהל";
		else
			return"";
	}


	var getClubKeyIndex = function(clubName)
	{
		for (var i = 0; i < clubhousesInfo.length; i++) 
		{
			if(clubName.trim() == clubhousesInfo[i].name)
				return i;
		}
		return FAIL;
	}
	
	var getClubKeyByName = function (clubName)
	{
		for (var i = 0; i < clubhousesInfo.length; i++) 
		{
			if(clubName.trim() == clubhousesInfo[i].name)
				return clubhousesInfo[i].key;
		}
		return "";
	}


     return{addUser:addUser,editUser:editUser};
}();




