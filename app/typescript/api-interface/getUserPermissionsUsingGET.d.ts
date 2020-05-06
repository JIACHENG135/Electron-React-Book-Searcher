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
