Ext.define('MyApp.view.system.user.DepartmentTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'system_user_departmentTree',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        	store: 'system.DepartmentReadStore'
        });

        me.callParent(arguments);
    },
    
    getSelecedRecordId: function() {
    	var record = this.getSelectionModel().getSelection()[0];
    	return record ? record.getId() : '';
    }

});