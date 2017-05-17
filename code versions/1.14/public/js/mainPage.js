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
        ' <div class="navbar navbar-default navbar-static-top">'+
            '<div class="container">'+
                 '<div class="navbar-header">'+
                    '<a href="#" class="navbar-drand pull-rigth"><img src="images/pictureLogo.jpg" width="60" heigth="36" alt="logo" class="nav-img"></a>'+
                        '<button id="btn-menu"class="navbar-toggle" data-toggle = "collapse" data-target = ".navHeaderCollapse">'+
                            '<span class="icon-bar"></span>'+
                            '<span class="icon-bar"></span>'+
                            '<span class="icon-bar"></span>'+
                        '</button>'+
                '</div>'+
                '<div class="collapse navbar-collapse navHeaderCollapse pull-right">'+
                    '<ul id="option" class="nav navbar-nav navbar-right">'+
                       '<li><a  href="#">דף הבית</a></li>'+ 
                       '<li><a id="massage_btn">הודעות</a></li>'+   
                       '<li class="dropdown">'+
                                 '<a  href="#" class="dropdown-toggle " data-toggle="dropdown">טפסים</a>'+
                                '<ul  class="dropdown-menu pull-left">'+
                                    '<li><a  href="#">שליחה</a></li>'+ 
                                    '<li><a  id="watch_btn">צפיה</a></li>'+ 
                                '</ul>'+
                        '</li>'+
						'<li><a id="appManagement_btn">ניהול</a></li>'+  
                    '</ul>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div id="body"></div>'
    }
    var openMainPage=function(user) // user is a copy of the original user 
    {
        correntUser[0] = user;
        var context = topHeader.inputSection+nav.inputSection;
        $("body").html(context);
        $("#userName_lbl").html(correntUser[0].firstName);
		$("#appManagement_btn").click(appendManagementPage);
        $("#massage_btn").click(appendMassagePage);
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

    var appendMassagePage= function()
    {
        inMassagePage.initPage();
        $('.navHeaderCollapse').collapse('hide');
    }
	
	var appendManagementPage= function()
    {
        appManagement.initPage();
        $('.navHeaderCollapse').collapse('hide');
    }

    return {openMainPage:openMainPage, correntUser:correntUser}
}();