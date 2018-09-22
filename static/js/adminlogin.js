$(function () {
    var form = layui.form;
    //验证码刷新
    $('#codeimg').click(function () {
        $(this).attr('src', '/coder?' + new Date());
    });
    // 登录
    form.on('submit(login)', function(data){
        $.ajax({
            url: '/admin/login',
            type: 'POST',
            dataType: 'JSON',
            data: $('#adminlogin').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result);
                if(result.r == 'u_not'){
                    $('input[name="username"]').parent().next('.layui-form-mid').html('账号不存在');
                    return ;
                }
                if(result.r == 'ok'){
                    window.location.href = '/admin';
                }
            }
        });
        return false; 
      });
    // $('.admin-login1').click(function () {
    //     if($('.layui-form-danger').length){
    //         return ;
    //     }
    //     $('.H').html('');
        
    // });

});