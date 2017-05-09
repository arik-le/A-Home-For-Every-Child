var inMassagePage=function()
{

     var headLine={
          inputSection:
           '<div class="container">'+
                 '<div class="headline row"> הודעות נכנסות </div>'+
             '</div>'
     }
     var createMassage=function(massageID)
     {
            return massage={
            inputSection:
                '<div class="row massage" id="'+massageID+'">'+             
                            '<span class="glyphicon glyphicon-trash col-xs-2 trash" id="trash'+massageID+'"></span>'+
                            '<div class="col-xs-2"></div>'+
                            '<h5 class="topic col-xs-6" id="topic'+massageID+'"></h5>'+          
                            '<span class="glyphicon glyphicon-envelope col-xs-1 envelope"></span>'+  
                            '<div class="col-xs-1"></div>'+  
                '</div>'
            } 
     }
     var addMessage=function(topic,massageID)
     {
        $("#body").after(createMassage(massageID).inputSection);
        $("#topic"+massageID).append(topic);
        $("#trash"+massageID).click(function(){
          removeMassage(massageID);
        });
     }
     var removeMassage=function(id)
     {
       $("#"+id).remove();

     }
     var initPage=function()
     {
            $("#body").html(headLine.inputSection);
     }
     return{addMessage:addMessage,initPage:initPage};

}();