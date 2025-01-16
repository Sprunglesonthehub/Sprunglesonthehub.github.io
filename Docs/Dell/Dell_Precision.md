# Dell Precision Workstations Sleep issue workaround

Are you getting tired of your machine not waking up from sleep? Well, due to their BIOS/UEFI implementation not being very good, 
the CPU S3, S4, and S5 sleep state don't work properly unless you are on Ubuntu 14.04 and RHEL 7, which are both no longer supported. For these
devices, the workaround is to disable the suspend altogether. Here is how you do so:

```
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```
This command disables the designated states to suspend, hibernate, and hybrid-sleep, as they do not work well. 

Thanks, and I hope this helps.

~Sprungles
