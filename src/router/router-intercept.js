import Vue from 'vue'
let interData;
function loginInterceptor(to, from, next, store) {
  if (to.path == '/') {
    next('/main');
    return;
  }else{
    next();
  }
  // if (store.state.login.hasLogined) {
  //   modulesInterceptor(to, from, next, store);
  // } else {
  //   store.dispatch('login/getSession').then(result => {
  //     let data = JSON.parse(result);
  //     if (!data.IsSuccess) return;
  //     if (data.IsSuccess) {
  //       store.commit(SET_HASLOINGED, true);
  //       store.dispatch('login/getInterceptData').then(result => {
  //         let res = JSON.parse(result);
  //         if (res.ResultValue) {
  //           interData = res.ResultValue;
  //           modulesInterceptor(to, from, next, store);
  //         }
  //       });
  //     } else
  //       next('/login');
  //   }, error => {
  //     next('/login');
  //   });
  // }
}

/**
 *  对路由进行权限拦截接口
 * 	路由合法性判断，两种方式：
 * 1.通过服务在后台进行验证判断；					                
 * 2.通过登陆时前端获取功能权限列表，在前端筛选判断；
 */
function modulesInterceptor(to, from, next, store) {

  if (!store.state.login.hasLogined) {
    return;
  } else {
    //图像配置特殊的路由（不能存在库里）
    if (to.path == "/main/registration") {
      next();
    } else {
      if (store.state.login.interceptData && store.state.login.interceptData.length > 0) {
        let path = to.path;
        let route = store.state.login.interceptData;
        if (route.length > 1) {
          let syscode = localStorage.getItem('systemCode');
          store.state.login.interceptData.forEach(item => {
            if (item.SYSTEMID == syscode)
              route = item.FUNCLIST;
          });
        }
        else if (route.length = 1)
          route = store.state.login.interceptData[0].FUNCLIST;
        let toPath = path;
        let isCheck = findElem(route, toPath);
        if (!isCheck) {
          let i = toPath.lastIndexOf('/');
          toPath = toPath.toString().substring(0, i);
          isCheck = findElem(route, toPath);
        }
        if (isCheck) {
          next();
        } else
          next('/login');
      }
      else if (interData) {
        let path = to.path;
        let route = interData.FUNCLIST;
        let toPath = path;
        let isCheck = findElem(route, toPath);
        if (!isCheck) {
          let i = toPath.lastIndexOf('/');
          toPath = toPath.toString().substring(0, i);
          isCheck = findElem(route, toPath);
        }
        if (isCheck) {
          next();
        } else
          next('/login');
      }
      else {
        next('/login');
      }
    }
  }
}


/**
 * @author:liudan
 * @description:根据path，从功能权限列表里查找 
 * */
// function matchRouteLegal(path, privsTree) {
//   if (privsTree.hasOwnProperty("PATH") && privsTree.PATH == path) {
//     return true;
//   } else if (privsTree.hasOwnProperty("CHILDREN")) {
//     privsTree.CHILDREN.forEach(function (element) {
//       matchRouteLegal(path, element);
//     });
//   } else {
//     return false;
//   }
// }



/*按照属性值，查找对象*/
function findElem(route, toPath) {
  let check;
  for (let i = 0; i < route.length; i++) {
    if (route[i].PATH == toPath) {
      check = true;
      break;
    } else {
      check = false;
    }
  }
  return check;
}

export default (router, store) => {
  // console.log("this",this);
  // console.log("this",router,store);
  router.beforeEach((to, from, next) => {
    loginInterceptor(to, from, next, store);

    //modulesInterceptor(to, from, next, store);
  });
}
