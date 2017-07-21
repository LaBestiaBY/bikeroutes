define(['underscore', 'jquery', 'text!../../../html_templates/tmpl_main_menu.html', 'eventManager'], function (_, $, htmlStr, eventManager)
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
            // this.container.addEventListener('click', this.clickHandler);
            this.container.addEventListener('change', this.changeHandler);
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
        // clickHandler: function () {
        //     console.log('menu click!');
        // },

        /**
         *
         */
        changeHandler: function (e) {
            // console.log('menu change!', e.target.id, e.target.checked);
            eventManager.dispatch('menu_changed', {id: e.target.id, checked: e.target.checked});
        }
    };

    return new Menu();

});