var a;
describe("Lyte : testing .map() function",function()
{
	it("Returning the same array",function()
	{
		arr=[1,2,3];
		
		al=$L.map(arr,function(n,i)
			{
				return [n];
			});
		
		expect(al).toEqual([1,2,3])
	})
	it("Size of the array is increased by returning an item twice",function()
	{
		arr=[1,2,3];
		
		al=$L.map(arr,function(n,i)
			{
				return [n,n];
			});
		expect(al).toEqual([1,1,2,2,3,3]);
	})
	it("Size of the array is decreased by not returning some items",function()
	{
		arr=[1,2,3];
		
		al=$L.map(arr,function(n,i)
		{
			return (i%2==0)?n:null;
		});
		expect(al).toEqual([1,3]);
	})
	it("Validating index of the array",function()
	{
		arr=[1,2,3];
		al=$L.map(arr,function(n,i)
		{
			return i;
		});
		expect(al).toEqual([0,1,2]);
	})
	it("Array of objects with user defined key values",function()
	{
		arr={fname : 'xxx', lname: 'yyy'};
		
		al=$L.map(arr,function(n,i)
		{
			return n;
		});
		
		aj=$L.map(arr,function(n,i)
		{
			return i;
		});
		expect(al).toEqual(['xxx','yyy']);
		expect(aj).toEqual(['fname','lname']);
	})
	it("Changing order of the objects in an array",function()
	{
		arr=['xxx', 'yyy','aaa','bbb'];
		al=$L.map(arr,function(n,i)
		{
			return arr[(i+2)%4];
		});
		expect(al).not.toEqual(['xxx','aaa','yyy','bbb']);
	})
	it("Nullifying an object in the array",function()
	{
		arr=[1,2,3,4];
		al=$L.map(arr,function(n,i)
		{
			if(i==2)
			{
				return null;
			}
			return n;
		});
		expect(al).toEqual([1,2,4]);
	})
	it("Nullifying the whole array",function()
	{
		arr=[1,2,3,4];
		al=$L.map(arr,function(n,i)
		{
			return ;
		});
		expect(al).	toEqual([]);
	})
	it(".map() without callback - throws error",function()
	{
		arr=[1,2,3,4];
		var ter=function() 
		{
			al=$L.map(arr)		
		}
		expect(ter).toThrow();
	})
	it(".map() without object - results an empty array ",function()
	{
		arr=[1,2,3,4];
		al=$L.map(function(n,i)
		{
			return n;
		})		
		expect(al).toEqual([	])
	})
	it(".map() without arguments - throws error ",function()
	{
		arr=[1,2,3,4];
		var ter=function() 
		{
			al=$L.map()		
		}
		expect(ter).toThrow();
	})

	it("returning undefined values - throws error",function()
	{
		arr=[1,2,3,4];
		x=function()
		{
			al=$L.map(arr,function(n,i)
			{
				return y;
			});
		}		
		expect(x).toThrow();
		
	})
	it("passing DOM objects and check style attribute of passed object",function()
	{
		arr=$('.filter')
		a=$L.map(arr,function(n,i)
		{
			if(n.style.color=='red')
			{
				return i;			
			}		
		});
		    expect(document.getElementsByTagName("div")[a].innerHTML).toBe('3');
	})
	it("passing DOM objects and changing innerHTML of the passed objects",function()
	{
		arr=$('.filter')
		a=$L.map(arr,function(n,i)
		{
				return n.innerHTML=i;			
		});
		    expect(document.getElementsByTagName("div")[3].innerHTML).toBe('3');
	})
	it("passing DOM objects and checking type",function()
	{
		arr=$('.filter')
		a=$L.map(arr,function(n,i)
		{
			return n;			
		});
		expect(typeof a).toBe(typeof arr);

	})
	it(" add and removal DOM objects",function()
	{
		arr=$('div')
		var x=0
		a=$.map(arr,function(n,i)
		{
			return n;
		});
		for(i=0;i<a.length;i++)
		{
		    expect(a[i]).toBe(arr[i]);
		}	
		var node = document.createElement("div");
		node.classList.add('filter')
   		var textnode = document.createTextNode("7");
    	node.appendChild(textnode);
		arr[6].appendChild(node);
		arr=$('div')
    	a1=$L.map(arr,function(n,i)
		{
			return n;
		});
		for(i=0;i<a1.length;i++)
		{
		    expect(a1[i]).toBe(arr[i]);
		}	
		expect(a1.length).toBe(a.length+1)
		
		a=$L.map(arr,function(n,i)
		{
			return n;
		});
		for(i=0;i<a.length;i++)
		{
		    expect(a[i]).toBe(arr[i]);
		}	
		var node = document.getElementById("x");
		var rm = node.childNodes[1];
   		node.removeChild(rm);
		arr=$('div')
		a1=$L.map(arr,function(n,i)
		{
			return n;
		});
		for(i=0;i<a1.length;i++)
		{
		    expect(a1[i]).toBe(arr[i]);
		}	
		expect(a1.length).toBe(a.length-1)
		
	})
})



describe("Lyte : testing .grep() function",function()
{
	it("grep with invert condition - false  ",function()
	{
		arr=[1,2,3,4,5]
		a=$L.grep(arr,function(n,i)
		{
			return (n%2!=0);
		})
		expect(a).toEqual([1,3,5]);
	})
	it("grep with invert condition - true ",function()
	{
		arr=[1,2,3,4,5]
		a=$L.grep(arr,function(n,i)
		{
			return (n%2!=0);
		},true)
		expect(a).toEqual([2,4]);
	})
	it("grep without return condition ",function()
	{
		arr=[1,2,3,4,5]
		a=$L.grep(arr,function(n,i)
		{
		})
		expect(a.length).toBe(0);
	})
	it("grep with filter function without passed array items",function()
	{
		arr=[1,2,3,4,5]
		a=$L.grep(arr,function(n,i)
		{
			return (x=='a')
		})
		expect(a.length).toBe(0);
	})
	it("grep without callback - throws error ",function()
	{
		arr=[1,2,3,4,5]
		var ter=function() 
		{
			a=$L.grep(arr)		
		}

		  expect(ter).toThrow();
	})
	it(".grep() without object - returns undefined array ",function()
	{
		arr=[1,2,3,4,5]
		var a;
		var ter=function() 
		{
			a=$L.grep(function()
			{
				return 1;
			})		
		}

		  expect(a).toBeUndefined();
	})
	it(".grep() without arguments - throws error ",function()
	{
		arr=[1,2,3,4,5]
		var ter=function() 
		{
			a=$L.grep()		
		}

		  expect(ter).toThrow();
	})


	it(".grep() with filter function based on index",function()
	{
		arr=[1,2,3,4,5]
		a=$L.grep(arr,function(n,i)
		{
			return (i%2!=0);
		})
		expect(a).toEqual([2,4]);
	})
	it(".grep() with filter function based on item type - isNaN()",function()
	{
		arr=[1,'q',3,4,'.']
		a=$L.grep(arr,function(n)
		{
			return (!isNaN(n));
		})
		expect(a).toEqual([1,3,4]);		
	})
	it(".grep() with array of DOM objects and filtered based on class of the objects",function()
	{
		arr=$('div')
		a=$L.grep(arr,function(n,i)
		{
			return ((n.className=='filter')?n:null);
		})		
		expect(a.length).toEqual(7);		
	})
	it(".grep() with array of DOM objects and filtered based on style attribute of the objects",function()
	{
		arr=$('div')
		a=$L.grep(arr,function(n,i)
		{
			return ((n.style.color=='red')?n:null);
		},true)		
		expect(a.length).toEqual(11);		
	})
})
describe("Lyte : testing .each() function",function()
{
	it("itereate in an array - checking value and index",function()
	{
		arr=[1,2,3,4,5]
		var a=[];	
		var b=[]
		$L.each(arr,function(i,n)
		{
			a[i]=n;
			b[i]=i;
		})
		expect(a).toEqual(arr)
		expect(b).toEqual([0,1,2,3,4])
	})
	it("itereate in an array - stop iteration with a condition",function()
	{
		arr=[1,2,3,4,5]
		var a=[];	
		$L.each(arr,function(i,n)
		{
			a[i]=n;
			return (i!==2)
		})
		expect(a).toEqual([1,2,3])
	})
	it(".each() without object - iterates nothing ",function()
	{
		arr=[1,2,3,4,5]
		var a=[];	
		$L.each(function(i,n)
		{
			a[i]=n;
		})
		expect(a.length).toEqual(0)
	})
	it(".each() without object - throws error ",function()
	{
		arr=[1,2,3,4,5]
		var a=[];	
		var ter=function()
		{
			$L.each(arr)
		}
		expect(ter).toThrow()
	})
	it(".each() without arguments - iterates nothing ",function()
	{
		arr=[1,2,3,4,5]
		var a=[];	
		var ter=function()
		{
			$L.each()
		}
		expect(ter).not.toThrow()
	})
	it(".each() having callback without arguments - throws error",function()
	{
		arr=[1,2,3,4,5]
		var a=[];	
		var ter=function()
		{
			$L.each(arr,function()
			{
				a[i]=n;	
			})
		}
		expect(ter).toThrow()
	})
	it(".each() editing and getting DOM objects",function()
	{
		var arr = [ "one", "two", "three" ];
		$L.each( arr, function( i, val ) 
		{
  			$( "#" + val ).text( i+1 );
 
		});
		expect($('#one').text()).toBe('1')
		arr = $('span');
		$L.each( arr, function( i, val ) 
		{
  			expect(Number(val.childNodes[0].nodeValue)).toBe(i+1)
  			return (i!==2)
		});
	})
	it(".each() with non numeric key values ",function()
	{
		arr={ name: "John", lang: "JS" }
		var a=[];
		$L.each(arr, function( k, v ) 
		{
  			a[k]=v;
		});
		expect(a.lang).toEqual('JS')
	})
})

describe("Lyte : testing .merge() function",function()
{
	it("merging an empty array with a non empty array",function()
	{
		a1=[1,2,3]
		a2=[]
		a=$L.merge(a1,a2);
		b=$L.merge(a2,a1);
		expect(b).toEqual(a)
	})

	it("merging two non empty arrays",function()
	{
		a1=[1,2,3]
		a2=['a','b','c']
		a=$L.merge(a1,a2);
		expect(a).toEqual([1,2,3,'a','b','c'])
	})

	it("merging two arrays in alternate order - (a1,a2) and (a2,a1)",function()
	{
		a1=[1,2,3]
		a2=['a','b','c']
		a=$L.merge(a1,a2);
		b=$L.merge(a2,a1);
		expect(a).not.toEqual(b)
	})
	it("merging two empty arrays - returns empty array",function()
	{
		a1=[]
		a2=[]
		a=$L.merge(a1,a2);
		expect(a).toEqual([])
	})

	it("merge() with two non array objects - not merged",function()
	{
		a1="asd"
		a2=1
		a=$L.merge(a1,a2);
		expect(a).not.toEqual(["asd",1])
	})

	it("merge with single array argument throws error",function()
	{
		a1=[1,2,3]
		var ter=function()
		{
			a=$L.merge(a1)
		}
		expect(ter).toThrow();
	})

	it("merge without arguments throws error",function()
	{
		var ter=function()
		{
			a=$L.merge()
		}
		expect(ter).toThrow();
	})

	it("merging more than two arrays - only first two arrays are merged ",function()
	{
		a1=[1,2,3]
		a2=['a','b','c']
		a3=[5,6,7]
		a=$L.merge(a1,a2,a3)
		expect(a).toEqual([1,2,3,'a','b','c']);
	})
	it("merge() objects as arrays - merged",function()
	{
		a1=
		{
			name: 'xxx',
			age: 54
		}

		a2=
		{
			name: 'yyy',
			age: 34
		}
		a=$L.merge([a1],[a2])
		expect(a).toEqual([{name:'xxx',age:54},{name:'yyy',age:34}]);
	})
	it("merge()  objects not as arrays- not merged",function()
	{
		a1=
		{
			name: 'xxx',
			age: 54
		}

		a2=
		{
			name: 'yyy',
			age: 34
		}
		a=$L.merge(a1,a2)
		expect(a).toEqual(a1);

	})
	it("merge() array of objects with non numeric keys as arrays- merged",function()
	{
		a1=
		[
			{
				name: 'xxx',
				age: 54
			},
			{
				name: 'yyy',
				age: 34
			}
		]
		a2=
		[
			{
				fname: 'aaa',
				fage: 54,
				sage:22
			}
		]
		a=$L.merge(a1,a2)
		//console.log(a.length)
		expect(a).toEqual([{name:'xxx',age:54},{name:'yyy',age:34},{fname:'aaa',fage:54 , sage:22}]);
	})
	it("merge array with an non array - not merged and throws error",function()
	{
		a1=
		[
			{
				name: 'xxx',
				age: 54
			},
			{
				name: 'yyy',
				age: 34
			}
		]
		a2=
		{
			fname: 'aaa',
			fage: 54
		}
		var ter=function()
		{
			a=$L.merge(a1,a2)
		}
		expect(ter).toThrow();
	})

	it("merge array of DOM objects",function()
	{
		a1=$('div')
		a2=$('span')
		a=$L.merge(a1,a2)
		expect(a.length).toEqual(a1.length)

	})
})

describe("Lyte : testing .extend() ",function()
{
	it("extend an object to the same object as target",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 2 },
  			d: 4
		};
		$L.extend( o1, o2 );		
		expect(o1).toEqual({a:0,b:{y:2},c:3,d:4})	
	})
	it("extend an object to the another object as target",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 2 },
  			d: 4
		};
		o=$L.extend({}, o1, o2 );
		expect(o).toEqual({a:0,b:{y:2},c:3,d:4})	
	})
	xit("extend an object to the another object as target with deep copy",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 3 },
  			d: 4
		};
		o=$L.extend(true,{}, o1, o2 );
		console.log(o);		
		expect(o).toEqual({a:0,b:{x:1,y:3},c:3,d:4})	
	})
	it("extend an object to the another object as target with shallow copy",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 3 },
  			d: 4
		};
		o=$L.extend({}, o1, o2 );
		expect(o1).toEqual({a:0,b:{x:1,y:2},c:3})
		expect(o).toEqual({a:0,b:{y:3},c:3,d:4})	
	})
	it("extend() with one object argument - returns the same object",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 2 },
  			d: 4
		};
		$L.extend(o1);
		expect(o1).toEqual({a:0,b:{x:1,y:2},c:3})	
	})
	it("extend() without argument - returns the empty object",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 2 },
  			d: 4
		};
		o=$L.extend();
		expect(o).toEqual({})	
	})
	it("extend() with more than two object arguments - combines all the objects to target object",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 2 },
  			d: 4
		};
		var o3 = 
		{
			e:5
		};

		$L.extend(o1,o2,o3);
		expect(o1).toEqual({a:0,b:{y:2},c:3,d:4,e:5})	
	})
	xit("extend() with more than two object arguments with deep copy - combines all the objects to target object",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2 = 
		{
			b: { y: 2 },
  			d: 4
		};
		var o3 = 
		{
			e:5
		};

		$L.extend(true,o1,o2,o3);
		expect(o1).toEqual({a:0,b:{x:1,y:2},c:3,d:4,e:5})	
	})
	it("extend() with objects that are not declared as arguments - throws error",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var ter=function()
		{
			$L.extend(o1,o2,o3);
		}
		expect(ter).toThrow()
	})
	it("extend() with undefined and null objects arguments - ignores those objects",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var o2,o3=null;
		$L.extend(o1,o2,o3)
		expect(o1).toEqual({a:0,b:{x:1,y:2},c:3})	
	})
	it("extend() with DOM objects",function()
	{
		var x = document.getElementById("one");
		var y = document.getElementById("two");	
		$L.extend(x.style,y.style)
		expect(x.style.color).toEqual("red")			
	})
	it("extend() with non objects",function()
	{
		var x = 0;
		var y = 1;	
		$L.extend(x,y)
		expect(x).toEqual(0)			
	})
	it("extend() with non objects to another target - returns empty object",function()
	{
		var x = 0;
		var y = 1;	
		z=$L.extend(true,{},x,y)
		expect(z).toEqual({})			
	})
	it("extend() with two arrays with first one as target - returns second arrays value as array to target",function()
	{
		var x = [1,2,3];
		var y = [5,6,7];	
		$L.extend(x,y)
		expect(x).toEqual([5,6,7])			
	})
})
describe("Lyte : testing .parse()",function()
{
	it("parsing string with simple object ",function()
	{
		var obj = $L.parse( '{ "name" : "Lyte" }' );
		expect(obj.name).toBe("Lyte") 
	})
	it("parsing already parsed object - throws error",function()
	{
		var o1 = 
		{
  			a: 0,
  			b: { x: 1, y: 2 },
  			c: 3
		};
		var ter=function()
		{
			o=$L.parse(o1)
		}
		expect(ter).toThrow() 
	})
	it("parse() with non objects - returns the number",function()
	{
		var o1=1;
		o=$L.parse(o1)
		expect(o).toEqual(1) 
	})
	it("parse() with array of number,char as string -returns the array ", function()
	{
		var o1="[1,2]";
		o=$L.parse(o1)
		expect(o).toEqual([1,2]) 
		var o1='["a","b"]';
		o=$L.parse(o1)
		expect(o).toEqual(['a','b']) 
	})
	it("parse() without arguments - throws error",function()
	{
		var ter=function()
		{
			o=$L.parse()
		}
		expect(ter).toThrow()	
	})
})

