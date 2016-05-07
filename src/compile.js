const compile = (el, scope) => {
    let $scope, $compile, $timeout;

    angular.mock.inject((_$rootScope_, _$compile_, _$timeout_) => {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $timeout = _$timeout_;
    });

    $scope = angular.extend($scope, scope);
    let compiledEl = $compile(el)($scope);
    try { $timeout.flush() } catch (e) {}
    $scope.$digest();

    const destroy = () => {
        $scope.$destroy();
        compiledEl.remove();
        $scope = null;
        $compile = null;
        $timeout = null;
    };

    const update = (scope) => {
        if (scope) {
            $scope = angular.extend($scope, scope);
        }
        $scope.$digest();
        try { $timeout.flush() } catch (e) {}
    };

    return {
        el: compiledEl,
        scope: $scope,
        update,
        destroy
    };
};

export {compile};