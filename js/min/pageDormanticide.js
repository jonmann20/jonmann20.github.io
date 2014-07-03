/// <reference path="commonLinker.js" />

/*
    Declares two globals: canvas and ctx
*/
function GameEngine() {
    // back button
    var backBtn = document.createElement("a");
    backBtn.href = "/#games";
    backBtn.innerText = "Back";
    backBtn.className = "btnBack";
    document.body.appendChild(backBtn);

    // canvasWrap
    var wrap = document.createElement("div");
    wrap.className = "canvasWrap";

    // canvas
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", 16*63);
    canvas.setAttribute("height", 9*63);
    wrap.appendChild(canvas);
    document.body.appendChild(wrap);

    ctx = canvas.getContext("2d");

    this.input = new GameInput(this);
    this.graphics = new GameGraphics(this);
    this.utils = new GameUtils(this);
    this.view = new GameView(this);

    this.init();
}

GameEngine.prototype = (function() {
    var that,
        updateInterval,
        renderRAF,
        onUpdateSet = false,
        onRenderSet = false
    ;


    function update() {
        that.view.update();

        if(onUpdateSet)
            that.onUpdate();
    }

    function render() {
        renderRAF = requestAnimationFrame(render);
        that.view.render();

        if(onRenderSet)
            that.onRender();
    }


    return {
        init: function(){
            that = this;
        },

        onUpdate: function(callback) {
            onUpdateSet = true;
            this.onUpdate = callback;
        },

        onRender: function(callback) {
            onRenderSet = true;
            this.onRender = callback;
        },

        start: function() {
            updateInterval = setInterval(update, 1000 / 60);
            renderRAF = requestAnimationFrame(render);
        },

        stop: function() {
            clearInterval(updateInterval);
            cancelAnimationFrame(renderRAF);
        }
    };
})();

/// <reference path="commonLinker.js" />

function GameSave() {

}

GameSave.prototype = (function () {
    return {
        load: function (slot) {
            return localStorage["slot" + slot];
        },

        getList: function () {
            var zero = this.load(0),
                one = this.load(1),
                two = this.load(2),
                def = "---"
            ;
            return list = [
                (typeof(zero) !== "undefined") ? zero : def,
                (typeof (one) !== "undefined") ? one : def,
                (typeof (two) !== "undefined") ? two : def
            ];
        },

        save: function (slot, data) {
            localStorage["slot" + slot] = data;
        },

        erase: function(slot){
            localStorage.removeItem("slot" + slot);
            return this.getList();
        }
    };
})();

/*
    The input component of GameEngine.
*/
function GameInput() {
    this.keysDown = {};
    this.lastKeyUp = KeyCode.EMPTY;
    this.lastKeyDown = KeyCode.EMPTY;

    this.init();
}

GameInput.prototype = (function () {

    var that;

    function fixKey(key) {
        if(key === KeyCode.W)
            key = KeyCode.UP;
        else if(key === KeyCode.S)
            key = KeyCode.DOWN;
        else if(key === KeyCode.D)
            key = KeyCode.RIGHT;
        else if(key === KeyCode.A)
            key = KeyCode.LEFT;

        return key;
    }

    addEventListener("keydown", function(e) {
        var key = fixKey(e.keyCode);

        if(!that.keysDown[key]) {
            that.lastKeyDown = key;
            that.keysDown[key] = true;
        }
        
        that.onKeyDown(key);
    });

    addEventListener("keyup", function(e) {
        that.lastKeyUp = fixKey(e.keyCode);
        delete that.keysDown[that.lastKeyUp];
    });


    return {
        init: function(){
            that = this;
        },

        update: function () {

        },

        onKeyDown: function(callback) {
            this.onKeyDown = callback;
        }
    };
})();


// global enums
var KeyCode = Object.freeze({
    EMPTY: -1,
    ENTER: 13,
    CTRL: 17,
    ESC: 27,
    SPACEBAR: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
    A: 65,
    D: 68,
    F: 70,
    H: 72,
    J: 74,
    K: 75,
    M: 77,
    O: 79,
    R: 82,
    S: 83,
    W: 87
});

var KeyCodeNames = {};
KeyCodeNames[-1] = "EMPTY";
KeyCodeNames[13] = "ENTER";
KeyCodeNames[17] = "CTRL";
KeyCodeNames[27] = "ESC";
KeyCodeNames[32] = "SPACEBAR";
KeyCodeNames[37] = "LEFT";
KeyCodeNames[38] = "UP";
KeyCodeNames[39] = "RIGHT";
KeyCodeNames[40] = "DOWN";
KeyCodeNames[46] = "DELETE";
KeyCodeNames[65] = "A";
KeyCodeNames[68] = "D";
KeyCodeNames[70] = "F";
KeyCodeNames[72] = "H";
KeyCodeNames[74] = "J";
KeyCodeNames[75] = "K";
KeyCodeNames[77] = "M";
KeyCodeNames[79] = "O";
KeyCodeNames[82] = "R";
KeyCodeNames[83] = "S";
KeyCodeNames[87] = "W";
/*
    The utils component of GameEngine.
*/
function GameUtils(gEngine) {
    return {
        /*
            Resets the newView's private variables.
            Changes the view.
        */
        switchView: function(newView) {
            newView.init();
            gEngine.view = newView;
        }
    };
}

// global enums
var Dir = Object.freeze({
    RIGHT: 0,
    LEFT: 1
});
// Version 0.2 - Copyright 2013 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.
/** @preserve SAT.js - Version 0.2 - Copyright 2013 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

/*global define: false, module: false*/
/*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true, 
  eqeqeq:true, bitwise:true, strict:true, undef:true, 
  curly:true, browser:true */

// Create a UMD wrapper for SAT. Works in:
//
//  - Plain browser via global SAT variable
//  - AMD loader (like require.js)
//  - Node.js
//
// The quoted properties all over the place are used so that the Closure Compiler
// does not mangle the exposed API in advanced mode.
/**
 * @param {*} root - The global scope
 * @param {Function} factory - Factory that creates SAT module
 */
(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define['amd']) {
    define(factory);
  } else if (typeof exports === 'object') {
    module['exports'] = factory();
  } else {
    root['SAT'] = factory();
  }
}(this, function () {
  "use strict";

  var SAT = {};

  //
  // ## Vector
  //
  // Represents a vector in two dimensions with `x` and `y` properties.


  // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
  // a coordinate is not specified, it will be set to `0`
  /** 
   * @param {?number=} x The x position.
   * @param {?number=} y The y position.
   * @constructor
   */
  function Vector(x, y) {
    this['x'] = x || 0;
    this['y'] = y || 0;
  }
  SAT['Vector'] = Vector;
  // Alias `Vector` as `V`
  SAT['V'] = Vector;


  // Copy the values of another Vector into this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['copy'] = Vector.prototype.copy = function(other) {
    this['x'] = other['x'];
    this['y'] = other['y'];
    return this;
  };

  // Change this vector to be perpendicular to what it was before. (Effectively
  // roatates it 90 degrees in a clockwise direction)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['perp'] = Vector.prototype.perp = function() {
    var x = this['x'];
    this['x'] = this['y'];
    this['y'] = -x;
    return this;
  };

  // Rotate this vector (counter-clockwise) by the specified angle (in radians).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Vector} This for chaining.
   */
  Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
    var x = this['x'];
    var y = this['y'];
    this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
    this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
    return this;
  };

  // Reverse this vector.
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reverse'] = Vector.prototype.reverse = function() {
    this['x'] = -this['x'];
    this['y'] = -this['y'];
    return this;
  };
  

  // Normalize this vector.  (make it have length of `1`)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['normalize'] = Vector.prototype.normalize = function() {
    var d = this.len();
    if(d > 0) {
      this['x'] = this['x'] / d;
      this['y'] = this['y'] / d;
    }
    return this;
  };
  
  // Add another vector to this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['add'] = Vector.prototype.add = function(other) {
    this['x'] += other['x'];
    this['y'] += other['y'];
    return this;
  };
  
  // Subtract another vector from this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaiing.
   */
  Vector.prototype['sub'] = Vector.prototype.sub = function(other) {
    this['x'] -= other['x'];
    this['y'] -= other['y'];
    return this;
  };
  
  // Scale this vector. An independant scaling factor can be provided
  // for each axis, or a single scaling factor that will scale both `x` and `y`.
  /**
   * @param {number} x The scaling factor in the x direction.
   * @param {?number=} y The scaling factor in the y direction.  If this
   *   is not specified, the x scaling factor will be used.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['scale'] = Vector.prototype.scale = function(x,y) {
    this['x'] *= x;
    this['y'] *= y || x;
    return this; 
  };
  
  // Project this vector on to another vector.
  /**
   * @param {Vector} other The vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['project'] = Vector.prototype.project = function(other) {
    var amt = this.dot(other) / other.len2();
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };
  
  // Project this vector onto a vector of unit length. This is slightly more efficient
  // than `project` when dealing with unit vectors.
  /**
   * @param {Vector} other The unit vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['projectN'] = Vector.prototype.projectN = function(other) {
    var amt = this.dot(other);
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };
  
  // Reflect this vector on an arbitrary axis.
  /**
   * @param {Vector} axis The vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflect'] = Vector.prototype.reflect = function(axis) {
    var x = this['x'];
    var y = this['y'];
    this.project(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };
  
  // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
  // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
  /**
   * @param {Vector} axis The unit vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflectN'] = Vector.prototype.reflectN = function(axis) {
    var x = this['x'];
    var y = this['y'];
    this.projectN(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };
  
  // Get the dot product of this vector and another.
  /**
   * @param {Vector}  other The vector to dot this one against.
   * @return {number} The dot product.
   */
  Vector.prototype['dot'] = Vector.prototype.dot = function(other) {
    return this['x'] * other['x'] + this['y'] * other['y'];
  };
  
  // Get the squared length of this vector.
  /**
   * @return {number} The length^2 of this vector.
   */
  Vector.prototype['len2'] = Vector.prototype.len2 = function() {
    return this.dot(this);
  };
  
  // Get the length of this vector.
  /**
   * @return {number} The length of this vector.
   */
  Vector.prototype['len'] = Vector.prototype.len = function() {
    return Math.sqrt(this.len2());
  };
  
  // ## Circle
  //
  // Represents a circle with a position and a radius.

  // Create a new circle, optionally passing in a position and/or radius. If no position
  // is given, the circle will be at `(0,0)`. If no radius is provided, the circle will
  // have a radius of `0`.
  /**
   * @param {Vector=} pos A vector representing the position of the center of the circle
   * @param {?number=} r The radius of the circle
   * @constructor
   */
  function Circle(pos, r) {
    this['pos'] = pos || new Vector();
    this['r'] = r || 0;
  }
  SAT['Circle'] = Circle;

  // ## Polygon
  //
  // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
  //
  // The edges/normals of the polygon will be calculated on creation and stored in the
  // `edges` and `normals` properties. If you change the polygon's points, you will need
  // to call `recalc` to recalculate the edges/normals.

  // Create a new polygon, passing in a position vector, and an array of points (represented
  // by vectors relative to the position vector). If no position is passed in, the position
  // of the polygon will be `(0,0)`.
  /**
   * @param {Vector=} pos A vector representing the origin of the polygon. (all other
   *   points are relative to this one)
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @constructor
   */
  function Polygon(pos, points) {
    this['pos'] = pos || new Vector();
    this['points'] = points || [];
    this.recalc();
  }
  SAT['Polygon'] = Polygon;
  
  // Recalculates the edges and normals of the polygon. This **must** be called
  // if the `points` array is modified at all and the edges or normals are to be
  // accessed.
  /**
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['recalc'] = Polygon.prototype.recalc = function() {
    // The edges here are the direction of the `n`th edge of the polygon, relative to
    // the `n`th point. If you want to draw a given edge from the edge value, you must
    // first translate to the position of the starting point.
    this['edges'] = [];
    // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
    // to the position of the `n`th point. If you want to draw an edge normal, you must first
    // translate to the position of the starting point.
    this['normals'] = [];
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      var p1 = points[i]; 
      var p2 = i < len - 1 ? points[i + 1] : points[0];
      var e = new Vector().copy(p2).sub(p1);
      var n = new Vector().copy(e).perp().normalize();
      this['edges'].push(e);
      this['normals'].push(n);
    }
    return this;
  };

  // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
  //
  // Note: You do **not** need to call `recalc` after rotation.
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['rotate'] = Polygon.prototype.rotate = function(angle) {
    var i;
    var points = this['points'];
    var edges = this['edges'];
    var normals = this['normals'];
    var len = points.length;
    for (i = 0; i < len; i++) {
      points[i].rotate(angle);
      edges[i].rotate(angle);
      normals[i].rotate(angle);
    }
    return this;
  };

  // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
  // system* (i.e. `pos`).
  //
  // This is most useful to change the "center point" of a polygon.
  //
  // Note: You do **not** need to call `recalc` after translation.
  /**
   * @param {number} x The horizontal amount to translate.
   * @param {number} y The vertical amount to translate.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['translate'] = Polygon.prototype.translate = function (x, y) {
    var i;
    var points = this['points'];
    var len = points.length;
    for (i = 0; i < len; i++) {
      points[i].x += x;
      points[i].y += y;
    }
    return this;
  };

  // ## Box
  //
  // Represents an axis-aligned box, with a width and height.


  // Create a new box, with the specified position, width, and height. If no position
  // is given, the position will be `(0,0)`. If no width or height are given, they will
  // be set to `0`.
  /**
   * @param {Vector=} pos A vector representing the top-left of the box.
   * @param {?number=} w The width of the box.
   * @param {?number=} h The height of the box.
   * @constructor
   */
  function Box(pos, w, h) {
    this['pos'] = pos || new Vector();
    this['w'] = w || 0;
    this['h'] = h || 0;
  }
  SAT['Box'] = Box;

  // Returns a polygon whose edges are the same as this box.
  /**
   * @return {Polygon} A new Polygon that represents this box.
   */
  Box.prototype['toPolygon'] = Box.prototype.toPolygon = function() {
    var pos = this['pos'];
    var w = this['w'];
    var h = this['h'];
    return new Polygon(new Vector(pos['x'], pos['y']), [
     new Vector(), new Vector(w, 0), 
     new Vector(w,h), new Vector(0,h)
    ]);
  };
  
  // ## Response
  //
  // An object representing the result of an intersection. Contains:
  //  - The two objects participating in the intersection
  //  - The vector representing the minimum change necessary to extract the first object
  //    from the second one (as well as a unit vector in that direction and the magnitude
  //    of the overlap)
  //  - Whether the first object is entirely inside the second, and vice versa.
  /**
   * @constructor
   */  
  function Response() {
    this['a'] = null;
    this['b'] = null;
    this['overlapN'] = new Vector();
    this['overlapV'] = new Vector();
    this.clear();
  }
  SAT['Response'] = Response;

  // Set some values of the response back to their defaults.  Call this between tests if
  // you are going to reuse a single Response object for multiple intersection tests (recommented
  // as it will avoid allcating extra memory)
  /**
   * @return {Response} This for chaining
   */
  Response.prototype['clear'] = Response.prototype.clear = function() {
    this['aInB'] = true;
    this['bInA'] = true;
    this['overlap'] = Number.MAX_VALUE;
    return this;
  };

  // ## Object Pools

  // A pool of `Vector` objects that are used in calculations to avoid
  // allocating memory.
  /**
   * @type {Array.<Vector>}
   */
  var T_VECTORS = [];
  for (var i = 0; i < 10; i++) { T_VECTORS.push(new Vector()); }
  
  // A pool of arrays of numbers used in calculations to avoid allocating
  // memory.
  /**
   * @type {Array.<Array.<number>>}
   */
  var T_ARRAYS = [];
  for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }

  // ## Helper Functions

  // Flattens the specified array of points onto a unit vector axis,
  // resulting in a one dimensional range of the minimum and
  // maximum value on that axis.
  /**
   * @param {Array.<Vector>} points The points to flatten.
   * @param {Vector} normal The unit vector axis to flatten on.
   * @param {Array.<number>} result An array.  After calling this function,
   *   result[0] will be the minimum value,
   *   result[1] will be the maximum value.
   */
  function flattenPointsOn(points, normal, result) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var len = points.length;
    for (var i = 0; i < len; i++ ) {
      // The magnitude of the projection of the point onto the normal
      var dot = points[i].dot(normal);
      if (dot < min) { min = dot; }
      if (dot > max) { max = dot; }
    }
    result[0] = min; result[1] = max;
  }
  
  // Check whether two convex polygons are separated by the specified
  // axis (must be a unit vector).
  /**
   * @param {Vector} aPos The position of the first polygon.
   * @param {Vector} bPos The position of the second polygon.
   * @param {Array.<Vector>} aPoints The points in the first polygon.
   * @param {Array.<Vector>} bPoints The points in the second polygon.
   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
   *   will be projected onto this axis.
   * @param {Response=} response A Response object (optional) which will be populated
   *   if the axis is not a separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.  If false,
   *   and a response is passed in, information about how much overlap and
   *   the direction of the overlap will be populated.
   */
  function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    var rangeA = T_ARRAYS.pop();
    var rangeB = T_ARRAYS.pop();
    // The magnitude of the offset between the two polygons
    var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    var projectedOffset = offsetV.dot(axis);
    // Project the polygons onto the axis.
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);
    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
    // Check if there is a gap. If there is, this is a separating axis and we can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV); 
      T_ARRAYS.push(rangeA); 
      T_ARRAYS.push(rangeB);
      return true;
    }
    // This is not a separating axis. If we're calculating a response, calculate the overlap.
    if (response) {
      var overlap = 0;
      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        response['aInB'] = false;
        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) { 
          overlap = rangeA[1] - rangeB[0];
          response['bInA'] = false;
        // B is fully inside A.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      // B starts further left than A
      } else {
        response['bInA'] = false;
        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) { 
          overlap = rangeA[0] - rangeB[1];
          response['aInB'] = false;
        // A is fully inside B.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
      var absOverlap = Math.abs(overlap);
      if (absOverlap < response['overlap']) {
        response['overlap'] = absOverlap;
        response['overlapN'].copy(axis);
        if (overlap < 0) {
          response['overlapN'].reverse();
        }
      }      
    }
    T_VECTORS.push(offsetV); 
    T_ARRAYS.push(rangeA); 
    T_ARRAYS.push(rangeB);
    return false;
  }
  
  // Calculates which Vornoi region a point is on a line segment.
  // It is assumed that both the line and the point are relative to `(0,0)`
  //
  //            |       (0)      |
  //     (-1)  [S]--------------[E]  (1)
  //            |       (0)      |
  /**
   * @param {Vector} line The line segment.
   * @param {Vector} point The point.
   * @return  {number} LEFT_VORNOI_REGION (-1) if it is the left region, 
   *          MIDDLE_VORNOI_REGION (0) if it is the middle region, 
   *          RIGHT_VORNOI_REGION (1) if it is the right region.
   */
  function vornoiRegion(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    // If the point is beyond the start of the line, it is in the
    // left vornoi region.
    if (dp < 0) { return LEFT_VORNOI_REGION; }
    // If the point is beyond the end of the line, it is in the
    // right vornoi region.
    else if (dp > len2) { return RIGHT_VORNOI_REGION; }
    // Otherwise, it's in the middle one.
    else { return MIDDLE_VORNOI_REGION; }
  }
  // Constants for Vornoi regions
  /**
   * @const
   */
  var LEFT_VORNOI_REGION = -1;
  /**
   * @const
   */
  var MIDDLE_VORNOI_REGION = 0;
  /**
   * @const
   */
  var RIGHT_VORNOI_REGION = 1;
  
  // ## Collision Tests

  // Check if two circles collide.
  /**
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   the circles intersect.
   * @return {boolean} true if the circles intersect, false if they don't. 
   */
  function testCircleCircle(a, b, response) {
    // Check if the distance between the centers of the two
    // circles is greater than their combined radius.
    var differenceV = T_VECTORS.pop().copy(b['pos']).sub(a['pos']);
    var totalRadius = a['r'] + b['r'];
    var totalRadiusSq = totalRadius * totalRadius;
    var distanceSq = differenceV.len2();
    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
    // They intersect.  If we're calculating a response, calculate the overlap.
    if (response) { 
      var dist = Math.sqrt(distanceSq);
      response['a'] = a;
      response['b'] = b;
      response['overlap'] = totalRadius - dist;
      response['overlapN'].copy(differenceV.normalize());
      response['overlapV'].copy(differenceV).scale(response['overlap']);
      response['aInB']= a['r'] <= b['r'] && dist <= b['r'] - a['r'];
      response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];
    }
    T_VECTORS.push(differenceV);
    return true;
  }
  SAT['testCircleCircle'] = testCircleCircle;
  
  // Check if a polygon and a circle collide.
  /**
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonCircle(polygon, circle, response) {
    // Get the position of the circle relative to the polygon.
    var circlePos = T_VECTORS.pop().copy(circle['pos']).sub(polygon['pos']);
    var radius = circle['r'];
    var radius2 = radius * radius;
    var points = polygon['points'];
    var len = points.length;
    var edge = T_VECTORS.pop();
    var point = T_VECTORS.pop();
    
    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      var next = i === len - 1 ? 0 : i + 1;
      var prev = i === 0 ? len - 1 : i - 1;
      var overlap = 0;
      var overlapN = null;
      
      // Get the edge.
      edge.copy(polygon['edges'][i]);
      // Calculate the center of the circle relative to the starting point of the edge.
      point.copy(circlePos).sub(points[i]);
      
      // If the distance between the center of the circle and the point
      // is bigger than the radius, the polygon is definitely not fully in
      // the circle.
      if (response && point.len2() > radius2) {
        response['aInB'] = false;
      }
      
      // Calculate which Vornoi region the center of the circle is in.
      var region = vornoiRegion(edge, point);
      // If it's the left region:
      if (region === LEFT_VORNOI_REGION) { 
        // We need to make sure we're in the RIGHT_VORNOI_REGION of the previous edge.
        edge.copy(polygon['edges'][prev]);
        // Calculate the center of the circle relative the starting point of the previous edge
        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = vornoiRegion(edge, point2);
        if (region === RIGHT_VORNOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos); 
            T_VECTORS.push(edge);
            T_VECTORS.push(point); 
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
      // If it's the right region:
      } else if (region === RIGHT_VORNOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon['edges'][next]);
        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);
        region = vornoiRegion(edge, point);
        if (region === LEFT_VORNOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos); 
            T_VECTORS.push(edge); 
            T_VECTORS.push(point);
            return false;              
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
      // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge,
        // Change the edge into its "edge normal".
        var normal = edge.perp().normalize();
        // Find the perpendicular distance between the center of the 
        // circle and the edge.
        var dist = point.dot(normal);
        var distAbs = Math.abs(dist);
        // If the circle is on the outside of the edge, there is no intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          T_VECTORS.push(circlePos); 
          T_VECTORS.push(normal); 
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;
          // If the center of the circle is on the outside of the edge, or part of the
          // circle is on the outside, the circle is not fully inside the polygon.
          if (dist >= 0 || overlap < 2 * radius) {
            response['bInA'] = false;
          }
        }
      }
      
      // If this is the smallest overlap we've seen, keep it. 
      // (overlapN may be null if the circle was in the wrong Vornoi region).
      if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {
        response['overlap'] = overlap;
        response['overlapN'].copy(overlapN);
      }
    }
    
    // Calculate the final overlap vector - based on the smallest overlap.
    if (response) {
      response['a'] = polygon;
      response['b'] = circle;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    T_VECTORS.push(circlePos); 
    T_VECTORS.push(edge); 
    T_VECTORS.push(point);
    return true;
  }
  SAT['testPolygonCircle'] = testPolygonCircle;
  
  // Check if a circle and a polygon collide.
  //
  // **NOTE:** This is slightly less efficient than polygonCircle as it just
  // runs polygonCircle and reverses everything at the end.
  /**
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testCirclePolygon(circle, polygon, response) {
    // Test the polygon against the circle.
    var result = testPolygonCircle(polygon, circle, response);
    if (result && response) {
      // Swap A and B in the response.
      var a = response['a'];
      var aInB = response['aInB'];
      response['overlapN'].reverse();
      response['overlapV'].reverse();
      response['a'] = response['b'];
      response['b'] = a;
      response['aInB'] = response['bInA'];
      response['bInA'] = aInB;
    }
    return result;
  }
  SAT['testCirclePolygon'] = testCirclePolygon;
  
  // Checks whether polygons collide.
  /**
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonPolygon(a, b, response) {
    var aPoints = a['points'];
    var aLen = aPoints.length;
    var bPoints = b['points'];
    var bLen = bPoints.length;
    // If any of the edge normals of A is a separating axis, no intersection.
    for (var i = 0; i < aLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {
        return false;
      }
    }
    // If any of the edge normals of B is a separating axis, no intersection.
    for (var i = 0;i < bLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {
        return false;
      }
    }
    // Since none of the edge normals of A or B are a separating axis, there is an intersection
    // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
    // final overlap vector.
    if (response) {
      response['a'] = a;
      response['b'] = b;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    return true;
  }
  SAT['testPolygonPolygon'] = testPolygonPolygon;

  return SAT;
}));
/*
    The graphics component of GameEngine.
*/
var GameGraphics = function(gEngine) {
    return {
        isAnimating: false,

        /*
            @param(number) timeStep The wait time between running the action (in ms).
            @param(number) numTimes The number to times to run the action.
            @param(function) callback The callback function.
        */
        repeatAction: function(timeStep, numTimes, callback) {
            this.isAnimating = true;

            var num = 0,
                that = this
            ;

            var theAnimation = setInterval(function() {
                if(num++ > numTimes) {
                    clearInterval(theAnimation);
                    that.isAnimating = false;
                }
                else {
                    callback();
                }
            }, timeStep);
        }
    };
};

/// <reference path="../commonLinker.js" />

/*
    A generic view interface.
*/
function GameView(gEngine) {
    this.privates = {
        bgColor: "#ccc"
    };

    this.init();
}

GameView.prototype = (function () {

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function(){

        },

        update: function () {

        },

        render: function () {
            ctx.fillStyle = this.privates.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
})();

/// <reference path="../commonLinker.js" />

/*
    Implements GameView.

    @param(string) title The name of the game.
*/
function TitleView(title) {
    this.privates = {
        title: title
    };

    this.init();
}

TitleView.prototype = (function () {
    var title,
        cta = "Press Enter"
    ;

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function(){
            title = this.privates.title;
        },

        update: function () {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
        },

        render: function () {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 100);

            ctx.font = "24px Arial";
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
})();
/// <reference path="../commonLinker.js" />

function GameSaveView() {
    this.privates = {};

    this.init();
}

GameSaveView.prototype = (function() {
    var that,
        title = "Select a save slot",
        cta = "Press Delete to erase a save",
        storage = new GameSave(),
        list = storage.getList(),
        arrow
    ;

    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            that = this;

            arrow = {
                img: ">>",
                slot: 0,
                x: canvas.width / 2 - ctx.measureText(list[0]).width / 2 - 60,    // TODO: make instance var??
                y: 200
            };
        },

        update: function() {
            if(game.input.lastKeyDown === KeyCode.ESC) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback(KeyCode.ESC);
            }
            else if(game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                var date = new Date();
                var m = date.getMonth();
                var d = date.getDay();
                var y = date.getYear();
                var t = date.toLocaleTimeString();

                storage.save(arrow.slot, m + '/' + d + '/' + y + ' ' + t);
                this.privates.callback(KeyCode.ENTER);
            }
            else if(game.input.lastKeyDown === KeyCode.DELETE) {
                game.input.lastKeyDownp = KeyCode.EMPTY;

                list = storage.erase(arrow.slot);
            }
            else if(arrow.slot !== 2 && game.input.lastKeyDown === KeyCode.DOWN) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                ++arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y += 80;
            }
            else if(arrow.slot !== 0 && game.input.lastKeyDown === KeyCode.UP) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                --arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y -= 80;
            }
        },

        render: function() {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 80);

            ctx.font = "24px Arial"

            for(var i = 0; i < list.length; ++i) {
                ctx.fillText(list[i], canvas.width / 2 - ctx.measureText(list[i]).width / 2, 200 + i * 80);
            }

            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();
/// <reference path="../linker.js" />

function OverworldView() {
    this.privates = {};
    this.init();
}

OverworldView.prototype = (function () {

    var arrow = {
        img: "^^"
    };

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function() {
            arrow.x = 90;
            arrow.y = canvas.height / 2 + 70;
            arrow.slot = 0;
        },

        update: function () {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
            else if (game.input.lastKeyDown === KeyCode.RIGHT) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                
                if (arrow.slot < 7) {
                    arrow.x += 115;
                    ++arrow.slot;
                }
            }
            else if (game.input.lastKeyDown === KeyCode.LEFT) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.slot > 0) {
                    arrow.x -= 115;
                    --arrow.slot;
                }
            }
        },

        render: function () {
            // background
            ctx.fillStyle = "#34282c";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // levels
            var size = 80, x, y;

            for (var i = 0; i < 8; ++i) {
                x = 60 + i * 115;
                y = canvas.height / 2 - size / 2;

                ctx.fillStyle = "#fff";
                ctx.font = "18px Arial";
                ctx.fillText("Level " + (i+1), x + 10, y - 13);

                ctx.fillStyle = "red";
                ctx.fillRect(x, y, size, size);
            }

            // arrow
            ctx.fillStyle = "#fff";
            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();
/// <reference path="../linker.js" />

/*
    Implements GameView.

    @param(string) bgColor The view background color.
    @param(Dormant) dormantL The player's dormant.
    @param(Dormant) dormantR The opponent's dormant.
*/
function BattleView(bgColor, dormantL, dormantR) {
    this.privates = {
        bgColor: bgColor,
        dormantL: dormantL,
        dormantR: dormantR
    };

    this.init();
}

BattleView.prototype = (function () {

    var that,
        arrow = {
            img: ">>"
        },
        left,
        wasAttack,
        wasAttackTimer,
        fire,
        theAttack,
        dormantL,
        dormantR
    ;

    function checkInput(dormantL, dormantR) {
        switch(game.input.lastKeyDown) {
            case KeyCode.ENTER:
                game.input.lastKeyDown = KeyCode.EMPTY;

                theAttack.name = dormantL.actions[arrow.curSlot].name;
                theAttack.atk = (dormantL.atk * dormantL.actions[arrow.curSlot].multiplier) / dormantR.def;

                return true;
                break;
            case KeyCode.UP:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(arrow.curSlot !== 0 && dormantL.actions[arrow.curSlot - 1] !== null) {
                    --arrow.curSlot;
                    arrow.y -= 30;
                }
                break;
            case KeyCode.DOWN:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(arrow.curSlot !== 3 && dormantL.actions[arrow.curSlot + 1] !== null) {
                    ++arrow.curSlot;
                    arrow.y += 30;
                }
                break;
        }
    }

    function runTackleAnimation() {
        left.dir = Dir.RIGHT;

        game.graphics.repeatAction(6, 60, function() {
            if(left.dir === Dir.RIGHT && left.x > 60) {
                left.dir = Dir.LEFT;
            }

            if(left.dir === Dir.RIGHT)
                ++left.x;
            else
                --left.x;

            dormantR.hp -= theAttack.atk / 60;
        });
    }

    /****** Render *****/
    function drawDormantHUD(dormant, x, y, drawXP) {
        // name
        var str = dormant.name + "  L" + dormant.lvl;

        ctx.fillStyle = "#000";
        ctx.fillText(str, x + ctx.measureText(str).width / 2, y);

        // hp
        ctx.fillText("HP", x, y + 20);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x + 21, y + 12, 100, 10);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 22, y + 13, dormant.hp * (100 / dormant.initHP) - 1, 8);

        // xp
        if(drawXP) {
            ctx.fillStyle = "#000";
            ctx.fillText("XP", x, y + 40);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x + 21, y + 32, 100, 10);

            ctx.fillStyle = "#777";
            ctx.fillRect(x + 22, y + 33, dormant.xp * (100 / dormant.xpNeeded) - 1, 8);
        }
    }

    function drawHUD() {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(20, 300, 500, 250);

        ctx.font = "12px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("ATK: " + dormantL.atk, 460, 320);
        ctx.fillText("DEF: " + dormantL.def, 460, 340);

        drawActionList();
        drawActionArrow();
    }

    function drawActionList() {
        ctx.fillStyle = "#000";

        for (var i = 0; i < 4; ++i) {
            if (dormantL.actions[i] === null) {
                ctx.fillText("--", 80, 350 + i * 30);
            }
            else {
                ctx.fillText(dormantL.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    function drawActionArrow() {
        ctx.fillStyle = "#000";
        ctx.fillText(arrow.img, arrow.x, arrow.y);
    }


    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            that = this;
            arrow.x = 43;
            arrow.y = 350;
            arrow.curSlot = 0;

            left = {
                x: 30,
                dir: Dir.RIGHT
            };

            fire = {
                x: 0,
                y: 0
            };

            wasAttack = false;
            wasAttackTimer = 60;
            theAttack = {
                name: "EMPTY",
                atk: 0
            };

            dormantL = this.privates.dormantL;
            dormantR = this.privates.dormantR;
        },

        update: function() {
            if(wasAttack) {
                dormantR.hp -= theAttack.atk / 60;
            }
            if(!game.graphics.isAnimating) {
                var _wasAttack = checkInput(dormantL, dormantR);
                if(_wasAttack) {
                    if(theAttack.name === FightAction.TACKLE.name) {
                        runTackleAnimation();
                    }
                    else if(theAttack.name === FightAction.DRAGONS_BREATH.name) {
                        wasAttack = true;
                    }
                }
            }

            if(dormantR.hp <= 0) {
                dormantL.xp += 25;
                this.privates.callback();
            }
        },

        render: function () {
            // background
            ctx.fillStyle = this.privates.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // left
            drawDormantHUD(dormantL, 10, 15, true);
            dormantL.draw(left.x, 90);
            drawHUD();

            // right
            drawDormantHUD(dormantR, canvas.width - 130, 15, false);
            dormantR.draw(770, 90);


            // attack animation
            if(wasAttack) {

                var t = (wasAttackTimer % 40);
                if(t >= 0 && t < 10) {
                    fire.x = 0;
                }
                else if(t >= 10 && t < 20) {
                    fire.x = 5;
                }
                else if(t >= 20 && t < 30) {
                    fire.x = 0;
                }
                else if(t >= 30 && t < 40) {
                    fire.x = -5;
                }

                ctx.fillStyle = "red";
                ctx.fillRect(870 + fire.x, 242, 40, 12);
                ctx.fillRect(880 + fire.x, 230, 30, 12);
                ctx.fillRect(880 + fire.x, 218, 20, 12);


                if(wasAttackTimer-- === 0) {
                    wasAttack = false;
                    wasAttackTimer = 60;
                }
            }

        }
    };
})();
/// <reference path="../linker.js" />

/*
    @param(string) name The name of the dormant.
    @param(number) atk The attack strength of the dormant.
    @param(number) def The defense strength of the dormant.
    @param(number) hp The total available health points of the dormant.
    @param(array) actions The fight actions of the dormant.
    @param(?number) lvl The level of the dormant. (1 by default)
*/
function Dormant(src, name, atk, def, hp, actions, lvl) {
    var that = this;

    this.img = new Image();
    this.imgReady = false;
    this.img.onload = function () {
        that.imgReady = true;
    };
    this.img.src = "img/" + src;

    this.name = name;
    this.atk = atk;
    this.def = def;
    this.initHP = this.hp = hp;
    this.actions = actions;
    this.lvl = (typeof (lvl) !== "undefined") ? lvl : 1;
    this.xp = 0;
    this.xpNeeded = 50;
}

Dormant.prototype = (function () {

    return {
        draw: function (x, y) {
            if (this.imgReady) {
                ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
            }
        }
    };
})();

var FightAction = Object.freeze({
    TACKLE: {
        name: "TACKLE",
        multiplier: 1
    },
    HEAL: {
        name: "HEAL",
        multiplier: 1
    },
    DRAGONS_BREATH: {
        name: "DRAGONS BREATH",
        multiplier: 5
    }
});
/// <reference path="linker.js" />

/*
    The main class for dormanticide.
    Declares game as a global.
*/
(function Main() {

    game = new GameEngine();
    game.start();

    var curLvl = 1;

    var titleView = new TitleView("Dormanticide");
    titleView.then(function () {
        game.utils.switchView(overworldView);
    });

    var overworldView = new OverworldView();
    overworldView.then(function () {
        if (curLvl === 1)
            game.utils.switchView(lvl1);
        else
            game.utils.switchView(lvl2);
    });


    var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

    var malaise = new Dormant("malaise.png", "MALAISE", 12, 8, 27, actions);
    var erabor = new Dormant("erabor.png", "ERABOR", 8, 12, 23, actions);
    var tildamesh = new Dormant("tildamesh.png", "TILDAMESH", 8, 12, 23, actions);


    var lvl1 = new BattleView("#ddd", malaise, erabor);
    lvl1.then(function () {
        ++curLvl;
        game.utils.switchView(overworldView);
    });

    var lvl2 = new BattleView("#ddd", malaise, tildamesh);
    lvl2.then(function () {
        game.utils.switchView(overworldView);
    });


    game.view = titleView;
})();
//# sourceMappingURL=pageDormanticide.js.map