(function() {
  /* global flowplayer */

  var bean = flowplayer.bean
    , common = flowplayer.common
    , $ = window.jQuery;

  flowplayer.overlay.bootstrap = function(api, root) {
    var trigger = api.conf.overlay.trigger
      , modalSize = api.conf.overlay.size
      , modal = $(
      '<div class="modal">'
        + '<div class="modal-dialog ' + (modalSize ? 'modal-' + modalSize : '') +  '">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'
        + '<h4 class="modal-title">Video</h4>'
        + '</div>'
        + '<div class="modal-body"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
      ).appendTo('body');

    modal.find('.modal-body').append(root);

    modal.on('shown.bs.modal', function() {
      api.load(null, function() {
        modal.find('.modal-title').text(api.video.title);
      });
      common.addClass(root, 'is-open');
    });

    modal.on('hidden.bs.modal', function() {
      api.unload();
      common.removeClass(root, 'is-open');
    });

    api.on('unload', function() {
      modal.modal('hide');
    });

    bean.on(document, 'click', trigger, function() {
      modal.modal();
    });

  };
})();
