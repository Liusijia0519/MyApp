Ext.define('MyApp.ux.dataview.DataViewWin', {
    extend: 'Ext.window.Window',

    height: 400,
    width: 700,
    title: '图片管理',
    closeAction: 'hide',
    maximizable: true,
    layout: 'fit',
    canDelete:false,
    uploadParams: null,
    state:'',

    initComponent: function () {
        var me = this;
        var store = Ext.create("MyApp.ux.dataview.DataViewStore", {
            autoLoad: false
        });
        //一个带删除 一个不带 默认不带
        var tpl = null;
        if	(me.canDelete){
        	tpl = ['<tpl for=".">',
			            '<div class="thumb-wrap">',
			            '<h1 style="text-align:center">{filename}<a style="text-decoration: none; color:blue; cursor:pointer;" class="but">&nbsp;&nbsp;&nbsp;删除</a></h1>',
			                '<div class="thumb">',
			                '<img style=" width:100%" src="ProcessController.do?method=selectFileByteById&id={id}" />',
			                '</div>',
			            '</div>',
			        '</tpl>']
        }
        else {
        	tpl =[ '<tpl for=".">',
			            '<div class="thumb-wrap">',
			            '<h1 style="text-align:center">{filename}</h1>',
			                '<div class="thumb">',
			                '<img style=" width:100%" src="ProcessController.do?method=selectFileByteById&id={id}" />',
			                '</div>',
			            '</div>',
			        '</tpl>']
        }
        Ext.apply(me, {
        	items:[{
        		xtype:'dataview',
	        	store: store,
	        	itemSelector: 'a.but',
	            listeners: {
	                itemclick: function (m, record) {
	                	//不是发票被驳回状态就不能删除
	                	if(me.state!='3.5'){
	                		Ext.popup.Msg('提示信息', "只有发票被驳回时才能删除发票");
							return;
	                	}
	                    Ext.Msg.show({
	    					title : '提示信息',
	    					msg : '确定删除该发票吗?',
	    					buttons : Ext.Msg.OKCANCEL,
	    					icon : Ext.Msg.QUESTION,
	    					fn : function(buttonId){
	    						//点取消 返回
	    						if(buttonId != 'ok') {return;}
	    						var me = this;
	    			    		Ext.Ajax.request({
	    			    		    url : 'ProcessController.do?method=deleteFileById',
	    			    		    mask: true,
	    			    		    params: {
	    			    		    	id: record.data.id
	    			    		    },
	    			    		    success: function(response){
	    			    		        var text = response.responseText;
	    			    		        var result = Ext.JSON.decode(text);
	    			    		        if(result.success) {
	    			    		        	me.getStore().load();
	    			    		        }
	    			    		    }
	    			    		}); 
	    					},
	    					scope : this
	    				});
	                }
	            },
	        	tpl: tpl,
	            //singleSelect: true,
	            //overItemCls: 'x-view-over',
	            //itemSelector: 'div.thumb-wrap',
	            autoScroll: true
        	}]
        });
        me.callParent(arguments);
        //me.on('hide', me.handlerHide, me);
    },

/*    handlerHide: function () {
        this.down('uploadContainer').resetContent();
    },*/
    loadImg: function (param) {
        this.down("dataview").getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
        this.down("dataview").getStore().load();
    }
});