import mpv
player = mpv.MPV(ytdl=True)
player.play('https://youtu.be/DOmdB7D-pUU')
player.wait_for_playback()
