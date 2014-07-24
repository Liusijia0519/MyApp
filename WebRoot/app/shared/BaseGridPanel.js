/**
 * @class MyApp.base.BaseGridPanel
 * @extends Ext.grid.Panel
 * @description 系统表格基础类 对常用方法进行封装
 * @author 葛新
 */
Ext.define("MyApp.base.BaseGridPanel", {
	extend: 'Ext.grid.Panel',
	xtype: 'baseGridPanel',
	requires: ['Ext.ux.ProgressBarPager'],
	
	pagging: true,
	
	//canCheck: true,
	
	initComponent: function() {
        var me = this;
    	
        Ext.applyIf(me, {
        	columnLines: true
        });

        if(me.canCheck) {
        	Ext.apply(me, {
    			selModel: {
					mode: 'SINGLE'
				},
				selType: 'checkboxmodel'
        	});
        }
        
        me.callParent(arguments);
        
        me.getView().loadingText = "数据读取中...";
        
        if(me.pagging) {
	        me.addDocked(
				Ext.create("MyApp.ux.CustomPageSizePaging",{
			        store: me.store,   
			        dock: 'bottom',
			        displayInfo: true,
			        plugins: Ext.create("Ext.ux.ProgressBarPager")
				})
			);
        }
    },
    
    /**
     * 刷新当前页
     */
    refresh: function() {
    	this.getStore().reload();
    	this.getSelectionModel().deselectAll();
    },
    
    /**
     * 左侧导航菜单宽度变化时调整下拉的Menu的大小,以适应按钮宽度
     * @param {pageNo} width
     */
    loadPage: function(pageNo) {
    	this.getStore().loadPage(pageNo);
    	if(this.getSelectionModel().selectionMode != 'SINGLE'){
    		this.getSelectionModel().deselectAll();   		
    	}
    },
    
    /**
     * 获得选中行的Records(多选)
     * @Return{Ext.data.Model[]}
     */
    getSelectedRecords: function() {
    	return this.getSelectionModel().getSelection();
    },
    
    /**
     * 获得选中行的Record(单选)
     * 注意:如果多选则返回选中第一行
     * @Return{Ext.data.Model}
     */
    getSelectedRecord: function() {
    	return this.getSelectionModel().getSelection()[0];
    },
    
    /**
     * 获得选中行Record(单选)的ID
     * 注意:如果多选则返回选中第一行
     * @Return{Number/String}
     */
    getSelectedRecordId: function() {
    	var record = this.getSelectedRecord();
    	return record ? record.getId() : "";
    },
    
    /**
     * 获得选中行Record(单选)单元格的值
     * 注意:如果多选则返回选中第一行
     * @param {string} dataIndex
     * @Return{Object}
     */
    getSelectedCellValue: function(dataIndex) {
    	var record = this.getSelectedRecord();
    	return record.get(dataIndex);
    },
    
    /**
     * 获得选中行Record(多选)的ID集合
     * @param {Boolean} join 如果传入true 那么将返回以","(逗号)连接的字符串 例如:"1,2,3" 否则返回数组 例如:[1,2,3]
     * @Return{Array/String}
     */
    getSelectedRecordIds: function(join) {
    	var records = this.getSelectedRecords(),
    		ids = [];
    	Ext.each(records, function(item) {
    		ids.push(item.getId());
    	});
    	return join === true ? ids.join(",") : ids;
    },
    
    /**
     * 判断是否选中行
     * @Return{Boolean}
     */
    isSelected: function() {
    	return this.getSelectionModel().getSelection().length != 0;
    }
    
});