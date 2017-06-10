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
    var addGenMes=function(m,index)        //draw general messages in home page
    {
        var url = m.imageURL;
            var message=
                '<div class = "generalMessageBox" id="generalMessageBox_'+index+'">'+
                    '<div class = "title">'+
                        '<h6  dir="rtl">הודעה מאת:' + " " +login.getObj(m.source).username+'</h6>'+
                        '<label id="subjectGMS" dir="rtl">'+m.subject+'<label>'+
                    '</div>';
                if(url != -1)       //  with image
                {
                    message+='<div id = "textAreaGM" dir="rtl">'+ m.content + '</br>'+
                        '<img id = imgGM src=' + url +'/>'+
                        '<div id="downloadImage_'+index+'">שמור תמונה <span class="glyphicon glyphicon-download-alt"></span></div>'+
                    '</div>';
                }
                message+='<div class="messageFooter">'+
                        '<h4 id = "dateMessage">'+getDateMes(m.date)+'</h4>'+
                        '<div class = "deleteMessage" id="deleteMessage_'+index+'">'+
                            '<label id="subjectGMS">מחק הודעה <label>'+
                            '<span class="glyphicon glyphicon-trash"></span> '+
                        '</div>'+
                    '</div>'+
                '</div></p>';
        $("#body").append(message);
    }
    var deleteGenMessage=function(i)
    {
        var club = login.correntUser[0].clubhouseKey;
        var delMsg = firebase.database().ref("clubhouse/" + club + "/generalMessages").once("value")
        .then(function(data)
        {
            var messages = data.val();
            var keys = Object.keys(messages);
            var delMsg = firebase.database().ref("clubhouse/" + club + "/generalMessages/"+keys[i]);
            delMsg.remove();
        });
    }

    var getDateMes=function(dareMes)
    {
        var date=new Date(dareMes);
        var d=date.getDate();
        var m=date.getMonth()+1;
        var y=date.getFullYear();
        return d+"."+m+"."+y;
    }


    return {create:create,addGenMes:addGenMes,deleteGenMessage:deleteGenMessage}
}();