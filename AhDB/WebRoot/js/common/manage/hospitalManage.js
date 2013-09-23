
function getHosmanage()
{
	var hosPanel = new Ext.Panel({
        split: true,
        title: '医疗机构信息管理',
        layout: 'fit',
        items:[getHosGrid()]
	});
	return hosPanel;
}

/**
 * 医疗机构管理面板
 */
function getHosGrid()
{
	var jsonStore = new Ext.data.Store({
	    autoSync : true,
	    proxy: {
	        type: 'ajax',
	        url: 'Config/getWmtsConfig.html' 
	    },
	    fields: ['name','address','lever','docNum','nursNum','phoneNum','corporation','coors_x','coors_y']
	});
	jsonStore.load();
	
	//创建用户数据模型
	 Ext.define('hosModel', {
	     extend: 'Ext.data.Model',
	     fields: [
	  	        {name:'name'},
		        {name:'address'},
		        {name:'lever'},  
		        {name:'docNum'},
		        {name:'nursNum'},
		        {name:'phoneNum'},
		        {name:'corporation'},
		        {name:'coors_x'},
		        {name:'coors_y'},
		        {name:'kemu'}
	     ]
	 });

	var hosStore = Ext.create('Ext.data.Store',{
		autoLoad : true,
		model: 'hosModel',
//		proxy:{
//			type:'ajax',
//			url: 'hos/getAllHos.html',
//			reader:{
//				type : 'json'
//			}
//		}
		//设置分页大小  
	    pageSize:15,  
	    proxy: {  
	        type: 'ajax',  
	        url: 'hos/getAllHos.html',
	        reader: {  
	            //数据格式为json  
	            type: 'json',  
	            root: 'hos',  
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
	      store:hosStore 
	      //pageSize:10
	 });
	var hosCol = [
	      Ext.create('Ext.grid.RowNumberer',{text: '行号'}),
	     {header :'医院名称',dataIndex:'name', sortable:true},
	     {header :'医院等级',dataIndex:'lever', sortable:true},
	     {header :'医院地址',dataIndex:'address', sortable:true},
	     {header :'医生数目',dataIndex:'docNum', sortable:true},
	     {header :'护士数目',dataIndex:'nursNum', sortable:true},
	     {header :'联系方式',dataIndex:'phoneNum', sortable:true},
	     {header :'科目',dataIndex:'kemu', sortable:true},
	     {header :'医院法人',dataIndex:'corporation', sortable:true}
	     //{header :'坐标-经度',width: 120, dataIndex:'coors_x', sortable:true},
	     //{header :'坐标-纬度',width: 120, dataIndex:'coors_y', sortable:true}
	];
	var hosBar =  [{
		xtype:'textfield',id: 'find_HosValue'
	},{
		iconCls: 'user-find',text : '查询',
		handler: function (){
			if(Ext.getCmp('find_HosValue').getValue()!='')
			{
				//alert(Ext.getCmp('find_HosValue').getValue());
				hosStore.clearFilter();
				hosStore.load();
				//filterBy
				hosStore.filter('name', Ext.getCmp('find_HosValue').getValue());
			}
			else
			{
				//alert('dd');
				hosStore.clearFilter();
				hosStore.load();
			}
		}
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'user-add',text : '新增',
		handler: function () {
			hosUrl = 'hos/addHos.html';
			addHosForm.form.reset();
			addHosWin.show();
        }
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'user-delete',
		text : '删除',
		handler: function () {
			Ext.MessageBox.confirm('警告','确认删除该条信息？',callBack);
			function callBack(id){
				if(id=='yes')
				{
					var record = hosGrid.getSelectionModel().getSelection();	
					Ext.Ajax.request({
				         url: 'hos/deleteHos.html',
				         method:'get',
				         params:{hosName:record[0].get('name')},
				         success: function(res, opts){
				        	 Ext.MessageBox.alert('恭喜','删除成功！');
				        	 hosGrid.store.load();
				         },
				         failure: function(res, opts){
				        	 Ext.MessageBox.alert("删除失败","请查看网络连接是否正常！");
				         },
				         scope:this
				        });
				}
			}
        }
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'user-update',text : '修改',
		handler: function () {
	
			hosUrl = 'hos/updateHos.html';
			var record = hosGrid.getSelectionModel().getSelection();	
			if(record.length==0){
				Ext.MessageBox.alert("提示","请选择一条用户记录！")
			}
			else{
				Ext.getCmp('hosName').setValue(record[0].get('name'));
				Ext.getCmp('hosName').disabled = true;
				Ext.getCmp('hosMan').setValue(record[0].get('name'));
				Ext.getCmp('phoneNum').setValue(record[0].get('phoneNum'));
				Ext.getCmp('docNum').setValue(record[0].get('docNum'));
				Ext.getCmp('nursNum').setValue(record[0].get('nursNum'));
				Ext.getCmp('hosLever').setValue(record[0].get('lever'));
				Ext.getCmp('hosAddress').setValue(record[0].get('address'));
				Ext.getCmp('coorsHos').setValue("x:"+record[0].get('coors_x')+",y:"+record[0].get('coors_y'));
				addHosWin.show(); 
			}
		}
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'set_buffer',text : '授权可见',
		handler: function () {
			//alert(jsonStore.getAt(0).get('name'));
		    
			if(jsonStore.getAt(0).get('name')==='1')
			{
				Ext.getCmp('ch_hos_name').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_name').setValue('false');
//			}
			 
			if(jsonStore.getAt(0).get('address')==='1')
			{
				Ext.getCmp('ch_hos_address').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_address').setValue('false');
//			}
			 	
			 		
			if(jsonStore.getAt(0).get('lever')==='1')
			{
				Ext.getCmp('ch_hos_lever').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_lever').setValue('false');
//			}
			 
			if(jsonStore.getAt(0).get('docNum')===1)
			{
				Ext.getCmp('ch_hos_docnum').setValue('true');
			}
//			else
//			{
//				Ext.getCmp('ch_hos_docnum').setValue('false');
//			}
			 
			if(jsonStore.getAt(0).get('phoneNum')==='1')
			{
				Ext.getCmp('ch_hos_phonenum').setValue('true');
			}
//			else
//			{
//				Ext.getCmp('ch_hos_phonenum').setValue('false');
//			}
			
			if(jsonStore.getAt(0).get('nursNum')===1)
			{
				Ext.getCmp('ch_hos_nursnum').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_nursnum').setValue('false');
//			}
			if(jsonStore.getAt(0).get('corporation')==='1')
			{
				Ext.getCmp('ch_hos_man').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_man').setValue('false');
//			}
			if(jsonStore.getAt(0).get('coors_x')==='1')
			{
				
			}
			 
			if(jsonStore.getAt(0).get('coors_y')==='1')
			{
				
			}
			 
			authorizeWin.show();
		}
		
	}];

	hosGrid = Ext.create('Ext.grid.Panel',{
		tbar : hosBar,
		width : '100%',
		height: '100%',
		frame : true,
		bbar:pagingToolbar,
		viewConfig:{
			forceFit : true
			//stripeRows : true
		},
		store : hosStore, 
		columns :hosCol
	});
	hosGrid.addListener('itemclick',hosGridClick);
	return hosGrid;
}

function hosGridClick(){
	  
	map.graphics.clear();
		hosGry.clear();
		superGry.clear();
		pointGry.clear();
		endLayer.clear();
		startLayer.clear();
		glayer.clear();
		
	  hosWin.hide();
	  
	  var record = hosGrid.getSelectionModel().getSelection();	
	  hosDetailRec = record;
	  var x = record[0].get('coors_x');
	  var y = record[0].get('coors_y');
	  var point = new esri.geometry.Point([x, y], new  esri.SpatialReference({ wkid: 4326 }));//new NLatLng(x,y);  

	  hosX = x;
	  hosY = y;
	  
	  hosValue = record[0].get('name');
	   

	  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/hospitals.png', 30, 30);
	  var pt = new esri.geometry.Point(x,y,map.spatialReference);
	  var graphic = new esri.Graphic(pt,symbol,null,null);
	  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('name'),"hosAdd": record[0].get('address')});
    
	  hosGry.add(graphic);		  
      map.setLevel(6);
      map.centerAt(pt); 
	  
	  hosX = x;
	  hosY = y;
	  hosWin.hide();
}

function updateHos(record)
{
	var userName = record[0].get('name');
	var passWord = record[0].get('password');
	var depart = record[0].get('depart');
	
	var hosForm = Ext.create('Ext.form.Panel', {
	        border: false,
	        margin: '5,5,5,5',
	        //style:'margin-left:5px;margin-top:5px',
	        fieldDefaults: {
	            labelWidth: 55
	        },
	        defaultType: 'textfield',
	        bodyPadding: 5,
	        items: [{
	            fieldLabel: '医院名称',
	            id: 'hosName',
	            anchor:'70%'
	        },{
	            fieldLabel: '医院级别',
	            id: 'hosLever',
	            anchor:'70%'
	        },{
	            fieldLabel: '医院法人',
	            id: 'hosMan',
	            anchor:'70%'
	        },{
	            fieldLabel: '医生数目',
	            id: 'docNum',
	            anchor:'70%'
	        },{
	            fieldLabel: '护士数目',
	            id: 'nursNum',
	            anchor:'70%'
	        },{
	            fieldLabel: '医院地址',
	            id: 'hosAddress',
	            anchor: '70%'
	        },{
	            fieldLabel: '联系方式',
	            id: 'phoneNum',
	            anchor: '70%'
	        },{
	            fieldLabel: '坐标位置',
	            id: 'coorsHos',
	            anchor: '70%'
	        }
			/*,{
	            xtype: 'textarea',
	            hideLabel: true,
	            name: 'msg',
	            anchor: '100% -47'  // anchor width by percentage and height by raw adjustment
	        }*/
			]
	    });

	    updateHosWin = Ext.create('Ext.window.Window', {
	        title: '修改该条信息',
	        width: 400,
	        height:340,
	        minWidth: 300,
	        minHeight: 200,
	        layout: 'fit',
	        plain: true,
			closeAction: 'hide',
	        items: addHosForm,
	        buttons: [{
	            text: '拾取坐标',
				handler: function(){
					mapClick = 1;
				}
	        },{
	            text: '提交',
	            handler:function(){
	        		
	        		//alert("ddd");
	        		var hosName = Ext.getCmp('hosName').getValue();
					var hosMan = Ext.getCmp('hosMan').value;
					var phoneNum = Ext.getCmp('phoneNum').value;
					var docNum = Ext.getCmp('docNum').value;
					var nursNum = Ext.getCmp('nursNum').value;
					var hosLever = Ext.getCmp('hosLever').value;
					var hosAddress = Ext.getCmp('hosAddress').value;
					var coorsHos = Ext.getCmp('coorsHos').value;
					var coorsArray = coorsHos.split(",");
					var coors_xArr = coorsArray[0].split(":");
					var coors_yArr = coorsArray[1].split(":");
					
					var coors_x = coors_xArr[1];
					var coors_y = coors_yArr[1];
					 
					ch = name.split(",");
					Ext.Ajax.request({
				         url: hosUrl,
				         method:'POST',
				         headers:{
				            'Content-Type': 'application/json; charset=utf-8'
				         },
				         success: function(res, opts){
				           addHosWin.hide()
				           Ext.MessageBox.alert("提示",res.responseText);
				           userGrid.store.load();
				         },
				         failure: function(res, opts){
				        	 addHosWin.hide();
				        	 Ext.MessageBox.alert("新增失败","请查看网络连接是否正常！");
				         },
				         jsonData:{name:hosName,corporation:hosMan,phoneNum:phoneNum,docNum:docNum,nursNum:nursNum,lever:hosLever,address:hosAddress,coors_x:coors_x,coors_y:coors_y},
				         scope:this
			        });
					addHosWin.hide();
	        	}
	        },{
	            text: '取消',
				handler: function () {
					addHosWin.hide();
		         }
	        }]
	    });
	return updateHosWin;
}


