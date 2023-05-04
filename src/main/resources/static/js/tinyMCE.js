function mobileUpload(formData, options) {

    var $form = $("form[name='multipartFileUpload']");
    var $formMobile = $form[0];

    var mobileData = new FormData($formMobile);
    mobileData.append("mobileData", formData);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/file/upload/mobile",
        data: mobileData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            if (typeof(options.callback) === 'function') options.callback(data, options);
        },
        error: function (e) {
        }
    });
}

var tinimceInit = function (options) {

    var option = {
        target: 'tiny-editor'
    };

    $.extend(options, option);

    var tinyEditor = tinymce.init({
        selector: "."+option.target,
        min_height: 500,
        max_height: 1000,
        menubar: false,
        paste_as_text: true,
        fullpage_default_font_size: "14px",
        branding: false,
        plugins: "autolink code link autoresize paste contextmenu image preview imagetools",
        toolbar: "undo redo | fontsizeselect | forecolor | bold italic strikethrough underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link custom_image | code preview",
        fontsize_formats: '10px 12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px',
        relative_urls: false,
        setup: function(editor) {
            editor.ui.registry.addButton('custom_image', {
                icon: 'image',
                tooltip: 'insert Image',
                onAction: function () {
                    documentUpload({
                        multiple: false,
                        accept: '.jpg, .png',
                        callback: function (data) {
                            if (data.rs_st === 0) {
                                var fileInfo = data.rs_data;
                                tinymce.execCommand('mceInsertContent', false,
                                    /**
                                     "<img src='" + fileInfo.fullPath + "' data-mce-src='" + fileInfo.fullPath + "' data-originalFileName='" + fileInfo.orgFilename + "' >");
                                     **/
                                    "<img src='" + fileInfo.thumbnailPath + "' data-originalFileName='" + fileInfo.orgFilename + "' >");
                            }
                        }
                    });
                }
            });
        },
        mobile: {
            theme: 'mobile',
            menubar: true,
            plugins: 'autosave lists autolink image code imagetools',
            toolbar: 'undo | redo | bold | italic | underline | link | unlink | image | fontsizeselect | forecolor',
            imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
            relative_urls: false,
            images_upload_handler: function (blobInfo, success, failure) {
                mobileUpload(blobInfo.blob(), {
                    callback: function(data) {
                        if (data.rs_st === 0) {
                            var fileInfo = data.rs_data;
                            success(fileInfo.thumbnailPath);
                        }
                    }
                });
            }
        }
    });
};
