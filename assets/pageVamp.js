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
        backBtn.className = 'btnBack';
        document.body.appendChild(backBtn);

        // canvas wrap
        let wrap = document.createElement('div');
        wrap.className = 'canvasWrap';

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

function GameUtils(gEngine) {
    return {
        /*
         * Resets the newView's private variables.
         * Changes the view.
         */
        switchView: function(newView) {
            newView.init();
            gEngine.view = newView;
        }
    };
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

function GameView() {
    this.privates = {
        bgColor: '#ccc'
    };

    this.init();
}

GameView.prototype = (function() {

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
'use strict';
/* globals game, canvas, ctx, KeyCode */

/*
 *  Implements GameView.
 */
function TitleView(title) {
    this.privates = {
        title: title
    };

    this.init();
}

TitleView.prototype = (function() {
    let title,
        cta = 'Press Enter'
    ;

    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            title = this.privates.title;
        },

        update: function() {
            if(game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
        },

        render: () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '36px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 100);

            ctx.font = '24px Arial';
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
})();
/* globals GameSave, canvas, ctx, KeyCode, game */

function GameSaveView() {
    this.privates = {};
    this.init();
}

GameSaveView.prototype = (function() {
    let that,
        title = 'Select a save slot',
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
                img: '>>',
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

                const date = new Date();
                const m = date.getMonth() + 1;
                const d = date.getDate();
                const y = date.getFullYear();
                const t = date.toLocaleTimeString();

                storage.save(arrow.slot, `${m}/${d}/${y} ${t}`);
                this.privates.callback(KeyCode.ENTER);
            }
            else if(game.input.lastKeyDown === KeyCode.DELETE) {
                game.input.lastKeyDown = KeyCode.EMPTY;

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
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '36px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 80);

            ctx.font = '24px Arial';

            for(let i = 0; i < list.length; ++i) {
                ctx.fillText(list[i], canvas.width / 2 - ctx.measureText(list[i]).width / 2, 200 + i * 80);
            }

            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();
/* globals SAT */

function LevelView(player, curLvl) {
    this.privates = {};
    this.player = player;
    this.curLvl = curLvl;

    this.init();
}

LevelView.prototype = (function() {
    let that,
        onUpdateSet = false,
        onRenderSet = false
    ;

    function checkCollision() {
        if(that.player.invincible) {
            if(that.player.invincibleTimer-- === 0) {
                that.player.invincible = false;
                that.player.invincibleTimer = 120;
            }

            return;
        }

        for(var i = 0; i < that.curLvl.projectiles.length; ++i) {
            var collided = SAT.testPolygonPolygon(that.player, that.curLvl.projectiles[i]);
            if(collided) {
                --that.player.hp;
                that.player.invincible = true;
                break;
            }
        }
    }


    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            that = this;
        },

        update: function() {
            this.curLvl.update();
            this.player.update();

            checkCollision();
        },

        onUpdate: function(callback) {
            onUpdateSet = true;
            this.onUpdate = callback;
        },

        render: function () {
            this.curLvl.render();
            this.player.render();
        },

        onRender: function(callback) {
            onRenderSet = true;
            this.onRender = callback;
        }
    };
})();
/* globals SAT, canvas, ctx */

function Level1() {
    this.init();
}

Level1.prototype = (function() {


    return {
        projectiles: [],

        init: function() {
            for(var i = 0; i < 10; ++i) {
                var projectile = new SAT.Box(new SAT.Vector(
                    Math.floor((Math.random() * canvas.width) + 0), // random number between 0 and canvas.width
                    canvas.height
                ), 10, 20).toPolygon();

                projectile.speed = Math.floor((Math.random() * 10) + 3) * 0.1;

                this.projectiles.push(projectile);
            }
        },

        update: function() {
            for(let i = 0; i < this.projectiles.length; ++i) {
                this.projectiles[i].pos.y -= this.projectiles[i].speed;
            }
        },

        render: function() {
            // background
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // projectiles
            ctx.fillStyle = 'silver';
            for(let i = 0; i < this.projectiles.length; ++i) {
                ctx.fillRect(this.projectiles[i].pos.x, this.projectiles[i].pos.y, 10, 20);
            }
        }
    };
})();
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

        $.extend(this, new SAT.Box(new SAT.Vector(0, 0), this.w, this.h).toPolygon());
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVFbmdpbmUuanMiLCJHYW1lU2F2ZS5qcyIsIkdhbWVJbnB1dC5qcyIsIkdhbWVVdGlscy5qcyIsIlNBVC5qcyIsIkdhbWVHcmFwaGljcy5qcyIsIkdhbWVWaWV3LmpzIiwiVGl0bGVWaWV3LmpzIiwiR2FtZVNhdmVWaWV3LmpzIiwiTGV2ZWxWaWV3LmpzIiwibGV2ZWwxLmpzIiwidmFtcC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBhZ2VWYW1wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFscyBjYW52YXMsIEdhbWVJbnB1dCwgR2FtZUdyYXBoaWNzLCBHYW1lVXRpbHMsIEdhbWVWaWV3ICovXG5cbmNsYXNzIEdhbWVFbmdpbmUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGUsIDEwMDAgLyA2MCk7XG4gICAgICAgIHRoaXMucmVuZGVyUkFGID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKTtcblxuICAgICAgICB0aGlzLm9uVXBkYXRlU2V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25SZW5kZXJTZXQgPSBmYWxzZTtcblxuICAgICAgICAvLyBiYWNrIGJ1dHRvblxuICAgICAgICBsZXQgYmFja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgYmFja0J0bi5ocmVmID0gJy8jZ2FtZXMnO1xuICAgICAgICBiYWNrQnRuLmlubmVyVGV4dCA9ICdCYWNrJztcbiAgICAgICAgYmFja0J0bi5jbGFzc05hbWUgPSAnYnRuQmFjayc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmFja0J0bik7XG5cbiAgICAgICAgLy8gY2FudmFzIHdyYXBcbiAgICAgICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd3JhcC5jbGFzc05hbWUgPSAnY2FudmFzV3JhcCc7XG5cbiAgICAgICAgLy8gY2FudmFzXG4gICAgICAgIHdpbmRvdy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxNiAqIDYzKTtcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgOSAqIDYzKTtcbiAgICAgICAgd3JhcC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXApO1xuXG4gICAgICAgIHdpbmRvdy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IEdhbWVJbnB1dCgpO1xuICAgICAgICB0aGlzLmdyYXBoaWNzID0gbmV3IEdhbWVHcmFwaGljcygpO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR2FtZVZpZXcoKTtcbiAgICAgICAgdGhpcy51dGlscyA9IG5ldyBHYW1lVXRpbHModGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnZpZXcudXBkYXRlKCk7XG5cbiAgICAgICAgaWYodGhpcy5vblVwZGF0ZVNldCkge1xuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLnJlbmRlclJBRiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlcik7XG4gICAgICAgIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgICAgICBpZih0aGlzLm9uUmVuZGVyU2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwZGF0ZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9uVXBkYXRlU2V0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub25SZW5kZXJTZXQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uUmVuZGVyID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJSQUYpO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEdhbWVTYXZlIHtcbiAgICBsb2FkKHNsb3QpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtgc2xvdCAke3Nsb3R9YF07XG4gICAgfVxuXG4gICAgZ2V0TGlzdCgpIHtcbiAgICAgICAgY29uc3QgemVybyA9IHRoaXMubG9hZCgwKSxcbiAgICAgICAgICAgIG9uZSA9IHRoaXMubG9hZCgxKSxcbiAgICAgICAgICAgIHR3byA9IHRoaXMubG9hZCgyKSxcbiAgICAgICAgICAgIGRlZiA9ICctLS0nXG4gICAgICAgIDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKHR5cGVvZih6ZXJvKSAhPT0gJ3VuZGVmaW5lZCcpID8gemVybyA6IGRlZixcbiAgICAgICAgICAgICh0eXBlb2Yob25lKSAhPT0gJ3VuZGVmaW5lZCcpID8gb25lIDogZGVmLFxuICAgICAgICAgICAgKHR5cGVvZih0d28pICE9PSAndW5kZWZpbmVkJykgPyB0d28gOiBkZWZcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBzYXZlKHNsb3QsIGRhdGEpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlW2BzbG90ICR7c2xvdH1gXSA9IGRhdGE7XG4gICAgfVxuXG4gICAgZXJhc2Uoc2xvdCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgc2xvdCAke3Nsb3R9YCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExpc3QoKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEtleUNvZGUgPSB7XG5cdEVNUFRZOiAtMSxcblx0RU5URVI6IDEzLFxuXHRDVFJMOiAxNyxcblx0RVNDOiAyNyxcblx0U1BBQ0VCQVI6IDMyLFxuXHRMRUZUOiAzNyxcblx0VVA6IDM4LFxuXHRSSUdIVDogMzksXG5cdERPV046IDQwLFxuXHRERUxFVEU6IDQ2LFxuXHRBOiA2NSxcblx0RDogNjgsXG5cdEY6IDcwLFxuXHRIOiA3Mixcblx0SjogNzQsXG5cdEs6IDc1LFxuXHRNOiA3Nyxcblx0TzogNzksXG5cdFI6IDgyLFxuXHRTOiA4Myxcblx0VzogODdcbn07XG5cbmxldCBLZXlDb2RlTmFtZXMgPSB7fTtcbktleUNvZGVOYW1lc1stMV0gPSAnRU1QVFknO1xuS2V5Q29kZU5hbWVzWzEzXSA9ICdFTlRFUic7XG5LZXlDb2RlTmFtZXNbMTddID0gJ0NUUkwnO1xuS2V5Q29kZU5hbWVzWzI3XSA9ICdFU0MnO1xuS2V5Q29kZU5hbWVzWzMyXSA9ICdTUEFDRUJBUic7XG5LZXlDb2RlTmFtZXNbMzddID0gJ0xFRlQnO1xuS2V5Q29kZU5hbWVzWzM4XSA9ICdVUCc7XG5LZXlDb2RlTmFtZXNbMzldID0gJ1JJR0hUJztcbktleUNvZGVOYW1lc1s0MF0gPSAnRE9XTic7XG5LZXlDb2RlTmFtZXNbNDZdID0gJ0RFTEVURSc7XG5LZXlDb2RlTmFtZXNbNjVdID0gJ0EnO1xuS2V5Q29kZU5hbWVzWzY4XSA9ICdEJztcbktleUNvZGVOYW1lc1s3MF0gPSAnRic7XG5LZXlDb2RlTmFtZXNbNzJdID0gJ0gnO1xuS2V5Q29kZU5hbWVzWzc0XSA9ICdKJztcbktleUNvZGVOYW1lc1s3NV0gPSAnSyc7XG5LZXlDb2RlTmFtZXNbNzddID0gJ00nO1xuS2V5Q29kZU5hbWVzWzc5XSA9ICdPJztcbktleUNvZGVOYW1lc1s4Ml0gPSAnUic7XG5LZXlDb2RlTmFtZXNbODNdID0gJ1MnO1xuS2V5Q29kZU5hbWVzWzg3XSA9ICdXJztcblxuY2xhc3MgR2FtZUlucHV0IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5rZXlzRG93biA9IHt9O1xuXHRcdHRoaXMubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG5cdFx0bGV0IGxhc3RLZXlVcCA9IEtleUNvZGUuRU1QVFk7XG5cblx0XHRhZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG5cdFx0XHRjb25zdCBrZXkgPSB0aGlzLmZpeEtleShlLmtleUNvZGUpO1xuXG5cdFx0XHRpZighdGhpcy5rZXlzRG93bltrZXldKSB7XG5cdFx0XHRcdHRoaXMubGFzdEtleURvd24gPSBrZXk7XG5cdFx0XHRcdHRoaXMua2V5c0Rvd25ba2V5XSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRhZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xuXHRcdFx0bGFzdEtleVVwID0gdGhpcy5maXhLZXkoZS5rZXlDb2RlKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmtleXNEb3duW2xhc3RLZXlVcF07XG5cdFx0fSk7XG5cdH1cblxuXHRmaXhLZXkoa2V5KSB7XG5cdFx0aWYoa2V5ID09PSBLZXlDb2RlLlcpIHtcblx0XHRcdGtleSA9IEtleUNvZGUuVVA7XG5cdFx0fVxuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLlMpIHtcblx0XHRcdGtleSA9IEtleUNvZGUuRE9XTjtcblx0XHR9XG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuRCkge1xuXHRcdFx0a2V5ID0gS2V5Q29kZS5SSUdIVDtcblx0XHR9XG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuQSkge1xuXHRcdFx0a2V5ID0gS2V5Q29kZS5MRUZUO1xuXHRcdH1cblxuXHRcdHJldHVybiBrZXk7XG5cdH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEdhbWVVdGlscyhnRW5naW5lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLypcbiAgICAgICAgICogUmVzZXRzIHRoZSBuZXdWaWV3J3MgcHJpdmF0ZSB2YXJpYWJsZXMuXG4gICAgICAgICAqIENoYW5nZXMgdGhlIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICBzd2l0Y2hWaWV3OiBmdW5jdGlvbihuZXdWaWV3KSB7XG4gICAgICAgICAgICBuZXdWaWV3LmluaXQoKTtcbiAgICAgICAgICAgIGdFbmdpbmUudmlldyA9IG5ld1ZpZXc7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5jb25zdCBEaXIgPSB7XG4gICAgUklHSFQ6IDAsXG4gICAgTEVGVDogMVxufTsiLCIvLyBWZXJzaW9uIDAuNi4wIC0gQ29weXJpZ2h0IDIwMTIgLSAyMDE2IC0gIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+XG4vL1xuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2pyaWVja2VuL3NhdC1qc1xuLy9cbi8vIEEgc2ltcGxlIGxpYnJhcnkgZm9yIGRldGVybWluaW5nIGludGVyc2VjdGlvbnMgb2YgY2lyY2xlcyBhbmRcbi8vIHBvbHlnb25zIHVzaW5nIHRoZSBTZXBhcmF0aW5nIEF4aXMgVGhlb3JlbS5cbi8qKiBAcHJlc2VydmUgU0FULmpzIC0gVmVyc2lvbiAwLjYuMCAtIENvcHlyaWdodCAyMDEyIC0gMjAxNiAtIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+IC0gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBodHRwczovL2dpdGh1Yi5jb20vanJpZWNrZW4vc2F0LWpzICovXG5cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UqL1xuLypqc2hpbnQgc2hhZG93OnRydWUsIHN1Yjp0cnVlLCBmb3Jpbjp0cnVlLCBub2FyZzp0cnVlLCBub2VtcHR5OnRydWUsXG4gIGVxZXFlcTp0cnVlLCBiaXR3aXNlOnRydWUsIHN0cmljdDp0cnVlLCB1bmRlZjp0cnVlLFxuICBjdXJseTp0cnVlLCBicm93c2VyOnRydWUgKi9cblxuLy8gQ3JlYXRlIGEgVU1EIHdyYXBwZXIgZm9yIFNBVC4gV29ya3MgaW46XG4vL1xuLy8gIC0gUGxhaW4gYnJvd3NlciB2aWEgZ2xvYmFsIFNBVCB2YXJpYWJsZVxuLy8gIC0gQU1EIGxvYWRlciAobGlrZSByZXF1aXJlLmpzKVxuLy8gIC0gTm9kZS5qc1xuLy9cbi8vIFRoZSBxdW90ZWQgcHJvcGVydGllcyBhbGwgb3ZlciB0aGUgcGxhY2UgYXJlIHVzZWQgc28gdGhhdCB0aGUgQ2xvc3VyZSBDb21waWxlclxuLy8gZG9lcyBub3QgbWFuZ2xlIHRoZSBleHBvc2VkIEFQSSBpbiBhZHZhbmNlZCBtb2RlLlxuLyoqXG4gKiBAcGFyYW0geyp9IHJvb3QgLSBUaGUgZ2xvYmFsIHNjb3BlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmYWN0b3J5IC0gRmFjdG9yeSB0aGF0IGNyZWF0ZXMgU0FUIG1vZHVsZVxuICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlWydleHBvcnRzJ10gPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdFsnU0FUJ10gPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgU0FUID0ge307XG5cbiAgLy9cbiAgLy8gIyMgVmVjdG9yXG4gIC8vXG4gIC8vIFJlcHJlc2VudHMgYSB2ZWN0b3IgaW4gdHdvIGRpbWVuc2lvbnMgd2l0aCBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzLlxuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IFZlY3Rvciwgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgeGAgYW5kIGB5YCBjb29yZGluYXRlcy4gSWZcbiAgLy8gYSBjb29yZGluYXRlIGlzIG5vdCBzcGVjaWZpZWQsIGl0IHdpbGwgYmUgc2V0IHRvIGAwYFxuICAvKipcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geCBUaGUgeCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geSBUaGUgeSBwb3NpdGlvbi5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBWZWN0b3IoeCwgeSkge1xuICAgIHRoaXNbJ3gnXSA9IHggfHwgMDtcbiAgICB0aGlzWyd5J10gPSB5IHx8IDA7XG4gIH1cbiAgU0FUWydWZWN0b3InXSA9IFZlY3RvcjtcbiAgLy8gQWxpYXMgYFZlY3RvcmAgYXMgYFZgXG4gIFNBVFsnViddID0gVmVjdG9yO1xuXG5cbiAgLy8gQ29weSB0aGUgdmFsdWVzIG9mIGFub3RoZXIgVmVjdG9yIGludG8gdGhpcyBvbmUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2NvcHknXSA9IFZlY3Rvci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdGhpc1sneCddID0gb3RoZXJbJ3gnXTtcbiAgICB0aGlzWyd5J10gPSBvdGhlclsneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIG5ldyB2ZWN0b3Igd2l0aCB0aGUgc2FtZSBjb29yZGluYXRlcyBhcyB0aGlzIG9uLlxuICAvKipcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCB2ZWN0b3JcbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2Nsb25lJ10gPSBWZWN0b3IucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpc1sneCddLCB0aGlzWyd5J10pO1xuICB9O1xuXG4gIC8vIENoYW5nZSB0aGlzIHZlY3RvciB0byBiZSBwZXJwZW5kaWN1bGFyIHRvIHdoYXQgaXQgd2FzIGJlZm9yZS4gKEVmZmVjdGl2ZWx5XG4gIC8vIHJvYXRhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uKVxuICAvKipcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3BlcnAnXSA9IFZlY3Rvci5wcm90b3R5cGUucGVycCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gdGhpc1sneCddO1xuICAgIHRoaXNbJ3gnXSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzWyd5J10gPSAteDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBSb3RhdGUgdGhpcyB2ZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncm90YXRlJ10gPSBWZWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xuICAgIHZhciB4ID0gdGhpc1sneCddO1xuICAgIHZhciB5ID0gdGhpc1sneSddO1xuICAgIHRoaXNbJ3gnXSA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xuICAgIHRoaXNbJ3knXSA9IHggKiBNYXRoLnNpbihhbmdsZSkgKyB5ICogTWF0aC5jb3MoYW5nbGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJldmVyc2UgdGhpcyB2ZWN0b3IuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncmV2ZXJzZSddID0gVmVjdG9yLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1sneCddID0gLXRoaXNbJ3gnXTtcbiAgICB0aGlzWyd5J10gPSAtdGhpc1sneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG5cbiAgLy8gTm9ybWFsaXplIHRoaXMgdmVjdG9yLiAgKG1ha2UgaXQgaGF2ZSBsZW5ndGggb2YgYDFgKVxuICAvKipcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ25vcm1hbGl6ZSddID0gVmVjdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZCA9IHRoaXMubGVuKCk7XG4gICAgaWYoZCA+IDApIHtcbiAgICAgIHRoaXNbJ3gnXSA9IHRoaXNbJ3gnXSAvIGQ7XG4gICAgICB0aGlzWyd5J10gPSB0aGlzWyd5J10gLyBkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBBZGQgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2FkZCddID0gVmVjdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihvdGhlcikge1xuICAgIHRoaXNbJ3gnXSArPSBvdGhlclsneCddO1xuICAgIHRoaXNbJ3knXSArPSBvdGhlclsneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFN1YnRyYWN0IGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnc3ViJ10gPSBWZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdGhpc1sneCddIC09IG90aGVyWyd4J107XG4gICAgdGhpc1sneSddIC09IG90aGVyWyd5J107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gU2NhbGUgdGhpcyB2ZWN0b3IuIEFuIGluZGVwZW5kYW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZFxuICAvLyBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB0aGF0IHdpbGwgc2NhbGUgYm90aCBgeGAgYW5kIGB5YC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHkgVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi4gIElmIHRoaXNcbiAgICogICBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgeCBzY2FsaW5nIGZhY3RvciB3aWxsIGJlIHVzZWQuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydzY2FsZSddID0gVmVjdG9yLnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uKHgseSkge1xuICAgIHRoaXNbJ3gnXSAqPSB4O1xuICAgIHRoaXNbJ3knXSAqPSB5IHx8IHg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gUHJvamVjdCB0aGlzIHZlY3RvciBvbiB0byBhbm90aGVyIHZlY3Rvci5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgdmVjdG9yIHRvIHByb2plY3Qgb250by5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3Byb2plY3QnXSA9IFZlY3Rvci5wcm90b3R5cGUucHJvamVjdCA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdmFyIGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcbiAgICB0aGlzWyd4J10gPSBhbXQgKiBvdGhlclsneCddO1xuICAgIHRoaXNbJ3knXSA9IGFtdCAqIG90aGVyWyd5J107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gUHJvamVjdCB0aGlzIHZlY3RvciBvbnRvIGEgdmVjdG9yIG9mIHVuaXQgbGVuZ3RoLiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50XG4gIC8vIHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgdW5pdCB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncHJvamVjdE4nXSA9IFZlY3Rvci5wcm90b3R5cGUucHJvamVjdE4gPSBmdW5jdGlvbihvdGhlcikge1xuICAgIHZhciBhbXQgPSB0aGlzLmRvdChvdGhlcik7XG4gICAgdGhpc1sneCddID0gYW10ICogb3RoZXJbJ3gnXTtcbiAgICB0aGlzWyd5J10gPSBhbXQgKiBvdGhlclsneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJlZmxlY3QgdGhpcyB2ZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3JlZmxlY3QnXSA9IFZlY3Rvci5wcm90b3R5cGUucmVmbGVjdCA9IGZ1bmN0aW9uKGF4aXMpIHtcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzLnByb2plY3QoYXhpcykuc2NhbGUoMik7XG4gICAgdGhpc1sneCddIC09IHg7XG4gICAgdGhpc1sneSddIC09IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gUmVmbGVjdCB0aGlzIHZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcyAocmVwcmVzZW50ZWQgYnkgYSB1bml0IHZlY3RvcikuIFRoaXMgaXNcbiAgLy8gc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgdW5pdCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncmVmbGVjdE4nXSA9IFZlY3Rvci5wcm90b3R5cGUucmVmbGVjdE4gPSBmdW5jdGlvbihheGlzKSB7XG4gICAgdmFyIHggPSB0aGlzWyd4J107XG4gICAgdmFyIHkgPSB0aGlzWyd5J107XG4gICAgdGhpcy5wcm9qZWN0TihheGlzKS5zY2FsZSgyKTtcbiAgICB0aGlzWyd4J10gLT0geDtcbiAgICB0aGlzWyd5J10gLT0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9ICBvdGhlciBUaGUgdmVjdG9yIHRvIGRvdCB0aGlzIG9uZSBhZ2FpbnN0LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdC5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2RvdCddID0gVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbihvdGhlcikge1xuICAgIHJldHVybiB0aGlzWyd4J10gKiBvdGhlclsneCddICsgdGhpc1sneSddICogb3RoZXJbJ3knXTtcbiAgfTtcblxuICAvLyBHZXQgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAvKipcbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgbGVuZ3RoXjIgb2YgdGhpcyB2ZWN0b3IuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydsZW4yJ10gPSBWZWN0b3IucHJvdG90eXBlLmxlbjIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydsZW4nXSA9IFZlY3Rvci5wcm90b3R5cGUubGVuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbjIoKSk7XG4gIH07XG5cbiAgLy8gIyMgQ2lyY2xlXG4gIC8vXG4gIC8vIFJlcHJlc2VudHMgYSBjaXJjbGUgd2l0aCBhIHBvc2l0aW9uIGFuZCBhIHJhZGl1cy5cblxuICAvLyBDcmVhdGUgYSBuZXcgY2lyY2xlLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gYSBwb3NpdGlvbiBhbmQvb3IgcmFkaXVzLiBJZiBubyBwb3NpdGlvblxuICAvLyBpcyBnaXZlbiwgdGhlIGNpcmNsZSB3aWxsIGJlIGF0IGAoMCwwKWAuIElmIG5vIHJhZGl1cyBpcyBwcm92aWRlZCwgdGhlIGNpcmNsZSB3aWxsXG4gIC8vIGhhdmUgYSByYWRpdXMgb2YgYDBgLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3I9fSBwb3MgQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGVcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gciBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGVcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBDaXJjbGUocG9zLCByKSB7XG4gICAgdGhpc1sncG9zJ10gPSBwb3MgfHwgbmV3IFZlY3RvcigpO1xuICAgIHRoaXNbJ3InXSA9IHIgfHwgMDtcbiAgfVxuICBTQVRbJ0NpcmNsZSddID0gQ2lyY2xlO1xuXG4gIC8vIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3ggKEFBQkIpIG9mIHRoaXMgQ2lyY2xlLlxuICAvL1xuICAvLyBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFBvbHlnb25gIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxuICAvKipcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhlIEFBQkJcbiAgICovXG4gIENpcmNsZS5wcm90b3R5cGVbJ2dldEFBQkInXSA9IENpcmNsZS5wcm90b3R5cGUuZ2V0QUFCQiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByID0gdGhpc1snciddO1xuICAgIHZhciBjb3JuZXIgPSB0aGlzW1wicG9zXCJdLmNsb25lKCkuc3ViKG5ldyBWZWN0b3IociwgcikpO1xuICAgIHJldHVybiBuZXcgQm94KGNvcm5lciwgcioyLCByKjIpLnRvUG9seWdvbigpO1xuICB9O1xuXG4gIC8vICMjIFBvbHlnb25cbiAgLy9cbiAgLy8gUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKVxuICAvL1xuICAvLyBOb3RlOiBEbyBfbm90XyBtYW51YWxseSBjaGFuZ2UgdGhlIGBwb2ludHNgLCBgYW5nbGVgLCBvciBgb2Zmc2V0YCBwcm9wZXJ0aWVzLiBVc2UgdGhlXG4gIC8vIHByb3ZpZGVkIHNldHRlcnMuIE90aGVyd2lzZSB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzIHdpbGwgbm90IGJlIHVwZGF0ZWQgY29ycmVjdGx5LlxuICAvL1xuICAvLyBgcG9zYCBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cblxuICAvLyBDcmVhdGUgYSBuZXcgcG9seWdvbiwgcGFzc2luZyBpbiBhIHBvc2l0aW9uIHZlY3RvciwgYW5kIGFuIGFycmF5IG9mIHBvaW50cyAocmVwcmVzZW50ZWRcbiAgLy8gYnkgdmVjdG9ycyByZWxhdGl2ZSB0byB0aGUgcG9zaXRpb24gdmVjdG9yKS4gSWYgbm8gcG9zaXRpb24gaXMgcGFzc2VkIGluLCB0aGUgcG9zaXRpb25cbiAgLy8gb2YgdGhlIHBvbHlnb24gd2lsbCBiZSBgKDAsMClgLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3I9fSBwb3MgQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24uIChhbGwgb3RoZXJcbiAgICogICBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+PX0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sXG4gICAqICAgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gUG9seWdvbihwb3MsIHBvaW50cykge1xuICAgIHRoaXNbJ3BvcyddID0gcG9zIHx8IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzWydhbmdsZSddID0gMDtcbiAgICB0aGlzWydvZmZzZXQnXSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnNldFBvaW50cyhwb2ludHMgfHwgW10pO1xuICB9XG4gIFNBVFsnUG9seWdvbiddID0gUG9seWdvbjtcblxuICAvLyBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi5cbiAgLy9cbiAgLy8gTm90ZTogVGhlIHBvaW50cyBhcmUgY291bnRlci1jbG9ja3dpc2UgKndpdGggcmVzcGVjdCB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0qLlxuICAvLyBJZiB5b3UgZGlyZWN0bHkgZHJhdyB0aGUgcG9pbnRzIG9uIGEgc2NyZWVuIHRoYXQgaGFzIHRoZSBvcmlnaW4gYXQgdGhlIHRvcC1sZWZ0IGNvcm5lclxuICAvLyBpdCB3aWxsIF9hcHBlYXJfIHZpc3VhbGx5IHRoYXQgdGhlIHBvaW50cyBhcmUgYmVpbmcgc3BlY2lmaWVkIGNsb2Nrd2lzZS4gVGhpcyBpcyBqdXN0XG4gIC8vIGJlY2F1c2Ugb2YgdGhlIGludmVyc2lvbiBvZiB0aGUgWS1heGlzIHdoZW4gYmVpbmcgZGlzcGxheWVkLlxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPj19IHBvaW50cyBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLFxuICAgKiAgIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWydzZXRQb2ludHMnXSA9IFBvbHlnb24ucHJvdG90eXBlLnNldFBvaW50cyA9IGZ1bmN0aW9uKHBvaW50cykge1xuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxuICAgIHZhciBsZW5ndGhDaGFuZ2VkID0gIXRoaXNbJ3BvaW50cyddIHx8IHRoaXNbJ3BvaW50cyddLmxlbmd0aCAhPT0gcG9pbnRzLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoQ2hhbmdlZCkge1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgY2FsY1BvaW50cyA9IHRoaXNbJ2NhbGNQb2ludHMnXSA9IFtdO1xuICAgICAgdmFyIGVkZ2VzID0gdGhpc1snZWRnZXMnXSA9IFtdO1xuICAgICAgdmFyIG5vcm1hbHMgPSB0aGlzWydub3JtYWxzJ10gPSBbXTtcbiAgICAgIC8vIEFsbG9jYXRlIHRoZSB2ZWN0b3IgYXJyYXlzIGZvciB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNhbGNQb2ludHMucHVzaChuZXcgVmVjdG9yKCkpO1xuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XG4gICAgICAgIG5vcm1hbHMucHVzaChuZXcgVmVjdG9yKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzWydwb2ludHMnXSA9IHBvaW50cztcbiAgICB0aGlzLl9yZWNhbGMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBTZXQgdGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgb2YgdGhlIHBvbHlnb24uXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWydzZXRBbmdsZSddID0gUG9seWdvbi5wcm90b3R5cGUuc2V0QW5nbGUgPSBmdW5jdGlvbihhbmdsZSkge1xuICAgIHRoaXNbJ2FuZ2xlJ10gPSBhbmdsZTtcbiAgICB0aGlzLl9yZWNhbGMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IHZlY3Rvci5cbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBQb2x5Z29uLnByb3RvdHlwZVsnc2V0T2Zmc2V0J10gPSBQb2x5Z29uLnByb3RvdHlwZS5zZXRPZmZzZXQgPSBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICB0aGlzWydvZmZzZXQnXSA9IG9mZnNldDtcbiAgICB0aGlzLl9yZWNhbGMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBSb3RhdGVzIHRoaXMgcG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXG4gIC8vXG4gIC8vIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBhbmdsZWAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHJvdGF0aW9uKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKVxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWydyb3RhdGUnXSA9IFBvbHlnb24ucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uKGFuZ2xlKSB7XG4gICAgdmFyIHBvaW50cyA9IHRoaXNbJ3BvaW50cyddO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBvaW50c1tpXS5yb3RhdGUoYW5nbGUpO1xuICAgIH1cbiAgICB0aGlzLl9yZWNhbGMoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBUcmFuc2xhdGVzIHRoZSBwb2ludHMgb2YgdGhpcyBwb2x5Z29uIGJ5IGEgc3BlY2lmaWVkIGFtb3VudCByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mICppdHMgb3duIGNvb3JkaW5hdGVcbiAgLy8gc3lzdGVtKiAoaS5lLiBgcG9zYCkuXG4gIC8vXG4gIC8vIFRoaXMgaXMgbW9zdCB1c2VmdWwgdG8gY2hhbmdlIHRoZSBcImNlbnRlciBwb2ludFwiIG9mIGEgcG9seWdvbi4gSWYgeW91IGp1c3Qgd2FudCB0byBtb3ZlIHRoZSB3aG9sZSBwb2x5Z29uLCBjaGFuZ2VcbiAgLy8gdGhlIGNvb3JkaW5hdGVzIG9mIGBwb3NgLlxuICAvL1xuICAvLyBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgb2Zmc2V0YCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgdHJhbnNsYXRpb24pXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgaG9yaXpvbnRhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgdmVydGljYWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBQb2x5Z29uLnByb3RvdHlwZVsndHJhbnNsYXRlJ10gPSBQb2x5Z29uLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBwb2ludHMgPSB0aGlzWydwb2ludHMnXTtcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xuICAgICAgcG9pbnRzW2ldLnkgKz0geTtcbiAgICB9XG4gICAgdGhpcy5fcmVjYWxjKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICAvLyBDb21wdXRlcyB0aGUgY2FsY3VsYXRlZCBjb2xsaXNpb24gcG9seWdvbi4gQXBwbGllcyB0aGUgYGFuZ2xlYCBhbmQgYG9mZnNldGAgdG8gdGhlIG9yaWdpbmFsIHBvaW50cyB0aGVuIHJlY2FsY3VsYXRlcyB0aGVcbiAgLy8gZWRnZXMgYW5kIG5vcm1hbHMgb2YgdGhlIGNvbGxpc2lvbiBwb2x5Z29uLlxuICAvKipcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBQb2x5Z29uLnByb3RvdHlwZS5fcmVjYWxjID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gQ2FsY3VsYXRlZCBwb2ludHMgLSB0aGlzIGlzIHdoYXQgaXMgdXNlZCBmb3IgdW5kZXJseWluZyBjb2xsaXNpb25zIGFuZCB0YWtlcyBpbnRvIGFjY291bnRcbiAgICAvLyB0aGUgYW5nbGUvb2Zmc2V0IHNldCBvbiB0aGUgcG9seWdvbi5cbiAgICB2YXIgY2FsY1BvaW50cyA9IHRoaXNbJ2NhbGNQb2ludHMnXTtcbiAgICAvLyBUaGUgZWRnZXMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmUgdG9cbiAgICAvLyB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYSBnaXZlbiBlZGdlIGZyb20gdGhlIGVkZ2UgdmFsdWUsIHlvdSBtdXN0XG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgdmFyIGVkZ2VzID0gdGhpc1snZWRnZXMnXTtcbiAgICAvLyBUaGUgbm9ybWFscyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBub3JtYWwgZm9yIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZVxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XG4gICAgLy8gdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgdmFyIG5vcm1hbHMgPSB0aGlzWydub3JtYWxzJ107XG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXG4gICAgdmFyIHBvaW50cyA9IHRoaXNbJ3BvaW50cyddO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzWydvZmZzZXQnXTtcbiAgICB2YXIgYW5nbGUgPSB0aGlzWydhbmdsZSddO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIGNhbGNQb2ludCA9IGNhbGNQb2ludHNbaV0uY29weShwb2ludHNbaV0pO1xuICAgICAgY2FsY1BvaW50LnggKz0gb2Zmc2V0Lng7XG4gICAgICBjYWxjUG9pbnQueSArPSBvZmZzZXQueTtcbiAgICAgIGlmIChhbmdsZSAhPT0gMCkge1xuICAgICAgICBjYWxjUG9pbnQucm90YXRlKGFuZ2xlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBlZGdlcy9ub3JtYWxzXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgcDEgPSBjYWxjUG9pbnRzW2ldO1xuICAgICAgdmFyIHAyID0gaSA8IGxlbiAtIDEgPyBjYWxjUG9pbnRzW2kgKyAxXSA6IGNhbGNQb2ludHNbMF07XG4gICAgICB2YXIgZSA9IGVkZ2VzW2ldLmNvcHkocDIpLnN1YihwMSk7XG4gICAgICBub3JtYWxzW2ldLmNvcHkoZSkucGVycCgpLm5vcm1hbGl6ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuXG4gIC8vIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3guIEFueSBjdXJyZW50IHN0YXRlXG4gIC8vICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgQUFCQi5cbiAgLy9cbiAgLy8gTm90ZTogUmV0dXJucyBhIF9uZXdfIGBQb2x5Z29uYCBlYWNoIHRpbWUgeW91IGNhbGwgdGhpcy5cbiAgLyoqXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoZSBBQUJCXG4gICAqL1xuICBQb2x5Z29uLnByb3RvdHlwZVtcImdldEFBQkJcIl0gPSBQb2x5Z29uLnByb3RvdHlwZS5nZXRBQUJCID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBvaW50cyA9IHRoaXNbXCJjYWxjUG9pbnRzXCJdO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIHZhciB4TWluID0gcG9pbnRzWzBdW1wieFwiXTtcbiAgICB2YXIgeU1pbiA9IHBvaW50c1swXVtcInlcIl07XG4gICAgdmFyIHhNYXggPSBwb2ludHNbMF1bXCJ4XCJdO1xuICAgIHZhciB5TWF4ID0gcG9pbnRzWzBdW1wieVwiXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgcG9pbnQgPSBwb2ludHNbaV07XG4gICAgICBpZiAocG9pbnRbXCJ4XCJdIDwgeE1pbikge1xuICAgICAgICB4TWluID0gcG9pbnRbXCJ4XCJdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAocG9pbnRbXCJ4XCJdID4geE1heCkge1xuICAgICAgICB4TWF4ID0gcG9pbnRbXCJ4XCJdO1xuICAgICAgfVxuICAgICAgaWYgKHBvaW50W1wieVwiXSA8IHlNaW4pIHtcbiAgICAgICAgeU1pbiA9IHBvaW50W1wieVwiXTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHBvaW50W1wieVwiXSA+IHlNYXgpIHtcbiAgICAgICAgeU1heCA9IHBvaW50W1wieVwiXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCb3godGhpc1tcInBvc1wiXS5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcbiAgfTtcblxuXG4gIC8vICMjIEJveFxuICAvL1xuICAvLyBSZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3gsIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC4gSWYgbm8gcG9zaXRpb25cbiAgLy8gaXMgZ2l2ZW4sIHRoZSBwb3NpdGlvbiB3aWxsIGJlIGAoMCwwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbFxuICAvLyBiZSBzZXQgdG8gYDBgLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3I9fSBwb3MgQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBib3R0b20tbGVmdCBvZiB0aGUgYm94IChpLmUuIHRoZSBzbWFsbGVzdCB4IGFuZCBzbWFsbGVzdCB5IHZhbHVlKS5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gdyBUaGUgd2lkdGggb2YgdGhlIGJveC5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gaCBUaGUgaGVpZ2h0IG9mIHRoZSBib3guXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gQm94KHBvcywgdywgaCkge1xuICAgIHRoaXNbJ3BvcyddID0gcG9zIHx8IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzWyd3J10gPSB3IHx8IDA7XG4gICAgdGhpc1snaCddID0gaCB8fCAwO1xuICB9XG4gIFNBVFsnQm94J10gPSBCb3g7XG5cbiAgLy8gUmV0dXJucyBhIHBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgYm94LlxuICAvKipcbiAgICogQHJldHVybiB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBib3guXG4gICAqL1xuICBCb3gucHJvdG90eXBlWyd0b1BvbHlnb24nXSA9IEJveC5wcm90b3R5cGUudG9Qb2x5Z29uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBvcyA9IHRoaXNbJ3BvcyddO1xuICAgIHZhciB3ID0gdGhpc1sndyddO1xuICAgIHZhciBoID0gdGhpc1snaCddO1xuICAgIHJldHVybiBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHBvc1sneCddLCBwb3NbJ3knXSksIFtcbiAgICAgbmV3IFZlY3RvcigpLCBuZXcgVmVjdG9yKHcsIDApLFxuICAgICBuZXcgVmVjdG9yKHcsaCksIG5ldyBWZWN0b3IoMCxoKVxuICAgIF0pO1xuICB9O1xuXG4gIC8vICMjIFJlc3BvbnNlXG4gIC8vXG4gIC8vIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxuICAvLyAgLSBUaGUgdHdvIG9iamVjdHMgcGFydGljaXBhdGluZyBpbiB0aGUgaW50ZXJzZWN0aW9uXG4gIC8vICAtIFRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGNoYW5nZSBuZWNlc3NhcnkgdG8gZXh0cmFjdCB0aGUgZmlyc3Qgb2JqZWN0XG4gIC8vICAgIGZyb20gdGhlIHNlY29uZCBvbmUgKGFzIHdlbGwgYXMgYSB1bml0IHZlY3RvciBpbiB0aGF0IGRpcmVjdGlvbiBhbmQgdGhlIG1hZ25pdHVkZVxuICAvLyAgICBvZiB0aGUgb3ZlcmxhcClcbiAgLy8gIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gUmVzcG9uc2UoKSB7XG4gICAgdGhpc1snYSddID0gbnVsbDtcbiAgICB0aGlzWydiJ10gPSBudWxsO1xuICAgIHRoaXNbJ292ZXJsYXBOJ10gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpc1snb3ZlcmxhcFYnXSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmNsZWFyKCk7XG4gIH1cbiAgU0FUWydSZXNwb25zZSddID0gUmVzcG9uc2U7XG5cbiAgLy8gU2V0IHNvbWUgdmFsdWVzIG9mIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZWlyIGRlZmF1bHRzLiAgQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWZcbiAgLy8geW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBSZXNwb25zZSBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW50ZWRcbiAgLy8gYXMgaXQgd2lsbCBhdm9pZCBhbGxjYXRpbmcgZXh0cmEgbWVtb3J5KVxuICAvKipcbiAgICogQHJldHVybiB7UmVzcG9uc2V9IFRoaXMgZm9yIGNoYWluaW5nXG4gICAqL1xuICBSZXNwb25zZS5wcm90b3R5cGVbJ2NsZWFyJ10gPSBSZXNwb25zZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzWydhSW5CJ10gPSB0cnVlO1xuICAgIHRoaXNbJ2JJbkEnXSA9IHRydWU7XG4gICAgdGhpc1snb3ZlcmxhcCddID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyAjIyBPYmplY3QgUG9vbHNcblxuICAvLyBBIHBvb2wgb2YgYFZlY3RvcmAgb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZFxuICAvLyBhbGxvY2F0aW5nIG1lbW9yeS5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48VmVjdG9yPn1cbiAgICovXG4gIHZhciBUX1ZFQ1RPUlMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7IFRfVkVDVE9SUy5wdXNoKG5ldyBWZWN0b3IoKSk7IH1cblxuICAvLyBBIHBvb2wgb2YgYXJyYXlzIG9mIG51bWJlcnMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZ1xuICAvLyBtZW1vcnkuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPEFycmF5LjxudW1iZXI+Pn1cbiAgICovXG4gIHZhciBUX0FSUkFZUyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykgeyBUX0FSUkFZUy5wdXNoKFtdKTsgfVxuXG4gIC8vIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBwb2x5Z29uIGhpdCBkZXRlY3Rpb24uXG4gIC8qKlxuICAgKiBAdHlwZSB7UmVzcG9uc2V9XG4gICAqL1xuICB2YXIgVF9SRVNQT05TRSA9IG5ldyBSZXNwb25zZSgpO1xuXG4gIC8vIFRpbnkgXCJwb2ludFwiIHBvbHlnb24gdXNlZCBmb3IgcG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxuICAvKipcbiAgICogQHR5cGUge1BvbHlnb259XG4gICAqL1xuICB2YXIgVEVTVF9QT0lOVCA9IG5ldyBCb3gobmV3IFZlY3RvcigpLCAwLjAwMDAwMSwgMC4wMDAwMDEpLnRvUG9seWdvbigpO1xuXG4gIC8vICMjIEhlbHBlciBGdW5jdGlvbnNcblxuICAvLyBGbGF0dGVucyB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHBvaW50cyBvbnRvIGEgdW5pdCB2ZWN0b3IgYXhpcyxcbiAgLy8gcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbmFsIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZFxuICAvLyBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBub3JtYWwgVGhlIHVuaXQgdmVjdG9yIGF4aXMgdG8gZmxhdHRlbiBvbi5cbiAgICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gcmVzdWx0IEFuIGFycmF5LiAgQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLFxuICAgKiAgIHJlc3VsdFswXSB3aWxsIGJlIHRoZSBtaW5pbXVtIHZhbHVlLFxuICAgKiAgIHJlc3VsdFsxXSB3aWxsIGJlIHRoZSBtYXhpbXVtIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gZmxhdHRlblBvaW50c09uKHBvaW50cywgbm9ybWFsLCByZXN1bHQpIHtcbiAgICB2YXIgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB2YXIgbWF4ID0gLU51bWJlci5NQVhfVkFMVUU7XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbFxuICAgICAgdmFyIGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcbiAgICAgIGlmIChkb3QgPCBtaW4pIHsgbWluID0gZG90OyB9XG4gICAgICBpZiAoZG90ID4gbWF4KSB7IG1heCA9IGRvdDsgfVxuICAgIH1cbiAgICByZXN1bHRbMF0gPSBtaW47IHJlc3VsdFsxXSA9IG1heDtcbiAgfVxuXG4gIC8vIENoZWNrIHdoZXRoZXIgdHdvIGNvbnZleCBwb2x5Z29ucyBhcmUgc2VwYXJhdGVkIGJ5IHRoZSBzcGVjaWZpZWRcbiAgLy8gYXhpcyAobXVzdCBiZSBhIHVuaXQgdmVjdG9yKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBhUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtWZWN0b3J9IGJQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPn0gYVBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBmaXJzdCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgYXhpcyAodW5pdCBzaXplZCkgdG8gdGVzdCBhZ2FpbnN0LiAgVGhlIHBvaW50cyBvZiBib3RoIHBvbHlnb25zXG4gICAqICAgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBBIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHdoaWNoIHdpbGwgYmUgcG9wdWxhdGVkXG4gICAqICAgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSxcbiAgICogICBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kXG4gICAqICAgdGhlIGRpcmVjdGlvbiBvZiB0aGUgb3ZlcmxhcCB3aWxsIGJlIHBvcHVsYXRlZC5cbiAgICovXG4gIGZ1bmN0aW9uIGlzU2VwYXJhdGluZ0F4aXMoYVBvcywgYlBvcywgYVBvaW50cywgYlBvaW50cywgYXhpcywgcmVzcG9uc2UpIHtcbiAgICB2YXIgcmFuZ2VBID0gVF9BUlJBWVMucG9wKCk7XG4gICAgdmFyIHJhbmdlQiA9IFRfQVJSQVlTLnBvcCgpO1xuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcbiAgICB2YXIgb2Zmc2V0ViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGJQb3MpLnN1YihhUG9zKTtcbiAgICB2YXIgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XG4gICAgLy8gUHJvamVjdCB0aGUgcG9seWdvbnMgb250byB0aGUgYXhpcy5cbiAgICBmbGF0dGVuUG9pbnRzT24oYVBvaW50cywgYXhpcywgcmFuZ2VBKTtcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcbiAgICAvLyBNb3ZlIEIncyByYW5nZSB0byBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gQS5cbiAgICByYW5nZUJbMF0gKz0gcHJvamVjdGVkT2Zmc2V0O1xuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBnYXAuIElmIHRoZXJlIGlzLCB0aGlzIGlzIGEgc2VwYXJhdGluZyBheGlzIGFuZCB3ZSBjYW4gc3RvcFxuICAgIGlmIChyYW5nZUFbMF0gPiByYW5nZUJbMV0gfHwgcmFuZ2VCWzBdID4gcmFuZ2VBWzFdKSB7XG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBUaGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy4gSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgdmFyIG92ZXJsYXAgPSAwO1xuICAgICAgLy8gQSBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQlxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xuICAgICAgICByZXNwb25zZVsnYUluQiddID0gZmFsc2U7XG4gICAgICAgIC8vIEEgZW5kcyBiZWZvcmUgQiBkb2VzLiBXZSBoYXZlIHRvIHB1bGwgQSBvdXQgb2YgQlxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XG4gICAgICAgIC8vIEIgaXMgZnVsbHkgaW5zaWRlIEEuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xuICAgICAgICAgIHZhciBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcbiAgICAgICAgfVxuICAgICAgLy8gQiBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xuICAgICAgICAvLyBCIGVuZHMgYmVmb3JlIEEgZW5kcy4gV2UgaGF2ZSB0byBwdXNoIEEgb3V0IG9mIEJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA+IHJhbmdlQlsxXSkge1xuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XG4gICAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xuICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICB2YXIgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cbiAgICAgIHZhciBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlWydvdmVybGFwJ10pIHtcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXAnXSA9IGFic092ZXJsYXA7XG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLmNvcHkoYXhpcyk7XG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkge1xuICAgICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQSk7XG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBTQVRbJ2lzU2VwYXJhdGluZ0F4aXMnXSA9IGlzU2VwYXJhdGluZ0F4aXM7XG5cbiAgLy8gQ2FsY3VsYXRlcyB3aGljaCBWb3Jvbm9pIHJlZ2lvbiBhIHBvaW50IGlzIG9uIGEgbGluZSBzZWdtZW50LlxuICAvLyBJdCBpcyBhc3N1bWVkIHRoYXQgYm90aCB0aGUgbGluZSBhbmQgdGhlIHBvaW50IGFyZSByZWxhdGl2ZSB0byBgKDAsMClgXG4gIC8vXG4gIC8vICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XG4gIC8vICAgICAoLTEpICBbU10tLS0tLS0tLS0tLS0tLVtFXSAgKDEpXG4gIC8vICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbGluZSBUaGUgbGluZSBzZWdtZW50LlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9pbnQgVGhlIHBvaW50LlxuICAgKiBAcmV0dXJuICB7bnVtYmVyfSBMRUZUX1ZPUk9OT0lfUkVHSU9OICgtMSkgaWYgaXQgaXMgdGhlIGxlZnQgcmVnaW9uLFxuICAgKiAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxuICAgKiAgICAgICAgICBSSUdIVF9WT1JPTk9JX1JFR0lPTiAoMSkgaWYgaXQgaXMgdGhlIHJpZ2h0IHJlZ2lvbi5cbiAgICovXG4gIGZ1bmN0aW9uIHZvcm9ub2lSZWdpb24obGluZSwgcG9pbnQpIHtcbiAgICB2YXIgbGVuMiA9IGxpbmUubGVuMigpO1xuICAgIHZhciBkcCA9IHBvaW50LmRvdChsaW5lKTtcbiAgICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBzdGFydCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlXG4gICAgLy8gbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cbiAgICBpZiAoZHAgPCAwKSB7IHJldHVybiBMRUZUX1ZPUk9OT0lfUkVHSU9OOyB9XG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGVcbiAgICAvLyByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cbiAgICBlbHNlIGlmIChkcCA+IGxlbjIpIHsgcmV0dXJuIFJJR0hUX1ZPUk9OT0lfUkVHSU9OOyB9XG4gICAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxuICAgIGVsc2UgeyByZXR1cm4gTUlERExFX1ZPUk9OT0lfUkVHSU9OOyB9XG4gIH1cbiAgLy8gQ29uc3RhbnRzIGZvciBWb3Jvbm9pIHJlZ2lvbnNcbiAgLyoqXG4gICAqIEBjb25zdFxuICAgKi9cbiAgdmFyIExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcbiAgLyoqXG4gICAqIEBjb25zdFxuICAgKi9cbiAgdmFyIE1JRERMRV9WT1JPTk9JX1JFR0lPTiA9IDA7XG4gIC8qKlxuICAgKiBAY29uc3RcbiAgICovXG4gIHZhciBSSUdIVF9WT1JPTk9JX1JFR0lPTiA9IDE7XG5cbiAgLy8gIyMgQ29sbGlzaW9uIFRlc3RzXG5cbiAgLy8gQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjaXJjbGUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGMgVGhlIGNpcmNsZSB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZSwgZmFsc2UgaWYgaXQgaXMgbm90LlxuICAgKi9cbiAgZnVuY3Rpb24gcG9pbnRJbkNpcmNsZShwLCBjKSB7XG4gICAgdmFyIGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkocCkuc3ViKGNbJ3BvcyddKTtcbiAgICB2YXIgcmFkaXVzU3EgPSBjWydyJ10gKiBjWydyJ107XG4gICAgdmFyIGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmFkaXVzIHRoZW4gdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlLlxuICAgIHJldHVybiBkaXN0YW5jZVNxIDw9IHJhZGl1c1NxO1xuICB9XG4gIFNBVFsncG9pbnRJbkNpcmNsZSddID0gcG9pbnRJbkNpcmNsZTtcblxuICAvLyBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNvbnZleCBwb2x5Z29uLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seSBUaGUgcG9seWdvbiB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIHBvbHlnb24sIGZhbHNlIGlmIGl0IGlzIG5vdC5cbiAgICovXG4gIGZ1bmN0aW9uIHBvaW50SW5Qb2x5Z29uKHAsIHBvbHkpIHtcbiAgICBURVNUX1BPSU5UWydwb3MnXS5jb3B5KHApO1xuICAgIFRfUkVTUE9OU0UuY2xlYXIoKTtcbiAgICB2YXIgcmVzdWx0ID0gdGVzdFBvbHlnb25Qb2x5Z29uKFRFU1RfUE9JTlQsIHBvbHksIFRfUkVTUE9OU0UpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJlc3VsdCA9IFRfUkVTUE9OU0VbJ2FJbkInXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBTQVRbJ3BvaW50SW5Qb2x5Z29uJ10gPSBwb2ludEluUG9seWdvbjtcblxuICAvLyBDaGVjayBpZiB0d28gY2lyY2xlcyBjb2xsaWRlLlxuICAvKipcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGIgVGhlIHNlY29uZCBjaXJjbGUuXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXG4gICAqICAgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVDaXJjbGUoYSwgYiwgcmVzcG9uc2UpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvXG4gICAgLy8gY2lyY2xlcyBpcyBncmVhdGVyIHRoYW4gdGhlaXIgY29tYmluZWQgcmFkaXVzLlxuICAgIHZhciBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGJbJ3BvcyddKS5zdWIoYVsncG9zJ10pO1xuICAgIHZhciB0b3RhbFJhZGl1cyA9IGFbJ3InXSArIGJbJ3InXTtcbiAgICB2YXIgdG90YWxSYWRpdXNTcSA9IHRvdGFsUmFkaXVzICogdG90YWxSYWRpdXM7XG4gICAgdmFyIGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxuICAgIGlmIChkaXN0YW5jZVNxID4gdG90YWxSYWRpdXNTcSkge1xuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHZhciBkaXN0ID0gTWF0aC5zcXJ0KGRpc3RhbmNlU3EpO1xuICAgICAgcmVzcG9uc2VbJ2EnXSA9IGE7XG4gICAgICByZXNwb25zZVsnYiddID0gYjtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwJ10gPSB0b3RhbFJhZGl1cyAtIGRpc3Q7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHJlc3BvbnNlWydvdmVybGFwJ10pO1xuICAgICAgcmVzcG9uc2VbJ2FJbkInXT0gYVsnciddIDw9IGJbJ3InXSAmJiBkaXN0IDw9IGJbJ3InXSAtIGFbJ3InXTtcbiAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBiWydyJ10gPD0gYVsnciddICYmIGRpc3QgPD0gYVsnciddIC0gYlsnciddO1xuICAgIH1cbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgU0FUWyd0ZXN0Q2lyY2xlQ2lyY2xlJ10gPSB0ZXN0Q2lyY2xlQ2lyY2xlO1xuXG4gIC8vIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZlxuICAgKiAgIHRoZXkgaW50ZXJzZXQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhleSBpbnRlcnNlY3QsIGZhbHNlIGlmIHRoZXkgZG9uJ3QuXG4gICAqL1xuICBmdW5jdGlvbiB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKSB7XG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxuICAgIHZhciBjaXJjbGVQb3MgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShjaXJjbGVbJ3BvcyddKS5zdWIocG9seWdvblsncG9zJ10pO1xuICAgIHZhciByYWRpdXMgPSBjaXJjbGVbJ3InXTtcbiAgICB2YXIgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcbiAgICB2YXIgcG9pbnRzID0gcG9seWdvblsnY2FsY1BvaW50cyddO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIHZhciBlZGdlID0gVF9WRUNUT1JTLnBvcCgpO1xuICAgIHZhciBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKTtcblxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xuICAgICAgdmFyIHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xuICAgICAgdmFyIG92ZXJsYXAgPSAwO1xuICAgICAgdmFyIG92ZXJsYXBOID0gbnVsbDtcblxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxuICAgICAgZWRnZS5jb3B5KHBvbHlnb25bJ2VkZ2VzJ11baV0pO1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXG4gICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tpXSk7XG5cbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50XG4gICAgICAvLyBpcyBiaWdnZXIgdGhhbiB0aGUgcmFkaXVzLCB0aGUgcG9seWdvbiBpcyBkZWZpbml0ZWx5IG5vdCBmdWxseSBpblxuICAgICAgLy8gdGhlIGNpcmNsZS5cbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSB7XG4gICAgICAgIHJlc3BvbnNlWydhSW5CJ10gPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIFZvcm9ub2kgcmVnaW9uIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBpbi5cbiAgICAgIHZhciByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxuICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgUklHSFRfVk9ST05PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW3ByZXZdKTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcbiAgICAgICAgdmFyIHBvaW50MiA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXG4gICAgICAgICAgdmFyIGRpc3QgPSBwb2ludC5sZW4oKTtcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcbiAgICAgIC8vIElmIGl0J3MgdGhlIHJpZ2h0IHJlZ2lvbjpcbiAgICAgIH0gZWxzZSBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxuICAgICAgICBlZGdlLmNvcHkocG9seWdvblsnZWRnZXMnXVtuZXh0XSk7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XG4gICAgICAgIGlmIChyZWdpb24gPT09IExFRlRfVk9ST05PSV9SRUdJT04pIHtcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXG4gICAgICAgICAgdmFyIGRpc3QgPSBwb2ludC5sZW4oKTtcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgICAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgLy8gT3RoZXJ3aXNlLCBpdCdzIHRoZSBtaWRkbGUgcmVnaW9uOlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiB0aGUgY2lyY2xlIGlzIGludGVyc2VjdGluZyB0aGUgZWRnZSxcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBlZGdlIGludG8gaXRzIFwiZWRnZSBub3JtYWxcIi5cbiAgICAgICAgdmFyIG5vcm1hbCA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGVcbiAgICAgICAgLy8gY2lyY2xlIGFuZCB0aGUgZWRnZS5cbiAgICAgICAgdmFyIGRpc3QgPSBwb2ludC5kb3Qobm9ybWFsKTtcbiAgICAgICAgdmFyIGRpc3RBYnMgPSBNYXRoLmFicyhkaXN0KTtcbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxuICAgICAgICBpZiAoZGlzdCA+IDAgJiYgZGlzdEFicyA+IHJhZGl1cykge1xuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gobm9ybWFsKTtcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xuICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xuICAgICAgICAgIC8vIElmIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgb3IgcGFydCBvZiB0aGVcbiAgICAgICAgICAvLyBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cbiAgICAgICAgICBpZiAoZGlzdCA+PSAwIHx8IG92ZXJsYXAgPCAyICogcmFkaXVzKSB7XG4gICAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IG92ZXJsYXAgd2UndmUgc2Vlbiwga2VlcCBpdC5cbiAgICAgIC8vIChvdmVybGFwTiBtYXkgYmUgbnVsbCBpZiB0aGUgY2lyY2xlIHdhcyBpbiB0aGUgd3JvbmcgVm9yb25vaSByZWdpb24pLlxuICAgICAgaWYgKG92ZXJsYXBOICYmIHJlc3BvbnNlICYmIE1hdGguYWJzKG92ZXJsYXApIDwgTWF0aC5hYnMocmVzcG9uc2VbJ292ZXJsYXAnXSkpIHtcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXAnXSA9IG92ZXJsYXA7XG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLmNvcHkob3ZlcmxhcE4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZmluYWwgb3ZlcmxhcCB2ZWN0b3IgLSBiYXNlZCBvbiB0aGUgc21hbGxlc3Qgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBwb2x5Z29uO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGNpcmNsZTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLmNvcHkocmVzcG9uc2VbJ292ZXJsYXBOJ10pLnNjYWxlKHJlc3BvbnNlWydvdmVybGFwJ10pO1xuICAgIH1cbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xuICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xuICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBTQVRbJ3Rlc3RQb2x5Z29uQ2lyY2xlJ10gPSB0ZXN0UG9seWdvbkNpcmNsZTtcblxuICAvLyBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXG4gIC8vXG4gIC8vICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0XG4gIC8vIHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZyBhdCB0aGUgZW5kLlxuICAvKipcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXG4gICAqICAgdGhleSBpbnRlcnNldC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZSwgcG9seWdvbiwgcmVzcG9uc2UpIHtcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cbiAgICB2YXIgcmVzdWx0ID0gdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSByZXNwb25zZS5cbiAgICAgIHZhciBhID0gcmVzcG9uc2VbJ2EnXTtcbiAgICAgIHZhciBhSW5CID0gcmVzcG9uc2VbJ2FJbkInXTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLnJldmVyc2UoKTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLnJldmVyc2UoKTtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSByZXNwb25zZVsnYiddO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGE7XG4gICAgICByZXNwb25zZVsnYUluQiddID0gcmVzcG9uc2VbJ2JJbkEnXTtcbiAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBhSW5CO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFNBVFsndGVzdENpcmNsZVBvbHlnb24nXSA9IHRlc3RDaXJjbGVQb2x5Z29uO1xuXG4gIC8vIENoZWNrcyB3aGV0aGVyIHBvbHlnb25zIGNvbGxpZGUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYiBUaGUgc2Vjb25kIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXG4gICAqICAgdGhleSBpbnRlcnNldC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RQb2x5Z29uUG9seWdvbihhLCBiLCByZXNwb25zZSkge1xuICAgIHZhciBhUG9pbnRzID0gYVsnY2FsY1BvaW50cyddO1xuICAgIHZhciBhTGVuID0gYVBvaW50cy5sZW5ndGg7XG4gICAgdmFyIGJQb2ludHMgPSBiWydjYWxjUG9pbnRzJ107XG4gICAgdmFyIGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcbiAgICAgIGlmIChpc1NlcGFyYXRpbmdBeGlzKGFbJ3BvcyddLCBiWydwb3MnXSwgYVBvaW50cywgYlBvaW50cywgYVsnbm9ybWFscyddW2ldLCByZXNwb25zZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBCIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yICh2YXIgaSA9IDA7aSA8IGJMZW47IGkrKykge1xuICAgICAgaWYgKGlzU2VwYXJhdGluZ0F4aXMoYVsncG9zJ10sIGJbJ3BvcyddLCBhUG9pbnRzLCBiUG9pbnRzLCBiWydub3JtYWxzJ11baV0sIHJlc3BvbnNlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNpbmNlIG5vbmUgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIG9yIEIgYXJlIGEgc2VwYXJhdGluZyBheGlzLCB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cbiAgICAvLyBhbmQgd2UndmUgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZSBzbWFsbGVzdCBvdmVybGFwIChpbiBpc1NlcGFyYXRpbmdBeGlzKS4gIENhbGN1bGF0ZSB0aGVcbiAgICAvLyBmaW5hbCBvdmVybGFwIHZlY3Rvci5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBhO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGI7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5jb3B5KHJlc3BvbnNlWydvdmVybGFwTiddKS5zY2FsZShyZXNwb25zZVsnb3ZlcmxhcCddKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgU0FUWyd0ZXN0UG9seWdvblBvbHlnb24nXSA9IHRlc3RQb2x5Z29uUG9seWdvbjtcblxuICByZXR1cm4gU0FUO1xufSkpOyIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgR2FtZUdyYXBoaWNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogdGltZVN0ZXAgVGhlIHdhaXQgdGltZSBiZXR3ZWVuIHJ1bm5pbmcgdGhlIGFjdGlvbiAoaW4gbXMpLlxuICAgICAqIG51bVRpbWVzIFRoZSBudW1iZXIgdG8gdGltZXMgdG8gcnVuIHRoZSBhY3Rpb24uXG4gICAgICogY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHJlcGVhdEFjdGlvbih0aW1lU3RlcCwgbnVtVGltZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIGxldCBudW0gPSAwO1xuICAgICAgICBsZXQgdGhlQW5pbWF0aW9uID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaWYobnVtKysgPiBudW1UaW1lcykge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhlQW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aW1lU3RlcCk7XG4gICAgfVxufSIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbHMgY2FudmFzLCBjdHggKi9cblxuZnVuY3Rpb24gR2FtZVZpZXcoKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHtcbiAgICAgICAgYmdDb2xvcjogJyNjY2MnXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5HYW1lVmlldy5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5wcml2YXRlcy5iZ0NvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTsiLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWxzIGdhbWUsIGNhbnZhcywgY3R4LCBLZXlDb2RlICovXG5cbi8qXG4gKiAgSW1wbGVtZW50cyBHYW1lVmlldy5cbiAqL1xuZnVuY3Rpb24gVGl0bGVWaWV3KHRpdGxlKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHtcbiAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5UaXRsZVZpZXcucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuICAgIGxldCB0aXRsZSxcbiAgICAgICAgY3RhID0gJ1ByZXNzIEVudGVyJ1xuICAgIDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aXRsZSA9IHRoaXMucHJpdmF0ZXMudGl0bGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuRU5URVIpIHtcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gJzM2cHggQXJpYWwnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aXRsZSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aXRsZSkud2lkdGggLyAyLCAxMDApO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9ICcyNHB4IEFyaWFsJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChjdGEsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQoY3RhKS53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpOyIsIi8qIGdsb2JhbHMgR2FtZVNhdmUsIGNhbnZhcywgY3R4LCBLZXlDb2RlLCBnYW1lICovXG5cbmZ1bmN0aW9uIEdhbWVTYXZlVmlldygpIHtcbiAgICB0aGlzLnByaXZhdGVzID0ge307XG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkdhbWVTYXZlVmlldy5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IHRoYXQsXG4gICAgICAgIHRpdGxlID0gJ1NlbGVjdCBhIHNhdmUgc2xvdCcsXG4gICAgICAgIHN0b3JhZ2UgPSBuZXcgR2FtZVNhdmUoKSxcbiAgICAgICAgbGlzdCA9IHN0b3JhZ2UuZ2V0TGlzdCgpLFxuICAgICAgICBhcnJvd1xuICAgIDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgYXJyb3cgPSB7XG4gICAgICAgICAgICAgICAgaW1nOiAnPj4nLFxuICAgICAgICAgICAgICAgIHNsb3Q6IDAsXG4gICAgICAgICAgICAgICAgeDogY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dChsaXN0WzBdKS53aWR0aCAvIDIgLSA2MCwgICAgLy8gVE9ETzogbWFrZSBpbnN0YW5jZSB2YXI/P1xuICAgICAgICAgICAgICAgIHk6IDIwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FU0MpIHtcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKEtleUNvZGUuRVNDKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FTlRFUikge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdCA9IGRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICBzdG9yYWdlLnNhdmUoYXJyb3cuc2xvdCwgYCR7bX0vJHtkfS8ke3l9ICR7dH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKEtleUNvZGUuRU5URVIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkRFTEVURSkge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgbGlzdCA9IHN0b3JhZ2UuZXJhc2UoYXJyb3cuc2xvdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFycm93LnNsb3QgIT09IDIgJiYgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5ET1dOKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICArK2Fycm93LnNsb3Q7XG4gICAgICAgICAgICAgICAgYXJyb3cueCA9IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQobGlzdFthcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XG4gICAgICAgICAgICAgICAgYXJyb3cueSArPSA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJyb3cuc2xvdCAhPT0gMCAmJiBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLlVQKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICAtLWFycm93LnNsb3Q7XG4gICAgICAgICAgICAgICAgYXJyb3cueCA9IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQobGlzdFthcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XG4gICAgICAgICAgICAgICAgYXJyb3cueSAtPSA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMTExJztcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9ICczNnB4IEFyaWFsJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGl0bGUsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGl0bGUpLndpZHRoIC8gMiwgODApO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9ICcyNHB4IEFyaWFsJztcblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQobGlzdFtpXSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dChsaXN0W2ldKS53aWR0aCAvIDIsIDIwMCArIGkgKiA4MCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChhcnJvdy5pbWcsIGFycm93LngsIGFycm93LnkpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiLyogZ2xvYmFscyBTQVQgKi9cblxuZnVuY3Rpb24gTGV2ZWxWaWV3KHBsYXllciwgY3VyTHZsKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHt9O1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMuY3VyTHZsID0gY3VyTHZsO1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkxldmVsVmlldy5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IHRoYXQsXG4gICAgICAgIG9uVXBkYXRlU2V0ID0gZmFsc2UsXG4gICAgICAgIG9uUmVuZGVyU2V0ID0gZmFsc2VcbiAgICA7XG5cbiAgICBmdW5jdGlvbiBjaGVja0NvbGxpc2lvbigpIHtcbiAgICAgICAgaWYodGhhdC5wbGF5ZXIuaW52aW5jaWJsZSkge1xuICAgICAgICAgICAgaWYodGhhdC5wbGF5ZXIuaW52aW5jaWJsZVRpbWVyLS0gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXllci5pbnZpbmNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5ZXIuaW52aW5jaWJsZVRpbWVyID0gMTIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhhdC5jdXJMdmwucHJvamVjdGlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjb2xsaWRlZCA9IFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhhdC5wbGF5ZXIsIHRoYXQuY3VyTHZsLnByb2plY3RpbGVzW2ldKTtcbiAgICAgICAgICAgIGlmKGNvbGxpZGVkKSB7XG4gICAgICAgICAgICAgICAgLS10aGF0LnBsYXllci5ocDtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXllci5pbnZpbmNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGhlbjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoYXQgPSB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmN1ckx2bC51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICBjaGVja0NvbGxpc2lvbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgb25VcGRhdGVTZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZSA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdXJMdmwucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlbmRlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uUmVuZGVyU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXIgPSBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgIH07XG59KSgpOyIsIi8qIGdsb2JhbHMgU0FULCBjYW52YXMsIGN0eCAqL1xuXG5mdW5jdGlvbiBMZXZlbDEoKSB7XG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkxldmVsMS5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RpbGVzOiBbXSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAxMDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2plY3RpbGUgPSBuZXcgU0FULkJveChuZXcgU0FULlZlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCkgKyAwKSwgLy8gcmFuZG9tIG51bWJlciBiZXR3ZWVuIDAgYW5kIGNhbnZhcy53aWR0aFxuICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgKSwgMTAsIDIwKS50b1BvbHlnb24oKTtcblxuICAgICAgICAgICAgICAgIHByb2plY3RpbGUuc3BlZWQgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTApICsgMykgKiAwLjE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVzLnB1c2gocHJvamVjdGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RpbGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlc1tpXS5wb3MueSAtPSB0aGlzLnByb2plY3RpbGVzW2ldLnNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHByb2plY3RpbGVzXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3NpbHZlcic7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0aWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnByb2plY3RpbGVzW2ldLnBvcy54LCB0aGlzLnByb2plY3RpbGVzW2ldLnBvcy55LCAxMCwgMjApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiLyogZ2xvYmFscyBTQVQsIEtleUNvZGUsIGdhbWUsIGN0eCAqL1xuXG5jbGFzcyBWYW1wIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDQ7XG4gICAgICAgIHRoaXMudyA9IDQwO1xuICAgICAgICB0aGlzLmggPSA0MDtcbiAgICAgICAgdGhpcy5ocCA9IDM7XG4gICAgICAgIHRoaXMuaW52aW5jaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmludmluY2libGVUaW1lciA9IDEyMDtcbiAgICAgICAgdGhpcy5kZWFkID0gZmFsc2U7XG5cbiAgICAgICAgJC5leHRlbmQodGhpcywgbmV3IFNBVC5Cb3gobmV3IFNBVC5WZWN0b3IoMCwgMCksIHRoaXMudywgdGhpcy5oKS50b1BvbHlnb24oKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvLyBob3Jpem9udGFsXG4gICAgICAgIGlmKGdhbWUuaW5wdXQua2V5c0Rvd25bS2V5Q29kZS5SSUdIVF0pe1xuICAgICAgICAgICAgdGhpcy5wb3MueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZ2FtZS5pbnB1dC5rZXlzRG93bltLZXlDb2RlLkxFRlRdKSB7XG4gICAgICAgICAgICB0aGlzLnBvcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2ZXJ0aWNhbFxuICAgICAgICBpZihnYW1lLmlucHV0LmtleXNEb3duW0tleUNvZGUuVVBdKSB7XG4gICAgICAgICAgICB0aGlzLnBvcy55IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0LmtleXNEb3duW0tleUNvZGUuRE9XTl0pIHtcbiAgICAgICAgICAgIHRoaXMucG9zLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuaHAgPD0gMCAmJiAhdGhpcy5kZWFkKSB7XG4gICAgICAgICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgICAgICAgYWxlcnQoJ1lvdSBkaWVkJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gYm9keVxuICAgICAgICBsZXQgZG9EcmF3ID0gdHJ1ZTtcbiAgICAgICAgaWYodGhpcy5pbnZpbmNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gdGhpcy5pbnZpbmNpYmxlVGltZXIgJSAzMDtcbiAgICAgICAgICAgIGlmKHQgPj0gMCAmJiB0IDwgMTUpIHtcbiAgICAgICAgICAgICAgICBkb0RyYXcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRvRHJhdykge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMudywgdGhpcy5oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlYWx0aFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmhwOyArK2kpIHtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54IC0gMTAgKyBpKjIwLCB0aGlzLnBvcy55IC0gMjAsIDIwLCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFscyBnYW1lLCBHYW1lRW5naW5lLCBUaXRsZVZpZXcsIEtleUNvZGUsIFZhbXAsIExldmVsMSwgTGV2ZWxWaWV3LCBHYW1lU2F2ZVZpZXcgKi9cblxuKCgpID0+IHtcbiAgICB3aW5kb3cuZ2FtZSA9IG5ldyBHYW1lRW5naW5lKCk7XG5cbiAgICBsZXQgdGl0bGVWaWV3ID0gbmV3IFRpdGxlVmlldygnVmFtcDogVGhlIEdyZWF0IGFuZCBQb3dlcmZ1bCcsIHRydWUpO1xuICAgIGxldCBzYXZlVmlldyA9IG5ldyBHYW1lU2F2ZVZpZXcoKTtcblxuICAgIGNvbnN0IHZhbXAgPSBuZXcgVmFtcCgpO1xuICAgIGNvbnN0IGx2bDEgPSBuZXcgTGV2ZWwxKCk7XG4gICAgY29uc3QgbHZsVmlldyA9IG5ldyBMZXZlbFZpZXcodmFtcCwgbHZsMSk7XG5cbiAgICB0aXRsZVZpZXcudGhlbigoKSA9PiB7XG4gICAgICAgIGdhbWUudXRpbHMuc3dpdGNoVmlldyhzYXZlVmlldyk7XG4gICAgfSk7XG5cbiAgICBzYXZlVmlldy50aGVuKGtleSA9PiB7XG4gICAgICAgIGlmKGtleSA9PT0gS2V5Q29kZS5FU0MpIHtcbiAgICAgICAgICAgIGdhbWUudXRpbHMuc3dpdGNoVmlldyh0aXRsZVZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLkVOVEVSKSB7XG4gICAgICAgICAgICBnYW1lLnV0aWxzLnN3aXRjaFZpZXcobHZsVmlldyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGdhbWUudmlldyA9IHRpdGxlVmlldztcbn0pKCk7Il19
