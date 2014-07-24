/**
 * 注册Ext.Ajax.request.beforerequest事件
 * @param {Ext.data.Connection} conn
 * @param {Object} options
 * @param {Object} eOpts
 */
Ext.Ajax.on('beforerequest', function(conn, options, eOpts) {
	if(options.mask) {
		Ext.MessageBox.show({
	        msg: '<br>操 作 正 在 处 理 中  请  稍  等....',
	        width:300,
	        wait:true,
	        waitConfig: {interval:300},
	        iconHeight: 50,
	        icon:'ext-mb-download'
	    });
	}
});

/**
 * 注册Ext.Ajax.request.requestcomplete事件
 * @param {Ext.data.Connection} conn
 * @param {The XMLHttpRequest Object} response
 * @param {Object} options
 * @param {Object} eOpts
 */
Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts) {
	if(options.mask && !Ext.MessageBox.isHidden()) {
		Ext.MessageBox.hide();
	}
	var result = Ext.JSON.decode(response.responseText);
	
	if(result.timeOut === true) {
		Ext.Msg.show({
		     title: '提示信息',
		     msg: '您尚未登录或已登录超时!',
		     buttons: Ext.MessageBox.OK,
		     icon: Ext.Msg.INFO,
		     buttonText: {ok: '重新登录'},
		     fn: function() {
		    	 location.href = 'index.jsp';
		     }
		});
		return;
	}
	
	if(result.success && options.mask) {
		Ext.popup.Msg('提示信息', '操作成功');
	}
	
	if(!result.success && result.message) {
		Ext.Msg.show({
		     title: '提示信息',
		     msg: result.message,
		     buttons: Ext.MessageBox.OK,
		     icon: Ext.Msg.ERROR
		});
	}
});

/**
 * 注册Ext.Ajax.request.requestexception事件
 * @param {Ext.data.Connection} conn
 * @param {The XMLHttpRequest Object} response
 * @param {Object} options
 * @param {Object} eOpts
 */
Ext.Ajax.on('requestexception', function(conn, response, options, eOpts) {
	if(options.mask && !Ext.MessageBox.isHidden()) {
		Ext.MessageBox.hide();
	}
	Ext.Msg.show({
	     title: '提示信息',
	     msg: "服务器端出现异常</br>错误编码: " + response.status + " " + response.statusText,
	     buttons: Ext.Msg.OK,
	     icon: Ext.Msg.ERROR
	});
});

