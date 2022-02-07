angular.module('marvelApp', ['blockUI']).controller('homeController', 
async ($scope, $interval, personagensAPI, utilAPI, blockUI) => {
    $scope.app = "Lista de Personagens da Márvel";
    $scope.lista = [];
    $scope.modalOpen = false;

    $scope.listarPersornagens = async () => {
         // Block the user interface
        blockUI.start();

        $scope.lista = [];
        let offset = 0;        
        const limit = 50;          
        
        const resolve = await personagensAPI.listarPersonagens(limit, offset, $scope.criterioDeBusca);     
        if(resolve){         
            $scope.lista.push(...resolve.data.data.results);
            $interval(() => {}, 200);        
        }

        $scope.paginator = {};
        $scope.listaSeries = [];
        $scope.listPaginated = [];
        $scope.columns = [
            {
                caption: 'Título',
                data: 'title'
            },
            {
                caption: 'Ano Inicial',
                data: 'startYear'
            },
            {
                caption: 'Ano Final',
                data: 'endYear'
            },
            {
                caption: 'Descrição',
                data: 'description'
            }
        ]

         // Unblock the user interface
        blockUI.stop();
    };   

    $scope.obterPersonagem = async (idPersonagem) => {       
        // Block the user interface
        blockUI.start();

        const resolve = await personagensAPI.obterPersonagemId(idPersonagem);
      
        $scope.personagemSelecionado = resolve.data.data.results[0];
        
        await Promise.all(resolve.data.data.results[0].series.items.map(async (item) => {
            $scope.listaSeries = [];
            const serieResolve = await personagensAPI.obterSerieUrl(item.resourceURI.replace('http:','https:'));
            $scope.listaSeries.push(...serieResolve.data.data.results);
        })).then(() => {
            $scope.paginator = utilAPI.paginate($scope.listaSeries, 1, 3);
            $scope.pages = $scope.paginator.pages;
            $scope.listPaginated = $scope.paginator.data
            $scope.openModal();
        });

         // Unblock the user interface
        blockUI.stop();
    };      

    $scope.setPage = (page) => {
        $scope.paginator = utilAPI.paginate($scope.listaSeries, page, 3);     
        $scope.listPaginated = $scope.paginator.data
    };

    await $scope.listarPersornagens();

    $scope.openModal = () =>{
        $scope.modalOpen = true;
        setTimeout(() => {
            $('#detailModal').modal('show');
        }, 350);
    }

    $scope.hideModal = () => {
        $scope.modalOpen = false;
        $('#detailModal').modal('hide')
    }  
});
