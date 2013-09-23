/*
 * ! Ext JS Library 4.0 Copyright(c) 2006-2011 Sencha Inc. licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.rentinfo.Rent', {
	extend : 'Ext.ux.desktop.Module',
	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer', 'Ext.from.*'],

	id : 'grid-win-rent',

	init : function() {
		this.launcher = {
			text : '出租方信息',
			iconCls : 'icon-grid'
		};
	},

	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('grid-win-rent');
		if (!win) {

			var rentstore = new Ext.data.JsonStore({
						autoLoad : true,
						proxy : {
							type : 'ajax',
							api : {
								create : '/AhDB/rent/addRent.html',
								read : '/AhDB/rent/getAllRents.html',
								update : '/AhDB/rent/updateRent.html',
								destroy : '/AhDB/rent/deleteRent.html'
							},
							reader : {
								type : 'json',
								root : 'rent',
								idProperty : 'id'
							}
						},
						fields : [{
									name : 'lanBlock'
								}, {
									name : 'cityArea'
								}, {
									name : 'address'
								}, {
									name : 'propertys'
								}, {
									name : 'propertyNo'
								}, {
									name : 'landSize'
								}, {
									name : 'roomSize'
								}, {
									name : 'nonOcc'
								}, {
									name : 'geoLocation'
								}, {
									name : 'realDisplay'
								}, {
									name : 'isRent'
								}, {
									name : 'isRentName'
								}, {
									name : 'id'
								}, {
									name : 'coors_x'
								}, {
									name : 'coors_y'
								}]
					});

			win = desktop.createWindow({
				id : 'grid-win-rent',
				title : '出租方',
				width : 740,
				height : 480,
				iconCls : 'icon-grid',
				animCollapse : false,
				constrainHeader : true,
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'grid',
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
								text : "产权",
								width : 70,
								sortable : true,
								dataIndex : 'propertys'
							}, {
								text : "产权证号",
								width : 70,
								sortable : true,
								dataIndex : 'propertyNo'
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
							}, {
								text : "地理位置",
								width : 70,
								sortable : true,
								dataIndex : 'geoLocation'
							}, {
								text : "实景",
								width : 70,
								sortable : true,
								dataIndex : 'realDisplay'
							}, {
								text : "是否出租",
								width : 70,
								sortable : true,
								dataIndex : 'isRentName'
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
						labelAlign : 'left',
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
							}, {
								xtype : 'textfield',
								name : 'propertys',
								fieldLabel : '产权'
							}, {
								xtype : 'textfield',
								name : 'propertyNo',
								fieldLabel : '产权证号'
							}, {
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
							}, {
								xtype : 'textfield',
								name : 'geoLocation',
								fieldLabel : '地理位置'
							}/*, {
								xtype : 'filefield',
								name : 'realDisplay',
								fieldLabel : '实景'
							}*/],
					buttons : [{
						text : '确定',
						handler : function() {
								var win = this.findParentByType('window'), form = win
										.child('form'), grid = win
										.child('grid');

								if (form.getForm().isValid()) {
									form.submit({
										url : '../rent/updateRent.html',
										method : 'POST',
										success : function(form, action) {
											Ext.Msg.alert('提示', '保存成功!');
											rentstore.reload();
										},
										callback : function(){
											console.debug(arguments)
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
												url : '/AhDB/rent/deleteRent.html',
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
	},

	statics : {}
});