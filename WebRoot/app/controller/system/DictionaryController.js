/**
 * @class MyApp.controller.system.DictionaryController
 * @extends Ext.app.Controller
 * @description 字典管理控制器
 * @author 葛新
 */
Ext.define('MyApp.controller.system.DictionaryController', {
    extend: 'Ext.app.Controller',
    
    models: ['system.DictionaryTypeModel', 'system.DictionaryModel'],
    
    stores: ['system.DictionaryTypeStore', 'system.DictionaryStore'],
   
    views: ['system.dictionary.DictionaryTypeTree', 
            'system.dictionary.DictionaryTreeGrid',
            'system.dictionary.ModelEntrance'],
  
    refs: [{
    	ref: 'TreeGrid', //字典
    	selector: 'system_dictionary_dictionaryTreeGrid'
    }, {
    	ref: 'TypeTree', //字典类别
    	selector: 'system_dictionary_dictionaryTypeTree'
    }],
    
    init: function() {
    	var me = this;
    	me.control({
    		//字典
    		'system_dictionary_dictionaryTreeGrid': {
    			storeload: me.handleTreeGridStoreload
    		},
    		
    		//字典类别
    		'system_dictionary_dictionaryTypeTree': {
    			itemclick: me.handlerTypeTreeItemclick
    		},
    		
    		//新增字典
    		'system_dictionary_modelEntrance button[action=add]': {
    			click: me.handlerAddClick
    		},
    		//编辑字典
    		'system_dictionary_modelEntrance button[action=edit]': {
    			click: me.handlerEditClick
    		},
    		//保存操作
    		'system_dictionary_modelEntrance button[action=save]': {
    			click: me.handlerSaveClick
    		},
    		//刷新数据
    		'system_dictionary_modelEntrance button[action=refresh]': {
    			click: me.handlerRefreshClick
    		},
    		//重置缓存
    		'system_dictionary_modelEntrance button[action=reset]': {
    			click: me.handlerResetClick
    		}
        });
    },
    

    /**
     * 树加载完毕后设置选中第一行
     */
    handleTreeGridStoreload: function(store, node, records, successful, eOpts) {
    	this.getTreeGrid().getSelectionModel().select(0);
    },
    
    /**
     * 根据选择的字典类别查询对应字典数据集
     */
    handlerTypeTreeItemclick: function(tree, record, item, index, e, eOpts ) {
    	if(record.get('id') != 'root') {
    		var param = {};
    		param.code = record.get('code');
    		param.type = record.get('type');
    		this.getTreeGrid().getRootNode().set('text', record.get('text'));
    		this.getTreeGrid().getRootNode().commit();
    		this.getTreeGrid().getStore().proxy.extraParams = param;
    		this.getTreeGrid().refreshView();
    	}
    },
    
    /**
     * 新增字典
     */
    handlerAddClick: function() {
    	var me = this;
    	if(!me.addValidate()) {
    		Ext.popup.Msg('提示信息', '请先选择左侧字典类别');
    		return;
    	}
    	
    	//字典类型与编码
        var type = me.getTypeTree().getSelectRecord().get('type');
        var	code = me.getTypeTree().getSelectRecord().get('code');
        	
        //字典树表格
    	var treeGrid = me.getTreeGrid(),
    	 	selectionModel = treeGrid.getSelectionModel();
    	
    	var selectedList = type == 'combo' ? treeGrid.getRootNode() : selectionModel.getSelection()[0];
        if(!selectedList) {
        	Ext.popup.Msg('提示信息', '请先选择一个节点');
        	return;
        }

        var cellEditingPlugin = treeGrid.cellEditingPlugin,
         	newList = Ext.create('MyApp.model.system.DictionaryModel', {
        	id: MyAppUtil.guid(),
            text: '请在这里输入字典显示的值',
            leaf: true,
            dictionaryTypeCode: code,
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
     * 添加字典时需要验证是否选择了字典类别
     */
    addValidate: function() {
    	var id = this.getTypeTree().getSelecedRecordId();
    	return (id != '' && id != 'root');
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
    handlerEditClick: function() {
    	var me = this;
    	if(!me.addValidate()) {
    		Ext.popup.Msg('提示信息', '请先选择左侧字典类别');
    		return;
    	}
    	var treeGrid = me.getTreeGrid(),
        cellEditingPlugin = treeGrid.cellEditingPlugin,
        selectionModel = treeGrid.getSelectionModel(),
        selectedList = selectionModel.getSelection()[0];
        if(!selectedList) {
        	Ext.popup.Msg('提示信息', '请选选择一个节点');
        	return;
        }
    	cellEditingPlugin.startEdit(selectedList, 0);
    },
    
    /**
     * 刷新字典
     */
    handlerRefreshClick: function() {
        this.getTreeGrid().refreshView();
    },
    
    /**
     * 重置缓存
     */
    handlerResetClick: function() {
    	var me = this;
    	if(!me.addValidate()) {
    		Ext.popup.Msg('提示信息', '请先选择左侧字典类别');
    		return;
    	}
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定重置[' + me.getTypeTree().getSelectRecord().get('text') + ']的字典数据缓存吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: me.doResetCache,
			scope: me
    	});
    },
    
    /**
     * 清空服务器端缓存
     */
    doResetCache: function(buttonId) {
    	var me = this;
    	if(buttonId == 'ok') {
        	Ext.Ajax.request({
        	    url: 'SystemDictionaryController.do?method=evictSystemDictionaryCache',
        	    mask: true,
        	    params: {
        	        code: me.getTypeTree().getSelectRecord().get('code')
        	    }
        	});
    	}
    }
    
});