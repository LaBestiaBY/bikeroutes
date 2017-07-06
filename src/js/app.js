ymaps.ready(function () {
    console.log('map was loaded');

    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        type: "yandex#publicMap", //satellite", publicMap"
        // Карта будет создана без
        // элементов управления.
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

    myPlacemark = new ymaps.Placemark([55.76, 37.64], {
        hintContent: 'Москва!',
        balloonContent: 'Столица России'
    });

    myMap.geoObjects.add(myPlacemark);

});