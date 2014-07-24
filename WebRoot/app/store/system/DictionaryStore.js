Ext.define('MyApp.store.system.DictionaryStore', {
    extend: 'Ext.data.TreeStore',
    model: 'MyApp.model.system.DictionaryModel',
    root: {
        expanded: true,
        id: 'root',
        text: '系统字典',
        leaf: false
    },
    proxy: {
    	type: 'ajax',
        api: {
            //create: 'SystemDictionaryController.do?method=selectDictionary&type=ins',
            read: 'SystemDictionaryController.do?method=selectDictionary',
            update: 'SystemDictionaryController.do?method=insertOrUpdateDictionary'
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