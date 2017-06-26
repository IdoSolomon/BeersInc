/**
 * Created by Hasidi on 07/03/2017.
 */
angular.module('myApp')
    .service('cartService' ,function(localStorageService) {

        let Cart = [];
        if(localStorageService.isSupported) {
            // var storageType = localStorageService.getStorageType();
            Cart = localStorageService.get('cart');
            if (!Cart) {
                Cart = [];
                localStorageService.set('cart', Cart);
            }

        }


        this.addToCart = function (item, quantity) {
            Cart = localStorageService.get('cart');
            var foundAt = -1;
            for (var i=0; i<Cart.length; i++) {
                if (item.BeerID == Cart[i].BeerID) {
                    foundAt = i;
                    break;
                }
            }
            if (foundAt == -1) {
                let newBeer = {

                    "BeerID": item.BeerID,
                    "BeerName": item.BeerName,
                    "CategoryName": item.CategoryName,
                    "AlcoholPercentage": item.AlcoholPercentage,
                    "Price": item.Price,
                    "Volume": item.Volume,
                    "AddedOn": item.AddedOn,
                    "Picture": item.Picture,
                    "Quantity": quantity
                };
                Cart.push(newBeer);
            }
            else {
                Cart[foundAt].Quantity += quantity;
            }
            localStorageService.set('cart', Cart);
        };

        this.removeFromCart = function (item) {
            var foundAt = -1;
            for (var i=0; i<Cart.length; i++) {
                if (item.BeerID == Cart[i].BeerID) {
                    foundAt = i;
                    break;
                }
            }
            if (foundAt != -1) {

                Cart.splice(foundAt, 1);
                localStorageService.set('cart', Cart);
            }

        }

        this.removeUnitFromCart = function (item) {
            var foundAt = -1;
            for (var i=0; i<Cart.length; i++) {
                if (item.BeerID == Cart[i].BeerID) {
                    foundAt = i;
                    break;
                }
            }
            if (foundAt != -1) {

                if(Cart[foundAt].Quantity>0)
                    Cart[foundAt].Quantity-=1;
            }

        }


        this.getCart = function() {
            return Cart;
        }


        this.deleteCart = function () {
            Cart = [];
            localStorageService.remove('cart');

        }

        this.getCartTotalPrice = function () {
            self.totalPrice = 0;
            for (var i=0; i< Cart.length; i++) {
                self.totalPrice += Cart[i].Quantity*Cart[i].Price;
            }
            return totalPrice;
        }


    });
