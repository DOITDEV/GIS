<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>上海牛奶集团GIS管理系统</title>

    <link rel="stylesheet" type="text/css" href="css/desktop.css" />

    <!-- GC -->

    <!-- <x-compile> -->
    <!-- <x-bootstrap> -->
    <script charset="utf-8" src="http://map.soso.com/api/v2/main.js?key=8ab6fbe26931337aad7ab867467d4e9c"></script>
    <script src="http://api.map.soso.com/plugin/v2/PanoramaOverview/PanoramaOverview-min.js?key=8ab6fbe26931337aad7ab867467d4e9c"></script> 
    <script type="text/javascript" src="../basejs/shared/include-ext.js"></script>
    <script type="text/javascript" src="../basejs/shared/options-toolbar.js"></script>
    <!-- </x-bootstrap> -->
    <script type="text/javascript">
        var doitmap;
        Ext.Loader.setPath({
            'Ext.ux.desktop': 'js',
            MyDesktop: ''
        });

        Ext.require('MyDesktop.App');

        var myDesktopApp;
        Ext.onReady(function () {
            myDesktopApp = new MyDesktop.App();
        });
    </script>
    <!-- </x-compile> -->
</head>

<body>

</body>
</html>
