'use strict';

/**
* @ngdoc service
* @name clientApp.googleAnalytics
* @description
* # googleAnalytics
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('googleAnalytics', function ($window, $location) {

    function init() {
        /* jshint ignore:start */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        /* jshint ignore:end */
        setDomain();
    }

    function setDomain() {
        var currentUrl = $location.absUrl();
        if (currentUrl.indexOf('staging') > 0 || currentUrl.indexOf('localhost') > 0) {
            console.log('got in staging')
            $window.ga('create', 'UA-92244858-1', 'auto');
        } else {
            console.log('got in prod');
            $window.ga('create', 'UA-92244858-2', 'auto');
        }
    }

    function trackPage(path) {
        $window.ga('send', 'pageview', path);
    }

    function trackEvent(eventCategory, eventAction, eventLabel) {
        $window.ga('send', 'event', {
            eventCategory: eventCategory, //'Entry Page'
            eventAction: eventAction, //'Save clicked'
            eventLabel: eventLabel //'Some label'
        });
    }

    return {
        init: init,
        trackPage: trackPage,
        trackEvent: trackEvent
    };
});
