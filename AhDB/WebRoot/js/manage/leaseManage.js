	 
var addLeaWin;
//var addLeaForm;
function getLeasmanage()
{
	var leasPanel = new Ext.Panel({
        split: true,
        title: '房屋租赁信息管理',
        layout: 'fit',
        items:[getLeasGrid()]
	});
	return leasPanel;
}

/**
 * 租赁管理面板
 */
function getLeasGrid()
{
	var jsonStore = new Ext.data.Store({
	    autoSync : true,
	    proxy: {
	        type: 'ajax',
	        url: 'Config/getLeaConConfig.html' 
	    },
	    fields: ['lanBlock','codNum','address','roomSize','nonOcc','landSize','leaholder','propertys'
	    ,'timLimit','startDate', 'endDate','monRent','yerRent','payType','handsel','penalty','tel','linker',
	    'incExplain','remark','nextPayDate','idCard','busLicense','orgCode','rentStatus','outDays','holdType',
	    'coors_x','coors_y']
	});
	jsonStore.load();
	
	//创建用户数据模型
	 Ext.define('leasModel', {
	     extend: 'Ext.data.Model',
	     fields: [{name:'id'},{name:'lanBlock'},{name:'codNum'},{name:'address'},{name:'roomSize'},{name:'nonOcc'},{name:'landSize'},{name:'leaholder'},{name:'propertys'}
	    ,{name:'timLimit'},{name:'startDate'}, {name:'endDate'},{name:'monRent'},{name:'yerRent'},{name:'payType'},{name:'handsel'},{name:'penalty'},{name:'tel'},{name:'linker'},
	    {name:'incExplain'},{name:'remark'},{name:'nextPayDate'},{name:'idCard'},{name:'busLicense'},{name:'orgCode'},{name:'rentStatus'},{name:'outDays'},{name:'holdType'},
	   {name: 'coors_x'},{name:'coors_y'}]
	 });

	var leasStore = Ext.create('Ext.data.Store',{
		autoLoad : true,
		model: 'leasModel',
		//设置分页大小  
	    pageSize:15,  
	    proxy: {  
	        type: 'ajax',  
	        url: 'leas/getAllLeasC.html',
	        reader: {  
	            //数据格式为json  
	            type: 'json',  
	            root: 'leas',  
	            //获取数据总数  
	            totalProperty: 'totalCount'  
	        }  
	    }
	});
	var pagingToolbar = new Ext.PagingToolbar
	({
	      emptyMsg:"没有数据",
	      displayInfo:true,
	      displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
	      store:leasStore
	      //pageSize:10 
	 });
	var leaCol = [
	      Ext.create('Ext.grid.RowNumberer',{text: '行号',width:35}),
	     {header :'地块',dataIndex:'lanBlock', sortable:true},
	     {header :'租赁地址',dataIndex:'address', sortable:true},
	     {header :'房屋(m²)',dataIndex:'roomSize', sortable:true},
	     {header :'土地(m²)',dataIndex:'landSize', sortable:true},
	     {header :'承租人',dataIndex:'leaholder', sortable:true},
	     {header :'产权',dataIndex:'propertys', sortable:true},
	     {header :'期限',dataIndex:'timLimit', sortable:true},
	     {header :'租赁起始日期',dataIndex:'startDate', sortable:true},
	     {header :'租赁结束日期',dataIndex:'endDate', sortable:true},
	     {header :'月租金',dataIndex:'monRent', sortable:true},
	     {header :'年租金',dataIndex:'yerRent', sortable:true}
	     //{header :'坐标-经度',width: 120, dataIndex:'coors_x', sortable:true},
	     //{header :'坐标-纬度',width: 120, dataIndex:'coors_y', sortable:true}
	];
	var leaBar =  [{
		xtype:'textfield',id: 'find_leasValue'
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'user-add',text : '新增',
		handler: function () {
			hosUrl = 'leas/addLeaContract.html';
//			addLeaForm.form.reset();
//			addLeaWin=new Ext.Window();
//			addLeaWin.show();
			
			Ext.create('Ext.window.Window', {
		        title: '新增租赁信息',
		        width: 900,
		        height:340,
		        layout: 'fit',
		        plain: true,
		        items:[{
		        
		        	xtype : 'form',
		        	layout : 'column',
		        	defaults : {
		        		xtype : 'textfield',
		        		column : .3
		        	
		        	},
		        	items : [{
		        		fieldLabel : '地块'
		        		
		        	},{
		        		fieldLabel : '租赁地址'
		        	},{
		        		fieldLabel : '房屋(m²)'
		        	},{
		        		fieldLabel : '土地(m²)'
		        	},{
		        		fieldLabel : '承租人'
		        	},{
		        		fieldLabel : '产权'
		        	},{
		        		fieldLabel : '期限'
		        	},{
		        		fieldLabel : '租赁起始日期'
		        	},{
		        		fieldLabel : '租赁结束日期'
		        	},{
		        		fieldLabel : '月租金'
		        	},{
		        		fieldLabel : '年租金'
		        	},{
		        		fieldLabel : '递增说明'
		        	},{
		        		fieldLabel : '备注'
		        	}]
		        }],
		        buttons: [{
		            text: '拾取坐标',
					handler: function(){
						mapClick = 1;
					}
		        },{
		            text: '提交',
		            handler:function(){}
		        },{
		            text: '取消',
					handler: function () {
						addLeaWin.hide();
			         }
		        }]
		    }).show();
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
					var record = leaGrid.getSelectionModel().getSelection();	
					Ext.Ajax.request({
				         url: 'leas/deleteLeasC.html',
				         method:'get',
				         params:{id:record[0].get('id')},
				         success: function(res, opts){
				        	 Ext.MessageBox.alert('恭喜','删除成功！');
				        	 leaGrid.store.load();
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
	
			hosUrl = 'leas/updateLeasC.html';
			var record = leaGrid.getSelectionModel().getSelection();	
			if(record.length==0){
				Ext.MessageBox.alert("提示","请选择一条用户记录！");
			}else{
				Ext.getCmp('id').setValue(record[0].get('id'));
				Ext.getCmp('lanBlock').setValue(record[0].get('lanBlock'));
				Ext.getCmp('address').setValue(record[0].get('address'));
				Ext.getCmp('roomSize').setValue(record[0].get('roomSize'));
				Ext.getCmp('nonOcc').setValue(record[0].get('nonOcc'));
				Ext.getCmp('landSize').setValue(record[0].get('landSize'));
				Ext.getCmp('leaholder').setValue(record[0].get('leaholder'));
				Ext.getCmp('propertys').setValue(record[0].get('propertys'));
				Ext.getCmp('idCard').setValue(record[0].get('idCard'));
				Ext.getCmp('busLicense').setValue(record[0].get('busLicense'));
				Ext.getCmp('orgCode').setValue(record[0].get('orgCode'));
				Ext.getCmp('timLimit').setValue(record[0].get('timLimit'));
				Ext.getCmp('startDate').setValue(record[0].get('startDate'));
				Ext.getCmp('endDate').setValue(record[0].get('endDate'));
				Ext.getCmp('monRent').setValue(record[0].get('monRent'));
				Ext.getCmp('yerRent').setValue(record[0].get('yerRent'));
				Ext.getCmp('payType').setValue(record[0].get('payType'));
				Ext.getCmp('handsel').setValue(record[0].get('handsel'));
				Ext.getCmp('penalty').setValue(record[0].get('penalty'));
				Ext.getCmp('tel').setValue(record[0].get('tel'));
				Ext.getCmp('linker').setValue(record[0].get('linker'));
				Ext.getCmp('incExplain').setValue(record[0].get('incExplain'));
				Ext.getCmp('remark').setValue(record[0].get('remark'));
				Ext.getCmp('coorsLea').setValue("x:"+record[0].get('coors_x')+",y:"+record[0].get('coors_y'));
				addLeaWin.show(); 
			}
		}
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'set_buffer',text : '授权可见',
		handler: function () {
			//alert(jsonStore.getAt(0).get('lanBlock'));
			
		    
			if(jsonStore.getAt(0).get('lanBlock')==='1')
			{
				Ext.getCmp('ch_lea_lanBlock').setValue('true');
			}
			
//			else{
//				Ext.getCmp('ch_hos_name').setValue('false');
//			}
			if(jsonStore.getAt(0).get('address')==='1')
			{
				Ext.getCmp('ch_lea_address').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_address').setValue('false');
//			}
			 	
			 		
			if(jsonStore.getAt(0).get('roomSize')==='1')
			{
				Ext.getCmp('ch_lea_roomSize').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_lever').setValue('false');
//			}
			 
			if(jsonStore.getAt(0).get('nonOcc')===1)
			{
				Ext.getCmp('ch_lea_nonOcc').setValue('true');
			}
//			else
//			{
//				Ext.getCmp('ch_hos_docnum').setValue('false');
//			}
			 
			if(jsonStore.getAt(0).get('landSize')==='1')
			{
				Ext.getCmp('ch_lea_landSize').setValue('true');
			}
//			else
//			{
//				Ext.getCmp('ch_hos_phonenum').setValue('false');
//			}
			
			if(jsonStore.getAt(0).get('leaholder')===1)
			{
				Ext.getCmp('ch_lea_leaholder').setValue('true');
			}
//			else{
//				Ext.getCmp('ch_hos_nursnum').setValue('false');
//			}
			if(jsonStore.getAt(0).get('propertys')==='1')
			{
				Ext.getCmp('ch_lea_propertys').setValue('true');
			}
			
			if(jsonStore.getAt(0).get('timLimit')==='1')
			{
				Ext.getCmp('ch_lea_timLimit').setValue('true');
			}
			if(jsonStore.getAt(0).get('startDate')==='1')
			{
				Ext.getCmp('ch_lea_startDate').setValue('true');
			}
			if(jsonStore.getAt(0).get('endDate')==='1')
			{
				Ext.getCmp('ch_lea_endDate').setValue('true');
			}
			if(jsonStore.getAt(0).get('monRent')==='1')
			{
				Ext.getCmp('ch_lea_monRent').setValue('true');
			}
			if(jsonStore.getAt(0).get('yerRent')==='1')
			{
				Ext.getCmp('ch_lea_yerRent').setValue('true');
			}
			if(jsonStore.getAt(0).get('payType')==='1')
			{
				Ext.getCmp('ch_lea_payType').setValue('true');
			}
			if(jsonStore.getAt(0).get('handsel')==='1')
			{
				Ext.getCmp('ch_lea_handsel').setValue('true');
			}
			if(jsonStore.getAt(0).get('penalty')==='1')
			{
				Ext.getCmp('ch_lea_penalty').setValue('true');
			}
			if(jsonStore.getAt(0).get('tel')==='1')
			{
				Ext.getCmp('ch_lea_tel').setValue('true');
			}
			if(jsonStore.getAt(0).get('linker')==='1')
			{
				Ext.getCmp('ch_lea_linker').setValue('true');
			}
			if(jsonStore.getAt(0).get('incExplain')==='1')
			{
				Ext.getCmp('ch_lea_incExplain').setValue('true');
			}
			if(jsonStore.getAt(0).get('remark')==='1')
			{
				Ext.getCmp('ch_lea_remark').setValue('true');
			}
			authorizeLeaWin.show();
		}
		
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'set_buffer',
		text : '数据导入',
		handler: function () {
			//Ext.Msg.alert("数据导入！");
			winFielUpload.stroe=leasStore;
			winFielUpload.show();
		}
	},{
		xtype : 'tbseparator'
	},{
		iconCls: 'set_buffer',
		text : '数据导出',
		handler: function () {
			import_resuslt.submit();
			// window.location.href = 'leas/exportExcel.html';  
//			Ext.Ajax.request({
//				         url: 'imp/exportExcel.html',
//				         method:'POST',
//				         
//				         success: function(res, opts){
//				           Ext.MessageBox.alert("提示","导出成功！"); 
//				         },
//				         failure: function(res, opts){
//				           Ext.MessageBox.alert("提示","导出失败！");
//				         }
////				         scope:this
//				        });
//			hosUrl = 'leaCont/exportExcel.html';
//			getExportButton();
		}
	}];
	/*function getExportButton(){
		Ext.MessageBox.alert("提示","导出成功！"); 
		var expButton=new Ext.Button({
			renderTo: "div1",
	        text: "数据导出",
	        handler: function () {
	            Ext.Ajax.request({
	                url: 'leas/exportExce.html',
	                method: 'post',
	                success: function(res, opts){
				           Ext.MessageBox.alert("提示","导出成功！"); 
			         },
			         failure: function(res, opts){
			           Ext.MessageBox.alert("提示","导出失败！");
			         }
	            });
	        },
	        id: "bt1"
	    });
	}*/
	leaGrid = Ext.create('Ext.grid.Panel',{
		tbar : leaBar,
		width : '100%',
		height: '100%',
		frame : true,
		bbar:pagingToolbar,
		viewConfig:{
			forceFit : true
			//stripeRows : true
		},
		store : leasStore, 
		columns :leaCol
	});
	leaGrid.addListener('itemclick',leaGridClick);
	return leaGrid;
}

function leaGridClick(){
	  
	map.graphics.clear();
		hosGry.clear();
		superGry.clear();
		pointGry.clear();
		endLayer.clear();
		startLayer.clear();
		glayer.clear();
		
//	  hosWin.hide();
	  
	  var record = leaGrid.getSelectionModel().getSelection();	
	  hosDetailRec = record;
	  var x = record[0].get('coors_x');
	  var y = record[0].get('coors_y');
	  var point = new esri.geometry.Point([x, y], new  esri.SpatialReference({ wkid: 4326 }));//new NLatLng(x,y);  

	  hosX = x;
	  hosY = y;
	  
	  hosValue = record[0].get('lanBlock');
	   

	  var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/end.png', 30, 30);
	  var pt = new esri.geometry.Point(x,y,map.spatialReference);
	  var graphic = new esri.Graphic(pt,symbol,null,null);
	  graphic.setAttributes({"hosX":x,"hosY":y,"hosValue": record[0].get('lanBlock'),"hosAdd": record[0].get('address')});
    
	  hosGry.add(graphic);		  
      map.setLevel(6);
      map.centerAt(pt); 
	  
	  hosX = x;
	  hosY = y;
//	  hosWin.hide();
}
/*
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
			,{
	            xtype: 'textarea',
	            hideLabel: true,
	            name: 'msg',
	            anchor: '100% -47'  // anchor width by percentage and height by raw adjustment
	        }
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
				           addLeaWin.hide()
				           Ext.MessageBox.alert("提示",res.responseText);
				           userGrid.store.load();
				         },
				         failure: function(res, opts){
				        	 addLeaWin.hide();
				        	 Ext.MessageBox.alert("新增失败","请查看网络连接是否正常！");
				         },
				         jsonData:{name:hosName,corporation:hosMan,phoneNum:phoneNum,docNum:docNum,nursNum:nursNum,lever:hosLever,address:hosAddress,coors_x:coors_x,coors_y:coors_y},
				         scope:this
			        });
					addLeaWin.hide();
	        	}
	        },{
	            text: '取消',
				handler: function () {
					addLeaWin.hide();
		         }
	        }]
	    });
	return updateHosWin;
}


*/
 
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

//    addLeaWin = 
