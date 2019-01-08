<template>

<div class="menu-Bar">
  <!--<div v-bind:menuData="menuData"></div>-->
 <!--{{menuData}}-->
  <template v-for="value in this.menuData">


  </template>
  <div id='menu'></div>
  <ul id="tt"></ul>
</div>


</template>

<script>
  import FileSaver from 'file-saver'

  import $ from 'jquery'

  import MenuTree from '@/components/menu/MenuTree'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "MenuBar",
      data () {
        return {
          isCollapse: true,
          menuData: ''

        }
      },
      created: function () {
        this.getMenu()
      },
      methods:{
        getMenu:function () {
          var _this=this;
          this.$axios.post('http://192.168.0.46:8777/api/menu/list',{},{
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
                for(var i = 0; i < data.length; i++){
                  // 一级菜单，默认显示。
                  if(data[i].pid == 0)
                  {
                    menu_body += '<li id="' + data[i].tree_menu_id + '" class="menuList" ><a href="#">' + data[i].name + '</a>';
                  }else{
                    menu_body += '<li style="position:relative;left:data[i].level*10px" id="' + data[i].tree_menu_id + '" class="menuList" style="display:none;"><a href="#">' + data[i].name + '</a>';
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
              $("#menu").append(menu_body);

              // 处理菜单的隐藏和显示。
              $(".menuList").click(function(){

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

            });





            console.log(response+1111);

          }).catch(function (err) {
            console.log(err)
          })
        }
      },
      components: {
        'MenuTree': MenuTree
      }
    }
</script>

<style scoped>
  .menu-Bar:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
