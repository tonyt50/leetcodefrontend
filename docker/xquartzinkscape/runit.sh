#!/bin/bash
# brew cask install xquartz
defaults write org.macosforge.xquartz.X11 app_to_run '' # suppress xterm terminal
open -a XQuartz
ip=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
display_number=`ps -ef | grep "Xquartz :\d" | grep -v xinit | awk '{ print $9; }'`
/opt/X11/bin/xhost + $ip
/usr/local/bin/docker rm inkscape
/usr/local/bin/docker run -d --name inkscape -e DISPLAY=$ip$display_number -v /Users/tonyt/vscodeprojects/leetcodefrontend/svg:/root/Pictures -v /tmp/.X11-unix:/tmp/.X11-unix -v ~/.gtkrc:/root/.gtkrc jess/inkscape
#
# end
#
