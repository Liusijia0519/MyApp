
Ext.define('MyApp.view.business.partner.ModelEntrance', {
	extend : 'Ext.container.Container',
	xtype : 'business_partner_modelEntrance',
	layout : {
		type : 'border'
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
        		xtype: 'business_partner_actionPanel',
        		region: 'north'
        	}, {
        		xtype: 'business_partner_Grid',
        		flex:2,
        		region: 'center'
        	},{
        		xtype:'business_partner_Form',
        		flex:1,
        		region: 'east'
        	}
			]
		});

		me.callParent(arguments);
	}
});