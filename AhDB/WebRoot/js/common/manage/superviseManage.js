
function getSupervise()
{
	var supervisePanel = new Ext.Panel({
        split: true,
        title: '监督信息面板',
        layout: 'fit',
        items:[getSuperviseGrid()]
	});
	return supervisePanel;
}

/**
 * 获取监督信息面板
 */
function getSuperviseGrid()
{
	
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
//		proxy:{
//			type:'ajax',
//			url: 'supervise/getAllSupervise.html',
//			reader:{
//				type : 'json'
//			}
//		}
		//设置分页大小  
	    pageSize:5,  
	    proxy: {  
	        type: 'ajax',  
	        url: 'supervise/getAllSupervise.html',
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
	
	var superviseCol = [
	      Ext.create('Ext.grid.RowNumberer',{text: '行号', width :35}),
	     {header :'监督对象',width: 120, dataIndex:'hosName', sortable:true},
	     {header :'监督人员',width: 180, dataIndex:'superviseUsers', sortable:true},
	     {header :'监督日期',width: 120,type:'date', dataIndex:'superviseDate', sortable:true},
	     {header :'监督结论',width: 120, dataIndex:'superviseResult', sortable:true}
	];
	var states = Ext.create('Ext.data.Store', {
	    fields: ['name', 'value'],
	    data : [ {"name":"全部", "value":"12"},
	        {"name":"合格", "value":"00"},
	        {"name":"不合格", "value":"01"},
	        {"name":"不确定", "value":"10"},
	        {"name":"未完成", "value":"11"} 
	    ]
	});

	// Create the combo box, attached to the states data store
	var combox = Ext.create('Ext.form.ComboBox', {
	    fieldLabel: '监督结论',
	    store: states,
	    queryMode: 'local',
	    labelWidth:55,
	    id: 'sup_Result',
	    displayField: 'name',
	    valueField: 'value',
	    listeners:{
            "select":function(combo,record,number){    //监听"select"事件
                var value=combo.getRawValue();           //取得ComboBox0的选择值
                superviseStore.clearFilter();
				superviseStore.load();
				if(value!=='全部')
				{
					superviseStore.filter('superviseResult', value);
				}
            },
            scope:this
        }
	});
	
	var hosBar =  [{
		xtype:'textfield',labelWidth:55,fieldLabel: '监督对象',id: 'sup_HosValue'
	},{
		iconCls: 'user-find',text : '查询',
		handler: function (){
			if(Ext.getCmp('sup_HosValue').getValue()!='')
			{
				superviseStore.clearFilter();
				superviseStore.load();
				superviseStore.filter('hosName', Ext.getCmp('sup_HosValue').getValue());
			}
		}
	},{
		xtype : 'tbseparator'
	},combox,{
		xtype : 'tbseparator'
	},{
		xtype:'datefield',labelWidth:65,fieldLabel: '开始时间', format:'Y-m-d',id: 'sup_startDate'
	},{
		xtype:'datefield',labelWidth:55,fieldLabel: '截止时间', format:'Y-m-d',id: 'sup_endDate'
	},{
		iconCls: 'user-find',text : '查询',
		handler: function (){
				var startDate = new Date(Ext.getCmp('sup_startDate').getValue());
				var endDate = new Date(Ext.getCmp('sup_endDate').getValue());
				
				//alert(startDate.getTime());
				//alert(endDate.getTime());
				
				superviseStore.clearFilter();
				superviseStore.load();

				if(startDate!=''&&endDate!='')
				{
//					superviseStore.filterBy(function(record) {
//						
//						 var temp = new Date(record.get('superviseDate')).getTime();
//						 //alert(temp);
//	                     return temp<= endDate.getTime() && temp>=startDate.getTime(); 
//	                  });
					//alert(superviseStore.data.getCount());
					//for (var i = 0; i < superviseStore.getCount(); i++)
					var i = 0;
					while(i< superviseStore.getCount()){
							var record = superviseStore.getAt(i);
							var temp = new Date(record.get('superviseDate')).getTime();
							
							if(temp>= endDate.getTime() || temp<=startDate.getTime())
							{	
								//alert(temp);
								superviseStore.remove(record);
							}
							else{
								i++;
							}
					}
					
				}
			}

	},{
		xtype : 'tbseparator'
	},{
		xtype:'button',
		text : '->登录监督综合平台',
		handler: function (){
		 	window.open('http://10.141.221.17:7777/zhyy');
		}
	}];
	
	var pagingBbar = new Ext.PagingToolbar
	({
	      emptyMsg:"没有数据",
	      displayInfo:true,
	      displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
	      store:superviseStore
	      
	 });
	
	superviseGrid = Ext.create('Ext.grid.Panel',{
		tbar : hosBar,
		bbar:pagingBbar,
		width : '100%',
		height: '100%',
		frame : true,
		viewConfig:{
			forceFit : true,
			stripeRows : true
		},
		store : superviseStore, 
		columns :superviseCol
	});
	superviseGrid.addListener('itemclick',superviseGridClick);
	return superviseGrid;
}

function superviseGridClick(){
		map.graphics.clear();
		hosGry.clear();
		superGry.clear();
		pointGry.clear();
		endLayer.clear();
		startLayer.clear();
		glayer.clear();
		
	var record = superviseGrid.getSelectionModel().getSelection();	
	Ext.Ajax.request({
	    url: 'hos/getHosByName.html?name='+ record[0].get('hosName'),
	    success: function(response){
			var text = Ext.JSON.decode(response.responseText);
	        
	        var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
	  	  	var pt = new esri.geometry.Point(text[0].coors_x,text[0].coors_y,map.spatialReference);
	  	  	var graphic = new esri.Graphic(pt,symbol,null,null);
	  	  	graphic.setAttributes({"hosX":text[0].coors_x,"hosY":text[0].coors_y,"hosValue": text[0].name,"hosAdd": text[0].address,"users:":record[0].get('superviseUsers'),"date:":record[0].get('superviseDate'),"result:":record[0].get('superviseResult')});
//	  	  	hosGry.add(graphic);
	  	  	superGry.add(graphic);
	  	  	map.setLevel(6);
	  	  	map.centerAt(pt); 
		  
	  	  	superX = text[0].coors_x;
	  	  	superY = text[0].coors_y;
	  	    superWin.hide();
	  	    
//	  	  	hosX = text[0].coors_x;
//	  	  	hosY = text[0].coors_y;
//	  	    hosWin.hide();
	    }
	});
//	  hosGry.add(graphic);		  
//      map.setLevel(7);
//      map.centerAt(pt); 
//	  
//	  hosX = x;
//	  hosY = y;
//	  hosWin.hide();
}

