var objects =
{
	list: [],
	
	initialize: function()
	{
		this.list.push({
			objChar: " ",
			desc: "Empty",
			walkable: true
		});
		
		this.list.push({
			objChar: "W",
			desc: "Ocean",
			walkable: false
		});
	},
	
	getObjectByChar: function(searchChar)
	{
		return this.list.find(obj => {
		  return obj.objChar === searchChar
		});
	}
};