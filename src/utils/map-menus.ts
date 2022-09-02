import { RouteRecordRaw } from 'vue-router'
let firstMenu :any = null
export function mapBreadcrumb (userMenu:any[], currentPath:string) {
  const breadcrumb:any = []
  refreshRouter(userMenu, currentPath, breadcrumb)
  return breadcrumb
}
export function mapMenuRoutes (userMenus :any[]):RouteRecordRaw[] {
  const allRoutes:RouteRecordRaw[] = []
  const routes :RouteRecordRaw[] = []
  const files:any = import.meta.globEager('../router/main/**/*.ts')

  Object.keys(files).forEach(item => {
    allRoutes.push(files[item].default)
  })
  const _recurseRoute = (menus:any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseRoute(menu.children)
      }
    }
  }
  _recurseRoute(userMenus)
  return routes
}

export const refreshRouter = (menus:any[], currentUrl:string, breadcrumb?:any[]) => {
  for (const menu of menus) {
    if (menu.type === 1) {
      const matchedMenu:any = refreshRouter(menu.children, currentUrl)
      if (matchedMenu) {
        breadcrumb?.push({ name: menu.name, path: menu.url })
        breadcrumb?.push({ name: matchedMenu.name, path: matchedMenu.url })
        return matchedMenu
      }
    } else if (menu.type === 2 && menu.url === currentUrl) {
      return menu
    }
  }
}
export function mapMenusToPermissons (userMenus:any[]) {
  const permissions: string[] = []
  const _recurseGetPermisson = (userMenus:any[]) => {
    for (const menu of userMenus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermisson(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermisson(userMenus)

  return permissions
}

export function getMenuLeafKeys (menuList:any) {
  const leafKeys:any = []
  const _recuirseLeaf = (menuList:any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recuirseLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recuirseLeaf(menuList)
  return leafKeys
}
export { firstMenu }
