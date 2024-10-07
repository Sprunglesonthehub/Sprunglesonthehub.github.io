Are you wanting to run LineageOS on your Pixel 6? Here is what you need to do:

First open up your Pixel 6 and go to *about phone -> Build Number* and tap *Build Number 7 times*. You will have now unlocked the *Developer Settings*.

Go back a screen and tap *System*. Scroll down to *USB debugging* and toggle the switch to *on*.  A USB Prompt will pop up. You need to accept the prompts or you can't continue. It gives your computer debugging access.

You will need the android-tools package on Linux or Windows. MacOS doesn't have a current version of the Android SDK Platform tools. You will install them in the following ways:

Linux:

```
Arch
	sudo pacman -Syy android-tools
Ubuntu/Debian
	sudo apt install adb fastboot
Fedora
	sudo dnf inStall android-tools
Opensuse
	sudo zypper in android-tools
Gentoo 
	emerge -av dev-util/android-tools
```

Windows:


```
Select the Following link
"https://dl.google.com/android/repository/platform-tools-latest-windows.zip".

Go to Downloads and extract it. You will need to go into the directory, hold shift, right click and select "Open Powershell Window" or go to the address bar and type *cmd* . 
```


*Unofficial* MacOS:

```
Select the Following link
"https://dl.google.com/android/repository/platform-tools-latest-darwin.zip".

Go to Downloads and extract it. You will need to go to your *terminal* application. You then will type:
```
```
cd ~/Downloads/[insert the name of the folder it extracted here]
```
``` 
run .\adb whenever your run adb applications.
```

Keep in mind the remainder these instructions for the remainder of this instruction pamphlet.

In the case of Linux, I will proceed with instructions for Arch and Ubuntu/Debian. The other distributions will have different dependency names. I may update these sections down the line with those instructions, but for now, just sticking with limited instruction.

If you are running *Arch*:

Run:

```
# Install AUR Helper from source, YAY
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

OR 

# Install AUR Helper from source, YAY, but as a binary
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si

# Install dependencies
sudo pacman -Syy  --needed base base-devel bc python python2 python-pip python2-pip jdk8-openjdk perl git gnupg flex bison gperf zip unzip sdl wxgtk squashfs-tools ncurses libpng zlib libusb libusb-compat readline inetutils schedtool gperf imagemagick lzop pngcrush rsync gcc-multilib gcc-libs-multilib libtool-multilib lib32-libusb lib32-readline lib32-glibc bash-completion lib32-zlib && 
yay -Sy --needed lib32-libusb-compat android-sdk android-sdk-platform-tools android-udev esd-oss pngcrush repo tcp_wrappers termcap perl-switch git-lfs


```

If you are running *Ubuntu*:
```
# Install dependencies 
sudo apt-get install git-core gnupg flex bison build-essential zip curl zlib1g-dev libc6-dev-i386 x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils xsltproc unzip fontconfig

# For version 16.04/18.04:
sudo apt install libwxgtk2.8-dev

# For version 20.04:
sudo apt install libwxgtk3.0-dev

# For versions between 20.10 and 23.04:
sudo apt install lib32ncurses5-dev libncurses5 libncurses5-dev

# Install a few dependencies manually ONLY if on 23.10 or higher: 
wget http://archive.ubuntu.com/ubuntu/pool/universe/n/ncurses/libtinfo5_6.4-2_amd64.deb && sudo dpkg -i libtinfo5_6.4-2_amd64.deb && rm -f libtinfo5_6.4-2_amd64.deb
wget http://archive.ubuntu.com/ubuntu/pool/universe/n/ncurses/libncurses5_6.4-2_amd64.deb && sudo dpkg -i libncurses5_6.4-2_amd64.deb && rm -f libncurses5_6.4-2_amd64.deb

```

If you are running *Windows*: 
```
# Install WSL/Ubuntu WSL Container
wsl --install -d Ubuntu
```

If your install complains about it being WSL Version 1, run:

```
wsl --set-version 2
```

Restart your computer after the WSL Installation finishes. Start your Ubuntu container by selecting it in the Application menu.

After starting *Ubuntu* from within *WSL*, run:
```
# Install dependencies 
sudo apt-get install git-core gnupg flex bison build-essential zip curl zlib1g-dev libc6-dev-i386 x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils xsltproc unzip fontconfig
```

 If you are running MacOS (*Unofficial Instructions):

You are going to have to make a read/write partition if you want to do this natively. Honestly, I just recommend you fire up a linux VM and follow the *Ubuntu* instructions, but if you want to be a masochist, follow this:

Open Disk Utility and create a Volume with APFS (Case-sensitive). You will want at least 200GB of space to be safe. If you want a ccache for building you will need to add 50+, or the amount you want to cache, extra.

You can skip the main dependencies for now.

##### Modifying your .profile

You will need to open up your ~/.profile with your desired text editor. I am going to use nano in this example for linux.

Run:
```
nano ~/.profile
```

This file will likely not exist. This is your user version of /etc/profile.  You will need to add:

```
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
``````

If you are using nano, go ahead and hit CTRL + O [the letter] and then hit [ENTER].

If you are on Windows, just do this within your *Ubuntu WSL Container.*

MacOS Instructions:

##### Configuring Git

In order for this to work, you are going to have to configure git. You will need to run the following: 

```
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

Replace "you@example.com" with an email you are comfortable with the world knowing. And then "Your Name" either needs to be your real name or online alias you use.
##### Installing Repo

If you are on *Arch* or just want to install *Manually*: 

```
export REPO=$(mktemp /tmp/repo.XXXXXXXXX)
curl -o ${REPO} https://storage.googleapis.com/git-repo-downloads/repo
gpg --recv-keys 8BB9AD793E8E6153AF0F9A4416530D5E920F5C65
curl -s https://storage.googleapis.com/git-repo-downloads/repo.asc | gpg --verify - ${REPO} && install -m 755 ${REPO} ~/bin/repo
```

If you are on *Ubuntu/Debian* run the following: 

```
sudo apt install repo
```

This will likely install the latest version as a snap because Canonical is annoying.

If you are on *Windows*, you are going to open the *Ubuntu WSL Container* and run the same as *Ubuntu/Debian*:

```
sudo apt install repo
```

Again, this will likely install a snap. 

If you are on *MacOS* go get *Homebrew* and install repo:

```
## Install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install repo with homebrew
brew install repo
```

*Optional if you have a large amount of storage*: Setting up Ccache:

If you want your system to cache things while building to speed up the build, do the following: 

Run:
```
export USE_CCACHE=1
export CCACHE_EXEC=/usr/bin/ccache
```
(This exports the variables to your shell. I DO NOT recommend you put these in your environment variables.)

and

Run:
```
ccache -M [Insert size you want here]G
```

This will make a cache directory of this size. I highly recommend you use anything above 50G IF you have the space. If not, it's okay. You can skip this section altogether. It just means it will have to build dependencies multiple times.

*Optional if you are limited on storage*:

If you barely have the 200G of storage you are going to need, you can build with compression. It will take longer, but save you space. To do so, run the following:
```
ccache -o compression=true
```


##### Initializing Repos

I highly recommend you just go ahead and build the latest version of LineageOS. Which is 21 as of writing. If for whatever reason you want 20 it will be down below as well.

First we got to make sure we are in the directory we made for this project. 

Then run for Lineage 21: 

```
repo init -u https://github.com/LineageOS/android.git -b lineage-21.0 --git-lfs
```


or for Lineage 20:

```
repo init -u https://github.com/LineageOS/android.git -b lineage-20.0 --git-lfs
```

Make sure you pay attention and type "Y" at the appropriate time.

##### Syncing the LineageOS Repository.

Whether you are building LineageOS 21, or 20, the process is the same going forward in this guide. You need to first go ahead and sync the repo itself. Go ahead and run:

```
repo sync -c -j[insert number of threads you have minus 4]
```

So, we this command will sync the current branch of LineageOS for the repository version you initialized before. The -j signifies the amount of parallel downloads, but it will be down via different threads on your system. Try and remember you want to leave some headroom for your actual system to run. Hence why I said minus 4. You can try and get away with two if you are constrained. 

You can do this step from within *Ubuntu WSL Container* as well.

#### Optional on lower end systems [UNOFFICIAL]:

If you are on linux:

If you are on a barely lower than the minimum spec system, try and use swap if you don't have the amount of ram you need. But note, this will encourage large amounts of read and writes to your drive, but that's the sacrifice for not having minimum spec. You can make a swap partition by booting into a live installer, opening a terminal, mounting your drive and running gparted. Shrink your root and make a swap partition.


Windows: You will have to change the swap size via .wslconfig

Edit and change to:

```
[wsl2]

memory=[how much ram you have -6 gigs]GB
swap=[whatever size you want to make your ram + swap = at least 64Gig.]
swapFile=E:\\swap.vhdx
```

Make sure you make a swap file if you want to do this.

##### Pre-Building

Alright, you made it this far. We are about to build, but first we have to source a script so it will run. 

Run the following:

```
source build/envsetup.sh
```

Now we have to tell the Android build system what device we are building for, using *breakfast*:

```
breakfast oriole 
```

If you are using this as a generic-guide, just replace *oriole* with whatever device you are building for. BUT, if it does not have a device tree, you will need to make one. I'm not going to cover how in this guide, as that is a whole other hole to jump down.

You should see an output with a bunch of information in a chart. If you see that, you are good to continue. If not, go ahead and join me on my [Discord](''https://discord.gg/p4zSAbwZhU") or [Matrix](''https://matrix.to/#/#sprungles-software-shack-suite:matrix.org"). I will try and help when I can. I'm pretty busy a lot of the time, but am open to do what I can.

##### Grabbing Proprietary Blobs [It's just proprietary stuff]

We are about to grab the proprietary code, called blobs. Remember how we set up ADB earlier at the beginning? This is why. You'll need to be on your stock operating system so we can grab this stuff.

Go ahead and go into [Your Build folder]/device/google/oriole and run:

```
./extract-files.sh
```

Again, if you are treating this as a generic guide, just replace oriole with your device name.

##### Building [For real this time]

We are about to build. You are going to want at least 4 cores. But I have managed to get it to work with 2 before. If you do 2, you are going to be hear a long time. Even at 4 it takes awhile. You will need to be patient.

Go ahead and type and run:

```
croot 
brunch oriole
```

Oriole can be replaced by any name you already used breakfast on.

This is going to take a very very long time. So, go do something else and come back. Just trust me. It will save you pain ache. You will take the *vendor_boot.img*, *boot.img*, and *dtbo.img* and *lineage-21-xx.zip* file and use those when you flash. 

Make sure you have those four flies on your computer. You will open up adb like you did at the beginning of the guide and do the following:


##### Flashing Your Phone


Bootloader unlock your phone:

```
adb reboot fastboot && fastboot flasing unlock
```

This only applies to pixel. Search for your specific device if you are on another device on how to bootloader unlock it, if at all possible.

Look at your phone and use the volume buttons to select that you want to unlock. This will wipe all of your data. Then you will just go ahead and do the following:

Run: 
```
fastboot flash boot[path to where you downloaded the boot.img] && \
fastboot flash dtbo.img[path to where you downloaded the dtbo.img] && \
fastboot flash vendor_boot.img[path to where you downloaded vendor_boot.img] && \
fastboot reboot recovery
```

Your phone will reboot into the custom recovery. Don't be scared, its safe. You will want to find the adb sideload option within the recovery. It's there, I promise. Might take you a bit to find it. 

Once you are there, enable it and run:

```
adb sideload [drop the lineageos .zip file here]
```

 and hit enter. It is going to flash now. You need to be aware that it will look like it is stuck at 47. Ignore your terminal prompt, watch your phone. The phone will sit at 1/2 and 2/2 for a while. That's okay. Part of the process. Just be patient and it will flash. You will know when it is done.

##### Wipe data

Go ahead and hit "factory reset" within the menu and reboot back into the recovery by hitting volume up and power to force reboot and then  volume down and power until you see the recovery menu again.

You will then go ahead and adb sideload like you did before, but [this]("https://netactuate.dl.sourceforge.net/project/nikgapps/Elite-Releases/Bartixxx/Android-14/13-Aug-2024/NikGapps-bartixxx-arm64-14-20240813-signed.zip?viasf=1") package for google apps. You will just run the following:

```
adb sideload [path to the nikgapps.zip file]
```

Wait for it to finish. You may see something about it not being signed, if so, continue anyway. It's safe.

Afterward, factory reset again and reboot. 

Now, reboot.


# Bootloader locking

Don't do this unless you have signed your own lineage build. Or you will not be able to unlock again.

If you know how to sign the build, you know how to lock your booloader. ;)
