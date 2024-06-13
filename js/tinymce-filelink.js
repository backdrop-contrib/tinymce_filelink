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
      // The progress state has been set to true by clicking the trigger
      // element. Loading is done now.
      tinymce.activeEditor.setProgressState(false);

      $('.view-tinymce-file-browser').once('file-browser-actions', function() {
        // Prevent direct link click, as this might lead to losing content.
        $(this).find('[data-file-id]').on('click', function(event) {
          event.preventDefault();
          if (window.confirm(Backdrop.t('Open file in new tab?'))) {
            window.open(event.target.href, '_blank');
          }
        });
        // Add event handler to action buttons.
        $(this).find('[data-fid]').on('click', function(event) {
          event.preventDefault();

          let data = event.target.dataset;
          let link = document.querySelector('a[data-file-id="' + data.fid + '"]');
          // Convert URL, shorter relative path.
          let absUrl = new URL(link.href);
          link.href = absUrl.pathname + absUrl.search;

          const editor = tinymce.activeEditor;
          // Get highlighted content from editor if any.
          let node = editor.selection.getNode();
          let text = editor.selection.getContent({ format: 'text' });
          let insertContent = '';
          // Link wrapped around image.
          if (node.nodeName === 'IMG') {
            link.replaceChildren(node);
            insertContent = link.outerHTML;
          }
          // Regular text.
          else if (text.length) {
            let newtext = document.createTextNode(text);
            link.replaceChildren(newtext);
            insertContent = link.outerHTML;
          }
          // Insert file link as-is, attach a space for easier typing after.
          else {
            insertContent = link.outerHTML + ' ';
          }

          editor.execCommand('mceInsertContent', false, insertContent);
          // Close the jQuery.UI dialog, then put focus back on editor.
          $('#tinymce-filelink-modal').dialog('close');
          editor.focus();
        });
      });
    }
  };
})(jQuery);
