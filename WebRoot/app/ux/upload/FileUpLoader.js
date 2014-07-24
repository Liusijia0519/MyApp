/**
 * @class MyApp.ux.upload.FileUpLoader
 * @extends Ext.util.Observable
 * @description Ajax方式上传文件
 * @author 葛新
 */
Ext.define("MyApp.ux.upload.FileUpLoader", {
	mixins: {
        observable: 'Ext.util.Observable'
    },
	
    method : 'POST',
    
    xhr : null,
    
    url: null,
    
    uploadParams: null,
    
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.addEvents({
        	uploadstart : true,
            uploadfailure : true,
            uploadsuccess : true,
            uploadprogress : true
        });
    },
    
    /**
     * 初始化XMLHttpRequest
     */
    initConnection : function() {
        var xhr = new XMLHttpRequest(),
            method = this.method,
            url = this.url;
        
        if (this.uploadParams) {
            url = Ext.String.urlAppend(url, Ext.Object.toQueryString(this.uploadParams));
        }
        
        xhr.open(method, url, true);

        this.abortXhr = function() {
            this.suspendEvents();
            xhr.abort();
            this.resumeEvents();
        };

        return xhr;
    },
    
    /**
     * 上传文件
     * @param {MyApp.ux.upload.FileItem} fileItem
     */
    uploadFile : function(fileItem) {
        var me = this, 
        file = fileItem.data.file;

        var formData = new FormData();
        formData.append('file', file);

        var xhr = me.initConnection();
        
        xhr.upload.addEventListener('loadstart', Ext.bind(me.onLoadstart, me, [fileItem], true), true);
        xhr.upload.addEventListener('progress', Ext.bind(me.onUploadProgress, me, [fileItem], true), true);
        xhr.addEventListener('loadend', Ext.bind(me.onLoadEnd, me, [fileItem], true), true);
        xhr.send(formData);
    },
    
    /**
     * 暂停上传
     */
    abortUpload : function() {
        this.abortXhr();
    },
    
    /**
     * 开始上传
     */
    onLoadstart: function(event, fileItem) {
    	this.fireEvent('uploadstart', fileItem);
    },
    
    /**
     * 上传中 实时进度
     */
    onUploadProgress: function(event, fileItem) {
    	var percentage = Math.round((event.loaded * 100) / event.total);
    	//console.log('event.loaded * 100=' + event.loaded * 100 + ' total=' + event.total + 'percentage = ' + percentage);
    	this.fireEvent('uploadprogress', percentage, fileItem);
    },
    
    /**
     * 完成上传 失败或成功
     */
    onLoadEnd: function(event, fileItem) {
    	var request = event.target;
        if (request.status != 200) {
        	this.fireEvent('uploadfailure', request.response, fileItem);
        } else {
        	var json = Ext.JSON.decode(request.response);
        	//Server Result --> {"success":true,"message":null}
        	if(json.success) {
        		this.fireEvent('uploadsuccess', fileItem);
        	} else {
        		this.fireEvent('uploadfailure', json.message, fileItem);
        	}
        }
    }
    
});