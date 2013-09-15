  function getCenterPanel()
  {  	
		 mainCenter = new Ext.Panel({
			region : "center",
			tbar: map_toolbar,
			//id:'center',
			margins : '0 2 0 0',
            split: true,
            layout: 'fit', 
            html:  "<div id='myFrame'   style='width:100%;height:100%; position:relative; top: 0px; left: 0px; bottom:0px; right:0px; '>" +
            		"<div id='viewport2' style='height:100%;position:relative; display:block;top:0px;width:100%;z-index:100;'></div>" +
    		//"<div id='measureDivParent' style='z-index:100;width:100px; height:25px; position:absolute; right:0px; bottom:0px; display:block; border:outset 1px red;'>" +
    		"<div id='measure_resultdiv' style='color:red; padding:2,2,2,2;z-index:1000;width:120px; height:29px; position:absolute; right:0px; bottom:0px; display:block; border:outset 0px blue;'></div>" +
    		"</div></div>"+"</div><iframe onload='turnHeight();' id='globeFrame' src='newmap3d.html' name='globeFrame'"+
		 "style='height: 100%; visibility:hidden; width: 100%; position: absolute; z-index:0; bottom:0px; top: 0px; border-top-color:Red'"+
         "marginwidth='0' marginheight='0'  frameborder='0' scrolling='no' ></iframe>"
		});
  
		var center = new Ext.Panel({
			region : "center",
	        layout: 'fit',
	        items:[mainCenter]//saveList]
		});	
		return center;//mainCenter;
  }	