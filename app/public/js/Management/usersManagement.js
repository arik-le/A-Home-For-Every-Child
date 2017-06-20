var usersManagement = function()
{
	const FAIL = -1;
	const ADDPAGE = 1;
	const EDITPAGE = 2;
	const OS_TYPE = 3;
	var clubhousesInfo = []; // key and name

	var page;
	var addPrevType;
	var AddSectionClubName;
	var EditSectionClubName;
	var clubIndex_Edit;
	var socialPrevCH_edit=[];
	var userToEdit;
     //-------------------------------------------------------------------------------------------------
	var UserPage=
	{
		inputSection:
		"<div class='container'>"+
				"<div class='row main'>"+
				"<div class='panel-heading'>"+
					"<div  class='panel-title text-center'>"+
						"<h2 id='allTitles' class='registerTitle'>רישום משתמש</h2>"+
					"</div>"+
				"</div>"+

			"<div class='main-login main-center'>"+
				"<form class='form-horizontal' method='post' action='#'>"+
					
					"<div class='form-group'>"+
						"<label for='name' class='col-sm-2 controlLabel' >:שם פרטי</label>"+
						"<div class='col-sm-10'>"+
							"<div class='input-group'>"+
								"<span class='input-group-addon'><i class='fa fa-user fa' aria-hidden='true'></i></span>"+
								"<input type='text' class='form-control' name='name' id='UserPName' maxlength='20' placeholder='הכנס שם פרטי' dir='rtl' />"+
							"</div>"+
						"</div>"+
					"</div>"+

					"<div class='form-group'>"+
						"<label for='UserLastName' class='col-sm-2 controlLabel' id='formTxts'>:שם משפחה</label>"+
						"<div class='col-sm-10'>"+
							"<div class='input-group'>"+
								"<span class='input-group-addon'><i class='fa fa-user fa' aria-hidden='true'></i></span>"+
								"<input type='text' class='form-control' name='UserLastName' id='UserLName' maxlength='20' placeholder='הכנס שם משפחה' dir='rtl'/>"+
							"</div>"+
						"</div>"+
					"</div>"+

					"<div class='form-group'>"+
						"<label for='username' class='col-sm-2 controlLabel'>:שם משתמש</label>"+
						"<div class='col-sm-10'>"+
							"<div class='input-group'>"+
								"<span class='input-group-addon'><i class='fa fa-users fa' aria-hidden='true'></i></span>"+
								"<input type='email' class='form-control' name='username' id='username'  maxlength='40' placeholder='הכנס שם משתמש' dir='rtl'/>"+
							"</div>"+
						"</div>"+
					"</div>"+

					"<div class='form-group'>"+
						"<label for='username' class='col-sm-2 controlLabel'>:סוג משתמש</label>"+
						"<div class='col-sm-10'>"+
							"<div class='input-group'>"+
								"<span class='input-group-addon'><i class='fa fa-slideshare' aria-hidden='true'></i></span>"+
								"<select type='text' class='form-control' id='userType'>"+
									"<option value = '0' class='ptUser'>הורה</option>"+
									"<option value = '1' class='tcUser'>מורה</option>"+
									"<option value = '2' class='GuUser'>מדריך</option>"+
									"<option value = '3' class='SWUser'>עובד סוציאלי</option>"+
									"<option value = '4' class='AdmUser'>מנהל</option>"+
								"</select>"+
							"</div>"+
						"</div>"+
					"</div>"+

				"<div id = 'passwordSection'>"+
					"<div class='form-group'>"+
						"<label for='password' class='col-sm-2 controlLabel'>:סיסמא</label>"+
						"<div class='col-sm-10'>"+
							"<div class='input-group'>"+
								"<span class='input-group-addon'><i class='fa fa-lock fa-lg' aria-hidden='true'></i></span>"+
								"<input type='password' class='form-control' name='password' id='password' maxlength='10' placeholder='הכנס סיסמה'/>"+
							"</div>"+
						"</div>"+
					"</div>"+
					"<div class='form-group'>"+
						"<label for='confirm'  class='col-sm-2 controlLabel'>:אימות סיסמא</label>"+
						"<div class='col-sm-10'>"+
							"<div class='input-group'>"+
								"<span class='input-group-addon'><i class='fa fa-lock fa-lg' aria-hidden='true'></i></span>"+
								"<input type='password' class='form-control' name='confirm' id='confirm' maxlength='10' placeholder='אמת בשנית סיסמה'/>"+
							"</div>"+
						"</div>"+
					"</div>"+
				"</div>"+
						"<div id='selectCHSection' class='form-group'>"+
							"<label for='clubHouseName' class='col-sm-2 controlLabel'>:בחר מועדונית</label>"+
							"<div class='col-sm-10'>"+
								"<div class='input-group'>"+
									"<span class='input-group-addon'><i class='fa fa-home' aria-hidden='true'></i></span>"+
									"<select type='text' id='clubhouse_select_Add' class='form-control clubHouseName' placeholder='בחר מועדונית מתוך הרשימה'>"+
									"</select>"+
								"</div>"+
							"</div>"+
						"</div>"+

						"<div id='childSection' class='form-group'>"+
						"</div>"+
					"<div class='form-group' id='buttons_area'>"+
					"</div>"+
				"</form>"+
			"</div>"+
		"</div>"
	}
	//-------------------------------------------------------------------------------------------------
	var EditUserOp={
	inputSection:
		'<div class="container">'+
			'<label id="allTitles">:בחר מועדונית</label>'+
			'</br>'+

		'<div class="row">'+
			'<div id = "clubBottunGroup" class="col-md-4 text-center">'+
			
			'</div>'+
		'</div>'+
			'</div>'+
			'<br>'+
			'<label id="allTitles2">:בחר משתמש</label>'+
			'</br></br>'+
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
	//-------------------------------------------------------------------------------------------------
	var childInput =
	{
		inputSection: '<label for="" class="col-sm-2 controlLabel">:שם הילד</label>'+
									'<div class="col-sm-10">'+
										'<div class="input-group">'+
											'<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>'+
											'<input id ="childName" class="form-control"  maxlength="20" placeholder="הכנס את שם הילד" dir="rtl"/>'+
										'</div>'+
									'</div>'
								
	}

	//-------------------------------------------------------------------------------------------------
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
			var i;	
			for(i=0; i<keys.length;i++)
			{
				var tempName = allClubhouses[keys[i]].name;
				clubhousesInfo[i] = {key:keys[i],name:tempName}
				if (page == EDITPAGE)
				{
					var tempBtnID = 'btn'+i;
					var btnInput = '<a href="#" id="'+tempBtnID+'" class="btn btn-sq-lg btn-primary clubSquare">'+
					'<i class="fa fa-home fa-2x"></i><br/>'+tempName+'</a>';

					$('#clubBottunGroup').append(btnInput);
					$('#'+tempBtnID).click(EditClubselectValue);
					mainPage.paintButton(i,tempBtnID);
				}
				if (page == ADDPAGE)
					$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
			}
			if (page == EDITPAGE)
			{
				var tempBtnID = 'adminCH';
				var btnInput = '<a href="#" id="adminCH" class="btn btn-sq-lg btn-primary clubSquare">'+
					'<i class="fa fa-home fa-2x"></i><br/>'+'מנהלים'+'</a>';
				$('#clubBottunGroup').append(btnInput);
				$('#adminCH').click(editManagersCH);
				mainPage.paintButton(i,tempBtnID);
				
			}	
		});
	}


	//-------------------------------------------------------------------------------------------------
    var createUser=function()
    {
    	var firstName=document.getElementById("UserPName").value;
        var lastName=document.getElementById("UserLName").value;
        var username=document.getElementById("username").value;
        var fPassword=document.getElementById("password").value;
        var sPassword=document.getElementById("confirm").value;
		var Uclubhouse,childName;
        if( sPassword != fPassword && fPassword != "" )
        {
            alert(" הסיסמאות שהוזנו אינן תואמות");
            return;
        }

		 var res = inputsValidation({firstName:firstName,lastName:lastName,username:username,password:sPassword});
		 if (!res)
		 	return;
			 
		var e;
        e=document.getElementById("userType");
		var type = e.selectedIndex;

		if(type >= 0 && type < User.SOCIAL )
		{
			if (page == ADDPAGE)
				e = document.getElementById("clubhouse_select_Add");

			if(e.selectedIndex == -1)// when there are no clubhouses at DB
			{
				alert("אנא הזן מועדוניות לפני יצירת משתמשים במערכת");
				return;
			}
			Uclubhouse= e.options[e.selectedIndex].text;
			var clubKey = getClubKeyByName(Uclubhouse);
			if(type == User.PARENT || type == User.TEACHER)
			{
				childName = document.getElementById("childName").value;
			}
			checkAndPush(username,firstName,lastName,type,clubKey,childName);
		}
		else if (type == User.SOCIAL)
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
			}
			if (clubhousesSw.length <= 0)
			{
				alert("אנא הזן מועדוניות לפני יצירת משתמשים במערכת");
				return;
			}
			checkAndPush(username,firstName,lastName,type,clubhousesSw,"");
		
		}
		else if (type == User.ADMIN)
		{
			checkAndPush(username,firstName,lastName,type,clubhousesSw,"");
		}
		

    }
	//-------------------------------------------------------------------------------------------------
	/////////////////////////////////////////////////////////////////
	// addPrevType holds the last value on selectbox
	var updateType = function(e)
	{
		$('#childSection').html("");
		var type = e.target.value;
		var input;
		if(addPrevType != type && type == User.ADMIN)
		{
			// inject for admin 
			$('#selectCHSection').html("");
		}
		else if(addPrevType != type && type == User.SOCIAL)
		{
			// inject for social worker
			input = swMultiselect.inputSection;
			$('#selectCHSection').html(input);

			for (var i = 0; i < clubhousesInfo.length; i++) 
			{
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
			if( type == User.PARENT || type == User.TEACHER)
				$('#childSection').html(childInput.inputSection);
			else

			$('#selectCHSection').html(input);

			for(var i =0; i<clubhousesInfo.length;i++)
				$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
		}
		addPrevType = type;
	}


	//-------------------------------------------------------------------------------------------------
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
		$('#userType').on('change',updateType);
		$('#childSection').html(childInput.inputSection);
    }

    


	var inputsValidation = function(args)
	{
		//var usernameRegex  = /^\w+(\-+(\w)*)*$/;
		var namesRegex = new RegExp("/^([א-תA-Z0-9])+$/");
		var spacesRegex = /\s/;
		if (args.firstName == "" || args.lastName == "" || args.username == "")
		{
			alert("אנא מלא את כל השדות הנדרשים");
			return false;
		}

		if( spacesRegex.test(args.firstName) == true || namesRegex.test(args.firstName) == true )
		{
			alert("שם פרטי שהוזן אינו חוקי");
			return false;
		}
		if( spacesRegex.test(args.lastName) == true || namesRegex.test(args.lastName) == true)
		{
			alert("שם משפחה שהוזן אינו חוקי");
			return false;
		}
		
		if(args.password.length<6)
		{
			alert("יש להזין לפחות 6 תווים");
			return false;
		}
		return true;
	}

	var checkAndPush = function(username,firstName,lastName,type,clubKey,childName)
	{	

		var password=document.getElementById("password").value;
		var auth = firebase.auth();
		var promise = auth.createUserWithEmailAndPassword(username,password);

		promise.then(function(user)
		{
			var usersRef = firebase.database().ref('users/'+user.uid);
			var newUser;
			if(type == User.ADMIN)
				newUser = User.create(username,firstName,lastName,type,null,user.uid,"");
		
			else if(type == User.SOCIAL)
			{
				newUser = User.create(username,firstName,lastName,type,clubKey,user.uid,"");
				for (var i = 0; i < clubKey.length; i++) {
					firebase.database().ref('clubhouse/'+clubKey[i]+'/usersList')
					.push({userkey:user.uid,username:username,type:type});
				}
			}
			else
			{
				newUser = User.create(username,firstName,lastName,type,clubKey,user.uid,childName);
				console.log(newUser);
				firebase.database().ref('clubhouse/'+clubKey+'/usersList')
				.push({userkey:user.uid,username:username,type:type});
			}
			usersRef.set(newUser);
			addUser();
			alert("הוזן בהצלחה");
		});
		promise.catch(function(res)
		{
			alert(res.message);
		});
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

	//=====================================================================
	// show user list from a selected clubhouse
    var  showUsersPerCH = function(clubhouseSelected)
    {
		console.log(clubhouseSelected);
		// if(clubhouseSelected)
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
			alert('key Error: '+userKey);
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
				injectEditPage(user);
			}
		});	
	}

	var injectEditPage = function (user)
	{
		$('#body').html(UserPage.inputSection);
		
		document.getElementById('allTitles').innerHTML ="עריכת/מחיקת משתמש";
		$('#UserPName').val(user.firstName);
		$('#UserLName').val(user.lastName);
		$('#username').val(user.username);
		$('#userType').val(user.userType);
		document.getElementById("userType").disabled = true;  //disable option for changing user-type
		document.getElementById("username").disabled = true;  //disable option for changing user-name
		$('#passwordSection').html("");	// prevent change the password if there is oath with email
		
		// html inject for each user type//
		//======================================================//
		if(user.userType == User.ADMIN)
		{
			$('#selectCHSection').html("");
			$('#childSection').html("");
		}
		// multi select injection for SW
		if ( user.userType == User.SOCIAL)
		{
			$('#childSection').html("");
			socialPrevCH_edit=[];	// keep the indexes of the old clubhouses the social had
			$('#selectCHSection').html(swMultiselect.inputSection);
				for (var i = 0; i < clubhousesInfo.length; i++) {
				var id='swClubhouseSelect'+i;
				var line = '<li id="'+id+'" class="list-group-item">'+clubhousesInfo[i].name+'</li>'
					for (var j = 0; j < userToEdit.clubhouseKey.length; j++) { // to retrive the slected clubhouses
						if(userToEdit.clubhouseKey[j] == clubhousesInfo[i].key)
						{
							line = '<li id="'+id+'" class="list-group-item active">'+clubhousesInfo[i].name+'</li>';
							socialPrevCH_edit.push(i);
						}
					}
					
				$('#swMultiSelect').append(line);
				$('#'+id).click(SwClubListener);
			}

		}

		if(user.userType >= User.PARENT && user.userType < User.SOCIAL)
		{
			if(user.userType == User.GUIDE)
			{
				$('#childSection').html("");
			}
			else
			{
				$('#childSection').html(childInput.inputSection);
				$('#childName').val(user.childName);
			}
			// append element to select and choose the selected index on default.
			var tempIndex;
			for(var i =0; i<clubhousesInfo.length;i++)
			{
				if (clubhousesInfo[i].key == user.clubhouseKey)
					tempIndex = i;
				$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
			}
			$('#clubhouse_select_Add').val(tempIndex);
			$('#clubhouse_select_Add').on('change',function(e) // update selected index listener
			{
				clubIndex_Edit = e.currentTarget.selectedIndex;	
			});
		}
		$('#buttons_area').html(EditUserButtons.inputSection);
		$('#change-button').click(changeUserInfo);
		$('#delete-button').click(function(){ deleteUser(user.userType) });
	}

	// implemention of button listener for editing
	var changeUserInfo = function()
	{
		var obj={};
		var firstName = $('#UserPName').val();
		var lastName = $('#UserLName').val();
		var Nusername = $('#username').val();
		var password = $('#password').val();
		var confirm = $('#confirm').val();

		if (userToEdit.firstName != firstName)
			obj.firstName = firstName;
		if (userToEdit.lastName != lastName)
			obj.lastName = lastName;
		if (userToEdit.username != Nusername)
			obj.username = Nusername;

		if( userToEdit.userType >= User.PARENT && userToEdit.userType < User.SOCIAL)
		{
			if(userToEdit.userType == User.PARENT || userToEdit.userType == User.TEACHER )
			{
				var childName = $('#childName').val();
				if(userToEdit.childName != childName)
					obj.childName = childName;
			}
			// currClubIndex= $('#clubhouse_select_Add').val();
			currClubKey = clubhousesInfo[clubIndex_Edit].key;
			if(userToEdit.clubhouseKey != currClubKey) // clubhouse changed
			{
				// update new clubhouse
				firebase.database().ref('clubhouse/'+currClubKey+'/usersList')
					.push({userkey:userToEdit.userKey,username:Nusername,type:userType});
				
				// remove from old clubhouse 
				removeUserFromClubOnly(userToEdit.clubhouseKey);
				
				obj.clubhouseKey = currClubKey; // update user object
			}
		}
		if (  userToEdit.userType == User.SOCIAL)
		{
			// get curr indexes
			var currIndexes=[];
			var childs = $('#swMultiSelect')[0].childNodes;
			for (var i = 0; i < childs.length; i++) 
			{
				var element = childs[i];
				if (element.className == 'list-group-item active')
				{
					currIndexes.push(i);
				}
			}
			if(currIndexes.length <= 0)
			{
				alert('אנא הזן מועדוניות ');
				return;
			}
			//.........................................
			// compare selection with previous values
			
			var keyRM;
			var keyADD; 

			for (var i = 0 ; i < socialPrevCH_edit.length ; i++) 
			{
				// remove from old clubhouse
				keyRM = clubhousesInfo[socialPrevCH_edit[i]].key;
				removeUserFromClubOnly(keyRM);
			}
			
			for (var i = 0 ; i < currIndexes.length ; i++) 
			{
				// push new Clubhouse
				keyADD = clubhousesInfo[currIndexes[i]].key;
				firebase.database().ref('clubhouse/'+keyADD+'/usersList/').push({userkey:userToEdit.userKey,username:Nusername,type:userToEdit.userType});
			}
			// if equal
			var tempCHARr=[];
			for(var i = 0 ; i <currIndexes.length ; i++)
				tempCHARr.push(clubhousesInfo[currIndexes[i]].key);
			obj.clubhouseKey = tempCHARr;
		}

		// var e = document.getElementById("clubhouse_select_Add");
		var userRef = firebase.database().ref('users/');
		userRef.child(userToEdit.userKey).update(obj);
		alert("המידע עודכן בהצלחה");
		editUser();

	}

	var deleteUser = function(uType)
	{
		if(uType == OS_TYPE)    //if the user is Social worker - then it delete him from several clubhouses
			deleteUserInCH();
		else if(uType == User.ADMIN)
		{
			firebase.database().ref("users/"+userToEdit.userKey).remove();
			alert("המשתמש הוסר בהצלחה");
			editUser();
		}
		else
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
	}

	var deleteUserInCH = function()
	{
		firebase.database().ref("users/"+userToEdit.userKey+"/clubhouseKey").once("value")
		.then(function(data)
		{
			if (data.val() == null)
			{
				alert("לא נמצאו מועדוניות להציג ");
				return;
			}
			var clubs = data.val();   //all clubhouses that the user is in there
			var clubsKeys = Object.keys(clubs);  //all keys of clubhouses

			for(var i =0;i<clubsKeys.length;i++)  
				removeUserFromClubOnly(clubs[i]);   //delete user from clubhouse userslist

			return "true";
			
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
					break;
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
	

	var editManagersCH = function(e)
	{  //load all managers
		document.getElementById('usersInCH').innerHTML = "";
		
	    var ref = firebase.database().ref("users");
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
				var uType=users[k].userType;
				if( (uType == User.ADMIN) && (users[k].userKey != login.correntUser[1]) )
				{
					var userRef= firebase.database().ref("users/"+users[k].userKey);
					userRef.ref.once("value").then(function(data)
					{
						var user=data.val();
						$('#usersInCH').append('<option value="'+user.userKey+'">'+user.firstName+' '+user.lastName+'</option>');
					
					});	
				}
			}
		});
		
	}

	/////////////////////////////////////////////////////////////////////
	//			GENERAL METHODS										   //
	/////////////////////////////////////////////////////////////////////
	var getTypeAsString = function(type)
	{	
		if(type == User.PARENT)
			return "הורה";
		if(type == User.TEACHER)
			return "מורה";
		if(type == User.GUIDE)
			return "מדריך";
		if(type == User.SOCIAL)
			return 'עו"ס';
		if(type == User.ADMIN)
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




