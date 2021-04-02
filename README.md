# Crunchyroll Velocity Ads Coding Challenge

This project contains a preconfigured video player that plays a video. Your challenge is to implement ad support for this video player. 

The information about the ads can be found in the data/ads.json file. The "start" values in this file are the number of seconds from the start of the video where the ad should appear. You should store the data from this file using a React hook.

Your solution should work in Chrome, support for other browsers is not needed.

Publish your solution to GitHub.

## Implement the following features
1. Ad UI
- Whenever an ad should appear, pause the video player, display the ad graphic for 10 seconds, then unpause the video
- The ad graphic is "http://localhost:3000/AdBreak21-9.jpg". The graphic should appear over the video and should match the video dimensions

2. Encountering an ad during playback
- Whenever the video is playing and reaches a time where an ad should appear, display the Ad UI as described in #1

3. Seeking past an ad
- If the viewer scrubs or clicks to seek past an ad that hasn't been played, display the Ad UI as described in #1

4. Skip a played ad
- If an ad has already been played, it should not be displayed for either #2 or #3 and playback should continue as normal


## Setup
Run the following commands:
```
yarn
yarn start
```
Then open your browser to http://localhost:3000

## What are we looking for?
### Explanation
- Include a SOLUTION.md file covering any design choices you made
- Let us know approximately how long your solution took to create
- Feel free to include areas where you would improve the code given more time

### Clean code
- Functions should be documented using JSDoc format
- Variable names should be self explanatory and easy to understand
- Provide comments that explain complicated parts of the code
- Business logic should be easy to read and understand

### Good React principles
- Create a separate component for each UI element
- Use hooks to create & store state

## What is not important
- Pretty UI designs
- Animations
