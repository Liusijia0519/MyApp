/**
 * @class MyApp.base.BaseFormPanel
 * @extends Ext.form.Panel
 * @description 系统表单基础类 对常用方法进行封装
 * @author 葛新
 */
Ext.define("MyApp.base.BaseFormPanel", {
	extend: 'Ext.form.Panel',
	xtype: 'baseFormPanel',
	
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
        	waitMsgTarget: true
        });
        
        me.on("beforeaction" ,me.onBeforeaction, me);
        me.on("actioncomplete", me.onActioncomplete, me)
        
        me.callParent(arguments);
    },
    
    /**
     * 表单与服务器交互之前的事件处理方法
     * @param {Ext.form.Basic} basic
     * @param {Ext.form.action.Action} action
     * @param {Object} eOpts
     */
    onBeforeaction: function(basic, action, eOpts) {
    	//如果是提交表单进行数据验证
    	if(action.type && action.type == "submit") {
    		Ext.applyIf(action, {waitMsg : "数 据 保 存 中..."});
    		return action.clientValidation ? basic.isValid() : true;
    	}
    	if(action.type && action.type == "load") {
    		Ext.applyIf(action, {waitMsg : "数 据 加 载 中..."});
    	}
    },
    
    /**
     * 表单与服务器交互成功的事件处理方法
     * @param {Ext.form.Basic} basic
     * @param {Ext.form.action.Action} action
     * @param {Object} eOpts
     */
    onActioncomplete: function(basic, action, eOpts) {
    	if(action.type == "submit") {
    		Ext.popup.Msg('提示信息', '表单数据保存成功');
    	}
    	if(action.type == "load") {
    		Ext.popup.Msg('提示信息', '表单数据加载成功');
    	}
    },
    
    /**
     * 重写父类方法封装常用参数
     * @Overrides {Ext.form.Panel.subumit}
     * @param {Ext.form.action.Action} options
     */
    submit: function(options) {
    	Ext.applyIf(options, {
    		clientValidation: true
    	});
    	this.form.submit(options);
    },
    
    /**
     * 获取某个表单元素的值
     * @param {String} field [id or name or hiddenName]
     * @Return {Object}
     */
    getFieldValue: function(field) {
    	return this.getForm().findField(field).getValue();
    },
    
    /**
     * 设置某个表单元素的值
     * @param {String} field [id or name or hiddenName]
     * @param {Object} value
     */
    setFieldValue: function(field, value) {
    	this.getForm().findField(field).setValue(value);
    },
    
    /**
     * 获取某个表单元素提交的值
     * @param {String} field [id or name or hiddenName]
     * @Return {String} [The value to be submitted, or null]
     */
    getFieldSubmitValue: function(field) {
    	return this.getForm().findField(field).getSubmitValue();
    },
    
    /**
     * 清空表单元素
     */
    resetFields: function() {
    	this.getForm().reset();
    },
    
    /**
     * 设置表单元素可用状态
     */
    setFieldReadOnly : function(readOnly) {
    	var components = this.query('field');
    	Ext.each(components, function(field) {
    		field.setReadOnly(readOnly);
    	});
    }
    
});