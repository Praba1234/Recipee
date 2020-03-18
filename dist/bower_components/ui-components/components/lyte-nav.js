Lyte.Component.register("lyte-nav",{
_template:"<template tag-name=\"lyte-nav\"></template>",
_dynamicNodes : [],
_observedAttributes :["arrowTop","arrowBot","ltPropClick","ltPropAlignment"],
	didDestroy : function(){
		var allNodes = this.$node.querySelectorAll('lyte-nav-item')
		for(var i=0;i<allNodes.length;i++){
			var curValue = allNodes[i].getAttribute('lyte-shortcut')
			if(curValue){
				allNodes[i].setAttribute('lyte-shortcut',JSON.stringify({}))
			}
		}
	},
	didConnect:function(){
		if(this.getData('ltPropAlignment') == "vertical"){
			var nonScrollableDiv = document.createElement('div')
			nonScrollableDiv.setAttribute('class','lyteNavDiv')
			var children = this.$node.children
			nonScrollableDiv.style.overflow = "hidden"
			var length = children.length
			var arrows = this.$node.querySelectorAll('lyte-arrow')
			if(arrows.length != 0){
				for(var i=0;i<arrows.length;i++){
					arrows[i].style.display = "none"
				}
			}
			for(var i=0;i<length;i++){
				LyteComponent.appendChild(nonScrollableDiv,children[0])
			}
			LyteComponent.appendChild(this.$node,nonScrollableDiv)
			var arrows = this.$node.querySelectorAll('lyte-arrow')
			if(arrows.length == 0){
				this.addArrow('arrow-up')
				this.addArrow('arrow-down')
			}
			else{
				this.$node.insertBefore(arrows[0],this.$node.children[0])
				this.$node.appendChild(arrows[1])
			}
			arrows = this.$node.querySelectorAll('lyte-arrow')
			this.dispArrow.call(this)
			var arrowDownId,arrowUpId;
			var div = this.$node.querySelector('.lyteNavDiv');
			var that = this
			arrows[0].addEventListener('mouseenter',this.moveup.bind(this))

			arrows[1].addEventListener('mouseenter',this.movedown.bind(this))


			div.addEventListener('wheel',function(e){
				e.preventDefault()
				if (e.deltaY < 0) {	
    				div.scrollTop = div.scrollTop - 10
    				if(that.$node.querySelectorAll('lyte-arrow')[1].style.display == 'none'){
    					that.$node.querySelectorAll('lyte-arrow')[1].style.display = "inline-block"
    					var topHeight = arrows[0].getBoundingClientRect().height
    					var botHeight = arrows[1].getBoundingClientRect().height
    					var total = topHeight + botHeight
    					div.style.height = "calc(100% - "+total+"px)"
    				}
    				if(div.scrollTop == 0){
    					that.$node.querySelector('lyte-arrow').style.display = "none"
    					var botHeight = arrows[1].getBoundingClientRect().height
    					div.style.height = "calc(100% - "+botHeight+"px)"
    				}
  				}
  				if (e.deltaY > 0) {
    				div.scrollTop = div.scrollTop + 10
    				if(that.$node.querySelector('lyte-arrow').style.display == 'none'){
    					that.$node.querySelector('lyte-arrow').style.display = "inline-block"
    					var topHeight = arrows[0].getBoundingClientRect().height
    					var botHeight = arrows[1].getBoundingClientRect().height
    					var total = topHeight + botHeight
    					div.style.height = "calc(100% - "+total+"px)"
    				}
    				if(div.getBoundingClientRect().height + div.scrollTop == div.scrollHeight){
    					var topHeight = arrows[0].getBoundingClientRect().height
    					that.$node.querySelectorAll('lyte-arrow')[1].style.display = "none"
    					div.style.height = "calc(100% - "+topHeight+"px)"
    				}
  				}
  				
			})




			

			arrows[0].addEventListener('mouseleave',this.removeup.bind(this))
			arrows[1].addEventListener('mouseleave',this.removedown.bind(this))

			
		}
	},
	removedown:function(){
		clearInterval(this.getData('arrowdid'))
	},
	movedown:function(){
		this.$node.querySelector('lyte-arrow').style.display = "inline-block"
		var div = this.$node.querySelector('.lyteNavDiv')
		var arrows = this.$node.querySelectorAll('lyte-arrow')
		var topHeight = arrows[0].getBoundingClientRect().height
		var botHeight = arrows[1].getBoundingClientRect().height
		var total = topHeight + botHeight
		div.style.height = "calc(100% - "+total+"px)"
		var that = this
		var arrowDownId = setInterval(function(){
			if(div.scrollTop < div.scrollHeight){
				div.scrollTop = div.scrollTop + 1
			}
    		if(div.getBoundingClientRect().height + div.scrollTop == div.scrollHeight){
    			that.$node.querySelectorAll('lyte-arrow')[1].style.display = "none"
    			div.style.height = "calc(100% - "+botHeight+"px)"
    		}
		},1)
		this.setData('arrowdid',arrowDownId)
	},
	removeup:function(){
		clearInterval(this.getData('arrowuid'))
	},
	moveup:function(){
		this.$node.querySelectorAll('lyte-arrow')[1].style.display = "inline-block"
		var div = this.$node.querySelector('.lyteNavDiv')
		var arrows = this.$node.querySelectorAll('lyte-arrow')
		var topHeight = arrows[0].getBoundingClientRect().height
		var botHeight = arrows[1].getBoundingClientRect().height
		var total = topHeight + botHeight
		div.style.height = "calc(100% - "+ total +"px)"
		var that = this
		var arrowUpId = setInterval(function(){
			if(div.scrollTop != 0){
				div.scrollTop = div.scrollTop - 1
			}
   			if(div.scrollTop == 0){
   				that.$node.querySelector('lyte-arrow').style.display = "none"
   				div.style.height = "calc(100% - " + topHeight + "px)"
   			}
		},1)
		this.setData('arrowuid',arrowUpId)
	},
	addArrow:function(clsname){
		var iTag = document.createElement('i')
		var lyteArrowTag = document.createElement('lyte-arrow')
		iTag.setAttribute('class',clsname)
		lyteArrowTag.appendChild(iTag)
		if(clsname.indexOf('up') != - 1){
			this.$node.insertBefore(lyteArrowTag,this.$node.children[0])
		}
		else{
			this.$node.appendChild(lyteArrowTag)
		}
	},
	dispArrow:function(){
		var arrows = this.$node.querySelectorAll('lyte-arrow')
		var div = this.$node.querySelector('.lyteNavDiv')
		var which = 0;
		var topHeight,botHeight
		if(this.getData('arrowTop')){
			arrows[0].style.display = "inline-block"
			topHeight = arrows[0].getBoundingClientRect().height
			which = 1;
		}
		if(this.getData('arrowBot')){
			arrows[1].style.display = "inline-block"
			botHeight = arrows[1].getBoundingClientRect().height
			if(which == 1){
				which = 3
			}
			else{
				which = 2
			}
		}
		switch(which){
			case 1:
				div.style.height = "calc(100% - "+ topHeight +"px)"
				arrows[1].style.display = "none"
				break;
			case 2:
				div.style.height = "calc(100% - "+ botHeight +"px)"
				arrows[0].style.display = "none"
				break
			case 3:
				var total = topHeight + botHeight
				div.style.height = "calc(100% - "+ total +"px)"
				break;
		}
	},
	data:function(){
		return {
			'arrowTop':Lyte.attr('boolean',{"default":false}),
			'arrowBot':Lyte.attr('boolean',{"default":false}),
			'ltPropClick':Lyte.attr('string',{"default":"lyteNavActive"}),
			'ltPropAlignment':Lyte.attr('string',{"default":"horizontal"})
		}
	}
})



function _lyteIntializeComponent(){
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor){ descriptor.writable = true;} Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps){ defineProperties(Constructor.prototype, protoProps); } if (staticProps){ defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass){ Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } }

var lyteNavItem = function (_HTMLElement) {
  _inherits(lyteNavItem, _HTMLElement);

  function lyteNavItem() {
    _classCallCheck(this, lyteNavItem);

    var _this = _possibleConstructorReturn(this, (lyteNavItem.__proto__ || Object.getPrototypeOf(lyteNavItem)).call(this));

    var parent = _this;
    while (parent.tagName != 'LYTE-NAV' && parent.tagName != 'HTML') {
      parent = parent.parentElement;
    }
    if (parent.tagName == 'HTML') {
      return _possibleConstructorReturn(_this);
    }
    var component = parent.component;
    if (component.getData('ltPropAlignment') == "vertical") {
      var div = _this;
      while (!div.classList.contains('lyteNavDiv')) {
        div = div.parentElement;
      }
    }
    if (_this.hasAttribute('selected') && _this.getAttribute('selected')) {
      if (component.getData('ltPropAlignment') == 'vertical') {
        var offsetTop = _this.offsetTop;
        div.scrollTop = offsetTop;
        if (offsetTop != 0) {
          component.setData('arrowTop', true);
        }

        component.setData('arrowBot', false);
      }
      _this.classList.add(component.getData('ltPropClick'));
    } else if (component.getData('ltPropAlignment') == 'vertical') {
      var newElemOffset = _this.offsetTop;
      if (newElemOffset + _this.getBoundingClientRect().height > div.getBoundingClientRect().height + div.scrollTop) {
        component.setData('arrowBot', true);
      }
    }
    _this.addEventListener('click', function () {
      this.setAttribute('selected', true);
    }.bind(_this));
    return _this;
  }

  _createClass(lyteNavItem, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      if (attributeName === 'lyte-shortcut') {
        if (typeof shortcut === 'function') {
          if (!newValue) {
            return;
          }
          newValue = JSON.parse(newValue);
          oldValue = oldValue ? JSON.parse(oldValue) : {};
          shortcut.push({
            newKey: newValue.key,
            type: newValue.type,
            wait: newValue.wait,
            oldKey: oldValue.key,
            value: this
          });
        }
      } else if (attributeName == 'selected' && newValue) {
        var val = this.getAttribute('selected');
        var parent = this;
        while (parent.tagName != 'LYTE-NAV' && parent.tagName != 'HTML') {
          parent = parent.parentElement;
        }
        if (parent.tagName == 'HTML') {
          return;
        }
        var component = parent.component;
        var click = component.getData('ltPropClick');
        var prevSelected = parent.querySelector('.' + click);
        if (prevSelected && prevSelected != this) {
          prevSelected.setAttribute('selected', '');
        }
        if (val) {
          this.classList.add(click);
        }
      } else if (attributeName == 'selected') {
        var parent = this;
        while (parent.tagName != 'LYTE-NAV' && parent.tagName != 'HTML') {
          parent = parent.parentElement;
        }
        if (parent.tagName == 'HTML') {
          return;
        }
        var component = parent.component;
        var click = component.getData('ltPropClick');
        this.classList.remove(click);
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['selected', 'lyte-shortcut'];
    }
  }]);

  return lyteNavItem;
}(HTMLElement);
// Define the new element


customElements.define('lyte-nav-item', lyteNavItem);
}

if(document.readyState === 'complete' || document.readyState === 'loaded'){
	_lyteIntializeComponent()
}
document.addEventListener('DOMContentLoaded',function(){
	_lyteIntializeComponent()
})

