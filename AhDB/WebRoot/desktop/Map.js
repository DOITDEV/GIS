/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Map', {
    extend: 'Ext.ux.desktop.Module',

    requires: [],

    id:'map',

    init : function(){
        this.launcher = {
            text: 'Map',
            iconCls:'map'
        };
    },
    
    
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('map');
        if(!win){
            win = desktop.createWindow({
                id: 'map',
                title:'Map',
                width:800,
                height:600,
                iconCls: 'map',
                animCollapse:false,
                border: false,
                geocoder:null,
                marker:null,
                markersArray:[],
                infoWin:null,
                //defaultFocus: 'notepad-editor', EXTJSIV-1300

                // IE has a bug where it will keep the iframe's background visible when the window
                // is set to visibility:hidden. Hiding the window via position offsets instead gets
                // around this bug.
                hideMode: 'offsets',
                layout: 'fit',
                tbar:['地块:',{xtype:'textfield',id:'lanblock'},'区域:',{xtype:'textfield',id:'cityarea'},'街道:',{xtype:'textfield',id:'address'},{xtype:'button',text:'搜素',handler:function(){
                	var address = Ext.getCmp('lanblock').getValue()+Ext.getCmp('cityarea').getValue()+Ext.getCmp('address').getValue();
                	win.codeAddress(address);
                }}],
                items:{
                	xtype:'panel',
                	id:'doit_map'
                },
                listeners:{
                	destroy:function(){
                		doitmap=null;
                	},
                	show:function(w){
                		//win.loadScript();
                		win.mapinit();
                	}
                },
                codeAddress:function(address,rec) {
                	win.geocoder = new soso.maps.Geocoder({
                        complete : function(result){
                        	var label = new soso.maps.Label({
                                position: result.detail.location,
                                map:doitmap,
                                content:address
                            });
                            win.marker = new soso.maps.Marker({
                                map:doitmap,
                                position: result.detail.location
                            });
                            soso.maps.event.addListener(win.marker, 'click', function() {
                            	win.infoWin.open();
                            	win.infoWin.setContent('<div style="text-align:center;white-space:'+
                                'nowrap;margin:10px;">'+
                            			'<table><tr><td>地块：</td><td>'+rec.data.lanBlock+'</td></tr></table>'+
                            			'<table><tr><td>区域：</td><td>'+rec.data.cityArea+'</td></tr></table>'+
                            			'<table><tr><td>地址：</td><td>'+rec.data.address+'</td></tr></table>'+
                            			'<table><tr><td>土地面积：</td><td>'+rec.data.landSize+'</td></tr></table>'+
                            			'<table><tr><td>房屋面积：</td><td>'+rec.data.roomSize+'</td></tr></table>'+
                            			'<table><tr><td>空置面积：</td><td>'+rec.data.geoLocation+'</td></tr></table>'+
                            			'</div>');
                            	win.infoWin.setPosition(result.detail.location);
                            });
                            win.markersArray.push(label);
                            win.markersArray.push(win.marker);
                            doitmap.setCenter(result.detail.location);
                        }
                    });
                    win.geocoder.getLocation(address);
                },
                mapinit:function(){
                	if(doitmap){
            			return;
            		}
                	var myLatlng = new soso.maps.LatLng(31.19512740,121.45628042);
                	var myOptions = {
                	    zoom: 14,
                	    center: myLatlng,
                	    mapTypeId: soso.maps.MapTypeId.ROADMAP
                	};
                	doitmap = new soso.maps.Map(document.getElementById("doit_map"), myOptions);
                    win.infoWin = new soso.maps.InfoWindow({
                        map: doitmap
                    });
                    //默认根据客户端IP定位地图中心
//                    citylocation = new soso.maps.CityService({
//                        complete : function(result){
//                        	doitmap.setCenter(result.detail.latLng);
//                        }
//                    });
//                    citylocation.searchLocalCity();
//                	soso.maps.event.addListener(doitmap,'zoom_changed',function() {
//            			var ddiv = document.getElementById('doit_map').parentNode;
//            			win.removeWhitespace(ddiv);
//            		});
            		setTimeout(function(){
            			var ddiv = document.getElementById('doit_map').parentNode;
            			win.removeWhitespace(ddiv);
            	    },1000);
                },
                removeWhitespace:function(xml){
            	    var loopIndex;  
            	    for (loopIndex = 0; loopIndex < xml.childNodes.length; loopIndex++){  
            	        var currentNode = xml.childNodes[loopIndex];  
            	        if (currentNode.nodeName){  
            	            win.removeWhitespace(currentNode);  
            	        }  
            	        
            	        if (currentNode.src&&currentNode.src=='http://api.map.soso.com/v2/0/8c/theme/logo.png'){  
            	        	xml.parentNode.parentNode.removeChild(currentNode.parentNode.parentNode);  
            	        }  
            	        if (currentNode.innerText=='©2013 Tencent - GS(2012)6001号'){  
            	        	//xml.parentNode.parentNode.removeChild(currentNode.parentNode); 
            	        }  
            	    }  
            	
                },
                addMarker:function (location) {
                    var marker = new soso.maps.Marker({
                        position: location,
                        map: map
                    });
                    win.markersArray.push(marker);
                },

                clearOverlays:function () {
                	var markersArray = win.markersArray;
                    if (markersArray) {
                        for (i in markersArray) {
                            markersArray[i].setMap(null);
                        }
                    }
                },

                showOverlays:function () {
                	var markersArray = win.markersArray;
                    if (markersArray) {
                        for (i in markersArray) {
                            markersArray[i].setMap(map);
                        }
                    }
                }, 

                deleteOverlays:function () {
                    if (win.markersArray) {
                        for (i in win.markersArray) {
                        	win.markersArray[i].setMap(null);
                        }
                        win.markersArray.length = 0;
                    }
                },
                
                loadScript:function() {
                	  var script = document.createElement("script");
                	  script.charset="utf-8";
                	  script.type = "text/javascript";
                	  script.src = "http://map.soso.com/api/v2/main.js?key=8ab6fbe26931337aad7ab867467d4e9c";
                	  document.body.appendChild(script);
                	  script.type = "text/javascript";
                	  script.src = "http://api.map.soso.com/plugin/v2/PanoramaOverview/PanoramaOverview-min.js?key=8ab6fbe26931337aad7ab867467d4e9c";
                	  document.body.appendChild(script);
                	}
            });
        }
        
        return win;
    }
});
