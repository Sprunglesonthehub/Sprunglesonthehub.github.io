Are you wondering how difficult GPG-Signing is? Well it is not hard at all. All you have to do is the following:

## 1. Generate the GPG Key

```
gpg generate-key
``` 

Now copy the pub key and put in the makepkg.conf file at the end like so:

```
GPGKEY="[Insert pub key here]"
```

And now when you want to sign packages, just run:

```
makepkg --sign
```

Thanks for reading, I hope this wasn't to hard ;)
