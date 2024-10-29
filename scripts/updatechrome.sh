if [ cat /etc/pacman.conf | grep "Server = http://darrengames.ddns.net:1500/x86_64/" ==  "Server = http://darrengames.ddns.net:1500/x86_64/" ]; then
 echo 'Installing yay via repo';
 sudo pacman -Syy yay --noconfirm
else 
 echo 'Installing yay via GitHub';
 sudo pacman -S --needed git base-devel
 git clone https://aur.archlinux.org/yay-bin.git
 cd yay-bin
 makepkg -si
fi

# Install Google Chrome
yay -Sy google-chrome
