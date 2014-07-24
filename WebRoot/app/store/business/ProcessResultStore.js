Ext.define('MyApp.store.business.ProcessResultStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.business.PreviewresultModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'PreviewController.do?method=selectPreviewresult',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});