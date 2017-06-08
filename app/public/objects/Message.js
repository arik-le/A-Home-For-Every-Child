var Message=function()
{
    var create=function(source,destination,subject,content,type,permision,imageURL)
    {
        var private = 1;
        var general = 0;
        var date=new Date();
    
        if(type ==  private)       //private
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
            permision:permision
            }
            
    }
    var addGenMes=function(message)        //draw general messages in home page
    {
        var url = message.imageURL;
        if(url != -1)       //  with image
        {
            var message=
                '<div class = "generalMessageBox">'+
                    '<div class = "title">'+
                        '<h6  dir="rtl">הודעה מאת:' + " " +login.getObj(message.source).username+'</h6>'+
                        '<label id="subjectGMS" dir="rtl">'+message.subject+'<label>'+
                    '</div>'+
                    '<div id = "textAreaGM" dir="rtl">'+ message.content + '</br>'+
                    '<img id = imgGM src=' + url +'/>'+
                    '<div id="downloadImage">שמור תמונה <span class="glyphicon glyphicon-download-alt"></span></div>'+
                    '</div>'+
                '<div class="messageFooter">'+
                        '<h4 id = "dateMessage">'+getDateMes(message.date)+'</h4>'+
                        '<div class = "deleteMessage">'+
                            '<label id="subjectGMS">מחק הודעה <label>'+
                            '<span class="glyphicon glyphicon-trash"></span> '+
                        '</div>'+
                    '</div>'+
                '</div></p>';
        }
        else{           //  'without image
            var message=
                '<div class = "generalMessageBox">'+
                    '<div class = "title">'+
                        '<h6 dir="rtl">הודעה מאת:' + " " +login.getObj(message.source).username+'</h6>'+
                        '<label id="subjectGMS" dir="rtl">'+message.subject+'<label>'+
                    '</div>'+
                    '<div id = "textAreaGM" dir="rtl">'+ message.content + '</br>'+
                    '</div>'+
                '<div class="messageFooter">'+
                        '<h4 id = "dateMessage">'+getDateMes(message.date)+'</h4>'+
                        '<div class = "deleteMessage">'+
                            '<label id="subjectGMS">מחק הודעה <label>'+
                            '<span class="glyphicon glyphicon-trash"></span> '+
                        '</div>'+
                    '</div>'+
                '</div></p>';
        }
        $("#body").append(message);
    }


    var getDateMes=function(dareMes)
    {
        var date=new Date(dareMes);
        var d=date.getDate();
        var m=date.getMonth()+1;
        var y=date.getFullYear();
        return d+"."+m+"."+y;
    }


    return {create:create,addGenMes:addGenMes}
}();