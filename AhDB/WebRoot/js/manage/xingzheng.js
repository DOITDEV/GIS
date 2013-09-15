function getxzhengManage(){
	 Ext.define('xzhengModel', {
	     extend: 'Ext.data.Model',
 
	 	
	     fields: [ 
		        {name:'punish_ID'},
		        {name:'unit_NAME'},
		        {name:'unit_ADDRESS'},
		        {name:'la_TIME'},
		        {name:'accept_DATE'},
		        {name:'jarq'},
		        {name:'case_CON'},
		        {name:'punish_DESC'}
	     ]
	 });

	var xzhengStore = Ext.create('Ext.data.Store',{
		autoLoad : true,
		model: 'xzhengModel', 
	    pageSize:15,  
	    proxy: {  
	        type: 'ajax',  
	        url: 'xzcf/getAllxzcf.html',
	        reader: {  
	            //数据格式为json  
	            type: 'json',  
	            root: 'xzcf',  
	            //获取数据总数  
	            totalProperty: 'totalCount'  
	        }  
	    },  
	    autoLoad:true  
    
	});
	var pagingToolbar = new Ext.PagingToolbar
	({
	      emptyMsg:"没有数据",
	      displayInfo:true,
	      displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
	      store:xzhengStore
	 });
     
	var xzhengCol = [
	      Ext.create('Ext.grid.RowNumberer',{text: '行号',width:35}),
	      {header :'处罚ID',dataIndex:'punish_ID', sortable:true,hidden:true},	 
	     {header :'处罚对象',dataIndex:'unit_NAME', sortable:true},	     
	     {header :'处罚对象地址',dataIndex:'unit_ADDRESS', sortable:true},
	     {header :'立案日期',dataIndex:'la_TIME', sortable:true},
	     {header :'受理日期',dataIndex:'accept_DATE', sortable:true},
	     {header :'结案日期',dataIndex:'jarq', sortable:true},
	     {header :'案由',dataIndex:'case_CON', sortable:true},
	     {header :'处罚内容',dataIndex:'punish_DESC', sortable:true}
	];
	var xzhengBar =  [{
		xtype:'textfield',id:'xzcf_name'
	},{
		iconCls: 'user-find',text : '查询',
		handler: function (){
		xzhengStore.setProxy({
			type: 'ajax',  
	        url: 'xzcf/getXZCFByName.html?hosName='+encodeURI(Ext.getCmp('xzcf_name').getValue()),
	        reader: {   
	            type: 'json',  
	            root: 'xzcf',  
	            //获取数据总数  
	            totalProperty: 'totalCount'  
	        }
        });
		xzhengStore.load();
			
		}
	}];

	xzcfGrid = Ext.create('Ext.grid.Panel',{
		tbar : xzhengBar,
		width : '100%',
		height: '100%',
		frame : true,
		bbar:pagingToolbar,
		viewConfig:{
			forceFit : true
			//stripeRows : true
		},
		store: xzhengStore, 
		columns: xzhengCol
	});
	xzcfGrid.addListener('itemclick',xzcfGridClick);
	
	var xzhengPanel = new Ext.Panel({
        split: true,
        title: '行政处罚信息查询',
        layout: 'fit',
        items:[xzcfGrid]
	});
	return xzhengPanel;
}

function xzcfGridClick(){
	tsxzIndex = 0;
	map.graphics.clear();
	hosGry.clear();
	superGry.clear();
	pointGry.clear();
	glayer.clear();
	tsjbGry.clear();
	xzcfGry.clear();		
	//hosWin.hide();

	  var record = xzcfGrid.getSelectionModel().getSelection();	
	  tsjbDetailRec = record;
	  var objName = record[0].get('unit_NAME');
	  
	  Ext.Ajax.request({
		    url: 'hos/findHosByName.html?hosName='+ encodeURI(objName),
		    success: function(response){
				var text = Ext.JSON.decode(response.responseText);
				var tmp = text; 
		        
		        var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/pointIndex.png', 30, 30);
		  	  	var pt = new esri.geometry.Point(tmp[0].coors_x,tmp[0].coors_y,map.spatialReference);
		  	  	bufferX = tmp[0].coors_x;
		  	  	bufferY = tmp[0].coors_y;
		  	  	var graphic = new esri.Graphic(pt,symbol,null,null);
		  	  	//graphic.setAttributes({"hosX":tmp[0].coors_x,"hosY":tmp[0].coors_y,"hosValue": tmp[0].name,"hosAdd": tmp[0].address,"users:":record[0].get('superviseUsers'),"date:":record[0].get('superviseDate'),"result:":record[0].get('superviseResult')});
		  	  	//map.graphics
		  	  	xzcfGry.add(graphic);
		  	  	map.setLevel(6);
		  	  	map.centerAt(pt); 
		  	  	//superX = tmp[0].coors_x;
		  	  	//superY = tmp[0].coors_y;
		    }
		});
}
