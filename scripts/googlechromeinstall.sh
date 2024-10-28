# Checking the user is root, if not, elevating.
if [ $USER == localhost ]; then
 echo 'User is root, run ./googlechromeinstall.sh again!';
else
 echo 'Make sure to execute this script again!';
 echo 'You need to be root. Elevating you, the user, to ROOT.';
 sudo su;
fi

# Adding Chrome Repo
zypper addrepo http://dl.google.com/linux/chrome/rpm/stable/x86_64 google-chrome

# refresh repo
zypper modifyrepo --refresh 1

# Downloading and installing signing key
wget https://dl.google.com/linux/linux_signing_key.pub
rpm --import linux_signing_key.pub

read -p "What version of chrome are you wanting to install?" answer


case $answer in
  
 normal | Normal )
  echo 'Installing Google-Chrome-stable';
  zypper --non-interactive install google-chrome-stable;
  
 beta | Beta )
  echo 'Installing Google-Chrome-Beta';
  zypper --non-interactive install google-chrome-beta
 
unstable | Unstable )
  echo 'Installing Google-Chrome-Unstable';
  zypper --non-interactive install google-chrome-unstable;

* )
  echo 'This is an invalid installation candidate. Choose *normal*, *beta*, *unstable*'
  exit;
esac
