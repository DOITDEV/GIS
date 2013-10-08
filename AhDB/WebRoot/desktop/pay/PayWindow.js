/*
 * ! Ext JS Library 4.0 Copyright(c) 2006-2011 Sencha Inc. licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.pay.PayWindow', {
	extend : 'Ext.ux.desktop.Module',
	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer', 'Ext.from.*'],

	id : 'pay-win',

	init : function() {
		this.launcher = {
			text : '支付信息',
			iconCls : 'icon-grid'
		};
	},

	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('pay-win');
		if (!win) {

			var store = new Ext.data.JsonStore({
						autoLoad : true,
						fields : [{
									name : 'leasseeId'
								}, {
									name : 'address'
								}, {
									name : 'amount'
								}/*, {
									name : 'payType'
								}*/, {
									name : 'createTime'
								}],
							    //设置分页大小  
							    pageSize:15,  
							    proxy: {  
							        type: 'ajax',  
							        url: '../pay/getAllPays.html',
							        reader: {  
							            //数据格式为json  
							            type: 'json',  
							            root: 'pay',  
							            //获取数据总数  
							            totalProperty: 'totalCount'  
							        }  
							    }
					});
					var pagingToolbar = new Ext.PagingToolbar({
				      emptyMsg:"没有数据",
				      displayInfo:true,
				      displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",
				      store:store
				      //pageSize:10 
				 	});
			win = desktop.createWindow({
				id : 'pay-win',
				title : '支付信息',
				width : 780,
				height : 500,
				iconCls : 'icon-grid',
				animCollapse : false,
				constrainHeader : true,
				layout : 'border',
				items : [{
					region : 'center',
					border : false,
					xtype : 'grid',
					bbar:pagingToolbar,
					store : store,
					columns : [new Ext.grid.RowNumberer(), 
							{
								text : "所属租赁",
								width : 70,
								sortable : true,
								dataIndex : 'address'
							},{
								text : "付款金额",
								width : 70,
								sortable : true,
								dataIndex : 'amount'
							}, {
								text : "付款日期",
								width : 70,
								sortable : true,
								dataIndex : 'createTime'
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
						columns : 2
					},
					items : [ {
								xtype : 'hiddenfield',
								name : 'leasseeId'
							},
							{
								xtype : 'textfield',
								name : 'address',
								fieldLabel : '所属租赁',
								allowBlank:false,
								blankText:'所属租赁不能为空！'
							}, {
								xtype : 'textfield',
								name : 'amount',
								fieldLabel : '付款金额'
							}/*, {
								xtype : 'textfield',
								name : 'createTime',
								fieldLabel : '付款日期'
							}*/],
					buttons : [{
						text : '确定',
						handler : function() {
								var win = this.findParentByType('window'), form = win
										.child('form'), grid = win
										.child('grid');

								if (form.getForm().isValid()) {
									form.submit({
										url : '../pay/addPay.html',
										method : 'POST',
										success : function(form, action) {
											Ext.Msg.alert('提示', '保存成功!');
											store.reload();
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
							text : '录入',
							tooltip : '录入收款',
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
									Ext.Msg.alert('提示', '请选择一个修改用户');
								}
							}
						}/*, '-', {
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
												url : '../pay/deleteUser.html',
												method : 'POST',
												params : {
													userName : selected.get('userName')
												},
												success : function(res, opts) {
													Ext.MessageBox.alert('恭喜',
															'删除成功！');
													store.reload();
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
						}*/]
			});
		}
		return win;
	}
});