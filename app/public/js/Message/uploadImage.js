var uploadImage=function()
{
        var myFileImg = [];


        $(document).on('change', '.btn-file :file', function() 
        {
            var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [label]);
        });

        $('.btn-file :file').on('fileselect', function(event, label) 
        {
            var input = $(this).parents('.input-group').find(':text'),
                log = label;
            if( input.length ) 
            {
                input.val(log);
            } 
            else 
            {
                if( log ) 
                    alert(log);
            }
        });
        function readURL(input) 
        {
            if (input.files && input.files[0]) 
            {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#img-upload').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
                myFileImg[0] = input.files[0];
                console.log(  myFileImg[0]);
                /*
                    var storageRef = firebase.storage().ref('/images/' + myFileImg[0].name);
                    var uploadTask = storageRef.put( myFileImg[0]);

                    // Register three observers:
                    // 1. 'state_changed' observer, called any time the state changes
                    // 2. Error observer, called on failure
                    // 3. Completion observer, called on successful completion
                    uploadTask.on('state_changed', function(snapshot){
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    }, function(error) {
                    // Handle unsuccessful uploads
                    }, function() {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    var downloadURL = uploadTask.snapshot.downloadURL;
                });
                */
            }
        }
        var init=function()
        {
            $("#imgInp").change(function(){
                readURL(this);
            }); 	
        }
        
    return{init:init,myFileImg:myFileImg};
}();