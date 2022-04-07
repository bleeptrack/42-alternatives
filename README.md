# "Alternatives" - a 42 Heilbronn generative art project
How to use
------

First, clone this repo and put all files in your webserver directory. Most of you will work on a mac, so you should find your webserver home directory at `/Library/WebServer/Documents`. Now open a browser (preferably chrome) and you should see your first rendering :)



Now to the code: the file in which we will work is `libs/createScene.js` .

In this file you will find two important function:

- `setGlobals()`: defines settings for the rendering. You can change them there or also live via keyboard shortcuts
- `createScene()`: is the entry point for our renderings. Put your code or function calls here



We are working with blurry.js, which does all the cool rendering for us. blurry can only render lines, though!
You can create a new Line with:

```javascript
let myline = new Line({
	v1: vec3(0,0,0),
    v2: vec3(1,1,1),
    c1: vec3(255,0,0), //colors are rgb values
    c2: vec3(0,255,0),
    weight: 1
});
```

where `v1` and `v2` are the start and end vertex (= point in 3D space) and `c1` and `c2` are the start and end color.

To get your newly creates line rendered, you need to add it to the lines array like so:

```javascript
lines.push(myline);
```



In `createScene.js` you will also find some additional settings regarding the randomness and helpful functions to draw cool stuff. Just check the comments :)

If you also wrote a cool and helpful function, feel free to include it in a pull request!

------

## Finished Images

Put your finished images in the `/img`folder and create a pull request. You can also list them in this readme file with your name, if you want :)

Credits
------

This project builds on [blurry](https://tympanus.net/codrops/2019/10/01/simulating-depth-of-field-with-particles-using-the-blurry-library/)