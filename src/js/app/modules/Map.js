define(['ymaps', 'jquery'], function (ymaps, $) {

    var Map = function () {
         // console.log(ymaps);
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

            ymaps.ready(this.mapReadyHandler.bind(this));

        },

        /**
         *
         */
        render: function () {

                console.log('map was loaded');

                var myMap = new ymaps.Map(this.mapContainer, {
                    center: [53.9, 27.56],
                    zoom: 11,
                    // type: "yandex#publicMap", //satellite", publicMap"
                    controls: []
                });



                /*var myIconContentLayout = ymaps.templateLayoutFactory.createClass('<div class="square_layout"></div>');

                 var squarePlacemark = new ymaps.Placemark(
                 [55.725118, 37.682145], {
                 hintContent: 'Метка с прямоугольным макетом'
                 }, {
                 iconLayout: myIconContentLayout,
                 // Описываем фигуру активной области
                 // "Прямоугольник".
                 iconShape: {
                 type: 'Rectangle',
                 // Прямоугольник описывается в виде двух
                 // точек - верхней левой и нижней правой.
                 coordinates: [
                 [-25, -25], [25, 25]
                 ]
                 }
                 }
                 );

                 myMap.geoObjects.add(squarePlacemark);*/

                myPlacemark = new ymaps.Placemark([53.9, 27.56], {
                    hintContent: 'Москва!',
                    balloonContent: 'Столица России'
                });

                myMap.geoObjects.add(myPlacemark);




                var myCoords = [53.9, 27.56];
                myMap.geoObjects.add(
                    new ymaps.Placemark(myCoords,
                        {iconContent: 'Где метро?'},
                        {preset: 'islands#greenStretchyIcon'}
                    )
                );
                var myGeocoder = ymaps.geocode(myCoords, {kind: 'metro'});
                myGeocoder.then(
                    function (res) {
                        var nearest = res.geoObjects.get(0);
                        var name = nearest.properties.get('name');
                        nearest.properties.set('iconContent', name);
                        nearest.options.set('preset', 'islands#redStretchyIcon');
                        myMap.geoObjects.add(res.geoObjects);
                    },
                    function (err) {
                        alert('Ошибка');
                    }
                );

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

                jQuery.getJSON('data/data.json', function (json) {
                    /** Сохраним ссылку на геообъекты на случай, если понадобится какая-либо постобработка.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml
                     */
                    var geoObjects = ymaps.geoQuery(json);
                    /*    .addToMap(myMap)
                     .applyBoundsToMap(myMap, {
                     checkZoomRange: true
                     });*/

                    geoObjects.addEvents('click', function () {
                        console.log('click!');
                    });

                    console.log(geoObjects._objects[0].geometry);//.properties._data["stroke-width"] = 15);

                    var polyline = new ymaps.Polyline(geoObjects._objects[0].geometry);
                    // polyline.options.openBalloonOnClick = true;
                    // polyline.options.openEmptyBalloon = true;
                    polyline.options.visible = false;
                    myMap.geoObjects.add(polyline);
                    myMap.setBounds(polyline.geometry.getBounds());
                    polyline.options.visible = false;


                    var myPolyline  = new ymaps.Polyline([
                            // Координаты вершин ломаной
                            [
                                27.453939142374935,
                                53.95613211436579
                            ],
                            [
                                27.45407124116888,
                                53.95618550366466
                            ],
                            [
                                27.454181882290744,
                                53.95624205670665
                            ],
                            [
                                27.454242567269716,
                                53.95627903365033
                            ],
                            [
                                27.454265701322477,
                                53.9563223381654
                            ],
                            [
                                27.454240555612948,
                                53.95636247883653
                            ],
                            [
                                27.454188587813317,
                                53.95639312809859
                            ],
                            [
                                27.454120191483415,
                                53.95639708283404
                            ],
                            [
                                27.454051795153514,
                                53.95638521861203
                            ],
                            [
                                27.45399680986873,
                                53.956348044020224
                            ],
                            [
                                27.45396328225608,
                                53.95630137800386
                            ],
                            [
                                27.453947189001976,
                                53.95622386483109
                            ],
                            [
                                27.45394182458395,
                                53.95614951533237
                            ],
                            [
                                27.45391768470283,
                                53.956103640041086
                            ],
                            [
                                27.45322567477699,
                                53.95548985540004
                            ],
                            [
                                27.452791156916447,
                                53.95523358177933
                            ],
                            [
                                27.451991858630006,
                                53.954787472122874
                            ],
                            [
                                27.451299848704167,
                                53.95413886442308
                            ],
                            [
                                27.45100212350342,
                                53.95386676254693
                            ],
                            [
                                27.450913610605934,
                                53.953752858913944
                            ],
                            [
                                27.450800957827305,
                                53.953570928851754
                            ],
                            [
                                27.450693669466727,
                                53.953404818098534
                            ],
                            [
                                27.450589063315135,
                                53.9533193894523
                            ],
                            [
                                27.450497868208636,
                                53.953259272892126
                            ],
                            [
                                27.45032620683169,
                                53.95319915624491
                            ],
                            [
                                27.450106265692455,
                                53.95311847322848
                            ],
                            [
                                27.44983804479098,
                                53.95301722374478
                            ],
                            [
                                27.44975489631152,
                                53.95296976296426
                            ],
                            [
                                27.449701252131206,
                                53.952914391985075
                            ],
                            [
                                27.44963151469681,
                                53.95283370842602
                            ],
                            [
                                27.449368658213366,
                                53.95239706526773
                            ],
                            [
                                27.449277463106817,
                                53.95223569596339
                            ],
                            [
                                27.449247958807646,
                                53.95215184696897
                            ],
                            [
                                27.449258687643724,
                                53.95209489283842
                            ],
                            [
                                27.44931769624204,
                                53.951878150015936
                            ],
                            [
                                27.44931233182401,
                                53.951829105862586
                            ],
                            [
                                27.449293556360896,
                                53.951781643723514
                            ],
                            [
                                27.449253323225673,
                                53.95173418153018
                            ],
                            [
                                27.449076297430697,
                                53.951530093480436
                            ],
                            [
                                27.44907093301267,
                                53.9514921235
                            ],
                            [
                                27.449089708475764,
                                53.95141301926255
                            ],
                            [
                                27.44908702626665,
                                53.95129752678701
                            ],
                            [
                                27.44904411092241,
                                53.95119785495584
                            ],
                            [
                                27.448974373488017,
                                53.95109976498359
                            ],
                            [
                                27.44884562745531,
                                53.95098901796213
                            ],
                            [
                                27.448808076529048,
                                53.95093206223241
                            ],
                            [
                                27.4488188053651,
                                53.950870360107615
                            ],
                            [
                                27.448864402918375,
                                53.95081815054577
                            ],
                            [
                                27.448979737905994,
                                53.95075486614035
                            ],
                            [
                                27.44903069987722,
                                53.950724805999414
                            ],
                            [
                                27.44912189498372,
                                53.95063620760557
                            ],
                            [
                                27.449183585791047,
                                53.95055710173698
                            ],
                            [
                                27.449239912180378,
                                53.95046059237316
                            ],
                            [
                                27.449277463106586,
                                53.950359336405974
                            ],
                            [
                                27.449304285196718,
                                53.950254915931126
                            ],
                            [
                                27.44931769624181,
                                53.95014733092473
                            ],
                            [
                                27.449331107286877,
                                53.95004290991657
                            ],
                            [
                                27.449336471704903,
                                53.94997013148283
                            ],
                            [
                                27.449365976004074,
                                53.9499147565021
                            ],
                            [
                                27.449403526930155,
                                53.94984514211769
                            ],
                            [
                                27.450851490761142,
                                53.949339260689825
                            ],
                            [
                                27.451937785412177,
                                53.94889625204318
                            ],
                            [
                                27.454075505997018,
                                53.947946931866035
                            ],
                            [
                                27.45690791871666,
                                53.94663050530286
                            ]
                        ], {
                            /* Свойства линии:
                             - балун ломаной */
                            balloonContent: "Велосипедная дорожка"
                        }, {
                            /* Опции линии:
                             - отключение кнопки закрытия балуна */
                            balloonCloseButton: false,
                            // - цвет  и прозрачность линии
                            strokeColor: "0000FF55",
                            // - ширина линии
                            strokeWidth: 5
                        }
                    );

                    // Добавление линии на карту
                    myMap.geoObjects.add(myPolyline);
                    //myMap.setBounds(myPolyline.geometry.getBounds());
                });

        },

        /**
         *
         */
        mapReadyHandler: function () {
            this.render();
        }

    };

    return new Map();

});