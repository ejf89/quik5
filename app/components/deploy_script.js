


// require(['now-env'], function(){
//   console.log("LOADED");
// })
var package;
var store_link;
var product_handle;
 $.ajax({
  dataType: "json",
  url: 'package.json',
  success: function(res){
    package = res
    console.log(res)

     store_link = package.now.env.STORE_LINK
     product_handle = package.now.env.PRODUCT_HANDLE
  }
}).then( () => {

  console.log("LINK");
  console.log(store_link);

  console.log("HANDLE");
  console.log(product_handle);

  let vm = new Vue({
    el: '#app',
    data: {
      cart_url: `https://${store_link}.myshopify.com/cart`,
      store_url: `https://${store_link}.myshopify.com`,
      store_name:'',
      product_handle: '',
      message: 'Vue is working!',
      product_data: {},
      product_images: [],
      product_price: '',
      variants: [],
      options: [],
      product_description: ''

    },
    created: function () {
      console.log("CREATED");
      this.getData()
    },
    methods: {
      updateData: function () {
        this.message = 'updated'
      },
      getData: function () {
        console.log('URL');
        console.log(`https://${store_link}.myshopify.com/products/${product_handle}.json`);
        $.ajax( {
          url: `https://${store_link}.myshopify.com/products/${product_handle}.json`,
          type: 'GET',
          dataType: "jsonp",
          success: (data) => {
            console.log("GOT STORE DATA");
            this.product_data = Object.assign(this.product_data, data.product)
            console.log(this.product_data);
          }
        })
        .then( () => {
          this.$nextTick(function(){
            this.message = "updated"

            this.store_name = store_link
            this.product_handle = this.product_data.title
            this.variants = this.product_data.variants
            this.product_images = this.product_data.images
            this.product_price = this.variants[0].price

            this.product_description = this.product_data.body_html.replace(/(<([^>]+)>)/ig,"");

            if (this.product_data.options.length > 0) {
              this.options = this.product_data.options
            }
            console.log(this.options);
            console.log("updated");

          })
        })

        .then( () => {
          this.$nextTick(function(){
          console.log("hey" + $(".product-image").length);
            var checkExist = setInterval(function() {
               if ($('.product-image').length) {
                  console.log("Exists!");
                  $('.slider').flickity({
                    contain: true,
                    cellAlign: "left",
                    adaptiveHeight: true,
                    imagesLoaded: true
                  })
                  clearInterval(checkExist);
               }
            }, 100);
          })
        } )
      },
      sendCart: function () {
        console.log("SENDING!!@!!");
        let quantity = $('.quantity').val();
        let options = [];
        for (var i = 0; i < $('.option-select').length; i++) {
          let val = $('.option-select')[i].value
          if (val != "") {
            options.push(val)
          } else {
            alert('Please select size and color')
            break;
          }
      }

      if (options.length == 2) {
        var prod = this.variants.find( x => x.option1 == options[0] && x.option2 == options[1] )
      } else {
        var prod = this.variants.find( x => x.option1 == options[0] )
      }

      this.cart_url = this.cart_url.concat(`/${prod.id}:${quantity}`)

      console.log(this.cart_url);

        window.location.href = this.cart_url
    }

    },
    components: {
      'product': {
        props: ['handle'],
        template: `<h1> {{ handle }}  </h1>`
      }
    }
  })

  console.log(vm);

} );
