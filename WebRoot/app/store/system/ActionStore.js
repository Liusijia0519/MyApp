Ext.define('MyApp.store.system.ActionStore', {
    extend: 'Ext.data.TreeStore',
    model: 'MyApp.model.system.ActionModel',
    root: {
        expanded: true,
        id: 'root',
        text: '需要权限拦截的操作设置',
        leaf: false
    },
    proxy: {
    	type: 'ajax',
        api: {
            read: 'SystemActionController.do?method=selectActionList',
            update: 'SystemActionController.do?method=insertOrUpdate'
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