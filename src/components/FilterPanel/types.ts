type FormTypes = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem{
  field:''
  type:FormTypes
  label:string
  rules?:any[]
  placeholder?:string
  options:[],
  otherOptions:[]

}
