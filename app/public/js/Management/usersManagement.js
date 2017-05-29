var usersManagement = function()
{
	const ADMIN = 1;
	const GSUSER = 2;
	const PTUSER = 3;
	const FAIL = -1;
	const ADDPAGE = 1;
	const EDITPAGE = 2;
	var clubhousesInfo = [];

	var page;
	var AddSectionClubName;
	var EditSectionClubName;
     //-------------------------------------------------------------------------------------------------
     var addUserPage={
        inputSection:
        '<div class="container">'+
            	'<div class="row main">'+
				'<div class="panel-heading">'+
	               '<div class="panel-title text-center">'+
	               		'<h1 class="title">רישום משתמש</h1>'+
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
					 '<button type="button" id="showUsers" class=" col-xs-offset-4 btn btn-default" >הצג משתמשים</button>'+
					 '<br>'+
                    '<label for="clubHouseUsers" class="col-sm-2 controlLabel">:בחר משתמש</label>'+
                    '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>'+
						    '<select type="text" id="usersInCH" class="form-control" disabled>'+
                            '</select>'+
				    '</div>'+
                     '<button type="button" id="openUserEditBtn" class=" col-xs-offset-4 btn btn-default" disabled >לחץ כאן לערוך</button>'+
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



    //-------------------------------------------------------------------------------------------------
    // add user function
    var addUser=function()
    {
			// clubhouseManagement.preLoadData();
		page = ADDPAGE;
		loadClubhousesData();
        $('.Nav').collapse('hide');
        $("#body").html(addUserPage.inputSection);
        $("#addUser").click(createUser);
		$('#clubhouse_select_Add').click(addClubSelectValue);

    }
     //-------------------------------------------------------------------------------------------------
    // Edit user function 
     var editUser=function()
    {
		page = EDITPAGE;
		loadClubhousesData();
        $("#body").html(EditUserOp.inputSection);
        $('.Nav').collapse('hide');
		$('#clubhouse_select_Edit').click(EditClubselectValue);
		

		$("#showUsers").click(function(){
			document.getElementById("usersInCH").disabled=false;
			document.getElementById("openUserEditBtn").disabled=false;
			var e = document.getElementById("clubhouse_select");
            var CHselect= e.options[e.selectedIndex].text;
			
			showUsersPerCH(CHselect);
		  });

        $("#openUserEditBtn").click(function(){
            var e = document.getElementById("usersInCH");
            var userName= e.options[e.selectedIndex].text;
			loadUserDetails(userName);
        });
        
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
		if (page == EDITPAGE)
        	e = document.getElementById("clubhouse_select_Edit");

		if(e.selectedIndex == -1)// when there are no clubhouses at DB
		{
			alert("אנא הזן מועדוניות לפני יצירת משתמשים במערכת");
			return;
		}
        var Uclubhouse = addClubSelectValue;
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
/*
		var key = arrays.clubhousesKeysArr[index];
		firebase.database().ref('clubhouse/'+key+'/usersList').push({key:keyArg,username:usernameArg});
*/
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
	

   

//======================================================================================
// show user list from a selected clubhouse
    var  showUsersPerCH= function(clubhouseSelected)
    {
		document.getElementById('usersInCH').innerHTML = ""
	    var arrays = clubhouseManagement.getClubhouseArrays();
	    var index = getClubKeyIndex(arrays,clubhouseSelected);
        if(index == FAIL)
		{
			alert("לא נמצאה מועדונית ");
			return;
		}
		var ClubKey = arrays.clubhousesKeysArr[index];
		
	   
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
	//===========================================================================
	// load user data when selected
	var loadUserDetails = function(username)
    {
    	$("#body").html(EditUserPage.inputSection);  
    	clubhouseManagement.preLoadData();
		loadUsersData();
	   
	   var index = getUserKeyIndex(username);
       if(index == FAIL)
		{
			alert("לא נמצאה מועדונית ");
			return;
		}
		var userKey =usersKeysArr[index];
		console.log(userKey);
	   
	    var ref = firebase.database().ref("users/"+userKey);
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


    	$(".delete-button").click(removeUser);
		$(".edit-button").click(changeUser);

    }
//====================================================================================
// load all users data from DB and store it in arrays
	var loadUsersData = function()
	{	
		var ref = firebase.database().ref("users");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			if (data.val() == null)
			{
				alert("לא נמצאו משתמשים להציג");
				return;
			}
			allUsersObjects = data.val();
			var allUsers = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(allUsers);	// get all keys
				
			for(var i =0; i<keys.length;i++)
			{
				usersKeysArr[i] = keys[i];
				usersNamesArr[i] = allUsers[usersKeysArr[i]].name;
				//$('#clubhouse_select').append('<option value="'+i+'">'+clubhousesNamesArr[i]+'</option>');
			}
			
		});
	}
//===========================================================================================
// get the userKey from the DB 
	var getUserKeyIndex = function (name)
	{
		for (var i = 0; i < usersNamesArr.length; i++) 
		{	console.log(usersNamesArr[i]);
			if(name == usersNamesArr[i])
				return i;
		}
		return FAIL;
	}
//===========================================================================================



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

	var EditClubselectValue = function()
	{
		var index = document.getElementById("clubhouse_select_Edit").value;
		if (index < clubhousesInfo.length)
			return;
		EditSectionClubName = clubhousesInfo[index].name;
		showUsersPerCH(tempName);
		}
	var addClubSelectValue = function()
	{
		var index = document.getElementById("clubhouse_select_Add").value;
		if (index < clubhousesInfo.length)
			return;
		AddSectionClubName = clubhousesInfo[index].name;
		return AddSectionClubName;
	}












     return{addUser:addUser,loadUsersData:loadUsersData,editUser:editUser};
}();