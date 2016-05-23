window.tuna || (window.tuna = {
    locale: 'pl',
    website: {},
    backbone: {},
    templates: {},
    view: {
        helpers: {}
    },
    model: {},
    collection: {},
    router: {},
    features: {}
});

/**
 * Main admin website object
 *
 */
tuna.website = {
    init: function() {

        //init main views
        new tuna.view.NavigationView({el: $('nav')[0]});
        new tuna.view.ListView({el: $('.admin-list')[0]});
        new tuna.view.OptionsView({el: $('.admin-option-container')[0]});
        new tuna.view.GalleryView({el: $('.admin-gallery-container')[0]});
        new tuna.view.AttachmentsView({el: $('.admin-attachments-container')[0]});

        //WYSIWYG EDITOR
        tuna.view.EditorView && new tuna.view.EditorView({
            selector: '.tab-pane.active .thecodeine_admin_editor'
        });
    },

    goToUri: function(uri) {
        top.location.href = uri;
    }
};

/**
 * Main admin menu view
 *
 * @type {*|void}
 */
tuna.view.NavigationView = Backbone.View.extend({
   events: {
       'change select': "onSelectChange"
   },

   onSelectChange: function(e)  {
       tuna.website.goToUri($(e.target).val());
   }
});

/**
 * Items Lists
 *
 * @type {*|void}
 */
tuna.view.ListView = Backbone.View.extend({
    events: {
        'click [data-action="delete"]': "onDeleteItem"
    },

    onDeleteItem: function(e)  {
        $('#modalConfirm .modal-body p').html(
            'Czy na pewno chcesz usunąć <br/> <b>' + $(e.target).data('title') + '</b>?'
        );
        $('#modalConfirm').modal({
            keyboard: true
        });
        $('#modalConfirm [data-action="accept"]')
            .data('url', $(this).data('url'))
            .off('click').on('click', function(){
                $.get($(e.target).data('url')).
                    done(function(){
                        location.reload();
                    })
                    .fail(function(){
                        alert('Error');
                    });
                $('#modalConfirm').modal('hide');
        });
    }
});

tuna.view.OptionsView = Backbone.View.extend({
    events: {
        'click .btn-gallery': '_onGalleryOpen',
        'click .btn-attachments': '_onAttachmentsOpen'
    },

    initialize: function() {
        this.$el.addClass('magictime');
    },

    _onGalleryOpen: function() {
        $('.admin-gallery-container').trigger('open');
    },

    _closeGallery: function() {
        $('.admin-gallery-container').trigger('close');
    },

    _onAttachmentsOpen: function() {
        $('.admin-attachments-container').trigger('open');
    },

    _closeAttachments: function() {
        $('.admin-attachments-container').trigger('close');
    }
});

tuna.view.GalleryView = Backbone.View.extend({

    events: {
        "click .add_new_item": "_onAddNewItem",
        "click .delete": "_onClickDelete",
        "change input[type='file']": "_onInputFileChange",
        'click .close': "_onClose",
        'close': "_onClose",
        'open': "_onOpen",
        'click': '_onClick'
    },

    initialize: function() {
        this.$el.addClass('magictime');
        this._initSortable();
    },

    _onClick: function(e) {
        e.stopPropagation();
    },

    _initSortable: function() {
        var oThis = this;
        this.$('.gallery-items')
            .sortable({
                handle: '.handle'
            })
            .disableSelection()
            .bind('sortupdate', function() {
                oThis.recalculateImagePositions();
            });
    },

    _onClose: function() {
        this.$el.removeClass('slideLeftRetourn').addClass('holeOut');
    },

    _onOpen: function() {
        $('.admin-attachments-container').trigger('close');
        this.$el.removeClass('holeOut').show().addClass('slideLeftRetourn');
    },

    recalculateImagePositions: function(){
        this.$('input.position').each(function(idx){
            $(this).val(idx);
        });
    },

    choiceEventListener: function(index) {
        var oThis = this;

        if ($('#thecodeine_pagebundle_page_gallery_items_' + index + '_type').length > 0) {
            var id = '#thecodeine_pagebundle_page_gallery_items_';
        } else if ($('#thecodeine_newsbundle_news_gallery_items_' + index + '_type').length > 0) {
            var id = '#thecodeine_newsbundle_news_gallery_items_';
        }

        var $type = $(id + index + '_type');

        // When sport gets selected ...
        $type.change(function() {
            $type.hide();
            // ... retrieve the corresponding form.
            var $form = $(this).closest('form');
            // Simulate form data, but only include the selected sport value.
            var data = $form.serialize();
            // Submit data via AJAX to the form's action path.
            $.ajax({
                url : $form.attr('action'),
                type: $form.attr('method'),
                data : data,
                success: function(html) {
                    // Replace current position field ...
                    $(id + index).replaceWith(
                        // ... with the returned one from the AJAX response.
                        $(html).find(id + index)
                    );
                }
            });
        });
    },

    _onAddNewItem: function(e) {
        var prototype = $(e.currentTarget).data('prototype');
        // get the new index
        var index = $(e.currentTarget).data('index');
        index = index ? index : $('li.item').size();
        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        var newForm = prototype.replace(/__name__/g, index);
        // increase the index with one for the next item
        $(e.currentTarget).data('index', index + 1);

        this.$('.gallery-items').prepend($(newForm));
        this.choiceEventListener(index);
    },

    _onClickDelete: function(e) {
        $(e.currentTarget).parent().remove()
    },

    _onInputFileChange: function(e) {
        var $element = $(e.currentTarget);
        var files = e.target.files; // FileList object
        $element.parent().removeClass('jelly-in');
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(event) {
                    // Render thumbnail.
                    var $cnt = $element.parent();
                    $cnt.css({
                        'background-image': 'url('+event.target.result+')',
                        'background-size' : 'cover',
                        height: '85px',
                        width: '180px',
                        position: 'relative',
                        top: 0,
                        left: 0,
                        'zIndex': 9
                    });
                }
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }
});

tuna.view.AttachmentsView = Backbone.View.extend({

    events: {
        "click .add_new_attachment": "_onAddNewAttachment",
        "click .delete": "_onClickDelete",
        'click .close': "_onClose",
        'close': "_onClose",
        'open': "_onOpen",
        'click': "_onClick"
    },

    initialize: function() {
        this.$el.addClass('magictime');
        this._initSortable();
    },

    _onClose: function() {
        this.$el.removeClass('slideLeftRetourn').addClass('holeOut');
    },

    _onOpen: function() {
        $('.admin-gallery-container').trigger('close');
        this.$el.removeClass('holeOut').show().addClass('slideLeftRetourn');
    },

    recalculateImagePositions: function(){
        this.$('input.position').each(function(idx){
            $(this).val(idx);
        });
    },

    _initSortable: function() {
        var oThis = this;
        this.$('.attachments')
            .sortable({
                handle: '.handle'
            })
            .disableSelection()
            .bind('sortupdate', function() {
                oThis.recalculateImagePositions();
            });
    },

    _destroySortable: function() {
        this.$('.attachments').sortable('destroy');
    },

    _onClick: function(e) {
        e.stopPropagation();
    },

    _onAddNewAttachment: function(e) {
        this._destroySortable();

        var prototype = $(e.currentTarget).data('prototype');
        // get the new index
        var index = $(e.currentTarget).data('index');
        index = index ? index : $('li.item').size();
        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        var newForm = prototype.replace(/__name__/g, index);
        // increase the index with one for the next item
        $(e.currentTarget).data('index', index + 1);

        this.$('.attachments').prepend($(newForm).addClass('jelly-in'));
        this.recalculateImagePositions();
        this._initSortable();
    },

    _onClickDelete: function(e) {
        $(e.currentTarget).parent().remove()
    }

});