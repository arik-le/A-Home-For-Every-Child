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
							'<div class="panel-title text-center">'+
								'<h1 id="titleCH" class="title">הוספת מועדונית</h1>'+
								'<hr />'+
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
                   '<label for="clubBottunGroup_edcm" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
					'<br>'+
					'<div  id ="clubBottunGroup_edcm" class = "col-md-4">'+
				    '</div>'+
					'</p>'+
					'<div class="form-group " id="buttons_area">'+
						'<button id ="editCHbtn" type="button" class="btn btn-primary btn-block btn-lg edit-button"  >ערוך פרטי מועדונית</button>'+
						'<button id ="deleteCHbtn" type="button" class="btn-danger btn-danger btn-block btn-lg  delete-button"  >הסר מועדונית</button>'+
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
			var name = 	document.getElementById("clubhouseNameID").value;
			var address = document.getElementById("clubhouseAddrID").value;

			var newclubhouse = clubHouse.create(name,address);
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
			document.getElementById('titleCH').innerHTML ="עריכת מועדונית"; // change top title
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

		var cref = firebase.database().ref('clubhouse/');
		cref.child(clubhousesInfo[edit_clubIndex].key).update(obj);
	}

	var CHsellection = function(e)
	{
		edit_clubname = e.target.innerText;
		edit_clubIndex = getClubKeyIndex(e.target.innerText.trim());
	}
 
	var removeCHlistener = function()
	{
		if(!edit_clubname)
			alert('לא נבחרה מועדונית');
		else
			alert('האם אתה בטוח ?פעולה זו תמחק את כל המשתמשים');
		removeAllUsersFromCh(clubhousesInfo[edit_clubIndex].key);
		firebase.database().ref('clubhouse/'+clubhousesInfo[edit_clubIndex].key).remove()
		.then(function(res)
		{
			clubhousesInfo = [];
			editClubhouse();
		});
		
	}

//	 not working yet
	var removeAllUsersFromCh = function(clubKey)
	{
		console.log(clubKey);
		firebase.database().ref('clubhouse/'+clubKey+"/usersList").once("value")
		.then(function(data)
		{
			if(data.val() == null)
				return;
			var allUsers = data.val();   // get the whole tree of clubhouses
			var keys = Object.keys(allUsers);	// get all keys
			return keys;
		}).then(function(keys)
		{
			for (var i = 0; i < keys.length; i++) {
				firebase.database().ref("users/"+keys[i]).remove();
				
			}
			
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
					var btnInput = '<button id = '+tempBtnID+' type="button" class="btn btn-default ">'+
										'<span class="glyphicon glyphicon-home"></span> '+clubhousesInfo[i].name+
									'</button>';
					$('#clubBottunGroup_edcm').append(btnInput);
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