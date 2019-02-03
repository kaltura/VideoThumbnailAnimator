function KalturaThumbAnimator () {
  
  var _this = this;
  var lazyQuality = 65;
  var lazyWidth = 120;
  var _startFrame = 0;
  
  this.setup = function (thumbClassName, kalturaDomain = '//cdnapisec.kaltura.com', startFrame = 0, useLazy = false, lazyFilter = 'grayscale(100%) brightness(130%)') {
    var matches = Array.from(document.getElementsByClassName(thumbClassName));
    var _useLazy = useLazy;
    _this._startFrame = startFrame;
    matches.forEach(function(thumbEl) {
      thumbData = _this.getKThumbData(thumbEl);
      thumbEl.setAttribute('knextslice', _this._startFrame);
      thumbEl.setAttribute('ktimer', 0);
      var thumbUniqueId = thumbData.entryId + '-' + (new Date().getUTCMilliseconds());
      thumbEl.setAttribute('kid', thumbUniqueId);
      thumbEl.addEventListener("mouseover", _this.mouseOver);
      thumbEl.addEventListener("touchstart", _this.mouseOver);
      thumbEl.addEventListener("mouseout", _this.mouseOut);
      thumbEl.addEventListener("touchend", _this.mouseOut);
      thumbEl.addEventListener("mouseup", _this.mouseOut);
      bgThumbSpriteUrl = kalturaDomain + 
                         '/p/' + thumbData.pid + 
                         '/thumbnail/entry_id/' + thumbData.entryId + 
                         '/width/' + thumbData.pxWidth + 
                         '/vid_slices/' + thumbData.spriteSlices + 
                         '/quality/' + thumbData.quality + 
                         '/type/' + thumbData.cropType + 
                         (thumbData.startSec >= 0 ? '/start_sec/' + thumbData.startSec : '') + 
                         (thumbData.endSec > 0 && thumbData.endSec > thumbData.startSec ? '/end_sec/' + thumbData.endSec : '') + 
                         '/file_name/thumbnail.jpg';
      if (_useLazy) {
        bgThumbSpriteUrlLowRes = kalturaDomain + 
                                 '/p/' + thumbData.pid + 
                                 '/thumbnail/entry_id/' + thumbData.entryId + 
                                 '/width/' + (lazyWidth > 0 ? lazyWidth : thumbData.pxWidth) + 
                                 '/quality/' + lazyQuality + 
                                 '/type/' + thumbData.cropType + 
                                 '/vid_slices/' + thumbData.spriteSlices + 
                                 '/vid_slice/' + _this._startFrame + 
                                 (thumbData.startSec >= 0 ? '/start_sec/' + thumbData.startSec : '') + 
                                 (thumbData.endSec > 0 && thumbData.endSec > thumbData.startSec ? '/end_sec/' + thumbData.endSec : '') + 
                                 '/file_name/thumbnail.jpg';
        thumbEl.style.backgroundImage = "url('" + bgThumbSpriteUrlLowRes + "')";
        thumbEl.style.backgroundPosition = "0% 0%";
        thumbEl.style.backgroundSize = "100% 100%";
        _this.applyFilter(thumbEl, lazyFilter);
        var lazyimg = new Image();
        lazyimg.setAttribute("originalBgImageUrl", bgThumbSpriteUrl);
        lazyimg.setAttribute("originalspriteSlices", thumbData.spriteSlices);
        lazyimg.setAttribute('kid', thumbUniqueId);
        lazyimg.src = bgThumbSpriteUrl;
        lazyimg.onload = _this.resetThumbnail;
      }
      else {
        thumbEl.style.backgroundImage = "url('" + bgThumbSpriteUrl + "')";
        thumbBgSizePercentage = thumbData.spriteSlices * 100; //total slices multiplied by 100%
        startFramePos = _this._startFrame * (100 / (thumbData.spriteSlices - 1));
        thumbEl.style.backgroundPosition = startFramePos+"% 0%";
        thumbEl.style.backgroundSize = thumbBgSizePercentage + "% 100%";
      }
    });
  }

  this.applyFilter = function (el, filter) {
    el.style.filter = filter;
    el.style.webkitFilter = filter;
    el.style.mozFilter = filter;
    el.style.oFilter = filter;
    el.style.msFilter = filter;
  }

  this.resetThumbnail = function (e) {
    lazyimg = e.currentTarget;
    thumbUniqueId = lazyimg.getAttribute('kid');
    var thumbEl = Array.from(document.querySelectorAll('[kid="'+thumbUniqueId+'"]'))[0];
    thumbEl.style.backgroundImage = "url('" + lazyimg.getAttribute('originalBgImageUrl') + "')";
    var totalSlices = parseInt(lazyimg.getAttribute('originalspriteSlices'));
    thumbBgSizePercentage = totalSlices * 100; //total slices multiplied by 100%
    startFramePos = _this._startFrame * (100 / (totalSlices - 1));
    thumbEl.style.backgroundPosition = startFramePos+"% 0%";
    thumbEl.style.backgroundSize = thumbBgSizePercentage + "% 100%";
    _this.applyFilter(thumbEl, "none");
  }

  this.getKThumbData = function (thumbEl) {
    var thumbData = {};
    //manndatory params
    thumbData.pid = _this.parseIntegerAttribute(thumbEl.getAttribute('kpid'));
    thumbData.entryId = thumbEl.getAttribute('kentryid');
    thumbData.pxWidth = _this.parseIntegerAttribute(thumbEl.getAttribute('kwidth'));
    thumbData.spriteSlices = _this.parseIntegerAttribute(thumbEl.getAttribute('kslices'));
    //optional params
    thumbData.quality = _this.parseIntegerAttribute(thumbEl.getAttribute('kquality'), 100);
    thumbData.cropType = _this.parseIntegerAttribute(thumbEl.getAttribute('kcrop'), 5);
    thumbData.fps = _this.parseIntegerAttribute(thumbEl.getAttribute('kfps'), 4.5);
    thumbData.startSec = _this.parseFloatAttribute(thumbEl.getAttribute('kstartsec'), -1);
    thumbData.endSec = _this.parseFloatAttribute(thumbEl.getAttribute('kendsec'), -1);
    //operational vars
    thumbData.keeprunning = _this.parseIntegerAttribute(thumbEl.getAttribute('kislooping'), 0);
    thumbData.currentSlice = _this.parseIntegerAttribute(thumbEl.getAttribute('knextslice'), _this._startFrame);
    thumbData.kid = thumbEl.getAttribute('kid');
    return thumbData;
  }

  this.parseIntegerAttribute = function (attrString, defaultVal = -1) {
    var intVal = parseInt(attrString);
    intVal = (isNaN(intVal) ? defaultVal : intVal);
    return intVal;
  }

  this.parseFloatAttribute = function (attrString, defaultVal = -1) {
    var floatVal = parseFloat(attrString);
    floatVal = (isNaN(floatVal) ? defaultVal : floatVal);
    return floatVal;
  }
  
  this.mouseOver = function (e) {
      var vidthumb = e.target;
      vidthumb.setAttribute('kislooping', 1);
      _this.loopthumb(vidthumb);
  }

  this.loopthumb = function (vidthumb) {
      thumbData = _this.getKThumbData(vidthumb);
      if (thumbData.keeprunning > 0) {
          var nextSlice = thumbData.currentSlice + 1;
          if (nextSlice == thumbData.spriteSlices) nextSlice = _this._startFrame;
          vidthumb.setAttribute('knextslice', nextSlice);
          var cSlicePercentagePosX = thumbData.currentSlice * (100 / (thumbData.spriteSlices - 1));
          vidthumb.style.backgroundPosition = cSlicePercentagePosX + "% 0%";
          var slicetime = 1000 / thumbData.fps;
          var timer = setTimeout(function() {
              _this.loopthumb(vidthumb);
          }, slicetime);
          vidthumb.setAttribute('ktimer', timer);
      }
  }

  this.mouseOut = function (e) {
      var vidthumb = e.target;
      thumbData = _this.getKThumbData(vidthumb);
      vidthumb.setAttribute('kislooping', 0);
      startFramePos = _this._startFrame * (100 / (thumbData.spriteSlices - 1));
      vidthumb.style.backgroundPosition = startFramePos+"% 0%";
      vidthumb.setAttribute('knextslice', _this._startFrame);
      vidthumb.setAttribute('ktimer', 0);
  }
}