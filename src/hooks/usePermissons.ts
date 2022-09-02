import { useUserStore } from '../store/user'

export function usePermisson (pageName:string, handleName:string) {
  const store = useUserStore()
  const permissions = store.permissons
  const verifyPermisson = `system:${pageName}:${handleName}`
  return !!permissions.find(item => item === verifyPermisson)
}
