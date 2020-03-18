describe("Lyte : testing $('').map() function",function()
{
	it("return selector's text",function()
	{
		arr=$L( ".filter" ).map(function() 
		{
    		return $( this ).text();
  		})
  		//$(arr).get()
		expect(arr[1]).toEqual('1');
	})
	it("function without selector - returns array is undefined",function()
	{
		arr=$L( '' ).map(function() 
		{
    		return $( this ).text();
  		})
		expect(arr[0]).toBeUndefined();
	})
	it("function with unavailable selector - returns array is undefined",function()
	{
		arr=$L( 'p' ).map(function() 
		{
    		return $( this ).text();
  		})
		expect(arr[0]).toBeUndefined();		
	})
	it("function returns index",function()
	{
		arr=$L( '.filter' ).map(function(i,e) 
		{
    		return i;
  		})
		expect(arr[6]).toBe(6);	
	})
	it("function without callback function - throws error",function()
	{
		var ter=function()
		{
			arr=$L( '.filter' ).map()
		}
		expect(ter).toThrow();	
	})
	xit("function with array - returns array ",function()
	{
		arr=$L( ['a','b','c'] ).map(function(i,e) 
		{
    		return e;
  		})
  		expect(arr[0]).toBe('a');	//returns undefined array	
	})
	xit("function with array of objects - returns array ",function()
	{
		arr=$L( {'a': 1, 'b': 2, 'c': 3} ).map(function(i,e) 
		{
    		return e;
  		})
  		expect(arr[0].a).toBe(1);	//returns undefined array	
	})
})
describe("Lyte : testing $('').each() function",function()
{
	it("returns selctor's text",function()
	{
		$L(".filter").each(function(i,e)
		{
			if(e.style.color==='red')
			{
				x=$(this).text()
			}
		})
		expect(x).toEqual('3');
	})
	it("stop iteration with false condition",function()
	{
		a=[]
		$L(".filter").each(function(i,e)
		{
			if(e.style.color==='red')
			{
				return false;
			}
			a[i]=$(this).text();
		})
		expect(a).toEqual(['0','1','2']);
	})
	it("function without selector - iterates nothing",function()
	{
		a=[]
		$L("").each(function(i,e)
		{
			a[i]=$(this).text();
		})
		expect(a).toEqual([]);
	})
	it("function with unavailable selector - iterates nothing",function()
	{
		a=[]
		$L("p").each(function(i,e)
		{
			a[i]=$(this).text();
		})
		expect(a).toEqual([]);
	})
	it("function without callback - throws error",function()
	{
		var ter=function()
		{
			arr=$L( '.filter' ).each()
		}
		expect(ter).toThrow();
	})
	xit("function with array - returns array ",function()
	{
		arr=$L( ['a','b','c'] ).each(function(i,e) 
		{
    		return e;
  		})
  		expect(arr[0]).toBe('a');	//returns undefined array	
	})
	xit("function with array of objects - returns array ",function()
	{
		arr=$L( {'a': 1, 'b': 2, 'c': 3} ).each(function(i,e) 
		{
    		return e;
  		})
  		expect(arr[0].a).toBe(1);	//returns undefined array	
	})
})