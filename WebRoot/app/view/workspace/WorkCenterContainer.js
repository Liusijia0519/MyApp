 Ext.define('MyApp.view.workspace.WorkCenterContainer', {
    extend: 'Ext.container.Container',
    xtype: 'workspace_workCenterContainer',
    id: 'workspace_workCenterContainer',
    region: 'center',
    
    layout: "fit",
	autoScroll: true,
    
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
        	items: [{
        		xtype: 'business_home_modelEntrance'
        	}]
        });
        me.callParent(arguments);
    },
    
    /**
     * 打开功能模块
     * @param {MyApp.model.MenuModel} record
     * @param {Ext.app.Application} application
     */
    openModel: function(record, application) {
    	//这里实现动态加载Controller
    	if(record.get('extController') != "") {
    		application.getController(record.get('extController'));
    	}
		
		//获取模块数据
    	var me = this,
			id = record.get('id'),
    		menuName = record.get('menuName'),
    		menuClass = record.get('menuClass'),
    		icon16 = record.get('icon16');
    	
		var item = me.getComponent(id);
		if(!item) {
			item = Ext.create(menuClass);
			me.removeAll();
			me.add(item);
		}
    }
});