<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!--<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>-->
<html>

	<head>

	<link rel="stylesheet" type="text/css" href="./resources/css/ext-all.css" />
 	<!-- LIBS -->
	<link rel="stylesheet" type="text/css" href="./resources/my.css"/>
	<link rel="stylesheet" type="text/css" href="./resources/login.css"/>
    <script type="text/javascript" src="./resources/js/ext-all.js"></script>
    
	</head>
	<title>上海牛奶集团GIS管理系统</title>
	<body>
			<script type="text/javascript">
		Ext.onReady(

		function(){
			//开启提示功能
			Ext.QuickTips.init();  
			//提示的方式
			Ext.form.Field.prototype.msgTarget = 'qtip';
			//占位图
			Ext.BLANK_IMAGE_URL = './resources/themes/images/default/s.gif';
			//Ext.BLANK_IMAGE_URL = './resources//images/house.jpg';

			var win, form;
			
/*			var type = new Ext.data.SimpleStore({
				fields : ['type'],
				data : [['YXRY'],['JHRY'],['HAQFXRY'],['HAQJDRY'],['WHRY'],['QTRY']]
			});
*/			
			var logoPanel = new Ext.Panel({
						baseCls : 'x-plain',
						id : 'login-logo',
						region : 'center'
					});
			// 构建form   正式构造form 了。 先生成一个FormPanel 用来显示 
			var formPanel = new Ext.form.FormPanel({
						//baseCls : 'x-plain',   //这是CSS类，显示样式的
						baseParams : {},       //这是提交时的参数
						bodyStyle : 'padding:5 5 5 5',  //这是布局的页面边距
						defaults : {
							width : 200
						},   //这是默认设置的几个参数  用于 field 就是form里的文本框一类的宽度
						defaultType : 'textfield',  //默认的类型，这里是文本。
						frame : true, 
						height : 80,       
						//id : 'login-form',
						items : [
						         {
						        	 fieldLabel : '登陆帐号',
									 allowBlank : false,
									 name : 'userName',
									 invalidText : '用户名无效！',
									 blankText : '用户名不为空!'
								 },
								 {
									 fieldLabel : '登陆密码',
									 allowBlank : false,
									 inputType : 'password',
									 name : 'password',
									 invalidText : '密码无效！',
									 blankText : '密码不为空!'
								 }/*,
								 {
								 	 xtype : 'combo',
								 	 store : type,
								 	 allowBlank : false,
								 	 fieldLabel : '用户类型',
								 	 blankText : '用户类型不能为空!',
								 	 id : 'combo',
							         name : 'usertype',
							         displayField : 'type',
							         mode : 'local',
							         editable : false,
							         triggerAction : 'all',
							         typeAhead : true,
							         width : 100
								 }*/
								],
						labelWidth : 120,
						region : 'south',
						url : 'user/hasUser.html',
						listeners: {
				            afterRender: function(thisForm, options){
				                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
				                    enter: function(){
				                		form.submit({
														waitMsg : '登录中，请稍等...',
														method : 'GET',//'POST',
														success : Success,
														failure : Failure
											});
				                	},
				                    scope: this
				                });
				            }
				        }
					});
			win = new Ext.Window({
						buttons : [{
									text : '浏览',
									handler : function() { 
											 window.location = './commonUser.jsp';
									}
								   },{
									text : '登录',
									handler : function() { //这是登录按钮默认的事件
											form.submit({
														waitMsg : '登录中，请稍等...',
														method : 'GET',//'POST',
														success : Success,
														failure : Failure
											});
									}
								   }],
						buttonAlign : 'right',  //按钮的对齐方式
						height : 592,//740,
						width : 710,//900,
						id : 'login-win',
						layout : 'border',      //布局方式，对应formpanel的 region:'center' 
						minHeight : 592,//740,
						minWidth : 70,//900,
						plain : false,         //显示类型
						resizeable : false,    //是否可以重置大小
						closable : false,     //是否可关闭
						draggable : true,     //是否可拖动
						items : [logoPanel, formPanel],  //在windows里放的控件
						title : '用户登录'
					});

			Failure = function(form, action) {
				//window.location = './login.jsp';
				//alert(action.result);
				if(action.result=="false")
				{
					Ext.MessageBox.alert('登陆失败！', '用户名或密码错误！');
				}
				else
				{
					//Ext.MessageBox.alert('登陆成功！','欢迎使用安徽地图服务系统！');
					//alert(action.result);
					//var userName = "<%=session.getAttribute("user")%>"; 
   					//var userTypeInt = "<%=session.getAttribute("userType")%>"; 
   					//alert(userName);
   					//alert(action.result);
   					
					if(action.result==='0')
					{
						//alert(action.result);
						window.location = './index.jsp';
					}
					if(action.result==='1')
					{
						window.location = './serverUser.jsp';
					}
				}
			};

			Success = function(form, action) {
				window.location = './index.jsp';
				Ext.MessageBox.alert('登陆成功！', action.result);	
				//};
				
			};

			form = formPanel.getForm();	
			win.show();
		}
);
</script>
	</body>
</html>
