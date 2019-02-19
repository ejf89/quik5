import fetch from 'node-fetch'
var $ = require('jquery');
var Airtable = require('airtable')

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY
const AIRTABLE_KEY = process.env.AIRTABLE_KEY
const NOW_TOKEN = process.env.NOW_TOKEN

console.log(AIRTABLE_KEY);
console.log(NOW_TOKEN);
console.log('KEYCHECK');
var base = new Airtable({apiKey: `key88K3RNIPwV1AgS`}).base('appLSROdM7sAWo7Xc');
// var base = new Airtable({apiKey: `${AIRTABLE_KEY}`}).base('appLSROdM7sAWo7Xc');




export async function getPage(){
  var encoded_page;
  await $.ajax({
   dataType: "html",
   url: './deployment_assets/deploy_index.html',
   success: function(res){
     // console.log("Got Page");
   }
  }).then( (res) => {
    res = '<!DOCTYPE html>' + res
    encoded_page =  Base64.encode(res)
    // console.log(encoded_page);
    return encoded_page

  } )
  return encoded_page
}

export async function getScript(){
  var encoded_script;
  await $.ajax({
   dataType: "text",
   url: './deployment_assets/deploy_script.js',
   success: function(res){
     // console.log("Got Script");
   }
  }).then( (res) => {
    encoded_script =  Base64.encode(res)
    // console.log(encoded_script);
    return encoded_script

  } )
  return encoded_script
}

export async function masterFetch(store_url, product_handle, logo_url){
  console.log(product_handle);
  console.log(window.location.ancestorOrigins);



  if (!store_url) {
    var store_url = window.location.ancestorOrigins[0].replace('.myshopify.com', '').split('//')[1]
    console.log(store_url);
  } else {
    console.log('there');
    console.log(store_url);
  }

  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.zeit.co/v2/now/deployments?teamId=team_Ayjtm3wiLicR7VxJOhbAcUMA",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer lc874d1V2GLvXdppHIpcOnj1",
    // "Authorization": "Bearer " + NOW_TOKEN,
    "Content-Type": "application/json"
  },
  "processData": false,
  "data": `{\r\n\"name\": \"quiksite\",\r\n  \"version\": 2,\r\n  \"files\": [\r\n  {\r\n    \"file\": \".\/package.json\",\r\n    \"data\": \"{\\r\\n  \\\"name\\\": \\\"app3\\\",\\r\\n  \\\"version\\\": \\\"1.0.0\\\",\\r\\n  \\\"description\\\": \\\"\\\",\\r\\n  \\\"scripts\\\": {\\r\\n    \\\"start\\\": \\\"serve\\\"\\r\\n  },\\r\\n  \\\"now\\\": {\\r\\n    \\\"version\\\": 2,\\r\\n    \\\"env\\\": {\\r\\n      \\\"STORE_LINK\\\": \\\"${store_url}\\\",\\r\\n      \\\"PRODUCT_HANDLE\\\": \\\"${product_handle}\\\",\\r\\n      \\\"LOGO_URL\\\": \\\"${logo_url}\\\"\\r\\n    },\\r\\n    \\\"builds\\\": [\\r\\n      {\\r\\n        \\\"src\\\": \\\"index.html\\\",\\r\\n        \\\"use\\\": \\\"@now\\\/static-build\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"src\\\": \\\"*.css\\\",\\r\\n        \\\"use\\\": \\\"@now\\\/static-build\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"src\\\": \\\"*.js\\\",\\r\\n        \\\"use\\\": \\\"@now\\\/static-build\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"use\\\": \\\"@now\\\/static-build\\\"\\r\\n      }\\r\\n    ],\\r\\n    \\\"routes\\\": [\\r\\n      {\\r\\n        \\\"src\\\": \\\"\\\/\\\",\\r\\n        \\\"dest\\\": \\\"\\\/\\\"\\r\\n      }\\r\\n    ],\\r\\n    \\\"public\\\": true\\r\\n  },\\r\\n  \\\"dependencies\\\": {\\r\\n    \\\"now-env\\\": \\\"^3.1.0\\\",\\r\\n    \\\"require\\\": \\\"^2.4.20\\\",\\r\\n    \\\"serve\\\": \\\"^10.1.1\\\"\\r\\n  }\\r\\n}\\r\\n\\r\\n\"\r\n    },\r\n    {\r\n      \"file\": \"index.html\",\r\n      \"data\": \"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIiBkaXI9Imx0ciIgY2xhc3M9Im5vLWpzIj4KPCEtLSA8aHRtbCBsYW5nPSJlbiIgZGlyPSJsdHIiIGNsYXNzPSIiPiAtLT4KCjxoZWFkPgogIDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy9qcXVlcnkvMy4zLjEvanF1ZXJ5Lm1pbi5qcyI+PC9zY3JpcHQ+CiAgPHNjcmlwdCBzcmM9Imh0dHBzOi8vdW5wa2cuY29tL2ZsaWNraXR5QDIvZGlzdC9mbGlja2l0eS5wa2dkLm1pbi5qcyI+PC9zY3JpcHQ+CiAgPHNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vdnVlIj48L3NjcmlwdD4KCiAgPCEtLSA8c2NyaXB0IHNyYz0iL25vZGVfbW9kdWxlcy9ub3ctZW52L2luZGV4LmpzIj48L3NjcmlwdD4gLS0+CgogIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly91bnBrZy5jb20vZmxpY2tpdHlAMi9kaXN0L2ZsaWNraXR5Lm1pbi5jc3MiPgogIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iYmlzbXV0aC5jc3MiPgoKPC9oZWFkPgoKPGJvZHk+CgogIDxkaXYgaWQ9ImFwcCI+CiAgICA8ZGl2IGNsYXNzPSJxdWlrc2l0ZS1jb250YWluZXIiPgogICAgICA8YSB2LWJpbmQ6aHJlZj0ic3RvcmVfdXJsIj4KICAgICAgICA8ZGl2IHYtaWY9ImxvZ29fdXJsLmxlbmd0aCA+IDAiIGNsYXNzPSIiPgogICAgICAgICAgPGltZyBjbGFzcz0ibG9nbyIgdi1iaW5kOnNyYz0ibG9nb191cmwiIGFsdD0iIj4KICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxkaXYgdi1lbHNlIGNsYXNzPSJzdG9yZS1uYW1lIj57eyBzdG9yZV9uYW1lIH19PC9kaXY+PC9hPgoKICAgICAgPGRpdiBjbGFzcz0icHJvZHVjdC1jb250YWluZXIiPgogICAgICAgIDxkaXYgY2xhc3M9InNsaWRlciI+CiAgICAgICAgICA8aW1nIGNsYXNzPSJwcm9kdWN0LWltYWdlIiB2LWZvcj0iaW1hZ2UgaW4gcHJvZHVjdF9pbWFnZXMiIHYtYmluZDpzcmM9ImltYWdlLnNyYyIgYWx0PSIiPjwvaW1nPgogICAgICAgIDwvZGl2PgoKICAgICAgICA8ZGl2IGNsYXNzPSJwcm9kdWN0LWhhbmRsZSI+CiAgICAgICAgICB7eyBwcm9kdWN0X2hhbmRsZSB9fQogICAgICAgIDwvZGl2PgoKICAgICAgICA8ZGl2IGNsYXNzPSJob3Jpem9udGFsLWNvbnRhaW5lciI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJwcmljZSI+CiAgICAgICAgICAgICR7eyBwcm9kdWN0X3ByaWNlIH19CiAgICAgICAgICA8L2Rpdj4KCiAgICAgICAgICA8IS0tIDxsYWJlbCBmb3I9ImJ1c2luZXNzIj5RdWFudGl0eTwvbGFiZWw+IC0tPgogICAgICAgICAgPHNlbGVjdCBpZD0icXVhbnRpdHkiIGNsYXNzPSJxdWFudGl0eSI+CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjEiPlFUID0gMTwvb3B0aW9uPgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIyIj5RVCA9IDI8L29wdGlvbj4KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMyI+UVQgPSAzPC9vcHRpb24+CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjQiPlFUID0gNDwvb3B0aW9uPgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSI1Ij5RVCA9IDU8L29wdGlvbj4KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iNiI+UVQgPSA2PC9vcHRpb24+CiAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICA8L2Rpdj4KCgoKICAgICAgICA8ZGl2IGNsYXNzPSJwcm9kdWN0LWRlc2NyaXB0aW9uIj4KICAgICAgICAgIHt7IHByb2R1Y3RfZGVzY3JpcHRpb24gfX0KICAgICAgICA8L2Rpdj4KCgogICAgICAgIDxkaXYgY2xhc3M9ImJvdHRvbS1jb250YWluZXIiPgoKICAgICAgICAgIDxkaXYgY2xhc3M9Im9wdGlvbi1wYXJlbnQtY29udGFpbmVyIiB2LWlmPSJvcHRpb25zLmxlbmd0aCA+IDAiPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJvcHRpb24iIHYtZm9yPSJvcHRpb24gaW4gb3B0aW9ucyI+CiAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz0ib3B0aW9uLXNlbGVjdCIgdi1iaW5kOmlkPSJvcHRpb24ubmFtZSIgdi1iaW5kOm5hbWU9Im9wdGlvbi5uYW1lIj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IiI+e3sgb3B0aW9uLm5hbWUgfX08L29wdGlvbj4KICAgICAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9InZhbHVlIGluIG9wdGlvbi52YWx1ZXMiIHYtYmluZC52YWx1ZT0idmFsdWUiPnt7IHZhbHVlIH19PC9vcHRpb24+CgogICAgICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwvZGl2PgoKCiAgICAgICAgICA8ZGl2IGNsYXNzPSJjaGVja291dCIgdi1vbjpjbGljaz0ic2VuZENhcnQoKSI+CiAgICAgICAgICAgIENoZWNrb3V0CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPCEtLSA8c2NyaXB0IHNyYz0iYnVuZGxlX3Rlc3QuanMiPjwvc2NyaXB0PiAtLT4KICA8c2NyaXB0IHNyYz0iaW5kZXguanMiPjwvc2NyaXB0Pgo8L2JvZHk+CjwvaHRtbD4K\",\r\n      \"encoding\": \"base64\"\r\n    },\r\n    {\r\n      \"file\": \"index.js\",\r\n      \"data\": \"KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9ImZ1bmN0aW9uIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoIkNhbm5vdCBmaW5kIG1vZHVsZSAnIitpKyInIik7dGhyb3cgYS5jb2RlPSJNT0RVTEVfTk9UX0ZPVU5EIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9ImZ1bmN0aW9uIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXsKCgoKdmFyIHBhY2thZ2U7CnZhciBzdG9yZV9saW5rOwp2YXIgcHJvZHVjdF9oYW5kbGU7CiAkLmFqYXgoewogIGRhdGFUeXBlOiAianNvbiIsCiAgdXJsOiAncGFja2FnZS5qc29uJywKICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpewogICAgcGFja2FnZSA9IHJlcwogICAgY29uc29sZS5sb2cocmVzKQoKICAgICBzdG9yZV9saW5rID0gcGFja2FnZS5ub3cuZW52LlNUT1JFX0xJTksKICAgICBwcm9kdWN0X2hhbmRsZSA9IHBhY2thZ2Uubm93LmVudi5QUk9EVUNUX0hBTkRMRQogICAgIGxvZ29fdXJsID0gcGFja2FnZS5ub3cuZW52LkxPR09fVVJMCiAgfQp9KS50aGVuKCAoKSA9PiB7CgogIGNvbnNvbGUubG9nKCJMSU5LIik7CiAgY29uc29sZS5sb2coc3RvcmVfbGluayk7CgogIGNvbnNvbGUubG9nKCJIQU5ETEUiKTsKICBjb25zb2xlLmxvZyhwcm9kdWN0X2hhbmRsZSk7CgogIGNvbnNvbGUubG9nKCJMT0dPIik7CiAgY29uc29sZS5sb2cobG9nb191cmwpOwoKICBsZXQgdm0gPSBuZXcgVnVlKHsKICAgIGVsOiAnI2FwcCcsCiAgICBkYXRhOiB7CiAgICAgIGNhcnRfdXJsOiBgaHR0cHM6Ly8ke3N0b3JlX2xpbmt9Lm15c2hvcGlmeS5jb20vY2FydGAsCiAgICAgIHN0b3JlX3VybDogYGh0dHBzOi8vJHtzdG9yZV9saW5rfS5teXNob3BpZnkuY29tYCwKICAgICAgc3RvcmVfbmFtZTonJywKICAgICAgcHJvZHVjdF9oYW5kbGU6ICcnLAogICAgICBsb2dvX3VybDogYCR7bG9nb191cmx9YCwKICAgICAgbWVzc2FnZTogJ1Z1ZSBpcyB3b3JraW5nIScsCiAgICAgIHByb2R1Y3RfZGF0YToge30sCiAgICAgIHByb2R1Y3RfaW1hZ2VzOiBbXSwKICAgICAgcHJvZHVjdF9wcmljZTogJycsCiAgICAgIHZhcmlhbnRzOiBbXSwKICAgICAgb3B0aW9uczogW10sCiAgICAgIHByb2R1Y3RfZGVzY3JpcHRpb246ICcnCgogICAgfSwKICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uICgpIHsKICAgICAgY29uc29sZS5sb2coIkNSRUFURUQiKTsKICAgICAgdGhpcy5nZXREYXRhKCkKICAgIH0sCiAgICBtZXRob2RzOiB7CiAgICAgIHVwZGF0ZURhdGE6IGZ1bmN0aW9uICgpIHsKICAgICAgICB0aGlzLm1lc3NhZ2UgPSAndXBkYXRlZCcKICAgICAgfSwKICAgICAgZ2V0RGF0YTogZnVuY3Rpb24gKCkgewogICAgICAgIGNvbnNvbGUubG9nKCdVUkwnKTsKICAgICAgICBjb25zb2xlLmxvZyhgaHR0cHM6Ly8ke3N0b3JlX2xpbmt9Lm15c2hvcGlmeS5jb20vcHJvZHVjdHMvJHtwcm9kdWN0X2hhbmRsZX0uanNvbmApOwogICAgICAgICQuYWpheCggewogICAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3N0b3JlX2xpbmt9Lm15c2hvcGlmeS5jb20vcHJvZHVjdHMvJHtwcm9kdWN0X2hhbmRsZX0uanNvbmAsCiAgICAgICAgICB0eXBlOiAnR0VUJywKICAgICAgICAgIGRhdGFUeXBlOiAianNvbnAiLAogICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHsKICAgICAgICAgICAgY29uc29sZS5sb2coIkdPVCBTVE9SRSBEQVRBIik7CiAgICAgICAgICAgIHRoaXMucHJvZHVjdF9kYXRhID0gT2JqZWN0LmFzc2lnbih0aGlzLnByb2R1Y3RfZGF0YSwgZGF0YS5wcm9kdWN0KQogICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2R1Y3RfZGF0YSk7CiAgICAgICAgICB9CiAgICAgICAgfSkKICAgICAgICAudGhlbiggKCkgPT4gewogICAgICAgICAgdGhpcy4kbmV4dFRpY2soZnVuY3Rpb24oKXsKICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gInVwZGF0ZWQiCgogICAgICAgICAgICBjb25zdCBzaXplZEltYWdlcyA9IHRoaXMucHJvZHVjdF9kYXRhLmltYWdlcy5tYXAoKGltYWdlLCBpKSA9PnsKICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2Uuc3JjLnJlcGxhY2UoJy5qcGcnLCAnX3gxMDAwLnByb2dyZXNzaXZlLmpwZycpCiAgICAgICAgICAgICAgIHJldHVybiBpbWFnZQogICAgICAgICAgICB9KQoKICAgICAgICAgICAgdGhpcy5wcm9kdWN0X2ltYWdlcyA9IHNpemVkSW1hZ2VzCiAgICAgICAgICAgIHRoaXMuc3RvcmVfbmFtZSA9IHN0b3JlX2xpbmsKICAgICAgICAgICAgdGhpcy5wcm9kdWN0X2hhbmRsZSA9IHRoaXMucHJvZHVjdF9kYXRhLnRpdGxlCiAgICAgICAgICAgIHRoaXMudmFyaWFudHMgPSB0aGlzLnByb2R1Y3RfZGF0YS52YXJpYW50cwogICAgICAgICAgICB0aGlzLnByb2R1Y3RfcHJpY2UgPSB0aGlzLnZhcmlhbnRzWzBdLnByaWNlCiAgICAgICAgICAgIHRoaXMucHJvZHVjdF9kZXNjcmlwdGlvbiA9IHRoaXMucHJvZHVjdF9kYXRhLmJvZHlfaHRtbC5yZXBsYWNlKC8oPChbXj5dKyk+KS9pZywiIik7CgogICAgICAgICAgICBpZiAodGhpcy5wcm9kdWN0X2RhdGEub3B0aW9ucy5sZW5ndGggPiAwKSB7CiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5wcm9kdWN0X2RhdGEub3B0aW9ucwogICAgICAgICAgICB9CgogICAgICAgICAgfSkKICAgICAgICB9KQoKICAgICAgICAudGhlbiggKCkgPT4gewogICAgICAgICAgdGhpcy4kbmV4dFRpY2soZnVuY3Rpb24oKXsKICAgICAgICAgICAgdmFyIGNoZWNrRXhpc3QgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgaWYgKCQoJy5wcm9kdWN0LWltYWdlJykubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCJFeGlzdHMhIik7CiAgICAgICAgICAgICAgICAgICQoJy5zbGlkZXInKS5mbGlja2l0eSh7CiAgICAgICAgICAgICAgICAgICAgY29udGFpbjogdHJ1ZSwKICAgICAgICAgICAgICAgICAgICBjZWxsQWxpZ246ICJsZWZ0IiwKICAgICAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSwKICAgICAgICAgICAgICAgICAgICBpbWFnZXNMb2FkZWQ6IHRydWUsCiAgICAgICAgICAgICAgICAgICAgb246IHsKICAgICAgICAgICAgICAgICAgICAgIHJlYWR5OiBmdW5jdGlvbigpewogICAgICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykudG9nZ2xlQ2xhc3MoJ25vLWpzIGpzJykKICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIH0pCgogICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrRXhpc3QpOwogICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0sIDEwMCk7CiAgICAgICAgICB9KQogICAgICAgIH0gKQogICAgICB9LAogICAgICBzZW5kQ2FydDogZnVuY3Rpb24gKCkgewogICAgICAgIGNvbnNvbGUubG9nKCJTRU5ESU5HISFAISEiKTsKICAgICAgICBsZXQgcXVhbnRpdHkgPSAkKCcucXVhbnRpdHknKS52YWwoKTsKICAgICAgICBsZXQgb3B0aW9ucyA9IFtdOwogICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJCgnLm9wdGlvbi1zZWxlY3QnKS5sZW5ndGg7IGkrKykgewogICAgICAgICAgbGV0IHZhbCA9ICQoJy5vcHRpb24tc2VsZWN0JylbaV0udmFsdWUKICAgICAgICAgIGlmICh2YWwgIT0gIiIpIHsKICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHZhbCkKICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2Ugc2VsZWN0IHNpemUgYW5kIGNvbG9yJykKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICB9CiAgICAgIH0KCiAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PSAyKSB7CiAgICAgICAgdmFyIHByb2QgPSB0aGlzLnZhcmlhbnRzLmZpbmQoIHggPT4geC5vcHRpb24xID09IG9wdGlvbnNbMF0gJiYgeC5vcHRpb24yID09IG9wdGlvbnNbMV0gKQogICAgICB9IGVsc2UgewogICAgICAgIHZhciBwcm9kID0gdGhpcy52YXJpYW50cy5maW5kKCB4ID0+IHgub3B0aW9uMSA9PSBvcHRpb25zWzBdICkKICAgICAgfQoKICAgICAgdGhpcy5jYXJ0X3VybCA9IHRoaXMuY2FydF91cmwuY29uY2F0KGAvJHtwcm9kLmlkfToke3F1YW50aXR5fWApCgogICAgICBjb25zb2xlLmxvZyh0aGlzLmNhcnRfdXJsKTsKCiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmNhcnRfdXJsCiAgICB9CgogICAgfSwKICAgIGNvbXBvbmVudHM6IHsKICAgICAgJ3Byb2R1Y3QnOiB7CiAgICAgICAgcHJvcHM6IFsnaGFuZGxlJ10sCiAgICAgICAgdGVtcGxhdGU6IGA8aDE+IHt7IGhhbmRsZSB9fSAgPC9oMT5gCiAgICAgIH0KICAgIH0KICB9KQoKICBjb25zb2xlLmxvZyh2bSk7Cgp9ICk7Cgp9LHt9XX0se30sWzFdKTsK\",\r\n      \"encoding\": \"base64\"\r\n    },\r\n    {\r\n      \"file\": \"bismuth.css\",\r\n      \"data\": \"LyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8KICAgdjIuMCB8IDIwMTEwMTI2CiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pCiovCmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSwKaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLAphLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsCmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCwKc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhciwKYiwgdSwgaSwgY2VudGVyLApkbCwgZHQsIGRkLCBvbCwgdWwsIGxpLApmaWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCwKdGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsCmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLApmaWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsCm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LAp0aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8gewogIG1hcmdpbjogMDsKICBwYWRkaW5nOiAwOwogIGJvcmRlcjogMDsKICBmb250LXNpemU6IDEwMCU7CiAgZm9udDogaW5oZXJpdDsKICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOwp9CgovKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovCmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsCmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7CiAgZGlzcGxheTogYmxvY2s7Cn0KCmJvZHkgewogIGxpbmUtaGVpZ2h0OiAxOwp9CgpvbCwgdWwgewogIGxpc3Qtc3R5bGU6IG5vbmU7Cn0KCmJsb2NrcXVvdGUsIHEgewogIHF1b3Rlczogbm9uZTsKfQoKYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsCnE6YmVmb3JlLCBxOmFmdGVyIHsKICBjb250ZW50OiAnJzsKICBjb250ZW50OiBub25lOwp9Cgp0YWJsZSB7CiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsKICBib3JkZXItc3BhY2luZzogMDsKfQoKLyo9PT09PT09PT09PT09PT09IFJlc2V0ID09PT09PT09PT09PT09PT0qLwovKiEgbm9ybWFsaXplLmNzcyB2Ny4wLjAgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovCi8qIERvY3VtZW50Cj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCmJ1dHRvbiwgaHIsIGlucHV0IHsKICBvdmVyZmxvdzogdmlzaWJsZQp9CgppbWcsIGxlZ2VuZCB7CiAgbWF4LXdpZHRoOiAxMDAlCn0KCmF1ZGlvLCBjYW52YXMsIHByb2dyZXNzLCB2aWRlbyB7CiAgZGlzcGxheTogaW5saW5lLWJsb2NrCn0KCnByb2dyZXNzLCBzdWIsIHN1cCB7CiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lCn0KClt0eXBlPWNoZWNrYm94XSwgW3R5cGU9cmFkaW9dLCBsZWdlbmQgewogIHBhZGRpbmc6IDA7CiAgYm94LXNpemluZzogYm9yZGVyLWJveAp9CgoqLCA6OmFmdGVyLCA6OmJlZm9yZSwgbGVnZW5kIHsKICBib3gtc2l6aW5nOiBib3JkZXItYm94Cn0KCmE6Zm9jdXMsIGxlZ2VuZCB7CiAgY29sb3I6IGluaGVyaXQKfQoKYm9keSwgZm9ybSB7CiAgbWFyZ2luOiAwCn0KCmh0bWwgewogIGxpbmUtaGVpZ2h0OiAxLjE1OwogIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOwogIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJQp9CgphcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgbWFpbiwgbWVudSwgbmF2LCBzZWN0aW9uIHsKICBkaXNwbGF5OiBibG9jawp9CgpoMSB7CiAgZm9udC1zaXplOiAyZW07CiAgbWFyZ2luOiAuNjdlbSAwCn0KCmZpZ3VyZSB7CiAgbWFyZ2luOiAxZW0gNDBweAp9CgpociB7CiAgYm94LXNpemluZzogY29udGVudC1ib3g7CiAgaGVpZ2h0OiAwCn0KCmNvZGUsIGtiZCwgcHJlLCBzYW1wIHsKICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7CiAgZm9udC1zaXplOiAxZW0KfQoKYSB7CiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7CiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tc2tpcDogb2JqZWN0cwp9CgphYmJyW3RpdGxlXSB7CiAgYm9yZGVyLWJvdHRvbTogbm9uZTsKICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQKfQoKYiwgc3Ryb25nIHsKICBmb250LXdlaWdodDogYm9sZGVyCn0KCmRmbiB7CiAgZm9udC1zdHlsZTogaXRhbGljCn0KCm1hcmsgewogIGJhY2tncm91bmQtY29sb3I6ICNmZjA7CiAgY29sb3I6ICMwMDAKfQoKc21hbGwgewogIGZvbnQtc2l6ZTogODAlCn0KCnN1Yiwgc3VwIHsKICBmb250LXNpemU6IDc1JTsKICBsaW5lLWhlaWdodDogMDsKICBwb3NpdGlvbjogcmVsYXRpdmUKfQoKc3ViIHsKICBib3R0b206IC0uMjVlbQp9CgpzdXAgewogIHRvcDogLS41ZW0KfQoKYXVkaW86bm90KFtjb250cm9sc10pIHsKICBkaXNwbGF5OiBub25lOwogIGhlaWdodDogMAp9CgppbWcgewogIGJvcmRlci1zdHlsZTogbm9uZQp9Cgpzdmc6bm90KDpyb290KSB7CiAgb3ZlcmZsb3c6IGhpZGRlbgp9CgpidXR0b24sIGlucHV0LCBvcHRncm91cCwgc2VsZWN0LCB0ZXh0YXJlYSB7CiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7CiAgZm9udC1zaXplOiAxMDAlOwogIGxpbmUtaGVpZ2h0OiAxLjE1OwogIG1hcmdpbjogMAp9CgpidXR0b24sIHNlbGVjdCB7CiAgdGV4dC10cmFuc2Zvcm06IG5vbmUKfQoKW3R5cGU9cmVzZXRdLCBbdHlwZT1zdWJtaXRdLCBidXR0b24sIGh0bWwgW3R5cGU9YnV0dG9uXSB7CiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b24KfQoKW3R5cGU9YnV0dG9uXTo6LW1vei1mb2N1cy1pbm5lciwgW3R5cGU9cmVzZXRdOjotbW96LWZvY3VzLWlubmVyLCBbdHlwZT1zdWJtaXRdOjotbW96LWZvY3VzLWlubmVyLCBidXR0b246Oi1tb3otZm9jdXMtaW5uZXIgewogIGJvcmRlci1zdHlsZTogbm9uZTsKICBwYWRkaW5nOiAwCn0KClt0eXBlPWJ1dHRvbl06LW1vei1mb2N1c3JpbmcsIFt0eXBlPXJlc2V0XTotbW96LWZvY3VzcmluZywgW3R5cGU9c3VibWl0XTotbW96LWZvY3VzcmluZywgYnV0dG9uOi1tb3otZm9jdXNyaW5nIHsKICBvdXRsaW5lOiBCdXR0b25UZXh0IGRvdHRlZCAxcHgKfQoKZmllbGRzZXQgewogIHBhZGRpbmc6IC4zNWVtIC43NWVtIC42MjVlbQp9CgpsZWdlbmQgewogIGRpc3BsYXk6IHRhYmxlOwogIHdoaXRlLXNwYWNlOiBub3JtYWwKfQoKdGV4dGFyZWEgewogIG92ZXJmbG93OiBhdXRvCn0KClt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24gewogIGhlaWdodDogYXV0bwp9CgpbdHlwZT1zZWFyY2hdIHsKICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsKICBvdXRsaW5lLW9mZnNldDogLTJweAp9CgpbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLCBbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHsKICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmUKfQoKOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7CiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247CiAgZm9udDogaW5oZXJpdAp9CgpzdW1tYXJ5IHsKICBkaXNwbGF5OiBsaXN0LWl0ZW0KfQoKW2hpZGRlbl0sIHRlbXBsYXRlIHsKICBkaXNwbGF5OiBub25lCn0KCmJvZHksIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEgewogIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkOwogIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJQp9CgovKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KRmFzdCBUYXAgLyBlbmFibGVzIG5vLWRlbGF5IHRhcHMgKEZhc3RDbGljay1lc3F1ZSkgb24gc3VwcG9ydGluZyBicm93c2Vycwo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qLwphLCBidXR0b24sIFtyb2xlPSJidXR0b24iXSwgaW5wdXQsIGxhYmVsLCBzZWxlY3QsIHRleHRhcmVhIHsKICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjsKfQoKLyo9PT09PT09PT09PT09PT09IEJpc211dGggUmVzZXRzIENsYXNzZXMgPT09PT09PT09PT09PT09PSovCiosICo6YmVmb3JlLCAqOmFmdGVyIHsKICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OwogIGJveC1zaXppbmc6IGJvcmRlci1ib3gKfQoKaHRtbCwgYm9keSB7CiAgd2lkdGg6IDEwMCU7CiAgbWFyZ2luOiAwOwp9CgpodG1sIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgaGVpZ2h0OiAxMDAlOwp9CgppbWcsIGZpZ3VyZSwgaWZyYW1lIHsKICBkaXNwbGF5OiBibG9jazsKICBtYXgtd2lkdGg6IDEwMCU7CiAgLy8gaGVpZ2h0OmF1dG87CiAgYm9yZGVyOiBub25lOwogIG91dGxpbmU6IG5vbmUKfQoKdWwgewogIHBhZGRpbmc6IDBweDsKICBsaXN0LXN0eWxlOiBub25lOwp9CgphIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgd29yZC13cmFwOiBicmVhay13b3JkOwogIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICBib3JkZXI6IG5vbmU7CiAgb3V0bGluZTogbm9uZTsKICBjdXJzb3I6IHBvaW50ZXI7CiAgdHJhbnNpdGlvbjogLjNzOwp9Cgpib2R5IHsKICBmb250LWZhbWlseTogYXJpYWw7Cn0KCiNhcHAgewogIG1heC13aWR0aDogMTAwdnc7CiAgZm9udC1zaXplOiAzMHB4OwogIGxlZnQ6IDA7CiAgcG9zaXRpb246IGFic29sdXRlOwogIHJpZ2h0OiAwOwogIG1hcmdpbjogYXV0bzsKfQoKLnF1aWtzaXRlLWNvbnRhaW5lciB7CiAgbWFyZ2luOiBhdXRvOwp9Cgouc3RvcmUtbmFtZSB7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGZvbnQtc2l6ZTogNTBweDsKICBjb2xvcjogYmxhY2s7Cgl0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsKfQoKLnByb2R1Y3QtY29udGFpbmVyIHsKICBib3JkZXI6IDFweCBzb2xpZCBibGFjazsKICBtYXJnaW46IDBweCBhdXRvIDIwcHggYXV0bzsKICBtYXgtd2lkdGg6IDEwMDBweDsKfQoKLnNsaWRlciB7CiAgbWF4LXdpZHRoOiAxMDAlOwogIC8qIG1heC1oZWlnaHQ6IDQwdmg7ICovCn0KCi5sb2dvewogIG1hcmdpbjogMTBweCBhdXRvOwogIG1heC1oZWlnaHQ6IDEwMHB4Owp9CgoucHJvZHVjdC1oYW5kbGUgewogIHBhZGRpbmc6IDMwcHg7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCBibGFjazsKICBib3JkZXItdG9wOiBzb2xpZCAxcHggYmxhY2s7CiAgbWFyZ2luLXRvcDogOHB4Owp9CgouaG9yaXpvbnRhbC1jb250YWluZXIgewogIHdpZHRoOiAxMDAlOwogIGRpc3BsYXk6IGZsZXg7CiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7CiAgcGFkZGluZzogMXJlbSAwOwp9CgoucHJpY2UsIC5xdWFudGl0eSB7CiAgYm9yZGVyOiBzb2xpZCAwcHggYmxhY2s7CiAgd2lkdGg6IDEwMCU7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGZvbnQtc2l6ZTogNjBweDsKICB3aWR0aDogMjglOwp9CgoucHJvZHVjdC1kZXNjcmlwdGlvbiB7CiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4IGJsYWNrOwogIGJvcmRlci10b3A6IHNvbGlkIDFweCBibGFjazsKICBtYXgtaGVpZ2h0OiAzMHZoOwogIG92ZXJmbG93LXk6IGF1dG87CiAgcGFkZGluZzogMzhweDsKICBmb250LXNpemU6IDJ2aDsKICBsaW5lLWhlaWdodDogM3ZoOwp9CgouYm90dG9tLWNvbnRhaW5lciB7CiAgbWFyZ2luOiBhdXRvOwogIHdpZHRoOiA5NyU7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGJvdHRvbTogNzFweDsKICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICBsZWZ0OiAwOwogIHJpZ2h0OiAwOwp9Cgoub3B0aW9uLXBhcmVudC1jb250YWluZXIgewogIHBhZGRpbmc6IDMzcHggMHB4OwogIGRpc3BsYXk6IGdyaWQ7CiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOwp9Cgoub3B0aW9uLXBhcmVudC1jb250YWluZXIgc2VsZWN0IHsKICB3aWR0aDogOTAlOwogIHRleHQtYWxpZ246IGNlbnRlcjsKICBiYWNrZ3JvdW5kOiBibGFjazsKICBjb2xvcjogd2hpdGU7CiAgcGFkZGluZzogMzVweDsKfQoKLmNoZWNrb3V0IHsKICBjb2xvcjogd2hpdGU7CiAgYmFja2dyb3VuZDogYmxhY2s7CiAgd2lkdGg6IDk2JTsKICBtYXJnaW46IDIxcHggYXV0bzsKICBwYWRkaW5nOiAyOXB4Owp9CgovKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KZmxpY2tpdHkgT3ZlcndyaXR0ZSBzdHlsZXMKPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki8KLmZsaWNraXR5LXBhZ2UtZG90cyB7Cglwb3NpdGlvbjogcmVsYXRpdmU7Cglib3R0b206IDJweDsKCWJvcmRlci10b3A6IHNvbGlkIDFweCBibGFjazsKfQouZmxpY2tpdHktdmlld3BvcnQgewogIHRyYW5zaXRpb246IGhlaWdodCAwLjJzOwp9CgoKCi8qIEZPVUMgKi8KaHRtbHsKICBvcGFjaXR5OiAxOwp9Ci5uby1qc3sKICAvKiB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbjsgKi8KCiAgLyogdmlzaWJpbGl0eTogaGlkZGVuOyAqLwogIG9wYWNpdHk6IDA7Cn0KCi5qc3sKICAvKiB2aXNpYmlsaXR5OiB2aXNpYmxlOyAqLwogIHRyYW5zaXRpb246IG9wYWNpdHkgLjI1cyBlYXNlLWluOwoKICBvcGFjaXR5OiAxOwp9Cg==\",\r\n      \"encoding\": \"base64\"\r\n    }\r\n\r\n  ]\r\n}`
}



var postResponse = $.ajax(settings).then(function (response) {
  console.log(response);

    return response
})

return postResponse

}

export function postToTable(store_url, quik_url, dep_id, product_handle){
    var record = base('Table 1').create({
    "store_url": store_url,
    "quiksite_url": quik_url,
    "deployment_id": dep_id,
    "product_handle": product_handle,
    "live": true
  }, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record.getId());
  });
}


var Base64 = {




  // private property


  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode: function(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;


      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +

        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;

  },

  // public method for decoding

  decode: function(input) {

    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");




    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }

      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8_decode(output);

    return output;
  },


  // private method for UTF-8 encoding

  _utf8_encode: function(string) {

    string = string.replace(/\r\n/g, "\n");
    var utftext = "";


    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode: function(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }


    return string;
  }

}

export default { masterFetch, postToTable, getPage, getScript }
