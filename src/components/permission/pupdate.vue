<template>
<div>
  <div>
    <span> <router-link to="/permission/pindex">权限新增</router-link></span>
    <span> <router-link to="/permission/pupdate">权限修改</router-link></span>
    <span> <router-link to="/permission/plist">权限列表</router-link></span>
    <span> <router-link to="/permission/prlist">查询角色下所有权限</router-link></span>

  </div>
  <br>
  <form>

    角色编号<input type="text" :role_id="role_id" :value="role_id" disabled>

  </form>
  <div style="">

    <div style="width: 22%;float:left" >
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>按钮编号</th><th>按钮名称</th>


        <tr  v-for="item in items.btns">
          <td> <label :for="'bt_'+item.btns_id">{{item.btns_id}}</label></td>
          <td><label :for="'bt_'+item.btns_id">{{item.name}}</label><input type="checkbox" :value="item.btns_id" :id="'bt_'+item.btns_id" v-model="btns" ></td>

        </tr>
        <tr><td><input type="checkbox" id="checkall" @click="checkall" v-model="checked"><label for="checkall">全选</label></td><td></td></tr>
      </table>

    </div>
    <div style="width: 24%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>菜单编号</th><th>菜单名称</th>


        <tr  v-for="item in items.menu">
          <td><label :for="'bt_'+item.tree_menu_id">{{item.tree_menu_id}}</label></td>
          <td><label :for="'bt_'+item.tree_menu_id">{{item.name}}</label><input type="checkbox" :value="item.tree_menu_id" :id="'bt_'+item.tree_menu_id" v-model="menu" ></td>

        </tr>
        <tr><td><input type="checkbox" id="checkall1" @click="checkall1" v-model="checked1"><label for="checkall1">全选</label></td><td></td></tr>
      </table>
    </div>
    <div style="width: 22%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>表编号</th><th>表名称</th>


        <tr  v-for="item in items.table">
          <td><label :for="'bt_'+item.menu_table_id">{{item.menu_table_id}}</label></td>
          <td><label :for="'bt_'+item.menu_table_id">{{item.show_name}}</label><input type="checkbox" :value="item.menu_table_id" :id="'bt_'+item.menu_table_id" v-model="table" ></td>
        </tr>
        <tr><td><input type="checkbox" id="checkall2" @click="checkall2" v-model="checked2"><label for="checkall2">全选</label></td><td></td></tr>
      </table>
    </div>
    <div style="width: 25%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>功能路径</th><th>功能名称</th>


        <tr  v-for="item in items.sys">

          <td><label :for="'bt_'+item.uri">{{item.uri}}</label></td>
          <td><label :for="'bt_'+item.uri">{{item.name}}</label><input type="checkbox" :value="item.uri" :id="'bt_'+item.uri" v-model="sys" ></td>
        </tr>
        <tr><td><input type="checkbox" id="checkall3" @click="checkall3" v-model="checked3"><label for="checkall3">全选</label></td><td></td></tr>
      </table>
    </div>
  </div>
  <div style="clear: both"></div>
  <div><input type="button" value="更新" @click="updatedo"></div>
</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "pupdate",
    data(){
      return{
        items:'',
        role_id:'',
        btns:[],
        checked:false,
        checked1:false,
        checked2:false,
        checked3:false,
        menu:[],
        table:[],
        sys:[],
      }
    },
    mounted:function () {
      this.search();
    },methods:{
      checkall:function(){
        var that=this;

        if(that.checked){
          that.btns = [];
        }else{

          that.items.btns.forEach(function (item,index) {
            that.btns.push(item.btns_id);
          });
        }

      },checkall1:function(){
        var that=this;

        if(that.checked1){
          that.menu = [];
        }else{

          that.items.menu.forEach(function (item,index) {
            that.menu.push(item.tree_menu_id);
          });
        }

      },
      checkall2:function(){
        var that=this;

        if(that.checked2){
          that.table = [];
        }else{

          that.items.table.forEach(function (item,index) {
            that.table.push(item.menu_table_id);
          });
        }

      },
      checkall3:function(){
        var that=this;

        if(that.checked3){
          that.sys = [];
        }else{

          that.items.sys.forEach(function (item,index) {
            that.sys.push(item.uri);
          });
        }

      }

     , search:function () {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/permission/list',qs.stringify({



        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.items=res.data;
         // console.log(res);





            var rid=_this.$route.query.rid;
            _this.$axios.post(_this.global.repathurl+'api/permission/rlist',qs.stringify({
              role_id:rid


            }),{
              headers:
                {

                  'Content-Type':'application/x-www-form-urlencoded',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (result) {
             console.log(result);
            var roleres=result.data[0].permission;
            _this.btns=roleres.btns;
            _this.table=roleres.table;
            _this.sys=roleres.sys;
            _this.menu=roleres.menu;
            _this.role_id=rid;




            })






















        })
      },updatedo:function () {
        var that=this;
        var id=this.$route.query.id;
        this.$axios.put(this.global.repathurl+'api/permission/update',{
          permission_column_id:id,
          role_id:this.role_id,
          menu:this.menu,
          sys:this.sys,
          table:this.table,
          btns:this.btns,
        },{
          headers:
            {

              'Content-Type':'application/json',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('修改成功');
            window.location.href=that.global.pathurl+'permission/prlist'
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
