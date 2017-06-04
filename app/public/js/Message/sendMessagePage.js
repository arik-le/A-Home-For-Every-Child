var sendMessagePage = function()
{
	var clubs,keys;
	var msgPage={
			inputSection:
			
			'<div class="container">'+
				'<h2 id = "royh2">כתיבת הודעה חדשה</h2>'+
			
				'<div class="container" >	'+
					'<div class = "mytabs">'+
						'<ul class="nav nav-pills center-pills">'+
							'<li class="active">'+
								'<a  href="#privatreMessage" data-toggle="tab">הודעה פרטית</a>'+
							'</li>'+
							'<li><a href="#generalMessage" data-toggle="tab">הודעה כללית</a>'+
							'</li>'+
						'</ul>'+
					'</div>'+

					'<div class="tab-content clearfix">'+
						'<div class="tab-pane active" id="privatreMessage">'+
								'<select class = "userCkecklist" id = "clubHouseSM" required onchange="sendMessagePage.updateUserList()" >'+
									'<option value="Larnaca" disabled selected>בחר מועדונית</option>'+
								'</select></br>'+
						
					
								'<label id="royLabel">:שלח אל</label></br></br>'+
								'<select class = "userCkecklist" id = "chooseUserSM" required >'+
									'<option value="Larnaca" disabled selected>בחר משתמש</option>'+
								'</select>'+
								'<select class = "userCkecklist"  id = "TypeUserSM" required  onchange="sendMessagePage.updateUserList()">'+
									'<option value="nan" disabled selected>סוג משתמש</option>'+
									'<option class="ptUser" value="0">הורה</option>'+
									'<option class="TtUser" value="1">מורה</option>'+
									'<option class="GuUser" value="2">מדריך</option>'+
									'<option class="SWUser" value="3">עו"ס</option>'+
									'<option class="AdmUser" value="4">מנהל</option>'+
									
								'</select>'+
								
								'<label id="royLabel">:נושא</label></br>'+
								'<input id = "subjectSM" type="text" class="form-control" id="name" name="name" placeholder="נושא ההודעה" value="">'+
								'<label id="royLabel">:תוכן ההודעה</label></br>'+
								'<textarea id = "contentSM" class="form-control" rows="10" name="message" placeholder="תוכן ההודעה"></textarea></br>'+
							

							'<div class="col-sm-10 col-sm-offset-2">'+
								'<input id="sendButtonPM" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
								'<button id="cleanButtonPM" type="button" class="btn">נקה</button>'+
							'</div>'+
						'</div>'+
						
					'<div class="tab-pane " id="generalMessage">'+
						'<select id = "clubHouseRoy" required >'+
							'<option value="Larnaca" disabled selected>בחר מועדונית</option>'+
							'<option value="Rhodos">Rhodos</option>'+
							'<option value="Amsterdam">Amsterdam</option>'+
							'<option value="Prague">Prague</option>'+
							'<option value="London">London</option>'+
							'<option value="Athens">Athens</option>'+
							'<option value="Barcelona">Barcelona</option>'+
							'<option value="Madrid">Madrid</option>'+
							'<option value="Cancun">Cancun</option>'+
							'<option value="Bangkok">Bangkok</option>'+
							'<option value="China">China</option>'+
							'<option value="Basel">Basel</option>'+
							'<option value="China">China</option>'+
							'<option value="Paris">Paris</option>'+
							'<option value="Budpest">Budpest</option>'+
							'<option value="Kiev">Kiev</option>'+
							'<option value="Moscov">Moscov</option>'+
						'</select></br>'+
			
						'<label id="royLabel">:שלח אל</label></br></br>'+
						'<label for="teachers" class="chkbox">מורים</label>'+
						'<input id="checkBoxIn" type="checkbox" name="teachers" id="teachers" class="custom" />'+
						'<label for="parents" class="chkbox">הורים</label>'+
						'<input id="checkBoxIn" type="checkbox" name="parents" id="parents" class="custom" checked/>'+
						'</br>'+
						
						'<label id="royLabel">:נושא</label></br>'+
						'<input id = "subjectSM" type="text" class="form-control" id="name" name="name" placeholder="נושא ההודעה" value="">'+
						'<label id="royLabel">:תוכן ההודעה</label></br>'+
						'<textarea id = "contentSM" class="form-control" rows="10" name="message" placeholder="תוכן ההודעה"></textarea></br>'+
						
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
							'<input id="sendButtonPM" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
							'<button id="cleanButtonPM" type="button" class="btn">נקה</button>'+
						'</div>'+
					
					'</div>'+
				'</div>'+
			'</div>'
	}
	var updateClubList=function()				//update the list of clubHouses
	{
		firebase.database().ref("clubhouse/").once("value")
		.then(function(data)
		{
			clubs=data.val();
			keys=Object.keys(clubs);
			$("#clubHouseSM").html('<option value="nan" disabled selected>בחר מועדונית</option>');
			
			for(var i=0;i<keys.length;i++)
				$("#clubHouseSM").append('<option value='+clubs[keys[i]].ClubhouseDBkey+'>'+clubs[keys[i]].name+'</option>');
		});

	}
	var updateUserList = function()			//update the list of users according the clubHouses
	{
		$("#chooseUserSM").html('<option value="nan" disabled selected>בחר משתמש</option>');
		var list=login.usersAndKeys;
		var myIndex=login.correntUser[1];
		var type=document.getElementById("TypeUserSM").value;
		var club=document.getElementById("clubHouseSM").value;

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
					var allUsersInClub = Object.keys(curClub);
					for(var j=0;j<allUsersInClub.length;j++)
						if(curClub[allUsersInClub[j]].type == type && curClub[allUsersInClub[j]].username != login.correntUser[0].username)
							$("#chooseUserSM").append('<option value='+curClub[allUsersInClub[j]].userkey+'>'+curClub[allUsersInClub[j]].username+'</option>');
				}
			}
		});
	}


	var sendPriMessage=function()
	{
		var from=login.correntUser[1];
		var to=document.getElementById("chooseUserSM").value;
		var subject=document.getElementById("subjectSM").value;
		var content=document.getElementById("contentSM").value;
		var message=Message.create(from,to,subject,content,1)
		var allUsers = login.usersAndKeys[0];
		firebase.database().ref('users/'+ to+ '/inboxMessages').push(message);
		firebase.database().ref('users/'+ from+ '/outboxMessages').push(message);
		clearValue();
	
	}
	var clearValue=function()
	{
		$("#subjectSM").val("");
		$("#contentSM").val("");
		$("#chooseUserSM").val("");
	}

	return{msgPage:msgPage,
		updateUserList:updateUserList,
		sendPriMessage:sendPriMessage,
		updateClubList:updateClubList}
}();