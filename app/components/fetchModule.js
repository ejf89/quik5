import fetch from 'node-fetch'
var $ = require('jquery');
var Airtable = require('airtable')

const AIRTABLE_KEY = process.env.AIRTABLE_KEY

console.log(AIRTABLE_KEY);
console.log('KEYCHECK');
var base = new Airtable({apiKey: `key88K3RNIPwV1AgS`}).base('appLSROdM7sAWo7Xc');
// var base = new Airtable({apiKey: `${AIRTABLE_KEY}`}).base('appLSROdM7sAWo7Xc');




export async function getPage(){
  var encoded_page;
  await $.ajax({
   dataType: "html",
   url: './deployment_assets/deploy_index.html',
   success: function(res){
     console.log("Got Page");
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
     console.log("Got Script");
   }
  }).then( (res) => {
    encoded_script =  Base64.encode(res)
    // console.log(encoded_script);
    return encoded_script

  } )
  return encoded_script
}

export async function masterFetch(store_url, product_handle, encoded_html){
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
    "Content-Type": "application/json"
  },
  "processData": false,
  "data": `{\n  \"name\": \"quiksite\",\n  \"version\": 2,\n  \"files\": [\n  {\n    \"file\": \"./package.json\",\n    \"data\": \"{\\r\\n  \\\"name\\\": \\\"app3\\\",\\r\\n  \\\"version\\\": \\\"1.0.0\\\",\\r\\n  \\\"description\\\": \\\"\\\",\\r\\n  \\\"scripts\\\": {\\r\\n    \\\"start\\\": \\\"serve\\\"\\r\\n  },\\r\\n  \\\"now\\\": {\\r\\n    \\\"version\\\": 2,\\r\\n    \\\"env\\\": {\\r\\n      \\\"STORE_LINK\\\": \\\"${store_url}\\\",\\r\\n      \\\"PRODUCT_HANDLE\\\": \\\"${product_handle}\\\"\\r\\n    },\\r\\n    \\\"builds\\\": [\\r\\n      {\\r\\n        \\\"src\\\": \\\"index.html\\\",\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"src\\\": \\\"*.css\\\",\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"src\\\": \\\"*.js\\\",\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      }\\r\\n    ],\\r\\n    \\\"routes\\\": [\\r\\n      {\\r\\n        \\\"src\\\": \\\"\\/\\\",\\r\\n        \\\"dest\\\": \\\"\\/\\\"\\r\\n      }\\r\\n    ],\\r\\n    \\\"public\\\": true\\r\\n  },\\r\\n  \\\"dependencies\\\": {\\r\\n    \\\"now-env\\\": \\\"^3.1.0\\\",\\r\\n    \\\"require\\\": \\\"^2.4.20\\\",\\r\\n    \\\"serve\\\": \\\"^10.1.1\\\"\\r\\n  }\\r\\n}\\r\\n\"\n    },\n    {\n      \"file\": \"index.html\",\n      \"data\": \"PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIiBkaXI9Imx0ciI+Cgo8aGVhZD4KICA8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CiAgPHNjcmlwdCBzcmM9Imh0dHBzOi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5LzMuMy4xL2pxdWVyeS5taW4uanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgc3JjPSJodHRwczovL3VucGtnLmNvbS9mbGlja2l0eUAyL2Rpc3QvZmxpY2tpdHkucGtnZC5taW4uanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3Z1ZSI+PC9zY3JpcHQ+CgogIDwhLS0gPHNjcmlwdCBzcmM9Ii9ub2RlX21vZHVsZXMvbm93LWVudi9pbmRleC5qcyI+PC9zY3JpcHQ+IC0tPgoKICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vdW5wa2cuY29tL2ZsaWNraXR5QDIvZGlzdC9mbGlja2l0eS5taW4uY3NzIj4KICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9ImJpc211dGguY3NzIj4KCjwvaGVhZD4KCjxib2R5PgoKICA8ZGl2IGlkPSJhcHAiPgogICAgPGRpdiBjbGFzcz0icXVpa3NpdGUtY29udGFpbmVyIj4KICAgICAgPGEgdi1iaW5kOmhyZWY9InN0b3JlX3VybCI+IDxkaXYgY2xhc3M9InN0b3JlLW5hbWUiPnt7IHN0b3JlX25hbWUgfX08L2Rpdj48L2E+CgogICAgICA8ZGl2IGNsYXNzPSJwcm9kdWN0LWNvbnRhaW5lciI+CiAgICAgICAgPGRpdiBjbGFzcz0ic2xpZGVyIj4KICAgICAgICAgIDxpbWcgY2xhc3M9InByb2R1Y3QtaW1hZ2UiIHYtZm9yPSJpbWFnZSBpbiBwcm9kdWN0X2ltYWdlcyIgdi1iaW5kOnNyYz0iaW1hZ2Uuc3JjIiBhbHQ9IiI+PC9pbWc+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9InByb2R1Y3QtaGFuZGxlIj4KICAgICAgICAgIHt7IHByb2R1Y3RfaGFuZGxlIH19CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9Imhvcml6b250YWwtY29udGFpbmVyIj4KICAgICAgICAgIDxkaXYgY2xhc3M9InByaWNlIj4KICAgICAgICAgICAgJHt7IHByb2R1Y3RfcHJpY2UgfX0KICAgICAgICAgIDwvZGl2PgoKICAgICAgICAgIDwhLS0gPGxhYmVsIGZvcj0iYnVzaW5lc3MiPlF1YW50aXR5PC9sYWJlbD4gLS0+CiAgICAgICAgICA8c2VsZWN0IGlkPSJxdWFudGl0eSIgY2xhc3M9InF1YW50aXR5Ij4KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iMSI+UVQgPSAxPC9vcHRpb24+CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjIiPlFUID0gMjwvb3B0aW9uPgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIzIj5RVCA9IDM8L29wdGlvbj4KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iNCI+UVQgPSA0PC9vcHRpb24+CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IjUiPlFUID0gNTwvb3B0aW9uPgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSI2Ij5RVCA9IDY8L29wdGlvbj4KICAgICAgICAgIDwvc2VsZWN0PgogICAgICAgIDwvZGl2PgoKCgogICAgICAgIDxkaXYgY2xhc3M9InByb2R1Y3QtZGVzY3JpcHRpb24iPgogICAgICAgICAge3sgcHJvZHVjdF9kZXNjcmlwdGlvbiB9fQogICAgICAgIDwvZGl2PgoKCiAgICAgICAgPGRpdiBjbGFzcz0iYm90dG9tLWNvbnRhaW5lciI+CgogICAgICAgICAgPGRpdiBjbGFzcz0ib3B0aW9uLXBhcmVudC1jb250YWluZXIiIHYtaWY9Im9wdGlvbnMubGVuZ3RoID4gMCI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9Im9wdGlvbiIgdi1mb3I9Im9wdGlvbiBpbiBvcHRpb25zIj4KICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPSJvcHRpb24tc2VsZWN0IiB2LWJpbmQ6aWQ9Im9wdGlvbi5uYW1lIiB2LWJpbmQ6bmFtZT0ib3B0aW9uLm5hbWUiPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iIj57eyBvcHRpb24ubmFtZSB9fTwvb3B0aW9uPgogICAgICAgICAgICAgICAgPG9wdGlvbiB2LWZvcj0idmFsdWUgaW4gb3B0aW9uLnZhbHVlcyIgdi1iaW5kLnZhbHVlPSJ2YWx1ZSI+e3sgdmFsdWUgfX08L29wdGlvbj4KCiAgICAgICAgICAgICAgPC9zZWxlY3Q+CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPC9kaXY+CgoKICAgICAgICAgIDxkaXYgY2xhc3M9ImNoZWNrb3V0IiB2LW9uOmNsaWNrPSJzZW5kQ2FydCgpIj4KICAgICAgICAgICAgQ2hlY2tvdXQKICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgoKICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KICA8IS0tIDxzY3JpcHQgc3JjPSJidW5kbGVfdGVzdC5qcyI+PC9zY3JpcHQ+IC0tPgogIDxzY3JpcHQgc3JjPSJpbmRleC5qcyI+PC9zY3JpcHQ+CjwvYm9keT4KPC9odG1sPgo=\",\n      \"encoding\": \"base64\"\n    },\n    {\n      \"file\": \"index.js\",\n      \"data\": \"KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9ImZ1bmN0aW9uIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoIkNhbm5vdCBmaW5kIG1vZHVsZSAnIitpKyInIik7dGhyb3cgYS5jb2RlPSJNT0RVTEVfTk9UX0ZPVU5EIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9ImZ1bmN0aW9uIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXsKCgoKLy8gcmVxdWlyZShbJ25vdy1lbnYnXSwgZnVuY3Rpb24oKXsKLy8gICBjb25zb2xlLmxvZygiTE9BREVEIik7Ci8vIH0pCnZhciBwYWNrYWdlOwp2YXIgc3RvcmVfbGluazsKdmFyIHByb2R1Y3RfaGFuZGxlOwogJC5hamF4KHsKICBkYXRhVHlwZTogImpzb24iLAogIHVybDogJ3BhY2thZ2UuanNvbicsCiAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsKICAgIHBhY2thZ2UgPSByZXMKICAgIGNvbnNvbGUubG9nKHJlcykKCiAgICAgc3RvcmVfbGluayA9IHBhY2thZ2Uubm93LmVudi5TVE9SRV9MSU5LCiAgICAgcHJvZHVjdF9oYW5kbGUgPSBwYWNrYWdlLm5vdy5lbnYuUFJPRFVDVF9IQU5ETEUKICB9Cn0pLnRoZW4oICgpID0+IHsKCiAgY29uc29sZS5sb2coIkxJTksiKTsKICBjb25zb2xlLmxvZyhzdG9yZV9saW5rKTsKCiAgY29uc29sZS5sb2coIkhBTkRMRSIpOwogIGNvbnNvbGUubG9nKHByb2R1Y3RfaGFuZGxlKTsKCiAgbGV0IHZtID0gbmV3IFZ1ZSh7CiAgICBlbDogJyNhcHAnLAogICAgZGF0YTogewogICAgICBjYXJ0X3VybDogYGh0dHBzOi8vJHtzdG9yZV9saW5rfS5teXNob3BpZnkuY29tL2NhcnRgLAogICAgICBzdG9yZV91cmw6IGBodHRwczovLyR7c3RvcmVfbGlua30ubXlzaG9waWZ5LmNvbWAsCiAgICAgIHN0b3JlX25hbWU6JycsCiAgICAgIHByb2R1Y3RfaGFuZGxlOiAnJywKICAgICAgbWVzc2FnZTogJ1Z1ZSBpcyB3b3JraW5nIScsCiAgICAgIHByb2R1Y3RfZGF0YToge30sCiAgICAgIHByb2R1Y3RfaW1hZ2VzOiBbXSwKICAgICAgcHJvZHVjdF9wcmljZTogJycsCiAgICAgIHZhcmlhbnRzOiBbXSwKICAgICAgb3B0aW9uczogW10sCiAgICAgIHByb2R1Y3RfZGVzY3JpcHRpb246ICcnCgogICAgfSwKICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uICgpIHsKICAgICAgY29uc29sZS5sb2coIkNSRUFURUQiKTsKICAgICAgdGhpcy5nZXREYXRhKCkKICAgIH0sCiAgICBtZXRob2RzOiB7CiAgICAgIHVwZGF0ZURhdGE6IGZ1bmN0aW9uICgpIHsKICAgICAgICB0aGlzLm1lc3NhZ2UgPSAndXBkYXRlZCcKICAgICAgfSwKICAgICAgZ2V0RGF0YTogZnVuY3Rpb24gKCkgewogICAgICAgIGNvbnNvbGUubG9nKCdVUkwnKTsKICAgICAgICBjb25zb2xlLmxvZyhgaHR0cHM6Ly8ke3N0b3JlX2xpbmt9Lm15c2hvcGlmeS5jb20vcHJvZHVjdHMvJHtwcm9kdWN0X2hhbmRsZX0uanNvbmApOwogICAgICAgICQuYWpheCggewogICAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3N0b3JlX2xpbmt9Lm15c2hvcGlmeS5jb20vcHJvZHVjdHMvJHtwcm9kdWN0X2hhbmRsZX0uanNvbmAsCiAgICAgICAgICB0eXBlOiAnR0VUJywKICAgICAgICAgIGRhdGFUeXBlOiAianNvbnAiLAogICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHsKICAgICAgICAgICAgY29uc29sZS5sb2coIkdPVCBTVE9SRSBEQVRBIik7CiAgICAgICAgICAgIHRoaXMucHJvZHVjdF9kYXRhID0gT2JqZWN0LmFzc2lnbih0aGlzLnByb2R1Y3RfZGF0YSwgZGF0YS5wcm9kdWN0KQogICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2R1Y3RfZGF0YSk7CiAgICAgICAgICB9CiAgICAgICAgfSkKICAgICAgICAudGhlbiggKCkgPT4gewogICAgICAgICAgdGhpcy4kbmV4dFRpY2soZnVuY3Rpb24oKXsKICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gInVwZGF0ZWQiCgogICAgICAgICAgICB0aGlzLnN0b3JlX25hbWUgPSBzdG9yZV9saW5rCiAgICAgICAgICAgIHRoaXMucHJvZHVjdF9oYW5kbGUgPSB0aGlzLnByb2R1Y3RfZGF0YS50aXRsZQogICAgICAgICAgICB0aGlzLnZhcmlhbnRzID0gdGhpcy5wcm9kdWN0X2RhdGEudmFyaWFudHMKICAgICAgICAgICAgdGhpcy5wcm9kdWN0X2ltYWdlcyA9IHRoaXMucHJvZHVjdF9kYXRhLmltYWdlcwogICAgICAgICAgICB0aGlzLnByb2R1Y3RfcHJpY2UgPSB0aGlzLnZhcmlhbnRzWzBdLnByaWNlCgogICAgICAgICAgICB0aGlzLnByb2R1Y3RfZGVzY3JpcHRpb24gPSB0aGlzLnByb2R1Y3RfZGF0YS5ib2R5X2h0bWwucmVwbGFjZSgvKDwoW14+XSspPikvaWcsIiIpOwoKICAgICAgICAgICAgaWYgKHRoaXMucHJvZHVjdF9kYXRhLm9wdGlvbnMubGVuZ3RoID4gMCkgewogICAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMucHJvZHVjdF9kYXRhLm9wdGlvbnMKICAgICAgICAgICAgfQogICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMpOwogICAgICAgICAgICBjb25zb2xlLmxvZygidXBkYXRlZCIpOwoKICAgICAgICAgIH0pCiAgICAgICAgfSkKCiAgICAgICAgLnRoZW4oICgpID0+IHsKICAgICAgICAgIHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uKCl7CiAgICAgICAgICBjb25zb2xlLmxvZygiaGV5IiArICQoIi5wcm9kdWN0LWltYWdlIikubGVuZ3RoKTsKICAgICAgICAgICAgdmFyIGNoZWNrRXhpc3QgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgaWYgKCQoJy5wcm9kdWN0LWltYWdlJykubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCJFeGlzdHMhIik7CiAgICAgICAgICAgICAgICAgICQoJy5zbGlkZXInKS5mbGlja2l0eSh7CiAgICAgICAgICAgICAgICAgICAgY29udGFpbjogdHJ1ZSwKICAgICAgICAgICAgICAgICAgICBjZWxsQWxpZ246ICJsZWZ0IiwKICAgICAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSwKICAgICAgICAgICAgICAgICAgICBpbWFnZXNMb2FkZWQ6IHRydWUKICAgICAgICAgICAgICAgICAgfSkKICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjaGVja0V4aXN0KTsKICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9LCAxMDApOwogICAgICAgICAgfSkKICAgICAgICB9ICkKICAgICAgfSwKICAgICAgc2VuZENhcnQ6IGZ1bmN0aW9uICgpIHsKICAgICAgICBjb25zb2xlLmxvZygiU0VORElORyEhQCEhIik7CiAgICAgICAgbGV0IHF1YW50aXR5ID0gJCgnLnF1YW50aXR5JykudmFsKCk7CiAgICAgICAgbGV0IG9wdGlvbnMgPSBbXTsKICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoJy5vcHRpb24tc2VsZWN0JykubGVuZ3RoOyBpKyspIHsKICAgICAgICAgIGxldCB2YWwgPSAkKCcub3B0aW9uLXNlbGVjdCcpW2ldLnZhbHVlCiAgICAgICAgICBpZiAodmFsICE9ICIiKSB7CiAgICAgICAgICAgIG9wdGlvbnMucHVzaCh2YWwpCiAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBhbGVydCgnUGxlYXNlIHNlbGVjdCBzaXplIGFuZCBjb2xvcicpCiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgfQogICAgICB9CgogICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT0gMikgewogICAgICAgIHZhciBwcm9kID0gdGhpcy52YXJpYW50cy5maW5kKCB4ID0+IHgub3B0aW9uMSA9PSBvcHRpb25zWzBdICYmIHgub3B0aW9uMiA9PSBvcHRpb25zWzFdICkKICAgICAgfSBlbHNlIHsKICAgICAgICB2YXIgcHJvZCA9IHRoaXMudmFyaWFudHMuZmluZCggeCA9PiB4Lm9wdGlvbjEgPT0gb3B0aW9uc1swXSApCiAgICAgIH0KCiAgICAgIHRoaXMuY2FydF91cmwgPSB0aGlzLmNhcnRfdXJsLmNvbmNhdChgLyR7cHJvZC5pZH06JHtxdWFudGl0eX1gKQoKICAgICAgY29uc29sZS5sb2codGhpcy5jYXJ0X3VybCk7CgogICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5jYXJ0X3VybAogICAgfQoKICAgIH0sCiAgICBjb21wb25lbnRzOiB7CiAgICAgICdwcm9kdWN0JzogewogICAgICAgIHByb3BzOiBbJ2hhbmRsZSddLAogICAgICAgIHRlbXBsYXRlOiBgPGgxPiB7eyBoYW5kbGUgfX0gIDwvaDE+YAogICAgICB9CiAgICB9CiAgfSkKCiAgY29uc29sZS5sb2codm0pOwoKfSApOwoKfSx7fV19LHt9LFsxXSk7Cg==\",\n      \"encoding\": \"base64\"\n    },\n    {\n      \"file\": \"bismuth.css\",\n      \"data\": \"LyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8KICAgdjIuMCB8IDIwMTEwMTI2CiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pCiovCmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSwKaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLAphLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsCmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCwKc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhciwKYiwgdSwgaSwgY2VudGVyLApkbCwgZHQsIGRkLCBvbCwgdWwsIGxpLApmaWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCwKdGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsCmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLApmaWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsCm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LAp0aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8gewogIG1hcmdpbjogMDsKICBwYWRkaW5nOiAwOwogIGJvcmRlcjogMDsKICBmb250LXNpemU6IDEwMCU7CiAgZm9udDogaW5oZXJpdDsKICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOwp9CgovKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovCmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsCmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7CiAgZGlzcGxheTogYmxvY2s7Cn0KCmJvZHkgewogIGxpbmUtaGVpZ2h0OiAxOwp9CgpvbCwgdWwgewogIGxpc3Qtc3R5bGU6IG5vbmU7Cn0KCmJsb2NrcXVvdGUsIHEgewogIHF1b3Rlczogbm9uZTsKfQoKYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsCnE6YmVmb3JlLCBxOmFmdGVyIHsKICBjb250ZW50OiAnJzsKICBjb250ZW50OiBub25lOwp9Cgp0YWJsZSB7CiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsKICBib3JkZXItc3BhY2luZzogMDsKfQoKLyo9PT09PT09PT09PT09PT09IFJlc2V0ID09PT09PT09PT09PT09PT0qLwovKiEgbm9ybWFsaXplLmNzcyB2Ny4wLjAgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovCi8qIERvY3VtZW50Cj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCmJ1dHRvbiwgaHIsIGlucHV0IHsKICBvdmVyZmxvdzogdmlzaWJsZQp9CgppbWcsIGxlZ2VuZCB7CiAgbWF4LXdpZHRoOiAxMDAlCn0KCmF1ZGlvLCBjYW52YXMsIHByb2dyZXNzLCB2aWRlbyB7CiAgZGlzcGxheTogaW5saW5lLWJsb2NrCn0KCnByb2dyZXNzLCBzdWIsIHN1cCB7CiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lCn0KClt0eXBlPWNoZWNrYm94XSwgW3R5cGU9cmFkaW9dLCBsZWdlbmQgewogIHBhZGRpbmc6IDA7CiAgYm94LXNpemluZzogYm9yZGVyLWJveAp9CgoqLCA6OmFmdGVyLCA6OmJlZm9yZSwgbGVnZW5kIHsKICBib3gtc2l6aW5nOiBib3JkZXItYm94Cn0KCmE6Zm9jdXMsIGxlZ2VuZCB7CiAgY29sb3I6IGluaGVyaXQKfQoKYm9keSwgZm9ybSB7CiAgbWFyZ2luOiAwCn0KCmh0bWwgewogIGxpbmUtaGVpZ2h0OiAxLjE1OwogIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOwogIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJQp9CgphcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgbWFpbiwgbWVudSwgbmF2LCBzZWN0aW9uIHsKICBkaXNwbGF5OiBibG9jawp9CgpoMSB7CiAgZm9udC1zaXplOiAyZW07CiAgbWFyZ2luOiAuNjdlbSAwCn0KCmZpZ3VyZSB7CiAgbWFyZ2luOiAxZW0gNDBweAp9CgpociB7CiAgYm94LXNpemluZzogY29udGVudC1ib3g7CiAgaGVpZ2h0OiAwCn0KCmNvZGUsIGtiZCwgcHJlLCBzYW1wIHsKICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7CiAgZm9udC1zaXplOiAxZW0KfQoKYSB7CiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7CiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tc2tpcDogb2JqZWN0cwp9CgphYmJyW3RpdGxlXSB7CiAgYm9yZGVyLWJvdHRvbTogbm9uZTsKICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQKfQoKYiwgc3Ryb25nIHsKICBmb250LXdlaWdodDogYm9sZGVyCn0KCmRmbiB7CiAgZm9udC1zdHlsZTogaXRhbGljCn0KCm1hcmsgewogIGJhY2tncm91bmQtY29sb3I6ICNmZjA7CiAgY29sb3I6ICMwMDAKfQoKc21hbGwgewogIGZvbnQtc2l6ZTogODAlCn0KCnN1Yiwgc3VwIHsKICBmb250LXNpemU6IDc1JTsKICBsaW5lLWhlaWdodDogMDsKICBwb3NpdGlvbjogcmVsYXRpdmUKfQoKc3ViIHsKICBib3R0b206IC0uMjVlbQp9CgpzdXAgewogIHRvcDogLS41ZW0KfQoKYXVkaW86bm90KFtjb250cm9sc10pIHsKICBkaXNwbGF5OiBub25lOwogIGhlaWdodDogMAp9CgppbWcgewogIGJvcmRlci1zdHlsZTogbm9uZQp9Cgpzdmc6bm90KDpyb290KSB7CiAgb3ZlcmZsb3c6IGhpZGRlbgp9CgpidXR0b24sIGlucHV0LCBvcHRncm91cCwgc2VsZWN0LCB0ZXh0YXJlYSB7CiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7CiAgZm9udC1zaXplOiAxMDAlOwogIGxpbmUtaGVpZ2h0OiAxLjE1OwogIG1hcmdpbjogMAp9CgpidXR0b24sIHNlbGVjdCB7CiAgdGV4dC10cmFuc2Zvcm06IG5vbmUKfQoKW3R5cGU9cmVzZXRdLCBbdHlwZT1zdWJtaXRdLCBidXR0b24sIGh0bWwgW3R5cGU9YnV0dG9uXSB7CiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b24KfQoKW3R5cGU9YnV0dG9uXTo6LW1vei1mb2N1cy1pbm5lciwgW3R5cGU9cmVzZXRdOjotbW96LWZvY3VzLWlubmVyLCBbdHlwZT1zdWJtaXRdOjotbW96LWZvY3VzLWlubmVyLCBidXR0b246Oi1tb3otZm9jdXMtaW5uZXIgewogIGJvcmRlci1zdHlsZTogbm9uZTsKICBwYWRkaW5nOiAwCn0KClt0eXBlPWJ1dHRvbl06LW1vei1mb2N1c3JpbmcsIFt0eXBlPXJlc2V0XTotbW96LWZvY3VzcmluZywgW3R5cGU9c3VibWl0XTotbW96LWZvY3VzcmluZywgYnV0dG9uOi1tb3otZm9jdXNyaW5nIHsKICBvdXRsaW5lOiBCdXR0b25UZXh0IGRvdHRlZCAxcHgKfQoKZmllbGRzZXQgewogIHBhZGRpbmc6IC4zNWVtIC43NWVtIC42MjVlbQp9CgpsZWdlbmQgewogIGRpc3BsYXk6IHRhYmxlOwogIHdoaXRlLXNwYWNlOiBub3JtYWwKfQoKdGV4dGFyZWEgewogIG92ZXJmbG93OiBhdXRvCn0KClt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24gewogIGhlaWdodDogYXV0bwp9CgpbdHlwZT1zZWFyY2hdIHsKICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsKICBvdXRsaW5lLW9mZnNldDogLTJweAp9CgpbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLCBbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHsKICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmUKfQoKOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7CiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247CiAgZm9udDogaW5oZXJpdAp9CgpzdW1tYXJ5IHsKICBkaXNwbGF5OiBsaXN0LWl0ZW0KfQoKW2hpZGRlbl0sIHRlbXBsYXRlIHsKICBkaXNwbGF5OiBub25lCn0KCmJvZHksIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEgewogIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkOwogIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJQp9CgovKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KRmFzdCBUYXAgLyBlbmFibGVzIG5vLWRlbGF5IHRhcHMgKEZhc3RDbGljay1lc3F1ZSkgb24gc3VwcG9ydGluZyBicm93c2Vycwo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qLwphLCBidXR0b24sIFtyb2xlPSJidXR0b24iXSwgaW5wdXQsIGxhYmVsLCBzZWxlY3QsIHRleHRhcmVhIHsKICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjsKfQoKLyo9PT09PT09PT09PT09PT09IEJpc211dGggUmVzZXRzIENsYXNzZXMgPT09PT09PT09PT09PT09PSovCiosICo6YmVmb3JlLCAqOmFmdGVyIHsKICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OwogIGJveC1zaXppbmc6IGJvcmRlci1ib3gKfQoKaHRtbCwgYm9keSB7CiAgd2lkdGg6IDEwMCU7CiAgbWFyZ2luOiAwOwp9CgpodG1sIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgaGVpZ2h0OiAxMDAlOwp9CgppbWcsIGZpZ3VyZSwgaWZyYW1lIHsKICBkaXNwbGF5OiBibG9jazsKICBtYXgtd2lkdGg6IDEwMCU7CiAgLy8gaGVpZ2h0OmF1dG87CiAgYm9yZGVyOiBub25lOwogIG91dGxpbmU6IG5vbmUKfQoKdWwgewogIHBhZGRpbmc6IDBweDsKICBsaXN0LXN0eWxlOiBub25lOwp9CgphIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgd29yZC13cmFwOiBicmVhay13b3JkOwogIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICBib3JkZXI6IG5vbmU7CiAgb3V0bGluZTogbm9uZTsKICBjdXJzb3I6IHBvaW50ZXI7CiAgdHJhbnNpdGlvbjogLjNzOwp9Cgpib2R5IHsKICBmb250LWZhbWlseTogYXJpYWw7Cn0KCiNhcHAgewogIG1heC13aWR0aDogMTAwdnc7CiAgZm9udC1zaXplOiAzMHB4OwogIGxlZnQ6IDA7CiAgcG9zaXRpb246IGFic29sdXRlOwogIHJpZ2h0OiAwOwogIG1hcmdpbjogYXV0bzsKfQoKLnF1aWtzaXRlLWNvbnRhaW5lciB7CiAgbWFyZ2luOiBhdXRvOwp9Cgouc3RvcmUtbmFtZSB7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGZvbnQtc2l6ZTogNTBweDsKICBjb2xvcjogYmxhY2s7Cgl0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsKfQoKLnByb2R1Y3QtY29udGFpbmVyIHsKICBib3JkZXI6IDFweCBzb2xpZCBibGFjazsKICBtYXJnaW46IDBweCBhdXRvIDIwcHggYXV0bzsKICBtYXgtd2lkdGg6IDEwMDBweDsKfQoKLnNsaWRlciB7CiAgbWF4LXdpZHRoOiAxMDAlOwogIC8qIG1heC1oZWlnaHQ6IDQwdmg7ICovCn0KCi5wcm9kdWN0LWltYWdlIHsKCn0KCi5wcm9kdWN0LWhhbmRsZSB7CiAgcGFkZGluZzogMzBweDsKICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4IGJsYWNrOwogIGJvcmRlci10b3A6IHNvbGlkIDFweCBibGFjazsKICBtYXJnaW4tdG9wOiA4cHg7Cn0KCi5ob3Jpem9udGFsLWNvbnRhaW5lciB7CiAgd2lkdGg6IDEwMCU7CiAgZGlzcGxheTogZmxleDsKICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDsKICBwYWRkaW5nOiAxcmVtIDA7Cn0KCi5wcmljZSwgLnF1YW50aXR5IHsKICBib3JkZXI6IHNvbGlkIDBweCBibGFjazsKICB3aWR0aDogMTAwJTsKICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgZm9udC1zaXplOiA2MHB4OwogIHdpZHRoOiAyOCU7Cn0KCi5wcm9kdWN0LWRlc2NyaXB0aW9uIHsKICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggYmxhY2s7CiAgYm9yZGVyLXRvcDogc29saWQgMXB4IGJsYWNrOwogIG1heC1oZWlnaHQ6IDMwdmg7CiAgb3ZlcmZsb3cteTogc2Nyb2xsOwogIHBhZGRpbmc6IDM4cHg7CiAgZm9udC1zaXplOiAydmg7CiAgbGluZS1oZWlnaHQ6IDN2aDsKfQoKLmJvdHRvbS1jb250YWluZXIgewogIG1hcmdpbjogYXV0bzsKICB3aWR0aDogOTclOwogIHRleHQtYWxpZ246IGNlbnRlcjsKICBib3R0b206IDcxcHg7CiAgYmFja2dyb3VuZDogd2hpdGU7CiAgbGVmdDogMDsKICByaWdodDogMDsKfQoKLm9wdGlvbi1wYXJlbnQtY29udGFpbmVyIHsKICBwYWRkaW5nOiAzM3B4IDBweDsKICBkaXNwbGF5OiBncmlkOwogIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjsKfQoKLm9wdGlvbi1wYXJlbnQtY29udGFpbmVyIHNlbGVjdCB7CiAgd2lkdGg6IDkwJTsKICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgYmFja2dyb3VuZDogYmxhY2s7CiAgY29sb3I6IHdoaXRlOwogIHBhZGRpbmc6IDM1cHg7Cn0KCi5jaGVja291dCB7CiAgY29sb3I6IHdoaXRlOwogIGJhY2tncm91bmQ6IGJsYWNrOwogIHdpZHRoOiA5NiU7CiAgbWFyZ2luOiAyMXB4IGF1dG87CiAgcGFkZGluZzogMjlweDsKfQoKLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CmZsaWNraXR5IE92ZXJ3cml0dGUgc3R5bGVzCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovCi5mbGlja2l0eS1wYWdlLWRvdHMgewoJcG9zaXRpb246IHJlbGF0aXZlOwoJYm90dG9tOiAycHg7Cglib3JkZXItdG9wOiBzb2xpZCAxcHggYmxhY2s7Cn0KLmZsaWNraXR5LXZpZXdwb3J0IHsKICB0cmFuc2l0aW9uOiBoZWlnaHQgMC4yczsKfQo=\",\n      \"encoding\": \"base64\"\n    }\n\n  ]\n}`
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
