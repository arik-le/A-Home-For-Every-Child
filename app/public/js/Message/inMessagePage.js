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

        
        var createMassage=function(obj,massageID)
        {
            var str='<div class="row massage" id="message_'+massageID+'">'+             
                            '<span class="glyphicon glyphicon-trash col-xs-2 trash" id="trash_'+massageID+'"></span>'+
                                '<h5 class="topic col-xs-offset-2 col-xs-6" id="topic'+massageID+'"data-toggle="modal" data-target="#myModal'+massageID+'"></h5>';
                                if(obj.isRead)          
                                    str+='<span class="glyphicon glyphicon-envelope col-xs-1 envelopeR" id="enve'+massageID+'"></span>';
                                else
                                    str+='<span class="glyphicon glyphicon-envelope col-xs-1 envelopeN" id="enve'+massageID+'"></span>';
                            str+='<div class="col-xs-1"></div>'+  
                        '</div>'+
                    
            '<div class="modal fade" id="myModal'+massageID+'" role="dialog">'+
                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<h4 class="modal-title">'+obj.subject+'</h4>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<h5"> :מאת</h5>'+
                            '<div class = "subject">'+
                                '<textarea disabled ">'+login.getObj(obj.source).firstName+'</textarea>'+
                            '</div>'+
                            '</p>'+
                            '<div class = "content">'+
                                '<textarea disabled id="content'+massageID+'">'+obj.content+'</textarea>'+
                            '</div>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            return str;
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
    var addMessage=function(msg,massageID,key,isInBox)
    {
        var topic=msg.subject;
        $("#body").append(createMassage(msg,massageID));
        $("#topic"+massageID).click(function()
        {
            readMessage(massageID);
        });
        $("#topic"+massageID).append(topic);
        $("#trash_"+massageID).click(function()
        {
            var idName=event.target.id;
            console.log(idName);
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
                console.log(key);
                delMsg.remove();
               
         }
     }

//-------------------------------------------------------------------------------------------------

     var openSendMassage=function()
     {
        $('.NAV').collapse('hide');
        $("#body").html(sendMessagePage.msgPage.inputSection);
        sendMessagePage.updateUserList();
        $("#sendButtonPM").click(sendMessagePage.sendPriMessage);
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
            '<h1 class="col-xs-offset-1 col-xs-8 imt">הודעות נכנסות</h1>'+
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
                for(var i=0;i<keys.length;i++)
                    addMessage(messages[keys[i]],i,keys[i],true);
			}
        });
    }
  

     return{addMessage:addMessage,
            initPage:initPage,
            openSendMassage:openSendMassage,
            openInBoxMes:openInBoxMes};
}();