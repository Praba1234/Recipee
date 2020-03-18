describe("Lyte : testing attr() function",function()
{
	it("with available attribute",function()
	{
		x=$L('div').attr('class')
		expect(x).toBe('filter')
	})
	xit("with unavailable attribute",function()
	{
		x=$L('div').attr('style')
		expect(x).toBeUndefined() // return null
	})
	it("changing attribute",function()
	{
		$L('#x1').attr('style','color:blue')
		expect(document.getElementById('x1').style.color).toBe('blue')
		$L('#x1').attr('style','color:red')
	})
	it("adding attribute",function()
	{
		$L('#z').attr('style','color:blue')
		expect(document.getElementById('z').style.color).toBe('blue')
		$('#z').removeAttr('style')
	})
	it("attr with function",function()
	{
		$L('div').attr('class',function(i)
		{
			if(i==3)
			{
				return 'adc';
			}
		})
		expect(document.getElementById('x1').className).toBe('adc')
		$L('#x1').attr('class','filter')	
	})
	xit("without argument",function()
	{
		var ter=function()
		{
			x=$L('div').attr('style')
		
		}
		expect(ter).toThrow() // return undefined
	})
	xit("with empty argument",function()
	{
		x=$L('div').attr('')
		expect(x).toBeUndefined() // returns null
	})
})
describe("Lyte : testing removeAttr() function",function()
{
	it("with available attribute",function()
	{
		$L('#x1').removeAttr('class')
		x=document.getElementById('x1')
		expect(x.className).toBe('')
		$('#x1').attr('class','filter')
	})
	it("with unavailable attribute",function()
	{
		x=$L('#z').removeAttr('style')
		expect(x.className).toBeUndefined()  
	})
	xit("without argument",function()
	{
		x=$L('#x1').removeAttr()
		expect(x[0].className).toBe('filter') // throws error
	})
	it("with empty argument",function()
	{
		x=$L('div').removeAttr('')
		expect(x[0].className).toBe('filter') // returns null
	})
	it("with more than one attribute",function()
	{
		$L('#x1').removeAttr('class','id')
		x=document.getElementById('x1')
		expect(x.className).toBe('')
		$('#x1').attr('class','filter')
	})
})
describe("Lyte : testing prop() function",function()
{
	it("checking changed prop value",function()
	{
		expect($L('#c1').prop('checked')).toBe(false)
		$('#c1').click();
		expect($L('#c1').prop('checked')).toBe(true)		
		$('#c1').click();
	})
	it("changing prop value with argument",function()
	{
		expect($L('#c1').prop('checked')).toBe(false)
		$L('#c1').prop('checked',true)
		expect($L('#c1').prop('checked')).toBe(true)		
		$('#c1').click();
	})
	it("changing prop value with function",function()
	{
		$L( "input" ).prop('disabled',function(i)
		{
    		if(i==1)
			{
			  	return true
			}
		});
		$('#c2').click();
		expect($L('#c2').prop('checked')).not.toBe(true)
		$('#c2').prop('disabled',false)
	})
	it("checking changed prop value",function()
	{
		expect($L('#c1').prop('checked')).toBe(false)
		$('#c1').click();
		expect($L('#c1').prop('checked')).toBe(true)		
		$('#c1').click();
	})
	xit("without argument",function()
	{
		var ter=function()
		{
			x=$L('div').prop()
		
		}
		expect(ter).toThrow() // return undefined
	})
	it("with empty argument",function()
	{
		x=$L('div').prop('')
		expect(x).toBeUndefined() 
	})
})
xdescribe("Lyte : testing removeProp() function",function()
{
	it("with available attribute",function()
	{
		$L('#x1').removeProp('class')
		x=document.getElementById('x1')
		expect(x.className).toBe('undefined')
		$('#x1').prop('class','filter')
	})
	it("with unavailable attribute",function()
	{
		x=$L('#z').removeProp('style')
		expect(x.className).toBeUndefined()  
	})
	it("without argument",function()
	{
		x=$L('#x1').removeProp()
		expect(x[0].className).toBe('filter') // throws error
	})
	it("with empty argument",function()
	{
		x=$L('div').removeProp('')
		expect(x[0].className).toBe('filter') // returns null
	})
	it("with more than one attribute",function()
	{
		$L('#x1').removeProp('class','id')
		x=document.getElementById('x1')
		expect(x.className).toBe('undefined')
		$('#x1').prop('class','filter')
	})
})
describe("Lyte : testing toArray() function",function()
{
	it("with available selector",function()
	{
		x=$L('.filter').toArray()
		expect(x[0].id).toBe('z')
	})
	it("with unavailable selector",function()
	{
		x=$L('.fil').toArray()
		expect(x[0]).toBeUndefined()
	})
	it("without selector",function()
	{
		x=$L().toArray()
		expect(x[0]).toBeUndefined()
	})
	it("with empty selector",function()
	{
		x=$L('').toArray()
		expect(x[0]).toBeUndefined()
	})
	xit("with numeric or char array",function()
	{
		x=$L(['a','b','c']).toArray()
		expect(x[0]).toBe("a")
	})
})
describe("Lyte : testing on() and off() functions",function()
{
	it("on and off an event",function()
	{
		function changeit()
		{
			$('#c3').prop({checked:false})
		}
		$L('#one').on('click',changeit)
		$('#c3').click()
		$('#one').click()
		$L('#one').off('click',changeit)
		$('#c3').click()
		expect($('#c3').prop('checked')).toBe(true)
		$('#c3').click()
	})
	it("on and off an event with selector",function()
	{
		function changeit()
		{
			$('#c3').prop({checked:false})
		}
		$L('body').on('click','#one',changeit)
		$('#c3').click()
		$('#one').click()
		$L('body').off('click','#one',changeit)
		$('#c3').click()
		expect($('#c3').prop('checked')).toBe(true)
		$('#c3').click()
	})
	it("on and off an event with selector and without handler",function()
	{
		function changeit()
		{
			$('#c3').prop({checked:false})
		}
		$L('#one').on('click')
		$('#c3').click()
		$('#one').click()
		expect($('#c3').prop('checked')).toBe(true)
		$L('#one').off('click')
		$('#c3').click()
	})
	it("on and off an event with selector, data",function()
	{
		function changeit(event)
		{
			$('#c3').prop({checked:false})
			$('p').append(event.data)
		}
		$L('body').on('click','#one',1,changeit)
		$('#c3').click()
		$('#one').click()
		$L('body').off('click','#one',changeit)
		$('#c3').click()
		expect($('p').text()).toBe('Paragraph1')
		$('#c3').click()
		$('p').text('Paragraph')
	})
	xit("on and off non-browser events",function()
	{
		$L('p').on('func',function(event,data)
		{
			this.innerText+=data
		})
		$L('p').trigger('func','hello')  //trigger not defined
		expect($('p').text()).toBe('Paragraphhello')
		$L('p').off('func')
		$L('p').trigger('func','hello')
		$('p').text('Paragraph')
	})
	xit("on and off non-browser events and event.namespace",function()
	{
		$L('p').on('func',function(event,data)
		{
			this.innerText+=data
		})
		$L('p').on('click.func',function(event,data)
		{
			this.innerText+=data
		})
		$L('p').trigger('func','hello')  //trigger not defined
		expect($('p').text()).toBe('Paragraphhello')
		$L('p').trigger('click.func','hi')
		expect($('p').text()).toBe('Paragraphhellohi')
		$L('p').off('func')
		$L('p').off('click.func')
		$L('p').trigger('func','hello')
		$('p').text('Paragraph')
	})
})
describe("Lyte : testing val() function",function()
{
	it("val() of an element",function()
	{
		$('#s2').prop('selected','selected')
		expect($L('#single').val()).toBe('Single2')
		$('#s2').removeProp('selected')
	})
	xit("set val of an element with argument",function()
	{
		$L( "#multiple" ).val( "Multiple1" );
		expect($L('#multiple').val()).toBe('Multiple1')    
		$L( "#single" ).val( "Single2" );
		expect($L('#single').val()).toBe('Single2')    // not changing value
		$('#s2').removeProp('selected')
		$('#m1,#m3').removeProp('selected')
	})
	xit("set val of an element with function",function()
	{
		$L( "#multiple" ).val( function(i,v)
		{
			return ['Multiple1','Multiple3']
		});
		expect($L('#m1,#m3').prop('selected')).toBe(true)
		$L( "#single" ).val( function(i,v)
		{
			return 'Single2'
		});
		expect($L('#single').val()).toBe('Single2')    // not changing value
		$('#s2').removeProp('selected')
		$('#m1,#m3').removeProp('selected')
	})
})
describe("Lyte : testing css() function",function()
{
	xit("css() with property name as arugumrnt",function()
	{
		expect($L('#one').css('background-color')).toBe('rgb(255, 255, 0)')
	})
	xit("changing property value with css",function()
	{
		$L('#one').css('background-color','black')
		expect($L('#one').css('background-color')).toBe('rgb(0, 0, 0)')
		$L('#one').css('background-color','yellow')
	})
	xit("changing property value with css callback",function()
	{
		$L('#one').css('background-color',function()
		{
			return 'black';
		})
		expect($L('#one').css('background-color')).toBe('rgb(0, 0, 0)')
		$L('#one').css('background-color','yellow')
	})
})
xdescribe("Lyte : testing offset() function",function()
{
	it("offset() without argument",function()
	{
		x=$L('p').offset();
		expect(x.top).toBe(168)
	})
	it("offset() with argument",function()
	{
		$L('p').offset({top :170 , left : 10});
		x=$L('p').offset();
		expect(x.top).toBe(170)
		$L('p').offset({top :168 , left : 8});
	})
	it("offset() with argument and changing one coordinate",function()
	{
		$L('p').offset({top :170 });
		x=$L('p').offset();
		expect(x.top).toBe(170)
		expect(x.left).toBe(8)
		$L('p').offset({top :168 , left : 8});
	})
	it("offset() with invalid argument",function()
	{
		$L('p').offset({twer :170 , lasdf : 10});
		x=$L('p').offset();
		expect(x.top).toBe(168)
		$L('p').offset({top :168 , left : 8});
	})
})