Ext.define('MyApp.store.system.RoleMenuActionStore', {
    extend: 'Ext.data.TreeStore',
    model: 'MyApp.model.system.RoleMenuActionModel',
    root: {
        expanded: false,
        id: 'root',
        text: '菜单与操作权限设置',
        leaf: false
    },
    proxy: {
    	type: 'ajax',
        api: {
            read: 'SystemRoleController.do?method=selectMenuActionList',
            update: 'SystemRoleController.do?method=saveMenuActions'
        },
        reader: {
            type: 'json'
        },
        writer: {
        	 type: 'json',  
             allowSingle: false,  
             encode: true,  
             root: 'records'
        }
    },
    autoLoad: false
});