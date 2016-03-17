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

function LevelView(player, curLvl) {
    this.privates = {};
    this.player = player;
    this.curLvl = curLvl;

    this.init();
}

LevelView.prototype = function () {
    var that,
        onUpdateSet = false,
        onRenderSet = false;

    function checkCollision() {
        if (that.player.invincible) {
            if (that.player.invincibleTimer-- === 0) {
                that.player.invincible = false;
                that.player.invincibleTimer = 120;
            }

            return;
        }

        for (var i = 0; i < that.curLvl.projectiles.length; ++i) {
            var collided = SAT.testPolygonPolygon(that.player, that.curLvl.projectiles[i]);
            if (collided) {
                --that.player.hp;
                that.player.invincible = true;
                break;
            }
        }
    }

    return {
        then: function then(callback) {
            this.privates.callback = callback;
        },

        init: function init() {
            that = this;
        },

        update: function update() {
            this.curLvl.update();
            this.player.update();

            //if(onUpdateSet)
            //    this.onUpdate();

            checkCollision();
        },

        onUpdate: function onUpdate(callback) {
            onUpdateSet = true;
            this.onUpdate = callback;
        },

        render: function render() {
            this.curLvl.render();
            this.player.render();

            //if(onRenderSet)
            //    this.onRender();
        },

        onRender: function onRender(callback) {
            onRenderSet = true;
            this.onRender = callback;
        }
    };
}();
"use strict";

/// <reference path="../linker.js" />

function Level1() {

    this.init();
}

Level1.prototype = function () {

    return {
        projectiles: [],

        init: function init() {
            for (var i = 0; i < 10; ++i) {
                var projectile = new SAT.Box(new SAT.Vector(Math.floor(Math.random() * canvas.width + 0), // random number between 0 and canvas.width
                canvas.height), 10, 20).toPolygon();

                projectile.speed = Math.floor(Math.random() * 10 + 3) * 0.1;

                this.projectiles.push(projectile);
            }
        },

        update: function update() {
            for (var i = 0; i < this.projectiles.length; ++i) {
                this.projectiles[i].pos.y -= this.projectiles[i].speed;
            }
        },

        render: function render() {
            // background
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // projectiles

            ctx.fillStyle = "silver";
            for (var i = 0; i < this.projectiles.length; ++i) {
                ctx.fillRect(this.projectiles[i].pos.x, this.projectiles[i].pos.y, 10, 20);
            }
        }
    };
}();
"use strict";

/// <reference path="linker.js" />

function Vamp() {
    this.init();
}

Vamp.prototype = function () {
    var img = new Image(),
        imgReady = false;
    img.onload = function () {
        imgReady = true;
    };
    img.src = "img/vamp.png";

    var speed = 4;

    return {
        w: 40,
        h: 40,
        hp: 3,
        invincible: false,
        invincibleTimer: 120,

        init: function init() {
            $.extend(this, new SAT.Box(new SAT.Vector(0, 0), this.w, this.h).toPolygon());
        },

        update: function update() {
            // horizontal
            if (game.input.keysDown[KeyCode.RIGHT]) {
                this.pos.x += speed;
            } else if (game.input.keysDown[KeyCode.LEFT]) {
                this.pos.x -= speed;
            }

            // vertical
            if (game.input.keysDown[KeyCode.UP]) {
                this.pos.y -= speed;
            } else if (game.input.keysDown[KeyCode.DOWN]) {
                this.pos.y += speed;
            }

            if (this.hp <= 0) {
                alert("You died");
                location.reload();
            }
        },

        render: function render() {
            // body
            var doDraw = true;
            if (this.invincible) {
                var t = this.invincibleTimer % 30;
                if (t >= 0 && t < 15) doDraw = false;
            }

            if (doDraw) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
            }

            // health
            ctx.fillStyle = "red";
            for (var i = 0; i < this.hp; ++i) {
                ctx.fillRect(this.pos.x - 10 + i * 20, this.pos.y - 20, 20, 10);
            }
        }
    };
}();
'use strict';
/* globals game, GameEngine, TitleView, KeyCode, Vamp, Level1, LevelView, GameSaveView */
/*
 *  The vamp game.
 *  Declares game as a global.
 */

(function Main() {
    window.game = new GameEngine();
    game.start();

    var titleView = new TitleView('Vamp: The Great and Powerful', true);
    titleView.then(function () {
        game.utils.switchView(saveView);
    });

    var saveView = new GameSaveView();
    saveView.then(function (key) {
        if (key === KeyCode.ESC) {
            game.utils.switchView(titleView);
        } else if (key === KeyCode.ENTER) {
            game.utils.switchView(lvlView);
        }
    });

    var vamp = new Vamp();
    var lvl1 = new Level1();
    var lvlView = new LevelView(vamp, lvl1);

    game.view = titleView;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVFbmdpbmUuanMiLCJHYW1lU2F2ZS5qcyIsIkdhbWVJbnB1dC5qcyIsIkdhbWVVdGlscy5qcyIsIlNBVC5qcyIsIkdhbWVHcmFwaGljcy5qcyIsIkdhbWVWaWV3LmpzIiwiVGl0bGVWaWV3LmpzIiwiR2FtZVNhdmVWaWV3LmpzIiwiTGV2ZWxWaWV3LmpzIiwibGV2ZWwxLmpzIiwidmFtcC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUtBLFNBQVMsVUFBVCxHQUFzQjs7QUFFbEIsUUFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFWLENBRmM7QUFHbEIsWUFBUSxJQUFSLEdBQWUsU0FBZixDQUhrQjtBQUlsQixZQUFRLFNBQVIsR0FBb0IsTUFBcEIsQ0FKa0I7QUFLbEIsWUFBUSxTQUFSLEdBQW9CLFNBQXBCLENBTGtCO0FBTWxCLGFBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsT0FBMUI7OztBQU5rQixRQVNkLE9BQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVAsQ0FUYztBQVVsQixTQUFLLFNBQUwsR0FBaUIsWUFBakI7OztBQVZrQixVQWFsQixDQUFPLE1BQVAsR0FBZ0IsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWhCLENBYmtCO0FBY2xCLFdBQU8sWUFBUCxDQUFvQixPQUFwQixFQUE2QixLQUFHLEVBQUgsQ0FBN0IsQ0Fka0I7QUFlbEIsV0FBTyxZQUFQLENBQW9CLFFBQXBCLEVBQThCLElBQUUsRUFBRixDQUE5QixDQWZrQjtBQWdCbEIsU0FBSyxXQUFMLENBQWlCLE1BQWpCLEVBaEJrQjtBQWlCbEIsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixJQUExQixFQWpCa0I7O0FBbUJsQixXQUFPLEdBQVAsR0FBYSxPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBYixDQW5Ca0I7O0FBcUJsQixTQUFLLEtBQUwsR0FBYSxJQUFJLFNBQUosQ0FBYyxJQUFkLENBQWIsQ0FyQmtCO0FBc0Js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S0FMaEIsQ0FEd0I7Q0FBNUI7OztBQWNBLElBQUksTUFBTSxPQUFPLE1BQVAsQ0FBYztBQUNwQixXQUFPLENBQVA7QUFDQSxVQUFNLENBQU47Q0FGTSxDQUFOO0FDakJKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFjLElBQWQsRUFBb0IsSUFBcEIsQ0FBVixDQXRCUzs7QUF3QmIsU0FBSyxJQUFMLEdBQVksU0FBWixDQXhCYTtDQUFoQixDQUFEIiwiZmlsZSI6InBhZ2VWYW1wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFscyBjYW52YXMsIGN0eCwgR2FtZUlucHV0LCBHYW1lR3JhcGhpY3MsIEdhbWVVdGlscywgR2FtZVZpZXcgKi9cbi8qXG4gKiAgICBEZWNsYXJlcyB0d28gZ2xvYmFsczogY2FudmFzIGFuZCBjdHhcbiAqL1xuZnVuY3Rpb24gR2FtZUVuZ2luZSgpIHtcbiAgICAvLyBiYWNrIGJ1dHRvblxuICAgIGxldCBiYWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGJhY2tCdG4uaHJlZiA9ICcvI2dhbWVzJztcbiAgICBiYWNrQnRuLmlubmVyVGV4dCA9ICdCYWNrJztcbiAgICBiYWNrQnRuLmNsYXNzTmFtZSA9ICdidG5CYWNrJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJhY2tCdG4pO1xuXG4gICAgLy8gY2FudmFzV3JhcFxuICAgIGxldCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd3JhcC5jbGFzc05hbWUgPSAnY2FudmFzV3JhcCc7XG5cbiAgICAvLyBjYW52YXNcbiAgICB3aW5kb3cuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxNio2Myk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgOSo2Myk7XG4gICAgd3JhcC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcCk7XG5cbiAgICB3aW5kb3cuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB0aGlzLmlucHV0ID0gbmV3IEdhbWVJbnB1dCh0aGlzKTtcbiAgICB0aGlzLmdyYXBoaWNzID0gbmV3IEdhbWVHcmFwaGljcyh0aGlzKTtcbiAgICB0aGlzLnV0aWxzID0gbmV3IEdhbWVVdGlscyh0aGlzKTtcbiAgICB0aGlzLnZpZXcgPSBuZXcgR2FtZVZpZXcodGhpcyk7XG5cbiAgICB0aGlzLmluaXQoKTtcbn1cblxuR2FtZUVuZ2luZS5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IHRoYXQsXG4gICAgICAgIHVwZGF0ZUludGVydmFsLFxuICAgICAgICByZW5kZXJSQUYsXG4gICAgICAgIG9uVXBkYXRlU2V0ID0gZmFsc2UsXG4gICAgICAgIG9uUmVuZGVyU2V0ID0gZmFsc2VcbiAgICA7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIHRoYXQudmlldy51cGRhdGUoKTtcblxuICAgICAgICBpZihvblVwZGF0ZVNldCkge1xuICAgICAgICAgICAgdGhhdC5vblVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZW5kZXJSQUYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgdGhhdC52aWV3LnJlbmRlcigpO1xuXG4gICAgICAgIGlmKG9uUmVuZGVyU2V0KSB7XG4gICAgICAgICAgICB0aGF0Lm9uUmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdCA9IHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBvblVwZGF0ZVNldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uVXBkYXRlID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZW5kZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBvblJlbmRlclNldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uUmVuZGVyID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnQ6ICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwodXBkYXRlLCAxMDAwIC8gNjApO1xuICAgICAgICAgICAgcmVuZGVyUkFGID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcDogKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh1cGRhdGVJbnRlcnZhbCk7XG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyZW5kZXJSQUYpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG4vKlxuICpcbiAqL1xuY2xhc3MgR2FtZVNhdmUge1xuICAgIGxvYWQoc2xvdCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlW2BzbG90ICR7c2xvdH1gXTtcbiAgICB9XG5cbiAgICBnZXRMaXN0KCkge1xuICAgICAgICB2YXIgemVybyA9IHRoaXMubG9hZCgwKSxcbiAgICAgICAgICAgIG9uZSA9IHRoaXMubG9hZCgxKSxcbiAgICAgICAgICAgIHR3byA9IHRoaXMubG9hZCgyKSxcbiAgICAgICAgICAgIGRlZiA9ICctLS0nXG4gICAgICAgIDtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKHR5cGVvZih6ZXJvKSAhPT0gJ3VuZGVmaW5lZCcpID8gemVybyA6IGRlZixcbiAgICAgICAgICAgICh0eXBlb2Yob25lKSAhPT0gJ3VuZGVmaW5lZCcpID8gb25lIDogZGVmLFxuICAgICAgICAgICAgKHR5cGVvZih0d28pICE9PSAndW5kZWZpbmVkJykgPyB0d28gOiBkZWZcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBzYXZlKHNsb3QsIGRhdGEpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlW2BzbG90ICR7c2xvdH1gXSA9IGRhdGE7XG4gICAgfVxuXG4gICAgZXJhc2Uoc2xvdCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgc2xvdCAke3Nsb3R9YCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExpc3QoKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG4vKlxuICogVGhlIGlucHV0IGNvbXBvbmVudCBvZiBHYW1lRW5naW5lLlxuICovXG5mdW5jdGlvbiBHYW1lSW5wdXQoKSB7XG5cdHRoaXMua2V5c0Rvd24gPSB7fTtcblx0dGhpcy5sYXN0S2V5VXAgPSBLZXlDb2RlLkVNUFRZO1xuXHR0aGlzLmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcblxuXHR0aGlzLmluaXQoKTtcbn1cblxuR2FtZUlucHV0LnByb3RvdHlwZSA9IChmdW5jdGlvbigpIHtcblx0bGV0IHRoYXQ7XG5cblx0ZnVuY3Rpb24gZml4S2V5KGtleSkge1xuXHRcdGlmKGtleSA9PT0gS2V5Q29kZS5XKVxuXHRcdFx0a2V5ID0gS2V5Q29kZS5VUDtcblx0XHRlbHNlIGlmKGtleSA9PT0gS2V5Q29kZS5TKVxuXHRcdFx0a2V5ID0gS2V5Q29kZS5ET1dOO1xuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLkQpXG5cdFx0XHRrZXkgPSBLZXlDb2RlLlJJR0hUO1xuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLkEpXG5cdFx0XHRrZXkgPSBLZXlDb2RlLkxFRlQ7XG5cblx0XHRyZXR1cm4ga2V5O1xuXHR9XG5cblx0YWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcblx0XHRsZXQga2V5ID0gZml4S2V5KGUua2V5Q29kZSk7XG5cblx0XHRpZighdGhhdC5rZXlzRG93bltrZXldKSB7XG5cdFx0XHR0aGF0Lmxhc3RLZXlEb3duID0ga2V5O1xuXHRcdFx0dGhhdC5rZXlzRG93bltrZXldID0gdHJ1ZTtcblx0XHR9XG5cblx0XHQvL3RoYXQub25LZXlEb3duKGtleSk7XG5cdH0pO1xuXG5cdGFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuXHRcdHRoYXQubGFzdEtleVVwID0gZml4S2V5KGUua2V5Q29kZSk7XG5cdFx0ZGVsZXRlIHRoYXQua2V5c0Rvd25bdGhhdC5sYXN0S2V5VXBdO1xuXHR9KTtcblxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGF0ID0gdGhpcztcblx0XHR9LFxuXG5cdFx0dXBkYXRlOiBmdW5jdGlvbigpIHtcblxuXHRcdH0vLyxcblxuXHRcdC8vIG9uS2V5RG93bjogZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHQvLyAgICAgdGhpcy5vbktleURvd24gPSBjYWxsYmFjaztcblx0XHQvLyB9XG5cdH07XG59KSgpO1xuXG5cbi8vIGdsb2JhbCBlbnVtc1xudmFyIEtleUNvZGUgPSBPYmplY3QuZnJlZXplKHtcblx0RU1QVFk6IC0xLFxuXHRFTlRFUjogMTMsXG5cdENUUkw6IDE3LFxuXHRFU0M6IDI3LFxuXHRTUEFDRUJBUjogMzIsXG5cdExFRlQ6IDM3LFxuXHRVUDogMzgsXG5cdFJJR0hUOiAzOSxcblx0RE9XTjogNDAsXG5cdERFTEVURTogNDYsXG5cdEE6IDY1LFxuXHREOiA2OCxcblx0RjogNzAsXG5cdEg6IDcyLFxuXHRKOiA3NCxcblx0SzogNzUsXG5cdE06IDc3LFxuXHRPOiA3OSxcblx0UjogODIsXG5cdFM6IDgzLFxuXHRXOiA4N1xufSk7XG5cbmxldCBLZXlDb2RlTmFtZXMgPSB7fTtcbktleUNvZGVOYW1lc1stMV0gPSAnRU1QVFknO1xuS2V5Q29kZU5hbWVzWzEzXSA9ICdFTlRFUic7XG5LZXlDb2RlTmFtZXNbMTddID0gJ0NUUkwnO1xuS2V5Q29kZU5hbWVzWzI3XSA9ICdFU0MnO1xuS2V5Q29kZU5hbWVzWzMyXSA9ICdTUEFDRUJBUic7XG5LZXlDb2RlTmFtZXNbMzddID0gJ0xFRlQnO1xuS2V5Q29kZU5hbWVzWzM4XSA9ICdVUCc7XG5LZXlDb2RlTmFtZXNbMzldID0gJ1JJR0hUJztcbktleUNvZGVOYW1lc1s0MF0gPSAnRE9XTic7XG5LZXlDb2RlTmFtZXNbNDZdID0gJ0RFTEVURSc7XG5LZXlDb2RlTmFtZXNbNjVdID0gJ0EnO1xuS2V5Q29kZU5hbWVzWzY4XSA9ICdEJztcbktleUNvZGVOYW1lc1s3MF0gPSAnRic7XG5LZXlDb2RlTmFtZXNbNzJdID0gJ0gnO1xuS2V5Q29kZU5hbWVzWzc0XSA9ICdKJztcbktleUNvZGVOYW1lc1s3NV0gPSAnSyc7XG5LZXlDb2RlTmFtZXNbNzddID0gJ00nO1xuS2V5Q29kZU5hbWVzWzc5XSA9ICdPJztcbktleUNvZGVOYW1lc1s4Ml0gPSAnUic7XG5LZXlDb2RlTmFtZXNbODNdID0gJ1MnO1xuS2V5Q29kZU5hbWVzWzg3XSA9ICdXJztcbiIsIi8qXG4gICAgVGhlIHV0aWxzIGNvbXBvbmVudCBvZiBHYW1lRW5naW5lLlxuKi9cbmZ1bmN0aW9uIEdhbWVVdGlscyhnRW5naW5lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgIFJlc2V0cyB0aGUgbmV3VmlldydzIHByaXZhdGUgdmFyaWFibGVzLlxuICAgICAgICAgICAgQ2hhbmdlcyB0aGUgdmlldy5cbiAgICAgICAgKi9cbiAgICAgICAgc3dpdGNoVmlldzogZnVuY3Rpb24obmV3Vmlldykge1xuICAgICAgICAgICAgbmV3Vmlldy5pbml0KCk7XG4gICAgICAgICAgICBnRW5naW5lLnZpZXcgPSBuZXdWaWV3O1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gZ2xvYmFsIGVudW1zXG52YXIgRGlyID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgUklHSFQ6IDAsXG4gICAgTEVGVDogMVxufSk7IiwiLy8gVmVyc2lvbiAwLjIgLSBDb3B5cmlnaHQgMjAxMyAtICBKaW0gUmllY2tlbiA8amltckBqaW1yLmNhPlxuLy9cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmllY2tlbi9zYXQtanNcbi8vXG4vLyBBIHNpbXBsZSBsaWJyYXJ5IGZvciBkZXRlcm1pbmluZyBpbnRlcnNlY3Rpb25zIG9mIGNpcmNsZXMgYW5kXG4vLyBwb2x5Z29ucyB1c2luZyB0aGUgU2VwYXJhdGluZyBBeGlzIFRoZW9yZW0uXG4vKiogQHByZXNlcnZlIFNBVC5qcyAtIFZlcnNpb24gMC4yIC0gQ29weXJpZ2h0IDIwMTMgLSBKaW0gUmllY2tlbiA8amltckBqaW1yLmNhPiAtIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gaHR0cHM6Ly9naXRodWIuY29tL2pyaWVja2VuL3NhdC1qcyAqL1xuXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlKi9cbi8qanNoaW50IHNoYWRvdzp0cnVlLCBzdWI6dHJ1ZSwgZm9yaW46dHJ1ZSwgbm9hcmc6dHJ1ZSwgbm9lbXB0eTp0cnVlLCBcbiAgZXFlcWVxOnRydWUsIGJpdHdpc2U6dHJ1ZSwgc3RyaWN0OnRydWUsIHVuZGVmOnRydWUsIFxuICBjdXJseTp0cnVlLCBicm93c2VyOnRydWUgKi9cblxuLy8gQ3JlYXRlIGEgVU1EIHdyYXBwZXIgZm9yIFNBVC4gV29ya3MgaW46XG4vL1xuLy8gIC0gUGxhaW4gYnJvd3NlciB2aWEgZ2xvYmFsIFNBVCB2YXJpYWJsZVxuLy8gIC0gQU1EIGxvYWRlciAobGlrZSByZXF1aXJlLmpzKVxuLy8gIC0gTm9kZS5qc1xuLy9cbi8vIFRoZSBxdW90ZWQgcHJvcGVydGllcyBhbGwgb3ZlciB0aGUgcGxhY2UgYXJlIHVzZWQgc28gdGhhdCB0aGUgQ2xvc3VyZSBDb21waWxlclxuLy8gZG9lcyBub3QgbWFuZ2xlIHRoZSBleHBvc2VkIEFQSSBpbiBhZHZhbmNlZCBtb2RlLlxuLyoqXG4gKiBAcGFyYW0geyp9IHJvb3QgLSBUaGUgZ2xvYmFsIHNjb3BlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmYWN0b3J5IC0gRmFjdG9yeSB0aGF0IGNyZWF0ZXMgU0FUIG1vZHVsZVxuICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcbiAgICBkZWZpbmUoZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlWydleHBvcnRzJ10gPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdFsnU0FUJ10gPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgU0FUID0ge307XG5cbiAgLy9cbiAgLy8gIyMgVmVjdG9yXG4gIC8vXG4gIC8vIFJlcHJlc2VudHMgYSB2ZWN0b3IgaW4gdHdvIGRpbWVuc2lvbnMgd2l0aCBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzLlxuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IFZlY3Rvciwgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgeGAgYW5kIGB5YCBjb29yZGluYXRlcy4gSWZcbiAgLy8gYSBjb29yZGluYXRlIGlzIG5vdCBzcGVjaWZpZWQsIGl0IHdpbGwgYmUgc2V0IHRvIGAwYFxuICAvKiogXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHggVGhlIHggcG9zaXRpb24uXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHkgVGhlIHkgcG9zaXRpb24uXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gVmVjdG9yKHgsIHkpIHtcbiAgICB0aGlzWyd4J10gPSB4IHx8IDA7XG4gICAgdGhpc1sneSddID0geSB8fCAwO1xuICB9XG4gIFNBVFsnVmVjdG9yJ10gPSBWZWN0b3I7XG4gIC8vIEFsaWFzIGBWZWN0b3JgIGFzIGBWYFxuICBTQVRbJ1YnXSA9IFZlY3RvcjtcblxuXG4gIC8vIENvcHkgdGhlIHZhbHVlcyBvZiBhbm90aGVyIFZlY3RvciBpbnRvIHRoaXMgb25lLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydjb3B5J10gPSBWZWN0b3IucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbihvdGhlcikge1xuICAgIHRoaXNbJ3gnXSA9IG90aGVyWyd4J107XG4gICAgdGhpc1sneSddID0gb3RoZXJbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBDaGFuZ2UgdGhpcyB2ZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuIChFZmZlY3RpdmVseVxuICAvLyByb2F0YXRlcyBpdCA5MCBkZWdyZWVzIGluIGEgY2xvY2t3aXNlIGRpcmVjdGlvbilcbiAgLyoqXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydwZXJwJ10gPSBWZWN0b3IucHJvdG90eXBlLnBlcnAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcbiAgICB0aGlzWyd4J10gPSB0aGlzWyd5J107XG4gICAgdGhpc1sneSddID0gLXg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gUm90YXRlIHRoaXMgdmVjdG9yIChjb3VudGVyLWNsb2Nrd2lzZSkgYnkgdGhlIHNwZWNpZmllZCBhbmdsZSAoaW4gcmFkaWFucykuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucylcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3JvdGF0ZSddID0gVmVjdG9yLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoYW5nbGUpIHtcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzWyd4J10gPSB4ICogTWF0aC5jb3MoYW5nbGUpIC0geSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICB0aGlzWyd5J10gPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBSZXZlcnNlIHRoaXMgdmVjdG9yLlxuICAvKipcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3JldmVyc2UnXSA9IFZlY3Rvci5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXNbJ3gnXSA9IC10aGlzWyd4J107XG4gICAgdGhpc1sneSddID0gLXRoaXNbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG5cbiAgLy8gTm9ybWFsaXplIHRoaXMgdmVjdG9yLiAgKG1ha2UgaXQgaGF2ZSBsZW5ndGggb2YgYDFgKVxuICAvKipcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ25vcm1hbGl6ZSddID0gVmVjdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZCA9IHRoaXMubGVuKCk7XG4gICAgaWYoZCA+IDApIHtcbiAgICAgIHRoaXNbJ3gnXSA9IHRoaXNbJ3gnXSAvIGQ7XG4gICAgICB0aGlzWyd5J10gPSB0aGlzWyd5J10gLyBkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIEFkZCBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnYWRkJ10gPSBWZWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdGhpc1sneCddICs9IG90aGVyWyd4J107XG4gICAgdGhpc1sneSddICs9IG90aGVyWyd5J107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvLyBTdWJ0cmFjdCBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaWluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3N1YiddID0gVmVjdG9yLnByb3RvdHlwZS5zdWIgPSBmdW5jdGlvbihvdGhlcikge1xuICAgIHRoaXNbJ3gnXSAtPSBvdGhlclsneCddO1xuICAgIHRoaXNbJ3knXSAtPSBvdGhlclsneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLy8gU2NhbGUgdGhpcyB2ZWN0b3IuIEFuIGluZGVwZW5kYW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZFxuICAvLyBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB0aGF0IHdpbGwgc2NhbGUgYm90aCBgeGAgYW5kIGB5YC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHkgVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi4gIElmIHRoaXNcbiAgICogICBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgeCBzY2FsaW5nIGZhY3RvciB3aWxsIGJlIHVzZWQuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydzY2FsZSddID0gVmVjdG9yLnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uKHgseSkge1xuICAgIHRoaXNbJ3gnXSAqPSB4O1xuICAgIHRoaXNbJ3knXSAqPSB5IHx8IHg7XG4gICAgcmV0dXJuIHRoaXM7IFxuICB9O1xuICBcbiAgLy8gUHJvamVjdCB0aGlzIHZlY3RvciBvbiB0byBhbm90aGVyIHZlY3Rvci5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgdmVjdG9yIHRvIHByb2plY3Qgb250by5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3Byb2plY3QnXSA9IFZlY3Rvci5wcm90b3R5cGUucHJvamVjdCA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdmFyIGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcbiAgICB0aGlzWyd4J10gPSBhbXQgKiBvdGhlclsneCddO1xuICAgIHRoaXNbJ3knXSA9IGFtdCAqIG90aGVyWyd5J107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvLyBQcm9qZWN0IHRoaXMgdmVjdG9yIG9udG8gYSB2ZWN0b3Igb2YgdW5pdCBsZW5ndGguIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnRcbiAgLy8gdGhhbiBgcHJvamVjdGAgd2hlbiBkZWFsaW5nIHdpdGggdW5pdCB2ZWN0b3JzLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB1bml0IHZlY3RvciB0byBwcm9qZWN0IG9udG8uXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydwcm9qZWN0TiddID0gVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0TiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdmFyIGFtdCA9IHRoaXMuZG90KG90aGVyKTtcbiAgICB0aGlzWyd4J10gPSBhbXQgKiBvdGhlclsneCddO1xuICAgIHRoaXNbJ3knXSA9IGFtdCAqIG90aGVyWyd5J107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvLyBSZWZsZWN0IHRoaXMgdmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydyZWZsZWN0J10gPSBWZWN0b3IucHJvdG90eXBlLnJlZmxlY3QgPSBmdW5jdGlvbihheGlzKSB7XG4gICAgdmFyIHggPSB0aGlzWyd4J107XG4gICAgdmFyIHkgPSB0aGlzWyd5J107XG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xuICAgIHRoaXNbJ3gnXSAtPSB4O1xuICAgIHRoaXNbJ3knXSAtPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLy8gUmVmbGVjdCB0aGlzIHZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcyAocmVwcmVzZW50ZWQgYnkgYSB1bml0IHZlY3RvcikuIFRoaXMgaXNcbiAgLy8gc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgdW5pdCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncmVmbGVjdE4nXSA9IFZlY3Rvci5wcm90b3R5cGUucmVmbGVjdE4gPSBmdW5jdGlvbihheGlzKSB7XG4gICAgdmFyIHggPSB0aGlzWyd4J107XG4gICAgdmFyIHkgPSB0aGlzWyd5J107XG4gICAgdGhpcy5wcm9qZWN0TihheGlzKS5zY2FsZSgyKTtcbiAgICB0aGlzWyd4J10gLT0geDtcbiAgICB0aGlzWyd5J10gLT0geTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gIG90aGVyIFRoZSB2ZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGRvdCBwcm9kdWN0LlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnZG90J10gPSBWZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXNbJ3gnXSAqIG90aGVyWyd4J10gKyB0aGlzWyd5J10gKiBvdGhlclsneSddO1xuICB9O1xuICBcbiAgLy8gR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgLyoqXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGxlbmd0aF4yIG9mIHRoaXMgdmVjdG9yLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnbGVuMiddID0gVmVjdG9yLnByb3RvdHlwZS5sZW4yID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xuICB9O1xuICBcbiAgLy8gR2V0IHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydsZW4nXSA9IFZlY3Rvci5wcm90b3R5cGUubGVuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbjIoKSk7XG4gIH07XG4gIFxuICAvLyAjIyBDaXJjbGVcbiAgLy9cbiAgLy8gUmVwcmVzZW50cyBhIGNpcmNsZSB3aXRoIGEgcG9zaXRpb24gYW5kIGEgcmFkaXVzLlxuXG4gIC8vIENyZWF0ZSBhIG5ldyBjaXJjbGUsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiBhIHBvc2l0aW9uIGFuZC9vciByYWRpdXMuIElmIG5vIHBvc2l0aW9uXG4gIC8vIGlzIGdpdmVuLCB0aGUgY2lyY2xlIHdpbGwgYmUgYXQgYCgwLDApYC4gSWYgbm8gcmFkaXVzIGlzIHByb3ZpZGVkLCB0aGUgY2lyY2xlIHdpbGxcbiAgLy8gaGF2ZSBhIHJhZGl1cyBvZiBgMGAuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcj19IHBvcyBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZVxuICAgKiBAcGFyYW0gez9udW1iZXI9fSByIFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIENpcmNsZShwb3MsIHIpIHtcbiAgICB0aGlzWydwb3MnXSA9IHBvcyB8fCBuZXcgVmVjdG9yKCk7XG4gICAgdGhpc1snciddID0gciB8fCAwO1xuICB9XG4gIFNBVFsnQ2lyY2xlJ10gPSBDaXJjbGU7XG5cbiAgLy8gIyMgUG9seWdvblxuICAvL1xuICAvLyBSZXByZXNlbnRzIGEgKmNvbnZleCogcG9seWdvbiB3aXRoIGFueSBudW1iZXIgb2YgcG9pbnRzIChzcGVjaWZpZWQgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIpXG4gIC8vXG4gIC8vIFRoZSBlZGdlcy9ub3JtYWxzIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgY2FsY3VsYXRlZCBvbiBjcmVhdGlvbiBhbmQgc3RvcmVkIGluIHRoZVxuICAvLyBgZWRnZXNgIGFuZCBgbm9ybWFsc2AgcHJvcGVydGllcy4gSWYgeW91IGNoYW5nZSB0aGUgcG9seWdvbidzIHBvaW50cywgeW91IHdpbGwgbmVlZFxuICAvLyB0byBjYWxsIGByZWNhbGNgIHRvIHJlY2FsY3VsYXRlIHRoZSBlZGdlcy9ub3JtYWxzLlxuXG4gIC8vIENyZWF0ZSBhIG5ldyBwb2x5Z29uLCBwYXNzaW5nIGluIGEgcG9zaXRpb24gdmVjdG9yLCBhbmQgYW4gYXJyYXkgb2YgcG9pbnRzIChyZXByZXNlbnRlZFxuICAvLyBieSB2ZWN0b3JzIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvblxuICAvLyBvZiB0aGUgcG9seWdvbiB3aWxsIGJlIGAoMCwwKWAuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcj19IHBvcyBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9yaWdpbiBvZiB0aGUgcG9seWdvbi4gKGFsbCBvdGhlclxuICAgKiAgIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj49fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbixcbiAgICogICBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBQb2x5Z29uKHBvcywgcG9pbnRzKSB7XG4gICAgdGhpc1sncG9zJ10gPSBwb3MgfHwgbmV3IFZlY3RvcigpO1xuICAgIHRoaXNbJ3BvaW50cyddID0gcG9pbnRzIHx8IFtdO1xuICAgIHRoaXMucmVjYWxjKCk7XG4gIH1cbiAgU0FUWydQb2x5Z29uJ10gPSBQb2x5Z29uO1xuICBcbiAgLy8gUmVjYWxjdWxhdGVzIHRoZSBlZGdlcyBhbmQgbm9ybWFscyBvZiB0aGUgcG9seWdvbi4gVGhpcyAqKm11c3QqKiBiZSBjYWxsZWRcbiAgLy8gaWYgdGhlIGBwb2ludHNgIGFycmF5IGlzIG1vZGlmaWVkIGF0IGFsbCBhbmQgdGhlIGVkZ2VzIG9yIG5vcm1hbHMgYXJlIHRvIGJlXG4gIC8vIGFjY2Vzc2VkLlxuICAvKipcbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBQb2x5Z29uLnByb3RvdHlwZVsncmVjYWxjJ10gPSBQb2x5Z29uLnByb3RvdHlwZS5yZWNhbGMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBUaGUgZWRnZXMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmUgdG9cbiAgICAvLyB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYSBnaXZlbiBlZGdlIGZyb20gdGhlIGVkZ2UgdmFsdWUsIHlvdSBtdXN0XG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgdGhpc1snZWRnZXMnXSA9IFtdO1xuICAgIC8vIFRoZSBub3JtYWxzIGhlcmUgYXJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG5vcm1hbCBmb3IgdGhlIGBuYHRoIGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHJlbGF0aXZlXG4gICAgLy8gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhbiBlZGdlIG5vcm1hbCwgeW91IG11c3QgZmlyc3RcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICB0aGlzWydub3JtYWxzJ10gPSBbXTtcbiAgICB2YXIgcG9pbnRzID0gdGhpc1sncG9pbnRzJ107XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIHAxID0gcG9pbnRzW2ldOyBcbiAgICAgIHZhciBwMiA9IGkgPCBsZW4gLSAxID8gcG9pbnRzW2kgKyAxXSA6IHBvaW50c1swXTtcbiAgICAgIHZhciBlID0gbmV3IFZlY3RvcigpLmNvcHkocDIpLnN1YihwMSk7XG4gICAgICB2YXIgbiA9IG5ldyBWZWN0b3IoKS5jb3B5KGUpLnBlcnAoKS5ub3JtYWxpemUoKTtcbiAgICAgIHRoaXNbJ2VkZ2VzJ10ucHVzaChlKTtcbiAgICAgIHRoaXNbJ25vcm1hbHMnXS5wdXNoKG4pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBSb3RhdGVzIHRoaXMgcG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXG4gIC8vXG4gIC8vIE5vdGU6IFlvdSBkbyAqKm5vdCoqIG5lZWQgdG8gY2FsbCBgcmVjYWxjYCBhZnRlciByb3RhdGlvbi5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKVxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWydyb3RhdGUnXSA9IFBvbHlnb24ucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uKGFuZ2xlKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIHBvaW50cyA9IHRoaXNbJ3BvaW50cyddO1xuICAgIHZhciBlZGdlcyA9IHRoaXNbJ2VkZ2VzJ107XG4gICAgdmFyIG5vcm1hbHMgPSB0aGlzWydub3JtYWxzJ107XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcbiAgICAgIGVkZ2VzW2ldLnJvdGF0ZShhbmdsZSk7XG4gICAgICBub3JtYWxzW2ldLnJvdGF0ZShhbmdsZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZVxuICAvLyBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cbiAgLy9cbiAgLy8gVGhpcyBpcyBtb3N0IHVzZWZ1bCB0byBjaGFuZ2UgdGhlIFwiY2VudGVyIHBvaW50XCIgb2YgYSBwb2x5Z29uLlxuICAvL1xuICAvLyBOb3RlOiBZb3UgZG8gKipub3QqKiBuZWVkIHRvIGNhbGwgYHJlY2FsY2AgYWZ0ZXIgdHJhbnNsYXRpb24uXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgaG9yaXpvbnRhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgdmVydGljYWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cbiAgICogQHJldHVybiB7UG9seWdvbn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBQb2x5Z29uLnByb3RvdHlwZVsndHJhbnNsYXRlJ10gPSBQb2x5Z29uLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBpO1xuICAgIHZhciBwb2ludHMgPSB0aGlzWydwb2ludHMnXTtcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBvaW50c1tpXS54ICs9IHg7XG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyAjIyBCb3hcbiAgLy9cbiAgLy8gUmVwcmVzZW50cyBhbiBheGlzLWFsaWduZWQgYm94LCB3aXRoIGEgd2lkdGggYW5kIGhlaWdodC5cblxuXG4gIC8vIENyZWF0ZSBhIG5ldyBib3gsIHdpdGggdGhlIHNwZWNpZmllZCBwb3NpdGlvbiwgd2lkdGgsIGFuZCBoZWlnaHQuIElmIG5vIHBvc2l0aW9uXG4gIC8vIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsMClgLiBJZiBubyB3aWR0aCBvciBoZWlnaHQgYXJlIGdpdmVuLCB0aGV5IHdpbGxcbiAgLy8gYmUgc2V0IHRvIGAwYC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgdG9wLWxlZnQgb2YgdGhlIGJveC5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gdyBUaGUgd2lkdGggb2YgdGhlIGJveC5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0gaCBUaGUgaGVpZ2h0IG9mIHRoZSBib3guXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gQm94KHBvcywgdywgaCkge1xuICAgIHRoaXNbJ3BvcyddID0gcG9zIHx8IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzWyd3J10gPSB3IHx8IDA7XG4gICAgdGhpc1snaCddID0gaCB8fCAwO1xuICB9XG4gIFNBVFsnQm94J10gPSBCb3g7XG5cbiAgLy8gUmV0dXJucyBhIHBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgYm94LlxuICAvKipcbiAgICogQHJldHVybiB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBib3guXG4gICAqL1xuICBCb3gucHJvdG90eXBlWyd0b1BvbHlnb24nXSA9IEJveC5wcm90b3R5cGUudG9Qb2x5Z29uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBvcyA9IHRoaXNbJ3BvcyddO1xuICAgIHZhciB3ID0gdGhpc1sndyddO1xuICAgIHZhciBoID0gdGhpc1snaCddO1xuICAgIHJldHVybiBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHBvc1sneCddLCBwb3NbJ3knXSksIFtcbiAgICAgbmV3IFZlY3RvcigpLCBuZXcgVmVjdG9yKHcsIDApLCBcbiAgICAgbmV3IFZlY3Rvcih3LGgpLCBuZXcgVmVjdG9yKDAsaClcbiAgICBdKTtcbiAgfTtcbiAgXG4gIC8vICMjIFJlc3BvbnNlXG4gIC8vXG4gIC8vIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxuICAvLyAgLSBUaGUgdHdvIG9iamVjdHMgcGFydGljaXBhdGluZyBpbiB0aGUgaW50ZXJzZWN0aW9uXG4gIC8vICAtIFRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGNoYW5nZSBuZWNlc3NhcnkgdG8gZXh0cmFjdCB0aGUgZmlyc3Qgb2JqZWN0XG4gIC8vICAgIGZyb20gdGhlIHNlY29uZCBvbmUgKGFzIHdlbGwgYXMgYSB1bml0IHZlY3RvciBpbiB0aGF0IGRpcmVjdGlvbiBhbmQgdGhlIG1hZ25pdHVkZVxuICAvLyAgICBvZiB0aGUgb3ZlcmxhcClcbiAgLy8gIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi8gIFxuICBmdW5jdGlvbiBSZXNwb25zZSgpIHtcbiAgICB0aGlzWydhJ10gPSBudWxsO1xuICAgIHRoaXNbJ2InXSA9IG51bGw7XG4gICAgdGhpc1snb3ZlcmxhcE4nXSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzWydvdmVybGFwViddID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxuICBTQVRbJ1Jlc3BvbnNlJ10gPSBSZXNwb25zZTtcblxuICAvLyBTZXQgc29tZSB2YWx1ZXMgb2YgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlaXIgZGVmYXVsdHMuICBDYWxsIHRoaXMgYmV0d2VlbiB0ZXN0cyBpZlxuICAvLyB5b3UgYXJlIGdvaW5nIHRvIHJldXNlIGEgc2luZ2xlIFJlc3BvbnNlIG9iamVjdCBmb3IgbXVsdGlwbGUgaW50ZXJzZWN0aW9uIHRlc3RzIChyZWNvbW1lbnRlZFxuICAvLyBhcyBpdCB3aWxsIGF2b2lkIGFsbGNhdGluZyBleHRyYSBtZW1vcnkpXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtSZXNwb25zZX0gVGhpcyBmb3IgY2hhaW5pbmdcbiAgICovXG4gIFJlc3BvbnNlLnByb3RvdHlwZVsnY2xlYXInXSA9IFJlc3BvbnNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXNbJ2FJbkInXSA9IHRydWU7XG4gICAgdGhpc1snYkluQSddID0gdHJ1ZTtcbiAgICB0aGlzWydvdmVybGFwJ10gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vICMjIE9iamVjdCBQb29sc1xuXG4gIC8vIEEgcG9vbCBvZiBgVmVjdG9yYCBvYmplY3RzIHRoYXQgYXJlIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkXG4gIC8vIGFsbG9jYXRpbmcgbWVtb3J5LlxuICAvKipcbiAgICogQHR5cGUge0FycmF5LjxWZWN0b3I+fVxuICAgKi9cbiAgdmFyIFRfVkVDVE9SUyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHsgVF9WRUNUT1JTLnB1c2gobmV3IFZlY3RvcigpKTsgfVxuICBcbiAgLy8gQSBwb29sIG9mIGFycmF5cyBvZiBudW1iZXJzIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkIGFsbG9jYXRpbmdcbiAgLy8gbWVtb3J5LlxuICAvKipcbiAgICogQHR5cGUge0FycmF5LjxBcnJheS48bnVtYmVyPj59XG4gICAqL1xuICB2YXIgVF9BUlJBWVMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHsgVF9BUlJBWVMucHVzaChbXSk7IH1cblxuICAvLyAjIyBIZWxwZXIgRnVuY3Rpb25zXG5cbiAgLy8gRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMsXG4gIC8vIHJlc3VsdGluZyBpbiBhIG9uZSBkaW1lbnNpb25hbCByYW5nZSBvZiB0aGUgbWluaW11bSBhbmRcbiAgLy8gbWF4aW11bSB2YWx1ZSBvbiB0aGF0IGF4aXMuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+fSBwb2ludHMgVGhlIHBvaW50cyB0byBmbGF0dGVuLlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbm9ybWFsIFRoZSB1bml0IHZlY3RvciBheGlzIHRvIGZsYXR0ZW4gb24uXG4gICAqIEBwYXJhbSB7QXJyYXkuPG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbixcbiAgICogICByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSxcbiAgICogICByZXN1bHRbMV0gd2lsbCBiZSB0aGUgbWF4aW11bSB2YWx1ZS5cbiAgICovXG4gIGZ1bmN0aW9uIGZsYXR0ZW5Qb2ludHNPbihwb2ludHMsIG5vcm1hbCwgcmVzdWx0KSB7XG4gICAgdmFyIG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgdmFyIG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWxcbiAgICAgIHZhciBkb3QgPSBwb2ludHNbaV0uZG90KG5vcm1hbCk7XG4gICAgICBpZiAoZG90IDwgbWluKSB7IG1pbiA9IGRvdDsgfVxuICAgICAgaWYgKGRvdCA+IG1heCkgeyBtYXggPSBkb3Q7IH1cbiAgICB9XG4gICAgcmVzdWx0WzBdID0gbWluOyByZXN1bHRbMV0gPSBtYXg7XG4gIH1cbiAgXG4gIC8vIENoZWNrIHdoZXRoZXIgdHdvIGNvbnZleCBwb2x5Z29ucyBhcmUgc2VwYXJhdGVkIGJ5IHRoZSBzcGVjaWZpZWRcbiAgLy8gYXhpcyAobXVzdCBiZSBhIHVuaXQgdmVjdG9yKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBhUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtWZWN0b3J9IGJQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPn0gYVBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBmaXJzdCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgYXhpcyAodW5pdCBzaXplZCkgdG8gdGVzdCBhZ2FpbnN0LiAgVGhlIHBvaW50cyBvZiBib3RoIHBvbHlnb25zXG4gICAqICAgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBBIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHdoaWNoIHdpbGwgYmUgcG9wdWxhdGVkXG4gICAqICAgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSxcbiAgICogICBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kXG4gICAqICAgdGhlIGRpcmVjdGlvbiBvZiB0aGUgb3ZlcmxhcCB3aWxsIGJlIHBvcHVsYXRlZC5cbiAgICovXG4gIGZ1bmN0aW9uIGlzU2VwYXJhdGluZ0F4aXMoYVBvcywgYlBvcywgYVBvaW50cywgYlBvaW50cywgYXhpcywgcmVzcG9uc2UpIHtcbiAgICB2YXIgcmFuZ2VBID0gVF9BUlJBWVMucG9wKCk7XG4gICAgdmFyIHJhbmdlQiA9IFRfQVJSQVlTLnBvcCgpO1xuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcbiAgICB2YXIgb2Zmc2V0ViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGJQb3MpLnN1YihhUG9zKTtcbiAgICB2YXIgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XG4gICAgLy8gUHJvamVjdCB0aGUgcG9seWdvbnMgb250byB0aGUgYXhpcy5cbiAgICBmbGF0dGVuUG9pbnRzT24oYVBvaW50cywgYXhpcywgcmFuZ2VBKTtcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcbiAgICAvLyBNb3ZlIEIncyByYW5nZSB0byBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gQS5cbiAgICByYW5nZUJbMF0gKz0gcHJvamVjdGVkT2Zmc2V0O1xuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBnYXAuIElmIHRoZXJlIGlzLCB0aGlzIGlzIGEgc2VwYXJhdGluZyBheGlzIGFuZCB3ZSBjYW4gc3RvcFxuICAgIGlmIChyYW5nZUFbMF0gPiByYW5nZUJbMV0gfHwgcmFuZ2VCWzBdID4gcmFuZ2VBWzFdKSB7XG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTsgXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQSk7IFxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIFRoaXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLiBJZiB3ZSdyZSBjYWxjdWxhdGluZyBhIHJlc3BvbnNlLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgb3ZlcmxhcCA9IDA7XG4gICAgICAvLyBBIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBCXG4gICAgICBpZiAocmFuZ2VBWzBdIDwgcmFuZ2VCWzBdKSB7XG4gICAgICAgIHJlc3BvbnNlWydhSW5CJ10gPSBmYWxzZTtcbiAgICAgICAgLy8gQSBlbmRzIGJlZm9yZSBCIGRvZXMuIFdlIGhhdmUgdG8gcHVsbCBBIG91dCBvZiBCXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPCByYW5nZUJbMV0pIHsgXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XG4gICAgICAgIC8vIEIgaXMgZnVsbHkgaW5zaWRlIEEuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xuICAgICAgICAgIHZhciBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcbiAgICAgICAgfVxuICAgICAgLy8gQiBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xuICAgICAgICAvLyBCIGVuZHMgYmVmb3JlIEEgZW5kcy4gV2UgaGF2ZSB0byBwdXNoIEEgb3V0IG9mIEJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA+IHJhbmdlQlsxXSkgeyBcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzBdIC0gcmFuZ2VCWzFdO1xuICAgICAgICAgIHJlc3BvbnNlWydhSW5CJ10gPSBmYWxzZTtcbiAgICAgICAgLy8gQSBpcyBmdWxseSBpbnNpZGUgQi4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XG4gICAgICAgICAgdmFyIG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBhbW91bnQgb2Ygb3ZlcmxhcCB3ZSd2ZSBzZWVuIHNvIGZhciwgc2V0IGl0IGFzIHRoZSBtaW5pbXVtIG92ZXJsYXAuXG4gICAgICB2YXIgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xuICAgICAgaWYgKGFic092ZXJsYXAgPCByZXNwb25zZVsnb3ZlcmxhcCddKSB7XG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwJ10gPSBhYnNPdmVybGFwO1xuICAgICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5jb3B5KGF4aXMpO1xuICAgICAgICBpZiAob3ZlcmxhcCA8IDApIHtcbiAgICAgICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gICAgICBcbiAgICB9XG4gICAgVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7IFxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTsgXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgLy8gQ2FsY3VsYXRlcyB3aGljaCBWb3Jub2kgcmVnaW9uIGEgcG9pbnQgaXMgb24gYSBsaW5lIHNlZ21lbnQuXG4gIC8vIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcbiAgLy9cbiAgLy8gICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcbiAgLy8gICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcbiAgLy8gICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXG4gICAqIEByZXR1cm4gIHtudW1iZXJ9IExFRlRfVk9STk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbiwgXG4gICAqICAgICAgICAgIE1JRERMRV9WT1JOT0lfUkVHSU9OICgwKSBpZiBpdCBpcyB0aGUgbWlkZGxlIHJlZ2lvbiwgXG4gICAqICAgICAgICAgIFJJR0hUX1ZPUk5PSV9SRUdJT04gKDEpIGlmIGl0IGlzIHRoZSByaWdodCByZWdpb24uXG4gICAqL1xuICBmdW5jdGlvbiB2b3Jub2lSZWdpb24obGluZSwgcG9pbnQpIHtcbiAgICB2YXIgbGVuMiA9IGxpbmUubGVuMigpO1xuICAgIHZhciBkcCA9IHBvaW50LmRvdChsaW5lKTtcbiAgICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBzdGFydCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlXG4gICAgLy8gbGVmdCB2b3Jub2kgcmVnaW9uLlxuICAgIGlmIChkcCA8IDApIHsgcmV0dXJuIExFRlRfVk9STk9JX1JFR0lPTjsgfVxuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlXG4gICAgLy8gcmlnaHQgdm9ybm9pIHJlZ2lvbi5cbiAgICBlbHNlIGlmIChkcCA+IGxlbjIpIHsgcmV0dXJuIFJJR0hUX1ZPUk5PSV9SRUdJT047IH1cbiAgICAvLyBPdGhlcndpc2UsIGl0J3MgaW4gdGhlIG1pZGRsZSBvbmUuXG4gICAgZWxzZSB7IHJldHVybiBNSURETEVfVk9STk9JX1JFR0lPTjsgfVxuICB9XG4gIC8vIENvbnN0YW50cyBmb3IgVm9ybm9pIHJlZ2lvbnNcbiAgLyoqXG4gICAqIEBjb25zdFxuICAgKi9cbiAgdmFyIExFRlRfVk9STk9JX1JFR0lPTiA9IC0xO1xuICAvKipcbiAgICogQGNvbnN0XG4gICAqL1xuICB2YXIgTUlERExFX1ZPUk5PSV9SRUdJT04gPSAwO1xuICAvKipcbiAgICogQGNvbnN0XG4gICAqL1xuICB2YXIgUklHSFRfVk9STk9JX1JFR0lPTiA9IDE7XG4gIFxuICAvLyAjIyBDb2xsaXNpb24gVGVzdHNcblxuICAvLyBDaGVjayBpZiB0d28gY2lyY2xlcyBjb2xsaWRlLlxuICAvKipcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGIgVGhlIHNlY29uZCBjaXJjbGUuXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXG4gICAqICAgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC4gXG4gICAqL1xuICBmdW5jdGlvbiB0ZXN0Q2lyY2xlQ2lyY2xlKGEsIGIsIHJlc3BvbnNlKSB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlcnMgb2YgdGhlIHR3b1xuICAgIC8vIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cbiAgICB2YXIgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShiWydwb3MnXSkuc3ViKGFbJ3BvcyddKTtcbiAgICB2YXIgdG90YWxSYWRpdXMgPSBhWydyJ10gKyBiWydyJ107XG4gICAgdmFyIHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xuICAgIHZhciBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBpcyBiaWdnZXIgdGhhbiB0aGUgY29tYmluZWQgcmFkaXVzLCB0aGV5IGRvbid0IGludGVyc2VjdC5cbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcbiAgICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gVGhleSBpbnRlcnNlY3QuICBJZiB3ZSdyZSBjYWxjdWxhdGluZyBhIHJlc3BvbnNlLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgaWYgKHJlc3BvbnNlKSB7IFxuICAgICAgdmFyIGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XG4gICAgICByZXNwb25zZVsnYSddID0gYTtcbiAgICAgIHJlc3BvbnNlWydiJ10gPSBiO1xuICAgICAgcmVzcG9uc2VbJ292ZXJsYXAnXSA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLmNvcHkoZGlmZmVyZW5jZVYubm9ybWFsaXplKCkpO1xuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShkaWZmZXJlbmNlVikuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XG4gICAgICByZXNwb25zZVsnYUluQiddPSBhWydyJ10gPD0gYlsnciddICYmIGRpc3QgPD0gYlsnciddIC0gYVsnciddO1xuICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGJbJ3InXSA8PSBhWydyJ10gJiYgZGlzdCA8PSBhWydyJ10gLSBiWydyJ107XG4gICAgfVxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBTQVRbJ3Rlc3RDaXJjbGVDaXJjbGUnXSA9IHRlc3RDaXJjbGVDaXJjbGU7XG4gIFxuICAvLyBDaGVjayBpZiBhIHBvbHlnb24gYW5kIGEgY2lyY2xlIGNvbGxpZGUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZS5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcbiAgICogICB0aGV5IGludGVyc2V0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LlxuICAgKi9cbiAgZnVuY3Rpb24gdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSkge1xuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgcG9seWdvbi5cbiAgICB2YXIgY2lyY2xlUG9zID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoY2lyY2xlWydwb3MnXSkuc3ViKHBvbHlnb25bJ3BvcyddKTtcbiAgICB2YXIgcmFkaXVzID0gY2lyY2xlWydyJ107XG4gICAgdmFyIHJhZGl1czIgPSByYWRpdXMgKiByYWRpdXM7XG4gICAgdmFyIHBvaW50cyA9IHBvbHlnb25bJ3BvaW50cyddO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIHZhciBlZGdlID0gVF9WRUNUT1JTLnBvcCgpO1xuICAgIHZhciBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKTtcbiAgICBcbiAgICAvLyBGb3IgZWFjaCBlZGdlIGluIHRoZSBwb2x5Z29uOlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBuZXh0ID0gaSA9PT0gbGVuIC0gMSA/IDAgOiBpICsgMTtcbiAgICAgIHZhciBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcbiAgICAgIHZhciBvdmVybGFwID0gMDtcbiAgICAgIHZhciBvdmVybGFwTiA9IG51bGw7XG4gICAgICBcbiAgICAgIC8vIEdldCB0aGUgZWRnZS5cbiAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW2ldKTtcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBlZGdlLlxuICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbaV0pO1xuICAgICAgXG4gICAgICAvLyBJZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgYW5kIHRoZSBwb2ludFxuICAgICAgLy8gaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW5cbiAgICAgIC8vIHRoZSBjaXJjbGUuXG4gICAgICBpZiAocmVzcG9uc2UgJiYgcG9pbnQubGVuMigpID4gcmFkaXVzMikge1xuICAgICAgICByZXNwb25zZVsnYUluQiddID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jub2kgcmVnaW9uIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBpbi5cbiAgICAgIHZhciByZWdpb24gPSB2b3Jub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xuICAgICAgLy8gSWYgaXQncyB0aGUgbGVmdCByZWdpb246XG4gICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk5PSV9SRUdJT04pIHsgXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBSSUdIVF9WT1JOT0lfUkVHSU9OIG9mIHRoZSBwcmV2aW91cyBlZGdlLlxuICAgICAgICBlZGdlLmNvcHkocG9seWdvblsnZWRnZXMnXVtwcmV2XSk7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBwcmV2aW91cyBlZGdlXG4gICAgICAgIHZhciBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbcHJldl0pO1xuICAgICAgICByZWdpb24gPSB2b3Jub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9STk9JX1JFR0lPTikge1xuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cbiAgICAgICAgICB2YXIgZGlzdCA9IHBvaW50LmxlbigpO1xuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7IFxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7IFxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50Mik7XG4gICAgICAvLyBJZiBpdCdzIHRoZSByaWdodCByZWdpb246XG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9STk9JX1JFR0lPTikge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxuICAgICAgICBlZGdlLmNvcHkocG9seWdvblsnZWRnZXMnXVtuZXh0XSk7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcbiAgICAgICAgcmVnaW9uID0gdm9ybm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JOT0lfUkVHSU9OKSB7XG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxuICAgICAgICAgIHZhciBkaXN0ID0gcG9pbnQubGVuKCk7XG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTsgXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTsgXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgICBcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLFxuICAgICAgICAvLyBDaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxuICAgICAgICB2YXIgbm9ybWFsID0gZWRnZS5wZXJwKCkubm9ybWFsaXplKCk7XG4gICAgICAgIC8vIEZpbmQgdGhlIHBlcnBlbmRpY3VsYXIgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVyIG9mIHRoZSBcbiAgICAgICAgLy8gY2lyY2xlIGFuZCB0aGUgZWRnZS5cbiAgICAgICAgdmFyIGRpc3QgPSBwb2ludC5kb3Qobm9ybWFsKTtcbiAgICAgICAgdmFyIGRpc3RBYnMgPSBNYXRoLmFicyhkaXN0KTtcbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxuICAgICAgICBpZiAoZGlzdCA+IDAgJiYgZGlzdEFicyA+IHJhZGl1cykge1xuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7IFxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKG5vcm1hbCk7IFxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgICAgICAgb3ZlcmxhcE4gPSBub3JtYWw7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZVxuICAgICAgICAgIC8vIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSwgdGhlIGNpcmNsZSBpcyBub3QgZnVsbHkgaW5zaWRlIHRoZSBwb2x5Z29uLlxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3Qgb3ZlcmxhcCB3ZSd2ZSBzZWVuLCBrZWVwIGl0LiBcbiAgICAgIC8vIChvdmVybGFwTiBtYXkgYmUgbnVsbCBpZiB0aGUgY2lyY2xlIHdhcyBpbiB0aGUgd3JvbmcgVm9ybm9pIHJlZ2lvbikuXG4gICAgICBpZiAob3ZlcmxhcE4gJiYgcmVzcG9uc2UgJiYgTWF0aC5hYnMob3ZlcmxhcCkgPCBNYXRoLmFicyhyZXNwb25zZVsnb3ZlcmxhcCddKSkge1xuICAgICAgICByZXNwb25zZVsnb3ZlcmxhcCddID0gb3ZlcmxhcDtcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXBOJ10uY29weShvdmVybGFwTik7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZmluYWwgb3ZlcmxhcCB2ZWN0b3IgLSBiYXNlZCBvbiB0aGUgc21hbGxlc3Qgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBwb2x5Z29uO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGNpcmNsZTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLmNvcHkocmVzcG9uc2VbJ292ZXJsYXBOJ10pLnNjYWxlKHJlc3BvbnNlWydvdmVybGFwJ10pO1xuICAgIH1cbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpOyBcbiAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTsgXG4gICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFNBVFsndGVzdFBvbHlnb25DaXJjbGUnXSA9IHRlc3RQb2x5Z29uQ2lyY2xlO1xuICBcbiAgLy8gQ2hlY2sgaWYgYSBjaXJjbGUgYW5kIGEgcG9seWdvbiBjb2xsaWRlLlxuICAvL1xuICAvLyAqKk5PVEU6KiogVGhpcyBpcyBzbGlnaHRseSBsZXNzIGVmZmljaWVudCB0aGFuIHBvbHlnb25DaXJjbGUgYXMgaXQganVzdFxuICAvLyBydW5zIHBvbHlnb25DaXJjbGUgYW5kIHJldmVyc2VzIGV2ZXJ5dGhpbmcgYXQgdGhlIGVuZC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZS5cbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZlxuICAgKiAgIHRoZXkgaW50ZXJzZXQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhleSBpbnRlcnNlY3QsIGZhbHNlIGlmIHRoZXkgZG9uJ3QuXG4gICAqL1xuICBmdW5jdGlvbiB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGUsIHBvbHlnb24sIHJlc3BvbnNlKSB7XG4gICAgLy8gVGVzdCB0aGUgcG9seWdvbiBhZ2FpbnN0IHRoZSBjaXJjbGUuXG4gICAgdmFyIHJlc3VsdCA9IHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb24sIGNpcmNsZSwgcmVzcG9uc2UpO1xuICAgIGlmIChyZXN1bHQgJiYgcmVzcG9uc2UpIHtcbiAgICAgIC8vIFN3YXAgQSBhbmQgQiBpbiB0aGUgcmVzcG9uc2UuXG4gICAgICB2YXIgYSA9IHJlc3BvbnNlWydhJ107XG4gICAgICB2YXIgYUluQiA9IHJlc3BvbnNlWydhSW5CJ107XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5yZXZlcnNlKCk7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5yZXZlcnNlKCk7XG4gICAgICByZXNwb25zZVsnYSddID0gcmVzcG9uc2VbJ2InXTtcbiAgICAgIHJlc3BvbnNlWydiJ10gPSBhO1xuICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IHJlc3BvbnNlWydiSW5BJ107XG4gICAgICByZXNwb25zZVsnYkluQSddID0gYUluQjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBTQVRbJ3Rlc3RDaXJjbGVQb2x5Z29uJ10gPSB0ZXN0Q2lyY2xlUG9seWdvbjtcbiAgXG4gIC8vIENoZWNrcyB3aGV0aGVyIHBvbHlnb25zIGNvbGxpZGUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYiBUaGUgc2Vjb25kIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXG4gICAqICAgdGhleSBpbnRlcnNldC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RQb2x5Z29uUG9seWdvbihhLCBiLCByZXNwb25zZSkge1xuICAgIHZhciBhUG9pbnRzID0gYVsncG9pbnRzJ107XG4gICAgdmFyIGFMZW4gPSBhUG9pbnRzLmxlbmd0aDtcbiAgICB2YXIgYlBvaW50cyA9IGJbJ3BvaW50cyddO1xuICAgIHZhciBiTGVuID0gYlBvaW50cy5sZW5ndGg7XG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUxlbjsgaSsrKSB7XG4gICAgICBpZiAoaXNTZXBhcmF0aW5nQXhpcyhhWydwb3MnXSwgYlsncG9zJ10sIGFQb2ludHMsIGJQb2ludHMsIGFbJ25vcm1hbHMnXVtpXSwgcmVzcG9uc2UpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQiBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxuICAgIGZvciAodmFyIGkgPSAwO2kgPCBiTGVuOyBpKyspIHtcbiAgICAgIGlmIChpc1NlcGFyYXRpbmdBeGlzKGFbJ3BvcyddLCBiWydwb3MnXSwgYVBvaW50cywgYlBvaW50cywgYlsnbm9ybWFscyddW2ldLCByZXNwb25zZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBTaW5jZSBub25lIG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBvciBCIGFyZSBhIHNlcGFyYXRpbmcgYXhpcywgdGhlcmUgaXMgYW4gaW50ZXJzZWN0aW9uXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuICBDYWxjdWxhdGUgdGhlXG4gICAgLy8gZmluYWwgb3ZlcmxhcCB2ZWN0b3IuXG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICByZXNwb25zZVsnYSddID0gYTtcbiAgICAgIHJlc3BvbnNlWydiJ10gPSBiO1xuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShyZXNwb25zZVsnb3ZlcmxhcE4nXSkuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFNBVFsndGVzdFBvbHlnb25Qb2x5Z29uJ10gPSB0ZXN0UG9seWdvblBvbHlnb247XG5cbiAgcmV0dXJuIFNBVDtcbn0pKTsiLCIvKlxuICAgIFRoZSBncmFwaGljcyBjb21wb25lbnQgb2YgR2FtZUVuZ2luZS5cbiovXG52YXIgR2FtZUdyYXBoaWNzID0gZnVuY3Rpb24oZ0VuZ2luZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlzQW5pbWF0aW5nOiBmYWxzZSxcblxuICAgICAgICAvKlxuICAgICAgICAgICAgQHBhcmFtKG51bWJlcikgdGltZVN0ZXAgVGhlIHdhaXQgdGltZSBiZXR3ZWVuIHJ1bm5pbmcgdGhlIGFjdGlvbiAoaW4gbXMpLlxuICAgICAgICAgICAgQHBhcmFtKG51bWJlcikgbnVtVGltZXMgVGhlIG51bWJlciB0byB0aW1lcyB0byBydW4gdGhlIGFjdGlvbi5cbiAgICAgICAgICAgIEBwYXJhbShmdW5jdGlvbikgY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICAqL1xuICAgICAgICByZXBlYXRBY3Rpb246IGZ1bmN0aW9uKHRpbWVTdGVwLCBudW1UaW1lcywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgbnVtID0gMCxcbiAgICAgICAgICAgICAgICB0aGF0ID0gdGhpc1xuICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICB2YXIgdGhlQW5pbWF0aW9uID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYobnVtKysgPiBudW1UaW1lcykge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoZUFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGltZVN0ZXApO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uTGlua2VyLmpzXCIgLz5cblxuLypcbiAgICBBIGdlbmVyaWMgdmlldyBpbnRlcmZhY2UuXG4qL1xuZnVuY3Rpb24gR2FtZVZpZXcoZ0VuZ2luZSkge1xuICAgIHRoaXMucHJpdmF0ZXMgPSB7XG4gICAgICAgIGJnQ29sb3I6IFwiI2NjY1wiXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5HYW1lVmlldy5wcm90b3R5cGUgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGhlbjogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucHJpdmF0ZXMuYmdDb2xvcjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWxzIGdhbWUsIGNhbnZhcywgY3R4LCBLZXlDb2RlICovXG4vKlxuICogIEltcGxlbWVudHMgR2FtZVZpZXcuXG4gKi9cbmZ1bmN0aW9uIFRpdGxlVmlldyh0aXRsZSkge1xuICAgIHRoaXMucHJpdmF0ZXMgPSB7XG4gICAgICAgIHRpdGxlOiB0aXRsZVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbn1cblxuVGl0bGVWaWV3LnByb3RvdHlwZSA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgdGl0bGUsXG4gICAgICAgIGN0YSA9ICdQcmVzcyBFbnRlcidcbiAgICA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGl0bGUgPSB0aGlzLnByaXZhdGVzLnRpdGxlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkVOVEVSKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogKCkgPT4ge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9ICczNnB4IEFyaWFsJztcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGl0bGUsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGl0bGUpLndpZHRoIC8gMiwgMTAwKTtcblxuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMjRweCBBcmlhbCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoY3RhLCBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KGN0YSkud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMik7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uTGlua2VyLmpzXCIgLz5cblxuZnVuY3Rpb24gR2FtZVNhdmVWaWV3KCkge1xuICAgIHRoaXMucHJpdmF0ZXMgPSB7fTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5HYW1lU2F2ZVZpZXcucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aGF0LFxuICAgICAgICB0aXRsZSA9IFwiU2VsZWN0IGEgc2F2ZSBzbG90XCIsXG4gICAgICAgIGN0YSA9IFwiUHJlc3MgRGVsZXRlIHRvIGVyYXNlIGEgc2F2ZVwiLFxuICAgICAgICBzdG9yYWdlID0gbmV3IEdhbWVTYXZlKCksXG4gICAgICAgIGxpc3QgPSBzdG9yYWdlLmdldExpc3QoKSxcbiAgICAgICAgYXJyb3dcbiAgICA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIGFycm93ID0ge1xuICAgICAgICAgICAgICAgIGltZzogXCI+PlwiLFxuICAgICAgICAgICAgICAgIHNsb3Q6IDAsXG4gICAgICAgICAgICAgICAgeDogY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dChsaXN0WzBdKS53aWR0aCAvIDIgLSA2MCwgICAgLy8gVE9ETzogbWFrZSBpbnN0YW5jZSB2YXI/P1xuICAgICAgICAgICAgICAgIHk6IDIwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FU0MpIHtcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKEtleUNvZGUuRVNDKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5FTlRFUikge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgICAgIHZhciBkID0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IGRhdGUuZ2V0WWVhcigpO1xuICAgICAgICAgICAgICAgIHZhciB0ID0gZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgIHN0b3JhZ2Uuc2F2ZShhcnJvdy5zbG90LCBtICsgJy8nICsgZCArICcvJyArIHkgKyAnICcgKyB0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKEtleUNvZGUuRU5URVIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkRFTEVURSkge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd25wID0gS2V5Q29kZS5FTVBUWTtcblxuICAgICAgICAgICAgICAgIGxpc3QgPSBzdG9yYWdlLmVyYXNlKGFycm93LnNsb3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcnJvdy5zbG90ICE9PSAyICYmIGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuRE9XTikge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgKythcnJvdy5zbG90O1xuICAgICAgICAgICAgICAgIGFycm93LnggPSBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KGxpc3RbYXJyb3cuc2xvdF0pLndpZHRoIC8gMiAtIDYwO1xuICAgICAgICAgICAgICAgIGFycm93LnkgKz0gODA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFycm93LnNsb3QgIT09IDAgJiYgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5VUCkge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgLS1hcnJvdy5zbG90O1xuICAgICAgICAgICAgICAgIGFycm93LnggPSBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KGxpc3RbYXJyb3cuc2xvdF0pLndpZHRoIC8gMiAtIDYwO1xuICAgICAgICAgICAgICAgIGFycm93LnkgLT0gODA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMxMTFcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9IFwiMzZweCBBcmlhbFwiXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGl0bGUsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQodGl0bGUpLndpZHRoIC8gMiwgODApO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9IFwiMjRweCBBcmlhbFwiXG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGxpc3RbaV0sIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQobGlzdFtpXSkud2lkdGggLyAyLCAyMDAgKyBpICogODApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoYXJyb3cuaW1nLCBhcnJvdy54LCBhcnJvdy55KTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9saW5rZXIuanNcIiAvPlxuXG5mdW5jdGlvbiBMZXZlbFZpZXcocGxheWVyLCBjdXJMdmwpIHtcbiAgICB0aGlzLnByaXZhdGVzID0ge307XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgdGhpcy5jdXJMdmwgPSBjdXJMdmw7XG5cbiAgICB0aGlzLmluaXQoKTtcbn1cblxuTGV2ZWxWaWV3LnByb3RvdHlwZSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdGhhdCxcbiAgICAgICAgb25VcGRhdGVTZXQgPSBmYWxzZSxcbiAgICAgICAgb25SZW5kZXJTZXQgPSBmYWxzZVxuICAgIDtcblxuXG4gICAgZnVuY3Rpb24gY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIGlmKHRoYXQucGxheWVyLmludmluY2libGUpIHtcbiAgICAgICAgICAgIGlmKHRoYXQucGxheWVyLmludmluY2libGVUaW1lci0tID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5ZXIuaW52aW5jaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheWVyLmludmluY2libGVUaW1lciA9IDEyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoYXQuY3VyTHZsLnByb2plY3RpbGVzLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgIHZhciBjb2xsaWRlZCA9IFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhhdC5wbGF5ZXIsIHRoYXQuY3VyTHZsLnByb2plY3RpbGVzW2ldKTtcbiAgICAgICAgICAgIGlmKGNvbGxpZGVkKSB7XG4gICAgICAgICAgICAgICAgLS10aGF0LnBsYXllci5ocDtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXllci5pbnZpbmNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGhlbjogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5wcml2YXRlcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGF0ID0gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jdXJMdmwudXBkYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGUoKTtcblxuICAgICAgICAgICAgLy9pZihvblVwZGF0ZVNldClcbiAgICAgICAgICAgIC8vICAgIHRoaXMub25VcGRhdGUoKTtcblxuICAgICAgICAgICAgY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uVXBkYXRlU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25VcGRhdGUgPSBjYWxsYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VyTHZsLnJlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyKCk7XG5cbiAgICAgICAgICAgIC8vaWYob25SZW5kZXJTZXQpXG4gICAgICAgICAgICAvLyAgICB0aGlzLm9uUmVuZGVyKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZW5kZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBvblJlbmRlclNldCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uUmVuZGVyID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbGlua2VyLmpzXCIgLz5cblxuZnVuY3Rpb24gTGV2ZWwxKCkge1xuICAgIFxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5MZXZlbDEucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9qZWN0aWxlczogW10sXG5cblxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAxMDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2plY3RpbGUgPSBuZXcgU0FULkJveChuZXcgU0FULlZlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCkgKyAwKSwgICAgICAvLyByYW5kb20gbnVtYmVyIGJldHdlZW4gMCBhbmQgY2FudmFzLndpZHRoXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHRcbiAgICAgICAgICAgICAgICApLCAxMCwgMjApLnRvUG9seWdvbigpO1xuXG4gICAgICAgICAgICAgICAgcHJvamVjdGlsZS5zcGVlZCA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAzKSAqIDAuMTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXMucHVzaChwcm9qZWN0aWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0aWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZXNbaV0ucG9zLnkgLT0gdGhpcy5wcm9qZWN0aWxlc1tpXS5zcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYmFja2dyb3VuZFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHByb2plY3RpbGVzXG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInNpbHZlclwiO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMucHJvamVjdGlsZXMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnByb2plY3RpbGVzW2ldLnBvcy54LCB0aGlzLnByb2plY3RpbGVzW2ldLnBvcy55LCAxMCwgMjApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImxpbmtlci5qc1wiIC8+XG5cbmZ1bmN0aW9uIFZhbXAoKSB7XG4gICAgdGhpcy5pbml0KCk7XG59XG5cblZhbXAucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKSxcbiAgICAgICAgaW1nUmVhZHkgPSBmYWxzZVxuICAgIDtcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGltZ1JlYWR5ID0gdHJ1ZTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSBcImltZy92YW1wLnBuZ1wiO1xuXG4gICAgdmFyIHNwZWVkID0gNDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHc6IDQwLFxuICAgICAgICBoOiA0MCxcbiAgICAgICAgaHA6IDMsXG4gICAgICAgIGludmluY2libGU6IGZhbHNlLFxuICAgICAgICBpbnZpbmNpYmxlVGltZXI6IDEyMCxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJC5leHRlbmQodGhpcywgbmV3IFNBVC5Cb3gobmV3IFNBVC5WZWN0b3IoMCwgMCksIHRoaXMudywgdGhpcy5oKS50b1BvbHlnb24oKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGhvcml6b250YWxcbiAgICAgICAgICAgIGlmKGdhbWUuaW5wdXQua2V5c0Rvd25bS2V5Q29kZS5SSUdIVF0pe1xuICAgICAgICAgICAgICAgIHRoaXMucG9zLnggKz0gc3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGdhbWUuaW5wdXQua2V5c0Rvd25bS2V5Q29kZS5MRUZUXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zLnggLT0gc3BlZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHZlcnRpY2FsXG4gICAgICAgICAgICBpZihnYW1lLmlucHV0LmtleXNEb3duW0tleUNvZGUuVVBdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueSAtPSBzcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZ2FtZS5pbnB1dC5rZXlzRG93bltLZXlDb2RlLkRPV05dKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueSArPSBzcGVlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJZb3UgZGllZFwiKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYm9keVxuICAgICAgICAgICAgdmFyIGRvRHJhdyA9IHRydWU7XG4gICAgICAgICAgICBpZih0aGlzLmludmluY2libGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuaW52aW5jaWJsZVRpbWVyICUgMzA7XG4gICAgICAgICAgICAgICAgaWYodCA+PSAwICYmIHQgPCAxNSlcbiAgICAgICAgICAgICAgICAgICAgZG9EcmF3ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGRvRHJhdykge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLncsIHRoaXMuaCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGhlYWx0aFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5ocDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLnggLSAxMCArIGkqMjAsIHRoaXMucG9zLnkgLSAyMCwgMjAsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFscyBnYW1lLCBHYW1lRW5naW5lLCBUaXRsZVZpZXcsIEtleUNvZGUsIFZhbXAsIExldmVsMSwgTGV2ZWxWaWV3LCBHYW1lU2F2ZVZpZXcgKi9cbi8qXG4gKiAgVGhlIHZhbXAgZ2FtZS5cbiAqICBEZWNsYXJlcyBnYW1lIGFzIGEgZ2xvYmFsLlxuICovXG4oZnVuY3Rpb24gTWFpbigpIHtcbiAgICB3aW5kb3cuZ2FtZSA9IG5ldyBHYW1lRW5naW5lKCk7XG4gICAgZ2FtZS5zdGFydCgpO1xuXG5cbiAgICBsZXQgdGl0bGVWaWV3ID0gbmV3IFRpdGxlVmlldygnVmFtcDogVGhlIEdyZWF0IGFuZCBQb3dlcmZ1bCcsIHRydWUpO1xuICAgIHRpdGxlVmlldy50aGVuKCgpID0+IHtcbiAgICAgICAgZ2FtZS51dGlscy5zd2l0Y2hWaWV3KHNhdmVWaWV3KTtcbiAgICB9KTtcblxuICAgIGxldCBzYXZlVmlldyA9IG5ldyBHYW1lU2F2ZVZpZXcoKTtcbiAgICBzYXZlVmlldy50aGVuKGtleSA9PiB7XG4gICAgICAgIGlmKGtleSA9PT0gS2V5Q29kZS5FU0MpIHtcbiAgICAgICAgICAgIGdhbWUudXRpbHMuc3dpdGNoVmlldyh0aXRsZVZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLkVOVEVSKSB7XG4gICAgICAgICAgICBnYW1lLnV0aWxzLnN3aXRjaFZpZXcobHZsVmlldyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCB2YW1wID0gbmV3IFZhbXAoKTtcbiAgICBsZXQgbHZsMSA9IG5ldyBMZXZlbDEoKTtcbiAgICBsZXQgbHZsVmlldyA9IG5ldyBMZXZlbFZpZXcodmFtcCwgbHZsMSk7XG5cbiAgICBnYW1lLnZpZXcgPSB0aXRsZVZpZXc7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
