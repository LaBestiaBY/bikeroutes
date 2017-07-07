ymaps.ready(function () {
    console.log('map was loaded');

    var myMap = new ymaps.Map("map", {
        center: [53.9, 27.56],
        zoom: 11,
        type: "yandex#publicMap", //satellite", publicMap"
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

});