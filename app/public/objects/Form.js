var Form=function()
{
    var questions=[];
    var create=function(subject,createdBy,questions,permission)
    {
        var d = new Date();
        return {
                questions:questions,
                subject:subject,
                createdBy:createdBy,
                date:getDateForm(),
                permission:permission
            }
    }
   
    var allQ=function(q)
    {
        if(q!==undefined)
        {
            $(".listQue").html("");
            for(var i=0;i<q.length;i++)
            {
                var str='<div id="Q_'+i+'">'+
                            '<label>'+q[i].question+' '+q[i].numOfvalues+'</label>'+
                            '</div>' ;
                $(".listQue").append(str);
            }
        }
    }

    var getDateForm=function()
    {
        var date=new Date();
        var d=date.getDate();
        var m=date.getMonth()+1;
        var y=date.getFullYear();
        return d+"."+m+"."+y;
    }
 
   
    return {
        create:create,
        allQ: allQ,
    }
}();