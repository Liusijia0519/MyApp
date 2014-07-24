/**
 * @class MyApp.base.DictionaryCombo
 * @extends Ext.form.field.ComboBox
 * @description 系统字典Combo
 * @author 葛新
 */
Ext.define("MyApp.base.DictionaryCombo", {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'dictionaryCombo',
	
	code: '',
	
	editable: false,
	
	queryMode: 'local',
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
        	store:  Ext.create('Ext.data.Store', {
        	    fields: ['id', 'text'],
        	    autoLoad: true,
        	    proxy: {
        	        type: 'ajax',
        	        url: 'SystemDictionaryController.do?method=selectAvailablDictionary',
        	        extraParams: {
        	        	code: me.code,
        	        	type: 'combo'
        	        },
        	        reader: {
        	            type: 'json'
        	        }
        	    }
        	}),
            displayField: 'text',
            valueField: 'id'
        });

        me.callParent(arguments);
    }
    
});