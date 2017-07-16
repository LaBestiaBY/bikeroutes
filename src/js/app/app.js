define(['modules/Map', 'modules/Menu', 'modules/DataLoader'],
    function (map, menu, dataloder) {
        return {
            init: function () {
                map.init('#yandex-map');
                dataloder.init('data/routes.json');
                menu.init('.main-menu');
            }
        };
    });