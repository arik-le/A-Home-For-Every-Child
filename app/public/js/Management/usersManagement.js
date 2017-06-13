var usersManagement = function()
{
	// CONSTNATS
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

	/////////////////////////////////////////////////////////////////////
	//			INPUT SECTION										   //
	/////////////////////////////////////////////////////////////////////

	var UserPage=
	{
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
								'<input type="text" class="form-control" name="name" id="UserPName" maxlength="20" placeholder="הכנס שם פרטי" dir="rtl" />'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="UserLastName" class="col-sm-2 controlLabel" id="formTxts">:שם משפחה</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
								'<input type="text" class="form-control" name="UserLastName" id="UserLName" maxlength="20" placeholder="הכנס שם משפחה" dir="rtl"/>'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="username" class="col-sm-2 controlLabel">:שם משתמש</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>'+
								'<input type="text" class="form-control" name="username" id="username"  maxlength="20" placeholder="הכנס שם משתמש" dir="rtl"/>'+
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
								'<input type="password" class="form-control" name="password" id="password" maxlength="10" placeholder="הכנס סיסמה"/>'+
							'</div>'+
						'</div>'+
					'</div>'+

					'<div class="form-group">'+
						'<label for="confirm" class="col-sm-2 controlLabel">:אימות סיסמא</label>'+
						'<div class="col-sm-10">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
								'<input type="password" class="form-control" name="confirm" id="confirm" maxlength="10" placeholder="אמת בשנית סיסמה"/>'+
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
	//-------------------------------------------------------------------------------------------------
	var EditUserButtons=
	{	inputSection:
		'</br>'+
		'<button id ="change-button" type="button" class="btn btn-primary btn-block btn-lg edit-button"  >עריכה</button>'+
		'<button id ="delete-button" type="button" class="btn-danger btn-danger btn-block btn-lg  delete-button"  >מחיקת משתמש</button>'
	}
	//-------------------------------------------------------------------------------------------------
	var addUserButton=
	{
        inputSection:
		'</br>'+
		'<button type="button" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" id="addUser" >הרשמה</button>'
	}
	//-------------------------------------------------------------------------------------------------
	var swMultiselect = 
	{
		inputSection:
		'<ul id = "swMultiSelect" class="list-group">'+
		'</ul>'
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
        $("#addUser").click(createUserListener);
		addPrevType=0;
		$('#userType').click(updateType);
    }

    //-------------------------------------------------------------------------------------------------
	// lisetenr for create user button.
    var createUserListener=function()
    {
		var res = validateInput();
		if(res == false)
			return;

		var firstName=document.getElementById("UserPName").value;
        var lastName=document.getElementById("UserLName").value;
        var username=document.getElementById("username").value;
        var fPassword=document.getElementById("password").value;
        var sPassword=document.getElementById("confirm").value;
		// get user type
        var e = document.getElementById("userType");
		var type = e.selectedIndex;
	
        // create for parents | guides | teachers
		if( (type >= 0) && (type < SWUSER) )
		{
			// get clubhouse selected index from select 
			if (page == ADDPAGE)
				e = document.getElementById("clubhouse_select_Add");

			if(e.selectedIndex == -1)// when there are no clubhouses at DB
			{
				alert("אנא הזן מועדוניות לפני יצירת משתמשים במערכת");
				return;
			}
			var Uclubhouse= e.options[e.selectedIndex].text;
			var clubKey = getClubKeyByName(Uclubhouse);
			checkAndPush(username,fPassword,firstName,lastName,type,clubKey);
		}
		else if (type == SWUSER) // create for social worker with multiple select
		{
			var clubhousesSw=[];
			var childs = $('#swMultiSelect')[0].childNodes;
			for (var i = 0; i < childs.length; i++) 
			{
				var element = childs[i];
				if (element.className == 'list-group-item active')
				{
					var temp = getClubKeyByName(childs[i].textContent);
					clubhousesSw.push(temp);
				}
				if (clubhousesSw.length <= 0)
				{
					alert("אנא הזן מועדוניות לפני יצירת משתמשים במערכת");
					return;
				}
			}
			checkAndPush(username,fPassword,firstName,lastName,type,clubhousesSw);
		}
		else if (type == ADMIN)
		{
			checkAndPush(username,fPassword,firstName,lastName,type,null);
		}
    }

	var validateInput = function()
	{
		var firstName=document.getElementById("UserPName").value;
        var lastName=document.getElementById("UserLName").value;
        var username=document.getElementById("username").value;
        var fPassword=document.getElementById("password").value;
        var sPassword=document.getElementById("confirm").value;
       
		var usernameRegex  = /^\w+(\-+(\w)*)*$/;
		// var namesRegex = /^[[(א-ת)]+$/|/^[(a-zA-Z)]]+$/;
		var spacesRegex = /\s/;

		if (firstName == "" || lastName == "" || username == "" || fPassword == "" || sPassword == "" )
		{
			alert("אנא מלא את כל השדות הנדרשים");
			return false;
		}
		
	    if( sPassword!=fPassword )//&& fPassword < 4)
        {
            alert(" הסיסמאות שהוזנו אינן תואמות");
            return false;
        }

		if( spacesRegex.test(firstName) == true)
		{
			alert("שם פרטי שהוזן אינו חוקי");
			return false;
		}

		if( spacesRegex.test(lastName) == true)
		{
			alert("שם משפחה שהוזן אינו חוקי");
			return false;
		}

		if(!usernameRegex.test(username))
		{
			alert("שם המשתמש שהוזן אינו חוקי");
			return false;
		}
		if(sPassword.length <4 || sPassword.length >10)
		{
			alert("נא להזין סיסמא באורך בין 4-10 תווים");
			return false;
		}
		return true;
	}


	var checkAndPush = function(username,fPassword,firstName,lastName,type,clubKey)
	{	//check if the username exist - if not push to DB
		var ref = firebase.database().ref("users");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			// in case the root is empty  ->  name is not exist
			if (data.val() == null)
				return false;

			var allUsers = data.val();   // get the whole tree of users
			var keys = Object.keys(allUsers);	// get all keys
			
			// loop on the answere array to find user name.
			var temp = false;
			for(var i =0; i<keys.length;i++)
			{
				var k = keys[i];
				var tempName = allUsers[k].username;

				if( tempName == username )
					temp =  true;
			}
			return temp;
		}).then(function(res) 
		{
			if(res)		// name is already exist in DB
			{
                alert("שם משתמש כבר קיים");
				return;
			}	
			// else - push user to DB
			var usersRef = firebase.database().ref('users');
        	var newUser;
			if(type == ADMIN)
			{
				newUser = User.create(username,fPassword,firstName,lastName,type,null);
				var key = usersRef.push(newUser);
				firebase.database().ref('users/' + key.key + '/userKey').set(key.key);
				addUser();
			}
			else if(type == SWUSER)
			{
				newUser = User.create(username,fPassword,firstName,lastName,type,clubKey);
				var key = usersRef.push(newUser);
				firebase.database().ref('users/' + key.key + '/userKey').set(key.key);
				for (var i = 0; i < clubKey.length; i++) {
					firebase.database().ref('clubhouse/'+clubKey[i]+'/usersList')
					.push({userkey:key.key,username:username,type:type});
				}
				addUser();
			} 
			else
			{
				newUser = User.create(username,fPassword,firstName,lastName,type,clubKey);
				var key = usersRef.push(newUser);
				firebase.database().ref('users/' + key.key + '/userKey').set(key.key);
				firebase.database().ref('clubhouse/'+clubKey+'/usersList')
				.push({userkey:key.key,username:username,type:type});
				addUser();
			}
			alert("הוזן בהצלחה");
		});

	}
	
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
			input = swMultiselect.inputSection;
			$('#selectCHSection').html(input);

			for (var i = 0; i < clubhousesInfo.length; i++) {
				var id='swClubhouseSelect'+i;
				var line = '<li id="'+id+'" class="list-group-item">'+clubhousesInfo[i].name+'</li>'
				$('#swMultiSelect').append(line)
				$('#'+id).click(SwClubListener);
			}

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
	// sw multiselect listener
	var SwClubListener = function(e)
	{	
		var targetClass = e.currentTarget.className;
		if(targetClass == 'list-group-item')
			e.currentTarget.className = 'list-group-item active';
		if(targetClass == 'list-group-item active')
			e.currentTarget.className = 'list-group-item';
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
				var uKey=users[k].userkey;
	
				var userRef= firebase.database().ref("users/"+uKey);
				userRef.ref.once("value").then(function(data)
				{
					var user=data.val();
					$('#usersInCH').append('<option value="'+user.userKey+'">'+user.firstName+' '+user.lastName+'</option>');
				});	
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
		var userKey = e.options[e.selectedIndex].value;
		var user = loadUserDetails(userKey);

	};

	// load user data when selected
	var loadUserDetails = function(userKey)
	{
		if(!userKey)
		{
			alert('Keyerr '+userKey);
			return;
		}
		// get the user object
		firebase.database().ref("users/"+userKey).once("value")
		.then(function(data)
		{
			var user = data.val();
			if(user)
			{
				userToEdit = user;
				injectEditPage(user)
			}
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
		alert("המידע עודכן בהצלחה");
		editUser();

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
			{
				firebase.database().ref("users/"+userToEdit.userKey).remove();
				alert("המשתמש הוסר בהצלחה");
				editUser();
			}
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




