<template>
        <div>

            <div class="cptop">
               <span> <router-link to="/company/cpindex">所有单位</router-link></span>
               <span> <router-link to="/company/list">部门查看</router-link></span>
              <span> <router-link to="/department/dindex">添加部门</router-link></span>
              <span><router-link to="/company/index">新增单位</router-link></span>
            <!--  <span><router-link to="/company/update">修改单位</router-link></span>
              <span><router-link to="/company/del">删除单位</router-link></span>-->
            </div>
          <br>

          <div class="cptop_div">
            <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

              <th>单位编号</th>  <th>单位名称</th><th>操作</th>
              <tr  v-for="item in items">
                <td>{{item.company_id}}</td>

                <td>{{item.name}}</td>
                <td><router-link :to="{path:'/company/list',query:{id:item.company_id}}">查看</router-link>
                  <router-link :to="{path:'/company/update',query:{id:item.company_id}}">编辑</router-link>
                  <router-link :to="{path:'/company/del',query:{id:item.company_id}}">删除</router-link></td>
              </tr>
            </table>

          </div>
        </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "cpindex",
    mounted:function () {
       this.csel()
    },
    data(){
      return{
        company_id:'',
        items:'',
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
          _this.items=res.data.result;
          console.log(res);

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
    .cptop_div{
        width: 98%;
        margin: 0 auto;
    }
.cptop_div table{
    width: 100%;
}
.cptop_div table th{
    line-height: 40px;
    background-color: #f2f2f2;
}
.cptop_div table td{
    line-height: 35px;
}
</style>
