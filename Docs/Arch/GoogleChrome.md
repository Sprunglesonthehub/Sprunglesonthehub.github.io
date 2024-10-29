# Installing Google Chrome on Arch Linux

Wanting to install Google Chrome because you give no cares about data collection? It's easy. 

Just do the following:

Install YAY, an AUR Helper by other adding my repo, or using github.

My REPO Method:

Add 
```
[AcreetionOSREPO]
SigLevel = Never
Server = http://darrengames.ddns.net:1500/x86_64/
```
to your /etc/pacman.conf, and run:

```
sudo pacman -Syy yay
```
OR

The Github Method:

Run:
```
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```
to compile it, or run:

```
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si
```
for the binary.

You can find a script to do this in the scripts folder!
