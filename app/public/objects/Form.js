var Form=function()
{
    var questions=[];
    var create=function(subject)
    {
        return {questions:questions,subject:subject}
    }
    var len=function(obj) 
    {
        var size = 0, key;
        for (key in obj) 
            if (obj.hasOwnProperty(key))
                size++;
        
        return size;
    }
    var allQ=function(id)
    {
        firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms').once("value")
        .then(function(data)
        {
            var str="";
            var forms = data.val();
            var f=forms[id];
            if(f.questions!=null)
            {
                 $(".listQue").html("");
                 var i=0;
                 for (var key in f.questions)
                  {
                    if (f.questions.hasOwnProperty(key)) 
                    {
                        var str='<div id="Q_'+(i++)+'">'+
                            '<label>'+f.questions[key].question+' '+f.questions[key].numOfvalues+'</label>'+
                            '</div>'
                        //i++;
                        $(".listQue").append(str);
                    }
                        
                    
                }
              //  console.log(len(f.questions.keys)); 
                
                /*for(var i=0;i<len(f.questions);i++)
                {
                    
                }*/
            }   

        });
          
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
        allQ: allQ
    }
}();