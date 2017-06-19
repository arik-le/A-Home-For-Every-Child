var User = function(username,password)
{
	const PUSER = 0;
	const TUSER = 1;
	const GUSER = 2;
	const SWUSER = 3;
	const ADMIN = 4;

	var create = function(username,firstName,lastName,userType,clubhouseKey,userKey,childName)
	{
		var d = new Date();
		return{
			username:username,
			firstName:firstName,
			lastName:lastName,
			userType:userType,
			userKey:userKey,
			date:d.toDateString(),
			inboxMessages:[],
			outboxMessages:[],
			generalMessages:[],
			clubhouseKey:clubhouseKey,
			childName:childName
		}
	}
	return {create:create,
			PARENT:PUSER,
			TEACHER:TUSER,
			GUIDE:GUSER,
			SOCIAL:SWUSER,
			ADMIN:ADMIN }
		
}();