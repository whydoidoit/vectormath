### Introduction

A collection of useful vector math functions for PlayCanvas.  Adds to the prototypes
of pc.Vec3, pc.Quat and pc.Entity.

### Installation

```language-shell
npm install --save playcanvas-vector-math
```

### Usage

```language-javascript
//Extend pc.Quat/pc.Vector
import 'playcanvas-vector-math'

...


//Get the +/- angle between two vectors

var angle = this.entity.forward.angle(this.enemy.forward);


//Get the twist around a particular axis 
//that would not work for all Euler angle representations

let rotation = this.entity.getRotation();
let yAxisRotation = rotation.twist(pc.Vec3.UP);
let comparitiveRotation = rotation.twist(this.entity.up);


//Get a rotation from one vector to another
//e.g. get the rotation to apply to make a thing point upwards

let rotation = new pc.Quat().fromToRotation(this.entity.up, hit.normal);
this.entity.setRotation(rotation.mul(this.entity.getRotation()));


//Get a rotation to a target point

let targetRotation = new pc.Quat().lookAt(this.entity.getPosition(), enemy.getPosition());


//Transform a vector by a Quaternion

someVector.mul(this.entity.getRotation());


//Clamp a line to within a rectangle defined as a plane point, plane normal,
//halfWidth and halfHeight

import {clampToPlaneArea} from 'playcanvas-vector-math/line-plane'

let size = reachWindow.getLocalScale();
let direction = clampToPlaneArea(this.entity.getPosition(), this.entity.forward,
    reachWindow.getPosition(), reachWindow.up, size.x, size.z);  
let rotate = new pc.Quat().fromToRotation(this.entity.forward, direction);
this.entity.setRotation(rotate.mul(this.entity.getRotation()));

```

### Requirements

Requires PlayCanvas Engine to be running on the page.  Uses ES6/Babel/PlayCanvas template.
