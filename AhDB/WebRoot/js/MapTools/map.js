// 窗口改变
var map=null;
function OnDocResize() {
 
    try {
        if (map != null) {
            SetPalette();
		//alert("ddd");
            return;
        }
	else{
		//alert("error");
	}
        setTimeout("OnDocResize()", 88);
    }
    catch (e) { }
}
// 设置页面画布
function SetPalette() {
    try {
        var bodyHeight = document.body.offsetHeight;
        var bodyWidth = document.body.offsetWidth;
        var mDiv = document.getElementById("viewport2");
  
        var MapWidth = parseInt(bodyWidth);
        mDiv.style.left = "0px";;
        var MapHeight = parseInt(bodyHeight)-170;// - HtmlBody.TopHeight - HtmlBody.CopyrightHeight;
        if (MapWidth < 0) MapWidth = 1;
        if (MapHeight < 0) MapHeight = 1;
       // alert(MapWidth);
	//alert(MapHeight);
        //MapHeight += 2;
        mDiv.style.width = MapWidth + "px";
        mDiv.style.height = MapHeight + "px";
	
       	map.resize();
        map.reposition();
    }
    catch (e) { 
		alert(e);
	}
}
    function init(){

            //map = new esri.Map("viewport2");
    	    initExtent = new esri.geometry.Extent(121.397052, 31.106345, 121.487026, 31.2271,new esri.SpatialReference({wkid:4326}));
        	map = new esri.Map("viewport2",{extent:initExtent,lods:lods, nav:false,logo:false, navigationMode:'classic'});//,{lods:lods, nav:false,logo:false, navigationMode:'classic'}
            //add the overview map 121.37184951068478,y:31.213728178753094  121.48669097186642,y:31.186777342571453
        	//initExtent = new esri.geometry.Extent(580044.032265, 3460190.29266,683366.342235,3553777.27274,new esri.SpatialReference({ wkid:2384 }));
 
			//initExtent = new esri.geometry.Extent(121.37184951068478, 31.186777342571453,121.48669097186642,31.213728178753094,new esri.SpatialReference({wkid:4326}));
			//(120.64554084337, 30.70323111445,122.17364718963,31.55488274055,new esri.SpatialReference({wkid:4326}));

			//initExtent = new esri.geometry.Extent(120.545775938599, 30.70323111445,122.273412094401,31.55488274055,new esri.SpatialReference({wkid:4326}));


//	        initExtent = new esri.geometry.Extent(118.241287589841, 31.1806171365414,119.046036129957,32.0114582061152,new esri.SpatialReference({wkid:4326}));
 
//        	routeTask = new esri.tasks.RouteTask("http://10.34.36.41/ArcGIS/rest/services/84-MasRoad/NAServer/Route");
//        	imageLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://10.34.36.41/ArcGIS/rest/services/84-TempletDOM/MapServer", { visibility: false, displayLevels: [0, 1, 2, 3, 4, 5, 6, 7] });
//        	imageLayer2 = new esri.layers.ArcGISTiledMapServiceLayer("http://10.34.36.41/ArcGIS/rest/services/84-TempletDOM500/MapServer", { visibility: false, displayLevels: [8, 9, 10] }); 
//        	tileLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://10.34.36.41/ArcGIS/rest/services/84-TempletDLG/MapServer",{displayLevels:[0,1,2,3,4,5,6,7]});

//        	tileLayer2 = new esri.layers.ArcGISTiledMapServiceLayer("http://10.34.36.41/ArcGIS/rest/services/84-TempletDLG500/MapServer", { displayLevels: [8, 9, 10] }); 
    		//dynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://ahcity.ahmap.gov.cn/ArcGIS/rest/services/mas120/MapServer/2", {displayLevels:[8,9,10]});
			//http://mape.shanghai-map.net/ArcGIS/rest/services/SHMAP_FRAME/MapServer SHMAP_D
//    		tileLaer2 = new esri.layers.ArcGISTiledMapServiceLayer("http://mape.shanghai-map.net/ArcGIS/rest/services/SHMAP_DZJ/MapServer",{displayLevels:[0,1,2,3,4,5,6,7,8,9,10]}); 
			tileLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://mape.shanghai-map.net/arcgis/rest/services/SHMAP_D/MapServer",{displayLevels:[4,5,6,7]});
			tileLayer2 = new esri.layers.ArcGISTiledMapServiceLayer("http://mape.shanghai-map.net/arcgis/rest/services/SHMAP_DZJ/MapServer",{displayLevels:[4,5,6,7]});
			imageLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://mape.shanghai-map.net/arcgis/rest/services/SHMAP_IMAGE/MapServer",{displayLevels:[4,5,6,7]}); 
//			DLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://mape.shanghai-map.net/ArcGIS/rest/services/253D/MapServer",{displayLevels:[5,6,7]});
			
			map.addLayer(tileLayer);
			map.addLayer(imageLayer);
			//map.addLayer(DLayer);
			map.addLayer(tileLayer2);
			
//			map = new esri.Map("viewport2", {
//                logo:false
//            });
//			var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://mape.shanghai-map.net/arcgis/rest/services/253D/MapServer");
//            map.addLayer(basemap)
			
    		imageLayer.setVisibility(false);
    		//DLayer.setVisibility(false);
    		
        	pointGry = new esri.layers.GraphicsLayer();
        	hosGry = new esri.layers.GraphicsLayer();
        	superGry = new esri.layers.GraphicsLayer();
        	xzcfGry = new esri.layers.GraphicsLayer();
        	tsjbGry = new esri.layers.GraphicsLayer();
        	startLayer = new esri.layers.GraphicsLayer();
        	endLayer = new esri.layers.GraphicsLayer();
        	
        	glayer = new esri.layers.GraphicsLayer();
        	map.addLayer(glayer);
            map.addLayer(pointGry);
            map.addLayer(hosGry);
            map.addLayer(superGry);
            map.addLayer(xzcfGry);
            map.addLayer(tsjbGry);
            
            map.addLayer(startLayer);
            map.addLayer(endLayer);
            //map.setLevel(7);
            //var pt = new esri.geometry.Point(121.4316811132314,31.189882275836947,map.spatialReference);
	  	  	//map.centerAt(pt); x:121.37855191706441,y:31.211597440021517   121.48944516657613,y:31.184131619709017
            
            var navToolbar = new esri.toolbars.Navigation(map);
            
            //navToolbar.activate();
            
            dojo.connect(routeTask, "onSolveComplete", showRoute);
            dojo.connect(routeTask, "onError", errorHandler);
             
        	dojo.connect(tsjbGry,"onClick", function(evt){
        		  tsxzWin.hide(); 
            	  var pointTemp = map.toScreen(new esri.geometry.Point([bufferX,bufferY],new esri.SpatialReference({wkid:4326})));//(new NLatLng(bufferX,bufferY));//map.worldToPixel(new NLatLng(bufferX,bufferY));//(point);
            	  var x = pointTemp.x-275;
            	  var y = pointTemp.y+60; 
            	  tsxzWin.show(); 
            	  tsxzWin.items.items[0].body.update('<div><a>投诉对象：'+ tsjbDetailRec[0].get('objName') + '</a><br><br><a>投诉内容：'+ tsjbDetailRec[0].get('complaint_DETAIL') +'</a></div>');	
            	  tsxzWin.setPosition(x,y,true);
            	  tsxzWin.doLayout();
            });
        	dojo.connect(xzcfGry,"onClick", function(evt){
        		  tsxzWin.hide(); 
	          	  var pointTemp = map.toScreen(new esri.geometry.Point([bufferX,bufferY],new esri.SpatialReference({wkid:4326})));//(new NLatLng(bufferX,bufferY));//map.worldToPixel(new NLatLng(bufferX,bufferY));//(point);
	          	  var x = pointTemp.x-275;
	          	  var y = pointTemp.y+60;//140;
	          	  tsxzWin.show(); 
	          	  tsxzWin.items.items[0].body.update('<div><a>处罚对象：'+ tsjbDetailRec[0].get('unit_NAME') + '</a><br><br><a>处罚案由：'+ tsjbDetailRec[0].get('case_CON') +'</a></div>');	
	          	  tsxzWin.setPosition(x,y,true);
	          	  tsxzWin.doLayout();
          });
        	
            dojo.connect(pointGry,"onClick", function(evt){
            	  pointWin.hide(); 
            	  var pointTemp = map.toScreen(new esri.geometry.Point([bufferX,bufferY],new esri.SpatialReference({wkid:4326})));//(new NLatLng(bufferX,bufferY));//map.worldToPixel(new NLatLng(bufferX,bufferY));//(point);
            	  var x = pointTemp.x-275;
            	  var y = pointTemp.y+60;//140;
            		  pointWin.show(); 
            		  pointWin.items.items[0].body.update('<div><a>名称：'+ bufferValue + '</a><br><br><a>地址：'+ bufferAdd +'</a></div>');	
            		  pointWin.setPosition(x,y,true);
            		  pointWin.doLayout();
            });
            
            dojo.connect(map, "onExtentChange", function(extent){     
            	//alert(map.getLevel());
            	// x:121.37855191706441,y:31.211597440021517   121.48944516657613,y:31.184131619709017
            	//121.37184951068478, 31.186777342571453,121.48669097186642,31.213728178753094
            	//121.397052, 31.106345),new BMap.Point(121.487026, 31.2271)
            	if(map.extent.xmax>121.600||map.extent.xmin<121.296||map.extent.ymax>31.230||map.extent.ymin<31.090)
            	{
            		map.setExtent(initExtent);
            	}
//            	if(map.extent.xmin<121.397052||map.extent.xmax>121.487026||map.extent.ymin<31.106345||map.extent.ymax>31.2271)
//            	{
//            		map.setExtent(initExtent);
//            	}
            	if(map.getLevel()===10)
            	{
            		//dynamicMapServiceLayer.setVisibility(true);
            	}
            	else{
            		//dynamicMapServiceLayer.setVisibility(false);
            	}
	    	     var width = document.body.clientWidth;
	    		 var height = document.body.clientHeight;
	    		 
	    		 if(tsxzWin.hidden==false){
	        		 var maploc2 = map.toScreen(new esri.geometry.Point([bufferX,bufferY],new esri.SpatialReference({wkid:4326})));// NLatLng(bufferX,bufferY));
	        		 var x = maploc2.x-275; 
	        		 var y = maploc2.y+60;//140; 
	    			 
	    			 if(x<-270||y<150||x>width-350||y>height-150)
	    			 {
	    				 tsxzWin.hide();
	    			 }
	    			 else
	    			 {
	    				 tsxzWin.setPosition(x,y,true);
	    			 }
	        	 }
	    		 
	        	 if(pointWin.hidden==false){
	        		 var maploc2 = map.toScreen(new esri.geometry.Point([bufferX,bufferY],new esri.SpatialReference({wkid:4326})));// NLatLng(bufferX,bufferY));
	        		 var x = maploc2.x-275; 
	        		 var y = maploc2.y+60;//140; 
	    			 
	    			 if(x<-270||y<150||x>width-350||y>height-150)
	    			 {
	    				pointWin.hide();
	    			 }
	    			 else
	    			 {
	    				pointWin.setPosition(x,y,true);
	    			 }
	        	 }
	        	 if(hosWin.hidden==false){
	        		 var maploc = map.toScreen(new esri.geometry.Point([hosX,hosY],new esri.SpatialReference({wkid:4326})));//map.worldToPixel(new NLatLng(hosX,hosY));
	        		 var x1 = maploc.x-270;
	        		 var y1= maploc.y+60;//140;
	        		 
	    			  if(x1<-270||y1<150||x1>width-350||y1>height-150)
	    			 {
	    				hosWin.hide();
	    			 }
	    			 else
	    			 {
	    				hosWin.setPosition(x1,y1,true);
	    			 }
	        	 }
            });
            
            
            dojo.connect(superGry,"onClick", function(evt){    
            	hosX = evt.graphic.attributes["hosX"];
            	hosY = evt.graphic.attributes["hosY"];
            	hosValue = evt.graphic.attributes["hosValue"];
            	hosAdd = evt.graphic.attributes["hosAdd"];
            	var record = superviseGrid.getSelectionModel().getSelection();	
            	var users = record[0].get('superviseUsers');//evt.graphic.attributes["users"]; 
            	var hosDate = record[0].get('superviseDate');//evt.graphic.attributes["date"];
            	var result = record[0].get('superviseResult');//evt.graphic.attributes["result"]; 
            	//hosWin.show();
            	superWin2.hide(); 
            	  var pointTemp = map.toScreen(new esri.geometry.Point([hosX,hosY],new esri.SpatialReference({wkid:4326})));  
	    		  var x = pointTemp.x-270;
	    		  var y = pointTemp.y+60;
	    		  //Ext.getCmp('btn1').setVisible (true);
	    		  
	    		  superWin2.show(); 
	    		  superWin2.setPosition(x,y,true);
	    		  superWin2.items.items[0].body.update('<div><a>监督对象：</a>'+ hosValue + '<br><br><a>监督地址：'+ hosAdd +'<br><br><a>监督用户：'+ users +'<br><br><a>监督日期：'+ hosDate +'<br><br><a>监督结论：'+ result +'</div>');	
	    		  //superWin.setPosition(x,y,true);
	    		  superWin2.doLayout();
            	
//            	  superWin.hide(); 
//	    		  var pointTemp = map.toScreen(new esri.geometry.Point([superX,superY],new esri.SpatialReference({wkid:4326})));
//	    	     
// 
//	    		  //var x = pointTemp.x-270;
//	    		  //var y = pointTemp.y+60;
//	    		  superWin.show(); 
//	    		  superWin.items.items[0].body.update('<div><a>监督对象：</a>'+ hosValue + '<br><br><a>监督地址：'+ hosAdd +'</a><br><br><a>监督人员：'+ users +'</a><br><br><a>监督日期：'+ hosDate +'</a><br><br><a>监督结论：'+ result +'</a></div>');	
//	    		  //superWin.setPosition(x,y,true);
//	    		  superWin.doLayout();
            });
            dojo.connect(hosGry,"onClick", function(evt){    
            	hosX = evt.graphic.attributes["hosX"];
            	hosY = evt.graphic.attributes["hosY"];
            	hosValue = evt.graphic.attributes["hosValue"];
            	hosAdd = evt.graphic.attributes["hosAdd"];
            	//alert(hosX);
            	//alert(hosY);
	    		  hosWin.hide(); 
	    		  var pointTemp = map.toScreen(new esri.geometry.Point([hosX,hosY],new esri.SpatialReference({wkid:4326})));
	    	     
 
	    		  var x = pointTemp.x-270;
	    		  var y = pointTemp.y+60;
	    		  hosWin.show(); 
	    		  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue + '<br><br><a>地址：'+ hosAdd +'</a></div>');	
	    		  hosWin.setPosition(x,y,true);
	    		  hosWin.doLayout();
	    		 // map.setLevel(10);
	    	     // map.centerAt(new esri.geometry.Point([hosX,hosY],new esri.SpatialReference({wkid:2384})));
            });
            
         /*   dojo.connect(map, 'onLoad', function(theMap) {
              var overviewMapDijit = new esri.dijit.OverviewMap({
                map: map,
                visible:false
              });
              overviewMapDijit.startup();
            });*/
    		
            map_toolbar2 = new esri.toolbars.Draw(map);
            nav_toolbar = new esri.toolbars.Navigation(map)
            dojo.connect(map_toolbar2, "onDrawEnd", doMeasure);
            
            //实例化GeometryService，地址为ags发布的GeometryServer
            geometryService = new esri.tasks.GeometryService("http://10.34.36.41/ArcGIS/rest/services/Geometry/GeometryServer");
       	 
            mapClick=0;
            dojo.connect(map, "onClick", function (e) {
//    		 if(!rightMenu.isHidden())
//    			{
//    				rightMenu.hide();
//    			}
            map.graphics.clear();
    		 if(mapClick==1)
    		 {
    			 var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/pointIndex.png', 24, 24);
    			 //map.graphics.add(new esri.Graphic(e.mapPoint, symbol));
    			 
    			 startPoint = map.graphics.add(new esri.Graphic(e.mapPoint, symbol));
    			 //Ext.getCmp('startPoint').setValue("x:"+e.mapPoint.x+",y:"+e.mapPoint.y);
				 Ext.getCmp('coorsHos').setValue("x:"+e.mapPoint.x+",y:"+e.mapPoint.y);

    			 var x = e.mapPoint.x;
    			 var y = e.mapPoint.y;
    			 
     			 startPointX = x;
     			 startPointY = y;
    			 bufferX = x;
    			 bufferY = y;
    			  
    			 bufferValue = "起点";
    			 bufferAdd = "";//"x:"+x+",y:"+y;
    			 bufferArea = "";//record[0].get('所属区域');
    			  
    			 mapClick = 0;
    		 }
    		 if(mapClick==2)
    		 {
    			 var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/end.png', 24, 24);
    			 //map.graphics.add(new esri.Graphic(e.mapPoint, symbol));
    			 
                 endPoint = map.graphics.add(new esri.Graphic(e.mapPoint, symbol));
                 
    			 Ext.getCmp('endPoint').setValue("x:"+e.mapPoint.x+",y:"+e.mapPoint.y);
    			 var x = e.mapPoint.x;
    			 var y = e.mapPoint.y;
    			  
    			 endPointX = x;
    			 endPointY = y; 
    			 mapClick = 0;
    		 } 
    	});
            
       dojo.connect(map, "onLoad", function(evt){     	 
    	   	  //var pt = new esri.geometry.Point(121.43228862092359,31.189595449739876,map.spatialReference);	  
    	          //map.setLevel(4);
    	      //map.centerAt(pt); 
    	  	map.setExtent(initExtent,true);
	    });
            
	    	dojo.connect(map, "onPanStart", function(evt){     	 
//	    		 if(!rightMenu.isHidden())
//	    		 {
//	    			rightMenu.hide();
//	    		 }
	    	});
    	
	    	dojo.connect(map, "onPanEnd", function(evt){    
	    	     var width = document.body.clientWidth;
	    		 var height = document.body.clientHeight;
//	        	 if(pointWin.hidden==false){
//	        		 var maploc2 = map.toScreen(new esri.geometry.Point([bufferX,bufferY],new esri.SpatialReference({wkid:4326})));// NLatLng(bufferX,bufferY));
//	        		 var x = maploc2.x-275; 
//	        		 var y = maploc2.y+60;//140; 
//	    			 
//	    			 if(x<-270||y<150||x>width-350||y>height-150)
//	    			 {
//	    				pointWin.hide();
//	    			 }
//	    			 else
//	    			 {
//	    				pointWin.setPosition(x,y,true);
//	    			 }
//	        	 }
	    		 
	    		 if(superWin2.hidden==false){
	        		 var maploc = map.toScreen(new esri.geometry.Point([hosX,hosY],new esri.SpatialReference({wkid:4326})));//map.worldToPixel(new NLatLng(hosX,hosY));
	        		 var x1 = maploc.x-270;
	        		 var y1= maploc.y+60;//140;
	        		 
	    			  if(x1<-270||y1<150||x1>width-350||y1>height-150)
	    			 {
	    				  superWin2.hide();
	    			 }
	    			 else
	    			 {
	    				 superWin2.setPosition(x1,y1,true);
	    			 }
	        	 }
	        	 if(hosWin.hidden==false){
	        		 var maploc = map.toScreen(new esri.geometry.Point([hosX,hosY],new esri.SpatialReference({wkid:4326})));//map.worldToPixel(new NLatLng(hosX,hosY));
	        		 var x1 = maploc.x-270;
	        		 var y1= maploc.y+60;//140;
	        		 
	    			  if(x1<-270||y1<150||x1>width-350||y1>height-150)
	    			 {
	    				hosWin.hide();
	    			 }
	    			 else
	    			 {
	    				hosWin.setPosition(x1,y1,true);
	    			 }
	        	 }
//	        	 if(hosWin.hidden==false){
//	        		 var maploc = map.toScreen(new esri.geometry.Point([hosX,hosY],new esri.SpatialReference({wkid:4326})));//map.worldToPixel(new NLatLng(hosX,hosY));
//	        		 var x1 = maploc.x-270;
//	        		 var y1= maploc.y+60;//140;
//	        		 
//	    			  if(x1<-270||y1<150||x1>width-350||y1>height-150)
//	    			 {
//	    				hosWin.hide();
//	    			 }
//	    			 else
//	    			 {
//	    				hosWin.setPosition(x1,y1,true);
//	    			 }
//	        	 }
	    	});

	        dojo.connect(geometryService, "onBufferComplete", function(geometries) {
	        	myMask.hide();
	        	var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol("dashdot", new dojo.Color([255,0,0]), 2), new dojo.Color([255,255,0,0.25]));
	            var graphic = new esri.Graphic(geometries[0],symbol);
	            glayer.add(graphic);
	            //esri.config.defaults.io.proxyUrl = "proxy.jsp";
	            //esri.config.defaults.io.alwaysUseProxy = true;
/*	            buffer_query = new esri.tasks.QueryTask("http://ahcity.ahmap.gov.cn/ArcGIS/rest/services/mas120/MapServer/1");
	            var query = new esri.tasks.Query();
	            query.returnGeometry = true;
	            query.outFields = ["rName","DZ"];
	            query.geometry = geometries[0];
	            query.outSpatialReference = {wkid:4326};
	            buffer_query.execute(query,locationSeq_Result);

alert(geometries[0].getExtent().xmax);
alert(geometries[0].getExtent().ymax);
alert(geometries[0].getExtent().xmin);
alert(geometries[0].getExtent().ymin);*/
		var queryTask2 = new esri.tasks.QueryTask("http://10.34.36.41/ArcGIS/rest/services/mas120/MapServer/1");
		var query2 = new esri.tasks.Query();
		//query2.where = "rName Like '%中心%'";
		query2.geometry = geometries[0].getExtent();
		query2.outSpatialReference = {wkid:4326}; 
		query2.returnGeometry = true;
		query2.outFields = ["rName","DZ"];
		queryTask2.execute(query2,locationSeq_Result);

	            map.setExtent(geometries[0].getExtent(), true);
	          });

    }

  //量算
  function doMeasure(geometry)
  {
     //更加类型设置显示样式
     switch (geometry.type)
     {
        case "polyline":
           var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0,0,0]), 2);
           //设置样式
           var graphic = new esri.Graphic(geometry, symbol);
           //清除上一次的画图内容
           map.graphics.clear();
           //
           map.graphics.add(graphic);
           var lengthParams = new esri.tasks.LengthsParameters();
           lengthParams.polylines = [geometry];
           lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
           lengthParams.geodesic = true; 
           dojo.connect(geometryService, "onLengthsComplete", outputDistance);
           geometryService.lengths(lengthParams);	
           break;
        case "polygon":
           var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255,0,0]), 2), new dojo.Color([255,255,0,0.25]));
           //设置样式
           var graphic = new esri.Graphic(geometry, symbol);
           //清除上一次的画图内容
           map.graphics.clear();
           map.graphics.add(graphic);
           var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();
           areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
           areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
           geometryService.simplify([geometry],
        		   function(simplifiedGeometries){ 
        	   			areasAndLengthParams.polygons = simplifiedGeometries;
        	   			dojo.connect(geometryService, "onAreasAndLengthsComplete", outputAreaAndLength);
        	   			geometryService.areasAndLengths(areasAndLengthParams);
        	   		});
           break;
     }
     
  }
     
   //显示测量距离
     function outputDistance(result)
     {
    	//alert(dojo.number.format(result.lengths[0] / 1000));
        dojo.byId("measure_resultdiv").innerHTML = "距离："+dojo.number.format(result.lengths[0] / 1000) + "KM";
     }

     //显示测量面积
     function outputAreaAndLength(result)
     {
        dojo.byId("measure_resultdiv").innerHTML ="面积："+ dojo.number.format(result.areas[0] * 1000000) + "KM2";//+" 长度："+dojo.number.format(result.lengths[0]/1000) + "千米";
     }

