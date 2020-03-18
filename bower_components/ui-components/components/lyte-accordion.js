/* Needs more thought and testing */
Lyte.Component.register('lyte-accordion',{
_template:"<template tag-name=\"lyte-accordion\">\t<lyte-yield yield-name=\"yield\">\t</lyte-yield></template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropDuration","ltPropHeight","ltPropExclusive","ltPropYield"],
	data: function(){
		return { 
			'ltPropDuration':Lyte.attr("string",{"default": '0.2s'}),
			'ltPropHeight':Lyte.attr("string"),
			'ltPropExclusive':Lyte.attr("string",{"default":"true"}),
			'ltPropYield':Lyte.attr("boolean",{"default":"true"})
		}
	},
	init:function(){
		
	},
	didDestroy : function(){
		var allNodes = this.$node.querySelectorAll('lyte-accordion-item')
		for(var i=0;i<allNodes.length;i++){
			var curValue = allNodes[i].getAttribute('lyte-shortcut')
			if(curValue){
				allNodes[i].setAttribute('lyte-shortcut',JSON.stringify({}))
			}
		}
	},
	getAllHeights:function(){
		this.setData('heights',{})
		var node = this.$node.querySelector('lyte-yield')
		var nodes = node.children
		var flag = i
		for(var i=0;i<nodes.length;i++){
			if(nodes[i].tagName == 'TEMPLATE'){
				continue
			}
			var body = nodes[i].children[1]
			if(!body || body.tagName == 'TEMPLATE'){
				continue
			}
			body.setAttribute('map',i)
			var isStyle = body.style.height
			this.getData('heights')[i] = {}
			if(!isStyle){
				this.getData('heights')[i].height = body.getBoundingClientRect().height + 'px'
				this.getData('heights')[i].conf = true
			}
			else{
				this.getData('heights')[i].height = isStyle
				this.getData('heights')[i].conf = false
			}
			if(!nodes[i].classList.contains('lyteAccordionActive')){
				body.style.height = "0px"
				body.style.paddingTop = "0px"
				body.style.paddingBottom = "0px"
			}
			else if(nodes[i].classList.contains('lyteAccordionActive') && this.getData('ltPropExclusive') == "true"){
				flag = i;
			}
		}
		if(this.getData('ltPropExclusive') == "true"){
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].tagName == 'TEMPLATE'){
					continue
				}
				var body = nodes[i].children[1]
				if(nodes[i].classList.contains('lyteAccordionActive') && flag != i){
					nodes[i].classList.remove('lyteAccordionActive')
					body.style.height = "0px"
					body.style.paddingTop = "0px"
					body.style.paddingBottom = "0px"
				}
			}
		}
	},
	didConnect:function(){		
		this.getAllHeights()
	},
	getConfiguration:function(){
		var config = {}
		config.transition = this.getData('ltPropDuration')
		config.height = this.getData('ltPropHeight')
		config.exclusive = this.getData('ltPropExclusive')
		return config
	}
})
function findProperParentForStart(element){
	var properparent;
	var stack = []
	var found = false
	while(element.tagName != "LYTE-YIELD" && element.tagName != 'HTML'){
		properparent = element
		stack.push(element)
		element = element.parentElement
		if(element == null){
			return null
		}
	}
	for(var i=stack.length - 1;i > -1;i--){
		if(stack[i].tagName === 'LYTE-ACCORDION-HEADER' || (stack.length === 1 && stack[i].tagName === 'LYTE-ACCORDION-ITEM')){
			found = true
			break;
		}
	}
	if(!found){
		return null;
	}
	return properparent.children[0]
}
function findProperParent(element){
	var properparent; 
	if(!element){
		return ;
	}
	while(element.tagName != "LYTE-YIELD" && element.tagName != 'HTML'){
		properparent = element
		element = element.parentElement
	}
	return properparent.children[0]

}
document.addEventListener('click',function(event){
	var elementClicked = findProperParentForStart(event.target)
	if(elementClicked == null){
		return ;
	}
	var parent  = elementClicked
	while(parent.tagName != 'HTML' && parent.tagName != 'LYTE-ACCORDION'){
		parent = parent.parentElement
		if(!parent){
			return ;
		}
	}
	if(parent.tagName == 'HTML'){
		return ;
	}
	var temp  = parent.querySelector('lyte-yield')
	var childs = temp.children
	var flag = true
	for(var i=0;i<childs.length;i++){
		if(childs[i].children[0] == elementClicked){
			flag = false
			break;
		}
	}
	if(flag){
		return ;
	}
	var sibling = temp.children[i].children[1]
	if(!sibling){
		return ;
	}
	var itsStyle = window.getComputedStyle(sibling)
	var component = temp.parentElement.component
	var configuration = component.getConfiguration()
	var transition = configuration.transition
 	if(transition){
 		sibling.style.transitionDuration = transition
 	}
 	var activeElement = $L('.lyteAccordionActive',temp.parentElement).e[0]
	if(configuration && configuration.exclusive && configuration.exclusive.toString() == "true" && activeElement && activeElement != sibling.parentElement){	
			if(component.getMethods('onBeforeClose')){
				var argumentToPass = findProperParent(event.target)
	 			var returnval = component.executeMethod('onBeforeClose',event,argumentToPass,component)
	 			returnval = returnval == undefined?true:returnval
	 			if(returnval){
	 				activeElement.children[1].style.height = '0px'
	 				activeElement.children[1].style.paddingTop = "0px"
	 				activeElement.children[1].style.paddingBottom = "0px"
					activeElement.children[1].style.overflow = "hidden"
					
					activeElement.classList.remove('lyteAccordionActive')
					if(component.getMethods('onClose')){
	 					component.executeMethod('onClose',event,argumentToPass,component)
	 				}
	 			}
	 			else{
	 				return ;
	 			} 			
	 		}
	 		else{
	 			var retval = findProperParent(event.target)
	 			activeElement.children[1].style.height = '0px'
	 			activeElement.children[1].style.paddingTop = "0px"
	 			activeElement.children[1].style.paddingBottom = "0px"
				activeElement.children[1].style.overflow = "hidden"
				activeElement.classList.remove('lyteAccordionActive')
				if(component.getMethods('onClose')){
	 				component.executeMethod('onClose',event,retval,component)
	 			}
	 		}
		
	}
	
	if(itsStyle.height == "0px"){
	 	
	 	if(component.getMethods('onBeforeOpen')){
	 		var retvalforopen = component.executeMethod('onBeforeOpen',event,findProperParent(event.target),component)
	 		retvalforopen = retvalforopen == undefined?true:retvalforopen
	 		var heightToSet =  configuration.height
	 		if(retvalforopen){
	 			if(component.getData('heights')[sibling.getAttribute('map')].conf && heightToSet){
	 				sibling.style.height = heightToSet
	 			}
	 			else{
	 				sibling.style.height = component.getData('heights')[sibling.getAttribute('map')].height
	 			}
	 			sibling.style.overflow = "auto"
	 			sibling.style.paddingTop = "15px"
	 			sibling.style.paddingBottom = "15px"
	 			sibling.parentElement.classList.add('lyteAccordionActive')
	 			if(component.getMethods('onOpen')){
	 				component.executeMethod('onOpen',event,findProperParent(event,event.target),component)
	 			}
	 			if(component.getMethods('onChange')){
	 				component.executeMethod('onChange',event,findProperParent(event,event.target),component)
	 			}
	 		}
	 		else{
	 			return;
	 		}	 		
	 	}
	 	else{
	 		var heightToSet =  configuration.height
	 		if(component.getData('heights')[sibling.getAttribute('map')].conf && heightToSet){
	 			sibling.style.height = heightToSet
	 		}
	 		else{
	 			sibling.style.height = component.getData('heights')[sibling.getAttribute('map')].height
	 		}
	 		sibling.style.overflow = "auto"
	 		sibling.style.paddingTop = "15px"
	 		sibling.style.paddingBottom = "15px"
	 		sibling.parentElement.classList.add('lyteAccordionActive')
	 		if(component.getMethods('onOpen')){
	 			component.executeMethod('onOpen',event,findProperParent(event.target),component)
	 		}
	 		if(component.getMethods('onChange')){
	 			component.executeMethod('onChange',event,findProperParent(event.target),component)
	 		}
	 	}
	 }
	 else{
	 	if(component.getMethods('onBeforeClose')){
	 		var trueorfalse = component.executeMethod('onBeforeClose',event,findProperParent(event.target),component)
	 		trueorfalse = trueorfalse == undefined?true:trueorfalse
	 		if(trueorfalse){
	 			sibling.style.overflow = "hidden"
	 			sibling.parentElement.classList.remove('lyteAccordionActive')
	 			 sibling.style.height = "0px"
	 			sibling.style.paddingTop = "0px"
	 			sibling.style.paddingBottom = "0px"
	 			if(component.getMethods('onClose')){
	 				component.executeMethod('onClose',event,findProperParent(event.target),component)
	 			}
	 			if(component.getMethods('onChange')){
	 				component.executeMethod('onChange',event,findProperParent(event.target),component)
	 			}
	 		}
	 		else{
	 			return;
	 		}
	 	}
	 	else{
	 		sibling.style.overflow = "hidden"
	 		sibling.parentElement.classList.remove('lyteAccordionActive')
	 		sibling.style.height = "0px"
	 		sibling.style.paddingTop = "0px"
	 		sibling.style.paddingBottom = "0px"
	 		if(component.getMethods('onClose')){
	 			component.executeMethod('onClose',event,findProperParent(event.target),component)
	 		}
	 		if(component.getMethods('onChange')){
	 			component.executeMethod('onChange',event,findProperParent(event.target),component)
	 		}
	 	}
	 }
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor){ descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps){ defineProperties(Constructor.prototype, protoProps);} if (staticProps){ defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass){ Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} }

var lyteAccordionItem = function (_HTMLElement) {
  _inherits(lyteAccordionItem, _HTMLElement);

  function lyteAccordionItem() {
    _classCallCheck(this, lyteAccordionItem);

    return _possibleConstructorReturn(this, (lyteAccordionItem.__proto__ || Object.getPrototypeOf(lyteAccordionItem)).call(this));
  }

  _createClass(lyteAccordionItem, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      if (typeof shortcut == "function") {
        if (!newValue) {
          return;
        }
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

  return lyteAccordionItem;
}(HTMLElement);
// Define the new element


customElements.define('lyte-accordion-item', lyteAccordionItem);