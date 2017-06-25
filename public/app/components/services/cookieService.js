angular.module('myApp')
    .service('cookieService', cookieService);


function cookieService (localStorageService) {

    this.addNewCookie = function (username, token) {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);
        localStorageService.cookie.add('user-id', username,  expireDate);
        localStorageService.cookie.add('user-token', token,  expireDate);
        let timestamp = new Date();
        localStorageService.cookie.add('user-lastVisit', timestamp.toDateString(),  expireDate);

        return timestamp;
    };

    this.setNewLoginDate = function () {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);
        let timestamp = new Date();
        localStorageService.cookie.set('user-lastVisit', timestamp.toDateString(), expireDate);
        return timestamp;
    };

    this.removeAll = function () {
        localStorageService.cookie.remove('user-id');
        localStorageService.cookie.remove('user-token');
        localStorageService.cookie.remove('user-lastVisit');

    };

    this.getCookie = function(cookieName) {
        return localStorageService.cookie.get(cookieName);
    };


}/**
 * Created by Ido on 25/06/2017.
 */
