
Ext.define('MyApp.store.business.PrmHistoryStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.business.PrmHistoryModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'PrmController.do?method=select',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});