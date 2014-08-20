(function(window, document, $, undefined) {
    var carouselDefaults = {
        container: '.container',
        controls: {
            container: '.controls',
            prev: '.prev',
            next: '.next',
            disabledClass: 'disabled'
        },
        item: '.item',
        itemsToShow: 1
    };

    $.Carousel = function($root, options) {
        this.$container = $root.find(options.container);
        this.containerWidth = this.$container.width();
        this.$controls = $root.find(options.controls);
        this.$item = $root.find(options.item);
        this.$prev = $root.find(options.controls.prev);
        this.$next = $root.find(options.controls.next);
        this.disabledClass = options.controls.disabledClass;
        this.step = this.$item.width();
        this.counter = 0;
        this.itemsToShow = options.itemsToShow;

        this.init = function() {
            this._showByIndex(0);
            this._bind();
        };

        this._bind = function() {
            this.$next.on('click', $.proxy(this._next, this));
            this.$prev.on('click', $.proxy(this._prev, this));
        };

        this._showByIndex = function(index) {
            this.$item.animate({
                left: '-' + this.step * index
            });

            this.counter = index;
            this._checkControls();
        };

        this._next = function(e) {
            if (this.counter < this.$item.length - this.itemsToShow) {
                this.counter++;
                this._showByIndex(this.counter);
            }
        };

        this._prev = function(e) {
            if (this.counter > 0) {
                this.counter--;
                this._showByIndex(this.counter);
            }
        };

        this._checkControls = function() {
            this.$prev.removeClass(this.disabledClass);
            this.$next.removeClass(this.disabledClass);

            if (this.counter === 0) {
                this.$prev.addClass(this.disabledClass);
            }
            if (this.counter === this.$item.length - this.itemsToShow) {
                this.$next.addClass(this.disabledClass);
            }
        };
    };

    $.fn.carousel = function(options) {
        return this.each(function() {
            var $item = $(this);
            var itemData = $item.data();
            var instanceOpts = $.extend(
                {},
                carouselDefaults,
                options,
                itemData
            );

            return new $.Carousel($item, instanceOpts).init();
        });
    };

    var pageChooserDefaults = {
        handler: '.handler',
        listPage: '.list',
        targetPage: '.target',
        hiddenClass: 'hidden'
    };

    $.PageChooser = function($root, options) {
        this.params = options;
        this.$handler = $root.find(options.handler);
        this.$listPage = $root.find(options.listPage);
        this.$targetPage = $root.find(options.targetPage);

        this.init = function() {
            this._bind();
        };

        this._bind = function() {
            this.$handler.on('click', $.proxy(this._showPinPage, this));
        };

        this._showPinPage = function() {
            this.$listPage.addClass(this.params.hiddenClass);
            this.$targetPage.removeClass(this.params.hiddenClass);
        }
    };

    $.fn.pageChooser = function(options) {
        return this.each(function() {
            var $item = $(this);
            var itemData = $item.data();
            var instanceOpts = $.extend(
                {},
                pageChooserDefaults,
                options,
                itemData
            );

            return new $.PageChooser($item, instanceOpts).init();
        });
    };

    $('.account').carousel({
            container: '.account__users',
            controls: {
                container: '.account__control',
                prev: '.account__arrow_prev',
                next: '.account__arrow_next',
                disabledClass: 'account__arrow_disabled'
            },
            item: '.account__user',
            itemsToShow: 2
        })
        .pageChooser({
            handler: '.account__user',
            listPage: '.account__page_list',
            targetPage: '.account__page_pin',
            hiddenClass: 'account__page_hidden'
        });

    $('.account__page_next').on('click', function(e) {
        $('.account__page_index').addClass('account__page_hidden');
        $('.account__page_list').removeClass('account__page_hidden');
    });

    $('.offline__form').on('submit', function(e) {
        e.preventDefault();
        var url = e.target.action;

        $.get(url).then(function() {
            $('.offline__otp').removeAttr('disabled');
            $('.offline__body').removeClass('offline__body_hidden');
        });
    });

    $('.form__input').on('focus', function(e) {
        $('.offline__otp')
            .attr('disabled', 'disabled')
            .val('');
        $('.offline__body').addClass('offline__body_hidden');
    });

    function checkOtp() {
        var filled = true;

        $('.offline__otp').each(function(idx, elem) {
            if ($(elem).val().length === 0) {
                filled = false;
            }
        });

        if (filled) {
            var url = $('.offline__otp-form').attr('action');
            $.get(url).then(function() {
                console.log('submitted');
            });
        }
    }

    $('.offline__otp').on('input', function(e) {
        var $target = $(e.target);

        if ($target.val().length >= 1) {
            if ($target.is(":last-child")) {
                checkOtp();
            } else {
                $target.next().focus();
            }
        }
        console.log($(e.target).is(':last-child'));
    });
})(window, document, jQuery, undefined);