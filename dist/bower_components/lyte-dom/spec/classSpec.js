describe("Lyte - testing addClass()",function()
{
	it("adding class by selector - className argument",function()
	{
		$L('.filter').addClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter adc');     //Space in string
		$('div').removeClass('adc')
	})
	it("adding class by selector - callback function",function()
	{
		$L('div').addClass(function(i , c)
		{
			if(c==='filter')
			{
				return 'adc'
			}
		})
		expect(document.getElementById('x1').className).toEqual('filter adc');     //Space in string
		$('div').removeClass('adc')		
	})
	it("adding class by selector - without argument",function()
	{
		$L('.filter').addClass()
		expect(document.getElementById('x1').className).toEqual('filter');     //Space in string
		$('div').removeClass('adc')
	})
	it("adding class by selector - with more than one class argument",function()
	{
		$L('.filter').addClass('adc col')
		expect(document.getElementById('x1').className).toEqual('filter adc col');     //Space in string
		$('div').removeClass('adc col')
	})	
	it("adding class by selector - with both class argument and callback - consider only first argument",function()
	{
		$L('div').addClass('adc',function(i,c)
		{
			if(c==='filter')
			{
				return 'col'
			}
		})
		expect(document.getElementById('x1').className).toEqual('filter adc');     //Space in string
		$('div').removeClass('adc col')
	})
	it("adding class by selector - unavailable class as argument",function()
	{
		$L('.filter').addClass('adca')
		expect(document.getElementById('x1').className).toEqual('filter adca');     //Space in string
		$('div').removeClass('adca')
	})	
	it("adding class by selector - already added class as argument",function()
	{
		$L('.filter').addClass('filter')
		expect(document.getElementById('x1').className).toEqual('filter');     //Space in string
	})	
	it("adding class by selector - consecutive addClass",function()
	{
		$L('.filter').addClass('adc').addClass('col')
		expect(document.getElementById('x1').className).toEqual('filter adc col');     //Space in string
		$('div').removeClass('adc col')
	})
	it("adding class with unavailable selector ",function()
	{
		$L('p').addClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');     //Space in string
		$('div').removeClass('adc col')
	})
	it("adding class without selector ",function()
	{
		$L('').addClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');     //Space in string
		$('div').removeClass('adc col')
	})
})
describe("Lyte - testing removeClass",function()
{
	it("removing class by selector - className argument",function()
	{
		$('.filter').addClass('adc')
		$L('.filter').removeClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');     
	})
	it("removing class by selector - callback function",function()
	{
		$('.filter').addClass('adc')		
		$L('div').removeClass(function(i , c)
		{
			if(c==='filter adc')
			{
				return 'adc'
			}
		})
		expect(document.getElementById('x1').className).toEqual('filter');  
	})
	it("removing class by selector - without argument - remove all classes",function()
	{
		$('div1').addClass('adc')
		$L('div1').removeClass()
		expect(document.getElementById('we').className).toBe('');   
	})
	it("adding class by selector - with more than one class argument",function()
	{
		$('.filter').addClass('adc col')
		$L('div').removeClass('adc col')
		expect(document.getElementById('x1').className).toEqual('filter');    
	})	
	it("removing class by selector - with both class argument and callback - consider only first argument",function()
	{
		$('.filter').addClass('adc col')
		$('.filter').removeClass('adc',function(i,c)
		{
			if(c==='filter')
			{
				return 'col'
			}
		})
		expect(document.getElementById('x1').className).toEqual('filter col');     
		$('div').removeClass('adc col')
	})
	it("removing class by selector - unavailable class as argument",function()
	{
		$L('.filter').removeClass('adca')
		expect(document.getElementById('x1').className).toEqual('filter');     
	})
	it("removing class by selector - already added class as argument",function()
	{
		$('.filter').addClass('adc')
		$L('.filter').removeClass('adc')
		$L('.filter').removeClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');   
	})
	it("removing class by selector - consecutive removeClass",function()
	{
		$('.filter').addClass('adc col')
		$L('.filter').removeClass('adc').removeClass('col')
		expect(document.getElementById('x1').className).toEqual('filter');    
	})
	it("removing class with unavailable selector ",function()
	{
		$L('p').removeClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');    
	})
	it("removing class without selector ",function()
	{
		$L('').removeClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');    
	})
})
describe("Lyte : testing hasClass() ",function()
{
	it("check for a class - available",function()
	{
		expect($L("div").hasClass('filter')).toBe(true)
	})
	it("check for a class - not available",function()
	{
		expect($L("div").hasClass('fil')).toBe(false)
	})
	it("check for a class - available in another selector",function()
	{
		expect($L("div1").hasClass('filter')).toBe(false)
	})
	it("check for a class - unavailable selector",function()
	{
		expect($L("p").hasClass('filter')).toBe(false)		
	})
	it("check for a class - without selector",function()
	{		
		expect($L().hasClass('filter')).toBe(false)
	})
	it("check for a class - without argument",function()
	{
		expect($L("div1").hasClass()).toBe(false)
	})
	it("check for a class - with more than one argument - true atleast one class present",function()
	{
		expect($L("span").hasClass('adc' ,'col' , 'filter')).toBe(true)
	})
})
describe("Lyte : testing toggleClass()",function()
{
	it("check for toggle a class",function()
	{
		$L('.filter').toggleClass('adc');
		expect(document.getElementById('x1').className).toEqual(' filter adc ')
		$L('.filter').toggleClass('adc');
		expect(document.getElementById('x1').className).toEqual('filter')
	})
	it("check for toggle a class with boolean - class added for true removed for false",function()
	{
		x=1;
		$L('.filter').toggleClass('adc',x===1);
		expect(document.getElementById('x1').className).toEqual(' filter adc ')
		$L('.filter').toggleClass('adc',x!==1);
		expect(document.getElementById('x1').className).toEqual('filter')
	})
	xit("check for toggle a class with callback",function()
	{
		// Lyte works without else part
		// $('div').toggleClass(function()
		// {
		// 	if(this.className==='filter')
		// 		return 'adc';
		// 	else 
		// 		return '';
		// })
		// $('div').toggleClass(function()
		// {
		// 	if(this.className==='filter adc')
		// 		return 'adc';
		// 	else 
		// 		return '';
		// })
		$L('div').toggleClass(function()
		{
			if(this.className==='filter')
			{
				return 'adc';
			}
			else 
			{
				return '';
			}
		},true)
		expect(document.getElementById('x1').className).toEqual(' filter adc ')
		$L('div').toggleClass(function()
		{
			if(this.className===' filter adc ')
			{
				return 'adc';
			}
			else 
			{
				return '';
			}
		},false)
		expect(document.getElementById('x1').className).toEqual('filter')		
	})
	xit("check for toggle a class only with boolean argument - class added for true removed for false",function()
	{
		$L('#x1').toggleClass(false);
		expect(document.getElementById('x1').className).toEqual('')
		$L('#x1').toggleClass(true);
		expect(document.getElementById('x1').className).toEqual('filter')
	})
	xit("check for toggle a class without argument - add and remove all classes",function()
	{
		$L('#x1').toggleClass();
		expect(document.getElementById('x1').className).toEqual('')
		$L('#x1').toggleClass();
		expect(document.getElementById('x1').className).toEqual('filter')
	})
	it("check for toggle a class with more than one class argument - add and remove classes",function()
	{
		$L('#x1').toggleClass("adc col");
		expect(document.getElementById('x1').className).toEqual('  filter adc  col ')
		$L('#x1').toggleClass("adc col");
		expect(document.getElementById('x1').className).toEqual('filter')
	})
	it("check for toggle a class with class argument and callback - only considers first argument",function()
	{
		$L('#x1').toggleClass("adc",function()
			{
				return "col"
			});
		expect(document.getElementById('x1').className).toEqual(' filter adc ')
		$L('#x1').toggleClass("adc");
		expect(document.getElementById('x1').className).toEqual('filter')
	})
	it("check for toggle class with consecutive toggleClass - add and remove classes",function()
	{
		$L('#x1').toggleClass("adc").toggleClass("col");
		expect(document.getElementById('x1').className).toEqual('  filter adc  col ')
		$L('#x1').toggleClass("adc").toggleClass("col");
		expect(document.getElementById('x1').className).toEqual('filter')
	})
	it("toggle class with unavailable selector ",function()
	{
		$L('p').toggleClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');     //Space in string
	})
	it("toggle class without selector ",function()
	{
		$L('').toggleClass('adc')
		expect(document.getElementById('x1').className).toEqual('filter');     //Space in string
	})
})
describe("Lyte : testing parent() function",function()
{
	it("check parent of a node",function()
	{
		 var p = $L( '#x1' ).parent()
		 expect($(p).get(0).tagName).toBe('DIV1');
	})
	xit("check parent of a node - with class as argument",function()
	{
		//Lyte not consdering the argument parent(...)
		 var p = $L( 'div' ).parent('.f1')
		 expect(p[0].tagName).toBe('DIV1');
	})
	xit("check parent of a node - with more than one class as argument",function()
	{
		//Lyte not consdering the argument parent(...)
		 var p = $L( 'b' ).parent('.adc,.col')
		 expect(p[0].tagName).toBe('SPAN');
	})
	xit("check parent of a node - with unavailable class as argument",function()
	{
		//Lyte not consdering the argument parent(...)
		var p = $L( 'div' ).parent('.adca')
		expect(p[0]).toBeUndefined();
	})
	it("check parent of a node - with unavailable selector",function()
	{
		var p = $L( 'p' ).parent()
		expect(p[0]).toBeUndefined();
	})
	it("check parent of a node - without selector",function()
	{
		var p = $L(  ).parent()
		expect(p[0]).toBeUndefined();
	})
})
describe("Lyte : testing find() function",function()
{
	it("finding an element",function()
	{
		expect($L( "span" ).find( 'b' )[0].innerText).toBe('hello');
	})
	it("finding an unavailable element",function()
	{
		expect($L( "span" ).find( 'b1' )[0]).toBeUndefined();
	})
	it("find() - without argument",function()
	{
		expect($L( "span" ).find(  )[0]).toBeUndefined();
	})
	xit("find() - without selector",function()
	{
		//Lyte returns value but it shouldn't
		expect($L(  ).find( 'b' )[0]).toBeUndefined();
	})
	it("find() - with invalid argument",function()
	{
		//Lyte returns value but it shouldn't
		expect($L( 'span' ).find( '12qz' )[0]).toBeUndefined();
	})
	it("find() - with more than one argument - considers first argument",function()
	{
		expect($L( "span" ).find( 'b', 'b1' )[0].innerText).toBe('hello');
	})
})
describe("Lyte : testing closest() function",function()
{
	it("find closest element",function()
	{
		expect($L('b').closest('span')[0].tagName).toBe('SPAN')
	})
	it("find closest element - without argument",function()
	{
		expect($L('b').closest()[0]).toBeUndefined()
	})
	it("find closest element - unavailable argument",function()
	{
		expect($L('b').closest('p')[0]).toBeUndefined()
	})
	it("find closest element - without selector",function()
	{
		expect($L().closest('span')[0]).toBeUndefined()
	})
	it("find closest element - more than one argument - considers first argument",function()
	{
		expect($L('b').closest('i',document.getElementById('z'))[0]).toBeUndefined()
	})
})
describe("Lyte : testing is() function",function()
{
	it("is() with selector",function()
	{
		expect($L('.filter').is('div')).toBe(true)
	})
	it("is() with unavailable selector",function()
	{
		expect($L('.fil').is('div')).toBe(false)
	})
	it("is() with more than one selector",function()
	{
		expect($L('.adc .col').is(':first-child')).toBe(true)
	})
	xit("is() without argument",function()
	{
		//Lyte throws error
		expect($L('.adc .col').is()).toBe(false)
	})
	it("is() with more than one argument",function()
	{
		expect($L('.adc.col').is('span','i')).toBe(true)		
	})
	it("is() with callback function",function()
	{
		x=$L('div').is(function()
		{
			return(document.getElementById('x1'))
		})
		expect(x).toBe(true)
	})
})
