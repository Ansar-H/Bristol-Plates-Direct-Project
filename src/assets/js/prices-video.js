function hidePlayButton() {
    // Select all elements with the .cs-play class
    const playButtons = document.querySelectorAll('#hero-1805 .cs-play');
    
    // Hide the play button by adding the .cs-hide class
    playButtons.forEach(button => {
      button.classList.add('cs-hide');
    });
  }

function togglePlayButton() {
    // Select all elements with the .cs-video-wrapper class
    const videoWrappers = document.querySelectorAll('#hero-1805 .cs-video-wrapper');
  
    // Add a click event listener to each video wrapper
    videoWrappers.forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        // Hide the play button when clicked
        hidePlayButton();
      });
    });
  }
  
  // Call the function to activate the event listeners
  togglePlayButton();
  
  // Initialize Vimeo Player API to hide play button when video starts playing
  function initVimeoPlayer() {
    const iframe = document.getElementById('vimeo-player');
    if (iframe) {
      // Wait for Vimeo API to be available
      if (typeof Vimeo !== 'undefined') {
        const player = new Vimeo.Player(iframe);
        
        // Hide play button when video starts playing
        player.on('play', function() {
          hidePlayButton();
        });
        
        // Show play button when video is paused (optional)
        player.on('pause', function() {
          const playButtons = document.querySelectorAll('#hero-1805 .cs-play');
          playButtons.forEach(button => {
            button.classList.remove('cs-hide');
          });
        });
      } else {
        // Retry if Vimeo API hasn't loaded yet
        setTimeout(initVimeoPlayer, 100);
      }
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVimeoPlayer);
  } else {
    initVimeoPlayer();
  }