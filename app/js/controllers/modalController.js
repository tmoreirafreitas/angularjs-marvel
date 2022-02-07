(function () {
    'use strict';

    const uid = () => {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
             + Math.random().toString(16).slice(2)
             + Date.now().toString(16).slice(4);
    };

    angular
        .module('marvelApp')
        .controller('modalController', modalController);

    function modalController(modalService) {
        var vm = this;

        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.identifier = `modal_${uid()}`;

        initController();

        function initController() {
            vm.bodyText = 'This text can be updated in modal 1';
        }
        
        function openModal(){
            modalService.Open(vm.identifier);
        }

        function closeModal(){
            modalService.Close(vm.identifier);
        }
    }
})();