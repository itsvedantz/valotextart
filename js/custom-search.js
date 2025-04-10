jQuery(document).ready(function($) {
    var filterTimeout; // Timeout variable to control the delay in filtering

    // Function to apply live search filter to the loop items
    function liveSearch() {
        var searchText = $('#filter-input').val().toLowerCase(); 
        var $loopItems = $('#textarts-gallery .e-loop-item');
    
        $loopItems.each(function() {
            var $this = $(this);
    
            var itemText = $this.text().toLowerCase(); 
            var isVisible = itemText.includes(searchText);
    
            if (isVisible) {
                $this.css('display', '').addClass('fade-in').removeClass('fade-out');
            } else {
                $this.css('display', 'none').addClass('fade-out').removeClass('fade-in');
            }
        });
    }


    // Event listener for changes in the filter input field
    $('#filter-input').on('input', function() {
        clearTimeout(filterTimeout); // Clear previous timeout to prevent multiple triggers
        filterTimeout = setTimeout(function() {
            liveSearch(); // Trigger live search after the user stops typing
        }, 300); // Slightly faster debounce delay for responsiveness
    });

    // Reinitialize the live search and loop items after Elementor filters content
    $(document).on('elementor/frontend/loaded', function() {
        liveSearch(); // Re-trigger live search for newly rendered items
    });

    // Initial live search on page load if any text is present in the input
    if ($('#filter-input').val()) {
        liveSearch();
    }
});