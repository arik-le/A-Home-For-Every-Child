var usersManagement = function()
{
    //-------------------------------------------------------------------------------------------------
    //  User Management Page Buttons-Options
      var userOptions={
          inputSection:
            '<div class="container">'+
                '<button type="button" id="btnNewUser" class="btn btn-secondry btn-lg btn-block">הוספת משתמש</button>'+
                '<button type="button" id="btnEditUser" class="btn btn-secondry btn-lg btn-block"">עריכה</button>'+
            '</div>'
     }
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

						'<div class="form-group ">'+
							'<button type="button" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" id="addUser" >הרשמה</button>'+
						'</div>'+
					'</form>'+
				'</div>'+


            //  '<div class="modal fade" id="myModal" role="dialog">'+
            //     '<div class="modal-dialog modal-sm">'+
            //         '<div class="modal-content">'+
            //             '<div class="modal-header">'+
            //                 '<button type="button" class="close" data-dismiss="main">&times;</button>'+
            //                 '<h4 class="modal-title">!הרשמה בוצעה בהצלחה</h4>'+
            //             '</div>'+
            //             '<div class="modal-body">'+
            //                 '<p>תן בראש יא ביצה</p>'+
            //             '</div>'+
            //             '<div class="modal-footer">'+
            //                 '<button type="button" class="btn btn-default" data-dismiss="main">סגור</button>'+
            //             '</div>'+
            //         '</div>'+
            //     '</div>'+
            // '</div>'+
        '</div>'
     }
       //-------------------------------------------------------------------------------------------------
        var EditUser={
        inputSection:
                '<div class="container">'+
                    '<label for="clubHouseSelect" class="cols-sm-2 controlLabel">:בחר מועדונית</label>'+
                     '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
						    '<select type="text" class="form-control">'+
                                '<option class="1">1</option>'+
                                '<option class="2">2</option>'+
                                '<option class="3">3</option>'+
                                '<option class="4">4</option>'+
                            '</select>'+
				    '</div>'+

                    '<label for="clubHouseUsers" class="cols-sm-2 controlLabel">:בחר משתמש</label>'+
                    '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>'+
						    '<select type="text" class="form-control">'+
                                '<option class="1">1</option>'+
                                '<option class="2">2</option>'+
                                '<option class="3">3</option>'+
                                '<option class="4">4</option>'+
                            '</select>'+
				    '</div>'+

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

						'<div class="form-group ">'+
							'<button type="button" class="btn btn-primary btn-lg edit-button"  >סיום עריכה</button>'+
                            '<button type="button" class="btn-danger btn-danger btn-lg  delete-button"  >מחיקת משתמש</button>'+
						'</div>'+
					'</form>'+
				'</div>'+
        '</div>'
     }



    //-------------------------------------------------------------------------------------------------
    // Initial page for injecting the html components
    var addUser=function()
    {
        $('.Nav').collapse('hide');
        $("#body").html(addUserPage.inputSection);
        $("#addUser").click(createUser);
    }
     var initPage=function()
     {
            $('.Nav').collapse('hide');
            $("#body").html(userOptions.inputSection);
        
              $("#btnEditUser").click ( function()
            {
                 $("#body").html(EditUser.inputSection);
            });
     }

    //-------------------------------------------------------------------------------------------------
    var createUser=function()
    {
        var firstName=document.getElementById("UserPName").value;
        var lastName=document.getElementById("UserLName").value;
        var username=document.getElementById("username").value;
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
        var newUser = User.create(username,fPassword,firstName,lastName,"A",type);
        var key = usersRef.push(newUser);
        firebase.database().ref('users/' + key.key + '/userKey').set(key.key);
       
        alert("הוזן בהצלחה");

    }


     return{initPage:initPage,addUser:addUser};
}();