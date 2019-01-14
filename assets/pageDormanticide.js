'use strict';
/* globals canvas, GameInput, GameGraphics, GameUtils, GameView */

class GameEngine {
    constructor() {
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);

        this.updateInterval = setInterval(this.update, 1000 / 60);
        this.renderRAF = requestAnimationFrame(this.render);

        this.onUpdateSet = false;
        this.onRenderSet = false;

        // back button
        let backBtn = document.createElement('a');
        backBtn.href = '/#games';
        backBtn.innerText = 'Back';
        backBtn.className = 'btn-back';
        document.body.appendChild(backBtn);

        // canvas wrap
        let wrap = document.createElement('div');
        wrap.className = 'canvas-wrap';

        // canvas
        window.canvas = document.createElement('canvas');
        canvas.setAttribute('width', 16 * 63);
        canvas.setAttribute('height', 9 * 63);
        wrap.appendChild(canvas);
        document.body.appendChild(wrap);

        window.ctx = canvas.getContext('2d');

        this.input = new GameInput();
        this.graphics = new GameGraphics();
        this.view = new GameView();
        this.utils = new GameUtils(this);
    }

    update() {
        this.view.update();

        if(this.onUpdateSet) {
            this.onUpdate();
        }
    }

    render() {
        this.renderRAF = requestAnimationFrame(this.render);
        this.view.render();

        if(this.onRenderSet) {
            this.onRender();
        }
    }

    onUpdate(callback) {
        this.onUpdateSet = true;
        this.onUpdate = callback;
    }

    onRender(callback) {
        this.onRenderSet = true;
        this.onRender = callback;
    }

    stop() {
        clearInterval(this.updateInterval);
        cancelAnimationFrame(this.renderRAF);
    }
}
'use strict';

class GameSave {
    load(slot) {
        return localStorage[`slot ${slot}`];
    }

    getList() {
        const zero = this.load(0),
            one = this.load(1),
            two = this.load(2),
            def = '---'
        ;

        return [
            (typeof(zero) !== 'undefined') ? zero : def,
            (typeof(one) !== 'undefined') ? one : def,
            (typeof(two) !== 'undefined') ? two : def
        ];
    }

    save(slot, data) {
        localStorage[`slot ${slot}`] = data;
    }

    erase(slot) {
        localStorage.removeItem(`slot ${slot}`);
        return this.getList();
    }
}

'use strict';

const KeyCode = {
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
};

let KeyCodeNames = {};
KeyCodeNames[-1] = 'EMPTY';
KeyCodeNames[13] = 'ENTER';
KeyCodeNames[17] = 'CTRL';
KeyCodeNames[27] = 'ESC';
KeyCodeNames[32] = 'SPACEBAR';
KeyCodeNames[37] = 'LEFT';
KeyCodeNames[38] = 'UP';
KeyCodeNames[39] = 'RIGHT';
KeyCodeNames[40] = 'DOWN';
KeyCodeNames[46] = 'DELETE';
KeyCodeNames[65] = 'A';
KeyCodeNames[68] = 'D';
KeyCodeNames[70] = 'F';
KeyCodeNames[72] = 'H';
KeyCodeNames[74] = 'J';
KeyCodeNames[75] = 'K';
KeyCodeNames[77] = 'M';
KeyCodeNames[79] = 'O';
KeyCodeNames[82] = 'R';
KeyCodeNames[83] = 'S';
KeyCodeNames[87] = 'W';

class GameInput {
	constructor() {
		this.keysDown = {};
		this.lastKeyDown = KeyCode.EMPTY;

		let lastKeyUp = KeyCode.EMPTY;

		addEventListener('keydown', e => {
			const key = this.fixKey(e.keyCode);

			if(!this.keysDown[key]) {
				this.lastKeyDown = key;
				this.keysDown[key] = true;
			}
		});

		addEventListener('keyup', e => {
			lastKeyUp = this.fixKey(e.keyCode);
			delete this.keysDown[lastKeyUp];
		});
	}

	fixKey(key) {
		if(key === KeyCode.W) {
			key = KeyCode.UP;
		}
		else if(key === KeyCode.S) {
			key = KeyCode.DOWN;
		}
		else if(key === KeyCode.D) {
			key = KeyCode.RIGHT;
		}
		else if(key === KeyCode.A) {
			key = KeyCode.LEFT;
		}

		return key;
	}
}
'use strict';

class GameUtils {
    constructor(gEngine) {
        this.gEngine = gEngine;
    }

    /*
     * Resets the newView's private variables.
     * Changes the view.
     */
    switchView(newView) {
        newView.init();
        this.gEngine.view = newView;
    }
}

const Dir = {
    RIGHT: 0,
    LEFT: 1
};
// Version 0.6.0 - Copyright 2012 - 2016 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.
/** @preserve SAT.js - Version 0.6.0 - Copyright 2012 - 2016 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

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

  // Create a new vector with the same coordinates as this on.
  /**
   * @return {Vector} The new cloned vector
   */
  Vector.prototype['clone'] = Vector.prototype.clone = function() {
    return new Vector(this['x'], this['y']);
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

  // Compute the axis-aligned bounding box (AABB) of this Circle.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Circle.prototype['getAABB'] = Circle.prototype.getAABB = function() {
    var r = this['r'];
    var corner = this["pos"].clone().sub(new Vector(r, r));
    return new Box(corner, r*2, r*2).toPolygon();
  };

  // ## Polygon
  //
  // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
  //
  // Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the
  // provided setters. Otherwise the calculated properties will not be updated correctly.
  //
  // `pos` can be changed directly.

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
    this['angle'] = 0;
    this['offset'] = new Vector();
    this.setPoints(points || []);
  }
  SAT['Polygon'] = Polygon;

  // Set the points of the polygon.
  //
  // Note: The points are counter-clockwise *with respect to the coordinate system*.
  // If you directly draw the points on a screen that has the origin at the top-left corner
  // it will _appear_ visually that the points are being specified clockwise. This is just
  // because of the inversion of the Y-axis when being displayed.
  /**
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setPoints'] = Polygon.prototype.setPoints = function(points) {
    // Only re-allocate if this is a new polygon or the number of points has changed.
    var lengthChanged = !this['points'] || this['points'].length !== points.length;
    if (lengthChanged) {
      var i;
      var calcPoints = this['calcPoints'] = [];
      var edges = this['edges'] = [];
      var normals = this['normals'] = [];
      // Allocate the vector arrays for the calculated properties
      for (i = 0; i < points.length; i++) {
        calcPoints.push(new Vector());
        edges.push(new Vector());
        normals.push(new Vector());
      }
    }
    this['points'] = points;
    this._recalc();
    return this;
  };

  // Set the current rotation angle of the polygon.
  /**
   * @param {number} angle The current rotation angle (in radians).
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setAngle'] = Polygon.prototype.setAngle = function(angle) {
    this['angle'] = angle;
    this._recalc();
    return this;
  };

  // Set the current offset to apply to the `points` before applying the `angle` rotation.
  /**
   * @param {Vector} offset The new offset vector.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setOffset'] = Polygon.prototype.setOffset = function(offset) {
    this['offset'] = offset;
    this._recalc();
    return this;
  };

  // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
  //
  // Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['rotate'] = Polygon.prototype.rotate = function(angle) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i].rotate(angle);
    }
    this._recalc();
    return this;
  };

  // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
  // system* (i.e. `pos`).
  //
  // This is most useful to change the "center point" of a polygon. If you just want to move the whole polygon, change
  // the coordinates of `pos`.
  //
  // Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
  /**
   * @param {number} x The horizontal amount to translate.
   * @param {number} y The vertical amount to translate.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['translate'] = Polygon.prototype.translate = function (x, y) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i].x += x;
      points[i].y += y;
    }
    this._recalc();
    return this;
  };


  // Computes the calculated collision polygon. Applies the `angle` and `offset` to the original points then recalculates the
  // edges and normals of the collision polygon.
  /**
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype._recalc = function() {
    // Calculated points - this is what is used for underlying collisions and takes into account
    // the angle/offset set on the polygon.
    var calcPoints = this['calcPoints'];
    // The edges here are the direction of the `n`th edge of the polygon, relative to
    // the `n`th point. If you want to draw a given edge from the edge value, you must
    // first translate to the position of the starting point.
    var edges = this['edges'];
    // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
    // to the position of the `n`th point. If you want to draw an edge normal, you must first
    // translate to the position of the starting point.
    var normals = this['normals'];
    // Copy the original points array and apply the offset/angle
    var points = this['points'];
    var offset = this['offset'];
    var angle = this['angle'];
    var len = points.length;
    var i;
    for (i = 0; i < len; i++) {
      var calcPoint = calcPoints[i].copy(points[i]);
      calcPoint.x += offset.x;
      calcPoint.y += offset.y;
      if (angle !== 0) {
        calcPoint.rotate(angle);
      }
    }
    // Calculate the edges/normals
    for (i = 0; i < len; i++) {
      var p1 = calcPoints[i];
      var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
      var e = edges[i].copy(p2).sub(p1);
      normals[i].copy(e).perp().normalize();
    }
    return this;
  };


  // Compute the axis-aligned bounding box. Any current state
  // (translations/rotations) will be applied before constructing the AABB.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Polygon.prototype["getAABB"] = Polygon.prototype.getAABB = function() {
    var points = this["calcPoints"];
    var len = points.length;
    var xMin = points[0]["x"];
    var yMin = points[0]["y"];
    var xMax = points[0]["x"];
    var yMax = points[0]["y"];
    for (var i = 1; i < len; i++) {
      var point = points[i];
      if (point["x"] < xMin) {
        xMin = point["x"];
      }
      else if (point["x"] > xMax) {
        xMax = point["x"];
      }
      if (point["y"] < yMin) {
        yMin = point["y"];
      }
      else if (point["y"] > yMax) {
        yMax = point["y"];
      }
    }
    return new Box(this["pos"].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
  };


  // ## Box
  //
  // Represents an axis-aligned box, with a width and height.


  // Create a new box, with the specified position, width, and height. If no position
  // is given, the position will be `(0,0)`. If no width or height are given, they will
  // be set to `0`.
  /**
   * @param {Vector=} pos A vector representing the bottom-left of the box (i.e. the smallest x and smallest y value).
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

  // Temporary response used for polygon hit detection.
  /**
   * @type {Response}
   */
  var T_RESPONSE = new Response();

  // Tiny "point" polygon used for polygon hit detection.
  /**
   * @type {Polygon}
   */
  var TEST_POINT = new Box(new Vector(), 0.000001, 0.000001).toPolygon();

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
  SAT['isSeparatingAxis'] = isSeparatingAxis;

  // Calculates which Voronoi region a point is on a line segment.
  // It is assumed that both the line and the point are relative to `(0,0)`
  //
  //            |       (0)      |
  //     (-1)  [S]--------------[E]  (1)
  //            |       (0)      |
  /**
   * @param {Vector} line The line segment.
   * @param {Vector} point The point.
   * @return  {number} LEFT_VORONOI_REGION (-1) if it is the left region,
   *          MIDDLE_VORONOI_REGION (0) if it is the middle region,
   *          RIGHT_VORONOI_REGION (1) if it is the right region.
   */
  function voronoiRegion(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    // If the point is beyond the start of the line, it is in the
    // left voronoi region.
    if (dp < 0) { return LEFT_VORONOI_REGION; }
    // If the point is beyond the end of the line, it is in the
    // right voronoi region.
    else if (dp > len2) { return RIGHT_VORONOI_REGION; }
    // Otherwise, it's in the middle one.
    else { return MIDDLE_VORONOI_REGION; }
  }
  // Constants for Voronoi regions
  /**
   * @const
   */
  var LEFT_VORONOI_REGION = -1;
  /**
   * @const
   */
  var MIDDLE_VORONOI_REGION = 0;
  /**
   * @const
   */
  var RIGHT_VORONOI_REGION = 1;

  // ## Collision Tests

  // Check if a point is inside a circle.
  /**
   * @param {Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * @return {boolean} true if the point is inside the circle, false if it is not.
   */
  function pointInCircle(p, c) {
    var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']);
    var radiusSq = c['r'] * c['r'];
    var distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    // If the distance between is smaller than the radius then the point is inside the circle.
    return distanceSq <= radiusSq;
  }
  SAT['pointInCircle'] = pointInCircle;

  // Check if a point is inside a convex polygon.
  /**
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * @return {boolean} true if the point is inside the polygon, false if it is not.
   */
  function pointInPolygon(p, poly) {
    TEST_POINT['pos'].copy(p);
    T_RESPONSE.clear();
    var result = testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
    if (result) {
      result = T_RESPONSE['aInB'];
    }
    return result;
  }
  SAT['pointInPolygon'] = pointInPolygon;

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
    var points = polygon['calcPoints'];
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

      // Calculate which Voronoi region the center of the circle is in.
      var region = voronoiRegion(edge, point);
      // If it's the left region:
      if (region === LEFT_VORONOI_REGION) {
        // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
        edge.copy(polygon['edges'][prev]);
        // Calculate the center of the circle relative the starting point of the previous edge
        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = voronoiRegion(edge, point2);
        if (region === RIGHT_VORONOI_REGION) {
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
      } else if (region === RIGHT_VORONOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon['edges'][next]);
        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);
        region = voronoiRegion(edge, point);
        if (region === LEFT_VORONOI_REGION) {
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
      // (overlapN may be null if the circle was in the wrong Voronoi region).
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
    var aPoints = a['calcPoints'];
    var aLen = aPoints.length;
    var bPoints = b['calcPoints'];
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
'use strict';

class GameGraphics {
    constructor() {
        this.isAnimating = false;
    }

    /*
     * timeStep The wait time between running the action (in ms).
     * numTimes The number to times to run the action.
     * callback The callback function.
     */
    repeatAction(timeStep, numTimes, callback) {
        this.isAnimating = true;

        let num = 0;
        let theAnimation = setInterval(() => {
            if(num++ > numTimes) {
                clearInterval(theAnimation);
                this.isAnimating = false;
            }
            else {
                callback();
            }
        }, timeStep);
    }
}
'use strict';
/* globals canvas, ctx */

class GameView {
    constructor() {
        this.privates = {
            bgColor: '#ccc'
        };
    
        this.init();
    }
    
    then(callback) {
        this.privates.callback = callback;
    }
    
    init() {
        
    }
    
    update() {
        
    }
    
    render() {
        ctx.fillStyle = this.privates.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
'use strict';
/* globals game, canvas, ctx, KeyCode */

class TitleView {
    constructor(title) {
        this.cta = 'Press Enter';

        this.privates = {
            title: title
        };

        this.init();
    }

    then(callback) {
        this.privates.callback = callback;
    }

    init() {
        this.title = this.privates.title;
    }

    update() {
        if(game.input.lastKeyDown === KeyCode.ENTER) {
            game.input.lastKeyDown = KeyCode.EMPTY;
            this.privates.callback();
        }
    }

    render() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '36px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.title, canvas.width / 2 - ctx.measureText(this.title).width / 2, 100);

        ctx.font = '24px Arial';
        ctx.fillText(this.cta, canvas.width / 2 - ctx.measureText(this.cta).width / 2, canvas.height / 2);
    }
}
/* globals GameSave, canvas, ctx, KeyCode, game */

class GameSaveView {
    constructor() {
        this.title = 'Select a save slot';
        this.storage = new GameSave();
        this.list = this.storage.getList();

        this.privates = {};
        this.init();
    }

    then(callback) {
        this.privates.callback = callback;
    }

    init() {
        this.arrow = {
            img: '>>',
            slot: 0,
            x: canvas.width / 2 - ctx.measureText(this.list[0]).width / 2 - 60,    // TODO: make instance var??
            y: 200
        };
    }

    update() {
        if(game.input.lastKeyDown === KeyCode.ESC) {
            game.input.lastKeyDown = KeyCode.EMPTY;
            this.privates.callback(KeyCode.ESC);
        }
        else if(game.input.lastKeyDown === KeyCode.ENTER) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            const date = new Date();
            const m = date.getMonth() + 1;
            const d = date.getDate();
            const y = date.getFullYear();
            const t = date.toLocaleTimeString();

            this.storage.save(this.arrow.slot, `${m}/${d}/${y} ${t}`);
            this.privates.callback(KeyCode.ENTER);
        }
        else if(game.input.lastKeyDown === KeyCode.DELETE) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            this.list = this.storage.erase(this.arrow.slot);
        }
        else if(this.arrow.slot !== 2 && game.input.lastKeyDown === KeyCode.DOWN) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            ++this.arrow.slot;
            this.arrow.x = canvas.width / 2 - ctx.measureText(this.list[this.arrow.slot]).width / 2 - 60;
            this.arrow.y += 80;
        }
        else if(this.arrow.slot !== 0 && game.input.lastKeyDown === KeyCode.UP) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            --this.arrow.slot;
            this.arrow.x = canvas.width / 2 - ctx.measureText(this.list[this.arrow.slot]).width / 2 - 60;
            this.arrow.y -= 80;
        }
    }

    render() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '36px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.title, canvas.width / 2 - ctx.measureText(this.title).width / 2, 80);

        ctx.font = '24px Arial';

        for(let i = 0; i < this.list.length; ++i) {
            ctx.fillText(this.list[i], canvas.width / 2 - ctx.measureText(this.list[i]).width / 2, 200 + i * 80);
        }

        ctx.fillText(this.arrow.img, this.arrow.x, this.arrow.y);
    }
}
'use strict';
/* globals game, canvas, ctx, KeyCode */

class OverworldView {
    constructor() {
        this._arrow = {
            img: '^^'
        };

        this.privates = {};
        this.init();
    }

    then(callback){
        this.privates.callback = callback;
    }

    init() {
        this._arrow.x = 90;
        this._arrow.y = canvas.height / 2 + 70;
        this._arrow.slot = 0;
    }

    update() {
        if(game.input.lastKeyDown === KeyCode.ENTER) {
            game.input.lastKeyDown = KeyCode.EMPTY;
            this.privates.callback();
        }
        else if(game.input.lastKeyDown === KeyCode.RIGHT) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            if(this._arrow.slot < 7) {
                this._arrow.x += 115;
                ++this._arrow.slot;
            }
        }
        else if(game.input.lastKeyDown === KeyCode.LEFT) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            if(this._arrow.slot > 0) {
                this._arrow.x -= 115;
                --this._arrow.slot;
            }
        }
    }

    render() {
        // background
        ctx.fillStyle = '#34282c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // levels
        let size = 80, x, y;

        for (let i = 0; i < 8; ++i) {
            x = 60 + i * 115;
            y = canvas.height / 2 - size / 2;

            ctx.fillStyle = '#fff';
            ctx.font = '18px Arial';
            ctx.fillText('Level ' + (i+1), x + 10, y - 13);

            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, size, size);
        }

        // arrow
        ctx.fillStyle = '#fff';
        ctx.fillText(this._arrow.img, this._arrow.x, this._arrow.y);
    }
}
'use strict';
/* globals game, canvas, ctx, KeyCode, Dir, FightAction */

class BattleView {
    constructor(bgColor, dormantL, dormantR) {
        this._arrow = {
            img: '>>'
        };

        this.privates = {
            bgColor: bgColor,
            dormantL: dormantL,
            dormantR: dormantR
        };

        this.init();
    }

    then(callback) {
        this.privates.callback = callback;
    }

    init() {
        this._arrow.x = 43;
        this._arrow.y = 350;
        this._arrow.curSlot = 0;

        this._left = {
            x: 30,
            dir: Dir.RIGHT
        };

        this._fire = {
            x: 0,
            y: 0
        };

        this._wasAttack = false;
        this._wasAttackTimer = 60;
        this._theAttack = {
            name: 'EMPTY',
            atk: 0
        };

        this._dormantL = this.privates.dormantL;
        this._dormantR = this.privates.dormantR;
    }

    _checkInput() {
        switch(game.input.lastKeyDown) {
            case KeyCode.ENTER:
                game.input.lastKeyDown = KeyCode.EMPTY;

                this._theAttack.name = this._dormantL.actions[this._arrow.curSlot].name;
                this._theAttack.atk = (this._dormantL.atk * this._dormantL.actions[this._arrow.curSlot].multiplier) / this._dormantR.def;

                return true;
            case KeyCode.UP:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(this._arrow.curSlot !== 0 && this._dormantL.actions[this._arrow.curSlot - 1] !== null) {
                    --this._arrow.curSlot;
                    this._arrow.y -= 30;
                }
                break;
            case KeyCode.DOWN:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(this._arrow.curSlot !== 3 && this._dormantL.actions[this._arrow.curSlot + 1] !== null) {
                    ++this._arrow.curSlot;
                    this._arrow.y += 30;
                }
                break;
        }
    }

    update() {
        if(this._wasAttack) {
            this._dormantR.hp -= this._theAttack.atk / 60;
        }

        if(!game.graphics.isAnimating) {
            const wasAttack = this._checkInput();

            if(wasAttack) {
                if(this._theAttack.name === FightAction.TACKLE.name) {
                    this._runTackleAnimation();
                }
                else if(this._theAttack.name === FightAction.DRAGONS_BREATH.name) {
                    this._wasAttack = true;
                }
            }
        }

        if(this._dormantR.hp <= 0) {
            this._dormantL.xp += 25;
            this.privates.callback();
        }
    }

    _runTackleAnimation() {
        this._left.dir = Dir.RIGHT;

        game.graphics.repeatAction(6, 60, () => {
            if(this._left.dir === Dir.RIGHT && this._left.x > 60) {
                this._left.dir = Dir.LEFT;
            }

            if(this._left.dir === Dir.RIGHT) {
                ++this._left.x;
            }
            else {
                --this._left.x;
            }

            this._dormantR.hp -= this._theAttack.atk / 60;
        });
    }

    render() {
        // background
        ctx.fillStyle = this.privates.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // left
        this._drawDormantHUD(this._dormantL, 10, 15, true);
        this._dormantL.draw(this._left.x, 90);
        this._drawHUD();

        // right
        this._drawDormantHUD(this._dormantR, canvas.width - 130, 15, false);
        this._dormantR.draw(770, 90);

        // attack animation
        if(this._wasAttack) {
            const t = (this._wasAttackTimer % 40);

            if(t >= 0 && t < 10) {
                this._fire.x = 0;
            }
            else if(t >= 10 && t < 20) {
                this._fire.x = 5;
            }
            else if(t >= 20 && t < 30) {
                this._fire.x = 0;
            }
            else if(t >= 30 && t < 40) {
                this._fire.x = -5;
            }

            ctx.fillStyle = 'red';
            ctx.fillRect(870 + this._fire.x, 242, 40, 12);
            ctx.fillRect(880 + this._fire.x, 230, 30, 12);
            ctx.fillRect(880 + this._fire.x, 218, 20, 12);

            if(this._wasAttackTimer-- === 0) {
                this._wasAttack = false;
                this._wasAttackTimer = 60;
            }
        }
    }

    _drawDormantHUD(dormant, x, y, drawXP) {
        // name
        const str = `${dormant.name} L${dormant.lvl}`;

        ctx.fillStyle = '#000';
        ctx.fillText(str, x + ctx.measureText(str).width / 2, y);

        // hp
        ctx.fillText('HP', x, y + 20);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x + 21, y + 12, 100, 10);

        ctx.fillStyle = 'red';
        ctx.fillRect(x + 22, y + 13, dormant.hp * (100 / dormant.initHP) - 1, 8);

        // xp
        if(drawXP) {
            ctx.fillStyle = '#000';
            ctx.fillText('XP', x, y + 40);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(x + 21, y + 32, 100, 10);

            ctx.fillStyle = '#777';
            ctx.fillRect(x + 22, y + 33, dormant.xp * (100 / dormant.xpNeeded) - 1, 8);
        }
    }

    _drawHUD() {
        ctx.strokeStyle = '#000';
        ctx.strokeRect(20, 300, 500, 250);

        ctx.font = '12px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('ATK: ' + this._dormantL.atk, 460, 320);
        ctx.fillText('DEF: ' + this._dormantL.def, 460, 340);

        this._drawActionList();
        this._drawActionArrow();
    }

    _drawActionList() {
        ctx.fillStyle = '#000';

        for(let i = 0; i < 4; ++i) {
            if(this._dormantL.actions[i] === null) {
                ctx.fillText('--', 80, 350 + i * 30);
            }
            else {
                ctx.fillText(this._dormantL.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    _drawActionArrow() {
        ctx.fillStyle = '#000';
        ctx.fillText(this._arrow.img, this._arrow.x, this._arrow.y);
    }
}
'use strict';
/* global ctx */

class Dormant {
    constructor(src, name, atk, def, hp, actions, lvl) {
        this.img = new Image();
        this.imgReady = false;
        this.img.onload = () => {
            this.imgReady = true;
        };
        this.img.src = `img/${src}`;

        this.name = name;
        this.atk = atk;
        this.def = def;
        this.initHP = this.hp = hp;
        this.actions = actions;
        this.lvl = (typeof(lvl) !== 'undefined') ? lvl : 1;
        this.xp = 0;
        this.xpNeeded = 50;
    }

    draw(x, y) {
        if(this.imgReady) {
            ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
        }
    }
}
const FightAction = {
    TACKLE: {
        name: 'TACKLE',
        multiplier: 1
    },
    HEAL: {
        name: 'HEAL',
        multiplier: 1
    },
    DRAGONS_BREATH: {
        name: 'DRAGONS BREATH',
        multiplier: 5
    }
};
'use strict';
/* globals GameEngine, TitleView, OverworldView, FightAction, Dormant, BattleView, game */

(() => {
	window.game = new GameEngine();

	let curLvl = 1;

	let titleView = new TitleView('Dormanticide');
	titleView.then(() => {
		game.utils.switchView(overworldView);
	});

	let overworldView = new OverworldView();
	overworldView.then(() => {
		if(curLvl === 1) {
			game.utils.switchView(lvl1);
		}
		else {
			game.utils.switchView(lvl2);
		}
	});

	let actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

	let malaise = new Dormant('malaise.png', 'MALAISE', 12, 8, 27, actions);
	let erabor = new Dormant('erabor.png', 'ERABOR', 8, 12, 23, actions);

	let lvl1 = new BattleView('#ddd', malaise, erabor);
	lvl1.then(() => {
		++curLvl;
		game.utils.switchView(overworldView);
	});

	let lvl2 = new BattleView('#ddd', malaise, erabor);
	lvl2.then(() => {
		game.utils.switchView(overworldView);
	});

	game.view = titleView;
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVFbmdpbmUuanMiLCJHYW1lU2F2ZS5qcyIsIkdhbWVJbnB1dC5qcyIsIkdhbWVVdGlscy5qcyIsIlNBVC5qcyIsIkdhbWVHcmFwaGljcy5qcyIsIkdhbWVWaWV3LmpzIiwiVGl0bGVWaWV3LmpzIiwiR2FtZVNhdmVWaWV3LmpzIiwiT3ZlcndvcmxkVmlldy5qcyIsIkJhdHRsZVZpZXcuanMiLCJEb3JtYW50LmpzIiwiRmlnaHRBY3Rpb24uanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicGFnZURvcm1hbnRpY2lkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuLyogZ2xvYmFscyBjYW52YXMsIEdhbWVJbnB1dCwgR2FtZUdyYXBoaWNzLCBHYW1lVXRpbHMsIEdhbWVWaWV3ICovXHJcblxyXG5jbGFzcyBHYW1lRW5naW5lIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZSwgMTAwMCAvIDYwKTtcclxuICAgICAgICB0aGlzLnJlbmRlclJBRiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlcik7XHJcblxyXG4gICAgICAgIHRoaXMub25VcGRhdGVTZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uUmVuZGVyU2V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGJhY2sgYnV0dG9uXHJcbiAgICAgICAgbGV0IGJhY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgYmFja0J0bi5ocmVmID0gJy8jZ2FtZXMnO1xyXG4gICAgICAgIGJhY2tCdG4uaW5uZXJUZXh0ID0gJ0JhY2snO1xyXG4gICAgICAgIGJhY2tCdG4uY2xhc3NOYW1lID0gJ2J0bi1iYWNrJztcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJhY2tCdG4pO1xyXG5cclxuICAgICAgICAvLyBjYW52YXMgd3JhcFxyXG4gICAgICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgd3JhcC5jbGFzc05hbWUgPSAnY2FudmFzLXdyYXAnO1xyXG5cclxuICAgICAgICAvLyBjYW52YXNcclxuICAgICAgICB3aW5kb3cuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxNiAqIDYzKTtcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA5ICogNjMpO1xyXG4gICAgICAgIHdyYXAuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXApO1xyXG5cclxuICAgICAgICB3aW5kb3cuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBuZXcgR2FtZUlucHV0KCk7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcyA9IG5ldyBHYW1lR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR2FtZVZpZXcoKTtcclxuICAgICAgICB0aGlzLnV0aWxzID0gbmV3IEdhbWVVdGlscyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy52aWV3LnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm9uVXBkYXRlU2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyUkFGID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKTtcclxuICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMub25SZW5kZXJTZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5vblJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZShjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMub25VcGRhdGVTZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25VcGRhdGUgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBvblJlbmRlcihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMub25SZW5kZXJTZXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25SZW5kZXIgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJSQUYpO1xyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgR2FtZVNhdmUge1xyXG4gICAgbG9hZChzbG90KSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtgc2xvdCAke3Nsb3R9YF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGlzdCgpIHtcclxuICAgICAgICBjb25zdCB6ZXJvID0gdGhpcy5sb2FkKDApLFxyXG4gICAgICAgICAgICBvbmUgPSB0aGlzLmxvYWQoMSksXHJcbiAgICAgICAgICAgIHR3byA9IHRoaXMubG9hZCgyKSxcclxuICAgICAgICAgICAgZGVmID0gJy0tLSdcclxuICAgICAgICA7XHJcblxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICh0eXBlb2YoemVybykgIT09ICd1bmRlZmluZWQnKSA/IHplcm8gOiBkZWYsXHJcbiAgICAgICAgICAgICh0eXBlb2Yob25lKSAhPT0gJ3VuZGVmaW5lZCcpID8gb25lIDogZGVmLFxyXG4gICAgICAgICAgICAodHlwZW9mKHR3bykgIT09ICd1bmRlZmluZWQnKSA/IHR3byA6IGRlZlxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZShzbG90LCBkYXRhKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlW2BzbG90ICR7c2xvdH1gXSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZXJhc2Uoc2xvdCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBzbG90ICR7c2xvdH1gKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRMaXN0KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgS2V5Q29kZSA9IHtcclxuXHRFTVBUWTogLTEsXHJcblx0RU5URVI6IDEzLFxyXG5cdENUUkw6IDE3LFxyXG5cdEVTQzogMjcsXHJcblx0U1BBQ0VCQVI6IDMyLFxyXG5cdExFRlQ6IDM3LFxyXG5cdFVQOiAzOCxcclxuXHRSSUdIVDogMzksXHJcblx0RE9XTjogNDAsXHJcblx0REVMRVRFOiA0NixcclxuXHRBOiA2NSxcclxuXHREOiA2OCxcclxuXHRGOiA3MCxcclxuXHRIOiA3MixcclxuXHRKOiA3NCxcclxuXHRLOiA3NSxcclxuXHRNOiA3NyxcclxuXHRPOiA3OSxcclxuXHRSOiA4MixcclxuXHRTOiA4MyxcclxuXHRXOiA4N1xyXG59O1xyXG5cclxubGV0IEtleUNvZGVOYW1lcyA9IHt9O1xyXG5LZXlDb2RlTmFtZXNbLTFdID0gJ0VNUFRZJztcclxuS2V5Q29kZU5hbWVzWzEzXSA9ICdFTlRFUic7XHJcbktleUNvZGVOYW1lc1sxN10gPSAnQ1RSTCc7XHJcbktleUNvZGVOYW1lc1syN10gPSAnRVNDJztcclxuS2V5Q29kZU5hbWVzWzMyXSA9ICdTUEFDRUJBUic7XHJcbktleUNvZGVOYW1lc1szN10gPSAnTEVGVCc7XHJcbktleUNvZGVOYW1lc1szOF0gPSAnVVAnO1xyXG5LZXlDb2RlTmFtZXNbMzldID0gJ1JJR0hUJztcclxuS2V5Q29kZU5hbWVzWzQwXSA9ICdET1dOJztcclxuS2V5Q29kZU5hbWVzWzQ2XSA9ICdERUxFVEUnO1xyXG5LZXlDb2RlTmFtZXNbNjVdID0gJ0EnO1xyXG5LZXlDb2RlTmFtZXNbNjhdID0gJ0QnO1xyXG5LZXlDb2RlTmFtZXNbNzBdID0gJ0YnO1xyXG5LZXlDb2RlTmFtZXNbNzJdID0gJ0gnO1xyXG5LZXlDb2RlTmFtZXNbNzRdID0gJ0onO1xyXG5LZXlDb2RlTmFtZXNbNzVdID0gJ0snO1xyXG5LZXlDb2RlTmFtZXNbNzddID0gJ00nO1xyXG5LZXlDb2RlTmFtZXNbNzldID0gJ08nO1xyXG5LZXlDb2RlTmFtZXNbODJdID0gJ1InO1xyXG5LZXlDb2RlTmFtZXNbODNdID0gJ1MnO1xyXG5LZXlDb2RlTmFtZXNbODddID0gJ1cnO1xyXG5cclxuY2xhc3MgR2FtZUlucHV0IHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMua2V5c0Rvd24gPSB7fTtcclxuXHRcdHRoaXMubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xyXG5cclxuXHRcdGxldCBsYXN0S2V5VXAgPSBLZXlDb2RlLkVNUFRZO1xyXG5cclxuXHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5maXhLZXkoZS5rZXlDb2RlKTtcclxuXHJcblx0XHRcdGlmKCF0aGlzLmtleXNEb3duW2tleV0pIHtcclxuXHRcdFx0XHR0aGlzLmxhc3RLZXlEb3duID0ga2V5O1xyXG5cdFx0XHRcdHRoaXMua2V5c0Rvd25ba2V5XSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XHJcblx0XHRcdGxhc3RLZXlVcCA9IHRoaXMuZml4S2V5KGUua2V5Q29kZSk7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLmtleXNEb3duW2xhc3RLZXlVcF07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZpeEtleShrZXkpIHtcclxuXHRcdGlmKGtleSA9PT0gS2V5Q29kZS5XKSB7XHJcblx0XHRcdGtleSA9IEtleUNvZGUuVVA7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKGtleSA9PT0gS2V5Q29kZS5TKSB7XHJcblx0XHRcdGtleSA9IEtleUNvZGUuRE9XTjtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLkQpIHtcclxuXHRcdFx0a2V5ID0gS2V5Q29kZS5SSUdIVDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLkEpIHtcclxuXHRcdFx0a2V5ID0gS2V5Q29kZS5MRUZUO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBrZXk7XHJcblx0fVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgR2FtZVV0aWxzIHtcclxuICAgIGNvbnN0cnVjdG9yKGdFbmdpbmUpIHtcclxuICAgICAgICB0aGlzLmdFbmdpbmUgPSBnRW5naW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXNldHMgdGhlIG5ld1ZpZXcncyBwcml2YXRlIHZhcmlhYmxlcy5cclxuICAgICAqIENoYW5nZXMgdGhlIHZpZXcuXHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFZpZXcobmV3Vmlldykge1xyXG4gICAgICAgIG5ld1ZpZXcuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuZ0VuZ2luZS52aWV3ID0gbmV3VmlldztcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgRGlyID0ge1xyXG4gICAgUklHSFQ6IDAsXHJcbiAgICBMRUZUOiAxXHJcbn07IiwiLy8gVmVyc2lvbiAwLjYuMCAtIENvcHlyaWdodCAyMDEyIC0gMjAxNiAtICBKaW0gUmllY2tlbiA8amltckBqaW1yLmNhPlxyXG4vL1xyXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgLSBodHRwczovL2dpdGh1Yi5jb20vanJpZWNrZW4vc2F0LWpzXHJcbi8vXHJcbi8vIEEgc2ltcGxlIGxpYnJhcnkgZm9yIGRldGVybWluaW5nIGludGVyc2VjdGlvbnMgb2YgY2lyY2xlcyBhbmRcclxuLy8gcG9seWdvbnMgdXNpbmcgdGhlIFNlcGFyYXRpbmcgQXhpcyBUaGVvcmVtLlxyXG4vKiogQHByZXNlcnZlIFNBVC5qcyAtIFZlcnNpb24gMC42LjAgLSBDb3B5cmlnaHQgMjAxMiAtIDIwMTYgLSBKaW0gUmllY2tlbiA8amltckBqaW1yLmNhPiAtIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gaHR0cHM6Ly9naXRodWIuY29tL2pyaWVja2VuL3NhdC1qcyAqL1xyXG5cclxuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSovXHJcbi8qanNoaW50IHNoYWRvdzp0cnVlLCBzdWI6dHJ1ZSwgZm9yaW46dHJ1ZSwgbm9hcmc6dHJ1ZSwgbm9lbXB0eTp0cnVlLFxyXG4gIGVxZXFlcTp0cnVlLCBiaXR3aXNlOnRydWUsIHN0cmljdDp0cnVlLCB1bmRlZjp0cnVlLFxyXG4gIGN1cmx5OnRydWUsIGJyb3dzZXI6dHJ1ZSAqL1xyXG5cclxuLy8gQ3JlYXRlIGEgVU1EIHdyYXBwZXIgZm9yIFNBVC4gV29ya3MgaW46XHJcbi8vXHJcbi8vICAtIFBsYWluIGJyb3dzZXIgdmlhIGdsb2JhbCBTQVQgdmFyaWFibGVcclxuLy8gIC0gQU1EIGxvYWRlciAobGlrZSByZXF1aXJlLmpzKVxyXG4vLyAgLSBOb2RlLmpzXHJcbi8vXHJcbi8vIFRoZSBxdW90ZWQgcHJvcGVydGllcyBhbGwgb3ZlciB0aGUgcGxhY2UgYXJlIHVzZWQgc28gdGhhdCB0aGUgQ2xvc3VyZSBDb21waWxlclxyXG4vLyBkb2VzIG5vdCBtYW5nbGUgdGhlIGV4cG9zZWQgQVBJIGluIGFkdmFuY2VkIG1vZGUuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyp9IHJvb3QgLSBUaGUgZ2xvYmFsIHNjb3BlXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZhY3RvcnkgLSBGYWN0b3J5IHRoYXQgY3JlYXRlcyBTQVQgbW9kdWxlXHJcbiAqL1xyXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcclxuICBcInVzZSBzdHJpY3RcIjtcclxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKSB7XHJcbiAgICBkZWZpbmUoZmFjdG9yeSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcclxuICAgIG1vZHVsZVsnZXhwb3J0cyddID0gZmFjdG9yeSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByb290WydTQVQnXSA9IGZhY3RvcnkoKTtcclxuICB9XHJcbn0odGhpcywgZnVuY3Rpb24gKCkge1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICB2YXIgU0FUID0ge307XHJcblxyXG4gIC8vXHJcbiAgLy8gIyMgVmVjdG9yXHJcbiAgLy9cclxuICAvLyBSZXByZXNlbnRzIGEgdmVjdG9yIGluIHR3byBkaW1lbnNpb25zIHdpdGggYHhgIGFuZCBgeWAgcHJvcGVydGllcy5cclxuXHJcblxyXG4gIC8vIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmXHJcbiAgLy8gYSBjb29yZGluYXRlIGlzIG5vdCBzcGVjaWZpZWQsIGl0IHdpbGwgYmUgc2V0IHRvIGAwYFxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHggVGhlIHggcG9zaXRpb24uXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geSBUaGUgeSBwb3NpdGlvbi5cclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBmdW5jdGlvbiBWZWN0b3IoeCwgeSkge1xyXG4gICAgdGhpc1sneCddID0geCB8fCAwO1xyXG4gICAgdGhpc1sneSddID0geSB8fCAwO1xyXG4gIH1cclxuICBTQVRbJ1ZlY3RvciddID0gVmVjdG9yO1xyXG4gIC8vIEFsaWFzIGBWZWN0b3JgIGFzIGBWYFxyXG4gIFNBVFsnViddID0gVmVjdG9yO1xyXG5cclxuXHJcbiAgLy8gQ29weSB0aGUgdmFsdWVzIG9mIGFub3RoZXIgVmVjdG9yIGludG8gdGhpcyBvbmUuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydjb3B5J10gPSBWZWN0b3IucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbihvdGhlcikge1xyXG4gICAgdGhpc1sneCddID0gb3RoZXJbJ3gnXTtcclxuICAgIHRoaXNbJ3knXSA9IG90aGVyWyd5J107XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBDcmVhdGUgYSBuZXcgdmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhpcyBvbi5cclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoZSBuZXcgY2xvbmVkIHZlY3RvclxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2Nsb25lJ10gPSBWZWN0b3IucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzWyd4J10sIHRoaXNbJ3knXSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQ2hhbmdlIHRoaXMgdmVjdG9yIHRvIGJlIHBlcnBlbmRpY3VsYXIgdG8gd2hhdCBpdCB3YXMgYmVmb3JlLiAoRWZmZWN0aXZlbHlcclxuICAvLyByb2F0YXRlcyBpdCA5MCBkZWdyZWVzIGluIGEgY2xvY2t3aXNlIGRpcmVjdGlvbilcclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3BlcnAnXSA9IFZlY3Rvci5wcm90b3R5cGUucGVycCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHggPSB0aGlzWyd4J107XHJcbiAgICB0aGlzWyd4J10gPSB0aGlzWyd5J107XHJcbiAgICB0aGlzWyd5J10gPSAteDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFJvdGF0ZSB0aGlzIHZlY3RvciAoY291bnRlci1jbG9ja3dpc2UpIGJ5IHRoZSBzcGVjaWZpZWQgYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKVxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsncm90YXRlJ10gPSBWZWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xyXG4gICAgdmFyIHggPSB0aGlzWyd4J107XHJcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcclxuICAgIHRoaXNbJ3gnXSA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgdGhpc1sneSddID0geCAqIE1hdGguc2luKGFuZ2xlKSArIHkgKiBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBSZXZlcnNlIHRoaXMgdmVjdG9yLlxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsncmV2ZXJzZSddID0gVmVjdG9yLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzWyd4J10gPSAtdGhpc1sneCddO1xyXG4gICAgdGhpc1sneSddID0gLXRoaXNbJ3knXTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyBOb3JtYWxpemUgdGhpcyB2ZWN0b3IuICAobWFrZSBpdCBoYXZlIGxlbmd0aCBvZiBgMWApXHJcbiAgLyoqXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydub3JtYWxpemUnXSA9IFZlY3Rvci5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZCA9IHRoaXMubGVuKCk7XHJcbiAgICBpZihkID4gMCkge1xyXG4gICAgICB0aGlzWyd4J10gPSB0aGlzWyd4J10gLyBkO1xyXG4gICAgICB0aGlzWyd5J10gPSB0aGlzWyd5J10gLyBkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gQWRkIGFub3RoZXIgdmVjdG9yIHRvIHRoaXMgb25lLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsnYWRkJ10gPSBWZWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG90aGVyKSB7XHJcbiAgICB0aGlzWyd4J10gKz0gb3RoZXJbJ3gnXTtcclxuICAgIHRoaXNbJ3knXSArPSBvdGhlclsneSddO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gU3VidHJhY3QgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZS5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWlpbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsnc3ViJ10gPSBWZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uKG90aGVyKSB7XHJcbiAgICB0aGlzWyd4J10gLT0gb3RoZXJbJ3gnXTtcclxuICAgIHRoaXNbJ3knXSAtPSBvdGhlclsneSddO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gU2NhbGUgdGhpcyB2ZWN0b3IuIEFuIGluZGVwZW5kYW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZFxyXG4gIC8vIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHRoYXQgd2lsbCBzY2FsZSBib3RoIGB4YCBhbmQgYHlgLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geSBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHkgZGlyZWN0aW9uLiAgSWYgdGhpc1xyXG4gICAqICAgaXMgbm90IHNwZWNpZmllZCwgdGhlIHggc2NhbGluZyBmYWN0b3Igd2lsbCBiZSB1c2VkLlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsnc2NhbGUnXSA9IFZlY3Rvci5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbih4LHkpIHtcclxuICAgIHRoaXNbJ3gnXSAqPSB4O1xyXG4gICAgdGhpc1sneSddICo9IHkgfHwgeDtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFByb2plY3QgdGhpcyB2ZWN0b3Igb24gdG8gYW5vdGhlciB2ZWN0b3IuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsncHJvamVjdCddID0gVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0ID0gZnVuY3Rpb24ob3RoZXIpIHtcclxuICAgIHZhciBhbXQgPSB0aGlzLmRvdChvdGhlcikgLyBvdGhlci5sZW4yKCk7XHJcbiAgICB0aGlzWyd4J10gPSBhbXQgKiBvdGhlclsneCddO1xyXG4gICAgdGhpc1sneSddID0gYW10ICogb3RoZXJbJ3knXTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFByb2plY3QgdGhpcyB2ZWN0b3Igb250byBhIHZlY3RvciBvZiB1bml0IGxlbmd0aC4gVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudFxyXG4gIC8vIHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3Byb2plY3ROJ10gPSBWZWN0b3IucHJvdG90eXBlLnByb2plY3ROID0gZnVuY3Rpb24ob3RoZXIpIHtcclxuICAgIHZhciBhbXQgPSB0aGlzLmRvdChvdGhlcik7XHJcbiAgICB0aGlzWyd4J10gPSBhbXQgKiBvdGhlclsneCddO1xyXG4gICAgdGhpc1sneSddID0gYW10ICogb3RoZXJbJ3knXTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFJlZmxlY3QgdGhpcyB2ZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydyZWZsZWN0J10gPSBWZWN0b3IucHJvdG90eXBlLnJlZmxlY3QgPSBmdW5jdGlvbihheGlzKSB7XHJcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcclxuICAgIHZhciB5ID0gdGhpc1sneSddO1xyXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xyXG4gICAgdGhpc1sneCddIC09IHg7XHJcbiAgICB0aGlzWyd5J10gLT0geTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFJlZmxlY3QgdGhpcyB2ZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMgKHJlcHJlc2VudGVkIGJ5IGEgdW5pdCB2ZWN0b3IpLiBUaGlzIGlzXHJcbiAgLy8gc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIHVuaXQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3JlZmxlY3ROJ10gPSBWZWN0b3IucHJvdG90eXBlLnJlZmxlY3ROID0gZnVuY3Rpb24oYXhpcykge1xyXG4gICAgdmFyIHggPSB0aGlzWyd4J107XHJcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcclxuICAgIHRoaXMucHJvamVjdE4oYXhpcykuc2NhbGUoMik7XHJcbiAgICB0aGlzWyd4J10gLT0geDtcclxuICAgIHRoaXNbJ3knXSAtPSB5O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gR2V0IHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlci5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gIG90aGVyIFRoZSB2ZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXHJcbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgZG90IHByb2R1Y3QuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsnZG90J10gPSBWZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpc1sneCddICogb3RoZXJbJ3gnXSArIHRoaXNbJ3knXSAqIG90aGVyWyd5J107XHJcbiAgfTtcclxuXHJcbiAgLy8gR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBsZW5ndGheMiBvZiB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydsZW4yJ10gPSBWZWN0b3IucHJvdG90eXBlLmxlbjIgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9O1xyXG5cclxuICAvLyBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsnbGVuJ10gPSBWZWN0b3IucHJvdG90eXBlLmxlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbjIoKSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gIyMgQ2lyY2xlXHJcbiAgLy9cclxuICAvLyBSZXByZXNlbnRzIGEgY2lyY2xlIHdpdGggYSBwb3NpdGlvbiBhbmQgYSByYWRpdXMuXHJcblxyXG4gIC8vIENyZWF0ZSBhIG5ldyBjaXJjbGUsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiBhIHBvc2l0aW9uIGFuZC9vciByYWRpdXMuIElmIG5vIHBvc2l0aW9uXHJcbiAgLy8gaXMgZ2l2ZW4sIHRoZSBjaXJjbGUgd2lsbCBiZSBhdCBgKDAsMClgLiBJZiBubyByYWRpdXMgaXMgcHJvdmlkZWQsIHRoZSBjaXJjbGUgd2lsbFxyXG4gIC8vIGhhdmUgYSByYWRpdXMgb2YgYDBgLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gciBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGVcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBmdW5jdGlvbiBDaXJjbGUocG9zLCByKSB7XHJcbiAgICB0aGlzWydwb3MnXSA9IHBvcyB8fCBuZXcgVmVjdG9yKCk7XHJcbiAgICB0aGlzWydyJ10gPSByIHx8IDA7XHJcbiAgfVxyXG4gIFNBVFsnQ2lyY2xlJ10gPSBDaXJjbGU7XHJcblxyXG4gIC8vIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3ggKEFBQkIpIG9mIHRoaXMgQ2lyY2xlLlxyXG4gIC8vXHJcbiAgLy8gTm90ZTogUmV0dXJucyBhIF9uZXdfIGBQb2x5Z29uYCBlYWNoIHRpbWUgeW91IGNhbGwgdGhpcy5cclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGUgQUFCQlxyXG4gICAqL1xyXG4gIENpcmNsZS5wcm90b3R5cGVbJ2dldEFBQkInXSA9IENpcmNsZS5wcm90b3R5cGUuZ2V0QUFCQiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHIgPSB0aGlzWydyJ107XHJcbiAgICB2YXIgY29ybmVyID0gdGhpc1tcInBvc1wiXS5jbG9uZSgpLnN1YihuZXcgVmVjdG9yKHIsIHIpKTtcclxuICAgIHJldHVybiBuZXcgQm94KGNvcm5lciwgcioyLCByKjIpLnRvUG9seWdvbigpO1xyXG4gIH07XHJcblxyXG4gIC8vICMjIFBvbHlnb25cclxuICAvL1xyXG4gIC8vIFJlcHJlc2VudHMgYSAqY29udmV4KiBwb2x5Z29uIHdpdGggYW55IG51bWJlciBvZiBwb2ludHMgKHNwZWNpZmllZCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlcilcclxuICAvL1xyXG4gIC8vIE5vdGU6IERvIF9ub3RfIG1hbnVhbGx5IGNoYW5nZSB0aGUgYHBvaW50c2AsIGBhbmdsZWAsIG9yIGBvZmZzZXRgIHByb3BlcnRpZXMuIFVzZSB0aGVcclxuICAvLyBwcm92aWRlZCBzZXR0ZXJzLiBPdGhlcndpc2UgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllcyB3aWxsIG5vdCBiZSB1cGRhdGVkIGNvcnJlY3RseS5cclxuICAvL1xyXG4gIC8vIGBwb3NgIGNhbiBiZSBjaGFuZ2VkIGRpcmVjdGx5LlxyXG5cclxuICAvLyBDcmVhdGUgYSBuZXcgcG9seWdvbiwgcGFzc2luZyBpbiBhIHBvc2l0aW9uIHZlY3RvciwgYW5kIGFuIGFycmF5IG9mIHBvaW50cyAocmVwcmVzZW50ZWRcclxuICAvLyBieSB2ZWN0b3JzIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvblxyXG4gIC8vIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcj19IHBvcyBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9yaWdpbiBvZiB0aGUgcG9seWdvbi4gKGFsbCBvdGhlclxyXG4gICAqICAgcG9pbnRzIGFyZSByZWxhdGl2ZSB0byB0aGlzIG9uZSlcclxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+PX0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sXHJcbiAgICogICBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBmdW5jdGlvbiBQb2x5Z29uKHBvcywgcG9pbnRzKSB7XHJcbiAgICB0aGlzWydwb3MnXSA9IHBvcyB8fCBuZXcgVmVjdG9yKCk7XHJcbiAgICB0aGlzWydhbmdsZSddID0gMDtcclxuICAgIHRoaXNbJ29mZnNldCddID0gbmV3IFZlY3RvcigpO1xyXG4gICAgdGhpcy5zZXRQb2ludHMocG9pbnRzIHx8IFtdKTtcclxuICB9XHJcbiAgU0FUWydQb2x5Z29uJ10gPSBQb2x5Z29uO1xyXG5cclxuICAvLyBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi5cclxuICAvL1xyXG4gIC8vIE5vdGU6IFRoZSBwb2ludHMgYXJlIGNvdW50ZXItY2xvY2t3aXNlICp3aXRoIHJlc3BlY3QgdG8gdGhlIGNvb3JkaW5hdGUgc3lzdGVtKi5cclxuICAvLyBJZiB5b3UgZGlyZWN0bHkgZHJhdyB0aGUgcG9pbnRzIG9uIGEgc2NyZWVuIHRoYXQgaGFzIHRoZSBvcmlnaW4gYXQgdGhlIHRvcC1sZWZ0IGNvcm5lclxyXG4gIC8vIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIGp1c3RcclxuICAvLyBiZWNhdXNlIG9mIHRoZSBpbnZlcnNpb24gb2YgdGhlIFktYXhpcyB3aGVuIGJlaW5nIGRpc3BsYXllZC5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+PX0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sXHJcbiAgICogICBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBQb2x5Z29uLnByb3RvdHlwZVsnc2V0UG9pbnRzJ10gPSBQb2x5Z29uLnByb3RvdHlwZS5zZXRQb2ludHMgPSBmdW5jdGlvbihwb2ludHMpIHtcclxuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxyXG4gICAgdmFyIGxlbmd0aENoYW5nZWQgPSAhdGhpc1sncG9pbnRzJ10gfHwgdGhpc1sncG9pbnRzJ10ubGVuZ3RoICE9PSBwb2ludHMubGVuZ3RoO1xyXG4gICAgaWYgKGxlbmd0aENoYW5nZWQpIHtcclxuICAgICAgdmFyIGk7XHJcbiAgICAgIHZhciBjYWxjUG9pbnRzID0gdGhpc1snY2FsY1BvaW50cyddID0gW107XHJcbiAgICAgIHZhciBlZGdlcyA9IHRoaXNbJ2VkZ2VzJ10gPSBbXTtcclxuICAgICAgdmFyIG5vcm1hbHMgPSB0aGlzWydub3JtYWxzJ10gPSBbXTtcclxuICAgICAgLy8gQWxsb2NhdGUgdGhlIHZlY3RvciBhcnJheXMgZm9yIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXNcclxuICAgICAgZm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNhbGNQb2ludHMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICAgIGVkZ2VzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBub3JtYWxzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpc1sncG9pbnRzJ10gPSBwb2ludHM7XHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFBvbHlnb24ucHJvdG90eXBlWydzZXRBbmdsZSddID0gUG9seWdvbi5wcm90b3R5cGUuc2V0QW5nbGUgPSBmdW5jdGlvbihhbmdsZSkge1xyXG4gICAgdGhpc1snYW5nbGUnXSA9IGFuZ2xlO1xyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCB2ZWN0b3IuXHJcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgUG9seWdvbi5wcm90b3R5cGVbJ3NldE9mZnNldCddID0gUG9seWdvbi5wcm90b3R5cGUuc2V0T2Zmc2V0ID0gZnVuY3Rpb24ob2Zmc2V0KSB7XHJcbiAgICB0aGlzWydvZmZzZXQnXSA9IG9mZnNldDtcclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUm90YXRlcyB0aGlzIHBvbHlnb24gY291bnRlci1jbG9ja3dpc2UgYXJvdW5kIHRoZSBvcmlnaW4gb2YgKml0cyBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxyXG4gIC8vXHJcbiAgLy8gTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKVxyXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFBvbHlnb24ucHJvdG90eXBlWydyb3RhdGUnXSA9IFBvbHlnb24ucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uKGFuZ2xlKSB7XHJcbiAgICB2YXIgcG9pbnRzID0gdGhpc1sncG9pbnRzJ107XHJcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgcG9pbnRzW2ldLnJvdGF0ZShhbmdsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZVxyXG4gIC8vIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxyXG4gIC8vXHJcbiAgLy8gVGhpcyBpcyBtb3N0IHVzZWZ1bCB0byBjaGFuZ2UgdGhlIFwiY2VudGVyIHBvaW50XCIgb2YgYSBwb2x5Z29uLiBJZiB5b3UganVzdCB3YW50IHRvIG1vdmUgdGhlIHdob2xlIHBvbHlnb24sIGNoYW5nZVxyXG4gIC8vIHRoZSBjb29yZGluYXRlcyBvZiBgcG9zYC5cclxuICAvL1xyXG4gIC8vIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBvZmZzZXRgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyB0cmFuc2xhdGlvbilcclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgaG9yaXpvbnRhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB2ZXJ0aWNhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxyXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFBvbHlnb24ucHJvdG90eXBlWyd0cmFuc2xhdGUnXSA9IFBvbHlnb24ucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB2YXIgcG9pbnRzID0gdGhpc1sncG9pbnRzJ107XHJcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgcG9pbnRzW2ldLnggKz0geDtcclxuICAgICAgcG9pbnRzW2ldLnkgKz0geTtcclxuICAgIH1cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIENvbXB1dGVzIHRoZSBjYWxjdWxhdGVkIGNvbGxpc2lvbiBwb2x5Z29uLiBBcHBsaWVzIHRoZSBgYW5nbGVgIGFuZCBgb2Zmc2V0YCB0byB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoZW4gcmVjYWxjdWxhdGVzIHRoZVxyXG4gIC8vIGVkZ2VzIGFuZCBub3JtYWxzIG9mIHRoZSBjb2xsaXNpb24gcG9seWdvbi5cclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBQb2x5Z29uLnByb3RvdHlwZS5fcmVjYWxjID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBDYWxjdWxhdGVkIHBvaW50cyAtIHRoaXMgaXMgd2hhdCBpcyB1c2VkIGZvciB1bmRlcmx5aW5nIGNvbGxpc2lvbnMgYW5kIHRha2VzIGludG8gYWNjb3VudFxyXG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXHJcbiAgICB2YXIgY2FsY1BvaW50cyA9IHRoaXNbJ2NhbGNQb2ludHMnXTtcclxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xyXG4gICAgLy8gdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGEgZ2l2ZW4gZWRnZSBmcm9tIHRoZSBlZGdlIHZhbHVlLCB5b3UgbXVzdFxyXG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICB2YXIgZWRnZXMgPSB0aGlzWydlZGdlcyddO1xyXG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcclxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XHJcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIHZhciBub3JtYWxzID0gdGhpc1snbm9ybWFscyddO1xyXG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXHJcbiAgICB2YXIgcG9pbnRzID0gdGhpc1sncG9pbnRzJ107XHJcbiAgICB2YXIgb2Zmc2V0ID0gdGhpc1snb2Zmc2V0J107XHJcbiAgICB2YXIgYW5nbGUgPSB0aGlzWydhbmdsZSddO1xyXG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICB2YXIgaTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICB2YXIgY2FsY1BvaW50ID0gY2FsY1BvaW50c1tpXS5jb3B5KHBvaW50c1tpXSk7XHJcbiAgICAgIGNhbGNQb2ludC54ICs9IG9mZnNldC54O1xyXG4gICAgICBjYWxjUG9pbnQueSArPSBvZmZzZXQueTtcclxuICAgICAgaWYgKGFuZ2xlICE9PSAwKSB7XHJcbiAgICAgICAgY2FsY1BvaW50LnJvdGF0ZShhbmdsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHZhciBwMSA9IGNhbGNQb2ludHNbaV07XHJcbiAgICAgIHZhciBwMiA9IGkgPCBsZW4gLSAxID8gY2FsY1BvaW50c1tpICsgMV0gOiBjYWxjUG9pbnRzWzBdO1xyXG4gICAgICB2YXIgZSA9IGVkZ2VzW2ldLmNvcHkocDIpLnN1YihwMSk7XHJcbiAgICAgIG5vcm1hbHNbaV0uY29weShlKS5wZXJwKCkubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveC4gQW55IGN1cnJlbnQgc3RhdGVcclxuICAvLyAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb25zdHJ1Y3RpbmcgdGhlIEFBQkIuXHJcbiAgLy9cclxuICAvLyBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFBvbHlnb25gIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoZSBBQUJCXHJcbiAgICovXHJcbiAgUG9seWdvbi5wcm90b3R5cGVbXCJnZXRBQUJCXCJdID0gUG9seWdvbi5wcm90b3R5cGUuZ2V0QUFCQiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBvaW50cyA9IHRoaXNbXCJjYWxjUG9pbnRzXCJdO1xyXG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICB2YXIgeE1pbiA9IHBvaW50c1swXVtcInhcIl07XHJcbiAgICB2YXIgeU1pbiA9IHBvaW50c1swXVtcInlcIl07XHJcbiAgICB2YXIgeE1heCA9IHBvaW50c1swXVtcInhcIl07XHJcbiAgICB2YXIgeU1heCA9IHBvaW50c1swXVtcInlcIl07XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHZhciBwb2ludCA9IHBvaW50c1tpXTtcclxuICAgICAgaWYgKHBvaW50W1wieFwiXSA8IHhNaW4pIHtcclxuICAgICAgICB4TWluID0gcG9pbnRbXCJ4XCJdO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50W1wieFwiXSA+IHhNYXgpIHtcclxuICAgICAgICB4TWF4ID0gcG9pbnRbXCJ4XCJdO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwb2ludFtcInlcIl0gPCB5TWluKSB7XHJcbiAgICAgICAgeU1pbiA9IHBvaW50W1wieVwiXTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChwb2ludFtcInlcIl0gPiB5TWF4KSB7XHJcbiAgICAgICAgeU1heCA9IHBvaW50W1wieVwiXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBCb3godGhpc1tcInBvc1wiXS5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gIyMgQm94XHJcbiAgLy9cclxuICAvLyBSZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3gsIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxyXG5cclxuXHJcbiAgLy8gQ3JlYXRlIGEgbmV3IGJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC4gSWYgbm8gcG9zaXRpb25cclxuICAvLyBpcyBnaXZlbiwgdGhlIHBvc2l0aW9uIHdpbGwgYmUgYCgwLDApYC4gSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGFyZSBnaXZlbiwgdGhleSB3aWxsXHJcbiAgLy8gYmUgc2V0IHRvIGAwYC5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcj19IHBvcyBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGJvdHRvbS1sZWZ0IG9mIHRoZSBib3ggKGkuZS4gdGhlIHNtYWxsZXN0IHggYW5kIHNtYWxsZXN0IHkgdmFsdWUpLlxyXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHcgVGhlIHdpZHRoIG9mIHRoZSBib3guXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gaCBUaGUgaGVpZ2h0IG9mIHRoZSBib3guXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gQm94KHBvcywgdywgaCkge1xyXG4gICAgdGhpc1sncG9zJ10gPSBwb3MgfHwgbmV3IFZlY3RvcigpO1xyXG4gICAgdGhpc1sndyddID0gdyB8fCAwO1xyXG4gICAgdGhpc1snaCddID0gaCB8fCAwO1xyXG4gIH1cclxuICBTQVRbJ0JveCddID0gQm94O1xyXG5cclxuICAvLyBSZXR1cm5zIGEgcG9seWdvbiB3aG9zZSBlZGdlcyBhcmUgdGhlIHNhbWUgYXMgdGhpcyBib3guXHJcbiAgLyoqXHJcbiAgICogQHJldHVybiB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBib3guXHJcbiAgICovXHJcbiAgQm94LnByb3RvdHlwZVsndG9Qb2x5Z29uJ10gPSBCb3gucHJvdG90eXBlLnRvUG9seWdvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBvcyA9IHRoaXNbJ3BvcyddO1xyXG4gICAgdmFyIHcgPSB0aGlzWyd3J107XHJcbiAgICB2YXIgaCA9IHRoaXNbJ2gnXTtcclxuICAgIHJldHVybiBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHBvc1sneCddLCBwb3NbJ3knXSksIFtcclxuICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksXHJcbiAgICAgbmV3IFZlY3Rvcih3LGgpLCBuZXcgVmVjdG9yKDAsaClcclxuICAgIF0pO1xyXG4gIH07XHJcblxyXG4gIC8vICMjIFJlc3BvbnNlXHJcbiAgLy9cclxuICAvLyBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgYW4gaW50ZXJzZWN0aW9uLiBDb250YWluczpcclxuICAvLyAgLSBUaGUgdHdvIG9iamVjdHMgcGFydGljaXBhdGluZyBpbiB0aGUgaW50ZXJzZWN0aW9uXHJcbiAgLy8gIC0gVGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG1pbmltdW0gY2hhbmdlIG5lY2Vzc2FyeSB0byBleHRyYWN0IHRoZSBmaXJzdCBvYmplY3RcclxuICAvLyAgICBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGVcclxuICAvLyAgICBvZiB0aGUgb3ZlcmxhcClcclxuICAvLyAgLSBXaGV0aGVyIHRoZSBmaXJzdCBvYmplY3QgaXMgZW50aXJlbHkgaW5zaWRlIHRoZSBzZWNvbmQsIGFuZCB2aWNlIHZlcnNhLlxyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKCkge1xyXG4gICAgdGhpc1snYSddID0gbnVsbDtcclxuICAgIHRoaXNbJ2InXSA9IG51bGw7XHJcbiAgICB0aGlzWydvdmVybGFwTiddID0gbmV3IFZlY3RvcigpO1xyXG4gICAgdGhpc1snb3ZlcmxhcFYnXSA9IG5ldyBWZWN0b3IoKTtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcbiAgU0FUWydSZXNwb25zZSddID0gUmVzcG9uc2U7XHJcblxyXG4gIC8vIFNldCBzb21lIHZhbHVlcyBvZiB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGVpciBkZWZhdWx0cy4gIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmXHJcbiAgLy8geW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBSZXNwb25zZSBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW50ZWRcclxuICAvLyBhcyBpdCB3aWxsIGF2b2lkIGFsbGNhdGluZyBleHRyYSBtZW1vcnkpXHJcbiAgLyoqXHJcbiAgICogQHJldHVybiB7UmVzcG9uc2V9IFRoaXMgZm9yIGNoYWluaW5nXHJcbiAgICovXHJcbiAgUmVzcG9uc2UucHJvdG90eXBlWydjbGVhciddID0gUmVzcG9uc2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzWydhSW5CJ10gPSB0cnVlO1xyXG4gICAgdGhpc1snYkluQSddID0gdHJ1ZTtcclxuICAgIHRoaXNbJ292ZXJsYXAnXSA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyAjIyBPYmplY3QgUG9vbHNcclxuXHJcbiAgLy8gQSBwb29sIG9mIGBWZWN0b3JgIG9iamVjdHMgdGhhdCBhcmUgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWRcclxuICAvLyBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICAvKipcclxuICAgKiBAdHlwZSB7QXJyYXkuPFZlY3Rvcj59XHJcbiAgICovXHJcbiAgdmFyIFRfVkVDVE9SUyA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykgeyBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpOyB9XHJcblxyXG4gIC8vIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nXHJcbiAgLy8gbWVtb3J5LlxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtBcnJheS48QXJyYXkuPG51bWJlcj4+fVxyXG4gICAqL1xyXG4gIHZhciBUX0FSUkFZUyA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7IFRfQVJSQVlTLnB1c2goW10pOyB9XHJcblxyXG4gIC8vIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBwb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAgLyoqXHJcbiAgICogQHR5cGUge1Jlc3BvbnNlfVxyXG4gICAqL1xyXG4gIHZhciBUX1JFU1BPTlNFID0gbmV3IFJlc3BvbnNlKCk7XHJcblxyXG4gIC8vIFRpbnkgXCJwb2ludFwiIHBvbHlnb24gdXNlZCBmb3IgcG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtQb2x5Z29ufVxyXG4gICAqL1xyXG4gIHZhciBURVNUX1BPSU5UID0gbmV3IEJveChuZXcgVmVjdG9yKCksIDAuMDAwMDAxLCAwLjAwMDAwMSkudG9Qb2x5Z29uKCk7XHJcblxyXG4gIC8vICMjIEhlbHBlciBGdW5jdGlvbnNcclxuXHJcbiAgLy8gRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMsXHJcbiAgLy8gcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbmFsIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZFxyXG4gIC8vIG1heGltdW0gdmFsdWUgb24gdGhhdCBheGlzLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbixcclxuICAgKiAgIHJlc3VsdFswXSB3aWxsIGJlIHRoZSBtaW5pbXVtIHZhbHVlLFxyXG4gICAqICAgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZmxhdHRlblBvaW50c09uKHBvaW50cywgbm9ybWFsLCByZXN1bHQpIHtcclxuICAgIHZhciBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgdmFyIG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xyXG4gICAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWxcclxuICAgICAgdmFyIGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcclxuICAgICAgaWYgKGRvdCA8IG1pbikgeyBtaW4gPSBkb3Q7IH1cclxuICAgICAgaWYgKGRvdCA+IG1heCkgeyBtYXggPSBkb3Q7IH1cclxuICAgIH1cclxuICAgIHJlc3VsdFswXSA9IG1pbjsgcmVzdWx0WzFdID0gbWF4O1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZFxyXG4gIC8vIGF4aXMgKG11c3QgYmUgYSB1bml0IHZlY3RvcikuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPn0gYVBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj59IGJQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIGF4aXMgKHVuaXQgc2l6ZWQpIHRvIHRlc3QgYWdhaW5zdC4gIFRoZSBwb2ludHMgb2YgYm90aCBwb2x5Z29uc1xyXG4gICAqICAgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWRcclxuICAgKiAgIGlmIHRoZSBheGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSxcclxuICAgKiAgIGFuZCBhIHJlc3BvbnNlIGlzIHBhc3NlZCBpbiwgaW5mb3JtYXRpb24gYWJvdXQgaG93IG11Y2ggb3ZlcmxhcCBhbmRcclxuICAgKiAgIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaXNTZXBhcmF0aW5nQXhpcyhhUG9zLCBiUG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBheGlzLCByZXNwb25zZSkge1xyXG4gICAgdmFyIHJhbmdlQSA9IFRfQVJSQVlTLnBvcCgpO1xyXG4gICAgdmFyIHJhbmdlQiA9IFRfQVJSQVlTLnBvcCgpO1xyXG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgb2Zmc2V0IGJldHdlZW4gdGhlIHR3byBwb2x5Z29uc1xyXG4gICAgdmFyIG9mZnNldFYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShiUG9zKS5zdWIoYVBvcyk7XHJcbiAgICB2YXIgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XHJcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxyXG4gICAgZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcclxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxyXG4gICAgcmFuZ2VCWzBdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXHJcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xyXG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICB2YXIgb3ZlcmxhcCA9IDA7XHJcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcclxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xyXG4gICAgICAgIHJlc3BvbnNlWydhSW5CJ10gPSBmYWxzZTtcclxuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIEIgaXMgZnVsbHkgaW5zaWRlIEEuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIHZhciBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgLy8gQiBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcclxuICAgICAgICAvLyBCIGVuZHMgYmVmb3JlIEEgZW5kcy4gV2UgaGF2ZSB0byBwdXNoIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzBdIC0gcmFuZ2VCWzFdO1xyXG4gICAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIEEgaXMgZnVsbHkgaW5zaWRlIEIuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIHZhciBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBhbW91bnQgb2Ygb3ZlcmxhcCB3ZSd2ZSBzZWVuIHNvIGZhciwgc2V0IGl0IGFzIHRoZSBtaW5pbXVtIG92ZXJsYXAuXHJcbiAgICAgIHZhciBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XHJcbiAgICAgIGlmIChhYnNPdmVybGFwIDwgcmVzcG9uc2VbJ292ZXJsYXAnXSkge1xyXG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwJ10gPSBhYnNPdmVybGFwO1xyXG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLmNvcHkoYXhpcyk7XHJcbiAgICAgICAgaWYgKG92ZXJsYXAgPCAwKSB7XHJcbiAgICAgICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5yZXZlcnNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgU0FUWydpc1NlcGFyYXRpbmdBeGlzJ10gPSBpc1NlcGFyYXRpbmdBeGlzO1xyXG5cclxuICAvLyBDYWxjdWxhdGVzIHdoaWNoIFZvcm9ub2kgcmVnaW9uIGEgcG9pbnQgaXMgb24gYSBsaW5lIHNlZ21lbnQuXHJcbiAgLy8gSXQgaXMgYXNzdW1lZCB0aGF0IGJvdGggdGhlIGxpbmUgYW5kIHRoZSBwb2ludCBhcmUgcmVsYXRpdmUgdG8gYCgwLDApYFxyXG4gIC8vXHJcbiAgLy8gICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICAvLyAgICAgKC0xKSAgW1NdLS0tLS0tLS0tLS0tLS1bRV0gICgxKVxyXG4gIC8vICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGxpbmUgVGhlIGxpbmUgc2VnbWVudC5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9pbnQgVGhlIHBvaW50LlxyXG4gICAqIEByZXR1cm4gIHtudW1iZXJ9IExFRlRfVk9ST05PSV9SRUdJT04gKC0xKSBpZiBpdCBpcyB0aGUgbGVmdCByZWdpb24sXHJcbiAgICogICAgICAgICAgTUlERExFX1ZPUk9OT0lfUkVHSU9OICgwKSBpZiBpdCBpcyB0aGUgbWlkZGxlIHJlZ2lvbixcclxuICAgKiAgICAgICAgICBSSUdIVF9WT1JPTk9JX1JFR0lPTiAoMSkgaWYgaXQgaXMgdGhlIHJpZ2h0IHJlZ2lvbi5cclxuICAgKi9cclxuICBmdW5jdGlvbiB2b3Jvbm9pUmVnaW9uKGxpbmUsIHBvaW50KSB7XHJcbiAgICB2YXIgbGVuMiA9IGxpbmUubGVuMigpO1xyXG4gICAgdmFyIGRwID0gcG9pbnQuZG90KGxpbmUpO1xyXG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZVxyXG4gICAgLy8gbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cclxuICAgIGlmIChkcCA8IDApIHsgcmV0dXJuIExFRlRfVk9ST05PSV9SRUdJT047IH1cclxuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlXHJcbiAgICAvLyByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cclxuICAgIGVsc2UgaWYgKGRwID4gbGVuMikgeyByZXR1cm4gUklHSFRfVk9ST05PSV9SRUdJT047IH1cclxuICAgIC8vIE90aGVyd2lzZSwgaXQncyBpbiB0aGUgbWlkZGxlIG9uZS5cclxuICAgIGVsc2UgeyByZXR1cm4gTUlERExFX1ZPUk9OT0lfUkVHSU9OOyB9XHJcbiAgfVxyXG4gIC8vIENvbnN0YW50cyBmb3IgVm9yb25vaSByZWdpb25zXHJcbiAgLyoqXHJcbiAgICogQGNvbnN0XHJcbiAgICovXHJcbiAgdmFyIExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuICAvKipcclxuICAgKiBAY29uc3RcclxuICAgKi9cclxuICB2YXIgTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuICAvKipcclxuICAgKiBAY29uc3RcclxuICAgKi9cclxuICB2YXIgUklHSFRfVk9ST05PSV9SRUdJT04gPSAxO1xyXG5cclxuICAvLyAjIyBDb2xsaXNpb24gVGVzdHNcclxuXHJcbiAgLy8gQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjaXJjbGUuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGMgVGhlIGNpcmNsZSB0byB0ZXN0LlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlLCBmYWxzZSBpZiBpdCBpcyBub3QuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gcG9pbnRJbkNpcmNsZShwLCBjKSB7XHJcbiAgICB2YXIgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShwKS5zdWIoY1sncG9zJ10pO1xyXG4gICAgdmFyIHJhZGl1c1NxID0gY1snciddICogY1snciddO1xyXG4gICAgdmFyIGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiBpcyBzbWFsbGVyIHRoYW4gdGhlIHJhZGl1cyB0aGVuIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZS5cclxuICAgIHJldHVybiBkaXN0YW5jZVNxIDw9IHJhZGl1c1NxO1xyXG4gIH1cclxuICBTQVRbJ3BvaW50SW5DaXJjbGUnXSA9IHBvaW50SW5DaXJjbGU7XHJcblxyXG4gIC8vIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY29udmV4IHBvbHlnb24uXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5IFRoZSBwb2x5Z29uIHRvIHRlc3QuXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBwb2x5Z29uLCBmYWxzZSBpZiBpdCBpcyBub3QuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gcG9pbnRJblBvbHlnb24ocCwgcG9seSkge1xyXG4gICAgVEVTVF9QT0lOVFsncG9zJ10uY29weShwKTtcclxuICAgIFRfUkVTUE9OU0UuY2xlYXIoKTtcclxuICAgIHZhciByZXN1bHQgPSB0ZXN0UG9seWdvblBvbHlnb24oVEVTVF9QT0lOVCwgcG9seSwgVF9SRVNQT05TRSk7XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgIHJlc3VsdCA9IFRfUkVTUE9OU0VbJ2FJbkInXTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIFNBVFsncG9pbnRJblBvbHlnb24nXSA9IHBvaW50SW5Qb2x5Z29uO1xyXG5cclxuICAvLyBDaGVjayBpZiB0d28gY2lyY2xlcyBjb2xsaWRlLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBhIFRoZSBmaXJzdCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGIgVGhlIHNlY29uZCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcclxuICAgKiAgIHRoZSBjaXJjbGVzIGludGVyc2VjdC5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cclxuICAgKi9cclxuICBmdW5jdGlvbiB0ZXN0Q2lyY2xlQ2lyY2xlKGEsIGIsIHJlc3BvbnNlKSB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvXHJcbiAgICAvLyBjaXJjbGVzIGlzIGdyZWF0ZXIgdGhhbiB0aGVpciBjb21iaW5lZCByYWRpdXMuXHJcbiAgICB2YXIgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShiWydwb3MnXSkuc3ViKGFbJ3BvcyddKTtcclxuICAgIHZhciB0b3RhbFJhZGl1cyA9IGFbJ3InXSArIGJbJ3InXTtcclxuICAgIHZhciB0b3RhbFJhZGl1c1NxID0gdG90YWxSYWRpdXMgKiB0b3RhbFJhZGl1cztcclxuICAgIHZhciBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxyXG4gICAgaWYgKGRpc3RhbmNlU3EgPiB0b3RhbFJhZGl1c1NxKSB7XHJcbiAgICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gVGhleSBpbnRlcnNlY3QuICBJZiB3ZSdyZSBjYWxjdWxhdGluZyBhIHJlc3BvbnNlLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgdmFyIGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XHJcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBhO1xyXG4gICAgICByZXNwb25zZVsnYiddID0gYjtcclxuICAgICAgcmVzcG9uc2VbJ292ZXJsYXAnXSA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcclxuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBOJ10uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XHJcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHJlc3BvbnNlWydvdmVybGFwJ10pO1xyXG4gICAgICByZXNwb25zZVsnYUluQiddPSBhWydyJ10gPD0gYlsnciddICYmIGRpc3QgPD0gYlsnciddIC0gYVsnciddO1xyXG4gICAgICByZXNwb25zZVsnYkluQSddID0gYlsnciddIDw9IGFbJ3InXSAmJiBkaXN0IDw9IGFbJ3InXSAtIGJbJ3InXTtcclxuICAgIH1cclxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBTQVRbJ3Rlc3RDaXJjbGVDaXJjbGUnXSA9IHRlc3RDaXJjbGVDaXJjbGU7XHJcblxyXG4gIC8vIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXHJcbiAgICogICB0aGV5IGludGVyc2V0LlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhleSBpbnRlcnNlY3QsIGZhbHNlIGlmIHRoZXkgZG9uJ3QuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSkge1xyXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxyXG4gICAgdmFyIGNpcmNsZVBvcyA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGNpcmNsZVsncG9zJ10pLnN1Yihwb2x5Z29uWydwb3MnXSk7XHJcbiAgICB2YXIgcmFkaXVzID0gY2lyY2xlWydyJ107XHJcbiAgICB2YXIgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcclxuICAgIHZhciBwb2ludHMgPSBwb2x5Z29uWydjYWxjUG9pbnRzJ107XHJcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuICAgIHZhciBlZGdlID0gVF9WRUNUT1JTLnBvcCgpO1xyXG4gICAgdmFyIHBvaW50ID0gVF9WRUNUT1JTLnBvcCgpO1xyXG5cclxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHZhciBuZXh0ID0gaSA9PT0gbGVuIC0gMSA/IDAgOiBpICsgMTtcclxuICAgICAgdmFyIHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xyXG4gICAgICB2YXIgb3ZlcmxhcCA9IDA7XHJcbiAgICAgIHZhciBvdmVybGFwTiA9IG51bGw7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGVkZ2UuXHJcbiAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW2ldKTtcclxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXHJcbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50XHJcbiAgICAgIC8vIGlzIGJpZ2dlciB0aGFuIHRoZSByYWRpdXMsIHRoZSBwb2x5Z29uIGlzIGRlZmluaXRlbHkgbm90IGZ1bGx5IGluXHJcbiAgICAgIC8vIHRoZSBjaXJjbGUuXHJcbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSB7XHJcbiAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggVm9yb25vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxyXG4gICAgICB2YXIgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XHJcbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxyXG4gICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk9OT0lfUkVHSU9OIG9mIHRoZSBwcmV2aW91cyBlZGdlLlxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW3ByZXZdKTtcclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgcHJldmlvdXMgZWRnZVxyXG4gICAgICAgIHZhciBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbcHJldl0pO1xyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcclxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgdmFyIGRpc3QgPSBwb2ludC5sZW4oKTtcclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuICAgICAgLy8gSWYgaXQncyB0aGUgcmlnaHQgcmVnaW9uOlxyXG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW25leHRdKTtcclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgbmV4dCBlZGdlLlxyXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcclxuICAgICAgICByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICB2YXIgZGlzdCA9IHBvaW50LmxlbigpO1xyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgLy8gT3RoZXJ3aXNlLCBpdCdzIHRoZSBtaWRkbGUgcmVnaW9uOlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIE5lZWQgdG8gY2hlY2sgaWYgdGhlIGNpcmNsZSBpcyBpbnRlcnNlY3RpbmcgdGhlIGVkZ2UsXHJcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBlZGdlIGludG8gaXRzIFwiZWRnZSBub3JtYWxcIi5cclxuICAgICAgICB2YXIgbm9ybWFsID0gZWRnZS5wZXJwKCkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgLy8gRmluZCB0aGUgcGVycGVuZGljdWxhciBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlXHJcbiAgICAgICAgLy8gY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICB2YXIgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xyXG4gICAgICAgIHZhciBkaXN0QWJzID0gTWF0aC5hYnMoZGlzdCk7XHJcbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0QWJzID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChub3JtYWwpO1xyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlXHJcbiAgICAgICAgICAvLyBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3Qgb3ZlcmxhcCB3ZSd2ZSBzZWVuLCBrZWVwIGl0LlxyXG4gICAgICAvLyAob3ZlcmxhcE4gbWF5IGJlIG51bGwgaWYgdGhlIGNpcmNsZSB3YXMgaW4gdGhlIHdyb25nIFZvcm9ub2kgcmVnaW9uKS5cclxuICAgICAgaWYgKG92ZXJsYXBOICYmIHJlc3BvbnNlICYmIE1hdGguYWJzKG92ZXJsYXApIDwgTWF0aC5hYnMocmVzcG9uc2VbJ292ZXJsYXAnXSkpIHtcclxuICAgICAgICByZXNwb25zZVsnb3ZlcmxhcCddID0gb3ZlcmxhcDtcclxuICAgICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5jb3B5KG92ZXJsYXBOKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZmluYWwgb3ZlcmxhcCB2ZWN0b3IgLSBiYXNlZCBvbiB0aGUgc21hbGxlc3Qgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZVsnYSddID0gcG9seWdvbjtcclxuICAgICAgcmVzcG9uc2VbJ2InXSA9IGNpcmNsZTtcclxuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShyZXNwb25zZVsnb3ZlcmxhcE4nXSkuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XHJcbiAgICB9XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgU0FUWyd0ZXN0UG9seWdvbkNpcmNsZSddID0gdGVzdFBvbHlnb25DaXJjbGU7XHJcblxyXG4gIC8vIENoZWNrIGlmIGEgY2lyY2xlIGFuZCBhIHBvbHlnb24gY29sbGlkZS5cclxuICAvL1xyXG4gIC8vICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0XHJcbiAgLy8gcnVucyBwb2x5Z29uQ2lyY2xlIGFuZCByZXZlcnNlcyBldmVyeXRoaW5nIGF0IHRoZSBlbmQuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZlxyXG4gICAqICAgdGhleSBpbnRlcnNldC5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZSwgcG9seWdvbiwgcmVzcG9uc2UpIHtcclxuICAgIC8vIFRlc3QgdGhlIHBvbHlnb24gYWdhaW5zdCB0aGUgY2lyY2xlLlxyXG4gICAgdmFyIHJlc3VsdCA9IHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb24sIGNpcmNsZSwgcmVzcG9uc2UpO1xyXG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xyXG4gICAgICAvLyBTd2FwIEEgYW5kIEIgaW4gdGhlIHJlc3BvbnNlLlxyXG4gICAgICB2YXIgYSA9IHJlc3BvbnNlWydhJ107XHJcbiAgICAgIHZhciBhSW5CID0gcmVzcG9uc2VbJ2FJbkInXTtcclxuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBOJ10ucmV2ZXJzZSgpO1xyXG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5yZXZlcnNlKCk7XHJcbiAgICAgIHJlc3BvbnNlWydhJ10gPSByZXNwb25zZVsnYiddO1xyXG4gICAgICByZXNwb25zZVsnYiddID0gYTtcclxuICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IHJlc3BvbnNlWydiSW5BJ107XHJcbiAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBhSW5CO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgU0FUWyd0ZXN0Q2lyY2xlUG9seWdvbiddID0gdGVzdENpcmNsZVBvbHlnb247XHJcblxyXG4gIC8vIENoZWNrcyB3aGV0aGVyIHBvbHlnb25zIGNvbGxpZGUuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBhIFRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYiBUaGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcclxuICAgKiAgIHRoZXkgaW50ZXJzZXQuXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cclxuICAgKi9cclxuICBmdW5jdGlvbiB0ZXN0UG9seWdvblBvbHlnb24oYSwgYiwgcmVzcG9uc2UpIHtcclxuICAgIHZhciBhUG9pbnRzID0gYVsnY2FsY1BvaW50cyddO1xyXG4gICAgdmFyIGFMZW4gPSBhUG9pbnRzLmxlbmd0aDtcclxuICAgIHZhciBiUG9pbnRzID0gYlsnY2FsY1BvaW50cyddO1xyXG4gICAgdmFyIGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChpc1NlcGFyYXRpbmdBeGlzKGFbJ3BvcyddLCBiWydwb3MnXSwgYVBvaW50cywgYlBvaW50cywgYVsnbm9ybWFscyddW2ldLCByZXNwb25zZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAodmFyIGkgPSAwO2kgPCBiTGVuOyBpKyspIHtcclxuICAgICAgaWYgKGlzU2VwYXJhdGluZ0F4aXMoYVsncG9zJ10sIGJbJ3BvcyddLCBhUG9pbnRzLCBiUG9pbnRzLCBiWydub3JtYWxzJ11baV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxyXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuICBDYWxjdWxhdGUgdGhlXHJcbiAgICAvLyBmaW5hbCBvdmVybGFwIHZlY3Rvci5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZVsnYSddID0gYTtcclxuICAgICAgcmVzcG9uc2VbJ2InXSA9IGI7XHJcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLmNvcHkocmVzcG9uc2VbJ292ZXJsYXBOJ10pLnNjYWxlKHJlc3BvbnNlWydvdmVybGFwJ10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIFNBVFsndGVzdFBvbHlnb25Qb2x5Z29uJ10gPSB0ZXN0UG9seWdvblBvbHlnb247XHJcblxyXG4gIHJldHVybiBTQVQ7XHJcbn0pKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBHYW1lR3JhcGhpY3Mge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiB0aW1lU3RlcCBUaGUgd2FpdCB0aW1lIGJldHdlZW4gcnVubmluZyB0aGUgYWN0aW9uIChpbiBtcykuXHJcbiAgICAgKiBudW1UaW1lcyBUaGUgbnVtYmVyIHRvIHRpbWVzIHRvIHJ1biB0aGUgYWN0aW9uLlxyXG4gICAgICogY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICByZXBlYXRBY3Rpb24odGltZVN0ZXAsIG51bVRpbWVzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBsZXQgdGhlQW5pbWF0aW9uID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihudW0rKyA+IG51bVRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoZUFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGltZVN0ZXApO1xyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG4vKiBnbG9iYWxzIGNhbnZhcywgY3R4ICovXHJcblxyXG5jbGFzcyBHYW1lVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByaXZhdGVzID0ge1xyXG4gICAgICAgICAgICBiZ0NvbG9yOiAnI2NjYydcclxuICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoZW4oY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnByaXZhdGVzLmJnQ29sb3I7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcbi8qIGdsb2JhbHMgZ2FtZSwgY2FudmFzLCBjdHgsIEtleUNvZGUgKi9cclxuXHJcbmNsYXNzIFRpdGxlVmlldyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMuY3RhID0gJ1ByZXNzIEVudGVyJztcclxuXHJcbiAgICAgICAgdGhpcy5wcml2YXRlcyA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhlbihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnByaXZhdGVzLnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkVOVEVSKSB7XHJcbiAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xyXG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjdHguZm9udCA9ICczNnB4IEFyaWFsJztcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnRpdGxlLCBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KHRoaXMudGl0bGUpLndpZHRoIC8gMiwgMTAwKTtcclxuXHJcbiAgICAgICAgY3R4LmZvbnQgPSAnMjRweCBBcmlhbCc7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuY3RhLCBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KHRoaXMuY3RhKS53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgIH1cclxufSIsIi8qIGdsb2JhbHMgR2FtZVNhdmUsIGNhbnZhcywgY3R4LCBLZXlDb2RlLCBnYW1lICovXHJcblxyXG5jbGFzcyBHYW1lU2F2ZVZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9ICdTZWxlY3QgYSBzYXZlIHNsb3QnO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBHYW1lU2F2ZSgpO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMuc3RvcmFnZS5nZXRMaXN0KCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGVuKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hcnJvdyA9IHtcclxuICAgICAgICAgICAgaW1nOiAnPj4nLFxyXG4gICAgICAgICAgICBzbG90OiAwLFxyXG4gICAgICAgICAgICB4OiBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KHRoaXMubGlzdFswXSkud2lkdGggLyAyIC0gNjAsICAgIC8vIFRPRE86IG1ha2UgaW5zdGFuY2UgdmFyPz9cclxuICAgICAgICAgICAgeTogMjAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FU0MpIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soS2V5Q29kZS5FU0MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuRU5URVIpIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgY29uc3QgdCA9IGRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2F2ZSh0aGlzLmFycm93LnNsb3QsIGAke219LyR7ZH0vJHt5fSAke3R9YCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soS2V5Q29kZS5FTlRFUik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5ERUxFVEUpIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnN0b3JhZ2UuZXJhc2UodGhpcy5hcnJvdy5zbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmFycm93LnNsb3QgIT09IDIgJiYgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5ET1dOKSB7XHJcbiAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xyXG5cclxuICAgICAgICAgICAgKyt0aGlzLmFycm93LnNsb3Q7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyb3cueCA9IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGhpcy5saXN0W3RoaXMuYXJyb3cuc2xvdF0pLndpZHRoIC8gMiAtIDYwO1xyXG4gICAgICAgICAgICB0aGlzLmFycm93LnkgKz0gODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5hcnJvdy5zbG90ICE9PSAwICYmIGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuVVApIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG4gICAgICAgICAgICAtLXRoaXMuYXJyb3cuc2xvdDtcclxuICAgICAgICAgICAgdGhpcy5hcnJvdy54ID0gY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aGlzLmxpc3RbdGhpcy5hcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyb3cueSAtPSA4MDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzExMSc7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGN0eC5mb250ID0gJzM2cHggQXJpYWwnO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMudGl0bGUsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGhpcy50aXRsZSkud2lkdGggLyAyLCA4MCk7XHJcblxyXG4gICAgICAgIGN0eC5mb250ID0gJzI0cHggQXJpYWwnO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmxpc3RbaV0sIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGhpcy5saXN0W2ldKS53aWR0aCAvIDIsIDIwMCArIGkgKiA4MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHguZmlsbFRleHQodGhpcy5hcnJvdy5pbWcsIHRoaXMuYXJyb3cueCwgdGhpcy5hcnJvdy55KTtcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0JztcclxuLyogZ2xvYmFscyBnYW1lLCBjYW52YXMsIGN0eCwgS2V5Q29kZSAqL1xyXG5cclxuY2xhc3MgT3ZlcndvcmxkVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9hcnJvdyA9IHtcclxuICAgICAgICAgICAgaW1nOiAnXl4nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5wcml2YXRlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoZW4oY2FsbGJhY2spe1xyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuX2Fycm93LnggPSA5MDtcclxuICAgICAgICB0aGlzLl9hcnJvdy55ID0gY2FudmFzLmhlaWdodCAvIDIgKyA3MDtcclxuICAgICAgICB0aGlzLl9hcnJvdy5zbG90ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FTlRFUikge1xyXG4gICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcclxuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuUklHSFQpIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLl9hcnJvdy5zbG90IDwgNykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJyb3cueCArPSAxMTU7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuX2Fycm93LnNsb3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkxFRlQpIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLl9hcnJvdy5zbG90ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJyb3cueCAtPSAxMTU7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX2Fycm93LnNsb3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIGJhY2tncm91bmRcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMzNDI4MmMnO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBsZXZlbHNcclxuICAgICAgICBsZXQgc2l6ZSA9IDgwLCB4LCB5O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7ICsraSkge1xyXG4gICAgICAgICAgICB4ID0gNjAgKyBpICogMTE1O1xyXG4gICAgICAgICAgICB5ID0gY2FudmFzLmhlaWdodCAvIDIgLSBzaXplIC8gMjtcclxuXHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XHJcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzE4cHggQXJpYWwnO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoJ0xldmVsICcgKyAoaSsxKSwgeCArIDEwLCB5IC0gMTMpO1xyXG5cclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhcnJvd1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuX2Fycm93LmltZywgdGhpcy5fYXJyb3cueCwgdGhpcy5fYXJyb3cueSk7XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcbi8qIGdsb2JhbHMgZ2FtZSwgY2FudmFzLCBjdHgsIEtleUNvZGUsIERpciwgRmlnaHRBY3Rpb24gKi9cclxuXHJcbmNsYXNzIEJhdHRsZVZpZXcge1xyXG4gICAgY29uc3RydWN0b3IoYmdDb2xvciwgZG9ybWFudEwsIGRvcm1hbnRSKSB7XHJcbiAgICAgICAgdGhpcy5fYXJyb3cgPSB7XHJcbiAgICAgICAgICAgIGltZzogJz4+J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMgPSB7XHJcbiAgICAgICAgICAgIGJnQ29sb3I6IGJnQ29sb3IsXHJcbiAgICAgICAgICAgIGRvcm1hbnRMOiBkb3JtYW50TCxcclxuICAgICAgICAgICAgZG9ybWFudFI6IGRvcm1hbnRSXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhlbihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuX2Fycm93LnggPSA0MztcclxuICAgICAgICB0aGlzLl9hcnJvdy55ID0gMzUwO1xyXG4gICAgICAgIHRoaXMuX2Fycm93LmN1clNsb3QgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9sZWZ0ID0ge1xyXG4gICAgICAgICAgICB4OiAzMCxcclxuICAgICAgICAgICAgZGlyOiBEaXIuUklHSFRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9maXJlID0ge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fd2FzQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fd2FzQXR0YWNrVGltZXIgPSA2MDtcclxuICAgICAgICB0aGlzLl90aGVBdHRhY2sgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdFTVBUWScsXHJcbiAgICAgICAgICAgIGF0azogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX2Rvcm1hbnRMID0gdGhpcy5wcml2YXRlcy5kb3JtYW50TDtcclxuICAgICAgICB0aGlzLl9kb3JtYW50UiA9IHRoaXMucHJpdmF0ZXMuZG9ybWFudFI7XHJcbiAgICB9XHJcblxyXG4gICAgX2NoZWNrSW5wdXQoKSB7XHJcbiAgICAgICAgc3dpdGNoKGdhbWUuaW5wdXQubGFzdEtleURvd24pIHtcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkVOVEVSOlxyXG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGhlQXR0YWNrLm5hbWUgPSB0aGlzLl9kb3JtYW50TC5hY3Rpb25zW3RoaXMuX2Fycm93LmN1clNsb3RdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aGVBdHRhY2suYXRrID0gKHRoaXMuX2Rvcm1hbnRMLmF0ayAqIHRoaXMuX2Rvcm1hbnRMLmFjdGlvbnNbdGhpcy5fYXJyb3cuY3VyU2xvdF0ubXVsdGlwbGllcikgLyB0aGlzLl9kb3JtYW50Ui5kZWY7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5VUDpcclxuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Fycm93LmN1clNsb3QgIT09IDAgJiYgdGhpcy5fZG9ybWFudEwuYWN0aW9uc1t0aGlzLl9hcnJvdy5jdXJTbG90IC0gMV0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAtLXRoaXMuX2Fycm93LmN1clNsb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJyb3cueSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuRE9XTjpcclxuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Fycm93LmN1clNsb3QgIT09IDMgJiYgdGhpcy5fZG9ybWFudEwuYWN0aW9uc1t0aGlzLl9hcnJvdy5jdXJTbG90ICsgMV0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICArK3RoaXMuX2Fycm93LmN1clNsb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJyb3cueSArPSAzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5fd2FzQXR0YWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rvcm1hbnRSLmhwIC09IHRoaXMuX3RoZUF0dGFjay5hdGsgLyA2MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFnYW1lLmdyYXBoaWNzLmlzQW5pbWF0aW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdhc0F0dGFjayA9IHRoaXMuX2NoZWNrSW5wdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHdhc0F0dGFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fdGhlQXR0YWNrLm5hbWUgPT09IEZpZ2h0QWN0aW9uLlRBQ0tMRS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcnVuVGFja2xlQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuX3RoZUF0dGFjay5uYW1lID09PSBGaWdodEFjdGlvbi5EUkFHT05TX0JSRUFUSC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FzQXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5fZG9ybWFudFIuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kb3JtYW50TC54cCArPSAyNTtcclxuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcnVuVGFja2xlQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX2xlZnQuZGlyID0gRGlyLlJJR0hUO1xyXG5cclxuICAgICAgICBnYW1lLmdyYXBoaWNzLnJlcGVhdEFjdGlvbig2LCA2MCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9sZWZ0LmRpciA9PT0gRGlyLlJJR0hUICYmIHRoaXMuX2xlZnQueCA+IDYwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sZWZ0LmRpciA9IERpci5MRUZUO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLl9sZWZ0LmRpciA9PT0gRGlyLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuX2xlZnQueDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5fbGVmdC54O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kb3JtYW50Ui5ocCAtPSB0aGlzLl90aGVBdHRhY2suYXRrIC8gNjA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIGJhY2tncm91bmRcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5wcml2YXRlcy5iZ0NvbG9yO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBsZWZ0XHJcbiAgICAgICAgdGhpcy5fZHJhd0Rvcm1hbnRIVUQodGhpcy5fZG9ybWFudEwsIDEwLCAxNSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fZG9ybWFudEwuZHJhdyh0aGlzLl9sZWZ0LngsIDkwKTtcclxuICAgICAgICB0aGlzLl9kcmF3SFVEKCk7XHJcblxyXG4gICAgICAgIC8vIHJpZ2h0XHJcbiAgICAgICAgdGhpcy5fZHJhd0Rvcm1hbnRIVUQodGhpcy5fZG9ybWFudFIsIGNhbnZhcy53aWR0aCAtIDEzMCwgMTUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9kb3JtYW50Ui5kcmF3KDc3MCwgOTApO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2sgYW5pbWF0aW9uXHJcbiAgICAgICAgaWYodGhpcy5fd2FzQXR0YWNrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHQgPSAodGhpcy5fd2FzQXR0YWNrVGltZXIgJSA0MCk7XHJcblxyXG4gICAgICAgICAgICBpZih0ID49IDAgJiYgdCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLnggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodCA+PSAxMCAmJiB0IDwgMjApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUueCA9IDU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0ID49IDIwICYmIHQgPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZS54ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHQgPj0gMzAgJiYgdCA8IDQwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlLnggPSAtNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoODcwICsgdGhpcy5fZmlyZS54LCAyNDIsIDQwLCAxMik7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCg4ODAgKyB0aGlzLl9maXJlLngsIDIzMCwgMzAsIDEyKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDg4MCArIHRoaXMuX2ZpcmUueCwgMjE4LCAyMCwgMTIpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5fd2FzQXR0YWNrVGltZXItLSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNBdHRhY2tUaW1lciA9IDYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9kcmF3RG9ybWFudEhVRChkb3JtYW50LCB4LCB5LCBkcmF3WFApIHtcclxuICAgICAgICAvLyBuYW1lXHJcbiAgICAgICAgY29uc3Qgc3RyID0gYCR7ZG9ybWFudC5uYW1lfSBMJHtkb3JtYW50Lmx2bH1gO1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChzdHIsIHggKyBjdHgubWVhc3VyZVRleHQoc3RyKS53aWR0aCAvIDIsIHkpO1xyXG5cclxuICAgICAgICAvLyBocFxyXG4gICAgICAgIGN0eC5maWxsVGV4dCgnSFAnLCB4LCB5ICsgMjApO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICBjdHguc3Ryb2tlUmVjdCh4ICsgMjEsIHkgKyAxMiwgMTAwLCAxMCk7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcclxuICAgICAgICBjdHguZmlsbFJlY3QoeCArIDIyLCB5ICsgMTMsIGRvcm1hbnQuaHAgKiAoMTAwIC8gZG9ybWFudC5pbml0SFApIC0gMSwgOCk7XHJcblxyXG4gICAgICAgIC8vIHhwXHJcbiAgICAgICAgaWYoZHJhd1hQKSB7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnWFAnLCB4LCB5ICsgNDApO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHggKyAyMSwgeSArIDMyLCAxMDAsIDEwKTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzc3Nyc7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4ICsgMjIsIHkgKyAzMywgZG9ybWFudC54cCAqICgxMDAgLyBkb3JtYW50LnhwTmVlZGVkKSAtIDEsIDgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZHJhd0hVRCgpIHtcclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoMjAsIDMwMCwgNTAwLCAyNTApO1xyXG5cclxuICAgICAgICBjdHguZm9udCA9ICcxMnB4IEFyaWFsJztcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dCgnQVRLOiAnICsgdGhpcy5fZG9ybWFudEwuYXRrLCA0NjAsIDMyMCk7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KCdERUY6ICcgKyB0aGlzLl9kb3JtYW50TC5kZWYsIDQ2MCwgMzQwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhd0FjdGlvbkxpc3QoKTtcclxuICAgICAgICB0aGlzLl9kcmF3QWN0aW9uQXJyb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBfZHJhd0FjdGlvbkxpc3QoKSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7ICsraSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9kb3JtYW50TC5hY3Rpb25zW2ldID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJy0tJywgODAsIDM1MCArIGkgKiAzMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy5fZG9ybWFudEwuYWN0aW9uc1tpXS5uYW1lLCA4MCwgMzUwICsgaSAqIDMwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfZHJhd0FjdGlvbkFycm93KCkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMuX2Fycm93LmltZywgdGhpcy5fYXJyb3cueCwgdGhpcy5fYXJyb3cueSk7XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcbi8qIGdsb2JhbCBjdHggKi9cclxuXHJcbmNsYXNzIERvcm1hbnQge1xyXG4gICAgY29uc3RydWN0b3Ioc3JjLCBuYW1lLCBhdGssIGRlZiwgaHAsIGFjdGlvbnMsIGx2bCkge1xyXG4gICAgICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWdSZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbWdSZWFkeSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltZy5zcmMgPSBgaW1nLyR7c3JjfWA7XHJcblxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5hdGsgPSBhdGs7XHJcbiAgICAgICAgdGhpcy5kZWYgPSBkZWY7XHJcbiAgICAgICAgdGhpcy5pbml0SFAgPSB0aGlzLmhwID0gaHA7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcclxuICAgICAgICB0aGlzLmx2bCA9ICh0eXBlb2YobHZsKSAhPT0gJ3VuZGVmaW5lZCcpID8gbHZsIDogMTtcclxuICAgICAgICB0aGlzLnhwID0gMDtcclxuICAgICAgICB0aGlzLnhwTmVlZGVkID0gNTA7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyh4LCB5KSB7XHJcbiAgICAgICAgaWYodGhpcy5pbWdSZWFkeSkge1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB4LCB5LCB0aGlzLmltZy53aWR0aCwgdGhpcy5pbWcuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJjb25zdCBGaWdodEFjdGlvbiA9IHtcclxuICAgIFRBQ0tMRToge1xyXG4gICAgICAgIG5hbWU6ICdUQUNLTEUnLFxyXG4gICAgICAgIG11bHRpcGxpZXI6IDFcclxuICAgIH0sXHJcbiAgICBIRUFMOiB7XHJcbiAgICAgICAgbmFtZTogJ0hFQUwnLFxyXG4gICAgICAgIG11bHRpcGxpZXI6IDFcclxuICAgIH0sXHJcbiAgICBEUkFHT05TX0JSRUFUSDoge1xyXG4gICAgICAgIG5hbWU6ICdEUkFHT05TIEJSRUFUSCcsXHJcbiAgICAgICAgbXVsdGlwbGllcjogNVxyXG4gICAgfVxyXG59OyIsIid1c2Ugc3RyaWN0JztcclxuLyogZ2xvYmFscyBHYW1lRW5naW5lLCBUaXRsZVZpZXcsIE92ZXJ3b3JsZFZpZXcsIEZpZ2h0QWN0aW9uLCBEb3JtYW50LCBCYXR0bGVWaWV3LCBnYW1lICovXHJcblxyXG4oKCkgPT4ge1xyXG5cdHdpbmRvdy5nYW1lID0gbmV3IEdhbWVFbmdpbmUoKTtcclxuXHJcblx0bGV0IGN1ckx2bCA9IDE7XHJcblxyXG5cdGxldCB0aXRsZVZpZXcgPSBuZXcgVGl0bGVWaWV3KCdEb3JtYW50aWNpZGUnKTtcclxuXHR0aXRsZVZpZXcudGhlbigoKSA9PiB7XHJcblx0XHRnYW1lLnV0aWxzLnN3aXRjaFZpZXcob3ZlcndvcmxkVmlldyk7XHJcblx0fSk7XHJcblxyXG5cdGxldCBvdmVyd29ybGRWaWV3ID0gbmV3IE92ZXJ3b3JsZFZpZXcoKTtcclxuXHRvdmVyd29ybGRWaWV3LnRoZW4oKCkgPT4ge1xyXG5cdFx0aWYoY3VyTHZsID09PSAxKSB7XHJcblx0XHRcdGdhbWUudXRpbHMuc3dpdGNoVmlldyhsdmwxKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRnYW1lLnV0aWxzLnN3aXRjaFZpZXcobHZsMik7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGxldCBhY3Rpb25zID0gW0ZpZ2h0QWN0aW9uLlRBQ0tMRSwgRmlnaHRBY3Rpb24uRFJBR09OU19CUkVBVEgsIG51bGwsIG51bGxdO1xyXG5cclxuXHRsZXQgbWFsYWlzZSA9IG5ldyBEb3JtYW50KCdtYWxhaXNlLnBuZycsICdNQUxBSVNFJywgMTIsIDgsIDI3LCBhY3Rpb25zKTtcclxuXHRsZXQgZXJhYm9yID0gbmV3IERvcm1hbnQoJ2VyYWJvci5wbmcnLCAnRVJBQk9SJywgOCwgMTIsIDIzLCBhY3Rpb25zKTtcclxuXHJcblx0bGV0IGx2bDEgPSBuZXcgQmF0dGxlVmlldygnI2RkZCcsIG1hbGFpc2UsIGVyYWJvcik7XHJcblx0bHZsMS50aGVuKCgpID0+IHtcclxuXHRcdCsrY3VyTHZsO1xyXG5cdFx0Z2FtZS51dGlscy5zd2l0Y2hWaWV3KG92ZXJ3b3JsZFZpZXcpO1xyXG5cdH0pO1xyXG5cclxuXHRsZXQgbHZsMiA9IG5ldyBCYXR0bGVWaWV3KCcjZGRkJywgbWFsYWlzZSwgZXJhYm9yKTtcclxuXHRsdmwyLnRoZW4oKCkgPT4ge1xyXG5cdFx0Z2FtZS51dGlscy5zd2l0Y2hWaWV3KG92ZXJ3b3JsZFZpZXcpO1xyXG5cdH0pO1xyXG5cclxuXHRnYW1lLnZpZXcgPSB0aXRsZVZpZXc7XHJcbn0pKCk7XHJcbiJdfQ==
