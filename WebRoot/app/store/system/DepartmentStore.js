Ext.define('MyApp.store.system.DepartmentStore', {
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
        api: {
            //create: 'php/task/create.php',
            read: 'SystemDepartmentController.do?method=getDepartmentTree',
            update: 'SystemDepartmentController.do?method=insertOrUpdateDept'
            //destroy: 'SystemDepartmentController.do?method=deleteDept'
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