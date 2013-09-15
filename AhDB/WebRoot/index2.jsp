<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.7/js/dojo/dijit/themes/tundra/tundra.css" />
	<script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.7"></script>

	 <!--
	 <link rel="stylesheet" type="text/css" href="http://10.34.32.101:8084/arcgis_js_api/library/2.8/jsapi/js/dojo/dijit/themes/tundra/tundra.css"/>
    <script type="text/javascript" src="http://10.34.32.101:8084/arcgis_js_api/library/2.8/jsapi/init.js"></script>
	
	--><link rel="stylesheet" type="text/css" href="./resources/css/ext-all.css" />
 	<!-- LIBS -->
	<link rel="stylesheet" type="text/css" href="./resources/my.css"/>
    <script type="text/javascript" src="./resources/js/ext-all.js"></script>
	<script type="text/javascript" src="./js/main.js"></script>
	<script type="text/javascript" src="./js/top.js"></script>
	<script type="text/javascript" src="./js/bottom.js"></script>
	<script type="text/javascript" src="./js/center.js"></script>
	<script type="text/javascript" src="./js/east.js"></script>
	
	<script type="text/javascript" src="./js/MapTools/map.js"></script>
	<script type="text/javascript" src="./js/MapTools/hosWin.js"></script>
	<script type="text/javascript" src="./js/MapTools/draw.js"></script>
	<script type="text/javascript" src="./js/MapTools/search.js"></script>
	<script type="text/javascript" src="./js/manage/hospitalManage.js"></script>
	<script type="text/javascript" src="./js/manage/superviseManage.js"></script>
	
	<script type="text/javascript" src="./js/analysis/bufferWin.js"></script>
	<script type="text/javascript" src="./js/west2.js"></script>
	 
	<!--script type="text/javascript" src="./js/analysis/analysisHos.js"></script-->
	<script type="text/javascript" src="./js/Menu/centerMenu.js"></script>
	<title>上海牛奶集团GIS管理系统</title>
	
</head>
<body onresize=OnDocResize()>
</body>

</html>
