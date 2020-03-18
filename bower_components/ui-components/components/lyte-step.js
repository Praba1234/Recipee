Lyte.Component.register('lyte-step',{
_template:"<template tag-name=\"lyte-step\" onclick=\"{{action('divClick', event, this)}}\">\t\t<template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\">\t\t\t\t\t<lyte-step-structure class=\"{{ltPropClass}}\" onclick=\"{{action('divClick', event, this)}}\">\t\t\t\t\t\t<template is=\"for\" items=\"{{ltPropData}}\" item=\"array\" index=\"indexVal\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(array),'==',false)}}\"><template case=\"true\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteStageOne')}}\"><template case=\"true\">\t\t\t\t \t\t\t\t\t\t\t  <lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this, array)}}\"> \t  <lyte-step-body> {{array}} </lyte-step-body> \t\t\t\t \t\t\t\t\t\t\t\t\t<lyte-step-head>{{indexVal}}</lyte-step-head>\t\t\t\t \t\t\t\t\t\t\t\t</lyte-step-item>\t\t\t\t \t\t\t\t\t\t\t</template><template case=\"false\"> \t\t\t\t\t\t\t\t\t\t\t  <lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this, array)}}\"> \t <lyte-step-body> {{array}} </lyte-step-body>\t\t\t\t\t\t\t\t\t\t\t\t</lyte-step-item>\t\t\t\t\t\t\t\t\t\t </template></template></template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropClass,'==','lyteStageOne')}}\"><template case=\"true\">\t\t\t\t\t\t\t\t\t\t\t\t<lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this, array)}}\"> \t\t\t\t\t\t\t\t\t\t\t\t\t\t<lyte-step-body> {{array[ltPropLabel]}} </lyte-step-body> \t\t\t\t\t\t\t\t\t\t\t\t\t<lyte-step-head>{{array[ltPropOption]}}</lyte-step-head>\t\t\t\t\t\t\t\t\t\t\t\t</lyte-step-item>\t\t\t\t\t\t\t\t\t\t\t</template><template case=\"false\"> \t\t\t\t\t\t\t\t\t\t\t   <lyte-step-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick', event, this, array)}}\"> \t\t\t\t\t\t\t\t\t\t\t\t   \t    <lyte-step-body> {{array[ltPropLabel]}} </lyte-step-body>\t\t\t\t\t\t\t\t\t\t\t   </lyte-step-item>\t\t\t\t\t\t\t\t\t\t  </template></template></template></template></template>\t\t\t\t\t</lyte-step-structure>\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t<lyte-yield yield-name=\"yield\"></lyte-yield>\t\t\t </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropClass","ltPropData","ltPropSelected","ltPropSkip","ltPropActive","ltPropCompleted","ltPropWarning","ltPropKeepMarked","ltPropYield","ltPropLabel","ltPropOption"],
    didConnect : function (){
        var elements = $L('lyte-step-item', this.$node).e
        if(elements.length)
            {
                this.$node.constructor._observers[1].value.call(this);
            }
           this.$node.next = function (state) {
                this.goto(parseInt(this.component.getData('ltPropSelected')) + 1, state, true) 
            },
            this.$node.previous = function (state) {
                this.goto((parseInt(this.component.getData('ltPropSelected')) - 1), state, true) 
            },
           this.$node.goto = function (number, state, flag) {
                    if(this.component.getData('ltPropSkip') || flag)
                        {
                            var selectedElement = elements = $L('lyte-step-item', this).e[this.component.getData('ltPropSelected')]
                            if(number >= -1 &&  $L('lyte-step-item').e.length)
                                {
                                    if(state == 'incomplete')
                                        {
                                            selectedElement.classList.add(this.component.getData('ltPropWarning'))
                                        }
                                    else
                                        {
                                            selectedElement.classList.add(this.component.getData('ltPropCompleted'))
                                        }   
                                    selectedElement.classList.remove(this.component.getData('ltPropActive'))
                                    if(number == $L('lyte-step-item').e.length)
                                        {
                                            number--;
                                        }
                                      else if(number == -1)
                                        {
                                            number++;
                                        }  
                                    this.component.setData('ltPropSelected', number)          
                                }
                        }
                }
     },
    selectedElementFind : function (){
        var ltPropSelected = parseInt(this.getData('ltPropSelected')), ltPropActive = this.getData('ltPropActive'), elements = $L('lyte-step-item', this.$node).e, ltPropComplete = this.getData('ltPropCompleted'), ltPropWarning = this.getData('ltPropWarning');
        if(elements.length)
            {
                var length = this.getData('ltPropKeepMarked') ? ltPropSelected : elements.length
                $L('lyte-step-item', this.$node).removeClass(ltPropActive)
                elements[ltPropSelected].classList.add(ltPropActive)
                elements[ltPropSelected].classList.remove(ltPropWarning)
                elements[ltPropSelected].classList.remove(ltPropComplete)
                for(var i = 0; i < length; i++)
                    {
                        if(i < ltPropSelected)
                            {
                                if(!elements[i].classList.contains(ltPropWarning))
                                    {
                                        elements[i].classList.add(ltPropComplete)
                                    }
                            }
                        else if(i > ltPropSelected)
                           {
                                elements[i].classList.remove(ltPropWarning)
                                elements[i].classList.remove(ltPropComplete)
                           } 
                            
                    }
            }
    }.observes('ltPropSelected'),
    ArrayContentChange : function (){
        if(this.getData('ltPropSelected') == undefined)      
            {
                this.setData('ltPropSelected',0)
            }
        else
            {
                this.$node.constructor._observers[0].value.call(this);
            } 
    }.observes('ltPropData.[]'),
    data : function(){
        return {
            //  user data
            ltPropClass : Lyte.attr("string",{"default":'lyteDividerSlash'}),
            ltPropData : Lyte.attr("array",{"default":[]}),
            ltPropSelected : Lyte.attr("number",{"default":0}),
            ltPropSkip : Lyte.attr("boolean",{"default": false}),
            ltPropActive : Lyte.attr("string",{"default":'lyteActive'}),
            ltPropCompleted :Lyte.attr("string",{"default": 'lyteCompleted'}),
            ltPropWarning : Lyte.attr("string",{"default":'lyteWarning'}),
            ltPropKeepMarked : Lyte.attr("boolean",{"default": false}),
            ltPropYield : Lyte.attr("boolean",{"default": false}),
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
                            if(node.tagName == 'LYTE-STEP-ITEM')
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