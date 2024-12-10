Are you wanting to install yay, but don't know how? It is super simple! Just do the following!

RUn:

```
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

to compile your own, 

or:

```
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si
```

to grab the binary. 


If you want the binary from an arch repo, you can use our mirror!

Just add

```
[acreetionOSREPO]
SigLevel = Optional
Server = http://darrengames.ddns.net:1500/repo/$arch

```

to your pacman.conf file and run:

```
sudo pacman -Syy yay -noconfirm
```

Thanks for reading, and I hope this was easy! Feel free to join the discord and come say "Hi!" :)
