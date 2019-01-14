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
/* globals SAT */

class LevelView {
    constructor(player, curLvl) {
        this.onUpdateSet = false;
        this.onRenderSet = false;

        this.privates = {};
        this.player = player;
        this.curLvl = curLvl;

        this.init();
    }

    then(callback) {
        this.privates.callback = callback;
    }

    init() {

    }

    update() {
        this.curLvl.update();
        this.player.update();

        this._checkCollision();
    }

    onUpdate(callback) {
        this.onUpdateSet = true;
        this.onUpdate = callback;
    }

    render() {
        this.curLvl.render();
        this.player.render();
    }

    onRender(callback) {
        this.onRenderSet = true;
        this.onRender = callback;
    }

    _checkCollision() {
        if(this.player.invincible) {
            if(this.player.invincibleTimer-- === 0) {
                this.player.invincible = false;
                this.player.invincibleTimer = 120;
            }

            return;
        }

        for(let i = 0; i < this.curLvl.projectiles.length; ++i) {
            const collided = SAT.testPolygonPolygon(this.player, this.curLvl.projectiles[i]);
            if(collided) {
                --this.player.hp;
                this.player.invincible = true;
                break;
            }
        }
    }
}
/* globals SAT, canvas, ctx */

class Level1 {
    constructor() {
        this.projectiles = [];

        for(let i = 0; i < 10; ++i) {
            let projectile = new SAT.Box(new SAT.Vector(
                Math.floor((Math.random() * canvas.width) + 0), // random number between 0 and canvas.width
                canvas.height
            ), 10, 20).toPolygon();

            projectile.speed = Math.floor((Math.random() * 10) + 3) * 0.1;

            this.projectiles.push(projectile);
        }
    }

    update() {
        for(let i = 0; i < this.projectiles.length; ++i) {
            this.projectiles[i].pos.y -= this.projectiles[i].speed;
        }
    }

    render() {
        // background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // projectiles
        ctx.fillStyle = 'silver';
        for(let i = 0; i < this.projectiles.length; ++i) {
            ctx.fillRect(this.projectiles[i].pos.x, this.projectiles[i].pos.y, 10, 20);
        }
    }
}
/* globals SAT, KeyCode, game, ctx */

class Vamp {
    constructor() {
        this.speed = 4;
        this.w = 40;
        this.h = 40;
        this.hp = 3;
        this.invincible = false;
        this.invincibleTimer = 120;
        this.dead = false;

        Object.assign(this, new SAT.Box(new SAT.Vector(0, 0), this.w, this.h).toPolygon());
    }

    update() {
        // horizontal
        if(game.input.keysDown[KeyCode.RIGHT]){
            this.pos.x += this.speed;
        }
        else if(game.input.keysDown[KeyCode.LEFT]) {
            this.pos.x -= this.speed;
        }

        // vertical
        if(game.input.keysDown[KeyCode.UP]) {
            this.pos.y -= this.speed;
        }
        else if(game.input.keysDown[KeyCode.DOWN]) {
            this.pos.y += this.speed;
        }

        if(this.hp <= 0 && !this.dead) {
            this.dead = true;
            alert('You died');
            location.reload();
        }
    }

    render() {
        if(this.dead) {
            return;
        }

        // body
        let doDraw = true;
        if(this.invincible) {
            const t = this.invincibleTimer % 30;
            if(t >= 0 && t < 15) {
                doDraw = false;
            }
        }

        if(doDraw) {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        }

        // health
        ctx.fillStyle = 'red';
        for(let i = 0; i < this.hp; ++i) {
            ctx.fillRect(this.pos.x - 10 + i*20, this.pos.y - 20, 20, 10);
        }
    }
}
'use strict';
/* globals game, GameEngine, TitleView, KeyCode, Vamp, Level1, LevelView, GameSaveView */

(() => {
    window.game = new GameEngine();

    let titleView = new TitleView('Vamp: The Great and Powerful', true);
    let saveView = new GameSaveView();

    const vamp = new Vamp();
    const lvl1 = new Level1();
    const lvlView = new LevelView(vamp, lvl1);

    titleView.then(() => {
        game.utils.switchView(saveView);
    });

    saveView.then(key => {
        if(key === KeyCode.ESC) {
            game.utils.switchView(titleView);
        }
        else if(key === KeyCode.ENTER) {
            game.utils.switchView(lvlView);
        }
    });

    game.view = titleView;
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVFbmdpbmUuanMiLCJHYW1lU2F2ZS5qcyIsIkdhbWVJbnB1dC5qcyIsIkdhbWVVdGlscy5qcyIsIlNBVC5qcyIsIkdhbWVHcmFwaGljcy5qcyIsIkdhbWVWaWV3LmpzIiwiVGl0bGVWaWV3LmpzIiwiR2FtZVNhdmVWaWV3LmpzIiwiTGV2ZWxWaWV3LmpzIiwibGV2ZWwxLmpzIiwidmFtcC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBhZ2VWYW1wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG4vKiBnbG9iYWxzIGNhbnZhcywgR2FtZUlucHV0LCBHYW1lR3JhcGhpY3MsIEdhbWVVdGlscywgR2FtZVZpZXcgKi9cclxuXHJcbmNsYXNzIEdhbWVFbmdpbmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlLCAxMDAwIC8gNjApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyUkFGID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZVNldCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25SZW5kZXJTZXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gYmFjayBidXR0b25cclxuICAgICAgICBsZXQgYmFja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBiYWNrQnRuLmhyZWYgPSAnLyNnYW1lcyc7XHJcbiAgICAgICAgYmFja0J0bi5pbm5lclRleHQgPSAnQmFjayc7XHJcbiAgICAgICAgYmFja0J0bi5jbGFzc05hbWUgPSAnYnRuLWJhY2snO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmFja0J0bik7XHJcblxyXG4gICAgICAgIC8vIGNhbnZhcyB3cmFwXHJcbiAgICAgICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB3cmFwLmNsYXNzTmFtZSA9ICdjYW52YXMtd3JhcCc7XHJcblxyXG4gICAgICAgIC8vIGNhbnZhc1xyXG4gICAgICAgIHdpbmRvdy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDE2ICogNjMpO1xyXG4gICAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDkgKiA2Myk7XHJcbiAgICAgICAgd3JhcC5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcCk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IG5ldyBHYW1lSW5wdXQoKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzID0gbmV3IEdhbWVHcmFwaGljcygpO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBHYW1lVmlldygpO1xyXG4gICAgICAgIHRoaXMudXRpbHMgPSBuZXcgR2FtZVV0aWxzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnZpZXcudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMub25VcGRhdGVTZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJSQUYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXIpO1xyXG4gICAgICAgIHRoaXMudmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5vblJlbmRlclNldCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZVNldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVuZGVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5vblJlbmRlclNldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblJlbmRlciA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlclJBRik7XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBHYW1lU2F2ZSB7XHJcbiAgICBsb2FkKHNsb3QpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2BzbG90ICR7c2xvdH1gXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHplcm8gPSB0aGlzLmxvYWQoMCksXHJcbiAgICAgICAgICAgIG9uZSA9IHRoaXMubG9hZCgxKSxcclxuICAgICAgICAgICAgdHdvID0gdGhpcy5sb2FkKDIpLFxyXG4gICAgICAgICAgICBkZWYgPSAnLS0tJ1xyXG4gICAgICAgIDtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgKHR5cGVvZih6ZXJvKSAhPT0gJ3VuZGVmaW5lZCcpID8gemVybyA6IGRlZixcclxuICAgICAgICAgICAgKHR5cGVvZihvbmUpICE9PSAndW5kZWZpbmVkJykgPyBvbmUgOiBkZWYsXHJcbiAgICAgICAgICAgICh0eXBlb2YodHdvKSAhPT0gJ3VuZGVmaW5lZCcpID8gdHdvIDogZGVmXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKHNsb3QsIGRhdGEpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2VbYHNsb3QgJHtzbG90fWBdID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBlcmFzZShzbG90KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHNsb3QgJHtzbG90fWApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExpc3QoKTtcclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBLZXlDb2RlID0ge1xyXG5cdEVNUFRZOiAtMSxcclxuXHRFTlRFUjogMTMsXHJcblx0Q1RSTDogMTcsXHJcblx0RVNDOiAyNyxcclxuXHRTUEFDRUJBUjogMzIsXHJcblx0TEVGVDogMzcsXHJcblx0VVA6IDM4LFxyXG5cdFJJR0hUOiAzOSxcclxuXHRET1dOOiA0MCxcclxuXHRERUxFVEU6IDQ2LFxyXG5cdEE6IDY1LFxyXG5cdEQ6IDY4LFxyXG5cdEY6IDcwLFxyXG5cdEg6IDcyLFxyXG5cdEo6IDc0LFxyXG5cdEs6IDc1LFxyXG5cdE06IDc3LFxyXG5cdE86IDc5LFxyXG5cdFI6IDgyLFxyXG5cdFM6IDgzLFxyXG5cdFc6IDg3XHJcbn07XHJcblxyXG5sZXQgS2V5Q29kZU5hbWVzID0ge307XHJcbktleUNvZGVOYW1lc1stMV0gPSAnRU1QVFknO1xyXG5LZXlDb2RlTmFtZXNbMTNdID0gJ0VOVEVSJztcclxuS2V5Q29kZU5hbWVzWzE3XSA9ICdDVFJMJztcclxuS2V5Q29kZU5hbWVzWzI3XSA9ICdFU0MnO1xyXG5LZXlDb2RlTmFtZXNbMzJdID0gJ1NQQUNFQkFSJztcclxuS2V5Q29kZU5hbWVzWzM3XSA9ICdMRUZUJztcclxuS2V5Q29kZU5hbWVzWzM4XSA9ICdVUCc7XHJcbktleUNvZGVOYW1lc1szOV0gPSAnUklHSFQnO1xyXG5LZXlDb2RlTmFtZXNbNDBdID0gJ0RPV04nO1xyXG5LZXlDb2RlTmFtZXNbNDZdID0gJ0RFTEVURSc7XHJcbktleUNvZGVOYW1lc1s2NV0gPSAnQSc7XHJcbktleUNvZGVOYW1lc1s2OF0gPSAnRCc7XHJcbktleUNvZGVOYW1lc1s3MF0gPSAnRic7XHJcbktleUNvZGVOYW1lc1s3Ml0gPSAnSCc7XHJcbktleUNvZGVOYW1lc1s3NF0gPSAnSic7XHJcbktleUNvZGVOYW1lc1s3NV0gPSAnSyc7XHJcbktleUNvZGVOYW1lc1s3N10gPSAnTSc7XHJcbktleUNvZGVOYW1lc1s3OV0gPSAnTyc7XHJcbktleUNvZGVOYW1lc1s4Ml0gPSAnUic7XHJcbktleUNvZGVOYW1lc1s4M10gPSAnUyc7XHJcbktleUNvZGVOYW1lc1s4N10gPSAnVyc7XHJcblxyXG5jbGFzcyBHYW1lSW5wdXQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5rZXlzRG93biA9IHt9O1xyXG5cdFx0dGhpcy5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG5cdFx0bGV0IGxhc3RLZXlVcCA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG5cdFx0YWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG5cdFx0XHRjb25zdCBrZXkgPSB0aGlzLmZpeEtleShlLmtleUNvZGUpO1xyXG5cclxuXHRcdFx0aWYoIXRoaXMua2V5c0Rvd25ba2V5XSkge1xyXG5cdFx0XHRcdHRoaXMubGFzdEtleURvd24gPSBrZXk7XHJcblx0XHRcdFx0dGhpcy5rZXlzRG93bltrZXldID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0YWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcclxuXHRcdFx0bGFzdEtleVVwID0gdGhpcy5maXhLZXkoZS5rZXlDb2RlKTtcclxuXHRcdFx0ZGVsZXRlIHRoaXMua2V5c0Rvd25bbGFzdEtleVVwXTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Zml4S2V5KGtleSkge1xyXG5cdFx0aWYoa2V5ID09PSBLZXlDb2RlLlcpIHtcclxuXHRcdFx0a2V5ID0gS2V5Q29kZS5VUDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLlMpIHtcclxuXHRcdFx0a2V5ID0gS2V5Q29kZS5ET1dOO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuRCkge1xyXG5cdFx0XHRrZXkgPSBLZXlDb2RlLlJJR0hUO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuQSkge1xyXG5cdFx0XHRrZXkgPSBLZXlDb2RlLkxFRlQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGtleTtcclxuXHR9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBHYW1lVXRpbHMge1xyXG4gICAgY29uc3RydWN0b3IoZ0VuZ2luZSkge1xyXG4gICAgICAgIHRoaXMuZ0VuZ2luZSA9IGdFbmdpbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIFJlc2V0cyB0aGUgbmV3VmlldydzIHByaXZhdGUgdmFyaWFibGVzLlxyXG4gICAgICogQ2hhbmdlcyB0aGUgdmlldy5cclxuICAgICAqL1xyXG4gICAgc3dpdGNoVmlldyhuZXdWaWV3KSB7XHJcbiAgICAgICAgbmV3Vmlldy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5nRW5naW5lLnZpZXcgPSBuZXdWaWV3O1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBEaXIgPSB7XHJcbiAgICBSSUdIVDogMCxcclxuICAgIExFRlQ6IDFcclxufTsiLCIvLyBWZXJzaW9uIDAuNi4wIC0gQ29weXJpZ2h0IDIwMTIgLSAyMDE2IC0gIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+XHJcbi8vXHJcbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmllY2tlbi9zYXQtanNcclxuLy9cclxuLy8gQSBzaW1wbGUgbGlicmFyeSBmb3IgZGV0ZXJtaW5pbmcgaW50ZXJzZWN0aW9ucyBvZiBjaXJjbGVzIGFuZFxyXG4vLyBwb2x5Z29ucyB1c2luZyB0aGUgU2VwYXJhdGluZyBBeGlzIFRoZW9yZW0uXHJcbi8qKiBAcHJlc2VydmUgU0FULmpzIC0gVmVyc2lvbiAwLjYuMCAtIENvcHlyaWdodCAyMDEyIC0gMjAxNiAtIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+IC0gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBodHRwczovL2dpdGh1Yi5jb20vanJpZWNrZW4vc2F0LWpzICovXHJcblxyXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlKi9cclxuLypqc2hpbnQgc2hhZG93OnRydWUsIHN1Yjp0cnVlLCBmb3Jpbjp0cnVlLCBub2FyZzp0cnVlLCBub2VtcHR5OnRydWUsXHJcbiAgZXFlcWVxOnRydWUsIGJpdHdpc2U6dHJ1ZSwgc3RyaWN0OnRydWUsIHVuZGVmOnRydWUsXHJcbiAgY3VybHk6dHJ1ZSwgYnJvd3Nlcjp0cnVlICovXHJcblxyXG4vLyBDcmVhdGUgYSBVTUQgd3JhcHBlciBmb3IgU0FULiBXb3JrcyBpbjpcclxuLy9cclxuLy8gIC0gUGxhaW4gYnJvd3NlciB2aWEgZ2xvYmFsIFNBVCB2YXJpYWJsZVxyXG4vLyAgLSBBTUQgbG9hZGVyIChsaWtlIHJlcXVpcmUuanMpXHJcbi8vICAtIE5vZGUuanNcclxuLy9cclxuLy8gVGhlIHF1b3RlZCBwcm9wZXJ0aWVzIGFsbCBvdmVyIHRoZSBwbGFjZSBhcmUgdXNlZCBzbyB0aGF0IHRoZSBDbG9zdXJlIENvbXBpbGVyXHJcbi8vIGRvZXMgbm90IG1hbmdsZSB0aGUgZXhwb3NlZCBBUEkgaW4gYWR2YW5jZWQgbW9kZS5cclxuLyoqXHJcbiAqIEBwYXJhbSB7Kn0gcm9vdCAtIFRoZSBnbG9iYWwgc2NvcGVcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZmFjdG9yeSAtIEZhY3RvcnkgdGhhdCBjcmVhdGVzIFNBVCBtb2R1bGVcclxuICovXHJcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcclxuICAgIGRlZmluZShmYWN0b3J5KTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgbW9kdWxlWydleHBvcnRzJ10gPSBmYWN0b3J5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJvb3RbJ1NBVCddID0gZmFjdG9yeSgpO1xyXG4gIH1cclxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIHZhciBTQVQgPSB7fTtcclxuXHJcbiAgLy9cclxuICAvLyAjIyBWZWN0b3JcclxuICAvL1xyXG4gIC8vIFJlcHJlc2VudHMgYSB2ZWN0b3IgaW4gdHdvIGRpbWVuc2lvbnMgd2l0aCBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzLlxyXG5cclxuXHJcbiAgLy8gQ3JlYXRlIGEgbmV3IFZlY3Rvciwgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgeGAgYW5kIGB5YCBjb29yZGluYXRlcy4gSWZcclxuICAvLyBhIGNvb3JkaW5hdGUgaXMgbm90IHNwZWNpZmllZCwgaXQgd2lsbCBiZSBzZXQgdG8gYDBgXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geCBUaGUgeCBwb3NpdGlvbi5cclxuICAgKiBAcGFyYW0gez9udW1iZXI9fSB5IFRoZSB5IHBvc2l0aW9uLlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIFZlY3Rvcih4LCB5KSB7XHJcbiAgICB0aGlzWyd4J10gPSB4IHx8IDA7XHJcbiAgICB0aGlzWyd5J10gPSB5IHx8IDA7XHJcbiAgfVxyXG4gIFNBVFsnVmVjdG9yJ10gPSBWZWN0b3I7XHJcbiAgLy8gQWxpYXMgYFZlY3RvcmAgYXMgYFZgXHJcbiAgU0FUWydWJ10gPSBWZWN0b3I7XHJcblxyXG5cclxuICAvLyBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2NvcHknXSA9IFZlY3Rvci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uKG90aGVyKSB7XHJcbiAgICB0aGlzWyd4J10gPSBvdGhlclsneCddO1xyXG4gICAgdGhpc1sneSddID0gb3RoZXJbJ3knXTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIENyZWF0ZSBhIG5ldyB2ZWN0b3Igd2l0aCB0aGUgc2FtZSBjb29yZGluYXRlcyBhcyB0aGlzIG9uLlxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhlIG5ldyBjbG9uZWQgdmVjdG9yXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsnY2xvbmUnXSA9IFZlY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXNbJ3gnXSwgdGhpc1sneSddKTtcclxuICB9O1xyXG5cclxuICAvLyBDaGFuZ2UgdGhpcyB2ZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuIChFZmZlY3RpdmVseVxyXG4gIC8vIHJvYXRhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uKVxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsncGVycCddID0gVmVjdG9yLnByb3RvdHlwZS5wZXJwID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcclxuICAgIHRoaXNbJ3gnXSA9IHRoaXNbJ3knXTtcclxuICAgIHRoaXNbJ3knXSA9IC14O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUm90YXRlIHRoaXMgdmVjdG9yIChjb3VudGVyLWNsb2Nrd2lzZSkgYnkgdGhlIHNwZWNpZmllZCBhbmdsZSAoaW4gcmFkaWFucykuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydyb3RhdGUnXSA9IFZlY3Rvci5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcclxuICAgIHZhciB5ID0gdGhpc1sneSddO1xyXG4gICAgdGhpc1sneCddID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICB0aGlzWyd5J10gPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFJldmVyc2UgdGhpcyB2ZWN0b3IuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydyZXZlcnNlJ10gPSBWZWN0b3IucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXNbJ3gnXSA9IC10aGlzWyd4J107XHJcbiAgICB0aGlzWyd5J10gPSAtdGhpc1sneSddO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIE5vcm1hbGl6ZSB0aGlzIHZlY3Rvci4gIChtYWtlIGl0IGhhdmUgbGVuZ3RoIG9mIGAxYClcclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ25vcm1hbGl6ZSddID0gVmVjdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBkID0gdGhpcy5sZW4oKTtcclxuICAgIGlmKGQgPiAwKSB7XHJcbiAgICAgIHRoaXNbJ3gnXSA9IHRoaXNbJ3gnXSAvIGQ7XHJcbiAgICAgIHRoaXNbJ3knXSA9IHRoaXNbJ3knXSAvIGQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBBZGQgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmUuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydhZGQnXSA9IFZlY3Rvci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob3RoZXIpIHtcclxuICAgIHRoaXNbJ3gnXSArPSBvdGhlclsneCddO1xyXG4gICAgdGhpc1sneSddICs9IG90aGVyWyd5J107XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBTdWJ0cmFjdCBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaWluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydzdWInXSA9IFZlY3Rvci5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24ob3RoZXIpIHtcclxuICAgIHRoaXNbJ3gnXSAtPSBvdGhlclsneCddO1xyXG4gICAgdGhpc1sneSddIC09IG90aGVyWyd5J107XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBTY2FsZSB0aGlzIHZlY3Rvci4gQW4gaW5kZXBlbmRhbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkXHJcbiAgLy8gZm9yIGVhY2ggYXhpcywgb3IgYSBzaW5nbGUgc2NhbGluZyBmYWN0b3IgdGhhdCB3aWxsIHNjYWxlIGJvdGggYHhgIGFuZCBgeWAuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB4IGRpcmVjdGlvbi5cclxuICAgKiBAcGFyYW0gez9udW1iZXI9fSB5IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeSBkaXJlY3Rpb24uICBJZiB0aGlzXHJcbiAgICogICBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgeCBzY2FsaW5nIGZhY3RvciB3aWxsIGJlIHVzZWQuXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydzY2FsZSddID0gVmVjdG9yLnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uKHgseSkge1xyXG4gICAgdGhpc1sneCddICo9IHg7XHJcbiAgICB0aGlzWyd5J10gKj0geSB8fCB4O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUHJvamVjdCB0aGlzIHZlY3RvciBvbiB0byBhbm90aGVyIHZlY3Rvci5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydwcm9qZWN0J10gPSBWZWN0b3IucHJvdG90eXBlLnByb2plY3QgPSBmdW5jdGlvbihvdGhlcikge1xyXG4gICAgdmFyIGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcclxuICAgIHRoaXNbJ3gnXSA9IGFtdCAqIG90aGVyWyd4J107XHJcbiAgICB0aGlzWyd5J10gPSBhbXQgKiBvdGhlclsneSddO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUHJvamVjdCB0aGlzIHZlY3RvciBvbnRvIGEgdmVjdG9yIG9mIHVuaXQgbGVuZ3RoLiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50XHJcbiAgLy8gdGhhbiBgcHJvamVjdGAgd2hlbiBkZWFsaW5nIHdpdGggdW5pdCB2ZWN0b3JzLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgdW5pdCB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsncHJvamVjdE4nXSA9IFZlY3Rvci5wcm90b3R5cGUucHJvamVjdE4gPSBmdW5jdGlvbihvdGhlcikge1xyXG4gICAgdmFyIGFtdCA9IHRoaXMuZG90KG90aGVyKTtcclxuICAgIHRoaXNbJ3gnXSA9IGFtdCAqIG90aGVyWyd4J107XHJcbiAgICB0aGlzWyd5J10gPSBhbXQgKiBvdGhlclsneSddO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmVmbGVjdCB0aGlzIHZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcy5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cclxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3JlZmxlY3QnXSA9IFZlY3Rvci5wcm90b3R5cGUucmVmbGVjdCA9IGZ1bmN0aW9uKGF4aXMpIHtcclxuICAgIHZhciB4ID0gdGhpc1sneCddO1xyXG4gICAgdmFyIHkgPSB0aGlzWyd5J107XHJcbiAgICB0aGlzLnByb2plY3QoYXhpcykuc2NhbGUoMik7XHJcbiAgICB0aGlzWyd4J10gLT0geDtcclxuICAgIHRoaXNbJ3knXSAtPSB5O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmVmbGVjdCB0aGlzIHZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcyAocmVwcmVzZW50ZWQgYnkgYSB1bml0IHZlY3RvcikuIFRoaXMgaXNcclxuICAvLyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGByZWZsZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCBhbiBheGlzIHRoYXQgaXMgYSB1bml0IHZlY3Rvci5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgdW5pdCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxyXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgVmVjdG9yLnByb3RvdHlwZVsncmVmbGVjdE4nXSA9IFZlY3Rvci5wcm90b3R5cGUucmVmbGVjdE4gPSBmdW5jdGlvbihheGlzKSB7XHJcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcclxuICAgIHZhciB5ID0gdGhpc1sneSddO1xyXG4gICAgdGhpcy5wcm9qZWN0TihheGlzKS5zY2FsZSgyKTtcclxuICAgIHRoaXNbJ3gnXSAtPSB4O1xyXG4gICAgdGhpc1sneSddIC09IHk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSAgb3RoZXIgVGhlIHZlY3RvciB0byBkb3QgdGhpcyBvbmUgYWdhaW5zdC5cclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdC5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydkb3QnXSA9IFZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24ob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzWyd4J10gKiBvdGhlclsneCddICsgdGhpc1sneSddICogb3RoZXJbJ3knXTtcclxuICB9O1xyXG5cclxuICAvLyBHZXQgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGxlbmd0aF4yIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2xlbjInXSA9IFZlY3Rvci5wcm90b3R5cGUubGVuMiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xyXG4gIH07XHJcblxyXG4gIC8vIEdldCB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBWZWN0b3IucHJvdG90eXBlWydsZW4nXSA9IFZlY3Rvci5wcm90b3R5cGUubGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcclxuICB9O1xyXG5cclxuICAvLyAjIyBDaXJjbGVcclxuICAvL1xyXG4gIC8vIFJlcHJlc2VudHMgYSBjaXJjbGUgd2l0aCBhIHBvc2l0aW9uIGFuZCBhIHJhZGl1cy5cclxuXHJcbiAgLy8gQ3JlYXRlIGEgbmV3IGNpcmNsZSwgb3B0aW9uYWxseSBwYXNzaW5nIGluIGEgcG9zaXRpb24gYW5kL29yIHJhZGl1cy4gSWYgbm8gcG9zaXRpb25cclxuICAvLyBpcyBnaXZlbiwgdGhlIGNpcmNsZSB3aWxsIGJlIGF0IGAoMCwwKWAuIElmIG5vIHJhZGl1cyBpcyBwcm92aWRlZCwgdGhlIGNpcmNsZSB3aWxsXHJcbiAgLy8gaGF2ZSBhIHJhZGl1cyBvZiBgMGAuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3I9fSBwb3MgQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGVcclxuICAgKiBAcGFyYW0gez9udW1iZXI9fSByIFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZVxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIENpcmNsZShwb3MsIHIpIHtcclxuICAgIHRoaXNbJ3BvcyddID0gcG9zIHx8IG5ldyBWZWN0b3IoKTtcclxuICAgIHRoaXNbJ3InXSA9IHIgfHwgMDtcclxuICB9XHJcbiAgU0FUWydDaXJjbGUnXSA9IENpcmNsZTtcclxuXHJcbiAgLy8gQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveCAoQUFCQikgb2YgdGhpcyBDaXJjbGUuXHJcbiAgLy9cclxuICAvLyBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFBvbHlnb25gIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoZSBBQUJCXHJcbiAgICovXHJcbiAgQ2lyY2xlLnByb3RvdHlwZVsnZ2V0QUFCQiddID0gQ2lyY2xlLnByb3RvdHlwZS5nZXRBQUJCID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgciA9IHRoaXNbJ3InXTtcclxuICAgIHZhciBjb3JuZXIgPSB0aGlzW1wicG9zXCJdLmNsb25lKCkuc3ViKG5ldyBWZWN0b3IociwgcikpO1xyXG4gICAgcmV0dXJuIG5ldyBCb3goY29ybmVyLCByKjIsIHIqMikudG9Qb2x5Z29uKCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gIyMgUG9seWdvblxyXG4gIC8vXHJcbiAgLy8gUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKVxyXG4gIC8vXHJcbiAgLy8gTm90ZTogRG8gX25vdF8gbWFudWFsbHkgY2hhbmdlIHRoZSBgcG9pbnRzYCwgYGFuZ2xlYCwgb3IgYG9mZnNldGAgcHJvcGVydGllcy4gVXNlIHRoZVxyXG4gIC8vIHByb3ZpZGVkIHNldHRlcnMuIE90aGVyd2lzZSB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzIHdpbGwgbm90IGJlIHVwZGF0ZWQgY29ycmVjdGx5LlxyXG4gIC8vXHJcbiAgLy8gYHBvc2AgY2FuIGJlIGNoYW5nZWQgZGlyZWN0bHkuXHJcblxyXG4gIC8vIENyZWF0ZSBhIG5ldyBwb2x5Z29uLCBwYXNzaW5nIGluIGEgcG9zaXRpb24gdmVjdG9yLCBhbmQgYW4gYXJyYXkgb2YgcG9pbnRzIChyZXByZXNlbnRlZFxyXG4gIC8vIGJ5IHZlY3RvcnMgcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uXHJcbiAgLy8gb2YgdGhlIHBvbHlnb24gd2lsbCBiZSBgKDAsMClgLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luIG9mIHRoZSBwb2x5Z29uLiAoYWxsIG90aGVyXHJcbiAgICogICBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj49fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbixcclxuICAgKiAgIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIFBvbHlnb24ocG9zLCBwb2ludHMpIHtcclxuICAgIHRoaXNbJ3BvcyddID0gcG9zIHx8IG5ldyBWZWN0b3IoKTtcclxuICAgIHRoaXNbJ2FuZ2xlJ10gPSAwO1xyXG4gICAgdGhpc1snb2Zmc2V0J10gPSBuZXcgVmVjdG9yKCk7XHJcbiAgICB0aGlzLnNldFBvaW50cyhwb2ludHMgfHwgW10pO1xyXG4gIH1cclxuICBTQVRbJ1BvbHlnb24nXSA9IFBvbHlnb247XHJcblxyXG4gIC8vIFNldCB0aGUgcG9pbnRzIG9mIHRoZSBwb2x5Z29uLlxyXG4gIC8vXHJcbiAgLy8gTm90ZTogVGhlIHBvaW50cyBhcmUgY291bnRlci1jbG9ja3dpc2UgKndpdGggcmVzcGVjdCB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0qLlxyXG4gIC8vIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyXHJcbiAgLy8gaXQgd2lsbCBfYXBwZWFyXyB2aXN1YWxseSB0aGF0IHRoZSBwb2ludHMgYXJlIGJlaW5nIHNwZWNpZmllZCBjbG9ja3dpc2UuIFRoaXMgaXMganVzdFxyXG4gIC8vIGJlY2F1c2Ugb2YgdGhlIGludmVyc2lvbiBvZiB0aGUgWS1heGlzIHdoZW4gYmVpbmcgZGlzcGxheWVkLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj49fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbixcclxuICAgKiAgIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxyXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFBvbHlnb24ucHJvdG90eXBlWydzZXRQb2ludHMnXSA9IFBvbHlnb24ucHJvdG90eXBlLnNldFBvaW50cyA9IGZ1bmN0aW9uKHBvaW50cykge1xyXG4gICAgLy8gT25seSByZS1hbGxvY2F0ZSBpZiB0aGlzIGlzIGEgbmV3IHBvbHlnb24gb3IgdGhlIG51bWJlciBvZiBwb2ludHMgaGFzIGNoYW5nZWQuXHJcbiAgICB2YXIgbGVuZ3RoQ2hhbmdlZCA9ICF0aGlzWydwb2ludHMnXSB8fCB0aGlzWydwb2ludHMnXS5sZW5ndGggIT09IHBvaW50cy5sZW5ndGg7XHJcbiAgICBpZiAobGVuZ3RoQ2hhbmdlZCkge1xyXG4gICAgICB2YXIgaTtcclxuICAgICAgdmFyIGNhbGNQb2ludHMgPSB0aGlzWydjYWxjUG9pbnRzJ10gPSBbXTtcclxuICAgICAgdmFyIGVkZ2VzID0gdGhpc1snZWRnZXMnXSA9IFtdO1xyXG4gICAgICB2YXIgbm9ybWFscyA9IHRoaXNbJ25vcm1hbHMnXSA9IFtdO1xyXG4gICAgICAvLyBBbGxvY2F0ZSB0aGUgdmVjdG9yIGFycmF5cyBmb3IgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllc1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2FsY1BvaW50cy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgZWRnZXMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzWydwb2ludHMnXSA9IHBvaW50cztcclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gU2V0IHRoZSBjdXJyZW50IHJvdGF0aW9uIGFuZ2xlIG9mIHRoZSBwb2x5Z29uLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSAoaW4gcmFkaWFucykuXHJcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgUG9seWdvbi5wcm90b3R5cGVbJ3NldEFuZ2xlJ10gPSBQb2x5Z29uLnByb3RvdHlwZS5zZXRBbmdsZSA9IGZ1bmN0aW9uKGFuZ2xlKSB7XHJcbiAgICB0aGlzWydhbmdsZSddID0gYW5nbGU7XHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vIFNldCB0aGUgY3VycmVudCBvZmZzZXQgdG8gYXBwbHkgdG8gdGhlIGBwb2ludHNgIGJlZm9yZSBhcHBseWluZyB0aGUgYGFuZ2xlYCByb3RhdGlvbi5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IHZlY3Rvci5cclxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBQb2x5Z29uLnByb3RvdHlwZVsnc2V0T2Zmc2V0J10gPSBQb2x5Z29uLnByb3RvdHlwZS5zZXRPZmZzZXQgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICAgIHRoaXNbJ29mZnNldCddID0gb2Zmc2V0O1xyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvLyBSb3RhdGVzIHRoaXMgcG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgLy9cclxuICAvLyBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgYW5nbGVgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyByb3RhdGlvbikuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpXHJcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgUG9seWdvbi5wcm90b3R5cGVbJ3JvdGF0ZSddID0gUG9seWdvbi5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24oYW5nbGUpIHtcclxuICAgIHZhciBwb2ludHMgPSB0aGlzWydwb2ludHMnXTtcclxuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gVHJhbnNsYXRlcyB0aGUgcG9pbnRzIG9mIHRoaXMgcG9seWdvbiBieSBhIHNwZWNpZmllZCBhbW91bnQgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiAqaXRzIG93biBjb29yZGluYXRlXHJcbiAgLy8gc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgLy9cclxuICAvLyBUaGlzIGlzIG1vc3QgdXNlZnVsIHRvIGNoYW5nZSB0aGUgXCJjZW50ZXIgcG9pbnRcIiBvZiBhIHBvbHlnb24uIElmIHlvdSBqdXN0IHdhbnQgdG8gbW92ZSB0aGUgd2hvbGUgcG9seWdvbiwgY2hhbmdlXHJcbiAgLy8gdGhlIGNvb3JkaW5hdGVzIG9mIGBwb3NgLlxyXG4gIC8vXHJcbiAgLy8gTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYG9mZnNldGAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHRyYW5zbGF0aW9uKVxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHZlcnRpY2FsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgUG9seWdvbi5wcm90b3R5cGVbJ3RyYW5zbGF0ZSddID0gUG9seWdvbi5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHZhciBwb2ludHMgPSB0aGlzWydwb2ludHMnXTtcclxuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xyXG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gQ29tcHV0ZXMgdGhlIGNhbGN1bGF0ZWQgY29sbGlzaW9uIHBvbHlnb24uIEFwcGxpZXMgdGhlIGBhbmdsZWAgYW5kIGBvZmZzZXRgIHRvIHRoZSBvcmlnaW5hbCBwb2ludHMgdGhlbiByZWNhbGN1bGF0ZXMgdGhlXHJcbiAgLy8gZWRnZXMgYW5kIG5vcm1hbHMgb2YgdGhlIGNvbGxpc2lvbiBwb2x5Z29uLlxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIFBvbHlnb24ucHJvdG90eXBlLl9yZWNhbGMgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIENhbGN1bGF0ZWQgcG9pbnRzIC0gdGhpcyBpcyB3aGF0IGlzIHVzZWQgZm9yIHVuZGVybHlpbmcgY29sbGlzaW9ucyBhbmQgdGFrZXMgaW50byBhY2NvdW50XHJcbiAgICAvLyB0aGUgYW5nbGUvb2Zmc2V0IHNldCBvbiB0aGUgcG9seWdvbi5cclxuICAgIHZhciBjYWxjUG9pbnRzID0gdGhpc1snY2FsY1BvaW50cyddO1xyXG4gICAgLy8gVGhlIGVkZ2VzIGhlcmUgYXJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGBuYHRoIGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHJlbGF0aXZlIHRvXHJcbiAgICAvLyB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYSBnaXZlbiBlZGdlIGZyb20gdGhlIGVkZ2UgdmFsdWUsIHlvdSBtdXN0XHJcbiAgICAvLyBmaXJzdCB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIHZhciBlZGdlcyA9IHRoaXNbJ2VkZ2VzJ107XHJcbiAgICAvLyBUaGUgbm9ybWFscyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBub3JtYWwgZm9yIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZVxyXG4gICAgLy8gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhbiBlZGdlIG5vcm1hbCwgeW91IG11c3QgZmlyc3RcclxuICAgIC8vIHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgdmFyIG5vcm1hbHMgPSB0aGlzWydub3JtYWxzJ107XHJcbiAgICAvLyBDb3B5IHRoZSBvcmlnaW5hbCBwb2ludHMgYXJyYXkgYW5kIGFwcGx5IHRoZSBvZmZzZXQvYW5nbGVcclxuICAgIHZhciBwb2ludHMgPSB0aGlzWydwb2ludHMnXTtcclxuICAgIHZhciBvZmZzZXQgPSB0aGlzWydvZmZzZXQnXTtcclxuICAgIHZhciBhbmdsZSA9IHRoaXNbJ2FuZ2xlJ107XHJcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuICAgIHZhciBpO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHZhciBjYWxjUG9pbnQgPSBjYWxjUG9pbnRzW2ldLmNvcHkocG9pbnRzW2ldKTtcclxuICAgICAgY2FsY1BvaW50LnggKz0gb2Zmc2V0Lng7XHJcbiAgICAgIGNhbGNQb2ludC55ICs9IG9mZnNldC55O1xyXG4gICAgICBpZiAoYW5nbGUgIT09IDApIHtcclxuICAgICAgICBjYWxjUG9pbnQucm90YXRlKGFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBlZGdlcy9ub3JtYWxzXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgdmFyIHAxID0gY2FsY1BvaW50c1tpXTtcclxuICAgICAgdmFyIHAyID0gaSA8IGxlbiAtIDEgPyBjYWxjUG9pbnRzW2kgKyAxXSA6IGNhbGNQb2ludHNbMF07XHJcbiAgICAgIHZhciBlID0gZWRnZXNbaV0uY29weShwMikuc3ViKHAxKTtcclxuICAgICAgbm9ybWFsc1tpXS5jb3B5KGUpLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyBDb21wdXRlIHRoZSBheGlzLWFsaWduZWQgYm91bmRpbmcgYm94LiBBbnkgY3VycmVudCBzdGF0ZVxyXG4gIC8vICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgQUFCQi5cclxuICAvL1xyXG4gIC8vIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhlIEFBQkJcclxuICAgKi9cclxuICBQb2x5Z29uLnByb3RvdHlwZVtcImdldEFBQkJcIl0gPSBQb2x5Z29uLnByb3RvdHlwZS5nZXRBQUJCID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcG9pbnRzID0gdGhpc1tcImNhbGNQb2ludHNcIl07XHJcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuICAgIHZhciB4TWluID0gcG9pbnRzWzBdW1wieFwiXTtcclxuICAgIHZhciB5TWluID0gcG9pbnRzWzBdW1wieVwiXTtcclxuICAgIHZhciB4TWF4ID0gcG9pbnRzWzBdW1wieFwiXTtcclxuICAgIHZhciB5TWF4ID0gcG9pbnRzWzBdW1wieVwiXTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgdmFyIHBvaW50ID0gcG9pbnRzW2ldO1xyXG4gICAgICBpZiAocG9pbnRbXCJ4XCJdIDwgeE1pbikge1xyXG4gICAgICAgIHhNaW4gPSBwb2ludFtcInhcIl07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAocG9pbnRbXCJ4XCJdID4geE1heCkge1xyXG4gICAgICAgIHhNYXggPSBwb2ludFtcInhcIl07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBvaW50W1wieVwiXSA8IHlNaW4pIHtcclxuICAgICAgICB5TWluID0gcG9pbnRbXCJ5XCJdO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50W1wieVwiXSA+IHlNYXgpIHtcclxuICAgICAgICB5TWF4ID0gcG9pbnRbXCJ5XCJdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzW1wicG9zXCJdLmNsb25lKCkuYWRkKG5ldyBWZWN0b3IoeE1pbiwgeU1pbikpLCB4TWF4IC0geE1pbiwgeU1heCAtIHlNaW4pLnRvUG9seWdvbigpO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyAjIyBCb3hcclxuICAvL1xyXG4gIC8vIFJlcHJlc2VudHMgYW4gYXhpcy1hbGlnbmVkIGJveCwgd2l0aCBhIHdpZHRoIGFuZCBoZWlnaHQuXHJcblxyXG5cclxuICAvLyBDcmVhdGUgYSBuZXcgYm94LCB3aXRoIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24sIHdpZHRoLCBhbmQgaGVpZ2h0LiBJZiBubyBwb3NpdGlvblxyXG4gIC8vIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsMClgLiBJZiBubyB3aWR0aCBvciBoZWlnaHQgYXJlIGdpdmVuLCB0aGV5IHdpbGxcclxuICAvLyBiZSBzZXQgdG8gYDBgLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYm90dG9tLWxlZnQgb2YgdGhlIGJveCAoaS5lLiB0aGUgc21hbGxlc3QgeCBhbmQgc21hbGxlc3QgeSB2YWx1ZSkuXHJcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gdyBUaGUgd2lkdGggb2YgdGhlIGJveC5cclxuICAgKiBAcGFyYW0gez9udW1iZXI9fSBoIFRoZSBoZWlnaHQgb2YgdGhlIGJveC5cclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBmdW5jdGlvbiBCb3gocG9zLCB3LCBoKSB7XHJcbiAgICB0aGlzWydwb3MnXSA9IHBvcyB8fCBuZXcgVmVjdG9yKCk7XHJcbiAgICB0aGlzWyd3J10gPSB3IHx8IDA7XHJcbiAgICB0aGlzWydoJ10gPSBoIHx8IDA7XHJcbiAgfVxyXG4gIFNBVFsnQm94J10gPSBCb3g7XHJcblxyXG4gIC8vIFJldHVybnMgYSBwb2x5Z29uIHdob3NlIGVkZ2VzIGFyZSB0aGUgc2FtZSBhcyB0aGlzIGJveC5cclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIGJveC5cclxuICAgKi9cclxuICBCb3gucHJvdG90eXBlWyd0b1BvbHlnb24nXSA9IEJveC5wcm90b3R5cGUudG9Qb2x5Z29uID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcG9zID0gdGhpc1sncG9zJ107XHJcbiAgICB2YXIgdyA9IHRoaXNbJ3cnXTtcclxuICAgIHZhciBoID0gdGhpc1snaCddO1xyXG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IocG9zWyd4J10sIHBvc1sneSddKSwgW1xyXG4gICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3Rvcih3LCAwKSxcclxuICAgICBuZXcgVmVjdG9yKHcsaCksIG5ldyBWZWN0b3IoMCxoKVxyXG4gICAgXSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gIyMgUmVzcG9uc2VcclxuICAvL1xyXG4gIC8vIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxyXG4gIC8vICAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cclxuICAvLyAgLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdFxyXG4gIC8vICAgIGZyb20gdGhlIHNlY29uZCBvbmUgKGFzIHdlbGwgYXMgYSB1bml0IHZlY3RvciBpbiB0aGF0IGRpcmVjdGlvbiBhbmQgdGhlIG1hZ25pdHVkZVxyXG4gIC8vICAgIG9mIHRoZSBvdmVybGFwKVxyXG4gIC8vICAtIFdoZXRoZXIgdGhlIGZpcnN0IG9iamVjdCBpcyBlbnRpcmVseSBpbnNpZGUgdGhlIHNlY29uZCwgYW5kIHZpY2UgdmVyc2EuXHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gUmVzcG9uc2UoKSB7XHJcbiAgICB0aGlzWydhJ10gPSBudWxsO1xyXG4gICAgdGhpc1snYiddID0gbnVsbDtcclxuICAgIHRoaXNbJ292ZXJsYXBOJ10gPSBuZXcgVmVjdG9yKCk7XHJcbiAgICB0aGlzWydvdmVybGFwViddID0gbmV3IFZlY3RvcigpO1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gIH1cclxuICBTQVRbJ1Jlc3BvbnNlJ10gPSBSZXNwb25zZTtcclxuXHJcbiAgLy8gU2V0IHNvbWUgdmFsdWVzIG9mIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZWlyIGRlZmF1bHRzLiAgQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWZcclxuICAvLyB5b3UgYXJlIGdvaW5nIHRvIHJldXNlIGEgc2luZ2xlIFJlc3BvbnNlIG9iamVjdCBmb3IgbXVsdGlwbGUgaW50ZXJzZWN0aW9uIHRlc3RzIChyZWNvbW1lbnRlZFxyXG4gIC8vIGFzIGl0IHdpbGwgYXZvaWQgYWxsY2F0aW5nIGV4dHJhIG1lbW9yeSlcclxuICAvKipcclxuICAgKiBAcmV0dXJuIHtSZXNwb25zZX0gVGhpcyBmb3IgY2hhaW5pbmdcclxuICAgKi9cclxuICBSZXNwb25zZS5wcm90b3R5cGVbJ2NsZWFyJ10gPSBSZXNwb25zZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXNbJ2FJbkInXSA9IHRydWU7XHJcbiAgICB0aGlzWydiSW5BJ10gPSB0cnVlO1xyXG4gICAgdGhpc1snb3ZlcmxhcCddID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8vICMjIE9iamVjdCBQb29sc1xyXG5cclxuICAvLyBBIHBvb2wgb2YgYFZlY3RvcmAgb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZFxyXG4gIC8vIGFsbG9jYXRpbmcgbWVtb3J5LlxyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtBcnJheS48VmVjdG9yPn1cclxuICAgKi9cclxuICB2YXIgVF9WRUNUT1JTID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7IFRfVkVDVE9SUy5wdXNoKG5ldyBWZWN0b3IoKSk7IH1cclxuXHJcbiAgLy8gQSBwb29sIG9mIGFycmF5cyBvZiBudW1iZXJzIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkIGFsbG9jYXRpbmdcclxuICAvLyBtZW1vcnkuXHJcbiAgLyoqXHJcbiAgICogQHR5cGUge0FycmF5LjxBcnJheS48bnVtYmVyPj59XHJcbiAgICovXHJcbiAgdmFyIFRfQVJSQVlTID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHsgVF9BUlJBWVMucHVzaChbXSk7IH1cclxuXHJcbiAgLy8gVGVtcG9yYXJ5IHJlc3BvbnNlIHVzZWQgZm9yIHBvbHlnb24gaGl0IGRldGVjdGlvbi5cclxuICAvKipcclxuICAgKiBAdHlwZSB7UmVzcG9uc2V9XHJcbiAgICovXHJcbiAgdmFyIFRfUkVTUE9OU0UgPSBuZXcgUmVzcG9uc2UoKTtcclxuXHJcbiAgLy8gVGlueSBcInBvaW50XCIgcG9seWdvbiB1c2VkIGZvciBwb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAgLyoqXHJcbiAgICogQHR5cGUge1BvbHlnb259XHJcbiAgICovXHJcbiAgdmFyIFRFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbiAgLy8gIyMgSGVscGVyIEZ1bmN0aW9uc1xyXG5cclxuICAvLyBGbGF0dGVucyB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHBvaW50cyBvbnRvIGEgdW5pdCB2ZWN0b3IgYXhpcyxcclxuICAvLyByZXN1bHRpbmcgaW4gYSBvbmUgZGltZW5zaW9uYWwgcmFuZ2Ugb2YgdGhlIG1pbmltdW0gYW5kXHJcbiAgLy8gbWF4aW11bSB2YWx1ZSBvbiB0aGF0IGF4aXMuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbm9ybWFsIFRoZSB1bml0IHZlY3RvciBheGlzIHRvIGZsYXR0ZW4gb24uXHJcbiAgICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gcmVzdWx0IEFuIGFycmF5LiAgQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLFxyXG4gICAqICAgcmVzdWx0WzBdIHdpbGwgYmUgdGhlIG1pbmltdW0gdmFsdWUsXHJcbiAgICogICByZXN1bHRbMV0gd2lsbCBiZSB0aGUgbWF4aW11bSB2YWx1ZS5cclxuICAgKi9cclxuICBmdW5jdGlvbiBmbGF0dGVuUG9pbnRzT24ocG9pbnRzLCBub3JtYWwsIHJlc3VsdCkge1xyXG4gICAgdmFyIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICB2YXIgbWF4ID0gLU51bWJlci5NQVhfVkFMVUU7XHJcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XHJcbiAgICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbFxyXG4gICAgICB2YXIgZG90ID0gcG9pbnRzW2ldLmRvdChub3JtYWwpO1xyXG4gICAgICBpZiAoZG90IDwgbWluKSB7IG1pbiA9IGRvdDsgfVxyXG4gICAgICBpZiAoZG90ID4gbWF4KSB7IG1heCA9IGRvdDsgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0WzBdID0gbWluOyByZXN1bHRbMV0gPSBtYXg7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayB3aGV0aGVyIHR3byBjb252ZXggcG9seWdvbnMgYXJlIHNlcGFyYXRlZCBieSB0aGUgc3BlY2lmaWVkXHJcbiAgLy8gYXhpcyAobXVzdCBiZSBhIHVuaXQgdmVjdG9yKS5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYVBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGJQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPn0gYlBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgYXhpcyAodW5pdCBzaXplZCkgdG8gdGVzdCBhZ2FpbnN0LiAgVGhlIHBvaW50cyBvZiBib3RoIHBvbHlnb25zXHJcbiAgICogICB3aWxsIGJlIHByb2plY3RlZCBvbnRvIHRoaXMgYXhpcy5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgQSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB3aGljaCB3aWxsIGJlIHBvcHVsYXRlZFxyXG4gICAqICAgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLFxyXG4gICAqICAgYW5kIGEgcmVzcG9uc2UgaXMgcGFzc2VkIGluLCBpbmZvcm1hdGlvbiBhYm91dCBob3cgbXVjaCBvdmVybGFwIGFuZFxyXG4gICAqICAgdGhlIGRpcmVjdGlvbiBvZiB0aGUgb3ZlcmxhcCB3aWxsIGJlIHBvcHVsYXRlZC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBpc1NlcGFyYXRpbmdBeGlzKGFQb3MsIGJQb3MsIGFQb2ludHMsIGJQb2ludHMsIGF4aXMsIHJlc3BvbnNlKSB7XHJcbiAgICB2YXIgcmFuZ2VBID0gVF9BUlJBWVMucG9wKCk7XHJcbiAgICB2YXIgcmFuZ2VCID0gVF9BUlJBWVMucG9wKCk7XHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBvZmZzZXQgYmV0d2VlbiB0aGUgdHdvIHBvbHlnb25zXHJcbiAgICB2YXIgb2Zmc2V0ViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGJQb3MpLnN1YihhUG9zKTtcclxuICAgIHZhciBwcm9qZWN0ZWRPZmZzZXQgPSBvZmZzZXRWLmRvdChheGlzKTtcclxuICAgIC8vIFByb2plY3QgdGhlIHBvbHlnb25zIG9udG8gdGhlIGF4aXMuXHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYVBvaW50cywgYXhpcywgcmFuZ2VBKTtcclxuICAgIGZsYXR0ZW5Qb2ludHNPbihiUG9pbnRzLCBheGlzLCByYW5nZUIpO1xyXG4gICAgLy8gTW92ZSBCJ3MgcmFuZ2UgdG8gaXRzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIEEuXHJcbiAgICByYW5nZUJbMF0gKz0gcHJvamVjdGVkT2Zmc2V0O1xyXG4gICAgcmFuZ2VCWzFdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgZ2FwLiBJZiB0aGVyZSBpcywgdGhpcyBpcyBhIHNlcGFyYXRpbmcgYXhpcyBhbmQgd2UgY2FuIHN0b3BcclxuICAgIGlmIChyYW5nZUFbMF0gPiByYW5nZUJbMV0gfHwgcmFuZ2VCWzBdID4gcmFuZ2VBWzFdKSB7XHJcbiAgICAgIFRfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQSk7XHJcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBUaGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy4gSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIHZhciBvdmVybGFwID0gMDtcclxuICAgICAgLy8gQSBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQlxyXG4gICAgICBpZiAocmFuZ2VBWzBdIDwgcmFuZ2VCWzBdKSB7XHJcbiAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIEEgZW5kcyBiZWZvcmUgQiBkb2VzLiBXZSBoYXZlIHRvIHB1bGwgQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPCByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XHJcbiAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgdmFyIG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XHJcbiAgICAgICAgICByZXNwb25zZVsnYUluQiddID0gZmFsc2U7XHJcbiAgICAgICAgLy8gQSBpcyBmdWxseSBpbnNpZGUgQi4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgdmFyIG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cclxuICAgICAgdmFyIGFic092ZXJsYXAgPSBNYXRoLmFicyhvdmVybGFwKTtcclxuICAgICAgaWYgKGFic092ZXJsYXAgPCByZXNwb25zZVsnb3ZlcmxhcCddKSB7XHJcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXAnXSA9IGFic092ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXBOJ10uY29weShheGlzKTtcclxuICAgICAgICBpZiAob3ZlcmxhcCA8IDApIHtcclxuICAgICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLnJldmVyc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFRfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xyXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBTQVRbJ2lzU2VwYXJhdGluZ0F4aXMnXSA9IGlzU2VwYXJhdGluZ0F4aXM7XHJcblxyXG4gIC8vIENhbGN1bGF0ZXMgd2hpY2ggVm9yb25vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cclxuICAvLyBJdCBpcyBhc3N1bWVkIHRoYXQgYm90aCB0aGUgbGluZSBhbmQgdGhlIHBvaW50IGFyZSByZWxhdGl2ZSB0byBgKDAsMClgXHJcbiAgLy9cclxuICAvLyAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gIC8vICAgICAoLTEpICBbU10tLS0tLS0tLS0tLS0tLVtFXSAgKDEpXHJcbiAgLy8gICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbGluZSBUaGUgbGluZSBzZWdtZW50LlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXHJcbiAgICogQHJldHVybiAge251bWJlcn0gTEVGVF9WT1JPTk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbixcclxuICAgKiAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gICAqICAgICAgICAgIFJJR0hUX1ZPUk9OT0lfUkVHSU9OICgxKSBpZiBpdCBpcyB0aGUgcmlnaHQgcmVnaW9uLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHZvcm9ub2lSZWdpb24obGluZSwgcG9pbnQpIHtcclxuICAgIHZhciBsZW4yID0gbGluZS5sZW4yKCk7XHJcbiAgICB2YXIgZHAgPSBwb2ludC5kb3QobGluZSk7XHJcbiAgICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBzdGFydCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlXHJcbiAgICAvLyBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gICAgaWYgKGRwIDwgMCkgeyByZXR1cm4gTEVGVF9WT1JPTk9JX1JFR0lPTjsgfVxyXG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGVcclxuICAgIC8vIHJpZ2h0IHZvcm9ub2kgcmVnaW9uLlxyXG4gICAgZWxzZSBpZiAoZHAgPiBsZW4yKSB7IHJldHVybiBSSUdIVF9WT1JPTk9JX1JFR0lPTjsgfVxyXG4gICAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gICAgZWxzZSB7IHJldHVybiBNSURETEVfVk9ST05PSV9SRUdJT047IH1cclxuICB9XHJcbiAgLy8gQ29uc3RhbnRzIGZvciBWb3Jvbm9pIHJlZ2lvbnNcclxuICAvKipcclxuICAgKiBAY29uc3RcclxuICAgKi9cclxuICB2YXIgTEVGVF9WT1JPTk9JX1JFR0lPTiA9IC0xO1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdFxyXG4gICAqL1xyXG4gIHZhciBNSURETEVfVk9ST05PSV9SRUdJT04gPSAwO1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdFxyXG4gICAqL1xyXG4gIHZhciBSSUdIVF9WT1JPTk9JX1JFR0lPTiA9IDE7XHJcblxyXG4gIC8vICMjIENvbGxpc2lvbiBUZXN0c1xyXG5cclxuICAvLyBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYyBUaGUgY2lyY2xlIHRvIHRlc3QuXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUsIGZhbHNlIGlmIGl0IGlzIG5vdC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBwb2ludEluQ2lyY2xlKHAsIGMpIHtcclxuICAgIHZhciBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KHApLnN1YihjWydwb3MnXSk7XHJcbiAgICB2YXIgcmFkaXVzU3EgPSBjWydyJ10gKiBjWydyJ107XHJcbiAgICB2YXIgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmFkaXVzIHRoZW4gdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlLlxyXG4gICAgcmV0dXJuIGRpc3RhbmNlU3EgPD0gcmFkaXVzU3E7XHJcbiAgfVxyXG4gIFNBVFsncG9pbnRJbkNpcmNsZSddID0gcG9pbnRJbkNpcmNsZTtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjb252ZXggcG9seWdvbi5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHkgVGhlIHBvbHlnb24gdG8gdGVzdC5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIHBvbHlnb24sIGZhbHNlIGlmIGl0IGlzIG5vdC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBwb2ludEluUG9seWdvbihwLCBwb2x5KSB7XHJcbiAgICBURVNUX1BPSU5UWydwb3MnXS5jb3B5KHApO1xyXG4gICAgVF9SRVNQT05TRS5jbGVhcigpO1xyXG4gICAgdmFyIHJlc3VsdCA9IHRlc3RQb2x5Z29uUG9seWdvbihURVNUX1BPSU5ULCBwb2x5LCBUX1JFU1BPTlNFKTtcclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgcmVzdWx0ID0gVF9SRVNQT05TRVsnYUluQiddO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgU0FUWydwb2ludEluUG9seWdvbiddID0gcG9pbnRJblBvbHlnb247XHJcblxyXG4gIC8vIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZlxyXG4gICAqICAgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVDaXJjbGUoYSwgYiwgcmVzcG9uc2UpIHtcclxuICAgIC8vIENoZWNrIGlmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXJzIG9mIHRoZSB0d29cclxuICAgIC8vIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cclxuICAgIHZhciBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGJbJ3BvcyddKS5zdWIoYVsncG9zJ10pO1xyXG4gICAgdmFyIHRvdGFsUmFkaXVzID0gYVsnciddICsgYlsnciddO1xyXG4gICAgdmFyIHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xyXG4gICAgdmFyIGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgYmlnZ2VyIHRoYW4gdGhlIGNvbWJpbmVkIHJhZGl1cywgdGhleSBkb24ndCBpbnRlcnNlY3QuXHJcbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcclxuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICB2YXIgZGlzdCA9IE1hdGguc3FydChkaXN0YW5jZVNxKTtcclxuICAgICAgcmVzcG9uc2VbJ2EnXSA9IGE7XHJcbiAgICAgIHJlc3BvbnNlWydiJ10gPSBiO1xyXG4gICAgICByZXNwb25zZVsnb3ZlcmxhcCddID0gdG90YWxSYWRpdXMgLSBkaXN0O1xyXG4gICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcclxuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShkaWZmZXJlbmNlVikuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XHJcbiAgICAgIHJlc3BvbnNlWydhSW5CJ109IGFbJ3InXSA8PSBiWydyJ10gJiYgZGlzdCA8PSBiWydyJ10gLSBhWydyJ107XHJcbiAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBiWydyJ10gPD0gYVsnciddICYmIGRpc3QgPD0gYVsnciddIC0gYlsnciddO1xyXG4gICAgfVxyXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIFNBVFsndGVzdENpcmNsZUNpcmNsZSddID0gdGVzdENpcmNsZUNpcmNsZTtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgYSBwb2x5Z29uIGFuZCBhIGNpcmNsZSBjb2xsaWRlLlxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcclxuICAgKiAgIHRoZXkgaW50ZXJzZXQuXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cclxuICAgKi9cclxuICBmdW5jdGlvbiB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKSB7XHJcbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHBvbHlnb24uXHJcbiAgICB2YXIgY2lyY2xlUG9zID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoY2lyY2xlWydwb3MnXSkuc3ViKHBvbHlnb25bJ3BvcyddKTtcclxuICAgIHZhciByYWRpdXMgPSBjaXJjbGVbJ3InXTtcclxuICAgIHZhciByYWRpdXMyID0gcmFkaXVzICogcmFkaXVzO1xyXG4gICAgdmFyIHBvaW50cyA9IHBvbHlnb25bJ2NhbGNQb2ludHMnXTtcclxuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG4gICAgdmFyIGVkZ2UgPSBUX1ZFQ1RPUlMucG9wKCk7XHJcbiAgICB2YXIgcG9pbnQgPSBUX1ZFQ1RPUlMucG9wKCk7XHJcblxyXG4gICAgLy8gRm9yIGVhY2ggZWRnZSBpbiB0aGUgcG9seWdvbjpcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgdmFyIG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xyXG4gICAgICB2YXIgcHJldiA9IGkgPT09IDAgPyBsZW4gLSAxIDogaSAtIDE7XHJcbiAgICAgIHZhciBvdmVybGFwID0gMDtcclxuICAgICAgdmFyIG92ZXJsYXBOID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgZWRnZS5cclxuICAgICAgZWRnZS5jb3B5KHBvbHlnb25bJ2VkZ2VzJ11baV0pO1xyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cclxuICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbaV0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnRcclxuICAgICAgLy8gaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW5cclxuICAgICAgLy8gdGhlIGNpcmNsZS5cclxuICAgICAgaWYgKHJlc3BvbnNlICYmIHBvaW50LmxlbjIoKSA+IHJhZGl1czIpIHtcclxuICAgICAgICByZXNwb25zZVsnYUluQiddID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXHJcbiAgICAgIHZhciByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuICAgICAgLy8gSWYgaXQncyB0aGUgbGVmdCByZWdpb246XHJcbiAgICAgIGlmIChyZWdpb24gPT09IExFRlRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgUklHSFRfVk9ST05PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXHJcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb25bJ2VkZ2VzJ11bcHJldl0pO1xyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBwcmV2aW91cyBlZGdlXHJcbiAgICAgICAgdmFyIHBvaW50MiA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XHJcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xyXG4gICAgICAgIGlmIChyZWdpb24gPT09IFJJR0hUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICB2YXIgZGlzdCA9IHBvaW50LmxlbigpO1xyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50Mik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG4gICAgICAvLyBJZiBpdCdzIHRoZSByaWdodCByZWdpb246XHJcbiAgICAgIH0gZWxzZSBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBsZWZ0IHJlZ2lvbiBvbiB0aGUgbmV4dCBlZGdlXHJcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb25bJ2VkZ2VzJ11bbmV4dF0pO1xyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXHJcbiAgICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbbmV4dF0pO1xyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG4gICAgICAgIGlmIChyZWdpb24gPT09IExFRlRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cclxuICAgICAgICAgIHZhciBkaXN0ID0gcG9pbnQubGVuKCk7XHJcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiB0aGUgY2lyY2xlIGlzIGludGVyc2VjdGluZyB0aGUgZWRnZSxcclxuICAgICAgICAvLyBDaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxyXG4gICAgICAgIHZhciBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGVcclxuICAgICAgICAvLyBjaXJjbGUgYW5kIHRoZSBlZGdlLlxyXG4gICAgICAgIHZhciBkaXN0ID0gcG9pbnQuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgdmFyIGRpc3RBYnMgPSBNYXRoLmFicyhkaXN0KTtcclxuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcclxuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgb3ZlcmxhcE4gPSBub3JtYWw7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuICAgICAgICAgIC8vIElmIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgb3IgcGFydCBvZiB0aGVcclxuICAgICAgICAgIC8vIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSwgdGhlIGNpcmNsZSBpcyBub3QgZnVsbHkgaW5zaWRlIHRoZSBwb2x5Z29uLlxyXG4gICAgICAgICAgaWYgKGRpc3QgPj0gMCB8fCBvdmVybGFwIDwgMiAqIHJhZGl1cykge1xyXG4gICAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuXHJcbiAgICAgIC8vIChvdmVybGFwTiBtYXkgYmUgbnVsbCBpZiB0aGUgY2lyY2xlIHdhcyBpbiB0aGUgd3JvbmcgVm9yb25vaSByZWdpb24pLlxyXG4gICAgICBpZiAob3ZlcmxhcE4gJiYgcmVzcG9uc2UgJiYgTWF0aC5hYnMob3ZlcmxhcCkgPCBNYXRoLmFicyhyZXNwb25zZVsnb3ZlcmxhcCddKSkge1xyXG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwJ10gPSBvdmVybGFwO1xyXG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLmNvcHkob3ZlcmxhcE4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBwb2x5Z29uO1xyXG4gICAgICByZXNwb25zZVsnYiddID0gY2lyY2xlO1xyXG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5jb3B5KHJlc3BvbnNlWydvdmVybGFwTiddKS5zY2FsZShyZXNwb25zZVsnb3ZlcmxhcCddKTtcclxuICAgIH1cclxuICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBTQVRbJ3Rlc3RQb2x5Z29uQ2lyY2xlJ10gPSB0ZXN0UG9seWdvbkNpcmNsZTtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgYSBjaXJjbGUgYW5kIGEgcG9seWdvbiBjb2xsaWRlLlxyXG4gIC8vXHJcbiAgLy8gKipOT1RFOioqIFRoaXMgaXMgc2xpZ2h0bHkgbGVzcyBlZmZpY2llbnQgdGhhbiBwb2x5Z29uQ2lyY2xlIGFzIGl0IGp1c3RcclxuICAvLyBydW5zIHBvbHlnb25DaXJjbGUgYW5kIHJldmVyc2VzIGV2ZXJ5dGhpbmcgYXQgdGhlIGVuZC5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXHJcbiAgICogICB0aGV5IGludGVyc2V0LlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhleSBpbnRlcnNlY3QsIGZhbHNlIGlmIHRoZXkgZG9uJ3QuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdGVzdENpcmNsZVBvbHlnb24oY2lyY2xlLCBwb2x5Z29uLCByZXNwb25zZSkge1xyXG4gICAgLy8gVGVzdCB0aGUgcG9seWdvbiBhZ2FpbnN0IHRoZSBjaXJjbGUuXHJcbiAgICB2YXIgcmVzdWx0ID0gdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XHJcbiAgICBpZiAocmVzdWx0ICYmIHJlc3BvbnNlKSB7XHJcbiAgICAgIC8vIFN3YXAgQSBhbmQgQiBpbiB0aGUgcmVzcG9uc2UuXHJcbiAgICAgIHZhciBhID0gcmVzcG9uc2VbJ2EnXTtcclxuICAgICAgdmFyIGFJbkIgPSByZXNwb25zZVsnYUluQiddO1xyXG4gICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5yZXZlcnNlKCk7XHJcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLnJldmVyc2UoKTtcclxuICAgICAgcmVzcG9uc2VbJ2EnXSA9IHJlc3BvbnNlWydiJ107XHJcbiAgICAgIHJlc3BvbnNlWydiJ10gPSBhO1xyXG4gICAgICByZXNwb25zZVsnYUluQiddID0gcmVzcG9uc2VbJ2JJbkEnXTtcclxuICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGFJbkI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBTQVRbJ3Rlc3RDaXJjbGVQb2x5Z29uJ10gPSB0ZXN0Q2lyY2xlUG9seWdvbjtcclxuXHJcbiAgLy8gQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZlxyXG4gICAqICAgdGhleSBpbnRlcnNldC5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHRlc3RQb2x5Z29uUG9seWdvbihhLCBiLCByZXNwb25zZSkge1xyXG4gICAgdmFyIGFQb2ludHMgPSBhWydjYWxjUG9pbnRzJ107XHJcbiAgICB2YXIgYUxlbiA9IGFQb2ludHMubGVuZ3RoO1xyXG4gICAgdmFyIGJQb2ludHMgPSBiWydjYWxjUG9pbnRzJ107XHJcbiAgICB2YXIgYkxlbiA9IGJQb2ludHMubGVuZ3RoO1xyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcclxuICAgICAgaWYgKGlzU2VwYXJhdGluZ0F4aXMoYVsncG9zJ10sIGJbJ3BvcyddLCBhUG9pbnRzLCBiUG9pbnRzLCBhWydub3JtYWxzJ11baV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQiBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yICh2YXIgaSA9IDA7aSA8IGJMZW47IGkrKykge1xyXG4gICAgICBpZiAoaXNTZXBhcmF0aW5nQXhpcyhhWydwb3MnXSwgYlsncG9zJ10sIGFQb2ludHMsIGJQb2ludHMsIGJbJ25vcm1hbHMnXVtpXSwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBTaW5jZSBub25lIG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBvciBCIGFyZSBhIHNlcGFyYXRpbmcgYXhpcywgdGhlcmUgaXMgYW4gaW50ZXJzZWN0aW9uXHJcbiAgICAvLyBhbmQgd2UndmUgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZSBzbWFsbGVzdCBvdmVybGFwIChpbiBpc1NlcGFyYXRpbmdBeGlzKS4gIENhbGN1bGF0ZSB0aGVcclxuICAgIC8vIGZpbmFsIG92ZXJsYXAgdmVjdG9yLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBhO1xyXG4gICAgICByZXNwb25zZVsnYiddID0gYjtcclxuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShyZXNwb25zZVsnb3ZlcmxhcE4nXSkuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgU0FUWyd0ZXN0UG9seWdvblBvbHlnb24nXSA9IHRlc3RQb2x5Z29uUG9seWdvbjtcclxuXHJcbiAgcmV0dXJuIFNBVDtcclxufSkpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIEdhbWVHcmFwaGljcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIHRpbWVTdGVwIFRoZSB3YWl0IHRpbWUgYmV0d2VlbiBydW5uaW5nIHRoZSBhY3Rpb24gKGluIG1zKS5cclxuICAgICAqIG51bVRpbWVzIFRoZSBudW1iZXIgdG8gdGltZXMgdG8gcnVuIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHJlcGVhdEFjdGlvbih0aW1lU3RlcCwgbnVtVGltZXMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCBudW0gPSAwO1xyXG4gICAgICAgIGxldCB0aGVBbmltYXRpb24gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG51bSsrID4gbnVtVGltZXMpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhlQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aW1lU3RlcCk7XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcbi8qIGdsb2JhbHMgY2FudmFzLCBjdHggKi9cclxuXHJcbmNsYXNzIEdhbWVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMgPSB7XHJcbiAgICAgICAgICAgIGJnQ29sb3I6ICcjY2NjJ1xyXG4gICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhlbihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucHJpdmF0ZXMuYmdDb2xvcjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0JztcclxuLyogZ2xvYmFscyBnYW1lLCBjYW52YXMsIGN0eCwgS2V5Q29kZSAqL1xyXG5cclxuY2xhc3MgVGl0bGVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy5jdGEgPSAnUHJlc3MgRW50ZXInO1xyXG5cclxuICAgICAgICB0aGlzLnByaXZhdGVzID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGVuKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMucHJpdmF0ZXMudGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuRU5URVIpIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGN0eC5mb250ID0gJzM2cHggQXJpYWwnO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMudGl0bGUsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGhpcy50aXRsZSkud2lkdGggLyAyLCAxMDApO1xyXG5cclxuICAgICAgICBjdHguZm9udCA9ICcyNHB4IEFyaWFsJztcclxuICAgICAgICBjdHguZmlsbFRleHQodGhpcy5jdGEsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGhpcy5jdGEpLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIpO1xyXG4gICAgfVxyXG59IiwiLyogZ2xvYmFscyBHYW1lU2F2ZSwgY2FudmFzLCBjdHgsIEtleUNvZGUsIGdhbWUgKi9cclxuXHJcbmNsYXNzIEdhbWVTYXZlVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gJ1NlbGVjdCBhIHNhdmUgc2xvdCc7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IEdhbWVTYXZlKCk7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gdGhpcy5zdG9yYWdlLmdldExpc3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcml2YXRlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoZW4oY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmFycm93ID0ge1xyXG4gICAgICAgICAgICBpbWc6ICc+PicsXHJcbiAgICAgICAgICAgIHNsb3Q6IDAsXHJcbiAgICAgICAgICAgIHg6IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGhpcy5saXN0WzBdKS53aWR0aCAvIDIgLSA2MCwgICAgLy8gVE9ETzogbWFrZSBpbnN0YW5jZSB2YXI/P1xyXG4gICAgICAgICAgICB5OiAyMDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkVTQykge1xyXG4gICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcclxuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayhLZXlDb2RlLkVTQyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FTlRFUikge1xyXG4gICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgY29uc3QgZCA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBjb25zdCB0ID0gZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlKHRoaXMuYXJyb3cuc2xvdCwgYCR7bX0vJHtkfS8ke3l9ICR7dH1gKTtcclxuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayhLZXlDb2RlLkVOVEVSKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkRFTEVURSkge1xyXG4gICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IHRoaXMuc3RvcmFnZS5lcmFzZSh0aGlzLmFycm93LnNsb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuYXJyb3cuc2xvdCAhPT0gMiAmJiBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkRPV04pIHtcclxuICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XHJcblxyXG4gICAgICAgICAgICArK3RoaXMuYXJyb3cuc2xvdDtcclxuICAgICAgICAgICAgdGhpcy5hcnJvdy54ID0gY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aGlzLmxpc3RbdGhpcy5hcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyb3cueSArPSA4MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmFycm93LnNsb3QgIT09IDAgJiYgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5VUCkge1xyXG4gICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcclxuXHJcbiAgICAgICAgICAgIC0tdGhpcy5hcnJvdy5zbG90O1xyXG4gICAgICAgICAgICB0aGlzLmFycm93LnggPSBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KHRoaXMubGlzdFt0aGlzLmFycm93LnNsb3RdKS53aWR0aCAvIDIgLSA2MDtcclxuICAgICAgICAgICAgdGhpcy5hcnJvdy55IC09IDgwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMTExJztcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY3R4LmZvbnQgPSAnMzZweCBBcmlhbCc7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcclxuICAgICAgICBjdHguZmlsbFRleHQodGhpcy50aXRsZSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aGlzLnRpdGxlKS53aWR0aCAvIDIsIDgwKTtcclxuXHJcbiAgICAgICAgY3R4LmZvbnQgPSAnMjRweCBBcmlhbCc7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubGlzdFtpXSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aGlzLmxpc3RbaV0pLndpZHRoIC8gMiwgMjAwICsgaSAqIDgwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmFycm93LmltZywgdGhpcy5hcnJvdy54LCB0aGlzLmFycm93LnkpO1xyXG4gICAgfVxyXG59IiwiLyogZ2xvYmFscyBTQVQgKi9cclxuXHJcbmNsYXNzIExldmVsVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGN1ckx2bCkge1xyXG4gICAgICAgIHRoaXMub25VcGRhdGVTZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uUmVuZGVyU2V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMgPSB7fTtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLmN1ckx2bCA9IGN1ckx2bDtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhlbihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJMdmwudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoZWNrQ29sbGlzaW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLm9uVXBkYXRlU2V0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uVXBkYXRlID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHRoaXMuY3VyTHZsLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVuZGVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5vblJlbmRlclNldCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblJlbmRlciA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja0NvbGxpc2lvbigpIHtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5pbnZpbmNpYmxlKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyLmludmluY2libGVUaW1lci0tID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5pbnZpbmNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5pbnZpbmNpYmxlVGltZXIgPSAxMjA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmN1ckx2bC5wcm9qZWN0aWxlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb2xsaWRlZCA9IFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wbGF5ZXIsIHRoaXMuY3VyTHZsLnByb2plY3RpbGVzW2ldKTtcclxuICAgICAgICAgICAgaWYoY29sbGlkZWQpIHtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5wbGF5ZXIuaHA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5pbnZpbmNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLyogZ2xvYmFscyBTQVQsIGNhbnZhcywgY3R4ICovXHJcblxyXG5jbGFzcyBMZXZlbDEge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdGlsZSA9IG5ldyBTQVQuQm94KG5ldyBTQVQuVmVjdG9yKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCkgKyAwKSwgLy8gcmFuZG9tIG51bWJlciBiZXR3ZWVuIDAgYW5kIGNhbnZhcy53aWR0aFxyXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodFxyXG4gICAgICAgICAgICApLCAxMCwgMjApLnRvUG9seWdvbigpO1xyXG5cclxuICAgICAgICAgICAgcHJvamVjdGlsZS5zcGVlZCA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAzKSAqIDAuMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaChwcm9qZWN0aWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RpbGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXNbaV0ucG9zLnkgLT0gdGhpcy5wcm9qZWN0aWxlc1tpXS5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIGJhY2tncm91bmRcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBwcm9qZWN0aWxlc1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnc2lsdmVyJztcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0aWxlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wcm9qZWN0aWxlc1tpXS5wb3MueCwgdGhpcy5wcm9qZWN0aWxlc1tpXS5wb3MueSwgMTAsIDIwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKiBnbG9iYWxzIFNBVCwgS2V5Q29kZSwgZ2FtZSwgY3R4ICovXHJcblxyXG5jbGFzcyBWYW1wIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSA0O1xyXG4gICAgICAgIHRoaXMudyA9IDQwO1xyXG4gICAgICAgIHRoaXMuaCA9IDQwO1xyXG4gICAgICAgIHRoaXMuaHAgPSAzO1xyXG4gICAgICAgIHRoaXMuaW52aW5jaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW52aW5jaWJsZVRpbWVyID0gMTIwO1xyXG4gICAgICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG5ldyBTQVQuQm94KG5ldyBTQVQuVmVjdG9yKDAsIDApLCB0aGlzLncsIHRoaXMuaCkudG9Qb2x5Z29uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICAvLyBob3Jpem9udGFsXHJcbiAgICAgICAgaWYoZ2FtZS5pbnB1dC5rZXlzRG93bltLZXlDb2RlLlJJR0hUXSl7XHJcbiAgICAgICAgICAgIHRoaXMucG9zLnggKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0LmtleXNEb3duW0tleUNvZGUuTEVGVF0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3MueCAtPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVydGljYWxcclxuICAgICAgICBpZihnYW1lLmlucHV0LmtleXNEb3duW0tleUNvZGUuVVBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zLnkgLT0gdGhpcy5zcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0LmtleXNEb3duW0tleUNvZGUuRE9XTl0pIHtcclxuICAgICAgICAgICAgdGhpcy5wb3MueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5ocCA8PSAwICYmICF0aGlzLmRlYWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYWxlcnQoJ1lvdSBkaWVkJyk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYodGhpcy5kZWFkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGJvZHlcclxuICAgICAgICBsZXQgZG9EcmF3ID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGlzLmludmluY2libGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdCA9IHRoaXMuaW52aW5jaWJsZVRpbWVyICUgMzA7XHJcbiAgICAgICAgICAgIGlmKHQgPj0gMCAmJiB0IDwgMTUpIHtcclxuICAgICAgICAgICAgICAgIGRvRHJhdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihkb0RyYXcpIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd5ZWxsb3cnO1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53LCB0aGlzLmgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaGVhbHRoXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmhwOyArK2kpIHtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLnggLSAxMCArIGkqMjAsIHRoaXMucG9zLnkgLSAyMCwgMjAsIDEwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcbi8qIGdsb2JhbHMgZ2FtZSwgR2FtZUVuZ2luZSwgVGl0bGVWaWV3LCBLZXlDb2RlLCBWYW1wLCBMZXZlbDEsIExldmVsVmlldywgR2FtZVNhdmVWaWV3ICovXHJcblxyXG4oKCkgPT4ge1xyXG4gICAgd2luZG93LmdhbWUgPSBuZXcgR2FtZUVuZ2luZSgpO1xyXG5cclxuICAgIGxldCB0aXRsZVZpZXcgPSBuZXcgVGl0bGVWaWV3KCdWYW1wOiBUaGUgR3JlYXQgYW5kIFBvd2VyZnVsJywgdHJ1ZSk7XHJcbiAgICBsZXQgc2F2ZVZpZXcgPSBuZXcgR2FtZVNhdmVWaWV3KCk7XHJcblxyXG4gICAgY29uc3QgdmFtcCA9IG5ldyBWYW1wKCk7XHJcbiAgICBjb25zdCBsdmwxID0gbmV3IExldmVsMSgpO1xyXG4gICAgY29uc3QgbHZsVmlldyA9IG5ldyBMZXZlbFZpZXcodmFtcCwgbHZsMSk7XHJcblxyXG4gICAgdGl0bGVWaWV3LnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGdhbWUudXRpbHMuc3dpdGNoVmlldyhzYXZlVmlldyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzYXZlVmlldy50aGVuKGtleSA9PiB7XHJcbiAgICAgICAgaWYoa2V5ID09PSBLZXlDb2RlLkVTQykge1xyXG4gICAgICAgICAgICBnYW1lLnV0aWxzLnN3aXRjaFZpZXcodGl0bGVWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihrZXkgPT09IEtleUNvZGUuRU5URVIpIHtcclxuICAgICAgICAgICAgZ2FtZS51dGlscy5zd2l0Y2hWaWV3KGx2bFZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWUudmlldyA9IHRpdGxlVmlldztcclxufSkoKTsiXX0=
