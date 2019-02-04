
// const fetch = require('node-fetch');
//
// var $ = require('jquery');
// var fs = require('fs');
import fetch from 'node-fetch'
import {$,jQuery} from 'jquery';



// const dotenv = require('dotenv');
//
// dotenv.config();
//
// const NOW_TOKEN = process.env.NOW_TOKEN;
// console.log("TOKEN TEST");
// console.log(NOW_TOKEN);

export async function deleteDeployment(deployment_id){
  console.log("IN HERE");
  console.log(deployment_id);
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
