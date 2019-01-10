<template>
<div>
  <div>

    <span> <router-link to="/role/rlist">角色查看</router-link></span>
    <span> <router-link to="/role/rindex">添加角色</router-link></span>
    <span> <router-link to="/role/listur">查询角色关联的用户</router-link></span>
    <span> <router-link to="/role/createur">角色用户关联</router-link></span>

  </div>
  <br>
  <form>
    <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

      <tr><td>角色名称</td><td><input type="text" :name="name" id="name"></td></tr>
      <tr><td>角色描述</td><td><textarea name="" id="" cols="30" rows="10" :describe="describe" id="describe"></textarea></td></tr>
      <tr><td>单位编号</td><td><input type="text" :company_id="company_id" id="company_id"></td></tr>
      <tr><td colspan="2"><input type="button" value="提交" @click="roleupdate"></td></tr>
    </table>



  </form>

</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "rupdate",
    data(){
      return{
        name:'',
        describe:'',

        company_id:''
      }
    },
    mounted:function () {
      this.update();
    },methods:{
      update:function() {
        var nid=this.$route.query.id;
        var cid=this.$route.query.cid;
        //console.log(nid);
        var that=this;
        that.$axios.post(that.global.repathurl+'api/role/list',qs.stringify({company_id:cid}),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          // console.log(res.data.result.length);
          for ( var i = 0; i <res.data.result.length; i++){
            if(res.data.result[i].role_id==nid){
              // $('#navname').value()=res.data[i].name;
              // res.data[i].name;
              //console.log(res.data[i]);
              $('#name').val(res.data.result[i].name);
              $('#describe').val(res.data.result[i].describe);
              $('#company_id').val(res.data.result[i].company_id);
            }
          }

        })


      },roleupdate:function () {
        var that=this;
        var nid=this.$route.query.id;
        that.$axios.post(that.global.repathurl+'api/role/update',qs.stringify({
          role_id:nid,



          name: $('#name').val(),
          describe:$('#describe').val(),
          company_id:$('#company_id').val(),
        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('修改成功');
            window.location.href=that.global.pathurl+'role/rlist'
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

</style>
