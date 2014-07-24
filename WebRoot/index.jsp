<%@ page language="java" pageEncoding="UTF-8" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>欢迎登录本系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="description" content="">
	<link rel="stylesheet" href="extjs/resources/css/ext-all-neptune.css" type="text/css"></link>
	<style type="text/css">
    	*{font-size:12px!important;}
    	.login-logo {
    		/* background-image: url("resources/images/other/20130830111339.jpg");*/
    		 background-image: url("resources/images/other/woSettlement_logo.png");
    		} 
	</style>
	<script type="text/javascript" src="extjs/ext-all.js"></script>
	<script type="text/javascript" src="extjs/locale/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="app/view/Login.js"></script>
	<script type="text/javascript">
		Ext.onReady(function() {
			Ext.create("MyApp.view.Login", {
			}).show();
		});  	
	</script>
  </head>
  <body>
  </body>
</html>
