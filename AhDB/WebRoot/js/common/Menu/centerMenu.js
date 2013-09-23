
/**
	 * 样式选择
	 */
   function	selectCss()
   {
	//主题数据
	var themes = [
		{theme:'系统风格',css:'ext-all.css'},
		{theme:'黑色',css:'ext-all-access.css'},
		{theme:'红色',css:'ext-all-pink.css'},
		{theme:'灰色',css:'ext-all-gray.css'},
		{theme:'绿色',css:'ext-all-green.css'},
		{theme:'褐色',css:'ext-all-darkgray.css'}];
	
	Ext.define('Theme',{extend: 'Ext.data.Model',ields:['theme','css']});
	
//	Ext.regModel('Theme',{
//		fields:['theme','css']
//	});
	var themeStore = Ext.create('Ext.data.Store',{
		model:'Theme',
		data: themes
	});
	
	var themeChange = Ext.create('Ext.form.ComboBox',{
		id : 'themeChange',
		width : 150,
		labelWidth : 60,
		labelSeparator : ':',
		fieldLabel : false,
		store : themeStore,
		editable : false,
		triggerAction : 'all',
		displayField : 'theme',
		valueField : 'css',
		queryMode : 'local',
		value: 'ext-all.css',
		listeners : {
			'collapse' : function(){
				Ext.util.CSS.swapStyleSheet('theme','./resources/css/' + this.getValue());	
			}
		} 
	});
	return themeChange;
   }
 
var tb,tb2;

var drawMenu = new Ext.menu.Menu({
		  ignoreParentClicks: true,
		  plain:true,
		  items:[{
			 iconCls:'point',
			 text:'点',
			 menu: new Ext.menu.Menu({
				 ignoreParentClicks: true,
				 items:[{
					 text:'单个点',
						 handler: function () {
			                mouse_drawPoint();
			          }
				 },{
					 text:'多个点',
			         handler: function () {
					 		Ext.MessageBox.alert("未完成！");
			          }
				 }]
			 })
		  },{
				 text:'线',
				 iconCls:'line',
				 menu: new Ext.menu.Menu({
					 ignoreParentClicks: true,
					 items:[{
						 text:'基本线',
				         handler: function () {
						 	mouse_drawLine()
				          }
					 },{
						 text:'多节线',
				         handler: function () {
					            Ext.MessageBox.alert("未完成！");
				          }
					 },{
						 text:'自由线',
				         handler: function () {
						 		Ext.MessageBox.alert("未完成！");
				          }
					 }]
				 })
			  },{
				  	 iconCls:'polygon',
					 text:'面',
					 menu: new Ext.menu.Menu({
						 ignoreParentClicks: true,
						 items:[{
							 text:'多边形',
					         handler: function () {
							 	Ext.MessageBox.alert("未完成！");
					          }
						 },{
					          text: '自由多边形',
					          id: 'freehand_polygon',
					          handler: function () {
							 		mouse_drawPolygon()
					          }
					      }, {
					          text: '箭头',
					          id: 'arrow',
					          handler: function () {
					    	  		Ext.MessageBox.alert("未完成！");
					          }
					      },{
							 text:'三角形',
					          handler: function () {
					    	  		Ext.MessageBox.alert("未完成！");
					          }
						 },{
							 text:'矩形',
					          handler: function () {
							 		mouse_drawRectangular();
					          }
						 },{
							 text:'圆形',
					          handler: function () {
							 		mouse_drawCircle();
					          }
						 }]
					 })
				  }]
	  });

	  var measureMenu = new Ext.menu.Menu({
		  ignoreParentClicks: true,
		  plain:true,
		  items:[{
			 iconCls: 'lenMeasure',
			 text:'长度测量',
				 handler: 
					 function () {
			  			map_toolbar2.activate(esri.toolbars.Draw.POLYLINE);
			  		 // mouse_ranging();
			  		 // toggleControl('line');
	 
	          }
		  	},{
		  	iconCls: 'areaMeasure',
			 text:'面积测量',
			 handler: 
				 function () {
		  				map_toolbar2.activate(esri.toolbars.Draw.POLYGON);
		  		//toggleControl('polygon');
	          }
			}]
	  });
	  
	  var bufferMenu = new Ext.menu.Menu({
		  ignoreParentClicks: true,
		  plain:true,
		  items:[{
			 iconCls: 'point_buffer',
			 text:'地名地址',
			 handler: function(){
				var win = Ext.create('Ext.window.Window', {
			        title: '地名地址查询',
			        height: 270,
			        x: Ext.getCmp('help-btn').x-258,
			        y: Ext.getCmp('help-btn').y + 98,
			        closeAction: 'hide',
			        width: 300,
			        layout: 'fit',
			        html: '<div>------------------------<div><div>帮助手册</div>'
					});
				win.show()
		  		}
		  	},{
		  	iconCls: 'line_buffer',
			 text:'医院诊所'
			},{
			  	iconCls: 'area_buffer',
				 text:'面缓冲',
				 handler: function(){
					Ext.getCmp('east').show();
				}
			},{
			  	iconCls: 'set_buffer',
				 text:'缓冲设置', 
				 handler: function(){
				 	Ext.getCmp('east').hide();
				}
			}]
	  });
	  
	  var analyseMenu = new Ext.menu.Menu({
		  ignoreParentClicks: true,
		  plain:true,
		  items:[{
			 iconCls: 'people',
			 text:'医院统计',
			 handler: function () {
			  //hoschartWin.show();
			  	Ext.MessageBox.alert("提示","正在建设中！");
	          }
		  	},{
		  	iconCls: 'country',
			text:'人口统计',
			handler: function () {
		  		Ext.MessageBox.alert("提示","正在建设中！");
	          }
			}]
	  });
	  
	  var map_toolbar=[{
	    iconCls: 'map_operate',
	    disabled  : true
	  },{
	    	 xtype:'tbtext', 
	    	 text:'地图操作：'
	  },{xtype:'tbfill'}/*{
    	  xtype : 'tbseparator'
	  },{
          text: '绘图工具',
          id: 'draw',
          iconCls: 'draw',
          menu: drawMenu 
      },{
    	  xtype : 'tbseparator'
      },{
          text: '测量工具',
          id: 'measure',
          iconCls: 'measure',
          menu: measureMenu 
      },{
			xtype : 'tbseparator'
	  },{
          text: '查询工具',
          id: 'buffer',
          iconCls: 'buffer',
          menu: bufferMenu
      },{
          text: '分析工具',
          id: 'analyse',
          iconCls: 'analyse',
          menu: analyseMenu
      }*/
	  /*,{
    	  xtype : 'tbseparator'
	  },{
          text: '详细面板',
          id: '120_List',
          iconCls: 'save_List',//120_List',
          handler: function(){
	  		if(Ext.getCmp('saveList').hidden==true){
	  			Ext.getCmp('saveList').show();
	  		}
	  		else
	  		{
	  			Ext.getCmp('saveList').hide();
	  		}
	  	}
      },{
    	  xtype : 'tbseparator'
	  },{
          text: '管理面板',
          id: '120_btn',
          iconCls: 'user-find',//buffer',
          handler: function(){
    	  		if(Ext.getCmp('east').hidden==true){
    	  			Ext.getCmp('east').show();
    	  		}
    	  		else
    	  		{
    	  			Ext.getCmp('east').hide();
    	  		}
    	  }
      },{
    	  xtype : 'tbseparator'
	  }*/,{xtype:'tbfill'},
      {
          text: '矢量',
          id:'vector',  
          enableToggle: true,
          toggleGroup: 'layerTab',
          width: 50,
          handler : function() {
    	    //overviewMapControl.setOverviewMapLayer(domLayer);
    	  	//map.setBasicLayer(dlgLayer);
		  	imageLayer.setVisibility(false);
		  	//imageLayer2.setVisibility(false);
		  	//DLayer.setVisibility(false);
		  	tileLayer.setVisibility(true);
		  	//tileLayer2.setVisibility(true);
		  	
    	  	//var frm = document.getElementById("globeFrame");
            //frm.style.visibility = 'hidden';
     	  },
          pressed : true

       },{
     	  xtype : 'tbseparator'
       },{
          text: '影像',
          enableToggle: true,
          toggleGroup: 'layerTab',
          id:'image',
          handler : function() {
		  	imageLayer.setVisibility(true);
		  	//imageLayer2.setVisibility(true);
		  	
		  	tileLayer.setVisibility(false);
		  	//DLayer.setVisibility(false);
		  	//tileLayer2.setVisibility(false);
		  	
    	   	//var frm = document.getElementById("globeFrame");
            //frm.style.visibility = 'hidden';
       	  },
          width: 50
       },{
     	  xtype : 'tbseparator'
       },{
			//iconCls: 'logout-button',
			text : '退出系统',
			handler : function() {
				Ext.Msg.confirm('系统提示','你确定要退出吗？',
					      function(btn){
					        if(btn=='yes'){
					        	 var requestConfig ={
					            		  url : '../user/loginOut.html',
					            		  callback : function(options,success,response){
					            	  			var msg = ["请求是否成功：",success,"\n","服务器返回值：",response.responseText];
					            	  			//alert(msg.join(''));
					            	  			Ext.MessageBox.alert('提示', '注销成功正在帮你转到登陆页面....');
					            	  			window.location = './login.jsp';
					              		  }	            		  
					              }
					              Ext.Ajax.request(requestConfig);
					        }
					        else{}
					        
					      },this);
       		}
		},{
			xtype : 'tbseparator'
		},{
			//iconCls: 'help-button',
			text : '浏览入口',
			handler : function() {
//				alert("浏览入口1");
				window.location = './commonUser.jsp';
       		}
		},{
			xtype : 'tbseparator'
		},selectCss()
//	   ,{
//          text: '三维',
//          enableToggle: true,
//          toggleGroup: 'layerTab',
//          id:'3D',
//          handler : function() {
//		   DLayer.setVisibility(true);
//		   imageLayer.setVisibility(false);
//		   tileLayer.setVisibility(false);
//    	   //document.getElementById('mapDiv').style.visibility = 'hidden';
//    	   //document.getElementById('3DPanel').style.visibility = 'visible';
//    	   //loadIFrame(0.0001716612943572986,117.688835,31.204601,119.08874,32.149048);
//
//       	  },
//          width: 50
//       }
	   ]; 