<template>
  <div>
    <div class="cptop">

      <span> <router-link :to="{path:'/tabledate/index',query:{id:nid}}">新增</router-link></span>
      <span> <router-link :to="{path:'/tabledate/list',query:{id:nid}}">查看</router-link></span>
      <span> <router-link :to="{path:'/tabledate/update',query:{id:nid,cid:checksel}}">修改</router-link></span>
      <span> <router-link :to="{path:'/tabledate/del',query:{id:nid,cid:checksel}}">删除</router-link></span>


    </div>
    <br>
    <form >
    <table style="margin:0 auto;border-collapse:collapse;" border="1">
      <tr v-for="(v,i) in titems">

        <td v-for="(vv,ii) in v">{{ii}}</td>
      </tr>

      <th  >






      </th>

      <tr v-for="item in titems">
       <td>{{item.id}}</td>
        <td v-for="(vv,key,ii) in item" v-if="key !='id'">

          <input type="text" :value="vv"  :kk="vv" class="select">


        </td>

      </tr>
    </table>
      <div><input type="button" value="更新" @click="update"></div>
    </form>
<!--{{titems}}-->
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
        nid:this.$route.query.id,
        checksel:this.$route.query.cid,
        items:"",
        cid:[],
        tid:[],
        titems:"",
        mitems:'',
      }

    },mounted:function () {
      this.sel()
    }
    ,methods:{
      update:function () {
        var _this=this;
        var narr=_this.cid;
        var drr=[];
       var atrrs=this.titems[0];
       var atts=JSON.parse(JSON.stringify(atrrs));
       //console.log(atts[0]);

        var str=[];
        for(var tt in atts){
            if(tt!='id'){
              str.push(tt);
            }

          }

         var strarr=[];
       $('.select').each(function (v,e) {
         // console.log($(this).val());
           var ff={};
           ff[str[v]]=$(this).val();
           strarr.push(ff);

       });
        function replaceAll1(str)
        {
          if(str!=null)
            str = str.replace(/{/g,"");
          return str;
        }
        function replaceAll2(str)
        {
          if(str!=null)
            str = str.replace(/}/g,"");
          return str;
        }
        var str1=replaceAll1(JSON.stringify(strarr));
        var str2=replaceAll2(str1);
        var strs='['+str2.replace('[','{').replace(']','}')+']';
      // console.log(strarr);
        var json={

          menu_table_id:_this.nid,
          id:_this.checksel[0],
          data:
            JSON.parse(strs)[0],

        };
        //console.log(json);
             _this.$axios.put(_this.global.repathurl+'api/tabledate/update',json,{
              headers:
                {

                  'Content-Type':'application/json',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (res) {

              if(res.data.code==1){
                alert('更新成功');
              }
              else{
                alert('更新失败');
              }

            });




      },sel:function () {
        var cid=this.$route.query.cid
        var wh=['id','=',cid];
        var _this=this;
        this.$axios.put(_this.global.repathurl+'api/tabledate/list',{

          menu_table_id:this.nid,
          page:1,
          pagesize:1,
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
    width: 10%;
  }
</style>
