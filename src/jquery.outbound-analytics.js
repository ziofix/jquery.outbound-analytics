/*global _gaq: false*/
(function($) {

  $.fn.outboundAnalytics = function(options) {
    var defaults = {
          category: 'Outbound Links',
          action: 'Click',
          label: function () { return $(this).attr('href'); },
          nonInteraction: false
        },
        settings = $.extend({}, defaults, options);

    return this.find('a[href]').filter(function () {
      return (this.host !== location.host);
    }).click(function() {
      var params = {}, link = this;

      $.each(settings, function (key, value) {
        params[key] = ($.isFunction(value)) ? value.call(link) : value;
      });

      try {
        if(_gaq !== undefined) {
          _gaq.push(['_trackEvent', params.category, params.action, params.label, params.value, params.nonInteraction]);
        } else {
          ga('send', 'event', params.category, params.action, params.label, params.value, {'nonInteraction': params.nonInteraction});
        }
      } catch (e) {
        // do something in the future
      }
    }).end().end();
  };

  $.outboundAnalytics = function(options) {
    $('body').outboundAnalytics(options);
  };

}(jQuery));
