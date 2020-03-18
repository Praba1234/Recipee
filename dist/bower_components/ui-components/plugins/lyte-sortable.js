(function( window ) {

	if($L){	
		
		$L.prototype.sortable = function(object) {
			var data = object ? object : {};
			var element = this.e.length == undefined ? this.e : this.e[0];
			if(this.e.length){
				var elemArray = this.e;
				for(var i = 0 ; i < elemArray.length ; i++){
					$L(elemArray[i]).sortable(data);
				};
				return;
			}

			if(this.e._sortableData){
				var _sortableData = this.e._sortableData;
				data._parentElem = this.e;

				//Data overriding
				data.connected = data.connectedWith ? isEqual(data.connectedWith, _sortableData.connectedWith) : _sortableData.connected;
				data.connectedWith = data.connectedWith ? data.connectedWith : _sortableData.connectedWith;
				data.orientation = data.orientation ? data.orientation : _sortableData.orientation;
				data.droppable = (data.droppable == undefined) ? _sortableData.droppable : data.droppable;
				data.draggable = (data.draggable == undefined) ? _sortableData.draggable : data.draggable;
				data.sortableElemClass = (data.orientation === "horizontal") ? "sortable-element-h" : "sortable-element-v";
				data.placeholder = data.placeholder ? data.placeholder : _sortableData.placeholder;
				data.disabled = data.disabled ? data.disabled : _sortableData.disabled;
				data.onReady = data.onReady ? data.onReady : _sortableData.onReady;
				data.onSelect = data.onSelect ? data.onSelect : _sortableData.onSelect;
				data.onDrag = data.onDrag ? data.onDrag : _sortableData.onDrag;
				data.onPlaceholder = data.onPlaceholder ? data.onPlaceholder : _sortableData.onPlaceholder;
				data.onBeforeDrop = data.onBeforeDrop ? data.onBeforeDrop : _sortableData.onBeforeDrop;
				data.onDrop = data.onDrop ? data.onDrop : _sortableData.onDrop;

				if(data.executeOnReady){
					data._parentElem.executedOnReady = false;
				}
			}
			else{
				//Parent Element
				data._parentElem = this.e;
				$L(data._parentElem).addClass('sortable-parent');

				//Data initialization
				data.connectedWith = data.connectedWith ? data.connectedWith : [];
				data.orientation = data.orientation ? data.orientation : "vertical";
				data.droppable = (data.droppable == undefined) ? true : data.droppable;
				data.draggable = (data.draggable == undefined) ? true : data.draggable;
				data.sortableElemClass = (data.orientation === "horizontal") ? "sortable-element-h" : "sortable-element-v";
				data.placeholder = data.placeholder ? data.placeholder : "lyteSortablePlaceholder";
				data.disabled = data.disabled ? data.disabled : "lyteSortableDisabledPlaceholder";
			}


			var _offset = [0,0];
			var _isDown = false;
			var _isMoved = false;
			var _mousePosition;
			var _elemBelow;
			var _droppablePlace;
			var _marginTop = 0;
			var _marginLeft = 0;
			var _sortableElemClass;
			var _sortableElem;
			var _placeholder = "";
			var _div = "";		

			


			function mouseDownEvent(event){
				// event.preventDefault();
		
				//Disable right click on the sortable elements to avoid unwanted behaviour
				if(event.which == 3){
					return;
				}
				
				var target = event.target;

				while(target){
					if($L(target).hasClass("sortable-element")){
						_sortableElem = target;
						break;
					}
					target = target.parentElement;
				}

				if(_sortableElem){
					var data = _sortableElem._sortableData || _sortableElem.parentElement._sortableData;
					_placeholder = _sortableElem.cloneNode(true);
					data._div = _div = _sortableElem;
					var returnVal = true;

					//Callback fired
					if(data.onSelect){
						returnVal = onSelect(data);
					}

					
					if(returnVal){
						$L(_div).addClass("sortable-element-selected");
						$L(_div).addClass('lyteSortableElem');
						// data._previousEle = _div.previousElementSibling ? _div.previousElementSibling : null;
						// data._nextEle = _div.nextElementSibling ? _div.nextElementSibling : null;
						if(window.getComputedStyle(_sortableElem).marginTop){
							_marginTop = window.getComputedStyle(_sortableElem).marginTop;
						}
						if(window.getComputedStyle(_sortableElem).marginLeft){
							_marginLeft = window.getComputedStyle(_sortableElem).marginLeft;
						}
						if(event.type == "mousedown"){
							_offset = [
								event.clientX - _div.getBoundingClientRect().left,
								event.clientY - _div.getBoundingClientRect().top
							];
						}
						else if(event.type == "touchstart"){
							_offset = [
								event.touches[0].clientX - _div.getBoundingClientRect().left,
								event.touches[0].clientY - _div.getBoundingClientRect().top
							];
							
							//Binding eventlistener for touch
							$L(_sortableElem).bind('touchmove',data._parentElem.__mouseMoveEvent);
							$L(_sortableElem).bind('touchend',data._parentElem.__mouseUpEvent);
						}

						//Binding the values to the draggable element
						data._isDown = true;
						data._placeholder = _placeholder;
						data._offset = _offset;
						data._marginTop = _marginTop;
						data._marginLeft = _marginLeft;
						data._event = event;
						data._placedPlaceholder = false;

						if(!_sortableElem._sortableData){
							_sortableElem._sortableData = data;
						}
						_placeholder = null;
						_div = null;
						_sortableElem = null;

						
					}
				}
			}

			mouseMoveEvent = function(event){
				if(event.type == "touchmove"){
					event.preventDefault();
				}
				var target = event.target;
				while(target){
					if($L(target).hasClass("sortable-element-selected")){
						_sortableElem = target;
						break;
					}
					target = target.parentElement;
				}
				
				if(_sortableElem){
					var data = _sortableElem._sortableData;
					if(data && data._isDown){

						_div = data._div;
						_placeholder = data._placeholder;
						_offset = data._offset;
						_marginTop = data._marginTop;
						_marginLeft = data._marginLeft;
						_sortableElemClass = data.sortableElemClass; 

						if(!data._placedPlaceholder){
							var width = _sortableElem.getBoundingClientRect().width;
							var height = _sortableElem.getBoundingClientRect().height;
							var cellSpacing = 0;
							var parent = _sortableElem.offsetParent;
							if(parent.tagName.toLowerCase() == "table"){
								cellSpacing = parent.cellSpacing;
								if(cellSpacing == ""){
									cellSpacing = 2;
								}
							}
							while(parent.tagName.toLowerCase() == "table" && parent.style.position == ""){
								parent = parent.offsetParent;
							}
							var relativeParent = getRelativeParent(_div);
							if(relativeParent && !(parent.isEqualNode(relativeParent))){
								parent = relativeParent;
							}
							_div.style.top = _sortableElem.getBoundingClientRect().top - parent.getBoundingClientRect().top - parseInt(cellSpacing) - parseInt(_marginTop) + 'px';
							_div.style.left = _sortableElem.getBoundingClientRect().left - parent.getBoundingClientRect().left - parseInt(_marginLeft) + 'px';
							_div.style.boxSizing = "border-box";
							_div.style.zIndex = 3001;
							$L(_div).width(width);
							$L(_div).height(height);
							
							
							//Create placeholder and append it to the DOM
							$L(_placeholder).html("");
							$L(_placeholder).attr('id','dummy');
							$L(_placeholder).removeClass('sortableElem');
							$L(_placeholder).width(_sortableElem.getBoundingClientRect().width /*calculateWidth(_sortableElem)*/);
							$L(_placeholder).height(_sortableElem.getBoundingClientRect().height /*calculateHeight(_sortableElem)*/);
							_placeholder.style.padding = "0px";

							//Insert the placeholder in the DOM and make the selected element's position absolute
							// _div.parentElement.insertBefore(_placeholder,_div);
							LyteComponent.insertBefore(_div,_placeholder)
							_div.style.position = "absolute";
							data._placedPlaceholder = true;
							if(window.getComputedStyle(_placeholder).display == "inline"){
								_placeholder.style.display = "inherit";
							}
							data._div = _div;
							data._placeholder = _placeholder;
						}

						if(event.type == "mousemove"){
							_mousePosition = {
								x : event.clientX,
								y : event.clientY
							};
						}
						else if(event.type == "touchmove"){
							_mousePosition = {
								x : event.touches[0].clientX,
								y : event.touches[0].clientY
							};
						}
						
						var parent = _div.offsetParent;
						var relativeParent = getRelativeParent(_div);
						if(relativeParent && !(parent.isEqualNode(relativeParent))){
							parent = relativeParent;
						}

						_div.style.left = _mousePosition.x - _offset[0] - parent.getBoundingClientRect().left - parseInt(_marginLeft) + 'px';
						_div.style.top = _mousePosition.y - _offset[1] - parent.getBoundingClientRect().top - parseInt(_marginTop) + 'px';
						
						if((_div.getBoundingClientRect().left <= _placeholder.parentElement.getBoundingClientRect().right) && (_div.getBoundingClientRect().right >= _placeholder.parentElement.getBoundingClientRect().left)){
							if(_div.getBoundingClientRect().top < _placeholder.parentElement.getBoundingClientRect().top){
								if((_placeholder.parentElement.scrollTop > 0) && 
									(_placeholder.parentElement.scrollTop <= _placeholder.parentElement.scrollHeight - _placeholder.parentElement.getBoundingClientRect().height)){
									_placeholder.parentElement.scrollTop -= _placeholder.parentElement.getBoundingClientRect().top - _div.getBoundingClientRect().top;
								}
							}
							if(_div.getBoundingClientRect().bottom > _placeholder.parentElement.getBoundingClientRect().bottom){
								if(_placeholder.parentElement.scrollTop < _placeholder.parentElement.scrollHeight - _placeholder.parentElement.getBoundingClientRect().height){
									_placeholder.parentElement.scrollTop += _div.getBoundingClientRect().bottom - _placeholder.parentElement.getBoundingClientRect().bottom;
								}
							}
						}
						$L(_div).hide();
						_elemBelow = document.elementFromPoint(_mousePosition.x,_mousePosition.y);
						$L(_div).show();

						if(!_elemBelow){
							return;
						}

						droppablePlace = _elemBelow.closest('.'+_sortableElemClass);

						if(droppablePlace && checkDroppable(droppablePlace,data._parentElem,_sortableElem,data.connectedWith)){
							
							if($L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,data._parentElem,_sortableElem,data.connectedWith) && checkForIntersect(_elemBelow,_mousePosition) && checkForBetween(_elemBelow,_mousePosition,_sortableElem)){
								// $L(_elemBelow).append(_placeholder);
								LyteComponent.appendChild(_elemBelow,_placeholder);
							}
							else if(_div.getBoundingClientRect().top < droppablePlace.getBoundingClientRect().top){
								// $L(droppablePlace).insertBefore(_placeholder);
								LyteComponent.insertBefore(droppablePlace,_placeholder);
							}
							else if(_div.getBoundingClientRect().bottom > droppablePlace.getBoundingClientRect().bottom){
								// $L(droppablePlace).insertAfter(_placeholder);
								LyteComponent.insertAfter(droppablePlace,_placeholder);
							}
						}
						else if(_elemBelow && $L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,data._parentElem,_sortableElem,data.connectedWith) && checkForIntersect(_elemBelow,_mousePosition) && checkForBetween(_elemBelow,_mousePosition,_sortableElem)){
							// $L(_elemBelow).append(_placeholder);
							LyteComponent.appendChild(_elemBelow,_placeholder);
						}
						// else{
						// 	console.log("checkParentDroppable",checkParentDroppable(_elemBelow,data._parentElem,_sortableElem,data.connectedWith));
						// 	console.log("checkForIntersect",checkForIntersect(_elemBelow,_mousePosition));
						// 	console.log("came here",_elemBelow);
						// }
						if(!data.onPlaceholder || checkValidDroppable(data,_elemBelow)){
							if($L(_placeholder).hasClass(data.disabled)){
								$L(_placeholder).removeClass(data.disabled);
							}
							$L(_placeholder).addClass(data.placeholder);
						}
						else{
							if($L(_placeholder).hasClass(data.placeholder)){
								$L(_placeholder).removeClass(data.placeholder);
							}
							$L(_placeholder).addClass(data.disabled);
						}

						//Callback fired
						if(data.onDrag){
							onDrag(data,droppablePlace,_elemBelow);
						}

						data._isMoved = true;
						droppablePlace = null;
						_elemBelow = null;
					}
				}
			}

			mouseUpEvent = function(event){
				var target = event.target;

				while(target){
					if($L(target).hasClass("sortable-element-selected")){
						_sortableElem = target;
						break;
					}
					target = target.parentElement;
				}
				if(_sortableElem){
					var data = _sortableElem._sortableData;
					// debugger
					if(data._isDown){
						data._isDown = false;
						_div = data._div;
						_placeholder = data._placeholder;
						if(data._isMoved){
							data._isMoved = false;
							var returnVal = true;

							if($L(_placeholder).hasClass(data.disabled)){
								callRevertBack(data);
								return;
							}

							//Callback fired
							if(data.onBeforeDrop){
								returnVal = onBeforeDrop(data);
							}

							if(!returnVal){
								callRevertBack(data);
								return;
							}
							
							var sibling = (_placeholder.previousElementSibling ? _placeholder.previousElementSibling : _placeholder.nextElementSibling);
							var elementData = sibling ? sibling._sortableData : _placeholder.parentElement._sortableData;
							// $L(_placeholder).replace(_div);
							LyteComponent.replaceWith(_placeholder, _div);
							removeStyle(_div);

							_placeholder = null;

							//Callback fired
							if(data.onDrop){
								onDrop(data);
							}
							_div._sortableData = elementData;
							if(!elementData.draggable){
								$L(_div).unbind("mousedown",mouseDownEvent);
							}
							
						}
						else{
							// _placeholder.parentElement.replaceChild(_div,_placeholder);
							removeStyle(_div);
							if(_sortableElem.tagName.toLowerCase() == 'a'){
								window.location.href = _sortableElem.href;
							}
						}
						data._div = null;
						data._placeholder = null;
						data._placedPlaceholder = false;

						//Unbinding the eventlisteners for touch
						if(event.type == "touchend"){
							$L(_sortableElem).unbind('touchmove',data._parentElem.__mouseMoveEvent);
							$L(_sortableElem).unbind('touchend',data._parentElem.__mouseUpEvent);
						}
					}
					$L(_sortableElem).removeClass("sortable-element-selected");
					_offset = null;
					_isDown = null;
					_isMoved = null;
					_mousePosition = null;
					_elemBelow = null;
					_droppablePlace = null;
					_marginTop = null;
					_marginLeft = null;
					_sortableElemClass = null;
					_sortableElem = null;
					_placeholder = null;
					_div = null;
				}
			}

			element.addToSortable = function(elem){
				elem._sortableData = element._sortableData;
				$L(elem).addClass("sortable-element",element._sortableData.sortableElemClass);
				// $L(elem).bind("mousedown",mouseDownEvent);
			}

			/*---------------Callbacks Start--------------*/
			onReady = function(data){
				data.onReady(data._parentElem);
			}

			onSelect = function(data){
				var returnVal = data.onSelect(data._div, data._parentElem.children, data._parentElem);
				return ( returnVal == undefined) ? true : returnVal;
			}

			onDrag = function(data,droppableElem,elemBelow){
				var elem = droppableElem || elemBelow;
				data.onDrag(data._div,elem);
			}

			onBeforeDrop = function(data){
				var returnVal = data.onBeforeDrop(data._div);
				return (returnVal == undefined) ? true : returnVal;
			}

			onDrop = function(data){
				data.onDrop(data._div, data._parentElem);
			}
			/*---------------Callbacks End--------------*/

			checkValidDroppable = function(data,destination){
				var returnVal = data.onPlaceholder(data._div,data._placeholder,data._parentElem,destination);
				return (returnVal == undefined) ? true : returnVal;
			}


			//Bind events to the child elements that will be sortable
			var childrens = data._parentElem.children;
			data._parentElem.__mouseMoveEvent = mouseMoveEvent;
			data._parentElem.__mouseUpEvent = mouseUpEvent;
			data._parentElem._sortableData = data;
			for(var i = 0 ; i < childrens.length ; i++){
				if(childrens[i].tagName != "TEMPLATE"){
					childrens[i]._sortableData = data;
					$L(childrens[i]).addClass("sortable-element",data.sortableElemClass);
				}
			}
			if(data.draggable){
				$L(data._parentElem).bind("mousedown",mouseDownEvent);
				$L(data._parentElem).bind("touchstart",mouseDownEvent);
			}
			else{
				if(data._parentElem._mousedown){
					$L(data._parentElem).unbind("mousedown",mouseDownEvent);
					$L(data._parentElem).unbind("touchstart",mouseDownEvent);
				}
			}
			$L(document).bind("mousemove",mouseMoveEvent);
			$L(document).bind("mouseup",mouseUpEvent);

			
			
			//Check whether the arrays are connected or not and has connectedWith
			if(!data.connected && data.connectedWith.length > 0){
				data.connectedWith = convertToArrayOfItems(data.connectedWith);
				data.connectedWith.forEach(function(id){
					var connectedWith = data.connectedWith.concat();
					index = connectedWith.indexOf(id);
					connectedWith.splice(index,1);
					connectedWith.push(data._parentElem);
					$L(id).sortable({
						connectedWith : connectedWith,
						connected : true,
						droppable : data.droppable,
						draggable : data.draggable,
						placeholder : data.placeholder,
						disabled : data.disabled,
						orientation : data.orientation
					});
				});
				
			}

			if(data.onReady && !data._parentElem.executedOnReady){
				onReady(data);
				data._parentElem.executedOnReady = true;
			}

			calculateHeight = function(element) {
				var cs = getComputedStyle(element);

				var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

				var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

				// Element height minus padding and border
				elementHeight = element.offsetHeight - paddingY - borderY;
				return elementHeight;
			};

			calculateWidth = function(element) {
				var cs = getComputedStyle(element);

				var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);

				var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);

				// Element width minus padding and border
				elementWidth = element.offsetWidth - paddingX - borderX;
				return elementWidth;
			};

			getRelativeParent = function(element){
				while(element.parentElement){
					element = element.parentElement;
					var cs = getComputedStyle(element);
					if(cs.position == "relative"){
						return element;
					}
				}
				return null;
			};

			//Checks whether the element can be dropped or not
			checkDroppable = function(element,parentElem,sortableElem,connectedWith){
				if(element.id != "dummy"){
					var sortableParentId = sortableElem.parentElement.id;
					var droppableParentId = element.parentElement.id;
					if(sortableElem.parentElement.isEqualNode(element.parentElement) || element.parentElement.isEqualNode(sortableElem._sortableData._parentElem)){
						return true;
					}
					if(((connectedWith).indexOf(element.parentElement) != -1) && element._sortableData.droppable){
						return true;
					}
				}
				return false;
			};

			//Checks whwther the element can be dropped or not 
			checkParentDroppable = function(element,parentElem,sortableElem,connectedWith){
				var sortableParentId = sortableElem.parentElement.id;
				if(sortableElem.parentElement.isEqualNode(element) || element.isEqualNode(parentElem)){
					return true;
				}
				if(((connectedWith).indexOf(element) != -1) && checkDroppableValue(element)){
					return true;
				}
				return false;
			};

			checkDroppableValue = function(element){
				var childrens = element.children;
				var childElem;
				for(var v= 0; v<childrens.length; v++){
					if(childrens[v] != element.querySelector("#dummy")){
						childElem = childrens[v];
						break;
					}
				}
				return (childElem ? childElem._sortableData.droppable : element._sortableData.droppable);
			};

			//Checks for appending the sortable elements at the end of the div
			checkPossiblePosition = function(element,sortableElem){
				if(element.childElementCount > 0){
					var lastChild = element.lastElementChild;
					if(sortableElem.getBoundingClientRect().top > lastChild.getBoundingClientRect().bottom){
						return true
					}
				}
				else{
					return true;
				}
				return false;
			};

			checkIfDroppable = function(parentElem,ele){
				if(ele.parentElement === parentElem && parentElem.childElementCount === 1 && (((ele.getBoundingClientRect().right > (parentElem.getBoundingClientRect().left + ele.getBoundingClientRect().width / 2)) && 
					(ele.getBoundingClientRect().right <= parentElem.getBoundingClientRect().right)) || ((ele.getBoundingClientRect().left < (parentElem.getBoundingClientRect().right - ele.getBoundingClientRect().width / 2)) && 
					(ele.getBoundingClientRect().left >= parentElem.getBoundingClientRect().left)))){
					return true;
				}
				return false;
			};

			checkForIntersect = function(parentElem,mP){
				var cs = window.getComputedStyle(parentElem);
				var offset = parentElem.getBoundingClientRect();
				// console.log("cs",cs);
				// console.log("offset",offset);
				// console.log("_mousePosition",mP.x,mP.y);
				if(mP.x > (offset.left + parseFloat(cs.paddingLeft || 0)) && mP.x < (offset.right - parseFloat(cs.paddingRight || 0)) && mP.y > (offset.top + parseFloat(cs.paddingTop || 0)) && mP.y < (offset.bottom - parseFloat(cs.paddingBottom || 0))){
					return true;
				}
				return false; 
			};

			checkForBetween = function(parentElem,mP,div){
				var childrens = parentElem.children;
				var templateTags = 0;
				var childElem = [];
				for(var i = 0;i<childrens.length;i++){
					if(childrens[i].tagName != "TEMPLATE" && childrens[i].id != "dummy"){
						childElem.push(childrens[i]);
					}
					else{
						templateTags++;
					}
				}
				if(templateTags == childrens.length){
					return true;
				}
				else if(childElem.length > 0 && childElem[childElem.length - 1].isEqualNode(div)){
					return true;
				}
				else if(div.getBoundingClientRect().top > childElem[childElem.length - 1].getBoundingClientRect().bottom){
					return true;
				}
				return false;
			};

			callRevertBack = function(data) {
				$L(data._div).removeClass("sortable-element-selected");
				removeStyle(data._div);
				data._placeholder.remove();
			};

			removeStyle = function(element){
				element.style.position = '';
				element.style.top = '';
				element.style.left = '';
				element.style.width = '';
				element.style.height = '';
				element.style.display = '';
				element.style.zIndex = '';
				element.style.boxSizing = '';
				$L(element).removeClass('lyteSortableElem');
			};

			
		}

		isEqual = function (value, other) {
			if(value.length != other.length){
				return false;
			}
			for(var i = 0 ; i < value.length ; i++){
				if(other.indexOf(value[i]) == -1){
					return false;
				}
			}
			// If nothing failed, return true
			return true;
		};

		convertToArrayOfItems = function(selector){
			if(typeof selector != "string" && selector.length > 0){
				return selector;
			}
			var selectorArray = selector.split(',');
			var retArray = [];
			selectorArray.forEach(function(item,indexVal){
				var items = $L(item.trim()).e;
				if(items.length){
					for(var i=0;i < items.length ;i++){
						if(retArray.indexOf(items[i]) == -1){
							retArray.push(items[i]);
						}
					}
				}
				else{
					if(retArray.indexOf(items) == -1){
						retArray.push(items);
					}
				}
			});
			return retArray;
		};
		
	}

})( window );