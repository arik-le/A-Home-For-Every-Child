var inMassagePage=function()
{
    var flags={sendMassageIsOn:false};

        var TypeMassage={
            inputSection:
                '<div class="container">'+
                    '<button type="button" id="btnGenMas" class="btn btn-secondry btn-lg +">ודעה כלליתn</button>'+
                    '<button type="button" id="btnPrivMas" class="btn btn-secondry btn-lg">הודעה פרטית</button>'+
                '</div>'
        }

        
        var createMassage=function(obj,messageID,isInBox)
        {
            var str='<div class="row massage" id="message_'+messageID+'">'+             
                            '<span class="glyphicon glyphicon-trash col-xs-2 trash" id="trash_'+messageID+'"></span>'+
                                '<h5 class="topic col-xs-offset-2 col-xs-6" id="topic'+messageID+'"data-toggle="modal" data-target="#myModal'+messageID+'"  dir="rtl"></h5>';
                                if(obj.isRead)          
                                    str+='<span class="glyphicon glyphicon-envelope col-xs-1 envelopeR" id="enve'+messageID+'"></span>';
                                else
                                    str+='<span class="glyphicon glyphicon-envelope col-xs-1 envelopeN" id="enve'+messageID+'"></span>';
                            str+='<div class="col-xs-1"></div>'+  
                        '</div>'+
                    
            '<div class="modal fade" id="myModal'+messageID+'" role="dialog">'+
                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<h4 class="modal-title" dir="rtl">'+obj.subject+'</h4>'+
                        '</div>'+
                        '<div class="modal-body">';
                        if(isInBox )
                        {
                            str+='<h5"> :מאת</h5>'+
                                '<div class = "subject">';
                                    if(login.getObj(obj.source)!=undefined)
                                        str+='<textarea disabled dir="rtl"">'+login.getObj(obj.source).firstName+'</textarea>'
                                    else
                                        str+='<textarea disabled dir="rtl"">אורח - משתמש אינו קיים במערכת</textarea>'
                                str+='</div>';
                        }
                        else
                        {
                            str+='<h5"> :אל</h5>'+
                                '<div class = "subject">'+
                                    '<textarea disabled " dir="rtl">'+login.getObj(obj.destination).firstName+'</textarea>'+
                                '</div>';
                        }
                        
                           str+= '</p>'+
                            '<div class = "content">'+
                                '<textarea disabled id="content'+messageID+'" dir="rtl">'+obj.content+'</textarea>'+
                            '</div>'+
                        '</div>'+
                        '<div id="dateInboxLabel">'+
                             '<label>'+getDate(obj)+'</label>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-default" data-dismiss="modal">סגור</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
           
            return str;
        }
    var getDate=function(message)
    {
        var date=new Date(message.date);
        var d=date.getDate();
        var m=date.getMonth()+1;
        var y=date.getFullYear();
        return d+"/"+m+"/"+y;
    }
//-------------------------------------------------------------------------------------------------

    var initPage=function()
    {
        $(".sendMsg").click (mesgFunc());
    }

//-------------------------------------------------------------------------------------------------
   
    var readMessage=function(id)
    {
        var me = login.correntUser[1];
        firebase.database().ref("users/" + me + "/inboxMessages").once("value")
        .then(function(data)
        {
            var messages = data.val();
            var keys = Object.keys(messages);
            var i=keys[id];
            firebase.database().ref("users/" + me + "/inboxMessages/"+i+"/isRead").set(true);
            
        })
        $("#enve"+id).removeClass("envelopeN");
        $("#enve"+id).addClass("envelopeR");
    }
    var addMessage=function(msg,messageID,key,isInBox)
    {
        var topic=msg.subject;
        $("#body").append(createMassage(msg,messageID,isInBox));
        $("#topic"+messageID).click(function()
        {
            readMessage(messageID);
        });
        $("#topic"+messageID).append(topic);
        $("#trash_"+messageID).click(function()
        {
            var idName=event.target.id;
            idName=idName.substring(6,idName.length);
            removeMassage(idName,key,isInBox);
        });
    }

//-------------------------------------------------------------------------------------------------

     var removeMassage=function(idName,key,isInBox)
     {
         if(confirm("האם אתה בטוח שברצונך למחוק את ההודעה?"))
         {
                $("#message_"+idName).remove();
                var inOrOut;
                if(isInBox)
                    inOrOut="/inboxMessages/";
                else
                    inOrOut="/outboxMessages/";
                var me = login.correntUser[1];
                var delMsg = firebase.database().ref("users/" + me + inOrOut+key);
                delMsg.remove();
         }
     }

//-------------------------------------------------------------------------------------------------

     var openSendMassage=function()
     {
        var myType = login.correntUser[0].userType;
        $('.NAV').collapse('hide');
        $("#body").html(sendMessagePage.msgPage.inputSection);
        if(myType==User.GUIDE)
        {
            $("#clubHouseGM").remove();
            $("#clubHouseSM").remove();
        }
        if(myType == User.PARENT || myType == User.TEACHER)
        {
            $("#clubHouseSM").remove();
            $(".mytabs").remove();
            $("#generalMessage").remove();
        }
        uploadImage.init();
        sendMessagePage.updateUserList();   //check if needed
        sendMessagePage.updateClubList();
        $("#sendButtonPM").click(sendMessagePage.sendPriMessage);
        $("#cleanButtonPM").click(sendMessagePage.clearValue);
        $("#sendButtonGM").click(sendMessagePage.sendGenMessage);
        $("#cleanButtonGM").click(sendMessagePage.clearValue);

        $("#userList").val("");
     }

//-------------------------------------------------------------------------------------------------

     var mesgFunc = function()
     {
         $("#sendMsg").click(openSendMassage);        //open all categories in message
         $("#incomingMes").click(openInBoxMes);
         flags.sendMassageIsOn=false;
     }
     
//-------------------------------------------------------------------------------------------------

    var incomingMessage={
        topic:'<div class="row">'+
            '<h2 id = "inboxTitle">הודעות נכנסות</h2>'+
        '</div>'
    }

//-------------------------------------------------------------------------------------------------

    var openInBoxMes=function()
    {
        $("#body").html("");
        $("#body").html(incomingMessage.topic);
        $('.NAV').collapse('hide');     //close nav bar after enterance
        
        var me = login.correntUser[1];
        
        firebase.database().ref("users/" + me + "/inboxMessages").once("value")
        .then(function(data)
        {
            var messages = data.val();
            if (messages !== null)
            {
                var keys = Object.keys(messages);
                for(var i=keys.length-1;i>=0;i--)
                    addMessage(messages[keys[i]],i,keys[i],true);
			}
        });
    }
  
//-------------------------------------------------------------------------------------------------

     return{addMessage:addMessage,
            initPage:initPage,
            openSendMassage:openSendMassage,
            openInBoxMes:openInBoxMes};
}();