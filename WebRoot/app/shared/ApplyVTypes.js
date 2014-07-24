Ext.onReady(function() {
    Ext.apply(Ext.form.field.VTypes, {
    	//日期
        daterange: function(val, field) {
            var date = field.parseDate(val);

            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
            /*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
            return true;
        },
        daterangeText: '开始日期必须小于结束日期', 
    	
    	password: function(val, field) {
            if (field.initialPassField) {
                var pwd = field.up('form').down('#' + field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },
        passwordText: '两次密码不一致',
        
        noPunctuation: function(val, field) {
        	return /^[a-zA-z0-9\u4E00-\u9FA5]*$/.test(val);
        },
        
        noPunctuationText: '只能输入字母 数字 中文 不能输入标点符号',
        
        chinese:function(val,field)    
		  {    
		  	return  /^[\u4e00-\u9fa5]+$/i.test(val);
		  },    
	  	chineseText:'请输入中文',
	  	
	  	number:function(val,field){
	  		return /^[0-9]*$/.test(val);
	  	},
	  	numberText:'只能输入数字',
	  	 age:function(val,field)    
		  {    
		        try    
		        {    
		            if(parseInt(val) >= 18 && parseInt(val) <= 100)    
		                return true;    
		            return false;    
		        }    
		        catch(err)     
		        {    
		            return false;    
		        }    
		  },    
		  ageText:'年龄输入有误', 
	  	alphanum:function(val,field)    
		  {    
		        try    
		        {    
		            if(!/\W/.test(val))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  alphanumText:'请输入英文字母或是数字,其它字符是不允许的.',    
		      
		  url:function(val,field)    
		  {    
		        try    
		        {    
		            if(/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(val))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  urlText:'请输入有效的URL地址.',    
		      
		  max:function(val,field)    
		  {    
		        try    
		        {    
		            if(parseFloat(val) <= parseFloat(field.max))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  maxText:'超过最大值',    
		      
		  min:function(val,field)    
		  {    
		        try    
		        {    
		            if(parseFloat(val) >= parseFloat(field.min))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  minText:'小于最小值',    
		          
		  datecn:function(val,field)    
		  {    
		        try    
		        {    
		            var regex = /^(\d{4})-(\d{2})-(\d{2})$/;    
		            if(!regex.test(val)) return false;    
		            var d = new Date(val.replace(regex, '$1/$2/$3'));    
		            return (parseInt(RegExp.$2, 10) == (1+d.getMonth())) && (parseInt(RegExp.$3, 10) == d.getDate())&&(parseInt(RegExp.$1, 10) == d.getFullYear());    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  datecnText:'请使用这样的日期格式: yyyy-mm-dd. 例如:2008-06-20.',    
		      
		  integer:function(val,field)    
		  {    
		        try    
		        {    
		            if(/^[-+]?[/d]+$/.test(val))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  integerText:'请输入正确的整数',    
		      
		  minlength:function(val,field)    
		  {    
		        try    
		        {    
		            if(val.length >= parseInt(field.minlen))    
		                return true;    
		            return false    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  minlengthText:'长度过小',    
		      
		  maxlength:function(val,field)    
		  {    
		     try    
		     {    
		        if(val.length <= parseInt(field.maxlen))    
		            return true;    
		        return false;    
		     }    
		     catch(e)    
		     {    
		        return false;    
		     }    
		  },    
		  maxlengthText:'长度过大',    
		      
		  ip:function(val,field)    
		  {    
		        try    
		        {    
		            if((/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val)))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  ipText:'请输入正确的IP地址',    
		      
		  phone:function(val,field)    
		  {    
		        try    
		        {    
		            if(/^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/.test(val))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  phoneText:'请输入正确的电话号码,如:0920-29392929',    
		      
		  mobilephone:function(val,field)    
		  {    
		        try    
		        {    
		            if(/(^0?[1][35][0-9]{9}$)/.test(val))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  mobilephoneText:'请输入正确的手机号码',    
		      
		  alpha:function(val,field)    
		  {    
		        try    
		        {    
		            if( /^[a-zA-Z]+$/.test(val))    
		                return true;    
		            return false;    
		        }    
		        catch(e)    
		        {    
		            return false;    
		        }    
		  },    
		  alphaText:'请输入英文字母'   
	  	
    });	
});