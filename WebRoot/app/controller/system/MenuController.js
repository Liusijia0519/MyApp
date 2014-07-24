/**
 * @class MyApp.controller.system.MenuController
 * @extends Ext.app.Controller
 * @description 系统菜单维护控制器
 * @author 葛新
 */
Ext.define('MyApp.controller.system.MenuController', {
    extend: 'Ext.app.Controller',
    
    models: ['system.MenuModel'],
   
    views: ['system.menu.MenuTreeGrid'],
    
    stores: ['system.MenuStore'],
  
    refs: [{
    	ref: 'TreeGrid', //菜单treegrid
    	selector: 'system_menu_menuTreeGrid'
    }],
    
    init: function() {
    	var me = this;
    	me.control({
    		//新增菜单
    		'system_menu_modelEntrance button[action=add]': {
    			click: me.handlerAddClick
    		},
    		//编辑菜单
    		'system_menu_modelEntrance button[action=edit]': {
    			click: me.handlerEditClick
    		},
    		//保存操作
    		'system_menu_modelEntrance button[action=save]': {
    			click: me.handlerSaveClick
    		},
    		//刷新数据
    		'system_menu_modelEntrance button[action=refresh]': {
    			click: me.handlerRefreshClick
    		}
        });
    },
    
    /**
     * 新增节点
     */
    handlerAddClick: function() {
    	if(!this.addValidate()) {
    		Ext.popup.Msg('提示信息', '请选择一个节点');
    		return;
    	}
    	var me = this,
        treeGrid = me.getTreeGrid(),
        cellEditingPlugin = treeGrid.cellEditingPlugin,
        selectionModel = treeGrid.getSelectionModel(),
        selectedList = selectionModel.getSelection()[0],
        newList = Ext.create('MyApp.model.system.MenuModel', {
        	id: MyAppUtil.guid(),
            text: '输入菜单显示名称',
            leaf: true,
            loaded: true,
            extController: '',
            springController: '',
            menuClass: '',
            icon16: '',
            icon24: '',
            icon32: '',
            icon48: ''
        }),
        expandAndEdit = function() {
            selectionModel.select(newList);
            me.addedNode = newList;
            cellEditingPlugin.startEdit(newList, 0);
        };
        if(selectedList.isLeaf()) {
        	selectedList.set('leaf', false);
        	selectedList.set('loaded', true);
        }
        selectedList.expand();
    	selectedList.appendChild(newList);
    	if(treeGrid.getView().isVisible(true)) {
            expandAndEdit();
        } else {
        	treeGrid.on('expand', function onExpand() {
                expandAndEdit();
                treeGrid.un('expand', onExpand);
            });
        	treeGrid.expand();
        }
    },
    
    /**
     * 添加机构节点前验证是否选择了根节点
     */
    addValidate: function() {
    	return this.getTreeGrid().getSelecedRecordId() ? true : false;
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
     * 编辑信息
     */
    handlerEditClick: function() {
    	if(!this.addValidate()) {
    		Ext.popup.Msg('提示信息', '请选择一个节点');
    		return;
    	}
    	var me = this,
        treeGrid = me.getTreeGrid(),
        cellEditingPlugin = treeGrid.cellEditingPlugin,
        selectionModel = treeGrid.getSelectionModel(),
        selectedList = selectionModel.getSelection()[0];
    	cellEditingPlugin.startEdit(selectedList, 0);
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