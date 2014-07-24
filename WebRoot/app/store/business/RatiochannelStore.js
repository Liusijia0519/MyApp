

Ext.define('MyApp.store.business.RatiochannelStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.business.RatiochannelModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'PartnerController.do?method=selectRatiochannel',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});