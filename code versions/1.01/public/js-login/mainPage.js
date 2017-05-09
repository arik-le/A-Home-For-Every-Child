var mainPage=function()
{
    var topHeader={
        inputSection:
            '<div class=topHeader>'+
                '<button type="button" class="btn btn-default btn-sm">'+
                '<span class="glyphicon glyphicon-log-out"></span> התנתק/י'+
                '</button>'+
                '<label id="userName_lbl"></label>'+
                '<span class="glyphicon glyphicon-user"></span>'+   
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
    var addHeader=function(user)
    {
        
        var t=topHeader.inputSection+nav.inputSection;
        $("body").html(t);
        $("#userName_lbl").html(user.username);
        alert("sadads");
        if(user.type==3)
        {
            console.log("sdasdsa");
            $("#option").after( '<li><a  href="#">עריכת משתמש</a></li>');
        }
    }

    return {addHeader:addHeader}
}();
