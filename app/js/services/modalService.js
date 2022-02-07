(function () {
    'use strict';

    angular.module("marvelApp").service("modalService", () => {
        var modals = []; 

        this.Add = (modal) => {
            // add modal to array of active modals
            modals.push(modal);
        }
        
        this.Remove = (id) =>{
            // remove modal from array of active modals
            var modalToRemove = _.findWhere(modals, { id: id });
            modals = _.without(modals, modalToRemove);
        }

        this.Open = (id) => {
            // open modal specified by id
            var modal = _.findWhere(modals, { id: id });
            modal.open();
        }

        this.Close = (id) => {
            // close modal specified by id
            var modal = _.findWhere(modals, { id: id });
            modal.close();
        }
    });    
})();