
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
	  
	  if(hosAdd==="字段不可见")
	  {
		  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue +'</a></div>');	
	  }
	  else{
		  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue + '<br><br><a>地址：'+ hosAdd +'</a></div>');	
	  }
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
	  
	  if(hosAdd==="该字段不可见")
	  {
		  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue +'</a></div>');	
	  }
	  else{
		  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue + '<br><br><a>地址：'+ hosAdd +'</a></div>');	
	  }
	  hosWin.setPosition(x,y,true);
	  hosWin.doLayout();
  }
  
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
						html:''
						//items:[{xtype:'textfield',id:'hosName',disabled:true,fieldLabel:'名称'},{xtype:'textfield',disabled:true,fieldLabel:'地址'},{xtype:'textfield',disabled:true,fieldLabel:'所述城区'}],
//						dockedItems: [{
//						    xtype: 'toolbar',
//						    dock: 'bottom',
//						    items:[
//									{
//										xtype:'tbfill'
//									},{
//										text:'查看详细',
//										handler:function()
//										{
//											if(hosDetail!=null)
//											{
//												hosDetail.hide();
//											}
//											hosDetail = Ext.create('Ext.window.Window', {
//												     height: 280,
//												     draggable: false,
//												     title:'更多信息',
//												     hidden: true, 
//												     closeAction: 'hide',
//												     width: 260,
//												     layout: 'fit',
//													 items:[
//															      Ext.create('Ext.form.Panel', {
//															           //frame: true,
//															           bodyPadding: 5,
//															           fieldDefaults: {
//															    	  		margin: '10,10,20,20',
//																            labelAlign: 'left',
//																            labelWidth: 90,
//																            anchor: '100%'
//																        },
//																		resizaable:false,
//																		shadow:true,
//																		html:'<br><a>医院名称: </a>'+ hosDetailRec["hosValue"]//hosDetailRec[0].get('name')
//																			+'<br><br><a>医院地址：</a>'+ hosDetailRec["hosAdd"]//hosDetailRec[0].get('address')
//																			+'<br><br><a>医院等级：</a>'+ hosDetailRec["lever"]//hosDetailRec[0].get('lever')
//																			+'<br><br><a>医生数目：</a>'+ hosDetailRec["docNum"]//hosDetailRec[0].get('docNum')
//																			+'<br><br><a>护士数目：</a>'+ hosDetailRec["nursNum"]//hosDetailRec[0].get('nursNum')
//																			+'<br><br><a>联系方式：</a>'+ hosDetailRec["phoneNum"]//hosDetailRec[0].get('phoneNum')
//																			+'<br><br><a>医院法人：</a>'+ hosDetailRec["corporation"]//hosDetailRec[0].get('corporation')
//																			//+'<br><br><a>医院位置：</a>经度：'+hosDetailRec[0].get('coors_x')+"--纬度："+hosDetailRec[0].get('coors_y')
//															      })
//															]
//																		
//												});
//											hosDetail.show();
//											hosDetail.setPosition(60,150,true);
//											hosDetail.doLayout();
//										}
//									}]
//						}]
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