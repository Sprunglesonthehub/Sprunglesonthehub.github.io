
# I know, I know. Google Chrome sucks, we wall want to use Open Source Software.

Alright, as my friend says, *It's over*. I am done trying to keep my data private. That battle has been lost to these predatory companies, so it is time to spoil myself.
I am INSTALLING Google Chrome, but I use OpenSUSE, so remember, my instructions are for that Operating System!

Instructions to install Google Chrome on OpenSUSE:

First, Change to your ROOT User by running: 

```
sudo -i
```
or
```
su -
```

Add the Google Chrome Repo at: 
```
zypper addrepo http://dl.google.com/linux/chrome/rpm/stable/x86_64 google-chrom
```

Enable autorefresh for the repo:
```
zypper modifyrepo --refresh 1
```

Download the linux signing key: 
```
wget https://dl.google.com/linux/linux_signing_key.pub
```
and then install that key: 
```
rpm --import linux_signing_key.pub
```
Install Google Chrome itself:
```
zypper install google-chrome-stable
```

There is a script you can download and execute to install, found [Here]('https://github.com/Sprunglesonthehub/Sprunglesonthehub.github.io/blob/main/scripts/googlechromeinstall.sh'): 
