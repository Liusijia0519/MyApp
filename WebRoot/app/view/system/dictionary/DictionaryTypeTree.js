Ext.define('MyApp.view.system.dictionary.DictionaryTypeTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'system_dictionary_dictionaryTypeTree',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        	store: 'system.DictionaryTypeStore'
        });

        me.callParent(arguments);
    },
    
    getSelecedRecordId: function() {
    	var record = this.getSelectionModel().getSelection()[0];
    	return record ? record.getId() : '';
    },
    
    getSelectRecord: function() {
    	return this.getSelectionModel().getSelection()[0];
    }

});