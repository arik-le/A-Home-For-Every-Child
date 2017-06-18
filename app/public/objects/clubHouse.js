var clubHouse = function(name,address)
{
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
				ClubhouseDBkey:""
			}
		}
		return {create:create}
		
}();