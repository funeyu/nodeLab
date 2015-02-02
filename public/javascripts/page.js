define(function(){
	var page={
		node_cat :$('#node_cat').val(),
		page_type :$('#page_type').val(),
		topic_count :$('#topic_count').val()*1,
		current_page :$('#current_page').val()*1,
		run:function(){
			if(this.page_type==='index')url = '/?page=';
	        if(this.page_type==='node')url = '/node?node_cat='+this.node_cat+'&page=';
	        var pagesize = 16;   
	        var counts,pagehtml="";  
	        if(this.topic_count%pagesize==0){  
	            counts = parseInt(this.topic_count/pagesize);  
	        }else{  
	            counts = parseInt(this.topic_count/pagesize)+1;  
	        }  
	        //只有一页内容  
	        if(this.topic_count<=pagesize){pagehtml="";}  
	        //大于一页内容  
	        if(this.topic_count>pagesize){  
	            if(this.current_page>1){  
	                pagehtml+= '<li><a href="'+url+(this.current_page-1)+'"><span><上一页</span></a></li>';  
	            }  
	            for(var i=0;i<counts;i++){  
	                if(i>=(this.current_page-3) && i<(this.current_page+3)){  
	                    if(i==this.current_page-1){  
	                        pagehtml+= '<li class="active"><a href="'+url+(i+1)+'">'+(i+1)+'</a></li>';  
	                    }else{  
	                        pagehtml+= '<li><a href="'+url+(i+1)+'">'+(i+1)+'</a></li>';  
	                    }        
	                }  
	            }  
	            if(this.current_page<counts){  
	                pagehtml+= '<li><a href="'+url+(this.current_page+1)+'"><span>下一页></span></a></li>';  
	            }  
	        }
	        $("#pagination").html(pagehtml);  
		}
	}
return page;
});