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

export function itemSave(item){
  return {
    type: 'ITEM_SAVE',
    item
  }
}

export function itemUpdate(item, id){
  return {
    type: 'ITEM_UPDATE',
    item,
    id
  }
}

export function itemDelete(id){
  return {
    type: 'ITEM_DELETE',
    id
  }
}