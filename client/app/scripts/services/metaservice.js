'use strict';

/**
* @ngdoc service
* @name clientApp.metaService
* @description
* # metaService
* Service in the clientApp.
*/
angular.module('clientApp')
.service('MetaService', function () {
    var title = 'Home';
    var metaDescription = '';
    var metaKeywords = '';
    return {
        set: function(newTitle, newMetaDescription, newKeywords) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            title = newTitle;
        },
        metaTitle: function(){
            return title;
        },
        // leaving metaDescription and metaKeywords as examples, not actually being used
        metaDescription: function() {
            return metaDescription;
        },
        metaKeywords: function() {
            return metaKeywords;
        }
    };
});
