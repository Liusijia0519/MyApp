Ext.define('MyApp.store.system.RoleStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.system.RoleModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
        	//create: 'SystemRoleController.do?method=insertOrUpdate&type=inse',
            read: 'SystemRoleController.do?method=selectAllsystemRole',
            update: 'SystemRoleController.do?method=insertOrUpdate'
            //destroy: 'SystemRoleController.do?method=insertOrUpdate&type=del'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
       	 	type: 'json',  
            allowSingle: false,  
            encode: true,  
            root: 'records'
       }
    },
    autoDestroy: true
});