/* Previously when the freeze property of the popover was false it was getting bound to the parent 
element of the origin element istead of getting bound to the body. So there was a problem with the 
calculation of top and left. Now it is bound to the body to solve that problem.*/
if(!LytePopup){
    var LytePopup = {
        components:[],
        onEscape : function(evt){
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                LytePopup.closePopup(undefined,true);
            }
        },
        bindDocumentKeydown : function(){
            document.addEventListener('keydown',LytePopup.onEscape,true);
        },
        addPopup : function(component) {
            LytePopup.closePopup();
            var compLengh = LytePopup.components.length;
            if(compLengh>0){
                var prevZIndex = 0;
                var prePopup = '', thisPopup = '', thisFreeze = '';
                if(LytePopup.components[compLengh-1].$node.tagName == "LYTE-MODAL"){
                    prePopup = '.lyteModal';
                }
                else if(LytePopup.components[compLengh-1].$node.tagName == "LYTE-POPOVER"){
                    prePopup = '.lytePopover';
                }   
                else{
                    prePopup = '.alertPopup';
                }

                if(component.$node.tagName == "LYTE-MODAL"){
                    thisPopup = '.lyteModal';
                    thisFreeze = 'lyte-modal-freeze';
                }
                else if(component.$node.tagName == "LYTE-POPOVER"){
                    thisPopup = '.lytePopover';
                    thisFreeze = 'lyte-popover-freeze';
                }
                else{
                    thisPopup = '.alertPopup';
                    thisFreeze = '.alertFreezeLayer';
                }
                var node = LytePopup.components[compLengh-1].childComp.querySelector(prePopup);
                prevZIndex = Number(document.defaultView.getComputedStyle(node,null).getPropertyValue('z-index'));
                component.childComp.querySelector(thisPopup).style.zIndex = prevZIndex+2;
                if(component.$node.ltProp('freeze')){
                    component.childComp.querySelector(thisFreeze).style.zIndex = prevZIndex+1;
                }
            }
            LytePopup.components[compLengh] = component;
        },
        closePopup : function(component,fromEscape){
            if(fromEscape){
                var lastPop = LytePopup.components[LytePopup.components.length-1];
                if(lastPop && lastPop.$node.ltProp("closeOnEscape")){
                    lastPop.$node.ltProp("show",false);
                }
            }
            else{
                if(component){
                    LytePopup.components.splice(LytePopup.components.indexOf(component),1);
                }
                else{
                    for(var i=LytePopup.components.length-1;i>=0;i--){
                        if(!LytePopup.components[i].$node.ltProp("allowMultiple")){
                            LytePopup.components[i].$node.ltProp("show",false);
                        }
                    }
                }   
            }  
        }   
    };
    LytePopup.bindDocumentKeydown();
    
    window.addEventListener('scroll',function(event){    //This is for closing the dropdown when an outside area is clicked(CODE HELP)
        var ele =  document.querySelector('.lytePopover');
        if(!ele){
            return ;
        }
        while(ele.tagName != 'LYTE-WORMHOLE'){
            ele = ele.parentElement
        }
        var curscroll = event.target
        if(curscroll.nodeName == "#document"){     //This probably happens because scrollIntoView is used to focus the dropdown which is open at the start so the event.target is #document(CODE HELP)
            return ;
        }
        while(curscroll.tagName != "LYTE-WORMHOLE" && curscroll.tagName != 'HTML'){
            curscroll = curscroll.parentElement
        }
        if(curscroll.tagName == 'LYTE-WORMHOLE'){
            return ;
        }
        
        ele._callee.component.computeOffsetImpl();

        var par = document.querySelector(ele._callee.ltProp('originElem'));
        var screl = event.target
        var pbcr = par.getBoundingClientRect();
        var sbcr = screl.getBoundingClientRect();

        var boundry = ele._callee.ltProp("boundry");
        var popoverElem = ele.querySelector('.lytePopover');
        if(!(Object.keys(boundry).length === 0 && boundry.constructor === Object)){
            if(boundry.top && popoverElem.getBoundingClientRect().top < parseFloat(boundry.top)){
                ele._callee.ltProp('show',false);
            }
            else if(boundry.bottom && popoverElem.getBoundingClientRect().bottom > parseFloat(boundry.bottom)){
                ele._callee.ltProp('show',false);
            }
            else if(boundry.left && popoverElem.getBoundingClientRect().left < parseFloat(boundry.left)){
                ele._callee.ltProp('show',false);
            }
            else if(boundry.right && popoverElem.getBoundingClientRect().right > parseFloat(boundry.right)){
                ele._callee.ltProp('show',false);
            }
        }
        if(sbcr.top > pbcr.top || (sbcr.top+sbcr.height)<(pbcr.top+pbcr.height)){
            ele._callee.ltProp('show',false);
        }
        if(sbcr.left > pbcr.left || (sbcr.left+sbcr.width)<(pbcr.left+pbcr.width)){
            ele._callee.ltProp('show',false);
        }
       
    },true);
    
};

Lyte.Component.register("lyte-popover",{
_template:"<template tag-name=\"lyte-popover\">\t<lyte-wormhole case=\"true\" style=\"{{if(ltPropShowCopy,'visibility:visible','visibility:hidden')}}\">\t\t<template is=\"registerYield\" yield-name=\"lyte-content\">\t\t\t<div class=\"popoverWrapper {{ltPropWrapperClass}}\">\t\t\t\t<div class=\"lytePopover\">\t\t\t\t\t<span id=\"lytePopoverArrow\" class=\"lytePopoverArrowIcon\"></span>\t\t\t\t\t<template is=\"if\" value=\"{{ltPropShowCloseButton}}\">\t\t\t\t\t\t<template case=\"true\"><span class=\"lytePopoverClose\" onclick=\"{{action('close')}}\"></span></template>\t\t\t\t\t</template>\t\t\t\t\t<lyte-yield yield-name=\"popover\"></lyte-yield>\t\t\t\t</div>\t\t\t\t<template is=\"if\" value=\"{{ltPropFreeze}}\">\t\t\t\t\t<template case=\"true\"><lyte-popover-freeze></lyte-popover-freeze></template>\t\t\t\t</template>\t\t\t</div>\t\t</template>\t</lyte-wormhole></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"insertYield","position":[1,1,5]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropShow","ltPropType","ltPropFreeze","ltPropShowCloseButton","ltPropCloseOnEscape","ltPropOriginElem","ltPropPosition","ltPropDraggable","ltPropAllowMultiple","ltPropMaxHeight","ltPropMaxWidth","ltPropWidth","ltPropHeight","ltPropWrapperClass","ltPropBoundry","ltPropHeading","ltPropButtons","ltPropButtonPosition","ltPropCloseOnBodyClick","ltPropDimmer","buttons","ltPropShowCopy","visible","timeOutId","classTobeAdded"],
     init: function(){
        this.$node.ltProp('showCopy',this.$node.ltProp('show'));
        if(this.$node.ltProp('show')){
            this.onBeforeShowHandling();
        }
    },
    data: function(){
        return {
            //config from callee
            "ltPropShow":Lyte.attr("boolean",{"default": false}),
            "ltPropType":Lyte.attr("string",{"default":"callout"}),
            "ltPropFreeze":Lyte.attr("boolean",{"default": true}),
            "ltPropShowCloseButton":Lyte.attr("boolean",{"default": true}),
            "ltPropCloseOnEscape":Lyte.attr("boolean",{"default": true}),
            "ltPropOriginElem":Lyte.attr("string",{"default":""}),
            "ltPropPosition":Lyte.attr("string",{"default":"bottom"}),
            // "ltPropDimmer":Lyte.attr("string",{"default":""}),
            "ltPropDraggable":Lyte.attr("boolean",{"default": false}),
            "ltPropAllowMultiple":Lyte.attr("boolean",{"default": false}),
            //"ltPropResizable":Lyte.attr("boolean",{"default": false}),
            "ltPropMaxHeight":Lyte.attr("string",{"default":""}),
            "ltPropMaxWidth":Lyte.attr("string",{"default":""}),
            "ltPropWidth":Lyte.attr("string",{"default":""}),
            "ltPropHeight":Lyte.attr("string",{"default":"auto"}),
            "ltPropWrapperClass":Lyte.attr("string",{"default":""}),
            "ltPropBoundry" : Lyte.attr("object",{"default":{}}),
            "ltPropHeading":Lyte.attr("string",{"default":""}),
            "ltPropButtons":Lyte.attr("string",{"default":""}),
            "ltPropButtonPosition":Lyte.attr("string",{"default":"right"}),
            "ltPropCloseOnBodyClick" : Lyte.attr("boolean",{"default" : true}),

            //local properties
            "ltPropDimmer":Lyte.attr("object",{"default":{"color":"black","opacity":"0.4"}}),
            "buttons":Lyte.attr("array",{"default":[{"type":"accept","text":"Ok"}]}),
            "ltPropShowCopy":Lyte.attr("boolean",{"default": false}),
            "visible" : Lyte.attr("boolean",{"default" : true}),
            "timeOutId" : Lyte.attr("number"),
            "classTobeAdded" : Lyte.attr("string")
        }
    },
    addDragHandler : function(){
        var dragHeader = this.actualModalDiv.querySelector('lyte-popover-header');
        if(dragHeader){
            dragHeader.parentEle = this;
            if(this.$node.ltProp("draggable")){
                dragHeader.addEventListener('mousedown',this.handleMove,true);
                dragHeader.classList.add('draggable');
            }
            else{
                dragHeader.removeEventListener('mousedown',this.handleMove,true);
                dragHeader.classList.remove('draggable');
            }
        }
        else{
            console.warn("This popover is not draggable because it has no header");
            this.$node.ltProp("draggable",false);
        }
    },
    handleMove : function(e){
        var drag = e.currentTarget.parentEle.actualModalDiv;
        LytePopup.node=drag;
        LytePopup.xPos=e.clientX-this.getBoundingClientRect().left;
        LytePopup.yPos=e.clientY-this.getBoundingClientRect().top;
        var elePos = drag.getBoundingClientRect();
        drag.style.transitionDuration = "0s";
        var arrowEle = drag.parentElement.querySelector("#lytePopoverArrow");
        if(arrowEle){
            arrowEle.remove();    
        }
        document.body.addEventListener('mousemove',e.currentTarget.parentEle.handleDrag,true);
        document.body.addEventListener('mouseup',e.currentTarget.parentEle.stopDrag,true);
    },
    handleDrag : function(e){
        var drag = LytePopup.node;
        drag.style.left=(e.clientX-drag.offsetParent.getBoundingClientRect().left-LytePopup.xPos)+'px';
        drag.style.top=(e.clientY-drag.offsetParent.getBoundingClientRect().top-LytePopup.yPos)+'px';
        window.getSelection().removeAllRanges();
    },
    stopDrag : function(e){
        var targetElem = e.target;
        while(targetElem && targetElem !== document){
            if(targetElem.parentEle){
                this.removeEventListener('mousemove',targetElem.parentEle.handleDrag,true);
                this.removeEventListener('mouseup',targetElem.parentEle.stopDrag,true);
                break;
            }
            targetElem = targetElem.parentElement ? targetElem.parentElement : document;
        }
    },
    closeAlertFn : function(){
        this.$node.ltProp("show",false);
        if(this.getMethods("onClose")){
            this.executeMethod("onClose");  
        }
    },
    showToggled : function(){
        if(this.$node.ltProp("show") && !this.$node.ltProp("showCopy")){
            this.onBeforeShowHandling();
        }
        else{
            if(this.$node.ltProp("showCopy")){
                this.onBeforeCloseHandling();
            }
        }
    }.observes("ltPropShow"),
    updateScrollHandling : function(){ 
        if(!this.$node.ltProp("freeze")){
            this.$node.ltProp("scrollable",true);
        }

        var oldHeight, oldWidth, newHeight, newWidth, 
        modalElem = this.actualModalDiv,
        contentNode = modalElem.querySelector("lyte-popover-content");
        contentNode = contentNode ? contentNode : modalElem;

        modalElem.style.maxWidth = "";
        modalElem.style.maxHeight = "";
        modalElem.style.height = this.$node.ltProp("height")?this.$node.ltProp("height"):"auto";
        modalElem.style.width = this.$node.ltProp("width")?this.$node.ltProp("width"):"auto";

        
        if(this.$node.ltProp("maxHeight")){
            this.childComp.querySelector(".popoverWrapper").classList.add("scrollable");
            this.$node.ltProp("scrollable",true);
            oldHeight = modalElem.getBoundingClientRect().height;
            modalElem.style.height = this.$node.ltProp("maxHeight");
            newHeight = modalElem.getBoundingClientRect().height;
        }
        else{
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            oldHeight = modalElem.getBoundingClientRect().height;
            newHeight = h-20;
        }

        if(this.$node.ltProp("maxWidth")){
            this.$node.ltProp("scrollable",true);
            oldWidth = modalElem.getBoundingClientRect().width;
            modalElem.style.width = this.$node.ltProp("maxWidth");
            newWidth = modalElem.getBoundingClientRect().width;
            if(oldWidth < newWidth){
                modalElem.style.width = oldWidth+"px";
                newWidth = oldWidth;
            }
            modalElem.style.overflowX = "auto";
        }
        else{
            newWidth = modalElem.getBoundingClientRect().width;
        }

        if(this.$node.ltProp("scrollable")){
            var popoverHeader = this.actualModalDiv.querySelector("lyte-popover-header"), popoverFooter = this.actualModalDiv.querySelector("lyte-popover-footer")
            var newH = (newHeight - ((popoverHeader ? popoverHeader.getBoundingClientRect().height : 0) +
                                                                            (popoverFooter ? popoverFooter.getBoundingClientRect().height : 0)));
            contentNode.style.maxHeight = (newH > 0 ? newH : 50) +"px";
            contentNode.style.overflowY = "auto"; 
            if(this.getData('ltPropHeight')){
                contentNode.style.height = (oldHeight - ((popoverHeader ? popoverHeader.getBoundingClientRect().height : 0) +
                                                                            (popoverFooter ? popoverFooter.getBoundingClientRect().height : 0)))+"px";
            }
            else{
                contentNode.style.height = "auto";
            }
            
            modalElem.style.width = this.$node.ltProp("width")?this.$node.ltProp("width"):"auto";

            this.actualModalDiv.style.maxWidth = newWidth > 0 ? (newWidth +"px"):("70%");
        }
        else{
            this.childComp.querySelector(".popoverWrapper").classList.remove("scrollable");   
        }
        if(this.$node.ltProp('freeze')){
            this.childComp.querySelector(".popoverWrapper").style.position = "fixed";
        }
        else{
            this.childComp.querySelector(".popoverWrapper").style.position = "inherit";   
        }
    },
    scrollHandling : function(){
        if(!this.getData('ltPropShow')){
            return;
        }
        this.updateScrollHandling();
    }.observes("ltPropWidth","ltPropMaxWidth","ltPropHeight","ltPropMaxHeight"),
    computeOffsetImpl : function(){
        var classTobeAdded = "", offsetLeft="",offsetTop="";
        var modalEle = this.actualModalDiv;
        var modalElePosition = modalEle.getBoundingClientRect();
        modalEle.classList.remove('lytePopoverCenter','lytePopoverBottomCenter','lytePopoverBottomLeft','lytePopoverBottomRight','lytePopoverTopCenter','lytePopoverTopLeft','lytePopoverTopRight','lytePopoverLeft','lytePopoverRight');
        modalEle.style.left = "";
        modalEle.style.top = "";
        if(this.$node.ltProp("showCopy")){
            if(this.$node.ltProp('originElem') != ""){  
                var ele = document.querySelector(this.$node.ltProp('originElem'));
                var origElemPosition = ele.getBoundingClientRect(); 
                var elementPosition = {};     
                // if(!this.$node.ltProp("freeze")){
                //     var offsetParent = ele.offsetParent;
                //     while(offsetParent.tagName == "TABLE" || offsetParent.tagName == "TBODY" || offsetParent.tagName == "TR" || offsetParent.tagName == "TD"){
                //         offsetParent = offsetParent.offsetParent;
                //     }
                //     elementPosition.top = ele.getBoundingClientRect().top - offsetParent.getBoundingClientRect().top;
                //     elementPosition.left = ele.getBoundingClientRect().left - offsetParent.getBoundingClientRect().left;
                //     elementPosition.height = ele.offsetHeight;
                //     elementPosition.width = ele.offsetWidth;
                // }    
                // else{
                    elementPosition = origElemPosition;
                // }       
                var offObj = {}, newOffObj = {};
                var position =  this.$node.ltProp('positionNew');
                var flag = true;
                var bodyHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var bodyWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var count = 0;
                do{
                    count++;
                    flag = true;
                    offObj = this.positionPopover(position,elementPosition,modalElePosition);
                    if(!this.$node.ltProp('freeze')){
                        newOffObj.offsetTop = origElemPosition.top + origElemPosition.height; 
                        newOffObj.offsetLeft = origElemPosition.left + origElemPosition.width; 
                    }
                    else{
                        newOffObj = offObj;
                    }
                    switch(position){
                        case 'bottom':
                            if(bodyHeight < (newOffObj.offsetTop+modalElePosition.height)){
                                position = "top";
                                flag = false;
                                break;
                            }
                            
                            if((newOffObj.offsetLeft-modalElePosition.width) < 0){
                                offObj.offsetLeft = elementPosition.left;
                                flag = true;
                            }
                            if(bodyWidth < (newOffObj.offsetLeft+modalElePosition.width)){
                                offObj.offsetLeft = bodyWidth - modalElePosition.width - 10;
                                flag = true;
                            }
                            break;
                        case 'bottomLeft':
                            if(bodyHeight < (newOffObj.offsetTop+modalElePosition.height)){
                                position = "top";
                                flag = false;
                                break;
                            }

                            if((newOffObj.offsetLeft-modalElePosition.width) < 0){
                                offObj.offsetLeft = elementPosition.left;
                                flag = true;
                            }
                            if(bodyWidth < (newOffObj.offsetLeft+modalElePosition.width)){
                                offObj.offsetLeft = bodyWidth - modalElePosition.width - 10;
                                flag = true;
                            }
                            break;
                        case 'bottomRight':
                            if(bodyHeight < (newOffObj.offsetTop+modalElePosition.height)){
                                position = "top";
                                flag = false;
                                break;
                            }
                            
                            if((newOffObj.offsetLeft-modalElePosition.width) < 0){
                                offObj.offsetLeft = elementPosition.left;
                                flag = true;
                            }
                            if(bodyWidth < (newOffObj.offsetLeft+modalElePosition.width)){
                                offObj.offsetLeft = bodyWidth - modalElePosition.width - 10;
                                flag = true;
                            }
                            break;
                        case 'top':
                            if((newOffObj.offsetTop-modalElePosition.height) < 0){
                                position = "right";
                                flag = false;
                                break;
                            }
                            
                            if((newOffObj.offsetLeft-modalElePosition.width) < 0){
                                offObj.offsetLeft = elementPosition.left;
                                flag = true;
                            }
                            if(bodyWidth < (newOffObj.offsetLeft+modalElePosition.width)){
                                offObj.offsetLeft = bodyWidth - modalElePosition.width - 10;
                                flag = true;
                            }
                            break;
                        case 'topLeft':
                            if((newOffObj.offsetTop-modalElePosition.height) < 0){
                                position = "right";
                                flag = false;
                                break;
                            }
                            
                            if((newOffObj.offsetLeft-modalElePosition.width) < 0){
                                offObj.offsetLeft = elementPosition.left;
                                flag = true;
                            }
                            if(bodyWidth < (newOffObj.offsetLeft+modalElePosition.width)){
                                offObj.offsetLeft = bodyWidth - modalElePosition.width - 10;
                                flag = true;
                            }
                            break;
                        case 'topRight':
                            if((newOffObj.offsetTop-modalElePosition.height) < 0){
                                position = "left";
                                flag = false;
                                break;
                            }
                            
                            if((newOffObj.offsetLeft-modalElePosition.width) < 0){
                                offObj.offsetLeft = elementPosition.left;
                                flag = true;
                            }
                            if(bodyWidth < (newOffObj.offsetLeft+modalElePosition.width)){
                                offObj.offsetLeft = bodyWidth - modalElePosition.width - 10;
                                flag = true;
                            }
                            break;
                        case 'left':
                            if(newOffObj.offsetLeft < 0){
                                position = "right";
                                offsetLeft = (elementPosition.left + elementPosition.width)+9;
                                offsetTop = elementPosition.top;
                            }

                            if((newOffObj.offsetTop-modalElePosition.height) < 0 ){
                                offObj.offsetTop = elementPosition.top;
                            }
                            if(bodyHeight < (offObj.offsetTop+modalElePosition.height)){
                                offObj.offsetTop = bodyHeight - modalElePosition.height - 5;
                            }
                            break;
                        case 'right':
                            if(bodyWidth < (newOffObj.offsetLeft+modalElePosition.width)){
                                position = "left";
                                offObj.offsetLeft = (elementPosition.left - modalElePosition.width)-9;
                                offObj.offsetTop = elementPosition.top;
                            }

                            if((newOffObj.offsetTop-modalElePosition.height) < 0 ){
                                offObj.offsetTop = elementPosition.top;
                            }
                            if(bodyHeight < (offObj.offsetTop+modalElePosition.height)){
                                offObj.offsetTop = bodyHeight - modalElePosition.height - 5;
                            }
                            break;
                    }
                }while(!flag && count <= 8)
                var positions = ["bottom","bottomLeft","bottomRight","top","topLeft","topRight","right","left"];

                offsetLeft = offObj.offsetLeft;
                offsetTop = offObj.offsetTop;

                if(this.$node.ltProp('type') === "callout"){
                    if(position.indexOf("bottom") > -1){
                        offObj.classTobeAdded = "lytePopoverArrowTop";
                    }
                    else if(position.indexOf("top") > -1){
                        offObj.classTobeAdded = "lytePopoverArrowBottom";
                    }
                    else if(position === "left"){
                         offObj.classTobeAdded = "lytePopoverArrowRight";
                    }
                    else if(position === "right"){
                         offObj.classTobeAdded = "lytePopoverArrowLeft";
                    }
                    var arrowIcon = modalEle.querySelector("#lytePopoverArrow");
                    arrowIcon.classList.remove("lytePopoverArrowTop","lytePopoverArrowBottom","lytePopoverArrowRight","lytePopoverArrowLeft");
                    arrowIcon.classList.add(offObj.classTobeAdded);
                    if(offObj.classTobeAdded === "lytePopoverArrowTop" || offObj.classTobeAdded === "lytePopoverArrowBottom"){
                        arrowIcon.style.left = Math.abs(offsetLeft - (elementPosition.left+(elementPosition.width-arrowIcon.offsetWidth)/2))+"px"; 
                        arrowIcon.style.top = "";
                    }
                    else{
                        arrowIcon.style.left = "";
                        arrowIcon.style.top = Math.abs(offsetTop - (elementPosition.top+(elementPosition.height-arrowIcon.offsetHeight)/2))+"px"; 
                    }
                    
                }
                this.setData('classTobeAdded',offObj.classTobeAdded);
            }         
            this.$node.ltProp('positionNew',position); 
            modalEle.style.left = offsetLeft+"px";
            modalEle.style.top = offsetTop+"px";
        }
        if(this.$node.ltProp("freeze")){
            document.body.classList.add('bodyWrapper');    
        }
    },
    positionPopover : function(position,elementPosition,modalElePosition){
        var  offsetLeft=0,offsetTop=0;
        switch(position){
            case 'bottom':
                offsetLeft = elementPosition.left - (modalElePosition.width - elementPosition.width)/2;
                offsetTop = elementPosition.top+elementPosition.height+9;
                classTobeAdded = "lytePopoverArrowTop";
                break;
            case 'bottomLeft':
                offsetLeft = elementPosition.left;
                offsetTop = elementPosition.top +elementPosition.height+9;
                classTobeAdded = 'lytePopoverArrowTop';
                break;
            case 'bottomRight':
                offsetLeft = (elementPosition.left + elementPosition.width) - modalElePosition.width;
                offsetTop =  elementPosition.top +elementPosition.height+9;
                classTobeAdded = 'lytePopoverArrowTop';
                break;
            case 'top':
                offsetLeft = elementPosition.left - (modalElePosition.width - elementPosition.width)/2;
                offsetTop = elementPosition.top - (modalElePosition.height+9);
                classTobeAdded = 'lytePopoverArrowBottom';
                break;
            case 'topLeft':
                offsetLeft = elementPosition.left;
                offsetTop = elementPosition.top - (modalElePosition.height+9);
                classTobeAdded = 'lytePopoverArrowBottom';
                break;
            case 'topRight':
                offsetLeft = (elementPosition.left + elementPosition.width) - modalElePosition.width;
                offsetTop = elementPosition.top - (modalElePosition.height+9);
                classTobeAdded = 'lytePopoverArrowBottom';
                break;
            case 'left':
                offsetLeft = (elementPosition.left - modalElePosition.width)-9;
                offsetTop = elementPosition.top;
                classTobeAdded = 'lytePopoverArrowRight';
                break;
            case 'right':
                offsetLeft = (elementPosition.left + elementPosition.width)+9;
                offsetTop = elementPosition.top;
                classTobeAdded = 'lytePopoverArrowLeft';
                break;
        }
        return {offsetLeft:offsetLeft,offsetTop:offsetTop,classTobeAdded:classTobeAdded};
    },
    /*computeOffset : function(){
        this.computeOffsetImpl();
    }.observes("ltPropOriginElem","ltPropPosition","ltPropType","ltPropShowCopy","ltPropOffset"),*/
    onBeforeCloseHandling : function(){
        var result = true;
        if(this.getMethods("onBeforeClose")){
            result = this.executeMethod("onBeforeClose"); 
        }
        if(result === undefined || result){
            var animDur = 800;
            var self = this;
            var timeOutId = setTimeout(function(){
                self.$node.ltProp({"show":false,"showCopy":false});
            },animDur);
            this.setData('timeOutId',timeOutId);
            this.actualModalDiv.style.transitionDuration = "0.8s";
            this.actualModalDiv.style.opacity = 0;
            LytePopup.closePopup(this);
            this.setData('visible',false);
            if(this.getMethods("onClose")){
                this.executeMethod("onClose");  
            }
            if(this.$node.ltProp('freeze')){
                this.childComp.querySelector("lyte-popover-freeze").style.opacity = 0;
            }
            document.body.classList.remove('bodyWrapper');
        }
        else{
            this.$node.ltProp('show',true);
        }
    },
    onBeforeShowHandling : function(){
        var result = true;
        if(this.getMethods("onBeforeShow")){
            result = this.executeMethod("onBeforeShow"); 
        }
        if(!result){
            this.$node.ltProp({"show":false,"showCopy":false});
        }
        else{
            this.addDragHandler();
            this.updateScrollHandling();
            if(this.$node.ltProp('freeze')){
                this.childComp.querySelector(".popoverWrapper").style.position = "fixed";
            }
            else{
                this.childComp.querySelector(".popoverWrapper").style.position = "inherit";   
            }

            this.$node.ltProp("positionNew",this.$node.ltProp("position"));
            var self = this;
            setTimeout(function(){
                self.$node.ltProp('showCopy',true);
                self.computeOffsetImpl();
                self.actualModalDiv.style.opacity = "1";
                if(self.$node.ltProp('freeze')){
                    var freezeStyle = self.childComp.querySelector("lyte-popover-freeze").style;
                    freezeStyle.opacity = self.getData('ltPropDimmer').opacity;
                    freezeStyle.background = self.getData('ltPropDimmer').color;
                }
                
                if(!self.$node.ltProp('freeze') && self.getData('classTobeAdded') && (self.getData('classTobeAdded') == "lytePopoverArrowLeft" || self.getData('classTobeAdded') == "lytePopoverArrowRight")){
                    if(self.actualModalDiv.getBoundingClientRect().top != document.querySelector(self.getData('ltPropOriginElem')).getBoundingClientRect().top){
                        self.actualModalDiv.getBoundingClientRect().top = document.querySelector(self.getData('ltPropOriginElem')).getBoundingClientRect().top + "px";
                    }
                }
                if(self.getMethods("onShow")){
                    self.executeMethod("onShow"); 
                }
                if(!self.getData('visible')){
                    self.setData('visible',true);
                }

            },0);
            // if(this.getMethods("onShow")){
            //     this.executeMethod("onShow"); 
            // }
        }
    },
    didDestroy : function(){
        if(this.childComp){
            if(this.getData('timeOutId')){
                clearInterval(this.getData('timeOutId'));
            }
            this.childComp.remove();    
        }
    },
    actions: {
        wormholeDidConnect : function(){
            this.childComp = this.$node.querySelector('lyte-wormhole');
            this.actualModalDiv = this.childComp.querySelector(".lytePopover");

            // this.addDragHandler();
            // if(this.$node.ltProp('freeze')){
                LyteComponent.appendChild(document.body,this.childComp);
            // }
            // else{
            //     LyteComponent.appendChild(document.querySelector(this.$node.ltProp('originElem')).parentElement,this.childComp);   
            // }
            // this.updateScrollHandling();
            
            LytePopup.addPopup(this);

        },
        close : function(){
           this.$node.ltProp("show",false);
        }
    }
});

document.addEventListener('click',function(event){
    var ele = event.target;
    while(!$L(ele).hasClass('popoverWrapper') && ele.tagName != 'LYTE-DROP-BOX' && ele.tagName != 'HTML'){
        ele = ele.parentElement;
        if(!ele){
            return
        }
    }
    if(ele.tagName == 'HTML'){
        var popover = document.querySelector('.popoverWrapper');
        
        if(popover && popover.parentElement.parentElement._callee.component.getData('visible') && popover.parentElement.parentElement._callee.component.getData('ltPropCloseOnBodyClick')){
            popover.parentElement.parentElement._callee.component.setData('visible',false);
            popover.parentElement.parentElement._callee.ltProp('show',false);
        }
    }
},true);