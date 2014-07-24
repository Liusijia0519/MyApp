Ext.define('MyApp.store.system.MenuStore', {
    extend: 'Ext.data.TreeStore',
    model: 'MyApp.model.system.MenuModel',
    root: {
        expanded: true,
        id: 'root',
        text: '系统菜单',
        leaf: false
    },
    proxy: {
    	type: 'ajax',
        api: {
            read: 'SystemMenuController.do?method=selectSystemMenuTree',
            update: 'SystemMenuController.do?method=insertOrUpdate'
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