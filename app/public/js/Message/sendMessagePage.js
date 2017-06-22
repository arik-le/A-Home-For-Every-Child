var sendMessagePage = function()
{
	var GENERAL_MESSAGE = 0;
	var PRIVATE_MESSAGE = 1;
	var ONLY_PARENTS = 0;
	var ONLY_TEACHERS = 1;
	var EVERYBODY = 2;
    var CAPACITY_LIMIT = 30;
	var isFull = false;
	var msgPage={
	inputSection:
	
	'<div class="container">'+
		'<h2 id = "allTitles">כתיבת הודעה חדשה</h2></br>'+
	
		'<div class="container">'+
			'<div class = "mytabs">'+
				'<ul class="nav nav-pills center-pills">'+
					'<li class="active">'+
						'<a  href="#privatreMessage" id="prvtMes"data-toggle="tab">הודעה פרטית</a>'+
					'</li>'+
					'<li><a href="#generalMessage" id="genMes" data-toggle="tab">הודעה כללית</a>'+
					'</li>'+
				'</ul>'+
			'</div>'+

			'<div class="tab-content clearfix">'+
				'<div class="tab-pane active" id="privatreMessage">'+
						'<select class = "userCkecklist" id = "clubHouseSM" required onchange="sendMessagePage.updateUserType()" >'+
						'</select></br>'+
				
			
						'<label id="royLabel">:שלח אל</label></br></br>'+
						'<select class = "userCkecklist" id = "chooseUserSM" required >'+
							'<option value="nan" disabled selected>בחר משתמש</option>'+
						'</select>'+
						'<select class = "userCkecklist"  id = "TypeUserSM" required  onchange="sendMessagePage.updateUserList()">'+							
							'<option value="nan" disabled selected>סוג משתמש</option>'+
						'</select>'+
						
						'<label id="royLabel">:נושא</label></br>'+
						'<input id = "subjectSM" type="text" class="form-control" id="name" name="name" placeholder="נושא ההודעה" value="" maxlength="50" dir="rtl">'+
						'<label id="royLabel">:תוכן ההודעה</label></br>'+
						'<textarea id = "contentSM" class="form-control" rows="10" name="message" placeholder="תוכן ההודעה" dir="rtl"></textarea></br>'+
					

					'<div class="col-sm-10 col-sm-offset-2">'+
						'<input id="sendButtonPM" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
						'<button id="cleanButtonPM" type="button" class="btn">נקה</button>'+
					'</div>'+
				'</div>'+
				
			'<div class="tab-pane " id="generalMessage" >'+
				'<select id = "clubHouseGM" required >'+
				'</select></br>'+
				'<label id="royLabel">:שלח אל</label></br></br>'+
				'<label for="teachers" class="chkbox">מורים</label>'+
				'<input id="selTeachers" type="checkbox" name="teachers" id="teachers" class="custom" />'+
				'<label for="parents" class="chkbox">הורים</label>'+
				'<input id="selParents" type="checkbox" name="parents" id="parents" class="custom" checked/>'+
				'</br>'+
				
				'<label id="royLabel">:נושא</label></br>'+
				'<input id = "subjectGM" type="text" class="form-control" id="name" name="name" placeholder="נושא ההודעה" value="" maxlength="50" dir="rtl">'+
				'<label id="royLabel">:תוכן ההודעה</label></br>'+
				'<textarea id = "contentGM" class="form-control" rows="10" name="message" placeholder="תוכן ההודעה" dir="rtl"></textarea></br>'+
				
				'<div class="container">'+
					'<div class="col-md-6">'+
						'<div class="form-group">'+
							'<label>הוסף תמונה</label>'+
							'<div class="input-group">'+
								'<span class="input-group-btn">'+
									'<span class="btn btn-default btn-file">'+
										'בחר <input type="file" id="imgInp">'+
									'</span>'+
								'</span>'+
								'<input type="text" class="form-control" readonly>'+
							'</div>'+
							'<img id="img-upload"/>'+
						'</div>'+
					'</div>'+
				'</div>'+

				'<div class="col-sm-10 col-sm-offset-2">'+
					'<input id="sendButtonGM" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
					'<button id="cleanButtonGM" type="button" class="btn">נקה</button>'+
				'</div>'+
			
			'</div>'+
		'</div>'+
	'</div>'
	}

//-------------------------------------------------------------------------------------------------

	var updateClubList=function()				//update the list of clubHouses
	{
		var clubhouses = login.correntUser[0].clubhouseKey;
		var myType = login.correntUser[0].userType;
    
	    if(myType == User.ADMIN || myType == User.SOCIAL)
		{		
			firebase.database().ref("clubhouse/").once("value")
			.then(function(data)
			{
				var clubs=data.val();
				var keys=Object.keys(clubs);
				$("#clubHouseSM").html('<option value="nan" disabled selected>בחר מועדונית</option>');
				$("#clubHouseGM").html('<option value="nan" disabled selected>בחר מועדונית</option>');

				for(var i=0;i<keys.length;i++)
				{
					if(myType == User.SOCIAL)
					{
						for(var j=0;j<clubhouses.length;j++)
						{
							if(clubhouses[j]==keys[i])
							{
								$("#clubHouseSM").append('<option value='+clubs[keys[i]].ClubhouseDBkey+'>'+clubs[keys[i]].name+'</option>');
								$("#clubHouseGM").append('<option value='+clubs[keys[i]].ClubhouseDBkey+'>'+clubs[keys[i]].name+'</option>');	
							}
						}
					}
					else
					{
						$("#clubHouseSM").append('<option value='+clubs[keys[i]].ClubhouseDBkey+'>'+clubs[keys[i]].name+'</option>');
						$("#clubHouseGM").append('<option value='+clubs[keys[i]].ClubhouseDBkey+'>'+clubs[keys[i]].name+'</option>');
					}
				}
				$("#clubHouseGM").append('<option value="allClubs">כל המועדוניות</option>');
				$("#clubHouseSM").append('<option value="allAdmin">מנהלים</option>');
			});
		}
		else
		{
			select ='<option value="nan" disabled selected>סוג משתמש</option>'+
				'<option class="ptUser" value="0">הורה</option>'+
				'<option class="TtUser" value="1">מורה</option>'+
				'<option class="GuUser" value="2">מדריך</option>'+
				'<option class="SWUser" value="3">עו"ס</option>'+
				'<option class="admin" value="4">מנהל</option>'

			$("#TypeUserSM").html(select);
			updateUserList();
		}
	}

//-------------------------------------------------------------------------------------------------

	var updateUserType = function()
	{
		var myType = login.correntUser[0].userType;
		var club;
    
	    if(myType == User.ADMIN || myType == User.SOCIAL)
			club = document.getElementById("clubHouseSM").value;
		else
			club = login.correntUser[0].clubhouseKey;
		
		var select;
		if(club!= "allAdmin")
		{
			select ='<option value="nan" disabled selected>סוג משתמש</option>'+
						'<option class="ptUser" value="0">הורה</option>'+
						'<option class="TtUser" value="1">מורה</option>'+
						'<option class="GuUser" value="2">מדריך</option>'+
						'<option class="SWUser" value="3">עו"ס</option>';
		}
		else
			select = '<option value="4" selected>מנהל</option>';
		
		$("#TypeUserSM").html(select);
		updateUserList();
	}

//-------------------------------------------------------------------------------------------------

	var updateUserList = function()			//update the list of users according the clubHouses
	{
		$("#chooseUserSM").html('<option value="nan" disabled selected>בחר משתמש</option>');

		var list=login.usersAndKeys;
		var myIndex=login.correntUser[1];
		var type=document.getElementById("TypeUserSM").value;
		
		var myType = login.correntUser[0].userType;
		var club;
       
	    if(myType == User.ADMIN || myType == User.SOCIAL)
			club = document.getElementById("clubHouseSM").value;
		else
			club = login.correntUser[0].clubhouseKey;
		if(type!=User.ADMIN && type != "nan")
		{
			firebase.database().ref("clubhouse/").once("value")
			.then(function(data)
			{
				var clubHouses = data.val();
				var mykeys=Object.keys(clubHouses);

				for(var i=0;i<mykeys.length;i++)
				{
					if(clubHouses[mykeys[i]].ClubhouseDBkey == club)
					{
						var curClub = clubHouses[mykeys[i]].usersList;
						if(curClub == null)
							return;
						var allUsersInClub = Object.keys(curClub);
						
						for(var j=0;j<allUsersInClub.length;j++)
							if(curClub[allUsersInClub[j]].type == type && curClub[allUsersInClub[j]].username != login.correntUser[0].username)
							{	
								firebase.database().ref("users/"+curClub[allUsersInClub[j]].userkey).once("value")
								.then(function(data)
								{
									if(data.val() == null)
										return;
									var user = data.val();
									var mykeys=Object.keys(user);
									$("#chooseUserSM").append('<option value='+user.userKey+'>'+user.firstName+" "+user.lastName+'</option>');													
								});
							}
					}
				}
			});
		}
		if(type == User.ADMIN && type != "nan")
		{
			firebase.database().ref("users/").once("value")
			.then(function(data)
			{
				var users = data.val();
				var mykeys=Object.keys(users);
				for(var i=0;i<mykeys.length;i++)
					if(users[mykeys[i]].userType == User.ADMIN && users[mykeys[i]].username !=login.correntUser[0].username )
						$("#chooseUserSM").append('<option value='+users[mykeys[i]].userKey+'>'+users[mykeys[i]].firstName+" "+users[mykeys[i]].lastName+'</option>');													
			});
		}
	}

//-------------------------------------------------------------------------------------------------

	var sendPriMessage=function()
	{
		var from=login.correntUser[1];
		var to=document.getElementById("chooseUserSM").value;
		var subject=document.getElementById("subjectSM").value;
		var content=document.getElementById("contentSM").value;

		if(to == "nan" || to == null || to == undefined)
		{
			alert("אנה בחר/י נמען לשליחה");
			return;
		}
		if(subject == null || subject == undefined || subject == "")
		{
			alert("אנה הזן נושא");
			return;
		}
		if(content == null || content == undefined || content == "")
		{
			alert("אנה הזן תוכן");
			return;
		}

		var message=Message.create(from,to,subject,content, PRIVATE_MESSAGE);
		var allUsers = login.usersAndKeys[0];
		firebase.database().ref('users/'+ to+ '/inboxMessages').push(message);
		firebase.database().ref('users/'+ from+ '/outboxMessages').push(message);
		clearValue();
		alert("ההודעה נשלחה בהצלחה");
	}

//-------------------------------------------------------------------------------------------------

	var sendGenMessage=function()
	{
		var from=login.correntUser[1];
		var meType = login.correntUser[0].userType;
		var toClubHouse;
       
	    if(meType != User.GUIDE)
			toClubHouse = document.getElementById("clubHouseGM").value;
		else
			toClubHouse = login.correntUser[0].clubhouseKey;

		var toTeachers = document.getElementById("selTeachers").checked; 
		var toParents = document.getElementById("selParents").checked;

		var subject=document.getElementById("subjectGM").value;
		var content=document.getElementById("contentGM").value;

		if(!toTeachers && !toParents)
		{
			alert("אנה בחר יעד לשליחה");
			return;
		}
		if(toClubHouse == "nan" || toClubHouse == null || toClubHouse == undefined)
		{
			alert("אנה בחר/י מועדונית");
			return;
		}
		if(subject == null || subject == undefined || subject == "")
		{
			alert("אנה הזן נושא");
			return;
		}
		if(content == null || content == undefined || content == "")
		{
			alert("אנה הזן תוכן");
			return;
		}
	

		if(toClubHouse == "allClubs")
			sendToAll(from,toTeachers,toParents,subject,content);
		else
			sendToClub(from,toTeachers,toParents,subject,content,toClubHouse);
	}

//-------------------------------------------------------------------------------------------------

	var clearValue=function()
	{
		$("#subjectSM").val("");
		$("#contentSM").val("");
		$("#chooseUserSM").val("בחר משתמש");
		$("#subjectGM").val("");
		$("#contentGM").val("");
		$('#img-upload').css("display", "none");
	}

//-------------------------------------------------------------------------------------------------

	var pickMesByPermision = function(toTeachers,toParents,from,subject,content,imageURL,imageName,itemKey)
	{	
		if(toTeachers && toParents)
			return Message.create(from,"general",subject,content, GENERAL_MESSAGE,EVERYBODY,imageURL,imageName,itemKey);
		else if(!toTeachers && toParents)
			return Message.create(from,"general",subject,content, GENERAL_MESSAGE,ONLY_PARENTS,imageURL,imageName,itemKey);
		else
			return Message.create(from,"general",subject,content, GENERAL_MESSAGE,ONLY_TEACHERS,imageURL,imageName,itemKey);
	}

//-------------------------------------------------------------------------------------------------

	var sendToClub = function(from,toTeachers,toParents,subject,content,toClubHouse)
	{
		firebase.database().ref("clubhouse/"+ toClubHouse + "/generalMessages").once("value")
		.then(function(data)
		{
			var clubs = data.val();
			if(clubs != null)
			{
				var keys = Object.keys(clubs);
				if(keys.length > CAPACITY_LIMIT)
				{
					alert("תיבת הודעות כלליות מלאה - אנא מחק הודעות קודמות");
					uploadImage.myFileImg[0]=undefined;
					clearValue();
					return;
				}
			}
			else
			{
				var file = uploadImage.myFileImg[0];
				if(file === undefined)
				{
					var message = pickMesByPermision(toTeachers,toParents,from,subject,content,-1,-1,-1);
					firebase.database().ref('clubhouse/' + toClubHouse + '/generalMessages').push(message);
				}
				else
				{
					var b = Math.floor(Math.random()*100000000); 			
					var imageName = b + file.name;
					var storageRef = firebase.storage().ref('/generalMessagesImages/' + toClubHouse + '/' + imageName);
					var uploadTask = storageRef.put(file);
					uploadTask.on('state_changed', function(snapshot){
					}, function(error) {
						alert("לא ניתן לשלוח הודעה כעת.. אנה נסו שוב מאוחר יותר");
					}, function() {
					var downloadURL = uploadTask.snapshot.downloadURL;
					var message = pickMesByPermision(toTeachers,toParents,from,subject,content,downloadURL,imageName,-1);
					firebase.database().ref('clubhouse/' + toClubHouse + '/generalMessages').push(message);
					});
				}
			uploadImage.myFileImg[0]=undefined;
			clearValue();
			alert("ההודעה נשלחה בהצלחה");
			}
		});
	}

//-------------------------------------------------------------------------------------------------
	
	var sendToAll = function(from,toTeachers,toParents,subject,content)
	{
		var file = uploadImage.myFileImg[0];
		if(file === undefined)		//	send without images
		{
			firebase.database().ref("clubhouse/").once("value")
			.then(function(data)
			{
				var message = pickMesByPermision(toTeachers,toParents,from,subject,content,-1,-1,-1);
				var clubs = data.val();
				var keys = Object.keys(clubs);
				for(var i=0;i<keys.length;i++)
					firebase.database().ref('clubhouse/' + keys[i] + '/generalMessages').push(message);
			});
		}
		else
		{
			var b = Math.floor(Math.random()*100000000); 			
			var imageName = b + file.name;

			storageRef= firebase.storage().ref('/generalMessagesImages/allClubs/' + imageName);
			uploadTask = storageRef.put(file);
			uploadTask.on('state_changed', function(snapshot){
			}, function(error) {
				alert("לא ניתן לשלוח הודעה כעת.. אנה נסו שוב מאוחר יותר");
			}, function() {
			var downloadURL = uploadTask.snapshot.downloadURL;
			
				firebase.database().ref("clubhouse/").once("value")
				.then(function(data)
				{
					var clubs = data.val();
					var keys = Object.keys(clubs);
					var imgNode = Image.create(imageName,keys.length);
					
					var item = firebase.database().ref('Images/').push(imgNode);
					for(var i=0;i<keys.length;i++)
					{	
						var message = pickMesByPermision(toTeachers,toParents,from,subject,content,downloadURL,imageName,item.key);
						firebase.database().ref('clubhouse/' + keys[i] + '/generalMessages').push(message);
					}
				});
			});
		}
		uploadImage.myFileImg[0]=undefined;
		clearValue();
		alert("ההודעה נשלחה בהצלחה");
	}




//-------------------------------------------------------------------------------------------------
	return{msgPage:msgPage,
		updateUserType:updateUserType,
		updateUserList:updateUserList,
		sendPriMessage:sendPriMessage,
		clearValue:clearValue,
		updateClubList:updateClubList,
		sendGenMessage:sendGenMessage,
		CAPACITY_LIMIT:CAPACITY_LIMIT}
}();