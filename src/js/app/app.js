define(['modules/map', 'modules/menu', 'modules/dataLoader', 'modules/geoObjectInfoWindow', 'modules/ratingManager', 'fb'],
    function (map, menu, dataloder, infoWindow, ratingManager, fb) {
        return {
            init: function () {
                fb.init();
                ratingManager.init();
                map.init('#yandex-map');
                dataloder.init('data/data.json');
                infoWindow.init('#info-window-container');
                menu.init('.main-menu');

            }
        };
    });