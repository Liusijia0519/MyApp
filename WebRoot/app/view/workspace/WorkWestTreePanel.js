Ext.define('MyApp.view.workspace.WorkWestTreePanel', {
    extend: 'Ext.tree.Panel',
    xtype: 'workspace_workWestTreePanel',
    
    region: 'west',
	collapsible: true,
	title: '系统菜单',
	menuData: null,
	split: true,
	width: "15%",
	stateful: true,
	stateId: "ext_workspaceButtonMenuPanel",
	frame: true,
	minWidth: 200,
	rootVisible: true,
	
    initComponent: function() {
        var me = this;
        
        var store = Ext.create('Ext.data.TreeStore', {
        	model: 'MyApp.model.MenuModel',
            root: {
            	text: '系统菜单',
                expanded: true,
                children: me.menuData
            }
        });
        
        Ext.applyIf(me, {
        	store: store,
            viewConfig: {
            	
            }
        });
        me.callParent(arguments);
        me.on('itemclick', me.itemclickHandler, me);
    },
    
    /**
     * 菜单单击事件处理
     * 激发 menuitemclick 事件交给MyApp.controller.WorkSpace控制器统一处理
     */
    itemclickHandler: function(tree, record, item, index, e, eOpts) {
    	if(record.get('menuClass').length > 0) {
    		this.fireEvent('menuitemclick', record);
    	}
    }

});