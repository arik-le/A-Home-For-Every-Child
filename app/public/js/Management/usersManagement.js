var usersManagement = function()
{
	const ADMIN = 1;
	const GSUSER = 2;
	const PTUSER = 3;
	const FAIL = -1;
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
							'<label for="name" class="cols-sm-2 controlLabel" >:שם פרטי</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="name" id="UserPName"  placeholder="הכנס שם פרטי"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="UserLastName" class="cols-sm-2 controlLabel" id="formTxts">:שם משפחה</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="UserLastName" id="UserLName"  placeholder="הכנס שם משפחה"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="username" class="cols-sm-2 controlLabel">:שם משתמש</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="username" id="username"  placeholder="הכנס שם משתמש "/>'+
								'</div>'+
							'</div>'+
						'</div>'+

                        '<div class="form-group">'+
							'<label for="username" class="cols-sm-2 controlLabel">:סוג משתמש</label>'+
							'<div class="cols-sm-10">'+
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
							'<label for="password" class="cols-sm-2 controlLabel">:סיסמא</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
									'<input type="password" class="form-control" name="password" id="password"  placeholder="הכנס סיסמה"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="confirm" class="cols-sm-2 controlLabel">:אימות סיסמא</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
									'<input type="password" class="form-control" name="confirm" id="confirm"  placeholder="אמת בשנית סיסמה"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

                             '<div class="form-group">'+
							'<label for="clubHouseName" class="cols-sm-2 controlLabel">:בחר מועדונית</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
									'<select type="text" class="form-control clubHouseName" id="clubhouse_select" placeholder="בחר מועדונית מתוך הרשימה">'+
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
                    '<label for="clubHouseSelect" class="cols-sm-2 controlLabel">:בחר מועדונית</label>'+
                     '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
						    '<select type="text" id="clubhouse_select" class="form-control">'+
                            '</select>'+
				    '</div>'+

                    '<label for="clubHouseUsers" class="cols-sm-2 controlLabel">:בחר משתמש</label>'+
                    '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>'+
						    '<select type="text" id="usersInCH" class="form-control">'+
                            '</select>'+
				    '</div>'+
                     '<button type="button" id="openUserEditBtn" class=" col-xs-offset-4 btn btn-default" >לחץ כאן לערוך</button>'+
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
							'<label for="name" class="cols-sm-2 controlLabel" >:שם פרטי</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="name" id="UserPName"  placeholder="פלוני"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="UserLastName" class="cols-sm-2 controlLabel" id="formTxts">:שם משפחה</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="UserLastName" id="UserLName"  placeholder="אלמוני"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="username" class="cols-sm-2 controlLabel">:שם משתמש</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="username" id="username"  placeholder="שם משתמש כלשהו"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

                        '<div class="form-group">'+
							'<label for="username" class="cols-sm-2 controlLabel">:סוג משתמש</label>'+
							'<div class="cols-sm-10">'+
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
							'<label for="password" class="cols-sm-2 controlLabel">:סיסמא</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
									'<input type="password" class="form-control" name="password" id="password"  placeholder="****"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="confirm" class="cols-sm-2 controlLabel">:אימות סיסמא</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>'+
									'<input type="password" class="form-control" name="confirm" id="confirm"  placeholder="****"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

                          '<div class="form-group">'+
							'<label for="clubHouseName" class="cols-sm-2 controlLabel">:בחר מועדונית</label>'+
							'<div class="cols-sm-10">'+
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
		clubhouseManagement.preLoadData();
        $('.Nav').collapse('hide');
        $("#body").html(addUserPage.inputSection);
        $("#addUser").click(createUser);
    }
     //-------------------------------------------------------------------------------------------------
    // Edit user function 
     var editUser=function()
    {
		clubhouseManagement.preLoadData();
        $('.Nav').collapse('hide');
        $("#body").html(EditUserOp.inputSection);
        var e = document.getElementById("clubhouse_select");
        var clubhouseSelected= e.options[e.selectedIndex].text;
        showUsersPerCH(clubhouseSelected);

    
        $("#openUserEditBtn").click(function(){
        
            var e = document.getElementById("usersInCH");
            var userName= e.options[e.selectedIndex].text;
            $("#body").html(EditUserPage.inputSection);
            loadUserDetails();
            clubhouseManagement.preLoadData();
            $(".delete-button").click(removeUser);
            $(".edit-button").click(changeUser);
        
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
        var e = document.getElementById("clubhouse_select");

		if(e.selectedIndex == -1)// when there are no clubhouses at DB
		{
			alert("אנא הזן מועדוניות לפני יצירת משתמשים במערכת");
			return;
		}
        var Uclubhouse= e.options[e.selectedIndex].text;
		
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
		updateClubhouse(Uclubhouse,type,key.key);
        alert("הוזן בהצלחה");

    }

	var updateClubhouse = function(clubName,type,keyArg)
	{
		var arrays = clubhouseManagement.getClubhouseArrays();
		var index = getClubKeyIndex(arrays,clubName);
		if(index == FAIL)
		{
			alert("לא נמצאה מועדונית תואמת");
			return;
		}
		var key = arrays.clubhousesKeysArr[index];
		if(type == "הורה")
		{
			firebase.database().ref('clubhouse/'+key+'/PTusers').push(keyArg);
		}
		if(type == GSUSER)
			firebase.database().ref('clubhouse/'+key+'/GSusers').push(keyArg);
		/*if(type == ADMIN)
			firebase.ref('clubhouse/'+key+'ADusers').push()*/
	};

	var getClubKeyIndex = function (arrays,clubName)
	{
		for (var i = 0; i < arrays.clubhousesNamesArr.length; i++) 
		{
			if(clubName == arrays.clubhousesNamesArr[i])
				return i;
		}
		return FAIL;
	}
	

    var loadUsersData = function()
	{
		var ref = firebase.database().ref("users");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			if (data.val() == null)
			{
				alert("לא נמצאו משתמשים להציג ");
				return;
			}
			var allUsers = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(allUsers);	// get all keys
				
			for(var i =0; i<keys.length;i++)
			{
				var k = keys[i];
				var name = allUsers[k].username;
				$('#Users_select').append('<option value="'+i+'">'+name+'</option>');
			}
		});

	}

    var loadUserDetails = function()
    {
      

    }

    var  showUsersPerCH= function(clubhouseSelected)
    {
       
        var ref = firebase.database().ref("clubhouse");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			if (data.val() == null)
			{
				alert("לא נמצאו משתמשים להציג ");
				return;
			}
			var allClubs = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(allClubs);	// get all keys
				
			for(var i =0; i<keys.length;i++)
			{
				var k = keys[i];
				var name = allUsers[k].username;
				$('#Users_select').append('<option value="'+i+'">'+name+'</option>');
			}
		});

    }

     return{addUser:addUser,loadUsersData:loadUsersData,editUser:editUser};
}();