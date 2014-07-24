Ext.define("MyApp.ux.upload.FileItemGrid", {
	extend: 'Ext.grid.Panel',
	xtype: 'fileItemGrid',
	
	columnLines: true,
	autoScroll: true,
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			store: Ext.create('MyApp.ux.upload.FileStore'),
			columns: [{ 
				text: '文件名',  dataIndex: 'name', flex: 1
			},{ 
				text: '大小', dataIndex: 'size'
			},{
				text: '进度', dataIndex: 'progress', width: 150, renderer:me.formatProgressBar ,scope:me
			}, {
				text: '状态', dataIndex: 'status', renderer: me.formatStatus
			}]
		});
        me.callParent();
    },
    
    /**
     * 格式化状态显示颜色
     */
    formatStatus: function(val) {
    	if(val == '准备上传') {
    		return val;
    	}
    	if(val == '上传成功') {
    		return '<span style="color:' + 'green' + ';">' + val + '</span>';
    	}
    	if(val == '上传失败') {
    		return '<span style="color:' + 'red' + ';">' + val + '</span>';
    	}
    	if(val == '正在上传') {
    		return '<span style="color:' + 'blue' + ';">' + val + '</span>';
    	}
    	if(val == '暂停上传') {
    		return '<span style="color:' + 'red' + ';">' + val + '</span>';
    	}
    },
    
    /**
     * 格式化进度条
     */
    formatProgressBar : function(v){  
        var progressBarTmp = this.getTplStr(v);  
        return progressBarTmp;  
    },  
    
    getTplStr : function(v){  
        var bgColor = "orange";  
        var borderColor = "#008000";  
        return Ext.String.format(  
            '<div>'+  
                '<div style="border:1px solid {0};height:10px;width:{1}px;margin:4px 0px 1px 0px;float:left;">'+        
                    '<div style="float:left;background:{2};width:{3}%;height:8px;"><div></div></div>'+  
                '</div>'+  
            '<div style="text-align:center;float:right;width:40px;margin:3px 0px 1px 0px;height:10px;font-size:12px;">{3}%</div>'+            
        '</div>', borderColor,(90),bgColor, v);  
    },
    
    /**
     * 设置选中
     */
    selectRecord: function(record) {
    	this.getSelectionModel().select(record);
    },
    
    /**
     * 获得选中行
     */
    getSelectRecord: function() {
    	return this.getSelectionModel().getSelection()[0];
    }
});