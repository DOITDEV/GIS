
  function hosBuff_MarkerClick(){
	  hosX = this.x;
	  hosY = this.y;
	  hosValue = this.value;
	  hosAdd = this.address;
	  hosWin.hide(); 
	  var pointTemp = map.getPixelFromLonLat(new NLatLng(hosX,hosY));
	  var x = pointTemp.x-270;
	  var y = pointTemp.y+140;
	  hosWin.show(); 
	  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue + '<br><br><a>地址：'+ hosAdd +'</a></div>');	
	  hosWin.setPosition(x,y,true);
	  hosWin.doLayout();
  }
  function hosMarkerClick(e)//(point) 
  { 
	  hosWin.hide(); 
	  var pointTemp = map.getPixelFromLonLat(new NLatLng(hosX,hosY));
 
	  var x = pointTemp.x-270;
	  var y = pointTemp.y+140;
	  hosWin.show(); 
	  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue + '<br><br><a>地址：'+ hosAdd +'</a></div>');	
	  hosWin.setPosition(x,y,true);
	  hosWin.doLayout();
  }
  
  var tsxzWin = Ext.create('Ext.window.Window', {
		height: 170,
		draggable: false,
		hidden: true,
		closeAction: 'hide',
		width: 280,
		layout: 'fit',
		items: [
				      Ext.create('Ext.form.Panel', {
				          //frame: true,
				          id: 'pointForm',
				          bodyPadding: 5,
				          fieldDefaults: {
				              margin: '10,10,20,20',
				              labelAlign: 'left',
				              labelWidth: 90,
				              anchor: '100%'
				          },
				          resizaable: false,
				          shadow: true,
				          dockedItems: [{
			              xtype: 'toolbar',
			              dock: 'bottom',
			              items: [
									{
									    xtype: 'tbfill'
									}, {
									    text: '详细信息', 
									    handler: function () {
											var htmlUrl;
											if(tsxzIndex==0)
											{
												htmlUrl = '<br><a>处罚对象: </a>'+tsjbDetailRec[0].get('unit_NAME')
												+'<br><br><a>处罚内容：</a>'+tsjbDetailRec[0].get('punish_DESC')
												+'<br><br><a>处罚地址：</a>'+tsjbDetailRec[0].get('unit_ADDRESS')
												+'<br><br><a>处罚案由：</a>'+tsjbDetailRec[0].get('case_CON')
												+'<br><br><a>受理日期：</a>'+tsjbDetailRec[0].get('accept_DATE')
												+'<br><br><a>立案日期：</a>'+tsjbDetailRec[0].get('la_TIME')
												+'<br><br><a>结案日期：</a>'+tsjbDetailRec[0].get('jarq')
											}
											else
											{
												 
												htmlUrl = '<br><a>投诉对象: </a>'+tsjbDetailRec[0].get('objName')
												+'<br><br><a>投诉分类：</a>'+tsjbDetailRec[0].get('classify')
												+'<br><br><a>投诉内容：</a>'+tsjbDetailRec[0].get('complaint_DETAIL')
												+'<br><br><a>归档日期：</a>'+tsjbDetailRec[0].get('archive_DATE')
												+'<br><br><a>受理日期：</a>'+tsjbDetailRec[0].get('receive_DATE')
												+'<br><br><a>处理结果：</a>'+tsjbDetailRec[0].get('dealing_RESULT')
												+'<br><br><a>是否归档：</a>'+tsjbDetailRec[0].get('isarchive')
											}
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
																		html: htmlUrl
																			
															      })
															]
																		
												});
											hosDetail.show();
											hosDetail.setPosition(60,150,true);
											hosDetail.doLayout();
									}}]}]
				          
//				          dockedItems: [{
//				              xtype: 'toolbar',
//				              dock: 'bottom',
//				              items: [
//										{
//										    xtype: 'tbfill'
//										}, {
//										    text: '详细信息', 
//										    handler: function () {
////												hosUrl = 'hos/addHos.html';
////												addHosForm.form.reset();
////								        		Ext.getCmp('hosName').setValue(bufferValue);
////												Ext.getCmp('hosAddress').setValue(bufferAdd);
////												Ext.getCmp('coorsHos').setValue("x:"+bufferX+",y:"+bufferY);
////												addHosWin.show();
//											if(tsxzIndex===1){
//												if(hosDetail!=null)
//												{
//													hosDetail.hide();
//												}
//												hosDetail = Ext.create('Ext.window.Window', {
//													     height: 280,
//													     draggable: false,
//													     title:'更多信息',
//													     hidden: true, 
//													     closeAction: 'hide',
//													     width: 260,
//													     layout: 'fit',
//														 items:[
//																      Ext.create('Ext.form.Panel', {
//																           //frame: true,
//																           bodyPadding: 5,
//																           fieldDefaults: {
//																    	  		margin: '10,10,20,20',
//																	            labelAlign: 'left',
//																	            labelWidth: 90,
//																	            anchor: '100%'
//																	        },
//																			resizaable:false,
//																			shadow:true,
//																			html:'<br><a>处罚对象: </a>'+hosDetailRec[0].get('name')
//																				+'<br><br><a>处罚内容：</a>'+hosDetailRec[0].get('address')
//																				+'<br><br><a>处罚地址：</a>'+hosDetailRec[0].get('address')
//																				+'<br><br><a>处罚案由：</a>'+hosDetailRec[0].get('lever')
//																				+'<br><br><a>受理日期：</a>'+hosDetailRec[0].get('docNum')
//																				+'<br><br><a>立案日期：</a>'+hosDetailRec[0].get('nursNum')
//																				+'<br><br><a>结案日期：</a>'+hosDetailRec[0].get('phoneNum')
//																				//+'<br><br><a>医院位置：</a>经度：'+hosDetailRec[0].get('coors_x')+"--纬度："+hosDetailRec[0].get('coors_y')
//																      })
//																]
//																			
//													});
//												hosDetail.show();
//												hosDetail.setPosition(60,150,true);
//												hosDetail.doLayout();
//											}
//											else{
//												if(hosDetail!=null)
//												{
//													hosDetail.hide();
//												}
//												hosDetail = Ext.create('Ext.window.Window', {
//													     height: 280,
//													     draggable: false,
//													     title:'更多信息',
//													     hidden: true, 
//													     closeAction: 'hide',
//													     width: 260,
//													     layout: 'fit',
//														 items:[
//																      Ext.create('Ext.form.Panel', {
//																           //frame: true,
//																           bodyPadding: 5,
//																           fieldDefaults: {
//																    	  		margin: '10,10,20,20',
//																	            labelAlign: 'left',
//																	            labelWidth: 90,
//																	            anchor: '100%'
//																	        },
//																			resizaable:false,
//																			shadow:true,
//																			html:'<br><a>投诉对象: </a>'+hosDetailRec[0].get('name')
//																				+'<br><br><a>投诉分类：</a>'+hosDetailRec[0].get('address')
//																				+'<br><br><a>投诉内容：</a>'+hosDetailRec[0].get('address')
//																				+'<br><br><a>归档日期：</a>'+hosDetailRec[0].get('lever')
//																				+'<br><br><a>受理日期：</a>'+hosDetailRec[0].get('docNum')
//																				+'<br><br><a>处理结果：</a>'+hosDetailRec[0].get('phoneNum')
//																				//+'<br><br><a>医院位置：</a>经度：'+hosDetailRec[0].get('coors_x')+"--纬度："+hosDetailRec[0].get('coors_y')
//																      })
//																]
//																			
//													});
//												hosDetail.show();
//												hosDetail.setPosition(60,150,true);
//												hosDetail.doLayout();
//											}
//										}}]
//				          }]})]
				      })]
			});
  
  
  var pointWin = Ext.create('Ext.window.Window', {
		title: '详细信息',
		height: 170,
		draggable: false,
		hidden: true,
		closeAction: 'hide',
		width: 280,
		layout: 'fit',
		items: [
				      Ext.create('Ext.form.Panel', {
				          //frame: true,
				          id: 'pointForm',
				          bodyPadding: 5,
				          fieldDefaults: {
				              margin: '10,10,20,20',
				              labelAlign: 'left',
				              labelWidth: 90,
				              anchor: '100%'
				          },
				          resizaable: false,
				          shadow: true,
				          //items:[{xtype:'textfield',id:'pointName',fieldLabel:'名称'},{xtype:'textfield',disabled:true,fieldLabel:'地址'},{xtype:'textfield',disabled:true,fieldLabel:'所述城区'}],
				          dockedItems: [{
				              xtype: 'toolbar',
				              dock: 'bottom',
				              items: [
										{
										    xtype: 'tbfill'
										}, {
										    text: '新增为医疗机构', 
										    handler: function () {
												hosUrl = 'hos/addHos.html';
												addHosForm.form.reset();
								        		Ext.getCmp('hosName').setValue(bufferValue);
												Ext.getCmp('hosAddress').setValue(bufferAdd);
												Ext.getCmp('coorsHos').setValue("x:"+bufferX+",y:"+bufferY);
												addHosWin.show();
										}}]
				          }]})]
			});
  
//  var pointWin = Ext.create('Ext.window.Window', {
//      title: '详细信息',
//      height: 170,
//      draggable: false,
//      hidden: true,
//      closeAction: 'hide',
//      width: 280,
//      layout: 'fit',
//      items: [
//			      Ext.create('Ext.form.Panel', {
//			          //frame: true,
//			          id: 'pointForm',
//			          bodyPadding: 5,
//			          fieldDefaults: {
//			              margin: '10,10,20,20',
//			              labelAlign: 'left',
//			              labelWidth: 90,
//			              anchor: '100%'
//			          },
//			          resizaable: false,
//			          shadow: true,
//			          //items:[{xtype:'textfield',id:'pointName',fieldLabel:'名称'},{xtype:'textfield',disabled:true,fieldLabel:'地址'},{xtype:'textfield',disabled:true,fieldLabel:'所述城区'}],
//			          dockedItems: [{
//			              xtype: 'toolbar',
//			              dock: 'bottom',
//			              items: [
//									{
//									    xtype: 'tbfill'
//									}, {
//									    text: '新增为医疗机构', 
//									    handler: function () {
//									        if (Ext.getCmp('saveList').hidden == true) {
//									            Ext.getCmp('saveList').show();
//									        }
//									        else {
//									            //Ext.getCmp('saveList').hide();
//									        }
//									        pointWin.hide();
//									        carStore.each(function (rec) {
//									            var arr = rec.get('coordinate').split(',');
//									            var x = arr[0];
//									            var y = arr[1];
//									            //alert(x); alert(y);
//									            //alert(bufferX); alert(bufferY);
//									            //var arr1 = new Array();
//
//									            //arr1.push(new NGeometry.Point(x, y));
//									            //arr1.push(new NGeometry.Point(bufferX, bufferY));
//
//									            var point1 = new esri.geometry.Point([x, y], new esri.SpatialReference({ wkid: 4326 }));
//									            var point2 = new esri.geometry.Point([bufferX, bufferY], new esri.SpatialReference({ wkid: 4326 }));
//									            var polyline = new esri.geometry.Polyline(new esri.SpatialReference({ wkid: 4326 }));
//									            polyline.addPath([point1,point2]);
//
//									            var lengthParams = new esri.tasks.LengthsParameters();
//									            lengthParams.polylines = [polyline];
//									            lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
//									            lengthParams.geodesic = true;
//									            geometryService.lengths(lengthParams, function (distance) {
//									                //alert(distance.lengths[0]);
//									                rec.set('length', returnFloat(distance.lengths[0]/1000));
//									                rec.commit();
//									                carStore.sort('length', 'ASC');
//									                carList.reconfigure(carStore);
//
//									            });
//
//									        });
//
//
//									        /*
//
//									        var distParams = new esri.tasks.DistanceParameters();
//									        distParams.distanceUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
//									        distParams.geometry1 = point1;//inputPoints[inputPoints.length - 2];
//									        distParams.geometry2 = point2;//inputPoints[inputPoints.length - 1];
//									        distParams.geodesic = true;
//									        //buffercoor.push(x+','+y);										      
//									        geometryService.distance(distParams, 
//									        function(distance) 
//									        {  alert("ddd");
//
//									        rec.set('length',returnFloat(distance));
//									        rec.commit();
//									        carStore.sort('length', 'ASC');
//									        carList.reconfigure(carStore);
//									        },function(d){
//									        alert(d);
//									        });
//									        });*/
//
//
//									    }
//									}, {
//									    text: '附近医院',
//									    handler: function () {
//									        pointWin.hide();
//									        //pointWin.hide();
//									        locationSqualSearch();
//
//									    }
//									}, {
//									    text: '选为起点',
//									    handler: function () {
//									        startLayer.clear();
//									        Ext.getCmp('startPoint').setValue(bufferValue);
//									        startPointX = bufferX;
//									        startPointY = bufferY;
//									        pointWin.hide();
//
//									        var point = new esri.geometry.Point([startPointX, startPointY], map.spatialReference);
//
//									        var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/start.png', 24, 24);
//									        var graphic = new esri.Graphic(point, symbol, null, null);
//									        startPoint = startLayer.add(graphic);
//
//									        //								  			
//									        //											var coors = map.toMap(new esri.geometry.Point([righrPointX,righrPointY-137],map.spatialReference));
//									        //											Ext.getCmp('startPoint').setValue("x:"+coors.x+",y:"+coors.y);
//									        //											startPointX = coors.x;
//									        //											startPointY = coors.y;	
//									        //											var point = new esri.geometry.Point([startPointX,startPointY],map.spatialReference); 
//									        //											
//									        //											var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/start.png', 24, 24);
//									        //											var graphic = new esri.Graphic(point,symbol,null,null);
//									        //											startLayer.add(graphic);
//									    }
//									}, {
//									    text: '选为终点',
//									    handler: function () {
//									        endLayer.clear();
//									        Ext.getCmp('endPoint').setValue(bufferValue);
//									        endPointX = bufferX;
//									        endPointY = bufferY;
//									        pointWin.hide();
//
//									        var point = new esri.geometry.Point([endPointX, endPointY], map.spatialReference);
//
//									        var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/end.png', 24, 24);
//									        var graphic = new esri.Graphic(point, symbol, null, null);
//									        endPoint = endLayer.add(graphic);
//									    }
//									}]
//			          }]
//			      })
//			]
//  });
  var superWin2 = Ext.create('Ext.window.Window', {
      title: '详细信息',
      height: 185,
      draggable: false,
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
					html:''
		      })
	]
  });
  var superWin = Ext.create('Ext.window.Window', {
      title: '详细信息',
      height: 170,
      draggable: false,
      hidden: true, 
      closeAction: 'hide',
      x:65,
      y:150,
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
						html:''
			      })
			]
		});
  var superviseHisWin=null;
  var hosWin = Ext.create('Ext.window.Window', {
      title: '详细信息',
      height: 170,
      draggable: false,
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
						html:'',
						//items:[{xtype:'textfield',id:'hosName',disabled:true,fieldLabel:'名称'},{xtype:'textfield',disabled:true,fieldLabel:'地址'},{xtype:'textfield',disabled:true,fieldLabel:'所述城区'}],
						dockedItems: [{
						    xtype: 'toolbar',
						    dock: 'bottom',
						    items:[
									{
										xtype:'tbfill'
									},{
										text:'查看详细',
										handler:function()
										{
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
										}
									},{
										text:'历史监督信息',
										hidden:true,
										id:'btn2',
										handler:function()
										{
											if(superviseHisWin!=null)
									  		{
												superviseHisWin.close();
									  		}
											//创建监督数据模型
											 Ext.define('superviseModel', {
											     extend: 'Ext.data.Model',
											     fields: [
											  	        {name:'superviseResult'},
												        {name:'superviseUsers'},
												        {name:'logId'},  
												        {name:'superviseDate'},
												        {name:'hosName'}
											     ]
											 });

											var superviseStore = Ext.create('Ext.data.Store',{
												autoLoad : true,
												model: 'superviseModel',
//												proxy:{
//													type:'ajax',
//													url: 'supervise/getAllSupervise.html',
//													reader:{
//														type : 'json'
//													}
//												}
												//设置分页大小  
											    pageSize:5,  
											    proxy: {  
											        type: 'ajax',  
											        url: 'supervise/getHisSupervise.html?name='+ encodeURI(hosDetailRec[0].get('name')),
											        reader: {  
											            //数据格式为json  
											            type: 'json',  
											            root: 'supervise',
											            //获取数据总数  
											            totalProperty: 'totalCount'  
											        }  
											    },  
											    autoLoad:true  
											});
											var pagingBbar = new Ext.PagingToolbar
											({
											      emptyMsg:"没有数据",
											      displayInfo:true,
											      displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
											      store:superviseStore
											      
											 });
											var superviseCol = [
											      Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
											     {header :'监督对象',width: 60, dataIndex:'hosName', sortable:true},
											     {header :'监督人员',width: 60, dataIndex:'superviseUsers', sortable:true},
											     {header :'监督日期',width: 60,type:'date', dataIndex:'superviseDate', sortable:true},
											     {header :'监督结论',width: 60, dataIndex:'superviseResult', sortable:true}
											];
										var superviseHis = Ext.create('Ext.grid.Panel',{
												width : '100%',
												bbar:pagingBbar,
												height: '100%',
												frame : true,
												viewConfig:{
													forceFit : true,
													stripeRows : true
												},
												store : superviseStore, 
												columns :superviseCol
											});
										superviseHis.addListener('itemclick',function(){
											map.graphics.clear();
											pointGry.clear();
											
										  var record = poiList.getSelectionModel().getSelection();	
										  var temp = record[0].get('lonlat').split(" ");
										  var point = new esri.geometry.Point([temp[0], temp[1]], new  esri.SpatialReference({ wkid: 4326 }));//new NLatLng(x,y);  
	
										  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/pointIndex.png', 30, 30);
										  var pt = new esri.geometry.Point(temp[0],temp[1],map.spatialReference);
										  var graphic = new esri.Graphic(pt,symbol,null,null);
										  
										  pointGry.add(graphic);		  
									      map.setLevel(6);
									      map.centerAt(pt); 
										});
									
										 
										superviseHisWin = Ext.create('Ext.window.Window', {
											  //resizable: false,
											  title:'历史监督信息',
										      draggable: true,
										      collapsible: true,   	  
										      layout:'fit',
										      items:[superviseHis],
										      hidden: true,
										      //closable: false,
										      x: document.body.clientWidth -690, 
										      y: 90,
										      align:'right',
										      closeAction: 'hide',
										      width: 380,
										      height: 210
										      
											}).show();
										}
									},{
										text:'最新监督信息',
										id:'btn3',
										hidden:true,
										handler:function()
										{
											Ext.Ajax.request({
											    url: 'supervise/getSuperviseByName.html?name='+ encodeURI(hosDetailRec[0].get('name')),
											    success: function(response){
											        var text = Ext.JSON.decode(response.responseText);
											        //alert(text[0].superviseUsers);
											        var hosDetail = Ext.create('Ext.window.Window', {
													     height: 175,
													     draggable: false,
													     title:'最新监督信息',
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
																			html:'<br><a>监督对象: </a>'+text[0].hosName
																				+'<br><br><a>监督人员：</a>'+text[0].superviseUsers
																				+'<br><br><a>监督日期：</a>'+text[0].superviseDate
																				+'<br><br><a>监督结论：</a>'+text[0].superviseResult
																      })
																]
													});
												hosDetail.show();
												hosDetail.setPosition(60,150,true);
												hosDetail.doLayout();
											    }
											});
											
//											Ext.Ajax.request({
//										         url: hosUrl,
//										         method:'Get',
//										         headers:{
//										            'Content-Type': 'application/json; charset=utf-8'
//										         },
//										         success: function(res, opts){
//										           
//										           Ext.MessageBox.alert("提示",res.responseText);
//										           userGrid.store.load();
//										         },
//										         failure: function(res, opts){
//										        	 addHosWin.hide();
//										        	 Ext.MessageBox.alert("新增失败","请查看网络连接是否正常！");
//										         },
//										         scope:this
//											});
//											
//										addHosWin.hide();
//												var hosDetail = Ext.create('Ext.window.Window', {
//													     height: 280,
//													     draggable: false,
//													     title:'详细监督信息',
//													     hidden: true, 
//													     closeAction: 'hide',
//													     width: 260,
//													     layout: 'fit',
//														 items:[
//																      Ext.create('Ext.form.Panel', {
//																           //frame: true,
//																           bodyPadding: 5,
//																           fieldDefaults: {
//																    	  		margin: '10,10,20,20',
//																	            labelAlign: 'left',
//																	            labelWidth: 90,
//																	            anchor: '100%'
//																	        },
//																			resizaable:false,
//																			shadow:true,
//																			html:'<br><a>监督对象: </a>'+superviseRec[0].get('hosName')
//																				+'<br><br><a>监督人员：</a>'+superviseRec[0].get('superviseUsers')
//																				+'<br><br><a>监督日期：</a>'+superviseRec[0].get('superviseDate')
//																				+'<br><br><a>监督结论：</a>'+superviseRec[0].get('superviseResult')
//																      })
//																]
//																			
//													});
//												hosDetail.show();
//												hosDetail.setPosition(60,150,true);
//												hosDetail.doLayout();
										}
									}]
						}]
			      })
			]
		});
function markerClick()//(point,temp) 
{ 
	//var postion = this.getCenterLatlng();
	//alert(this.left);//(postion.x+','+postion.y);
  //alert(Ext.getCmp('pointName').value);
  //alert(temp);
  //Ext.getCmp('pointName').setValue = temp;
//  if(pointWin.isHidden()===false)
//  {
//	  pointWin.hide();
//	  
//  }
  //this.
  
  pointWin.hide(); 
  var pointTemp = map.getPixelFromLonLat(new NLatLng(bufferX,bufferY));//map.worldToPixel(new NLatLng(bufferX,bufferY));//(point);
  var x = pointTemp.x-275;
  var y = pointTemp.y+140;
	  pointWin.show(); 
	  pointWin.items.items[0].body.update('<div><br><a>名称：</a>'+ bufferValue + '<br><br><a>地址：'+ bufferAdd +'</a></div>');	
	  pointWin.setPosition(x,y,true);
	  pointWin.doLayout();
}