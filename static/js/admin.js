$(function(){
    let form = layui.form;
    // 添加门票
    form.on('submit(addprice)', function(data){
        $.ajax({
            url: '/admin/ticketadd',
            type: 'POST',
            dataType: 'JSON',
            data: $('#ticketadd').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result.r);
                if(result.r=="success"){
                    // $('.biaoji').html('添加成功');
                    console.log(666)
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });

    //门票修改

    form.on('submit(updatetickets)',function(data){
        $.ajax({
            url: '/admin/updatetickets',
            type: 'POST',
            dataType: 'JSON',
            data: $('#updatetickets').serialize(),
            
            success: function (result) {
                console.log(result.r);
                if(result.r=="success"){
                 console.log(666); 
                }
            }
        });
        return false;
    })
})