export function submitQuery(text){
  return {
    type: 'SUBMIT_QUERY',
    text
  }
}

export function resultsSuccess(results){
  return {
    type: 'RESULTS_SUCCESS',
    results
  }
}