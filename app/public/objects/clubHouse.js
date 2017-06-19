var clubHouse = function(name,address)
{
		this.name = name;
        this.address = address;
        this.ClubhouseDBkey;  
		var create = function(name,address)
		{
			return{
				
				name:name,
				address:address,
				ClubhouseDBkey:""
			}
		}
		return {create:create}
		
}();