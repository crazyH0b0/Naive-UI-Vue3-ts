import {

  FormItemRule

} from 'naive-ui'
export const Loginrules = {
  username: [
    {
      required: true,
      validator (rule: any, value: string) {
        if (!value) {
          return new Error('用户名不能为空')
        }

        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      validator (rule: any, value: string) {
        if (!value) {
          return new Error('密码不能为空')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ]
}

export const Registerrules = {
  pwd: '',
  username: [
    {
      required: true,
      validator (rule: any, value: string) {
        if (!value) {
          return new Error('用户名不能为空')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      validator (rule: any, value: string) {
        if (!value) {
          return new Error('密码不能为空')
        }
        Registerrules.pwd = value
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  reenteredPassword: [
    // {
    //   required: true,
    //   message: '请再次输入密码',
    //   trigger: ['input', 'blur']
    // },
    // {
    //   validator: validatePasswordStartWith,
    //   message: '两次密码输入不一致',
    //   trigger: 'input'
    // },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}

// function validatePasswordStartWith (
//   rule: FormItemRule,
//   value: string
// ): boolean {
//   return (
//     !!value &&
//     value.startsWith(value) &&
//     value.length >= Registerrules.pwd.length
//   )
// }
function validatePasswordSame (rule: FormItemRule, value: string): boolean {
  return Registerrules.pwd === value
}
