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

export function dataProcessing(){
  return {
    type: 'DATA_PROCESSING'
  }
}

export function dataDoneProcessing(results){
  return {
    type: 'DATA_DONE_PROCESSING',
    results
  }
}

export function dataSuccess(results){
  return {
    type: 'DATA_SUCCESS',
    results
  }
}

export function dataFiltered(filteredResults){
  return {
    type: 'DATA_FILTERED',
    filteredResults
  }
}

export function dataError(){
  return {
    type: 'DATA_ERROR'
  }
}

export function itemCreate(){
  return {
    type: 'ITEM_CREATE'
  }
}

export function itemCancelCreate(){
  return {
    type: 'ITEM_CANCEL_CREATE'
  }
}

export function itemSave(item, id, callback){
  return {
    type: 'ITEM_SAVE',
    item,
    id,
    callback
  }
}

export function itemUpdate(item, id, oldId, callback){
  return {
    type: 'ITEM_UPDATE',
    item,
    id,
    oldId,
    callback
  }
}

export function itemDelete(id, callback){
  return {
    type: 'ITEM_DELETE',
    id,
    callback
  }
}

export function loginSuccess(){
  return {
    type: 'LOGIN_SUCCESS'
  }
}

export function loginFailure(){
  return {
    type: 'LOGIN_FAILURE'
  }
}

export function loginPending(){
  return {
    type: 'LOGIN_PENDING'
  }
}

export function loggedOut(){
  return {
    type: 'LOGGED_OUT'
  }
}

export function setErrorMessage(msg){
  return {
    type: 'SET_ERROR_MESSAGE',
    msg
  }
}