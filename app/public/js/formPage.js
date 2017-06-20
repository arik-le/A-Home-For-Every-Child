var formPage=function()
{ 
    var questions=[];
    var corForm;
    var numOfQuestions
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
                        '<input type="text" class="form-control" name="name" id="newQuestion" placeholder="הכנס שאלה " dir="rtl" />'+
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
    var create=function()
    {
        $('.NAV').collapse('hide');
        $("#body").html("");
        questions=[];
        var str=
        '<div class="page">'+
            '<label id="allTitles2" dir="rtl">בחר נושא:</label></p>'+
            '<input type="text" class="form-control" name="name" id="formSubject" maxlength="40" placeholder="הכנס נושא - טופס חדש " dir="rtl" />'+
            '</br><label id="allTitles2" dir="rtl">בחר מועדונית:</label></p>'+
            "<div class='input-group'>"+
                "<span class='input-group-addon'><i class='fa fa-home' aria-hidden='true'></i></span>"+
                "<select type='text' id='clubhouse_select_Add' class='form-control clubHouseName' placeholder='בחר מועדונית מתוך הרשימה'></select>"+
            "</div>"+
            '</br><label id="allTitles2" dir="rtl">בחר מספר שאלות:</label></p>'+
             "<div class='input-group'>"+
                "<span class='input-group-addon'><i class='fa fa-home' aria-hidden='true'></i></span>"+
                "<select type='text' id='clubhouse_select_Add' class='form-control clubHouseName' placeholder='בחר מועדונית מתוך הרשימה'>"+
                    "<option value='1'>1</option>"+
                    "<option value='2'>2</option>"+
                    "<option value='3'>3</option>"+
                    "<option value='4'>4</option>"+
                    "<option value='5'>5</option>"+
                    "<option value='6'>6</option>"+
                    "<option value='7'>7</option>"+
                    "<option value='8'>8</option>"+
                    "<option value='9'>9</option>"+
                    "<option value='10'>10</option>"+
                "</select>"+
            "</div>"+
        '</div>'+
               
        '</br><a id="createForm_btn" class="btn btn-success btn-lg btn-block">צור טופס חדש</a>';

        $("#body").html(str);
        $("#createForm_btn").click(createForm);
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
        var str='<h1 id="allTitles">'+sub+'</h1></p>'+
                '<div class="listQue"></div>'+plus_btn+finsh_btn;

        Form.allQ(corForm.key);
        $("#body").html(str);
        $("#plus_btn").click(addQuestionPage);
        $("#finsh_btn").click(finish);
    }

//================================================================================================

    var showForm = function()
    {
        $('.NAV').collapse('hide');
        $("#body").html("");
        var showExactForm = 
        
        `<h2 id='allTitles'>נושא הטופס</h2>
			<div id="formTable" dir='rtl'>
				<table class="table table-striped" >
				  <thead>
					<tr>
					  <th>#</th>
					  <th>תוכן השאלה</th>
					  <th>ערך</th>
					</tr>
				  </thead>
				  <tbody>
					<tr>
					  <th scope="row">1</th>
					  <td>האם ההתנהגות של הילד השתפרה בשבוע הנוכחי?</td>
					  <td>1/5</td>
					</tr>
					<tr>
					  <th scope="row">1</th>
					  <td>האם ההתנהגות של הילד השתפרה בשבוע הנוכחי?</td>
					  <td>2/10</td>
					</tr><tr>
					  <th scope="row">1</th>
					  <td>האם ההתנהגות של הילד השתפרה בשבוע הנוכחי?</td>
					  <td>3/5</td>
					<tr>
					  <th scope="row">1</th>
					  <td>האם ההתנהגות של הילד השתפרה בשבוע הנוכחי?</td>
					  <td>1/10</td>
					</tr>
					<tr>
					  <th scope="row">1</th>
					  <td>האם ההתנהגות של הילד השתפרה בשבוע הנוכחי?</td>
					  <td>2/5</td>
					</tr><tr>
					  <th scope="row">1</th>
					  <td>האם ההתנהגות של הילד השתפרה בשבוע הנוכחי?</td>
					  <td>7/10</td>
					<tr>

				  </tbody>
				</table>
			</div>
			
			<div class="fromDeatails">
				<h5 id="formLbl">מאת: הורה32</h5>
				<h5 id="formLbl">ילד: ישראל ישראלי</h5>
				<h5 id="formLbl">תאריך: 29/5/17</h5>
			</div>
			
			<div id="group_btn">
				<a id="close_btn" class="btn btn-success btn-sq-sm"><span class="glyphicon glyphicon-ok-circle"></span></a>
				<a id="del_btn" class="btn btn-danger btn-sq-sm"><span class="glyphicon glyphicon-trash"></span></a>
			</div>`;
        $("#body").html(showExactForm);

    }
//================================================================================================
    //גיא יעצלן מסריח!!!
    var p=function(s)
    {
        console.log(s);
    }
    //================================================================================================

     var showQuestions=function(f)
    {
        p("//////");
        p(f);
        p("//////");
       
    }
//================================================================================================
var fillFrom = function(key)
{
   firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms/'+key).once("value")
    .then(function(data)
    {
        var keys=[];
        for(obj in data.be().questions )
            keys.push(obj);
        numOfQuestions=keys.length;
        var form=data.val();
        var str;
        $("#body").html('');
        $("#body").css("text-align", "right");

        for(var i=0;i<keys.length;i++)
        {
            str='<div class="allQue" id="que_'+i+'">'+
                    '<h4 class = "qstlbl" dir="rtl">'+form.questions[keys[i]].question+'</h4>'+
                    '<form id="form_'+i+'"class="choiceList">'+
                    '</form>'+
                '</div>'

            $("#body").append(str);
            for(var j=0;j<form.questions[keys[i]].numOfvalues;j++) 
            {
<<<<<<< HEAD
                  str=  '<label class="j_lebal">'+(j+1)+'<br />'+ 
                    '<input id="rbtn_'+i+'_'+j+'" type="radio" name="select" value="'+(j+1)+'"/>'+
=======
                  str='<label class="j_lebal">'+(j+1)+'<br />'+ 
                    '<input type="radio" name="select" value="'+(j+1)+'"/>'+
>>>>>>> 944416bdd45284067f5e5a3f6ace56777b438b3a
                    '</label>';
                  $("#form_"+i).append(str);  
            }
        }
<<<<<<< HEAD
        var btn='<a id="sendForm_btn" class="btn btn-success btn-lg btn-block">שלח</a>';
        $("#body").append(btn);
        $("#sendForm_btn").click(function()
        {
            sendForm(data.be().questions);
        });
=======
        var btn='</br><a id="sendForm_btn" class="btn btn-success btn-lg btn-block">שלח</a>';
        $("body").append(btn);
>>>>>>> 944416bdd45284067f5e5a3f6ace56777b438b3a
    });
    
}
var loadAllForms=function()
{
    $('.Nav').collapse('hide');
    firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms').once("value")
    .then(function(data)
    {
        var str="";
        var forms=data.val();
        var i=0;
        $("#body").html("");
        for(key in forms)
        {
             str=  '<div class="selectFormDiv" id="form_'+i+'">'+
                        '<label class="SFL">'+forms[key].subject+'</label>'+
                    '</div>';
              $("#body").append(str);
              $("#form_"+(i++)).click(function()
              {
                  corForm=key;
                  fillFrom(key);
              });
        }

      
    });
}
    var test=function(id)
    {
        fillFrom(id);
    }

//================================================================================================
    var sendForm=function(questions)
    {
        var ans=[];
        for(var i=0;i<numOfQuestions;i++)
        {
            var maxSelect=questions[i].numOfvalues;
            for(var j=0;j<maxSelect;j++)
            {
                var check =document.getElementById("rbtn_"+i+"_"+j);
                if(check.checked)
                    ans.push(j+1
                    );
            }
        }
        if(ans.length<numOfQuestions)
        {
            alert("יש לענות על כל השאלות");
            return;
        }
        p(corForm);
        var result={user:login.correntUser[1],anser:ans};
        firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms/'+corForm+'/result').push(result);
        //return ans;
    }
    return {
        create:create,showForm:showForm,
        loadAllForms:loadAllForms,
    }
}();