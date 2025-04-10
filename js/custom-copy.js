jQuery(document).ready(function($) {
    // Add alert div if not exists
    if ($('#copy-alert').length === 0) {
        $('body').append('<div id="copy-alert">Copied to clipboard!</div>');
    }

    var $alert = $('#copy-alert');
    var timeout; // Declare timeout variable once

    $(document).on('click', '.copy-card', function () {
        var $copyCard = $(this); // Cache the clicked element
        var textToCopy = $copyCard.data('copy-text');

        // Find the postId (cached for better performance)
        var postId = $copyCard.closest('.elementor-element').find('#textarts-image').data('post-id');

        // Copy to clipboard
        var tempInput = $('<textarea>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();
        document.execCommand('copy');
        tempInput.remove();

        // Restart animation
        $alert.removeClass('show');
        void $alert[0].offsetHeight; // Trigger reflow

        $alert.addClass('show');

        // Clear and set timeout to remove the alert after 2 seconds
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            $alert.removeClass('show');
        }, 2000);

        // Only send the AJAX request if postId is valid
        if (postId) {
            $.ajax({
                type: 'POST',
                url: clickTrackingParams.ajax_url,
                data: {
                    action: 'update_click_count',
                    post_id: postId,
                }
            });
        }
    });
});
