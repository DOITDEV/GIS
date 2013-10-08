/*
 * ! Ext JS Library 4.0 Copyright(c) 2006-2011 Sencha Inc. licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.user.UserWindow', {
	extend : 'Ext.ux.desktop.Module',
	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer', 'Ext.from.*'],

	id : 'user-win',

	init : function() {
		this.launcher = {
			text : '用户信息',
			iconCls : 'icon-grid'
		};
	},

	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('user-win');
		if (!win) {

			var store = new Ext.data.JsonStore({
						autoLoad : true,
						fields : [{
									name : 'userName'
								}, 
								{
									name : 'password'
								}, 
									{
									name : 'userType'
								}, {
									name : 'email'
								}, {
									name : 'departId'
								}, {
									name : 'roleId'
								}, {
									name : 'roleName'
								}, {
									name : 'createTime'
								}, {
									name : 'id'
								}],
							    //设置分页大小  
							    pageSize:15,  
							    proxy: {  
							        type: 'ajax',  
							        url: '../user/getAllUser.html',
							        reader: {  
							            //数据格式为json  
							            type: 'json',  
							            root: 'user',  
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
			var deptstore=[[11,'市场部'],[22,'财务部'],[33,'安全部'],[44,'管理部'],[55,'人事部'],[66,'销售部']];
			var rolestore=[[1001,'管理员'],[2001,'出纳员'],[2002,'审计员'],[3001,'网管'],[4001,'总经理'],[4002,'运营总监'],[4003,'财务经理'],[5001,'HR经理'],[6001,'销售专员']];
			/*var combodept=new Ext.form.ComboBox({
					store:new Ext.data.SimpleStore({
						fields:['deptId','deptName'],
						data:deptstore
					}),
					valueField :"deptId",  
		            displayField: "deptName",  
		            mode: 'local',  
		            forceSelection: true,  
		            blankText:'请选择部门',  
		            emptyText:'请选择部门',  
		            hiddenName:'deptId',  
		            editable: false,  
		            triggerAction: 'all',  
		            allowBlank:true,  
		            fieldLabel: '部 &nbsp;&nbsp;&nbsp; 门',  
		            name: 'deptId',  
		            width: 80   
			});
			
			var comborole=new Ext.form.ComboBox({
					store:new Ext.data.SimpleStore({
						fields:['roleId','roleName'],
						data:rolestore
					}),
					valueField :"roleId",  
		            displayField: "roleName",  
		            mode: 'local',  
		            forceSelection: true,  
		            blankText:'请选择角色',  
		            emptyText:'请选择角色',  
		            hiddenName:'roleId',  
		            editable: false,  
		            triggerAction: 'all',  
		            allowBlank:true,  
		            fieldLabel: '角 &nbsp;&nbsp;&nbsp; 色',  
		            name: 'roleId',  
		            width: 80   
			});*/
			
			win = desktop.createWindow({
				id : 'user-win',
				title : '系统用户',
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
								text : "用户名",
								width : 70,
								sortable : true,
								dataIndex : 'userName'
							}, 
								/*{
								text : "密码",
								width : 70,
								sortable : true,
								dataIndex : 'password'
							}, */
								{
								text : "用户类型",
								width : 70,
								sortable : true,
								dataIndex : 'userType'
							}, {
								text : "E-mail",
								width : 70,
								sortable : true,
								dataIndex : 'email'
							}, {
								text : "所属部门",
								width : 70,
								sortable : true,
								dataIndex : 'departId'
							}, {
								text : "角色名称",
								width : 70,
								sortable : true,
								dataIndex : 'roleId'
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
					items : [ {
								xtype : 'hiddenfield',
								name : 'id'
							},
							{
								xtype : 'textfield',
								name : 'userName',
								fieldLabel : '用户名',
								allowBlank:false,
								blankText:'用户名不能为空！'
							}, {
								xtype : 'textfield',
								inputType:'password',
								name : 'password',
								fieldLabel : '密  &nbsp;&nbsp;&nbsp; 码',
								allowBlank:false,
								blankText:'密码不能为空！',
								minLength:6,
								minLengthText:'密码长度为[6-20]',
								maxLength:20,
								maxLengthText:'密码长度为[6-20]'
							}, {
								xtype : 'textfield',
								name : 'userType',
								fieldLabel : '用户类型'
							}, {
								xtype : 'textfield',
								name : 'email',
								fieldLabel : 'E-mail',
								regex: /^\s*\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\;\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*(\;)*\s*$/,
                				regexText: '不是有效的邮箱地址！'
							}, {
								xtype : 'combo',
								name : 'departId',
								fieldLabel : '所属部门',
								store:deptstore,
								editable:false,
								allowBlank:false
							}, {
								xtype : 'combo',
								name : 'roleId',
//								valueField :"roleId",  
//		        			    displayField: "roleName",  
								fieldLabel : '角色名称',
								store:rolestore,
								editable:false,
								allowBlank:false
							}],
					buttons : [{
						text : '确定',
						handler : function() {
								var win = this.findParentByType('window'), form = win
										.child('form'), grid = win
										.child('grid');

								if (form.getForm().isValid()) {
									form.submit({
										url : '../user/updateUser.html',
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
							text : '新增',
							tooltip : '添加一个新用户',
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
												url : '/AhDB/user/deleteUser.html',
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
						}]
			});
		}
		return win;
	}
});