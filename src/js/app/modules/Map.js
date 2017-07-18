define(['ymaps', 'jquery', 'eventManager'], function (ymaps, $, eventManager) {

    var GEO_OBJECTS_TYPES = {
        ROUTE: 'route',
        PLACEMARK: 'placemark'
    };

    var Map = function () {
        this.geoObjects = [];
    };

    Map.prototype = {

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

            ymaps.ready(this.mapReadyHandler);
            eventManager.subscribe('data_loaded', this.dataLoadedHandler);
        },

        /**
         *
         */
        render: function () {

                console.log('map was loaded');

                this.myMap = new ymaps.Map(this.mapContainer, {
                    center: [53.9, 27.56],
                    zoom: 11,
                    // type: "yandex#publicMap", //satellite", publicMap"
                    controls: []
                });

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
        renderGeoObjects: function(geoObjects)
        {
            // console.log(geoObjects[0].geometry.coordinates);

            geoObjects.map(function (geoObj) {

                if (geoObj.type === GEO_OBJECTS_TYPES.ROUTE) {
                    // Добавление линии на карту
                    this.myMap.geoObjects.add(new ymaps.Polyline(geoObj.geometry.coordinates, {
                            /* Свойства линии:
                             - балун ломаной */
                            balloonContent: geoObj.properties.description
                        }, {
                            /* Опции линии:
                             - отключение кнопки закрытия балуна */
                            balloonCloseButton: true,
                            // - цвет  и прозрачность линии
                            strokeColor: "0000FF55",
                            // - ширина линии
                            strokeWidth: geoObj.properties['stroke-width']
                        }
                    ));
                }

                if (geoObj.type === GEO_OBJECTS_TYPES.PLACEMARK) {

                    this.myMap.geoObjects.add(new ymaps.Placemark(geoObj.geometry.coordinates, {
                            balloonContent: '<img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />',
                            iconContent: geoObj.properties.iconContent
                        }, {
                            preset: geoObj.properties.preset,
                            // Отключаем кнопку закрытия балуна.
                            balloonCloseButton: false,
                            // Балун будем открывать и закрывать кликом по иконке метки.
                            hideIconOnBalloonOpen: false
                        }
                    ));

                }

            }.bind(this));

            this.myMap.setBounds(this.myMap.geoObjects.getBounds());

            // console.log(this.myMap.geoObjects.getLength());

            // this.myMap.geoObjects.remove( this.myMap.geoObjects.get(2) );
            // this.myMap.geoObjects.remove( this.myMap.geoObjects.get(1) );
            // this.myMap.geoObjects.remove( this.myMap.geoObjects.get(0) );

            // this.myMap.geoObjects.get(1).properties.strokeColor = "0000FFFF";


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

            this.geoObjects = data;
            this.renderGeoObjects(this.geoObjects);
        }

    };

    return new Map();

});