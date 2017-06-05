var User = function(username,password)
{
		var offline = 0;
		var online = 1;

        // all lists will be as an array and every new object adding will be added using push.

        // for Parent/Teacher users only
        //this.childName;
		
		var create = function(username,password,firstName,lastName,userType,clubhouseKey)
		{
			var d = new Date();
			return{
				username:username,
				password:password,
				firstName:firstName,
				lastName:lastName,
				userType:userType,
				userKey:0,
				date:d.toDateString(),
				inboxMessages:[],
				outboxMessages:[],
				generalMessages:[],
				clubhouseKey
			}
		}
		return {create:create}
		
}();