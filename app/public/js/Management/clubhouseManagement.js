var clubhouseManagement = function()
{
	// load data locally for edit window
	var clubhousesInfo = [];
	var allClubhousesObjects;	
	const ADDPAGE = 1;
	const EDITPAGE = 2;
	const FAIL = -1;
	var page;

	// edit page vars
	var clubToEdit;
	var edit_clubname;
	var edit_clubIndex;


	///////////////////////////////////////
	
     //-------------------------------------------------------------------------------------------------
     // INJECTION FOR ADDING NEW CLUBHOUSE PAGE
	var addClubhousePage={
        inputSection:
		'<div class="container">'+
			'<div class="row main">'+
						'<div class="panel-heading">'+
								'<h1 id="allTitles"">הוספת מועדונית</h1>'+
							'</div>'+
						'</div> '+

						'<div class="main-login main-center">'+
							'<form class="form-horizontal" method="post" action="#">'+
						
								'<div class="form-group">'+
									'<label for="clubhouseName" class="col-sm-2 controlLabel" >:שם מועדונית</label>'+
									'<div class="col-sm-10">'+
										'<div class="input-group">'+
											'<span class="input-group-addon"><i class="fa fa-home fa" aria-hidden="true"></i></span>'+
											'<input type="text" class="form-control" name="clubhouseName" id="clubhouseNameID"  placeholder="הכנס שם מועדונית"/>'+
										'</div>'+
									'</div>'+
								'</div>'+

								'<div class="form-group">'+
									'<label for="clubhouseAddress" class="col-sm-2 controlLabel" id="formTxts">:כתובת המועדונית</label>'+
									'<div class="col-sm-10">'+
										'<div class="input-group">'+
											'<span class="input-group-addon"><i class="fa fa-map-marker fa" aria-hidden="true"></i></span>'+
											'<input type="text" class="form-control" name="clubhouseAddress" id="clubhouseAddrID"  placeholder="הכנס כתובת מועדונית"/>'+
										'</div>'+
									'</div>'+
								'</div>'+
							
								'<div id = "buttonSection" class="form-group">'+
									
								'</div>'+
							'</form>'+
						'</div>'+

				'</div>'
			}


			var addClubhouseBtn={
       		 inputSection:'<button type="button" id="addClubhouseBtn" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" >הוספה</button>'+
									'</br>'
			}

			var editClubhouseBtn={
       		 inputSection:'<button type="button" id="editClubhouseBtn" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" >עריכה</button>'+
									'</br>'
			}
       //-------------------------------------------------------------------------------------------------
       //       INJECTION FOR EDIT OPTION - clubhouse and user choosing
        var EditClubhousePage={
        inputSection:
                '<div class="container">'+
					'<div  class="col-md-4 text-center">'+
						'<label id="selectCHLabel" for="clubBottunGroup_edcm" class="col-sm-2 controlLabel">בחר מועדונית</label>'+
					'</div>'+
						'<div id = "clubBottunGroup_edcm">'+
						'</div>'+
					'</p>'+
					'<div class="form-group " id="buttons_area"></br>'+
						'<button id ="editCHbtn" type="button" class="btn btn-primary btn-block btn-lg edit-button"  >ערוך פרטי מועדונית</button>'+
						'<button id ="deleteCHbtn" type="button" class="btn-danger btn-danger btn-block btn-lg  delete-button"  >הסר מועדונית</button>'+
					'</div>'+
				'</div>'
        }

    
    //-------------------------------------------------------------------------------------------------
    // Initial page for add clubHouse
	 var addClubhouse = function ()
	 {
		page = ADDPAGE;
		$('.Nav').collapse('hide');
		$("#body").html(addClubhousePage.inputSection); // opens page 
		$('#buttonSection').html(addClubhouseBtn.inputSection);
		$("#addClubhouseBtn").click(addClubhouseListener);
	 }
	 //-------------------------------------------------------------------------------------------------
    // Initial page for edit clubHouse
	 var editClubhouse = function()
	 {
		page = EDITPAGE;
		loadClubhousesData();
		$('.Nav').collapse('hide');
		$("#body").html(EditClubhousePage.inputSection);
        $("#editCHbtn").click(EditCluhouseListener);
		$('#deleteCHbtn').click(removeCHlistener);
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
			var newclubhouse = clubHouse.create(nameArg,addressAarg);
			var key = firebase.database().ref('clubhouse').push(newclubhouse);
			firebase.database().ref('clubhouse/'+key.key+'/ClubhouseDBkey').set(key.key); // set key property
			return true;
		}).then(function(result){
			if(result)
				alert("מועדונית התווספה בהצלחה");
			addClubhouse();
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
	// edit button from clubhosue edit menu
	var EditCluhouseListener = function(e)
	{
		var clubRef = firebase.database().ref('clubhouse/'+clubhousesInfo[edit_clubIndex].key);
		clubRef.once("value").then(function(data)
		{
			clubToEdit = data.val();	// keep ch info
			// inject html and set listener for edit page
			$('.Nav').collapse('hide');
			$("#body").html(addClubhousePage.inputSection); 
			document.getElementById('allTitles').innerHTML ="עריכת מועדונית"; // change top title
			// set inputs
			$('#clubhouseAddrID').val(data.val().address);
			$('#clubhouseNameID').val(data.val().name);
			$('#buttonSection').html(editClubhouseBtn.inputSection);
			$('#editClubhouseBtn').click(changeCHListener);
		});
	}

	var changeCHListener = function()
	{
		var obj={};
		var name = $('#clubhouseNameID').val();  //current value
		var address = $('#clubhouseAddrID').val();
		
		if(clubToEdit.name != name)
			obj.name = name;

		if(clubToEdit.address != address)
			obj.address = address;

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
					
				if( tempName == obj.name )
					return true;
			}
			return false;	
		}).then(function(res)
		{
			if(res == false)
			{
				var cref = firebase.database().ref('clubhouse/');
				cref.child(clubhousesInfo[edit_clubIndex].key).update(obj);
				alert("!עודכן בהצלחה");
				editClubhouse();
			}
			else
			{
				alert("!מועדונית בשם זה כבר קיימת");
			}
		});
		
	}

	var CHsellection = function(e)
	{
		edit_clubname = e.target.innerText;
		edit_clubIndex = getClubKeyIndex(e.target.innerText.trim());
	}
	var size=function(obj) 
    {
        var len = 0, key;
        for (key in obj) 
            if (obj.hasOwnProperty(key))
                len++;
        return len;
    }
	var removeCHlistener = function()
	{
		var len=size(login.correntClub[0]);
		console.log(len);
		for(var i=0;i<len;i++)
			Message.deleteGenMessage(i);
		if(!edit_clubname)
			alert('לא נבחרה מועדונית');
		else
			alert('האם אתה בטוח ? פעולה זו תמחק את כל המשתמשים המשויכים למועדונית זו');
		removeAllUsersFromCh(clubhousesInfo[edit_clubIndex].key);
		
		// var genRef=firebase.database().ref('clubhouse/'+clubhousesInfo[edit_clubIndex].key+'/generalMessages');
		// genRef.once("value").then(function(data)
		// {
		// 	if(data.val() == null)
		// 		return;
		// 	var msgs = data.val();
		// 	var mKeys = Object.keys(msgs);

		// 	for(var i=0;i<mKeys.length;i++)
		// 	{
		// 		removeAllMsgs(clubhousesInfo[edit_clubIndex].key,i);
		// 	}
			
		//});
		
	}
	var removeCH = function(clubKey)
	{
		firebase.database().ref('clubhouse/'+clubKey).remove()
		.then(function(res)
		{
			clubhousesInfo = [];
			editClubhouse();
		});

	}

	var removeAllMsgs = function(clubKey,i)
	{
		var club = clubKey;
        var delMsg = firebase.database().ref("clubhouse/" + club + "/generalMessages").once("value")
        .then(function(data)
        {
            var messages = data.val();
            var keys = Object.keys(messages);
            
            firebase.database().ref("clubhouse/" + club + "/generalMessages/" + keys[i]).once("value")
			.then(function(data)
			{
            	var curMessage = data.val();        //  take the message object

            	if(curMessage.imageURL != -1)      // delete an image from storage
            	{
                	var storage = firebase.storage();
                	var storageRef = storage.ref();
                	var desertRef;
				
					if(curMessage.imageKey == -1)  // delete image to specific club          
					{
					desertRef  = storageRef.child('/generalMessagesImages/' + club + '/' + curMessage.imageName);
					desertRef.delete().then(function(){}).catch(function(error){});
					}
					else
					{
						firebase.database().ref("Images/" + curMessage.imageKey).once("value")
						.then(function(data)
						{
							var details = data.val();
							if(details.capacity == 1)
							{
								desertRef  = storageRef.child('/generalMessagesImages/allClubs/' + curMessage.imageName);
								desertRef.delete().then(function(){}).catch(function(error){});
								firebase.database().ref("Images/" + curMessage.imageKey).remove();
							}
							else
							{
								var obj = {capacity:details.capacity-1};
								var imageRef = firebase.database().ref('Images/');
								imageRef.child(curMessage.imageKey).update(obj);
							}
						});

                	}   
            	}
            	var deleteMsg = firebase.database().ref("clubhouse/" + club + "/generalMessages/" +keys[i]);
            	deleteMsg.remove();
			
           });
        });

	}

	var removeAllUsersFromCh = function(clubKey)
	{
	
		firebase.database().ref('clubhouse/'+clubKey+"/usersList").once("value")
		.then(function(data)
		{
			if(data.val() == null)
				removeCH(clubKey);
			var allUsers = data.val();   // get the whole tree of clubhouses
			var keys=Object.keys(allUsers);
	
			for (var i = 0; i < keys.length; i++) 
			{
				var uRefKey= keys[i];
				var uRef = firebase.database().ref("users/"+allUsers[uRefKey].userkey)
				uRef.once("value").then(function(data)
				{
					if(data.val() == null)
							return;	
					var userObj = data.val();
					
					if(userObj.userType == 3)
						deleteClubRef(userObj.userKey,clubKey);
					
					else
					{
						firebase.database().ref("users/"+userObj.userKey).remove(); 
						removeCH(clubKey);
					}
				});
			}
		});
	
	}


	var deleteClubRef = function(keyUser,clubKey)
	{
		var clubsRef = firebase.database().ref("users/"+keyUser+'/clubhouseKey');
			clubsRef.once("value").then(function(data)
			{
				if(data.val() == null)
					return;	
				var clubsData = data.val();			
				var cKeys = Object.keys(clubsData);
				if(cKeys.length > 1)
				{  
					for(var i=0;i<cKeys.length;i++)
					{
						var clKey = clubsData[cKeys[i]];
						var k = cKeys[i];
						if(clKey == clubKey)
							firebase.database().ref("users/"+keyUser+'/clubhouseKey').child(k).remove();
					}
				}
				else
					firebase.database().ref("users/"+keyUser).remove(); 

				removeCH(clubKey);

			});
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
				if(page == EDITPAGE)
				{
					clubhousesInfo[i] = {key:keys[i],name:allClubhouses[keys[i]].name};
					var tempBtnID = 'btn'+i;
					var btnInput = '<a href="#" id="'+tempBtnID+'" class="btn btn-sq-lg btn-primary clubSquare">'+
					'<i class="fa fa-home fa-2x"></i><br/>'+clubhousesInfo[i].name+'</a>';
					$('#clubBottunGroup_edcm').append(btnInput);
					mainPage.paintButton(i,tempBtnID)
					$('#'+tempBtnID).click(CHsellection);
				}
				if(page == ADDPAGE)
				{
					clubhousesInfo[i] = {key:keys[i],name:allClubhouses[keys[i]].name};
					$('#clubhouse_select').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
				}
			}
		});
	}

	var getClubKeyIndex = function (clubName)
	{
		for (var i = 0; i < clubhousesInfo.length; i++) 
		{
			if(clubName.trim() == clubhousesInfo[i].name)
				return i;
		}
		return FAIL;
	}

	var getClubhousesInfo = function()
	{
		return{ clubhousesInfo:clubhousesInfo} ;  
	}
	

    return{getClubhousesInfo:getClubhousesInfo  , addClubhouse:addClubhouse , editClubhouse:editClubhouse};
}();