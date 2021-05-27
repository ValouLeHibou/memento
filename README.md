# Module - Memento

<img src='https://img.shields.io/static/v1?label=Solid&message=1.7&color=blue' alt="funnewstechnologie">
<img src='https://img.shields.io/static/v1?label=Materializecss&message=1.02&color=orange' alt="funnewstechnologie">

Final Project

```
____________________ ____   ____    ________   .__    ____  .__   __           .__    
\_   _____/\_   ___ \\   \ /   /    \______ \  |__|  / ___\ |__|_/  |_ _____   |  |   
|    __)_ /    \  \/ \   Y   /      |    |  \ |  | / /_/  >|  |\   __\\__  \  |  |   
|        \\     \____ \     /       |    `   \|  | \___  / |  | |  |   / __ \_|  |__
/_______  / \______  /  \___/       /_______  /|__|/_____/  |__| |__|  (____  /|____/
\/         \/                       \/                              \/
```

## Primal Objectives

Memento is an authent module that allow you to connect yourself to a solid pod by getting your webID.

## Descovering the Solid technologie

The begenning was ... Complecated ...

First I need to create my own Solid Pod with the solidweb.org "interface".
Hopefully it was just a beta version, because the onboarding was very difficult.

The interface was so strange, I have succed to delete my rights on my own pod XD, I cannot login  with it now ...

<img src='/readmeRessources/solid.png' alt="solidInterface">

The interface was so unfriendly, many minutes are needed to be familiar with it.
I was so desapointed by this interface, I have search for an alternative : inrupt.com
This company is the partener of Solid project and can host Pods. So I have created an account and I ... I cannot login
into my account ... The service was entering into an infinite loop ...

<img src='/readmeRessources/funnewstechnologie.png' alt="funnewstechnologie">

The solution I've found is to login to Inrupt by importing my solidweb pod --' yeah, great ...
But that was interesting because this solution needs to allow my solidWeb pod to be edit by the Inrupt Pod.
That was an exemple of what this technologie can do, I have full control of what I want to share.

Next I have tried to code a simple connection interface with the basic solid code :

<img src='https://solidproject.org/assets/img/tutorials/locally-run-application.png' alt="funnewstechnologie">

The tutorial was very simple and all works perfectly.
The next step was to create a profil interface were people can get the pod's datas.

Solid use `http://www.w3.org/2006/vcard/ns` syntace to determinate the data location. You need to understand the file organisation before coding.
At the beginning the Vcard system seems simple but it has some specific issues ans spelling that are very difficults to understand :

```
# Two way to Call datas (but not all datas)
const note = getStringNoLocale(profile, "http://www.w3.org/2006/vcard/ns#note");
# OR
const note = getStringNoLocale(profile, VCARD.note);
```

Finaly I was able to display a fullpage profil :

<img src='/readmeRessources/profil.png' alt="profil">

## How it works

First you need to Click on the `Login` button, it call a `login` function that use an `SOLID_IDENTITY_PROVIDER` (here it is `https://solidweb.org`) and redirect the user on a solid login page.

After login, you will see your pod webID on the screen, it is like your session passport.

Click on the `get profil` button to display your pod informations like name, mail or avatar.

The code will use your webID to get a `dataSet` that contain you `profil` and finaly all of your information.

Like explain before, I'm using the `VCARD` system to get the datas :

```
WebID => dateSet => Profil => VCARD request => Username
```

### Getting Started

First run :


```
# Init package.json informations
$ npm init --yes

# Install Inrupt
$ npm install @inrupt/solid-client @inrupt/solid-client-authn-browser @inrupt/vocab-common-rdf

# Install parcel
$ npm install parcel-bundler

# Add browserList at the end of packages.json
#####
 "dependencies": {
    ...
 },
 "browserslist": [
   "last 3 and_chr versions",
   "last 3 chrome versions",
   "last 3 opera versions",
   "last 3 ios_saf versions",
   "last 3 safari versions",
   "last 3 edge versions"
 ]
#####
```

Run the basic code :

```
$ npx parcel index.html
```