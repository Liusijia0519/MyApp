Ext.define('MyApp.model.system.MenuModel', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'id', mapping: 'id'},  
         {name: 'text', mapping: 'menuName'},   
         'extController',
         'springController', 'menuClass', 
         'leaf', 'icon16', 'icon24', 'icon32',
         'icon48', 'index', 'parentId']
});