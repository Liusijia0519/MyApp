Ext.define('MyApp.store.system.DictionaryTypeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'MyApp.model.system.DictionaryTypeModel',
    root: {
        expanded: true,
        id: 'root',
        text: '字典类别',
        leaf: false
    },
    proxy: {
        type: 'ajax',
        url: 'SystemDictionaryController.do?method=selectDictionaryType',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});