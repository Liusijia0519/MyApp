/**
 * @class MyApp.ux.upload.FileItem
 * @extends Ext.data.Model
 * @description 文件模型 封装文件基本数据信息
 * file html5原生文件对象 name 文件名 size 文件大小 
 * status 状态 [暂停上传,正在上传,上传失败,上传成功,准备上传] 
 * progress 上传进度百分数
 * @author 葛新
 */
Ext.define("MyApp.ux.upload.FileItem", {
	extend: 'Ext.data.Model',
    fields: ['file', 'name', 'size', 'status' , 'progress']
});