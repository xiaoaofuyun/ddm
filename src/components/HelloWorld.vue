<template>
  <div class="hello">
    <div class="index_top">
      <div class=" top-left"><img src="../assets/images/top_logo.gif" alt=""></div>
    </div>
    <div class="top_bottom"></div>
    <div class="left">

      <ul id="menu" class="easyui-panel">
        <!--<li class="one_bar"><a href="http://localhost:8082/#/menu/sel" target="rightdis" v-on:click="list">菜单导航</a>-->

          <!-- <ul class="two_bar">
             &lt;!&ndash;<li v-on:click="add" class="nav_url">添加导航</li>&ndash;&gt;
             <li  class="nav_url"><a href="http://localhost:8082/#/menu/del" target="rightdis">添加导航</a></li>
             <li  class="nav_url"><a href="http://localhost:8082/#/menu/del" target="rightdis">删除导航</a></li>
             <li  class="nav_url"><a href="http://localhost:8082/#/menu/sel" target="rightdis">查看导航</a></li>
             <li  class="nav_url"><a href="http://localhost:8082/#/menu/update" target="rightdis">修改导航</a></li>
           </ul>-->
      <!--</li>-->
        <!--<li class="one_bar"><a href="#" v-on:click="list">导航管理</a>

                      <ul class="two_bar">
                        &lt;!&ndash;<li v-on:click="add" class="nav_url">添加导航</li>&ndash;&gt;
                        <li  class="nav_url"><a href="http://localhost:8082/#/menu/del" target="rightdis">添加导航</a></li>
                        <li  class="nav_url"><a href="http://localhost:8082/#/menu/del" target="rightdis">删除导航</a></li>
                        <li  class="nav_url"><a href="http://localhost:8082/#/menu/sel" target="rightdis">查看导航</a></li>
                        <li  class="nav_url"><a href="http://localhost:8082/#/menu/update" target="rightdis">修改导航</a></li>
                      </ul>
        </li>-->
        <!--<li  ><a href="http://localhost:8082/#/menu/del" target="rightdis">表管理</a></li>
        <li  ><a href="http://localhost:8082/#/menu/del" target="rightdis">表字段管理</a></li>
        <li  ><a href="http://localhost:8082/#/menu/del" target="rightdis">角色管理</a></li>
        <li  ><a href="http://localhost:8082/#/menu/del" target="rightdis">权限管理</a></li>-->
        <li  ><a :href="pathurl+'menu/add'" target="rightdis" @click="menushow">菜单导航</a></li>
        <div id='menu1'></div>
        <li><a :href="pathurl+'navlist/test'" target="rightdis">test测试</a></li>
        <li><a :href="pathurl+'company/cpindex'" target="rightdis">企业单位管理</a></li>
        <li><a :href="pathurl+'user/ulist'" target="rightdis">用户管理</a></li>
      </ul>
    </div>

    <div class="right">


      <iframe id="rigpa" :src="pathurl+'menu/add'" frameborder="0" name="rightdis" ></iframe>
    </div>
    <div class="footer">footer</div>

    <ul>
      <li>

      </li>
    </ul>
  </div>
</template>

<style>
  @import url('../assets/css/index.css');

  /*@import url('../assets/menu/easyui.css');*/

  /*@import url('../assets/menu/icon.css');*/

</style>
<script>

// import '../assets/menu/jquery.easyui.min.js';
  import $ from 'jquery'

     $(document).ready(function(){

       /*if(location.href.indexOf("#reloaded")==-1){
         location.href=location.href+"#reloaded";
         location.reload();
       }*/


       $(".one_bar").click(function(){
         $(this).children('ul').slideToggle();
         //console.log($(this))
         $(this).siblings().children('ul').hide();
       });
     });

var qs = require('qs');
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
 // console.log(cookie.get('token'))
export default {
  name: 'HelloWorld',
  inject:['reload'],
  data () {
    return {
      msg: '11111',
      pathurl:this.global.pathurl
    }
  },
created: function () {

  this.getMenu()

},
  methods:{
    add:function () {
       this.$axios.post(this.global.repathurl+'api/menu/index ',qs.stringify({
         name:'文学',
         pid:'0'
       }),{
         headers:
           {

             'Content-Type':'application/x-www-form-urlencoded',
             "Authorization": 'Bearer'+' '+token,
           }
       }).then(function (response) {
         //console.log(response)
       }).catch(function (err) {
         console.log(err)

       })
    },list(){
      this.$axios.post(this.global.repathurl+'api/menu/list',{},{
        headers:
      {

        'Content-Type':'application/x-www-form-urlencoded',
        "Authorization": 'Bearer'+' '+token,
      }
      }).then(function (response) {



       // console.log(response);

      }).catch(function (err) {
        console.log(err);
      })
    }

    //方法左边导航
    ,menushow:function () {
      window.location.reload();
    }
    ,getMenu:function () {

      //this.reload();
      var _this=this;
      this.$axios.post(_this.global.repathurl+'api/menu/list',{},{
        headers:
          {

            'Content-Type':'application/x-www-form-urlencoded',
            "Authorization": 'Bearer'+' '+token,
          }
      }).then(function (response) {

        _this.menuData = response.data
        // const blob = new Blob([_this.menuData], {type: ''})
        // FileSaver.saveAs(blob, 'hahaha.json')

        var arr = _this.menuData;
        /*  $('#tt').tree({
            url:arr
          });*/
        $(document).ready(function() {

          // 线性数据转化为树。
          function toTree(data, parent_id,level) {
            var tree = [];
            var temp;
            for (var i = 0; i < data.length; i++) {
              if (data[i].pid == parent_id) {
                var obj = data[i];
                data[i].level = level;
                temp = toTree(data, data[i].tree_menu_id,level+1);
                if (temp.length > 0) {
                  obj.children = temp;
                }
                tree.push(obj);

              }
            }
            return tree;
          }

          // 树形数据转化为ul li格式
          function createMenu(data) {
            var menu_body = '<ul>';
            var timestamp1 = Date.parse(new Date());
            for(var i = 0; i < data.length; i++){
              // 一级菜单，默认显示。
              if(data[i].pid == 0)
              {
                menu_body += '<li id="' + data[i].tree_menu_id + '" class="menuList" ><a   class="navhit"  href="'+_this.global.pathurl+'navlist/list/l_'+data[i].tree_menu_id+'?listid='+data[i].tree_menu_id+'" target="rightdis">' + data[i].name + '</a>';
              }else{
                menu_body += '<li style="position:relative;left:data[i].level*10px" id="' + data[i].tree_menu_id + '" class="menuList" style="display:none;"><a  class="havhit" href="'+_this.global.pathurl+'navlist/list/l_'+data[i].tree_menu_id+'?listid='+data[i].tree_menu_id+'" target="rightdis">' + data[i].name + '</a>';
              }
              if(data[i].children && data[i].children.length > 0){
                menu_body += createMenu(data[i].children)
              }
              menu_body += '</li>';
            }
            menu_body += '</ul>';
            //console.log(menu_body);
            return menu_body;
          }

          // 菜单初始化。
          var tree;
          tree = toTree(arr, 0,0);
          // console.log(tree);

          var menu_body = createMenu(tree);
          $("#menu1").empty();
          $("#menu1").append(menu_body);
          //this.reload();

          // 处理菜单的隐藏和显示。
          $(".menuList").click(function(){

           // console.log($(this)[0].id);
          //  console.log($(this)[0].firstChild.href);
            var key1=$(this)[0].id;
            //console.log($('#rigpa').attr('src'));
            $('#rigpa').attr('src',$(this)[0].firstChild.href)
            //console.log($('#rigpa').attr('src'));

            $(this).find("li").click(function(event) {
              return false;
            })

            if($(this).hasClass("shows")) {
              $(this).removeClass("shows");
              $(this).find("li").find("ul").removeClass("shows");
              $(this).find("li").hide();
            } else {
              $(this).addClass("shows");
              $(this).find("li").show();
              $(this).find("li").find("ul").find("li").hide();
              $(this).show();
            }
          });
          /*$('.navhit').each(function () {
             $(this).click(function () {
                alert($(this).attr('href'));
             })
          })*/

        });





        //console.log(response+1111);

      }).catch(function (err) {
        console.log(err)
      })
    }
  }

}




//左边导航







</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  #menu .two_bar{
    display:none;

  }
#menu li{
  display: block;
  width: 150px;


}
#menu>li>a{
  background-color: #97cbff;
  background: url("../assets/images/li.png") repeat-x;
  border-top: 2px solid orange;
  border-radius: 20px;
  margin: 2px;


}
#menu li>ul li{
  border-radius: 20px;
  margin: 2px;
}
#menu a{
  display: block;
  width: 150px;
  text-decoration: none;
}
  iframe{
    width: 100%;
    height: 1000px;
    margin: 0;
    padding: 0;
  }
</style>
