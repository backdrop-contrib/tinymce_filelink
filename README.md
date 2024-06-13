# TinyMCE File Link

A TinyMCE plugin with a toolbar button that opens a dialog to conveniently
insert a link to a file previously uploaded to the server.
Like the link plugin does, but more convenient.

![Screenshot of the open dialog](https://raw.githubusercontent.com/backdrop-contrib/tinymce_filelink/1.x-1.x/screenshots/tinymce-filelink-dialog.webp)

The listing has filters, provides more info about the file, and allows to
preview the file.

Useful, if you have lots of files (like documents) and need to link to them
in content regularly.

The listing is a view, so if you need more or different filter criteria or more
info columns, adapt the "tinymce_file_browser" view as needed via Views
admin UI.

If people have access to the editor, but no access to the browser view (by
views access setting), the button will still be visible, but disabled.

The browser view also allows to change the link contents, as the markup from
the preview column is the markup that will get inserted.
Unless you selected an image or text in the editor before opening the dialog,
as then the link will get wrapped around your selection.

## Installation

Install this module using the official [Backdrop CMS instructions](https://docs.backdropcms.org/documentation/extend-with-modules)

Edit one of your TinyMCE editor profiles to add this plugin to the toolbar.

## Issues

Bugs and feature requests should be reported in the [Issue Queue](https://github.com/backdrop-contrib/tinymce_filelink/issues)

## Current Maintainers

- [Indigoxela](https://github.com/indigoxela)

## License

This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.
