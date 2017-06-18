var fromPage=function()
{
var form=[];
    var createPage=function()
    {
        $("#body").html("");
        var str=
        '<div class="page">'+
            '<input type="text" class="form-control" name="name" id="formSubject" maxlength="20" placeholder="הכנס נושא שאלון " dir="rtl" />'+
        '</div>'+
        '<select class = "userCkecklist" id = "numOfOption" required >'+
                '<option value="5" >5</option>'+
                '<option value="10">10</option>'+
		'</select></br>'+
		'</select></br>'+

        '<a id="createForm_btn" class="btn btn-info btn-lg">צור</a>';
        
       /* '<a href="#" class="btn btn-info btn-lg">'+
          '<span class="glyphicon glyphicon-plus"></span> </a>';*/
        $("#body").html(str);
        $("#createForm_btn").click(createForm);
    }
    var p=function(s)
    {
        console.log(s);
    }
    var createForm=function()
    {
        var sub=document.getElementById("formSubject").value;
        var index=document.getElementById("numOfOption").value;
         form.push(Form.create(sub,index)) ;
    }
    return {
        createPage:createPage
    }
}();