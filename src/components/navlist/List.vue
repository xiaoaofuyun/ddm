<template>
  <div>
  <div style="width: 100%;height: 50px ;border-bottom: 2px solid #579fe9">
      <div style="float: right;">
        <ul class="listul">
          <li>
            <router-link :to="{path:'/navlist/tableadd',query:{id:ids}}">新建表</router-link>
          </li>
          <li>
            <router-link :to="{path:'/navlist/tableup',query:{id:ids}}">修改</router-link>
          </li>
          <li>
            <router-link :to="{path:'/navlist/tabledel',query:{id:ids}}">删除</router-link>
          </li>
          <li>
            <router-link :to="{path:'/navlist/tablesel',query:{id:ids}}">查询</router-link>
          </li>
          <li>
            <router-link :to="{path:'/tfield/index',query:{id:ids}}">新建表字段</router-link>
          </li>
          <!--<li><router-link to="/tfield/del"   >删除表字段</router-link></li>-->
          <li>
            <router-link :to="{path:'/tfield/list',query:{id:ids}}">查看表字段</router-link>
          </li>
          <li>
            <router-link :to="{path:'/tfield/dtype',query:{id:ids}}">查询数据类型</router-link>
          </li>
        </ul>
      </div>
  </div>
    <div style="clear: both"></div>
    <div style="height: 100%;">

      <span id="spanid">菜单导航ID:{{ids}}</span>


      <iframe id="framestate"    width="100%;"  :src="pathurl+'navlist/tableadd'" frameborder="0" :data_id="ids" name="tablelist" >


      </iframe>
      <!--<div style="height: 750px;width: 100%;background-color: #00ee00"></div>-->
    </div>

  </div>
</template>

<script>


    export default {
        name: "list",
      data(){
          return{
            ids:'',
            url:this.global.pathurl+'navlist/tableadd',
            iframeState:false,
            iframeurl:'/navlist/tableadd',
            pathurl:this.global.pathurl

          }
      },watch: {
       '$route' (to, from,next) {

        // console.log(to.query.listid);
         this.ids=to.query.listid
         //console.log(window.location.href.split('=')[1])
        },
        'window.location.href'(val){
          //console.log(window.location.href.split('=')[1])
          console.log(val)
        }

          // 深度观察监听




       },methods:{
        getPath(){
        //console.log(window.location.href.split('=')[1])
          this.ids=window.location.href.split('=')[1];
        //console.log(this.$router.history.current.query.listid);
          //return 0;
          //console.log(this.$router);
        },
        showIframe(event){

         // this.iframeState = true;
         // console.log(this.iframeState);
        var iframeset=  document.getElementById('framestate')
       // console.log( iframeset.src);
         // console.log(event.target.href);
          iframeset.src=event.target.href;
          //console.log( iframeset.src);
        }
      }
      ,created(){
        this.getPath()

      },components:{
        // child:Tableadd,
      }
    }
</script>

<style scoped>
  ul>li {
    float:left;
    margin:5px;
  }
  .listul a{
    text-decoration: none;
    color:#333;
    line-height: 40px;
  }
</style>
