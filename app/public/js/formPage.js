var formPage=function()
{ 
    var ONLY_GUIDES = 2;
    var ONLY_SOCIAL = 3;
    var ONLY_ADMIN = 4;
    var ALL_STUFF = 5;

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
        questions.push(Question.create(q,n));
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
            '</br><label id="allTitles2" dir="rtl">הרשאות צפיה</label></p>'+
            '<div id="checkPermision">'+
				'<label for="guides" class="chkbox">רכזים/מדריכים</label>'+
				'<input id="selGuides" type="checkbox" name="guides" id="guides" class="custom" />'+
				'<label for="socials" class="chkbox">עו"ס/ר"צ</label>'+
				'<input id="selSocial" type="checkbox" name="socials" id="socials" class="custom" checked/>'+
            "</div>"+

            '<label id="allTitles2" dir="rtl">בחר מספר שאלות:</label></p>'+
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
        var per = checkPremission();

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

            var newForm=Form.create(sub,name,questions,per);      
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

//================================================================================================
    
    var showForm = function(form,user,id)
    {
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
        var answers=Object.keys(form.result);
        var ans;

        for(var i=0;i<answers.length;i++)//find the user answer
            if(form.result[answers[i]].user===user)
                ans=form.result[answers[i]].answers;

        var keys=Object.keys(form.questions);
		for(i=0;i<keys.length;i++)
            showExactForm+=addQtoTable(form.questions[keys[i]],ans,i);
      
        showExactForm+=  `</tbody>
                </table>
            </div>
            
            <div class="fromDeatails">
                <h5 id="formLbl">מאת :`+form.result[answers[id]].sendBy+`</h5>
                <h5 id="formLbl">ילד :`+form.result[answers[id]].childName+`</h5>
                <h5 id="formLbl">תאריך:`+form.result[answers[id]].date+`</h5>
            </div>
            
            <div id="group_btn">
                <a id="close_btn" class="btn btn-success btn-sq-sm"><span class="glyphicon glyphicon-ok-circle"></span></a>
                <a id="print_btn" class="btn btn-primary btn-sq-sm"><span class="glyphicon glyphicon-print"></span></a>
                <a id="del_btn" class="btn btn-danger btn-sq-sm"><span class="glyphicon glyphicon-trash"></span></a>
            </div>`;
        $("#body").html(showExactForm);
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

            numOfQuestions=keys.length
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

//================================================================================================

    var isAlreadySolved=function(form)
    {
        var user=login.correntUser[1];
        var results=form.result;
        if(results!=undefined)
        {
            for(key in results)
            {
               
                if(results[key].user===user)
                    return true;
            }
        }
        return false;
    }

//================================================================================================

    var loadAllForms=function()
    {
        $('.Nav').collapse('hide');
        firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms').once("value")
        .then(function(data)
        {
            var str="";
            var forms=data.val();
            if(forms==null)
            {
                $("#mesBody").html("<h1 id='allTitles' dir='rtl'>כרגע אין טפסים במערכת...<h1>");
                return;
            }

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
                if(!isAlreadySolved(forms[key]))
                {
                    $("#form_"+(i++)).click(function()
                    {
            
                        var id=this.id;
                        id=id.substring(5,id.length); 
                        fillFrom(keys[id]);
                    });
                }
                else
                {
                    $("#"+tempId).css("background","lightgray");
                    $("#form_"+(i++)).click(function()
                    {
                        alert("טופס כבר הוזן לא ניתן להזין פעמים");
                    });
                }
            }
        });
    }

//================================================================================================
 
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
        var name = login.correntUser[0].firstName +" "+ login.correntUser[0].lastName;
        var child = login.correntUser[0].childName; 

        var result={user:login.correntUser[1],answers:ans,sendBy:name,childName:child,date:getDateForm()};
        firebase.database().ref('clubhouse/'+login.correntClub[0]+'/forms/'+formKey+'/result').push(result);
        loadAllForms()
    }

//================================================================================================

    var showFormsByPermission = function()
    {
        $('.Nav').collapse('hide');
        var clubhouse = login.correntUser[0].clubhouseKey;
        var myType = login.correntUser[0].userType;

        if(myType == User.GUIDE)
            loadClubForms(clubhouse);
        else 
            loadClubList();
    }

//================================================================================================

    var loadClubList =  function()
    {
        var clubhouses = login.correntUser[0].clubhouseKey;
        var myType = login.correntUser[0].userType;
        var str;

        $("#body").html("<h2 id='allTitles'>בחר מועדונית - הצגת טפסים</h2></p>")
        firebase.database().ref('clubhouse/').once("value")
        .then(function(data)
        {
            clubs=data.val();
            keys=Object.keys(clubs);
            
            for(var i=0;i<keys.length;i++)
            {
                if(myType == User.SOCIAL)
                { 
                    for(var j=0;j<clubhouses.length;j++) 
                        if(clubhouses[j] == keys[i])
                            drawClubButton(i,clubs[keys[i]].name,keys[i]);
                }
                else
                    drawClubButton(i,clubs[keys[i]].name,keys[i]);
            }

        });
    }

//================================================================================================

    var drawClubButton = function(i,name,club)
    {
        var tempId ="clubForm_"+i;
        var str='<a class="btn btn-sq-lg clubSquare" id="'+tempId+'">'+
        '<i class="fa fa-home fa-2x"></i><br/>'+name+'</a>';
        $("#body").append(str);
        mainPage.paintButton(i,tempId);
        $("#clubForm_"+i).click(function()
        { 
            setTimeout(function(){loadClubForms(club);},250);
        });
    }

//================================================================================================

    var loadClubForms = function(clubID)
    {
        var press=false;
        firebase.database().ref('clubhouse/'+clubID+'/forms').once("value")
        .then(function(data)
        {
            var forms=data.val();
            if(forms==null)
            {
                $("#body").html("<h1 id='allTitles' dir='rtl'>כרגע אין טפסים במערכת...<h1>");
                return;
            }
            $("#body").html("");

            var keys=Object.keys(forms);
            var selectForm=[];
            for(key in keys)
                selectForm.push(false);
            var i=0;
            for(key in forms)
            {
                var tempId ="sendedForm_"+i;
                var str='<a class="btn btn-sq-lg formRec" id="'+tempId+'">'+
                '<i class="fa fa-clipboard fa-2x"></i><br/>'+forms[key].subject+'</a>';
                $("#body").append(str);
                mainPage.paintButton(i,tempId);
              
                $("#sendedForm_"+(i++)).click(function()
                {
                    var id=this.id;
                    id=id.split("_")[1];
                    if(press)
                    {
                        
                        if(!selectForm[id])
                            $("#sendedForm_"+id).css("background","lightgray");
                        else
                            $("#sendedForm_"+id).css("background","#ECE9E6");
                        selectForm[id]=!selectForm[id];
                    }
                    else  
                        showAnswers(clubID,keys[id]);
                });
            }
            $("#body").append('</br></br><a id="delCreatedForm_btn" class="btn btn-danger btn-lg btn-block">מחק</a>');
            $("#delCreatedForm_btn").click(function()
            {
                press=!press;
                if(press)
                {
                    $("#delCreatedForm_btn").html("בטל");
                    $("#body").append('<div id="delsel_btn"></br></br><a id="delselectForm_btn" class="btn btn-danger btn-lg btn-block">מחק</a></div>');
                    $("#delsel_btn").click(function()
                    {
                        
                        for(var i=0;i<selectForm.length;i++)
                            if(selectForm[i])
                                    firebase.database().ref('clubhouse/'+clubID+'/forms').child(keys[i]).remove();
                        loadClubForms(clubID);
                        
                    });
             }
                else
                {
                     $("#delCreatedForm_btn").html("מחיקה");
                     $("#delsel_btn").remove();
                     for(var i=0;i<selectForm.length;i++)
                        $("#sendedForm_"+i).css("background","#ECE9E6");
                }
             
            });
        });
    }

//================================================================================================

    var showAnswers = function(clubID,key)
    {
        firebase.database().ref('clubhouse/'+clubID+'/forms/'+key).once("value")
        .then(function(data)
        {
           var subject = data.val().subject;
           $("#body").html("<h1 id='allTitles' dir='rtl'>"+subject+"<h1>");

           var results = data.val().result;
           if(results == null)
           {
                $("#body").html("<h1 id='allTitles' dir='rtl'>לא נשלחו טפסים...<h1>");
                $("#body").append('<a id="back_btn" class="btn btn-warning btn-lg btn-block">חזור</a>');
                $("#back_btn").click(function() {  setTimeout(function(){loadClubForms(clubID);},250);});
                return;
           }
           var keys = Object.keys(results);
           for(var i=0;i<keys.length;i++)
           {    console.log(i);
                var str = '<div class="row massage">'+   
                            '<span class="glyphicon glyphicon-trash col-xs-2 trash" id = "delTopic_'+i+'"></span>'+
                            '<h5 id="Form_'+i+'" class="topic  col-xs-8">'+' מאת :'+results[keys[i]].sendBy+'</h5>'+
                            '<span class="glyphicon glyphicon-list-alt col-xs-1 envelopeR" id="enve"></span>'+
                            '<div class="col-xs-1"></div>'+
                        '</div>'; 
                $("#body").append(str);
               
                $("#back_btn").click(function() {  setTimeout(function(){loadClubForms(clubID);},250);});

                $("#delTopic_"+i).click(function()
                {
                    var id=this.id;
                    id=id.split("_")[1];
                    deleteForm(clubID,key,keys[id]);
                });

                $("#Form_"+i).click(function()
                {
                    var id=this.id;
                    id=id.split("_")[1];
                    showForm(data.val(),results[keys[id]].user,id);
                    $("#close_btn").click(function() { showAnswers(clubID,key)});
                    $("#print_btn").click(function(){window.print();});
                    $("#del_btn").click(function(){deleteForm(clubID,key,keys[id]);});
                });  
            }
             $("#body").append('<a id="back_btn" class="btn btn-warning btn-lg btn-block">חזור</a>');
        });
    }

//================================================================================================

    var deleteForm= function(clubID,key,id)
    {
        firebase.database().ref("clubhouse/" + clubID + "/forms/"+key+"/result/" + id).remove();
        showAnswers(clubID,key);
    }

//================================================================================================
       
    var checkPremission = function()
    {
		var toGuides = document.getElementById("selGuides").checked; 
		var toSocial = document.getElementById("selSocial").checked;

        if(!toGuides && !toSocial)
            return ONLY_ADMIN;
        if(toGuides && !toSocial)
            return ONLY_GUIDES;
        else if(!toGuides && toSocial)
            return ONLY_SOCIAL;
        return ALL_STUFF;
    }

//================================================================================================

    var getDateForm=function()
    {
        var date=new Date();
        var d=date.getDate();
        var m=date.getMonth()+1;
        var y=date.getFullYear();
        return d+"."+m+"."+y;
    }

//================================================================================================

    return {
        create:create,
        showForm:showForm,
        loadAllForms:loadAllForms,
        showFormsByPermission:showFormsByPermission,
    }
}();