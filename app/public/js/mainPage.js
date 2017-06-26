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
    var createNavbar = function(){

        var myType = correntUser[0].userType;
        var str = 
        '<nav class="navbar navbar-default">'+
			'<div class="container-fluid">'+
				'<div class="navbar-header">'+
					'<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'+
						'<span class="sr-only">Toggle navigation</span>'+
						'<span class="icon-bar"></span>'+
						'<span class="icon-bar"></span>'+
						'<span class="icon-bar"></span>'+
					'</button>'+
                    '<a class="navbar-brand" href="#"><img src="images/logo.png" id="navLogo" alt="logo" class="nav-img"></a>'+

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
						'</li>';
                        if(myType < User.GUIDE)
                            str+='<li><a id="sendForms">שליחת טפסים</a></li>';
                        else if(myType >= User.GUIDE && myType !=User.ADMIN)
                        	str+='<li><a id="showClubHouseForms">טפסי מועדונית</a></li>';
                        else
                        {
						str+='<li role="separator" class="divider"></li>'+
                        '<li class="dropdown">'+
							'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">טפסים <span class="caret"></span></a>'+
                            '<ul class="dropdown-menu">'+
								'<li><a id="crateFormPage">יצירת טופס</a></li>'+
								'<li><a id="showClubHouseForms">טפסי מועדוניות</a></li>'+
								'<li role="separator" class="divider"></li>'+
							'</ul>'+
                        '</li>';
                        }
                        if(myType == User.ADMIN)
                        {
                        str+='<li class="dropdown">'+
							'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">ניהול משתמשים <span class="caret"></span></a>'+
							'<ul class="dropdown-menu">'+
								'<li><a id="addUser_btn">הוספת משתמשים</a></li>'+
								'<li><a id="btnEditUser">עריכת משתמשים</a></li>'+
								'<li><a id="addClubhouse_btn">הוספת מועדונית</a></li>'+
								'<li><a id="editClubhouse_btn">עריכת מועדונית</a></li>'+
								'<li role="separator" class="divider"></li>'+
							'</ul>'+
						'</li>'+
                        '<li role="separator" class="divider"></li>';
                        }
                
					str +='<li><a id="aboutUs_btn">אודות<span class="sr-only">(current)</span></a></li>'+
                    '</ul>'+
					'<ul class="nav navbar-nav navbar-right">'+
						'<li><a id="logout1">התנתק מהמערכת</a></li>'+
					'</ul>'+
				'</div>'+
			'</div>'+
		'</nav>'+
        '<div id="body"></div>';
        return str;
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

    var openMainPage=function(userUid) // user is a copy of the original user 
    {
        firebase.database().ref('users/'+userUid).once("value")
        .then(function(user)
        {
            correntUser[0]=user.val();
            var header = topHeader.inputSection;
            var addNavbar = createNavbar();

            $("body").html(header+addNavbar);
            $("#userName_lbl").html(correntUser[0].firstName);
            $("#homePage").click(function(){
                $('.Nav').collapse('hide');
                loadGeneralMessages();
            });
            loadGeneralMessages();

            //listeners
            $("#sendForms").click(formPage.loadAllForms);
            $("#crateFormPage").click(formPage.create);
            $("#addUser_btn").click(usersManagement.addUser);
            $("#btnEditUser").click(usersManagement.editUser);
            $("#addClubhouse_btn").click(clubhouseManagement.addClubhouse);
            $("#editClubhouse_btn").click(clubhouseManagement.editClubhouse);
            $("#MessNav").click(unReadMess);
            $("#writeMessage_btn").click(inMassagePage.openSendMassage);
            $("#incomingMessage_btn").click(inMassagePage.openInBoxMes);
            $("#outMessage_btn").click(outMessagePage.open);
            $("#aboutUs_btn").click(aboutUs.openAboutPage);
            $("#logout").click(logout);
            $("#logout1").click(logout);
            $("#showClubHouseForms").click(formPage.showFormsByPermission);
        });
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
            $("#body").css("text-align", "center");
            $("#body").append("<h2 id='allTitles'>בחר מועדונית</h2></p>")
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
        var tempBtnID = 'btn_'+j;
        paintButton(j,tempBtnID);

        $("#"+tempBtnID).click(function(e)
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
            $("#mesBody").html("");
            if(messages==null)
                $("#mesBody").append("<h1 id='allTitles' dir='rtl'>אין הודעות חדשות...<h1>");
            else
            {
                var keys = Object.keys(messages);
                $("#mesBody").append("<div id ='limitMes'> <h1 id='allTitles2' dir='rtl'>"+keys.length+"/"+sendMessagePage.CAPACITY_LIMIT+ " הודעות<h1></div>");
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

    var paintButton = function(i,tempBtnID)
    {        
        if(i%5==0) /*red*/
        {
            //button
            $("#"+tempBtnID).css("color", "#D31027");
            $("#"+tempBtnID).css("color", " -webkit-linear-gradient(to top, #EA384D, #D31027)");
            $("#"+tempBtnID).css("color", "linear-gradient(to top, #EA384D, #D31027)");
        }
        if(i%5==1)  /*green*/ 
        {
            //button
            $("#"+tempBtnID).css("color", "#33cc00");
            $("#"+tempBtnID).css("color", "-webkit-linear-gradient(to bottom, #339933  ,#33cc00)");
            $("#"+tempBtnID).css("color", "linear-gradient(to bottom, #339933, #33cc00)");
        }
        if(i%5==2)  /*blue*/ 
        {
            //button
            $("#"+tempBtnID).css("color", "#396afc");
            $("#"+tempBtnID).css("color", "-webkit-linear-gradient(to bottom, #0033dd, #396afc)");
            $("#"+tempBtnID).css("color", "linear-gradient(to bottom, #0033dd, #396afc)");
        } 
        if(i%5==3)  /*pink*/
        {
            //button
            $("#"+tempBtnID).css("color", "#834d9b");
            $("#"+tempBtnID).css("color", "-webkit-linear-gradient(to top, #d04ed6, #834d9b)");
            $("#"+tempBtnID).css("color", "linear-gradient(to top, #d04ed6, #834d9b)");
        }
        if(i%5==4)  /*orange*/  
        {
            //button
            $("#"+tempBtnID).css("color", "#F7971E");
            $("#"+tempBtnID).css("color", " -webkit-linear-gradient(to right, #FFD200, #F7971E)");
            $("#"+tempBtnID).css("color", "linear-gradient(to right, #FFD200, #F7971E)"); 
        }
    }

/***********************************************************************************/

    var logout = function()
    {
        if(confirm('בטוח שברצונך להתנתק מהמערכת?')) 
        {   
            login.initModule();
            firebase.auth().signOut();
        }
        else 
            return;
     }
    return {openMainPage:openMainPage, correntUser:correntUser,
    loadHomePage:loadHomePage,paintButton:paintButton}
}();