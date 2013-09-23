/*
 * ! Ext JS Library 4.0 Copyright(c) 2006-2011 Sencha Inc. licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.leas.LesseeGridWindow', {
	extend : 'Ext.ux.desktop.Module',
	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer', 'Ext.from.*'],

	id : 'lessee-win',

	init : function() {
		this.launcher = {
			text : '承租方信息',
			iconCls : 'icon-grid'
		};
	},

	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('grid-win');
		if (!win) {

			var store = new Ext.data.JsonStore({
						autoLoad : true,
						proxy : {
							type : 'ajax',
							api : {
								create : '/AhDB/lear/addLeass.html',
								read : '/AhDB/lear/getAllLeasC.html',
//								update : '/AhDB/lear/updateLeasC.html',
								destroy : '/AhDB/lear/deleteLeass.html'
							},
							reader : {
								type : 'json',
								root : 'lear',
								idProperty : 'id'
							}
						},
						fields : [{
									name : 'leaholder'
								}, {
									name : 'cardtype'
								}, {
									name : 'idcard'
								}, {
									name : 'tel'
								}, {
									name : 'timLimit'
								}, {
									name : 'startDate'
								}, {
									name : 'endDate'
								}, {
									name : 'monRent'
								}, {
									name : 'yerRent'
								}, {
									name : 'wuyeFee'
								}, {
									name : 'parkFee'
								}, {
									name : 'handsel'
								}, {
									name : 'penalty'
								}, {
									name : 'payType'
								}, {
									name : 'rentStatus'
								}, {
									name : 'outDays'
								}, {
									name : 'incExplain'
								}, {
									name : 'remark'
								}, {
									name : 'nextPayDate'
								}, {
									name : 'createTime'
								}, {
									name : 'isValid'
								}, {
									name : 'filler3'
								}, {
									name : 'filler4'
								}, {
									name : 'filler5'
								}, {
									name : 'id'
								}, {
									name : 'rentId'
								}, {
									name : 'lanBlock'
								}, {
									name : 'cityArea'
								}, {
									name : 'address'
								}, {
									name : 'isrent'
								}, {
									name : 'coors_x'
								}, {
									name : 'coors_y'
								}]
					});

			win = desktop.createWindow({
				id : 'lessee-win',
				title : '承租方信息',
				width : 740,
				height : 480,
				maximized : true,
				iconCls : 'icon-grid',
				animCollapse : false,
				constrainHeader : true,
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'grid',
					store : store,
					columns : [new Ext.grid.RowNumberer(), 
							{
										text : "承租人(公司)",
										width : 70,
										sortable : true,
										dataIndex : 'leaholder'
									}, {
										text : "证件类型",
										width : 70,
										sortable : true,
										dataIndex : 'cardType'
									}, {
										text : "证件号",
										width : 70,
										sortable : true,
										dataIndex : 'idCard'
									}, {
										text : "联系电话",
										width : 70,
										sortable : true,
										dataIndex : 'tel'
									}, {
										text : "租赁期限",
										width : 70,
										sortable : true,
										dataIndex : 'timLimit'
									}, {
										text : "开始时间",
										width : 70,
										sortable : true,
										dataIndex : 'startDate'
									}, {
										text : "截止时间",
										width : 70,
										sortable : true,
										dataIndex : 'endDate'
									}, {
										text : "月租金",
										width : 70,
										sortable : true,
										dataIndex : 'monRent'
									}, {
										text : "年租金",
										width : 70,
										sortable : true,
										dataIndex : 'yerRent'
									}, {
										text : "物业管理费",
										width : 70,
										sortable : true,
										dataIndex : 'wuyeFee'
									}, {
										text : "车辆停放费",
										width : 70,
										sortable : true,
										dataIndex : 'parkFee'
									}, {
										text : "押金",
										width : 70,
										sortable : true,
										dataIndex : 'handsel'
									}, {
										text : "违约金",
										width : 70,
										sortable : true,
										dataIndex : 'penalty'
									}, {
										text : "支付方式",
										width : 70,
										sortable : true,
										dataIndex : 'payType'
									}, {
										text : "租金收缴",
										width : 70,
										sortable : true,
										dataIndex : 'rentStatus'
									}, {
										text : "滞交天数",
										width : 70,
										sortable : true,
										dataIndex : 'outDays'
									}, {
										text : "租金调整说明",
										width : 70,
										sortable : true,
										dataIndex : 'incExplain'
									}, {
										text : "备注",
										width : 70,
										sortable : true,
										dataIndex : 'remark'
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
					items : [	
								{
									xtype : 'hiddenfield',
									name : 'id'
								},
								{	
									xtype : 'textfield',
									name : 'leaholder',
									fieldLabel : '承租人(公司)'
									}, {
										xtype : 'textfield',
										name : 'cardType',
										fieldLabel : "证件类型"
									}, {
										xtype : 'textfield',
										name : 'idCard',
										fieldLabel :'证件号'
									}, {
										xtype : 'textfield',
										name :'tel',
										fieldLabel :'联系电话'
										
									}, {
										xtype : 'textfield',
										name :'timLimit',
										fieldLabel :'租赁期限'
										
									}, {
										xtype : 'textfield',
										name :'startDate',
										fieldLabel :'开始时间'
									}, {
										xtype : 'textfield',
										name :'endDate',
										fieldLabel :'截止时间'
										
									}, {
										xtype : 'textfield',
										name :'monRent',
										fieldLabel :'月租金'
									}, {
										xtype : 'textfield',
										name :'yerRent',
										fieldLabel :'年租金'
										
									}, {
										xtype : 'textfield',
										name :'wuyeFee',
										fieldLabel :'物业管理费'
									}, {
										xtype : 'textfield',
										name :'parkFee',
										fieldLabel :'车辆停放费'
									}, {
										xtype : 'textfield',
										name :'handsel',
										fieldLabel :'押金'
									}, {
										xtype : 'textfield',
										name :'penalty',
										fieldLabel :'违约金'
									}, {
										xtype : 'textfield',
										name :'payType',
										fieldLabel :'支付方式'
									}, {
										xtype : 'textfield',
										name :'rentStatus',
										fieldLabel :'租金收缴'
									}, {
										xtype : 'textfield',
										name :'outDays',
										fieldLabel :'滞交天数'
									}, {
										xtype : 'textfield',
										name :'incExplain',
										fieldLabel :'租金调整说明'
									}, {
										xtype : 'textfield',
										name :'remark',
										fieldLabel :'备注'
										
									}],
					buttons : [{
						text : '确定',
						handler : function() {
								var win = this.findParentByType('window'), form = win
										.child('form'), grid = win
										.child('grid');

								if (form.getForm().isValid()) {
									form.submit({
										url : '../lear/addLeass.html',
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
							tooltip : '添加一个承租方',
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
											var record = store.getAt('0');
											Ext.Ajax.request({
												url : '../lear/deleteLeass.html',
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