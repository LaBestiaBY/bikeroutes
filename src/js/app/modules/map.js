define(['ymaps', 'jquery', 'eventManager', 'modules/geoObjectInfoWindow'], function (ymaps, $, eventManager, infoWindow) {

    var GEO_OBJECTS_TYPES = {
        ROUTE: 'route',
        PLACEMARK: 'placemark'
    };

    return {

        geoObjects: [],
        displaySettings: {},
        geoobjectsCreated:false,
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

            ymaps.ready(this.mapReadyHandler);
            eventManager.subscribe('data_loaded', this.dataLoadedHandler);
            eventManager.subscribe('menu_changed', this.menuChangeHandler);
            eventManager.subscribe('user_settings_set', this.userSettingsSetHandler);
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

            this.myMap.setBounds([
                [
                    27.453942944772024,
                    53.95613677591413
                ],
                [
                    27.600544533806133,
                    53.842840768069784
                ]]);


            eventManager.dispatch('map_rendered');

            /*

             велосипед
             fa-bicycle

             компас (ваше местоположение)
             fa-compass

             еда
             fa-cutlery

             настройки
             fa-cogs

             магазин
             fa-shopping-cart

             иконка выпадающего списка
             fa-sort-desc

             лайк
             fa-thumbs-o-up

             разводной ключ
             fa-wrench

             кафе
             fa-coffee



             */

        },

        /**
         *
         * @param geoObjects
         */
        renderGeoObjects: function (geoObjects) {
            geoObjects.map(function (geoObj) {
                if (this.displaySettings[geoObj.kind]) {
                    if (this.myMap.geoObjects.indexOf(geoObj.instance) === -1) {
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
                        instance: this.createRoute(object)
                    });
                }
                if (object.type === GEO_OBJECTS_TYPES.PLACEMARK) {
                    this.geoObjects.push({
                        kind: object.kind,
                        instance: this.createPlacemark(object)
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
         * @returns {ymaps.Polyline}
         */
        createRoute: function (object) {
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
         * @returns {ymaps.Placemark}
         */
        createPlacemark: function (object) {
            return new ymaps.Placemark(object.coordinates, {

                    id: object.properties.id,
                    name: object.properties.name,
                    description: object.properties.description
                }, {
                    preset: 'islands#glyphIcon', //object.properties.preset, 'islands#glyphCircleIcon',
                    iconGlyph: 'wrench'
                    // iconGlyphColor: 'green', // цвет глифа
                    // iconColor: 'green', // цвет самой метки
                    // balloonCloseButton: true,
                    // hideIconOnBalloonOpen: false
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

            var myPlacemark1 = new ymaps.Placemark([27.54613187718493,
             53.91824749634943], {}, {
             iconLayout: 'default#image',
             iconImageClipRect: [[3,58], [30, 98]],
             iconImageHref: 'img/markers_sprite.png',
             iconImageSize: [27, 40],
             iconImageOffset: [-14, -40]
             });

             this.myMap.geoObjects.add(myPlacemark1);

             /*var myPlacemark2 = new ymaps.Placemark([27.55613187718493,
             53.91824749634943], {}, {
             iconLayout: 'default#image',
             iconImageClipRect: [[30,0], [54, 28]],
             iconImageHref: 'img/markers.png',
             iconImageSize: [24, 28],
             iconImageOffset: [-12, -28]
             });

             this.myMap.geoObjects.add(myPlacemark2);*/
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
        }
    };
});