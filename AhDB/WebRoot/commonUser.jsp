<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
  <head>
    <html>
<head>
<!--  
	<link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.7/js/dojo/dijit/themes/tundra/tundra.css" />
	<script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.7"></script>
	-->
	<link rel="stylesheet" type="text/css" href="http://localhost:8888/arcgis_js_api/library/2.8/jsapi/js/dojo/dijit/themes/tundra/tundra.css" />
	<script type="text/javascript" src="http://localhost:8888/arcgis_js_api/library/2.8/jsapi/init.js"></script>
	<link rel="stylesheet" type="text/css" href="./resources/css/ext-all.css" />
 	<!-- LIBS -->
	<link rel="stylesheet" type="text/css" href="./resources/my.css"/>
    <script type="text/javascript" src="./resources/js/ext-all.js"></script>
	<script type="text/javascript" src="./js/common/main.js"></script>
	<script type="text/javascript" src="./js/common/top.js"></script>
	<script type="text/javascript" src="./js/common/bottom.js"></script>
	<script type="text/javascript" src="./js/common/center.js"></script>
	<script type="text/javascript" src="./js/common/east.js"></script>
	
	<script type="text/javascript" src="./js/common/MapTools/map.js"></script>
	<script type="text/javascript" src="./js/common/MapTools/hosWin.js"></script>
	<script type="text/javascript" src="./js/common/MapTools/draw.js"></script>
	<script type="text/javascript" src="./js/common/MapTools/search.js"></script>
	<script type="text/javascript" src="./js/common/manage/hospitalManage.js"></script>
	
	<script type="text/javascript" src="./js/common/analysis/bufferWin.js"></script>
	<script type="text/javascript" src="./js/common/west.js"></script>
	 
	<!--script type="text/javascript" src="./js/analysis/analysisHos.js"></script-->
	<script type="text/javascript" src="./js/common/Menu/centerMenu.js"></script>
	<title>上海牛奶集团信息概览</title>
	 
</head>
<body onresize=OnDocResize()>
</body>

</html>
