define(['ymaps', 'jquery', 'eventManager', 'modules/geoObjectInfoWindow', 'modules/ratingManager'], function (ymaps, $, eventManager, infoWindow, ratingManager) {

    var GEO_OBJECTS_TYPES = {
        ROUTE: 'route',
        PLACEMARK: 'placemark'
    };

    var BOUNDS = {
        TOP_LEFT: [27.453942944772024, 53.95613677591413],
        BOTTOM_RIGHT: [27.600544533806133, 53.842840768069784]
    };

    var MARKER = {
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
    };

    var ROUTE = {
        MEDIUM: {
            SIZE: 0
        },
        LARGE: {
            SIZE: 1
        }

    };

    return {

        geoObjects: [],
        displaySettings: {},
        geoobjectsCreated: false,
        displaySettingsLoaded: false,

        /**
         *
         */
        init: function (containerSelector) {
            this.mapContainer = containerSelector.slice(1);
            this.setupHandlers();
        },

        /**
         *
         */
        setupHandlers: function () {

            this.mapReadyHandler = this.mapReady.bind(this);
            this.dataLoadedHandler = this.dataLoaded.bind(this);
            this.menuChangeHandler = this.menuChange.bind(this);
            this.userSettingsSetHandler = this.userSettingsSet.bind(this);
            this.ratingsUpdatedHandler = this.ratingsUpdated.bind(this);

            ymaps.ready(this.mapReadyHandler);
            eventManager.subscribe('data_loaded', this.dataLoadedHandler);
            eventManager.subscribe('menu_changed', this.menuChangeHandler);
            eventManager.subscribe('user_settings_set', this.userSettingsSetHandler);
            eventManager.subscribe('ratings_updated', this.ratingsUpdatedHandler);
        },

        /**
         *
         */
        render: function () {
            this.myMap = new ymaps.Map(this.mapContainer, {
                center: [53.9, 27.56],
                zoom: 11,
                controls: []
            });

            this.myMap.setBounds([BOUNDS.TOP_LEFT, BOUNDS.BOTTOM_RIGHT]);


            ymaps.route([[27.576869587333135, 53.921639713562904],
                [27.577776, 53.915586]], {
                multiRoute: true,
                mapStateAutoApply: true,
                routingMode: "pedestrian"
            }).done(function (route) {
                console.log('getActiveRoute getPaths getLength ', route.getActiveRoute().getPaths().getLength());
                var coord = route.getActiveRoute().getPaths().get(0).getSegments().get(0).geometry._coordPath._coordinates;
                console.log('getActiveRoute getSegments [0] ', coord);
                var routeObj = {
                        coordinates: coord,
                        properties: {
                            id:'mr3458939',
                            name:'Маршрут из точки А в точку Б',
                            description:'Маршрут, построенный автоматически',
                            'stroke-width': '5'
                        }
                };

                var poliByRoute = this.createRoute(routeObj, 'MEDIUM');

                this.myMap.geoObjects.add(poliByRoute);
            }.bind(this), function (err) {
                throw err;
            }, this);

            eventManager.dispatch('map_rendered');
        },

        /**
         *
         * @param geoObjects
         */
        renderGeoObjects: function (geoObjects) {
            geoObjects.map(function (geoObj) {
                if (this.displaySettings[geoObj.kind]) {
                    if (this.myMap.geoObjects.indexOf(geoObj.instance) === -1) {
                        if (ratingManager.getRating(geoObj.instance.properties.get('id')) > 50) {
                            geoObj.instance = geoObj.instanceLarge;
                        }
                        if (ratingManager.getRating(geoObj.instance.properties.get('id')) <= 50 && ratingManager.getRating(geoObj.instance.properties.get('id')) >= 0) {
                            geoObj.instance = geoObj.instanceMedium;
                        }
                        if (ratingManager.getRating(geoObj.instance.properties.get('id')) < 0) {
                            geoObj.instance = geoObj.instanceSmall;
                        }
                        this.myMap.geoObjects.add(geoObj.instance);
                    }
                } else {
                    this.myMap.geoObjects.remove(geoObj.instance);
                }
            }.bind(this));
            eventManager.dispatch('geoobjects_rendered');
        },

        /**
         *
         * @param data
         */
        createGeoObjects: function (data) {
            data.map(function (object) {
                if (object.type === GEO_OBJECTS_TYPES.ROUTE) {
                    this.geoObjects.push({
                        kind: object.kind,
                        instance: this.createRoute(object, 'MEDIUM'),
                        instanceSmall: this.createRoute(object, 'SMALL'),
                        instanceMedium: this.createRoute(object, 'MEDIUM'),
                        instanceLarge: this.createRoute(object, 'LARGE')
                    });
                }
                if (object.type === GEO_OBJECTS_TYPES.PLACEMARK) {
                    this.geoObjects.push({
                        kind: object.kind,
                        instance: this.createPlacemark(object, 'MEDIUM'),
                        instanceSmall: this.createPlacemark(object, 'SMALL'),
                        instanceMedium: this.createPlacemark(object, 'MEDIUM'),
                        instanceLarge: this.createPlacemark(object, 'LARGE')
                    });
                }
            }.bind(this));

            this.geoobjectsCreated = true;

            if (this.displaySettingsLoaded) {
                this.renderGeoObjects(this.geoObjects);
            }

            this.myMap.geoObjects.events.add('click', function (e) {
                infoWindow.show(e.get('target').properties.get('name'), e.get('target').properties.get('description'), e.get('target').properties.get('id'));
            });
        },

        /**
         *
         * @param object
         * @param size
         * @returns {ymaps.Polyline}
         */
        createRoute: function (object, size) {
            return new ymaps.Polyline(object.coordinates, {
                    id: object.properties.id,
                    name: object.properties.name,
                    description: object.properties.description
                }, {
                    strokeColor: "0000FF88",
                    strokeWidth: object.properties['stroke-width']
                }
            )
        },

        /**
         *
         * @param object
         * @param size
         * @returns {ymaps.Placemark}
         */
        createPlacemark: function (object, size) {
            return new ymaps.Placemark(object.coordinates, {
                    id: object.properties.id,
                    name: object.properties.name,
                    description: object.properties.description
                }, {
                    iconLayout: 'default#image',
                    iconImageClipRect: MARKER[size][object.properties.color],
                    iconImageHref: 'img/markers_sprite.png',
                    iconImageSize: MARKER[size].SIZE,
                    iconImageOffset: MARKER[size].OFFSET
                }
            )
        },

        /**
         *
         * @param kind
         */
        showGeoObjects: function (kind) {
            this.geoObjects.map(function (geoObject) {
                if (geoObject.kind === kind) {
                    this.myMap.geoObjects.add(geoObject.instance);
                }
            }.bind(this));
        },

        /**
         *
         * @param kind
         */
        hideGeoObjects: function (kind) {
            this.geoObjects.map(function (geoObject) {
                if (geoObject.kind === kind) {
                    this.myMap.geoObjects.remove(geoObject.instance);
                }
            }.bind(this));
        },

        /**
         *
         */
        mapReady: function () {
            this.render();
        },

        /**
         *
         */
        dataLoaded: function (data) {
            this.createGeoObjects(data);
        },

        /**
         *
         */
        menuChange: function (data) {
            if (data.checked) {
                this.showGeoObjects(data.kind);
            } else {
                this.hideGeoObjects(data.kind);
            }
        },

        /**
         *
         * @param data
         */
        userSettingsSet: function (data) {
            this.displaySettings = data;
            this.displaySettingsLoaded = true;

            if (this.geoobjectsCreated) {
                this.renderGeoObjects(this.geoObjects);
            }
        },

        /**
         *
         */
        ratingsUpdated: function () {
            if (this.geoobjectsCreated) {
                this.myMap.geoObjects.removeAll();
                this.renderGeoObjects(this.geoObjects);
            }
        }
    };
});