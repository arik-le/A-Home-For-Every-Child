var mainPage=function()
{
    var topHeader={
          inputSection:
            '<div class="topHeader row">'+
                '<button type="button" class="btn btn-default btn-sm col-xs-4">'+
                '<span class="glyphicon glyphicon-log-out"></span> התנתק/י'+
                '</button>'+
                '<div class=" col-xs-6"></div>'+
                '<div class="hi" col-xs-2>'+
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
                    '<a href="#" class="navbar-drand pull-rigth"><img src="images/pictureLogo.jpg" alt="logo" class="nav-img"></a>'+
                        '<button id="btn-menu"class="navbar-toggle" data-toggle = "collapse" data-target = ".navHeaderCollapse">'+
                            '<span class="icon-bar"></span>'+
                            '<span class="icon-bar"></span>'+
                            '<span class="icon-bar"></span>'+
                        '</button>'+
                '</div>'+
                '<div class="collapse navbar-collapse navHeaderCollapse pull-right">'+
                    '<ul id="option" class="nav navbar-nav navbar-right">'+
                       '<li><a  href="#">דף הבית</a></li>'+ 
                       '<li><a  href="#">הודעות</a></li>'+   
                       '<li class="dropdown">'+
                                 '<a  href="#" class="dropdown-toggle " data-toggle="dropdown">טפסים</a>'+
                                '<ul  class="dropdown-menu pull-left">'+
                                    '<li><a  href="#">שליחה</a></li>'+ 
                                    '<li><a  href="#">צפיה</a></li>'+ 
                                '</ul>'+
                        '</li>'+
                       '<li><a  href="#">התנתק</a></li>'+       
                    '</ul>'+
                '</div>'+
            '</div>'+
        '</div>'
    }

    var generalMsg ={

        inputSection:
        ' <div class="GenMsgText row">הודעה כללית </div>'+
               ' <div class="sendFacilty row">'+
                    ' <div class="blank col-xs-3"></div>'+
                    '<div class="dropdown">'+
                        '<button class="btn btn-default dropdown-toggle  col-xs-6" type="button" id="faciltyManu" data-toggle="dropdown">בחר מועדונית<span class="caret"></span></button>'+
                        '<div class="dropdown-menu  pull-left col-xs-6">'+
                            '<li><a  href="#">מועדונית1</a></li>'+
                            '<li><a  href="#">מועדונית2</a></li>'+
                            '<li><a  href="#">מועדונית3</a></li>'+
                            '<li><a  href="#">מועדונית4</a></li>'+
                        '</div>'+
                    '</div>'+
                    '<div class="blank col-xs-3"></div>'+
                '</div>'+
                '<div class="sendToRow row">'+
                    '<div class="blank col-xs-7"></div>'+
                    '<div class ="sendToFac col-xs-5">:שלח אל</div>'+
                '</div>'+
                '<div class="userType row" style="max-height:300px; overflow: auto;"> '+ 
            	'<ul id="check-list-box"  class="list-group checked-list-box">'+
                  '<li class="list-group-item col-xs-4 userTypes"  type="checkbox" checked="checked" >הורים ומורים</li>'+
                  '<li class="list-group-item col-xs-4 userTypes" type="checkbox" checked="checked" >מורים</li>'+
                  '<li class="list-group-item col-xs-4 userTypes" type="checkbox" checked="checked">הורים</li>'+
                '</ul>'+
                '</div>'+
                 '<div class="msgSubject row">'+
                    '<div class="blank col-xs-7"></div>'+
                    '<div class ="sendToFac col-xs-5">:נושא</div>'+
                    '<input type="text" class="msgTitle col-xs-11" id="usr" col-xs-12 placeholder="נושא ההודעה">'+
                '</div>'+
                '<div class="msgSubject row">'+
                    '<div class="blank col-xs-7"></div>'+
                    '<div class ="sendToFac col-xs-5">:תוכן ההודעה</div>'+
                   
                '</div>'+
                '<div class= "msg-info form-group-lg">'+
                         '<textarea rows="15"  class="msgBody col-xs-12 " id="usr"  placeholder="...כתוב כאן"></textarea>'+
                '</div>'+
                '<div class= "MsgButtons" rows="4">'+
                    '<div class="blank col-xs-3"></div>'+
                    '<button type="button" class="btn btn-success col-xs-3">שלח</button>'+
                    '<button type="button" class="btn btn-success col-xs-3" id="clrBtn">נקה</button>'+
                    '<div class="blank col-xs-3"></div>'+
                '</div>'
            
    }

    var myfunc = function()
    {
        var t=topHeader.inputSection+nav.inputSection+generalMsg.inputSection;
        $("body").html(t);
    }
    var addHeader=function(user)
    {
        
        var t=topHeader.inputSection+nav.inputSection;
        $("body").html(t);
        $("#userName_lbl").html(user.username);
        alert("sadads");
        $("#msgManu").click(myfunc);
        if(user.type==3)
        {
            console.log("sdasdsa");
            $("#option").after( '<li><a  href="#">עריכת משתמש</a></li>');
           
        }
    }

    return {addHeader:addHeader}
}();
