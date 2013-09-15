
Ext.define("MasRoute",{
	extend : 'Ext.data.Model',
	fields: ['text','length','time']
});

var MasRouteStore = Ext.create('Ext.data.Store',{
	model: 'MasRoute'//,
	//sorters:[{property:'length',direction:'ASC'}]
});

var MasRouteCol = [
                    Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
                {header :'路线',width: 160, dataIndex:'text',sortable:false },
                {header :'长度(KM)',width: 120, dataIndex:'length',sortable:false,
                	summaryType:'sum',summaryRenderer:function(value){return '总长度'+ value+'KM';}},
             {header :'时间',width: 80, dataIndex:'time', hidden:true}
           ];

var MasRouteGrid = Ext.create('Ext.grid.Panel',{
	height: 240,
	id: 'MasRouteGrid',
//    features: [{
//        ftype: 'summary'
//    }],
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
	store : MasRouteStore, 
	columns :MasRouteCol
});

MasRouteGrid.addListener('itemclick',MasRouteGridClick); 

function MasRouteGridClick(){
	map.graphics.clear();
	  var record = MasRouteGrid.getSelectionModel().getSelection();	
	  var index = MasRouteStore.indexOf(record[0]); 
	  var segment = directionFeatures[index];
	  map.setExtent(segment.geometry.getExtent(), true);
	  var segmentSymbol = new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([255,0,0,0.5])).setWidth(8);

	  map.graphics.add(new esri.Graphic(segment.geometry, segmentSymbol));
}

function zoomToSegment(index) {
    var segment = directionFeatures[index];
    map.setExtent(segment.geometry.getExtent(), true);
    if (! segmentGraphic) {
      segmentGraphic = map.graphics.add(new esri.Graphic(segment.geometry, segmentSymbol));
    }
    else {
      segmentGraphic.setGeometry(segment.geometry);
    }
}


var MasRouteWin = Ext.create('Ext.window.Window', {
          title: '最佳救援路径',
          collapsible: true,
          x:55, 
          y: 300,
          height: 270,
          draggable: true,
          hidden: true, 
          closeAction: 'hide',
          width: 420,
          layout: 'fit',
  		  items: MasRouteGrid
  		});