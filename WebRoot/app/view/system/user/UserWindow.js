Ext.define('MyApp.view.system.user.UserWindow', {
	extend : 'Ext.window.Window',
	xtype : 'system_user_userWindow',
	closeAction : 'hide',
	layout : 'fit',
	width : 600,
	height : 400,

	initComponent : function() {
		
		var myStore = Ext.create('Ext.data.Store', {
					fields : [{
								name : 'id',
								mapping : 'USERID'
							}, {
								name : 'name',
								mapping : 'NAME'
							}, {
								name : 'username',
								mapping : 'USERNAME'
							}],
					proxy : {
						type : 'ajax',
						url : 'TabUserController.do?method=selectUser',
						reader : {
							type : 'json',
							root : 'data'
						}
					},
					autoLoad : true
				});
		Ext.apply(this, {
					items : [Ext.create('Ext.ux.LiveSearchGridPanel', {
								border : false,
								store : myStore,
								selModel: {
									mode: 'SINGLE'
								},
								selType: 'checkboxmodel',
								columns : [{
											text : 'id',
											dataIndex : 'id'
										}, {
											text : 'name',
											dataIndex : 'name'
										}, {
											text : 'username',
											flex : 1,
											dataIndex : 'username'
										}]
							})],
					dockedItems : [{
								xtype : 'toolbar',
								dock : 'bottom',
								ui : 'footer',
								items : [{
											xtype : 'component',
											flex : 1
										}, {
											xtype : 'button',
											text : '确定',
											handler: function() {
												var rc = this.down('gridpanel').getSelectionModel().getSelection()[0];
												this.fireEvent('btn_user_select' ,rc);
												this.hide();
											},
											scope: this
										}]
							}]
				});
		this.callParent();
		this.addEvents('btn_user_select');
	}
});
