import endpoints from './endpoints.js';

let debounceTimeout;

module.exports = {
  /**
   * A reference to an empty function to save on memory.
   */
  emptyFn: function(){},

  /**
   * Generates a simple numerical hash based on a String.
   *
   * @param {string} str - Any string.
   * @returns {string}
   */
  generateHash: function(str){
    var hash = 0, i, chr, len;
    
    if (str.length === 0) return hash;
    
    for(i=0, len=str.length; i<len; i++){
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    
    return ''+hash;
  },

  /**
   * Saves a copy of remote data to a local file.
   *
   * @param {object} data - An Object of data.
   * @param {function} [callback] - Will execute after the data was saved successfully.
   */
  saveData: function(data, callback){
    const jsonData = JSON.stringify(data);
    const req = new Request(endpoints.SAVE_LOCAL_DATA, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    });
      
    console.log('[ SAVING ]', jsonData);
      
    fetch(req)
      .then(function(resp){
        resp.json().then(function(data){
          if(resp.status !== 200 ){
            console.error(data.msg, "\n"+data.err);
          }else{
            console.log(data.msg);
            if(callback) callback();
          }
        });
      })
      .catch(function(err){
        console.error('[ ERROR ]', err);
      });
  },

  /**
   * Puts all iterable Object prop values into an Array.
   *
   * @param {object} obj - The Object that'll be converted into an Array.
   * @param {boolean} [storeId] - Whether or not to add the Object's prop name to
   * the value be added to the Array. Will only work if the value is an Object.
   * @returns {Array}
   */
  objToArray: function(obj, storeId=false){
    let arr = [];
    let props = Object.keys(obj);

    for(let prop in props){
      let o = JSON.parse(JSON.stringify( obj[props[prop]] ));
      if( typeof o === 'object' && storeId ) o._id = props[prop];
      
      arr.push( o );
    }
    
    return arr;
  },

  /**
   * Ensures a function doesn't run too often.
   *
   * @param {function} func - Function that shouldn't be called too often.
   * @param {number} delay - Time to wait between function calls in milliseconds.
   * @returns {function}
   * @example
   * debounce(function(){
   *   // your code
   * }, 500)();
   */
  debounce: function(func, delay){
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay || 100);
  }
};