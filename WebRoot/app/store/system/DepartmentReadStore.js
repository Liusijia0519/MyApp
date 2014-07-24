Ext.define('MyApp.store.system.DepartmentReadStore', {
    extend: 'Ext.data.TreeStore',
    model: 'MyApp.model.system.DepartmentModel',
    root: {
        expanded: true,
        id: 'root',
        text: '组织机构',
        leaf: false
    },
    proxy: {
        type: 'ajax',
        url: 'SystemDepartmentController.do?method=getAvailablDepartmentTree',
        reader: {
            type: 'json'
        }
    },
    
    autoLoad: false
});