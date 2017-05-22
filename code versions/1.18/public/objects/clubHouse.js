var clubHouse = function(name,address)
{
		

        // all lists will be as an array and every new object adding will be added using push.

        // for Parent/Teacher users only
        //this.childName;

		this.name = name;
        this.address = address;
        this.ClubhouseDBkey;  
		var create = function(name,address)
		{
			/*this.PTusersList = [];           // list of parent or teacher user list - DB keys
       	 	this.childList = [];           // list of child info contains photo,name  
        	this.guidesList = [];        // list of all the guides / social workers with permission 
			*/
			return{
				
				name:name,
				address:address,
				PTusersList:[],
				childList:[],
				guidesList:[],
				ClubhouseDBkey:""
			}
		}
		return {create:create}
		
}();