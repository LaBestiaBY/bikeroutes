define(['modules/Map', 'modules/Menu'],
    function (map, menu) {
        return {
            init: function () {
                map.init('#yandex-map');
                menu.init('.main-menu');
            }
        };
    });