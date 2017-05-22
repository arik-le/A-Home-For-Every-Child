var mainPage=function()
{
    var correntUser = []; 

    var topHeader={
          inputSection:
            '<div class="topHeader row">'+
                '<button type="button"  id = "logout" class="btn btn-default btn-sm col-xs-4">'+
                '<span class="glyphicon glyphicon-log-out"></span> התנתק/י'+
                '</button>'+
                '<div class="hi col-xs-offset-6 col-xs-2">'+
                    '<label id="userName_lbl"></label>'+
                    '<span class="glyphicon glyphicon-user"></span>'+ 
                '</div>'+  
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
						'<li><a href="#">מסך הבית<span class="sr-only">(current)</span></a></li>'+
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
								'<li><a href="#">עריכת משתמשים</a></li>'+
								'<li><a href="#">הוספת מועדונית</a></li>'+
								'<li><a href="#">עריכת מועדונית</a></li>'+
								'<li role="separator" class="divider"></li>'+
							'</ul>'+
						'</li>'+
                        '<li role="separator" class="divider"></li>'+

					'</ul>'+
					'<ul class="nav navbar-nav navbar-right">'+
						'<li><a href="#">התנתק מהמערכת</a></li>'+
					'</ul>'+
				'</div>'+
			'</div>'+
		'</nav>'+
        '<div id="body"></div>'
    }
    var openMainPage=function(user) // user is a copy of the original user 
    {
        correntUser[0] = user;
        var context = topHeader.inputSection+nav.inputSection;
        $("body").html(context);
        $("#userName_lbl").html(correntUser[0].firstName);
		$("#addUser_btn").click(usersManagement.addUser);
        $("#writeMessage_btn").click(inMassagePage.openSendMassage);
        $("#incomingMessage_btn").click(inMassagePage.openInBoxMes);
        $("#logout").click(logout);
    }
    
    var logout = function()
    {
        if(confirm('בטוח שברצונך להתנתק מהמערכת?')) 
        {
            firebase.database().ref('users/'+ correntUser[0].userKey + '/status').set(0);			//change field in database  
            login.initModule();
        }
        else 
            return;
     }
    return {openMainPage:openMainPage, correntUser:correntUser}
}();