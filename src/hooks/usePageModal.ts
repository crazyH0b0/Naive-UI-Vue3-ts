import { ref } from 'vue'

export function usePageModal (newCallFn?:()=>void, editCallback?:(item?:any)=>void) {
  const modalRef:any = ref(null)
  const defaultInfo = ref({})
  const handleNewBtnClick = () => {
    modalRef.value.showModal = true
    newCallFn && newCallFn()
  }
  const handleEditBtnClick = (user:any) => {
    modalRef.value.showModal = true
    defaultInfo.value = { ...user }
    editCallback && editCallback(user)
  }
  return [defaultInfo, modalRef, handleNewBtnClick, handleEditBtnClick]
}
