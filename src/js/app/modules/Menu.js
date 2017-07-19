define(['underscore', 'jquery', 'text!../../../html_templates/tmpl_main_menu.html'], function (_, $, htmlStr)
{
    var Menu = function()
    {

    };

    Menu.prototype = {

        /**
         *
         */
        init: function (containerSelector) {
            this.containerSelector = containerSelector;
            this.container = $(this.containerSelector).get(0);

            this.tmpl = _.template(htmlStr);

            this.setupHandlers();

            this.render();
        },

        /**
         *
         */
        setupHandlers: function () {
            this.container.addEventListener('click', this.clickHandler);
        },

        /**
         *
         */
        render: function () {
            this.container.innerHTML = '';
            this.container.innerHTML = this.tmpl(); //{user: fb.getUserIsAuth()}
        },

        /**
         *
         */
        clickHandler: function () {
            console.log('menu click!');
        }
    };

    return new Menu();

});