  /**
   * 返回底部面板
   */
  function getSouthPanel()
  {
	    //display();
		var south = new Ext.Panel({
			region : "south",
			id : 'south',
			margins : '2 2 2 2',
			//margins : '5 5 5 5',
			//id: 'measureDiv',
			border : false,
			frame:true,
			resizaable:false,
			modal:true,
			html : /*"<iframe id='globeFrame' onload='turnHeight('globeFrame');' src='newmap3d.html' name='globeFrame'"+
				 "style='height: 100%; width: 100%; position: absolute; z-index:0; top: 114px; right:4px; bottom:32px; border-top-color:Red'"+
	             "marginwidth='0' marginheight='0'  frameborder='0' scrolling='no' >"+
	             "</iframe>",*/
	             '<div class="south">Developed By www.doitchina.com & 2013-01-30</div>',
			height: 24//,
           // split: true
		});
		return south;
  }
