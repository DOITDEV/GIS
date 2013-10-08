/*
 * ! Ext JS Library 4.0 Copyright(c) 2006-2011 Sencha Inc. licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.rentinfo.ThirdRent', {
	extend : 'Ext.ux.desktop.Module',
	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer', 'Ext.from.*'],

	id : 'third-rent',

	init : function() {
		this.launcher = {
			text : '第三方租赁信息',
			iconCls : 'icon-grid'
		};
	},

	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('third-rent');
		if (!win) {

			var rentstore = new Ext.data.JsonStore({
						autoLoad : true,
						fields : [{
									name : 'lanBlock'
								}, {
									name : 'cityArea'
								}, {
									name : 'address'
								}, {
									name : 'landSize'
								}, {
									name : 'roomSize'
								}, {
									name : 'nonOcc'
								}, {
									name : 'id'
								}],
								//设置分页大小  
						    pageSize:15,  
						    proxy: {  
						        type: 'ajax',  
						        url: '../rent/getAllThirdRents.html',
						        reader: {  
						            //数据格式为json  
						            type: 'json',  
						            root: 'rent',  
						            //获取数据总数  
						            totalProperty: 'totalCount'  
						        }  
						    }
					});
				var pagingToolbar = new Ext.PagingToolbar({
				      emptyMsg:"没有数据",
				      displayInfo:true,
				      displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
				      store:rentstore
				      //pageSize:10 
				 });

			win = desktop.createWindow({
				id : 'third-rent',
				title : '第三方租赁',
				width : 740,
				height : 520,
				iconCls : 'icon-grid',
				animCollapse : false,
				constrainHeader : true,
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'grid',
					bbar:pagingToolbar,
					store : rentstore,
					columns : [new Ext.grid.RowNumberer(), {
								text : "地块",
								width : 70,
								sortable : true,
								dataIndex : 'lanBlock'
							}, {
								text : "所在区域",
								width : 70,
								sortable : true,
								dataIndex : 'cityArea'
							}, {
								text : "租赁地址",
								width : 70,
								sortable : true,
								dataIndex : 'address'
							}, {
								text : "土地面积",
								width : 70,
								sortable : true,
								dataIndex : 'landSize'
							}, {
								text : "房屋面积",
								width : 70,
								sortable : true,
								dataIndex : 'roomSize'
							}, {
								text : "空置面积",
								width : 70,
								sortable : true,
								dataIndex : 'nonOcc'
							}],
					listeners : {
						itemdblclick : function(g, rec) {
							if (!g.ownerCt.nextSibling().isHidden()) {
								g.ownerCt.nextSibling().getForm()
										.loadRecord(rec);
							}
						}
					}
				}, {
					region : 'south',
					frame : true,
					hidden : true,
					bodyPaddind : 5,
					xtype : 'form',
					fieldDefaults : {
						labelAlign : 'right',
						labelWidth : 90,
						anchor : '100%'
					},
					layout : {
						type : 'table',
						columns : 3
					},
					items : [{
								xtype : 'hiddenfield',
								name : 'id'
							}, {
								xtype : 'textfield',
								name : 'lanBlock',
								fieldLabel : '地块'
							}, {
								xtype : 'textfield',
								name : 'cityArea',
								fieldLabel : '所在区域'
							}, {
								xtype : 'textfield',
								name : 'address',
								fieldLabel : '租赁地址'
							},{
								xtype : 'textfield',
								name : 'landSize',
								fieldLabel : '土地面积'
							}, {
								xtype : 'textfield',
								name : 'roomSize',
								fieldLabel : '房屋面积'
							}, {
								xtype : 'textfield',
								name : 'nonOcc',
								fieldLabel : '空置面积'
							}],
					buttons : [{
						text : '确定',
						handler : function() {
								var win = this.findParentByType('window'), form = win
										.child('form'), grid = win
										.child('grid');

								if (form.getForm().isValid()) {
									form.submit({
										url : '../rent/updateThirdRent.html',
										method : 'POST',
										success : function(form, action) {
											Ext.Msg.alert('提示', '保存成功!');
											rentstore.reload();
										},
										callback : function(){
											console.debug(arguments);
										}
									});
								}
							}
					}, {
						text : '重置',
						handler : function() {
							this.ownerCt.ownerCt.getForm().reset();
						}
					}]
				}],
				tbar : [{
							text : '新增',
							tooltip : '添加一个出租方',
							iconCls : 'add',
							handler : function() {
								var winForm = win.items.get(1);
								winForm.getForm().reset();
								if (winForm.isHidden()) {
									winForm.show();
								} else {
									winForm.hide();
								}
							}
						}, '-', {
							text : '修改',
							tooltip : '修改',
							iconCls : 'option',
							handler : function() {
								var selected = win.items.get(0)
										.getSelectionModel().getLastSelected();
								if (selected) {
									var winForm = win.items.get(1);
									if (winForm.isHidden()) {
										winForm.show();
										winForm.getForm().loadRecord(selected);
									} else {
										winForm.hide();
									}
								} else {
									Ext.Msg.alert('提示', '请选择一条需要修改的出租方信息');
								}
							}
						}, '-', {
							text : '删除',
							tooltip : '删除',
							iconCls : 'remove',
							handler : function() {
								var selected = win.items.get(0)
										.getSelectionModel().getLastSelected();

								if (selected) {
									Ext.MessageBox.confirm('警告', '确认删除该条信息？',function callBack(id) {
										if (id == 'yes') {
											var record = rentstore.getAt('0');
											Ext.Ajax.request({
												url : '../rent/deleteThirdRent.html',
												method : 'POST',
												params : {
													id : selected.get('id')
												},
												success : function(res, opts) {
													Ext.MessageBox.alert('恭喜',
															'删除成功！');
													rentstore.reload();
												},
												failure : function(res, opts) {
													Ext.MessageBox.alert(
															"删除失败",
															"请查看网络连接是否正常！");
												},
												scope : this
											});
										}
									});
								} else {
									Ext.Msg.alert('提示', '请选择一条需要删除的出租方信息');
								}

							}
						}]
			});
		}
		return win;
	}
});