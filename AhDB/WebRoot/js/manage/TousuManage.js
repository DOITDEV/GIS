function gettsjbManage(){
	 Ext.define('tsjbModel', {
	     extend: 'Ext.data.Model',
	   
//	     private int ID;
//	 	private String CLASSIFY;
//	 	private String DEALING_RESULT;
//	 	private String objName;
//	 	private String objAddress;
//	 	private Date RECEIVE_DATE;
//	 	private Date ARCHIVE_DATE;
//	 	private String COMPLAINT_DETAIL;
//	 	private String result;
	 	
	     fields: [ 
		        {name:'complaint_DETAIL'},
		        {name:'receive_DATE'},
		        {name:'archive_DATE'},
		        {name:'dealing_RESULT'},
		        {name:'objName'},
		        {name:'objAddress'},
		        {name:'classify'},
		        {name:'isarchive'}
	     ]
	 });

	var tsjbStore = Ext.create('Ext.data.Store',{
		autoLoad : true,
		model: 'tsjbModel', 
	    pageSize:15,  
	    proxy: {  
	        type: 'ajax',  
	        url: 'tsjb/getAlltsjb.html',
	        reader: {  
	            //数据格式为json  
	            type: 'json',  
	            root: 'tsjb',  
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
	      store:tsjbStore 
	 });
	 
	var tsjbCol = [
	      Ext.create('Ext.grid.RowNumberer',{text: '行号',width:35}),
	     {header :'投诉对象',dataIndex:'objName', sortable:true},	     
	     {header :'投诉分类',dataIndex:'classify', sortable:true},
	     {header :'投诉内容',dataIndex:'complaint_DETAIL', sortable:true},
	     {header :'受理日期',dataIndex:'receive_DATE', sortable:true},
	     {header :'归档日期',dataIndex:'archive_DATE', sortable:true},
	     {header :'是否归档',dataIndex:'isarchive', sortable:true},
	     {header :'处理结果',dataIndex:'dealing_RESULT', sortable:true}
	];
	var tsjbBar =  [{},{
		xtype:'textfield',id:'tsjb_name'
	},{
		iconCls: 'user-find',text : '查询',
		handler: function (){
		tsjbStore.setProxy({
			type: 'ajax',  
	        url: 'tsjb/getTSJBByName.html?hosName='+encodeURI(Ext.getCmp('tsjb_name').getValue()),
	        reader: {   
	            type: 'json',  
	            root: 'tsjb',  
	            //获取数据总数  
	            totalProperty: 'totalCount'  
	        }
        });
		tsjbStore.load();
		}
	}];

	tsjbGrid = Ext.create('Ext.grid.Panel',{
		tbar : tsjbBar,
		width : '100%',
		height: '100%',
		frame : true,
		bbar:pagingToolbar,
		viewConfig:{
			forceFit : true
			//stripeRows : true
		},
		store: tsjbStore, 
		columns: tsjbCol
	});
	tsjbGrid.addListener('itemclick',tsjbGridClick);
	
	var tsjbPanel = new Ext.Panel({
        split: true,
        title: '投诉举报信息查询',
        layout: 'fit',
        items:[tsjbGrid]
	});
	return tsjbPanel;
}

function tsjbGridClick(){
	
	tsxzIndex = 1;
	map.graphics.clear();
	hosGry.clear();
	superGry.clear();
	pointGry.clear();
	glayer.clear();
	
	tsjbGry.clear();
	xzcfGry.clear();
		
	//hosWin.hide();
	
	  
	  var record = tsjbGrid.getSelectionModel().getSelection();	
	  tsjbDetailRec = record;
	  var objName = record[0].get('objName');
	  
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
		  	  	tsjbGry.add(graphic);
		  	  	map.setLevel(6);
		  	  	map.centerAt(pt); 
			  
		  	  	//superX = tmp[0].coors_x;
		  	  	//superY = tmp[0].coors_y;
		    }
		});
}
