import main from './index' //懒加载
//基础信息管理
import ctsz from "../jcxxgl/ctsz/router"
import sfxmsz from "../jcxxgl/sfxmsz/router"
//import tcsz from "../jcxxgl/tcsz/router"
import fwydj from "../jcxxgl/fwydj/router"
//桌台状态管理
import kt from "../ztztgl/kt/router"
import diancan from "../ztztgl/diancan/router"
import ctyd from "../ztztgl/ctyd/router"
import qtsy from "../ztztgl/qtsy/router"
import zdcx from "../ztztgl/zdcx/router"
import hbct from "../ztztgl/hbct/router"
// ..............................................................
//库存管理
import cprk from "../kcgl/cprk/router"
import cpck from "../kcgl/cpck/router"
import kcpd from "../kcgl/kcpd/router"
//信息查询管理
import mbjzmxcx from "../xxcxgl/mbjzmxcx/router"
import flsrcx from "../xxcxgl/flsrcx/router"
import sfxmxsfx from "../xxcxgl/sfxmxsfx/router"
import sptdzdcx from "../xxcxgl/sptdzdcx/router"
import xsqsfx from "../xxcxgl/xsqsfx/router"
import jfdhcx from "../xxcxgl/jfdhcx/router"
import xfjfsccx from "../xxcxgl/xfjfsccx/router"
//系统设置
import bzsm from "../xtsz/bzsm/router"
import qxgl from "../xtsz/qxgl/router"
import xtcsh from "../xtsz/xtcsh/router"

export default {
  name: "main",
  path: "main",
  component: main,
  redirect:{
    name:'kt'
  },
  subRoutes: [
    //基础信息管理
    ctsz,
    sfxmsz,
    //tcsz,
    fwydj,
    // 桌台状态管理
    kt,
    diancan,
    ctyd,
    qtsy,
    zdcx,
    hbct,
    //.............................
    //库存管理
    cprk,
    cpck,
    kcpd,
    //信息查询管理
    mbjzmxcx,
    flsrcx,
    sfxmxsfx,
    sptdzdcx,
    xsqsfx,
    jfdhcx,
    xfjfsccx,
    //系统设置
    bzsm,
    qxgl,
    xtcsh,
  ],
};
