var User = function(username,password)
{
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
				clubhouseKey:clubhouseKey
			}
		}
		return {create:create}
		
}();