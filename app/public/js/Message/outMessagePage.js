var outMessagePage=function()
{
    var sendMessage={
        topic:'<div class="row">'+
            '<h2 class="col-xs-offset-2 col-xs-8 smt">הודעות יוצאות</h2>'+
        '</div>'
    }
    var open=function()
    {
        $("#body").html("");
        $("#body").html(sendMessage.topic);
        $('.NAV').collapse('hide'); 
        var me = login.correntUser[1];
        
        firebase.database().ref("users/" + me + "/outboxMessages").once("value")
        .then(function(data)
        {
            var messages = data.val();
            if (messages !== null)
            {
                var keys = Object.keys(messages);
                for(var i=keys.length-1;i>=0;i--)
                    inMassagePage.addMessage(messages[keys[i]],i,keys[i],false);
			}
        });
    }
return {open:open}

}();