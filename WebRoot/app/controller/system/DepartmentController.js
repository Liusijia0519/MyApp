/**
 * @class MyApp.controller.system.DepartmentController
 * @extends Ext.app.Controller
 * @description 部门管理控制器
 * @author 葛新
 */
Ext.define('MyApp.controller.system.DepartmentController', {
    extend: 'Ext.app.Controller',
    
    models: ['system.DepartmentModel'],
   
    views: ['system.department.DepartmentTreeGrid'],
  
   refs: [{
    	ref: 'TreeGrid', //新增与编辑用户窗体
    	selector: 'system_department_departmentTreeGrid'
    }],
    
    init: function() {
    	var me = this;
    	me.control({
    		//新增机构
    		'system_department_modelEntrance button[action=addDept]': {
    			click: me.handlerAddDeptClick
    		},
    		//编辑信息
    		'system_department_modelEntrance button[action=editDept]': {
    			click: me.handlerEditDeptClick
    		},
    		//保存操作
    		'system_department_modelEntrance button[action=save]': {
    			click: me.handlerSaveClick
    		},
    		//刷新数据
    		'system_department_modelEntrance button[action=refresh]': {
    			click: me.handlerRefreshClick
    		}
        });
    },
    
    /**
     * 新增节点
     */
    handlerAddDeptClick: function() {
    	if(!this.addDeptValidate()) {
    		Ext.popup.Msg('提示信息', '请选择一个节点');
    		return;
    	}
    	var me = this,
        treeGrid = me.getTreeGrid(),
        cellEditingPlugin = treeGrid.cellEditingPlugin,
        selectionModel = treeGrid.getSelectionModel(),
        selectedList = selectionModel.getSelection()[0],
        newList = Ext.create('MyApp.model.system.DepartmentModel', {
        	id: MyAppUtil.guid(),
            text: '请在这里输入机构名称',
            leaf: true,
            availabl: true,
            loaded: true
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
    addDeptValidate: function() {
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
    		this.getTreeGrid().getStore().sync({
        		mask: true
        	});
    	}
    },
    
    /**
     * 编辑信息
     */
    handlerEditDeptClick: function() {
    	if(!this.addDeptValidate()) {
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