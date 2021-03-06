import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Add from '@/components/menu/Add'
import Addo from '@/components/menu/Addo'
import Sel from '@/components/menu/Sel'
import Update from '@/components/menu/Update'
import MenuBar from '@/components/menu/MenuBar'
import MenuTree from '@/components/menu/MenuTree'
import Updatedo from '@/components/menu/Updatedo'
import Deldo from '@/components/menu/Deldo'
import List from '@/components/navlist/List'
import Tableadd from '@/components/navlist/Tableadd'
import Tableup from '@/components/navlist/Tableup'
import Tablesel from '@/components/navlist/Tablesel'
import Tabledel from '@/components/navlist/Tabledel'
import test from '@/components/navlist/test'
import del from '@/components/tfield/del'
import index from '@/components/tfield/index'
import list from '@/components/tfield/list'
import dtype from '@/components/tfield/dtype'
import clist from '@/components/company/list'
import cdel from '@/components/company/del'
import cupdate from '@/components/company/update'
import cindex from '@/components/company/index'
import cpindex from '@/components/company/cpindex'
import ddel from '@/components/department/ddel'
import dupdate from '@/components/department/dupdate'
import dindex from '@/components/department/dindex'
import dlist from '@/components/department/dlist'
import ulist from '@/components/user/ulist'
import udlist from '@/components/user/udlist'
import udel from '@/components/user/udel'
import uupdate from '@/components/user/uupdate'
import create from '@/components/user/create'
import repwd from '@/components/user/repwd'
import rdel from '@/components/role/rdel'
import rindex from '@/components/role/rindex'
import rlist from '@/components/role/rlist'
import rupdate from '@/components/role/rupdate'
import createur from '@/components/role/createur'
import listur from '@/components/role/listur'
import pdel from '@/components/permission/pdel'
import pindex from '@/components/permission/pindex'
import plist from '@/components/permission/plist'
import prlist from '@/components/permission/prlist'
import pupdate from '@/components/permission/pupdate'
import tlist from '@/components/tabledate/list'
import tindex from '@/components/tabledate/index'
import tupdate from '@/components/tabledate/update'
import tdel from '@/components/tabledate/del'
import imexcel from '@/components/tabledate/imexcel'
import exexcel from '@/components/tabledate/exexcel'
import ttest   from '@/components/tabledate/test'
import upfile   from '@/components/tabledate/upfile'
import packzip   from '@/components/tabledate/pack_zip'
import pzipdown   from '@/components/tabledate/pzip_down'
import pziplist   from '@/components/tabledate/pzip_list'
import filehooking   from '@/components/tabledate/file_hooking'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/menu/add',
      name: 'Add',
      component: Add
    },{
      path: '/menu/addo',
      name: 'Addo',
      component: Addo
    },{
      path: '/menu/sel',
      name: 'Sel',
      component: Sel
    },{
      path: '/menu/update',
      name: 'Update',
      component: Update
    },{
      path: '/menu/menubar',
      name: 'MenuBar',
      component: MenuBar
    },{
      path: '/menu/menutree',
      name: 'MenuTree',
      component: MenuTree
    },{
      path: '/menu/updatedo',
      name: 'Updatedo',
      component: Updatedo
    },{
      path: '/menu/deldo',
      name: 'Deldo',
      component: Deldo
    },{
      path: '/navlist/list/:id',
      name: 'List',
      component: List,
      meta: {
        keepAlive: false, // 此组件需要被缓存

      }
    },{
      path: '/navlist/list/',
      name: 'List',
      component: List,
      meta: {
        keepAlive: false, // 此组件需要被缓存

      }
    },{
      path: '/navlist/tableadd',
      name: 'Tableadd',
      component: Tableadd
    },{
      path: '/navlist/tableup',
      name: 'Tableup',
      component: Tableup
    },{
      path: '/navlist/tablesel',
      name: 'Tablesel',
      component: Tablesel
    },{
      path: '/navlist/tabledel',
      name: 'Tabledel',
      component: Tabledel
    },{
      path: '/navlist/test',
      name: 'test',
      component: test
    },{
      path: '/tfield/del',
      name: 'del',
      component: del
    },{
      path: '/tfield/dtype',
      name: 'dtype',
      component: dtype
    },{
      path: '/tfield/index',
      name: 'index',
      component: index
    },{
      path: '/tfield/list',
      name: 'list',
      component: list
    },{
      path: '/company/list',
      name: 'clist',
      component: clist
    },{
      path: '/company/del',
      name: 'cdel',
      component: cdel
    },{
      path: '/company/index',
      name: 'cindex',
      component: cindex
    },{
      path: '/company/update',
      name: 'cupdate',
      component: cupdate
    },{
      path: '/company/cpindex',
      name: 'cpindex',
      component: cpindex
    },{
      path: '/department/dindex',
      name: 'dindex',
      component: dindex
    },{
      path: '/department/dlist',
      name: 'dlist',
      component: dlist
    },{
      path: '/department/dupdate',
      name: 'dupdate',
      component: dupdate
    },{
      path: '/department/ddel',
      name: 'ddel',
      component: ddel
    },{
      path: '/user/create',
      name: 'create',
      component: create
    },{
      path: '/user/repwd',
      name: 'repwd',
      component: repwd
    },{
      path: '/user/udel',
      name: 'udel',
      component: udel
    },{
      path: '/user/udlist',
      name: 'udlist',
      component: udlist
    },{
      path: '/user/ulist',
      name: 'ulist',
      component: ulist
    },{
      path: '/user/uupdate',
      name: 'uupdate',
      component: uupdate
    },{
      path: '/role/rdel',
      name: 'rdel',
      component: rdel
    },{
      path: '/role/rindex',
      name: 'rindex',
      component: rindex
    },{
      path: '/role/rlist',
      name: 'rlist',
      component: rlist
    },{
      path: '/role/rupdate',
      name: 'rupdate',
      component: rupdate
    }
    ,{
      path: '/role/createur',
      name: 'createur',
      component: createur
    }
    ,{
      path: '/role/listur',
      name: 'listur',
      component: listur
    },{
      path: '/permission/pupdate',
      name: 'pupdate',
      component: pupdate
    },{
      path: '/permission/pdel',
      name: 'pdel',
      component: pdel
    },{
      path: '/permission/plist',
      name: 'plist',
      component: plist
    },{
      path: '/permission/prlist',
      name: 'prlist',
      component: prlist
    },{
      path: '/permission/pindex',
      name: 'pindex',
      component: pindex
    },{
      path: '/tabledate/list',
      name: 'tlist',
      component: tlist
    },{
      path: '/tabledate/index',
      name: 'tindex',
      component: tindex
    },{
      path: '/tabledate/del',
      name: 'tdel',
      component: tdel
    },{
      path: '/tabledate/update',
      name: 'tupdate',
      component: tupdate
    },{
      path: '/tabledate/imexcel',
      name: 'imexcel',
      component: imexcel
    },{
      path: '/tabledate/test',
      name: 'ttest',
      component: ttest
    },{
      path: '/tabledate/exexcel',
      name: 'exexcel',
      component: exexcel
    },{
      path: '/tabledate/upfile',
      name: 'upfile',
      component: upfile
    },{
      path: '/tabledate/packzip',
      name: 'packzip',
      component: packzip
    },{
      path: '/tabledate/pzip_down',
      name: 'pzipdown',
      component: pzipdown
    },{
      path: '/tabledate/pzip_list',
      name: 'pziplist',
      component: pziplist
    },
    {
      path: '/tabledate/file_hooking',
      name: 'filehooking',
      component: filehooking
    }
  ]
})
