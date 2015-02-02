define(function(){
    var State={
      user:{
        login:$('#logined').val(),
        name :$('#userName').val(),
        image:$('#userProfile').val(),
      },
      
      getLogin:function(){//判断是否登陆,登陆返回：true
          return this.user.login=='true';
      },
      setLogin:function(str){//设置登陆了,
        this.user.login = str;
      },
      getUser:function(){
        return this.user;
      },
      setUser:function(data){
        this.user = data;
      }
    }
  return State;
});