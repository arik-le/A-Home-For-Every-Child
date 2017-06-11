var Message=function()
{
    var create=function(source,destination,subject,content,type,permision,imageURL,imageName)
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
            imageName:imageName,
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
                    '</div>'+
                    '<div id = "textAreaGM" dir="rtl">'+ m.content + '</br>';

                if(url != -1)       //  with image
                {
                    message+='<img id = imgGM src=' + url +'/></br>'+
                    '</div>'+
                    '<div class="messageFooter">'+
                        '<h4 id = "dateMessage">'+getDateMes(m.date)+'</h4>'+
                        '<div class = "deleteMessage" id="deleteMessage_'+index+'">'+
                            '<label id="subjectGMS">מחק הודעה <label>'+
                            '<span class="glyphicon glyphicon-trash"></span> '+
                        '</div>'+
                    '</div>'+
                '</div></p>'
                }
                else{
                     message+='</div>'+
                     '<div class="messageFooter">'+
                        '<h4 id = "dateMessage">'+getDateMes(m.date)+'</h4>'+
                        '<div class = "deleteMessage" id="deleteMessage_'+index+'">'+
                            '<label id="subjectGMS">מחק הודעה <label>'+
                            '<span class="glyphicon glyphicon-trash"></span> '+
                        '</div>'+
                    '</div>'+
                '</div></p>'
                }
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
            
            firebase.database().ref("clubhouse/" + club + "/generalMessages/" + keys[i]).once("value")
			.then(function(data)
			{
            var curMessage = data.val();        //  take the message object

            if(curMessage.imageURL != -1)      // delete an image from storage
            {
                var storage = firebase.storage();
                var storageRef = storage.ref();
                var desertRef  = storageRef.child('/generalMessagesImages/' + club + '/' + curMessage.imageName);
                desertRef.delete().then(function(){}).catch(function(error){});
            }
            var deleteMsg = firebase.database().ref("clubhouse/" + club + "/generalMessages/" +keys[i]);
            deleteMsg.remove();
           });
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