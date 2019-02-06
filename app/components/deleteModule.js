import fetch from 'node-fetch'
var $ = require('jquery');
var Airtable = require('airtable')
const AIRTABLE_KEY = process.env.AIRTABLE_KEY

console.log(AIRTABLE_KEY);

// var base = new Airtable({apiKey: 'key88K3RNIPwV1AgS'}).base('appLSROdM7sAWo7Xc');
var base = new Airtable({apiKey: `${AIRTABLE_KEY}`}).base('appLSROdM7sAWo7Xc');

export async function deleteDeployment(deployment_id){

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.zeit.co/v2/now/deployments/${deployment_id}?teamId=team_Ayjtm3wiLicR7VxJOhbAcUMA`,
    "method": "DELETE",
    "headers": {
      "Authorization": `Bearer lc874d1V2GLvXdppHIpcOnj1`,
      "Content-Type": "application/json"
        }
  }
  var deleteReponse = $.ajax(settings).done(function (response) {
    console.log(response);
    return response
  });
  return deleteReponse
}


export function updateInTable(dep_id){
  //Will need to update after 100 records
   base('Table 1').select({
       view: "Grid view"
    }).firstPage( (err, records) => {
      if(err){console.log(err)}

      var record = records.find( x => x.fields.deployment_id == dep_id )
      base('Table 1').update(record.id, {
        "live": false
      }, function(err, record){
        if (err) { console.error(err); return; }
        console.log(record.get('store_url'));
      })
    } )
}

export default { deleteDeployment, updateInTable }
