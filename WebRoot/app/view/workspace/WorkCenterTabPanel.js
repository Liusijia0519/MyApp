 Ext.define('MyApp.view.workspace.WorkCenterTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'workspace_workCenterTabPanel',
    
    region: 'center',
    activeTab: 0,
    
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
        	items: [{
        		layout: "ux.center",
        		bodyCls: "system_content-panel-body",
        		title: '首页',
        		autoScroll: true,
        		bodyPadding: 5,
        		items: {
        			xtype: 'business_project_projectManager'
        		}
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
    	
		//创建模块加入到tabPanel中去
		var tab = me.getComponent(id);
		if(!tab) {
			tab = Ext.create("Ext.panel.Panel", {
				itemId : id,
				title : menuName,
				autoScroll: true,
				closable : true,
				layout: "ux.center",
				bodyCls: "system_content-panel-body",
				bodyPadding: 5,
				items : Ext.create(menuClass,{
					//width: "98%",
			        //height: '98%'
				})
			});
			me.add(tab);
		}
		tab.show();
    }
});