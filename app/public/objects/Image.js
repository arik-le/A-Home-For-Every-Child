var Image = function()
{
		var create = function(imageName,capacity)
		{
			return{
				imageName:imageName,
				capacity:capacity
			}
		}
		return {create:create}
		
}();