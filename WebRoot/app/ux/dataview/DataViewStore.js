Ext.define('MyApp.ux.dataview.DataViewStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    requires: ['MyApp.ux.dataview.DataViewModel'],
    model: 'MyApp.ux.dataview.DataViewModel',
    pageSize: 200,
    proxy: {
        type: 'ajax',
        url: 'ProcessController.do?method=selectFile',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    
    autoDestroy: true
});