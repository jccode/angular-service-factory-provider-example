
angular.module("app", [])
    .service('greetingService', function() {
        var greeting = "hello, ";
        this.hello = function(name) {
            return greeting + name + "!";
        };
    })

    .factory('greetingFactory', function() {
        var Greeting = function() {
            var greeting = "hello, ";
            this.hello = function(name) {
                return greeting + name + "!";
            };
        };
        return new Greeting();
    })

    .provider('greeting', function() {
        this.greeting = "hello, ";
        this.$get = function() {
            var provider = this;
            var Greeting = function() {
                this.hello = function(name) {
                    return provider.greeting + name + "!";
                };
            };
            return new Greeting();
        };
    })

    .config(function(greetingProvider) {
        greetingProvider.greeting = "fuck, ";
    })

    .controller('appCtrl', function($scope, greetingService, greetingFactory, greeting) {
        $scope.$watch('name', function() {
            $scope.name_from_service = greetingService.hello($scope.name || '');
            $scope.name_from_factory = greetingFactory.hello($scope.name || '');
            $scope.name_from_provider = greeting.hello($scope.name || '');
        });
    })
;
