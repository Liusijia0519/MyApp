var requiredTpl = '<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>';

Ext.onReady(function() {
	
	Ext.Loader.setConfig({
		enabled: true,
		paths: {
			'Ext.ux': 'extjs/ux',
			'MyApp.base': 'app/shared',
			'MyApp.ux': 'app/ux'
		}
	});
	
	Ext.application({
	    name: 'MyApp',
	    controllers: ['WorkSpace','business.HomeController'],
	    requires: [
		    'MyApp.base.BaseFormPanel',
		    'MyApp.base.BaseGridPanel',
		    'MyApp.base.DictionaryCombo',
		    'MyApp.base.BaseTextArea',
		    'MyApp.base.YesNoCombo',
		    'MyApp.base.ValueCheckBox',
		    'Ext.ux.form.MultiSelect',
		    'Ext.ux.form.ItemSelector',
		    'Ext.ux.FieldReplicator',
		    'Ext.ux.LiveSearchGridPanel',
		    'Ext.ux.TreePicker',
		    'MyApp.ux.Printer',
		    'MyApp.base.DictionaryTreePicker',
		    'MyApp.base.DictionaryTree',
		    'MyApp.base.stateCombo'
	    ],
	    
	    autoCreateViewport: false,
	    
	    views: ['Viewport'],
	    
	    appData: null,
	    
	    launch: function() {
	    	var me = this;
	    	var viewport = this.getView('Viewport');
	    	
	    	//启动程序
	    	Ext.Ajax.request({
	    	    url: 'SystemLoginController.do?method=getUserMenus',
	    	    success: function(response, options) {
	    	    	var responseText = response.responseText;
	    	        var jsonResult = Ext.JSON.decode(responseText);
	    	    	if(jsonResult.timeOut === true) {
	    	    		me.loginOut();
	    	    	} else if(jsonResult.success) {
		    	        me.appData = jsonResult.metaData;
		    	        if (viewport) {
		    	            viewport.create({
		    	            	items: me.getMyCustomTheme(jsonResult)
		    	            });
		    	        }
	    	    	}
	    	        Ext.defer(me.hideMask, 250);
	    	    }
	    	});
	    },
	    
	    /**
	     * 获得工作空间主题
	     */
	    getMyCustomTheme: function(jsonResult) {
    		return items = [{
				xtype : "workspace_workNorthToolbar",
				region : 'north',
				metaData: jsonResult.metaData,
				margins : '0 0 5 0'
			}, {
				xtype: 'workspace_workCenterContainer'
			}, {
				xtype: 'workspace_workWestTreePanel',
				menuData: jsonResult.data
			}]
	    },
	    
	    /**
	     * 登录超时重新登录
	     */
	    loginOut: function() {
	    	Ext.Msg.show({
				title: '提示信息',
				msg: '您尚未登录或已登录超时!',
				buttons: Ext.MessageBox.OK,
				icon: Ext.Msg.INFO,
				buttonText: {ok: '重新登录'},
				fn: function() {
					location.href = 'index.jsp';
				}
    		});
	    },
	    
	    /**
	     * 移除过渡动画
	     */
	    hideMask: function() {
	        Ext.get('system_loading').remove();
	        Ext.fly('system_loading-mask').animate({
	            opacity:0,
	            remove:true
	        });
	    }
	});
});

