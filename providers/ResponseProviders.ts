export function ResponseProviders(params = {}) {
  let returnJson = {
    status: "true",
    message: "",
    data: null,
    error: null
  }

  for(var keyParams in params){
    for(var keyJson in returnJson){
        if(keyParams == keyJson && params[keyParams]){
            returnJson[keyJson] = params[keyParams]
        }
    }
  }

  return returnJson
}
