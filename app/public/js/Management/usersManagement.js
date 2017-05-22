var usersManagement = function()
{

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
									'<span class="input-group-addon"><i class="fa fa-slideshare" aria-hidden="true"></i></span>'+
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
						    '<select type="text" id="Users_select" class="form-control">'+
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
									'<span class="input-group-addon"><i class="fa fa-slideshare" aria-hidden="true"></i></span>'+
									'<select type="text" class="form-control clubHouseName" id="clubhouse_select">'+
                                    '</select>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group ">'+
							'<button type="button" class="btn btn-primary btn-lg edit-button"  >סיום עריכה</button>'+
                            '<button type="button" class="btn-danger btn-danger btn-lg  delete-button"  >מחיקת משתמש</button>'+
						'</div>'+
					'</form>'+
				'</div>'+
        '</div>'
     }



    //-------------------------------------------------------------------------------------------------
    // add user function
    var addUser=function()
    {
        $('.Nav').collapse('hide');
        $("#body").html(addUserPage.inputSection);
        clubhouseManagement.preLoadData();
        $("#addUser").click(createUser);
    }
     //-------------------------------------------------------------------------------------------------
    // Edit user function 
     var editUser=function()
    {
        $('.Nav').collapse('hide');
        $("#body").html(EditUserOp.inputSection);
        $("#openUserEditBtn").click(function(){
        
            $("#body").html(EditUserPage.inputSection);
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
        var Uclubhouse=document.getElementById("clubhouse_select").value;
        for(var i=0;i<login.usersAndKeys[0].length;i++)
        {
            if(login.usersAndKeys[0][i].username==username)
            {
                alert("שם משתמש כבר קיים");
                return;
            }
        }
        var fPassword=document.getElementById("password").value;
        var sPassword=document.getElementById("confirm").value;
        if(sPassword!=fPassword)
        {
            alert("שני הסיסמאות לא תואמות");
            return;
        }
        var type=document.getElementById("userType").value;
        var database = firebase.database();	
        var usersRef = database.ref('users');
        var newUser = User.create(username,fPassword,firstName,lastName,Uclubhouse,type);
        var key = usersRef.push(newUser);
        firebase.database().ref('users/' + key.key + '/userKey').set(key.key);
       
        alert("הוזן בהצלחה");

    }

    var loadUsersData = function()
	{
		var ref = firebase.database().ref("users");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			if (data.val() == null)
			{
				alert(" לא נמצאו משתמשים להציג ");
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


     return{addUser:addUser,loadUsersData:loadUsersData};
}();