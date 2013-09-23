
//-------------------------------------------医院查询模块----------------------------------------------------
Ext.define("Mas120",{
	extend : 'Ext.data.Model',
	fields: ['rName','DZ','coordinate'],
	sortInfo:{field:'rName',direction:'ASC'}
});

var myMask;
var Mas120Store = Ext.create('Ext.data.Store',{
	model: 'Mas120'
});

var Mas120Col = [Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
                {header :'医院',width: 140, dataIndex:'rName', sortable:true},
                {header :'坐标',width: 80, dataIndex:'coordinate', hidden:true },
                {header :'地址',width: 100, dataIndex:'DZ', hidden:false ,sortable:true}
           ];

var Mas120List = Ext.create('Ext.grid.Panel',{
	//height: 240,
	anchor: '100% 35%',
	id: 'Mas120Grid',
	enableDragDrop: true,
	collapsible: true,
	title:'医院列表',
	viewConfig:{
		forceFit : true,
		stripeRows : true,
		piugins: [
			         Ext.create('Ext.grid.plugin.DragDrop',{
			        	dragGroup: 'Mas120Grid',
			        	dropGroup: 'grid2'
			       })
		]
	},
	store : Mas120Store, 
	columns :Mas120Col
});

Mas120List.addListener('itemclick',Mas120ListClick); 

function Mas120ListClick(){
	
	  hosGry.clear();
	  var record = Mas120List.getSelectionModel().getSelection();	
	  var arr = record[0].get('coordinate').split(',');
	  var x = arr[0];
	  var y = arr[1];
	  
	  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/end.png', 30, 30);
	  var pt = new esri.geometry.Point(x,y,map.spatialReference);
	  var graphic = new esri.Graphic(pt,symbol,null,null);
	  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('rName'),"hosAdd": record[0].get('DZ')});
      
	  hosGry.add(graphic);		  
      map.setLevel(10);
      map.centerAt(pt); 
	  
	  hosX = x;
	  hosY = y;
	  
	  hosValue = record[0].get('rName');
	  hosAdd = record[0].get('DZ');
	  hosWin.hide();
}

function location120_Result(results){
	myMask.hide();
	if(results.features.length>50)
	{
		results.features.length = 50;
	}
	else
	{
		if(results.features.length ===0)
		{
			Ext.Msg.alert("提示","查询结果为空！");
		}
	}
	for(var i=0;i<results.features.length;i++) {
	    var x = results.features[i].geometry.x;
	    var y = results.features[i].geometry.y;
	    var record = {coordinate:x+','+y, rName:results.features[i].attributes['rName'],DZ:results.features[i].attributes['DZ']};
		Mas120Store.add(record);
	}
	Mas120List.reconfigure(Mas120Store);
}

/**
 * 医院查询
 */

function hosSearch(name){
	myMask = new Ext.LoadMask(Ext.getBody(),{
		msg : '正在加载中，请稍候!',
		msgCls: 'z-index:100000;'
	});
	myMask.show();
	Mas120Store.removeAll();
	
	var queryTask = new esri.tasks.QueryTask("http://10.34.36.41/ArcGIS/rest/services/mas120/MapServer/1");
	var query = new esri.tasks.Query();
	query.where = "rName Like '%"+name+"%'";
	query.outSpatialReference = {wkid:4326}; 
	query.returnGeometry = true;
	query.outFields = ["rName","DZ"];
	queryTask.execute(query,location120_Result);
}

//--------------------------------------------------地名地址查询---------------------------------------------
Ext.define("MasPoi",{
	extend : 'Ext.data.Model',
	fields: ['名称','FID','所属区县','地址','coordinate']
});
			
var MasPoiProxy; 

var MasPoiStore = Ext.create('Ext.data.Store',{
	model: 'MasPoi'
});

var MasPoiCol = [Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
                {header :'地名',width: 140, dataIndex:'名称', sortable:true},
                {header :'地址',width: 180, dataIndex:'地址', hidden:false ,sortable:true},
                {header :'坐标',width: 80, dataIndex:'coordinate', hidden:true },
                {header :'所属区县',width: 120, dataIndex:'所属区县',hidden:true, sortable:true}
           ];

var MasPoiList = Ext.create('Ext.grid.Panel',{
	//height: 240,
	collapsible: true,
	anchor: '100% 35%',
	title:'地名地址',
	store : MasPoiStore, 
	columns :MasPoiCol
});

MasPoiList.addListener('itemclick',MasPoiListClick); 

function MasPoiListClick(){
	  pointGry.clear();
  	
	  var record = MasPoiList.getSelectionModel().getSelection();	
	  var arr = record[0].get('coordinate').split(',');
	  var x = arr[0];
	  var y = arr[1];
	  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/pointIndex.png', 30, 30);
	  
	  var pt = new esri.geometry.Point(x,y,map.spatialReference);
	  var graphic = new esri.Graphic(pt,symbol,null,null);
      pointGry.add(graphic);
			  
      map.setLevel(10);
      map.centerAt(pt);
	  bufferX = x;
	  bufferY = y;
	  
	  bufferValue = record[0].get('名称');
	  bufferAdd = record[0].get('地址');
	  bufferArea = record[0].get('所属区县');
	  pointWin.hide();
}

function locationResult(results){
	myMask.hide();
	if(results.features.length>50)
	{
		results.features.length = 50;
	}
	else
	{
		if(results.features.length ===0)
		{
			Ext.Msg.alert("提示","查询结果为空！");
		}
	}
	for(var i=0;i<results.features.length;i++) {
	    var x = results.features[i].geometry.x;
	    var y = results.features[i].geometry.y;
	    var record = {FID:i,coordinate:x+','+y, '名称':results.features[i].attributes["name"], '所属区县':results.features[i].attributes["pArea"],'地址':results.features[i].attributes["adress"]};
		MasPoiStore.add(record);
	}
	MasPoiList.reconfigure(MasPoiStore);
}


/**
 * 地名地址查询
 */

function locationSearch(name){
	myMask = new Ext.LoadMask(Ext.getBody(),{
		msg : '正在加载中，请稍候!',
		msgCls: 'z-index:100000;'
	});
	myMask.show();
	MasPoiStore.removeAll();
	var queryTask = new esri.tasks.QueryTask("http://10.34.36.41/ArcGIS/rest/services/84-MasPOI/MapServer/0");
	var query = new esri.tasks.Query();
	query.where = "name Like '%"+name+"%'";
	query.outSpatialReference = {wkid:4326}; 
	query.returnGeometry = true;
	query.outFields = ["name","pArea","adress"];
	queryTask.execute(query, locationResult);
}
//----------------------------------------------小区栋号查询---------------------------------------------
Ext.define("Mas120Temp",{
	extend : 'Ext.data.Model',
	fields: ['名称','所属区县','地址']
});

function locationLou_Result(results){
	MasPoiStore.removeAll();
	myMask.hide();
	if(results.features.length>50)
	{
		results.features.length = 50;
	}
	else
	{
		if(results.features.length ===0)
		{
			Ext.Msg.alert("提示","查询结果为空！");
		}
	}
	for(var i=0;i<results.features.length;i++) {
	    var x = results.features[i].geometry.x;
	    var y = results.features[i].geometry.y;
	    var record = {FID:i,coordinate:x+','+y, '名称':results.features[i].attributes["UNAME"], '所属区县':results.features[i].attributes["DISTRICT"],'地址':results.features[i].attributes["DEP_NAME"]};
	    MasPoiStore.add(record);
	}
	MasPoiList.reconfigure(MasPoiStore);
}

function locationNumSearch(name){
	myMask = new Ext.LoadMask(Ext.getBody(),{
		msg : '正在加载中，请稍候!',
		msgCls: 'z-index:100000;'
	});
	myMask.show();
	MasPoiStore.removeAll();
	var queryTask = new esri.tasks.QueryTask("http://10.34.36.41/ArcGIS/rest/services/mas120/MapServer/2");
	var query = new esri.tasks.Query();
	query.where = "UNAME Like '%"+name+"%'";
	query.outSpatialReference = {wkid:4326}; 
	query.returnGeometry = true;
	query.outFields = ["UNAME","DISTRICT","DEP_NAME"];
	queryTask.execute(query,locationLou_Result);
}

//-----------------------------------------------缓冲区查询----------------------------------------------------
function locationSeq_Result(results){
/*	var distParams = new esri.tasks.DistanceParameters();
	distParams.distanceUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
        var geometryService2 = new esri.tasks.GeometryService("http://ahcity.ahmap.gov.cn/ArcGIS/rest/services/Geometry/GeometryServer");
	distParams.geometry1 = new esri.geometry.Point([580000.501, 3464444.2464],new esri.SpatialReference({wkid:2384}));
	distParams.geometry2 = new esri.geometry.Point([678669.873, 3549504.2312],new esri.SpatialReference({wkid:2384}));
	distParams.geodesic = true;
	geometryService2.distance(distParams, function(distance) {
  		alert(distance);
	});
*/


	buffer120Store.removeAll();
	hosGry.clear();
    var resultFeatures = results.features;
    var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
    bufferrName = new Array();
    bufferDZ = new Array();
    bufferLen = new  Array();
    buffercoor = new Array();
    bufferSize = resultFeatures.length;
    bufferIndex= 0;
    
    for (var i=0, il=resultFeatures.length; i<il; i++) {
      var graphic = resultFeatures[i];
	  var x = resultFeatures[i].geometry.x;
	  var y = resultFeatures[i].geometry.y;
	 // alert(x);
	 // alert(y);
      //graphic.setSymbol(symbol);
	  //graphic.setAttributes({"hosX":x,"hosY":y,"hosValue":resultFeatures[i].attributes['rName'],"hosAdd":resultFeatures[i].attributes['DZ']});
      //hosGry.add(graphic);

	  var point1 = new esri.geometry.Point([x, y],new esri.SpatialReference({wkid:4326}));
	  var point2 = new esri.geometry.Point([bufferX, bufferY],new esri.SpatialReference({wkid:4326}));
	  
	  var distParams = new esri.tasks.DistanceParameters();
	  distParams.distanceUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
	  distParams.geometry1 = resultFeatures[i].geometry;//inputPoints[inputPoints.length - 2];
	  distParams.geometry2 = point2;// inputPoints[inputPoints.length - 1];
	  distParams.geodesic = true;
	  buffercoor.push(x+','+y);
	  bufferrName.push(resultFeatures[i].attributes['rName']);
	  bufferDZ.push(resultFeatures[i].attributes['DZ']);
 
      graphic.setSymbol(symbol);
	  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue":resultFeatures[i].attributes['rName'],"hosAdd":resultFeatures[i].attributes['DZ']});
      hosGry.add(graphic);
      //alert("eee");

        var polyline = new esri.geometry.Polyline(new esri.SpatialReference({wkid:4326}));
         polyline.addPath([resultFeatures[i].geometry, point2]);
         var lengthParams = new esri.tasks.LengthsParameters();
         lengthParams.polylines = [polyline];
         lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
         lengthParams.geodesic = true; 
         geometryService.lengths(lengthParams,function(distance) {
  		//alert(distance.lengths[0]);
			  bufferLen.push(returnFloat(distance.lengths[0]/1000));
				  bufferIndex++;
				  if(bufferIndex ===bufferSize)
				  {
					  for(var j=0;j<bufferLen.length;j++)
					  {
						  var record = {coordinate:buffercoor[j], rName:bufferrName[j],DZ:bufferDZ[j],length:bufferLen[j]};
						  buffer120Store.add(record);
					  }
					buffer120Store.sort('length', 'ASC');
					bufferGrid.reconfigure(buffer120Store);
					bufferWin.show();
				  }
	});

         /* geometryService = new esri.tasks.GeometryService("http://ahcity.ahmap.gov.cn/ArcGIS/rest/services/Geometry/GeometryServer");
	  geometryService.distance(distParams, 
			  function(distance) 
			  {  
 
		  		 //alert(distance);
				 //alert(resultFeatures[i].attributes['rName']);
				  //alert(resultFeatures[i].attributes['DZ']);
				  bufferLen.push(returnFloat(distance));
				  bufferIndex++;
				  if(bufferIndex ===bufferSize)
				  {
					  for(var j=0;j<bufferLen.length;j++)
					  {
						  var record = {coordinate:buffercoor[j], rName:bufferrName[j],DZ:bufferDZ[j],length:bufferLen[j]};
						  buffer120Store.add(record);
					  }
					buffer120Store.sort('length', 'ASC');
					bufferGrid.reconfigure(buffer120Store);
					bufferWin.show();
				  }
			  });*/
	}

}
function locationSqualSearch(){
		myMask = new Ext.LoadMask(Ext.getBody(),{
			msg : '正在加载中，请稍候!',
			msgCls: 'z-index:100000;'
		});
		glayer.clear();
        var params = new esri.tasks.BufferParameters();
        params.geometries  = [new esri.geometry.Point([bufferX,bufferY],new esri.SpatialReference({wkid:4326}))];//[ evt.mapPoint ];
        // Buffer in linear units such as meters, km, miles etc.
        params.distances = [2];
        params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
        params.bufferSpatialReference = new esri.SpatialReference({wkid: 4326});
        params.outSpatialReference = map.spatialReference;
        geometryService.buffer(params);
    	myMask.show();
}