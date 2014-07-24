Ext.define('MyApp.ux.upload.UploadWindow', {
    extend: 'Ext.window.Window',

    height: 400,
    width: 700,
    title: '文件上传',
    closeAction: 'hide',
    maximizable: true,
    layout: 'fit',
    
    uploadParams: null,

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
        	items: [{
        		xtype: 'uploadContainer',
        		uploadParams: me.uploadParams,
        		url: 'SystemUploadController.do?method=uploadFile',
        		border: false
        	}]
        });
        me.callParent(arguments);
        me.on('hide', me.handlerHide, me);
    },
    
    handlerHide: function() {
    	this.down('uploadContainer').resetContent();
    }

});