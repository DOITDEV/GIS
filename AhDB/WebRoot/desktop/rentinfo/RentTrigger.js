Ext.define("MyDesktop.rentinfo.RentTrigger", {
			extend : "Ext.form.field.ComboBox",
			alias : 'widget.renttrigger',

			matchFieldWidth : false,

			createPicker : function() {
				var me = Ext.apply(this,arguments[0]);
				
				var rentstore = new Ext.data.JsonStore({
							autoLoad : true,
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
									}],
							// 设置分页大小
							pageSize : 15,
							proxy : {
								type : 'ajax',
								url : '../rent/getAllRents.html',
								reader : {
									// 数据格式为json
									type : 'json',
									root : 'rent',
									// 获取数据总数
									totalProperty : 'totalCount'
								}
							}
						});

				this.picker = Ext.create('Ext.grid.Panel', {
							floating : true,
							store : rentstore,
							columns : [{
										text : "地块",
										sortable : true,
										dataIndex : 'lanBlock'
									}, {
										text : "所在区域",
										sortable : true,
										dataIndex : 'cityArea'
									}, {
										text : "租赁地址",
										sortable : true,
										dataIndex : 'address'
									}, {
										text : "房屋面积",
										sortable : true,
										dataIndex : 'roomSize'
									}, {
										text : "空置面积",
										sortable : true,
										dataIndex : 'nonOcc'
									}],
							minHeight : 200,
							width : 505
						});

				this.mon(this.picker.getView(), {
							itemdblclick : me.onItemdblclick,
							scope : me
						});

				return this.picker;
			},
			
			onItemdblclick : Ext.emptyFn
		});