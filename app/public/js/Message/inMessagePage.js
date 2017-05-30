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
            return str='<div class="row massage" id="message_'+massageID+'">'+             
                            '<span class="glyphicon glyphicon-trash col-xs-2 trash" id="trash_'+massageID+'"></span>'+
                                '<h5 class="topic col-xs-offset-2 col-xs-6" id="topic'+massageID+'"data-toggle="modal" data-target="#myModal'+massageID+'"></h5>'+          
                                '<span class="glyphicon glyphicon-envelope col-xs-1 envelope"></span>'+  
                            '<div class="col-xs-1"></div>'+  
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
        }

//-------------------------------------------------------------------------------------------------

    var initPage=function()
    {
        $(".sendMsg").click (mesgFunc());
    }

//-------------------------------------------------------------------------------------------------

    var addMessage=function(msg,massageID,key)
    {
        var topic=msg.subject;
        $("#body").append(createMassage(msg,massageID));
        $("#topic"+massageID).append(topic);
        $("#trash_"+massageID).click(function()
        {
            var idName=event.target.id;
            idName=idName.substring(6,str.length-1);
            console.log(idName);
            removeMassage(idName,key);
        });
    }

//-------------------------------------------------------------------------------------------------

     var removeMassage=function(idName,key)
     {
        var me = login.correntUser[1];
        var delMsg = firebase.database().ref("users/" + me + "/inboxMessages/"+key);
        console.log(idName);
        delMsg.remove();
        $("#message_"+idName).remove();
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
            '<h2 class="col-xs-offset-2 col-xs-8 smt">הודעות נכנסות</h2>'+
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
                    addMessage(messages[keys[i]],i,keys[i]);
			}
        });
    }
  

     return{addMessage:addMessage,
            initPage:initPage,
            openSendMassage:openSendMassage,
            openInBoxMes:openInBoxMes,
            removeMassage:removeMassage};
}();