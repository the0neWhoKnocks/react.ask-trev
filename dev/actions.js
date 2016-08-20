export function submitQuery(text){
  return {
    type: 'SUBMIT_QUERY',
    text
  }
}

export function dataLoading(){
  return {
    type: 'DATA_LOADING'
  }
}

export function dataSuccess(results){
  return {
    type: 'DATA_SUCCESS',
    results
  }
}

export function dataError(){
  return {
    type: 'DATA_ERROR'
  }
}