
Ext.define('MyApp.view.business.preview.ModelEntrance', {
	extend : 'Ext.container.Container',
	xtype : 'business_preview_modelEntrance',
	layout : {
		type : 'border'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [  {
        		xtype: 'business_preview_TrackGrid',
        		flex:3,
        		region: 'west'
        	},{
        		xtype: 'business_preview_ResultGrid',
        		flex:7,
        		region: 'center'
        	}
			]
		});

		me.callParent(arguments);
	}
});