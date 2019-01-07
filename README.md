# Kaltura Video Thumbnails Animator
Video thumbnails using Kaltura's Image Transformation API and JavaScript. Including low-rest blurred loading while animation stripe loads in the backgroud.

This script uses percentages based CSS logic to create responsive animated video thumbnails with CSS stripes of the video animation frames created by the [Kaltura Thumbnail API](https://developer.kaltura.com/api-docs/Engage_and_Publish/kaltura-thumbnail-api.html/).  

The logic used is as follow:
* Thumbnail Stripe Width in Percentage: total slices multiplied by 100. 
* Thumbnail Stripe X Position in Percentage: the total slices minus 1 (0-index) described as percent (100 divided by total slices minus 1), multiplied by the current slice nunmber (0-index). 

# How to use
See `index.html` for referecne.
Include the ThumbAnimator script:
```html
<head>
  <script src="./KalturaThumbAnimator.js"></script>
</head>
<body>
   <div class="videothumbnail" kfps="4.5" kslices="30" kwidth="600" kpid="2452601" kentryid="1_kslo5wwo" kquality="45" kcrop="2"></div>
  <script>
    var thumbAnimator = new KalturaThumbAnimator();
    thumbAnimator.setup("videothumbnail", "https://cfvod.kaltura.com", true); //use blurred deffered loading
    //thumbAnimator.setup("videothumbnail", "https://cfvod.kaltura.com", false); //regular load without deferring
  </script>
</body>
```

## Per Thumbnail Parameters
* kfps
* kslices
* kwidth
* kpid
* kentryid
* kquality
* kcrop

## Animator Parameters
* thumbClassName
* kalturaDomain
* useLazy

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
