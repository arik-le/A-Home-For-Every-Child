var User = function(username,password)
{
	const PUSER = 0;
	const TUSER = 1;
	const GUSER = 2;
	const SWUSER = 3;
	const ADMIN = 4;

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
	return {create:create,
			PARENT:PUSER,
			TEACHER:TUSER,
			GUIDE:GUSER,
			SOCIAL:SWUSER,
			ADMIN:ADMIN }
		
}();