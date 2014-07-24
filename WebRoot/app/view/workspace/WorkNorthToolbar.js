Ext.define('MyApp.view.workspace.WorkNorthToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'workspace_workNorthToolbar',
    
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
        	items : [ {
        		text : '网上结算管理系统',
        		scale : 'medium',
        		iconCls : 'system_wo'/*,
        	    menu: Ext.create('Ext.menu.Menu', {
        	        items: me.initialMenus(me.menuData)
        	    })*/
        	}, "-", {
        		text : me.metaData.departmentName,
        		iconCls : 'system_department',
        		scale : 'medium'
        	}, "-", {
        		text : me.metaData.realName,
        		scale : 'medium',
        		iconCls : 'system_user'
        	}, "->",{
        		text : '修改密码',
        		scale : 'medium',
        		iconCls : 'system_password',
        		action: 'modifyPassword'
        	}, "-", {
        		text : '安全退出',
        		scale : 'medium',
        		iconCls : 'system_exit',
        		action: 'exitSystem'
        	}]
        });
		this.addEvents(
		        'menuitemclick'
		);		
        me.callParent(arguments);
    },
    
    /**
     * 获取菜单
     * @param {Array} menuData
     */
    initialMenus: function(menuData) {
    	var me = this, items = [];
    	var store = Ext.create('MyApp.store.DataViewStore', {
        	data: menuData
        });
    	store.each(function(item, index){
    		var menu = {
				text: item.get('text'), 
	    		iconCls: item.get('icon16'),
	    		handler: Ext.bind(me.onItemclick, me),
	    		record: item
    		},
    		children = me.initialMenus(item.get('children'));
    		if(children.length > 0) {
    			Ext.apply(menu, {
    				menu: children
    			})
    		}
	    	items.push(menu);
	    	if((index + 1) < menuData.length) {
	    		items.push('-');
    		}
	    });
	    return items;
    },
    
    /**
     * 菜单单击事件处理
     * 激发 menuitemclick 事件交给MyApp.controller.WorkSpace控制器统一处理
     */
    onItemclick: function(item, e) {
    	if(item.record.get('menuClass').length > 0) {
    		this.fireEvent('menuitemclick', item.record);
    	}
    }
    
});