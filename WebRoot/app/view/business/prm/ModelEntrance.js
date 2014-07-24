Ext.define('MyApp.view.business.prm.ModelEntrance', {
	extend : 'Ext.container.Container',
	xtype : 'business_prm_modelEntrance',
	layout : {
		type : 'border'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [  {
        		xtype: 'business_prm_Grid',
        		flex:4,
        		region: 'center'
        	},{
        		xtype: 'business_prm_CataGrid',
        		flex:5,
        		region: 'west'
        	}
			]
		});

		me.callParent(arguments);
	}
});