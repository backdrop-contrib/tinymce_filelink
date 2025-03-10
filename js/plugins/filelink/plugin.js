/**
 * @file
 * TinyMCE File Link plugin.
 */
(function () {

  'use strict';
  tinymce.PluginManager.add('filelink', function (editor, url) {
    const triggerId = editor.id + '-filelink-trigger';
    // Do not reuse existing dialog container, as other dialogs can influence
    // its dimensions and position.
    const modalId = 'tinymce-filelink-modal';
    // The first editor instance on page wins creation.
    if (!document.querySelector('#' + modalId)) {
      let modalContainer = document.createElement('div');
      modalContainer.id = modalId;
      modalContainer.style.display = 'none';
      document.body.appendChild(modalContainer);
    }

    editor.on('PreInit', function () {
      let trigger = document.createElement('div');
      trigger.id = triggerId;
      trigger.style.display = 'none';
      trigger.addEventListener('click', function () {
        // @see Backdrop.behaviors.tinymceFilelinkInsert.
        editor.setProgressState(true);
      });
      // Traverse up the dom to the Filter theme wrapper element.
      editor.targetElm.closest('.text-format-wrapper').append(trigger);

      let dialogOptions = {
        target: '#' + modalId,
        classes: {
          'ui-dialog': 'tinymce-filelink-dialog'
        },
        modal: true,
        autoResize: true
      };
      let ajaxOptions = {
        accepts: 'application/vnd.backdrop-dialog',
        url: editor.options.get('tinymceFilelinkBrowseUrl'),
        event: 'click',
        dialog: dialogOptions,
        // We're using the tox throbber, which is prettier and plays nicer
        // with editor fullscreen mode.
        progress: {
          type: 'none'
        }
      };
      let element = document.querySelector('#' + triggerId);
      new Backdrop.ajax(modalId, element, ajaxOptions);
    });

    editor.ui.registry.addButton('filelink', {
      icon: 'link-file',
      tooltip: editor.options.get('tinymceFilelinkTooltip'),
      enabled: !!editor.options.get('tinymceFilelinkEnabled'),
      onAction: function () {
        // Make sure, our editor is the active one.
        editor.focus();
        let element = document.querySelector('#' + triggerId);
        // Open the jQuery.UI dialog.
        element.click();
      }
    });
  });

})();
