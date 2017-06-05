var Message=function()
{
    var create=function(source,destination,subject,content,type,permision,imageURL)
    {
        var private = 0;
        var general = 1;
        var date=new Date();
        var imageURL;
        var getDate=function()
        {
            var d=date.getDate();
            var m=date.getMonth()+1;
            var y=date.getFullYear();
            return d+"."+m+"."+y;
        }
        var addGenMes=function()        //draw general messages in home page
        {
            var message=
                '<div class = "generalMessageBox">'+
                    '<div class = "title">'+
                        '<h6  dir="rtl">הודעה מאת:'+login.getObj(source).username+'</h6>'+
                        '<label id="subjectGM" dir="rtl">'+subject+'<label>'+
                    '</div>'+
                    '<textarea id = "textAreaGM" class="form-control" rows="5" name="message" disabled  dir="rtl">'+content+'</textarea>'+
                '<div class="messageFooter">'+
                        '<h4 id = "dateMessage">'+getDate()+'</h4>'+
                        '<div class = "deleteMessage">'+
                            '<label id="subjectGM">מחק הודעה <label>'+
                            '<span class="glyphicon glyphicon-trash"></span> '+
                        '</div>'+
                    '</div>'+
                '</div></p>';
                $("#body").append(message);
        }
     
      
        if(type ===  private)       //private
            return{
                source:source,
                destination:destination,
                subject:subject,
                content:content,
                type:type,
                isRead:false,
                date:date.toDateString()
            }
            else                    //general
                 return{
                source:source,
                destination:destination,
                subject:subject,
                content:content,
                type:type,
                isRead:false,
                imageURL:imageURL,
                date:date.toDateString(),
                permision:permision,
                addGenMes:addGenMes
                }
            
    }
    
    return {create:create}
}();