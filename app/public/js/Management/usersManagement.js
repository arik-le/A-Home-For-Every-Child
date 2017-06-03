var usersManagement = function()
{
	const ADMIN = 1;
	const GSUSER = 2;
	const PTUSER = 3;
	const FAIL = -1;
	const ADDPAGE = 1;
	const EDITPAGE = 2;
	var clubhousesInfo = []; // key and name

	var page;
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
	               		'<h1 id="title" class="title">רישום משתמש</h1>'+
	               		'<hr />'+
	                '</div>'+
	            '</div> '+

            	'<div class="main-login main-center">'+
					'<form class="form-horizontal" method="post" action="#">'+
						
						'<div class="form-group">'+
							'<label for="name" class="col-sm-2 controlLabel" >:שם פרטי</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="name" id="UserPName" />'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="UserLastName" class="col-sm-2 controlLabel" id="formTxts">:שם משפחה</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="UserLastName" id="UserLName"  placeholder="הכנס שם משפחה"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="username" class="col-sm-2 controlLabel">:שם משתמש</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="username" id="username"  placeholder="הכנס שם משתמש "/>'+
								'</div>'+
							'</div>'+
						'</div>'+

                        '<div class="form-group">'+
							'<label for="username" class="col-sm-2 controlLabel">:סוג משתמש</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-slideshare" aria-hidden="true"></i></span>'+
									'<select type="text" class="form-control" id="userType">'+
                                        '<option class="ptUser">הורה</option>'+
										 '<option class="tcUser">מורה</option>'+
                                        '<option class="GuUser">מדריך</option>'+
                                        '<option class="SWUser">עו"ס</option>'+
                                        '<option class="AdmUser">מנהל</option>'+
                                    '</select>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="password" class="col-sm-2 controlLabel">:סיסמא</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
									'<input type="password" class="form-control" name="password" id="password"  placeholder="הכנס סיסמה"/>'+
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

                             '<div class="form-group">'+
							'<label for="clubHouseName" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
									'<select type="text" class="form-control clubHouseName" id="clubhouse_select_Add" placeholder="בחר מועדונית מתוך הרשימה">'+
                                    '</select>'+
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
				'<label for="clubBottunGroup" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
				'<br>'+
				'<div  id ="clubBottunGroup" class = "col-md-4">'+
				'</div>'+
				'<br>'+
				'<label for="clubHouseUsers" class="col-sm-2 controlLabel">:בחר משתמש</label>'+
				'<div class="input-group">'+
						'<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>'+
						'<select type="text" id="usersInCH" class="form-control" >'+
						'</select>'+
				'</div>'+

				'<button type="button" id="openUserEditBtn" class=" col-xs-offset-4 btn btn-default"  >לחץ כאן לערוך</button>'+
			'</div>'
        }
		var EditUserButtons={
        inputSection:
		
			'<button id ="change-button" type="button" class="btn btn-primary btn-block btn-lg edit-button"  >עריכה</button>'+
			'<button id ="delete-button" type="button" class="btn-danger btn-danger btn-block btn-lg  delete-button"  >מחיקת משתמש</button>'
	}
	var addUserButton={
        inputSection:
	'<button type="button" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" id="addUser" >הרשמה</button>'
				}

	/////////////////////////////////////////////////////////////////////
	//			ADD USER											   //
	/////////////////////////////////////////////////////////////////////

    var addUser=function()
    {
		page = ADDPAGE;
		loadClubhousesData();
        $('.Nav').collapse('hide');
        $("#body").html(UserPage.inputSection);
		$('#buttons_area').html(addUserButton.inputSection);
        $("#addUser").click(createUser);
    }

    //-------------------------------------------------------------------------------------------------
    var createUser=function()
    {
        var firstName=document.getElementById("UserPName").value;
        var lastName=document.getElementById("UserLName").value;
        var username=document.getElementById("username").value;
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
        var usersRef = database.ref('users');
        var newUser = User.create(username,fPassword,firstName,lastName,Uclubhouse,type);
        var key = usersRef.push(newUser);
        firebase.database().ref('users/' + key.key + '/userKey').set(key.key);
		updateClubhouse(Uclubhouse,type,key.key,username);
        alert("הוזן בהצלחה");
		addUser();
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

	var getClubKeyIndex = function (clubName)
	{
		for (var i = 0; i < clubhousesInfo.length; i++) 
		{
			if(clubName.trim() == clubhousesInfo[i].name)
				return i;
		}
		return FAIL;
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
		var userName = e.options[e.selectedIndex].text;
		 if(!userName)
		 {
			 alert('לא נבחר שם משתמש');
			 return;
		 }
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
		document.getElementById('title').innerHTML ="עריכת/מחיקת משתמש";
		$('#UserPName').val(user.firstName);
		$('#UserLName').val(user.lastName);
		$('#username').val(user.username);
		$('#password').val(user.password);
		$('#confirm').val(user.password);
		$('#userType').val(user.type);
		
		// document.getElementById('clubhouse').setAttribute("placeholder",user.password);
		$('#buttons_area').html(EditUserButtons.inputSection);
		$('#change-button').click(changeUserInfo);
		$('#delete-button').click(deleteUser);
	}

		var changeUserInfo = function()
		{
			var obj={};
			var firstName = $('#UserPName').val();
			var lastName = $('#UserLName').val();
			var username = $('#username').val();
			var password = $('#password').val();
			var confirm = $('#confirm').val();
			var userType = $('#userType').val();
			if (password != confirm)
			{
				alert('הסיסמאות אינן תואמות');
				return;
			}
			if (userToEdit.firstName != firstName)
				obj.firstName = firstName;
			if (userToEdit.lastName != lastName)
				obj.lastName = lastName;
			if (userToEdit.username != username)
				obj.username = username;
			if (userToEdit.password != password)
				obj.password = password;
			if(userToEdit.userType != userType)
				obj.userType = userType;

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


// listener for 'select' of clubhouse
	var EditClubselectValue = function(e)
	{
		EditSectionClubName = e.target.innerText;
		clubIndex_Edit = getClubKeyIndex(e.target.innerText.trim());
		showUsersPerCH(e.target.innerText);
	}


	/////////////////////////////////////////////////////////////////////
	//			LOAD DATA											   //
	/////////////////////////////////////////////////////////////////////
	//====================================================================================
	

	//===========================================================================================
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
					var btnInput = '<button id = '+tempBtnID+' type="button" class="btn btn-default">'+
									'<span class="glyphicon glyphicon-home"></span> '+tempName+
								'</button>';
					$('#clubBottunGroup').append(btnInput);
					$('#'+tempBtnID).click(EditClubselectValue);
				}
				if (page == ADDPAGE)
					$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
			}
		});
	}




     return{addUser:addUser,editUser:editUser};
}();