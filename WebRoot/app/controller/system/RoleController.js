/**
 * @class MyApp.controller.system.RoleController
 * @extends Ext.app.Controller
 * @description 角色权限设置控制器
 * @author 葛新
 */
Ext.define('MyApp.controller.system.RoleController', {
    extend: 'Ext.app.Controller',
    
    stores: ['system.RoleStore', 'system.RoleMenuActionStore'],
     
    models: ['system.RoleMenuActionModel'],
   
    views: ['system.role.RoleGrid', 'system.role.MenuActionTree'],
  
    refs: [{
    	ref: 'RoleGrid', //角色grid
    	selector: 'system_role_roleGrid'
    }, {
    	ref: 'MenuActionTree',
    	selector: 'system_role_menuActionTree'
    }],
    
    init: function() {
    	var me = this;
    	me.control({
    		/*system_role_modelEntrance*/
    		//添加角色
    		'system_role_modelEntrance button[action=add]': {
    			click: me.handlerAddClick
    		},
    		//删除角色
    		'system_role_modelEntrance button[action=delete]': {
    			click: me.handlerDeleteClick
    		},
    		//保存操作
    		'system_role_modelEntrance button[action=save]': {
    			click: me.handlerSaveClick
    		},
    		//保存权限
    		'system_role_modelEntrance button[action=saveRights]': {
    			click: me.handlerSaveRightsClick
    		},
    		
    		/*system_role_roleGrid*/
    		//编辑事件
    		'system_role_roleGrid[title=系统角色]': {
    			edit: me.handleCancelEdit
    		},
    		//加载菜单与权限树
    		'system_role_roleGrid': {
    			actioncolumnclick: me.handleActioncolumnClick
    		}
        });
    },
    
    handlerAddClick: function() {
    	var me = this;
    	var roleModel = Ext.create('MyApp.model.system.RoleModel', {
    		id: MyAppUtil.guid(),
    		roleName: '输入角色名称',
    		explain: ''
    	});
    	me.addedNode = roleModel;
    	me.getRoleGrid().getStore().add(roleModel);
    	me.getRoleGrid().cellEditingPlugin.startEdit(roleModel, 1);
    },
    
    handlerSaveClick: function() {
    	var me = this;
		if(this.getRoleGrid().getStore().getModifiedRecords().length <= 0) {
			Ext.popup.Msg('提示信息', '没有新增与修改过的数据');
			return;
		}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '数据将会被保存到服务器 确定操作吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doSaveRole,
			scope: me
    	});
    },
    
    doSaveRole: function(buttonId) {
    	if(buttonId == "ok") {
    		this.getRoleGrid().getStore().sync({
        		mask: true
        	});
    	}
    },
    
    handleCancelEdit: function(editor, e, eOpts) {
    	var model = e.record,
        added = this.addedNode;
    	delete this.addedNode;
    	if(e.value == "输入角色名称" && added == model) {
    		added.phantom = true;
    		this.getRoleGrid().getStore().remove(added);
    		added.commit();
    	}
    },
    
    handleActioncolumnClick: function(grid, rowIndex, colIndex) {
    	var rec = grid.getStore().getAt(rowIndex);
    	grid.getSelectionModel().select(rec);
    	this.getMenuActionTree().setTitle('[' + rec.get('roleName') + "] 菜单与操作权限设置")
    	this.getMenuActionTree().getRootNode().removeAll();
    	this.getMenuActionTree().getStore().proxy.extraParams = {roleId: rec.get('id')};
    	this.getMenuActionTree().getStore().load({
    		mask: true
    	});
    },
    
    handlerSaveRightsClick: function() {
    	var me = this;
		if(this.getMenuActionTree().getStore().getModifiedRecords().length <= 0) {
			Ext.popup.Msg('提示信息', '没有修改过的数据');
			return;
		}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '数据将会被保存到服务器 确定操作吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doSaveAction,
			scope: me
    	});
    },
    
    doSaveAction: function(buttonId) {
    	if(buttonId == "ok") {
    		this.getMenuActionTree().getStore().sync({
        		mask: true
        	});
    	}
    },
    
    handlerDeleteClick: function() {
    	var me = this;
    	if(!me.getRoleGrid().isSelected()) {
    		Ext.popup.Msg('提示信息', '请选择一行记录');
    		return;
    	}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '删除角色同时会删除关联数据且不可恢复<br>确定删除操作吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doDeleteAction,
			scope: me
    	});
    },
    
    doDeleteAction: function(buttonId) {
    	var me = this;
    	if(buttonId == "ok") {
        	Ext.Ajax.request({
        	    url: 'SystemRoleController.do?method=deleteRole',
        	    mask: true,
        	    params: {
        	        roleId: me.getRoleGrid().getSelectedRecordId()
        	    },
        	    success: function() {
        	    	me.getRoleGrid().refresh();
        	    	me.getMenuActionTree().getRootNode().removeAll();
        	    }
        	});
    	}
    }
    
});