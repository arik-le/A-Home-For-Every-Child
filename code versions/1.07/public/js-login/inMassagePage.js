var inMassagePage=function()
{

     var headLine={
          inputSection:
               '<div class="container">'+
             '<ul class="nav nav-tabs col-xs-12">'+
                    '<li class="active col-xs-6 tabInMass"><a data-toggle="tab" href="#home">נכנסות</a></li>'+
                    '<li class="col-xs-6 tabInMass" ><a data-toggle="tab" href="#menu1">יוצאות</a></li>'+
              '</ul>'+
               "</div>"+
               '<div id="MassageList" class="container"></div>'
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
     var removeMassage=function(id)
     {
        // remove also from database 
       $("#"+id).remove();

     }
     var initPage=function()
     {
            $("#body").html(headLine.inputSection);
     }
     return{addMessage:addMessage,initPage:initPage};

}();