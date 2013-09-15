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
                //defaultFocus: 'notepad-editor', EXTJSIV-1300

                // IE has a bug where it will keep the iframe's background visible when the window
                // is set to visibility:hidden. Hiding the window via position offsets instead gets
                // around this bug.
                hideMode: 'offsets',
                layout: 'fit',
                items:{
                	xtype:'panel',
                	id:'doit_map'
                },
                listeners:{
                	destroy:function(){
                		doitmap=null;
                	},
                	show:function(w){
                		if(doitmap){
                			return;
                		}
                		doitmap = new soso.maps.Map(w.items.get(0).getId(), {
                	        // 地图的中心地理坐标。
                	        center: new soso.maps.LatLng(31.19512740,121.45628042),
                	        zoom:17
                	    });
                		function removeWhitespace(xml){  
                		    var loopIndex;  
                		    for (loopIndex = 0; loopIndex < xml.childNodes.length; loopIndex++){  
                		        var currentNode = xml.childNodes[loopIndex];  
                		        if (currentNode.nodeName){  
                		            removeWhitespace(currentNode);  
                		        }  
                		        
                		        if (currentNode.src&&currentNode.src=='http://api.map.soso.com/v2/0/8c/theme/logo.png'){  
                		        	xml.parentNode.parentNode.removeChild(currentNode.parentNode.parentNode);  
                		        }  
                		        if (currentNode.innerText=='©2013 Tencent - GS(2012)6001号'){  
                		        	//xml.parentNode.parentNode.removeChild(currentNode.parentNode); 
                		        }  
                		    }  
                		}  
                		soso.maps.event.addListener(doitmap,'zoom_changed',function() {
                			var ddiv = document.getElementById('doit_map').parentNode;
                			removeWhitespace(ddiv);
                		});
                		setTimeout(function(){
                			doitmap.zoomTo(16);
                			var ddiv = document.getElementById('doit_map').parentNode;
                			removeWhitespace(ddiv);
                	    },1000);
                	    
                	}
                }
            });
        }
        
        return win;
    }
});
