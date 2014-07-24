/**
 * @class MyApp.controller.system.ActionController
 * @extends Ext.app.Controller
 * @description 系统操作权限托管控制器
 * @author 葛新
 */
Ext.define('MyApp.controller.system.ActionController', {
    extend: 'Ext.app.Controller',
    
    models: ['system.ActionModel'],
   
    views: ['system.action.ActionTreeGrid', 'system.action.ModelEntrance'],
    
    stores: ['system.ActionStore'],
  
    refs: [{
    	ref: 'TreeGrid', //菜单treegrid
    	selector: 'system_action_actionTreeGrid'
    }],
    
    init: function() {
    	var me = this;
    	me.control({
    		//保存操作
    		'system_action_modelEntrance button[action=save]': {
    			click: me.handlerSaveClick
    		},
    		//刷新数据
    		'system_action_modelEntrance button[action=refresh]': {
    			click: me.handlerRefreshClick
    		}
        });
    },
    
    /**
     * 保存操作 提示对话框
     */
    handlerSaveClick: function() {
    	var me = this;
		if(this.getTreeGrid().getStore().getModifiedRecords().length <= 0) {
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
    
    /**
     * 与服务器端同步
     */
    doSaveAction: function(buttonId) {
    	if(buttonId == "ok") {
    		var modifieds = this.getTreeGrid().getStore().getModifiedRecords();
    		this.getTreeGrid().getStore().sync({
        		mask: true,
        		success: function() {
        			Ext.each(modifieds, function(m) {
        				m.commit();
        			});
        		}
        	});
    	}
    },

    /**
     * 刷新
     */
    handlerRefreshClick: function() {
    	var me = this,
        treeGrid = me.getTreeGrid();
    	treeGrid.refreshView();
    }
    
});