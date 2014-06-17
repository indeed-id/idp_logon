(function ($) {

    var mainTabs = new tabs();

    function tabs(params) {

        this.options = {
            tabs:   $('.tabs'),
            links:  '.tabs__bookmark',
            blocks: '.tabs__tab',
            active: {
                'link': 'tabs__bookmark_active',
                'tab':  'tabs__tab_active'
            }
        };

        this.init = function (params) {

            $.extend(this.options, params);

            var self = this;
            this.options.tabs.on('click', self.options.links, function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.switchTab($(this));
            });

            var hash = window.location.hash;

            if (hash.length > 0) {
                self.switchTab(hash);
            }
        };


        this.switchTab = function (el) {

            if (typeof el == 'object') {
                if (el.hasClass(this.options.active.link))
                    return false;

                $(this.options.links).removeClass(this.options.active.link);
                el.addClass(this.options.active.link);

                var to = el.attr('href').replace('#', '');
            } else {
                var to = el.replace('#', '');

                $(this.options.links).removeClass(this.options.active.link);
                $(this.options.tabs).find('[href="' + el + '"]').addClass(this.options.active.link);
            }

            $(this.options.blocks).removeClass(this.options.active.tab);
            $(this.options.blocks + '_' + to).addClass(this.options.active.tab);
            window.location.hash = to;
        };

        return this.init(params);
    }
})(jQuery);