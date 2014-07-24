/**
 * @class MyApp.base.DictionaryTreePicker
 * @extends Ext.grid.Panel
 * @description 系统字典TreePicker
 * @author 葛新
 */
Ext.define("MyApp.base.DictionaryTree", {
	extend: 'Ext.tree.TreePanel',
	xtype: 'dictionaryTree',
	
	code: '',
	rootText: '',
	
	initComponent: function() {
        var me = this;
        Ext.apply(me, {
        	store:  Ext.create('Ext.data.TreeStore', {
        	    fields: ['id', 'text'],
        	    root: {
        	        expanded: true,
        	        id: 'root',
        	        text: me.rootText,
        	        leaf: false
        	    },
        	    proxy: {
        	        type: 'ajax',
        	        url: 'SystemDictionaryController.do?method=selectAvailablDictionary',
        	        extraParams: {
        	        	code: me.code,
        	        	type: 'tree'
        	        },
        	        reader: {
        	            type: 'json'
        	        }
        	    }
        	}),
        	rootVisible: true,
            displayField: 'text'
        });

        me.callParent(arguments);
    },
    
    getSelecedRecordId: function() {
    	var record = this.getSelectionModel().getSelection()[0];
    	return record ? record.getId() : '';
    },
    getSelecedRecordText: function() {
    	var record = this.getSelectionModel().getSelection()[0];
    	return record ? record.raw.text : '';
    }
});