/**
 * @file
 * TinyMCE video filter plugin.
 */
(function () {

  'use strict';
  tinymce.PluginManager.add('filelink', function (editor, url) {
    const triggerId = editor.id + '-filelink-trigger';
    // Do not reuse existing dialog container, as other dialogs can influence
    // its dimensions. The first editor instance on page wins creation.
    const modalId = 'tinymce-filelink-modal';
    if (!document.querySelector('#' + modalId)) {
      let modalContainer = document.createElement('div');
      modalContainer.id = modalId;
      modalContainer.style.cssText = 'display:none;';
      document.body.appendChild(modalContainer);
    }

    editor.on('PreInit', function () {
      let parent = document.querySelector('#' + editor.id).parentElement;// form-textarea-wrapper
      let trigger = document.createElement('div');
      trigger.id = triggerId;
      parent.parentElement.parentElement.append(trigger);

      let dialogOptions = {
        height: Math.min(800, window.innerHeight) - 60,
        width: Math.min(800, window.innerWidth) - 40,
        target: '#' + modalId,
        classes: {
          'ui-dialog': 'tinymce-filelink-dialog'
        },
        modal: true
      }
      let ajaxOptions = {
        accepts: 'application/vnd.backdrop-dialog',
        url: editor.options.get('tinymceFilelinkBrowseUrl'),
        event: 'click',
        dialog: dialogOptions,
        progress: {
          type: 'none'/* @todo not sure yet... */
        }
      }
      let element = document.querySelector('#' + triggerId);
      new Backdrop.ajax(modalId, element, ajaxOptions);
    });

    editor.ui.registry.addButton('filelink', {
      icon: 'link-file',
      tooltip: editor.options.get('tinymceFilelinkTooltip'),
      onAction: function () {
        let element = document.querySelector('#' + triggerId);
        // Open the jQuery.UI dialog.
        element.click();
      }
    });
/*
    editor.ui.registry.addMenuItem('filelink', {
      icon: 'link-file',
      text: 'browse stuff',
      onAction: function () {
        let config = getDialogConfig();
        editor.windowManager.open(config);
      }
    });
*/
  });

})();
