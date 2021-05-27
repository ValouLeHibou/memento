# Memento

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

Memento is an application that allow you to share your music with other people without using web server hope to the
WebRTC Technology. The second objective is to allow connexion to your account with the Web Solid Technologie.

## Descovering the Solid technologie

The begenning was ... Complecated ...

First I need to create my own Solid Pod with the solidweb.org "interface".
Hopefully it was just a beta version, because the onboarding was very difficult.

<img src='/readmeRessources/solid.png' alt="solidInterface">

The interface was so unfriendly, many minutes are needed to be familiar with it.
I was so desapointed by this interface, I have search for an alternative : inrupt.com
This company is the partener of Solid project and can host Pods. So I have created an account and I ... I cannot login
into my account ... The service was entering into an infinite loop ...

<img src='/readmeRessources/funnewstechnologie.png' alt="funnewstechnologie">

The solution I've found is to login to Inrupt by importing my solidweb pod --' yeah, great ...
But that was interesting because this solution needs to allow my solidWeb pod to be edit by the Inrupt Pod.
That was an exemple of what this technologie can do, I have full control of what I want to share.

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
Solid problems :

The hardest thing was the lack of documentation.

``
ID Projet Firebase : fir-rtc-937e1
``

```
# Deploy on Firebase
$ firebase deploy

# Run local firebase
$ firebase serve --only hosting
```

WebRTC problems :

- Evolution of the technologie = Depreciate code