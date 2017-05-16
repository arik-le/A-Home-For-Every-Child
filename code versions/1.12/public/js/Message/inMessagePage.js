var inMassagePage=function()
{
    var flags={sendMassageIsOn:false};
    
    var headLine={
        inputSection:
            '<div class="container">'+
                '<ul class="nav nav-tabs  col-xs-14">'+
                    '<li class="active col-xs-4 inbox"><a data-toggle="tab" href="#home">נכנסות</a></li>'+
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
                '<div class="row massage" id="'+massageID+'">'+             
                            '<span class="glyphicon glyphicon-trash col-xs-2 trash" id="'+massageID+'trash"></span>'+
                            '<div class="col-xs-2"></div>'+
                            '<h5 class="topic col-xs-6" id="topic'+massageID+'"></h5>'+          
                            '<span class="glyphicon glyphicon-envelope col-xs-1 envelope"></span>'+  
                            '<div class="col-xs-1"></div>'+  
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
        $("#MassageList").append(createMassage(massageID).inputSection);
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
         if(flags.sendMassageIsOn==false)
         {
            flags.sendMassageIsOn=true;
            $("#body").append(TypeMassage.inputSection);
            $("#btnGenMas").click (function()
            { 
                $("#body").html(GenMsgPage.inputSection);
            });
            $("#btnPrivMas").click (function()
            { 
                $("#body").html(PriMsgPage.inputSection);
            });
         }
     }

//-------------------------------------------------------------------------------------------------

     var mesgFunc = function()
     {
         $("#sendMsg").click(openSendMassage);        //open all categories in message
         flags.sendMassageIsOn=false;
     }
     
//-------------------------------------------------------------------------------------------------

     return{addMessage:addMessage,initPage:initPage};
}();