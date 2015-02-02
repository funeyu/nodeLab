define(function(){
	var post = {
		run:function(){
         var ele = $('.post .checked');
         
			   $('#load_button').click(function(){
        		$('#picLoader').click();
      		});
         ele.click(function(){
            var id = $(this).attr('id')*1;
            var tab = $('#node-tab option:eq('+(id+1)+')');
            tab.attr('selected','selected');
         });

      		$('#picLoader').change(function(){
          		var form = $('#publish');
        		var data = new FormData();
        		var files = $('#picLoader')[0].files[0];
         		if(files)data.append('codecsv', files);
        		$.ajax({
          			url     : '/loadPic',
          			type    : 'post',
          			xhr: function() {  // Custom XMLHttpRequest
            		var myXhr = $.ajaxSettings.xhr();
            		if(myXhr.upload){
              			  // For handling the progress of the upload
            		}
            		return myXhr;
        			},
		          dataType: 'json',
		          data    : data,
		          contentType:false,
		          processData:false,
		          success  :function(data){
		            var url=$('#formarea').val()+'![](..'+data.url+')';
		            $('#formarea').val(url);
		          }
       			 });
       		 });
		}
	}
    return post; 
})