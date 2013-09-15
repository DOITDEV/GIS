/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.GridWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
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
        if(!win){
            win = desktop.createWindow({
                id: 'grid-win',
                title:'Grid Window',
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
                        store: new Ext.data.ArrayStore({
                            fields: [
                                    //租赁信息 
									{ name: 'lanblock' },
									{ name: 'cityarea' },
									{ name: 'address' },
									{ name: 'propertys' },
									{ name: 'propertyno' },
									{ name: 'landsize' },
									{ name: 'roomsize' },
									{ name: 'nonocc' },
									{ name: 'geolocation' },
									{ name: 'realdisplay' },
									//承租方信息
									{ name: 'lea_leaholder' },
									{ name: 'lea_cardtype' },
									{ name: 'lea_idcard' },
									{ name: 'lea_tel' },
									{ name: 'lea_timlimit' },
									{ name: 'lea_startdate' },
									{ name: 'lea_enddate' },
									{ name: 'lea_monrent' },
									{ name: 'lea_yerrent' },
									{ name: 'lea_wuyefee' },
									{ name: 'lea_parkfee' },
									{ name: 'lea_handsel' },
									{ name: 'lea_penalty' },
									{ name: 'lea_paytype' },
									{ name: 'lea_rentstatus' },
									{ name: 'lea_outdays' },
									{ name: 'lea_incexplain' },
									{ name: 'lea_remark' },
									
									
									{ name: 'lea_nextpaydate' },
									{ name: 'lea_createtime' },
									{ name: 'lea_isvalid' },
									{ name: 'lea_filler3' },
									{ name: 'lea_filler4' },
									{ name: 'lea_filler5' },
									{ name: 'lea_id' },
									{ name: 'lea_rentid' },
									{ name: 'lea_lanblock' },
									{ name: 'lea_cityarea' },
									{ name: 'lea_address' },
									
									
									{ name: 'id' },
									{ name: 'isrent' },
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
                            data: MyDesktop.GridWindow.getDummyData()
                        }),
                        columns: [
                            new Ext.grid.RowNumberer(),
                            {
                                text: "地块",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lanblock'
                            },
                            {
                                text: "所在区域",
                                width: 70,
                                sortable: true,
                                dataIndex: 'cityarea'
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
                                dataIndex: 'propertyno'
                            },
                            {
                                text: "土地面积",
                                width: 70,
                                sortable: true,
                                dataIndex: 'landsize'
                            },
                            {
                                text: "房屋面积",
                                width: 70,
                                sortable: true,
                                dataIndex: 'roomsize'
                            },
                            {
                                text: "空置面积",
                                width: 70,
                                sortable: true,
                                dataIndex: 'nonocc'
                            },
                            {
                                text: "地理位置",
                                width: 70,
                                sortable: true,
                                dataIndex: 'geolocation'
                            },
                            {
                                text: "实景",
                                width: 70,
                                sortable: true,
                                dataIndex: 'realdisplay'
                            },
                            {
                                text: "承租人(公司)",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_leaholder'
                            },
                            {
                                text: "证件类型",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_cardType'
                            },
                            {
                                text: "证件号",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_idCard'
                            },
                            {
                                text: "联系电话",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_tel'
                            },
                            {
                                text: "租赁期限",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_timLimit'
                            },
                            {
                                text: "开始时间",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_startDate'
                            },
                            {
                                text: "截止时间",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_endDate'
                            },
                            {
                                text: "月租金",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_monRent'
                            },
                            {
                                text: "年租金",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_yerRent'
                            },
                            {
                                text: "物业管理费",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_wuyeFee'
                            },
                            {
                                text: "车辆停放费",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_parkFee'
                            },
                            {
                                text: "押金",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_handsel'
                            },
                            {
                                text: "违约金",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_penalty'
                            },
                            {
                                text: "支付方式",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_payType'
                            },
                            {
                                text: "租金收缴",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_rentStatus'
                            },
                            {
                                text: "滞交天数",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_outDays'
                            },
                            {
                                text: "租金调整说明",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_incExplain'
                            },
                            {
                                text: "备注",
                                width: 70,
                                sortable: true,
                                dataIndex: 'lea_remark'
                            }
                        ],
                        listeners:{
                        	itemdblclick:function(g,rec){
                        		alert(rec.get('address'));
                        		//var desktop = this.app.getDesktop();
                                var win2 = desktop.getWindow('map');
                                alert(win2.id);
                                win2.hide();
                               // win2.createWindow();
                        	}
                        }
                    }
                ],
                tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Modify options',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                }]
            });
        }
        return win;
    },

    statics: {
        getDummyData: function () {
        	return [
	        	['','','吴中路558号-3栋二层','所有权','','','','359','','','光明乳业股份有限公司UHT事业部','','','13301608738','1年','2012.06.01','2013.05.31','','','','','','','半年','','','',''],
	        	['','','吴中路558号办公楼屋面及仓库','','','','70','','','','上海可的广告有限公司','','','13524113448','1年','2013.01.01','2013.12.31','2750','33000','','','','','年付','','','',''],
			    ['','','枫林路251号门面房','所有权','','','20','','','','上海爱森食品销售有限公司','','','','2年','2012.02.01','2014.01.31','1500','18000','','','','1500','季','','','',''],
			    ['','','枫林路251号北楼4层','所有权','','','202','','','','上海金牛牧业有限公司','','','13524113448','2年','2013.02.01','2015.01.31','10750','129000','','','','','季','','','13818251987施振宇',''],
			    ['','','场中路3100号2号、4号楼','所有权','','','1080.87','','','','上海市奶牛研究所','','','13916612762/56389430','','','','','','','','','','','','',,'','停收','4号楼476.33㎡'],
			    ['','','保定路150号','所有权','','','83.7','','','','上海可的便利店有限公司','','','','2年','2012.01.01','2013.12.31','12220','146640','','','','10000','季','','','',''],
			    ['','','小木桥路371号','使用权','','','100','','','','牛奶棚','','','','5年','2012.04.01','2015.12.31','3600','43200','','','','','月','','','',''],
			    ['','','大木桥路97-99号','使用权','','','104.5','','','','牛奶棚','','','','5年','2011.01.01','2015.12.31','7500','90000','','','','','月','','','',''],
			    ['','','场中路2969-2975号','所有权','','','118.7','','','','牛奶棚','','','','5年','2011.01.01','2015.12.31','3000','36000','','','','','月','','','',''],
			    ['','','场中路2995号西侧','所有权','','11894.76','3396.13','','','','上海强生市北出租汽车有限公司','','','13901951990','5年','2013.01.01','2017.12.31','80000','960000','','','200000','','季','','','2014年起逐年递增5万','已备案'],
			    ['','','崂山东路602号二楼','使用权','','','67.86','','','','施卫星','','','13361810125','2年','','','5000','','','','10000','5000','月','','','2013.6.1起退房',''],
			    ['','','金杨路692号','所有权','','','90','','','','上海好德便利有限公司','','','50716345','2年','2012.01.01','2013.12.31','15800','189600','','','11000','15800','季','','','',''],
			    ['峨山、康琳','','峨山路77号金牛大厦南楼414室','所有权','','','','88','','','驰耐得投资控股有限公司','','','13970231408','1年','2013.05.01','2014.04.30','6156','73872','','','12312','6156','月','','','','',''],
			    ['','','漕东路288号','所有权','','','43.03','','','','上海健正福保健按摩院','','','13012838520','2年','2011.12.01','2013.11.30','4500','54000','','','9000','4500','2月','','','测18',''],
			    ['','','田东路395号','所有权','','','70','','','','新耳电器有限公司','','','65401378/54244470/13611736538','2年','2013.06.01','2015.05.31','9700','116400','','','16000','9700','月','','','','',''],
			    ['保  定  路 ','','保定路150号1#2F','所有权','','','246.81','','','','上海富存国际物流有限公司','','','13311790316','3年','2012.07.10','2015.07.31','18000','216000','','','30000','18000','月','','','',''],
			    ['','','七牧场沪太路塘桥北首15158/亩174.25+24间寝室','所有权','','113885.5','15010','','','','上海泰祥建材发展有限公司','','','565','14年','2007.02.15','2020.11.30','438000','5256000','','','800000','','月','','','',''],
			    ['西藏中路','','西藏中路632号','所有权','','','60','','','','上海来伊份食品连锁经营有限公司','','','13611835807/67691888','2年','2013.05.01','2015.04.30','21000','252000','','','42000','21000','月','','','',''],
			    ['','','万荣路377号101室门面房','所有权','','','243.28','','','','智慧（原上海味赞商贸有限公司）','','','13818917012','4年','2011.10.01','2015.09.30','10000','120000','','','10000','','季','','','377-381号278.46',''],
			    ['吴中路机械厂','','吴中路558号3#楼一层及二层部分','所有权','','','1310','','','','光明乳业股份有限公司UHT事业部','','','13301608738','2年','2013.01.01','2014.12.31','99610','1195320','','','','99610','半年','','','','设备租赁每年10000元']
            ];
        }
    }
});