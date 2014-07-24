/**
 * @class MyApp.ux.CustomPageSizePaging
 * @extends Ext.toolbar.Paging
 * @description 扩展EXT分页工具条,支持选择每页行数的功能
 * @author 葛新
 */
Ext.define("MyApp.ux.CustomPageSizePaging", {
	extend: 'Ext.toolbar.Paging',
	
	/**
	 * 扩展父控件 增加设置每页显示多少行的功能
	 * @Overrides {Ext.toolbar.Paging.getPagingItems}
	 */
	getPagingItems: function() {
        var me = this;

        return [{
            itemId: 'first',
            tooltip: me.firstText,
            overflowText: me.firstText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
            disabled: true,
            handler: me.moveFirst,
            scope: me
        },{
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: true,
            handler: me.movePrevious,
            scope: me
        },
        '-',
        me.beforePageText,
        {
            xtype: 'numberfield',
            itemId: 'inputItem',
            name: 'inputItem',
            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            allowDecimals: false,
            minValue: 1,
            hideTrigger: true,
            enableKeyEvents: true,
            keyNavEnabled: false,
            selectOnFocus: true,
            submitValue: false,
            // mark it as not a field so the form will not catch it when getting fields
            isFormField: false,
            width: me.inputItemWidth,
            margins: '-1 2 3 2',
            listeners: {
                scope: me,
                keydown: me.onPagingKeyDown,
                blur: me.onPagingBlur
            }
        },{
            xtype: 'tbtext',
            itemId: 'afterTextItem',
            text: Ext.String.format(me.afterPageText, 1)
        },
        '-',
        {
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: true,
            handler: me.moveNext,
            scope: me
        },{
            itemId: 'last',
            tooltip: me.lastText,
            overflowText: me.lastText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
            disabled: true,
            handler: me.moveLast,
            scope: me
        },
        '-',
        '每页',
        {
        	xtype: 'combobox',
        	store: Ext.create('Ext.data.Store', {
	    	    fields: ['value', 'text'],
	    	    data: [{
	    	    	value: 15, text: 15
	    	    },{
	    	    	value: 25, text: 25
	    	    },{
	    	    	value: 50, text: 50
	    	    },{
	    	    	value: 100, text: 100
	    	    }]
        	}),
            queryMode: 'local',
            triggerAction: 'all',
            value: me.store.pageSize,
            width: 50,
            displayField: 'text',
            editable: false,
            valueField: 'value',
            margin: '0 5 0 5',
            listeners: {
            	select: me.doPageSizeChange,
            	scope: me
            }
        },
        '行',
        '-',
        {
            itemId: 'refresh',
            tooltip: me.refreshText,
            overflowText: me.refreshText,
            iconCls: Ext.baseCSSPrefix + 'tbar-loading',
            handler: me.doRefresh,
            scope: me
        }];
    },
    
    /**
     * 设置表格显示的行数,并刷新
 	 * @param {Ext.form.field.ComboBox} combo
     * @param {Array} records
     * @param {Object} eOpts
     */
    doPageSizeChange: function(combo, records, eOpts) {
    	var me = this;
    	if(records.length > 0) {
    		me.store.pageSize = records[0].get("value");
    		me.store.currentPage = 1;
        	me.doRefresh();
    	}
    }
})