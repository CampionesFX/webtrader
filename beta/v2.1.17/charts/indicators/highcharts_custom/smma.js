SMMA=function(a,b,c){IndicatorBase.call(this,a,b,c),this.priceData=[],this.CalculateSMMAValue=function(a,b){var c=this.indicatorData[b-1].value||0,d=c*this.options.period,e=(d-c+this.indicators.getIndicatorOrPriceValue(a[b],this.options.appliedTo))/this.options.period;return toFixed(e,4)};for(var d=0;d<a.length;d++){if(d>this.options.period-1){var e=this.CalculateSMMAValue(a,d);this.indicatorData.push({time:a[d].time,value:e})}else if(d===this.options.period-1){for(var f=0,g=0;g<this.options.period;g++)f+=this.indicators.getIndicatorOrPriceValue(a[g],this.options.appliedTo);var e=toFixed(f/this.options.period,4);this.indicatorData.push({time:a[d].time,value:e})}else this.indicatorData.push({time:a[d].time,value:0});this.priceData.push(a[d])}this.indicatorData.forEach(function(a){0===a.value&&(a.value=null)})},SMMA.prototype=Object.create(IndicatorBase.prototype),SMMA.prototype.constructor=SMMA,SMMA.prototype.addPoint=function(a){this.priceData.push(a);var b=this.CalculateSMMAValue(this.priceData,this.priceData.length-1);return this.indicatorData.push({time:a.time,value:b}),[{id:this.uniqueID,value:b}]},SMMA.prototype.update=function(a){var b=this.priceData.length-1;this.priceData[b].open=a.open,this.priceData[b].high=a.high,this.priceData[b].low=a.low,this.priceData[b].close=a.close;var c=this.CalculateSMMAValue(this.priceData,b);return this.indicatorData[b].value=c,[{id:this.uniqueID,value:c}]},SMMA.prototype.toString=function(){return"SMMA ("+this.options.period+", "+this.indicators.appliedPriceString(this.options.appliedTo)+")"};