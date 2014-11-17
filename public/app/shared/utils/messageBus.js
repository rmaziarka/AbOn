/**
 * Created by mazia_000 on 2014-08-19.
 */
angular.module('abon')
    .factory('messageBus', function ($rootScope) {
        var msgBus = {};
        msgBus.emitMsg = function (msg, data) {
            data = data || {};
            $rootScope.$emit(msg, data);
        };
        msgBus.onMsg = function (msg, func, scope) {
            $rootScope.$on(msg, func);
        };
        return msgBus;
    });