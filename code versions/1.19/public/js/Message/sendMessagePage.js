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
							'<a  href="#1b" data-toggle="tab">הודעה פרטית</a>'+
						'</li>'+
						'<li><a href="#2b" data-toggle="tab">הודעה כללית</a>'+
						'</li>'+
					'</ul>'+
				'</div>'+

				'<div class="tab-content clearfix">'+
					'<div class="tab-pane active" id="1b">'+
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
								'<option value="Paris">Paris</option>'+
								'<option value="Budpest">Budpest</option>'+
								'<option value="Kiev">Kiev</option>'+
								'<option value="Moscov">Moscov</option>'+
							'</select></br>'+
					
				
							'<label id="royLabel">:שלח אל</label></br></br>'+
							'<select class = "userCkecklist" required >'+
								'<option value="Larnaca" disabled selected>בחר משתמש</option>'+
								'<option value="Rhodos">Rhodos</option>'+
								'<option value="Amsterdam">Amsterdam</option>'+
							'</select>'+
                            '<select class = "userCkecklist" required >'+
								'<option value="Larnaca" disabled selected>סוג משתמש</option>'+
								'<option value="Rhodos">Rhodos</option>'+
								'<option value="Amsterdam">Amsterdam</option>'+
							'</select>'+
							
							'<label id="royLabel">:נושא</label></br>'+
							'<input id = "royInput" type="text" class="form-control" id="name" name="name" placeholder="נושא ההודעה" value="">'+
							'<label id="royLabel">:תוכן ההודעה</label></br>'+
							'<textarea id = "royTextArea" class="form-control" rows="10" name="message" placeholder="תוכן ההודעה"></textarea></br>'+
						

						'<div class="col-sm-10 col-sm-offset-2">'+
							'<input id="submit" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
							'<button type="button" class="btn">נקה</button>'+
						'</div>'+
					'</div>'+
					
				'<div class="tab-pane " id="2b">'+
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
					'<input id = "royInput" type="text" class="form-control" id="name" name="name" placeholder="נושא ההודעה" value="">'+
					'<label id="royLabel">:תוכן ההודעה</label></br>'+
					'<textarea id = "royTextArea" class="form-control" rows="10" name="message" placeholder="תוכן ההודעה"></textarea></br>'+
			
					'<div class="col-sm-10 col-sm-offset-2">'+
						'<input id="submit" name="submit" type="submit" value="שלח" class="btn btn-primary">'+
						'<butto type="button" class="btn">נקה</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'
     }

    var updateUserList = function(list)
    {
        var myIndex=login.correntUser[1];
        for(var i = 0;i<list[1].length;i++)
            if(list[1][i]!=myIndex)
                  $(".userList").append('<option value='+list[0][list[1][i]].userKey+'>'+list[0][list[1][i]].username+'</option>');     
    }

   /* var sendPriMessage = function()
    {
        var allUsers = login.usersAndKeys[0];
        var keys = login.usersAndKeys[1];
   
        var message = Message.create(mainPage.correntUser[0],allUsers[keys[3]].username,"hay","how are you",0);
        var desUser = message.destination;
            
        firebase.database().ref('users/'+ mainPage.correntUser[0].userKey + '/outboxMessages').push(message);	 

        for(var i=0; i<keys.length;i++)
        {
            var k=keys[i];
            if(desUser === allUsers[k].username)
            {
                outMsgDU = allUsers[k].outboxMessages;
                firebase.database().ref('users/'+ k + '/inboxMessages').push(message);	 
            }
        }
        alert("ההודעה נשלחה");
    }*/
    var sendPriMessage=function()
    {
        var from=login.correntUser[1];
        var to=document.getElementById("userList").value;
        var subject=document.getElementById("subject").value;
        var content=document.getElementById("content").value;
       
        var message=Message.create(from,to,subject,content,1)
        var allUsers = login.usersAndKeys[0];
        firebase.database().ref('users/'+ to+ '/inboxMessages').push(message);
        firebase.database().ref('users/'+ from+ '/outboxMessages').push(message);
        clearValue();
       
    }
    var clearValue=function()
    {
        $("#subject").val("");
        $("#content").val("");
        $("#userList").val("");
    }
    return{msgPage:msgPage,
        updateUserList:updateUserList,
        sendPriMessage:sendPriMessage}
}();