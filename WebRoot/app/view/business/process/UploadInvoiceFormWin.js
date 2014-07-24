
Ext.define('MyApp.view.business.process.UploadInvoiceFormWin', {
	extend : 'Ext.window.Window',
	xtype : 'business_process_UploadInvoiceFormWin',
	height : 140,
	width : 500,
	layout : {
		type : 'fit'
	},
	title : '上传发票',

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [ {
				xtype : 'baseFormPanel',
				border : false,
				autoScroll : true,
				defaults : {
					columnWidth : 1,
					margin : 10,
					xtype: 'filefield',
			        name: 'invoice',
			        buttonText: '请选择...'
			        //plugins: [ Ext.ux.FieldReplicator ]
/*			        listeners: {
                    	change: function(filefield, value, eOpts ) {
                    		filefield.focus();
                    	}
                    }*/
				},
				layout : {
					type : 'column'
				},
				bodyPadding : 10,
				items : [{allowBlank : false,emptyText:'请上传1M以下图片...'},{hidden:true}]
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				defaults : {
					scale : 'medium',
					xtype : 'button',
					margin : '0 3 0 3'
				},
				items : [ {
					xtype : 'tbfill'
				}, {
					text : '确认上传',
					action : 'save',
					iconCls : 'action_save_24',
					state : '2'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});