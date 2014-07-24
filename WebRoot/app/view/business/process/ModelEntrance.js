Ext.define('MyApp.view.business.process.ModelEntrance', {
	extend : 'Ext.container.Container',
	xtype : 'business_process_modelEntrance',
	layout : {
		type : 'border'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [  {
        		xtype: 'business_process_TrackGrid',
        		flex:2,
        		region: 'west'
        	},{
        		xtype: 'business_process_ProcessResultGrid',
        		flex:8,
        		region: 'center'
        	}
			]
		});

		me.callParent(arguments);
	}
});