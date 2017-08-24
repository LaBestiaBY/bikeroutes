define(function () {

    return {

        GEO_OBJECTS_TYPES : {
            ROUTE: 'route',
            PLACEMARK: 'placemark'
        },

        MARKER : {
            SMALL: {
                RED: [[4, 102], [24, 132]],
                BLUE: [[26, 102], [46, 132]],
                GREEN: [[48, 102], [68, 132]],
                YELLOW: [[70, 102], [90, 132]],
                PURPLE: [[92, 102], [112, 132]],
                SIZE: [20, 30],
                OFFSET: [-10, -30]
            },
            MEDIUM: {
                RED: [[3, 58], [30, 98]],
                BLUE: [[33, 58], [59, 98]],
                GREEN: [[62, 58], [88, 98]],
                YELLOW: [[91, 58], [117, 98]],
                PURPLE: [[120, 58], [146, 98]],
                SIZE: [27, 40],
                OFFSET: [-14, -40]
            },
            LARGE: {
                RED: [[0, 0], [36, 55]],
                BLUE: [[40, 0], [76, 55]],
                GREEN: [[119, 0], [156, 55]],
                YELLOW: [[119, 0], [156, 55]],
                PURPLE: [[159, 0], [195, 55]],
                SIZE: [36, 55],
                OFFSET: [-18, -55]
            }
        },

        ROUTE : {
            SMALL: {
                SIZE: 2
            },
            MEDIUM: {
                SIZE: 3
            },
            LARGE: {
                SIZE: 4
            }

        }

    }

});