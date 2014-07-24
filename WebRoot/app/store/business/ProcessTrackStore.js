Ext.define('MyApp.store.business.ProcessTrackStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.business.ProcesstrackModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ProcessController.do?method=selectPreviewtrack',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});