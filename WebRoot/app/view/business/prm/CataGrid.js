
Ext.define('MyApp.view.business.prm.CataGrid', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_prm_CataGrid',
	frame : true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			store : Ext.create('MyApp.store.business.PrmCatalogStore', {
				autoLoad : true
			}),
			columns : [ {
				text : 'id',
				hidden :true,
				dataIndex : 'id',
				flex : 1
			}, {
				text : '账期',
				dataIndex : 'name',
				flex : 1
			}, {
				text : '应收金额',
				dataIndex : 'amountreceivable',
				flex : 1
			}, {
				text : '实收金额',
				dataIndex : 'amountreceived',
				flex : 1
			}, {
				text : '上传日期',
				dataIndex : 'createdate',
				flex : 1
			}, {
				text : '上传人',
				dataIndex : 'createuser',
				flex : 1
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				ui : 'footer',
				dock : 'top',
				defaults : {
					scale : 'medium',
					xtype : 'button'
				},
				items : [ {
							xtype : 'combo',
							itemId : 'name',
							fieldLabel : '选择账期',
							editable:false,
							name : 'zhangqi',
							store: {
								fields: ['zhangqi'],
						        proxy: {
				        	        type: 'ajax',
				        	        url: 'PrmController.do?method=getZhangqiCombo',
				        	        reader: {
				        	            type: 'json'
				        	        }
				        	    }},
						    valueField: 'zhangqi',
	                        displayField: 'zhangqi'
				}, '->', {
					text : '查询',
					iconCls : 'action_search_24',
					action : 'search'
				} /*
					 * , '->', { text : '数据导入', iconCls : 'action_add_24',
					 * action : 'import' }
					 */

				]
			} ]
		});
		me.callParent(arguments);
	}
});