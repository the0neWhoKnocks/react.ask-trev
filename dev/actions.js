export function submitQuery(text){
  return {
    type: 'SUBMIT_QUERY',
    text
  }
}

export function resultsLoading(){
  return {
    type: 'RESULTS_LOADING'
  }
}

export function resultsSuccess(results){
  return {
    type: 'RESULTS_SUCCESS',
    results
  }
}

export function resultsError(){
  return {
    type: 'RESULTS_ERROR'
  }
}