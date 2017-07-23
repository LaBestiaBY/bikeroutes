define(['modules/Map', 'modules/Menu', 'modules/DataLoader', 'fb'],
    function (map, menu, dataloder, fb) {
        return {
            init: function () {
                fb.init();
                map.init('#yandex-map');
                dataloder.init('data/data.json');
                menu.init('.main-menu');
            }
        };
    });