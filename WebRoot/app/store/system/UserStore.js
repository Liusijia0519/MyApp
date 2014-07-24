Ext.define('MyApp.store.system.UserStore', {
	extend: 'Ext.data.Store',
    model: 'MyApp.model.system.UserModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'SystemUserController.do?method=selectSystemUser',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
    autoDestroy: true
});