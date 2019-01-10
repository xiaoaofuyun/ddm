<template>
  <div>
  <div  class="cptop">
    <span> <router-link to="/company/cpindex">所有单位</router-link></span>
    <span> <router-link to="/company/list">部门查看</router-link></span>
    <span> <router-link to="/department/dindex">添加部门</router-link></span>
    <span><router-link to="/company/index">新增单位</router-link></span>
    <!--<span><router-link to="/company/update">修改单位</router-link></span>
    <span><router-link to="/company/del">删除单位</router-link></span>-->
  </div>
  <br>
    <form>
      <table class="bianjitable" style="width:500px; margin: 0 auto;border-collapse:collapse;" border="1">
        <tr><td>名称</td><td><input type="text" :name="name" id="name" ></td></tr>
        <tr><td>描述</td><td><textarea :describe="describe" id="describe"></textarea></td></tr>
        <tr><td>单位代码</td><td><input type="text" :code="code" id="code"></td></tr>
        <tr><td>单位性质</td><td><input type="text" :nature="nature" id="nature"></td></tr>
        <tr><td>单位地址</td><td><input type="text" :address="address" id="address"></td></tr>
        <tr><td>是否启用</td><td><select name=""  :is_flag="is_flag" id="is_flag">
          <option value="1" selected="selected">是</option>
          <option value="0">否</option>
        </select></td></tr>
        <tr><td>排序</td><td><input type="text" :order="order" id="order"></td></tr>
        <tr><td>父级PID</td><td>
          <select name=""   :pid="pid" id="selclass"></select>
        </td></tr>
        <!--<tr><td></td><td><input class="bianjitable_but" type="button" @click="updatedo" value="更新"></td></tr>-->
      </table>
      <input class="bianjitable_but" type="button" @click="updatedo" value="更新">
    </form>
  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "update",
        data(){
           return{
             name:'',
             describe:'',
             code:'',
             nature:'',
             address:'',
             is_flag:'',
             pid:'',
             order:''
           }
        },
       mounted:function () {
         this.update();
       },methods:{
        update:function() {
          var nid=this.$route.query.id;
          //console.log(nid);
          var that=this;
          that.$axios.post(that.global.repathurl+'api/company/list',qs.stringify({company_id:nid}),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
           // console.log(res.data.result.length);

            var treeArr = [];
            function tree( arr , pid , level){
              for (var i = 0; i < arr.length; i++) {
                if( arr[i].pid == pid ){
                  arr[i].level = level;
                  treeArr.push(arr[i]);
                  tree( arr,arr[i].tree_menu_id,level+1 );
                }
              }
            }
            var arr=res.data.result;
            tree( arr , 0 , 0);
            console.log(treeArr);

            var tmpStr = "<option value='0' >顶级</option>";
            for (var i = 0; i < treeArr.length; i++) {

              var tm='';
              for (var j = 0; j < treeArr[i].level; j++) {
                tm += "--";
              }
              // document.write( tmpStr  + treeArr[i].city + "<br/>");
              tmpStr+="<option value="+treeArr[i].tree_menu_id+">"+tm+treeArr[i].name+"</option>";

            }
            $('#selclass').append(tmpStr);





            for ( var i = 0; i <res.data.result.length; i++){
              if(res.data.result[i].company_id==nid){
                // $('#navname').value()=res.data[i].name;
                // res.data[i].name;
                //console.log(res.data[i]);
                $('#name').val(res.data.result[i].name);
                $('#describe').val(res.data.result[i].describe);
                $('#code').val(res.data.result[i].code);
                $('#nature').val(res.data.result[i].nature);
                $('#address').val(res.data.result[i].address);
                $('#is_flag').val(res.data.result[i].is_flag);
                $('#order').val(res.data.result[i].order);

                var thispid=res.data.result[i].pid;
                //$('#selclass').append("<option selected='selected'>"+'111111111'+"</option>");
                //alert();
                $('#selclass option').each(function () {
                  //console.log($(this).val());
                  if($(this).val()==thispid)
                  {
                    $(this).attr('selected','selected');
                  }
                })



              }
            }

          })


        },updatedo:function () {
          var that=this;
          var nid=this.$route.query.id;
          that.$axios.post(that.global.repathurl+'api/company/update',qs.stringify({
            company_id:nid,



            name: $('#name').val(),
            describe:$('#describe').val(),
            code:$('#code').val(),
            nature:$('#nature').val(),
            address:$('#address').val(),
            is_flag:$('#is_flag').val(),
            pid:$('#selclass').val(),
            order:$('#order').val(),
          }),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            if(res.data.code=='1'){
              alert('修改成功');
              window.location.href=that.global.pathurl+'company/cpindex'
            }else{
              alert('修改失败');
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>
  .cptop{
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: right;
  }
  .cptop span{
    margin-right: 20px;
  }
  .cptop span a{
    line-height: 30px;
    padding: 10px 0;
    box-sizing: border-box;
    text-decoration: none;
    display: inline-block;
  }
  .bianjitable td{
    line-height: 40px;
  }
  .bianjitable input,.bianjitable textarea,.bianjitable select{
    line-height: 40px;
    height: 40px;
    width: 100%;
    margin: 0 auto;
    border: none;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .bianjitable textarea{
    height: auto;
  }
  .bianjitable_but{
    background-color: #579fe9;
    color:#fff;
    width:200px;
    height: 40px;
    line-height: 40px;
    border: none;
    margin: 20px auto;
    font-size: 16px;
    cursor: pointer;
  }
</style>
