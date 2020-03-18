Lyte.Component.register('lyte-breadcrumb',{
_template:"<template tag-name=\"lyte-breadcrumb\" onclick=\"{{action('divClick', event, this)}}\">\t\t<template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\">\t\t\t\t\t<lyte-breadcrumb-structure class=\"{{ltPropClass}}\">\t\t\t\t\t\t<template is=\"for\" items=\"{{ltPropData}}\" item=\"array\" index=\"indexVal\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(array),'==',false)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteStageOne')}}\"><template case=\"true\">\t\t\t\t \t\t\t\t\t\t\t  <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this,array)}}\"> \t  \t\t\t\t \t\t\t\t\t\t\t  \t\t<lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body> \t\t\t\t \t\t\t\t\t\t\t\t\t<lyte-breadcrumb-head>{{indexVal}}</lyte-breadcrumb-head>\t\t\t\t \t\t\t\t\t\t\t\t</lyte-breadcrumb-item>\t\t\t\t \t\t\t\t\t\t\t</template><template case=\"false\"> \t\t\t\t\t\t\t\t\t\t\t  <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this,array)}}\"> \t \t\t\t\t\t\t\t\t\t\t\t  \t\t<lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body>\t\t\t\t\t\t\t\t\t\t\t\t</lyte-breadcrumb-item>\t\t\t\t\t\t\t\t\t\t </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteStageOne')}}\"><template case=\"true\">\t\t\t\t\t\t\t\t\t\t\t\t<lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this,array)}}\"> \t\t\t\t\t\t\t\t\t\t\t\t\t\t<lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body> \t\t\t\t\t\t\t\t\t\t\t\t\t<lyte-breadcrumb-head>{{array[ltPropOption]}}</lyte-breadcrumb-head>\t\t\t\t\t\t\t\t\t\t\t\t</lyte-breadcrumb-item>\t\t\t\t\t\t\t\t\t\t\t</template><template case=\"false\"> \t\t\t\t\t\t\t\t\t\t\t   <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this,array)}}\"> \t\t\t\t\t\t\t\t\t\t\t\t   \t    <lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body>\t\t\t\t\t\t\t\t\t\t\t   </lyte-breadcrumb-item>\t\t\t\t\t\t\t\t\t\t  </template></template></template></template></template>\t\t\t\t\t</lyte-breadcrumb-structure>\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t<lyte-yield yield-name=\"yield\"></lyte-yield>\t\t\t </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropClass","ltPropData","ltPropActive","ltPropCompleted","ltPropYield","ltPropLabel","ltPropOption"],	
	didConnect : function (){
		this.$node.constructor._observers[0].value.call(this);
		this.$node.modifyCrumbItems = function ( property, arg1, arg2){
		if(!this.component.getData('ltPropYield'))
			{
				Lyte.arrayUtils(this.component.getData('ltPropData'), property, arg1, arg2)
			}
		else
			{
				this.constructor._observers[0].value.call(this.component);
			}	
	     }
	},
	ArrayContentChange : function (){
		var innerElements = $L('lyte-breadcrumb-item', this.$node).e;
		if(innerElements.length)
			{
				var ltPropActive = this.getData('ltPropActive')
				var ltPropCompleted = this.getData('ltPropCompleted')
				$L('lyte-breadcrumb-item', this.$node).removeClass(ltPropActive)
				$L('lyte-breadcrumb-item', this.$node).addClass(ltPropCompleted)
				innerElements[innerElements.length - 1].classList.add(ltPropActive)	
				innerElements[innerElements.length - 1].classList.remove(ltPropCompleted)	
			}
	}.observes('ltPropData.[]'),
	data : function(){
        return {
			//  user data
			ltPropClass : Lyte.attr("string",{"default":'lyteDividerSlash'}),
			ltPropData : Lyte.attr("array",{"default":[]}),
			ltPropActive : Lyte.attr("string",{"default":'lyteActive'}),
			ltPropCompleted : Lyte.attr("string",{"default":'lyteCompleted'}),
			ltPropYield : Lyte.attr("boolean",{"default":false}),
			ltPropLabel : Lyte.attr('string', {'default': ''}),
            ltPropOption : Lyte.attr('string', {'default': ''})
		}
	},
	actions : {
	   'onclick' : function (event, Component, data){
	   		if((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined){return false;}
			if(this.getMethods('onClick'))
				{
				   this.executeMethod('onClick', Component, data)
				   event.stopPropagation();
				}

		},
        divClick : function(event, div){
        	if((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined){return false;}
            if(this.getMethods('onClick') && this.getData('ltPropYield'))
                {
                    var node = event.target;
                    while(node != div)
                        {
                            if(node.tagName == 'LYTE-BREADCRUMB-ITEM')
                                {
                                    this.executeMethod('onClick', node)
                                    break;
                                }
                              else
                                {
                                    node =  node.parentElement;
                                }  
                        }
                }
        }
	}
});