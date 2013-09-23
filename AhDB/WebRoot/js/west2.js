  /**
   * 返回左侧面板
   */
  function getWestPanel()
  {
	  var userMenu = Ext.create('Ext.tree.Panel',{
			title:'信息维护管理',
			iconCls: 'userMenu',
			width: 280,
			root:{
				expanded: true,
				children: [{
					text: '医院信息管理',
					width: 200,
					id: '11',
					leaf: true
				},{
					text: '监督信息概览',
					width: 200,
					id: '12',
					leaf: true
				}
//				,{
//					text: '其他信息管理',
//					width: 200,
//					id: '13',
//					leaf: true
//				}
				]
		},
		rootVisible: false,
		listeners:{
			itemclick : function(view,rec,item,index,e){	
				//切换内容页面
				changeCenter(rec.get('id'));
				}
		}
		});
	  
	  var logMenu = Ext.create('Ext.tree.Panel',{
			title:'信息授权管理',
			iconCls: 'logMenu',
			width: 220,
			root:{
				expanded: true,
				children: [{
					text: '医院信息查看授权',
					width: 220,
					id : '21',
					leaf: true
				},{
					text: '事故信息查看授权',
					width: 220,
					id : '22',
					leaf: true
				},{
					text: '其他信息查看授权',
					width: 220,
					id : '23',
					leaf: true
				}]
		},
		rootVisible: false,
		listeners:{
			itemclick : function(view,rec,item,index,e){
				//切换内容页面
				//changePage(rec.get('text'));
				changeCenter(rec.get('id'));
				}
		}
		});

	  var logPanel = new Ext.Panel({
		  title:'ddd',
		  layout:'fit',
		  items: [logMenu]
	  });
	  var west = new Ext.Panel({
			region : 'east',
			id : 'top',
			margins : '0 0 0 2',
			collapsible: true,
            floatable: true,
            title: '主菜单',
            shadow: true,
            split: true,
            layout: 'accordion',
	        items: [userMenu,logPanel],
			width : 280
			});
		return west;
  }
  
  /**
   * 切换中央面板
   */
  function changeCenter(id){
		// 如果中央区已经有面板显示了
	    //alert(id)
		if (null != southPanel.items.items[0]) {
			southPanel.remove(southPanel.items.items[0], true);	
		}
		// 显示新的面板
		if(id=='11')
		{
			southPanel.add(getHosmanage());
		}
		if(id=='12')
		{
			southPanel.add(getSupervise());
			//mainCenter.add(getRolemanage());
			// Ext.Msg.alert("提示","和列表面板产生联动");
		}
		if(id=='13')
		{
			//mainCenter.add(getUsermanage());
			Ext.Msg.alert("提示","和列表面板产生联动");
		}
		if(id=='14')
		{
			//mainCenter.add(getUsermanage());
			Ext.Msg.alert("提示","和列表面板产生联动");
		}
		if(id=='21')
		{
			authorizeWin.show();
			//mainCenter.add(getServermanage());
		}
		if(id=='22')
		{
			Ext.Msg.alert("提示","和列表面板产生联动");//mainCenter.add(getWfsPanel());//(getServermanage());//(getWfsmanage());
		}
		if(id=='23')
		{
			Ext.Msg.alert("提示","和列表面板产生联动");//mainCenter.add(getOwsPanel());//(getServermanage());//(getWfsmanage());
		}
		southPanel.doLayout();
	  
  }