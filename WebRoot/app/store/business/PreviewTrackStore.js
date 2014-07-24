

Ext.define('MyApp.store.business.PreviewTrackStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.business.PreviewtrackModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'PreviewController.do?method=selectPreviewtrack',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});