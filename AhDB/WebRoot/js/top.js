  function getTopPanel()
  {
	  /**
	   * 顶部工具栏
	   */
	   var top_toolbar = [
	    
	    {
			xtype : 'tbfill'
		},{
			iconCls: 'logout-button',
			text : '退出系统'
		},{
			xtype : 'tbseparator'
		},{
			iconCls: 'help-button',
			text : '浏览入口'
		}];
	   
	  
		var top = new Ext.Panel({
		region:"north",
		margins : '0 2 0 2',
		html : '<div class="top" style=""><img width="32" height="32"  src="resources/images/weij.png" align="absmiddle" /> <a>上海牛奶集团GIS管理系统</a></div>',
		id: 'header',
		height: 40
		//bbar : top_toolbar
		});
	  return top;
  }