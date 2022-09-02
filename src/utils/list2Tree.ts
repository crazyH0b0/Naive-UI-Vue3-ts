import { h } from 'vue'
import {
  LaptopOutline as laptop,
  SettingsOutline as setting,
  GiftOutline as shop,
  ChatboxOutline as chat
} from 'vicons/ionicons-v5'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
const icons :any = {
  'el-icon-monitor': laptop,
  'el-icon-setting': setting,
  'el-icon-goods': shop,
  'el-icon-chat-line-round': chat
}
function renderIcon (icon: any) {
  if (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }
}
export default function test (menus:any[]) {
  const opts:any = []

  for (const i in menus) {
    const menu :any = menus[i]
    const menu1 = {
      label: menu?.name,
      key: menu?.id,
      icon: renderIcon(icons[menus[i].icon]),
      children: [] as any
    }

    if (menu.children) {
      const menus = menu.children

      for (const i in menus) {
        menu1.children.push(

          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: menus[i].url
                  }
                },
                { default: () => menus[i].name }
              ),
            key: menus[i].name
          }

        //   {
        //   whateverLabel: menus[i]?.name,
        //   whateverKey: menus[i]?.id,
        //   icon: renderIcon(icons[menus[i]?.icon])
        // }
        )
      }
    }
    opts.push(menu1)
  }

  return opts
}
