'use strict';
/* globals canvas, ctx, GameInput, GameGraphics, GameUtils, GameView */
/*
 *    Declares two globals: canvas and ctx
 */

function GameEngine() {
    // back button
    var backBtn = document.createElement('a');
    backBtn.href = '/#games';
    backBtn.innerText = 'Back';
    backBtn.className = 'btnBack';
    document.body.appendChild(backBtn);

    // canvasWrap
    var wrap = document.createElement('div');
    wrap.className = 'canvasWrap';

    // canvas
    window.canvas = document.createElement('canvas');
    canvas.setAttribute('width', 16 * 63);
    canvas.setAttribute('height', 9 * 63);
    wrap.appendChild(canvas);
    document.body.appendChild(wrap);

    window.ctx = canvas.getContext('2d');

    this.input = new GameInput(this);
    this.graphics = new GameGraphics(this);
    this.utils = new GameUtils(this);
    this.view = new GameView(this);

    this.init();
}

GameEngine.prototype = function () {
    var that = void 0,
        updateInterval = void 0,
        renderRAF = void 0,
        onUpdateSet = false,
        onRenderSet = false;

    function update() {
        that.view.update();

        if (onUpdateSet) {
            that.onUpdate();
        }
    }

    function render() {
        renderRAF = requestAnimationFrame(render);
        that.view.render();

        if (onRenderSet) {
            that.onRender();
        }
    }

    return {
        init: function init() {
            that = this;
        },

        onUpdate: function onUpdate(callback) {
            onUpdateSet = true;
            this.onUpdate = callback;
        },

        onRender: function onRender(callback) {
            onRenderSet = true;
            this.onRender = callback;
        },

        start: function start() {
            updateInterval = setInterval(update, 1000 / 60);
            renderRAF = requestAnimationFrame(render);
        },

        stop: function stop() {
            clearInterval(updateInterval);
            cancelAnimationFrame(renderRAF);
        }
    };
}();
'use strict';
/*
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameSave = function () {
    function GameSave() {
        _classCallCheck(this, GameSave);
    }

    _createClass(GameSave, [{
        key: 'load',
        value: function load(slot) {
            return localStorage['slot ' + slot];
        }
    }, {
        key: 'getList',
        value: function getList() {
            var zero = this.load(0),
                one = this.load(1),
                two = this.load(2),
                def = '---';

            return [typeof zero !== 'undefined' ? zero : def, typeof one !== 'undefined' ? one : def, typeof two !== 'undefined' ? two : def];
        }
    }, {
        key: 'save',
        value: function save(slot, data) {
            localStorage['slot ' + slot] = data;
        }
    }, {
        key: 'erase',
        value: function erase(slot) {
            localStorage.removeItem('slot ' + slot);
            return this.getList();
        }
    }]);

    return GameSave;
}();
'use strict';
/*
 * The input component of GameEngine.
 */

function GameInput() {
	this.keysDown = {};
	this.lastKeyUp = KeyCode.EMPTY;
	this.lastKeyDown = KeyCode.EMPTY;

	this.init();
}

GameInput.prototype = function () {
	var that = void 0;

	function fixKey(key) {
		if (key === KeyCode.W) key = KeyCode.UP;else if (key === KeyCode.S) key = KeyCode.DOWN;else if (key === KeyCode.D) key = KeyCode.RIGHT;else if (key === KeyCode.A) key = KeyCode.LEFT;

		return key;
	}

	addEventListener('keydown', function (e) {
		var key = fixKey(e.keyCode);

		if (!that.keysDown[key]) {
			that.lastKeyDown = key;
			that.keysDown[key] = true;
		}

		//that.onKeyDown(key);
	});

	addEventListener('keyup', function (e) {
		that.lastKeyUp = fixKey(e.keyCode);
		delete that.keysDown[that.lastKeyUp];
	});

	return {
		init: function init() {
			that = this;
		},

		update: function update() {} //,

		// onKeyDown: function(callback) {
		//     this.onKeyDown = callback;
		// }
	};
}();

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
"use strict";

/*
    The utils component of GameEngine.
*/
function GameUtils(gEngine) {
    return {
        /*
            Resets the newView's private variables.
            Changes the view.
        */
        switchView: function switchView(newView) {
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
"use strict";

/*
    The graphics component of GameEngine.
*/
var GameGraphics = function GameGraphics(gEngine) {
    return {
        isAnimating: false,

        /*
            @param(number) timeStep The wait time between running the action (in ms).
            @param(number) numTimes The number to times to run the action.
            @param(function) callback The callback function.
        */
        repeatAction: function repeatAction(timeStep, numTimes, callback) {
            this.isAnimating = true;

            var num = 0,
                that = this;

            var theAnimation = setInterval(function () {
                if (num++ > numTimes) {
                    clearInterval(theAnimation);
                    that.isAnimating = false;
                } else {
                    callback();
                }
            }, timeStep);
        }
    };
};
"use strict";

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

GameView.prototype = function () {

    return {
        then: function then(callback) {
            this.privates.callback = callback;
        },

        init: function init() {},

        update: function update() {},

        render: function render() {
            ctx.fillStyle = this.privates.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
}();
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

TitleView.prototype = function () {
    var title = void 0,
        cta = 'Press Enter';

    return {
        then: function then(callback) {
            this.privates.callback = callback;
        },

        init: function init() {
            title = this.privates.title;
        },

        update: function update() {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
        },

        render: function render() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '36px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 100);

            ctx.font = '24px Arial';
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
}();
"use strict";

/// <reference path="../commonLinker.js" />

function GameSaveView() {
    this.privates = {};

    this.init();
}

GameSaveView.prototype = function () {
    var that,
        title = "Select a save slot",
        cta = "Press Delete to erase a save",
        storage = new GameSave(),
        list = storage.getList(),
        arrow;

    return {
        then: function then(callback) {
            this.privates.callback = callback;
        },

        init: function init() {
            that = this;

            arrow = {
                img: ">>",
                slot: 0,
                x: canvas.width / 2 - ctx.measureText(list[0]).width / 2 - 60, // TODO: make instance var??
                y: 200
            };
        },

        update: function update() {
            if (game.input.lastKeyDown === KeyCode.ESC) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback(KeyCode.ESC);
            } else if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                var date = new Date();
                var m = date.getMonth();
                var d = date.getDay();
                var y = date.getYear();
                var t = date.toLocaleTimeString();

                storage.save(arrow.slot, m + '/' + d + '/' + y + ' ' + t);
                this.privates.callback(KeyCode.ENTER);
            } else if (game.input.lastKeyDown === KeyCode.DELETE) {
                game.input.lastKeyDownp = KeyCode.EMPTY;

                list = storage.erase(arrow.slot);
            } else if (arrow.slot !== 2 && game.input.lastKeyDown === KeyCode.DOWN) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                ++arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y += 80;
            } else if (arrow.slot !== 0 && game.input.lastKeyDown === KeyCode.UP) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                --arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y -= 80;
            }
        },

        render: function render() {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 80);

            ctx.font = "24px Arial";

            for (var i = 0; i < list.length; ++i) {
                ctx.fillText(list[i], canvas.width / 2 - ctx.measureText(list[i]).width / 2, 200 + i * 80);
            }

            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
}();
"use strict";

/// <reference path="../linker.js" />

function OverworldView() {
    this.privates = {};
    this.init();
}

OverworldView.prototype = function () {

    var arrow = {
        img: "^^"
    };

    return {
        then: function then(callback) {
            this.privates.callback = callback;
        },

        init: function init() {
            arrow.x = 90;
            arrow.y = canvas.height / 2 + 70;
            arrow.slot = 0;
        },

        update: function update() {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            } else if (game.input.lastKeyDown === KeyCode.RIGHT) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.slot < 7) {
                    arrow.x += 115;
                    ++arrow.slot;
                }
            } else if (game.input.lastKeyDown === KeyCode.LEFT) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.slot > 0) {
                    arrow.x -= 115;
                    --arrow.slot;
                }
            }
        },

        render: function render() {
            // background
            ctx.fillStyle = "#34282c";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // levels
            var size = 80,
                x,
                y;

            for (var i = 0; i < 8; ++i) {
                x = 60 + i * 115;
                y = canvas.height / 2 - size / 2;

                ctx.fillStyle = "#fff";
                ctx.font = "18px Arial";
                ctx.fillText("Level " + (i + 1), x + 10, y - 13);

                ctx.fillStyle = "red";
                ctx.fillRect(x, y, size, size);
            }

            // arrow
            ctx.fillStyle = "#fff";
            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
}();
'use strict';
/* globals game, canvas, ctx, KeyCode, Dir, FightAction */
/*
 *  Implements GameView.
 */

function BattleView(bgColor, dormantL, dormantR) {
    this.privates = {
        bgColor: bgColor,
        dormantL: dormantL,
        dormantR: dormantR
    };

    this.init();
}

BattleView.prototype = function () {
    var that = void 0,
        arrow = {
        img: '>>'
    },
        left = void 0,
        wasAttack = void 0,
        wasAttackTimer = void 0,
        fire = void 0,
        theAttack = void 0,
        dormantL = void 0,
        dormantR = void 0;

    function checkInput(dormantL, dormantR) {
        switch (game.input.lastKeyDown) {
            case KeyCode.ENTER:
                game.input.lastKeyDown = KeyCode.EMPTY;

                theAttack.name = dormantL.actions[arrow.curSlot].name;
                theAttack.atk = dormantL.atk * dormantL.actions[arrow.curSlot].multiplier / dormantR.def;

                return true;
            case KeyCode.UP:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.curSlot !== 0 && dormantL.actions[arrow.curSlot - 1] !== null) {
                    --arrow.curSlot;
                    arrow.y -= 30;
                }
                break;
            case KeyCode.DOWN:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.curSlot !== 3 && dormantL.actions[arrow.curSlot + 1] !== null) {
                    ++arrow.curSlot;
                    arrow.y += 30;
                }
                break;
        }
    }

    function runTackleAnimation() {
        left.dir = Dir.RIGHT;

        game.graphics.repeatAction(6, 60, function () {
            if (left.dir === Dir.RIGHT && left.x > 60) {
                left.dir = Dir.LEFT;
            }

            if (left.dir === Dir.RIGHT) {
                ++left.x;
            } else {
                --left.x;
            }

            dormantR.hp -= theAttack.atk / 60;
        });
    }

    /****** Render *****/
    function drawDormantHUD(dormant, x, y, drawXP) {
        // name
        var str = dormant.name + ' L' + dormant.lvl;

        ctx.fillStyle = "#000";
        ctx.fillText(str, x + ctx.measureText(str).width / 2, y);

        // hp
        ctx.fillText('HP', x, y + 20);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x + 21, y + 12, 100, 10);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 22, y + 13, dormant.hp * (100 / dormant.initHP) - 1, 8);

        // xp
        if (drawXP) {
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
        ctx.fillStyle = '#000';

        for (var i = 0; i < 4; ++i) {
            if (dormantL.actions[i] === null) {
                ctx.fillText('--', 80, 350 + i * 30);
            } else {
                ctx.fillText(dormantL.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    function drawActionArrow() {
        ctx.fillStyle = '#000';
        ctx.fillText(arrow.img, arrow.x, arrow.y);
    }

    return {
        then: function then(callback) {
            this.privates.callback = callback;
        },

        init: function init() {
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
                name: 'EMPTY',
                atk: 0
            };

            dormantL = this.privates.dormantL;
            dormantR = this.privates.dormantR;
        },

        update: function update() {
            if (wasAttack) {
                dormantR.hp -= theAttack.atk / 60;
            }
            if (!game.graphics.isAnimating) {
                var _wasAttack = checkInput(dormantL, dormantR);
                if (_wasAttack) {
                    if (theAttack.name === FightAction.TACKLE.name) {
                        runTackleAnimation();
                    } else if (theAttack.name === FightAction.DRAGONS_BREATH.name) {
                        wasAttack = true;
                    }
                }
            }

            if (dormantR.hp <= 0) {
                dormantL.xp += 25;
                this.privates.callback();
            }
        },

        render: function render() {
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
            if (wasAttack) {
                var t = wasAttackTimer % 40;

                if (t >= 0 && t < 10) {
                    fire.x = 0;
                } else if (t >= 10 && t < 20) {
                    fire.x = 5;
                } else if (t >= 20 && t < 30) {
                    fire.x = 0;
                } else if (t >= 30 && t < 40) {
                    fire.x = -5;
                }

                ctx.fillStyle = 'red';
                ctx.fillRect(870 + fire.x, 242, 40, 12);
                ctx.fillRect(880 + fire.x, 230, 30, 12);
                ctx.fillRect(880 + fire.x, 218, 20, 12);

                if (wasAttackTimer-- === 0) {
                    wasAttack = false;
                    wasAttackTimer = 60;
                }
            }
        }
    };
}();
'use strict';

function Dormant(src, name, atk, def, hp, actions, lvl) {
    var that = this;

    this.img = new Image();
    this.imgReady = false;
    this.img.onload = function () {
        that.imgReady = true;
    };
    this.img.src = 'img/' + src;

    this.name = name;
    this.atk = atk;
    this.def = def;
    this.initHP = this.hp = hp;
    this.actions = actions;
    this.lvl = typeof lvl !== 'undefined' ? lvl : 1;
    this.xp = 0;
    this.xpNeeded = 50;
}

Dormant.prototype = function () {

    return {
        draw: function draw(x, y) {
            if (this.imgReady) {
                ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
            }
        }
    };
}();
"use strict";

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
'use strict';
/* globals GameEngine, TitleView, OverworldView, FightAction, Dormant, BattleView, game */
/*
 *  The main class for dormanticide.
 *  Declares game as a global.
 */

(function Main() {
	window.game = new GameEngine();
	game.start();

	var curLvl = 1;

	var titleView = new TitleView('Dormanticide');
	titleView.then(function () {
		game.utils.switchView(overworldView);
	});

	var overworldView = new OverworldView();
	overworldView.then(function () {
		if (curLvl === 1) {
			game.utils.switchView(lvl1);
		} else {
			game.utils.switchView(lvl2);
		}
	});

	var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

	var malaise = new Dormant('malaise.png', 'MALAISE', 12, 8, 27, actions);
	var erabor = new Dormant('erabor.png', 'ERABOR', 8, 12, 23, actions);
	var tildamesh = new Dormant('tildamesh.png', 'TILDAMESH', 8, 12, 23, actions);

	var lvl1 = new BattleView('#ddd', malaise, erabor);
	lvl1.then(function () {
		++curLvl;
		game.utils.switchView(overworldView);
	});

	var lvl2 = new BattleView('#ddd', malaise, tildamesh);
	lvl2.then(function () {
		game.utils.switchView(overworldView);
	});

	game.view = titleView;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVFbmdpbmUuanMiLCJHYW1lU2F2ZS5qcyIsIkdhbWVJbnB1dC5qcyIsIkdhbWVVdGlscy5qcyIsIlNBVC5qcyIsIkdhbWVHcmFwaGljcy5qcyIsIkdhbWVWaWV3LmpzIiwiVGl0bGVWaWV3LmpzIiwiR2FtZVNhdmVWaWV3LmpzIiwiT3ZlcndvcmxkVmlldy5qcyIsIkJhdHRsZVZpZXcuanMiLCJEb3JtYW50LmpzIiwiRmlnaHRBY3Rpb24uanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbIkdhbWVFbmdpbmUiLCJiYWNrQnRuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImlubmVyVGV4dCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIndyYXAiLCJ3aW5kb3ciLCJjYW52YXMiLCJzZXRBdHRyaWJ1dGUiLCJjdHgiLCJnZXRDb250ZXh0IiwiaW5wdXQiLCJHYW1lSW5wdXQiLCJncmFwaGljcyIsIkdhbWVHcmFwaGljcyIsInV0aWxzIiwiR2FtZVV0aWxzIiwidmlldyIsIkdhbWVWaWV3IiwiaW5pdCIsInByb3RvdHlwZSIsInRoYXQiLCJ1cGRhdGVJbnRlcnZhbCIsInJlbmRlclJBRiIsIm9uVXBkYXRlU2V0Iiwib25SZW5kZXJTZXQiLCJ1cGRhdGUiLCJvblVwZGF0ZSIsInJlbmRlciIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9uUmVuZGVyIiwiY2FsbGJhY2siLCJzdGFydCIsInNldEludGVydmFsIiwic3RvcCIsImNsZWFySW50ZXJ2YWwiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIkdhbWVTYXZlIiwic2xvdCIsImxvY2FsU3RvcmFnZSIsInplcm8iLCJsb2FkIiwib25lIiwidHdvIiwiZGVmIiwiZGF0YSIsInJlbW92ZUl0ZW0iLCJnZXRMaXN0Iiwia2V5c0Rvd24iLCJsYXN0S2V5VXAiLCJLZXlDb2RlIiwiRU1QVFkiLCJsYXN0S2V5RG93biIsImZpeEtleSIsImtleSIsIlciLCJVUCIsIlMiLCJET1dOIiwiRCIsIlJJR0hUIiwiQSIsIkxFRlQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJPYmplY3QiLCJmcmVlemUiLCJFTlRFUiIsIkNUUkwiLCJFU0MiLCJTUEFDRUJBUiIsIkRFTEVURSIsIkYiLCJIIiwiSiIsIksiLCJNIiwiTyIsIlIiLCJLZXlDb2RlTmFtZXMiLCJnRW5naW5lIiwic3dpdGNoVmlldyIsIm5ld1ZpZXciLCJEaXIiLCJpc0FuaW1hdGluZyIsInJlcGVhdEFjdGlvbiIsInRpbWVTdGVwIiwibnVtVGltZXMiLCJudW0iLCJ0aGVBbmltYXRpb24iLCJwcml2YXRlcyIsImJnQ29sb3IiLCJ0aGVuIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsIlRpdGxlVmlldyIsInRpdGxlIiwiY3RhIiwiZ2FtZSIsImZvbnQiLCJmaWxsVGV4dCIsIm1lYXN1cmVUZXh0IiwiR2FtZVNhdmVWaWV3Iiwic3RvcmFnZSIsImxpc3QiLCJhcnJvdyIsImltZyIsIngiLCJ5IiwiZGF0ZSIsIkRhdGUiLCJtIiwiZ2V0TW9udGgiLCJkIiwiZ2V0RGF5IiwiZ2V0WWVhciIsInQiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJzYXZlIiwibGFzdEtleURvd25wIiwiZXJhc2UiLCJpIiwibGVuZ3RoIiwiT3ZlcndvcmxkVmlldyIsInNpemUiLCJCYXR0bGVWaWV3IiwiZG9ybWFudEwiLCJkb3JtYW50UiIsImxlZnQiLCJ3YXNBdHRhY2siLCJ3YXNBdHRhY2tUaW1lciIsImZpcmUiLCJ0aGVBdHRhY2siLCJjaGVja0lucHV0IiwibmFtZSIsImFjdGlvbnMiLCJjdXJTbG90IiwiYXRrIiwibXVsdGlwbGllciIsInJ1blRhY2tsZUFuaW1hdGlvbiIsImRpciIsImhwIiwiZHJhd0Rvcm1hbnRIVUQiLCJkb3JtYW50IiwiZHJhd1hQIiwic3RyIiwibHZsIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0IiwiaW5pdEhQIiwieHAiLCJ4cE5lZWRlZCIsImRyYXdIVUQiLCJkcmF3QWN0aW9uTGlzdCIsImRyYXdBY3Rpb25BcnJvdyIsIl93YXNBdHRhY2siLCJGaWdodEFjdGlvbiIsIlRBQ0tMRSIsIkRSQUdPTlNfQlJFQVRIIiwiZHJhdyIsIkRvcm1hbnQiLCJzcmMiLCJJbWFnZSIsImltZ1JlYWR5Iiwib25sb2FkIiwiZHJhd0ltYWdlIiwiSEVBTCIsIk1haW4iLCJjdXJMdmwiLCJ0aXRsZVZpZXciLCJvdmVyd29ybGRWaWV3IiwibHZsMSIsImx2bDIiLCJtYWxhaXNlIiwiZXJhYm9yIiwidGlsZGFtZXNoIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7Ozs7QUFHQSxTQUFTQSxVQUFULEdBQXNCO0FBQ2xCO0FBQ0EsUUFBSUMsVUFBVUMsU0FBU0MsYUFBVCxDQUF1QixHQUF2QixDQUFkO0FBQ0FGLFlBQVFHLElBQVIsR0FBZSxTQUFmO0FBQ0FILFlBQVFJLFNBQVIsR0FBb0IsTUFBcEI7QUFDQUosWUFBUUssU0FBUixHQUFvQixTQUFwQjtBQUNBSixhQUFTSyxJQUFULENBQWNDLFdBQWQsQ0FBMEJQLE9BQTFCOztBQUVBO0FBQ0EsUUFBSVEsT0FBT1AsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0FNLFNBQUtILFNBQUwsR0FBaUIsWUFBakI7O0FBRUE7QUFDQUksV0FBT0MsTUFBUCxHQUFnQlQsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBUSxXQUFPQyxZQUFQLENBQW9CLE9BQXBCLEVBQTZCLEtBQUcsRUFBaEM7QUFDQUQsV0FBT0MsWUFBUCxDQUFvQixRQUFwQixFQUE4QixJQUFFLEVBQWhDO0FBQ0FILFNBQUtELFdBQUwsQ0FBaUJHLE1BQWpCO0FBQ0FULGFBQVNLLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkMsSUFBMUI7O0FBRUFDLFdBQU9HLEdBQVAsR0FBYUYsT0FBT0csVUFBUCxDQUFrQixJQUFsQixDQUFiOztBQUVBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxTQUFKLENBQWMsSUFBZCxDQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFJQyxZQUFK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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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T0FBTyxJQUFJL0MsVUFBSixDQUFlLE1BQWYsRUFBdUJnRCxPQUF2QixFQUFnQ0UsU0FBaEMsQ0FBWDtBQUNBSCxNQUFLbEYsSUFBTCxDQUFVLFlBQU07QUFDZlEsT0FBS3RGLEtBQUwsQ0FBV21FLFVBQVgsQ0FBc0IyRixhQUF0QjtBQUNBLEVBRkQ7O0FBSUF4RSxNQUFLcEYsSUFBTCxHQUFZMkosU0FBWjtBQUNBLENBdkNEIiwiZmlsZSI6InBhZ2VEb3JtYW50aWNpZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWxzIGNhbnZhcywgY3R4LCBHYW1lSW5wdXQsIEdhbWVHcmFwaGljcywgR2FtZVV0aWxzLCBHYW1lVmlldyAqL1xuLypcbiAqICAgIERlY2xhcmVzIHR3byBnbG9iYWxzOiBjYW52YXMgYW5kIGN0eFxuICovXG5mdW5jdGlvbiBHYW1lRW5naW5lKCkge1xuICAgIC8vIGJhY2sgYnV0dG9uXG4gICAgbGV0IGJhY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYmFja0J0bi5ocmVmID0gJy8jZ2FtZXMnO1xuICAgIGJhY2tCdG4uaW5uZXJUZXh0ID0gJ0JhY2snO1xuICAgIGJhY2tCdG4uY2xhc3NOYW1lID0gJ2J0bkJhY2snO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmFja0J0bik7XG5cbiAgICAvLyBjYW52YXNXcmFwXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3cmFwLmNsYXNzTmFtZSA9ICdjYW52YXNXcmFwJztcblxuICAgIC8vIGNhbnZhc1xuICAgIHdpbmRvdy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDE2KjYzKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA5KjYzKTtcbiAgICB3cmFwLmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwKTtcblxuICAgIHdpbmRvdy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHRoaXMuaW5wdXQgPSBuZXcgR2FtZUlucHV0KHRoaXMpO1xuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgR2FtZUdyYXBoaWNzKHRoaXMpO1xuICAgIHRoaXMudXRpbHMgPSBuZXcgR2FtZVV0aWxzKHRoaXMpO1xuICAgIHRoaXMudmlldyA9IG5ldyBHYW1lVmlldyh0aGlzKTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5HYW1lRW5naW5lLnByb3RvdHlwZSA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgdGhhdCxcbiAgICAgICAgdXBkYXRlSW50ZXJ2YWwsXG4gICAgICAgIHJlbmRlclJBRixcbiAgICAgICAgb25VcGRhdGVTZXQgPSBmYWxzZSxcbiAgICAgICAgb25SZW5kZXJTZXQgPSBmYWxzZVxuICAgIDtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhhdC52aWV3LnVwZGF0ZSgpO1xuXG4gICAgICAgIGlmKG9uVXBkYXRlU2V0KSB7XG4gICAgICAgICAgICB0aGF0Lm9uVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJlbmRlclJBRiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB0aGF0LnZpZXcucmVuZGVyKCk7XG5cbiAgICAgICAgaWYob25SZW5kZXJTZXQpIHtcbiAgICAgICAgICAgIHRoYXQub25SZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0ID0gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uVXBkYXRlU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25VcGRhdGUgPSBjYWxsYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlbmRlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uUmVuZGVyU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXIgPSBjYWxsYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICBzdGFydDogKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGUsIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICByZW5kZXJSQUYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wOiAoKSA9PiB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlbmRlclJBRik7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qXG4gKlxuICovXG5jbGFzcyBHYW1lU2F2ZSB7XG4gICAgbG9hZChzbG90KSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2VbYHNsb3QgJHtzbG90fWBdO1xuICAgIH1cblxuICAgIGdldExpc3QoKSB7XG4gICAgICAgIHZhciB6ZXJvID0gdGhpcy5sb2FkKDApLFxuICAgICAgICAgICAgb25lID0gdGhpcy5sb2FkKDEpLFxuICAgICAgICAgICAgdHdvID0gdGhpcy5sb2FkKDIpLFxuICAgICAgICAgICAgZGVmID0gJy0tLSdcbiAgICAgICAgO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAodHlwZW9mKHplcm8pICE9PSAndW5kZWZpbmVkJykgPyB6ZXJvIDogZGVmLFxuICAgICAgICAgICAgKHR5cGVvZihvbmUpICE9PSAndW5kZWZpbmVkJykgPyBvbmUgOiBkZWYsXG4gICAgICAgICAgICAodHlwZW9mKHR3bykgIT09ICd1bmRlZmluZWQnKSA/IHR3byA6IGRlZlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHNhdmUoc2xvdCwgZGF0YSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2VbYHNsb3QgJHtzbG90fWBdID0gZGF0YTtcbiAgICB9XG5cbiAgICBlcmFzZShzbG90KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBzbG90ICR7c2xvdH1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdCgpO1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qXG4gKiBUaGUgaW5wdXQgY29tcG9uZW50IG9mIEdhbWVFbmdpbmUuXG4gKi9cbmZ1bmN0aW9uIEdhbWVJbnB1dCgpIHtcblx0dGhpcy5rZXlzRG93biA9IHt9O1xuXHR0aGlzLmxhc3RLZXlVcCA9IEtleUNvZGUuRU1QVFk7XG5cdHRoaXMubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG5cdHRoaXMuaW5pdCgpO1xufVxuXG5HYW1lSW5wdXQucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgdGhhdDtcblxuXHRmdW5jdGlvbiBmaXhLZXkoa2V5KSB7XG5cdFx0aWYoa2V5ID09PSBLZXlDb2RlLlcpXG5cdFx0XHRrZXkgPSBLZXlDb2RlLlVQO1xuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLlMpXG5cdFx0XHRrZXkgPSBLZXlDb2RlLkRPV047XG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuRClcblx0XHRcdGtleSA9IEtleUNvZGUuUklHSFQ7XG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuQSlcblx0XHRcdGtleSA9IEtleUNvZGUuTEVGVDtcblxuXHRcdHJldHVybiBrZXk7XG5cdH1cblxuXHRhZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXHRcdGxldCBrZXkgPSBmaXhLZXkoZS5rZXlDb2RlKTtcblxuXHRcdGlmKCF0aGF0LmtleXNEb3duW2tleV0pIHtcblx0XHRcdHRoYXQubGFzdEtleURvd24gPSBrZXk7XG5cdFx0XHR0aGF0LmtleXNEb3duW2tleV0gPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vdGhhdC5vbktleURvd24oa2V5KTtcblx0fSk7XG5cblx0YWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG5cdFx0dGhhdC5sYXN0S2V5VXAgPSBmaXhLZXkoZS5rZXlDb2RlKTtcblx0XHRkZWxldGUgdGhhdC5rZXlzRG93blt0aGF0Lmxhc3RLZXlVcF07XG5cdH0pO1xuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoYXQgPSB0aGlzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0fS8vLFxuXG5cdFx0Ly8gb25LZXlEb3duOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdC8vICAgICB0aGlzLm9uS2V5RG93biA9IGNhbGxiYWNrO1xuXHRcdC8vIH1cblx0fTtcbn0pKCk7XG5cblxuLy8gZ2xvYmFsIGVudW1zXG52YXIgS2V5Q29kZSA9IE9iamVjdC5mcmVlemUoe1xuXHRFTVBUWTogLTEsXG5cdEVOVEVSOiAxMyxcblx0Q1RSTDogMTcsXG5cdEVTQzogMjcsXG5cdFNQQUNFQkFSOiAzMixcblx0TEVGVDogMzcsXG5cdFVQOiAzOCxcblx0UklHSFQ6IDM5LFxuXHRET1dOOiA0MCxcblx0REVMRVRFOiA0Nixcblx0QTogNjUsXG5cdEQ6IDY4LFxuXHRGOiA3MCxcblx0SDogNzIsXG5cdEo6IDc0LFxuXHRLOiA3NSxcblx0TTogNzcsXG5cdE86IDc5LFxuXHRSOiA4Mixcblx0UzogODMsXG5cdFc6IDg3XG59KTtcblxubGV0IEtleUNvZGVOYW1lcyA9IHt9O1xuS2V5Q29kZU5hbWVzWy0xXSA9ICdFTVBUWSc7XG5LZXlDb2RlTmFtZXNbMTNdID0gJ0VOVEVSJztcbktleUNvZGVOYW1lc1sxN10gPSAnQ1RSTCc7XG5LZXlDb2RlTmFtZXNbMjddID0gJ0VTQyc7XG5LZXlDb2RlTmFtZXNbMzJdID0gJ1NQQUNFQkFSJztcbktleUNvZGVOYW1lc1szN10gPSAnTEVGVCc7XG5LZXlDb2RlTmFtZXNbMzhdID0gJ1VQJztcbktleUNvZGVOYW1lc1szOV0gPSAnUklHSFQnO1xuS2V5Q29kZU5hbWVzWzQwXSA9ICdET1dOJztcbktleUNvZGVOYW1lc1s0Nl0gPSAnREVMRVRFJztcbktleUNvZGVOYW1lc1s2NV0gPSAnQSc7XG5LZXlDb2RlTmFtZXNbNjhdID0gJ0QnO1xuS2V5Q29kZU5hbWVzWzcwXSA9ICdGJztcbktleUNvZGVOYW1lc1s3Ml0gPSAnSCc7XG5LZXlDb2RlTmFtZXNbNzRdID0gJ0onO1xuS2V5Q29kZU5hbWVzWzc1XSA9ICdLJztcbktleUNvZGVOYW1lc1s3N10gPSAnTSc7XG5LZXlDb2RlTmFtZXNbNzldID0gJ08nO1xuS2V5Q29kZU5hbWVzWzgyXSA9ICdSJztcbktleUNvZGVOYW1lc1s4M10gPSAnUyc7XG5LZXlDb2RlTmFtZXNbODddID0gJ1cnO1xuIiwiLypcbiAgICBUaGUgdXRpbHMgY29tcG9uZW50IG9mIEdhbWVFbmdpbmUuXG4qL1xuZnVuY3Rpb24gR2FtZVV0aWxzKGdFbmdpbmUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAvKlxuICAgICAgICAgICAgUmVzZXRzIHRoZSBuZXdWaWV3J3MgcHJpdmF0ZSB2YXJpYWJsZXMuXG4gICAgICAgICAgICBDaGFuZ2VzIHRoZSB2aWV3LlxuICAgICAgICAqL1xuICAgICAgICBzd2l0Y2hWaWV3OiBmdW5jdGlvbihuZXdWaWV3KSB7XG4gICAgICAgICAgICBuZXdWaWV3LmluaXQoKTtcbiAgICAgICAgICAgIGdFbmdpbmUudmlldyA9IG5ld1ZpZXc7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBnbG9iYWwgZW51bXNcbnZhciBEaXIgPSBPYmplY3QuZnJlZXplKHtcbiAgICBSSUdIVDogMCxcbiAgICBMRUZUOiAxXG59KTsiLCIvLyBWZXJzaW9uIDAuMiAtIENvcHlyaWdodCAyMDEzIC0gIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+XG4vL1xuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2pyaWVja2VuL3NhdC1qc1xuLy9cbi8vIEEgc2ltcGxlIGxpYnJhcnkgZm9yIGRldGVybWluaW5nIGludGVyc2VjdGlvbnMgb2YgY2lyY2xlcyBhbmRcbi8vIHBvbHlnb25zIHVzaW5nIHRoZSBTZXBhcmF0aW5nIEF4aXMgVGhlb3JlbS5cbi8qKiBAcHJlc2VydmUgU0FULmpzIC0gVmVyc2lvbiAwLjIgLSBDb3B5cmlnaHQgMjAxMyAtIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+IC0gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBodHRwczovL2dpdGh1Yi5jb20vanJpZWNrZW4vc2F0LWpzICovXG5cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UqL1xuLypqc2hpbnQgc2hhZG93OnRydWUsIHN1Yjp0cnVlLCBmb3Jpbjp0cnVlLCBub2FyZzp0cnVlLCBub2VtcHR5OnRydWUsIFxuICBlcWVxZXE6dHJ1ZSwgYml0d2lzZTp0cnVlLCBzdHJpY3Q6dHJ1ZSwgdW5kZWY6dHJ1ZSwgXG4gIGN1cmx5OnRydWUsIGJyb3dzZXI6dHJ1ZSAqL1xuXG4vLyBDcmVhdGUgYSBVTUQgd3JhcHBlciBmb3IgU0FULiBXb3JrcyBpbjpcbi8vXG4vLyAgLSBQbGFpbiBicm93c2VyIHZpYSBnbG9iYWwgU0FUIHZhcmlhYmxlXG4vLyAgLSBBTUQgbG9hZGVyIChsaWtlIHJlcXVpcmUuanMpXG4vLyAgLSBOb2RlLmpzXG4vL1xuLy8gVGhlIHF1b3RlZCBwcm9wZXJ0aWVzIGFsbCBvdmVyIHRoZSBwbGFjZSBhcmUgdXNlZCBzbyB0aGF0IHRoZSBDbG9zdXJlIENvbXBpbGVyXG4vLyBkb2VzIG5vdCBtYW5nbGUgdGhlIGV4cG9zZWQgQVBJIGluIGFkdmFuY2VkIG1vZGUuXG4vKipcbiAqIEBwYXJhbSB7Kn0gcm9vdCAtIFRoZSBnbG9iYWwgc2NvcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZhY3RvcnkgLSBGYWN0b3J5IHRoYXQgY3JlYXRlcyBTQVQgbW9kdWxlXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgIGRlZmluZShmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290WydTQVQnXSA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBTQVQgPSB7fTtcblxuICAvL1xuICAvLyAjIyBWZWN0b3JcbiAgLy9cbiAgLy8gUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXG5cblxuICAvLyBDcmVhdGUgYSBuZXcgVmVjdG9yLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzLiBJZlxuICAvLyBhIGNvb3JkaW5hdGUgaXMgbm90IHNwZWNpZmllZCwgaXQgd2lsbCBiZSBzZXQgdG8gYDBgXG4gIC8qKiBcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geCBUaGUgeCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geSBUaGUgeSBwb3NpdGlvbi5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBWZWN0b3IoeCwgeSkge1xuICAgIHRoaXNbJ3gnXSA9IHggfHwgMDtcbiAgICB0aGlzWyd5J10gPSB5IHx8IDA7XG4gIH1cbiAgU0FUWydWZWN0b3InXSA9IFZlY3RvcjtcbiAgLy8gQWxpYXMgYFZlY3RvcmAgYXMgYFZgXG4gIFNBVFsnViddID0gVmVjdG9yO1xuXG5cbiAgLy8gQ29weSB0aGUgdmFsdWVzIG9mIGFub3RoZXIgVmVjdG9yIGludG8gdGhpcyBvbmUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2NvcHknXSA9IFZlY3Rvci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdGhpc1sneCddID0gb3RoZXJbJ3gnXTtcbiAgICB0aGlzWyd5J10gPSBvdGhlclsneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIENoYW5nZSB0aGlzIHZlY3RvciB0byBiZSBwZXJwZW5kaWN1bGFyIHRvIHdoYXQgaXQgd2FzIGJlZm9yZS4gKEVmZmVjdGl2ZWx5XG4gIC8vIHJvYXRhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uKVxuICAvKipcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3BlcnAnXSA9IFZlY3Rvci5wcm90b3R5cGUucGVycCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gdGhpc1sneCddO1xuICAgIHRoaXNbJ3gnXSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzWyd5J10gPSAteDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBSb3RhdGUgdGhpcyB2ZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncm90YXRlJ10gPSBWZWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xuICAgIHZhciB4ID0gdGhpc1sneCddO1xuICAgIHZhciB5ID0gdGhpc1sneSddO1xuICAgIHRoaXNbJ3gnXSA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xuICAgIHRoaXNbJ3knXSA9IHggKiBNYXRoLnNpbihhbmdsZSkgKyB5ICogTWF0aC5jb3MoYW5nbGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJldmVyc2UgdGhpcyB2ZWN0b3IuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncmV2ZXJzZSddID0gVmVjdG9yLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1sneCddID0gLXRoaXNbJ3gnXTtcbiAgICB0aGlzWyd5J10gPSAtdGhpc1sneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcblxuICAvLyBOb3JtYWxpemUgdGhpcyB2ZWN0b3IuICAobWFrZSBpdCBoYXZlIGxlbmd0aCBvZiBgMWApXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnbm9ybWFsaXplJ10gPSBWZWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkID0gdGhpcy5sZW4oKTtcbiAgICBpZihkID4gMCkge1xuICAgICAgdGhpc1sneCddID0gdGhpc1sneCddIC8gZDtcbiAgICAgIHRoaXNbJ3knXSA9IHRoaXNbJ3knXSAvIGQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLy8gQWRkIGFub3RoZXIgdmVjdG9yIHRvIHRoaXMgb25lLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydhZGQnXSA9IFZlY3Rvci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICB0aGlzWyd4J10gKz0gb3RoZXJbJ3gnXTtcbiAgICB0aGlzWyd5J10gKz0gb3RoZXJbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIFN1YnRyYWN0IGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnc3ViJ10gPSBWZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdGhpc1sneCddIC09IG90aGVyWyd4J107XG4gICAgdGhpc1sneSddIC09IG90aGVyWyd5J107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvLyBTY2FsZSB0aGlzIHZlY3Rvci4gQW4gaW5kZXBlbmRhbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkXG4gIC8vIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHRoYXQgd2lsbCBzY2FsZSBib3RoIGB4YCBhbmQgYHlgLlxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB4IGRpcmVjdGlvbi5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geSBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHkgZGlyZWN0aW9uLiAgSWYgdGhpc1xuICAgKiAgIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSB4IHNjYWxpbmcgZmFjdG9yIHdpbGwgYmUgdXNlZC5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3NjYWxlJ10gPSBWZWN0b3IucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24oeCx5KSB7XG4gICAgdGhpc1sneCddICo9IHg7XG4gICAgdGhpc1sneSddICo9IHkgfHwgeDtcbiAgICByZXR1cm4gdGhpczsgXG4gIH07XG4gIFxuICAvLyBQcm9qZWN0IHRoaXMgdmVjdG9yIG9uIHRvIGFub3RoZXIgdmVjdG9yLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncHJvamVjdCddID0gVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0ID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICB2YXIgYW10ID0gdGhpcy5kb3Qob3RoZXIpIC8gb3RoZXIubGVuMigpO1xuICAgIHRoaXNbJ3gnXSA9IGFtdCAqIG90aGVyWyd4J107XG4gICAgdGhpc1sneSddID0gYW10ICogb3RoZXJbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIFByb2plY3QgdGhpcyB2ZWN0b3Igb250byBhIHZlY3RvciBvZiB1bml0IGxlbmd0aC4gVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudFxuICAvLyB0aGFuIGBwcm9qZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCB1bml0IHZlY3RvcnMuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3Byb2plY3ROJ10gPSBWZWN0b3IucHJvdG90eXBlLnByb2plY3ROID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICB2YXIgYW10ID0gdGhpcy5kb3Qob3RoZXIpO1xuICAgIHRoaXNbJ3gnXSA9IGFtdCAqIG90aGVyWyd4J107XG4gICAgdGhpc1sneSddID0gYW10ICogb3RoZXJbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIFJlZmxlY3QgdGhpcyB2ZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3JlZmxlY3QnXSA9IFZlY3Rvci5wcm90b3R5cGUucmVmbGVjdCA9IGZ1bmN0aW9uKGF4aXMpIHtcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzLnByb2plY3QoYXhpcykuc2NhbGUoMik7XG4gICAgdGhpc1sneCddIC09IHg7XG4gICAgdGhpc1sneSddIC09IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvLyBSZWZsZWN0IHRoaXMgdmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzIChyZXByZXNlbnRlZCBieSBhIHVuaXQgdmVjdG9yKS4gVGhpcyBpc1xuICAvLyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGByZWZsZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCBhbiBheGlzIHRoYXQgaXMgYSB1bml0IHZlY3Rvci5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSB1bml0IHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydyZWZsZWN0TiddID0gVmVjdG9yLnByb3RvdHlwZS5yZWZsZWN0TiA9IGZ1bmN0aW9uKGF4aXMpIHtcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzLnByb2plY3ROKGF4aXMpLnNjYWxlKDIpO1xuICAgIHRoaXNbJ3gnXSAtPSB4O1xuICAgIHRoaXNbJ3knXSAtPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLy8gR2V0IHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlci5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSAgb3RoZXIgVGhlIHZlY3RvciB0byBkb3QgdGhpcyBvbmUgYWdhaW5zdC5cbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgZG90IHByb2R1Y3QuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydkb3QnXSA9IFZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpc1sneCddICogb3RoZXJbJ3gnXSArIHRoaXNbJ3knXSAqIG90aGVyWyd5J107XG4gIH07XG4gIFxuICAvLyBHZXQgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAvKipcbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgbGVuZ3RoXjIgb2YgdGhpcyB2ZWN0b3IuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydsZW4yJ10gPSBWZWN0b3IucHJvdG90eXBlLmxlbjIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG4gIH07XG4gIFxuICAvLyBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgLyoqXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2xlbiddID0gVmVjdG9yLnByb3RvdHlwZS5sZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcbiAgfTtcbiAgXG4gIC8vICMjIENpcmNsZVxuICAvL1xuICAvLyBSZXByZXNlbnRzIGEgY2lyY2xlIHdpdGggYSBwb3NpdGlvbiBhbmQgYSByYWRpdXMuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGNpcmNsZSwgb3B0aW9uYWxseSBwYXNzaW5nIGluIGEgcG9zaXRpb24gYW5kL29yIHJhZGl1cy4gSWYgbm8gcG9zaXRpb25cbiAgLy8gaXMgZ2l2ZW4sIHRoZSBjaXJjbGUgd2lsbCBiZSBhdCBgKDAsMClgLiBJZiBubyByYWRpdXMgaXMgcHJvdmlkZWQsIHRoZSBjaXJjbGUgd2lsbFxuICAvLyBoYXZlIGEgcmFkaXVzIG9mIGAwYC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHIgVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gQ2lyY2xlKHBvcywgcikge1xuICAgIHRoaXNbJ3BvcyddID0gcG9zIHx8IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzWydyJ10gPSByIHx8IDA7XG4gIH1cbiAgU0FUWydDaXJjbGUnXSA9IENpcmNsZTtcblxuICAvLyAjIyBQb2x5Z29uXG4gIC8vXG4gIC8vIFJlcHJlc2VudHMgYSAqY29udmV4KiBwb2x5Z29uIHdpdGggYW55IG51bWJlciBvZiBwb2ludHMgKHNwZWNpZmllZCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlcilcbiAgLy9cbiAgLy8gVGhlIGVkZ2VzL25vcm1hbHMgb2YgdGhlIHBvbHlnb24gd2lsbCBiZSBjYWxjdWxhdGVkIG9uIGNyZWF0aW9uIGFuZCBzdG9yZWQgaW4gdGhlXG4gIC8vIGBlZGdlc2AgYW5kIGBub3JtYWxzYCBwcm9wZXJ0aWVzLiBJZiB5b3UgY2hhbmdlIHRoZSBwb2x5Z29uJ3MgcG9pbnRzLCB5b3Ugd2lsbCBuZWVkXG4gIC8vIHRvIGNhbGwgYHJlY2FsY2AgdG8gcmVjYWxjdWxhdGUgdGhlIGVkZ2VzL25vcm1hbHMuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IHBvbHlnb24sIHBhc3NpbmcgaW4gYSBwb3NpdGlvbiB2ZWN0b3IsIGFuZCBhbiBhcnJheSBvZiBwb2ludHMgKHJlcHJlc2VudGVkXG4gIC8vIGJ5IHZlY3RvcnMgcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uXG4gIC8vIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luIG9mIHRoZSBwb2x5Z29uLiAoYWxsIG90aGVyXG4gICAqICAgcG9pbnRzIGFyZSByZWxhdGl2ZSB0byB0aGlzIG9uZSlcbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPj19IHBvaW50cyBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLFxuICAgKiAgIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIFBvbHlnb24ocG9zLCBwb2ludHMpIHtcbiAgICB0aGlzWydwb3MnXSA9IHBvcyB8fCBuZXcgVmVjdG9yKCk7XG4gICAgdGhpc1sncG9pbnRzJ10gPSBwb2ludHMgfHwgW107XG4gICAgdGhpcy5yZWNhbGMoKTtcbiAgfVxuICBTQVRbJ1BvbHlnb24nXSA9IFBvbHlnb247XG4gIFxuICAvLyBSZWNhbGN1bGF0ZXMgdGhlIGVkZ2VzIGFuZCBub3JtYWxzIG9mIHRoZSBwb2x5Z29uLiBUaGlzICoqbXVzdCoqIGJlIGNhbGxlZFxuICAvLyBpZiB0aGUgYHBvaW50c2AgYXJyYXkgaXMgbW9kaWZpZWQgYXQgYWxsIGFuZCB0aGUgZWRnZXMgb3Igbm9ybWFscyBhcmUgdG8gYmVcbiAgLy8gYWNjZXNzZWQuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWydyZWNhbGMnXSA9IFBvbHlnb24ucHJvdG90eXBlLnJlY2FsYyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xuICAgIC8vIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhIGdpdmVuIGVkZ2UgZnJvbSB0aGUgZWRnZSB2YWx1ZSwgeW91IG11c3RcbiAgICAvLyBmaXJzdCB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICB0aGlzWydlZGdlcyddID0gW107XG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcbiAgICAvLyB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGFuIGVkZ2Ugbm9ybWFsLCB5b3UgbXVzdCBmaXJzdFxuICAgIC8vIHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgIHRoaXNbJ25vcm1hbHMnXSA9IFtdO1xuICAgIHZhciBwb2ludHMgPSB0aGlzWydwb2ludHMnXTtcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgcDEgPSBwb2ludHNbaV07IFxuICAgICAgdmFyIHAyID0gaSA8IGxlbiAtIDEgPyBwb2ludHNbaSArIDFdIDogcG9pbnRzWzBdO1xuICAgICAgdmFyIGUgPSBuZXcgVmVjdG9yKCkuY29weShwMikuc3ViKHAxKTtcbiAgICAgIHZhciBuID0gbmV3IFZlY3RvcigpLmNvcHkoZSkucGVycCgpLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpc1snZWRnZXMnXS5wdXNoKGUpO1xuICAgICAgdGhpc1snbm9ybWFscyddLnB1c2gobik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJvdGF0ZXMgdGhpcyBwb2x5Z29uIGNvdW50ZXItY2xvY2t3aXNlIGFyb3VuZCB0aGUgb3JpZ2luIG9mICppdHMgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cbiAgLy9cbiAgLy8gTm90ZTogWW91IGRvICoqbm90KiogbmVlZCB0byBjYWxsIGByZWNhbGNgIGFmdGVyIHJvdGF0aW9uLlxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgUG9seWdvbi5wcm90b3R5cGVbJ3JvdGF0ZSddID0gUG9seWdvbi5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24oYW5nbGUpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgcG9pbnRzID0gdGhpc1sncG9pbnRzJ107XG4gICAgdmFyIGVkZ2VzID0gdGhpc1snZWRnZXMnXTtcbiAgICB2YXIgbm9ybWFscyA9IHRoaXNbJ25vcm1hbHMnXTtcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBvaW50c1tpXS5yb3RhdGUoYW5nbGUpO1xuICAgICAgZWRnZXNbaV0ucm90YXRlKGFuZ2xlKTtcbiAgICAgIG5vcm1hbHNbaV0ucm90YXRlKGFuZ2xlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gVHJhbnNsYXRlcyB0aGUgcG9pbnRzIG9mIHRoaXMgcG9seWdvbiBieSBhIHNwZWNpZmllZCBhbW91bnQgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiAqaXRzIG93biBjb29yZGluYXRlXG4gIC8vIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxuICAvL1xuICAvLyBUaGlzIGlzIG1vc3QgdXNlZnVsIHRvIGNoYW5nZSB0aGUgXCJjZW50ZXIgcG9pbnRcIiBvZiBhIHBvbHlnb24uXG4gIC8vXG4gIC8vIE5vdGU6IFlvdSBkbyAqKm5vdCoqIG5lZWQgdG8gY2FsbCBgcmVjYWxjYCBhZnRlciB0cmFuc2xhdGlvbi5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB2ZXJ0aWNhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWyd0cmFuc2xhdGUnXSA9IFBvbHlnb24ucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIHBvaW50cyA9IHRoaXNbJ3BvaW50cyddO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgcG9pbnRzW2ldLnggKz0geDtcbiAgICAgIHBvaW50c1tpXS55ICs9IHk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vICMjIEJveFxuICAvL1xuICAvLyBSZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3gsIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC4gSWYgbm8gcG9zaXRpb25cbiAgLy8gaXMgZ2l2ZW4sIHRoZSBwb3NpdGlvbiB3aWxsIGJlIGAoMCwwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbFxuICAvLyBiZSBzZXQgdG8gYDBgLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3I9fSBwb3MgQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSB0b3AtbGVmdCBvZiB0aGUgYm94LlxuICAgKiBAcGFyYW0gez9udW1iZXI9fSB3IFRoZSB3aWR0aCBvZiB0aGUgYm94LlxuICAgKiBAcGFyYW0gez9udW1iZXI9fSBoIFRoZSBoZWlnaHQgb2YgdGhlIGJveC5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBCb3gocG9zLCB3LCBoKSB7XG4gICAgdGhpc1sncG9zJ10gPSBwb3MgfHwgbmV3IFZlY3RvcigpO1xuICAgIHRoaXNbJ3cnXSA9IHcgfHwgMDtcbiAgICB0aGlzWydoJ10gPSBoIHx8IDA7XG4gIH1cbiAgU0FUWydCb3gnXSA9IEJveDtcblxuICAvLyBSZXR1cm5zIGEgcG9seWdvbiB3aG9zZSBlZGdlcyBhcmUgdGhlIHNhbWUgYXMgdGhpcyBib3guXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIGJveC5cbiAgICovXG4gIEJveC5wcm90b3R5cGVbJ3RvUG9seWdvbiddID0gQm94LnByb3RvdHlwZS50b1BvbHlnb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcG9zID0gdGhpc1sncG9zJ107XG4gICAgdmFyIHcgPSB0aGlzWyd3J107XG4gICAgdmFyIGggPSB0aGlzWydoJ107XG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IocG9zWyd4J10sIHBvc1sneSddKSwgW1xuICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksIFxuICAgICBuZXcgVmVjdG9yKHcsaCksIG5ldyBWZWN0b3IoMCxoKVxuICAgIF0pO1xuICB9O1xuICBcbiAgLy8gIyMgUmVzcG9uc2VcbiAgLy9cbiAgLy8gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVzdWx0IG9mIGFuIGludGVyc2VjdGlvbi4gQ29udGFpbnM6XG4gIC8vICAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cbiAgLy8gIC0gVGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG1pbmltdW0gY2hhbmdlIG5lY2Vzc2FyeSB0byBleHRyYWN0IHRoZSBmaXJzdCBvYmplY3RcbiAgLy8gICAgZnJvbSB0aGUgc2Vjb25kIG9uZSAoYXMgd2VsbCBhcyBhIHVuaXQgdmVjdG9yIGluIHRoYXQgZGlyZWN0aW9uIGFuZCB0aGUgbWFnbml0dWRlXG4gIC8vICAgIG9mIHRoZSBvdmVybGFwKVxuICAvLyAgLSBXaGV0aGVyIHRoZSBmaXJzdCBvYmplY3QgaXMgZW50aXJlbHkgaW5zaWRlIHRoZSBzZWNvbmQsIGFuZCB2aWNlIHZlcnNhLlxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqLyAgXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKCkge1xuICAgIHRoaXNbJ2EnXSA9IG51bGw7XG4gICAgdGhpc1snYiddID0gbnVsbDtcbiAgICB0aGlzWydvdmVybGFwTiddID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXNbJ292ZXJsYXBWJ10gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG4gIFNBVFsnUmVzcG9uc2UnXSA9IFJlc3BvbnNlO1xuXG4gIC8vIFNldCBzb21lIHZhbHVlcyBvZiB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGVpciBkZWZhdWx0cy4gIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmXG4gIC8vIHlvdSBhcmUgZ29pbmcgdG8gcmV1c2UgYSBzaW5nbGUgUmVzcG9uc2Ugb2JqZWN0IGZvciBtdWx0aXBsZSBpbnRlcnNlY3Rpb24gdGVzdHMgKHJlY29tbWVudGVkXG4gIC8vIGFzIGl0IHdpbGwgYXZvaWQgYWxsY2F0aW5nIGV4dHJhIG1lbW9yeSlcbiAgLyoqXG4gICAqIEByZXR1cm4ge1Jlc3BvbnNlfSBUaGlzIGZvciBjaGFpbmluZ1xuICAgKi9cbiAgUmVzcG9uc2UucHJvdG90eXBlWydjbGVhciddID0gUmVzcG9uc2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1snYUluQiddID0gdHJ1ZTtcbiAgICB0aGlzWydiSW5BJ10gPSB0cnVlO1xuICAgIHRoaXNbJ292ZXJsYXAnXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gIyMgT2JqZWN0IFBvb2xzXG5cbiAgLy8gQSBwb29sIG9mIGBWZWN0b3JgIG9iamVjdHMgdGhhdCBhcmUgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWRcbiAgLy8gYWxsb2NhdGluZyBtZW1vcnkuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPFZlY3Rvcj59XG4gICAqL1xuICB2YXIgVF9WRUNUT1JTID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykgeyBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpOyB9XG4gIFxuICAvLyBBIHBvb2wgb2YgYXJyYXlzIG9mIG51bWJlcnMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZ1xuICAvLyBtZW1vcnkuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPEFycmF5LjxudW1iZXI+Pn1cbiAgICovXG4gIHZhciBUX0FSUkFZUyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykgeyBUX0FSUkFZUy5wdXNoKFtdKTsgfVxuXG4gIC8vICMjIEhlbHBlciBGdW5jdGlvbnNcblxuICAvLyBGbGF0dGVucyB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHBvaW50cyBvbnRvIGEgdW5pdCB2ZWN0b3IgYXhpcyxcbiAgLy8gcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbmFsIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZFxuICAvLyBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBub3JtYWwgVGhlIHVuaXQgdmVjdG9yIGF4aXMgdG8gZmxhdHRlbiBvbi5cbiAgICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gcmVzdWx0IEFuIGFycmF5LiAgQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLFxuICAgKiAgIHJlc3VsdFswXSB3aWxsIGJlIHRoZSBtaW5pbXVtIHZhbHVlLFxuICAgKiAgIHJlc3VsdFsxXSB3aWxsIGJlIHRoZSBtYXhpbXVtIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gZmxhdHRlblBvaW50c09uKHBvaW50cywgbm9ybWFsLCByZXN1bHQpIHtcbiAgICB2YXIgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB2YXIgbWF4ID0gLU51bWJlci5NQVhfVkFMVUU7XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbFxuICAgICAgdmFyIGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcbiAgICAgIGlmIChkb3QgPCBtaW4pIHsgbWluID0gZG90OyB9XG4gICAgICBpZiAoZG90ID4gbWF4KSB7IG1heCA9IGRvdDsgfVxuICAgIH1cbiAgICByZXN1bHRbMF0gPSBtaW47IHJlc3VsdFsxXSA9IG1heDtcbiAgfVxuICBcbiAgLy8gQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZFxuICAvLyBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYlBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj59IGJQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgc2Vjb25kIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnNcbiAgICogICB3aWxsIGJlIHByb2plY3RlZCBvbnRvIHRoaXMgYXhpcy5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWRcbiAgICogICBpZiB0aGUgYXhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLFxuICAgKiAgIGFuZCBhIHJlc3BvbnNlIGlzIHBhc3NlZCBpbiwgaW5mb3JtYXRpb24gYWJvdXQgaG93IG11Y2ggb3ZlcmxhcCBhbmRcbiAgICogICB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvdmVybGFwIHdpbGwgYmUgcG9wdWxhdGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gaXNTZXBhcmF0aW5nQXhpcyhhUG9zLCBiUG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBheGlzLCByZXNwb25zZSkge1xuICAgIHZhciByYW5nZUEgPSBUX0FSUkFZUy5wb3AoKTtcbiAgICB2YXIgcmFuZ2VCID0gVF9BUlJBWVMucG9wKCk7XG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgb2Zmc2V0IGJldHdlZW4gdGhlIHR3byBwb2x5Z29uc1xuICAgIHZhciBvZmZzZXRWID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xuICAgIHZhciBwcm9qZWN0ZWRPZmZzZXQgPSBvZmZzZXRWLmRvdChheGlzKTtcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxuICAgIGZsYXR0ZW5Qb2ludHNPbihhUG9pbnRzLCBheGlzLCByYW5nZUEpO1xuICAgIGZsYXR0ZW5Qb2ludHNPbihiUG9pbnRzLCBheGlzLCByYW5nZUIpO1xuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxuICAgIHJhbmdlQlswXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XG4gICAgcmFuZ2VCWzFdICs9IHByb2plY3RlZE9mZnNldDtcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXG4gICAgaWYgKHJhbmdlQVswXSA+IHJhbmdlQlsxXSB8fCByYW5nZUJbMF0gPiByYW5nZUFbMV0pIHtcbiAgICAgIFRfVkVDVE9SUy5wdXNoKG9mZnNldFYpOyBcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTsgXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHZhciBvdmVybGFwID0gMDtcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcbiAgICAgIGlmIChyYW5nZUFbMF0gPCByYW5nZUJbMF0pIHtcbiAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA8IHJhbmdlQlsxXSkgeyBcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xuICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XG4gICAgICAgICAgdmFyIG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xuICAgICAgICB9XG4gICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7IFxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XG4gICAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xuICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICB2YXIgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cbiAgICAgIHZhciBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlWydvdmVybGFwJ10pIHtcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXAnXSA9IGFic092ZXJsYXA7XG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLmNvcHkoYXhpcyk7XG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkge1xuICAgICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSAgICAgIFxuICAgIH1cbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTsgXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUEpOyBcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICAvLyBDYWxjdWxhdGVzIHdoaWNoIFZvcm5vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cbiAgLy8gSXQgaXMgYXNzdW1lZCB0aGF0IGJvdGggdGhlIGxpbmUgYW5kIHRoZSBwb2ludCBhcmUgcmVsYXRpdmUgdG8gYCgwLDApYFxuICAvL1xuICAvLyAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxuICAvLyAgICAgKC0xKSAgW1NdLS0tLS0tLS0tLS0tLS1bRV0gICgxKVxuICAvLyAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IGxpbmUgVGhlIGxpbmUgc2VnbWVudC5cbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludC5cbiAgICogQHJldHVybiAge251bWJlcn0gTEVGVF9WT1JOT0lfUkVHSU9OICgtMSkgaWYgaXQgaXMgdGhlIGxlZnQgcmVnaW9uLCBcbiAgICogICAgICAgICAgTUlERExFX1ZPUk5PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLCBcbiAgICogICAgICAgICAgUklHSFRfVk9STk9JX1JFR0lPTiAoMSkgaWYgaXQgaXMgdGhlIHJpZ2h0IHJlZ2lvbi5cbiAgICovXG4gIGZ1bmN0aW9uIHZvcm5vaVJlZ2lvbihsaW5lLCBwb2ludCkge1xuICAgIHZhciBsZW4yID0gbGluZS5sZW4yKCk7XG4gICAgdmFyIGRwID0gcG9pbnQuZG90KGxpbmUpO1xuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIHN0YXJ0IG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGVcbiAgICAvLyBsZWZ0IHZvcm5vaSByZWdpb24uXG4gICAgaWYgKGRwIDwgMCkgeyByZXR1cm4gTEVGVF9WT1JOT0lfUkVHSU9OOyB9XG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGVcbiAgICAvLyByaWdodCB2b3Jub2kgcmVnaW9uLlxuICAgIGVsc2UgaWYgKGRwID4gbGVuMikgeyByZXR1cm4gUklHSFRfVk9STk9JX1JFR0lPTjsgfVxuICAgIC8vIE90aGVyd2lzZSwgaXQncyBpbiB0aGUgbWlkZGxlIG9uZS5cbiAgICBlbHNlIHsgcmV0dXJuIE1JRERMRV9WT1JOT0lfUkVHSU9OOyB9XG4gIH1cbiAgLy8gQ29uc3RhbnRzIGZvciBWb3Jub2kgcmVnaW9uc1xuICAvKipcbiAgICogQGNvbnN0XG4gICAqL1xuICB2YXIgTEVGVF9WT1JOT0lfUkVHSU9OID0gLTE7XG4gIC8qKlxuICAgKiBAY29uc3RcbiAgICovXG4gIHZhciBNSURETEVfVk9STk9JX1JFR0lPTiA9IDA7XG4gIC8qKlxuICAgKiBAY29uc3RcbiAgICovXG4gIHZhciBSSUdIVF9WT1JOT0lfUkVHSU9OID0gMTtcbiAgXG4gIC8vICMjIENvbGxpc2lvbiBUZXN0c1xuXG4gIC8vIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYSBUaGUgZmlyc3QgY2lyY2xlLlxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcbiAgICogICB0aGUgY2lyY2xlcyBpbnRlcnNlY3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LiBcbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVDaXJjbGUoYSwgYiwgcmVzcG9uc2UpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvXG4gICAgLy8gY2lyY2xlcyBpcyBncmVhdGVyIHRoYW4gdGhlaXIgY29tYmluZWQgcmFkaXVzLlxuICAgIHZhciBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGJbJ3BvcyddKS5zdWIoYVsncG9zJ10pO1xuICAgIHZhciB0b3RhbFJhZGl1cyA9IGFbJ3InXSArIGJbJ3InXTtcbiAgICB2YXIgdG90YWxSYWRpdXNTcSA9IHRvdGFsUmFkaXVzICogdG90YWxSYWRpdXM7XG4gICAgdmFyIGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxuICAgIGlmIChkaXN0YW5jZVNxID4gdG90YWxSYWRpdXNTcSkge1xuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHsgXG4gICAgICB2YXIgZGlzdCA9IE1hdGguc3FydChkaXN0YW5jZVNxKTtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBhO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGI7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcCddID0gdG90YWxSYWRpdXMgLSBkaXN0O1xuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBOJ10uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5jb3B5KGRpZmZlcmVuY2VWKS5zY2FsZShyZXNwb25zZVsnb3ZlcmxhcCddKTtcbiAgICAgIHJlc3BvbnNlWydhSW5CJ109IGFbJ3InXSA8PSBiWydyJ10gJiYgZGlzdCA8PSBiWydyJ10gLSBhWydyJ107XG4gICAgICByZXNwb25zZVsnYkluQSddID0gYlsnciddIDw9IGFbJ3InXSAmJiBkaXN0IDw9IGFbJ3InXSAtIGJbJ3InXTtcbiAgICB9XG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFNBVFsndGVzdENpcmNsZUNpcmNsZSddID0gdGVzdENpcmNsZUNpcmNsZTtcbiAgXG4gIC8vIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZlxuICAgKiAgIHRoZXkgaW50ZXJzZXQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhleSBpbnRlcnNlY3QsIGZhbHNlIGlmIHRoZXkgZG9uJ3QuXG4gICAqL1xuICBmdW5jdGlvbiB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKSB7XG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxuICAgIHZhciBjaXJjbGVQb3MgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShjaXJjbGVbJ3BvcyddKS5zdWIocG9seWdvblsncG9zJ10pO1xuICAgIHZhciByYWRpdXMgPSBjaXJjbGVbJ3InXTtcbiAgICB2YXIgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcbiAgICB2YXIgcG9pbnRzID0gcG9seWdvblsncG9pbnRzJ107XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgdmFyIGVkZ2UgPSBUX1ZFQ1RPUlMucG9wKCk7XG4gICAgdmFyIHBvaW50ID0gVF9WRUNUT1JTLnBvcCgpO1xuICAgIFxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xuICAgICAgdmFyIHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xuICAgICAgdmFyIG92ZXJsYXAgPSAwO1xuICAgICAgdmFyIG92ZXJsYXBOID0gbnVsbDtcbiAgICAgIFxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxuICAgICAgZWRnZS5jb3B5KHBvbHlnb25bJ2VkZ2VzJ11baV0pO1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXG4gICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tpXSk7XG4gICAgICBcbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50XG4gICAgICAvLyBpcyBiaWdnZXIgdGhhbiB0aGUgcmFkaXVzLCB0aGUgcG9seWdvbiBpcyBkZWZpbml0ZWx5IG5vdCBmdWxseSBpblxuICAgICAgLy8gdGhlIGNpcmNsZS5cbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSB7XG4gICAgICAgIHJlc3BvbnNlWydhSW5CJ10gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIFZvcm5vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxuICAgICAgdmFyIHJlZ2lvbiA9IHZvcm5vaVJlZ2lvbihlZGdlLCBwb2ludCk7XG4gICAgICAvLyBJZiBpdCdzIHRoZSBsZWZ0IHJlZ2lvbjpcbiAgICAgIGlmIChyZWdpb24gPT09IExFRlRfVk9STk9JX1JFR0lPTikgeyBcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk5PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW3ByZXZdKTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcbiAgICAgICAgdmFyIHBvaW50MiA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XG4gICAgICAgIHJlZ2lvbiA9IHZvcm5vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JOT0lfUkVHSU9OKSB7XG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxuICAgICAgICAgIHZhciBkaXN0ID0gcG9pbnQubGVuKCk7XG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTsgXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTsgXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcbiAgICAgIC8vIElmIGl0J3MgdGhlIHJpZ2h0IHJlZ2lvbjpcbiAgICAgIH0gZWxzZSBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JOT0lfUkVHSU9OKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBsZWZ0IHJlZ2lvbiBvbiB0aGUgbmV4dCBlZGdlXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW25leHRdKTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cbiAgICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbbmV4dF0pO1xuICAgICAgICByZWdpb24gPSB2b3Jub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk5PSV9SRUdJT04pIHtcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXG4gICAgICAgICAgdmFyIGRpc3QgPSBwb2ludC5sZW4oKTtcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpOyBcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpOyBcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICAgIFxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5lZWQgdG8gY2hlY2sgaWYgdGhlIGNpcmNsZSBpcyBpbnRlcnNlY3RpbmcgdGhlIGVkZ2UsXG4gICAgICAgIC8vIENoYW5nZSB0aGUgZWRnZSBpbnRvIGl0cyBcImVkZ2Ugbm9ybWFsXCIuXG4gICAgICAgIHZhciBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcbiAgICAgICAgLy8gRmluZCB0aGUgcGVycGVuZGljdWxhciBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIFxuICAgICAgICAvLyBjaXJjbGUgYW5kIHRoZSBlZGdlLlxuICAgICAgICB2YXIgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xuICAgICAgICB2YXIgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXG4gICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0QWJzID4gcmFkaXVzKSB7XG4gICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTsgXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gobm9ybWFsKTsgXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICBvdmVybGFwTiA9IG5vcm1hbDtcbiAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlXG4gICAgICAgICAgLy8gY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlLCB0aGUgY2lyY2xlIGlzIG5vdCBmdWxseSBpbnNpZGUgdGhlIHBvbHlnb24uXG4gICAgICAgICAgaWYgKGRpc3QgPj0gMCB8fCBvdmVybGFwIDwgMiAqIHJhZGl1cykge1xuICAgICAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuIFxuICAgICAgLy8gKG92ZXJsYXBOIG1heSBiZSBudWxsIGlmIHRoZSBjaXJjbGUgd2FzIGluIHRoZSB3cm9uZyBWb3Jub2kgcmVnaW9uKS5cbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlWydvdmVybGFwJ10pKSB7XG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwJ10gPSBvdmVybGFwO1xuICAgICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5jb3B5KG92ZXJsYXBOKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgcmVzcG9uc2VbJ2EnXSA9IHBvbHlnb247XG4gICAgICByZXNwb25zZVsnYiddID0gY2lyY2xlO1xuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShyZXNwb25zZVsnb3ZlcmxhcE4nXSkuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XG4gICAgfVxuICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7IFxuICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpOyBcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgU0FUWyd0ZXN0UG9seWdvbkNpcmNsZSddID0gdGVzdFBvbHlnb25DaXJjbGU7XG4gIFxuICAvLyBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXG4gIC8vXG4gIC8vICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0XG4gIC8vIHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZyBhdCB0aGUgZW5kLlxuICAvKipcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXG4gICAqICAgdGhleSBpbnRlcnNldC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZSwgcG9seWdvbiwgcmVzcG9uc2UpIHtcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cbiAgICB2YXIgcmVzdWx0ID0gdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSByZXNwb25zZS5cbiAgICAgIHZhciBhID0gcmVzcG9uc2VbJ2EnXTtcbiAgICAgIHZhciBhSW5CID0gcmVzcG9uc2VbJ2FJbkInXTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLnJldmVyc2UoKTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLnJldmVyc2UoKTtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSByZXNwb25zZVsnYiddO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGE7XG4gICAgICByZXNwb25zZVsnYUluQiddID0gcmVzcG9uc2VbJ2JJbkEnXTtcbiAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBhSW5CO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFNBVFsndGVzdENpcmNsZVBvbHlnb24nXSA9IHRlc3RDaXJjbGVQb2x5Z29uO1xuICBcbiAgLy8gQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYSBUaGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcbiAgICogICB0aGV5IGludGVyc2V0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LlxuICAgKi9cbiAgZnVuY3Rpb24gdGVzdFBvbHlnb25Qb2x5Z29uKGEsIGIsIHJlc3BvbnNlKSB7XG4gICAgdmFyIGFQb2ludHMgPSBhWydwb2ludHMnXTtcbiAgICB2YXIgYUxlbiA9IGFQb2ludHMubGVuZ3RoO1xuICAgIHZhciBiUG9pbnRzID0gYlsncG9pbnRzJ107XG4gICAgdmFyIGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcbiAgICAgIGlmIChpc1NlcGFyYXRpbmdBeGlzKGFbJ3BvcyddLCBiWydwb3MnXSwgYVBvaW50cywgYlBvaW50cywgYVsnbm9ybWFscyddW2ldLCByZXNwb25zZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBCIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yICh2YXIgaSA9IDA7aSA8IGJMZW47IGkrKykge1xuICAgICAgaWYgKGlzU2VwYXJhdGluZ0F4aXMoYVsncG9zJ10sIGJbJ3BvcyddLCBhUG9pbnRzLCBiUG9pbnRzLCBiWydub3JtYWxzJ11baV0sIHJlc3BvbnNlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNpbmNlIG5vbmUgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIG9yIEIgYXJlIGEgc2VwYXJhdGluZyBheGlzLCB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cbiAgICAvLyBhbmQgd2UndmUgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZSBzbWFsbGVzdCBvdmVybGFwIChpbiBpc1NlcGFyYXRpbmdBeGlzKS4gIENhbGN1bGF0ZSB0aGVcbiAgICAvLyBmaW5hbCBvdmVybGFwIHZlY3Rvci5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBhO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGI7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5jb3B5KHJlc3BvbnNlWydvdmVybGFwTiddKS5zY2FsZShyZXNwb25zZVsnb3ZlcmxhcCddKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgU0FUWyd0ZXN0UG9seWdvblBvbHlnb24nXSA9IHRlc3RQb2x5Z29uUG9seWdvbjtcblxuICByZXR1cm4gU0FUO1xufSkpOyIsIi8qXG4gICAgVGhlIGdyYXBoaWNzIGNvbXBvbmVudCBvZiBHYW1lRW5naW5lLlxuKi9cbnZhciBHYW1lR3JhcGhpY3MgPSBmdW5jdGlvbihnRW5naW5lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNBbmltYXRpbmc6IGZhbHNlLFxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBAcGFyYW0obnVtYmVyKSB0aW1lU3RlcCBUaGUgd2FpdCB0aW1lIGJldHdlZW4gcnVubmluZyB0aGUgYWN0aW9uIChpbiBtcykuXG4gICAgICAgICAgICBAcGFyYW0obnVtYmVyKSBudW1UaW1lcyBUaGUgbnVtYmVyIHRvIHRpbWVzIHRvIHJ1biB0aGUgYWN0aW9uLlxuICAgICAgICAgICAgQHBhcmFtKGZ1bmN0aW9uKSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgICovXG4gICAgICAgIHJlcGVhdEFjdGlvbjogZnVuY3Rpb24odGltZVN0ZXAsIG51bVRpbWVzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBudW0gPSAwLFxuICAgICAgICAgICAgICAgIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHZhciB0aGVBbmltYXRpb24gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihudW0rKyA+IG51bVRpbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhlQW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aW1lU3RlcCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb25MaW5rZXIuanNcIiAvPlxuXG4vKlxuICAgIEEgZ2VuZXJpYyB2aWV3IGludGVyZmFjZS5cbiovXG5mdW5jdGlvbiBHYW1lVmlldyhnRW5naW5lKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHtcbiAgICAgICAgYmdDb2xvcjogXCIjY2NjXCJcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkdhbWVWaWV3LnByb3RvdHlwZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5wcml2YXRlcy5iZ0NvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbHMgZ2FtZSwgY2FudmFzLCBjdHgsIEtleUNvZGUgKi9cbi8qXG4gKiAgSW1wbGVtZW50cyBHYW1lVmlldy5cbiAqL1xuZnVuY3Rpb24gVGl0bGVWaWV3KHRpdGxlKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHtcbiAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5UaXRsZVZpZXcucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuICAgIGxldCB0aXRsZSxcbiAgICAgICAgY3RhID0gJ1ByZXNzIEVudGVyJ1xuICAgIDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aXRsZSA9IHRoaXMucHJpdmF0ZXMudGl0bGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuRU5URVIpIHtcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gJzM2cHggQXJpYWwnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aXRsZSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aXRsZSkud2lkdGggLyAyLCAxMDApO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9ICcyNHB4IEFyaWFsJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChjdGEsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQoY3RhKS53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb25MaW5rZXIuanNcIiAvPlxuXG5mdW5jdGlvbiBHYW1lU2F2ZVZpZXcoKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHt9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkdhbWVTYXZlVmlldy5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQsXG4gICAgICAgIHRpdGxlID0gXCJTZWxlY3QgYSBzYXZlIHNsb3RcIixcbiAgICAgICAgY3RhID0gXCJQcmVzcyBEZWxldGUgdG8gZXJhc2UgYSBzYXZlXCIsXG4gICAgICAgIHN0b3JhZ2UgPSBuZXcgR2FtZVNhdmUoKSxcbiAgICAgICAgbGlzdCA9IHN0b3JhZ2UuZ2V0TGlzdCgpLFxuICAgICAgICBhcnJvd1xuICAgIDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgYXJyb3cgPSB7XG4gICAgICAgICAgICAgICAgaW1nOiBcIj4+XCIsXG4gICAgICAgICAgICAgICAgc2xvdDogMCxcbiAgICAgICAgICAgICAgICB4OiBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KGxpc3RbMF0pLndpZHRoIC8gMiAtIDYwLCAgICAvLyBUT0RPOiBtYWtlIGluc3RhbmNlIHZhcj8/XG4gICAgICAgICAgICAgICAgeTogMjAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkVTQykge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soS2V5Q29kZS5FU0MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkVOVEVSKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBkYXRlLmdldERheSgpO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gZGF0ZS5nZXRZZWFyKCk7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkYXRlLnRvTG9jYWxlVGltZVN0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zYXZlKGFycm93LnNsb3QsIG0gKyAnLycgKyBkICsgJy8nICsgeSArICcgJyArIHQpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soS2V5Q29kZS5FTlRFUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuREVMRVRFKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93bnAgPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgbGlzdCA9IHN0b3JhZ2UuZXJhc2UoYXJyb3cuc2xvdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFycm93LnNsb3QgIT09IDIgJiYgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5ET1dOKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICArK2Fycm93LnNsb3Q7XG4gICAgICAgICAgICAgICAgYXJyb3cueCA9IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQobGlzdFthcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XG4gICAgICAgICAgICAgICAgYXJyb3cueSArPSA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJyb3cuc2xvdCAhPT0gMCAmJiBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLlVQKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICAtLWFycm93LnNsb3Q7XG4gICAgICAgICAgICAgICAgYXJyb3cueCA9IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQobGlzdFthcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XG4gICAgICAgICAgICAgICAgYXJyb3cueSAtPSA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzExMVwiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gXCIzNnB4IEFyaWFsXCJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aXRsZSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aXRsZSkud2lkdGggLyAyLCA4MCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gXCIyNHB4IEFyaWFsXCJcblxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQobGlzdFtpXSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dChsaXN0W2ldKS53aWR0aCAvIDIsIDIwMCArIGkgKiA4MCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChhcnJvdy5pbWcsIGFycm93LngsIGFycm93LnkpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2xpbmtlci5qc1wiIC8+XG5cbmZ1bmN0aW9uIE92ZXJ3b3JsZFZpZXcoKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHt9O1xuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5PdmVyd29ybGRWaWV3LnByb3RvdHlwZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgYXJyb3cgPSB7XG4gICAgICAgIGltZzogXCJeXlwiXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFycm93LnggPSA5MDtcbiAgICAgICAgICAgIGFycm93LnkgPSBjYW52YXMuaGVpZ2h0IC8gMiArIDcwO1xuICAgICAgICAgICAgYXJyb3cuc2xvdCA9IDA7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FTlRFUikge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuUklHSFQpIHtcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoYXJyb3cuc2xvdCA8IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3cueCArPSAxMTU7XG4gICAgICAgICAgICAgICAgICAgICsrYXJyb3cuc2xvdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkxFRlQpIHtcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcblxuICAgICAgICAgICAgICAgIGlmIChhcnJvdy5zbG90ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhcnJvdy54IC09IDExNTtcbiAgICAgICAgICAgICAgICAgICAgLS1hcnJvdy5zbG90O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmRcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMzNDI4MmNcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBsZXZlbHNcbiAgICAgICAgICAgIHZhciBzaXplID0gODAsIHgsIHk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgKytpKSB7XG4gICAgICAgICAgICAgICAgeCA9IDYwICsgaSAqIDExNTtcbiAgICAgICAgICAgICAgICB5ID0gY2FudmFzLmhlaWdodCAvIDIgLSBzaXplIC8gMjtcblxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiMThweCBBcmlhbFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIkxldmVsIFwiICsgKGkrMSksIHggKyAxMCwgeSAtIDEzKTtcblxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBzaXplLCBzaXplKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYXJyb3dcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChhcnJvdy5pbWcsIGFycm93LngsIGFycm93LnkpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFscyBnYW1lLCBjYW52YXMsIGN0eCwgS2V5Q29kZSwgRGlyLCBGaWdodEFjdGlvbiAqL1xuLypcbiAqICBJbXBsZW1lbnRzIEdhbWVWaWV3LlxuICovXG5mdW5jdGlvbiBCYXR0bGVWaWV3KGJnQ29sb3IsIGRvcm1hbnRMLCBkb3JtYW50Uikge1xuICAgIHRoaXMucHJpdmF0ZXMgPSB7XG4gICAgICAgIGJnQ29sb3I6IGJnQ29sb3IsXG4gICAgICAgIGRvcm1hbnRMOiBkb3JtYW50TCxcbiAgICAgICAgZG9ybWFudFI6IGRvcm1hbnRSXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5CYXR0bGVWaWV3LnByb3RvdHlwZSA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgdGhhdCxcbiAgICAgICAgYXJyb3cgPSB7XG4gICAgICAgICAgICBpbWc6ICc+PidcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdCxcbiAgICAgICAgd2FzQXR0YWNrLFxuICAgICAgICB3YXNBdHRhY2tUaW1lcixcbiAgICAgICAgZmlyZSxcbiAgICAgICAgdGhlQXR0YWNrLFxuICAgICAgICBkb3JtYW50TCxcbiAgICAgICAgZG9ybWFudFJcbiAgICA7XG5cbiAgICBmdW5jdGlvbiBjaGVja0lucHV0KGRvcm1hbnRMLCBkb3JtYW50Uikge1xuICAgICAgICBzd2l0Y2goZ2FtZS5pbnB1dC5sYXN0S2V5RG93bikge1xuICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkVOVEVSOlxuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgdGhlQXR0YWNrLm5hbWUgPSBkb3JtYW50TC5hY3Rpb25zW2Fycm93LmN1clNsb3RdLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhlQXR0YWNrLmF0ayA9IChkb3JtYW50TC5hdGsgKiBkb3JtYW50TC5hY3Rpb25zW2Fycm93LmN1clNsb3RdLm11bHRpcGxpZXIpIC8gZG9ybWFudFIuZGVmO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuVVA6XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICBpZihhcnJvdy5jdXJTbG90ICE9PSAwICYmIGRvcm1hbnRMLmFjdGlvbnNbYXJyb3cuY3VyU2xvdCAtIDFdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tYXJyb3cuY3VyU2xvdDtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3cueSAtPSAzMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuRE9XTjpcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcblxuICAgICAgICAgICAgICAgIGlmKGFycm93LmN1clNsb3QgIT09IDMgJiYgZG9ybWFudEwuYWN0aW9uc1thcnJvdy5jdXJTbG90ICsgMV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKythcnJvdy5jdXJTbG90O1xuICAgICAgICAgICAgICAgICAgICBhcnJvdy55ICs9IDMwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1blRhY2tsZUFuaW1hdGlvbigpIHtcbiAgICAgICAgbGVmdC5kaXIgPSBEaXIuUklHSFQ7XG5cbiAgICAgICAgZ2FtZS5ncmFwaGljcy5yZXBlYXRBY3Rpb24oNiwgNjAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYobGVmdC5kaXIgPT09IERpci5SSUdIVCAmJiBsZWZ0LnggPiA2MCkge1xuICAgICAgICAgICAgICAgIGxlZnQuZGlyID0gRGlyLkxFRlQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGxlZnQuZGlyID09PSBEaXIuUklHSFQpIHtcbiAgICAgICAgICAgICAgICArK2xlZnQueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC0tbGVmdC54O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb3JtYW50Ui5ocCAtPSB0aGVBdHRhY2suYXRrIC8gNjA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKioqKiogUmVuZGVyICoqKioqL1xuICAgIGZ1bmN0aW9uIGRyYXdEb3JtYW50SFVEKGRvcm1hbnQsIHgsIHksIGRyYXdYUCkge1xuICAgICAgICAvLyBuYW1lXG4gICAgICAgIGxldCBzdHIgPSBkb3JtYW50Lm5hbWUgKyAnIEwnICsgZG9ybWFudC5sdmw7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICBjdHguZmlsbFRleHQoc3RyLCB4ICsgY3R4Lm1lYXN1cmVUZXh0KHN0cikud2lkdGggLyAyLCB5KTtcblxuICAgICAgICAvLyBocFxuICAgICAgICBjdHguZmlsbFRleHQoJ0hQJywgeCwgeSArIDIwKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KHggKyAyMSwgeSArIDEyLCAxMDAsIDEwKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHggKyAyMiwgeSArIDEzLCBkb3JtYW50LmhwICogKDEwMCAvIGRvcm1hbnQuaW5pdEhQKSAtIDEsIDgpO1xuXG4gICAgICAgIC8vIHhwXG4gICAgICAgIGlmKGRyYXdYUCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiWFBcIiwgeCwgeSArIDQwKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCArIDIxLCB5ICsgMzIsIDEwMCwgMTApO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjNzc3XCI7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeCArIDIyLCB5ICsgMzMsIGRvcm1hbnQueHAgKiAoMTAwIC8gZG9ybWFudC54cE5lZWRlZCkgLSAxLCA4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdIVUQoKSB7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICBjdHguc3Ryb2tlUmVjdCgyMCwgMzAwLCA1MDAsIDI1MCk7XG5cbiAgICAgICAgY3R4LmZvbnQgPSBcIjEycHggQXJpYWxcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJBVEs6IFwiICsgZG9ybWFudEwuYXRrLCA0NjAsIDMyMCk7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIkRFRjogXCIgKyBkb3JtYW50TC5kZWYsIDQ2MCwgMzQwKTtcblxuICAgICAgICBkcmF3QWN0aW9uTGlzdCgpO1xuICAgICAgICBkcmF3QWN0aW9uQXJyb3coKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3QWN0aW9uTGlzdCgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcblxuICAgICAgICBmb3IodmFyIGk9MDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgaWYgKGRvcm1hbnRMLmFjdGlvbnNbaV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJy0tJywgODAsIDM1MCArIGkgKiAzMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoZG9ybWFudEwuYWN0aW9uc1tpXS5uYW1lLCA4MCwgMzUwICsgaSAqIDMwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdBY3Rpb25BcnJvdygpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KGFycm93LmltZywgYXJyb3cueCwgYXJyb3cueSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBhcnJvdy54ID0gNDM7XG4gICAgICAgICAgICBhcnJvdy55ID0gMzUwO1xuICAgICAgICAgICAgYXJyb3cuY3VyU2xvdCA9IDA7XG5cbiAgICAgICAgICAgIGxlZnQgPSB7XG4gICAgICAgICAgICAgICAgeDogMzAsXG4gICAgICAgICAgICAgICAgZGlyOiBEaXIuUklHSFRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZpcmUgPSB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3YXNBdHRhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHdhc0F0dGFja1RpbWVyID0gNjA7XG4gICAgICAgICAgICB0aGVBdHRhY2sgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0VNUFRZJyxcbiAgICAgICAgICAgICAgICBhdGs6IDBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRvcm1hbnRMID0gdGhpcy5wcml2YXRlcy5kb3JtYW50TDtcbiAgICAgICAgICAgIGRvcm1hbnRSID0gdGhpcy5wcml2YXRlcy5kb3JtYW50UjtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYod2FzQXR0YWNrKSB7XG4gICAgICAgICAgICAgICAgZG9ybWFudFIuaHAgLT0gdGhlQXR0YWNrLmF0ayAvIDYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIWdhbWUuZ3JhcGhpY3MuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3dhc0F0dGFjayA9IGNoZWNrSW5wdXQoZG9ybWFudEwsIGRvcm1hbnRSKTtcbiAgICAgICAgICAgICAgICBpZihfd2FzQXR0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoZUF0dGFjay5uYW1lID09PSBGaWdodEFjdGlvbi5UQUNLTEUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVuVGFja2xlQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGVBdHRhY2submFtZSA9PT0gRmlnaHRBY3Rpb24uRFJBR09OU19CUkVBVEgubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FzQXR0YWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZG9ybWFudFIuaHAgPD0gMCkge1xuICAgICAgICAgICAgICAgIGRvcm1hbnRMLnhwICs9IDI1O1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmRcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnByaXZhdGVzLmJnQ29sb3I7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gbGVmdFxuICAgICAgICAgICAgZHJhd0Rvcm1hbnRIVUQoZG9ybWFudEwsIDEwLCAxNSwgdHJ1ZSk7XG4gICAgICAgICAgICBkb3JtYW50TC5kcmF3KGxlZnQueCwgOTApO1xuICAgICAgICAgICAgZHJhd0hVRCgpO1xuXG4gICAgICAgICAgICAvLyByaWdodFxuICAgICAgICAgICAgZHJhd0Rvcm1hbnRIVUQoZG9ybWFudFIsIGNhbnZhcy53aWR0aCAtIDEzMCwgMTUsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvcm1hbnRSLmRyYXcoNzcwLCA5MCk7XG5cbiAgICAgICAgICAgIC8vIGF0dGFjayBhbmltYXRpb25cbiAgICAgICAgICAgIGlmKHdhc0F0dGFjaykge1xuICAgICAgICAgICAgICAgIGxldCB0ID0gKHdhc0F0dGFja1RpbWVyICUgNDApO1xuXG4gICAgICAgICAgICAgICAgaWYodCA+PSAwICYmIHQgPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJlLnggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHQgPj0gMTAgJiYgdCA8IDIwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmUueCA9IDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodCA+PSAyMCAmJiB0IDwgMzApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZS54ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0ID49IDMwICYmIHQgPCA0MCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJlLnggPSAtNTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDg3MCArIGZpcmUueCwgMjQyLCA0MCwgMTIpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCg4ODAgKyBmaXJlLngsIDIzMCwgMzAsIDEyKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoODgwICsgZmlyZS54LCAyMTgsIDIwLCAxMik7XG5cblxuICAgICAgICAgICAgICAgIGlmKHdhc0F0dGFja1RpbWVyLS0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgd2FzQXR0YWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHdhc0F0dGFja1RpbWVyID0gNjA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gRG9ybWFudChzcmMsIG5hbWUsIGF0aywgZGVmLCBocCwgYWN0aW9ucywgbHZsKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgdGhpcy5pbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltZ1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5pbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaW1nUmVhZHkgPSB0cnVlO1xuICAgIH07XG4gICAgdGhpcy5pbWcuc3JjID0gYGltZy8ke3NyY31gO1xuXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmF0ayA9IGF0aztcbiAgICB0aGlzLmRlZiA9IGRlZjtcbiAgICB0aGlzLmluaXRIUCA9IHRoaXMuaHAgPSBocDtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubHZsID0gKHR5cGVvZihsdmwpICE9PSAndW5kZWZpbmVkJykgPyBsdmwgOiAxO1xuICAgIHRoaXMueHAgPSAwO1xuICAgIHRoaXMueHBOZWVkZWQgPSA1MDtcbn1cblxuRG9ybWFudC5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkcmF3OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgICBpZih0aGlzLmltZ1JlYWR5KSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgeCwgeSwgdGhpcy5pbWcud2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsInZhciBGaWdodEFjdGlvbiA9IE9iamVjdC5mcmVlemUoe1xuICAgIFRBQ0tMRToge1xuICAgICAgICBuYW1lOiBcIlRBQ0tMRVwiLFxuICAgICAgICBtdWx0aXBsaWVyOiAxXG4gICAgfSxcbiAgICBIRUFMOiB7XG4gICAgICAgIG5hbWU6IFwiSEVBTFwiLFxuICAgICAgICBtdWx0aXBsaWVyOiAxXG4gICAgfSxcbiAgICBEUkFHT05TX0JSRUFUSDoge1xuICAgICAgICBuYW1lOiBcIkRSQUdPTlMgQlJFQVRIXCIsXG4gICAgICAgIG11bHRpcGxpZXI6IDVcbiAgICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWxzIEdhbWVFbmdpbmUsIFRpdGxlVmlldywgT3ZlcndvcmxkVmlldywgRmlnaHRBY3Rpb24sIERvcm1hbnQsIEJhdHRsZVZpZXcsIGdhbWUgKi9cbi8qXG4gKiAgVGhlIG1haW4gY2xhc3MgZm9yIGRvcm1hbnRpY2lkZS5cbiAqICBEZWNsYXJlcyBnYW1lIGFzIGEgZ2xvYmFsLlxuICovXG4oZnVuY3Rpb24gTWFpbigpIHtcblx0d2luZG93LmdhbWUgPSBuZXcgR2FtZUVuZ2luZSgpO1xuXHRnYW1lLnN0YXJ0KCk7XG5cblx0bGV0IGN1ckx2bCA9IDE7XG5cblx0bGV0IHRpdGxlVmlldyA9IG5ldyBUaXRsZVZpZXcoJ0Rvcm1hbnRpY2lkZScpO1xuXHR0aXRsZVZpZXcudGhlbigoKSA9PiB7XG5cdFx0Z2FtZS51dGlscy5zd2l0Y2hWaWV3KG92ZXJ3b3JsZFZpZXcpO1xuXHR9KTtcblxuXHRsZXQgb3ZlcndvcmxkVmlldyA9IG5ldyBPdmVyd29ybGRWaWV3KCk7XG5cdG92ZXJ3b3JsZFZpZXcudGhlbigoKSA9PiB7XG5cdFx0aWYoY3VyTHZsID09PSAxKSB7XG5cdFx0XHRnYW1lLnV0aWxzLnN3aXRjaFZpZXcobHZsMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Z2FtZS51dGlscy5zd2l0Y2hWaWV3KGx2bDIpO1xuXHRcdH1cblx0fSk7XG5cblx0bGV0IGFjdGlvbnMgPSBbRmlnaHRBY3Rpb24uVEFDS0xFLCBGaWdodEFjdGlvbi5EUkFHT05TX0JSRUFUSCwgbnVsbCwgbnVsbF07XG5cblx0bGV0IG1hbGFpc2UgPSBuZXcgRG9ybWFudCgnbWFsYWlzZS5wbmcnLCAnTUFMQUlTRScsIDEyLCA4LCAyNywgYWN0aW9ucyk7XG5cdGxldCBlcmFib3IgPSBuZXcgRG9ybWFudCgnZXJhYm9yLnBuZycsICdFUkFCT1InLCA4LCAxMiwgMjMsIGFjdGlvbnMpO1xuXHRsZXQgdGlsZGFtZXNoID0gbmV3IERvcm1hbnQoJ3RpbGRhbWVzaC5wbmcnLCAnVElMREFNRVNIJywgOCwgMTIsIDIzLCBhY3Rpb25zKTtcblxuXHRsZXQgbHZsMSA9IG5ldyBCYXR0bGVWaWV3KCcjZGRkJywgbWFsYWlzZSwgZXJhYm9yKTtcblx0bHZsMS50aGVuKCgpID0+IHtcblx0XHQrK2N1ckx2bDtcblx0XHRnYW1lLnV0aWxzLnN3aXRjaFZpZXcob3ZlcndvcmxkVmlldyk7XG5cdH0pO1xuXG5cdGxldCBsdmwyID0gbmV3IEJhdHRsZVZpZXcoJyNkZGQnLCBtYWxhaXNlLCB0aWxkYW1lc2gpO1xuXHRsdmwyLnRoZW4oKCkgPT4ge1xuXHRcdGdhbWUudXRpbHMuc3dpdGNoVmlldyhvdmVyd29ybGRWaWV3KTtcblx0fSk7XG5cblx0Z2FtZS52aWV3ID0gdGl0bGVWaWV3O1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
