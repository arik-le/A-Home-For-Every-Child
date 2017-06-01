var clubhouseManagement = function()
{
	// load data locally for edit window
	var clubhousesInfo = [];
	var allClubhousesObjects;	
	///////////////////////////////////////
	
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
					
						'<div class="form-group ">'+
							'<button type="button" id="addClubhouseBtn" class="btn btn-primary btn-lg btn-block register-button" data-toggle="modal" data-target="#myModal" >הוספה</button>'+
						'</br>'+
						'</div>'+
					'</form>'+
				'</div>'+

        '</div>'
     }
       //-------------------------------------------------------------------------------------------------
       //       INJECTION FOR EDIT OPTION - clubhouse and user choosing
        var EditClubhousePage={
        inputSection:
                '<div class="container">'+
                    '<label for="clubHouseSelect" class="col-sm-2 controlLabel">:בחר מועדונית</label>'+
                     '<div class="input-group">'+
						    '<span class="input-group-addon"><i class="fa fa-home" aria-hidden="true"></i></span>'+
						    '<select id="clubhouse_select" type="text" class="form-control">'+
                            '</select>'+
				    '</div>'+

                    '<button type="button" id="editClubhouseBtn" class="tempEditPage btn btn-default" >לחץ כאן לערוך</button>'+
                    '</div>'
        }
    
   
    //-------------------------------------------------------------------------------------------------
    // Initial page for add clubHouse
	 var addClubhouse = function ()
	 {
		$('.Nav').collapse('hide');
		$("#body").html(addClubhousePage.inputSection); // opens page 
		$("#addClubhouseBtn").click(addClubhouseListener);
	 }
	 //-------------------------------------------------------------------------------------------------
    // Initial page for edit clubHouse
	 var editClubhouse = function()
	 {
		loadClubhousesData();
		$('.Nav').collapse('hide');
		$("#body").html(EditClubhousePage.inputSection);
        $("#editClubhouseBtn").click(EditCluhouseListener);
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
				clubhousesInfo[i] = {key:keys[i],name:allClubhouses[keys[i]].name};
				$('#clubhouse_select').append('<option value="'+i+'">'+clubhousesInfo[i].name+'</option>');
			}
		});
	}
	var getClubhousesInfo = function()
	{
		return{ clubhousesInfo:clubhousesInfo} ;  
	}
	

    return{getClubhousesInfo:getClubhousesInfo  , addClubhouse:addClubhouse , editClubhouse:editClubhouse};
}();