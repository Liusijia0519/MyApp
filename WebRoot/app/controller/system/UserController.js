/**
 * @class MyApp.controller.system.UserController
 * @extends Ext.app.Controller
 * @description 系统用户管理控制器
 * @author 葛新
 */
Ext.define('MyApp.controller.system.UserController', {
    extend: 'Ext.app.Controller',
    
    stores: ['system.UserStore', 'system.DepartmentReadStore'],
     
    models: ['system.UserModel', 'system.DepartmentModel'],
   
    views: ['system.user.UserList', 
    		'system.user.Form', 
    		'system.user.DepartmentTree',
    		'system.user.UserSelectControl',
    		'system.user.UserWindow'],
  
    refs: [{
    	ref: 'userList', //用户grid
    	selector: 'system_user_userList'
    }, {
    	ref: 'searchForm', //条件查询表单
    	selector: 'system_user_modelEntrance baseFormPanel'
    }, {
    	ref: 'userForm', //新增与编辑用户窗体
    	selector: 'system_user_form',
    	xtype: 'system_user_form',
    	autoCreate: true
    }, {
    	ref: 'departmentTree', //机构树
    	selector: 'system_user_modelEntrance system_user_departmentTree'
    }],
    
    init: function() {
    	var me = this;
    	me.control({
    		/* system_user_modelEntrance baseFormPanel */
    		//新增用户
    		'system_user_modelEntrance baseFormPanel button[action=newRecord]': {
    			click: me.handleNewRecordClick
    		},
    		//编辑用户
    		'system_user_modelEntrance baseFormPanel button[action=editRecord]': {
    			click: me.handleEditRecordClick
    		},
    		//重置密码
    		'system_user_modelEntrance baseFormPanel button[action=resetPassword]': {
    			click: me.handleResetPasswordClick
    		},
    		//锁定用户
    		'system_user_modelEntrance baseFormPanel button[action=lock]': {
    			click: me.handleLockClick
    		},
    		//锁定用户
    		'system_user_modelEntrance baseFormPanel button[action=unlock]': {
    			click: me.handleUnlockClick
    		},
    		//高级查询
    		'system_user_modelEntrance baseFormPanel button[action=search]': {
    			click: me.handleSearchClick
    		},
    		
    		/*system_user_form*/
    		//提交数据
    		'system_user_form button[action=submit]': {
    			click: me.formSubmit
    		},
    		//关闭窗口
    		'system_user_form button[action=hide]': {
    			click: me.formHide
    		},
    		//清空表单
    		'system_user_form': {
    			hide: me.handlerFormHide
    		}
        });
    },
    
    handlerUserSelect: function(record) {
    	this.getUserForm().down('baseFormPanel').setFieldValue('id',record.get('id'));
    	this.getUserForm().down('baseFormPanel').setFieldValue('realName', record.get('username'));
    },
    
    /**
     * 新增用户
     */
    handleNewRecordClick: function() {
    	this.getUserForm().setTitle("新增用户");
    	this.getUserForm().show();
    },
    
    /**
     * 编辑用户
     */
    handleEditRecordClick: function() {
    	var me = this;
    	var userList = this.getUserList();
    	if(!userList.isSelected()) {
    		Ext.popup.Msg('提示信息', "请选择一行记录");
    		return;
    	}
    	this.getUserForm().setTitle("编辑用户");
    	this.getUserForm().show();
    	var form = this.getUserForm().down('baseFormPanel');
    	form.load({
    		url: 'SystemUserController.do?method=getUserById',
    	    params: {
    	        id: userList.getSelectedRecordId()
    	    }
    	});
    },
    
    /**
     * 重置用户密码
     */
    handleResetPasswordClick: function() {
    	var me = this;
    	if(!this.getUserList().isSelected()) {
    		Ext.popup.Msg('提示信息', '请选择一行记录');
    		return;
    	}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定将['+ this.getUserList().getSelectedCellValue('realName') +']的密码设置为[123456]吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doResetPassword,
			scope: me
    	});
    },
    
    /**
     * 重置用户密码
     */
    doResetPassword: function(buttonId) {
    	var me = this;
    	if(buttonId == "ok") {
        	Ext.Ajax.request({
        	    url: 'SystemUserController.do?method=updatePassword',
        	    mask: true,
        	    params: {
        	        id: this.getUserList().getSelectedRecordId()
        	    }
        	});
    	}
    },
    
    /**
     * 锁定用户账户
     */
    handleLockClick: function() {
    	var me = this;
    	if(!this.getUserList().isSelected()) {
    		Ext.popup.Msg('提示信息', '请选择一行记录');
    		return;
    	}
    	if(this.getUserList().getSelectedCellValue('state') == 'lock') {
    		Ext.popup.Msg('提示信息', '请用户的账户已经被锁定');
    		return;
    	}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定将['+ this.getUserList().getSelectedCellValue('realName') +']的账户锁定吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doLock,
			scope: me
    	});
    },
    
    /**
     * 锁定用户账户
     */
    doLock: function(buttonId) {
    	var me = this;
    	if(buttonId == "ok") {
	    	Ext.Ajax.request({
	    	    url: 'SystemUserController.do?method=updateState',
	    	    mask: true,
	    	    params: {
	    	        id: this.getUserList().getSelectedRecordId(),
	    	        state: 'lock'
	    	    },
	    	    success: function(response) {
	    	    	var result = response.responseText;
	    	    	if(Ext.JSON.decode(result).success) {
	    	    		me.getUserList().refresh();
	    	    	}
	    	    }
	    	});
    	}
    },
    
    /**
     * 解除锁定
     */
    handleUnlockClick: function() {
    	var me = this;
    	if(!this.getUserList().isSelected()) {
    		Ext.popup.Msg('提示信息', '请选择一行记录');
    		return;
    	}
    	if(this.getUserList().getSelectedCellValue('state') != 'lock') {
    		Ext.popup.Msg('提示信息', '此账户的状态为正常');
    		return;
    	}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定将['+ this.getUserList().getSelectedCellValue('realName') +']的账户解除锁定吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doUnlock,
			scope: me
    	});
    },
    
    /**
     * 解除账户锁定
     */
    doUnlock: function(buttonId) {
    	var me = this;
    	if(buttonId == "ok") {
	    	Ext.Ajax.request({
	    	    url: 'SystemUserController.do?method=updateState',
	    	    mask: true,
	    	    params: {
	    	        id: this.getUserList().getSelectedRecordId(),
	    	        state: 'normal'
	    	    },
	    	    success: function(response) {
	    	    	var result = response.responseText;
	    	    	if(Ext.JSON.decode(result).success) {
	    	    		me.getUserList().refresh();
	    	    	}
	    	    }
	    	});
    	}
    },
    
    /**
     * 高级查询
     */
    handleSearchClick: function() {
    	var param = this.getSearchForm().getValues();
    	var departmentId = this.getDepartmentTree().getSelecedRecordId();
    	if(departmentId != 'root' && departmentId != '') {
    		param.departmentId = departmentId;
    	}
    	console.log(param);
    	this.getUserList().getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
    	this.getUserList().refresh();
    },
    
    /**
     * 表单提交
     */
    formSubmit: function() {
    	var me = this;
    	if(!me.getUserForm().down('baseFormPanel').isValid()) {
    		return;
    	}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定保存数据吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doFormSubmit,
			scope: me
    	});
    },
    
    /**
     * 保存用户信息提交到服务器
     */
    doFormSubmit: function(buttonId) {
    	if(buttonId == "ok") {
			var me = this;
			var form = me.getUserForm().down('baseFormPanel');
			form.submit({
				method: "POST",
			    url: 'SystemUserController.do?method=insertOrUpdateUser',
			    success: function() {
			    	me.getUserForm().hide();
			    	me.getUserList().refresh();
			    }
			});
    	}
    },
    
    /**
     * 取消按钮事件
     */
    formHide: function() {
    	this.getUserForm().hide();
    },
    
    /**
     * 表单关闭事件清空表单元素
     */
    handlerFormHide: function() {
    	this.getUserForm().down('baseFormPanel').resetFields();
    }
    
});