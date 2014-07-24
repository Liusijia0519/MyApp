Ext.define('MyApp.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : ['Ext.ux.layout.Center'],
	
	layout : {
		type : 'border'
	},
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
	}
});