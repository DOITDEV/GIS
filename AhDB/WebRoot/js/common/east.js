  
var dialogArray = new Array();
var features2 = new Array();
var myMask2;


/**
   * 返回右侧面板
   */
  function getEastPanel()
  {	
	    var east = new Ext.Panel({
	        region: 'east',
	        title: '120功能面板',
	        id: 'west',
	        floatable: true,
			//resizaable:false,
	        width:320,
	       // hidden: true,
	        dragable:true,
	        split: true,
	        shadow: true,
	        collapsible: false,
			layout:'anchor',
	        frame: true,
			  items: [{
	            xtype: 'container',
	           // anchor: '280 10%',
				width : 320,
				height: 75,
	            //width: 280,
	            align: 'stretch',
	            layout: 'hbox',
	            items: [{
	                xtype: 'container',
	                //flex: 1,
	                width: 220,
	                layout: 'anchor',
	                items: [{
	                    xtype: 'textfield',
	                    margin: '5,5,5,5',
	                    width: 220,
	                    fieldLabel: '地名地址',
	                    labelWidth: 60,
	                    id: 'locationName',
	                    anchor: '95%'
	                },{
	                    xtype: 'textfield',
	                    margin: '5,5,5,5',
	                    width: 220,
	                    fieldLabel: '小区栋号',
	                    labelWidth: 60,
	                    id: 'locationNum',
	                    anchor: '95%'
	                }]
	            }, {
	                xtype: 'container',
	                layout: 'anchor',
					width: 100,
	                items: [{
	                    xtype: 'button',
	                    margin: '4,4,4,4',
		                anchor: '76% 60%',
	                    text: '查询',
	                    handler: function () {
	                        var name = Ext.getCmp('locationName').value;
	                        locationSearch(name);
	                    }
	                },{
	                    xtype: 'button',
	                    margin: '4,4,4,4',
		                anchor: '76%',
	                    text: '查询',
	                    handler: function () {
	                		
	                        var name = Ext.getCmp('locationNum').value;
	                        locationNumSearch(name);
	                    }
	                }]
	            }]
	        }, MasPoiList,{ 
	                margin: '10,10,5,10', 
	        		frame: true, 
					height: 34,
					anchor: '100%',
	        		layout: 'hbox', 
	        		items: [{
	        					labelWidth: 40,
	        					 width: 200, 
	        					 id:'hosptialName',
	        					 xtype: 'textfield', 
	        					 fieldLabel: '医院' 
	        				},{ 
							    width: 40, 
	        					xtype: 'button', 
	        					text: '查询',
	        					handler: function () {
	    	                        var name = Ext.getCmp('hosptialName').value;
	    	                        hosSearch(name);
	    	                    }
	                        }] 
	        },Mas120List,{
				xtype: 'container',
	            //anchor: '280 10%',
				height: 60,
				width : 280,
	            align: 'stretch',
	            layout: 'hbox',
				
	          /*   xtype: 'container',
	            anchor: '100% 20%',
	            //width: 280,
	            align: 'stretch',
	            layout: 'hbox', */
	            items: [{
	                xtype: 'container',
	                width: 200,
	                layout: 'anchor',
	                items: [{
	                    xtype: 'textfield',
	                    margin: '5,5,5,5',
	                    readOnly: true,
	                    width: 200,
	                    //labelWidth: 40,
	                    id: 'startPoint',
	                    anchor: '95%'
	                },{
	                    xtype: 'textfield',
	                    margin: '5,5,5,5',
	                    width: 200,
	                    readOnly: true,
	                    id : 'endPoint',
	                    anchor: '95%'
	                }]
	            },{
	                xtype: 'container',
					width : 100,
	                layout: 'anchor',
	                items: [{
	                    xtype: 'button',
						anchor: '76% 60%',
	                    margin: '4,4,3,3',
		                //anchor: '55%',
	                    text: '起点',
	                    handler: function () {
	                		mapClick = 1;
	                    }
	                },{
	                    xtype: 'button',
	                    margin: '4,4,3,3',
						anchor: '76%',
	                    text: '终点',
	                    handler: function () {
	                		mapClick =2;
	                    }
	                }]
	            }]

	        },{
                xtype: 'button',
                style: {
                    marginLeft: '100px'
                },
                text: '路径分析',
                align: 'stretch',
                handler: function () {
                	MasRouteStore.removeAll();
                    var routeParams = new esri.tasks.RouteParameters();
                    routeParams.returnRoutes = false;
                    routeParams.returnDirections = true;
                    routeParams.stops = new esri.tasks.FeatureSet();
                    //routeParams.outSpatialReference = {"wkid":2384};
 routeParams.outSpatialReference = {"wkid":4326};
                    
                    
                 //   var stop1 = map.graphics.add(new esri.Graphic(evt.mapPoint, stopSymbol));
                 //   var stop2 = map.graphics.add(new esri.Graphic(evt.mapPoint, stopSymbol));
                    
                    
                    routeParams.stops.features.push(startPoint);
                    routeParams.stops.features.push(endPoint);
                    routeTask.solve(routeParams);

                }
            	}]
    });		
		 return east;
}

//Adds the solved route to the map as a graphic
function showRoute(solveResult) {
	 var routeSymbol = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([0,0,255,0.5])).setWidth(5);
	 var directions = solveResult.routeResults[0].directions;
     directionFeatures = directions.features;
     glayer.add(new esri.Graphic(directions.mergedGeometry, routeSymbol));

     map.setExtent(directions.extent, true);
     var len = 0;
     dojo.forEach(solveResult.routeResults[0].directions.features, function(feature, i) {
    	 //alert(feature.attributes.time);
    	 if(i===0||i===solveResult.routeResults[0].directions.features.length-1)
    	{
    		 var record = {FID:i,text:feature.attributes.text, length:"", time:formatTime(feature.attributes.time)};
    	}
    	else 
    	{
    		len = len + feature.attributes.length;
    		var record = {FID:i,text:feature.attributes.text, length:returnFloat(feature.attributes.length), time:formatTime(feature.attributes.time)};
    	 }
       MasRouteStore.add(record);
       
     });
     var temp = returnFloat(len/40);
     var tempArr = temp.toString().split('.');   
     //alert(tempArr[0]);
    // alert(tempArr[1]);//temp[0]+"小时"+("0."+temp[1])*60+"分钟");//
     
     MasRouteGrid.reconfigure(MasRouteStore);
     MasRouteGrid.setTitle("总长度："+ returnFloat(len) +"公里"+"----预计耗时："+tempArr[0]+"小时"+returnFloat(("0."+tempArr[1])*60)+"分钟");//returnFloat(len/40)+"小时");
     MasRouteWin.show();
}

//Displays any error returned by the Route Task
function errorHandler(err) {
  alert("An error occured\n" + err.message + "\n" + err.details.join("\n"));

  //routeParams.stops.features.splice(0, 0, lastStop);
  //map.graphics.remove(routeParams.stops.features.splice(1, 1)[0]);
}

function formatTime(time) {
    var hr = Math.floor(time / 60), //Important to use math.floor with hours
        min = Math.round(time % 60);

    if (hr < 1 && min < 1) {
      return "";
    }
    else if (hr < 1) {
      return min + " minute(s)";
    }

    return hr + " hour(s) " + min + " minute(s)";
  }
