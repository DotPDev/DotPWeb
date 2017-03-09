"use strict";angular.module("clientApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","firebase","ui.router","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","com.2fdevs.videogular.plugins.poster","matchMedia","angularMoment"]).config(["$urlRouterProvider","$stateProvider","$locationProvider",function(a,b,c){c.html5Mode(!0),a.otherwise("/"),b.state("root",{url:"","abstract":!0,resolve:{},views:{"titlebar@":{templateUrl:"views/titlebar.html",controller:"TitlebarCtrl",controllerAs:"vm"}}}),b.state("root.dashboard",{url:"/",resolve:{},data:{pageName:"MainCtrl",browserTitle:"Main"},views:{"container@":{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}}}),b.state("root.dotpeeps",{url:"/dotpeeps",data:{pageName:"DotpeepsCtrl",browserTitle:"Dotpeeps"},views:{"container@":{templateUrl:"views/dotpeeps.html",controller:"DotpeepsCtrl",controllerAs:"vm"}}}),b.state("root.ladder",{url:"/ladder",data:{pageName:"LadderCtrl",browserTitle:"Ladder"},views:{"container@":{templateUrl:"views/ladder.html",controller:"LadderCtrl",controllerAs:"vm"}}}),b.state("root.media",{url:"/media",data:{pageName:"MediaCtrl",browserTitle:"Media"},views:{"container@":{templateUrl:"views/media.html",controller:"MediaCtrl",controllerAs:"vm"}}}),b.state("root.login",{url:"/login",resolve:{},data:{pageName:"LoginCtrl",browserTitle:"Login"},views:{"container@":{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"vm"}}}),b.state("root.about",{url:"/about",resolve:{},data:{pageName:"AboutCtrl",browserTitle:"About"},views:{"container@":{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"vm"}}}),b.state("root.store",{url:"/store",resolve:{},data:{pageName:"StoreCtrl",browserTitle:"DotP Store"},views:{"container@":{templateUrl:"views/store.html",controller:"StoreCtrl",controllerAs:"vm"}}})}]).run(["$rootScope","firebaseSvc","$location","googleAnalytics",function(a,b,c,d){d.init(),b.initialize(),a.$on("$stateChangeSuccess",function(a){d.trackPage(c.path())})}]),angular.module("clientApp").controller("MainCtrl",["$scope","$http","$rootScope","feedManager","utils",function(a,b,c,d,e){function f(){n.page=parseInt(e.getParameterByName("page")),n.page||(n.page=1),i(),l()}function g(a){var b=new Date(a),c=b.getDay();return 2===c?"../images/tues.png":4===c?"../images/thurs.png":"../images/generic.png"}function h(a){var b=a.replace("<h2>Defense of the Patience - A Dota 2 Podcast</h2> ",""),c=b.replace("<h2><strong>Defense of the Patience - A Dota 2Podcast</strong></h2> ",""),d=c.replace("<h2><strong>Defense of the Patience - A Dota 2 Podcast</strong></h2> ",""),e=d.replace("<strong>",""),f=e.replace("</strong>","");return f}function i(){1===n.page?(n.links.next="/?page="+(n.page+1),n.links.prev="/"):(n.links.next="/?page="+(n.page+1),n.links.prev="/?page="+(n.page-1))}function j(){setTimeout(function(){n.page+=1,i(),l()},1)}function k(){setTimeout(function(){n.page>1&&(n.page-=1,i(),l())},1)}function l(){d.parseFeed(n.page).then(function(a){console.log(a),n.feed=a})["catch"](function(a){console.log(a)})}function m(a){c.$broadcast("player-play",a)}var n=this;n.feed={},n.page=1,n.links={next:"/",prev:"/"},n.stripHtml=h,n.getImage=g,n.startPodcast=m,a.$on("main-next",function(a,b){j()}),a.$on("main-prev",function(a,b){k()}),f()}]),angular.module("clientApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").factory("feedManager",["$http","$timeout","$q",function(a,b,c){function d(g){if(0===f.episodes.length)return a.get("/api/feed/").then(function(a){return a.message&&"service not loaded"===a.message&&b(function(){d()},3e3),f=a.data,e(f,5*g-5,5*g)})["catch"](function(a){console.log(a)});var h=c.defer();return h.resolve(e(f,5*g-5,5*g)),h.promise}function e(a,b,c){return{episodes:a.episodes.slice(b,c),meta:a.meta}}var f={episodes:[],meta:{}};return{parseFeed:d}}]),angular.module("clientApp").controller("TitlebarCtrl",["$scope","auth","$window","$state","screenSize",function(a,b,c,d,e){function f(){h()}function g(){e.is("smartphones")?k.slideNavPanel=!k.slideNavPanel:k.isShowingLogin=!k.isShowingLogin}function h(){e.is("smartphones")&&(k.isCollapsed=!0),e.on("smartphones",function(a){k.isCollapsed=a})}function i(){k.isShowingLogin=!1,d.go("root.login")}function j(){k.isShowingLogin=!1,b.signOut(),d.go("root.dashboard")}var k=this;k.user=b.getAuth(),k.signOut=j,k.isShowingLogin=!1,k.goToLogin=i,k.isCollapsed=!1,k.slideNavPanel=!1,k.clickPower=g,e.rules={smartphones:"only screen and (max-width: 775px)"},c.firebase.auth().onAuthStateChanged(function(b){b?(k.user=b,a.$apply()):(k.user=null,a.$apply())}),f()}]),angular.module("clientApp").factory("firebaseSvc",["$window","$q",function(a,b){function c(a){var c=b.defer();return f.ref(a).once("value").then(function(a){c.resolve(a.val())}),c.promise}function d(){var b={apiKey:"AIzaSyAvbGaPlMAtBnnnAzkJRbpBmmmIMee-PEI",authDomain:"defenseofthepatience-b2b5f.firebaseapp.com",databaseURL:"https://defenseofthepatience-b2b5f.firebaseio.com",storageBucket:"defenseofthepatience-b2b5f.appspot.com",messagingSenderId:"45457898855"};e=a.firebase.initializeApp(b),g=a.firebase.storage(),f=a.firebase.database(),h=a.firebase.auth().onAuthStateChanged(function(a){i=a})}var e,f,g,h,i=null;return{initialize:d,getDatabaseOnce:c}}]),angular.module("clientApp").factory("auth",["$window",function(a){function b(a,b){return g.auth().createUserWithEmailAndPassword(a,b)["catch"](function(a){return console.log(a),null})}function c(a,b){return g.auth().signInWithEmailAndPassword(a,b)["catch"](function(a){return console.log(a),null})}function d(){return g.auth().signOut()}function e(){return g.auth().currentUser}function f(a){return g.auth().sendPasswordResetEmail(a)}var g=a.firebase;return{createUserAccount:b,signIn:c,signOut:d,getAuth:e,resetPassword:f}}]),angular.module("clientApp").controller("LoginCtrl",["$state","auth","$window","utils",function(a,b,c,d){function e(a){a&&(m.createMode?j():i())}function f(){m.createMode=!1,m.resetPasswordMode=!0}function g(){m.createMode=!1,m.resetPasswordMode=!1}function h(a){b.resetPassword(a).then(function(a){})["catch"](function(a){console.log(a),console.log("reset email error, object is:")})}function i(){b.signIn(m.userEmail,m.password).then(function(b){m.user=b,a.go("root.dashboard")})["catch"](function(a){console.log(a)})}function j(){b.createUserAccount(m.newUserEmail,m.newPassword).then(function(a){k(a,!0)})["catch"](function(a){console.log(a)})}function k(a,b){a.updateProfile({email:a.email,displayName:m.newUserDisplayName||""}).then(function(){i(),l(a,b)},function(a){console.log(a)})}function l(a,b){var e=d.makeServerTime(),f={email:a.email,displayName:m.newUserDisplayName||"",photoURL:a.photoURL||"",createdAt:e};b?c.firebase.database().ref("users/"+a.uid).set(f).then(function(){})["catch"](function(a){console.log(a)}):c.firebase.database().ref("users/"+a.uid).update(f).then(function(){})["catch"](function(a){console.log(a)})}var m=this;m.user=b.getAuth(),m.submitForm=e,m.createUser=j,m.updateProfile=k,m.resetPassword=f,m.cancelAction=g,m.login=i,m.forgotPassword=h,m.password="",m.userEmail="",m.newUserEmail="",m.newUserDisplayName="",m.resetEmail="",m.newPassword="",m.confirmPassword="",m.createMode=!1,m.resetPasswordMode=!1}]),angular.module("clientApp").factory("utils",["$window",function(a){function b(){var a=Date.now(),b=Math.floor(a/1e3);return b}function c(b,c){c||(c=a.location.href),b=b.replace(/[\[\]]/g,"\\$&");var d=new RegExp("[?&]"+b+"(=([^&#]*)|&|#|$)"),e=d.exec(c);return e?e[2]?decodeURIComponent(e[2].replace(/\+/g," ")):"":null}return{getParameterByName:c,makeServerTime:b}}]),angular.module("clientApp").controller("DotpeepsCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").controller("LadderCtrl",["firebaseSvc",function(a){function b(a,b){var c=parseInt(a.points),d=parseInt(b.points);return c>d?-1:1}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var c=this;c.ladder={players:[]},a.getDatabaseOnce("inhouse-ladder").then(function(a){console.log(a),c.ladder.players=a.sort(b)})}]),angular.module("clientApp").controller("MediaCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").factory("googleAnalytics",["$window","$location",function(a,b){function c(){!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),d()}function d(){var c=b.absUrl();c.indexOf("staging")>0||c.indexOf("localhost")>0?(console.log("got in staging"),a.ga("create","UA-92244858-1","auto")):(console.log("got in prod"),a.ga("create","UA-92244858-2","auto"))}function e(b){a.ga("send","pageview",b)}function f(b,c,d){a.ga("send","event",{eventCategory:b,eventAction:c,eventLabel:d})}return{init:c,trackPage:e,trackEvent:f}}]),angular.module("clientApp").controller("PlayerCtrl",["$rootScope","$state","$timeout","$scope","$sce",function(a,b,c,d,e){function f(){a.$broadcast("main-next",{})}function g(){a.$broadcast("main-prev",{})}function h(){"root.dashboard"===b.current.name&&(m.isDashboard=!0)}function i(){m.isPlaying=!1}function j(){l()}function k(a){m.API=a}function l(){m.config.sources!==[]&&(m.API.play(),m.isPlaying=!0)}var m=this;m.isOpen=!1,m.isPlaying=!1,m.isDashboard=!1,m.API=null,m.onPlayerReady=k,m.canPlay=j,m.onComplete=i,m.config={sources:[],theme:"bower_components/videogular-themes-default/videogular.css",plugins:{poster:"http://www.videogular.com/assets/images/videogular.png"},title:""},m.goNext=f,m.goPrev=g,d.$on("player-play",function(a,b){b&&(m.API.stop(),m.config.sources=[{src:e.trustAsResourceUrl(b.link),type:"audio/mp3"}],m.config.title=b.title)}),d.$on("$stateChangeSuccess",function(a){"root.dashboard"!==b.current.name?m.isDashboard=!1:m.isDashboard=!0}),h()}]),angular.module("clientApp").directive("player",function(){return{scope:{},templateUrl:"views/player.html",controller:"PlayerCtrl",controllerAs:"vm",restrict:"EA",bindToController:!0}}),angular.module("clientApp").filter("playerDate",["$filter","moment",function(a,b){var c=a("date");return function(a){var d=new Date(a),e=36e5;return 0>d-e?c(a,"mm:ss"):b(a).utc().format("hh:mm:ss")}}]),angular.module("clientApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/dotpeeps.html",'<div class=""> dotpeeps view </div>'),a.put("views/ladder.html",'<!-- \n<style>	\n	#ladder {	\n		font-family: "Impact",sans-serif;	 \n		border-collapse: collapse;	 	\n		width: 100%;	 	\n		text-align: center;	 	\n	}	 	\n	#ladder td { font-family: "Impact",sans-serif;	 \n		font-size: 1.5em;\n		border: none;	 	\n	}	 	\n	#ladder tr:hover{background-color: #f5f5f5}	 \n	#ladder a:link    {color:#999999; background-color:transparent; text-decoration:none}\n	#ladder a:visited {color:#999999; background-color:transparent; text-decoration:none}\n	#ladder a:hover   {color:#999999; background-color:transparent; text-decoration:underline}\n	#ladder a:active  {color:#999999; background-color:transparent; text-decoration:underline}\n}\n</style> --> <div class="main-wrapper"> <div> <h1>Rules</h1> <h2>Format</h2> <p> Every week on Wednesday starting at 9:00pm Eastern Time(USA) there will be (up to) 9 games that count towards our ladder (3 concurrent lobbies with 3 games each). Lobby 3 will be reserved for high skill players(4k+) while lobbies 1 and 2 will be for under 4k players. Once you have played in a game each night you are required to defer your spot in the following games to other players unless no other players are waiting to play. </p> <h2>Game Ruleset</h2> <p> <span>Mode:</span> Captains Mode <span>Server:</span> Lobbies must be USEast to make the games fair to both European friends and West Coasters. The server may be changed if both teams agree.<br> The lobby names will be DotP Inhouse #1 and DotP Inhouse #2 and the password will be dotp<br> <span>Advanced Settings:</span> No Cheats, Public Visibility, Starting team(First Pick) Random, No Penalties, No Leagues(for now), Spectators Enabled, 2 minutes DotATV delay, Unlimited Pauses, No Series<br> <span>Communication:</span> All Players are required to use the <a href="https://discord.gg/dotp">DotP Discord</a> You can either run this through a web browser or download the app (recommended) at <a href="www.discordapp.com">Discord</a> </p> <h2>Seasons</h2> <p> Every 3 months we will be resetting the DotPoints™ Ladder rankings and at the end of the season several prizes will be handed out in the form of steam gift cards<br> Players start with 1000 DotPoints™ Winning a game will Move your DotPoints™ up by 50 and losing will move them down by 50. Teams will be balanced by auto-balance with lobby host discretion. </p> <h2>Conduct</h2> <p> The most important thing about these in houses is to have fun and while we’re aware winning is fun to some people keep a few things in mind: <ol> <li>Do not Rage or Flame your teammates (Doing this will result in a single warning followed by a league ban)</li> <li>Don’t hog captains chair</li> <li>Be communicative with your team over picks/bans</li> </ol> </p> <h2>Stream</h2> <p> Admins will choose a lobby to <a href="https://www.twitch.tv/dotptv">stream</a> for each set of games and will usually be based around which games have the most new blood. </p> <h2>Prizes</h2> <p> 5 $20 steam gift cards and 1 $50 steam gift will be raffled off at the end of the season with “raffle tickets” being determined by the number of games you play.<br> The person on top of the leaderboard at the end of each season will have a different color for their name on the leaderboard for following seasons. </p> </div> <ul id="ladder-records"> <li class="records-header flex-parent"> <div id="players-header" class="records-column-main"> Players </div> <div class="records-column-alt"> <div id="wins-header" class="records-column"> Wins </div> <div id="losses-header" class="records-column"> Losses </div> <div id="players-header" class="records-column"> Points </div> </div> </li> <li ng-repeat="player in vm.ladder.players" style="font-family: \'Constantia, Arial, sans-serif\'" class="player flex-parent"> <div class="name records-column-main"> <a style="color:{{::player.color}}" ng-href="http://www.dotabuff.com/players/{{::player.playerId}}">{{::player.nickName}}</a> </div> <div class="records-column-alt"> <div class="wins records-column records-highlight"> {{::player.wins}} </div> <div class="losses records-column"> {{::player.losses}} </div> <div class="points records-column"> {{::player.points}} </div> </div> </li> </ul> <!-- <div class="">\n		<div class="entry-content">\n\n			<div id="expanding">\n				<h1>Rules</h1>\n				<p>\n					Format-<br>\n					Every week on Wednesday starting at 9:00pm Eastern Time(USA) there will be (up to) 9 games that count towards our ladder (3 concurrent lobbies with 3 games each). Lobby 3 will be reserved for high skill players(4k+) while lobbies 1 and 2 will be for under 4k players. Once you have played in a game each night you are required to defer your spot in the following games to other players unless no other players are waiting to play. \n				</p>\n				<p>\n					Game Ruleset-<br>\n					Mode:<br>\n					Captains Mode<br>\n					Server:<br>\n					Lobbies must be USEast to make the games fair to both European friends and West Coasters. The server may be changed if both teams agree.<br>\n					The lobby names will be DotP Inhouse #1 and DotP Inhouse #2 and the password will be dotp<br>\n					Advanced Settings:<br>\n					No Cheats, Public Visibility, Starting team(First Pick) Random, No Penalties, No Leagues(for now), Spectators Enabled, 2 minutes DotATV delay, Unlimited Pauses, No Series<br>\n					Communication:<br>\n					All Players are required to use discord <a href="https://discord.gg/dotp">https://discord.gg/dotp</a> You can either run this through a web browser or download the app (recommended)  at <a href="www.discordapp.com">www.discordapp.com</a>\n				</p>\n				<p>\n					Seasons-<br>\n					Every 3 months we will be resetting the DotPoints™ Ladder rankings and at the end of the season several prizes will be handed out in the form of steam gift cards<br>\n					Players start with 1000 DotPoints™ Winning a game will Move your DotPoints™ up by 50 and losing will move them down by 50. Teams will be balanced by auto-balance with lobby host discretion.\n				</p>\n				<p>\n					Conduct-<br>\n					The most important thing about these in houses is to have fun and while we’re aware winning is fun to some people keep a few things in mind:<br>\n					Do not Rage or Flame your teammates (Doing this will result in a single warning followed by a league ban)<br>\n					Don’t hog captains chair<br>\n					Be communicative with your team over picks/bans\n				</p>\n				<p>\n					Stream-<br>\n					Admins will choose a lobby to <a href="https://www.twitch.tv/dotptv">stream</a> for each set of games and will usually be based around which games have the most new blood.\n				</p>\n				<p>\n					Prizes-<br>\n					5 20$ steam gift cards and 1 50$ steam gift will be raffled off at the end of the season with “raffle tickets” being determined by the number of games you play.<br>\n					The person on top of the leaderboard at the end of each season will have a different color for their name on the leaderboard for following seasons.\n				</p>\n			</div>\n\n			<div class="clear"></div>\n		</div>\n	</div> --> <!-- <div id="ladder-records" class="records-color">\n		<div class="records-header flex-parent">\n			<div id="players-header" class="records-column-main">\n				Players\n			</div>\n			<div class="records-column-alt">\n				<div id="wins-header" class="records-column records-highlight">\n					Wins\n				</div>\n				<div id="losses-header" class="records-column">\n					Losses\n				</div>\n				<div id="players-header" class="records-column">\n					Points\n				</div>\n			</div>\n		</div>\n		<div ng-repeat="player in vm.ladder.players" style="font-family: \'Constantia, Arial, sans-serif\'" class="player flex-parent">\n			<div class="name records-column-main">\n				<a style="color:{{::player.color}}" ng-href="http://www.dotabuff.com/players/{{::player.playerId}}">{{::player.nickName}}</a>\n			</div>\n			<div class="records-column-alt">\n				<div class="wins records-column records-highlight">\n					{{::player.wins}}\n				</div>\n				<div class="losses records-column">\n					{{::player.losses}}\n				</div>\n				<div class="points records-column">\n					{{::player.points}}\n				</div>\n			</div>\n		</div>\n	</div> --> </div>'),a.put("views/login.html",'<div class="login-wrapper"> <div class="inner-login-wrapper"> <div class="logged-in-info" ng-if="vm.user"> <div class=""> Logged in as {{vm.user.email}} </div> </div> <form ng-if="!vm.user" name="loginForm" class="form login-form" ng-submit="vm.submitForm(loginForm.$valid)" novalidate> <div class="form-group" ng-if="!vm.createMode && !vm.resetPasswordMode"> <label for="userEmail">Email Address</label> <input class="" id="userEmail" type="email" name="userEmail" ng-model="vm.userEmail" required> <div ng-messages="loginForm.userEmail.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.userEmail.$touched">Email Address is required.</p> <p class="error-message" class="error-message" ng-message="email" ng-show="loginForm.userEmail.$touched">Must be valid email.</p> </div> </div> <div class="form-group" ng-if="!vm.createMode && !vm.resetPasswordMode"> <label for="password">Password</label> <input class="" type="text" name="password" id="password" ng-model="vm.password" required> <div ng-messages="loginForm.password.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.password.$touched">Password is required.</p> </div> </div> <div class="form-group" ng-if="vm.createMode"> <label for="newUserEmail">Email Address</label> <input class="" id="newUserEmail" type="text" name="newUserEmail" ng-model="vm.newUserEmail" required> <div ng-messages="loginForm.newUserEmail.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.newUserEmail.$touched">Email Address is required.</p> <p class="error-message" ng-message="email" ng-show="loginForm.newUserEmail.$touched">Must be valid email.</p> </div> </div> <div class="form-group" ng-if="vm.createMode"> <label for="newUserDisplayName">Display Name</label> <input class="" id="newUserDisplayName" type="text" name="newUserDisplayName" ng-model="vm.newUserDisplayName"> </div> <div class="form-group" ng-if="vm.createMode"> <label for="newPassword">Password</label> <input class="" type="text" id="newPassword" name="newPassword" ng-model="vm.newPassword" required> <div ng-messages="loginForm.newPassword.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.newPassword.$touched">Password is required.</p> </div> </div> <div class="form-group" ng-if="vm.createMode"> <label for="confirmPassword">Confirm Password</label> <input class="" type="text" id="confirmPassword" name="confirmPassword" ng-model="vm.confirmPassword" ng-pattern="{{vm.newPassword}}" required> <div ng-messages="loginForm.confirmPassword.$error"> <p class="error-message" ng-message="pattern" ng-show="loginForm.confirmPassword.$touched">Passwords do not match.</p> </div> </div> <div class="form-group" ng-if="vm.resetPasswordMode"> <label for="resetEmail">Email Address</label> <input class="" id="resetEmail" type="email" name="resetEmail" ng-model="vm.resetEmail" required> <div ng-messages="loginForm.resetEmail.$error"> <p class="error-message" ng-message="required" ng-show="loginForm.resetEmail.$touched">Email is required.</p> <p class="error-message" ng-message="email" ng-show="loginForm.resetEmail.$touched">Must be valid email.</p> </div> </div> <button ng-disabled="loginForm.$invalid" type="submit" class="cmdr-button" ng-if="!vm.createMode && !vm.resetPasswordMode"> LOGIN </button> <button type="submit" ng-click="vm.createMode = !vm.createMode" ng-if="!vm.createMode && !vm.resetPasswordMode"> REGISTER </button> <button ng-disabled="loginForm.$invalid" ng-if="vm.createMode"> CREATE </button> <button ng-disabled="loginForm.$invalid" ng-click="vm.forgotPassword()" ng-if="vm.resetPasswordMode"> SEND EMAIL </button> <button ng-click="vm.cancelAction()" ng-if="vm.createMode || vm.resetPasswordMode"> CANCEL </button> <div class="forgot-password" ng-click="vm.resetPassword()" ng-if="!vm.resetPasswordMode && !vm.createMode"> Forgot Password? </div> </form> </div> </div>'),a.put("views/main.html",'<div class="main-wrapper"> <ul> <li ng-repeat="episode in vm.feed.episodes"> <div class="podcast-container"> <div class="publish-date"><span class="episode-date">{{episode.date | date:\'mediumDate\' }}<span></span></span></div> <div class="episode-image"><img ng-src="{{vm.getImage(episode.date)}}" alt=""></div> <h2> <a ng-href="/episode/{{episode.guid}}">{{episode.title}}</a> </h2> </div> <div class="podcast-summary"> <p class="episode-description">{{vm.stripHtml(episode.summary)}}</p> </div> <div class="podcast-actions"> <a class="play-control" ng-click="vm.startPodcast(episode)"> <i class="fa fa-play"></i> <span class="play-text">Play</span> </a> <a ng-href="{{episode.link}}" class="download-control" download="{{episode.guid}}"> <i class="fa fa-cloud-download"></i> <span class="dl-text">Download</span> </a> <div class="share-control"> <i class="fa fa-share-alt"></i> <span class="share-text">Share</span> </div> </div> </li> </ul> </div>'),a.put("views/media.html",'<div class=""> media view </div>'),a.put("views/player.html",'<div class="player-wrapper" ng-class="{ \'open\': vm.isOpen }" ng-click="vm.isOpen = false"> <div class="player" ng-class="{ \'show-player\': vm.isPlaying }"> <div class="podcast-title"> <div class=""> {{vm.config.title}} </div> </div> <div class="videogular-container"> <videogular vg-player-ready="vm.onPlayerReady($API)" vg-can-play="vm.canPlay()" vg-complete="vm.onComplete()" vg-theme="vm.config.theme" class="audio" ng-click="$event.stopPropagation()"> <vg-media vg-src="vm.config.sources" vg-type="audio"> </vg-media> <vg-controls> <vg-play-pause-button></vg-play-pause-button> <vg-scrub-bar> <vg-scrub-bar-current-time></vg-scrub-bar-current-time> <vg-scrub-bar-buffer></vg-scrub-bar-buffer> </vg-scrub-bar> <vg-time-display class="time-holder">{{ currentTime | playerDate }} / {{ totalTime | date:\'hh:mm:ss\': \'UTC\' }}</vg-time-display> <vg-volume> <vg-volume-bar></vg-volume-bar> </vg-volume> </vg-controls> </videogular> </div> </div> <div id="paging" ng-class="{ \'is-playing\': vm.isPlaying }" ng-if="vm.isDashboard" ng-click="$event.stopPropagation()"> <div id="prev"> <a ng-click="vm.goPrev()"> <div class="prev-text">Newer</div> <i class="fa fa-chevron-left fa-2x"></i> </a> </div> <div id="next"> <a ng-click="vm.goNext()"> <i class="fa fa-chevron-right fa-2x"></i> <div class="next-text">Older</div> </a> </div> </div> </div>'),a.put("views/store.html",'<div id="store"> <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post"> <input type="hidden" name="cmd" value="_s-xclick"> <input type="hidden" name="hosted_button_id" value="UNN2RT6B455BG"> <table> <tr><td><input type="hidden" name="on0" value="Sizes">Sizes</td></tr><tr><td><select name="os0"> <option value="Small">Small </option> <option value="Medium">Medium </option> <option value="Large">Large </option> <option value="XL">XL </option> </select> </td></tr> </table> <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"> <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> </form> </div>'),a.put("views/titlebar.html",'<nav role="navigation"> <ul class="collapsed-nav" ng-class="{ \'is-showing-nav\': vm.slideNavPanel }"> <li ui-sref-active="active" ng-click="vm.slideNavPanel = false"> <a ui-sref="root.dotpeeps"><span>dotpeeps</span></a> </li> <li ui-sref-active="active" ng-click="vm.slideNavPanel = false"> <a ui-sref="root.ladder"><span>ladder</span></a> </li> <li ui-sref-active="active" ng-click="vm.slideNavPanel = false"> <a ui-sref="root.media"><span>media</span></a> </li> <li ui-sref-active="active" ng-click="vm.slideNavPanel = false"> <a ui-sref="root.about"><span>about</span></a> </li> <li ui-sref-active="active" ng-if="!vm.user" ui-sref="root.login" ng-click="vm.slideNavPanel = false"> <a ng-click="vm.goToLogin()" ui-sref="root.login"><span>Login</span></a> </li> <li ui-sref-active="active" ng-if="vm.user" ng-click="vm.slideNavPanel = false"> <a ng-click="vm.goToLogin()" ui-sref="root.login"><span>{{vm.user.displayName || vm.user.email}}</span></a> </li> <li ui-sref-active="active" ng-if="vm.user" ng-click="vm.slideNavPanel = false"> <a ng-click="vm.signOut()" ui-sref="root.dashboard"><span>Sign Out</span></a> </li> </ul> <ul class="nav" ng-class="{ \'collapsed\': vm.isCollapsed }"> <li ui-sref-active="active"> <header> <div class="left-stone">&nbsp;</div> <div class="right-stone">&nbsp;</div> <div class="center-stone"> <div class="center-left">&nbsp;</div> <div class="center-right">&nbsp;</div> <a ui-sref="root.dashboard" ng-click="vm.slideNavPanel = false"> <img class="logo" src="../images/newdotp.png" alt=""> </a> </div> </header> <a class="dotpeeps" ui-sref="root.dashboard" ng-click="vm.slideNavPanel = false"> <span class="defense">Defense</span> <div class="small-header"> <span class="defense-small">of</span> <span class="defense-small">the</span> </div> <span class="patience">Patience</span> </a> </li> <li ui-sref-active="active"> <a ui-sref="root.dotpeeps"><span>dotpeeps</span></a> </li> <li ui-sref-active="active"> <a ui-sref="root.ladder"><span>ladder</span></a> </li> <li ui-sref-active="active"> <a ui-sref="root.media"><span>media</span></a> </li> <li ui-sref-active="active"> <a ui-sref="root.about"><span>about</span></a> </li> <li class="action-wrapper"> <div class="power" ng-click="vm.clickPower()"> <i class="fa fa-power-off"></i> </div> <div class="hidden-login" ng-class="{ \'show-login\': vm.isShowingLogin }"> <a ng-if="!vm.user" ng-click="vm.goToLogin()" ui-sref="root.login"><span>Login</span></a> <a ng-if="vm.user" ng-click="vm.goToLogin()" ui-sref="root.login"><span>{{vm.user.displayName || vm.user.email}}</span></a> <a ng-if="vm.user" ng-click="vm.signOut()" ui-sref="root.dashboard"><span>Sign Out</span></a> </div> </li> </ul> </nav>')}]);