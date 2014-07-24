
var table = 'PartnerBase';

Ext.define('MyApp.store.business.'+table+'Store', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.business.'+table+'Model',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'PartnerController.do?method=select',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});