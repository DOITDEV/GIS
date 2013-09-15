
Ext.define("Buffer120",{
	extend : 'Ext.data.Model',
	fields: ['rName','DZ','coordinate','length']
});

var buffer120Store = Ext.create('Ext.data.Store',{
	model: 'Buffer120',
	sorters:[{property:'length',direction:'ASC'}]
});

var buffer120Col = [
                    Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
                {header :'医院',width: 120, dataIndex:'rName',sortable:false },
                {header :'坐标',width: 80, dataIndex:'coordinate', hidden:true},
                {header :'地址',width: 120, dataIndex:'DZ', hidden:false ,sortable:false },
                {header :'距离(KM)',width: 80, dataIndex:'length',type:'float', hidden:false}
           ];

var bufferGrid = Ext.create('Ext.grid.Panel',{
	height: 240,
	id: 'Buffer120Grid',
//    verticalScroller: {
//      xtype: 'paginggridscroller',
//        activePrefetch: false
//   },
	enableDragDrop: true,
	//flex:2,
	//collapsible: true,
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
	store : buffer120Store, 
	columns :buffer120Col
});

bufferGrid.addListener('itemclick',bufferGridClick); 

function bufferGridClick(){

	  var record = bufferGrid.getSelectionModel().getSelection();	
	  var arr = record[0].get('coordinate').split(',');
	  var x = arr[0];
	  var y = arr[1];
	  var point = new esri.geometry.Point([x,y],map.spatialReference);

	  hosX = x;
	  hosY = y;
	  
	  hosValue = record[0].get('rName');
	  hosAdd = record[0].get('DZ');
	  
	  hosWin.hide(); 
	  
	  var pointTemp = map.toScreen(point);//(new esri.geometry.Point([hosX,hosY],map.spatialReference));//(new NLatLng(hosX,hosY));
	  map.setLevel(10);
      map.centerAt(point);
	  var x = pointTemp.x-270;//+270;
	  var y = pointTemp.y+140;
		 //var x = maploc2.x-275; 
		 //var y = maploc2.y+140;

      
	  hosWin.show(); 
	  hosWin.items.items[0].body.update('<div><br><a>名称：</a>'+ hosValue + '<br><br><a>地址：'+ hosAdd +'</a></div>');	
	  hosWin.setPosition(x,y,true);
	  hosWin.doLayout();
	  
	  //hosArea = record[0].get('pArea');
	  
	 // map.setCenter(point,8, false, false);
//	  
//	  var imageurl = 'resources/images/hospitals.png';   
//	  var size = new NSize(30,30);   
//	  var offset = new NPixel(-(size.w/2), -size.h);   
//	  var icon = new NIcon(imageurl,size,offset);   
//	  //icon.id="pointTest";      
//	  var marker = new NMarker(point, icon)
//	  markers.addMarker(marker);
//	  //alert(record[0].get('rName'));
//	  marker.events.bind("mousedown",icon,hosMarkerClick);//(point));
}


var bufferWin = Ext.create('Ext.window.Window', {
          title: '附近医院列表',
          collapsible: true,
          x:55, 
          y: 300,
          height: 270,
          draggable: true,
          hidden: true, 
          closeAction: 'hide',
          width: 420,
          layout: 'fit',
  		  items: bufferGrid
  		});


function returnFloat(value){
	value = Math.round(parseFloat(value)*100)/100;
	var temp = value.toString().split(".");
	 
	if(value.toString().indexOf(".")<0)
	{
		value = value.toString() + ".00";
	}
	else if(temp[1].toString().length <2)
	{
		 
		value = value.toString() + "0";
	}
	return value;
}