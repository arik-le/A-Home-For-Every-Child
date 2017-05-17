var appManagement = function ()
{
    //-------------------------------------------------------------------------------------------------
     // inside manu for management page 
    var headLine={
        inputSection:
            '<div class="container">'+
                '<ul class="nav nav-tabs  col-xs-12">'+
                    '<li class="active col-xs-4 usersMng"><a data-toggle="tab" href="#home">משתמשים</a></li>'+
                    '<li class="col-xs-4 clubHouseMng" ><a data-toggle="tab" href="#menu1">מועדוניות</a></li>'+
                    '<li class="col-xs-4 childrenMng" ><a data-toggle="tab" href="#menu1" >ילדים</a></li>'+
                '</ul>'+
            '</div>'+
            '<div id="ManagementList" class="container"></div>'
    }
    //-------------------------------------------------------------------------------------------------
   



//-------------------------------------------------------------------------------------------------
// Initial page for injecting the html components

     var initPage=function()
     {
            $("#body").html(headLine.inputSection);
            $(".usersMng").click (usersManagement.initPage);
     }

//-------------------------------------------------------------------------------------------------





    return{initPage:initPage};
}();