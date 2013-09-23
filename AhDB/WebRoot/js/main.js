Ext.require(['*']);     


var lods = [
	  		  {"level" : 0, "resolution" : 0.001373291015625, "scale" : 577143.736442871},
	  		  {"level" : 1, "resolution" : 0.0006866455078125, "scale" : 288571.868221436},
	  		  {"level" : 2, "resolution" : 0.00034332275390625, "scale" : 144285.934110718},
	  		  {"level" : 3, "resolution" : 0.000171661376953125, "scale" : 72142.9670553589},
	  		  {"level" : 4, "resolution" : 0.0000858306884765625, "scale" : 36071.4835276794},
	  		  {"level" : 5, "resolution" : 0.0000429153442382813, "scale" : 18035.7417638397},
	  		  {"level" : 6, "resolution" : 0.0000214576721191406, "scale" : 9017.87088191986},
	  		  {"level" : 7, "resolution" : 0.0000107288360595703, "scale" : 4508.93544095993},
	  		  {"level" : 8, "resolution" : 0.00000536441802978516, "scale" : 2254.46772047997},
	  		  {"level" : 9, "resolution" : 0.00000268220901489258, "scale" : 1127.23386023998},
	  		  {"level" : 10, "resolution": 0.00000134110450744629, "scale" : 563.616930119991}
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
  
  var map,initExtent,tileLayer,tileLayer2,imageLayer,imageLayer2,dynamicMapServiceLayer,endLayer,startLayer,glayer,pointGry,hosGry,superGry,MasLou, map_toolbar2,nav_toolbar;
  var DLayer;
  var xzcfGry = null;
  var tsjbGry = null;
  var tsjbDetailRec;
  var xzcfDetailRec;
  var tsxzIndex = 0;
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
  var tsjbGrid;
  var xzcfGrid;
  var hosUrl = "";
  var authorizeForm;
  var authorizeWin;
  var hosDetail;
  var hosDetailRec;
  var superviseRec;
  var jsonStore;
 
  var mapClick;
  var showIndex = 0;
  
  //新增数据导入模块 flzhao
  var fpFileUpload;
  var winFielUpload;
//  var addLeaWin;
//  var addLeaForm;
  var leaGrid;
  var authorizeLeaForm;
  var authorizeLeaWin;
 
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

	rightMenu = new Ext.menu.Menu({
		  //ignoreParentClicks: true,
		  //plain:true,
		  items:[
//		         {
//			 iconCls:'targetPoint',
//			 text:'设为目标',
//				 handler: function () {
//					 //markers.clearMarkers();
//			  		  pointGry.clear();
//					  var coors = map.toMap(new esri.geometry.Point([righrPointX,righrPointY-137],map.spatialReference));
//					  bufferX = coors.x;
//					  bufferY = coors.y;	
//					  var point = new esri.geometry.Point(bufferX,bufferY,map.spatialReference);
//					  bufferValue = "未知";
//					  bufferAdd =  "未知";
//					  bufferArea =  "未知";
//					  
//					  //var point = coors;
//					  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/pointIndex.png', 30, 30);
//					  var graphic = new esri.Graphic(point,symbol,null,null);
//				      pointGry.add(graphic);
// 
//					  var pointTemp = map.toScreen(point);//(new OpenLayers.LonLat(bufferX,bufferY));//(point);
//					  var x = pointTemp.x-285;
//					  //var y = pointTemp.y+140;
//					  var y = pointTemp.y+80;
//					  pointWin.show(); 
//					  pointWin.items.items[0].body.update('<div><br><a>名称：</a>'+ bufferValue + '<br><br><a>地址：'+ bufferAdd +'</a></div>');	
//					  pointWin.setPosition(x,y,true);
//					  pointWin.doLayout();
//					  pointWin.show(); 
//					  //marker.events.register("mousedown",icon,markerClick); 
//	          }
//		  	},{
//			 iconCls:'startPoint',
//			 text:'设为起点',
//				 handler: function () {
//		  			startLayer.clear();
//					var coors = map.toMap(new esri.geometry.Point([righrPointX,righrPointY-137],map.spatialReference));
//					Ext.getCmp('startPoint').setValue("x:"+coors.x+",y:"+coors.y);
//					startPointX = coors.x;
//					startPointY = coors.y;	
//					var point = new esri.geometry.Point([startPointX,startPointY],map.spatialReference); 
//					
//					var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/start.png', 24, 24);
//					var graphic = new esri.Graphic(point,symbol,null,null);
//					startPoint = startLayer.add(graphic);
//					
//	          }
//		  	},{
//			 iconCls:'endPoint',
//			 text:'设为终点',
//				 handler: function () {
//		  			endLayer.clear();
//					var coors = map.toMap(new esri.geometry.Point([righrPointX,righrPointY-137],map.spatialReference));
//					Ext.getCmp('endPoint').setValue("x:"+coors.x+",y:"+coors.y);
//					endPointX = coors.x;
//					endPointY = coors.y;	
//					var point = new esri.geometry.Point([endPointX,endPointY],map.spatialReference); 
//					
//					var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/end.png', 24, 24);
//					var graphic = new esri.Graphic(point,symbol,null,null);
//					endPoint = endLayer.add(graphic);
//	          }
//		  	},
			{
				text:'查看详细',
				handler: function () {
				if(hosDetail!=null)
				{
					hosDetail.hide();
				}
				hosDetail = Ext.create('Ext.window.Window', {
					     height: 280,
					     draggable: false,
					     title:'更多信息',
					     hidden: true, 
					     closeAction: 'hide',
					     width: 260,
					     layout: 'fit',
						 items:[
								      Ext.create('Ext.form.Panel', {
								           //frame: true,
								           bodyPadding: 5,
								           fieldDefaults: {
								    	  		margin: '10,10,20,20',
									            labelAlign: 'left',
									            labelWidth: 90,
									            anchor: '100%'
									        },
											resizaable:false,
											shadow:true,
											html:'<br><a>医院名称: </a>'+hosDetailRec[0].get('name')
												+'<br><br><a>医院地址：</a>'+hosDetailRec[0].get('address')
												+'<br><br><a>医院等级：</a>'+hosDetailRec[0].get('lever')
												+'<br><br><a>医生数目：</a>'+hosDetailRec[0].get('docNum')
												+'<br><br><a>护士数目：</a>'+hosDetailRec[0].get('nursNum')
												+'<br><br><a>联系方式：</a>'+hosDetailRec[0].get('phoneNum')
												+'<br><br><a>医院法人：</a>'+hosDetailRec[0].get('corporation')
												//+'<br><br><a>医院位置：</a>经度：'+hosDetailRec[0].get('coors_x')+"--纬度："+hosDetailRec[0].get('coors_y')
								      })
								]
											
					});
				hosDetail.show();
				hosDetail.setPosition(60,150,true);
				hosDetail.doLayout();
		          }
			},
			{
				iconCls: 'help',
				text:'关于系统',
				handler: function () {
		  		  Ext.Msg.alert("系统属性","上海牛奶集团信息管理系统（ver1.0）");
	          }
			}]
	  });
	
 	Ext.getDoc().on("contextmenu",function(e){
		e.stopEvent();
	}); 
	

 
  var view = new Ext.Viewport({
	  layout:"border",
	  id: 'main',
	  baseCls:"tundra",
	  items:[getTopPanel(),getCenterPanel(),getSouthPanel(),getWestPanel()]//,getEastPanel()
  }); 
  init();
 
	mainCenter.getEl().on("contextmenu",function(e){
 
		var temp = e.getXY();
		  
		 righrPointX = temp[0];
		 righrPointY = temp[1];
		 //rightMenu.showAt(e.getXY());
		 
		 if(hosDetail!=null)
			{
				hosDetail.hide();
			}
			hosDetail = Ext.create('Ext.window.Window', {
				     height: 400,
				     draggable: false,
				     title:'更多信息',
				     hidden: true, 
				     closeAction: 'hide',
				     width: 350,
				     layout: 'fit',
					 items:[
							      Ext.create('Ext.form.Panel', {
							           //frame: true,
							           bodyPadding: 5,
							           fieldDefaults: {
							    	  		margin: '10,10,20,20',
								            labelAlign: 'left',
								            labelWidth: 90,
								            anchor: '100%'
								        },
										resizaable:false,
										shadow:true,
										html:'<br><a>地块: </a>'+hosDetailRec[0].get('lanBlock')
											+'<br><br><a>租赁地址：</a>'+hosDetailRec[0].get('address')
											+'<br><br><a>房屋(m²)：</a>'+hosDetailRec[0].get('roomSize')
											+'<br><br><a>土地(m²)：</a>'+hosDetailRec[0].get('landSize')
											+'<br><br><a>承租人：</a>'+hosDetailRec[0].get('leaholder')
											+'<br><br><a>产权：</a>'+hosDetailRec[0].get('propertys')
											+'<br><br><a>期限：</a>'+hosDetailRec[0].get('timLimit')
											+'<br><br><a>租赁起始日期：</a>'+hosDetailRec[0].get('startDate')
											+'<br><br><a>租赁结束日期：</a>'+hosDetailRec[0].get('endDate')
											+'<br><br><a>月租金：</a>'+hosDetailRec[0].get('monRent')
											+'<br><br><a>年租金：</a>'+hosDetailRec[0].get('yerRent')
											//+'<br><br><a>医院位置：</a>经度：'+hosDetailRec[0].get('coors_x')+"--纬度："+hosDetailRec[0].get('coors_y')
							      })
							]
										
				});
			hosDetail.show();
			hosDetail.setPosition(60,150,true);
			hosDetail.doLayout();
		
		 
		 var coors = map.toMap(righrPointX,righrPointY-137);
		 var mapX = coors.x;
		 var mapY = coors.y;
	 }); 
	 
	
//	 addHosForm = Ext.create('Ext.form.Panel', {
//        border: false,
//        margin: '5,5,5,5',
//        //style:'margin-left:5px;margin-top:5px',
//        fieldDefaults: {
//            labelWidth: 55
//        },
//        url: 'save-form.php',
//        defaultType: 'textfield',
//        bodyPadding: 5,
//        items: [{
//            fieldLabel: '医院名称',
//            id: 'hosName',
//            anchor:'70%'
//        },{
//            fieldLabel: '医院级别',
//            id: 'hosLever',
//            anchor:'70%'
//        },{
//            fieldLabel: '医院科目',
//            id: 'kemu',
//            anchor:'70%'
//        },{
//            fieldLabel: '医院法人',
//            id: 'hosMan',
//            anchor:'70%'
//        },{
//            fieldLabel: '医生数目',
//            id: 'docNum',
//            anchor:'70%'
//        },{
//            fieldLabel: '护士数目',
//            id: 'nursNum',
//            anchor:'70%'
//        },{
//            fieldLabel: '医院地址',
//            id: 'hosAddress',
//            anchor: '70%'
//        },{
//            fieldLabel: '联系方式',
//            id: 'phoneNum',
//            anchor: '70%'
//        },{
//            fieldLabel: '坐标位置',
//            id: 'coorsHos',
//            anchor: '70%'
//        }
//		/*,{
//            xtype: 'textarea',
//            hideLabel: true,
//            name: 'msg',
//            anchor: '100% -47'  // anchor width by percentage and height by raw adjustment
//        }*/
//		]
//    });
//
//    addHosWin = Ext.create('Ext.window.Window', {
//        title: '新增医院标注信息',
//        width: 400,
//        height:340,
//        minWidth: 300,
//        minHeight: 200,
//        layout: 'fit',
//        plain: true,
//		closeAction: 'hide',
//        items: addHosForm,
//        buttons: [{
//            text: '拾取坐标',
//			handler: function(){
//				mapClick = 1;
//			}
//        },{
//            text: '提交',
//            handler:function(){
//        		//alert(hosUrl);
//        		var hosName = Ext.getCmp('hosName').getValue();
//				var hosMan = Ext.getCmp('hosMan').value;
//				var phoneNum = Ext.getCmp('phoneNum').value;
//				var docNum = Ext.getCmp('docNum').value;
//				var nursNum = Ext.getCmp('nursNum').value;
//				var hosLever = Ext.getCmp('hosLever').value;
//				var hosAddress = Ext.getCmp('hosAddress').value;
//				var coorsHos = Ext.getCmp('coorsHos').value;
//				var coorsArray = coorsHos.split(",");
//				var coors_xArr = coorsArray[0].split(":");
//				var coors_yArr = coorsArray[1].split(":");
//				var kemu = Ext.getCmp('kemu').value;
//				var coors_x = coors_xArr[1];
//				var coors_y = coors_yArr[1];
//				
//				ch = name.split(",");
//				Ext.Ajax.request({
//			         url: hosUrl,//'hos/addHos.html',
//			         method:'POST',
//			         headers:{
//			            'Content-Type': 'application/json; charset=utf-8'
//			         },
//			         success: function(res, opts){
//			           addHosWin.hide();
//			           Ext.MessageBox.alert("提示",res.responseText);
//			           hosGrid.store.load();
//			         },
//			         failure: function(res, opts){
//			        	 addHosWin.hide();
//			        	 Ext.MessageBox.alert("新增失败","请查看网络连接是否正常！");
//			         },
//			         jsonData:{name:hosName,kemu:kemu,corporation:hosMan,phoneNum:phoneNum,docNum:docNum,nursNum:nursNum,lever:hosLever,address:hosAddress,coors_x:coors_x,coors_y:coors_y},
//			         scope:this
//		        });
//				addHosWin.hide();
//        	}
//        },{
//            text: '取消',
//			handler: function () {
//				addHosWin.hide();
//	         }
//        }]
//    });
//    
//	authorizeForm = Ext.create('Ext.form.Panel', {
//        border: false,
//        fieldDefaults: {
//            labelWidth: 55
//        }, 
//        bodyPadding: 5,
//        items: [{
//				xtype: 'checkboxgroup',
//				fieldLabel: '医疗信息',
//				cls: 'x-check-group-alt',
//				// Distribute controls across 3 even columns, filling each row
//				// from left to right before starting the next row
//				columns: 3,
//				items: [
//						{boxLabel: '医院名称', id: 'ch_hos_name',name: 'cb-horiz-1'},
//						{boxLabel: '医院地址', id: 'ch_hos_address',name: 'cb-horiz-2'},
//						{boxLabel: '联系方式', id: 'ch_hos_phonenum',name: 'cb-horiz-3'},
//						{boxLabel: '医院级别', id: 'ch_hos_lever',name: 'cb-horiz-4'},
//						{boxLabel: '医生数目', id: 'ch_hos_docnum',name: 'cb-horiz-5'},
//						{boxLabel: '护士数目', id: 'ch_hos_nursnum',name: 'cb-horiz-6'},
//						{boxLabel: '医院法人', id: 'ch_hos_man',name: 'cb-horiz-7'}
//					]
//			}
//        ,{
//				xtype: 'checkboxgroup',
//				fieldLabel: '事故信息',
//				cls: 'x-check-group-alt',
//				// Distribute controls across 3 even columns, filling each row
//				// from left to right before starting the next row
//				columns: 3,
//				items: [
//						{boxLabel: '发生时间', name: 'accident-1'},
//						{boxLabel: '发生地址', name: 'accident-2', checked: true},
//						{boxLabel: '事故种类', name: 'accident-3'},
//						{boxLabel: '处理医院', name: 'accident-4'},
//						{boxLabel: '事故级别', name: 'accident-5'}
//					]
//			},{
//				xtype: 'checkboxgroup',
//				fieldLabel: '其它信息',
//				cls: 'x-check-group-alt',
//				// Distribute controls across 3 even columns, filling each row
//				// from left to right before starting the next row
//				columns: 3,
//				items: [
//						{boxLabel: '名称', name: 'other-1'},
//						{boxLabel: '地址', name: 'other-2', checked: true},
//						{boxLabel: '类型', name: 'other-3'},
//						{boxLabel: '联系方式', name: 'other-4'},
//						{boxLabel: '基本信息', name: 'other-5'}
//					]
//			}
//			
//			]
//    });

//    authorizeWin = Ext.create('Ext.window.Window', {
//        title: '配置前台信息可见字段',
//        width: 400,
//        //height:270,
//        height:145,
//        minWidth: 400,
//       // minHeight: 240,
//        minHeight: 145,
//        layout: 'fit',
//        plain: true,
//		closeAction: 'hide',
//        items: authorizeForm,
//        buttons: [{
//            text: '提交',
//            handler: function () {
//        	
//			var hosName;
//			var hosMan;
//			var phoneNum;
//			var docNum;
//			var nursNum;
//			var hosLever;
//			var hosAddress;
//			
//    		if(Ext.getCmp('ch_hos_name').getValue()===true)
//    		{
//    			 hosName = '1';
//    		}
//    		else{
//    			 hosName = '0';
//    		}
//    		
//			if(Ext.getCmp('ch_hos_man').getValue()===true)
//			{
//				 hosMan = '1';
//			}
//			else{
//				 hosMan = '0';
//    		}
//			
//			if(Ext.getCmp('ch_hos_phonenum').getValue()===true)
//			{
//				 phoneNum = '1';
//			}
//			else{
//				 phoneNum = '0';
//    		}
//			
//			if(Ext.getCmp('ch_hos_docnum').getValue()===true)
//			{
//				 docNum = 1;
//			}
//			else{
//				 docNum = 0;
//    		}
//			
//			if(Ext.getCmp('ch_hos_nursnum').getValue()===true)
//			{
//				 nursNum = 1;
//			}
//			else{
//				nursNum = 0;
//    		}
//			
//			if(Ext.getCmp('ch_hos_lever').getValue()===true)
//			{
//				 hosLever = '1';
//			}
//			else{
//				hosLever = '0';
//    		}
//			
//			if(Ext.getCmp('ch_hos_address').getValue()===true)
//			{
//				 hosAddress = '1';
//			}
//			else{
//				 hosAddress = '0';
//    		}
//				 
//			Ext.Ajax.request({
//		         url: 'Config/setWmtsConfig.html',
//		         method:'POST',
//		         headers:{
//		            'Content-Type': 'application/json; charset=utf-8'
//		         },
//		         success: function(res, opts){
//		           //authorizeForm.form.reset();
//		           authorizeWin.hide();
//		           Ext.MessageBox.alert("提示",res.responseText); 
//		         },
//		         failure: function(res, opts){
//		        	 authorizeForm.form.reset();
//		        	 addHosWin.hide();
//		        	 Ext.MessageBox.alert("新增失败","请查看网络连接是否正常！");
//		         },
//		         jsonData:{name:hosName,corporation:hosMan,phoneNum:phoneNum,docNum:docNum,nursNum:nursNum,lever:hosLever,address:hosAddress,coors_x:0,coors_y:0},
//		         scope:this
//	        });
//	         }
//        },{
//            text: '取消',
//			handler: function () {
//        		authorizeForm.form.reset();
//				authorizeWin.hide();
//	         }
//        }]
//    });
// 
		
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
      width: 330,
      //layout: 'fit',
      
	  //dockedItems: 
		  //buttons: [ { 	
			  tbar: [
//			         {
//		          text: '测量工具',
//		          //id: 'measure',
//		          iconCls: 'measure',
//		          menu: measureMenu 
//		      },
		      
		      { 	
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
	                   text: '定位',
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
	         		  		superGry.clear();
	         		  		pointGry.clear();
	         		  		endLayer.clear();
	         		  		startLayer.clear();
	         		  		glayer.clear();
	         		  		map_toolbar2.deactivate();//(esri.toolbars.Draw.POLYLINE);
	         		  		nav_toolbar.activate(esri.toolbars.Navigation.PAN);
	                   }
	               }]
		}).show();
  	
});  

//新增数据导入
fpFileUpload=new Ext.FormPanel({
                        id:'fpFileUpload',
                        frame:true,
                        fileUpload:true,
                        //url:'Default.aspx',
                        items:[
                            {
                            	xtype: 'filefield',
					            name: 'fileName',
					            fieldLabel: '上传',
					            labelWidth: 40,
					            msgTarget: 'side',
					            allowBlank: false,
					            anchor: '100%',
					            buttonText: '选择文件'
                            }
                        ],
                        buttonAlign:'center',
                        buttons:[
                            {
                                text:'上传',
                                handler:function(){
                                   if(fpFileUpload.form.isValid()){
                                        fpFileUpload.form.submit({
                                            method:'post',
                                            url:'imp/importExcel.html',
                                            waitMsg:'文件上传中...',
                                            success: function(res,opts) {
                                            	winFielUpload.store.load();
                                            	winFielUpload.hide();
                                                Ext.Msg.alert("提示", res.responseText);
                                            },
                                            failure: function(res,opts) {
                                                Ext.Msg.alert("提示", "文件上传失败！");
                                            }
                                        });
                                    }else{
                                        Ext.Msg.alert("系统提示","请选择文件后再上传！");
                                    }
                                }
                            },
                            {
                                text:'取消',
                                handler:function(){
                                    winFielUpload.hide();
                                }
                            }
                        ]
                    });
 winFielUpload = new Ext.Window({
            id:'win',
            title:'文件上传',
            //****renderTo:'divWindow',//对于window不要使用renderTo属性，只需要调用show方法就可以显示，添加此属性会难以控制其位置
            width:450,
            height:100,
            layout:'fit',
            autoDestory:true,
            modal:true,
            closeAction:'hide',
            items:[
                fpFileUpload
            ]
 });
// 
// addLeaForm =new Ext.FormPanel({
//// 		renderTo:'addLeaForm',
//// 		labelAlign:'right',
//// 		labelWidth:100,
//// 		frame:true,
//// 		width:800,
//// 		height:340,
////        border: false,
//////        margin: '5,5,5,5',
////        //style:'margin-left:5px;margin-top:5px',
////        fieldDefaults: {
////            labelWidth: 55
////        },
//
//        url: 'save-form.php',
////        defaultType: 'textfield',
////        bodyPadding: 5,
//        items: [{
//        	layout:'column',
//        	items:[{
//        		width:450,
//        		layout:'form',
//        		items:[{
//        				xtype:'textfield',
//			            fieldLabel: '地块',
//			            id: 'lanBlock',
//			            width:150
//			        },{
//			        	xtype:'textfield',
//			            fieldLabel: '租赁地址',
//			            id: 'address',
//			            width:150
//			        },{
//			        	xtype:'textfield',
//			            fieldLabel: '房屋(m²)',
//			            id: 'roomSize',
//			            width:150
//        		}]
//        	},{
//        		width:450,
//        		layout:'form',
//        		items:[{
//        			xtype:'textfield',
//		            fieldLabel: '空置',
//		            id: 'nonOcc',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '土地(m²)',
//		            id: 'landSize',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '承租人',
//		            id: 'leaholder',
//		            width:150
//		        }]
//        	},{
//        		width:450,
//        		layout:'form',
//        		items:[ {
//        			xtype:'textfield',
//		            fieldLabel: '产权',
//		            id: 'propertys',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '身份证',
//		            id: 'idCard',
//		           width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '营业执照',
//		            id: 'busLicense',
//		            width:150
//		        }]
//        	},{
//        		width:450,
//        		layout:'form',
//        		items:[{
//        			xtype:'textfield',
//		            fieldLabel: '机构代码',
//		            id: 'orgCode',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '期限',
//		            id: 'timLimit',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '开始日期',
//		            id: 'startDate',
//		            width:150
//		        }]
//        	},{
//        		width:450,
//        		layout:'form',
//        		items:[{
//        			xtype:'textfield',
//		            fieldLabel: '截止日期',
//		            id: 'endDate',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '月租金',
//		            id: 'monRent',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '年租金',
//		            id: 'yerRent',
//		            width:150
//		        }]
//        	},{
//        		width:450,
//        		layout:'form',
//        		items:[{
//        			xtype:'textfield',
//		            fieldLabel: '支付方式',
//		            id: 'payType',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '押金',
//		            id: 'handsel',
//		            width:150
//		        },{
//		        	xtype:'textfield',
//		            fieldLabel: '违约金',
//		            id: 'penalty',
//		            width:150
//		        }]
//        	},{
//        		width:450,
//        		layout:'form',
//        		items:[{
//		            fieldLabel: '联系电话',
//		            id: 'tel',
//		            width:150
//		        },{
//		            fieldLabel: '联系人',
//		            id: 'linker',
//		            width:150
//		        },{
//		            fieldLabel: '递增说明',
//		            id: 'incExplain',
//		            width:150
//		        }]
//        	},{
//        		width:450,
//        		layout:'form',
//        		items:[{
//		            fieldLabel: '备注',
//		            id: 'remark',
//		            width:150
//		        },{
//		            fieldLabel: '坐标位置',
//		            id: 'coorsLea',
//		            width:150
//		        }]
//        	}]
//        }]
//    });
//
//    addLeaWin = Ext.create('Ext.window.Window', {
//        title: '新增租赁信息',
//        width: 900,
//        height:340,
////        minWidth: 300,
////        minHeight: 200,
//        layout: 'fit',
//        plain: true,
////		closeAction: 'hide',
//        items: addLeaForm,
//        buttons: [{
//            text: '拾取坐标',
//			handler: function(){
//				mapClick = 1;
//			}
//        },{
//            text: '提交',
//            handler:function(){
//        		//alert(hosUrl);
//        		var lanBlock = Ext.getCmp('lanBlock').getValue();
//				var address = Ext.getCmp('address').value;
//				var roomSize = Ext.getCmp('roomSize').value;
//				var nonOcc = Ext.getCmp('nonOcc').value;
//				var landSize = Ext.getCmp('landSize').value;
//				var leaholder = Ext.getCmp('leaholder').value;
//				var propertys = Ext.getCmp('propertys').value;
//				var idCard = Ext.getCmp('idCard').value;
//				var busLicense = Ext.getCmp('busLicense').value;
//				var orgCode = Ext.getCmp('orgCode').value;
//				var timLimit = Ext.getCmp('timLimit').value;
//				var startDate = Ext.getCmp('startDate').value;
//				var endDate = Ext.getCmp('endDate').value;
//				var monRent = Ext.getCmp('monRent').value;
//				var yerRent = Ext.getCmp('yerRent').value;
//				var payType = Ext.getCmp('payType').value;
//				var handsel = Ext.getCmp('handsel').value;
//				var penalty = Ext.getCmp('penalty').value;
//				var tel = Ext.getCmp('tel').value;
//				var linker = Ext.getCmp('linker').value;
//				var incExplain = Ext.getCmp('incExplain').value;
//				var remark = Ext.getCmp('remark').value;
//				var coorsLea = Ext.getCmp('coorsLea').value;
//				var coorsArray = coorsHos.split(",");
//				var coors_xArr = coorsArray[0].split(":");
//				var coors_yArr = coorsArray[1].split(":");
//				var coors_x = coors_xArr[1];
//				var coors_y = coors_yArr[1];
//				
//				ch = name.split(",");
//				Ext.Ajax.request({
//			         url: hosUrl,//'hos/addHos.html',
//			         method:'POST',
//			         headers:{
//			            'Content-Type': 'application/json; charset=utf-8'
//			         },
//			         success: function(res, opts){
//			           addLeaWin.hide()
//			           Ext.MessageBox.alert("提示",res.responseText);
//			           leaGrid.store.load();
//			         },
//			         failure: function(res, opts){
//			        	 addLeaWin.hide();
//			        	 Ext.MessageBox.alert("新增失败","请查看网络连接是否正常！");
//			         },
//			         jsonData:{lanBlock:lanBlock,address:address,roomSize:roomSize,nonOcc:nonOcc,landSize:landSize,leaholder:leaholder,propertys:propertys,idCard:idCard,
//			         busLicense:busLicense,orgCode:orgCode,timLimit:timLimit,startDate:startDate,endDate:endDate,monRent:monRent,yerRent:yerRent,payType:payType,handsel:handsel,
//			         penalty:penalty,tel:tel,linker:linker,incExplain:incExplain,remark:remark, coors_x:coors_x,coors_y:coors_y},
//			         scope:this
//		        });
//				addLeaWin.hide();
//        	}
//        },{
//            text: '取消',
//			handler: function () {
//				addLeaWin.hide();
//	         }
//        }]
//    });

authorizeLeaForm = Ext.create('Ext.form.Panel', {
        border: false,
        fieldDefaults: {
            labelWidth: 55
        }, 
        bodyPadding: 5,
        items: [{
				xtype: 'checkboxgroup',
				fieldLabel: '租赁信息',
				cls: 'x-check-group-alt',
				// Distribute controls across 3 even columns, filling each row
				// from left to right before starting the next row
				columns: 3,
				items: [
						{boxLabel: '地块', id: 'ch_lea_lanBlock',name: 'lea-horiz-1'},
						{boxLabel: '编号', id: 'ch_lea_codNum',name: 'lea-horiz-2'},
						{boxLabel: '租赁地址', id: 'ch_lea_address',name: 'lea-horiz-3'},
						{boxLabel: '房屋(㎡)', id: 'ch_lea_roomSize',name: 'lea-horiz-4'},
						{boxLabel: '空置', id: 'ch_lea_nonOcc',name: 'lea-horiz-5'},
						{boxLabel: '土地(㎡)', id: 'ch_lea_landSize',name: 'lea-horiz-6'},
						{boxLabel: '承租人', id: 'ch_lea_leaholder',name: 'lea-horiz-7'},
						{boxLabel: '产权', id: 'ch_lea_propertys',name: 'lea-horiz-8'},
						{boxLabel: '期限', id: 'ch_lea_timLimit',name: 'lea-horiz-9'},
						{boxLabel: '起始日期', id: 'ch_lea_startDate',name: 'lea-horiz-10'},
						{boxLabel: '截止日期', id: 'ch_lea_endDate',name: 'lea-horiz-11'},
						{boxLabel: '月租金', id: 'ch_lea_monRent',name: 'lea-horiz-12'},
						{boxLabel: '年租金', id: 'ch_lea_yerRent',name: 'lea-horiz-13'},
						{boxLabel: '支付方式', id: 'ch_lea_payType',name: 'lea-horiz-14'},
						{boxLabel: '押金', id: 'ch_lea_handsel',name: 'lea-horiz-15'},
						{boxLabel: '违约金', id: 'ch_lea_penalty',name: 'lea-horiz-16'},
						{boxLabel: '联系电话', id: 'ch_lea_tel',name: 'lea-horiz-17'},
						{boxLabel: '联系人', id: 'ch_lea_linker',name: 'lea-horiz-18'},
						{boxLabel: '递增说明', id: 'ch_lea_incExplain',name: 'lea-horiz-19'},
						{boxLabel: '备注', id: 'ch_lea_remark',name: 'lea-horiz-20'}
					]
			}
			]
    });

    authorizeLeaWin = Ext.create('Ext.window.Window', {
        title: '配置前台信息可见字段',
        width: 400,
        //height:270,
        height:145,
        minWidth: 400,
       // minHeight: 240,
        minHeight: 145,
        layout: 'fit',
        plain: true,
		closeAction: 'hide',
        items: authorizeLeaForm,
        buttons: [{
            text: '提交',
            handler: function () {
			var lanBlock;
			var codNum;
			var address;
			var roomSize;
			var nonOcc;
			var landSize;
			var leaholder;
			var propertys;
			var timLimit;
			var startDate;
			var endDate;
			var monRent;
			var yerRent;
			var payType;
			var handsel;
			var penalty;
			var tel;
			var linker;
			var incExplain;
			var remark;
			
    		if(Ext.getCmp('ch_lea_lanBlock').getValue()===true)
    		{
    			 lanBlock = '1';
    		}
    		else{
    			 lanBlock = '0';
    		}
    		
			if(Ext.getCmp('ch_lea_codNum').getValue()===true)
			{
				 codNum = '1';
			}
			else{
				 codNum = '0';
    		}
			
			if(Ext.getCmp('ch_lea_address').getValue()===true)
			{
				 address = '1';
			}
			else{
				 address = '0';
    		}
			
			if(Ext.getCmp('ch_lea_roomSize').getValue()===true)
			{
				 docNum = 1;
			}
			else{
				 docNum = 0;
    		}
			
			if(Ext.getCmp('ch_lea_nonOcc').getValue()===true)
			{
				 nonOcc = 1;
			}
			else{
				nonOcc = 0;
    		}
			
			if(Ext.getCmp('ch_lea_landSize').getValue()===true)
			{
				 landSize = '1';
			}
			else{
				landSize = '0';
    		}
			
			if(Ext.getCmp('ch_lea_leaholder').getValue()===true)
			{
				 leaholder = '1';
			}
			else{
				 leaholder = '0';
    		}
    		
    		if(Ext.getCmp('ch_lea_propertys').getValue()===true)
			{
				 propertys = '1';
			}
			else{
				 propertys = '0';
    		}
    		
    		if(Ext.getCmp('ch_lea_timLimit').getValue()===true)
			{
				 timLimit = '1';
			}
			else{
				 timLimit = '0';
    		}
			if(Ext.getCmp('ch_lea_startDate').getValue()===true)
			{
				 startDate = '1';
			}
			else{
				 startDate = '0';
    		}
    		if(Ext.getCmp('ch_lea_endDate').getValue()===true)
			{
				 endDate = '1';
			}
			else{
				 endDate = '0';
    		}
    		if(Ext.getCmp('ch_lea_monRent').getValue()===true)
			{
				 monRent = '1';
			}
			else{
				 monRent = '0';
    		}
    		if(Ext.getCmp('ch_lea_yerRent').getValue()===true)
			{
				 yerRent = '1';
			}
			else{
				 yerRent = '0';
    		}
    		if(Ext.getCmp('ch_lea_payType').getValue()===true)
			{
				 payType = '1';
			}
			else{
				 payType = '0';
    		}
    		if(Ext.getCmp('ch_lea_handsel').getValue()===true)
			{
				 handsel = '1';
			}
			else{
				 handsel = '0';
    		}
    		if(Ext.getCmp('ch_lea_penalty').getValue()===true)
			{
				 penalty = '1';
			}
			else{
				 penalty = '0';
    		}
    		if(Ext.getCmp('ch_lea_tel').getValue()===true)
			{
				 tel = '1';
			}
			else{
				 tel = '0';
    		}
    		if(Ext.getCmp('ch_lea_linker').getValue()===true)
			{
				 linker = '1';
			}
			else{
				 linker = '0';
    		}
    		if(Ext.getCmp('ch_lea_incExplain').getValue()===true)
			{
				 incExplain = '1';
			}
			else{
				 incExplain = '0';
    		}
    		if(Ext.getCmp('ch_lea_remark').getValue()===true)
			{
				 remark = '1';
			}
			else{
				 remark = '0';
    		}
			Ext.Ajax.request({
		         url: 'Config/setWmtsConfig.html',
		         method:'POST',
		         headers:{
		            'Content-Type': 'application/json; charset=utf-8'
		         },
		         success: function(res, opts){
		           //authorizeForm.form.reset();
		           authorizeLeaWin.hide();
		           Ext.MessageBox.alert("提示",res.responseText); 
		         },
		         failure: function(res, opts){
		        	 authorizeLeaForm.form.reset();
		        	 addLeaWin.hide();
		        	 Ext.MessageBox.alert("新增失败","请查看网络连接是否正常！");
		         },
//		         jsonData:{name:hosName,corporation:hosMan,phoneNum:phoneNum,docNum:docNum,nursNum:nursNum,lever:hosLever,address:hosAddress,coors_x:0,coors_y:0},
		        
		         jsonDate:{lanBlock:'lanBlock',codNum:'codNum',address:'address',roomSize:'roomSize',nonOcc:'nonOcc',landSize:'landSize',leaholder:'leaholder',propertys:'propertys'
				    ,timLimit:'timLimit',startDate:'startDate', endDate:'endDate',monRent:'monRent',yerRent:'yerRent',payType:'payType',handsel:'handsel',penalty:'penalty',tel:'tel',linker:'linker',
				    incExplain:'incExplain',remark:'remark'},
			     scope:this
	        });
	         }
        },{
            text: '取消',
			handler: function () {
        		authorizeLeaForm.form.reset();
				authorizeLeaWin.hide();
	         }
        }]
    });
 
           