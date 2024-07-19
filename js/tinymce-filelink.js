/**
 * @file
 * Attach Backdrop behavior for TinyMCE File Link to dialog content.
 *
 * The "glue" between the editor and the view.
 */
(function ($) {
  "use strict";

  Backdrop.behaviors.tinymceFilelinkInsert = {
    attach: function (context) {
      if (typeof tinymce === 'undefined' || !tinymce.activeEditor) {
        return;
      }
      const editor = tinymce.activeEditor;
      // The progress state has been set to true by clicking the trigger
      // element. Loading is done now.
      editor.setProgressState(false);

      $('.view-tinymce-file-browser').once('file-browser-actions', function() {
        // Prevent direct link click, as this might lead to losing content.
        $(this).find('[data-file-id]').on('click', function(event) {
          event.preventDefault();

          let message = Backdrop.t('Open "@file" in a new browser tab?', {'@file': event.target.text});
          editor.windowManager.confirm(message, function(state) {
            if (state) {
              window.open(event.target.href, '_blank');
            }
          });
        });
        // Add event handler to action buttons.
        $(this).find('[data-fid]').on('click', function(event) {
          event.preventDefault();

          let data = event.target.dataset;
          let link = document.querySelector('a[data-file-id="' + data.fid + '"]');
          // Convert URL, shorter relative path.
          let absUrl = new URL(link.href);
          link.href = absUrl.pathname + absUrl.search;

          // Get highlighted content from editor if any.
          let selection = editor.selection.getContent();
          if (selection) {
            link.innerHTML = selection;
          }

          editor.execCommand('mceInsertContent', false, link.outerHTML);
          // Close the jQuery.UI dialog, then put focus back on editor.
          $('#tinymce-filelink-modal').dialog('close');
          editor.focus();
        });
      });
    }
  };
})(jQuery);
