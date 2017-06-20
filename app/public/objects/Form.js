var Form=function()
{
    var questions=[];
    var create=function(subject)
    {
        return {questions:questions,subject:subject}
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
 
   
    return {
        create:create,
        allQ: allQ
    }
}();