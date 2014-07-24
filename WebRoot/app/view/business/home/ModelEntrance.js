Ext.define('MyApp.view.business.home.ModelEntrance', {
	extend : 'Ext.container.Container',
	xtype : 'business_home_modelEntrance',
	layout: {
	    type:'vbox',
	    align:'stretch'
	},
	
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				margin: 10
			},
			items : [{
				xtype: 'container',
				html:'这是首页'
			}]
		});
		me.callParent(arguments);
	}

});