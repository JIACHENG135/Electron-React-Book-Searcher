declare namespace queryTestInfoUsingGET {
  interface Params {
    page?: number
  }

  interface Response {
    code: number
    status: boolean
    data: {
      info: string
    }
    results: Array<any>
  }
}

declare namespace UserRegisterInfo {
  interface Params {
    username?: string
    email?: string
    password1?: string
    password2?: string
    first_name?: string
    last_name?: string
  }

  interface Response {
    code: number
    status: boolean
    data: {
      info: string
    }
    results: Array<any>
  }
}
