Ext.require(['*']);     

var lods = [
	  		  {"level" : 0, "resolution" : 0.001373291015625, "scale" : 577143.736442871},
	  		  {"level" : 1, "resolution" : 0.0006866455078125, "scale" : 288571.868221436},
	  		  {"level" : 2, "resolution" : 0.00034332275390625, "scale" : 144285.934110718},
	  		  {"level" : 3, "resolution" : 0.000171661376953125, "scale" : 72142.9670553589},
	  		  {"level" : 4, "resolution" : 0.0000858306884765625, "scale" : 36071.4835276794},
	  		  {"level" : 5, "resolution" : 0.0000429153442382813, "scale" : 18035.7417638397},
	  		  {"level" : 6, "resolution" : 0.0000214576721191406, "scale" : 9017.87088191986},
	  		  {"level" : 7, "resolution" : 0.0000107288360595703, "scale" : 4508.93544095993}
      	];
		
     

  var rightMenu = null;
  var righrPointX = null;
  var righrPointY = null;
  var bufferX;
  var bufferY;
  var bufferValue;
  var bufferAdd;
  var bufferArea;
  
  var hosX;
  var hosY;
  var hosValue;
  var hosAdd;
  var hosArea;
  
  var startPointX;
  var startPointY;
  var endPointX;
  var endPointY;
  
  var map,initExtent,tileLayer,tileLayer2,imageLayer,imageLayer2,dynamicMapServiceLayer,endLayer,startLayer,glayer,pointGry,hosGry,MasLou, map_toolbar2,nav_toolbar;
  var routeTask,directionFeatures, startPoint, endPoint;
  var buffer_query, bufferrName, bufferDZ, bufferLen, bufferSize, buffercoor,bufferIndex;
  var geometryService;
  
  var markers,startMarkers,endMarkers; 
  var vectorlayer;   
  var vectorlayertools;
  
  var mainCenter;
  var southPanel;
  var extent = null;
  
  var addHosWin;
  var addHosForm;
  var hosGrid;
  var hosUrl = "";
  var authorizeWin;
  var hosDetail;
  var hosDetailRec;
  var jsonStore;
 
  var mapClick;
  var showIndex = 0;
  //牛奶集团
 
Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = './resources/images/s.gif';
    dojo.require("dijit.layout.BorderContainer");
    dojo.require("dijit.layout.ContentPane");
    dojo.require("esri.tasks.route");
    dojo.require("esri.map");
    dojo.require("esri.dijit.OverviewMap");
    dojo.require("esri.toolbars.draw");
    dojo.require("esri.tasks.geometry");


  var view = new Ext.Viewport({
	  layout:"border",
	  id: 'main',
	  baseCls:"tundra",
	  items:[getTopPanel(),getCenterPanel(),getSouthPanel()]//,getEastPanel()
  }); 
  init();
 

  var mapTool_Win = Ext.create('Ext.window.Window', {
      //height: 500,
	  resizable: false,
	  maxHeight:50,
	  minHeight:50,
      draggable: true,
      items:[],
      hidden: true,
      closable: false,
      x: 65, 
      y: 85,
      closeAction: 'hide',
      width: 420,
	
			  tbar: [{
		          text: '测量工具',
		          //id: 'measure',
		          iconCls: 'measure',
		          menu: measureMenu 
		      },{
					xtype : 'tbseparator'
			  },{ 	
		  			text: '放大',
	                   //id: 'zoomIn',
	                   iconCls:'zoomIn_button',
	                   handler: function () {
				  		nav_toolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
	                   }
	               },{
	             	  xtype : 'tbseparator'
	         	  },{
	                   text: '缩小',
	                   //id: 'zoomOut',
	                   iconCls:'zoomOut_button',
	                   handler: function () {
	         		  	nav_toolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
	                   }
	               },{
	             	  xtype : 'tbseparator'
	         	  },{
	                   text: '全屏',
	                   //id: 'fullScreen',
	                   iconCls:'fullScreen_btn',
	                   handler: function () {
	         				//map.zoomToMaxExtent();
	         		  		map.setExtent(initExtent);
	                   }
	               },{
						xtype : 'tbseparator'
	 			  },{
	                   text: '移动',
	                   //id: 'pan',
	                   iconCls:'pan_button',
	                   handler: function () {
	 				  		map_toolbar2.deactivate();
	 				  		nav_toolbar.activate(esri.toolbars.Navigation.PAN);
	                   }
	               },{
	             	  xtype : 'tbseparator'
	         	  },{
	                   text: '清除',
	                   //id: 'clear',
	                   iconCls:'brush_button',
	                   handler: function () {
	         		  		map.graphics.clear();
	         		  		hosGry.clear();
	         		  		pointGry.clear();
	         		  		endLayer.clear();
	         		  		startLayer.clear();
	         		  		glayer.clear();
	         		  		map_toolbar2.deactivate();//(esri.toolbars.Draw.POLYLINE);
	         		  		nav_toolbar.activate(esri.toolbars.Navigation.PAN);
	                   }
	               }]
		});
  
//  Ext.define('hosModel', {
//	     extend: 'Ext.data.Model',
//	     fields: [
//	  	        {name:'name'},
//		        {name:'address'},
//		        {name:'lever'},  
//		        {name:'docNum'},
//		        {name:'nursNum'},
//		        {name:'phoneNum'},
//		        {name:'corporation'},
//		        {name:'coors_x'},
//		        {name:'coors_y'} 
//	     ]
//	 });

//创建用户数据模型
	 Ext.define('leasModel', {
	     extend: 'Ext.data.Model',
	     fields: [{name:'id'},{name:'lanBlock'},{name:'codNum'},{name:'address'},{name:'roomSize'},{name:'nonOcc'},{name:'landSize'},{name:'leaholder'},{name:'propertys'}
	    ,{name:'timLimit'},{name:'startDate'}, {name:'endDate'},{name:'monRent'},{name:'yerRent'},{name:'payType'},{name:'handsel'},{name:'penalty'},{name:'tel'},{name:'linker'},
	    {name:'incExplain'},{name:'remark'},{name:'nextPayDate'},{name:'idCard'},{name:'busLicense'},{name:'orgCode'},{name:'rentStatus'},{name:'outDays'},{name:'holdType'},
	   {name: 'coors_x'},{name:'coors_y'}]
	 });
	 
	var leasStore = Ext.create('Ext.data.Store',{
		autoLoad : true,
		model: 'leasModel',
		//设置分页大小  
	    pageSize:15,  
	    proxy: {  
	        type: 'ajax',  
	        url: 'leas/getAllLeasC.html',
	        reader: {  
	            //数据格式为json  
	            type: 'json',  
	            root: 'leas',  
	            //获取数据总数  
	            totalProperty: 'totalCount'  
	        }  
	    },
	    autoLoad:true  
	}); 
	 
//		var hosStore = Ext.create('Ext.data.Store',{
//		model: 'hosModel',
//		//设置分页大小  
//	    pageSize:15,  
//	    proxy: {  
//	        type: 'ajax',  
//	        url: 'hos/getAllHos.html',
//	        reader: {  
//	            //数据格式为json  
//	            type: 'json',  
//	            root: 'hos',  
//	            //获取数据总数  
//	            totalProperty: 'totalCount'  
//	        }  
//	    },  
//	    autoLoad:true  
//	});
	
//		var hosStore2 = Ext.create('Ext.data.Store',{
//			model: 'hosModel',
//		    proxy: {  
//		        type: 'ajax',  
//		        url: 'hos/getAllHos2.html' 
//		    }  
//		});
	var pagingToolbar = new Ext.PagingToolbar
	({
	      emptyMsg:"没有数据",
	      displayInfo:true,
	      displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
//	      store:hosStore
	      store:leasStore
	      //pageSize:10
	 });
//	var hosCol = [
//	      Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
//	     {header :'医院名称',width: 260, dataIndex:'name', sortable:true}
//	    
//	];
	var leaCol = [
	      Ext.create('Ext.grid.RowNumberer',{text: '行号',width:35}),
	     {header :'地块',dataIndex:'lanBlock', sortable:true},
	     {header :'租赁地址',dataIndex:'address', sortable:true}
	];
	
	var hosBar =  [{
		xtype:'textfield',id: 'find_HosValue'
	},{
		iconCls: 'user-find',text : '查询',
		handler: function (){
//			if(Ext.getCmp('find_HosValue').getValue()!='')
//			{
//				//alert(Ext.getCmp('find_HosValue').getValue());
//				hosStore.clearFilter();
//				hosStore.load();
//				hosStore.filter('name', Ext.getCmp('find_HosValue').getValue());
//			}
//			else
//			{
//				//alert('dd');
//				hosStore.clearFilter();
//				hosStore.load();
//			}
			leasStore.setProxy({
				type: 'ajax',  
//		        url: 'hos/getHosByName.html?name='+encodeURI(Ext.getCmp('find_HosValue').getValue()),
				url:'',
		        reader: {  
		            //数据格式为json  
		            type: 'json',  
		            root: 'leas',  
		            //获取数据总数  
		            totalProperty: 'totalCount'  
		        }  
	        });
			leasStore.load();
		}

	}
	/*,{
		iconCls: 'area_buffer',text : '显示全部',
		handler: function (){
			
				//hosStore2.clearFilter();
			hosStore2.setProxy({
				type: 'ajax',  
		        url: 'hos/getAllHos2.html?name='+encodeURI(Ext.getCmp('find_HosValue').getValue())
		        
	        });
				hosStore2.load();
		}

	}*/
	];
	
	hosStore2.on('load',function(store,records,success){
		hosGry.clear();
//		  var record = hospitalList.getSelectionModel().getSelection();	
//		  
//		  var x = record[0].get('coors_x');
//		  var y = record[0].get('coors_y');
//		  var point = new esri.geometry.Point([x, y], new  esri.SpatialReference({ wkid: 4326 })); 
//		  hosDetailRec = record;
//		  hosX = x;
//		  hosY = y;
 
		  for(var i=0;i<records.length;i++)
		  {
			  //hosValue = records[i].get('name');
			    if(shqStore.getAt(0).get('name')!='1')
				{
			    	records[i].set('name',"");
				}
					 
				if(shqStore.getAt(0).get('address')!='1')
				{
					records[i].set('address',"");
				}
				 		
				if(shqStore.getAt(0).get('lever')!='1')
				{
					records[i].set('lever',"");
				}
				 
				if(shqStore.getAt(0).get('docNum')!='1')
				{
					records[i].set('docNum',"");
				}
				 
				if(shqStore.getAt(0).get('phoneNum')!='1')
				{
					records[i].set('phoneNum',"");
				}
				if(shqStore.getAt(0).get('nursNum')!='1')
				{
					records[i].set('nursNum',"");
				}
				if(shqStore.getAt(0).get('corporation')!='1')
				{
					records[i].set('corporation',"");
				}
				
			 // hosDetailRec = records;
			  
			  var x = records[i].get('coors_x');
			  var y = records[i].get('coors_y');
			  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
			  var pt = new esri.geometry.Point(x,y,map.spatialReference);
			  var graphic = new esri.Graphic(pt,symbol,null,null);
			  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": records[i].get('name'),"hosAdd": records[i].get('address'),"corporation":records[i].get('corporation'),"nursNum":records[i].get('nursNum'),"phoneNum":records[i].get('phoneNum'),"docNum":records[i].get('docNum'),"lever":records[i].get('lever')});
			  hosGry.add(graphic);	
		  }
//		  hosValue = records[0].get('name');
//
//		  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
//		  var pt = new esri.geometry.Point(x,y,map.spatialReference);
//		  var graphic = new esri.Graphic(pt,symbol,null,null);
//		  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('name'),"hosAdd": record[0].get('address')});
//	    
//		  hosGry.add(graphic);		  
//	      map.setLevel(5);
//	      map.centerAt(pt); 
//		  
//		  hosX = x;
//		  hosY = y;
		
	});
	
//	hosStore.on('load',function(store,records,success){
//		hosGry.clear();
////		  var record = hospitalList.getSelectionModel().getSelection();	
////		  
////		  var x = record[0].get('coors_x');
////		  var y = record[0].get('coors_y');
////		  var point = new esri.geometry.Point([x, y], new  esri.SpatialReference({ wkid: 4326 })); 
////		  hosDetailRec = record;
////		  hosX = x;
////		  hosY = y;
// 
//		  for(var i=0;i<records.length;i++)
//		  {
//			  //hosValue = records[i].get('name');
//			    if(shqStore.getAt(0).get('name')!='1')
//				{
//			    	records[i].set('name',"");
//				}
//					 
//				if(shqStore.getAt(0).get('address')!='1')
//				{
//					records[i].set('address',"");
//				}
//				 		
//				if(shqStore.getAt(0).get('lever')!='1')
//				{
//					records[i].set('lever',"");
//				}
//				 
//				if(shqStore.getAt(0).get('docNum')!='1')
//				{
//					records[i].set('docNum',"");
//				}
//				 
//				if(shqStore.getAt(0).get('phoneNum')!='1')
//				{
//					records[i].set('phoneNum',"");
//				}
//				if(shqStore.getAt(0).get('nursNum')!='1')
//				{
//					records[i].set('nursNum',"");
//				}
//				if(shqStore.getAt(0).get('corporation')!='1')
//				{
//					records[i].set('corporation',"");
//				}
//				
//			 // hosDetailRec = records;
//			  
//			  var x = records[i].get('coors_x');
//			  var y = records[i].get('coors_y');
//			  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
//			  var pt = new esri.geometry.Point(x,y,map.spatialReference);
//			  var graphic = new esri.Graphic(pt,symbol,null,null);
//			  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": records[i].get('name'),"hosAdd": records[i].get('address'),"corporation":records[i].get('corporation'),"nursNum":records[i].get('nursNum'),"phoneNum":records[i].get('phoneNum'),"docNum":records[i].get('docNum'),"lever":records[i].get('lever')});
//			  hosGry.add(graphic);	
//		  }
////		  hosValue = records[0].get('name');
////
////		  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
////		  var pt = new esri.geometry.Point(x,y,map.spatialReference);
////		  var graphic = new esri.Graphic(pt,symbol,null,null);
////		  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('name'),"hosAdd": record[0].get('address')});
////	    
////		  hosGry.add(graphic);		  
////	      map.setLevel(5);
////	      map.centerAt(pt); 
////		  
////		  hosX = x;
////		  hosY = y;
//		
//	});
//	hospitalList = Ext.create('Ext.grid.Panel',{
//		tbar : hosBar,
//		bbar:pagingToolbar,
//		width : '100%',
//		height: '100%',
//		frame : true,
//		viewConfig:{
//			forceFit : true,
//			stripeRows : true
//		},
//		store : hosStore, 
//		columns :hosCol
//	});
	
var leaContractList=Ext.create('Ext.grid.Panel',{
		tbar : hosBar,
		bbar:pagingToolbar,
		width : '100%',
		height: '100%',
		frame : true,
		viewConfig:{
			forceFit : true,
			stripeRows : true
		},
		store : leasStore, 
		columns :leaCol
	});
	
 var shqStore = new Ext.data.Store({
	    autoSync : true,
	    proxy: {
	        type: 'ajax',
	        url: 'Config/getWmtsConfig.html' 
	    },
	    fields: ['name','address','lever','docNum','nursNum','phoneNum','corporation','coors_x','coors_y']
	});
 shqStore.load();
 
  var leaContractListWin = Ext.create('Ext.window.Window', {
	  //resizable: false,
	  title:'租赁信息列表',
      draggable: true,
      collapsible: true,   	  
      layout:'fit',
      items:[leaContractList],
      hidden: true,
      closable: false,
      x: document.body.clientWidth -420- 65, 
      y: 90,
      align:'right',
      closeAction: 'hide',
      width: 420,
      height: 210
	}).show();
  
//  leaContractList.addListener('itemclick',function(){
//	  hosGry.clear();
//	  var record = leaContractList.getSelectionModel().getSelection();	
//	  
//	  var x = record[0].get('coors_x');
//	  var y = record[0].get('coors_y');
//	  var point = new esri.geometry.Point([x, y], new  esri.SpatialReference({ wkid: 4326 })); 
//     
//	  //alert(shqStore.getAt(0).get('name'));
//	  
//	    if(shqStore.getAt(0).get('name')!='1')
//		{
//	    	record[0].set('name',"该字段不可见");
//		}
//			 
//		if(shqStore.getAt(0).get('address')!='1')
//		{
//			record[0].set('address',"");
//		}
//		 		
//		if(shqStore.getAt(0).get('lever')!='1')
//		{
//			record[0].set('lever',"");
//		}
//		 
//		if(shqStore.getAt(0).get('docNum')!='1')
//		{
//			record[0].set('docNum',"");
//		}
//		 
//		if(shqStore.getAt(0).get('phoneNum')!='1')
//		{
//			record[0].set('phoneNum',"");
//		}
//		if(shqStore.getAt(0).get('nursNum')!='1')
//		{
//			record[0].set('nursNum',"");
//		}
//		if(shqStore.getAt(0).get('corporation')!='1')
//		{
//			record[0].set('corporation',"");
//		}
//		 
//		if(shqStore.getAt(0).get('coors_x')!='1')
//		{
//			//hosDetailRec.set('coors_x',null);
//		}
//		 
//		if(shqStore.getAt(0).get('coors_y')!='1')
//		{
//			//hosDetailRec.set('coors_y',null);
//		}
//	  hosDetailRec = record;
//	  hosX = x;
//	  hosY = y;
//	  
//	  hosValue = record[0].get('name');
//
//	  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/end.png', 30, 30);
//	  var pt = new esri.geometry.Point(x,y,map.spatialReference);
//	  var graphic = new esri.Graphic(pt,symbol,null,null);
//	  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('name'),"hosAdd": record[0].get('address')});
//    
//	  hosGry.add(graphic);		  
//      map.setLevel(5);
//      map.centerAt(pt); 
//	  
////	  hosX = x;
////	  hosY = y;
//	 // hosWin.hide();
//  });
//});  

//  var hospitalListWin = Ext.create('Ext.window.Window', {
//	  //resizable: false,
//	  title:'徐汇区医疗机构列表2',
//      draggable: true,
//      collapsible: true,   	  
//      layout:'fit',
//      items:[hospitalList],
//      hidden: true,
//      closable: false,
//      x: document.body.clientWidth -420- 65, 
//      y: 90,
//      align:'right',
//      closeAction: 'hide',
//      width: 420,
//      height: 210
//	}).show();
//  
//  hospitalList.addListener('itemclick',function(){
//	  hosGry.clear();
//	  var record = hospitalList.getSelectionModel().getSelection();	
//	  
//	  var x = record[0].get('coors_x');
//	  var y = record[0].get('coors_y');
//	  var point = new esri.geometry.Point([x, y], new  esri.SpatialReference({ wkid: 4326 })); 
//     
//	  //alert(shqStore.getAt(0).get('name'));
//	  
//	    if(shqStore.getAt(0).get('name')!='1')
//		{
//	    	record[0].set('name',"该字段不可见");
//		}
//			 
//		if(shqStore.getAt(0).get('address')!='1')
//		{
//			record[0].set('address',"");
//		}
//		 		
//		if(shqStore.getAt(0).get('lever')!='1')
//		{
//			record[0].set('lever',"");
//		}
//		 
//		if(shqStore.getAt(0).get('docNum')!='1')
//		{
//			record[0].set('docNum',"");
//		}
//		 
//		if(shqStore.getAt(0).get('phoneNum')!='1')
//		{
//			record[0].set('phoneNum',"");
//		}
//		if(shqStore.getAt(0).get('nursNum')!='1')
//		{
//			record[0].set('nursNum',"");
//		}
//		if(shqStore.getAt(0).get('corporation')!='1')
//		{
//			record[0].set('corporation',"");
//		}
//		 
//		if(shqStore.getAt(0).get('coors_x')!='1')
//		{
//			//hosDetailRec.set('coors_x',null);
//		}
//		 
//		if(shqStore.getAt(0).get('coors_y')!='1')
//		{
//			//hosDetailRec.set('coors_y',null);
//		}
//	  hosDetailRec = record;
//	  hosX = x;
//	  hosY = y;
//	  
//	  hosValue = record[0].get('name');
//
//	  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
//	  var pt = new esri.geometry.Point(x,y,map.spatialReference);
//	  var graphic = new esri.Graphic(pt,symbol,null,null);
//	  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('name'),"hosAdd": record[0].get('address')});
//    
//	  hosGry.add(graphic);		  
//      map.setLevel(5);
//      map.centerAt(pt); 
//	  
////	  hosX = x;
////	  hosY = y;
//	 // hosWin.hide();
//  });
});  