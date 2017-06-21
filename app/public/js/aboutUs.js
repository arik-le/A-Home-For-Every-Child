var aboutUs=function()
{
    var aboutPage =
    {
    inputSection:
    
            '<h5 dir = "rtl">בית לכל ילד מעניקה מעטפת טיפולית מקיפה לילדים ומשפחות בסיכון. היא מובילה בטיפול לילדים בסיכון גבוה, מהגיל הרך ועד לגיל הנעורים, בזיקה לסביבתם הביתית והחינוכית. העמותה מפתחת מומחיות למניעת התעללות בילדים ורואה בשליחותה את המפתח לחיים בחברה טובה יותר</h5></br>'+

            '<div id = "contactUs" dir ="rtl">'+
				'<span style="font-size:12px" dir ="rtl">'+
				'<b class="Bold">צרו קשר:</b>'+
				'<br>כתובתנו: רחוב יד החרוצים 4 ת"ד 53355 ירושלים 93420</span></br>'+
				'<span style="font-size:12px" dir ="rtl">טלפון: 02-6333345, &nbsp;פקס: 02-6719650, &nbsp;&nbsp;דואל: '+
				'<span dir="LTR">office@bily.org.il</span></span>'+
			'</div></p>'+

            '<div id = "facebookLike" dir ="rtl">'+	
            '<span style="font-size:10px" dir ="rtl">'+
            '<b class="Bold">אתם מוזמנים להיכנס בכל עת לדף הפייסבוק שלנו ולעשות לנו like<b>'+
            '</br>'+
                '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBilyIsrael&tabs=timeline&width=340&height=100&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" id="coverImage" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'+
            '</br>'+
                '<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBilyIsrael%2F&width=88&layout=button_count&action=like&size=large&show_faces=false&share=false&height=21&appId" id="like_btn" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'+
            '</div>'+
            
            '<div id = "footerAllRights">'+
                '<span style="font-size:10px">'+
                '<b class="Bold">© all right reserved to AZRIELI - Collage of Engeneering Jerusalem - As part of a project of Software engineering in service to the community ,Page created at 15/06/17</b>'+
            '</div>'+
        '</div>'
    }

    var openAboutPage = function()
    {   
        $("#body").html("");
        $('.NAV').collapse('hide');
        $("#body").html(aboutPage.inputSection);
    }
    return {openAboutPage:openAboutPage};
}();