Lyte.Component.register('lyte-calendar',{
_template:"<template tag-name=\"lyte-calendar\">    <div class=\"lyteCalendarPopup\">        <div class=\"lyteCalendarView\">            <div>                <div class=\"lyteCalendarNavigator\">                    <template is=\"if\" value=\"{{ltPropYear}}\">                        <template case=\"true\"><span class=\"lyteCalNav lyteCalyearNavLft\" onmousedown=\"{{action('previous','Y',event)}}\"></span></template>                    </template>                    <span class=\"lyteCalNav lyteCaldLft\" onmousedown=\"{{action('previous','M',event)}}\"></span>                    <span class=\"lyteCalsCalMon\">{{monthHeader}}</span>                    <span class=\"lyteCalNav lyteCaldRgt\" onmousedown=\"{{action('next','M',event)}}\"></span>                    <template is=\"if\" value=\"{{ltPropYear}}\">                        <template case=\"true\"><span class=\"lyteCalNav lyteCalyearNavRgt\" onmousedown=\"{{action('next','Y',event)}}\"></span></template>                    </template>                </div>                <table class=\"lyteCalDay\">                    <tbody>                        <tr>                            <template is=\"for\" items=\"{{daysOfWeek}}\" item=\"day\" indexval=\"idod\">                                <th>{{day}}</th>                            </template>                        </tr>                    </tbody>                </table>            </div>            <table class=\"lyteCalDay\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">                <tbody>                    <template is=\"for\" items=\"{{matrix}}\" item=\"vector\" indexval=\"rowid\">                        <tr>                            <template is=\"for\" items=\"{{vector}}\" item=\"date\" indexval=\"cellid\">                                <template is=\"if\" value=\"{{lyteUiCheckClassForDate(date.clsname)}}\">                                    <template case=\"true\">                                        <template is=\"if\" value=\"{{ltPropStartDate}}\">                                            <template case=\"true\"><td data-date=\"{{date.val}}\" onmousedown=\"{{action('dateSelected',event)}}\" class=\"{{date.clsname}}\">{{date.date}}</td></template>                                            <template case=\"false\"><td data-data=\"{{date.val}}\" class=\"{{date.clsname}}\">{{date.date}}</td></template>                                        </template>                                    </template>                                    <template case=\"false\"><td onmousedown=\"{{action('dateSelected',event)}}\" data-date=\"{{date.val}}\" class=\"{{date.clsname}}\">{{date.date}}</td></template>                                </template>                            </template>                        </tr>                    </template>                 </tbody>            </table>            <div>                <div class=\"lyteCalBtns\">                    <template is=\"if\" value=\"{{showToday}}\">                        <template case=\"true\"><p class=\"lyteCalCurrentDate\"><a onmousedown=\"{{action('today',event)}}\">Today</a></p></template>                    </template>                    <template is=\"if\" value=\"{{ltPropYield}}\">                        <template case=\"true\">                            <lyte-yield yield-name=\"footer\"></lyte-yield>                        </template>                    </template>                </div>            </div>        </div>    </div></template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1,1,1]},{"type":"if","position":[1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,1,3]},{"type":"text","position":[1,1,1,1,5,0]},{"type":"attr","position":[1,1,1,1,7]},{"type":"attr","position":[1,1,1,1,9]},{"type":"if","position":[1,1,1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,3,1,1,1]},{"type":"for","position":[1,1,1,3,1,1,1],"dynamicNodes":[{"type":"text","position":[1,0]}]},{"type":"attr","position":[1,1,3,1,1]},{"type":"for","position":[1,1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}}]}]},{"type":"attr","position":[1,1,5,1,1]},{"type":"if","position":[1,1,5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,5,1,3]},{"type":"if","position":[1,1,5,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropStartDate","ltPropEndDate","ltPropCurrentDate","ltPropFormat","ltPropYear","ltPropMonthHeaderFormat","daysOfWeek","viewDate","changeData","ltPropYield"],
	init:function(){
	},
	data:function(){
		return {
			'ltPropStartDate':Lyte.attr("string",{"default":''}),
			'ltPropEndDate':Lyte.attr("string",{"default":''}),
			'ltPropCurrentDate':Lyte.attr("string",{"default":''}),
			'ltPropFormat':Lyte.attr("string",{"default":"MM/DD/YYYY"}),
			'ltPropYear':Lyte.attr("boolean",{"default":true}),
			'ltPropMonthHeaderFormat':Lyte.attr("string",{"default":'MMMM YYYY'}),
			'daysOfWeek':Lyte.attr("array",{"default":['Sun','Mon','Tue','Wed','Thu','Fri','Sat']}),
			'viewDate':Lyte.attr("object",{"default":{}}),
			'changeData':Lyte.attr("number",{"default":0}),
			'ltPropYield':Lyte.attr("boolean",{"default":false})
		}
	},
	getMonthHeader:function(){
		var format = this.getData('ltPropMonthHeaderFormat')
		var lmd = /MMMM YYYY/g
		var ld = /MMM YYYY/g
		var retval=""
		if(lmd.test(format)){
			var monthArray=['January','February','March','April','May','June','July','August','September','October','November','December']
			retval=monthArray[this.getData('viewDate').getMonth()]+" "+this.getData('viewDate').getFullYear()
		}else if(ld.test(format)){
			var monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			retval=monthArray[this.getData('viewDate').getMonth()]+" "+this.getData('viewDate').getFullYear()
		}
		return retval
	},
	getDateFromFormat:function(tdate,format){
		var date = tdate.getDate()
		var year  = tdate.getFullYear()
		var month= tdate.getMonth()+1
		if(month<10)
			month='0'+month
		if(date<10)
			date='0'+date
		var sd = /(MM).+(DD).+(YYYY)/g
		var ld = /(MMM|DD|YYYY).+(MMM|DD|YYYY).+(YYYY|MMM|DD)/g
		var lmd = /(MMMM|DD|YYYY).+(MMMM|DD|YYYY).+(YYYY|MMMM|DD)/g
		var iso =/(YYYY).+(MM).+(DD)/g
		if(lmd.test(format)){
			var monthArray=['January','February','March','April','May','June','July','August','September','October','November','December']
			format=format.replace('MMMM',monthArray[month-1])
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		else if(ld.test(format)){
			var monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			format=format.replace('MMM',monthArray[month-1])
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		else if(iso.test(format)){
			format=format.replace('MM',month)
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		else if(sd.test(format)){
			format=format.replace('MM',month)
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		
		return format
	},
	isLeapYear:function(year){
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	},
	getNumber:function(month,year){
		var daysinmonths = [31,28,31,30,31,30,31,31,30,31,30,31]
		if(this.isLeapYear.call(this,year) && month==1){
			return 29
		}
		else{
			return daysinmonths[month]
		}
	},
	showtoday:function(){
		var curDate = new Date()
		if(curDate.getMonth()!=this.getData('viewDate').getMonth() || curDate.getYear()!=this.getData('viewDate').getYear()){
			this.setData('showToday',true)
		}
		else{
			this.setData('showToday',false)
		}
	},
	checkDate:function(cdate){
		var sd = new Date(this.get('ltPropStartDate'))
		var ed = new Date(this.get('ltPropEndDate'))
		if(cdate >= sd && cdate <= ed){
			return false
		}
			return true;
		// var uby = ed.getFullYear(),lby = sd.getFullYear()
		// var ubm = ed.getMonth(),lbm = sd.getMonth()
		// var ubd = ed.getDate(),lbd = sd.getDate()
		// var cy = cdate.getFullYear(),cm = cdate.getMonth(), cd = cdate.getDate()
		// if(cy<=uby && cy>=lby && cm>=lbm && cm <= ubm && cd >= lbd && cd <= ubd){
		// 	return false
		// }
		// return true
	},
	setDates:function(){
		var nrow=6;
		var gDate = this.getData('viewDate')
		var day = gDate.getDay()
		var date = gDate.getDate()
		var firstday = date - Math.floor(date/7)*7 - 1
		firstday = day - firstday
		if(firstday<0){
			firstday=7-firstday
		}
		var month = gDate.getMonth()
		var year = 1900+gDate.getYear()
		month=month-1;
		if(month<0){
			month=11
			year=year-1
		}
		var ndim = this.getNumber.call(this,gDate.getMonth(),year)
		var fwd = 7 - firstday
		ndim = ndim-fwd
		ndim = ndim - 28
		if(ndim>0)
			nrow=nrow+1;
		this.setData('matrix',[])
		month = gDate.getMonth()-1;
		year = 1900+gDate.getYear()
		var calStartDate=new Date(month+2+'/1/'+year)
		calStartDate.setDate(calStartDate.getDate()-firstday)
		this.setData('matrix',[])
		for(var i=0;i<nrow;i++){
			//LyteComponent.arrayFunctions(this.getData('matrix'),'push',[])
			Lyte.arrayUtils(this.getData('matrix'),'push',[[]])
			for(var j=0;j<7;j++){
				var clsname='lyteCalCdate'
				var newMonth=calStartDate.getMonth()
				var curDate = new Date(this.getData('viewDate').getTime())
				var curMonth= curDate.getMonth()
				var ndate=calStartDate.getDate()
				var tdate = this.getData('ltPropCurrentDate')?new Date(this.getData('ltPropCurrentDate')):this.getData('todayDate')
				var nyear = calStartDate.getYear()
				if((!this.getData('ltPropStartDate') && !this.getData('ltPropEndDate')) && (curMonth-newMonth==1 || newMonth-curMonth==11)){
					clsname+=' lyteCalGray'
				}
				else if((!this.getData('ltPropStartDate') && !this.getData('ltPropEndDate')) && (newMonth-curMonth==1 || curMonth-newMonth==11)){
					clsname+=' lyteCalGray'
				}
				else if(this.getData('ltPropStartDate') && this.getData('ltPropEndDate') && this.checkDate(calStartDate) ){
					clsname+=' lyteCalGray'
				}
				if(newMonth==tdate.getMonth() && tdate.getDate() == ndate && tdate.getYear() == nyear /*&& clsname.indexOf('old')==-1 && clsname.indexOf('disabled')==-1*/){
					clsname+=' lyteCalSel'
				}
				if(calStartDate.getDay()==0 || calStartDate.getDay()==6){
					clsname+=' lyteCalWeekend'
				}
				var obj={}
				obj.date=calStartDate.getDate()
				obj.clsname=clsname
				obj.val = this.getDateFromFormat.call(this,calStartDate,this.getData('ltPropFormat'))
				//LyteComponent.arrayFunctions(this.getData('matrix')[i],'push',obj)
				Lyte.arrayUtils(this.getData('matrix')[i],'push',obj)
				calStartDate.setDate(calStartDate.getDate()+1)
			}
		}	
	}.observes('ltPropStartDate','ltPropEndDate','changeData'),
	init:function(){
		var viewDate,selecteddate
		if(this.get('ltPropStartDate') && this.get('ltPropEndDate')){
			viewDate = new Date(this.get('ltPropStartDate'))
			selecteddate = new Date()
			this.setData('todayDate',selecteddate)
		}
		else{
			viewDate = this.getData('ltPropCurrentDate')?new Date(this.getData('ltPropCurrentDate')):new Date()
			selecteddate = new Date(viewDate.getTime())
			this.setData('todayDate',selecteddate)  //Consider what this does
		}
		viewDate.setDate(1)
		this.setData('viewDate',viewDate)
		this.setData('monthHeader',this.getMonthHeader.call(this))
		this.$node.constructor._observers[0].value.call(this)
		// this.setData('changeData',this.getData('changeData') + 1)
		this.showtoday.call(this)
		//this.setDates.call(this)
	},
	didConnect:function(){
	},
	actions:{
		previous:function(val){
			var inter
			if(val=='Y'){
				inter = this.getData('viewDate')
				inter.setYear(1900+inter.getYear()-1)
				this.setData('viewDate',inter)
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)
				this.showtoday.call(this)
			}
			else if(val=='M'){
				inter = this.getData('viewDate')
				inter.setMonth(inter.getMonth()-1)
				this.setData('viewDate',inter)
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)
				this.showtoday.call(this)

			}
		},
		dateSelected:function(event){
			var ele = this.$node.getElementsByClassName('lyteCalSel')
			if(ele.length!=0){
				ele[0].classList.remove('lyteCalSel')
			}
			this.setData('ltPropCurrentDate',event.target.getAttribute('data-date'))
			event.target.classList.add('lyteCalSel')
			if(this.getMethods('onDateselected')){
				this.executeMethod('onDateselected',event,event.target.getAttribute('data-date'))
			}
		},
		today:function(){
			var curDate = new Date()
			curDate.setDate(1)
			this.setData('viewDate',curDate)
			this.setData('monthHeader',this.getMonthHeader.call(this))
			//this.$node.constructor._observers[0].value.call(this)
			this.setData('changeData',this.getData('changeData') + 1)
			this.setData('showToday',false)
		},
		next:function(val){
			var inter
			if(val=='Y'){
				inter = this.getData('viewDate')
				inter.setYear(1900+inter.getYear()+1)
				this.setData('viewDate',inter)
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)
				this.showtoday.call(this)
			}
			else if(val=='M'){
				inter = this.getData('viewDate')
				inter.setMonth(inter.getMonth()+1)
				this.setData('viewDate',inter)
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)	
				this.showtoday.call(this)		
			}
		}

	}
});
