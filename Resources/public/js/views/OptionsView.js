tuna.view.OptionsView = Backbone.View.extend({
    events: {
        'click .btn-gallery': '_onGalleryOpen',
        'click .btn-attachments': '_onAttachmentsOpen'
    },

    initialize: function () {
        this.$el.addClass('magictime');
        new tuna.view.MainImageView({
            el: this.$('.thecodeine_admin_main_image')
        });
    },

    _onGalleryOpen: function () {
        $('.admin-gallery-container').trigger('open');
    },

    _closeGallery: function () {
        $('.admin-gallery-container').trigger('close');
    },

    _onAttachmentsOpen: function () {
        $('.admin-attachments-container').trigger('open');
    },

    _closeAttachments: function () {
        $('.admin-attachments-container').trigger('close');
    }
});
