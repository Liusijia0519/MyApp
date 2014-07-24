/**
 * @class MyApp.controller.business.PartnerController
 * @extends Ext.app.Controller
 * @description 合作伙伴管理
 * @author 刘思家
 */

Ext.define('MyApp.controller.business.PartnerController', {
	extend : 'Ext.app.Controller',
	
	views : ['business.partner.ModelEntrance',
	         'business.partner.Grid',
	         'business.partner.GridWin',
	         'business.partner.Form',
	         'business.partner.ActionPanel',
	         'business.partner.FormWin',
	         'business.partner.PartnerbaseFormWin'
	         ],

	refs : [{
				ref : 'FormWin',
				selector : 'business_partner_FormWin',
				autoCreate : true,
				xtype : 'business_partner_FormWin'
			}, {
				ref : 'PartnerbaseFormWin',
				selector : 'business_partner_PartnerbaseFormWin',
				autoCreate : true,
				xtype : 'business_partner_PartnerbaseFormWin'
			},{
				ref : 'Grid',
				selector : 'business_partner_Grid'
			}, {
				ref : 'Form',
				selector : 'business_partner_Form'
			}, {
				ref : 'GridWin',
				selector : 'business_partner_GridWin',
				autoCreate : true,
				xtype : 'business_partner_GridWin'
			}, {
				ref : 'ActionPanel',
				selector : 'business_partner_actionPanel'
			}],
			
	//UserController:null,//用户管理Controller
	
	init : function() {
		var me = this;		
		me.control({

					'business_partner_actionPanel button[action=add]' : {
						click : me.add
						// 新建
					},
					'business_partner_FormWin button[action=save]' : {
						click : me.save
						// 保存
					},
					'business_partner_PartnerbaseFormWin button[action=save]' : {
						click : me.savePartnerbase
						// 保存合作伙伴基本信息
					},
					'business_partner_Grid' : {
						select : me.loadForm
						// grid选择
					},
					'business_partner_Form button[action=update]' : {
						click : me.updateDetail
						// 更新合作伙伴详细信息
					},
					'business_partner_actionPanel button[action=edit]' : {
						click : me.edit
						// 编辑
					},
					'business_partner_actionPanel button[action=delete]' : {
						click : me.deletePatner
						// 删除
					},
					'business_partner_actionPanel button[action=search]' : {
						click : me.search
						// 高级查询
					},
					'business_partner_actionPanel button[action=empty]' : {
						click : me.emptySearchItem
						// 清空条件
					},
					'business_partner_actionPanel button[action=showChannel]' : {
						click : me.showChannel
						// 渠道数据
					},
					'business_partner_GridWin button[action=addCell]' : {
						click : me.addCell
						// 渠道信息增加行
					},
					'business_partner_GridWin button[action=deleteChannel]' : {
						click : me.deleteChannel
						// 删除渠道信息
					},
					'business_partner_GridWin button[action=saveChannel]' : {
						click : me.saveChannel
						// 保存渠道信息
					}									
				});
	},
	getUrl : function(method){
		return 'PartnerController.do?method=' + method;
	},
	/**
	 * 新建
	 */
	add : function() {
		var me = this;
		var form = me.getFormWin().down('baseFormPanel');
		form.resetFields();
		form.IsNew = true;//告诉窗体是新增合作伙伴,然后通过该字段判断是否调用新增用户模块
		me.getFormWin().show();
	},
	/**
	 * 保存合作伙伴基本信息
	 */
	save : function() {
		var me = this;
		var form = me.getFormWin().down('baseFormPanel');
		var param = form.getValues(false,false);
		if(!form.isValid()){//验证没通过 返回
			return;
		}
		//生成userid,要插入到用户表里和合作伙伴表里
		//var userid = new Guid();
		//form.setFieldValue('userid',userid);
		Ext.Ajax.request({
    		    url : me.getUrl('updatePartnerBase'),
    		    mask: true,
    		    params:{
    		    		params:Ext.JSON.encode(param)
		    	},
    		    success: function(response){
    		        var text = response.responseText;
    		        var result = Ext.JSON.decode(text);
    		        if(result.success) {
    		        	me.getFormWin().hide();
						me.getGrid().refresh();
    		        }
    		    }
    		});
		/*form.submit({
					url : me.getUrl('insertOrUpdate'),
					success : function() {
						//取出来用户名,自动填充进去新增用户窗体
						var realName = me.getFormWin().down('baseFormPanel').getFieldValue('name');
						me.getFormWin().hide();
						me.getGrid().refresh();
						if(me.getFormWin().down('baseFormPanel').IsNew){
							//加载用户管理控制器,新增合作伙伴之后要用到,调用用户管理的新增用户.
							me.UserController = me.getApplication().getController('system.UserController');
							me.UserController.getUserForm().setTitle("新增用户");
							//自动设置真实姓名
							me.UserController.getUserForm().down('baseFormPanel').setFieldValue('realName',realName);
							me.UserController.getUserForm().down('baseFormPanel').setFieldValue('id',userid);
							me.UserController.getUserForm().show();
						}
					}
				});*/
	},
	/**
	 * 保存合作伙伴基本信息
	 */
	savePartnerbase:function(){
		var me = this;
		var form = me.getPartnerbaseFormWin().down('baseFormPanel');
		form.submit({
					url : me.getUrl('updatePartnerbase'),
					success : function() {
						me.getPartnerbaseFormWin().hide();
						me.getGrid().refresh();
					}
				});
	},
	/**
	 * 选择grid的时候,刷新右面表单.展示合作伙伴详细信息
	 */
	loadForm : function( grid, record, index, eOpts){
		var me = this;
		var form = me.getForm();
		form.getForm().reset();
		form.load({
			url : me.getUrl('getPartnerDetailById'),
					params : {
						id : record.data.id
					}
		});
		form.setFieldValue('id',record.data.id);
	},
	/**
	 * 更新合作伙伴详细信息
	 */
	updateDetail:function(){
		var me = this;
		var form = me.getForm();
		if(form.getFieldValue('id')==null||form.getFieldValue('id')==''){
				Ext.popup.Msg('提示信息', "请选择合作伙伴后,再编辑详细信息.");
				return;
			}
		form.submit({
					url : me.getUrl('updateDetail'),
					submitEmptyText: false,
					success : function() {
						//me.getFormWin().hide();
						//me.getGrid().refresh();
					}
				});
	},
	/**
	 * 编辑基本信息
	 */
	edit : function() {
		var me = this;
		var grid = me.getGrid();
		if (!grid.isSelected()) {
			Ext.popup.Msg('提示信息', "请选择一行记录");
			return;
		}
		//不是新增,则不调用子新增用户模块
		//me.getFormWin().down('baseFormPanel').IsNew=false;
		me.getPartnerbaseFormWin().show();
		var form = me.getPartnerbaseFormWin().down('baseFormPanel');
		form.load({
					url : me.getUrl('getPartnerBaseById'),
					params : {
						id : grid.getSelectedRecordId()
					}
				});
	},
	/**
	 * 删除联系人
	 */
	deletePatner : function() {
		var me = this;
		var grid = me.getGrid();
		if (!grid.isSelected()) {
			Ext.popup.Msg('提示信息', "请选择一行记录");
			return;
		}
		Ext.Msg.show({
					title : '提示信息',
					msg : '确定删除数据吗?',
					buttons : Ext.Msg.OKCANCEL,
					icon : Ext.Msg.QUESTION,
					fn : this.doDelete,
					scope : this
				});
	},
	doDelete : function(buttonId) {
		if(buttonId == 'ok') {
    		var me = this;
    		Ext.Ajax.request({
    		    url : me.getUrl('deletePartnerByPrimaryKey'),
    		    mask: true,
    		    params: {
    		    	id: me.getGrid().getSelectedRecordId(),
    		    	channelid: me.getGrid().getSelectedCellValue('channelid')
    		    },
    		    success: function(response){
    		        var text = response.responseText;
    		        var result = Ext.JSON.decode(text);
    		        if(result.success) {
    		        	me.getGrid().refresh();
    		        	me.getForm().resetFields();
    		        }
    		    }
    		});    		
    	}
	},
	/**
	 * 清空条件
	 */
	emptySearchItem:function(){
		this.getActionPanel().getForm().reset();
	},
	/**
	 * 高级查询
	 */
	search:function(){
    	var param = this.getActionPanel().getValues(false,true);
    	this.getGrid().getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
    	this.getGrid().refresh();
	},
	/**
	 * 渠道数据
	 */
	showChannel:function(){
		var me = this;
		var grid = me.getGrid();
		if (!grid.isSelected()) {
			Ext.popup.Msg('提示信息', "请选择一行记录");
			return;
		}
		if (grid.getSelectedCellValue('ischannel')==0) {
			Ext.popup.Msg('提示信息', "无渠道数据");
			return;
		}
		//渠道id给渠道信息gridwin(外键)    
		me.getGridWin().channelid=me.getGrid().getSelectedCellValue('channelid');
		me.getGridWin().show();
		var chanelgrid=me.getGridWin().down('baseGridPanel');
		//添加条件,只加载该合作伙伴的渠道
		var param = {};
    	param.channelid = me.getGridWin().channelid;
    	chanelgrid.getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
    	chanelgrid.refresh();
	},
	/**
	 * 渠道信息增加行
	 */
	addCell:function(){
		var me = this;
        var rec = Ext.create('MyApp.model.business.RatiochannelModel', {
            'id': '',
            'channelid': me.getGridWin().channelid,
            'developerid': '',
            'ratio': 0
        });
        me.getGridWin().down('baseGridPanel').getStore().insert(0, rec);
        rec.commit();
	},
	/**
	 * 删除渠道信息
	 */
	deleteChannel:function(){
		var me = this;
		var grid = me.getGridWin().down('baseGridPanel');
		if (!grid.isSelected()) {
			Ext.popup.Msg('提示信息', "请选择一行记录");
			return;
		}
        Ext.Msg.confirm("提示信息", "确认删除此信息？", function (btn) {
            if (btn == "yes") {
            	//如果id为空,直接删除record
                if (me.getGridWin().down('baseGridPanel').getSelectedRecordId() == "") {
                	me.getGridWin().down('baseGridPanel').getStore().remove(me.getGridWin().down('baseGridPanel').getSelectedRecord());
                } else {
                	Ext.Ajax.request({
            		    url : me.getUrl('deleteChannelByPrimaryKey'),
            		    mask: true,
            		    params: {
            		    	id: me.getGridWin().down('baseGridPanel').getSelectedRecordId()
            		    },
            		    success: function(response){
            		        var text = response.responseText;
            		        var result = Ext.JSON.decode(text);
            		        if(result.success) {
            		        	me.getGridWin().down('baseGridPanel').refresh();
            		        }
            		    }
            		});
                }
            }
        });
	},
	/**
	 * 保存渠道信息
	 */
	saveChannel:function(){
		var me = this;
		var stroe = me.getGridWin().down('baseGridPanel').getStore();
        var updateRecords = stroe.getUpdatedRecords();//获得修改过的数据
        var updateParams = [];
        Ext.each(updateRecords, function (item) {
            updateParams.push(item.data);
        });
        Ext.Ajax.request({
        	url : me.getUrl('insertOrUpdateChannel'),
		    mask: true,
		    params: {
		    	"paramList":Ext.JSON.encode(updateParams)
		    },
            success: function () {
            	me.getGridWin().down('baseGridPanel').refresh();
            }
        })
	}
	
});
