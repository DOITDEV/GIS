  /**
   * 返回左侧面板
   */
  function getWestPanel()
  {
		west= new Ext.Panel({
			region : "east",
			 
			collapseMode:'mini',
			title: '主菜单',
			collapsible: true,
			width:220,
			 layout: {
              type:'vbox',
              padding:'5',
              align:'stretch'
          },
          defaults:{margins:'15 10 15 10',height:50},
          width : 220,
          items:[{
              xtype:'button',
              iconCls: 'hosInfo',
              text: '租赁信息管理',
              //flex:1,
              handler:function(){
          		southPanel.remove(southPanel.items.items[0], true);
          		southPanel.add(getHosmanage());
          		southPanel.doLayout();
          	}
          },{
              xtype:'button',
              iconCls: 'superviseInfo',
              text: '支付信息管理',
              //flex:1,
              handler:function(){
      	}
          },{
              xtype:'button',
              iconCls: 'xzcf',
              text: '第三方信息管理',
              //flex:1,
              handler:function(){
      		}
          },{
              xtype:'button',
              iconCls: 'tsjb',
              text: '用户信息管理',
              //flex:1,
              handler:function(){
      		}
          }],
	        listeners:{
              'collapse': OnDocResize,
              'expand': OnDocResize
            }
	  	});
		return west;
  }