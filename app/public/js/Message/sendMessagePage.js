var sendMessagePage = function()
{
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
							'<select id = "clubHouseRoy" required >'+
								'<option value="Larnaca" disabled selected>בחר מועדונית</option>'+
							'</select></br>'+
					
				
							'<label id="royLabel">:שלח אל</label></br></br>'+
							'<select class = "userCkecklist" id = "chooseUserSM" required >'+
								'<option value="Larnaca" disabled selected>בחר משתמש</option>'+
							'</select>'+
                            '<select class = "userCkecklist"  id = "TypeUserSM" required  onchange="sendMessagePage.updateUserList()">'+
								'<option value="nan" disabled selected>סוג משתמש</option>'+
								'<option class="ptUser">הורה</option>'+
                                '<option class="GuUser">מדריך</option>'+
                                '<option class="SWUser">עו"ס</option>'+
                                '<option class="AdmUser">מנהל</option>'+
								
							'</select>'+
							
							'<label id="royLabel">:נושא</label></br>'+
							'<input id = "subjectSM" type="text" class="form-control" id="name" name="name" placeholder="נושא ההודעה" value="">'+
							'<label id="royLabel">:תוכן ההודעה</label></br>'+
							'<textarea id = "contentSM" class="form-control" rows="10" name="message" placeholder="תוכן ההודעה"></textarea></br>'+
						

						'<div class="col-sm-10 col-sm-offset-2">'+
							'<input id="sendButtonPM" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
							'<button id="cleanButtonSM" type="button" class="btn">נקה</button>'+
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
			
					'<div class="col-sm-10 col-sm-offset-2">'+
						'<input id="sendButtonPM" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
						'<butto id="cleanButtonSM" type="button" class="btn">נקה</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'
     }

    var updateUserList = function()
    {
		$("#chooseUserSM").html('<option value="nan" disabled selected>סוג משתמש</option>')
		var list=login.usersAndKeys;
        var myIndex=login.correntUser[1];
		var type=document.getElementById("TypeUser SM").value;
        for(var i = 0;i<list[1].length;i++)
		{
            if(list[1][i]!=myIndex	&&	list[0][list[1][i]].userType==type)
                  $("#chooseUserSM").append('<option value='+list[0][list[1][i]].userKey+'>'+list[0][list[1][i]].username+'</option>');     
		}
	
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
        sendPriMessage:sendPriMessage}
}();