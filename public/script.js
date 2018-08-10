var PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newsearch: 'anime',
        lastsearch: '',
        loading: false,
        price: PRICE
    },
    mounted: function () {
        this.onSubmit();
    },
    methods: {
        onSubmit: function () {
            this.items = [];
            this.loading = true;
            this.$http.get('/search/'.concat(this.newsearch)).then(function (res) {
                this.loading = false;
                this.lastsearch = this.newsearch;
                this.items = res.data;
            });
        },
        addItem: function (index) {
            this.total += PRICE;
            var item = this.items[index];
            var found = false;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }

            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: PRICE
                });
            }
        },
        inc: function (item) {
            item.qty++;
            this.total += PRICE;
        },
        dec: function (item) {
            item.qty--;
            this.total -= PRICE;
            if (item.qty <= 0) {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: function (price) {
            return '$'.concat(price.toFixed(2))
        }
    }
});
