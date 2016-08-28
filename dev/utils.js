import endpoints from './endpoints.js';

module.exports = {
  emptyFn: function(){},
  
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
  
  saveData: function(data){
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
          }
        });
      })
      .catch(function(err){
        console.error('[ ERROR ]', err);
      });
  }
};