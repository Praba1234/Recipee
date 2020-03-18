LyteComponent.registerComponent('lyte-menu',{
_template:"<template tag-name=\"lyte-menu\">\t<template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\">\t\t\t<lyte-menu-body id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" tabindex=\"1\">\t\t\t\t<template is=\"for\" items=\"{{ltPropContent}}\" item=\"menu\" index=\"indexVal\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(menu)}}\"><template case=\"true\">\t\t\t\t\t\t\t        <lyte-menu-group elemorder=\"{{indexVal}}\">\t\t\t\t\t\t\t           <lyte-menu-header>{{lyteUiReturnOnlyKey(menu)}}</lyte-menu-header>\t\t\t\t\t\t\t              <template is=\"for\" items=\"{{lyteUiReturnOnlyValue(menu)}}\" item=\"menu1\" index=\"indexVal1\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(menu1),'==',false)}}\"><template case=\"true\">\t\t\t\t\t\t                                   <lyte-menu-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" data-value=\"{{menu1}}\">\t\t\t\t\t\t                                          <lyte-menu-label>{{menu1}}</lyte-menu-label>\t\t\t\t\t\t                                    </lyte-menu-item>\t\t\t\t\t\t\t                          </template><template case=\"false\">\t\t\t\t\t                                      <lyte-menu-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" id=\"{{menu1.id}}\" class=\"{{menu1.class}}\" data-value=\"{{menu1[ltPropSystemValue]}}\">\t\t\t\t\t                                          <lyte-menu-label>{{menu1[ltPropUserValue]}}</lyte-menu-label>\t\t\t\t\t                                              <template is=\"if\" value=\"{{menu1[ltPropDescription]}}\"><template case=\"true\">\t\t\t\t\t                                                  <lyte-menu-description>, {{menu1[ltPropDescription]}}</lyte-menu-description>\t\t\t\t\t                                              </template></template>\t\t\t\t\t                                      </lyte-menu-item>\t\t\t\t\t                                </template></template></template>\t\t\t\t\t\t\t      </lyte-menu-group>\t\t\t\t\t      </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(menu),'==',false)}}\"><template case=\"true\">\t\t\t                         <lyte-menu-item elemorder=\"{{indexVal}}\" data-value=\"{{menu}}\">\t\t\t                                <lyte-menu-label>{{menu}}</lyte-menu-label>\t\t\t                          </lyte-menu-item>\t\t\t\t                  </template><template case=\"false\">\t\t\t\t                        <lyte-menu-item elemorder=\"{{indexVal}}\" id=\"{{menu.id}}\" class=\"{{menu.class}}\" data-value=\"{{menu[ltPropSystemValue]}}\">\t\t\t\t                            <lyte-menu-label>{{menu[ltPropUserValue]}}</lyte-menu-label>\t\t\t\t                                <template is=\"if\" value=\"{{menu[ltPropDescription]}}\"><template case=\"true\">\t\t\t\t                                    <lyte-menu-description>, {{menu[ltPropDescription]}}</lyte-menu-description>\t\t\t\t                                </template></template>\t\t\t\t                        </lyte-menu-item>\t\t\t\t                  </template></template></template></template></template>\t\t    </lyte-menu-body>\t      </template><template case=\"false\">\t   \t\t\t<lyte-yield yield-name=\"yield\"></lyte-yield>\t   \t   </template></template>\t    </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropContent","ltPropId","ltPropClass","ltPropQuery","ltPropEvent","ltPropYield","ltPropUserValue","ltPropSystemValue","ltPropCallout","ltPropPosition","ltPropDescription","ltPropTabIndex","ltPropFreeze","ltPropWidth","ltPropHeight","ltPropQueryClass","ltPropBoundary","ltPropScroll","eventListeners"],
init : function(){
	if(!document.hasOwnProperty('_lyteMenu')){
		document.addEventListener('click', lyteCloseMenu);
		document.addEventListener('keydown', this.keydownCheck);
		window.addEventListener('resize', this.resizeFunc);
		document._lyteMenu = {};
		document._lyteMenu.eventFlag = true;
	}
	var event = this.getData('ltPropEvent');
	var evt = this.checkElementForMenu.bind(this);
	this.setData('eventListeners.event', evt);
	this.setData('eventListeners.keydown', this.traverseList.bind(this));
	document.documentElement.addEventListener(event == 'mouseenter' ? 'mousemove' : event, evt);
	this.menuNodes = [];
	if(!document.querySelector('.lytemenufreezelayer')){
			this.appendFreeze.call(this, 'lytemenufreezelayer left lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer top lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer bottom lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer right lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer nogroup lyteMenuHidden')
			$L('div.nogroup.lytemenufreezelayer').e[0].addEventListener('wheel', this.preventEvent);
		}	
},
 
 arrayFrom : function(nodeList){
 	var arrayList = [];
 	for(var i = 0; i < nodeList.length; i++)
 		{
 			arrayList.push(nodeList[i]);
 		}
 	return arrayList.slice();	
 },

heightChange : function(){
	this.warpperDiv.style.height = this.getData('ltPropHeight');	
}.observes('ltPropHeight'),

appendFreeze : function(className){
	var freezeLayer ;
	freezeLayer = document.createElement('div')
	freezeLayer.setAttribute('class', className)
	document.body.appendChild(freezeLayer)
},

resizeFunc : function(event){
	var activeMenu = $L('lyte-menu:not(.lyteMenuClosed)').e
	for(var i = 0; i < activeMenu.length; i++){
		if(!activeMenu[i].component.hasOwnProperty('parentMenu')){
				activeMenu[i].component.setCss.call(activeMenu[i].component)
				while(activeMenu[i].component.childMenu)
					{
						activeMenu[i].component = activeMenu[i].component.childMenu
						activeMenu[i].component.setCss.call(activeMenu[i].component)
					}
				 var temp = activeMenu[i].component;
				temp.setZIndex.call(temp);
				temp.heightCheck.call(temp, temp.childComp);
		}
	}
},

keydownCheck : function(event){
	if(event.keyCode == 27){
		lyteCloseMenu(event, undefined, true);
	}
},

didDestroy : function(){
		var allNodes = this.childComp.querySelectorAll('lyte-menu-item')
		for(var i=0;i<allNodes.length;i++){
			var curValue = allNodes[i].getAttribute('lyte-shortcut')
			if(curValue){
				allNodes[i].setAttribute('lyte-shortcut',JSON.stringify({}))
			}
		}
		var removeEvents = this.getData('eventListeners'), event = this.getData('ltPropEvent');
	if(this.childComp)
		{
			this.childComp.parentElement.removeChild(this.childComp);
		}
	if($L('lyte-menu').e.length == 0)
		{
			var freezeLayers = $L('div.lytemenufreezelayer').e
			for(var i = 0; i < freezeLayers.length; i++)
				{
					document.body.removeChild(freezeLayers[i]);
				}
		}
	if(document._lyteMenu && $L('lyte-menu').e.length == 0)
		{
			delete document._lyteMenu
			document.removeEventListener('keydown', this.keydownCheck);
			document.removeEventListener('click', lyteCloseMenu);
			window.removeEventListener('resize', this.resizeFunc);
		}
	ltPropQuery = this.getData('ltPropQuery'), nodeList = document.querySelectorAll(ltPropQuery);
	document.documentElement.removeEventListener(event == 'mouseenter' ? 'mousemove' : event, removeEvents.event);
	for(var i = 0; i < nodeList.length; i++)
		{
			nodeList[i].removeEventListener('keydown', removeEvents.keydown);
			delete nodeList[i].menu;
		}
	delete this.menuNodes;	
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
},

checkElementForMenu : function(event){
	var query = this.getData('ltPropQuery');
	var closetElem = this.closestFind.call(this, event.path ? event.path : this.composePath.call(this, event), query);
	if(closetElem != null)
		{
			this.$node.element = closetElem;
			closetElem.menu = this.$node;
			if(!this.parentMenu)
				{
					closetElem.addEventListener('keydown', this.getData('eventListeners').keydown);
					this.$node.toggle(event);
				}
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();		
		}		
},

didConnect : function(){
	var menuBody = $L('lyte-menu-body', this.$node).e[0];
	this.$node.toggle = function(event, flag){
		if(this.childComp.classList.contains('lyteMenuHidden') || flag )
			{
				if(['mousedown', 'mouseup'].indexOf(event.type) > -1)
					{
						document._lyteMenu.preventClick = false;
					}
				this.openMenu.call(this, event)
			}
		else
			{
				if(!this.childMenu && event.type.indexOf('mouse') == -1)
					{
						this.hideMenu.call(this, true, event)
					}
			}	
	}.bind(this);
	var div = document.createElement('div');
	div.classList.add('lyteMenuWrapperDiv');
	var children = this.arrayFrom.call(this, menuBody.children);
	menuBody.appendChild(div);
	for(var i = 0; i < children.length; i++)
		{
			div.appendChild(children[i]);
		}
	menuBody.addEventListener('click', this.optionSelect.bind(this));
	document.body.appendChild(menuBody);
	menuBody.parent = this.$node;
	this.childComp = menuBody;
	this.warpperDiv = div;
	menuBody.classList.add('lyteMenuHidden');
	this.$node.classList.add('lyteMenuClosed');
	var span = document.createElement('span');
	span.setAttribute('class','lyteArrow');
	menuBody.insertBefore(span,menuBody.children[0]);
	menuBody.style.width = this.getData('ltPropWidth');
	this.$node.constructor._observers[0].value.call(this);
},

data : function(){
	return{
		// user data
		ltPropContent : Lyte.attr('array',{ 'default' : []}),
		ltPropId : Lyte.attr('string',{'default' : ''}),
		ltPropClass : Lyte.attr('string', { 'default' : ''}),
		ltPropQuery : Lyte.attr('string', {'default' : ''}),
		ltPropEvent : Lyte.attr('string', {'default' : 'click'}),
		ltPropYield : Lyte.attr('boolean', {'default' : false}),
		ltPropUserValue : Lyte.attr('string', {'default' : ''}),
		ltPropSystemValue : Lyte.attr('string', {'default' : ''}),
		ltPropCallout : Lyte.attr('boolean', {'default' : false}),
		ltPropPosition : Lyte.attr('string', { 'default' : 'down'}),
		ltPropDescription : Lyte.attr('string', {'default' : ''}),
		ltPropTabIndex : Lyte.attr('number',{'default' : 0}),
		ltPropFreeze : Lyte.attr('boolean',{'default' : true}),
		ltPropWidth : Lyte.attr('string',{'default' : 'auto'}),
		ltPropHeight : Lyte.attr('string',{'default' : 'auto'}),
		ltPropQueryClass : Lyte.attr('string', {'default' : 'lyteMenuSelected'}),
		ltPropBoundary : Lyte.attr('object', {'default' : {}}),
		ltPropScroll : Lyte.attr('boolean', {'default' : true}),

		// system data 
		eventListeners : Lyte.attr('object', { 'default' : {}})
	}
},

setContextCss : function(evt, position){
	var element = this.$node.element;
	var menuBody = this.childComp;
	if(!position)
		{
			position = this.getData('ltPropPosition')
		}
	switch(position)
		{
			case 'top' :{
				menuBody.style.left = evt.clientX + 'px';
				menuBody.style.top = (evt.clientY - menuBody.getBoundingClientRect().height) + 'px';
				if(menuBody.getBoundingClientRect().top < 0)
					{
						menuBody.style.top = evt.clientY + 'px';
					}
				if(menuBody.getBoundingClientRect().bottom > window.innerHeight)
					{
						menuBody.style.top = (evt.clientY - menuBody.getBoundingClientRect().height) + 'px';
					}	
				break;
			}
			default : {
				menuBody.style.left = evt.clientX + 'px';
				menuBody.style.top = evt.clientY + 'px';
				if(menuBody.getBoundingClientRect().bottom > window.innerHeight)
					{
						menuBody.style.top = (evt.clientY - menuBody.getBoundingClientRect().height) + 'px';
					}
				if(menuBody.getBoundingClientRect().top < 0)
					{
						menuBody.style.top = evt.clientY + 'px';
					}	
			}
		}
	if(menuBody.getBoundingClientRect().left < 0)
		{
			menuBody.style.left = evt.clientX + 'px';
		}
	else if(menuBody.getBoundingClientRect().right > window.innerWidth)
		{
			menuBody.style.left = (evt.clientX - menuBody.getBoundingClientRect().width) + 'px';
		}				

},

openMenu : function(event){
	var onBeforeOpen, targetDiv = this.targetElem.call(this, event.target);
	if(this.getMethods('onBeforeOpen'))
		{
			onBeforeOpen = this.executeMethod('onBeforeOpen', this.$node, event);
		}
	if(onBeforeOpen != false)
		{
			this.childComp.classList.remove('lyteMenuHidden')
			this.$node.classList.remove('lyteMenuClosed');
			this.childComp.style.display = 'block'
			if(!this.parentMenu)
				{
					this.$node.element.classList.add(this.getData('ltPropQueryClass'))
				}
			if(this.getData('ltPropEvent') == 'contextmenu')
				{
					this.setContextCss.call(this, event);
				}	
			else
				{	
					this.setCss.call(this);
				}
			if(targetDiv[0])
				{
					 if(targetDiv[1].tagName == 'LYTE-MENU')
						{
							targetDiv[1].component.childMenu = this
							this.parentMenu = targetDiv[1].component
							targetDiv[1].component.childComp.addEventListener('mousemove',this.mouseleave)
						}
				}
			if(!this.parentMenu)
				{
					lyteCloseMenu(event, this.$node)
				}
			if(this.getData('ltPropFreeze')  && !this.parentMenu)
				{
					this.setZIndex.call(this)
				}
			else if(!document.menu)
				{
					window.addEventListener('scroll',this.addScrollPos, true)
					document.menu = this
				}
			if((event.type == 'mouseenter' || event.type == 'mouseover' || event.type == 'mousemove') && !this.childMenu && !this.parentMenu)
				{
					var evt = this.hoverClose.bind(this);
					this.setData('eventListeners.hoverClose', evt)
					document.addEventListener('mousemove', evt);
					this.$node.element.addEventListener('mousemove', this.preventEvent);
					this.childComp.addEventListener('mousemove', this.preventEvent);
				}
			this.childComp.style.removeProperty('height');	
			this.childComp.style.removeProperty('overflow-y');		
			if(this.getMethods('onOpen'))
				{
				   this.executeMethod('onOpen', this.$node, event);
				}
			this.heightCheck.call(this, this.childComp);
		}
	try{	
		if(event.type == 'click' || event.type == 'contextmenu' || event.type == 'dblclick')
			{
				event.stopPropagation();
			}
		}
		catch(err){
	}
},

heightCheck : function(childComp){
	var clientRect = childComp.getBoundingClientRect();
	if(this.getData('ltPropScroll'))
		{
			this.warpperDiv.addEventListener('wheel', this.preventEvent, true);
			if(clientRect.bottom > window.innerHeight)
				{
					this.warpperDiv.style.height = (window.innerHeight - clientRect.top) + 'px';
				}
			else
				{
					this.warpperDiv.style.height = this.getData('ltPropHeight');
				}	
		}
	else
		{	
			if(clientRect.bottom > window.innerHeight)
				{
					if(!$L('lyte-arrow', childComp).e[0])
						{
							this.arrowAppend.call(this, 'menuArrow-down', childComp);
							this.arrowAppend.call(this, 'menuArrow-up', childComp);
						}
					if(!childComp._wheel)
						{
							childComp._wheelFunc = this.upDown.bind(this);
							childComp.addEventListener('wheel', childComp._wheelFunc);
						}
					var height = window.innerHeight - clientRect.top;
					childComp.style.height = height + 'px';
					childComp.style.overflowY = 'hidden';
					childComp.maxScrollHeight = childComp.scrollHeight;
					childComp.scrollTop = 0;
					var up = $L('lyte-arrow.menuArrow-up', childComp).e[0]
					var down = $L('lyte-arrow.menuArrow-down', childComp).e[0];
					if(childComp.scrollTop == 0)
						{
							up.style.display = 'none';
						}
					else
						{
							up.style.display = 'inline-block';
							up.style.removeProperty('top');
						}	
					if(childComp.scrollTop == childComp.scrollHeight - childComp.getBoundingClientRect().height)
						{
							down.style.display = 'none';
						}
					else
						{
							down.style.display = 'inline-block';
							down.style.removeProperty('bottom');
						}			
				}
			else
				{
					if($L('lyte-arrow').e.length)
						{
							$L('lyte-arrow').css('display','none');
						}
					childComp.style.height = 'auto';
					childComp.removeEventListener('wheel', childComp._wheelFunc);
					delete childComp._wheelFunc;	
					delete childComp._wheel;
				}	
		}	
},

arrowAppend : function(className, childComp){
	var arrow = document.createElement('lyte-arrow');
	var i = document.createElement('i');
	arrow.appendChild(i);
	arrow.classList.add(className);
	childComp.appendChild(arrow);
	arrow.addEventListener('click', this.upDown.bind(this));
},

composePath : function(event){
		var arr = [], node = event.target;
		while(node.tagName != 'HTML')
			{
				arr.push(node);
				node = node.parentElement;
			}
		return arr;	
},

upDown : function(event){
	var comp = this.closestFind.call(this, event.path ? event.path : this.composePath.call(this, event), 'lyte-arrow');
	var height = $L('lyte-menu-item', this.childComp).e[0].getBoundingClientRect().height, b;
	if(event.type == 'wheel')
		{
			var fact = (navigator.userAgent.toLowerCase().indexOf('firefox') != -1 && navigator.userAgent.toLowerCase().indexOf('ubuntu') != -1) ? 1/3 : 3 ;
			b = event.deltaY/fact;
			height = Math.ceil(Math.abs(b));
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
	if((comp && comp.classList.contains('menuArrow-up')) || b < 0)
		{
			this.childComp.scrollTop -= height;
			this.childComp.scrollTop = this.childComp.scrollTop < 0 ? 0 : this.childComp.scrollTop
		}
	else
		{
			this.childComp.scrollTop += height;
			this.childComp.scrollTop = this.childComp.scrollTop > (this.childComp.maxScrollHeight - this.childComp.getBoundingClientRect().height) ? (this.childComp.maxScrollHeight - this.childComp.getBoundingClientRect().height) : this.childComp.scrollTop
		}
	if(this.childComp.scrollTop == 0)
		{
			$L('lyte-arrow.menuArrow-up', this.childComp).e[0].style.display = 'none';
		}		
	else
		{
			$L('lyte-arrow.menuArrow-up', this.childComp).e[0].style.display = 'inline-block';
			$L('lyte-arrow.menuArrow-up', this.childComp).e[0].style.top = this.childComp.scrollTop + 'px';
		}	
	if(this.childComp.scrollTop == parseInt(this.childComp.maxScrollHeight - this.childComp.getBoundingClientRect().height))
		{
			$L('lyte-arrow.menuArrow-down', this.childComp).e[0].style.display = 'none';
		}		
	else
		{
			$L('lyte-arrow.menuArrow-down', this.childComp).e[0].style.display = 'inline-block';
			$L('lyte-arrow.menuArrow-down', this.childComp).e[0].style.bottom = -this.childComp.scrollTop + 'px';			
		}	
	event.preventDefault();
	event.stopPropagation();
	event.stopImmediatePropagation();		
},

elementsFromPointCal : function(x, y){
		var arr = [], element = document.elementFromPoint(x, y);
		while(element != document && element != document.documentElement && element != document.body && element.tagName != 'LYTE-MENU-BODY' )
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

hoverClose : function(event){
	if(this.$node)
		{
			if((document.elementsFromPoint ? document.elementsFromPoint(event.clientX, event.clientY) : this.elementsFromPointCal.call(this, event.clientX, event.clientY)).indexOf(this.$node.element) == -1)
				{
					this.hideMenu.call(this, true, event);
					var evt = this.getData('eventListeners.hoverClose');
					this.$node.element.removeEventListener('mousemove', this.preventEvent);
					this.childComp.removeEventListener('mousemove', this.preventEvent);
					this.warpperDiv.removeEventListener('wheel', this.preventEvent, true);
					document.removeEventListener('mousemove', evt);
				}
		}
},

mouseleave : function(event){
	var component = this.parent.component, target = component.targetElem.call(component, event.target);
	if(component.childMenu)
		{
			if(target[1] == component.$node && target[0] != component.childMenu.$node.element && target[0])
				{
					this.removeEventListener('mousemove',component.childMenu.mouseleave)	
					component.childMenu.hideMenu.call(component.childMenu, true, event)
				}
		}
},

hideMenu : function(flag, event){
	var onBeforeClose;
		if(this.getMethods('onBeforeClose'))
			{ 
			   onBeforeClose = this.executeMethod('onBeforeClose', this.$node, event);
		    }
	if(onBeforeClose != false)	
		{
			if(this.childMenu)
				{
					this.childMenu.hideMenu.call(this.childMenu, flag, event);
				}
			if(this.parentMenu)	
				{
					delete this.parentMenu.childMenu 
					delete this.parentMenu
				}
			else 
				{	
					this.$node.element.classList.remove(this.getData('ltPropQueryClass'))	
					delete document.menu 
					window.removeEventListener('scroll',this.addScrollPos, true)
				}
			this.childComp.classList.add('lyteMenuHidden')
			this.$node.classList.add('lyteMenuClosed');
			if(this.getData('ltPropFreeze') && !this.parentMenu)
				{
					this.setZIndex.call(this, flag)
				}
			if(this.getMethods('onClose'))
				{
				 	this.executeMethod('onClose', this.$node, event);
				}
		}
},

targetElem : function(nodeName){
	var currNode
	while(nodeName.tagName != 'LYTE-MENU-BODY' && nodeName.tagName != 'BODY')
		{
			if(nodeName.tagName == 'LYTE-MENU-ITEM')
				{
					currNode = nodeName
				}
			nodeName = nodeName.parentElement;
		}
	return [currNode, nodeName.parent]	
},

optionSelect : function(event){
	var nodeName = this.targetElem.call(this, event.target)[0], flag
	if((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined){return false;}
	if(this.getMethods('onMenuClick') && nodeName)
        {
          var value;
          if(this.getData('ltPropYield'))
              {
                value = nodeName.getAttribute('data-value')
              }
           else
              {
                var ltPropContent = this.getData('ltPropContent')
                if(nodeName.hasAttribute('grporder'))
	                  {
	                     var grp = ltPropContent[parseInt(nodeName.getAttribute('grporder'))]
	                     value = grp[Object.keys(grp)[0]][parseInt(nodeName.getAttribute('elemorder'))]
	                  }
	              else
	                  {
	                      value = ltPropContent[parseInt(nodeName.getAttribute('elemorder'))]
	                  }    
              }   
           flag = this.executeMethod('onMenuClick', value, event, this.$node);
       }
    if(this.childMenu && !flag)
    	{
    		event.stopPropagation()
    	}   
  },
    setProperWidth:function(){
		var selectbox = this.$node.element;
		var selectboxwidth = selectbox.getBoundingClientRect().width;
		if(this.childComp.style.width)
			{
				this.childComp.style.width = 'auto';
			}
		// var Menu = this.childComp
		// var style = Menu.getAttribute('style')
		// style = style?style:''
		// var width = window.getComputedStyle(this.childComp).width
		// Menu.setAttribute('style',style + 'width:' + width)
		// var Menuwidth = Menu.getBoundingClientRect().width

		// if(selectboxwidth > Menuwidth){
		// 	var style = Menu.getAttribute('style')
		// 	style = style?style:''
		// 	Menu.style.width = selectboxwidth + 'px'
		// }
		// else if(selectboxwidth < Menuwidth){
		// 	var style = Menu.getAttribute('style')
		// 	style = style?style:''
		// 	Menu.style.width = width + 'px'
		// }			
	},


	setLeftExceedForDown:function(element,container){
		var scrolledLeft = window.pageXOffset || document.documentElement.scrollLeft
		var elementBCR = element.getBoundingClientRect()
		var elementLeft = elementBCR.left
		var elementWidth = elementBCR.width
		var containerBCR = container.getBoundingClientRect()
		var containerWidth = containerBCR.width
		var total = scrolledLeft + elementLeft + elementWidth - containerWidth
		return total
	},

	setLeftNotExceedForDown:function(element){
		var scrolledLeft = window.pageXOffset || document.documentElement.scrollLeft
		var elementBCR = element.getBoundingClientRect()
		var elementLeft = elementBCR.left
		var total = scrolledLeft + elementLeft
		return total
	},

	setTopAboveForDown:function(element,container){
		var scrolledHeight = window.pageYOffset || document.documentElement.scrollTop
		var elementBCR = element.getBoundingClientRect()
		var elementTop = elementBCR.top
		var containerBCR =  container.getBoundingClientRect()
		var containerHeight = containerBCR.height
		var total = scrolledHeight + elementTop  - containerHeight
		return total
	},
	
	setTopBelowForDown:function(element){
		var scrolledHeight = window.pageYOffset || document.documentElement.scrollTop
		var elementBCR = element.getBoundingClientRect()
		var elementTop = elementBCR.top
		var elementHeight = elementBCR.height
		var total = scrolledHeight + elementTop + elementHeight
		return total
	},

	setLeftForRight:function(element){
		var scrolledWidth = window.pageXOffset || document.documentElement.scrollLeft
		var elementBCR = element.getBoundingClientRect()
		var elementLeft = elementBCR.left
		var elementWidth = elementBCR.width
		var total = scrolledWidth + elementLeft + elementWidth
		return total
	},

	setRightForRight:function(element,container){
		var scrolledWidth = window.pageXOffset || document.documentElement.scrollLeft
		var elementBCR = element.getBoundingClientRect()
		var containerBCR = container.getBoundingClientRect()
		var elementLeft = elementBCR.left
		var containerWidth = containerBCR.width
		var total = scrolledWidth + elementLeft - containerWidth
		return total
	},

	setTopForRight:function(element){
		var scrolledHeight = window.pageYOffset || document.documentElement.scrollTop
		var elementBCR = element.getBoundingClientRect()
		var elementTop = elementBCR.top
		var total = scrolledHeight + elementTop
		return total
	},

	setTopForRightAbove:function(element,container){
		var scrolledHeight = window.pageYOffset || document.documentElement.scrollTop
		var elementBCR = element.getBoundingClientRect()
		var elementTop = elementBCR.top
		var elementHeight = elementBCR.height
		var containerBCR = container.getBoundingClientRect()
		var containerHeight = containerBCR.height
		var total = scrolledHeight + elementTop + elementHeight - containerHeight
		return total
	},

	setCorrectClass:function(correct){
		var arrowDiv = this.childComp.querySelector('.lyteArrow')
		var arrowClass = arrowDiv.classList
		for(var i=0;i<arrowClass.length;i++){
			if(arrowClass[i] == 'lyteArrow' || arrowClass[i] == correct){
				continue
			}
			else{
				arrowDiv.classList.remove(arrowClass[i])
				i--;
			}
		}
		arrowDiv.classList.add(correct)
		arrowDiv.classList.add('lyteArrowIcon')
	},
	setCss:function(){
		if(!this.childComp || this.childComp.classList.contains('lyteMenuHidden')){
			return;
		}
		this.setProperWidth()
		var elem1= this.childComp
		var wwidth=window.innerWidth
		var wheight=window.innerHeight
		var ewidth=elem1.offsetWidth
		var eheight=elem1.offsetHeight
		var parNode = this.$node.element;
		var evtCheck = ['mouseover','mousemove','mouseenter'].indexOf(this.getData('ltPropEvent')) == -1;
		var bcr = parNode.getBoundingClientRect()
		if(this.getData('ltPropPosition') == 'down'){
			elem1.style.top = this.setTopBelowForDown(parNode) + 'px'
			var top = elem1.getBoundingClientRect().top
			if(top+eheight>wheight && bcr.top>eheight){
				elem1.style.top = this.setTopAboveForDown(parNode,elem1) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowBottom')
					elem1.style.top = this.setTopAboveForDown(parNode,elem1) - 9 +"px"
				}		
			}
			else if(bcr.top + eheight + bcr.height <= wheight){
				elem1.style.top = this.setTopBelowForDown(parNode) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowTop')
					elem1.style.top = this.setTopBelowForDown(parNode) + 9 +"px"	

				}
			}
			elem1.style.left = this.setLeftNotExceedForDown(parNode) + 'px'
			var left= elem1.getBoundingClientRect().left
			if(left+ewidth>wwidth && left>bcr.left+bcr.width-elem1.offsetWidth){
				elem1.style.left = this.setLeftExceedForDown(parNode,elem1) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var denom = ewidth/100
					var num = ewidth - (bcr.width/2) -arrow.offsetWidth/2
					var per = num/denom 
					arrow.style.left = per +"%" 
				}
			}
			else if(bcr.left+ewidth<=wwidth){
				elem1.style.left= this.setLeftNotExceedForDown(parNode) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var num = bcr.width/2 - arrow.offsetWidth/2
					var denom = ewidth/100
					var per = num/denom
					arrow.style.left = per +"%" 
				}
			}
			if(bcr.width > ewidth){ 
			     var arrow = this.childComp.querySelector('.lyteArrow')
				arrow.style.left = ((ewidth/2 - arrow.offsetWidth/2)/ewidth)*100 +"%"
			}
			//this.setAlignment.call(this)
		}
		else if(this.getData('ltPropPosition') == 'right'){
			elem1.style.left = this.setLeftForRight(parNode) + "px"
			var ebcr = elem1.getBoundingClientRect()
			if(ebcr.left + ebcr.width > window.innerWidth && bcr.left - ebcr.width > 0){   
				elem1.style.left = this.setRightForRight(parNode,elem1) + "px"
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowRight')
					var arrow = this.childComp.querySelector('.lyteArrow').getBoundingClientRect()
					elem1.style.left = this.setRightForRight(parNode,elem1) - 9 + "px"
				}
			}
			else{
				elem1.style.left = this.setLeftForRight(parNode) + "px"
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowLeft')
					var arrow = this.childComp.querySelector('.lyteArrow').getBoundingClientRect()
					elem1.style.left = this.setLeftForRight(parNode) + 9 + "px"
				}
			}
			elem1.style.top = this.setTopForRight(parNode) + 'px'
			ebcr = elem1.getBoundingClientRect()
			if(ebcr.top + ebcr.height > window.innerHeight){
				elem1.style.top = this.setTopForRightAbove(parNode,elem1) + "px"
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var num = (ebcr.height - bcr.height/2 - (arrow.getBoundingClientRect().height/2)) * 100 
					var denom = ebcr.height
					var per = num/denom
					arrow.style.top = per +"%"
				} 
			}
			else{
				elem1.style.top = this.setTopForRight(parNode) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var num = ((bcr.height/2) - (arrow.getBoundingClientRect().height/2)) * 100
					var denom = ebcr.height
					var per = num/denom
					arrow.style.top = per + "%"
				}
			}
			//this.setAlignment.call(this)
		}
		else if(this.getData('ltPropPosition') == 'top'){
			elem1.style.top = this.setTopAboveForDown(parNode,elem1) + 'px'
			var top = elem1.getBoundingClientRect().top
			if(top < 0 && bcr.top + bcr.height + eheight < wheight){
				elem1.style.top = this.setTopBelowForDown(parNode) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowTop')
					elem1.style.top = this.setTopBelowForDown(parNode) + 9 +"px"
				}
			}
			else{
				elem1.style.top = this.setTopAboveForDown(parNode,elem1) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowBottom')
					elem1.style.top = this.setTopAboveForDown(parNode,elem1) - 9 +"px"	
				}
			}
			elem1.style.left = this.setLeftNotExceedForDown(parNode) + 'px'
			var left= elem1.getBoundingClientRect().left
			if(left+ewidth>wwidth && left>bcr.left+bcr.width-elem1.offsetWidth){
				elem1.style.left = this.setLeftExceedForDown(parnode,elem1) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var denom = ewidth/100
					var num = ewidth - (bcr.width/2) -arrow.offsetWidth/2
					var per = num/denom 
					arrow.style.left = per +"%" 
				}
			}
			else if(bcr.left+ewidth<=wwidth){
				elem1.style.left= this.setLeftNotExceedForDown(parNode) +'px'
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var num = bcr.width/2 - arrow.offsetWidth/2
					var denom = ewidth/100
					var per = num/denom
					arrow.style.left = per +"%" 
				}
			}
			if(bcr.width > ewidth){      //Think this is for multiselect(CODE HELP)
				arrow.style.left = ((ewidth/2 - arrow.offsetWidth/2)/ewidth)*100 +"%"
			}
		}
		else if(this.getData('ltPropPosition') == 'left'){
			elem1.style.left = this.setRightForRight(parNode,elem1) + "px"
			var ebcr = elem1.getBoundingClientRect()
			if(ebcr.left < 0 && bcr.left + bcr.width + ebcr.width < wwidth){
				elem1.style.left = this.setLeftForRight(parNode) + "px"
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowLeft')
					var arrow = this.childComp.querySelector('.lyteArrow').getBoundingClientRect()
					elem1.style.left = this.setLeftForRight(parNode) + 9 + "px"
				}
			}
			else{
				elem1.style.left = this.setRightForRight(parNode,elem1) + "px"
				if(this.getData('ltPropCallout') && evtCheck){
					this.setCorrectClass('lyteArrowRight')
					var arrow = this.childComp.querySelector('.lyteArrow').getBoundingClientRect()
					elem1.style.left = this.setRightForRight(parNode,elem1) - 9 + "px"
				}
			}
			elem1.style.top = this.setTopForRight(parNode) + 'px'
			ebcr = elem1.getBoundingClientRect()
			if(ebcr.top + ebcr.height > window.innerHeight){
				elem1.style.top = this.setTopForRightAbove(parNode,elem1) + "px"
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var num = (ebcr.height - bcr.height/2 - (arrow.getBoundingClientRect().height/2)) * 100 
					var denom = ebcr.height
					var per = num/denom
					arrow.style.top = per +"%" 
				}
			}
			else{
				elem1.style.top = this.setTopForRight(parNode) + 'px'
				if(this.getData('ltPropCallout') && evtCheck){
					var arrow = this.childComp.querySelector('.lyteArrow')
					var num = ((bcr.height/2) - (arrow.getBoundingClientRect().height/2)) * 100
					var denom = ebcr.height
					var per = num/denom
					arrow.style.top = per + "%"
				}
			}
		}
	},

	checkForBoundary : function(menuBody){
		var clientRect = this.$node.element.getBoundingClientRect();
		var boundary = this.getData('ltPropBoundary');
		if((clientRect.left < (boundary.hasOwnProperty('left') ? boundary.left : 0)) || (clientRect.right > (boundary.hasOwnProperty('right') ? boundary.right : window.innerWidth)) || (clientRect.top < (boundary.hasOwnProperty('top') ? boundary.top : 0)) || (clientRect.bottom > (boundary.hasOwnProperty('bottom') ? boundary.bottom : window.innerHeight)))
			{	
				this.hideMenu.call(this);
			}
	},

	traverseList:function(event){
		var kc = event.keyCode
		if((this.childComp && this.childComp.classList.contains('lyteMenuHidden'))||(kc != 13 && kc != 40 && kc != 38)){
				return
		}
		// event.preventDefault();
		var cursel = this.childComp.querySelector('.lyteMenuSelection')
		if(!cursel){
			var elem = this.childComp.querySelector('lyte-menu-item')
			if(elem){
				elem.classList.add('lyteMenuSelection')
				return ;
			}
		}
		
			var elements = this.childComp.querySelectorAll('lyte-menu-item')
			for(var i=0;i<elements.length;i++){
				if(elements[i].classList.contains('lyteMenuSelection')){
					break;
				}
			}
			if(kc == 13){
					elements[i].click()
			}
			else if(kc == 38 && i != 0){
					var j = i
					i=i-1
					for(;i>-1;i--){
						if(!elements[i].classList.contains('lyteMenuActive') && !elements[i].classList.contains('lyteMenuFiltered')){
							break;
						}
					}
					if(i != -1){
						elements[j].classList.remove('lyteMenuSelection')
						elements[i].classList.add('lyteMenuSelection')
					}							
			}
			else if(kc == 40 && i != elements.length -1){
					var j = i
					i=i+1
					for(;i<elements.length;i++){
						if(!elements[i].classList.contains('lyteMenuActive') && !elements[i].classList.contains('lyteMenuFiltered')){
							break;
						}
					}
					if(i != elements.length){
						elements[j].classList.remove('lyteMenuSelection')
						elements[i].classList.add('lyteMenuSelection')
					}
			}
		},
	setAlignment:function(){
		var parNode  = this.$node.element;
		var bcr = parNode.getBoundingClientRect()
		var elem1= this.childComp
		var eheight=elem1.offsetHeight
		var top= elem1.getBoundingClientRect().top
		var bcr = parNode.getBoundingClientRect()
		if(top < bcr.top){
			elem1.style.top = elem1.offsetTop + bcr.top -(top+eheight+this.childComp.querySelector('.lyteArrow').offsetHeight) + "px"
		}
	},
	setFreeze:function(nodeName){
		$L('.lytemenufreezelayer:not(.nogroup)').removeClass('lyteMenuHidden')
		var node = $L('.lytemenufreezelayer.left').e[0], rect = nodeName.getBoundingClientRect()
		node.style.height = rect.height +"px"
		node.style.width = rect.left + "px"
		node.style.top = rect.top + "px"
		document.body.style.overflow = 'hidden'
		node = $L('.lytemenufreezelayer.right').e[0]
		node.style.height = rect.height +"px"
		node.style.width = rect.left + "px"
		node.style.top = rect.top + "px"
		node = $L('.lytemenufreezelayer.top').e[0]
		node.style.height = rect.top +"px"
		node = $L('.lytemenufreezelayer.bottom').e[0]
		node.style.height = (window.innerHeight - (rect.top + rect.height)) +"px"
		document.addEventListener('wheel', this.preventEvent);
		document.addEventListener('keydown',this.preventEvent);
	},
	preventEvent : function(event){
		if(!(event.metaKey || event.shiftKey || event.ctrlKey))
			{
				if(this != document && event.type == 'wheel')
					{
						if(this.classList.contains('lyteMenuWrapperDiv'))
							{
								this.scrollTop += event.deltaY;
								var evt = new Event('scroll',{bubbles : true});
								this.dispatchEvent(evt)
							}
					}
				event.preventDefault();
				event.stopPropagation();
			}
	},
	addScrollPos : function(){
		var component = document.menu
		component.setCss.call(component)
		while(component.childMenu)
			{
				component = component.childMenu
				component.setCss.call(component)
			}
		component.checkForBoundary.call(component, component.childComp);			

	},
	removeFreeze : function(){
		if(!document.menu)
			{
				document.removeEventListener('wheel', this.preventEvent)
				document.removeEventListener('keydown',this.preventEvent)
				$L('.lytemenufreezelayer').addClass('lyteMenuHidden')
			}
	},
	setZIndex : function(flag){
		var nodeName = this.$node.element;
		while(nodeName.tagName != 'BODY')
			{
				if(nodeName.classList.contains('lyteMenuGroup'))
					{
						if(!flag)
							{
								this.setFreeze.call(this, nodeName)
							}
						else
							{
								this.removeFreeze.call(this)
							}
						break		
					}
				else
					{
						nodeName = nodeName.parentElement;
					}	
			}
		if(nodeName.tagName == 'BODY')
			{
				if(flag && !document.menu)
					{
						this.removeFreeze.call(this)
					}
				else 
					{	
						var freezeLayer = $L('.lytemenufreezelayer.nogroup').e[0];
						freezeLayer.classList.remove('lyteMenuHidden');
					}
			}	

	}
});

  var lyteCloseMenu = function(event, element, flag){
  	if(document._lyteMenu.preventClick != false || element)
	  	{
	  		if((event && event.button != 2) || element || flag)
				{
					var menus = $L('lyte-menu').e;
					for(var i = 0; i < menus.length; i++)
						{
							if(menus[i] != element && !menus[i].component.childComp.classList.contains('lyteMenuHidden'))
								{
									menus[i].component.hideMenu.call(menus[i].component, element ? false : true, event)
								}
						}
				}
		}
    if(event && event.type == 'click')
		{
			document._lyteMenu.preventClick = true;
		}	
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor){ descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps){ defineProperties(Constructor.prototype, protoProps);} if (staticProps){ defineProperties(Constructor, staticProps);} return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass){ Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} }

var lyteMenuItem = function (_HTMLElement) {
  _inherits(lyteMenuItem, _HTMLElement);

  function lyteMenuItem() {
    _classCallCheck(this, lyteMenuItem);

    return _possibleConstructorReturn(this, (lyteMenuItem.__proto__ || Object.getPrototypeOf(lyteMenuItem)).call(this));
  }

  _createClass(lyteMenuItem, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      if (typeof shortcut == "function") {
        newValue = JSON.parse(newValue);
        var newKey = newValue.key;
        var type = newValue.type;
        var wait = newValue.wait;
        if (!oldValue) {
          oldValue = {};
        }
        else{
        	oldValue = JSON.parse(oldValue)
        }
        shortcut.push({
          newKey: newKey,
          type: type,
          wait: wait,
          oldKey: oldValue.key,
          value: this
        });
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['lyte-shortcut'];
    }
  }]);

  return lyteMenuItem;
}(HTMLElement);
// Define the new element


customElements.define('lyte-menu-item', lyteMenuItem);