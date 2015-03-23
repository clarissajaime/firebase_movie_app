var Alert = (function() {
    
    // on button click, show alert
    $( '.button-to-click' ).click( handleClick );
    function handleClick() {
        showAlert( $('.alert') );   
    }
    
    // if alert button clicked, hide
    $('.alert__close').click(handleClose);
    function handleClose() {
        hideAlert( $('.alert') );
    }
    
    function hideAlert( alert ) {
        alert.addClass( 'alert--hidden' );
    }
    function showAlert( alert ) {
        alert.removeClass( 'alert--hidden' );
    }
    
    // toggle alerts 
    $('.toggle').click( toggleAlerts );
    function toggleAlerts() {
        
        if ( $('.alert').hasClass('alert--hidden') ) {
            // it is not showing, so show it
            showAlert( $('.alert') );
        }
        else {
            // otherwise it *IS* showing, so hide it
            hideAlert( $('.alert') );            
        }
    }
    
})();