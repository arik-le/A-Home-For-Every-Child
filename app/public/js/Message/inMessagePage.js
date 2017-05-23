var inMassagePage=function()
{
    var flags={sendMassageIsOn:false};
    
    var headLine={
        inputSection:
            '<div class="container">'+
                '<ul class="nav nav-tabs  col-xs-14">'+
                    '<li class="active col-xs-4 inbox"><a data-toggle="tab" id="incomingMes">נכנסות</a></li>'+
                    '<li class="col-xs-4 outbox" ><a data-toggle="tab" href="#menu1">יוצאות</a></li>'+
                    '<li class="col-xs-4 sendMsg" ><a data-toggle="tab" href="#menu1" id="sendMsg">שליחה</a></li>'+
                '</ul>'+
            '</div>'+
            '<div id="MassageList" class="container"></div>'
    }

    var TypeMassage={
          inputSection:
            '<div class="container">'+
                '<button type="button" id="btnGenMas" class="btn btn-secondry btn-lg +">ודעה כלליתn</button>'+
                '<button type="button" id="btnPrivMas" class="btn btn-secondry btn-lg">הודעה פרטית</button>'+
            '</div>'
     }

    
     var createMassage=function(massageID)
     {
            return massage={
            inputSection:
                '<div class="row massage" id="'+massageID+'" data-toggle="modal" data-target="#myModal">'+             
                            '<span class="glyphicon glyphicon-trash col-xs-2 trash" id="'+massageID+'trash"></span>'+
                            '<div class="col-xs-2"></div>'+
                            '<h5 class="topic col-xs-6" id="topic'+massageID+'"></h5>'+          
                            '<span class="glyphicon glyphicon-envelope col-xs-1 envelope"></span>'+  
                            '<div class="col-xs-1"></div>'+  
                '</div>'+
				
				
			'<div class="modal fade" id="myModal" role="dialog">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<h4 class="modal-title">נושא 1</h4>'+
						'</div>'+
						'<div class="modal-body">'+
							'<h5>admin1 :מאת</h5>'+
							'<div class = "subject">'+
								'<textarea disabled>נושא: סיפור קטן מהבית ספר</textarea>'+
							'</div>'+
							'</p>'+
							'<div class = "content">'+
								'<textarea disabled>שלום לכולם, היום הלכתי לבית ספר עם הילקוט החדש שאבא קנה לי וכל החברים ממש התלהבו. ואז ילד אחד פתאום הגיע אלי והתחיל לשחק לי עם הריצרץ של התיק וואני לא רציתי שזה יהרס מכיוון שהתיק ממש חדש אז הכנסתי לו בעיטה לביצים!! ככה!! שלא יתעסק איתי </textarea>'+
							'</div>'+
						'</div>'+
						'<div class="modal-footer">'+
							'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
				
			
            } 
     }

//-------------------------------------------------------------------------------------------------

     var initPage=function()
     {
            $("#body").html(headLine.inputSection);
            $(".sendMsg").click (mesgFunc());
     }

//-------------------------------------------------------------------------------------------------

     var addMessage=function(topic,massageID)
     {
        $("#body").append(createMassage(massageID).inputSection);
        $("#topic"+massageID).append(topic);
        $("#"+massageID+"trash").click(function(){
          var str=event.target.id;
          str=str.substring(0, str.length-5);
          removeMassage(str);
        });
     }

//-------------------------------------------------------------------------------------------------

     var removeMassage=function(id)
     {
        // remove also from database 
       $("#"+id).remove();
     }

//-------------------------------------------------------------------------------------------------

     var openSendMassage=function()
     {
         $('.NAV').collapse('hide');
         if(flags.sendMassageIsOn==false)
         {
            flags.sendMassageIsOn=true;
            $("#body").html(sendMessagePage.msgPage.inputSection);
            sendMessagePage.updateUserList(login.usersAndKeys);
            $("#sendButtonPM").click(sendMessagePage.sendPriMessage);
            $("#userList").val("");
         }
     }

//-------------------------------------------------------------------------------------------------

     var mesgFunc = function()
     {
         $("#sendMsg").click(openSendMassage);        //open all categories in message
          $("#incomingMes").click(openInBoxMes);
         flags.sendMassageIsOn=false;
     }
     
//-------------------------------------------------------------------------------------------------
    var openInBoxMes=function()
    {
        $("#body").html("");
        $('.NAV').collapse('hide');
        var me=login.correntUser[1];
        var messages=login.usersAndKeys[0][me].inboxMessages;
        var keys = Object.keys(messages);
        for(var i=0;i<keys.length;i++)
            addMessage(messages[keys[i]].subject,i);
        
    }
     return{addMessage:addMessage,initPage:initPage,openSendMassage:openSendMassage,openInBoxMes:openInBoxMes};
}();