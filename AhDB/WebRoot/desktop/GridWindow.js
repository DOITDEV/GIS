/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.GridWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.*',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'grid-win',

    init : function(){
        this.launcher = {
            text: '租赁信息浏览',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win');
        var app = this.app;
        if(!win){
//        	Ext.Ajax.request({
//        		url: '../leas/getAllLeasC.html'
//        	});
        	var leasStore = new Ext.data.JsonStore({
							autoLoad : true,
							fields: [
	                                    //租赁信息 
										{ name: 'lanBlock' },
										{ name: 'cityArea' },
										{ name: 'address' },
										{ name: 'propertys' },
										{ name: 'propertyNo' },
										{ name: 'landSize' },
										{ name: 'roomSize'},
										{ name: 'nonOcc'},
										{ name: 'geoLocation' },
										{ name: 'realDisplay' },
										//承租方信息
										{ name: 'leaholder' },
										{ name: 'cardType' },
										{ name: 'idCard' },
										{ name: 'tel',type: String},
										{ name: 'timLimit' },
										{ name: 'startDate' },
										{ name: 'endDate' },
										{ name: 'monRent' },
										{ name: 'yerRent' },
										{ name: 'wuyeFee' },
										{ name: 'parkFee' },
										{ name: 'handsel' },
										{ name: 'penalty' },
										{ name: 'payType' },
										{ name: 'rentStatus' },
										{ name: 'outDays' },
										{ name: 'incExplain' },
										{ name: 'remark' },
										
										
										{ name: 'nextPayDate' },
										{ name: 'createTime' },
										{ name: 'isValid' },
										{ name: 'filler3' },
										{ name: 'filler4' },
										{ name: 'filler5' },
										{ name: 'leasid' },
										{ name: 'rentId' },
										
										
										{ name: 'id' },
										{ name: 'isRent' },
										{ name: 'coors_x' },
										{ name: 'coors_y' },
										{ name: 'filler1' },
										{ name: 'filler2' },
										{ name: 'filler3' },
										//支付信息
										{ name: 'pay_leasseeid' },
										{ name: 'pay_rentid' },
										{ name: 'pay_address' },
										{ name: 'pay_amount' },
										{ name: 'pay_createtime' },
										{ name: 'pay_filler1' },
										{ name: 'pay_filler2' },
										{ name: 'pay_filler3' }
	                         ],
							//设置分页大小  
						    pageSize:15,  
						    proxy: {  
						        type: 'ajax',  
						        url: '../lear/getAllLeasRent.html',
						        reader: {  
						            //数据格式为json  
						            type: 'json',  
						            root: 'lear',  
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
            win = desktop.createWindow({
                id: 'grid-win',
                title:'租赁信息',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        border: false,
                        xtype: 'grid',
                        bbar:pagingToolbar,
                        store:leasStore,
                        columns: [
                            new Ext.grid.RowNumberer({locked: true}),
                            {
                            	header:'出租方信息',
                            	columns:[
                            		{
		                                text: "地块",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'lanBlock'
		                            },
		                            {
		                                text: "所在区域",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'cityArea'
		                            },
		                            {
		                                text: "租赁地址",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'address'
		                            },
		                            {
		                                text: "产权",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'propertys'
		                            },
		                            {
		                                text: "产权证号",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'propertyNo'
		                            },
		                            {
		                                text: "土地面积",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'landSize'
		                            },
		                            {
		                                text: "房屋面积",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'roomSize'
		                            },
		                            {
		                                text: "空置面积",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'nonOcc'
		                            },
		                            {
		                                text: "地理位置",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'geoLocation'
		                            },
		                            {
		                                text: "实景",
		                                width: 70,
		                                sortable: true,
		                                dataIndex: 'realDisplay'
		                            }]
                            },{
                            	header:'承租方信息',
                            	columns:[{
	                                text: "承租人(公司)",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'leaholder'
	                            },
	                            {
	                                text: "证件类型",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'cardType'
	                            },
	                            {
	                                text: "证件号",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'idCard'
	                            },
	                            {
	                                text: "联系电话",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'tel'
	                            },
	                            {
	                                text: "租赁期限",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'timLimit'
	                            }]
                            },{
                            	header:'详细信息',
                            	columns:[{
	                                text: "开始时间",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'startDate'
	                            },
	                            {
	                                text: "截止时间",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'endDate'
	                            },
	                            {
	                                text: "月租金",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'monRent'
	                            },
	                            {
	                                text: "年租金",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'yerRent'
	                            },
	                            {
	                                text: "物业管理费",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'wuyeFee'
	                            },
	                            {
	                                text: "车辆停放费",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'parkFee'
	                            },
	                            {
	                                text: "押金",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'handsel'
	                            },
	                            {
	                                text: "违约金",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'penalty'
	                            },
	                            {
	                                text: "支付方式",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'payType'
	                            },
	                            {
	                                text: "租金收缴",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'rentStatus'
	                            },
	                            {
	                                text: "滞交天数",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'outDays'
	                            },
	                            {
	                                text: "租金调整说明",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'incExplain'
	                            },
	                            {
	                                text: "备注",
	                                width: 70,
	                                sortable: true,
	                                dataIndex: 'remark'
	                            }]
                            }
                        ],
                        listeners:{
                        	itemdblclick:function(g,rec){
                        		var map_win = win.getMap();
                        		map_win.deleteOverlays();
                        		map_win.codeAddress('上海市'+rec.data.address,rec);
                        	}
                        }
                    }
                ],
                tbar:[{
                    text:'地图分布',
                    tooltip:'查看所有版块分布信息',
                    iconCls:'remove',
                    handler:function(){
                    	var map_win = win.getMap();
                		win.items.get(0).store.each(function(record){
                			map_win.codeAddress('上海市'+record.data.address,record);
                		});
                    }
                }],
                getMap:function(){
                	var map_win = desktop.getWindow('map');
            		if(null==map_win){
            			map_win = new MyDesktop.Map({
            				app:app
            			});
            			map_win=map_win.createWindow().show();
            		}else{
            			map_win.show();
            		}
            		return map_win;
                }
            });
        }
        return win;
    },
	
    statics: {}
});