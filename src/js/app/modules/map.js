define(['ymaps', 'jquery', 'eventManager'], function (ymaps, $, eventManager) {

    var GEO_OBJECTS_TYPES = {
        ROUTE: 'route',
        PLACEMARK: 'placemark'
    };

    return {

        geoObjects:[],

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

            ymaps.ready(this.mapReadyHandler);
            eventManager.subscribe('data_loaded', this.dataLoadedHandler);
            eventManager.subscribe('menu_changed', this.menuChangeHandler);
        },

        /**
         *
         */
        render: function () {
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
            geoObjects.map(function (geoObj) {
                this.myMap.geoObjects.add(geoObj.instance);
            }.bind(this));
            this.myMap.setBounds(this.myMap.geoObjects.getBounds());
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

            this.renderGeoObjects(this.geoObjects);

            this.myMap.geoObjects.events.add('click', function (e) {
                console.log('Дошло до коллекции объектов карты');
                // Получение ссылки на дочерний объект, на котором произошло событие.
                console.log(e.get('target'));
            });
        },

        /**
         *
         * @param object
         * @returns {ymaps.Polyline}
         */
        createRoute: function (object) {
            return new ymaps.Polyline(object.coordinates, {
                    balloonContent: object.properties.description
                }, {
                    balloonCloseButton: true,
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
                    balloonContent: object.properties.iconContent,
                    iconContent: object.properties.iconContent
                }, {
                    preset: 'islands#glyphIcon', //object.properties.preset, 'islands#glyphCircleIcon',
                    iconGlyph: 'wrench',
                    // iconGlyphColor: 'green', // цвет глифа
                    // iconColor: 'green', // цвет самой метки
                    balloonCloseButton: true,
                    hideIconOnBalloonOpen: false
                }
            )
        },

        /**
         *
         * @param kind
         */
        showGeoObjects: function (kind) {
            // console.log('showGeoObject', kind);
            // console.log(this.geoObjects);
            this.geoObjects.map(function (geoObject) {
                if (geoObject.kind === kind)
                {
                    this.myMap.geoObjects.add(geoObject.instance);
                    console.log('added ' + geoObject.kind + ' to map');
                }
            }.bind(this));
        },

        /**
         *
         * @param kind
         */
        hideGeoObjects: function (kind) {
            // console.log('hideGeoObjects', kind);
            this.geoObjects.map(function (geoObject) {
                if (geoObject.kind === kind)
                {
                    this.myMap.geoObjects.remove( geoObject.instance );
                    console.log('removed ' + geoObject.kind + ' from map');
                }
            }.bind(this));
        },

        /**
         *
         */
        mapReady: function () {
            this.render();

            /*var myPlacemark1 = new ymaps.Placemark([27.54613187718493,
                53.91824749634943], {}, {
                iconLayout: 'default#image',
                iconImageClipRect: [[0,0], [30, 35]],
                iconImageHref: 'img/markers.png',
                iconImageSize: [30, 35],
                iconImageOffset: [-15, -35]
            });

            this.myMap.geoObjects.add(myPlacemark1);

            var myPlacemark2 = new ymaps.Placemark([27.55613187718493,
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
                // console.log(data.kind + " is visible now");
                this.showGeoObjects(data.kind);
            } else {
                // console.log(data.kind + " is invisible now");
                this.hideGeoObjects(data.kind);
            }
        }
    };
});