Ext.define('MyApp.view.system.dictionary.DictionaryTreeGrid', {
	extend : 'Ext.tree.Panel',
	xtype : 'system_dictionary_dictionaryTreeGrid',
	frame : true,

	columnLines : true,

	initComponent : function() {
		var me = this;

		me.plugins = [ me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing') ];

		Ext.applyIf(me, {
			store : 'system.DictionaryStore',
			viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                },
                listeners: {
                	beforedrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
                		data.records[0].oldPid = data.records[0].get('parentId');
                	},
                	drop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
                		var oldPid = data.records[0].oldPid;
                		var node = this.ownerCt.getStore().getNodeById(oldPid);
                		if(!node.hasChildNodes()) {
                			node.set('leaf', true);
                		}
                		delete data.records[0].oldPid;
                	}
                }
            },
			columns : [ {
				xtype : 'treecolumn',
				sortable: false,
				text : '显示文本',
				dataIndex : 'text',
				flex : 1,
				editor : {
					xtype : 'textfield',
					selectOnFocus : true,
					allowOnlyWhitespace : false
				}
			}, {
				xtype : 'checkcolumn',
				sortable: false,
				text : '是否有效(√为有效)',
				dataIndex : 'availabl',
				width : 150,
				stopSelection : false,
				menuDisabled : true,
				listeners : {
					beforecheckchange : function(ck, rowIndex, checked, eOpts) {
						return (rowIndex != 0);
					}
				}
			} ]
		});

		me.callParent(arguments);
		me.relayEvents(me.getStore(), ['load'], 'store');
		me.on('beforeedit', me.handleBeforeEdit, me);
	},

	getSelecedRecordId : function() {
		var record = this.getSelectionModel().getSelection()[0];
		return record ? record.getId() : '';
	},

	handleBeforeEdit : function(editingPlugin, e) {
		if(e.record.get('id') == 'root') {
			Ext.popup.Msg('提示信息', '字典跟节点不允许编辑');
			return false;
		}
		return true;
	},
	
    refreshView: function() {
        //this.getView().refresh(); 本地刷新
    	this.getStore().reload({mask:true});//服务器端刷新
    }
});