/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#transitions
 * ===================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#alerts
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#buttons
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#carousel
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 4000
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#collapse
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#dropdowns
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#popovers
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#scrollspy
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tabs
 * ========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#typeahead
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#affix
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);
////////////////////////////////////////////
// 
//   Countdown
//   v5.0
//   Sept. 3, 2014
//   www.gieson.com
//   Copyright Mike Gieson
// 
//////////////////////////////////////////////////////////////////////////////////////
//
// The MIT License (MIT)
// 
//////////////////////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2014 Mike Gieson www.gieson.com
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
//////////////////////////////////////////////////////////////////////////////////////




// -----------------------------------------
//
// Usage:
// var test = new Countdown({time:15});
//
// -----------------------------------------

var CountdownImageFolder = "/images/"; // Should have trailing slash.
// NOTE: The countdown script assumes the folder is relative to the countdown.js script file.
// When CountdownImageFolder starts with a slash "/", or "http" the script will not assume the 
// folder is relative to the script and you can hard-code another folder on your site.
// Examples:
// var CountdownImageFolder = "/path/to/images/"; // Starts with a slash ( / ) as a shortcut to the root of your site.
// var CountdownImageFolder = "http://www.yoursite.com/path/to/images/";
var CountdownImageBasename = "flipper";
var CountdownImageExt = "png";
var CountdownImagePhysicalWidth = 41;
var CountdownImagePhysicalHeight = 60;

var CountdownWidth = 200;
var CountdownHeight = 30;

var CountdownLabels = {
	second 	: "SECONDS",
	minute 	: "MINUTES",
	hour	: "HOURS",
	day 	: "DAYS",
	month 	: "MONTHS",
	year 	: "YEARS"	
};

var CountdownInterval = 76;


////////////////////////////////////////////
//                                        //
//                 jbeeb                  //
//         version 0.0.0.3 alpha          //
//             www.jbeeb.com              //
//          Copyright Mike Gieson         //
//                                        //
////////////////////////////////////////////

if(!Array.prototype.indexOf)Array.prototype.indexOf=function(c){if(this==null)throw new TypeError;var b=Object(this),a=b.length>>>0;if(a===0)return-1;var h=0;arguments.length>1&&(h=Number(arguments[1]),h!=h?h=0:h!=0&&h!=Infinity&&h!=-Infinity&&(h=(h>0||-1)*Math.floor(Math.abs(h))));if(h>=a)return-1;for(h=h>=0?h:Math.max(a-Math.abs(h),0);h<a;h++)if(h in b&&b[h]===c)return h;return-1};
if(!Function.prototype.bind)Function.prototype.bind=function(c){if(typeof this!=="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),a=this,h=function(){},e=function(){return a.apply(this instanceof h&&c?this:c,b.concat(Array.prototype.slice.call(arguments)))};h.prototype=this.prototype;e.prototype=new h;return e};this.jbeeb=this.jbeeb||{};
(function(){var c=function(){},b=Object.prototype.toString,a=String.prototype.trim;c.link=function(a,b,d){var d=d||{},b=b||"_blank",f=[],c;for(c in d)c=c.toLowerCase(),c=="width"||c=="height"||c=="left"?f.push(c+"="+d[c]):(c=="location"||c=="menubar"||c=="resizable"||c=="scrollbars"||c=="status"||c=="titlebar"||c=="toolbar")&&f.push(c+"=1");d=null;f.length>0&&(d=f.join(","));window.open(a,b,d)};c.isArray=function(a){return Array.isArray?Array.isArray(a):b.call(a)==="[object Array]"};c.isEmpty=function(a){var b=
typeof a;if(b=="undefined")return true;if(a===null)return true;else if(b=="object"){if(a=={}||a==[])return true;var b=true,d;for(d in a)if(!c.isEmpty(a[d])){b=false;break}return b}else return b=="string"&&a==""?true:false};c.isNumber=function(a){return b.call(a)==="[object Number]"&&isFinite(a)};c.isInteger=function(a){return parseFloat(a)==parseInt(a)&&!isNaN(a)&&isFinite(a)};c.isString=function(a){return b.call(a)==="[object String]"};c.isNull=function(a){return a===""||a===null||a===void 0||typeof a==
"undefined"||a=="undefined"||a=="null"?true:false};c.clone=function(a){if(a===null||typeof a!="object")return a;if(a.init)return a;else{var b=a.constructor;if(b){var d=new b,f;for(f in a)d[f]=c.clone(a[f])}}return d};c.sortOn=function(a,b){if(!b||!a)return a;a.sort(function(a,h){return a[b]<h[b]?-1:a[b]>h[b]?1:0})};c.arrayShuffle=function(a){if(a){for(var b=a.length,d,f;b;)f=Math.floor(Math.random()*b--),d=a[b],a[b]=a[f],a[f]=d;return a}else return[]};c.arrayMove=function(a,b,d){a.splice(d,0,a.splice(b,
1)[0])};c.arrayInsertAt=function(a,b,d){Array.prototype.splice.apply(a,[b,0].concat(d));return a};c.rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;c.trim=a&&!a.call("\ufeff\u00a0")?function(h){return h==null?"":a.call(h)}:function(a){return a==null?"":(a+"").replace(c.rtrim,"")};c.alphanumeric=function(a,b){return b?a.replace(/[^A-Za-z0-9]/g,""):a.replace(/[^A-Za-z0-9_\-\.]/g,"")};c.parseJSON=function(a){if(typeof a!="string")return null;try{return JSON.parse(a)}catch(b){return a||null}};c.hexToRgb=function(a){return!a?
"":(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]:[0,0,0]};c.makeColor=function(a,b){if(!a)return"";var d=c.hexToRgb(a);return c.isNumber(b)&&jbeeb.Browser.rgba?(b>1&&(b/=100),"rgba("+d.join(",")+(","+b)+")"):a};c.getXYWH=function(a){var b=0,d=0,f=0,c=0;if(a){for(var f=a.offsetWidth,c=a.offsetHeight,g=jbeeb.Browser.touch;a&&!isNaN(a.offsetLeft)&&!isNaN(a.offsetTop);)g?(b+=(a.offsetLeft||0)-(a.scrollLeft||0),d+=(a.offsetTop||0)-(a.scrollTop||
0)):(b+=a.offsetLeft||0,d+=a.offsetTop||0),a=a.offsetParent;g&&(a=window.scrollY!=null?window.scrollY:window.pageYOffset,b+=window.scrollX!=null?window.scrollX:window.pageXOffset,d+=a)}return{x:b,y:d,w:f,h:c,xMax:b+f,yMax:d+c}};c.getWindowSize=function(){var a=window,b=document,d=b.documentElement,b=b.getElementsByTagName("body")[0];return{w:a.innerWidth||d.clientWidth||b.clientWidth,h:a.innerHeight||d.clientHeight||b.clientHeight}};c.contains=function(a,b){var d={},f={x:a.x,y:a.y,w:a.width,h:a.height},
c={x:b.x,y:b.y,w:b.width,h:b.height};f.xMax=f.x+f.w;f.yMax=f.y+f.h;c.xMax=c.x+c.w;c.yMax=c.y+c.h;for(var g in f)d[g]=f[g]>=c[g]?true:false;return!d.x&&!d.y&&d.xMax&&d.yMax?true:false};c.getTimestamp=function(){var a=new Date;return Date.UTC(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds()).valueOf()};c.bindEvent=function(a,b,d){a.attachEvent?a.attachEvent("on"+b,d):a.addEventListener&&a.addEventListener(b,d,false)};c.unbindEvent=function(a,b,
d){a.attachEvent?a.detachEvent("on"+b,d):a.addEventListener&&a.removeEventListener(b,d,false)};c.getAttributes=function(a){var b={};if(a=a.attributes){for(var d=a.length,f=0;f<d;f++)jbeeb.Browser.ie?a[f].specified&&(b[a[f].nodeName]=a[f].nodeValue.toString()):b[a[f].nodeName]=a[f].value?a[f].value.toString():a[f].nodeValue.toString();return b}else return{}};jbeeb.Utils=c})();this.jbeeb=this.jbeeb||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.initialize=function(a){a.addEventListener=b.addEventListener;a.removeEventListener=b.removeEventListener;a.removeAllEventListeners=b.removeAllEventListeners;a.hasEventListener=b.hasEventListener;a.dispatchEvent=b.dispatchEvent};b._listeners=null;b.initialize=function(){};b.addEventListener=function(a,b,e,d){var f=this._listeners;f?this.removeEventListener(a,b,e):f=this._listeners={};var c=f[a];c||(c=f[a]=[]);c.push({fn:b,arg:d,scope:e});
return b};b.removeEventListener=function(a,b,e){var d=this._listeners;if(d&&(a=d[a]))for(d=a.length;d--;){var c=a[d];c.scope==e&&c.fn==b&&a.splice(d,1)}};b.removeAllEventListeners=function(a){a?this._listeners&&delete this._listeners[a]:this._listeners=null};b.dispatchEvent=function(a){var b=this._listeners;if(a&&b&&(b=b[a])){var e=[].slice.call(arguments);e.splice(0,1);for(var d=0;d<b.length;d++){var c=b[d];if(c.fn){var i=e,g=c.arg;typeof g!=="undefined"&&i.push(g);i.length?c.scope?c.fn.apply(c.scope,
i):c.fn.apply(null,i):c.scope?c.fn.call(c.scope):c.fn()}}}};b.hasEventListener=function(a){var b=this._listeners;return!(!b||!b[a])};b.toString=function(){return"[EventDispatcher]"};if(!jbeeb.EventDispatcher)jbeeb.EventDispatcher=c})();this.jbeeb=this.jbeeb||{};
(function(){var c;if(!jbeeb.ready)jbeeb.ready=function(){var b,a,h=[],e,d=document,c=d.documentElement,i=c.doScroll,g=(i?/^loaded|^c/:/^loaded|c/).test(d.readyState);a=function(b){try{b=d.getElementsByTagName("body")[0].appendChild(d.createElement("span")),b.parentNode.removeChild(b)}catch(e){return setTimeout(function(){a()},50)}for(g=1;b=h.shift();)b()};d.addEventListener&&(e=function(){d.removeEventListener("DOMContentLoaded",e,false);a()},d.addEventListener("DOMContentLoaded",e,false),b=function(a){g?
a():h.push(a)});i&&(e=function(){/^c/.test(d.readyState)&&(d.detachEvent("onreadystatechange",e),a())},d.attachEvent("onreadystatechange",e),b=function(a){if(self!=top)g?a():h.push(a);else{try{c.doScroll("left")}catch(e){return setTimeout(function(){b(a)},50)}a()}});return b}()})();this.jbeeb=this.jbeeb||{};
(function(){function c(){return a&&a.call(performance)||(new Date).getTime()}var b=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame,a=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow),h=function(a){this.init(a);return this},e=h.prototype;e.addEventListener=null;e.removeEventListener=null;e.removeAllEventListeners=null;e.dispatchEvent=
null;e.hasEventListener=null;jbeeb.EventDispatcher.initialize(e);e._interval=50;e._lastTime=0;e._times=null;e._active=null;e._loopHandler=null;e._useRAF=false;e.state=0;e.init=function(a){a.fps?(this._useRAF=a.animation&&b||false,this._interval=1E3/(a.fps||60)):this._interval=a.interval||50;a.startNow&&this.start()};e.stop=function(){this.state=0;this._setLoopHandler(this._handleStop)};e.getInterval=function(){return this._interval};e.setInterval=function(a){this._interval=a};e.start=function(){if(!this.state)this.state=
1,this._times=[],this._times.push(this._lastTime=c()),this._useRAF?this._setLoopHandler(this._handleRAF):this._setLoopHandler(this._handleTimeout),this._loop()};e.getFPS=function(){var a=this._times.length-1;return a<2?this._interval:1E3/((this._times[0]-this._times[a])/a)};e._handleRAF=function(){this._active=null;this._loop();c()-this._lastTime>=(this._interval-1)*0.97&&this._tick()};e._handleTimeout=function(){this._active=null;this._loop();this._tick()};e._handleStop=function(){this._active=null};
e._loop=function(){if(this._active==null)this._useRAF?(b(this._loopHandler),this._active=true):(this._active&&clearTimeout(this._active),this._active=setTimeout(this._loopHandler,this._interval))};e._setLoopHandler=function(a){this._loopHandler=a.bind(this)};e._tick=function(){var a=c(),b=a-this._lastTime;this._lastTime=a;this.dispatchEvent("tick",{delta:b,time:a});for(this._times.unshift(a);this._times.length>100;)this._times.pop()};e.toString=function(){return"[Ticker]"};if(!jbeeb.Ticker)jbeeb.Ticker=
h})();this.jbeeb=this.jbeeb||{};
(function(){var c,b;if(!jbeeb.Browser){var a={ie:null,ios:null,mac:null,webkit:null,oldWebkit:false,flash:0,touch:false};c=navigator.userAgent;c=c.toLowerCase();b=/(chrome)[ \/]([\w.]+)/.exec(c)||/(webkit)[ \/]([\w.]+)/.exec(c)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(c)||/(msie) ([\w.]+)/.exec(c)||c.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(c)||[];c=b[1]||"";b=b[2]||"0";a.version=parseFloat(b);a.agent=c;b=false;c=="chrome"?b=true:c=="webkit"&&(b=true);a.webkit=b;a.chrome=/chrome/.test(c)||
/chromium/.test(c);a.moz=/mozilla/.test(c);a.opera=/opera/.test(c);a.safari=/webkit/.test(c);a.ie=/msie/.test(c)&&!/opera/.test(c);a.android=/android/.test(c);b=navigator.platform.toLowerCase();a.platform=b;a.ios=/iphone/.test(b)||/ipod/.test(b)||/ipad/.test(b);a.win=a.windows=b?/win/.test(b):/win/.test(c);a.mac=b?/mac/.test(b):/mac/.test(c);a.cssPrefix="";if(a.chrome||a.safari)if(a.cssPrefix="webkit",a.chrome&&a.version<10)a.oldWebkit=true;else{if(a.safari&&a.version<5.1)a.oldWebkit=true}else if(a.opera)a.cssPrefix=
"o";else if(a.moz)a.cssPrefix="moz";else if(a.ie&&a.version>8)a.cssPrefix="ms";if(a.chrome||a.ios||a.android)a.flash=0;c=false;b="Webkit Moz O ms Khtml".split(" ");var h="",h=document.createElement("div");h.style.animationName&&(c=true);if(c===false)for(var e=0;e<b.length;e++)if(h.style[b[e]+"AnimationName"]!==void 0){h=b[e];h.toLowerCase();c=true;break}a.animation=c;a.modern=false;if(a.moz&&a.version>3)a.modern=true;if(a.opera&&a.version>9)a.modern=true;if(a.ie&&a.version>9)a.modern=true;if(a.chrome||
a.safari||a.ios||a.android)a.modern=true;a.rgba=true;a.quirks=document.compatMode=="CSS1Compat"?false:true;if(a.ie)if(a.version<9)a.rgba=false;else{if(a.quirks)a.rgba=false,a.version=8,a.modern=false}else if(a.moz&&a.version<3)a.rgba=false;else if(a.safari&&a.version<3)a.rgba=false;else if(a.opera&&a.version<10)a.rgba=false;a.touch=typeof window.ontouchstart==="undefined"?false:true;jbeeb.Browser=a}})();this.jbeeb=this.jbeeb||{};
(function(){jbeeb.PathInfo=function(){function c(a,b){var h,k,o,p,v,z,n,m,q,s,r,w,t,y,a=a||"";k=a.replace(/\\/g,"/");k.match(/:\//)||(m="",m=b?d:f,m=c(m,false),k.substr(0,1)=="/"?k=m.host+(e?"":"/")+k:k.substr(0,3)=="../"?(m=m.parenturl.split("/"),k=k.split("../"),o=k.pop(),m.splice(m.length-k.length,k.length,o),k=m.join("/")):k=m.pathurl+(e?"":"/")+k);k.substr(-1)=="/"&&(k=k.substr(0,k.length-1));h=k.split("://");k=h.shift();m=(h.shift()||"").replace("//","/");m=m.split("/");o=m.shift()||"";o.indexOf("@")>
-1&&(h=o.split("@"),t=h[0].split(":"),w=t[0],t=t[1],o=h[1]);o.indexOf(":")>-1&&(h=o.split(":"),p=h[1],o=h[0]);m=m.join("/");m.indexOf("#")!=-1&&(h=m.split("#"),r=h[1],m=h[0]);m.indexOf("?")!=-1&&(h=m.split("?"),s=h[1],m=h[0]);h=m.split("/");n=h.pop();m=h.join("/");n==".."&&(n="");h=n.split(".");h.length>1&&(z=h.pop().toLowerCase(),v=h.join("."));y=k+"://"+o+(p?":"+p:"");m="/"+m+(m.length>0?"/":"");q=y+m;h=y+m+n+(s?"?"+s:"")+(r?"#"+r:"");var l=m,u=q;z?(m+=n,q+=n):(m+=n+(n!=""?"/":""),q+=n+(n!=""?"/":
""),v=n,!s&&!r&&h.substr(-1)!="/"&&(h+="/"));e===false&&(l.substr(-1)=="/"&&(l=l.substr(0,l.length-1)),u.substr(-1)=="/"&&(u=u.substr(0,u.length-1)),z||(m.substr(-1)=="/"&&(m=m.substr(0,m.length-1)),q.substr(-1)=="/"&&(q=q.substr(0,q.length-1)),h.substr(-1)=="/"&&(h=h.substr(0,h.length-1))));return{source:a||null,url:h||null,protocol:k||null,domain:o||null,port:p||null,basename:v||null,ext:z||null,filename:n||null,path:m||null,pathurl:q||null,parent:l||null,parenturl:u||null,query:s||null,fragment:r||
null,username:w||null,password:t||null,host:y||null}}function b(a){return(a||"").split("?")[0].split("/").pop()}function a(a){a=a.split("/");a.pop();return a.join("/").toString()+(a.length>0?"/":"")}function h(b){var h=document.getElementsByTagName("script");return(h=h[h.length-1].getAttribute("src"))?b?h.split("?")[0]:a(h.split("?")[0]):""}var e=true,d=h(),f=a(window.location.href);return{parse:c,filename:b,basename:function(a){a=b(a).split(".");a.pop();return a.join(".")},basepath:a,scriptPath:d,
getScriptPath:h,pagePath:f,ext:function(a){return(a||"").split("?")[0].split("/").pop().split(".").pop().toLowerCase()}}}()})();this.jbeeb=this.jbeeb||{};
(function(){if(!jbeeb.Base)jbeeb.amReady=false,jbeeb.ticker=null,jbeeb.tickerInterval=80,jbeeb.scriptPath=null,jbeeb.pagePath="",jbeeb.assetsBasePath="",jbeeb.focus=null,jbeeb.binit=0;jbeeb.unfocus=function(){if(jbeeb.focus){var b=jbeeb.focus;b.element&&b.element.blur();jbeeb.focus=null}};var c=function(){};c._nextUID=0;c._stages=[];c._readyList=[];c.scriptPath=null;c._getUID=function(){return"jbeeb_"+c._nextUID++};c._register=function(b){c._readyList.push(b);jbeeb.amReady&&c._readyListRun()};c._readyListRun=
function(){var b=c._readyList.length;if(b>0)for(;b--;){var a=c._readyList.splice(b,1)[0];a&&a.init&&a.init.call(a)}};c.init=function(){if(!jbeeb.amReady){jbeeb.ticker=new jbeeb.Ticker({interval:jbeeb.tickerInterval,startNow:1});if(!jbeeb.assetsBasePath)jbeeb.assetsBasePath="";if(window.location.href.substr(0,4)!="http"){if(!jbeeb.pagePath)jbeeb.pagePath="";if(!jbeeb.scriptPath)jbeeb.scriptPath=""}else{if(!jbeeb.pagePath)jbeeb.pagePath=jbeeb.PathInfo.pagePath;if(!jbeeb.scriptPath)jbeeb.scriptPath=
jbeeb.PathInfo.scriptPath}jbeeb.FlashDetect&&jbeeb.FlashDetect.run();jbeeb.amReady=true;c._readyListRun()}};if(!jbeeb.Base)jbeeb.Base=c,jbeeb.register=c._register,jbeeb.getUID=c._getUID})();if(!jbeeb.binit)jbeeb.binit=1,jbeeb.ready(function(){jbeeb.Base.init()});this.jbeeb=this.jbeeb||{};
(function(){var c=function(a){this.init(a)},b=c.prototype;b.addEventListener=null;b.removeEventListener=null;b.removeAllEventListeners=null;b.dispatchEvent=null;b.hasEventListener=null;jbeeb.EventDispatcher.initialize(b);b.amStage=null;b.element=null;b.style=null;b._cssStore=null;b.alpha=1;b.id=null;b.name=null;b.parent=null;b.stage=null;b.rotation=0;b.scale=1;b.scaleX=1;b.scaleY=1;b.stretchX=1;b.stretchY=1;b.skewX=0;b.skewY=0;b.origin=null;b.originX=0;b.originY=0;b.originType="px";b.shadow=null;
b.bevel=null;b.outline=null;b.inset=null;b.visible=true;b.overflow="visible";b.autoCenter=null;b.x=0;b.y=0;b.width=0;b.height=0;b.flex="wh";b._flexW=1;b._flexH=1;b.pin=null;b._pinX=null;b._pinY=null;b.z=0;b.temp=null;b.rounded=null;b.fill=null;b.stroke=null;b.image=null;b.gradient=null;b._blockDisplay=null;b.init=function(a){this.temp={};this.style=null;this.alpha=1;this.parent=this.name=this.id=null;this.rotation=0;this.scaleY=this.scaleX=this.scale=1;this.skewY=this.skewX=0;this.visible=true;this.overflow=
"visible";this.height=this.width=this.y=this.x=0;this.flex="wh";this._flexH=this._flexW=1;this._pinY=this._pinX=this.pin=null;this.z=0;this.autoCenter=null;this.stroke={};this.fill={};this.inset=this.shadow=null;this.gradient={};this.rounded=null;this._cssStore=jbeeb.storeCSS?{}:null;var a=a||{},b=jbeeb.getUID();this.id=b;if(a.element)this.element=a.element;else if(this.element=document.createElement("div"),this.element.id=b,this.element.style.position="absolute",this.element.style.overflow="visible",
this._cssStore)this._cssStore.position="absolute",this._cssStore.overflow="visible";if(a.standalone)this.amStage=1;this._blockDisplay=a.inline?"inline-block":"block";if(a.name)this.name=a.name;this.element.id=this.type+"_"+this.element.id;b=this.style=this.element.style;b.padding="0px";b.margin="0px";b.border="0px";b.fontSize="100%";b.verticalAlign="baseline";b.outline="0px";b.background="transparent";b.WebkitTextSizeAdjust="100%";b.msTextSizeAdjust="100%";b.WebkitBoxSizing=b.MozBoxSizing=b.boxSizing=
"padding-box";b.backgroundClip="padding-box";if(this._cssStore)b=this._cssStore,b.padding="0px",b.margin="0px",b.border="0px",b.fontSize="100%",b.verticalAlign="baseline",b.outline="0px",b.background="transparent",b.WebkitTextSizeAdjust="100%",b.msTextSizeAdjust="100%",b.boxSizing="padding-box",b.backgroundClip="padding-box";a.editable||this.setSelectable(false);this.setCursor("inherit");if(a)this.autoCenter=a.center,typeof a.flex!="undefined"&&this.setFlex(a.flex),typeof a.pin!="undefined"&&this.setPin(a.pin),
typeof a.overflow!="undefined"&&this.setOverflow(a.pin);this.setOrigin(0,0,"px");this.applySkin(a,false)};b.setSelectable=function(a){var b=this.style,e="none",d="-moz-none";a&&(d=e="text");b.userSelect=b.WebkitUserSelect=b.MozUserSelect=b.OUserSelect=e;b.MozUserSelect=d;if(this._cssStore)this._cssStore.userSelect=e,this._cssStore.MozUserSelect=d};b.setBorderRender=function(a){var b=this.style,a=a=="outside"?"content-box":"border-box";b.WebkitBoxSizing=b.MozBoxSizing=b.boxSizing=a;if(this._cssStore)this._cssStore.boxSizing=
a};b.applySkin=function(a,b){this.stroke={};this.fill={};this.gradient=null;this.rounded=0;this.inset=this.outline=this.bevel=this.shadow=this.image=null;if(!(b==true&&b)){var e=jbeeb.Utils.isNumber(a.x)?a.x:0,d=jbeeb.Utils.isNumber(a.y)?a.y:0;this.setXY(e,d);a.height&&this.setHeight(a.height);a.width&&this.setWidth(a.width);a.h&&this.setHeight(a.h);a.w&&this.setWidth(a.w)}this.setRounded(a.rounded);var e=a.fill,c,i;if(e)typeof e=="string"?(c=e,i=1):(c=e.color,i=e.alpha);this.setFill(c,i);var e=a.stroke,
g=d=i=c=null;e&&(typeof e=="string"?(c=e,d=i=1,g="solid"):e.color!=null&&(c=e.color||"#000000",i=jbeeb.Utils.isNumber(e.alpha)?e.alpha:1,d=e.weight||1,g=e.style||"solid"));this.setStroke(d,c,i,g);this.setStrokeStyle(g);var e=a.image,j,k;if(a.image)typeof e=="string"?(j=e,k=null):(j=e.url,k=e.mode);this.setImage(j,k);this.setShadow(a.shadow);this.setBevel(a.bevel);this.setOutline(a.outline);this.setInset(a.inset)};b._applyBkgd=function(){var a=this.style;if(a){var b="",e="",d="",c="",i="",g=0,j=this.fill;
j&&(jbeeb.Utils.isArray(j.color)?g=1:j.color&&(e=jbeeb.Utils.makeColor(j.color,j.alpha)));if(this.image&&this.image.url){b='url("'+this.image.url+'")';g=this.image.mode||"center";if(g!="pattern"){if(g=="fit")d="100% 100%";else if(g=="contain"||g=="cover")d="contain";c="no-repeat";i="center center"}g=0}if(g){g=j.color;if(this._cssStore)this._cssStore.gradient=1;for(var j=j.alpha||"v",k=jbeeb.Browser,o=[],p=[],v=g.length,z=k.oldWebkit,n=0;n<v;n+=3){var m=jbeeb.Utils.makeColor(g[n],g[n+1]),q=g[n+2];
q>100?q=100:q<0&&(q=0);z?p.push("color-stop("+q+"%, "+m+")"):o.push(m+" "+q+"%")}if(k.modern)b=k.cssPrefix,b==""?(b="linear-",j=(j=="v"?"to bottom, ":"to right, ")+o.join(",")):b=="webkit"&&z?(g=p.join(","),b="-webkit-",j=j=="v"?"linear, left top, left bottom, "+g:"linear, left top, right top, "+g):(b="-"+b+"-linear-",j=(j=="v"?"top, ":"left, ")+o.join(",")),b=b+"gradient("+j+")";else if(k.ie&&k.version<9){if(j="progid:DXImageTransform.Microsoft.gradient( gradientType="+(j=="v"?"0":"1")+", startColorstr='"+
g[0]+"', endColorstr='"+g[g.length-3]+"')",this.style.filter=j,this.style.msFilter='"'+j+'"',this._cssStore)g=this._cssStore,g.filter=j,g.msFilter='"'+j+'"'}else{b="";for(n=0;n<v;n+=3)jbeeb.Utils.makeColor(g[n],g[n+1]),b+='<stop offset="'+g[n+2]+'%" stop-color="'+g[n]+'" stop-opacity="'+g[n+1]+'"/>';g="0";o="100";j=="h"&&(g="100",o="0");j="jbeeb-grad-"+this.id;p="";p+='<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">';p+='  <linearGradient id="'+
j+'" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="'+g+'%" y2="'+o+'%">';p+=b;p+="  </linearGradient>";p+='  <rect x="0" y="0" width="1" height="1" fill="url(#'+j+')" />';p+="</svg>";b='url("data:image/svg+xml;base64,'+jbeeb.Base64.encode(p)+'")'}}else if(this._cssStore)this._cssStore.gradient=0;a.backgroundColor=e||"";a.backgroundImage=b||"none";a.backgroundSize=d||"";a.backgroundRepeat=c||"";a.backgroundPosition=i||"";if(this._cssStore)g=this._cssStore,g.backgroundColor=e||"",g.backgroundImage=
b||"none",g.backgroundSize=d||"",g.backgroundRepeat=c||"",g.backgroundPosition=i||""}};b.setFill=function(a,b){if(!this.fill)this.fill={};this.fill.color=a;this.fill.alpha=b;this._applyBkgd()};b.setImage=function(a,b){if(a){if(!this.image)this.image={};this.image.url=a;this.image.mode=b}else this.image=null;this._applyBkgd()};b.setImageSizing=function(a){if(this.image)this.image.mode=a,this._applyBkgd()};b.setStroke=function(a,b,e,d){if(!this.stroke)this.stroke={};typeof a=="string"&&(b=a,a=1);a>
0&&(a=Math.round(a));var c=e||1,d=d||"solid";b==null&&(d=c=a=null);e=this.stroke;e.weight=a;e.color=b;e.alpha=c;e.style=d;var i=this.style;a?(e=a+"px",b=jbeeb.Utils.makeColor(b,c),c=-a+"px",a=-a+"px"):a=c=b=e=d="";i.borderStyle=d;i.borderWidth=e;i.borderColor=b;i.marginLeft=c;i.marginTop=a;if(this._cssStore)i=this._cssStore,i.borderStyle=d,i.borderWidth=e,i.borderColor=b,i.marginLeft=c,i.marginTop=a;this._applyRounded()};b.setStrokeStyle=function(a){a=a||"";this.style.borderStyle=a;if(this._cssStore)this._cssStore.borderStyle=
a};b.setCursor=function(a){this.style.cursor=a;if(this._cssStore)this._cssStore.cursor=a};b.setWidth=function(a){var b=this.style;if(b&&a>0&&(this.width=a,b.width=a+"px",this.autoCenter&&this.center(this.autoCenter),this.rounded&&this._applyRounded(),this._cssStore))this._cssStore.width=a+"px"};b.setHeight=function(a){var b=this.style;if(b&&a>0&&(this.height=a,b.height=a+"px",this.autoCenter&&this.center(this.autoCenter),this.rounded&&this._applyRounded(),this._cssStore))this._cssStore.height=a+"px"};
b.measure=function(){var a=this.element,b=a.clientWidth,a=a.clientHeight;this.width=b;this.height=a;return[b,a]};b.setSize=function(a,b){var e=this.style;if(e&&a>0&&b>0&&(this.width=a,this.height=b,e.width=a+"px",e.height=b+"px",this.autoCenter&&this.center(this.autoCenter),this.rounded&&this._applyRounded(),this._cssStore))this._cssStore.width=a+"px",this._cssStore.height=b+"px"};b.setXY=function(a,b){this.x=a;this.y=b;var e=this.style;e.left=a+"px";e.top=b+"px";if(this._cssStore)this._cssStore.left=
a+"px",this._cssStore.top=b+"px"};b.setBaseXY=function(a,b){this.setXY(a,b);this._baseX=a;this._baseY=b};b.setXYWH=function(a,b,e,d){this.width=e;this.height=d;this.x=a;this.y=b;var c=this.style;c.width=(e||0)+"px";c.height=(d||0)+"px";c.left=(a||0)+"px";c.top=(b||0)+"px";if(this._cssStore)c=this._cssStore,c.width=(e||0)+"px",c.height=(d||0)+"px",c.left=(a||0)+"px",c.top=(b||0)+"px"};b.setX=function(a){this.x=a;this.style.left=(a||0)+"px";if(this._cssStore)this._cssStore.left=(a||0)+"px"};b.setY=
function(a){this.y=a;this.style.top=(a||0)+"px";if(this._cssStore)this._cssStore.top=(a||0)+"px"};b.setTop=function(a){this.y=a;this.style.top=a+"px";if(this._cssStore)this._cssStore.top=(a||0)+"px"};b.setBottom=function(a){this.y=a-this.height;this.style.bottom=a+"px";if(this._cssStore)this._cssStore.bottom=(a||0)+"px"};b.setLeft=function(a){this.x=a;this.style.left=(a||0)+"px";if(this._cssStore)this._cssStore.left=(a||0)+"px"};b.setRight=function(a){this.x=a=(a||0)-this.width;this.style.right=a+
"px";if(this._cssStore)this._cssStore.right=a+"px"};b.setZ=function(a){a<0&&(a=0);this.z=a;var b=this.style;if(!b)this.style=b=this.element.style;b.zIndex=a;if(this._cssStore)this._cssStore.zIndex=a};b.setScale=function(a){this.scaleY=this.scaleX=this.scale=a;this._doTransform("scale("+a+","+a+")")};b.setScaleX=function(a){this.scaleX=a;this._doTransform("scale("+this.scaleX+","+a+")")};b.setScaleY=function(a){this.scaleY=a;this._doTransform("scale("+a+","+this.scaleY+")")};b.stretch=function(a,b){this.stretchX=
a;this.stretchY=b;if(a>0&&b>0){this._flexW&&this.setWidth(this.width*a);this._flexH&&this.setHeight(this.height*b);var e=this.x,d=this.y;if(this._pinX){if(this._pinX=="r"&&this.parent){if(this._pinRightFirst==null)this._pinRightFirst=this.parent.width-this.x;e=this.parent.width-this._pinRightFirst;this.setX(e)}}else if(this.originX){var c=this.originX;this.setX(c+(e-c)*a)}else this.setX(e*a);if(this._pinY){if(this._pinY=="b"&&this.parent){if(this._pinBottomFirst==null)this._pinBottomFirst=this.parent.height-
this.y;e=this.parent.height-this._pinBottomFirst;this.setY(e)}}else this.originY?(c=this.originY,this.setY(c+(d-c)*b)):this.setY(d*b)}this.dispatchEvent("stretch",this.width,this.height)};b._pinRightFirst=null;b._pinBottomFirst=null;b.setPin=function(a){this.pin=a;this._pinY=this._pinX=0;if(a){a=a.toLowerCase();if(a.match(/r/))this._pinX="r";if(a.match(/l/))this._pinX="l";if(a.match(/t/))this._pinY="t";if(a.match(/b/))this._pinY="b";if(a.match(/s/))this._pinY=this._pinX="s"}};b.setFlex=function(a){this._flexH=
this._flexW=0;if(a)a.toLowerCase(),this._flexW=a.match(/w/)?1:0,this._flexH=a.match(/h/)?1:0;this.flex=a};b.setRotation=function(a){this.rotation=a;this._doTransform("rotate("+a+"deg)")};b.setSkew=function(a,b){this.skewX=a;this.skewY=b;this._doTransform("skew("+a+"deg,"+b+"deg)")};b.setOrigin=function(a,b,e){this.originX=a;this.originY=b;e=(this.originType=e)?e:"px";a=a+e+" "+b+e;b=this.style;b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin=a;
if(this._cssStore)this._cssStore.transformOrigin=a};b._doTransform=function(a){var b=this.style;b.transform=b.transform=b.msTransform=b.WebkitTransform=b.MozTransform=a;if(this._cssStore)this._cssStore.transform=a};b.center=function(a){if((this.parent||this.amStage)&&this.width&&this.height){var b=this.x,e=this.y,d,c;this.amStage?(d=jbeeb.Utils.getXYWH(this.element.parentNode),c=d.w*0.5,d=d.h*0.5):(d=this.parent,d.width||d.measure(),c=d.width*0.5,d=d.height*0.5);var i=this.width*0.5,g=this.height*
0.5;a=="v"?e=d-g:a=="h"?b=c-i:(b=c-i,e=d-g);this.setXY(b,e)}};b.setOverflow=function(a){this.overflow=a;var b="",e="";if(a=="x"||a=="y"||!a)a=="x"?(b="auto",e="hidden"):a=="y"&&(b="hidden",e="auto",jbeeb.Browser.ie&&this.setWidth(this.width+20)),this.style.overflowX=b,this.style.overflowY=e;this.style.overflow=a;if(this._cssStore){var c=this._cssStore;c.overflow=a;c.overflowX=b;c.overflowY=e}};b.setVisible=function(a){this.visible=a;var b=this.style,a=a?this._blockDisplay:"none";b.display=a;if(this._cssStore)this._cssStore.display=
a};b.show=function(){this.setVisible(true)};b.hide=function(){this.setVisible(false)};b.setAlpha=function(a){this.alpha=a;if(a!==null)this.style.opacity=""+a;if(this._cssStore)this._cssStore.opacity=""+a};b.setRounded=function(a){this.rounded=a;this._applyRounded()};b._applyRounded=function(){var a="",b=this.rounded;if(b){var e=this.width,c=this.height,f=0,i=this.stroke;if(i)i=i.weight,jbeeb.Utils.isNumber(i)&&(f=i*2);e=((e<c?e:c)+f)*0.5;jbeeb.Utils.isNumber(b)?a=e*b+"px":b&&typeof b=="object"&&(a+=
(e*b.tl||0)+"px "+(e*b.tr||0)+"px "+(e*b.br||0)+"px "+(e*b.bl||0)+"px")}b=this.style;b.borderRadius=b.MozBorderRadius=b.WebkitBorderRadius=b.OBorderRadius=b.msBorderRadius=a;if(this._cssStore)this._cssStore.borderRadius=a};b.onAdded=function(){this.autoCenter&&this.center(this.autoCenter);this.dispatchEvent("added",this)};b.toFront=function(){this.parent&&this.parent.toFront(this)};b.toBack=function(){this.parent&&this.parent.toBack(this)};b._updateShadow=function(){var a=this.style,b=this._makeShadow(),
e=this._makeBevel(),c=this._makeOutline(),f=this._makeInset(),i="none";if(!(b==[]&&e==[]&&c==[]&&f==[])){for(var b=e.concat(c,f,b),e=b.length,c=[],f=[],g=0,j=0;j<e;j++)g==0?b[j]==1&&f.push("inset"):g<4?f.push(b[j]+"px"):(f.push(jbeeb.Utils.makeColor(b[j],b[j+1])),c.push(f.join(" ")),f=[],++j,g=-1),g++;c.length>0&&(i=c.join(","))}a.boxShadow=a.MozBoxShadow=a.WebkitBoxShadow=a.OBoxShadow=a.msBoxShadow=i;if(this._cssStore)this._cssStore.boxShadow=i};b._makeShadow=function(){var a=this.shadow;return a?
[0,a.x||0,a.y||0,a.s,a.c||"#000000",a.a||0.4]:[]};b.setShadow=function(a){this.shadow=a;this._updateShadow()};b._makeInset=function(){var a=this.inset;return a?[1,a.x||0,a.y||0,a.s,a.c||"#000000",a.a||0.4]:[]};b.setInset=function(a){this.inset=a;this._updateShadow()};b._makeBevel=function(){var a=this.bevel;return a?[1,-a.x,-a.y,a.s1,a.c1||"#FFFFFF",a.a1,1,a.x,a.y,a.s2,a.c2||"#000000",a.a2]:[]};b.setBevel=function(a){if(a)jbeeb.Utils.isNumber(a)?a={x:-a,y:-a,s1:0,s2:0,c1:"#FFFFFF",c2:"#000000",a1:1,
a2:1}:(a.c1=a.c1||"#FFFFFF",a.c2=a.c2||"#000000");this.bevel=a;this._updateShadow()};b._makeOutline=function(){if(this.outline){var a=this.outline;return[0,-a.weight,-a.weight,a.spread||0,a.color||"#000000",a.alpha||1,0,a.weight,-a.weight,a.spread||0,a.color||"#000000",a.alpha||1,0,-a.weight,a.weight,a.spread||0,a.color||"#000000",a.alpha||1,0,a.weight,a.weight,a.spread||0,a.color||"#000000",a.alpha||1]}else return[]};b.setOutline=function(a){this.outline=a;this._updateShadow()};b.setMouseEnabled=
function(a){a=a===0||a===false?"none":"auto";this.style.pointerEvents=a;if(this._cssStore)this._cssStore.pointerEvents=a};b._MEL=null;b.MELbubble=false;b.addMEL=function(a,b,e,c,f){this.MELbubble=c;if(!this._MEL)this._MEL=new jbeeb.MouseEventListener(this);(a=="mouseOver"||a=="mouseOut"||a=="mouseMove")&&this._MEL.enableMouseOver(1);this.addEventListener(a,b,e,f)};b.removeMEL=function(a,b){this.removeEventListener(a,b);a=="mouseOver"&&this._MEL.enableMouseOver(0)};b.setFloat=function(a){this.style.position=
"relative";this.style.left="";this.style.top="";this.style.cssFloat=a;this.style.display="inline-block";if(this._cssStore)this._cssStore.position="relative",this._cssStore.left=null,this._cssStore.top=null,this._cssStore.cssFloat=a,this._cssStore.display="inline-block"};b.destroy=function(){this.removeAllEventListeners();if(this._MEL)this._MEL.destroy(),this._MEL=null;if(this.element&&this.element.parentNode)this.element.parentNode.removeChild(this.element),this.element=null;if(this.parent)this.parent.removeChild(this),
this.parent=null;this._cssStore=this.element=this.image=this.inset=this.shadow=this.outline=this.bevel=this.gradient=this.fill=this.stroke=this.temp=null};b.getCSS=function(){return this._cssStore};b.toString=function(){return"[Box (name="+this.name+")]"};b.type="Box";jbeeb.Box=c})();this.jbeeb=this.jbeeb||{};
(function(){var c=function(a){this.init(a)},b=c.prototype=new jbeeb.Box(null);b.textFit=null;b.text="";b._previuosText="";b.textSize=null;b.textColor=null;b.shadowText=null;b.bevelText=null;b.outlineText=null;b.insetText=null;b.font=null;b.align=null;b.textScale=null;b.selectable=null;b.bold=null;b.padding=null;b.editable=null;b._canEdit=null;b.multiline=null;b.baselineShift=null;b._BLScomp=null;b._keyboardHandler=null;b._suspendUpdate=false;b._TextBox_init=b.init;b.init=function(a){if(a){if(a.editable){var b;
b=a.multiline?document.createElement("textarea"):document.createElement("input");this._canEdit=1;b.id=jbeeb.getUID();b.style.position="absolute";b.style.overflow="visible";if(this._cssStore)this._cssStore.position="absolute",this._cssStore.overflow="visible";if(!a.multiline)b.type="text";a.element=b}this._TextBox_init(a);a.element=null;b=this.style;b.textDecoration="none";b.zoom=1;b.size=a.h;this.text=a.text||"";if(this._cssStore)b=this._cssStore,b.fontSmooth="always",b.WebkitFontSmoothing="antialiased",
b.textDecoration="none",b.zoom=1,b.size=a.h;this.applySkin(a,true)}};b._TextBox_applySkin=b.applySkin;b.applySkin=function(a,b){this._suspendUpdate=true;if(a.editable){var e=null;a.fill&&(e=typeof a.fill=="object"?a.fill.color:a.fill);a.stroke=a.stroke||e||{weight:1,color:"#000000",alpha:1}}this._TextBox_applySkin(a,b);this.textFit=a.textFit||null;this.font=a.font||"Arial, Helvetica, sans-serif";this.align=a.align||"left";this.textScale=a.textScale||1;this.bold=a.bold||0;this.selectable=a.selectable||
0;this.editable=a.editable||0;this.multiline=a.multiline||0;this.baselineShift=a.baselineShift||0;if(!b)this.text=a.text||"";this._previuosText="";this.textColor={};if(a.textSize)this.textSize=a.textSize;a.editable==1&&this.setEditable(1);this.setMultiline(this.multiline,true);this.setText(this.text);if(a.textColor){var e=a.textColor,c={};if(typeof e=="string")c={color:e,alpha:1};else if(c=e,!c.color)c.color=null,c.alpha=null;this.setTextColor(c.color||"#000000",c.alpha||1)}if(a.shadowText)this.shadowText=
a.shadowText;if(a.insetText)this.insetText=a.insetText;if(a.bevelText)this.bevelText=a.bevelText;if(a.outlineText)this.outlineText=a.outlineText;if(a.shadow)this.shadow=a.shadow;if(a.inset)this.insetText=a.inset;if(a.bevel)this.bevel=a.bevel;if(a.outline)this.outline=a.outline;a.padding&&this.setPadding(a.padding);if(a.alphaNumeric)this.alphaNumeric=1;if(a.numeric)this.numeric=1;this.setBaselineShift(this.baselineShift);this._suspendUpdate=false;this._update();this._updateShadowText()};b.setMultiline=
function(a){this.multiline=a;var b=this.style;if(a){if(!this.textSize)this.textSize=12;a="normal"}else a="nowrap";b.whiteSpace=a;if(this._cssStore)this._cssStore.whiteSpace=a;this._fit()};b._canEdit=0;b.setEditable=function(a){a===1?(this.amSM||this.setCursor("text"),this._keyboardHandler?this._keyboardHandler.removeAllEventListeners():this._keyboardHandler=new jbeeb.Keyboard(this.element),this._keyboardHandler.addEventListener("keydown",this.keyHandler,this),this._keyboardHandler.addEventListener("keyup",
this.keyHandler,this),this.setOverflow("hidden"),jbeeb.Utils.bindEvent(this.element,"focus",this.setFocus.bind(this)),jbeeb.Utils.bindEvent(this.element,"blur",this._updateChange.bind(this)),this.addMEL("mouseUp",this.setFocus,this)):(this.amSM||this.setCursor("default"),this._keyboardHandler&&this._keyboardHandler.removeAllEventListeners(),jbeeb.Utils.unbindEvent(this.element,"focus",this.setFocus.bind(this)));this.editable=a};b.numeric=null;b.alphaNumeric=null;b.keyHandler=function(a,b,c){var d=
true;this.alphaNumeric?d=this._keyboardHandler.alphaNumeric(b):this.numeric&&(d=this._keyboardHandler.numeric(b));if(this.multiline==0&&(b==108||b==13))d=false,c=="keyup"&&this.dispatchEvent("enter",this,this.text);b==9&&(d=false,c=="keyup"&&this.dispatchEvent("tab",this,this.text));d?(this.text=this._canEdit&&!this.multiline?this.element.value:this._textNode.text,c=="keyup"&&this.dispatchEvent("change",this,this.text)):this._keyboardHandler.block(a)};b._updateChange=function(){this.dispatchEvent("change",
this,this.text)};b.setPadding=function(a){this.padding=a;var b;b=this._textNode?this._textNode.style:this.style;var c="",d="",f="",i="";this.multiline?(c=a+"px",d=a+"px",f=a+"px",i=a+"px"):this.align=="left"?a&&(c=a+"px"):this.align=="right"&&a&&(d=a+"px");b.paddingLeft=c;b.paddingRight=d;b.paddingTop=f;b.paddingBottom=i;if(this._cssStore)a=this._cssStore,a.paddingLeft=c,a.paddingRight=d,a.paddingTop=f,a.paddingBottom=i};b._format=function(){var a=this.font,b=this.textColor||{},b=jbeeb.Utils.makeColor(b.color,
b.alpha),c=this.bold?"bold":"normal",d=this.style;d.fontFamily=a;d.color=b;d.textAlign=this.align;d.fontWeight=c;if(this._cssStore)d=this._cssStore,d.fontFamily=a,d.color=b,d.textAlign=this.align,d.fontWeight=c};b.setFont=function(a){this.font=a;this.style.fontFamily=a;if(this._textNode)this._textNode.style.fontFamily=this.font;if(this._cssStore)this._cssStore.fontFamily=a;this._update()};b.setAlign=function(a){this.align=a;this.style.textAlign=a;a=="center"&&this.setPadding(0);if(this._cssStore)this._cssStore.textAlign=
a};b.setBold=function(a){this.bold=a?"bold":"";this.style.fontWeight=this.bold;if(this._cssStore)this._cssStore.fontWeight=this.bold;this._update()};b.setBaselineShift=function(a){(this.baselineShift=a)?a>1?a=1:a<-1&&(a=-1):a=0;a*=-1;this._BLScomp=1+a;this._update()};b.measureText=function(a){if(this.text||a){var b=document.createElement("div");document.body.appendChild(b);var c=b.style;c.fontSize=this.height*this.textScale+"px";c.fontFamily=this.font;c.fontWeight=this.bold?"bold":"normal";c.position=
"absolute";c.left=-1E3;c.top=-1E3;b.innerHTML=a||this.text;a={w:b.clientWidth,h:b.clientHeight};document.body.removeChild(b);return a}else return 0};b.setTextColor=function(a,b){if(!this.textColor)this.textColor={};this.textColor.color=a;this.textColor.alpha=b;var c=jbeeb.Utils.makeColor(a,b);this.style.color=c;if(this._cssStore)this._cssStore.color=c};b.setText=function(a){if(this.element){this.text=a=a==""||!a?"":String(a);if(this._canEdit&&!this.multiline)this.element.value=a;else{if(!this._textNode){var b=
document.createElement("span");b.style.fontFamily=this.font;this.element.appendChild(b);this._textNode=b}this._textNode.innerHTML=a}this._previuosText!=a&&this._update();this._previuosText=a}};b.selectAll=function(){if(this._canEdit)jbeeb.focus=this,this.element.focus(),this.element.select()};b._TextBox_setWidth=b.setWidth;b.setWidth=function(a){a!=this.width&&(this._TextBox_setWidth(a),this._fit())};b._TextBox_setHeight=b.setHeight;b.setHeight=function(a){a!=this.height&&(this._TextBox_setHeight(a),
this._fit())};b._TextBox_setSize=b.setSize;b.setSize=function(a,b){if(a!=this.width||b!=this.height)this._TextBox_setSize(a,b),this._fit()};b.setTextScale=function(a){this.textScale=a||1;this._fit()};b.setTextSize=function(a){this.textSize=a;this._fit()};b.setTextFit=function(a){this.textFit=a;this._fit()};b._TextBox_onAdded=b.onAdded;b.onAdded=function(){this._TextBox_onAdded();this._update()};b.setFocus=function(){jbeeb.focus=this;this.element.focus()};b._fit=function(){if(this.text!=""){var a=
null,b=null,c=null;if(this.textSize)a=this.textSize,b="1em",c=a+"px";else{var d=this.width,f=this.height;if(d>0&&f>0)if(this.textFit=="wh")a=d<f?d:f,a=this.textScale>0?a*this.textScale:a;else if(this.textFit=="w"){if(d=this.width/this.measureText().w/2,jbeeb.Utils.isNumber(d)&&d>0)this.textScale=d,a=f*d}else a=f*this.textScale;else a=0}a&&(b=this.height*this._BLScomp/a+"em",c=a+"px");a=this.style;a.lineHeight=b;a.fontSize=c;if(this._cssStore)this._cssStore.lineHeight=b,this._cssStore.fontSize=c}};
b.getTextSize=function(){return this.style.fontSize||null};b._update=function(){this._suspendUpdate||(this._fit(),this._format())};b._updateShadowText=function(){var a=this._makeShadowText(),b=this._makeBevelText(),c=this._makeOutlineText(),d=this._makeInsetText(),f="none";if(!(a==[]&&b==[]&&c==[]&&d==[])){for(var a=b.concat(c,a,d),b=a.length,c=[],d=[],i=0,g=0;g<b;g++)i==0?a[g]==1&&d.push("inset"):i<4?d.push(a[g]+"px"):(d.push(jbeeb.Utils.makeColor(a[g],a[g+1])),c.push(d.join(" ")),d=[],++g,i=-1),
i++;c.length>0&&(f=c.join(","))}a=this.style;a.textShadow=a.MozTextShadow=a.WebkitTextShadow=a.OTextShadow=a.msTextShadow=f;if(this._cssStore)this._cssStore.textShadow=f};b._makeShadowText=function(){var a=this.shadowText;return a?[0,a.x,a.y,a.s,a.c,a.a]:[]};b.setShadowText=function(a){this.shadowText=a;this._updateShadowText()};b._makeInsetText=function(){var a=this.insetText;return a?[1,a.x,a.y,a.s,a.c,a.a]:[]};b.setInsetText=function(a){this.insetText=a;this._updateShadowText()};b._makeBevelText=
function(){if(this.bevelText){var a=this.bevelText,b=[];a.c1&&a.a1>0&&(b=[0,-a.x,-a.y,a.s1,a.c1||"#000000",a.a1]);a.c2&&a.a2>0&&(b=b.concat([0,a.x,a.y,a.s2,a.c2||"#FFFFFF",a.a2]));return b}else return[]};b.setBevelText=function(a){this.bevelText=a;this._updateShadowText()};b._makeOutlineText=function(){if(this.outlineText){var a=this.outlineText;return[0,-a.weight,-a.weight,a.spread||0,a.color||"#000000",a.alpha,0,a.weight,-a.weight,a.spread||0,a.color||"#000000",a.alpha,0,-a.weight,a.weight,a.spread||
0,a.color||"#000000",a.alpha,0,a.weight,a.weight,a.spread||0,a.color||"#000000",a.alpha]}else return[]};b.setOutlineText=function(a){this.outlineText=a;this._updateShadowText()};b.toString=function(){return"[TextBox (name="+this.name+")]"};b.type="TextBox";jbeeb.TextBox=c})();this.jbeeb=this.jbeeb||{};
(function(){var c=function(a){this.init(a)},b=c.prototype=new jbeeb.Box(null);b._children=[];b.addChild=function(a){if(a==null)return a;var b=arguments.length;if(b>0)for(var c=0;c<b;c++){var d=arguments[c];d.parent&&d.parent.removeChild(d);d.parent=this;d.stage=this.amStage==1?this:this.stage;d.setZ(this._children.length);this.element.appendChild(d.element);d.onAdded&&d.onAdded.call(d);this._children.push(d)}};b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=true;b--;)c=c&&this.removeChild(arguments[b]);
return c}return this.removeChildAt(this._children.indexOf(a))};b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;d<b;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var f=true,d=0;d<b;d++)f=f&&this.removeChildAt(c[d]);return f}if(a<0||a>this._children.length-1)return false;if(b=this._children[a])b.element&&b.element.parentNode&&b.element.parentNode.removeChild(b.element),b.parent=null;this._children.splice(a,1);this._consolidateZ();return true};b.removeAllChildren=
function(){for(var a=this._children;a.length;)this.removeChildAt(0)};b._consolidateZ=function(){for(var a=this._children.length,b=0;b<a;b++){var c=this._children[b];c&&c.setZ(b+1)}};b.toFront=function(a){if(a){for(var b=this._children.length,c=0,d=b;d--;)if(this._children[d]==a){c=d;break}jbeeb.Utils.arrayMove(this._children,c,b-1);this._consolidateZ()}else this.parent&&this.parent.toFront(this)};b.toBack=function(a){if(a){for(var b=0,c=this._children.length;c--;)if(this._children[c]==a){b=c;break}jbeeb.Utils.arrayMove(this._children,
b,0);this._consolidateZ()}else this.parent&&this.parent.toBack(this)};b._Container_init=b.init;b.init=function(a){this._Container_init(a);if(a)this.stage=this.amStage==1?this:this.stage,this._children=[]};b._Container_stretch=b.stretch;b.stretch=function(a,b){var c=a,d=b,f=this.flex;f&&(f.match(/w/)||(c=1),f.match(/h/)||(d=1));for(f=this._children.length;f--;){var i=this._children[f];i&&i.stretch(c,d)}this._Container_stretch(a,b)};b._Container_setFlex=b.setFlex;b.setFlex=function(a){for(var b=this._children.length;b--;)this._children[b].setFlex(a);
this._Container_setFlex(a)};b._Container_destroy=b.destroy;b.destroy=function(){if(this._children)for(var a=this._children.length;a--;)this._children[a]&&(this._children[a].destroy(),this.removeChild(this._children[a]),this._children[a]=null);this._children=null;this._Container_destroy()};b.destroyChildren=function(){if(this._children)for(var a=this._children.length;a--;)this._children[a]&&(this._children[a].destroy(),this.removeChild(this._children[a]),this._children[a]=null);this._children.length=
0;this._children=null;this._children=[]};b.getChildren=function(){return this._children};b.toString=function(){return"[Container (name="+this.name+")]"};b.type="Container";jbeeb.Container=c})();this.jbeeb=this.jbeeb||{};
(function(){var c=function(a){this._configure(a);return this},b=c.prototype=new jbeeb.Container;b.amReady=null;b._readyList=null;b._configure=function(a){if(a){this.amReady=0;if(a.onReady)this._readyList=[],this._readyList.push(a.onReady);this.id=jbeeb.getUID();if(a.stage)this.amStage=0,this._Stage_init(a);else{this.amStage=1;this.parent=this;this.stage=this;var b=a.target,c=null,d=0;if(b)(c=typeof b=="string"?document.getElementById(b):b)?c.nodeType===1?(this.element=document.createElement("div"),this.element.id=
this.id,c.appendChild(this.element)):d=1:d=1;if(!b||d)document.write('<div id="'+this.id+'"></div>'),this.element=document.getElementById(this.id);a.element=this.element;this._Stage_init(a);this.style=this.element.style;this.style.position="relative";this.style.display=a.inline===true||a.inline=="true"||a.inline===1?"inline-block":"block";this.style.verticalAlign="top";this.style.clear="both";this.style.zoom=1;this.setSize(this.width||a.w||1,this.height||a.h||1);this.setOverflow(a.overflow||"visible");
this.setCursor("default")}jbeeb.register(this)}};b._Stage_init=b.init;b.init=function(){var a=jbeeb.Utils.getXYWH(this.element);this.x=a.x;this.y=a.y;this.width=a.width;this.height=a.height;setTimeout(this._doReady.bind(this),50)};b._doReady=function(){this.amReady=1;if(this._readyList)for(var a=0;a<this._readyList.length;a++)this._readyList.pop()()};b.onReady=function(a){if(this.amReady)a();else{if(!this._readyList)this._readyList=[];this._readyList.push(a)}};b.toString=function(){return"[Stage (name="+
this.name+")]"};b.type="Stage";jbeeb.Stage=c})();this.jbeeb=this.jbeeb||{};
(function(){var c=function(a){a=a||{};this._onComplete=a.onComplete;this._userTimezoneOffset=a.timezoneOffset||0;this._digits=a.digits||2;this._truncate=a.truncate||0;this._rangeHi=c._kRange[a.rangeHi]?c._kRange[a.rangeHi]:c._kYear;this._rangeLo=c._kRange[a.rangeLo]?c._kRange[a.rangeLo]:c._kSecond;a.end&&this._setTimeEnd(a.end);return this};c._MS_HOUR=36E5;c._MS_DAY=864E5;c._kMs=0;c._kSecond=1;c._kMinute=2;c._kHour=3;c._kDay=4;c._kMonth=5;c._kYear=6;c._kRange={ms:c._kMs,second:c._kSecond,minute:c._kMinute,
hour:c._kHour,day:c._kDay,month:c._kMonth,year:c._kYear};var b=c.prototype;b._done=false;b._doneFired=false;b._onComplete=null;b._timeEnd=null;b._userTimezoneOffset=0;b._digits=0;b._rangeHi=c._kYear;b._rangeLo=c._kMs;b._truncate=0;b._setTimeEnd=function(a){var b=new Date;if(a instanceof Date)a=new Date(a.getTime());else if(typeof a=="object"){var b=a.year?parseInt(a.year):b.getFullYear(),e=a.month?parseInt(a.month)-1:0,d=a.day?parseInt(a.day):0,f=a.hour?parseInt(a.hour):0,i=a.minute?parseInt(a.minute):
0,g=a.second?parseInt(a.second):0,a=(a.ampm?a.ampm:"am").toLowerCase();f<12&&/p/.test(a)&&(f+=12);a=new Date(b,e,d,f,i,g)}else a=new Date(b.getTime()+(parseInt(a)+1)*1E3);b=0;this._userTimezoneOffset!=0&&(b+=this._userTimezoneOffset*c._MS_HOUR);b!=0&&(a=a.getTime()+b,a=new Date(a));this._timeEnd=a;this._doneFired=this._done=false};b.update=function(){return this._calc(new Date)};b.diff=function(a,b){b&&this._setTimeEnd(b);return this._calc(a)};b._calc=function(a){var b=0,e=0,d=0,f=0,i=0,g=0,j=0,k=
this._timeEnd,o=k.getTime()-a.getTime(),p=Math.floor,v=false;if(o>0){var z=c._MS_HOUR,n=this._rangeLo,m=this._rangeHi;this._truncate&&(n=-1,m=10);var q=c._kMs,s=c._kSecond,r=c._kMinute,w=c._kHour,t=c._kDay,y=c._kMonth,l=o/1E3,u=l/60,x=u/60,B=x/24;n<t&&(m>=q&&(b=p(m==q?o:o%1E3)),m>=s&&(e=p(m==s?l:l%60)),m>=r&&(d=p(m==r?u:u%60)),m>=w&&(f=p(m==w?x:x%24)));o=a.getUTCFullYear();n=a.getUTCMonth();l=a.getUTCDate();q=k.getUTCFullYear();s=k.getUTCMonth();r=k.getUTCDate();w=l;u=0;if(m>=t)if(m==t)i=p(B);else{var i=
a.getUTCHours(),t=a.getUTCMinutes(),a=a.getUTCSeconds(),B=k.getUTCHours(),u=k.getUTCMinutes(),A=k.getUTCSeconds(),k=s+(s==n?0:-1);k<0&&(k+=12);x=c.getMonthDays(k,q);x=x<l?c.getMonthDays(k-1,q):x;x=x<r?r:x;k=0;r>l?k=r-l-1:r<l&&(k=l-r-1);u=(c._MS_DAY-(a+t*60+i*3600)*1E3+(A+u*60+B*3600)*1E3)/z;u<24&&l++;l+=k;i=p((x-l+r+k)%x)}m>=y&&(j=0,g=(q-o)*12,g<0||o==q&&n==s?g=0:(n++,s++,k=0,s==n?w<=r&&k--:s>n?k=s-n-1:s<n&&(k=12-n+s,j--),u<24&&w++,n>=s&&w>r?k--:s>=n&&w<=r&&k++,g+=k,g<0&&(g=0),g>11&&(j+=p(g/12),g%=
12),m==y&&(g+=j*12,j=0)))}else v=true;b={ms:b,second:e,minute:d,hour:f,day:i,month:g,year:j};c.pad(b,this._digits);if(v&&!this._doneFired&&this._onComplete)this._doneFired=this._done=true,this._onComplete(this._timeEnd);return b};c._daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];c.getMonthDays=function(a,b){return a==1?b%400==0||b%4==0&&b%100!=0?29:28:c._daysInMonth[a]};c.pad=function(a,b){if(b)for(var c in a){for(var d=String(a[c]),f=c=="ms"?3:b;d.length<f;)d="0"+d;a[c]=d}};Object.defineProperty(b,
"rangeHi",{get:function(){return this._rangeHi},set:function(a){this._rangeHi=c._kRange[a]?c._kRange[a]:c._kYear}});Object.defineProperty(b,"rangeLo",{get:function(){return this._rangeLo},set:function(a){this._rangeLo=c._kRange[a]?c._kRange[a]:c._kSecond}});jbeeb.TimeDiff=c})();var EXTRACT_START=1,CountdownImageFolder="images/",CountdownImageBasename="flipper",CountdownImageExt="png",CountdownImagePhysicalWidth=41,CountdownImagePhysicalHeight=60,CountdownWidth=400,CountdownHeight=60,CountdownLabels={ms:"MS",second:"SECONDS",minute:"MINUTES",hour:"HOURS",day:"DAYS",month:"MONTHS",year:"YEARS"},CountdownInterval=76,EXTRACT_END=1;
(function(){var c=function(a){this.imageFolder=CountdownImageFolder;this.imageBasename=CountdownImageBasename;this.imageExt=CountdownImageExt;this.imagePhysicalWidth=CountdownImagePhysicalWidth;this.imagePhysicalHeight=CountdownImagePhysicalHeight;this.totalFlipDigits=2;this._params=a||{};var b,c,d,f;if(a.bkgd){var i=a.bkgd;if(i.color)b=i.color;i.stroke&&i.strokeColor&&(c={weight:i.stroke||1,color:i.strokeColor,alpha:i.strokeAlpha});if(i.shadow)d=i.shadow;if(i.rounded)f=i.rounded}this._stage=new jbeeb.Stage({target:a.target,
inline:a.inline||false,w:a.w||a.width||CountdownWidth,h:a.h||a.height||CountdownHeight,rounded:f||null,fill:b||null,stroke:c||null,shadow:d||null});jbeeb.register(this)},b=c.prototype;b._params=null;b._stage=null;b._done=false;b._onComplete=null;b.id=null;b._initDone=false;b._style=null;b.totalFlipDigits=null;b.imageFolder=null;b.imageBasename="flipper";b.imageExt="png";b._blocks=null;b._store=null;b._maxDisplayName="second";b._hideLabels=false;b._labelText=null;b._hideLine=false;b._defaultBlockWidth=
0;b._digitWidth=0;b._blockSpacing=0;b._doublePadding=0;b._orderedBlockList=[];b._previousSizes={};b._interval=0;b._intervalCounter=0;b._timeRunnerNow=null;b.init=function(){this.id=jbeeb.getUID();var a=this._params;this._initDone=this._done=false;this._style=a.style||"boring";this.width=a.w||a.width||CountdownWidth;this.height=a.h||a.height||CountdownHeight;this._onComplete=a.onComplete;this._hideLabels=a.hideLabels;this._hideLine=a.hideLine;this._labelText=a.labelText||CountdownLabels;this._interval=
a.interval||CountdownInterval;this._intervalCounter=0;this._timeRunnerNow={year:0,month:0,day:0,hour:0,minute:0,second:0,ms:0};var b="";if(this._style=="flip"){b="";if(this.imageFolder.substr(1)!="/"&&this.imageFolder.substr(4)!="http")b=jbeeb.scriptPath,b!=""&&b.substr(4)=="http"&&b.substr(-1)!="/"&&(b+="/");this.imageFolder.substr(-1)!="/"&&(this.imageFolder+="/");b=b+this.imageFolder+this.imageBasename}this._store={ms:{use:false,prev:[null,null],ani:[null,null],aniCount:[null,null]},second:{use:false,
prev:[null,null],ani:[null,null],aniCount:[null,null]},minute:{use:false,prev:[null,null],ani:[null,null],aniCount:[null,null]},hour:{use:false,prev:[null,null],ani:[null,null],aniCount:[null,null]},day:{use:false,prev:[null,null],ani:[null,null],aniCount:[null,null]},month:{use:false,prev:[null,null],ani:[null,null],aniCount:[null,null]},year:{use:false,prev:[null,null],ani:[null,null],aniCount:[null,null]}};for(var c="ms,second,minute,hour,day,month,year".split(","),d=a.rangeLo?a.rangeLo:"second",
f=a.rangeHi?a.rangeHi:"year",d=d!="ms"&&d.substr(-1)=="s"?d.substr(0,d.length-1):d,f=f!="ms"&&f.substr(-1)=="s"?f.substr(0,f.length-1):f,i=d,g=f,j=0;j<c.length;j++){var k=c[j];k==d&&(d=j);k==f&&(f=j)}for(j=0;j<c.length;j++)if(j>=d&&j<=f)k=c[j],this._store[k].use=true,this._maxDisplayName=k;k=a.padding===0?0:a.padding?a.padding:this._style=="flip"?0:0.8;this._style=="flip"&&(k/=2);var o=this.height,d=this.width/(f-d+1),f=this._hideLabels?0:d*0.25,p=d*0.1,v=d-p,z=o-f,n=v*k;this._style=="flip"&&(n=v*
(k/this.totalFlipDigits));var m=v-n,q=this.height-f*2;this._digitWidth=v/this.totalFlipDigits;this._blockSpacing=p;var s=0;this._style=="flip"&&(q=this.height-f,s=o*0.03);this._defaultBlockWidth=v;this._digitWidth=m*this.totalFlipDigits;this._blockSpacing=p;this._doublePadding=n/2/this.totalFlipDigits/2;var r={font:"Arial, _sans",color:"#FFFFFF",weight:"normal",bkgd:this._style=="flip"?null:{color:["#000000",1,0,"#686868",1,50,"#000000",1,50,"#535050",1,100],alpha:"v"},rounded:this._style=="flip"?
null:0.18,shadow:null},w={font:"Arial, _sans",color:"#303030",weight:"bold",textScale:1,offset:0};if(a.numbers)for(var t in r)a.numbers[t]&&(r[t]=a.numbers[t]);if(a.labels)for(t in w)a.labels[t]&&(w[t]=a.labels[t]);c.reverse();this._blocks={};this._orderedBlockList=[];for(j=t=0;j<c.length;j++){var y=c[j];if(this._store[y].use){this._blocks[y]=new jbeeb.Container({x:t+p/2,y:0,w:v,h:z,rounded:r.rounded||null,fill:jbeeb.Utils.clone(r.bkgd)||null,shadow:r.shadow||null});var l=this._blocks[y];l.store=
{name:y};this._previousSizes[y]=v;if(this._style=="flip"){var u=this.imagePhysicalWidth*((m-s*2-n*2)/this.totalFlipDigits/this.imagePhysicalWidth),x=this.imagePhysicalHeight*(q/this.imagePhysicalHeight);l.time=new jbeeb.Container({x:0,y:0,w:u*this.totalFlipDigits,h:x});for(var B=[],A=0;A<this.totalFlipDigits;A++){for(var C=new jbeeb.Container({x:u*A+s*A,y:0,w:u,h:x}),G=[],D=0;D<10;D++){for(var E=new jbeeb.Container({x:0,y:0,w:u,h:x}),H=[],F=0;F<3;F++){var I=new jbeeb.Box({x:0,y:0,w:u,h:x,image:{url:b+
(""+D+""+F)+"."+this.imageExt,mode:"fit"}});H[F]=I;E.addChild(I)}E.img=H;G[D]=E;C.addChild(E)}C.num=G;B[A]=C;l.time.addChild(C)}l.time.slot=B;l.addChild(l.time)}else if(l.time=new jbeeb.TextBox({x:0,y:0,w:v,h:z,text:"00",textScale:k,font:r.font,textColor:r.color,align:"center"}),l.addChild(l.time),!this._hideLine)l.line=new jbeeb.Box({x:0,y:0,w:v,h:o*0.03,fill:"#000000"}),l.addChild(l.line),l.line.center();this._stage.addChild(l);if(!this._hideLabels)l.labels=new jbeeb.TextBox({x:t,y:o-f*0.7+w.offset,
w:d,h:f*0.7,font:w.font,textScale:w.textScale,textColor:w.color,bold:1,align:"center",text:this._labelText[y]}),this._stage.addChild(l.labels);this._orderedBlockList.push(l);l.time.center();a.numberMarginTop&&l.time.setY(a.numberMarginTop);t+=d}}l=this._blocks;this._style=="flip"?(l.year&&this._flipRunner("year","00"),l.month&&this._flipRunner("month","00"),l.day&&this._flipRunner("day","00"),l.hour&&this._flipRunner("hour","00"),l.minute&&this._flipRunner("minute","00"),l.second&&this._flipRunner("second",
"00"),l.ms&&this._flipRunner("ms","000")):(l.year&&l.year.time.setText("00"),l.month&&l.month.time.setText("00"),l.day&&l.day.time.setText("00"),l.hour&&l.hour.time.setText("00"),l.minute&&l.minute.time.setText("00"),l.second&&l.second.time.setText("00"),l.ms&&l.ms.time.setText("000"),this._reformat());this._timediff=new jbeeb.TimeDiff({end:a.time?a.time:{year:a.year||a.years,month:a.month||a.months,day:a.day||a.days,hour:a.hour||a.hours,minute:a.minute||a.minutes,second:a.second||a.seconds,ms:a.second||
a.ms,ampm:a.ampm||""},rangeHi:g,rangeLo:i,timezoneOffset:a.offset||0,onComplete:this._doWhenDone.bind(this),truncate:a.truncate||0});this._initDone=true;jbeeb.ticker.addEventListener("tick",this.tick,this)};b.tick=function(){this._initDone===true&&this._timeRunner()};b._doWhenDone=function(a){this._onComplete&&this._onComplete(a)};b._calcSize=function(a){return a.toString().length*this._digitWidth};b._reformat=function(){for(var a=false,b=0;b<this._orderedBlockList.length;b++){var c=this._orderedBlockList[b],
d=c.store.name,f=c.time.text,f=this._calcSize(f);f>=this._defaultBlockWidth&&f!=this._previousSizes[d]&&(c.setWidth(f+this._doublePadding),this._previousSizes[d]=f+this._doublePadding,a=true)}if(a)for(b=a=0;b<this._orderedBlockList.length;b++)c=this._orderedBlockList[b],f=c.time.text,this._calcSize(f),c.setX(a),c.time.setWidth(c.width),c.time.center(),c.labels&&(c.labels.setX(a),c.labels.setWidth(c.width)),c.line&&(c.line.setWidth(c.width),c.line.center()),a+=c.width+this._blockSpacing};b._timeRunner=
function(){this._intervalCounter+=jbeeb.ticker.getInterval();if(this._intervalCounter>this._interval)this._timeRunnerNow=this._timediff.update(),this._intervalCounter=0;var a=this._blocks,b=this._timeRunnerNow;this._style=="flip"?(a.year&&this._flipRunner("year",b.year),a.month&&this._flipRunner("month",b.month),a.day&&this._flipRunner("day",b.day),a.hour&&this._flipRunner("hour",b.hour),a.minute&&this._flipRunner("minute",b.minute),a.second&&this._flipRunner("second",b.second),a.ms&&this._flipRunner("ms",
b.ms)):(a.year&&a.year.time.setText(b.year),a.month&&a.month.time.setText(b.month),a.day&&a.day.time.setText(b.day),a.hour&&a.hour.time.setText(b.hour),a.minute&&a.minute.time.setText(b.minute),a.second&&a.second.time.setText(b.second),a.ms&&a.ms.time.setText(b.ms),this._reformat())};b._flipRunner=function(a,b){for(var c=0;c<this.totalFlipDigits;c++){var d=this._blocks[a].time.slot[c],f=this._store[a],i=String(b).substr(c,1),g=d.num[i];if(g){if(f.prev[c]!=i){for(var j=0;j<10;j++)d.num[j].hide();g.show();
f.ani[c]=true;f.aniCount[c]=0}if(f.ani[c]){for(j=0;j<3;j++)g.img[j].hide();this._done?g.img[2].show():(g.img[f.aniCount[c]].show(),f.aniCount[c]++,f.aniCount[c]>2&&(f.ani[c]=false))}f.prev[c]=i}}};window.Countdown=c})();
/*!
 * The Final Countdown for jQuery v2.1.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2015 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


$(document).ready(function() {
  console.log("this works");
});

(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else {
        factory(jQuery);
    }
})(function($) {
    "use strict";
    var instances = [], matchers = [], defaultOptions = {
        precision: 100,
        elapse: false
    };
    matchers.push(/^[0-9]*$/.source);
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers = new RegExp(matchers.join("|"));
    function parseDateString(dateString) {
        if (dateString instanceof Date) {
            return dateString;
        }
        if (String(dateString).match(matchers)) {
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, "/");
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString + "` to a date object.");
        }
    }
    var DIRECTIVE_KEY_MAP = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        w: "weeks",
        d: "daysToWeek",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
    };
    function escapedRegExp(str) {
        var sanitize = str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(sanitize);
    }
    function strftime(offsetObject) {
        return function(format) {
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (directives) {
                for (var i = 0, len = directives.length; i < len; ++i) {
                    var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), regexp = escapedRegExp(directive[0]), modifier = directive[1] || "", plural = directive[3] || "", value = null;
                    directive = directive[2];
                    if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if (value !== null) {
                        if (modifier === "!") {
                            value = pluralize(plural, value);
                        }
                        if (modifier === "") {
                            if (value < 10) {
                                value = "0" + value.toString();
                            }
                        }
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace(/%%/, "%");
            return format;
        };
    }
    function pluralize(format, count) {
        var plural = "s", singular = "";
        if (format) {
            format = format.replace(/(:|;|\s)/gi, "").split(/\,/);
            if (format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        if (Math.abs(count) === 1) {
            return singular;
        } else {
            return plural;
        }
    }
    var Countdown = function(el, finalDate, options) {
        this.el = el;
        this.$el = $(el);
        this.interval = null;
        this.offset = {};
        this.options = $.extend({}, defaultOptions);
        this.instanceNumber = instances.length;
        instances.push(this);
        this.$el.data("countdown-instance", this.instanceNumber);
        if (options) {
            if (typeof options === "function") {
                this.$el.on("update.countdown", options);
                this.$el.on("stoped.countdown", options);
                this.$el.on("finish.countdown", options);
            } else {
                this.options = $.extend({}, defaultOptions, options);
            }
        }
        this.setFinalDate(finalDate);
        this.start();
    };
    $.extend(Countdown.prototype, {
        start: function() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            var self = this;
            this.update();
            this.interval = setInterval(function() {
                self.update.call(self);
            }, this.options.precision);
        },
        stop: function() {
            clearInterval(this.interval);
            this.interval = null;
            this.dispatchEvent("stoped");
        },
        toggle: function() {
            if (this.interval) {
                this.stop();
            } else {
                this.start();
            }
        },
        pause: function() {
            this.stop();
        },
        resume: function() {
            this.start();
        },
        remove: function() {
            this.stop.call(this);
            instances[this.instanceNumber] = null;
            delete this.$el.data().countdownInstance;
        },
        setFinalDate: function(value) {
            this.finalDate = parseDateString(value);
        },
        update: function() {
            if (this.$el.closest("html").length === 0) {
                this.remove();
                return;
            }
            var hasEventsAttached = $._data(this.el, "events") !== undefined, now = new Date(), newTotalSecsLeft;
            newTotalSecsLeft = this.finalDate.getTime() - now.getTime();
            newTotalSecsLeft = Math.ceil(newTotalSecsLeft / 1e3);
            newTotalSecsLeft = !this.options.elapse && newTotalSecsLeft < 0 ? 0 : Math.abs(newTotalSecsLeft);
            if (this.totalSecsLeft === newTotalSecsLeft || !hasEventsAttached) {
                return;
            } else {
                this.totalSecsLeft = newTotalSecsLeft;
            }
            this.elapsed = now >= this.finalDate;
            this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - now.getFullYear())
            };
            if (!this.options.elapse && this.totalSecsLeft === 0) {
                this.stop();
                this.dispatchEvent("finish");
            } else {
                this.dispatchEvent("update");
            }
        },
        dispatchEvent: function(eventName) {
            var event = $.Event(eventName + ".countdown");
            event.finalDate = this.finalDate;
            event.elapsed = this.elapsed;
            event.offset = $.extend({}, this.offset);
            event.strftime = strftime(this.offset);
            this.$el.trigger(event);
        }
    });
    $.fn.countdown = function() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var instanceNumber = $(this).data("countdown-instance");
            if (instanceNumber !== undefined) {
                var instance = instances[instanceNumber], method = argumentsArray[0];
                if (Countdown.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, argumentsArray.slice(1));
                } else if (String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
                    instance.setFinalDate.call(instance, method);
                    instance.start();
                } else {
                    $.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, method));
                }
            } else {
                new Countdown(this, argumentsArray[0], argumentsArray[1]);
            }
        });
    };
});

$('.carousel').carousel({
  interval: 4000
});

$(document).ready(function() {
  console.log("this works");

  $("#brand").on('click', function() {
    $('html, body').animate({scrollTop: 0}, 1000);
  });

  $("#about-link").on('click', function() {
    $('html, body').animate({scrollTop:$(".about-text").offset().top - 100}, 1000);
  });
  $("#theme-link").on('click', function() {
    $('html, body').animate({scrollTop:$(".theme").offset().top - 100}, 1000);
  });
  $("#watch-link").on('click', function() {
    $('html, body').animate({scrollTop:$(".watch").offset().top - 100}, 1000)
  });
  $("#speakers-link").on('click', function() {
    $('html, body').animate({scrollTop:$(".speakers").offset().top - 100}, 1000)
  });
  $("#team-link").on('click', function() {
    $('html, body').animate({scrollTop:$(".team").offset().top - 100}, 1000)
  });
  $("#top").on('click', function() {
    $('html, body').animate({scrollTop: 0}, 1000)
  });
});


$(window).scroll(function() {
    if ($(this).scrollTop() >= ($(".theme").offset().top) - 200) {
      $("#theme-link").addClass("hover");
    } else {
      $("#theme-link").removeClass("hover");
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= ($(".speakers").offset().top) - 200) {
      $("#speakers-link").addClass("hover");
      $("#theme-link").removeClass("hover");
    } else {
      $("#speakers-link").removeClass("hover");
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= ($(".watch").offset().top) - 200) {
      $("#watch-link").addClass("hover");
      $("#speakers-link").removeClass("hover");
    } else {
      $("#watch-link").removeClass("hover");
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= ($(".team").offset().top) - 200) {
      $("#team-link").addClass("hover");
      $("#watch-link").removeClass("hover");
    } else {
      $("#team-link").removeClass("hover");
    }
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= ($(".about-text").offset().top) - 200) {
      $("#about-link").addClass("hover");
      $("#team-link").removeClass("hover");
    } else {
      $("#about-link").removeClass("hover");
    }
});



