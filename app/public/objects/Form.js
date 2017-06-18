var Form=function()
{
    var questions=[];
    var create=function()
    {
        return {questions:questions}
    }
    var addQuestion=function(q,n)
    {
        var question=Question.create(q,n);
        questions.push(question);
    }
    var showQuestions=function()
    {
        $("#body").html('');
        var str;
        for(var i=0;i<questions.length;i++)
        {
            str=	'<div class="row que" id="que_'+i+'">'+
                        '<label>'+questions[i].question+'</label>'+
                        '<form id="form_'+i+'"class="choiceList">'+
                        '</form>'+
                    '</div>'
            $("#body").append(str);
            for(var j=0;j<questions[i].numOfvalues;j++) 
            {
                  str=  '<label class="j_lebal">'+(j+1)+'<br />'+ 
                    '<input type="radio" name="select" value="'+(j+1)+'"/>'+
                    '</label>';
                  $("#form_"+i).append(str);  
            }
        
        }
    }
    return {
        showQuestions:showQuestions,
        create:create,
        addQuestion:addQuestion
    }
}();