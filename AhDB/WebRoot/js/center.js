  /**
   * 返回中央面板
   */
	var carList;
	var carStore;

  function getCenterPanel()
  {  	 
	  Ext.define("120car",{
			extend : 'Ext.data.Model',
			fields: ['rName','DZ','coordinate','length']
		});
			
	//服务新增改查工具栏
	var serverBar =  [{
		iconCls: 'user-add',
		text : '新增',
		handler: function () {
			addHosWin.show();
        }
	},{
		
		xtype : 'tbseparator'
	},{
		iconCls: 'user-delete',
		text : '删除',
		handler: function () {
		var record = owsGrid.getSelectionModel().getSelection();
			Ext.MessageBox.confirm('警告','确认删除该服务？',callBack);
			function callBack(id){
				if(id=='yes')
				{
					if(record.length!=0)
					{
						//alert(record[0].get('serviceId'));
						Ext.Ajax.request({
				         url: '../ows/deleteService.html',
				         method:'get',
				         params:{layerName:record[0].get('serviceName')},
				         success: function(res, opts){
				        	 Ext.MessageBox.alert('恭喜','删除成功！');
				        	 owsStore.store.load();//remove(record);
				         },
				         failure: function(res, opts){
				        	 Ext.MessageBox.alert("删除失败","请查看网络连接是否正常！");
				         },
				         scope:this
				        });
					}
					else
					{
						Ext.MessageBox.alert('提示','请选择一条待删除的服务记录！');
					}
				}
			}
        }
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'user-update',
		text : '修改',
		handler:function(){
			addRoute_win.setTitle("修改路网服务");
			routeForm.getForm().reset();
			summitIndex=1;
			//var record = {name:Ext.getCmp("wfs_Name").getValue(),url:Ext.getCmp("wfs_shpPath").getValue(),describe:Ext.getCmp("wfs_description").getValue(),user:Ext.getCmp("wfs_userName").getValue(),isOn:wfscombox.getValue()};
			var record = owsGrid.getSelectionModel().getSelection();
			Ext.getCmp("route_Name").setValue(record[0].get('serviceName'));
			Ext.getCmp("route_Name").disable();
			Ext.getCmp("route_tbName").setValue(record[0].get('tableName'));
			//aleret(record[0].get('describle'));
			Ext.getCmp("route_description").setValue(record[0].get('describle'));
			Ext.getCmp("route_userName").setValue(record[0].get('userName'));
			Ext.getCmp("route_userName").disable();
			//Ext.getCmp("isOn").setValue(record[0].get('isOn'));
			if(record[0].get('isOn')=="开启")
			{
				routecombox.setValue(true);
			}
			else
			{
				routecombox.setValue(false);
			}
			addRoute_win.show();
	}
	},{
		
		xtype : 'tbseparator'
	}];
	
	  carStore = Ext.create('Ext.data.Store',{
			model: '120car',
			autoLoad: true,
			proxy: {
				url: './resources/test.json',
				type: 'ajax',
				reader:{
					//root:'users',
					type:'json'
				},
			sorters: [ 
				{ 
					property : 'length', 
					direction: 'DESC' 
				}]
		}
				
		});

		var carCol = [
		              	 Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
		                {header :'地址',width: 200, dataIndex:'rName' },
		                {header :'名称',width: 200, dataIndex:'DZ', hidden:false  },
		                {header :'最短距离',renderer:change,width: 120, dataIndex:'length' },
		                {header :'坐标',width: 80, dataIndex:'coordinate', hidden:true }
		           ];

		carList = Ext.create('Ext.grid.Panel',{
			height: 200,
			animate : true,
			tbar : serverBar,
			id: 'carListGrid',
			enableDragDrop: true,
			viewConfig:{
				forceFit : true,
				stripeRows : true,
				piugins: [
					         Ext.create('Ext.grid.plugin.DragDrop',{
					        	dragGroup: 'carListGrid',
					        	dropGroup: 'grid2'
					       })
				]
			},
			store : carStore, 
			columns :carCol
		});
		
		
		//var saveList 
	   southPanel= new Ext.Panel({
			region : "south",
			//hidden : true,
			//title:'上海医院信息管理',
			//collapsible: true,
			id:'saveList',
			margins : '0 2 0 0',
            //split: true,
            height: 320,
            //title : '列表面板',
            layout: 'fit',
            items: [getHosmanage()]
		});
		
		carList.addListener('itemclick',carListClick);

		 mainCenter = new Ext.Panel({
			region : "center",
			tbar: map_toolbar,
			id:'center',
			margins : '0 2 0 0',
            split: true,
            layout: 'fit', 
            html:  "<div id='myFrame'   style='width:100%;height:100%; position:relative; top: 0px; left: 0px; bottom:0px; right:0px; '>" +
            		"<div id='viewport2' style='height:100%;position:relative; display:block;top:0px;width:100%;z-index:100;'></div>" +
    		//"<div id='measureDivParent' style='z-index:100;width:100px; height:25px; position:absolute; right:0px; bottom:0px; display:block; border:outset 1px red;'>" +
    		"<div id='measure_resultdiv' style='color:red; padding:2,2,2,2;z-index:1000;width:120px; height:29px; position:absolute; right:0px; bottom:0px; display:block; border:outset 0px blue;'></div>" +
    		"</div></div>"+"</div><iframe onload='turnHeight();' id='globeFrame' src='newmap3d.html' name='globeFrame'"+
		 "style='height: 100%; visibility:hidden; width: 100%; position: absolute; z-index:0; bottom:0px; top: 0px; border-top-color:Red'"+
         "marginwidth='0' marginheight='0'  frameborder='0' scrolling='no' ></iframe>"
		});
  
		var center = new Ext.Panel({
			region : "center",
	        layout: 'border',
	        items:[mainCenter,southPanel]//saveList]
		});
			
		return center;//mainCenter;
  }	
  function change(val) {
      if (val > 10) {
          return '<span style="color:green;">' + val + ' KM</span>';
      } else if (val < 10) {
          return '<span style="color:red;">' + val + ' KM</span>';
      }
      return val;
  }
  
  function carListClick(){
	  
	  //markers.clearMarkers();
	  hosWin.hide();
  	  //vectorlayer.disposeFeatures(); 
	  var record = carList.getSelectionModel().getSelection();	
	  var arr = record[0].get('coordinate').split(',');
	  var x = arr[0];
	  var y = arr[1];
	  var point = new esri.geometry.Point([x, y], new  esri.SpatialReference({ wkid: 4326 }));//new NLatLng(x,y);  

	  hosX = x;
	  hosY = y;
	  
	  hosValue = record[0].get('rName');
	  hosAdd = record[0].get('DZ');
	  
	  


	  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/end.png', 30, 30);
	  var pt = new esri.geometry.Point(x,y,map.spatialReference);
	  var graphic = new esri.Graphic(pt,symbol,null,null);
	  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('rName'),"hosAdd": record[0].get('DZ')});
      
	  hosGry.add(graphic);		  
        map.setLevel(7);
        map.centerAt(pt); 
	  
	  hosX = x;
	  hosY = y;
	  
	 // hosValue = record[0].get('rName');
	 // hosAdd = record[0].get('DZ');
	  hosWin.hide();

/*
	  map.setCenter(point,6, false, false);
	  
	  var imageurl = 'resources/images/hospitals.png';   
	  var size = new NSize(30,30);   
	  var offset = new NPixel(-(size.w/2), -size.h);   
	  var icon = new NIcon(imageurl,size,offset);   
	  icon.id="pointTest";      
	  var marker = new NMarker(point, icon)
	  markers.addMarker(marker);
	  //alert(record[0].get('rName'));
	  marker.events.bind("mousedown",icon,hosMarkerClick);//(point));*/
  }
