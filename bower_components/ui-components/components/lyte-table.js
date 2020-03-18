Lyte.Component.register('lyte-table',{
_template:"<template tag-name=\"lyte-table\">\t<div class=\"lyteTableScroll\">\t\t<template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\">\t\t<lyte-table-structure id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\">\t\t   <template is=\"if\" value=\"{{ltPropHeaderLabelKey}}\"><template case=\"true\">\t\t\t\t<lyte-thead>\t\t\t\t\t<lyte-tr>\t\t\t\t\t   <template is=\"if\" value=\"{{lyteUiHeaderCheck(ltPropHeader)}}\"><template case=\"true\"><template is=\"for\" items=\"{{ltPropHeader}}\" item=\"list\" index=\"indexVal\">\t\t\t\t\t\t<lyte-th id=\"{{list.id}}\" class=\"{{list.class}}\" index=\"{{indexVal}}\" resize=\"{{list.resize}}\" fixed=\"{{list.fixed}}\" icon=\"{{list.icon}}\">\t\t\t\t\t\t\t{{unescape(list[ltPropHeaderLabelKey])}}\t\t\t\t\t\t</lyte-th>\t\t\t\t\t\t\t</template></template></template>\t\t\t\t\t\t</lyte-tr>\t\t\t\t</lyte-thead>\t\t\t</template></template>\t\t\t\t<lyte-tbody>\t\t\t\t<template is=\"for\" items=\"{{ltPropContent}}\" item=\"list\" index=\"indexVal\">\t\t\t\t\t\t <lyte-tr id=\"{{list.id}}\" class=\"{{list.class}}\">\t\t\t\t\t\t<template is=\"for\" items=\"{{ltPropHeader}}\" item=\"header\">\t\t\t\t\t\t\t<lyte-td>{{unescape(lyteUiGetValue(list,header[ltPropBodyLabelKey]))}}</lyte-td>\t\t\t\t\t\t</template>\t\t\t\t \t</lyte-tr>\t\t\t\t</template>\t\t    </lyte-tbody> \t\t    <template is=\"if\" value=\"{{expHandlers(ltPropResize.vertical,'||',ltPropResize.horizontal)}}\"><template case=\"true\">\t\t    \t<lyte-table-resize onmousedown=\"{{action('tableResize', event, this)}}\"></lyte-table-resize>\t\t    \t<template is=\"if\" value=\"{{ltPropResize.vertical}}\"><template case=\"true\">\t\t    \t\t<lyte-table-vertical-resize onmousedown=\"{{action('tableResize', event, this)}}\"></lyte-table-vertical-resize>\t\t    \t</template></template><template is=\"if\" value=\"{{ltPropResize.horizontal}}\"><template case=\"true\">\t\t    \t\t<lyte-table-horizontal-resize onmousedown=\"{{action('tableResize', event, this)}}\"></lyte-table-horizontal-resize>\t\t    \t</template></template></template></template>\t\t</lyte-table-structure>\t</template><template case=\"false\">\t <lyte-yield yield-name=\"yield\"></lyte-yield>\t </template></template></div></template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropContent","ltPropHeader","ltPropId","ltPropClass","ltPropBorder","ltPropHeaderLabelKey","ltPropBodyLabelKey","ltPropWidth","ltPropHeight","ltPropResize","ltPropFixedColumnClass","ltPropYield","ltPropScroll","ltPropColumnSortable","ltPropInfiniteScroll","columns","nonFixedColumn","minWidth1","minWidth2","secondaryData","boundary"],
	init : function(){
		if(this.getData('ltPropInfiniteScroll'))
			{	
				var ltPropContent = this.getData('ltPropContent');
				if(ltPropContent.length)
					{
						this.setData('secondaryData', ltPropContent.slice());
						if(this.getData('ltPropInfiniteScroll'))
							{
								// this.setData('ltPropContent', Lyte.arrayUtils(ltPropContent, 'remove', 0, 10));
								this.setData('boundary.bottom', -1);
								this.setData('boundary.top', ltPropContent.length - 1);
							}
					}
				this.setData('ltPropContent', []);	
			}
	},

	didConnect : function (){
		if(this.getData('ltPropInfiniteScroll'))
			{
				var height = this.$node.getBoundingClientRect().height;
				var secData = this.getData('secondaryData').slice();
				Lyte.arrayUtils(secData, 'remove', Math.ceil(height/40), secData.length);
				this.setData('ltPropContent', secData);
				this.setData('boundary.top', secData.length - 1);
				dummyRow1 = document.createElement('lyte-tr');
				dummyRow1.setAttribute('class','lyteTableDummyRow bottom');
				$L('lyte-tbody', this.$node).e[0].insertBefore(dummyRow1, undefined);
			}
		this.$node.constructor._observers[0].value.call(this);
		this.$node.constructor._observers[1].value.call(this);
		this.$node.constructor._observers[2].value.call(this);
		this.$node.constructor._observers[3].value.call(this);
		var ltPropResize = this.getData('ltPropResize')
		if(this.getData('ltPropYield') && (ltPropResize.vertical || ltPropResize.horizontal))
			{
				this.$node.constructor._observers[4].value.call(this);
			}
		else if(this.getData('ltPropYield')){
			var resize = $L('lyte-table-resize', this.$node).e[0];
			if(resize){
				resize.parentElement.removeChild(resize);
			}
		}
		var scrollDiv = $L('div.lyteTableScroll', this.$node).e[0];
		// scrollDiv.addEventListener('scroll', this.scrollCheck, true);
		if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
			{
				scrollDiv.scrollLeft = 0;
				scrollDiv.scrollTop = 0;
			}
	},
	// width calculation for positioning
	columnWidth : function(fixedColumn, i, j){
		var width = 0;
		if(!j)
			{
				j = 0
			}
		for(; j < i; j++)
			{
				width += fixedColumn[j].property.width;
			}
		return width;	
	},

	scroll : function (event) {
		var fact = (navigator.userAgent.toLowerCase().indexOf('firefox') != -1 && navigator.userAgent.toLowerCase().indexOf('ubuntu') != -1) ? 1/3 : 3 ;
		var a = event.deltaX/fact, b = event.deltaY/fact, component =  this.parentElement.component, divClientRect = this.getBoundingClientRect();
		var scroll = component.getData('ltPropScroll');
		var direction = window.getComputedStyle(this).getPropertyValue('direction');
		if(scroll.horizontal)
			{
				var factor = 1;
				if((navigator.userAgent.toLowerCase().indexOf('edge') != -1 && direction != 'rtl') || ((navigator.userAgent.toLowerCase().indexOf('trident') != -1 || navigator.userAgent.toLowerCase().indexOf('msie') != -1) && direction == 'rtl'))
					{
						factor = -1;
					}
				this.scrollLeft += parseInt(a > 10 ? 10 : (a < -10 ? -10 : a)) * factor;
			}
		if(scroll.vertical && (!this._preventScroll || b < 0))	
			{
				this.scrollTop += parseInt(b > 10 ? 10 : (b < -10 ? -10 : b));
			}
		component.scrollCheck.call(this);
		if(this.scrollLeft == 0)
			{
				var ary = component.getData('columns');
				Lyte.arrayUtils(ary, 'remove', 0, ary.length);
				var fixedd = $L('.lyteTableFixed', this).e
				if(fixedd.length)
					{
						for(var i = 0; i < fixedd.length; i++)
							{
								fixedd[i].style.left = '0px';
								fixedd[i].classList.remove('lyteTableFixed');
							}
					}
			}
		if(component.getData('ltPropInfiniteScroll'))
			{
				var rows = $L('lyte-tbody lyte-tr:not(.lyteTableDummyRow)', this).e, height = 0;
				var fixedRow = $L('lyte-thead lyte-th', this).e[0];
				var fixedHgt = fixedRow ? fixedRow.getBoundingClientRect().bottom : divClientRect.top;
				if(b >= 0)
					{
						var hidedRows = [];
						for(var j = 0; j < rows.length; j++)
							{
								var rect = rows[j].getBoundingClientRect();
								if(rect.bottom < fixedHgt)
									{
										height += rect.height;
										hidedRows.push(Array.prototype.indexOf.call(rows, rows[j]));
									}
								else
									{
										break;
									}	
							}
						if(hidedRows.length)
							{
								var ltPropContent = component.getData('ltPropContent').slice();
								for(var z = 0; z < hidedRows.length; z++)
									{
										Lyte.arrayUtils(ltPropContent, 'removeAt', hidedRows[z]);
										component.setData('boundary.bottom', component.getData('boundary').bottom + 1);
										component.setData('ltPropContent', ltPropContent);
									}
								var dummyRow = $L('lyte-tbody lyte-tr.lyteTableDummyRow.top', this).e[0];
								if(!dummyRow)
									{
										var tbody = $L('lyte-tbody', this).e[0]
										dummyRow = document.createElement('lyte-tr');
										dummyRow.setAttribute('class','lyteTableDummyRow top');
										tbody.insertBefore(dummyRow, tbody.children[0]);
									}
								dummyRow.style.height = (height + dummyRow.getBoundingClientRect().height) + 'px';
								component.makeFixedColumn.call(component);
							}
						if(this.scrollHeight == (divClientRect.height + this.scrollTop))
							{
								if(component.getMethods('scrollEdge'))
									{
										component.executeMethod('scrollEdge', component.getData('secondaryData'));
									}
							}
						var bottomDummy = $L('lyte-tbody lyte-tr.lyteTableDummyRow.bottom', this).e[0];
						if(divClientRect.bottom > bottomDummy.getBoundingClientRect().top)
							{
								var secondaryData = component.getData('secondaryData');
								var boundary = component.getData('boundary');
								if(boundary.top < (secondaryData.length - 1))
									{
										var ltPropContent = component.getData('ltPropContent').slice();
										Lyte.arrayUtils(ltPropContent, 'insertAt', ltPropContent.length, secondaryData[boundary.top + 1]);
										boundary.top += 1;
										component.setData('ltPropContent', ltPropContent);
									}
								else
									{
										this._preventScroll = true;
										if(component.getMethods('scrollEnd'))
											{
												var ret = component.executeMethod('scrollEnd');
												if(ret.constructor == Array)
													{
														Lyte.arrayUtils(secondaryData, 'concat', ret);
														delete this._preventScroll;
													}
												else if(ret.constructor == Object)
													{
														Lyte.arrayUtils(secondaryData, 'push', ret);
														delete this._preventScroll;
													}	
											}
									}	
							}			
					}
				else if(b < 0)
					{
						var dummyRow = $L('lyte-tbody lyte-tr.lyteTableDummyRow.top', this).e[0];
						if(dummyRow)
							{
								var clientRect = dummyRow.getBoundingClientRect();
								if(clientRect.bottom > fixedHgt)
									{
										var ltPropContent = component.getData('ltPropContent').slice(), boundaryBottom = component.getData('boundary').bottom;
										Lyte.arrayUtils(ltPropContent, 'insertAt', 0, component.getData('secondaryData')[boundaryBottom]);
										component.setData('ltPropContent', ltPropContent);
										dummyRow.style.height = (dummyRow.getBoundingClientRect().height - $L('lyte-tbody lyte-tr:not(.lyteTableDummyRow)', this).e[0].getBoundingClientRect().height) + 'px';
										component.setData('boundary.bottom', boundaryBottom - 1);
										component.makeFixedColumn.call(component);
									}
							}
						var lastOfType = rows[rows.length - 1];
						if(lastOfType.getBoundingClientRect().top > divClientRect.bottom)
							{
								var ltPropContent = component.getData('ltPropContent').slice(),  boundaryTop = component.getData('boundary').top;
								Lyte.arrayUtils(ltPropContent, 'removeAt', ltPropContent.length - 1);
								component.setData('ltPropContent', ltPropContent);
								component.setData('boundary.top', boundaryTop - 1);
							}
						delete this._preventScroll;		
					}	
					
			}	
		event.preventDefault();
	},

	makeFixedColumn : function(){
		var headers = $L('lyte-th', this.$node).e, fixedHeader = $L('lyte-th.lyteTableFixed', this.$node).e;
		for(var i = 0; i < fixedHeader.length; i++)
			{
				var order = Array.prototype.indexOf.call(headers, fixedHeader[i]);
				$L('lyte-td:nth-of-type(' + (order + 1) + ')').css('left', fixedHeader[i].style.left);
				$L('lyte-td:nth-of-type(' + (order + 1) + ')').addClass('lyteTableFixed');
			}
	},

	// fixed column checks and removals
	scrollCheck : function(event){
		var tablee = $L('lyte-table-structure',this).e[0], scrollDiv = this;
		var scrollTop = this.scrollTop, scrollLeft = this.scrollLeft;
		var scrollDir = this.parentElement.component.getData('ltPropScroll');
		var direction = window.getComputedStyle(this).getPropertyValue('direction');
		// for vertical scroll
		if(scrollTop != this.prevScollTop && scrollDir.vertical)
			{
				$L('lyte-th', this).addClass('tableRowFixed');
				var colsNos = $L('lyte-th', this).e;
				for(var i = 0; i < colsNos.length; i++){
					colsNos[i].style.top = (scrollTop) + 'px';
				}
				if(!scrollTop){
					$L('lyte-th', this).removeClass('tableRowFixed');
				}	
			}
		// for horizontal scroll	
		if(scrollLeft != this.prevScollLeft && scrollDir.horizontal)
			{	
				var component = this.parentElement.component, table = $L('lyte-table-structure', this).e[0], columns = component.getData('columns');
				var headerList = $L('lyte-th', component.$node).e, fixedColumn = $L('lyte-th.lyteFixedColumn', component.$node).e, ltPropFixedColumnClass = component.getData('ltPropFixedColumnClass')
				// marks as fixed colums on hori scroll
				for(var k = 0; k < headerList.length; k++)
					{
						headerList[k].property = headerList[k].getBoundingClientRect();
						headerList[k].order = k
					}
				scrollDiv.property = scrollDiv.getBoundingClientRect();
				for(var i = columns.length; i < fixedColumn.length; i++)
					{
						if(((fixedColumn[i].property.right  + component.columnWidth.call(component, fixedColumn, i) > (scrollDiv.property.right)) && direction == 'rtl') || ((fixedColumn[i].property.left < (scrollDiv.property.left + component.columnWidth.call(component, fixedColumn, i))) && direction != 'rtl'))
							{
								var width = fixedColumn[i].property.width
								var order = fixedColumn[i].order
								if(order + 1 < headerList.length)
									{
										fixedColumn[i].classList.add('lyteTableFixed')
										columns.push(fixedColumn[i])
										$L('lyte-td:nth-of-type(' + (order + 1) + ')', component.$node).addClass('lyteTableFixed')
										if(ltPropFixedColumnClass)
											{	
												$L('lyte-td:nth-of-type(' + (order + 1) + ')', component.$node).addClass(ltPropFixedColumnClass)
											}
									}
							}
					}	
				if(columns[columns.length - 1])
					{
						j = columns.length - 1;
						if(((((headerList[columns[j].order + 1].property.right  + columns[j].property.width + component.columnWidth.call(component, columns, columns.length - 1)) < (scrollDiv.property.right)) || (headerList[columns[j].order + 1].property.right + 2 < columns[j].property.left)) && /*(columns[j].property.right + component.columnWidth.call(component, fixedColumn, columns.length - 1) < (scrollDiv.getBoundingClientRect().right)) &&*/ direction == 'rtl') || ((headerList[columns[j].order + 1].property.left >= (scrollDiv.property.left + columns[j].property.width + component.columnWidth.call(component, columns, columns.length - 1))) && (columns[j].property.left >= (scrollDiv.getBoundingClientRect().left + component.columnWidth.call(component, fixedColumn, columns.length - 1))) && direction != 'rtl'))
						  {
								$L('lyte-td:nth-of-type(' + (columns[j].order + 1) + ')', component.$node).removeClass('lyteTableFixed')
								var innerElem = $L('lyte-th-data', headerList[columns[j].order]).e[0]
								headerList[columns[j].order].classList.remove('lyteTableFixed')
								if(ltPropFixedColumnClass)
									{	
										innerElem.parentElement.classList.remove(ltPropFixedColumnClass)
										$L('lyte-td:nth-of-type(' + (columns[j].order + 1) + ')', component.$node).removeClass(ltPropFixedColumnClass)
									}
								columns[j].style.removeProperty('left');
								var currCols = $L('lyte-td:nth-of-type(' + (columns[j].order + 1) + ')', component.$node).e;
								for(var z = 0; z < currCols.length; z++)
									{
										currCols[z].style.removeProperty('left');
									}
								Lyte.arrayUtils(columns, 'removeAt', j)
							}	
					}	
				for(var j = 0; j < columns.length; j++)
					{
						//positioning on scroll
						var left, cells = $L('lyte-td:nth-of-type(' + (columns[j].order + 1) + ')', component.$node).e
						if(j == 0)
					    	{
					    		if(direction == 'rtl')
					    			{
					    				if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
					    					{
					    						left = scrollLeft - (component.columnWidth.call(component, headerList, columns[j].order, 0))
					    					}
					    				else if(navigator.userAgent.toLowerCase().indexOf('edge') != -1 || navigator.userAgent.toLowerCase().indexOf('trident') != -1 || navigator.userAgent.toLowerCase().indexOf('msie') != -1)
					    					{
					    						left = -scrollLeft - (component.columnWidth.call(component, headerList, columns[j].order, 0))
					    					}	
					    				else
					    					{
					    						left = scrollLeft - this.scrollWidth + this.property.width + (component.columnWidth.call(component, headerList, columns[j].order, 0))
					    					}	
					    			}
					    		else
					    			{
					    				left = scrollLeft - (component.columnWidth.call(component, headerList, columns[j].order, 0))
					    			}
					    	}
					    else
					    	{
					    		if(direction == 'rtl')
					    			{
					    				if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
					    					{
					    						left = parseInt(columns[j - 1].style.left) + component.columnWidth.call(component, headerList, columns[j].order, columns[j-1].order + 1)
					    					}
					    				else
					    					{	
					    						left = parseInt(columns[j - 1].style.left) + component.columnWidth.call(component, headerList, columns[j].order, columns[j-1].order + 1);
					    					}
					    			}
					    		else
					    			{
					    				left = parseInt(columns[j - 1].style.left) - component.columnWidth.call(component, headerList, columns[j].order, columns[j-1].order + 1)
					    			}
					    	}	
						for(var x = 0; x < cells.length; x++)
					    	{
					    		cells[x].style.left = left + 'px';
					    	}
			    		 columns[j].style.left = left + 'px';
					}	
			  }
		this.prevScollLeft = scrollLeft;
		this.prevScollTop = scrollTop; 
		this.backResponse = false;
	},
	// border 
    borderChange : function() {
		if(this.getData('ltPropBorder'))
			{
				this.$node.classList.add('border');
			}
		else
			{
				this.$node.classList.remove('border');
			}
	  }.observes('ltPropBorder'),
	 // width height of table 
	widthObs : function(){
		$L('lyte-table-structure',this.$node).e[0].style.width = this.getData('ltPropWidth');
		this.applyWheel.call(this);
	}.observes('ltPropWidth'), 

	heightObs : function(){
		$L('lyte-table-structure',this.$node).e[0].style.height = this.getData('ltPropHeight');
		this.applyWheel.call(this);
	}.observes('ltPropHeight'), 

	contentChange : function(){
		this.applyWheel.call(this);
	}.observes('ltPropContent'),

	applyWheel : function(){
		var scrollDiv = $L('div.lyteTableScroll', this.$node).e[0];
		var clientRect = scrollDiv.getBoundingClientRect(), flag = false;
    	if(scrollDiv.scrollWidth > clientRect.width || scrollDiv.scrollHeight > clientRect.height)
        	{
        		scrollDiv.addEventListener('wheel', this.scroll);
        		return;
        	}	
        scrollDiv.removeEventListener('wheel', this.scroll);		
	},

	sortable : function(){
		var row = $L('lyte-thead', this.$node).e[0];
		if(row)
			{
				if(this.getData('ltPropColumnSortable'))
					{
						this.colSort = this.sortableColumns.bind(this)
						row.addEventListener('mousedown', this.colSort);
					}
				else
					{
						row.removeEventListener('mousedown', this.colSort);
					}	
			}
	}.observes('ltPropColumnSortable'),

	composePath : function(event){
		var arr = [], node = event.target;
		while(node.tagName != 'HTML')
			{
				arr.push(node);
				node = node.parentElement;
			}
		return arr;	
	},

	sortableColumns : function(event){
		var target = this.closestFind.call(this, event.path ? event.path : this.composePath.call(this, event), 'lyte-th:not(.lyteTableFixed)');
		if(target && this.$node.contains(target))
			{
				this.mousemove = this.sortableMouseMove.bind(this);
				this.offLeft = event.clientX - target.getBoundingClientRect().left;
				this.colHead = target;
				document.documentElement.addEventListener('mousemove',this.mousemove);
				this.flag = true;
				event.preventDefault();
			}
	},

	sortableMouseMove : function(event){
		if(this.flag)
			{
				this.mouseup = this.sortableMouseup.bind(this);
				var target = this.colHead
				var clientRect = target.getBoundingClientRect();
				var div = document.createElement('div');
				div.classList.add('lyteTableDummy');
				var xscroll = window.pageXOffset || document.documentElement.scrollLeft
      			var yscroll = window.pageYOffset || document.documentElement.scrollTop  
				div.style.height = clientRect.height + 'px';
				div.style.width = clientRect.width + 'px';
				div.style.left = (xscroll + clientRect.left) + 'px';
				div.style.top = (yscroll + clientRect.top) + 'px';
				document.body.appendChild(div);
				this.flag = false;
				document.documentElement.addEventListener('mouseup',this.mouseup);
			}
		var dummyDiv = $L('div.lyteTableDummy').e[0];
		dummyDiv.style.left = (event.clientX - this.offLeft) + 'px';
		event.preventDefault();
		event.stopPropagation();	
	},

	sortableMouseup : function(event){
		var dummyDiv = $L('div.lyteTableDummy').e[0], clientRect = dummyDiv.getBoundingClientRect(), x = clientRect.left + clientRect.width/2 + 2, y = clientRect.top + clientRect.height/2;
		var adjCol = this.closestFind.call(this, document.elementsFromPoint ? document.elementsFromPoint(x, y) : this.elementsFromPointCal.call(this, x, y), 'lyte-th:not(.lyteTableFixed)');
		if(adjCol != this.colHead && adjCol)
			{
				var Heads = $L('lyte-th', this.colHead.parentElement).e
				var colOrder = Array.prototype.indexOf.call(Heads, this.colHead);
				var adjOrder = Array.prototype.indexOf.call(Heads, adjCol);
				var ltPropHeader = this.getData('ltPropHeader');
				if(!ltPropHeader)
					{
						this.colHead.parentElement.insertBefore(this.colHead, adjOrder > colOrder ? adjCol.nextSibling : adjCol);
						var colGrp = $L('lyte-tbody lyte-td:nth-of-type(' + (colOrder + 1) +')', this.$node).e;
						var AdjColGrp = $L('lyte-tbody lyte-td:nth-of-type(' + (adjOrder + 1) +')', this.$node).e;
						for(var i = 0; i < colGrp.length; i++)
							{
								colGrp[i].parentElement.insertBefore(colGrp[i], adjOrder > colOrder ? AdjColGrp[i].nextSibling : AdjColGrp[i]);
							}
					}
				else
					{
						var flag = adjOrder > colOrder ? true : false;
						var temp = Lyte.arrayUtils(ltPropHeader, 'removeAt',colOrder), newOrder = Array.prototype.indexOf.call($L('lyte-th', adjCol.parentElement).e, adjCol);
						Lyte.arrayUtils(ltPropHeader,'insertAt', colOrder < adjOrder ? (newOrder + 1) : newOrder, temp);
						var newCol = $L('lyte-th', adjCol.parentElement).e[colOrder < adjOrder ? (newOrder + 1) : newOrder];
						if(adjCol.classList.contains('tableRowFixed'))
							{
								newCol.classList.add('tableRowFixed');
								newCol.style.top = adjCol.style.top;
							}
					}	
			}
		document.body.removeChild(dummyDiv);
		document.documentElement.removeEventListener('mouseup',this.mouseup);
		document.documentElement.removeEventListener('mousemove',this.mousemove);
		delete this.mouseup;
		delete this.mousemove;	
		delete this.offLeft;
		delete this.colHead;
		delete this.flag;
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
	},

	elementsFromPointCal : function(x, y){
		var arr = [], element = document.elementFromPoint(x, y);
		while(element != document && element != document.documentElement && element != document.body && element != this.$node)
			{
				element.style.pointerEvents = 'none';
				arr.push(element);
				element = document.elementFromPoint(x, y);
			}
		for(var i = 0; i < arr.length; i++)
			{
				arr[i].style.pointerEvents = 'initial';
			}
		return arr;		
	},

	resizeComponentAppend : function(){
		var ltPropResize = this.getData('ltPropResize');
		if(ltPropResize.vertical || ltPropResize.horizontal)
			{
				var comp = document.createElement('lyte-table-resize')
				$L('lyte-table-structure', this.$node).e[0].appendChild(comp)
				comp.addEventListener('mousedown',function(event){this.$node.constructor._actions.tableResize.call(this, event)}.bind(this));
			}
		if(ltPropResize.vertical)
			{
				var comp = document.createElement('lyte-table-vertical-resize')
				$L('lyte-table-structure', this.$node).e[0].appendChild(comp)
				comp.addEventListener('mousedown',function(event){this.$node.constructor._actions.tableResize.call(this, event)}.bind(this))
			}
		else
			{
				var comp = $L('lyte-table-vertical-resize', this.$node).e[0];
				if(comp)
					{
						comp.parentElement.removeChild(comp);
					}
			}	
		if(ltPropResize.horizontal)
			{
				var comp = document.createElement('lyte-table-horizontal-resize')
				$L('lyte-table-structure', this.$node).e[0].appendChild(comp)
				comp.addEventListener('mousedown',function(event){this.$node.constructor._actions.tableResize.call(this, event)}.bind(this))
			}
		else
			{
				var comp = $L('lyte-table-horizontal-resize', this.$node).e[0];
				if(comp)
					{
						comp.parentElement.removeChild(comp);
					}
			}	
	}.observes('ltPropResize'),

	data:function(){
		return {
			//user data
			ltPropContent:Lyte.attr("array",{"default":[]}),
			ltPropHeader:Lyte.attr("array",{"default":[]}),
			ltPropId:Lyte.attr("string",{"default":''}),
			ltPropClass:Lyte.attr("string",{"default":''}),
			ltPropBorder:Lyte.attr("boolean",{"default":false}),
			ltPropHeaderLabelKey : Lyte.attr("string",{"default":''}),
			ltPropBodyLabelKey : Lyte.attr("string",{"default":''}),
			ltPropWidth : Lyte.attr('string',{'default' : '100%'}),
			ltPropHeight : Lyte.attr('string',{'default' : '100%'}),
			ltPropResize : Lyte.attr('object',{'default' : {}}),
			ltPropFixedColumnClass : Lyte.attr('string',{'default':''}),
			ltPropYield : Lyte.attr('boolean',{'default':false}),
			ltPropScroll : Lyte.attr('object', {'default' : {horizontal : true , vertical : true}}),
			ltPropColumnSortable : Lyte.attr('boolean', {'default' : false}),
			ltPropInfiniteScroll : Lyte.attr('boolean', {'default' : false}),
			// system data
			columns : Lyte.attr('array',{'default' : []}),
			nonFixedColumn : Lyte.attr('array',{'default' : []}),
			minWidth1 : Lyte.attr('string',{'default' : ''}),
			minWidth2 : Lyte.attr('string',{'default' : ''}),
			secondaryData : Lyte.attr('array',{'default' : []}),
			boundary : Lyte.attr('object', {'default' : {}})
		}
	},
	actions:{
	     //  resize initialization 	
 	     'tableResize' : function(event){
 	    		var resizeComponent = event.target.parentElement, Component = this, prevSibling = resizeComponent.previousElementSibling;
 	    		document.Component = this; this.resizeComponent = resizeComponent, this.targetElem = event.target;
 	    		if(($L('lyte-th:last-of-type',resizeComponent.parentElement).e[0] != resizeComponent && resizeComponent.tagName == 'LYTE-TH')|| resizeComponent.tagName != 'LYTE-TH')
 	    			{
 	    				resizeComponent.offLeft = resizeComponent.getBoundingClientRect().width + resizeComponent.getBoundingClientRect().left
		 	    		resizeComponent.offTop = event.clientY
		 	    		document.addEventListener('mouseup',this.mouseup)
		 	    		document.addEventListener('mousemove',this.resizeFunc)
		 	    		if(resizeComponent.tagName == 'LYTE-TH')
			 	    		{
			 	    			var headerList = $L('lyte-th', this.$node).e;
			 	    			dummyWid = resizeComponent.nextElementSibling.offsetWidth + 'px'
			 	    			resizeComponent.nextElementSibling.style.removeProperty('width')
	 	    					this.setData('minWidth1',this.minWidth.call(this, resizeComponent))
	 	    					resizeComponent.nextElementSibling.style.width = dummyWid
	 	    					dummyWid = resizeComponent.offsetWidth + 'px'
			 	    			resizeComponent.style.removeProperty('width')
	 	    					this.setData('minWidth2',this.minWidth.call(this, resizeComponent.nextElementSibling))
	 	    					resizeComponent.style.width = dummyWid;
	 	    					for(var i = 0; i < headerList.length; i++)
	 	    						{	
	 	    							if(!headerList[i].style.width)
	 	    								{
	 	    									headerList[i].style.width = headerList[i].clientWidth + 'px';
	 	    								}
	 	    						}
			 	    		}	
			 	    }
			 	 event.preventDefault();
      			 event.stopPropagation();
      			 event.stopImmediatePropagation();
 	    	 }	 
	},
	//min - width calculation
	minWidth : function(resizeComponent){
		var minWidth = window.getComputedStyle(resizeComponent, null).getPropertyValue('min-width')
		width  = resizeComponent.offsetWidth + 'px'
		resizeComponent.style.width = minWidth == '0px' ? '50px' : minWidth;
		minWidth = resizeComponent.offsetWidth + 'px'
		resizeComponent.style.width = width
		return minWidth		
	},
	// resize finishing
	mouseup : function(event){
		var component = document.Component, resizeComponent = component.resizeComponent;
		document.removeEventListener('mouseup', component.mouseup)
		document.removeEventListener('mousemove', component.resizeFunc)
		delete document.Component;
		event.stopPropagation()
	    if(resizeComponent.tagName != 'LYTE-TH' && (component.targetElem.tagName == 'LYTE-TABLE-HORIZONTAL-RESIZE' || component.targetElem.tagName == 'LYTE-TABLE-RESIZE'))
	    	{	
	    		var theads = $L('lyte-th', component.$node).e
	    	}
	},
	// resizing
	resizeFunc : function(event){
		var component = document.Component, resizeComponent = component.resizeComponent, ltPropResize = component.getData('ltPropResize'),offset = event.clientX - resizeComponent.offLeft;
		resizeComponent.width = resizeComponent.getBoundingClientRect().width;
		if((ltPropResize.horizontal || resizeComponent.tagName == 'LYTE-TH') && offset) 
			{
				var width = offset + resizeComponent.width , tableWidth = component.getData('tableWidth');
				if(resizeComponent.tagName == 'LYTE-TH')
					{
						if(width > Math.ceil(parseFloat(component.getData('minWidth1'))))	
							{	
								var next = resizeComponent.nextElementSibling, width1 = next.getBoundingClientRect().width - offset
								if(width1 >  Math.ceil(parseFloat(component.getData('minWidth2'))))	
									{
								    	next.style.width = (width1) + 'px'
										resizeComponent.style.width = (width) + 'px'
									}
							}	
				    }
			    else if(resizeComponent.tagName != 'LYTE-TH' && (component.targetElem.tagName == 'LYTE-TABLE-HORIZONTAL-RESIZE' || component.targetElem.tagName == 'LYTE-TABLE-RESIZE'))
					{
						resizeComponent.style.width = (width) + 'px'
					}
				resizeComponent.offLeft = event.clientX
				delete resizeComponent.width;
			}
		if(ltPropResize.vertical && resizeComponent.tagName != 'LYTE-TH' && (component.targetElem.tagName == 'LYTE-TABLE-VERTICAL-RESIZE' || component.targetElem.tagName == 'LYTE-TABLE-RESIZE'))	
			{
				resizeComponent.style.height = (event.clientY + resizeComponent.getBoundingClientRect().height - resizeComponent.offTop) + 'px'
				resizeComponent.offTop = event.clientY
			}
		event.preventDefault(); 
		event.stopPropagation();
	},

	arrayFrom : function(nodeList){
	 	var arrayList = [];
	 	for(var i = 0; i < nodeList.length; i++)
	 		{
	 			arrayList.push(nodeList[i]);
	 		}
	 	return arrayList.slice();	
	 },

	closestFind : function(path, query){
			var elements = this.arrayFrom.call(this, document.querySelectorAll(query));
			for(var i = 0; i < path.length; i++)
				{
					if(Array.prototype.indexOf.call(elements, path[i]) != -1)
						{
							return path[i];
						}
				}
			return null;	
		}

});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true;} Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps){ defineProperties(Constructor.prototype, protoProps);} if (staticProps){ defineProperties(Constructor, staticProps);} return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass){ Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }}

var lyteTh = function (_HTMLElement) {
  _inherits(lyteTh, _HTMLElement);

  function lyteTh() {
    _classCallCheck(this, lyteTh);

    var _this = _possibleConstructorReturn(this, (lyteTh.__proto__ || Object.getPrototypeOf(lyteTh)).call(this));
    return _this;
  }

  _createClass(lyteTh, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attr, oldVal, newVal) {
      if (attr == 'fixed') {
      	var scrollingDiv = this;
      	 while(scrollingDiv.tagName != 'DIV')
	      	{
	      		scrollingDiv = scrollingDiv.parentElement;
	      	}  
        if (newVal == 'enable') {
          this.classList.add('lyteFixedColumn');
        } else {
          this.classList.remove('lyteFixedColumn');
        }
        scrollingDiv.parentElement.component.applyWheel.call(scrollingDiv.parentElement.component);
      } else if (attr == 'resize') {
        if (newVal == 'enable') {
          var tabHead = document.createElement('lyte-tablehead-resize');
          tabHead.addEventListener('mousedown', this.resize);
          this.appendChild(tabHead);
        } else {
          var tabHead = this.querySelector('lyte-tablehead-resize');
          if (tabHead) {
            this.removeChild(tabHead);
          }
        }
      } else if(attr == 'icon'){
      	if(newVal == 'disable'){
      		this.classList.add('lytePreventIcon');
      	} else {
      		this.classList.remove('lytePreventIcon');
      	}
      }
    }
  }, {
    key: 'resize',
    value: function resize(event) {
      var resizeComponent = event.target.parentElement, table = event.target;
      while(table.tagName != 'LYTE-TABLE')
      	{
      		table = table.parentElement;
      	}    
      table.constructor._actions.tableResize.call(table.component, event);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['fixed', 'resize', 'icon'];
    }
  }]);

  return lyteTh;
}(HTMLElement);

customElements.define('lyte-th', lyteTh);
