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
   url: 'deploy_index.html',
   success: function(res){
     console.log("IN SUCCESS");
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
   url: 'deploy_script.js',
   success: function(res){
     console.log("IN SUCCESS");
   }
  }).then( (res) => {
    encoded_script =  Base64.encode(res)
    // console.log(encoded_script);
    return encoded_script

  } )
  return encoded_script
}

export async function masterFetch(store_url, product_handle, encoded_html, encoded_js){
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
  "data": `{\n  \"name\": \"quiksite\",\n  \"version\": 2,\n  \"files\": [\n  {\n    \"file\": \"./package.json\",\n    \"data\": \"{\\r\\n  \\\"name\\\": \\\"app3\\\",\\r\\n  \\\"version\\\": \\\"1.0.0\\\",\\r\\n  \\\"description\\\": \\\"\\\",\\r\\n  \\\"scripts\\\": {\\r\\n    \\\"start\\\": \\\"serve\\\"\\r\\n  },\\r\\n  \\\"now\\\": {\\r\\n    \\\"version\\\": 2,\\r\\n    \\\"env\\\": {\\r\\n      \\\"STORE_LINK\\\": \\\"${store_url}\\\",\\r\\n      \\\"PRODUCT_HANDLE\\\": \\\"${product_handle}\\\"\\r\\n    },\\r\\n    \\\"builds\\\": [\\r\\n      {\\r\\n        \\\"src\\\": \\\"index.html\\\",\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"src\\\": \\\"*.css\\\",\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"src\\\": \\\"*.js\\\",\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      },\\r\\n      {\\r\\n        \\\"use\\\": \\\"@now\\/static\\\"\\r\\n      }\\r\\n    ],\\r\\n    \\\"routes\\\": [\\r\\n      {\\r\\n        \\\"src\\\": \\\"\\/\\\",\\r\\n        \\\"dest\\\": \\\"\\/\\\"\\r\\n      }\\r\\n    ],\\r\\n    \\\"public\\\": true\\r\\n  },\\r\\n  \\\"dependencies\\\": {\\r\\n    \\\"now-env\\\": \\\"^3.1.0\\\",\\r\\n    \\\"require\\\": \\\"^2.4.20\\\",\\r\\n    \\\"serve\\\": \\\"^10.1.1\\\"\\r\\n  }\\r\\n}\\r\\n\"\n    },\n    {\n      \"file\": \"index.html\",\n      \"data\": \"${encoded_html}\",\n      \"encoding\": \"base64\"\n    },\n    {\n      \"file\": \"index.js\",\n      \"data\": \"${encoded_js}\",\n      \"encoding\": \"base64\"\n    },\n    {\n      \"file\": \"bismuth.css\",\n      \"data\": \"LyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8KICAgdjIuMCB8IDIwMTEwMTI2CiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pCiovCmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSwKaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLAphLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsCmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCwKc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhciwKYiwgdSwgaSwgY2VudGVyLApkbCwgZHQsIGRkLCBvbCwgdWwsIGxpLApmaWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCwKdGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsCmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLApmaWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsCm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LAp0aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8gewogIG1hcmdpbjogMDsKICBwYWRkaW5nOiAwOwogIGJvcmRlcjogMDsKICBmb250LXNpemU6IDEwMCU7CiAgZm9udDogaW5oZXJpdDsKICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyOwp9CgovKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovCmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsCmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7CiAgZGlzcGxheTogYmxvY2s7Cn0KCmJvZHkgewogIGxpbmUtaGVpZ2h0OiAxOwp9CgpvbCwgdWwgewogIGxpc3Qtc3R5bGU6IG5vbmU7Cn0KCmJsb2NrcXVvdGUsIHEgewogIHF1b3Rlczogbm9uZTsKfQoKYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsCnE6YmVmb3JlLCBxOmFmdGVyIHsKICBjb250ZW50OiAnJzsKICBjb250ZW50OiBub25lOwp9Cgp0YWJsZSB7CiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsKICBib3JkZXItc3BhY2luZzogMDsKfQoKLyo9PT09PT09PT09PT09PT09IFJlc2V0ID09PT09PT09PT09PT09PT0qLwovKiEgbm9ybWFsaXplLmNzcyB2Ny4wLjAgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovCi8qIERvY3VtZW50Cj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovCmJ1dHRvbiwgaHIsIGlucHV0IHsKICBvdmVyZmxvdzogdmlzaWJsZQp9CgppbWcsIGxlZ2VuZCB7CiAgbWF4LXdpZHRoOiAxMDAlCn0KCmF1ZGlvLCBjYW52YXMsIHByb2dyZXNzLCB2aWRlbyB7CiAgZGlzcGxheTogaW5saW5lLWJsb2NrCn0KCnByb2dyZXNzLCBzdWIsIHN1cCB7CiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lCn0KClt0eXBlPWNoZWNrYm94XSwgW3R5cGU9cmFkaW9dLCBsZWdlbmQgewogIHBhZGRpbmc6IDA7CiAgYm94LXNpemluZzogYm9yZGVyLWJveAp9CgoqLCA6OmFmdGVyLCA6OmJlZm9yZSwgbGVnZW5kIHsKICBib3gtc2l6aW5nOiBib3JkZXItYm94Cn0KCmE6Zm9jdXMsIGxlZ2VuZCB7CiAgY29sb3I6IGluaGVyaXQKfQoKYm9keSwgZm9ybSB7CiAgbWFyZ2luOiAwCn0KCmh0bWwgewogIGxpbmUtaGVpZ2h0OiAxLjE1OwogIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOwogIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJQp9CgphcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgbWFpbiwgbWVudSwgbmF2LCBzZWN0aW9uIHsKICBkaXNwbGF5OiBibG9jawp9CgpoMSB7CiAgZm9udC1zaXplOiAyZW07CiAgbWFyZ2luOiAuNjdlbSAwCn0KCmZpZ3VyZSB7CiAgbWFyZ2luOiAxZW0gNDBweAp9CgpociB7CiAgYm94LXNpemluZzogY29udGVudC1ib3g7CiAgaGVpZ2h0OiAwCn0KCmNvZGUsIGtiZCwgcHJlLCBzYW1wIHsKICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7CiAgZm9udC1zaXplOiAxZW0KfQoKYSB7CiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7CiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tc2tpcDogb2JqZWN0cwp9CgphYmJyW3RpdGxlXSB7CiAgYm9yZGVyLWJvdHRvbTogbm9uZTsKICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQKfQoKYiwgc3Ryb25nIHsKICBmb250LXdlaWdodDogYm9sZGVyCn0KCmRmbiB7CiAgZm9udC1zdHlsZTogaXRhbGljCn0KCm1hcmsgewogIGJhY2tncm91bmQtY29sb3I6ICNmZjA7CiAgY29sb3I6ICMwMDAKfQoKc21hbGwgewogIGZvbnQtc2l6ZTogODAlCn0KCnN1Yiwgc3VwIHsKICBmb250LXNpemU6IDc1JTsKICBsaW5lLWhlaWdodDogMDsKICBwb3NpdGlvbjogcmVsYXRpdmUKfQoKc3ViIHsKICBib3R0b206IC0uMjVlbQp9CgpzdXAgewogIHRvcDogLS41ZW0KfQoKYXVkaW86bm90KFtjb250cm9sc10pIHsKICBkaXNwbGF5OiBub25lOwogIGhlaWdodDogMAp9CgppbWcgewogIGJvcmRlci1zdHlsZTogbm9uZQp9Cgpzdmc6bm90KDpyb290KSB7CiAgb3ZlcmZsb3c6IGhpZGRlbgp9CgpidXR0b24sIGlucHV0LCBvcHRncm91cCwgc2VsZWN0LCB0ZXh0YXJlYSB7CiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7CiAgZm9udC1zaXplOiAxMDAlOwogIGxpbmUtaGVpZ2h0OiAxLjE1OwogIG1hcmdpbjogMAp9CgpidXR0b24sIHNlbGVjdCB7CiAgdGV4dC10cmFuc2Zvcm06IG5vbmUKfQoKW3R5cGU9cmVzZXRdLCBbdHlwZT1zdWJtaXRdLCBidXR0b24sIGh0bWwgW3R5cGU9YnV0dG9uXSB7CiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b24KfQoKW3R5cGU9YnV0dG9uXTo6LW1vei1mb2N1cy1pbm5lciwgW3R5cGU9cmVzZXRdOjotbW96LWZvY3VzLWlubmVyLCBbdHlwZT1zdWJtaXRdOjotbW96LWZvY3VzLWlubmVyLCBidXR0b246Oi1tb3otZm9jdXMtaW5uZXIgewogIGJvcmRlci1zdHlsZTogbm9uZTsKICBwYWRkaW5nOiAwCn0KClt0eXBlPWJ1dHRvbl06LW1vei1mb2N1c3JpbmcsIFt0eXBlPXJlc2V0XTotbW96LWZvY3VzcmluZywgW3R5cGU9c3VibWl0XTotbW96LWZvY3VzcmluZywgYnV0dG9uOi1tb3otZm9jdXNyaW5nIHsKICBvdXRsaW5lOiBCdXR0b25UZXh0IGRvdHRlZCAxcHgKfQoKZmllbGRzZXQgewogIHBhZGRpbmc6IC4zNWVtIC43NWVtIC42MjVlbQp9CgpsZWdlbmQgewogIGRpc3BsYXk6IHRhYmxlOwogIHdoaXRlLXNwYWNlOiBub3JtYWwKfQoKdGV4dGFyZWEgewogIG92ZXJmbG93OiBhdXRvCn0KClt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24gewogIGhlaWdodDogYXV0bwp9CgpbdHlwZT1zZWFyY2hdIHsKICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsKICBvdXRsaW5lLW9mZnNldDogLTJweAp9CgpbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLCBbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHsKICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmUKfQoKOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7CiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247CiAgZm9udDogaW5oZXJpdAp9CgpzdW1tYXJ5IHsKICBkaXNwbGF5OiBsaXN0LWl0ZW0KfQoKW2hpZGRlbl0sIHRlbXBsYXRlIHsKICBkaXNwbGF5OiBub25lCn0KCmJvZHksIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEgewogIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkOwogIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJQp9CgovKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0KRmFzdCBUYXAgLyBlbmFibGVzIG5vLWRlbGF5IHRhcHMgKEZhc3RDbGljay1lc3F1ZSkgb24gc3VwcG9ydGluZyBicm93c2Vycwo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qLwphLCBidXR0b24sIFtyb2xlPSJidXR0b24iXSwgaW5wdXQsIGxhYmVsLCBzZWxlY3QsIHRleHRhcmVhIHsKICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjsKfQoKLyo9PT09PT09PT09PT09PT09IEJpc211dGggUmVzZXRzIENsYXNzZXMgPT09PT09PT09PT09PT09PSovCiosICo6YmVmb3JlLCAqOmFmdGVyIHsKICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OwogIGJveC1zaXppbmc6IGJvcmRlci1ib3gKfQoKaHRtbCwgYm9keSB7CiAgd2lkdGg6IDEwMCU7CiAgbWFyZ2luOiAwOwp9CgpodG1sIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgaGVpZ2h0OiAxMDAlOwp9CgppbWcsIGZpZ3VyZSwgaWZyYW1lIHsKICBkaXNwbGF5OiBibG9jazsKICBtYXgtd2lkdGg6IDEwMCU7CiAgLy8gaGVpZ2h0OmF1dG87CiAgYm9yZGVyOiBub25lOwogIG91dGxpbmU6IG5vbmUKfQoKdWwgewogIHBhZGRpbmc6IDBweDsKICBsaXN0LXN0eWxlOiBub25lOwp9CgphIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgd29yZC13cmFwOiBicmVhay13b3JkOwogIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICBib3JkZXI6IG5vbmU7CiAgb3V0bGluZTogbm9uZTsKICBjdXJzb3I6IHBvaW50ZXI7CiAgdHJhbnNpdGlvbjogLjNzOwp9Cgpib2R5IHsKICBmb250LWZhbWlseTogYXJpYWw7Cn0KCiNhcHAgewogIG1heC13aWR0aDogMTAwdnc7CiAgZm9udC1zaXplOiAzMHB4OwogIGxlZnQ6IDA7CiAgcG9zaXRpb246IGFic29sdXRlOwogIHJpZ2h0OiAwOwogIG1hcmdpbjogYXV0bzsKfQoKLnF1aWtzaXRlLWNvbnRhaW5lciB7CiAgbWFyZ2luOiBhdXRvOwp9Cgouc3RvcmUtbmFtZSB7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGZvbnQtc2l6ZTogNTBweDsKICBjb2xvcjogYmxhY2s7Cgl0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTsKfQoKLnByb2R1Y3QtY29udGFpbmVyIHsKICBib3JkZXI6IDFweCBzb2xpZCBibGFjazsKICBtYXJnaW46IDBweCBhdXRvIDIwcHggYXV0bzsKICBtYXgtd2lkdGg6IDEwMDBweDsKfQoKLnNsaWRlciB7CiAgbWF4LXdpZHRoOiAxMDAlOwogIC8qIG1heC1oZWlnaHQ6IDQwdmg7ICovCn0KCi5wcm9kdWN0LWltYWdlIHsKCn0KCi5wcm9kdWN0LWhhbmRsZSB7CiAgcGFkZGluZzogMzBweDsKICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4IGJsYWNrOwogIGJvcmRlci10b3A6IHNvbGlkIDFweCBibGFjazsKICBtYXJnaW4tdG9wOiA4cHg7Cn0KCi5ob3Jpem9udGFsLWNvbnRhaW5lciB7CiAgd2lkdGg6IDEwMCU7CiAgZGlzcGxheTogZmxleDsKICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDsKICBwYWRkaW5nOiAxcmVtIDA7Cn0KCi5wcmljZSwgLnF1YW50aXR5IHsKICBib3JkZXI6IHNvbGlkIDBweCBibGFjazsKICB3aWR0aDogMTAwJTsKICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgZm9udC1zaXplOiA2MHB4OwogIHdpZHRoOiAyOCU7Cn0KCi5wcm9kdWN0LWRlc2NyaXB0aW9uIHsKICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggYmxhY2s7CiAgYm9yZGVyLXRvcDogc29saWQgMXB4IGJsYWNrOwogIG1heC1oZWlnaHQ6IDMwdmg7CiAgb3ZlcmZsb3cteTogc2Nyb2xsOwogIHBhZGRpbmc6IDM4cHg7CiAgZm9udC1zaXplOiAydmg7CiAgbGluZS1oZWlnaHQ6IDN2aDsKfQoKLmJvdHRvbS1jb250YWluZXIgewogIG1hcmdpbjogYXV0bzsKICB3aWR0aDogOTclOwogIHRleHQtYWxpZ246IGNlbnRlcjsKICBib3R0b206IDcxcHg7CiAgYmFja2dyb3VuZDogd2hpdGU7CiAgbGVmdDogMDsKICByaWdodDogMDsKfQoKLm9wdGlvbi1wYXJlbnQtY29udGFpbmVyIHsKICBwYWRkaW5nOiAzM3B4IDBweDsKICBkaXNwbGF5OiBncmlkOwogIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjsKfQoKLm9wdGlvbi1wYXJlbnQtY29udGFpbmVyIHNlbGVjdCB7CiAgd2lkdGg6IDkwJTsKICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgYmFja2dyb3VuZDogYmxhY2s7CiAgY29sb3I6IHdoaXRlOwogIHBhZGRpbmc6IDM1cHg7Cn0KCi5jaGVja291dCB7CiAgY29sb3I6IHdoaXRlOwogIGJhY2tncm91bmQ6IGJsYWNrOwogIHdpZHRoOiA5NiU7CiAgbWFyZ2luOiAyMXB4IGF1dG87CiAgcGFkZGluZzogMjlweDsKfQoKLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09CmZsaWNraXR5IE92ZXJ3cml0dGUgc3R5bGVzCj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovCi5mbGlja2l0eS1wYWdlLWRvdHMgewoJcG9zaXRpb246IHJlbGF0aXZlOwoJYm90dG9tOiAycHg7Cglib3JkZXItdG9wOiBzb2xpZCAxcHggYmxhY2s7Cn0KLmZsaWNraXR5LXZpZXdwb3J0IHsKICB0cmFuc2l0aW9uOiBoZWlnaHQgMC4yczsKfQo=\",\n      \"encoding\": \"base64\"\n    }\n\n  ]\n}`
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
