
angular.module("marvelApp").service("personagensAPI", function ($http, config, authAPI){
    this.listarPersonagens = async (limit = 20, offset = 0, nameStartsWith) =>{
        if (limit <= 0) {
            console.error("Param [limit] cannot be negative.");
            return;
        }
        if (offset < 0) {
            console.error("Param [offset] cannot be negative.");
            return;
        }

        let complementQuery = `&limit=${limit}&offset=${offset}${(nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : "")}`

        return await $http.get(`${config.baseUrl}characters?ts=${authAPI.getTime()}&apikey=${config.publicKey}&hash=${authAPI.getHashMd5()}${complementQuery}`);
    }

    this.obterPersonagemId = async(idPersonagem) => {
        return await $http.get(`${config.baseUrl}characters/${idPersonagem}?ts=${authAPI.getTime()}&apikey=${config.publicKey}&hash=${authAPI.getHashMd5()}`);
    }

    this.obterSerieUrl = async(url) => {
        return await $http.get(`${url}?ts=${authAPI.getTime()}&apikey=${config.publicKey}&hash=${authAPI.getHashMd5()}`);
    }
});