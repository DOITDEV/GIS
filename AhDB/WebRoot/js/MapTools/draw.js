 /**
  * 绘图工具
  * @param id
  * @return
  */

     function $(id){   
          return document.getElementById(id);   
        }   
     function getNMapclickMouse(param){   
    	   map.events.unbind('click', map, getNMapclickMouse);   
        }
	  
     /*鼠标绘图*/  
    function mouse_drawPoint()   
    {   
            for(var key in vectorlayertools)
            {   
              vectorlayertools[key].disable();   
            }   
            vectorlayertools['point'].enable();   
    }
  	function mouse_drawLine()
	{
			for(var key in vectorlayertools){
			  vectorlayertools[key].disable();
			}
			vectorlayertools['line'].enable();
	}
	function mouse_drawCircle()
	{
		    for(var key in vectorlayertools){
			  vectorlayertools[key].disable();
			}
			vectorlayertools['circle'].enable();
	}
	function mouse_drawRectangular()
	{
			for(var key in vectorlayertools){
			  vectorlayertools[key].disable();
			}
			vectorlayertools['rect'].enable();
	}
	function mouse_drawPolygon()
	{
		for(key in vectorlayertools){
		  vectorlayertools[key].disable();
		}
		vectorlayertools['polygon'].enable();
	}
	function mouse_ranging()
	{
		for(var key in vectorlayertools){
		  vectorlayertools[key].disable();
		}
		vectorlayertools['measureline'].enable();
		vectorlayertools['measureline'].resultDiv =  document.getElementById("measure_resultdiv");

	}
//	function zoomIn(){
//			for(var key in vectorlayertools){
//				  vectorlayertools[key].disable();
//			}
//			vectorlayertools['zoomin'].enable();
//	}
//	
//	function zoomOut(){
//		for(var key in vectorlayertools){
//			  vectorlayertools[key].disable();
//		}
//		vectorlayertools['zoomout'].enable();
//	}
	
	function fullScreen(){
		for(var key in vectorlayertools){
			  vectorlayertools[key].disable();
		}
	  	var extent = new NBounds(580000.501,3464444.2464,678669.8736,3549504.2312);//(518987.93,3253667.30,683093.91,3378406.99); 
	  	map.zoomToExtent(extent);
	}
	
	function clearMap(){
		  for(var i=0;i<markers.markers.length;i++)
		  {
			  markers.removeMarker(markers.markers[0]);
		  }
		  
		  for(var i=0;i<startMarkers.markers.length;i++)
		  {
			  startMarkers.removeMarker(markers.markers[0]);
		  }
		  
		  for(var i=0;i<endMarkers.markers.length;i++)
		  {
			  endMarkers.removeMarker(markers.markers[0]);
		  }
		  
 			for(var key in vectorlayertools){
 				  vectorlayertools[key].disable();
 			}
 			vectorlayertools['pan'].enable();
 			vectorlayer.removeAllFeatures();
		  	//alert(dialogArray.length);
// 			for(var i=0;i<dialogArray.length;i++){
// 				dialogArray[i].dispose();
// 			}

	}
	
	function panMap(){
		for(var key in vectorlayertools){
			  vectorlayertools[key].disable();
		}
	}

	var lengthWin = Ext.create('Ext.window.Window', {
        title: '',
        height: 200,
        //x: Ext.getCmp('help-btn').x - 340,
       // y: Ext.getCmp('help-btn').y + 57,
        closeAction: 'hide',
        width: 400,
        layout: 'fit',
        html: '<div id="measure_resultdiv"></div>',
        listeners:{
        	"show": function(){

        	}
        }
	});
	
	function mouse_area()
	{
		for(var key in vectorlayertools){
			  vectorlayertools[key].disable();
			}
		vectorlayertools['measurearea'].enable();
		vectorlayertools['measurearea'].resultDiv =  document.getElementById("measure_resultdiv");
	}
	function mouse_zoomin()
	{
		for(var key in vectorlayertools){
		  vectorlayertools[key].disable();
		}
		vectorlayertools['zoomin'].enable();
	}

	function mouse_zoomout()
	{
		for(var key in vectorlayertools){
		  vectorlayertools[key].disable();
		}
		vectorlayertools['zoomout'].enable();
	}
	function mouse_movemap()
	{
		for(var key in vectorlayertools){
			vectorlayertools[key].disable();
		}
		vectorlayertools['pan'].enable();
	}	

      