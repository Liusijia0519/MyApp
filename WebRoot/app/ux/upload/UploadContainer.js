Ext.define('MyApp.ux.upload.UploadContainer', {
	extend : 'Ext.panel.Panel',
	xtype: 'uploadContainer',
	
	layout : {
		type : 'fit'
	},

	fileSelectButton : null,
	
	fileItemGird: null,
	
	fileUploader: null,
	
	url: null,
	
	uploadParams: null,
	
	currentIndex: 0,

	initComponent : function() {
		var me = this;
		
		me.fileSelectButton = Ext.create('MyApp.ux.upload.FileSelectButton', {itemId: 'selectFile'});
		me.fileSelectButton.on('fileselected', me.onFileSelection, me);

		me.fileItemGird = Ext.create('MyApp.ux.upload.FileItemGrid', {border : false});
		me.fileItemGird.on('itemclick', me.handleItemclick, me);
		
		me.fileUploader = Ext.create('MyApp.ux.upload.FileUpLoader', {
			uploadParams: me.uploadParams,
			url: me.url
		});
		me.fileUploader.on('uploadstart', me.handleUploadstart, me);
		me.fileUploader.on('uploadprogress', me.handleUploadProgress, me);
		me.fileUploader.on('uploadfailure', me.handleUploadfailure, me);
		me.fileUploader.on('uploadsuccess', me.handleUploadsuccess, me);
		
		Ext.applyIf(me, {
			items : me.fileItemGird,
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'tbfill'
				}, me.fileSelectButton, '-', {
					text: '开始上传',
					iconCls: 'action-up-16',
					itemId: 'beginUpload',
					handler: me.beginUpload,
					scope: me
				}, '-', {
					text: '停止上传',
					iconCls: 'action-stope-16',
					itemId: 'stopeUpload',
					disabled: true,
					handler: me.stopeUpload,
					scope: me
				}, '-', {
					text: '删除文件',
					iconCls: 'action_delete_16',
					itemId: 'deleteFile',
					disabled: true,
					handler: me.deleteFile,
					scope: me
				}, '-', {
					text: '重试',
					iconCls: 'action-reupload-16',
					disabled: true,
					itemId: 'reupload'
				}, {
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	},
	
	/**
	 * 还原初始化设置
	 */
	resetContent: function() {
		this.currentIndex = -1;
		this.fileItemGird.getStore().removeAll();
	},
	
	/**
	 * 行选择事件
	 */
	handleItemclick: function(grid, record, item, index, e, eOpts) {
		if(record.get('status') == '上传成功') {
			this.down('#deleteFile').setDisabled(true);
		} else {
			this.down('#deleteFile').setDisabled(false);
		}
		if(record.get('status') == '上传失败') {
			this.down('#reupload').setDisabled(false);
		} else {
			this.down('#reupload').setDisabled(true);
		}
	},
	
	/**
	 * 选择本地文件
	 * @param {Ext.form.field.File} file
	 * @param {JavaScript html5} FileList
	 */
	onFileSelection: function(file, fileList) {
		var me = this;
		Ext.each(fileList, function(f) {
			var record = Ext.create('MyApp.ux.upload.FileItem', {
				name: f.name,
				file: f,
				size: (f.size / 1024).toFixed(1) + "KB",
				progress: 0,
				status: '准备上传'
			});
			me.fileItemGird.getStore().add(record);
		});
		me.fileSelectButton.reset();
	},
	
	/**
	 * 上传文件
	 */
	uploadFile: function() {
		var me = this;
		me.currentIndex++;
		if(me.currentIndex <= me.fileItemGird.getStore().getCount() - 1) {
			var fileItem = me.fileItemGird.getStore().getAt(me.currentIndex);
			if(fileItem.get('status') != '上传成功') {
				me.fileUploader.uploadFile(fileItem);
			} else {
				me.uploadFile();
			}
		} else {
			this.setButtonState1();
		}
	},

	/**
	 * 开始上传
	 */
	beginUpload: function() {
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定将文件上传至服务器端吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function() {
				this.currentIndex = -1;
				this.setButtonState2();
				this.uploadFile(0);
			},
			scope: this
    	});
	},
	
	/**
	 * 删除文件
	 */
	deleteFile: function() {
		var fileItem = this.fileItemGird.getSelectRecord();
		if(fileItem) {
			this.fileItemGird.getStore().remove(fileItem);
		}
	},
	
	/**
	 * 暂停上传
	 */
	stopeUpload: function() {
		this.setButtonState1();
		this.fileUploader.abortUpload();
		this.fileItemGird.getStore().getAt(this.currentIndex).set('status', '暂停上传');
		this.fileItemGird.getStore().getAt(this.currentIndex).commit();
	},
	
	/**
	 * 设置按钮状态1
	 * 开始上传 可用
	 * 选择文件 可用
	 * 暂停上传 禁用
	 * 删除文件 可用
	 * 重试 可用
	 */
	setButtonState1 : function() {
		this.setButtonDisableds([{
			itemId: 'beginUpload', disabled: false
		},{
			itemId: 'selectFile', disabled: false
		},{
			itemId: 'stopeUpload', disabled: true
		},{
			itemId: 'deleteFile', disabled: true
		},{
			itemId: 'reupload', disabled: true
		}]);
	},
	
	/**
	 * 设置按钮状态2
	 * 开始上传 禁用
	 * 选择文件 禁用
	 * 暂停上传 可用
	 * 删除文件 禁用
	 * 重试 禁用
	 */
	setButtonState2 : function() {
		this.setButtonDisableds([{
			itemId: 'beginUpload', disabled: true
		},{
			itemId: 'selectFile', disabled: true
		},{
			itemId: 'stopeUpload', disabled: false
		},{
			itemId: 'deleteFile', disabled: true
		},{
			itemId: 'reupload', disabled: true
		}]);
	},
	
	/**
	 * 批量设置按钮状态
	 */
	setButtonDisableds: function(states) {
		for(var i=0; i<states.length; i++) {
			this.setButtonDisabled(states[i].itemId,states[i].disabled);
		}
	},
	
	/**
	 * 设置按钮状态
	 */
	setButtonDisabled: function(itemId, disabled) {
		this.down('#' + itemId).setDisabled(disabled);
	},
	
	/**
	 * 处理上传开始事件
	 * @param {MyApp.ux.upload.FileItem} fileItem
	 */
	handleUploadstart: function(fileItem) {
		fileItem.set('status', '正在上传');
		fileItem.commit();
		this.fileItemGird.selectRecord(fileItem);
	},
	
    /**
     * 处理上传实时进度
     * @param {Number} percentage
     * @param {MyApp.ux.upload.FileItem} fileItem
     */
	handleUploadProgress: function(percentage, fileItem) {
		fileItem.set('progress', percentage);
		fileItem.commit();
	},
	
    /**
     * 处理上传失败
     * @param {String} msg
     * @param {MyApp.ux.upload.FileItem} fileItem
     */
	handleUploadfailure: function(msg, fileItem) {
		fileItem.set('status', '上传失败');
		fileItem.commit();
		this.uploadFile();
	},
	
    /**
     * 上传成功
     * @param {MyApp.ux.upload.FileItem} fileItem
     */
	handleUploadsuccess: function(fileItem) {
		fileItem.set('status', '上传成功');
		fileItem.set('progress', 100);
		fileItem.commit();
		this.uploadFile();
	}

});