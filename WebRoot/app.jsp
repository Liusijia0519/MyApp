<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>网上结算管理系统</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="Extjs,SpringMVC,ExtMVC,Mybatis">
	<meta http-equiv="description" content="网上结算管理系统">
	
	<!-- 系统CSS -->
	<link rel="stylesheet" href="extjs/resources/css/ext-all-gray.css" type="text/css"></link>
	<link rel="stylesheet" href="extjs/ux/css/ItemSelector.css" type="text/css"></link>
	<link rel="stylesheet" href="app/shared/PopupMsg.css" type="text/css"></link>
	<link rel="stylesheet" href="resources/css/system.css" type="text/css"></link>
	<link rel="stylesheet" href="resources/css/operationIcons.css" type="text/css"></link>
	<link rel="stylesheet" href="resources/css/businessIcons.css" type="text/css"></link>
	<link rel="stylesheet" href="resources/css/menuIcons.css" type="text/css"></link>
	<style type="text/css">
    	*{font-size:12px!important;}
    	.x-tree-node-text{line-height:15px;}
	</style>
  </head>
  <body>
	<div id="system_loading-mask" style=""></div>
  	<div id="system_loading">
        <div class="loading-indicator">
            <img src="resources/images/other/extanim32.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/>
           		网上结算管理系统&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br /><span id="loading-msg">系统准备初始化,请稍等...</span>
        </div>
    </div>
	<div id="code-load" style="display:none;">
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = '正在加载系统核心资源文件...';</script>
		<script type="text/javascript" src="extjs/ext-all-debug-w-comments.js"></script>
		<script type="text/javascript" src="fusioncharts/FusionCharts.js"></script>
		<script type="text/javascript" src="app/override/DatefieldOverride.js"></script>
		<script type="text/javascript" src="app/override/DataProxyOverride.js"></script>
		<script type="text/javascript" src="app/override/AjaxProxyOverride.js"></script>
		<script type="text/javascript" src="extjs/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="app/shared/ApplyVTypes.js"></script>
		<script type="text/javascript" src="app/shared/AjaxRequestHandler.js"></script>
		<script type="text/javascript" src="app/shared/CallbackUtil.js"></script>
		<script type="text/javascript" src="app/shared/PopupMsg.js"></script>
		<script type="text/javascript" src="app/shared/MyAppUtil.js"></script>
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = '正在初始化系统工作空间...';</script>
		<script type="text/javascript" src="app.js"></script>			    
	</div>
  </body>
</html>