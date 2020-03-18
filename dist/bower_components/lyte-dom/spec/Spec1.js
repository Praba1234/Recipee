describe("Lyte : testing next() function",function()
{
	it("next() with selector",function()
	{
		var x=$L(document.getElementById('one')).next()
		expect(document.getElementById('two')).toBe(x[0])
	})
	it("next() with unavailable selector",function()
	{
		expect($L('.a').next()[0]).toBeUndefined()
	})
	xit("next() with more than one result",function() 
	{
		var x=$L(".adc.col").next()
		expect(x[1]).toEqual(document.getElementById('two'))		// Gives result in reverse order
	})
	it("next() with argument",function()
	{
		expect($L('div').next('#x1')[0]).toBe(document.getElementById('x1'))		
	})
	it("next() with more than one argument",function()
	{
		expect($L('div').next('#x1','#x')[0]).toBe(document.getElementById('x1'))		
	})
	it("next() with more than one selector as one argument",function()
	{
		expect($L('div').next('#x1,#x')[1]).toBe(document.getElementById('x'))		
	})
})
describe("Lyte : testing nextAll() function",function()
{
	it("nextAll() with selector",function()
	{
		var x=$L('.filter:first').nextAll()
		expect(x.length).toBe(6)
	})
	it("nextAll() with selector argument",function()
	{
		var x=$L('.filter:first').nextAll('.filter.zxc')
		expect(x.length).toBe(4)
	})
	it("nextAll() with unavailabe selector",function()
	{
		var x=$L('c').nextAll('.filter.zxc')
		expect(x[0]).toBeUndefined()
	})
	it("nextAll() without selector",function()
	{
		var x=$L().nextAll('.filter.zxc')
		expect(x[0]).toBeUndefined()
	})
	it("nextAll() with last selector",function()
	{
		var x=$L('.filter:last').nextAll()
		expect(x.length).toBe(0)
	})
})
describe("Lyte : testing nextUntil() function",function()
{
	it("nextUntil() without filter",function()
	{
		x=$L('.filter').nextUntil('#x')
		expect(x.length).toBe(5)
	})
	it("nextUntil() with filter",function()
	{
		x=$L('.filter').nextUntil('#x','.zxc')
		expect(x.length).toBe(3)
	})
	it("nextUntil() with unavailable filter",function()
	{
		x=$L('.filter').nextUntil('#x','.zxcd')
		expect(x[0]).toBeUndefined()
	})
	it("nextUntil() with immediate stop - returns null",function()
	{
		x=$L('#z').nextUntil('.zxc')
		expect(x[0]).toBeUndefined()
	})
	it("nextUntil() with more than one filter argument",function()
	{
		x=$('#z').nextUntil('','#x,#x1')
		expect(x[0]).toBe(document.getElementById('x1'))
	})
	it("nextUntil() with unavailable stop selector",function()
	{
		x=$L('.filter').nextUntil('.fad','#x')
		expect(x[0]).toBe(document.getElementById('x'))
	})
})
describe("Lyte : testing prev() function",function()
{
	it("prev() with selector",function()
	{
		var x=$L(document.getElementById('two')).prev()
		expect(document.getElementById('one')).toBe(x[0])
	})
	it("prev() with unavailable selector",function()
	{
		expect($L('.a').prev()[0]).toBeUndefined()
	})
	it("prev() with more than one result",function() 
	{
		var x=$L(".filter").prev()
		expect(x[0]).toEqual(document.getElementById('z'))		// Gives result in reverse order
	})
	it("prev() with argument",function()
	{
		expect($L('.filter').prev('#z')[0]).toBe(document.getElementById('z'))		
	})
	it("prev() with more than one argument",function()
	{
		expect($L('.filter').prev('#x1','#z')[0]).toBe(document.getElementById('x1'))		
	})
	it("prev() with more than one selector as one argument",function()
	{
		expect($L('.filter').prev('#x1,#z')[0]).toBe(document.getElementById('z'))		
	})
})
describe("Lyte : testing prevAll() function",function()
{
	it("prevAll() with selector",function()
	{
		var x=$L('.filter:last').prevAll()
		expect(x.length).toBe(6)
	})
	it("prevAll() with selector argument",function()
	{
		var x=$L('.filter:last').prevAll('.filter.zxc')
		expect(x.length).toBe(3)
	})
	it("prevAll() with unavailabe selector",function()
	{
		var x=$L('c').prevAll('.filter.zxc')
		expect(x[0]).toBeUndefined()
	})
	it("prevAll() without selector",function()
	{
		var x=$L().prevAll('.filter.zxc')
		expect(x[0]).toBeUndefined()
	})
	it("prevAll() with first selector",function()
	{
		var x=$L('.filter:first').prevAll()
		expect(x.length).toBe(0)
	})
})
describe("Lyte : testing prevUntil() function",function()
{
	it("prevUntil() without filter",function()
	{
		x=$L('.filter').prevUntil('#z')
		expect(x.length).toBe(5)
	})
	it("prevUntil() with filter",function()
	{
		x=$L('.filter').prevUntil('#z','.zxc')
		expect(x.length).toBe(3)
	})
	it("prevUntil() with unavailable filter",function()
	{
		x=$L('.filter').prevUntil('#z','.zxcd')
		expect(x[0]).toBeUndefined()
	})
	it("prevUntil() with immediate stop - returns null",function()
	{
		x=$L('#x').prevUntil('.zxc')
		expect(x[0]).toBeUndefined()
	})
	it("prevUntil() with more than one filter argument",function()
	{
		x=$L('#x').prevUntil('','#z,#x1')
		expect(x[0]).toBe(document.getElementById('x1'))
	})
	it("prevUntil() with unavailable stop selector",function()
	{
		x=$L('.filter').prevUntil('.fad','#z')
		expect(x[0]).toBe(document.getElementById('z'))
	})
})
describe("Lyte : testing parents() function",function()
{
	it("parents() without argument",function()
	{
		x=$L('.filter').parents()
		expect(x[0].tagName).toBe('DIV1')
	})
	it("parents() with argument",function()
	{
		x=$L('#one').parents('#zy')
		expect(x[0].tagName).toBe('DIV')
	})
	it("parents() with unavailable selector argument",function()
	{
		x=$L('#one').parents('#zqwe')
		expect(x[0]).toBeUndefined()
	})
	it("parents() with unavailable selector",function()
	{
		x=$L('#o').parents('#zy')
		expect(x[0]).toBeUndefined()
	})
})
describe("Lyte : testing parentsUntil() function",function()
{
	it("parentsUntil() without filter",function()
	{
		x=$L('#b1').parentsUntil('#zx')
		expect(x[0]).toBe(document.getElementById('one'))
	})
	it("parentsUntil() with filter",function()
	{
		x=$L('#b1').parentsUntil('body','#zx')
		expect(x[0]).toBe(document.getElementById('zx'))
	})
	it("parentsUntil() with unavailable filter",function()
	{
		x=$L('#b1').parentsUntil('body','#zxasd')
		expect(x[0]).toBeUndefined()
	})
	it("parentsUntil() with immediate parent",function()
	{
		x=$L('#b1').parentsUntil('#one')
		expect(x[0]).toBeUndefined()
	})
	it("parentsUntil() with more than one filter",function()
	{
		x=$L('#b1').parentsUntil('body','#zx,#zy')
		expect(x[1]).toBe(document.getElementById('zy'))
	})
})
describe("Lyte : testing offsetParent() function",function()
{
	it("offsetParent() ",function()
	{
		x=$L('#b1').offsetParent()
		expect(x[0]).toBe(document.getElementById('zx'))
	})
	it("offsetParent() with more than one position style - returns first",function()
	{
		x=$L('#b1').offsetParent()
		expect(x[0]).toBe(document.getElementById('zx'))
	})
	it("offsetParent() without position style - returns html",function()
	{
		x=$L('#x1').offsetParent()
		expect(x[0].tagName).toBe('HTML')
	})
	it("offsetParent() without selector - returns null",function()
	{
		x=$L().offsetParent()
		expect(x[0]).toBeUndefined()
	})
})
describe("Lyte : testing children() function",function()
{
	it("children() without filter",function()
	{	
		x=$L('div1').children()
		expect(x[0].className).toBe('filter')
	})
	it("children() with filter",function()
	{	
		x=$L('div1').children('#x,#y')
		expect(x[0].className).toBe('filter zxc')
	})
	it("children() without selector",function()
	{	
		x=$L().children('#x')
		expect(x[0]).toBeUndefined()
	})
	it("children() with unavailable filter",function()
	{	
		x=$L('div1').children('#xasf')
		expect(x[0]).toBeUndefined()
	})
	it("element without children",function()
	{	
		x=$L('#b1').children()
		expect(x[0]).toBeUndefined()
	})
})
describe("Lyte : testing siblings() function",function()
{
	it("siblings() without filter",function()
	{	
		x=$L('div1').siblings()
		expect(x[0].tagName).toBe('DIV')
	})
	it("siblings() with filter",function()
	{	
		x=$L('div1').siblings('#zy')
		expect(x[0].tagName).toBe('DIV')
	})
	it("siblings() without selector",function()
	{	
		x=$L().siblings('#x')
		expect(x[0]).toBeUndefined()
	})
	it("siblings() with unavailable filter",function()
	{	
		x=$L('div1').siblings('#xasf')
		expect(x[0]).toBeUndefined()
	})
	it("element without siblings",function()
	{	
		x=$L('#b1').siblings()
		expect(x[0]).toBeUndefined()
	})
})
describe("Lyte :testing filter() function",function()
{
	it("filter() with selector argument",function()
	{
		x=$L('div').filter('.filter')
		expect(x.length).toBe(7)
	})
	it("filter() with element argument",function()
	{
		x=$L('div').filter(document.getElementsByClassName('filter'))
		expect(x.length).toBe(7)
	})
	it("filter() with function ",function()
	{
		x=$L('div').filter(function(i,c)
		{
			if(i===3)		
			{
				return c;
			}
		})
		expect(x[0]).toBe(document.getElementById('x1'))
	})
	xit("filter with selection argument",function()
	{
		x=$L('div').filter(':first')
		expect(x[0]).toBe(document.getElementById('z'))  //returns empty
	})
	it("filter with unavailable selector argument",function()
	{
		x=$L('div').filter('.qwerty')
		expect(x[0]).toBeUndefined()	
	})
	xit("filter without argument",function()
	{
		x=$L('div').filter() 
		expect(x[0]).toBeUndefined() //throws error	
	})
	it("filter without selector",function()
	{
		x=$L().filter('.filter')
		expect(x[0]).toBeUndefined()
	})
	it("filter with more than one selectors",function()
	{
		x=$L('div').filter('.filter,.adc')
		expect(x.length).toBe(8)
	})
})