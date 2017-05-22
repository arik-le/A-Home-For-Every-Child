var clubhouseManagement = function()
{
	// load data locally for edit window
	var clubhousesKeysArr = [];
	var clubhousesNamesArr = [];
	var allClubhousesObjects;	
	///////////////////////////////////////

    //-------------------------------------------------------------------------------------------------
    //  Clubhouse Management Page Buttons-Options
      var clubhouseOptions={
          inputSection:
            '<div class="container">'+
                '<button type="button" id="btnNewClubhouse" class="btn btn-secondry btn-lg btn-block">הוספת מועדונית</button>'+
                '<button type="button" id="btnEditClubhouse" class="btn btn-secondry btn-lg btn-block"">עריכה</button>'+
            '</div>'
     }
     //-------------------------------------------------------------------------------------------------
     // INJECTION FOR ADDING NEW CLUBHOUSE PAGE
	var addClubhousePage={
        inputSection:
        '<div class="container">'+
            	'<div class="row main">'+
				'<div class="panel-heading">'+
	               '<div class="panel-title text-center">'+
	               		'<h1 class="title">הוספת מועדונית</h1>'+
	               		'<hr />'+
	                '</div>'+
	            '</div> '+

            	'<div class="main-login main-center">'+
					'<form class="form-horizontal" method="post" action="#">'+
						
						'<div class="form-group">'+
							'<label for="clubhouseName" class="cols-sm-2 controlLabel" >:שם מועדונית</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="clubhouseName" id="clubhouseNameID"  placeholder="הכנס שם מועדונית"/>'+
								'</div>'+
							'</div>'+
						'</div>'+

						'<div class="form-group">'+
							'<label for="clubhouseAddress" class="cols-sm-2 controlLabel" id="formTxts">:כתובת המועדונית</label>'+
							'<div class="cols-sm-10">'+
								'<div class="input-group">'+
									'<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>'+
									'<input type="text" class="form-control" name="clubhouseAddress" id="clubhouseAddrID"  placeholder="הכנס כתובת מועדונית"/>'+
								'</div>'+
							'</div>'+
						'</div>'+
					
						'<div class="form-group ">'+
							'<button type="button" id="addClubhouseBtn" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" >הוספה</button>'+
						'</div>'+
					'</form>'+
				'</div>'+

        '</div>'
     }
       //-------------------------------------------------------------------------------------------------
       //       INJECTION FOR EDIT OPTION - clubhouse and user choosing
        var EditCluhouse={
        inputSection:
                '<div class="container">'+
                    '<label for="clubHouseSelect" class="cols-sm-2 controlLabel">:בחר מועדונית</label>'+
                     '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
						    '<select id="clubhouse_select" type="text" class="form-control">'+
                            '</select>'+
				    '</div>'+

                    '<label for="clubHouseUsers" class="cols-sm-2 controlLabel">:בחר משתמש</label>'+
                    '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>'+
						    '<select id="Users_select" type="text" class="form-control">'+
                            '</select>'+
				    '</div>'+
                    '<button type="button" id="editClubhouseBtn" class="tempEditPage btn btn-default" >לחץ כאן לערוך</button>'+
                    '</div>'

				
        }
    //-------------------------------------------------------------------------------------------------
    //          TEMP -FOR DINAMIC EDITING  USER
	/*
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
	*/


    //-------------------------------------------------------------------------------------------------
    // Initial page for injecting the html components

     var initPage=function()
     {
            $("#body").html(clubhouseOptions.inputSection);

			// button on first window after click add clubhouse
            $("#btnNewClubhouse").click ( function()
            {
                $("#body").html(addClubhousePage.inputSection); // opens page 
				$("#addClubhouseBtn").click(addClubhouseListener);
            });

			// button on first window after click edit clubhouse
            $("#btnEditClubhouse").click ( function()
            {
                  $("#body").html(EditCluhouse.inputSection);
				  preLoadData();
                  $("#editClubhouseBtn").click(EditCluhouseListener);
            });

     }


	//////////////////////////////////////////////////////////////////////////
	// 					ADD CLUBHOUSE										//
	//					-------------										//
	// check if club is exist, if not - create and push to DB new clubhouse.//
	/////////////////////////////////////////////////////////////////////////
	var validateAndPush = function(nameArg,addressAarg)
	{
		var ref = firebase.database().ref("clubhouse");
		ref.once("value")
		.then(function(data)		// 		when value recieved
		{
			// in case the root is empty  ->  name is not exist
			if (data.val() == null)
				return false;

			var allClubhouses = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(allClubhouses);	// get all keys
			
			// loop on the answere array to find clubhouse name.
			for(var i =0; i<keys.length;i++)
			{
				var k = keys[i];
				var tempName = allClubhouses[k].name;
					
				if( tempName == nameArg )
					return true;
			}
			return false;

		}).then(function(res) 
		{
			if(res)		// name is already exist in DB
			{
				alert("המועדונית שהוזנה כבר קיימת במערכת");
				return false;
			}	
			// else - push clubhouse to DB
			var name = 	document.getElementById("clubhouseNameID").value;
			var address = document.getElementById("clubhouseAddrID").value;

			var newclubhouse = clubHouse.create(name,address);
			var key = firebase.database().ref('clubhouse').push(newclubhouse);
			firebase.database().ref('clubhouse/'+key.key+'/ClubhouseDBkey').set(key.key); // set key property
			return true;
		}).then(function(result){
			if(result)
				alert("מועדונית התווספה בהצלחה");
		});
	}

	//---------------------------------------------------------------------
	
	var addClubhouseListener = function()
	{
		var name = 	document.getElementById("clubhouseNameID").value;
		var address = document.getElementById("clubhouseAddrID").value;
		if (name == "" || address == "" )
		{
			alert("אנא הכנס שם מועדונית וכתובת");
			return;
		}
		// check if clubhouse already exists on DB and push if not.
		validateAndPush(name,address);
	}

	//////////////////////////////////////////////////////////////
	// 		EDIT CLUBHOUSE										//
	//		-------------										//
	//////////////////////////////////////////////////////////////


	var EditCluhouseListener = function()
	{
		console.log(clubhousesNamesArr);
		console.log(clubhousesKeysArr);
		console.log(allClubhousesObjects);
		// console.log($('#clubhouse_select').);
	}

	// loads clubhouse and user data for edit window
	var preLoadData = function()
	{
		// load clubhouse Data locally
		loadClubhousesData();
				//load user form usermanage.js
	}
 
	// loads only strings of names for now.
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
				clubhousesKeysArr[i] = keys[i];
				clubhousesNamesArr[i] = allClubhouses[clubhousesKeysArr[i]].name;
				$('#clubhouse_select').append('<option value="'+i+'">'+clubhousesNamesArr[i]+'</option>');
			}
		});
	}

	

    return{initPage:initPage , preLoadData:preLoadData};
}();