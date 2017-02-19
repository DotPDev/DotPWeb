"use strict";angular.module("clientApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","firebase","ui.router"]).config(["$urlRouterProvider","$stateProvider","$locationProvider",function(a,b,c){c.html5Mode(!0),a.otherwise("/"),b.state("root",{url:"","abstract":!0,resolve:{},views:{"titlebar@":{templateUrl:"views/titlebar.html",controller:"TitlebarCtrl",controllerAs:"vm"}}}),b.state("root.dashboard",{url:"/",resolve:{},data:{pageName:"MainCtrl",browserTitle:"Main"},views:{"container@":{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}}}),b.state("root.dotpeeps",{url:"/dotpeeps",data:{pageName:"DotpeepsCtrl",browserTitle:"Dotpeeps"},views:{"container@":{templateUrl:"views/dotpeeps.html",controller:"DotpeepsCtrl",controllerAs:"vm"}}}),b.state("root.ladder",{url:"/ladder",data:{pageName:"LadderCtrl",browserTitle:"Ladder"},views:{"container@":{templateUrl:"views/ladder.html",controller:"LadderCtrl",controllerAs:"vm"}}}),b.state("root.media",{url:"/media",data:{pageName:"MediaCtrl",browserTitle:"Media"},views:{"container@":{templateUrl:"views/media.html",controller:"MediaCtrl",controllerAs:"vm"}}}),b.state("root.login",{url:"/login",resolve:{},data:{pageName:"LoginCtrl",browserTitle:"Login"},views:{"container@":{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"vm"}}}),b.state("root.about",{url:"/about",resolve:{},data:{pageName:"AboutCtrl",browserTitle:"About"},views:{"container@":{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"vm"}}})}]).run(["$rootScope","firebaseSvc","$location","googleAnalytics",function(a,b,c,d){d.init(),b.initialize(),a.$on("$stateChangeSuccess",function(a){d.trackPage(c.path())})}]),angular.module("clientApp").controller("MainCtrl",["$http","feedManager","utils",function(a,b,c){function d(){i.page=parseInt(c.getParameterByName("page")),i.page||(i.page=1),e(),h()}function e(){1===i.page?(i.links.next="/?page="+(i.page+1),i.links.prev="/"):(i.links.next="/?page="+(i.page+1),i.links.prev="/?page="+(i.page-1))}function f(){setTimeout(function(){i.page+=1,e(),h()},1)}function g(){setTimeout(function(){i.page>1&&(i.page-=1,e(),h())},1)}function h(){b.parseFeed(i.page).then(function(a){console.log(a),i.feed=a})["catch"](function(a){console.log(a)})}var i=this;i.feed={},i.page=1,i.links={next:"/",goNext:f,prev:"/",goPrev:g},d()}]),angular.module("clientApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").factory("feedManager",["$http","$timeout","$q",function(a,b,c){function d(g){if(0===f.episodes.length)return a.get("/api/feed/").then(function(a){return a.message&&"service not loaded"===a.message&&b(function(){d()},3e3),f=a.data,e(f,5*g-5,5*g)})["catch"](function(a){console.log(a)});var h=c.defer();return h.resolve(e(f,5*g-5,5*g)),h.promise}function e(a,b,c){return{episodes:a.episodes.slice(b,c),meta:a.meta}}var f={episodes:[],meta:{}};return{parseFeed:d}}]),angular.module("clientApp").controller("TitlebarCtrl",["$scope","auth","$window","$state",function(a,b,c,d){function e(){g.isShowingLogin=!1,d.go("root.login")}function f(){g.isShowingLogin=!1,b.signOut(),d.go("root.dashboard")}var g=this;g.user=b.getAuth(),g.signOut=f,g.isShowingLogin=!1,g.goToLogin=e,c.firebase.auth().onAuthStateChanged(function(b){b?(g.user=b,a.$apply()):(g.user=null,a.$apply())})}]),angular.module("clientApp").factory("firebaseSvc",["$window","$q",function(a,b){function c(a){var c=b.defer();return f.ref(a).once("value").then(function(a){c.resolve(a.val())}),c.promise}function d(){var b={apiKey:"AIzaSyAvbGaPlMAtBnnnAzkJRbpBmmmIMee-PEI",authDomain:"defenseofthepatience-b2b5f.firebaseapp.com",databaseURL:"https://defenseofthepatience-b2b5f.firebaseio.com",storageBucket:"defenseofthepatience-b2b5f.appspot.com",messagingSenderId:"45457898855"};e=a.firebase.initializeApp(b),g=a.firebase.storage(),f=a.firebase.database(),h=a.firebase.auth().onAuthStateChanged(function(a){i=a})}var e,f,g,h,i=null;return{initialize:d,getDatabaseOnce:c}}]),angular.module("clientApp").factory("auth",["$window",function(a){function b(a,b){return g.auth().createUserWithEmailAndPassword(a,b)["catch"](function(a){return console.log(a),null})}function c(a,b){return g.auth().signInWithEmailAndPassword(a,b)["catch"](function(a){return console.log(a),null})}function d(){return g.auth().signOut()}function e(){return g.auth().currentUser}function f(a){return g.auth().sendPasswordResetEmail(a)}var g=a.firebase;return{createUserAccount:b,signIn:c,signOut:d,getAuth:e,resetPassword:f}}]),angular.module("clientApp").controller("LoginCtrl",["$state","auth","$window","utils",function(a,b,c,d){function e(a){a&&(m.createMode?j():i())}function f(){m.createMode=!1,m.resetPasswordMode=!0}function g(){m.createMode=!1,m.resetPasswordMode=!1}function h(a){b.resetPassword(a).then(function(a){})["catch"](function(a){console.log(a),console.log("reset email error, object is:")})}function i(){b.signIn(m.userEmail,m.password).then(function(b){m.user=b,a.go("root.dashboard")})["catch"](function(a){console.log(a)})}function j(){b.createUserAccount(m.newUserEmail,m.newPassword).then(function(a){k(a,!0)})["catch"](function(a){console.log(a)})}function k(a,b){a.updateProfile({email:a.email,displayName:m.newUserDisplayName||""}).then(function(){i(),l(a,b)},function(a){console.log(a)})}function l(a,b){var e=d.makeServerTime(),f={email:a.email,displayName:m.newUserDisplayName||"",photoURL:a.photoURL||"",createdAt:e};b?c.firebase.database().ref("users/"+a.uid).set(f).then(function(){})["catch"](function(a){console.log(a)}):c.firebase.database().ref("users/"+a.uid).update(f).then(function(){})["catch"](function(a){console.log(a)})}var m=this;m.user=b.getAuth(),m.submitForm=e,m.createUser=j,m.updateProfile=k,m.resetPassword=f,m.cancelAction=g,m.login=i,m.forgotPassword=h,m.password="",m.userEmail="",m.newUserEmail="",m.newUserDisplayName="",m.resetEmail="",m.newPassword="",m.confirmPassword="",m.createMode=!1,m.resetPasswordMode=!1}]),angular.module("clientApp").factory("utils",["$window",function(a){function b(){var a=Date.now(),b=Math.floor(a/1e3);return b}function c(b,c){c||(c=a.location.href),b=b.replace(/[\[\]]/g,"\\$&");var d=new RegExp("[?&]"+b+"(=([^&#]*)|&|#|$)"),e=d.exec(c);return e?e[2]?decodeURIComponent(e[2].replace(/\+/g," ")):"":null}return{getParameterByName:c,makeServerTime:b}}]),angular.module("clientApp").controller("DotpeepsCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").controller("LadderCtrl",["firebaseSvc",function(a){function b(a,b){var c=parseInt(a.points),d=parseInt(b.points);return c>d?-1:1}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var c=this;c.ladder={players:[]},a.getDatabaseOnce("inhouse-ladder").then(function(a){console.log(a),c.ladder.players=a.sort(b)})}]),angular.module("clientApp").controller("MediaCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").factory("googleAnalytics",["$window","$location",function(a,b){function c(){!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),d()}function d(){var c=b.absUrl();c.indexOf("staging")>0||c.indexOf("localhost")>0?(console.log("got in staging"),a.ga("create","UA-92244858-1","auto")):(console.log("got in prod"),a.ga("create","UA-92244858-2","auto"))}function e(b){a.ga("send","pageview",b)}function f(b,c,d){a.ga("send","event",{eventCategory:b,eventAction:c,eventLabel:d})}return{init:c,trackPage:e,trackEvent:f}}]),angular.module("clientApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/dotpeeps.html",'<div class=""> dotpeeps view </div>'),a.put("views/ladder.html",'<div class="main-wrapper"> <div class=""> </div> <ul> <li ng-repeat="player in vm.ladder.players"> <div style="color:{{::player.color}}" class="player"> <div class="name"> <a ng-href="http://www.dotabuff.com/players/{{::player.playerId}}">{{::player.nickName}}</a> </div> <div class="record"> {{::player.wins}}-{{::player.losses}} </div> <div class="points"> {{::player.points}} </div> </div> </li> </ul> </div>'),a.put("views/login.html",'<div class="login-wrapper"> <div class="inner-login-wrapper"> <div class="logged-in-info" ng-if="vm.user"> <div class=""> Logged in as {{vm.user.email}} </div> </div> <form ng-if="!vm.user" name="loginForm" class="form login-form" ng-submit="vm.submitForm(loginForm.$valid)" novalidate> <div class="form-group" ng-if="!vm.createMode && !vm.resetPasswordMode"> <label for="userEmail">Email Address</label> <input class="" id="userEmail" type="email" name="userEmail" ng-model="vm.userEmail" required> <div ng-messages="loginForm.userEmail.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.userEmail.$touched">Email Address is required.</p> <p class="error-message" class="error-message" ng-message="email" ng-show="loginForm.userEmail.$touched">Must be valid email.</p> </div> </div> <div class="form-group" ng-if="!vm.createMode && !vm.resetPasswordMode"> <label for="password">Password</label> <input class="" type="text" name="password" id="password" ng-model="vm.password" required> <div ng-messages="loginForm.password.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.password.$touched">Password is required.</p> </div> </div> <div class="form-group" ng-if="vm.createMode"> <label for="newUserEmail">Email Address</label> <input class="" id="newUserEmail" type="text" name="newUserEmail" ng-model="vm.newUserEmail" required> <div ng-messages="loginForm.newUserEmail.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.newUserEmail.$touched">Email Address is required.</p> <p class="error-message" ng-message="email" ng-show="loginForm.newUserEmail.$touched">Must be valid email.</p> </div> </div> <div class="form-group" ng-if="vm.createMode"> <label for="newUserDisplayName">Display Name</label> <input class="" id="newUserDisplayName" type="text" name="newUserDisplayName" ng-model="vm.newUserDisplayName"> </div> <div class="form-group" ng-if="vm.createMode"> <label for="newPassword">Password</label> <input class="" type="text" id="newPassword" name="newPassword" ng-model="vm.newPassword" required> <div ng-messages="loginForm.newPassword.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.newPassword.$touched">Password is required.</p> </div> </div> <div class="form-group" ng-if="vm.createMode"> <label for="confirmPassword">Confirm Password</label> <input class="" type="text" id="confirmPassword" name="confirmPassword" ng-model="vm.confirmPassword" ng-pattern="{{vm.newPassword}}" required> <div ng-messages="loginForm.confirmPassword.$error"> <p class="error-message" ng-message="pattern" ng-show="loginForm.confirmPassword.$touched">Passwords do not match.</p> </div> </div> <div class="form-group" ng-if="vm.resetPasswordMode"> <label for="resetEmail">Email Address</label> <input class="" id="resetEmail" type="email" name="resetEmail" ng-model="vm.resetEmail" required> <div ng-messages="loginForm.resetEmail.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.resetEmail.$touched">Email is required.</p> <p class="error-message" ng-message="email" ng-show="loginForm.resetEmail.$touched">Must be valid email.</p> </div> </div> <button ng-disabled="loginForm.$invalid" type="submit" class="cmdr-button" ng-if="!vm.createMode && !vm.resetPasswordMode"> LOGIN </button> <button type="submit" ng-click="vm.createMode = !vm.createMode" ng-if="!vm.createMode && !vm.resetPasswordMode"> REGISTER </button> <button ng-disabled="loginForm.$invalid" ng-if="vm.createMode"> CREATE </button> <button ng-disabled="loginForm.$invalid" ng-click="vm.forgotPassword()" ng-if="vm.resetPasswordMode"> SEND EMAIL </button> <button ng-click="vm.cancelAction()" ng-if="vm.createMode || vm.resetPasswordMode"> CANCEL </button> <div class="forgot-password" ng-click="vm.resetPassword()" ng-if="!vm.resetPasswordMode && !vm.createMode"> Forgot Password? </div> </form> </div> </div>'),a.put("views/main.html",'<div class="main-wrapper"> <div class=""> </div> <ul> <li ng-repeat="episode in vm.feed.episodes"> {{episode.title}} </li> </ul> <div id="paging"> <div id="prev"> <a ng-href="{{vm.links.prev}}" ng-click="vm.links.goPrev()">Previous</a> </div> <div id="next"> <a ng-href="{{vm.links.next}}" ng-click="vm.links.goNext()">Next</a> </div> </div> </div>'),a.put("views/media.html",'<div class=""> media view </div>'),a.put("views/titlebar.html",'<nav role="navigation"> <ul class="nav"> <li class="active"> <header> <div class="left-stone">&nbsp;</div> <div class="right-stone">&nbsp;</div> <div class="center-stone"> <div class="center-left">&nbsp;</div> <div class="center-right">&nbsp;</div> <a ui-sref="root.dashboard"> <img class="logo" src="../images/Logo259x256.jpg" alt=""> </a> </div> </header> <a class="dotpeeps" ui-sref="root.dotpeeps"><span>dotpeeps</span></a> </li> <li> <a ui-sref="root.ladder"><span>ladder</span></a> </li> <li> <a ui-sref="root.media"><span>media</span></a> </li> <li> <a ui-sref="root.about"><span>about us</span></a> </li> <li class="action-wrapper"> <div class="power" ng-click="vm.isShowingLogin = !vm.isShowingLogin"> <i class="fa fa-power-off"></i> </div> <div class="hidden-login" ng-class="{ \'show-login\': vm.isShowingLogin }"> <a ng-if="!vm.user" ng-click="vm.goToLogin()" ui-sref="root.login"><span>Login</span></a> <a ng-if="vm.user" ng-click="vm.goToLogin()" ui-sref="root.login"><span>{{vm.user.displayName || vm.user.email}}</span></a> <a ng-if="vm.user" ng-click="vm.signOut()" ui-sref="root.dashboard"><span>Sign Out</span></a> </div> </li> </ul> </nav>')}]);