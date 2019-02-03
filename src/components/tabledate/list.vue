<template>
<div>
  <div class="cptop">

    <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>
    <span> <router-link :to="{path:'/tabledate/list',query:{id:nid}}">查看</router-link></span>
    <span> <router-link :to="{path:'/tabledate/update',query:{id:nid,cid:checksel}}">修改</router-link></span>
    <span> <router-link :to="{path:'/tabledate/del',query:{id:nid,cid:checksel}}">删除</router-link></span>
    <span> <router-link :to="{path:'/tabledate/imexcel',query:{id:nid,cid:checksel}}">导入imexcel</router-link></span>
    <span> <router-link :to="{path:'/tabledate/exexcel',query:{id:nid,cid:checksel}}">导出exexcel</router-link></span>
    <span> <router-link :to="{path:'/tabledate/upfile',query:{id:nid}}">上传文件</router-link></span>
    <span> <router-link :to="{path:'/tabledate/packzip',query:{id:nid}}">打包zip</router-link></span>
    <span> <router-link :to="{path:'/tabledate/pzip_list',query:{id:nid}}">打包Zip列表</router-link></span>
    <span> <router-link :to="{path:'/tabledate/pzip_down',query:{id:nid}}">下载Zip包</router-link></span>
    <span> <router-link :to="{path:'/tabledate/file_hooking',query:{id:nid}}">批量挂载</router-link></span>
  </div>
  <br>
  <form >
    <span>请选择：</span>字段
    <select v-model="sx">
      <option value="">不选择</option>
      <option   v-for="item in mitems" :value="item.field_show" >{{item.field_show}}</option>
    </select>
    比较
    <select v-model="js">
      <option value="<>">不选择</option>
      <option value=">">大于</option>
      <option value=">=">大于等于</option>
      <option value="=">等于</option>
      <option value="<">小于</option>
      <option value="<=">小于等于</option>
      <option value="<>">不等于</option>
      <option value="like">包含</option>
    </select>
   值
    <input type="text" v-model="tj">

    pagesize
    <select v-model="pagesize">
      <option value=""></option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>

    </select>

    <input type="button" value="搜索" @click="submit">
  </form>

<div>


  <table style="margin:0 auto;border-collapse:collapse;" border="1">

     <th>ID编号</th>
    <th v-for="item in mitems">
      {{item.field_show}}

    </th>
    <th>操作</th>
    <tr v-for="item in titems">
      <td>{{item.id}}</td>
       <td v-for="i in mitems">{{item[i.field_show]}}</td>
      <td><input type="checkbox" :value="item.id" v-model="checksel"></td>
    </tr>
  </table>
</div>
<!--{{checksel}}   {{chsel}}-->
</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "list",
    mounted:function () {
      this.csel();
      this.tablemenuid();
    },data(){
      return{
        company_id:'',
        items:'',
        nid:this.$route.query.id,
        chsel:"",
        mitems:'',
        titems:'',
        tj:'',
        js:'',
        sx:'',
        checksel:[],
        pagesize:'',
      }
    },methods:{
      csel:function () {
        var _this=this;

        this.$axios.post(_this.global.repathurl+'api/btns/list',qs.stringify({



        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.items=res.data.result;
          //console.log(res);

        })
      },tablemenuid:function(){
    var _this=this;
    this.$axios.post(_this.global.repathurl+'api/tfield/list',qs.stringify({

      menu_table_id:_this.nid,

    }),{
      headers:
        {

          'Content-Type':'application/x-www-form-urlencoded',
          "Authorization": 'Bearer'+' '+token,
        }
    }).then(function (res) {
      _this.mitems=res.data;


    })
      },submit:function () {
        var _this=this;
        var sx=_this.sx;
        var js=_this.js;
        var tj=_this.tj;
        var pagesize=_this.pagesize;
        if(sx==""&&js==""&&tj==""){
          var wh="";
        }
        else{
          var wh=[sx,js,tj]
        }
        //console.log(wh);
        this.$axios.put(_this.global.repathurl+'api/tabledate/list',{

          menu_table_id:_this.nid,
          page:1,
          pagesize:pagesize,
          order:["id","asc"],
          where:[
           wh
          ]

        },{
          headers:
            {

              'Content-Type':'application/json',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.titems=res.data;
        // console.log(res);

        })
      }
    }
  }
</script>

<style scoped>
  .cptop{
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: right;
  }
  th{
    width:10%
  }
</style>
