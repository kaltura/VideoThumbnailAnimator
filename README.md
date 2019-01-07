# Kaltura Video Thumbnails Animator
Video thumbnails using Kaltura's Image Transformation API and JavaScript. Including low-rest blurred loading while animation stripe loads in the backgroud.

This script uses percentages based CSS logic to create responsive animated video thumbnails with CSS stripes of the video animation frames created by the [Kaltura Thumbnail API](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html/).  

The logic used is as follow:
* Thumbnail Stripe Width in Percentage: total slices multiplied by 100. 
* Thumbnail Stripe X Position in Percentage: the total slices minus 1 (0-index) described as percent (100 divided by total slices minus 1), multiplied by the current slice nunmber (0-index). 

# How to use
View-source on [`index.html`](https://kaltura.github.io/VideoThumbnailAnimator/) for a quick referecne example.
Include the ThumbAnimator script:
```html
<head>
  <script src="./KalturaThumbAnimator.js"></script>
</head>
<body>
   <div class="videothumbnail" kfps="4.5" kslices="30" kwidth="600" kpid="2421271" kentryid="1_fjqtp7ki" kquality="75" kcrop="2"></div>
  <script>
    var thumbAnimator = new KalturaThumbAnimator();
    thumbAnimator.setup("videothumbnail", "https://cfvod.kaltura.com", true); //use blurred deffered loading
    thumbAnimator.setup("videothumbnail"); //regular load
  </script>
</body>
```

## Per Thumbnail Parameters
Passed as attributes on the thumbnail divs:
* `kslices` - Total frames in the CSS Stripe image (will be generated by the Kaltura thumbnail API).
* `kpid` - The Kaltura Account ID (Partner ID in [KMC Integration Settings](https://kmc.kaltura.com/index.php/kmcng/settings/integrationSettings)).
* `kentryid` - The Kaltura Video Entry ID (ID field from the [KMC Content Tab](https://kmc.kaltura.com/index.php/kmcng/content/entries/list)).
* `kwidth` - Frame width in px (for each single image in the CSS Stripe image - will be generated by the Kaltura thumbnail API).
* `kfps` - Frames per second (how many frames to show per second in the animation, default is `4.5`). You can further optimize the experience by calculating the kfps param dynamically based on the video duration and set number of frames in the slice (subjective tests show that `kslices / (videoSeconds / 2)` generally provdies a good experience. 
* `kquality` - The JPEG compression quality (0-100, default is `100`) (will be generated by the Kaltura thumbnail API).
* `kcrop` - The Crop Type to be passed to the [Kaltura Thumbnail API](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html/) (default is `5`: Stretch to width).

## `thumbAnimator.setup()` Parameters
* `thumbClassName` - The CSS class name to apply the ThumbAnimator logic on. 
* `kalturaDomain` - The Kaltura API host to work on (leave default if using Kaltura.com as your service, default: `://cfvod.kaltura.com`).
* `useLazy` - Apply blurred deffered background loading (true) or load stripes directly (default: `false`).
* `lazyFilter` - The CSS filter to apply as blurring effect while bg loading the full stripe (default: `blur(3px) grayscale(100%) brightness(130%)`).

# How you can help (guidelines for contributors) 
Thank you for helping Kaltura grow! If you'd like to contribute please follow these steps:
* Use the repository issues tracker to report bugs or feature requests
* Read [Contributing Code to the Kaltura Platform](https://github.com/kaltura/platform-install-packages/blob/master/doc/Contributing-to-the-Kaltura-Platform.md)
* Sign the [Kaltura Contributor License Agreement](https://agentcontribs.kaltura.org/)

# Where to get help
* Join the [Kaltura Community Forums](https://forum.kaltura.org/) to ask questions or start discussions
* Read the [Code of conduct](https://forum.kaltura.org/faq) and be patient and respectful

# Get in touch
You can learn more about Kaltura and start a free trial at: http://corp.kaltura.com    
Contact us via Twitter [@Kaltura](https://twitter.com/Kaltura) or email: community@kaltura.com  
We'd love to hear from you!

# License and Copyright Information
All code in this project is released under the [AGPLv3 license](http://www.gnu.org/licenses/agpl-3.0.html) unless a different license for a particular library is specified in the applicable library path.   

Copyright © Kaltura Inc. All rights reserved.   
Authors and contributors: See [GitHub contributors list](https://github.com/kaltura/YOURREPONAME/graphs/contributors).  

### Open Source Libraries
Review the [list of Open Source 3rd party libraries](open-source-libraries.md) used in this project.
