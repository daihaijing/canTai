import main from './index' //懒加载
//基础信息管理
import ctsz from "../jcxxgl/ctsz/router"
import sfxmsz from "../jcxxgl/sfxmsz/router"
import tcsz from "../jcxxgl/tcsz/router"
import fwydj from "../jcxxgl/fwydj/router"
//桌台状态管理
import kt from "../ztztgl/kt/router"
import diancan from "../ztztgl/diancan/router"
import ctyd from "../ztztgl/ctyd/router"
import qtsy from "../ztztgl/qtsy/router"
import zdcx from "../ztztgl/zdcx/router"
import hbct from "../ztztgl/hbct/router"
import jfdh from "../ztztgl/jfdh/router"
//会员信息管理
import blxk from "../hyxxgl/blxk/router"
import hycz from "../hyxxgl/hycz/router"
import tkgl from "../hyxxgl/tkgl/router"
import fkcx from "../hyxxgl/fkcx/router"
import czcx from "../hyxxgl/czcx/router"
import hyyecx from "../hyxxgl/hyyecx/router"
import tkcx from "../hyxxgl/tkcx/router"
import hysrcx from "../hyxxgl/hysrcx/router"
import hyxfcx from "../hyxxgl/hyxfcx/router"
//库存管理
import cprk from "../kcgl/cprk/router"
import cpck from "../kcgl/cpck/router"
import kcpd from "../kcgl/kcpd/router"
import kccx from "../kcgl/kccx/router"
//信息查询管理
import mbjzmxcx from "../xxcxgl/mbjzmxcx/router"
import ryycx from "../xxcxgl/ryycx/router"
import flsrcx from "../xxcxgl/flsrcx/router"
import sfxmxsfx from "../xxcxgl/sfxmxsfx/router"
import sptdzdcx from "../xxcxgl/sptdzdcx/router"
import xsqsfx from "../xxcxgl/xsqsfx/router"
import jfdhcx from "../xxcxgl/jfdhcx/router"
import xfjfsccx from "../xxcxgl/xfjfsccx/router"
//系统设置
import ygxxgl from "../xtsz/ygxxgl/router"
import czsqgl from "../xtsz/czsqgl/router"
import czyrzcx from "../xtsz/czyrzcx/router"
import bz from "../xtsz/bz/router"
import zc from "../xtsz/zc/router"
import tc from "../xtsz/tc/router"

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
    tcsz,
    fwydj,
    // 桌台状态管理
    kt,
    diancan,
    ctyd,
    qtsy,
    zdcx,
    hbct,
    jfdh,
    //会员信息管理
    blxk,
    hycz,
    tkgl,
    fkcx,
    czcx,
    hyyecx,
    tkcx,
    hysrcx,
    hyxfcx,
    //库存管理
    cprk,
    cpck,
    kcpd,
    kccx,
    //信息查询管理
    mbjzmxcx,
    ryycx,
    flsrcx,
    sfxmxsfx,
    sptdzdcx,
    xsqsfx,
    jfdhcx,
    xfjfsccx,
    //系统设置
    ygxxgl,
    czsqgl,
    czyrzcx,
    bz,
    zc,
    tc,
  ],
};
