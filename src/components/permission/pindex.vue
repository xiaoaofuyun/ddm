<template>
  <div>


    <div class="cptop">
      <span> <router-link to="/permission/pindex">权限新增</router-link></span>
      <!--<span> <router-link to="/permission/pupdate">权限修改</router-link></span>-->
      <span> <router-link to="/permission/plist">权限列表</router-link></span>
      <span> <router-link to="/permission/prlist">查询角色下所有权限</router-link></span>

    </div>
    <br>
    <form>
      <div class="pindex_top">
        <h2>单位：</h2>
        <select name="" v-model="company_id" @change="getdp(company_id)" style="width: 300px;height: 30px;">
          <option v-for="item in citems" :value="item.company_id">
            {{item.name}}
          </option>

        </select>
        <h2>角色</h2><select v-model="role_id" style="width: 300px;height: 30px;">
        <option v-for="item in ritems" :value="item.role_id" >
          {{item.name}}
        </option>

      </select>
      </div>
    </form>
    <div style="">

      <div  style="width: 98%;margin: 20px auto" >
        <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
          <!--<th>按钮编号</th><th>按钮名称</th>-->
          <!--<tr  v-for="item in items.btns">-->
            <!--<td> <label :for="'bt_'+item.btns_id">{{item.btns_id}}</label></td>-->
            <!--<td><label :for="'bt_'+item.btns_id">{{item.name}}</label><input type="checkbox" :value="item.btns_id" :id="'bt_'+item.btns_id" v-model="btns" ></td>-->
          <!--</tr>-->
         <!--<tr><td><input type="checkbox" id="checkall" @click="checkall" v-model="checked"><label for="checkall">全选</label></td><td></td></tr>-->
        <!--</table>-->

        <div class="quanxiantitle">
          <h2>按钮类</h2>
          <div class="quanxianbox"><input type="checkbox" id="checkall" @click="checkall" v-model="checked"><label for="checkall">全选</label></div>
        </div>
        <ul class="quanxianlist">
          <li v-for="item in items.btns">
            <h2 class="on"><label :for="'bt_'+item.btns_id">{{item.btns_id}}</label></h2>
            <h2><label :for="'bt_'+item.btns_id">{{item.name}}</label><input type="checkbox" :value="item.btns_id" :id="'bt_'+item.btns_id" v-model="btns" ></h2>
          </li>
        </ul>


      </div>
      <div  style="width: 98%;margin: 20px auto">
        <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
          <!--<th>菜单编号</th><th>菜单名称</th>-->
          <!--<tr  v-for="item in items.menu">-->
            <!--<td><label :for="'bt_'+item.tree_menu_id">{{item.tree_menu_id}}</label></td>-->
            <!--<td><label :for="'bt_'+item.tree_menu_id">{{item.name}}</label><input type="checkbox" :value="item.tree_menu_id" :id="'bt_'+item.tree_menu_id" v-model="menu" ></td>-->
          <!--</tr>-->
          <!--<tr><td><input type="checkbox" id="checkall1" @click="checkall1" v-model="checked1"><label for="checkall1">全选</label></td><td></td></tr>-->
        <!--</table>-->

        <div class="quanxiantitle">
          <h2>菜单类</h2>
          <div class="quanxianbox"><input type="checkbox" id="checkall1" @click="checkall1" v-model="checked1"><label for="checkall1">全选</label></div>
        </div>
        <ul class="quanxianlist">
          <li v-for="item in items.menu">
            <h2 class="on"><label :for="'bt_'+item.tree_menu_id">{{item.tree_menu_id}}</label></h2>
            <h2><label :for="'bt_'+item.tree_menu_id">{{item.name}}</label><input type="checkbox" :value="item.tree_menu_id" :id="'bt_'+item.tree_menu_id" v-model="menu" ></h2>
          </li>
        </ul>


      </div>
      <div style="width: 98%;margin: 20px auto">
        <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
          <!--<th>表编号</th><th>表名称</th>-->
          <!--<tr  v-for="item in items.table">-->
            <!--<td><label :for="'bt_'+item.menu_table_id">{{item.menu_table_id}}</label></td>-->
            <!--<td><label :for="'bt_'+item.menu_table_id">{{item.show_name}}</label><input type="checkbox" :value="item.menu_table_id" :id="'bt_'+item.menu_table_id" v-model="table" ></td>-->
          <!--</tr>-->
          <!--<tr><td><input type="checkbox" id="checkall2" @click="checkall2" v-model="checked2"><label for="checkall2">全选</label></td><td></td></tr>-->
        <!--</table>-->

        <div class="quanxiantitle">
          <h2>表单类</h2>
          <div class="quanxianbox"><input type="checkbox" id="checkall2" @click="checkall2" v-model="checked2"><label for="checkall2">全选</label></div>
        </div>
        <ul class="quanxianlist">
          <li  v-for="item in items.table">
            <h2 class="on"><label :for="'bt_'+item.menu_table_id">{{item.menu_table_id}}</label></h2>
            <h2><label :for="'bt_'+item.menu_table_id">{{item.show_name}}</label><input type="checkbox" :value="item.menu_table_id" :id="'bt_'+item.menu_table_id" v-model="table" ></h2>
          </li>
        </ul>

      </div>
      <div style="width: 98%;margin: 20px auto">
        <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
          <!--<th>功能路径</th><th>功能名称</th>-->
          <!--<tr  v-for="item in items.sys">-->
            <!--<td><label :for="'bt_'+item.uri">{{item.uri}}</label></td>-->
            <!--<td><label :for="'bt_'+item.uri">{{item.name}}</label><input type="checkbox" :value="item.uri" :id="'bt_'+item.uri" v-model="sys" ></td>-->
          <!--</tr>-->
          <!--<tr><td><input type="checkbox" id="checkall3" @click="checkall3" v-model="checked3"><label for="checkall3">全选</label></td><td></td></tr>-->
        <!--</table>-->

        <div class="quanxiantitle">
          <h2>功能类</h2>
          <div class="quanxianbox"><input type="checkbox" id="checkall3" @click="checkall3" v-model="checked3"><label for="checkall3">全选</label></div>
        </div>
        <ul class="quanxianlist">
          <li class="on"  v-for="item in items.sys">
            <h2 class="on"><label :for="'bt_'+item.uri">{{item.uri}}</label></h2>
            <h2><label :for="'bt_'+item.uri">{{item.name}}</label><input type="checkbox" :value="item.uri" :id="'bt_'+item.uri" v-model="sys" ></h2>
          </li>
        </ul>

      </div>
    </div>
    <div style="clear: both"></div>
<div class="quanxian_but"><input type="button" value="提交" @click="submit"></div>
  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  //console.log(token);
  export default {
    name: "pindex",
    mounted:function () {

      this.search();
      this.csel();
    },

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
        ritems:'',
        citems:'',
        company_id:''
      }
    },methods:{
      csel:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/company/list',qs.stringify({



        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.citems=res.data.result;
          //console.log(res.data.result);

        })
      },
      getdp:function (id) {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/role/list',qs.stringify({
          company_id:id


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.ritems=res.data.result;
          //console.log(res);

        })
      },
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

      },
      search:function () {

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
          console.log(res);

        })
      },submit:function () {
        var _this=this;
        this.$axios.put(this.global.repathurl+'api/permission/index',{
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
            alert('添加成功');
            window.location.href=_this.global.pathurl+'permission/prlist'
          }else{
            alert('添加失败');
          }
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
  .pindex_top{
    width: 98%;
    margin: 20px auto;
    font-size: 0;
    text-align: left;
  }
  .pindex_top h2{
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    color:#333;
    line-height: 30px;
  }
  .pindex_top input{
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 15px;
  }
  .quanxianlist{
    text-align: left;
    font-size: 0;
  }
  .quanxianlist li{
    display: inline-block;
    vertical-align: middle;
    width: 12.5%
  }
  .quanxianlist li h2{
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    margin: 0 0 -1px -1px;
  }
  .quanxianlist li h2 input{
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
  }
  .quanxianlist li.on{
    width: 20%;
  }
  .quanxianlist li h2.on{
    background-color: #e5e5e5;
  }

  .quanxiantitle{
    width: 100%;
    margin: 0 auto 20px auto;
    border-bottom: 1px solid #ccc;
  }
  .quanxiantitle:after{
    content: "";
    clear: both;
    display: block;
  }
  .quanxiantitle h2{
    width: 10%;
    background-color: #579fe9;
    color:#fff;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: normal;
    float: left;
  }
  .quanxianbox{
    float: right;
    font-size: 16px;
    line-height: 40px;
  }
  .quanxianbox input{
    display: inline-block;
    vertical-align: middle;
  }
  .quanxian_but input{
    width: 200px;
    margin: 20px auto;
    display: block;
    background-color: #579fe9;
    color:#fff;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border: none;
    cursor: pointer;
  }
</style>
