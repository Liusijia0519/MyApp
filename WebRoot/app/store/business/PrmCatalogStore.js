
Ext.define('MyApp.store.business.PrmCatalogStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.business.PrmCatalogModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'PrmController.do?method=selectPrmCatalog',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});