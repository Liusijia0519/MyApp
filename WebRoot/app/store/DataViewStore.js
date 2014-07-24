Ext.define('MyApp.store.DataViewStore', {
    extend: 'Ext.data.Store',
    model: 'MyApp.model.MenuModel',
	proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});