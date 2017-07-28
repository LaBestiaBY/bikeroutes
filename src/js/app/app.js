define(['modules/map', 'modules/menu', 'modules/dataLoader', 'modules/geoObjectInfoWindow', 'modules/ratingManager', 'modules/settingsManager', 'fb'],
    function (map, menu, dataloder, infoWindow, ratingManager, settingsManager, fb) {
        return {
            init: function () {
                fb.init();
                ratingManager.init();
                settingsManager.init();
                map.init('#yandex-map');
                dataloder.init('data/data.json');
                infoWindow.init('#info-window-container');
                menu.init('.main-menu');

            }
        };
    });