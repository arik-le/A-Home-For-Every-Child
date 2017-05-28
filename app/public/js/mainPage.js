var mainPage=function()
{
    var correntUser = []; 

    var topHeader={
          inputSection:
            '<div class="topHeader row">'+
                '<button type="button" id = "logout" class="btn btn-default btn-sm col-xs-4">'+
                '<span class="glyphicon glyphicon-log-out"></span> התנתק/י'+
                '</button>'+
                '<div id = "nameInTop">'+
                    '<label id="userName_lbl"></label>'+
                    '<span class="glyphicon glyphicon-user"></span>'+ 
                '<div>'+ 
            '</div>'
    }
    var nav={

        inputSection:
        '<nav class="navbar navbar-default">'+
			'<div class="container-fluid">'+
				'<div class="navbar-header">'+
					'<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'+
						'<span class="sr-only">Toggle navigation</span>'+
						'<span class="icon-bar"></span>'+
						'<span class="icon-bar"></span>'+
						'<span class="icon-bar"></span>'+
					'</button>'+
                    '<a class="navbar-brand" href="#"><img src="images/logo.jpg" width="50" alt="logo" class="nav-img"></a>'+

				'</div>'+

				'<div class="collapse navbar-collapse NAV" id="bs-example-navbar-collapse-1">'+
					'<ul class="nav navbar-nav">'+
						'<li><a id="homePage">מסך הבית<span class="sr-only">(current)</span></a></li>'+
						'<li class="dropdown" id="1">'+
							'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">הודעות <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">   '+
								'<li><a id="writeMessage_btn">כתיבת הודעה</a></li>'+
								'<li><a id="incomingMessage_btn">דואר נכנס</a></li>'+
								'<li><a href="#">דואר יוצא</a></li>'+
								'<li role="separator" class="divider"></li>'+
							'</ul>'+
						'</li'+
						'<li role="separator" class="divider"></li>'+

						'<li class="dropdown">'+
							'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">ניהול משתמשים <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">'+
								'<li><a id="addUser_btn">הוספת משתמשים</a></li>'+
								'<li><a id="btnEditUser">עריכת משתמשים</a></li>'+
								'<li><a id="addClubhouse_btn">הוספת מועדונית</a></li>'+
								'<li><a id="editClubhouse_btn">עריכת מועדונית</a></li>'+
								'<li role="separator" class="divider"></li>'+
							'</ul>'+
						'</li>'+
                        '<li role="separator" class="divider"></li>'+

					'</ul>'+
					'<ul class="nav navbar-nav navbar-right">'+
						'<li><a id="logout1">התנתק מהמערכת</a></li>'+
					'</ul>'+
				'</div>'+
			'</div>'+
		'</nav>'+
        '<div id="body"></div>'
    }

    var newFeeds = {
        inputSection:  
            '<div class = "generalMessageBox">'+
                '<div class = "title">'+
                     '<h6>guide58 :הודעה מאת</h6>'+
                     '<label id="subjectGM">טיול לעין יעל עם הילדים המקסימים<label>'+
                '</div>'+
                '<textarea id = "textAreaGM" class="form-control" rows="5" name="message" disabled>היום יצאנו לטייל בחוות עין יעל המקסימה בהמשך היום נשלח אליכם תמונות של הילדים החמודים</textarea>'+
               '<div class="messageFooter">'+
					'<h4 id = "dateMessage">12.5.17</h4>'+
					'<div class = "deleteMessage">'+
						'<label id="subjectGM">מחק הודעה <label>'+
						'<span class="glyphicon glyphicon-trash"></span> '+
					'</div>'+
				'</div>'+
            '</div></p>'+
            '<div class = "generalMessageBox">'+
                '<div class = "title">'+
                     '<h6>guide58 :הודעה מאת</h6>'+
                     '<label id="subjectGM">טיול לעין יעל עם הילדים המקסימים<label>'+
                '</div>'+
                '<textarea id = "textAreaGM" class="form-control" rows="5" name="message" disabled>היום יצאנו לטייל בחוות עין יעל המקסימה בהמשך היום נשלח אליכם תמונות של הילדים החמודים</textarea>'+
               '<div class="messageFooter">'+
					'<h4 id = "dateMessage">12.5.17</h4>'+
					'<div class = "deleteMessage">'+
						'<label id="subjectGM">מחק הודעה <label>'+
						'<span class="glyphicon glyphicon-trash"></span> '+
					'</div>'+
				'</div>'+
            '</div></p>'+
            '<div class = "generalMessageBox">'+
                '<div class = "title">'+
                     '<h6>guide58 :הודעה מאת</h6>'+
                     '<label id="subjectGM">טיול לעין יעל עם הילדים המקסימים<label>'+
                '</div>'+
                '<textarea id = "textAreaGM" class="form-control" rows="5" name="message" disabled>היום יצאנו לטייל בחוות עין יעל המקסימה בהמשך היום נשלח אליכם תמונות של הילדים החמודים</textarea>'+
               '<div class="messageFooter">'+
					'<h4 id = "dateMessage">12.5.17</h4>'+
					'<div class = "deleteMessage">'+
						'<label id="subjectGM">מחק הודעה <label>'+
						'<span class="glyphicon glyphicon-trash"></span> '+
					'</div>'+
				'</div>'+
            '</div></p>'
    }
    var openMainPage=function(user) // user is a copy of the original user 
    {
        correntUser[0] = user;
        var context = topHeader.inputSection+nav.inputSection;
        $("body").html(context);
        $("#body").html(newFeeds.inputSection);
        $("#userName_lbl").html(correntUser[0].firstName);

        $("#homePage").click(function(){
            $('.Nav').collapse('hide');
            $("#body").html(newFeeds.inputSection);
        });
        
		$("#addUser_btn").click(usersManagement.addUser);
        $("#btnEditUser").click(usersManagement.editUser);

        $("#addClubhouse_btn").click(clubhouseManagement.addClubhouse);
        $("#editClubhouse_btn").click(clubhouseManagement.editClubhouse);

        $("#writeMessage_btn").click(inMassagePage.openSendMassage);
        $("#incomingMessage_btn").click(inMassagePage.openInBoxMes);
        $("#logout").click(logout);
        $("#logout1").click(logout);
    }
    
    
    var logout = function()
    {
        if(confirm('בטוח שברצונך להתנתק מהמערכת?')) 
            login.initModule();
        else 
            return;
     }
    return {openMainPage:openMainPage, correntUser:correntUser}
}();