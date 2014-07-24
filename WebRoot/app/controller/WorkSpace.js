/**
 * 系统工作空间控制器
 */
Ext.define('MyApp.controller.WorkSpace', {
    extend: 'Ext.app.Controller',
    
    models: ['MenuModel'],
    
    stores: ['DataViewStore'],

    views: [
        'workspace.WorkNorthToolbar',
        'workspace.WorkCenterTabPanel',
        'workspace.WorkCenterContainer',
        'workspace.WorkWestTreePanel',
        'UpdatePasswordWindow'
    ],
    
    refs: [{
    	ref: 'workCenterTab',
    	selector: 'viewport > workspace_workCenterTabPanel'
    }, {
    	ref: 'workCenterContainer',
    	selector: 'viewport > workspace_workCenterContainer'
    }, {
    	ref: 'updatePasswordWin',
    	selector: 'updatePasswordWindow',
    	xtype: 'updatePasswordWindow',
    	autoCreate: true
    }],
    
    init: function() {
    	var me = this;
    	me.control({
            //经典风格
            'workspace_workNorthToolbar': {
            	menuitemclick: me.handlerToolMenuClick
            },
            //原始风格
            'workspace_workWestTreePanel': {
            	menuitemclick: me.handlerToolMenuClick
            },
            //安全退出
            'workspace_workNorthToolbar button[action=exitSystem]': {
            	click: me.handlerExitSystemClick
            },
            //修改密码
            'workspace_workNorthToolbar button[action=modifyPassword]': {
            	click: me.handlerModifyPasswordClick
            },
            'updatePasswordWindow button[action=save]': {
            	click: me.handlerSaveClick
            },
            'updatePasswordWindow button[action=cancel]': {
            	click: me.handlerCancelClick
            },
            'updatePasswordWindow': {
            	hide: me.handlerPasswordWindowHide
            }
        });
    },
    
    /**
     * 菜单项单击事件 加载模块
     * @param {MyApp.model.MenuModel} record
     */
    handlerMenuClick: function(record) {
    	var application = this.getApplication();
    	this.getWorkCenterTab().openModel(record, application);
    },
    
    /**
     * 菜单项单击事件 加载模块
     * @param {MyApp.model.MenuModel} record
     */
    handlerToolMenuClick: function(record) {
    	var application = this.getApplication();
    	this.getWorkCenterContainer().openModel(record, application);
    },
    
    /**
     * 退出系统按钮单击事件
     */
    handlerExitSystemClick: function() {
    	var me = this;
    	Ext.Msg.show({
    	    title:'提示信息',
    	    msg: '确定安全退出系统吗?',
    	    buttons: Ext.Msg.OKCANCEL,
    	    icon: Ext.Msg.QUESTION,
    	    fn: me.doQuit,
    	    scope: me 
    	});
    },
    
    /**
     * 退出系统
     */
    doQuit: function(buttonId) {
    	if(buttonId == "ok") {
        	Ext.Ajax.request({
    		    url: 'SystemLoginController.do?method=doQuit',
    		    success: function(response){
    		    	location.href = 'index.jsp';
    		    }
    		}); 
    	}
    },
    
    
    /**
     * 修改密码按钮事件
     */
    handlerModifyPasswordClick: function() {
    	this.getUpdatePasswordWin().show();
    },
    
    /**
     * 修改密码
     */
    handlerSaveClick: function() {
    	var me = this;
    	var form = me.getUpdatePasswordWin().down('baseFormPanel');
    	if(!form.isValid()) {
    		return;
    	}
    	Ext.Msg.show({
    	    title:'提示信息',
    	    msg: '确定修改登录密码吗?',
    	    buttons: Ext.Msg.OKCANCEL,
    	    icon: Ext.Msg.QUESTION,
    	    fn: me.doSubmit,
    	    scope: me 
    	});
    },
    
    /**
     * 修改密码提交表单
     */
    doSubmit: function(buttonId) {
    	var me = this;
    	if(buttonId == "ok") {
    		var form = me.getUpdatePasswordWin().down('baseFormPanel');
    		form.submit({
    			url: 'SystemLoginController.do?method=updatePassword',
    			success: function() {
    				me.getUpdatePasswordWin().hide();
    			}
    		});
    	}
    },
    
    /**
     * 关闭窗体
     */
    handlerCancelClick: function() {
    	this.getUpdatePasswordWin().hide();
    },
    
    /**
     * 窗体关闭事件清空表单
     */
    handlerPasswordWindowHide: function() {
    	this.getUpdatePasswordWin().down('baseFormPanel').resetFields();
    }
    
});