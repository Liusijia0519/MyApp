/**
 * @class MyApp.base.DictionaryTreePicker
 * @extends Ext.grid.Panel
 * @description 系统字典TreePicker
 * @author 葛新
 */
Ext.define("MyApp.base.DictionaryTreePicker", {
	extend: 'Ext.ux.TreePicker',
	xtype: 'dictionaryTreePicker',
	
	code: '',
	
	initComponent: function() {
        var me = this;
        Ext.apply(me, {
        	store:  Ext.create('Ext.data.TreeStore', {
        	    fields: ['id', 'text'],
        	    root: {
        	        expanded: true,
        	        id: 'root',
        	        text: '系统字典',
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
    }
    
});