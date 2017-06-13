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
                    '<label id= "userName_lbl" ></label>'+
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
							'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="MessNav">הודעות <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">   '+
								'<li><a id="writeMessage_btn">כתיבת הודעה</a></li>'+
								'<li><a id="incomingMessage_btn">דואר נכנס</a></li>'+
								'<li><a id="outMessage_btn">דואר יוצא</a></li>'+
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
                    '<li><a id="userManual">מדריך עזרה למשתמש<span class="sr-only">(current)</span></a></li>'+
					'<li><a id="aboutUs">אודות<span class="sr-only">(current)</span></a></li>'+
                    '</ul>'+
					'<ul class="nav navbar-nav navbar-right">'+
						'<li><a id="logout1">התנתק מהמערכת</a></li>'+
					'</ul>'+
				'</div>'+
			'</div>'+
		'</nav>'+
        '<div id="body"></div>'
    }

/***********************************************************************************/

    var openMainPage=function(user) // user is a copy of the original user 
    {
        correntUser[0] = user;
        var context = topHeader.inputSection+nav.inputSection;
        $("body").html(context);
        $("#userName_lbl").html(correntUser[0].firstName);

        $("#homePage").click(function(){
            $('.Nav').collapse('hide');
            loadGeneralMessages();
        });
        loadGeneralMessages();

        //listeners
		$("#addUser_btn").click(usersManagement.addUser);
        $("#btnEditUser").click(usersManagement.editUser);
        $("#addClubhouse_btn").click(clubhouseManagement.addClubhouse);
        $("#editClubhouse_btn").click(clubhouseManagement.editClubhouse);
        $("#MessNav").click(unReadMess);
        $("#writeMessage_btn").click(inMassagePage.openSendMassage);
        $("#incomingMessage_btn").click(inMassagePage.openInBoxMes);
        $("#outMessage_btn").click(outMessagePage.open);
        $("#logout").click(logout);
        $("#logout1").click(logout);
    }

/***********************************************************************************/

    var unReadMess=function()
    {
        var me = login.correntUser[1];        
        firebase.database().ref("users/" + me + "/inboxMessages").once("value")
        .then(function(data)
        {
            var messages = data.val();
            if (messages !== null)
            {
                var count=0;
                var keys = Object.keys(messages);
                for(var i=keys.length-1;i>=0;i--)
                    if(!messages[keys[i]].isRead)
                        count++;
                if(count>0)
                     $("#incomingMessage_btn").html("("+count+")"+"דואר נכנס");
                else
                     $("#incomingMessage_btn").html("דואר נכנס");
			}
        });
       
    }

/***********************************************************************************/

    var loadGeneralMessages = function()
    {
        var myType = login.correntUser[0].userType;
        if(myType == User.ADMIN || myType == User.SOCIAL)
            loadAllClubs();
        else
        {
            $("#body").html("");
            loadHomePage();
        }
    }

/***********************************************************************************/

    var loadAllClubs = function()
    {
        var clubhouses = login.correntUser[0].clubhouseKey;
        var myType = login.correntUser[0].userType;

        firebase.database().ref("clubhouse/").once("value")
        .then(function(data)
        {
            $("#body").html("");
            var clubs = data.val();
            var keys = Object.keys(clubs);
            for(var i=0;i<keys.length;i++)
            {
                if(myType == User.SOCIAL)
                { 
                for(var j=0;j<clubhouses.length;j++) 
                    if(clubhouses[j]==keys[i])
                        addToHomePage(i,clubs,keys,j);
                }
                else
                {
                    var j=i;
                    addToHomePage(i,clubs,keys,j);
                }
            }
        });
    }

/***********************************************************************************/

    var addToHomePage = function(i,c,k,j)
    {
        var tempBtnID = 'btn_'+j;
        var btnInput = 
        '<a id="'+tempBtnID+'" class="btn btn-sq-lg btn-primary clubSquare">'+
        '<i class="fa fa-home fa-2x"></i><br/> ' +c[k[i]].name + '</a>';
        $("#body").append(btnInput);
        paintButton(j);

        $("#"+tempBtnID).click(function(e)
        {
            $("#loader").css("display", "inline-block");
            setTimeout(function()
            { 
            var id=e.target.id;
            id=id.substring(4,id.length);  
                firebase.database().ref("clubhouse/").once("value")
                .then(function(data)
                { 
                    var clubs = data.val();
                    var keys = Object.keys(clubs); 
                    $("#body").html("");

                    login.correntClub[0]=keys[id];
                    loadHomePage(keys[id]); 
                });
            }, 1000);
        });
    }

/***********************************************************************************/

    var loadHomePage = function(clubKey)
    {
        var curClubKey;
        var myType = login.correntUser[0].userType;
        
        if(myType == User.ADMIN || myType == User.SOCIAL)
            curClubKey=clubKey;
        else
            curClubKey = login.correntUser[0].clubhouseKey;

        $("#body").append('<div id="mesBody"></div>');
        firebase.database().ref("clubhouse/" + curClubKey + "/generalMessages").once("value")
        .then(function(data)
        {
            var EVERYONE = 2;
            var messages = data.val();
            if (messages !== null)
            {
                $("#mesBody").html("");
                var keys = Object.keys(messages);
                for(var i=keys.length-1;i>=0;i--)
                {    
                    if(myType > 1 || myType == messages[keys[i]].permision || messages[keys[i]].permision == EVERYONE)
                    {
                        Message.addGenMes(messages[keys[i]],i);
                        $("#deleteMessage_"+i).click(function(i)
                        {
                            var index=i.currentTarget.id;
                            index=index.substring(14,index.length);
                            $("#generalMessageBox_"+index).remove();
                            Message.deleteGenMessage(index);
                        });
                    }
                }
            }
        });
    }

/***********************************************************************************/

    var paintButton = function(i)
    {        
        var tempBtnID = 'btn_'+i;
        if(i%5==0) /*red*/
        {
            $("#"+tempBtnID).css("background", "#D31027");
            $("#"+tempBtnID).css("background", " -webkit-linear-gradient(to top, #EA384D, #D31027)");
            $("#"+tempBtnID).css("background", "linear-gradient(to top, #EA384D, #D31027)");     
        }
        if(i%5==1)  /*green*/ 
           $("#"+tempBtnID).css("background-image","url(images/green.png)");
        if(i%5==2)  /*blue*/ 
        {
            $("#"+tempBtnID).css("background", "#396afc");
            $("#"+tempBtnID).css("background", "-webkit-linear-gradient(to bottom, #2948ff, #396afc)");
            $("#"+tempBtnID).css("background", "linear-gradient(to bottom, #2948ff, #396afc)");
        } 
        if(i%5==3)  /*pink*/
        {
            $("#"+tempBtnID).css("background", "#834d9b");
            $("#"+tempBtnID).css("background", "-webkit-linear-gradient(to bottom, #d04ed6, #834d9b)");
            $("#"+tempBtnID).css("background", "linear-gradient(to bottom, #d04ed6, #834d9b)"); 
        }
        if(i%5==4)  /*orange*/  
            $("#"+tempBtnID).css("background-image","url(images/yellow.jpg)");
    }

/***********************************************************************************/

    var logout = function()
    {
        if(confirm('בטוח שברצונך להתנתק מהמערכת?')) 
            login.initModule();
        else 
            return;
     }
    return {openMainPage:openMainPage, correntUser:correntUser,
    loadHomePage:loadHomePage}
}();