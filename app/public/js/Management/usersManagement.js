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

     //-------------------------------------------------------------------------------------------------
     var addUserPage={
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
									'<input type="text" class="form-control" name="name" id="UserPName"  placeholder="הכנס שם פרטי"/>'+
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
						'</div>'+

						'<div class="form-group ">'+
							'<button type="button" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" id="addUser" >הרשמה</button>'+
						'</div>'+
					'</form>'+
				'</div>'+
        '</div>'
     }
       //-------------------------------------------------------------------------------------------------
        var EditUserOp={
        inputSection:
                '<div class="container">'+
                    '<label for="clubHouseSelect" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
                     '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
						    '<select type="text" id="clubhouse_select_Edit" class="form-control">'+
                            '</select>'+
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

     //-------------------------------------------------------------------------------------------------
    //         FOR DINAMIC EDITING  USER
	
       var EditUserPage={
        inputSection:
        '<div class="container">'+
            	'<div class="row main">'+
				'<div class="panel-heading">'+
	               '<div class="panel-title text-center">'+
	               		'<h1 class="title">עריכת/מחיקת משתמש</h1>'+
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
									'<input type="text" class="form-control" name="name" id="UserPName"  placeholder="פלוני"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="UserLastName" class="col-sm-2 controlLabel" id="formTxts">:שם משפחה</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="UserLastName" id="UserLName"  placeholder="אלמוני"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="username" class="col-sm-2 controlLabel">:שם משתמש</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="username" id="username"  placeholder="שם משתמש כלשהו"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

                        '<div class="form-group">'+
							'<label for="username" class="col-sm-2 controlLabel">:סוג משתמש</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-slideshare" aria-hidden="true"></i></span>'+
									'<select type="text" class="form-control">'+
                                    '<option class="ptUser">הורה</option>'+
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
									'<input type="password" class="form-control" name="password" id="password"  placeholder="****"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="confirm" class="col-sm-2 controlLabel">:אימות סיסמא</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
									'<input type="password" class="form-control" name="confirm" id="confirm"  placeholder="****"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

                          '<div class="form-group">'+
							'<label for="clubHouseName" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
							'<div class="col-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
									'<select type="text" class="form-control clubHouseName" id="clubhouse_select">'+
                                    '</select>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group ">'+
							'<button type="button" class="btn btn-primary btn-block btn-lg edit-button"  >עריכה</button>'+
                            '<button type="button" class="btn-danger btn-danger btn-block btn-lg  delete-button"  >מחיקת משתמש</button>'+
						'</div>'+
					'</form>'+
				'</div>'+
        '</div>'
	   }

	/////////////////////////////////////////////////////////////////////
	//			ADD USER											   //
	/////////////////////////////////////////////////////////////////////

    var addUser=function()
    {
		page = ADDPAGE;
		loadClubhousesData();
        $('.Nav').collapse('hide');
        $("#body").html(addUserPage.inputSection);
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
        var type=document.getElementById("userType").value;
		if(type == "" )
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
			if(clubName == clubhousesInfo[i].name)
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
	
	
//===========================================================================================
// get the userKey from the DB 
	var getUserKeyIndex = function (name)
	{
		alert("פונקציה לא נכונה");
		for (var i = 0; i < clubhousesInfo.length; i++) 
		{	
			if(name == clubhousesInfo[i].name)
				return i;
		}
		return FAIL;
	}



	/////////////////////////////////////////////////////////////////////
	//			EDIT USER											   //
	/////////////////////////////////////////////////////////////////////
	// Edit user function 
     var editUser=function()
    {
		page = EDITPAGE;
		loadClubhousesData();
        $("#body").html(EditUserOp.inputSection);
        $('.Nav').collapse('hide');
		$('#clubhouse_select_Edit').click(EditClubselectValue); // auto reads the users
        $("#openUserEditBtn").click(editUserListener);
    }

	//======================================================================================
	// show user list from a selected clubhouse
    var  showUsersPerCH= function(clubhouseSelected)
    {
		document.getElementById('usersInCH').innerHTML = "";
	    var index = getClubKeyIndex(EditSectionClubName);
        if(index == FAIL)
		{
			alert("לא נמצאה מועדונית ");
			return;
		}
		var ClubKey = clubhousesInfo[index].key;
		
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
			//	$('#Users_select').append('<option value="'+i+'">'+name+'</option>');
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
					return userList[keys[i]].key;
				}
			}

		}).then(function (key) // get the user object
		{
			if(!key)
			{
				alert('Keyerr ');
				return;
			}
			// get the user object
			firebase.database().ref("users/"+key).once("value")
			.then(function(data)
			{
				var user = data.val();
				if(user)
				{
					injectEditPage(user)
				}
			});
		});
    }

	var injectEditPage = function (user)
	{
		$('#body').html(addUserPage.inputSection);
		document.getElementById('title').innerHTML ="ערוך משתמש";



	}

	var EditClubselectValue = function()
	{
		var index = document.getElementById("clubhouse_select_Edit").value;
		if (index > clubhousesInfo.length)
			return;
		if(EditSectionClubName == clubhousesInfo[index].name) // ignore select the same club
			return;
		EditSectionClubName = clubhousesInfo[index].name;
		clubIndex_Edit = index;
		showUsersPerCH(EditSectionClubName);
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
				clubhousesInfo[i] = {key:keys[i],name:allClubhouses[keys[i]].name}
				if (page == EDITPAGE)
					$('#clubhouse_select_Edit').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
				if (page == ADDPAGE)
					$('#clubhouse_select_Add').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
			}
		});
	}




     return{addUser:addUser,editUser:editUser};
}();