define(["jquery","common/rivetsExtra","jquery-ui","color-picker","ddslick"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,e){require(["css!charts/indicators/dc/dc.css"]),require(["text!charts/indicators/dc/dc.html","text!charts/indicators/indicators.json"],function(f,g){f=a(f),f.appendTo("body"),g=JSON.parse(g);var h=g.dc,i={title:h.long_display_name,description:h.description};b.bind(f[0],i),f.find("input[type='button']").button(),f.find("#dc_high_stroke,#dc_low_stroke").each(function(){a(this).colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),a(this).data("color","#"+c.formatted)},ok:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),a(this).data("color","#"+c.formatted)}})}),a("#dc_high_stroke").css("background","#2a277a"),a("#dc_low_stroke").css("background","red");var j="Solid";a("#dc_dashStyle").ddslick({imagePosition:"left",width:138,background:"white",onSelected:function(b){a("#dc_dashStyle .dd-selected-image").css("max-width","105px"),j=b.selectedData.value}}),a("#dc_dashStyle .dd-option-image").css("max-width","105px"),f.dialog({autoOpen:!1,resizable:!1,modal:!0,width:350,my:"center",at:"center",of:window,dialogClass:"dc-ui-dialog",buttons:[{text:"OK",click:function(){var b=a(".dc_input_width_for_period");if(!_.isInteger(_.toNumber(b.val()))||!_.inRange(b.val(),parseInt(b.attr("min")),parseInt(b.attr("max"))+1))return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+b.attr("min")+" to "+b.attr("max")+" is allowed for "+b.closest("tr").find("td:first").text()+"!"})}),void b.val(b.prop("defaultValue"));var d={period:parseInt(f.find(".dc_input_width_for_period").val()),highStroke:a("#dc_high_stroke").css("background-color"),lowStroke:a("#dc_low_stroke").css("background-color"),strokeWidth:parseInt(f.find("#dc_strokeWidth").val()),dashStyle:j,appliedTo:parseInt(f.find("#dc_appliedTo").val())};a(a(".dc").data("refererChartID")).highcharts().series[0].addIndicator("dc",d),c.call(f)}},{text:"Cancel",click:function(){c.call(this)}}]}),f.find("select").selectmenu({width:140}),"function"==typeof e&&e(d)})}return{open:function(b){return 0==a(".dc").length?void d(b,this.open):void a(".dc").data("refererChartID",b).dialog("open")}}});