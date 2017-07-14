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

            this.render();
        },

        /**
         *
         */
        render: function () {
            this.container.innerHTML = '';
            this.container.innerHTML = this.tmpl(); //{user: fb.getUserIsAuth()}
        }
    };

    return new Menu();

});