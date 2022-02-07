angular.module("marvelApp").service("authAPI", function ($http, config){
    this.getTime = () => {
        return Number(new Date());
    };

    this.getHashMd5 = () => {
        const time = Number(new Date());
        const hash = CryptoJS.MD5(time + config.privateKey + config.publicKey).toString();
        return hash.toString();
    }
});