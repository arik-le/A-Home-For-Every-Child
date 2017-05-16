var Message=function()
{
    var create=function(source,destination,subject,content,type)
    {
        var general = 0;
        var personal = 1;
        var date=new Date();

        return{
            source:source,
            destination:destination,
            subject:subject,
            content:content,
            type:type,
            isRead:false,
            date:date.toDateString()
        }
    }
    return {create:create}
}();