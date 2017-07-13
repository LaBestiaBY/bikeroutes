define(['modules/Map', 'modules/Menu'],
    function (map, menu) {
        return {
            init: function () {
                map.init();
                menu.init();
            }
        };
    });