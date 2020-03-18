describe("Lyte : testing eq() function",function()
{
	it("checking for positive index of an array of DOM",function()
	{
		arr=$L('.filter')
		x=arr.eq(0)
		expect($(x).text()).toBe('0');
	})
	xit("checking for positive index of an array of numbers",function()
	{
		arr=[1,2,3]
		x=$(arr).eq(0);
		expect((x[0])).toBe(1);
		x=$L(arr).eq(0);// Lyte returns empty object
		expect((x[0])).toBe(1);
	})
	it("checking for negative index of an array of DOM",function()
	{
		arr=$L('.filter')
		x=arr.eq(-1)
		expect($(x).text()).toBe('6');
	})
	xit("checking for negative index of an array of numbers",function()
	{
		arr=[1,2,3]
		x=$(arr).eq(-1);
		expect((x[0])).toBe(3);
		x=$L(arr).eq(-1);// Lyte returns empty object
		expect((x[0])).toBe(3);
	})
	it("checking for out of bound index of an array of DOM returns empty object",function()
	{
		arr=$L('.filter')
		x=arr.eq(9)
		expect($(x).text()).toBe('');
	})
	it("checking without index for an array of DOM returns empty object",function()
	{
		arr=$L('.filter')
		x=arr.eq()
		expect($(x).text()).toBe('');
	})
	it("checking with invalid argument - returns empty object",function()
	{
		arr=$L('.filter')
		x=arr.eq(1.2)
		expect($(x).text()).toBe('');	
		y=arr.eq("a")
		expect($(y).text()).toBe('');	

	})
	it("checking with more than one argument - considers first argument",function()
	{
		arr=$L('.filter')
		x=arr.eq(1,2,3)
		expect($(x).text()).toBe('1');	
	})
	it("checking without array - throws error eq is not defined ",function()
	{
		var ter=function()
		{
			x=eq(0)
		}
		expect(ter).toThrow();
	})
	xit("checking with selector that doesn't exist- null  ",function()
	{
		x=$('p').eq(0)
		y=$L('p').eq(0)
		expect(x).toEqual(y);
	})
	xit("checking with array of objects - return nth index of object",function()
	{
		var a=[{ x:0 , y:1 , z:2},{ x:1 , y:2 , z:3}];
		b=$L(a).eq(0)
		expect(b[0]).toEqual({x:0 , y:1 , z:2})
	})
})

describe("Lyte : testing first() function",function()
{
	it("checking for first of an array of DOM",function()
	{
		arr=$L('.filter')
		x=arr.first()
		expect($(x).text()).toBe('0');
	})
	xit("checking for first of an array of numbers",function()
	{
		arr=[1,2,3]
		x=$(arr).first();
		expect((x[0])).toBe(1);
		x=$L(arr).first()    // Lyte returns empty object
		expect((x[0])).toBe(1);
	})
	
	it("checking with an argument for an array of DOM - not considering the argument",function()
	{
		arr=$L('.filter')
		x=arr.first(1)
		expect($(x).text()).toBe('0');
	})
	it("checking without array - throws error eq is not defined ",function()
	{
		var ter=function()
		{
			x=first(0)
		}
		expect(ter).toThrow();
	})
	xit("checking with selector that doesn't exist - throws error eq is ",function()
	{
		x=$('p').first(0)
		y=$L('p').first(0)
		expect(y).toEqual(x);
	})
	xit("checking with array of objects - return nth index of object",function()
	{
		var a=[{ x:0 , y:1 , z:2},{ x:1 , y:2 , z:3}];
		b=$L(a).first()
		expect(b[0]).toEqual({x:0 , y:1 , z:2})
	})
})
describe("Lyte : testing last() function",function()
{
	it("checking for first of an array of DOM",function()
	{
		arr=$L('.filter')
		x=arr.last()
		expect($(x).text()).toBe('6');
	})
	xit("checking for first of an array of numbers",function()
	{
		arr=[1,2,3]
		x=$(arr).last();
		expect((x[0])).toBe(3);
		x=$L(arr).first()    // Lyte returns empty object
		expect((x[0])).toBe(3);
	})
	
	it("checking with an argument for an array of DOM - not considering the argument",function()
	{
		arr=$L('.filter')
		x=arr.last(1)
		expect($(x).text()).toBe('6');
	})
	it("checking without array - throws error eq is not defined ",function()
	{
		var ter=function()
		{
			x=last(0)
		}
		expect(ter).toThrow();
	})
	xit("checking with selector that doesn't exist - throws error eq is ",function()
	{
		x=$('p').last()
		y=$L('p').last()
		expect(y).toEqual(x);
	})
	xit("checking with array of objects - return nth index of object",function()
	{
		var a=[{ x:0 , y:1 , z:2},{ x:1 , y:2 , z:3}];
		b=$L(a).last()
		expect(b[0]).toEqual({x:1 , y:2 , z:3})
	})
})
describe("Lyte : testing eq() Selector function",function()
{
	it("checking eq selector array of DOM objects with positive index",function()
	{
		x=$L('.filter:eq(1)')
		expect($(x).text()).toBe('1')	
	})
	it("checking eq selector array of DOM objects with negative index",function()
	{
		x=$L('.filter:eq(-1)')
		expect($(x).text()).toBe('6')		
	})
	it("checking eq selector that doesn't exist - returns empty object",function()
	{
		x=$L('p:eq(1)')
		expect($(x).text()).toBe('')
	})
	it("checking eq selector without argument - returns empty object",function()
	{
		x=$L('.filter:eq()')
		expect($(x).text()).toBe('0')
	})
	it("checking eq selector with more than one argument - returns empty object",function()
	{
		x=$L('.filter:eq(1,2,3)')
		expect($(x).text()).toBe('')
	})
	it("checking eq selector with invalid argument - returns empty object",function()
	{
		x=$L('.filter:eq(1.2)')
		expect($(x).text()).toBe('')
	})
	it("checking eq selector with out of bound argument - returns empty object",function()
	{
		x=$L('.filter:eq(13)')
		expect($(x).text()).toBe('')
	})
	it("checking  for eq without selector - considers all tags",function()
	{
		x=$(':eq(13)')
		expect($(x).text()).toBe('0')
	})
})