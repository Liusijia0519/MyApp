Ext.define("MyApp.ux.upload.FileStore", {
	extend: 'Ext.data.Store',
	model: 'MyApp.ux.upload.FileItem',
	proxy: {
		type: 'memory',
        reader: {
            type: 'json'
        }
	}
});