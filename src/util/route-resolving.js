const resolve = (route, pPath = "") => {
  // debugger
  let conf = {};
  if (!route) return conf;
  if (route.name) conf['name'] = route.name;
  if (route.meta) conf['meta'] = route.meta;
  if (route.modid) conf['modid'] = route.modid;
  let path = pPath;
  if (route.path) {
    path = conf['path'] = `${pPath}/${route.path}`
  };
  if (route.component) conf['component'] = route.component;
  if (route.redirect) conf['redirect'] = route.redirect;
  if (route.subRoutes && route.subRoutes.length != 0) {
    conf['children'] = route.subRoutes.map(subRoute => resolve(subRoute, path));
  }
  return conf;
}


export default resolve;
