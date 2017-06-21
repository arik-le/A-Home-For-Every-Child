var formPage=function()
{ 
    var questions=[];
    var corForm;
    var numOfQuestions
    var plus_btn='<a href="#" class="btn btn-info btn-lg" id="plus_btn">'+
                  '<span class="glyphicon glyphicon-plus"></span>'+ 
                '</a>';
    var finish_btn='<button type="button" class="btn btn-success btn-lg " id="finish_btn" >סיום</button>'


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
                "<select type='text' id='clubhousesForm' class='form-control clubHouseName'></select>"+
            "</div>"+
            '</br><label id="allTitles2" dir="rtl">בחר מספר שאלות:</label></p>'+
             "<div class='input-group'>"+
                "<span class='input-group-addon'><i class='fa fa-home' aria-hidden='true'></i></span>"+
                "<select type='text'  id='numOfQustions' class='form-control'>"+
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
                    "<option value='11'>11</option>"+
                    "<option value='12'>12</option>"+
                    "<option value='13'>13</option>"+
                    "<option value='14'>14</option>"+
                    "<option value='15'>15</option>"+
                "</select>"+
            "</div>"+
        '</div>'+
               
        '</br><a id="createForm_btn" class="btn btn-success btn-lg btn-block">צור טופס חדש</a>';
        $("#body").html(str);
        updateClubs();
        $("#createForm_btn").click(createForm);
    }
//================================================================================================

    
//================================================================================================
    var createForm=function()
    {
        var sub = document.getElementById("formSubject").value;
        var numOfQuestions = document.getElementById("numOfQustions").value;
        var toClubHouse = document.getElementById("clubhousesForm").value;

        if(sub == "" || sub == undefined)
        {
            alert("אנה הזן שם לטופס");
            return;
        }
        if(toClubHouse == "nun")
        {
            alert("אנה בחר מועדונית");
            return;
        }
        if(numOfQuestions == "nun")
        {
            alert("אנה בחר מספר שאלות");
            return;
        }
        var name = login.correntUser[0].firstName +" "+ login.correntUser[0].lastName;

        //inject to body
        var str='<div id="allTitles">'+sub+'</div></p>'
        $("#body").html(str+"<div id='listQue'></div>");      
        for(var i=0;i<numOfQuestions;i++)
        {
            
            var list='<div>'+
                    '<input  id="Q_'+(i+1)+'" type="text" class="form-control qestionInput" maxlength="100" placeholder="שאלה '+(i+1)+'" dir="rtl" />'+
                    "<select type='text' value='nan' id='A_"+(i+1)+"' class='form-control numOfAnswers' placeholder='בחר מועדונית מתוך הרשימה'>"+
                        "<option value='5'>5</option>"+
                        "<option value='10'>10</option>"+
                    "</select>"+
                '</div>';
            $("#listQue").append(list);
        }
        $("#body").append(finish_btn);

        $("#finish_btn").click(function()
        {
            var qList = [];
            var aList = [];
            var questions=[];

            
            for(var i=1;i<=numOfQuestions;i++)
            {
                var q = document.getElementById("Q_"+i).value;
                var a = document.getElementById("A_"+i).value;
                if(q == "")
                {   
                    alert(" אנה הזן שאלה"+(i));
                    return;
                }
                questions[i-1]={numOfvalues:a,question:q};
            }
            var newForm=Form.create(sub,name,questions);      
            if(toClubHouse != "allClubs")
                firebase.database().ref('clubhouse/'+toClubHouse+'/forms').push(newForm);
            else
            {
                firebase.database().ref("clubhouse/").once("value")
                .then(function(data)
                {
                    var clubs = data.val();
                    for(c in clubs)
                        firebase.database().ref('clubhouse/' + c + '/forms').push(newForm);
                });
            }
            alert("טופס הוזן בהצלחה");
            create();
        });
    }

//================================================================================================
    var addQtoTable=function(q,a,i)
    {
        var queStr='<tr>'+
					  '<th scope="row">'+(i+1)+'</th>'+
					  '<td>'+q.question+'</td>'+
					  '<td>'+a[i]+'/'+q.numOfvalues+'</td>'+
		    '</tr>`';
        return queStr;
    }
    
    var keysArray=function(objects)
    {
        var keys=[];
        for(obj in objects )
            keys.push(obj);
        return keys;
    }
    var showForm = function(form,user)
    {
        
        $('.NAV').collapse('hide');
        $("#body").html("");      
        var showExactForm = 
        
        `<h2 id='allTitles'>`+form.subject+`</h2>
			<div id="formTable" dir='rtl'>
				<table class="table table-striped" >
				  <thead>
					<tr>
					  <th>#</th>
					  <th>תוכן השאלה</th>
					  <th>ערך</th>
					</tr>
				  </thead>
				  <tbody>`;
        var answers=keysArray(form.result);
        var ans;
        for(var i=0;i<answers.length;i++)//find the user answer
            if(form.result[answers[i]].user===user)
                ans=form.result[answers[i]].answers;
        var keys=keysArray(form.questions);
		for(i=0;i<keys.length;i++)
            showExactForm+=addQtoTable(form.questions[keys[i]],ans,i);
        firebase.database().ref('users/'+user).once("value")
        .then(function(data)
        {
            var thisUser=data.val();
            showExactForm+=  `</tbody>
                    </table>
                </div>
                
                <div class="fromDeatails">
                    <h5 id="formLbl">מאת :`+thisUser.lastName+` `+thisUser.firstName+` `+`</h5>
                    <h5 id="formLbl">ילד :`+thisUser.childName+` `+`</h5>
                    <h5 id="formLbl">תאריך: 29/5/17</h5>
                </div>
                
                <div id="group_btn">
                    <a id="close_btn" class="btn btn-success btn-sq-sm"><span class="glyphicon glyphicon-ok-circle"></span></a>
                    <a id="del_btn" class="btn btn-danger btn-sq-sm"><span class="glyphicon glyphicon-trash"></span></a>
                </div>`;
            $("#body").html(showExactForm);
        });
    }
//================================================================================================
    var p=function(s)
    {
        console.log(s);
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
            $("#body").html("");
            $("#body").css("text-align", "right");

            for(var i=0;i<keys.length;i++)
            {
            firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms/'+key).once("value")
                .then(function(data)
                {
                    var keys=[];
                    for(obj in data.be().questions )
                        keys.push(obj);
                    var form=data.val();
                    var str;
                    $("#body").html('');
                    $("#body").html('<div id="allTitles">'+form.subject+'</div></p>');
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
                            str='<label  class="j_lebal">'+(j+1)+'<br />'+ 
                                '<input id="rbtn_'+i+'_'+j+'" type="radio" name="select" value="'+(j+1)+'"/>'+
                                '</label>';
                            $("#form_"+i).append(str);  
                        }
                    }
                    var btn='<a id="sendForm_btn" class="btn btn-success btn-lg btn-block">שלח</a>';
                    $("#body").append(btn);
                    $("#sendForm_btn").click(function()
                    {
                        sendForm(data.be().questions,data.key);
                    })
                });
            }
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
            var keys=Object.keys(forms);
            var i=0;
            $("#body").html("");
            for(key in forms)
            {
                var tempId ="form_"+i;
                str='<a class="btn btn-sq-lg formRec" id="'+tempId+'">'+
                '<i class="fa fa-clipboard fa-2x"></i><br/>'+forms[key].subject+'</a>';
                $("#body").append(str);
                mainPage.paintButton(i,tempId);
                $("#form_"+(i++)).click(function(e)
                {
                    var id=e.target.id;
                    id=id.substring(5,id.length); 
                    fillFrom(keys[id]);
                });
            }
        });
    }

    var updateClubs=function()				//update the list of clubHouses
	{		
        firebase.database().ref("clubhouse/").once("value")
        .then(function(data)
        {
            var clubs=data.val();
            var keys=Object.keys(clubs);
            for(var i=0;i<keys.length;i++)
                $("#clubhousesForm").append('<option value='+clubs[keys[i]].ClubhouseDBkey+'>'+clubs[keys[i]].name+'</option>');

            $("#clubhousesForm").append('<option value="allClubs">כל המועדוניות</option>');
        });
	}

//================================================================================================
    var sendForm=function(questions,formKey)
    {
        var ans=[];
        for(var i=0;i<numOfQuestions;i++)
        {
            var maxSelect=questions[i].numOfvalues;
            for(var j=0;j<maxSelect;j++)
            {
                var check =document.getElementById("rbtn_"+i+"_"+j);
                if(check.checked)
                    ans.push(j+1);
            }
        }
       
        if(ans.length<numOfQuestions)
        {
            alert("יש לענות על כל השאלות");
            return;
        }
        var result={user:login.correntUser[1],answers:ans};
        firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms/'+formKey+'/result').push(result);
        loadAllForms()
    }

    var test=function()
    {
        firebase.database().ref('clubhouse/-Kn-BZInu3pPlaW11V7v/forms/-Kn6CV3USW-N-KeL1up2').once("value")
        .then(function(data)
        {
            var form=data.val();
            var user="DIgNUeLsWndpOtrvK49MUbS3rgg2";
            showForm(form,user);
        });
    }

    var showFormByClubs = function()
    {
        var clubhouses = login.correntUser[0].clubhouseKey;
        var myType = login.correntUser[0].userType;
        var users,user;
        var fs=[];
        firebase.database().ref('users/').once("value")
        .then(function(data)
        {
            users=data.val();
        });
        if(myType == User.GUIDE)
        {
            //load next page forms//
        }
        $('.Nav').collapse('hide');
        $("#body").html("<h2 id='allTitles'>בחר מועדונית - הצגת טפסים</h2></p>")

        firebase.database().ref('clubhouse/').once("value")
        .then(function(data)
        {
            var clubs=data.val();
            var i=0;
            for(key in clubs)
            {
                var tempId ="clubForm_"+i;
                str='<a class="btn btn-sq-lg clubSquare" id="'+tempId+'">'+
                '<i class="fa fa-home fa-2x"></i><br/>'+clubs[key].name+'</a>';
                if(myType == User.SOCIAL)
                {
                    for(var j=0;j<clubhouses.length;j++) 
                        if(clubhouses[j]==key)
                            $("#body").append(str);
                }
                else
                    $("#body").append(str);
                mainPage.paintButton(i,tempId);
                $("#clubForm_"+(i++)).click(function(e)
                {
                    var str="<div class='row allForms'>"+
                                "<h2 id = 'allTitles'>טפסי מועדונית</h2></br>"+
                             '</div>';
                    $("#body").html(str);          
                    var ans,k=0;
                    var index=e.target.id;
                    index=index.substring(9,index.length); 
                    var keys=Object.keys(clubs);
                    var forms=clubs[keys[index]].forms;
                    for(i in forms)
                    {
                            
                            if(forms[i].result!=null)
                            {
                               
                                res=forms[i].result;
                                for(j in res)
                                {
                                    user=res[j].user;
                                    str=   '<div class="row massage" id="Form_'+(k++)+'">'+   
                                                '<span class="glyphicon glyphicon-trash col-xs-2 trash"></span>'+
                                                '<h5 class="topic  col-xs-5">'+' מאת :'+users[user].firstName+' '+users[user].lastName+'</h5>'+
                                                '<h5 class="topic  col-xs-3">'+forms[i].subject+'</h5>'+
                                                '<span class="glyphicon glyphicon-list-alt col-xs-1 envelopeR" id="enve"></span>'+
                                                '<div class="col-xs-1"></div>';
                                            '</div>'+
                                     $(".allForms").append(str);
                                     fs.push({form:forms[i],user:user});
                                }
                                var delayMillis = 1500; //1.5 secon
                                setTimeout(function() {
                                    
                                         formLis(fs);
                                }, delayMillis);  
                            }
                    }
                });
            }
         /*     
           p(fs);*/
        });
    }
    var formLis=function(fs)
    {
        for(var i=0;i<fs.length;i++)
        {
            // p(i);
            $("#Form_"+i).click(function()
            {
                    p(fs[i].form.subject);
                    p(fs[i].user);
                    p("------------");
                showForm(fs[i].form,fs[i].user);
            });
        }
    }
    return {
        create:create,
        showForm:showForm,
        loadAllForms:loadAllForms,
        showFormByClubs:showFormByClubs,
        test:test
    }
}();