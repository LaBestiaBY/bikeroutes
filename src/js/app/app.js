define(['modules/map', 'modules/menu', 'modules/dataLoader', 'modules/geoObjectInfoWindow', 'fb'],
    function (map, menu, dataloder, infoWindow, fb) {
        return {
            init: function () {
                fb.init();
                map.init('#yandex-map');
                dataloder.init('data/data.json');
                infoWindow.init('#info-window-container');
                menu.init('.main-menu');
            }
        };
    });