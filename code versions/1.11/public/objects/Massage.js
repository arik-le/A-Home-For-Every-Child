var Massage=function()
{
    var create=function(source,destination,subject,content,type)
    {
        var date=new Date();
        return{
            source:source,
            destination:destination,
            subject:subject,
            content:content,
            type:type,
            key:0,
            isRead:false,
            date:date.toDateString()
        }
    }

    return {create:create}
}();