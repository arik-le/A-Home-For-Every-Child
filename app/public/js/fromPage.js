var fromPage=function()
{ 
    var questions=[];
    var corForm;
    var plus_btn='<a href="#" class="btn btn-info btn-lg" id="plus_btn">'+
                  '<span class="glyphicon glyphicon-plus"></span>'+ 
                '</a>';
    var finsh_btn='<a href="#" class="btn btn-info btn-lg " id="finsh_btn">סיום</a>';

//================================================================================================
    var addQuestion=function()
    {

        var n=document.getElementById("numOfOption").value;
        var q=document.getElementById("newQuestion").value;
       // var question=Question.create(q,n);
       questions.push(Question.create(q,n));
        //firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms/'+corForm.key+'/questions').push(question);
        Form.allQ(questions);
        $(".addQPage").remove();
       $("#body").append(plus_btn);
       $("#plus_btn").click(addQuestionPage);
       // p(corForm.key);
    }

//================================================================================================
    var addQuestionPage=function()
    {
        $("#plus_btn").remove();
        var str='<div class="addQPage">'+
                    '<div class="page">'+            
                        '<input type="text" class="form-control" name="name" id="newQuestion" maxlength="20" placeholder="הכנס שאלה " dir="rtl" />'+
                    '</div>'+
                    '<select class = "userCkecklist" id = "numOfOption" required >'+
                        '<option value="5" >5</option>'+
                        '<option value="10">10</option>'+
                    '</select></br>'+
                    '<a id="addQuestion_btn" class="btn btn-info btn-lg">הוסף</a>'+
                '</div>';
        $(".listQue").append(str);
        $("#addQuestion_btn").click(addQuestion);
    }    

//================================================================================================
    var finish=function()
    {
        firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms/'+corForm.key+'/questions').set(questions);
        alert("טופס הוזן בהצלחה");
        create();
    }
//================================================================================================
    var createForm=function()
    {
        var sub=document.getElementById("formSubject").value;
        var new_form=Form.create(sub);
        corForm = firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms').push(new_form);
        var str='<h1>'+sub+'</h1>'+
                '<div class="listQue"></div>'+plus_btn+finsh_btn;

        Form.allQ(corForm.key);
        $("#body").html(str);
        $("#plus_btn").click(addQuestionPage);
        $("#finsh_btn").click(finish);
        
    }
//================================================================================================
    var create=function()
    {
        $('.NAV').collapse('hide');
        $("#body").html("");
        questions=[];
        var str=
        '<div class="page">'+
            '<input type="text" class="form-control" name="name" id="formSubject" maxlength="20" placeholder="הכנס נושא שאלון " dir="rtl" />'+
        '</div>'+
               
        '<a id="createForm_btn" class="btn btn-success btn-lg btn-block">צור טופס חדש</a>';

        
        $("#body").html(str);
        $("#createForm_btn").click(createForm);
    }
//================================================================================================
    var p=function(s)
    {
        console.log(s);
    }


//================================================================================================
    
    return {
        create:create
    }
}();