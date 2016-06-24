# Ultimate YouTube Searcher

The following is taken from the "about" section of the app:

## Intro

Welcome to the Ultimate YouTube Searcher. The goal of this app is to allow the user to gain more freedom in searching for YouTube videos. It was originally created with all of the hardcore YouTube junkies out there in mind (myself included), but of course can be enjoyed and used by anybody.

In the future there may be more search options available, so stay tuned, and in the meantime, enjoy!

## Guide

You can simply do a basic video search via the default search bar. Clicking "Toggle Advanced" brings out the advanced search parameters

Currently, you can search by location, result order, safe search settings, date range (from, to), and also by a particular channel filter.

The location parameter uses Google Maps to allow the user to select a portion of the map using an adjustable circular selector. Due to the limits of the API, radii of selections cannot exceed 100 kilometers. You can clear the selection by clicking the "Clear Selection" button. The coordinates of the center of the circle and its radius are displayed to the left and right of the "Clear Selection" button, respectively.


If you want to search the contents of a specific channel, here's what you do:

First, search for a channel in the "Search Channel" input box
Assuming you get back results, select whichever channel you'd like by clicking on its image.

You should then see the filter applied represented by an icon below the search bar.

You will now only get results from that particular channel back. Clicking on another channel will reset the filter. 

You can remove the filter by clicking the "Clear Filter" button.


You can also click the "Save Search" button to save and store the current search parameters as an item in your local storage. You can find all of your saved past searches in the "Personal" view. In the "Saved Searches" area of this view, clicking the "Grab!" button will activate the respective saved search and fill the current parameters. Note that this doesn't immediately initialize the search, so you can tweak any of the parameters as you wish before making your search.


(This ends the "about" section content)

## The Process

This app uses CORS requests to get data from the Youtube API, and uses the iframe element to allow embedded YouTube videos within the app. Aside from working further with API hacks using AngularJS, in developing this app I was also introduced to AngularUI router, which utilizes nested states and views. This dependency is more than just a better alternative to ngView; it changes the way a website or app's structure is viewed, and promotes a more modular approach.

I also began following John Papa's Style Guide for best practices in developing AngularJS projects, as I have with other projects.

https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

## Resources

The src directory contains the source code, while the build version is not currently distributed.

You can visit the gh-page of this project here:

http://gfed53.github.io/ultimate-youtube-searcher/src/