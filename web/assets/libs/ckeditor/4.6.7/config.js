/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'zh-cn';
	// config.uiColor = '#AADC6E';

    config.toolbar_Minimal = [
        { items: [ 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'RemoveFormat', 'PasteText', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'Source', 'Image', 'CodeSnippet', 'kityformula'] }
    ];

    config.toolbar_editVip = [
        { items: [ 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'RemoveFormat', 'PasteText', '-', 'NumberedList', 'BulletedList'] }
    ];

    config.toolbar_Simple = [
        { items: [ 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'RemoveFormat', 'PasteText', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', 'Image', 'CodeSnippet', '-', 'Source'] }
    ];

    config.toolbar_Thread = [
        { items: [ 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'RemoveFormat', 'PasteText', '-', 'Smiley', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', 'Image', 'CodeSnippet', '-', 'Source', 'kityformula'] }
    ];

    config.toolbar_Question = [
        { items: [ 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'RemoveFormat', 'PasteText', '-', 'QuestionBlank', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'Source', 'Image', 'CodeSnippet', 'kityformula'] }
    ];

    config.toolbar_Group = [
        { items: [ 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'RemoveFormat', 'PasteText', '-', 'Smiley', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', 'Image', 'CodeSnippet', '-', 'Source'] }
    ];

    config.toolbar_Detail = [
        { items: [ 'FontSize'] },
        { items: [ 'Bold', 'Italic', 'Underline', 'TextColor', '-', 'RemoveFormat', 'PasteText', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', 'Image', 'CodeSnippet', '-', 'Source', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] }
    ];

    config.toolbar_Full = [
        { items: [ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat', 'Format' ] },
        { items: [ 'Link', 'Unlink' ] },
        { items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
        { items: [ 'FontSize', 'TextColor', 'BGColor' ] },
        { items: [ 'Image', 'CodeSnippet', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar', 'Iframe', 'kityformula' ] },
        { items: [ 'PasteText', 'PasteFromWord'] },
        { items: [ 'Find', '-', 'Source', '-', 'Maximize'] }
    ];

    config.toolbar_Admin = [
        { items: [ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat', 'Format' ] },
        { items: [ 'Link', 'Unlink' ] },
        { items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
        { items: [ 'FontSize', 'TextColor', 'BGColor' ] },
        { items: [ 'Image', 'CodeSnippet','Flash', 'Table', 'HorizontalRule', 'SpecialChar', 'Iframe' ] },
        { items: [ 'PasteText', 'PasteFromWord'] },
        { items: [ 'Find', '-', 'Source', '-', 'Maximize'] }
    ];

    config.resize_enabled = false;
    config.title = false;

    config.extraPlugins = 'codesnippet,questionblank,smiley,table,font,kityformula';
    config.codeSnippet_theme = 'zenburn';
};

