soundManager.setup({
  url: 'js/soundmanager/swf',
  flashVersion: 9,
  defaultOptions: {
    autoLoad: true
  }
});
soundManager.onready(function() {
  audiomanager.setup();
});

var audiomanager = {
  is_loaded: false,
  add_on_ready:[],
  play_on_ready:[],

  setup: function() {
    this.is_loaded = true;

    for (var soundsCounter=0; soundsCounter < this.add_on_ready.length; soundsCounter++) {
      this.add(this.add_on_ready[soundsCounter]);
    }
    for (var soundsCounter=0; soundsCounter < this.play_on_ready.length; soundsCounter++) {
      this.play(this.play_on_ready[soundsCounter]);
    }
  },

  add: function(file) {
    if (!this.is_loaded) {
      this.add_on_ready.push(file);
      return null;
    }

    var sound = soundManager.getSoundById(file);
    if (!sound) {
      sound = soundManager.createSound({
        id: file,
        url: file
      });
    }
    return sound;
  },

  play: function(file) {
    if (!this.is_loaded) {
      this.play_on_ready.push(file);
      return;
    }

    var sound = this.add(file);
    sound.play();
  }
}
