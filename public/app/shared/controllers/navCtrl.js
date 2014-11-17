angular.module("abon")
    .controller("navCtrl", function() {
        var self = this;
        self.isCollapsed = true;

        self.toggleCollapsed = function(){
            self.isCollapsed = !self.isCollapsed;
        };
    });