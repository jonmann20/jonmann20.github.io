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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVFbmdpbmUuanMiLCJHYW1lU2F2ZS5qcyIsIkdhbWVJbnB1dC5qcyIsIkdhbWVVdGlscy5qcyIsIlNBVC5qcyIsIkdhbWVHcmFwaGljcy5qcyIsIkdhbWVWaWV3LmpzIiwiVGl0bGVWaWV3LmpzIiwiR2FtZVNhdmVWaWV3LmpzIiwiTGV2ZWxWaWV3LmpzIiwibGV2ZWwxLmpzIiwidmFtcC5qcyIsIm1haW4uanMiXSwibmFtZXMiOlsiR2FtZUVuZ2luZSIsImJhY2tCdG4iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwiaW5uZXJUZXh0IiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwid3JhcCIsIndpbmRvdyIsImNhbnZhcyIsInNldEF0dHJpYnV0ZSIsImN0eCIsImdldENvbnRleHQiLCJpbnB1dCIsIkdhbWVJbnB1dCIsImdyYXBoaWNzIiwiR2FtZUdyYXBoaWNzIiwidXRpbHMiLCJHYW1lVXRpbHMiLCJ2aWV3IiwiR2FtZVZpZXciLCJpbml0IiwicHJvdG90eXBlIiwidGhhdCIsInVwZGF0ZUludGVydmFsIiwicmVuZGVyUkFGIiwib25VcGRhdGVTZXQiLCJvblJlbmRlclNldCIsInVwZGF0ZSIsIm9uVXBkYXRlIiwicmVuZGVyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib25SZW5kZXIiLCJjYWxsYmFjayIsInN0YXJ0Iiwic2V0SW50ZXJ2YWwiLCJzdG9wIiwiY2xlYXJJbnRlcnZhbCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiR2FtZVNhdmUiLCJzbG90IiwibG9jYWxTdG9yYWdlIiwiemVybyIsImxvYWQiLCJvbmUiLCJ0d28iLCJkZWYiLCJkYXRhIiwicmVtb3ZlSXRlbSIsImdldExpc3QiLCJrZXlzRG93biIsImxhc3RLZXlVcCIsIktleUNvZGUiLCJFTVBUWSIsImxhc3RLZXlEb3duIiwiZml4S2V5Iiwia2V5IiwiVyIsIlVQIiwiUyIsIkRPV04iLCJEIiwiUklHSFQiLCJBIiwiTEVGVCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Q29kZSIsIk9iamVjdCIsImZyZWV6ZSIsIkVOVEVSIiwiQ1RSTCIsIkVTQyIsIlNQQUNFQkFSIiwiREVMRVRFIiwiRiIsIkgiLCJKIiwiSyIsIk0iLCJPIiwiUiIsIktleUNvZGVOYW1lcyIsImdFbmdpbmUiLCJzd2l0Y2hWaWV3IiwibmV3VmlldyIsIkRpciIsImlzQW5pbWF0aW5nIiwicmVwZWF0QWN0aW9uIiwidGltZVN0ZXAiLCJudW1UaW1lcyIsIm51bSIsInRoZUFuaW1hdGlvbiIsInByaXZhdGVzIiwiYmdDb2xvciIsInRoZW4iLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiVGl0bGVWaWV3IiwidGl0bGUiLCJjdGEiLCJnYW1lIiwiZm9udCIsImZpbGxUZXh0IiwibWVhc3VyZVRleHQiLCJHYW1lU2F2ZVZpZXciLCJzdG9yYWdlIiwibGlzdCIsImFycm93IiwiaW1nIiwieCIsInkiLCJkYXRlIiwiRGF0ZSIsIm0iLCJnZXRNb250aCIsImQiLCJnZXREYXkiLCJnZXRZZWFyIiwidCIsInRvTG9jYWxlVGltZVN0cmluZyIsInNhdmUiLCJsYXN0S2V5RG93bnAiLCJlcmFzZSIsImkiLCJsZW5ndGgiLCJMZXZlbFZpZXciLCJwbGF5ZXIiLCJjdXJMdmwiLCJjaGVja0NvbGxpc2lvbiIsImludmluY2libGUiLCJpbnZpbmNpYmxlVGltZXIiLCJwcm9qZWN0aWxlcyIsImNvbGxpZGVkIiwiU0FUIiwidGVzdFBvbHlnb25Qb2x5Z29uIiwiaHAiLCJMZXZlbDEiLCJwcm9qZWN0aWxlIiwiQm94IiwiVmVjdG9yIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9Qb2x5Z29uIiwic3BlZWQiLCJwdXNoIiwicG9zIiwiVmFtcCIsIkltYWdlIiwiaW1nUmVhZHkiLCJvbmxvYWQiLCJzcmMiLCJ3IiwiaCIsIiQiLCJleHRlbmQiLCJhbGVydCIsImxvY2F0aW9uIiwicmVsb2FkIiwiZG9EcmF3IiwiTWFpbiIsInRpdGxlVmlldyIsInNhdmVWaWV3IiwibHZsVmlldyIsInZhbXAiLCJsdmwxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7Ozs7QUFHQSxTQUFTQSxVQUFULEdBQXNCO0FBQ2xCO0FBQ0EsUUFBSUMsVUFBVUMsU0FBU0MsYUFBVCxDQUF1QixHQUF2QixDQUFkO0FBQ0FGLFlBQVFHLElBQVIsR0FBZSxTQUFmO0FBQ0FILFlBQVFJLFNBQVIsR0FBb0IsTUFBcEI7QUFDQUosWUFBUUssU0FBUixHQUFvQixTQUFwQjtBQUNBSixhQUFTSyxJQUFULENBQWNDLFdBQWQsQ0FBMEJQLE9BQTFCOztBQUVBO0FBQ0EsUUFBSVEsT0FBT1AsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0FNLFNBQUtILFNBQUwsR0FBaUIsWUFBakI7O0FBRUE7QUFDQUksV0FBT0MsTUFBUCxHQUFnQlQsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBUSxXQUFPQyxZQUFQLENBQW9CLE9BQXBCLEVBQTZCLEtBQUcsRUFBaEM7QUFDQUQsV0FBT0MsWUFBUCxDQUFvQixRQUFwQixFQUE4QixJQUFFLEVBQWhDO0FBQ0FILFNBQUtELFdBQUwsQ0FBaUJHLE1BQWpCO0FBQ0FULGFBQVNLLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkMsSUFBMUI7O0FBRUFDLFdBQU9HLEdBQVAsR0FBYUYsT0FBT0csVUFBUCxDQUFrQixJQUFsQixDQUFiOztBQUVBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxTQUFKLENBQWMsSUFBZCxDQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFJQyxZQUFKLENBQWlCLElBQWpCLENBQWhCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQUlDLFNBQUosQ0FBYyxJQUFkLENBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVksSUFBSUMsUUFBSixDQUFhLElBQWIsQ0FBWjs7QUFFQSxTQUFLQyxJQUFMO0FBQ0g7O0FBRUR2QixXQUFXd0IsU0FBWCxHQUF3QixZQUFXO0FBQy9CLFFBQUlDLGFBQUo7QUFBQSxRQUNJQyx1QkFESjtBQUFBLFFBRUlDLGtCQUZKO0FBQUEsUUFHSUMsY0FBYyxLQUhsQjtBQUFBLFFBSUlDLGNBQWMsS0FKbEI7O0FBT0EsYUFBU0MsTUFBVCxHQUFrQjtBQUNkTCxhQUFLSixJQUFMLENBQVVTLE1BQVY7O0FBRUEsWUFBR0YsV0FBSCxFQUFnQjtBQUNaSCxpQkFBS00sUUFBTDtBQUNIO0FBQ0o7O0FBRUQsYUFBU0MsTUFBVCxHQUFrQjtBQUNkTCxvQkFBWU0sc0JBQXNCRCxNQUF0QixDQUFaO0FBQ0FQLGFBQUtKLElBQUwsQ0FBVVcsTUFBVjs7QUFFQSxZQUFHSCxXQUFILEVBQWdCO0FBQ1pKLGlCQUFLUyxRQUFMO0FBQ0g7QUFDSjs7QUFHRCxXQUFPO0FBQ0hYLGNBQU0sZ0JBQVc7QUFDYkUsbUJBQU8sSUFBUDtBQUNILFNBSEU7O0FBS0hNLGtCQUFVLGtCQUFTSSxRQUFULEVBQW1CO0FBQ3pCUCwwQkFBYyxJQUFkO0FBQ0EsaUJBQUtHLFFBQUwsR0FBZ0JJLFFBQWhCO0FBQ0gsU0FSRTs7QUFVSEQsa0JBQVUsa0JBQVNDLFFBQVQsRUFBbUI7QUFDekJOLDBCQUFjLElBQWQ7QUFDQSxpQkFBS0ssUUFBTCxHQUFnQkMsUUFBaEI7QUFDSCxTQWJFOztBQWVIQyxlQUFPLGlCQUFNO0FBQ1RWLDZCQUFpQlcsWUFBWVAsTUFBWixFQUFvQixPQUFPLEVBQTNCLENBQWpCO0FBQ0FILHdCQUFZTSxzQkFBc0JELE1BQXRCLENBQVo7QUFDSCxTQWxCRTs7QUFvQkhNLGNBQU0sZ0JBQU07QUFDUkMsMEJBQWNiLGNBQWQ7QUFDQWMsaUNBQXFCYixTQUFyQjtBQUNIO0FBdkJFLEtBQVA7QUF5QkgsQ0FuRHNCLEVBQXZCO0FDbENBO0FBQ0E7Ozs7Ozs7O0lBR01jOzs7Ozs7OzZCQUNHQyxNQUFNO0FBQ1AsbUJBQU9DLHVCQUFxQkQsSUFBckIsQ0FBUDtBQUNIOzs7a0NBRVM7QUFDTixnQkFBSUUsT0FBTyxLQUFLQyxJQUFMLENBQVUsQ0FBVixDQUFYO0FBQUEsZ0JBQ0lDLE1BQU0sS0FBS0QsSUFBTCxDQUFVLENBQVYsQ0FEVjtBQUFBLGdCQUVJRSxNQUFNLEtBQUtGLElBQUwsQ0FBVSxDQUFWLENBRlY7QUFBQSxnQkFHSUcsTUFBTSxLQUhWOztBQU1BLG1CQUFPLENBQ0YsT0FBT0osSUFBUCxLQUFpQixXQUFsQixHQUFpQ0EsSUFBakMsR0FBd0NJLEdBRHJDLEVBRUYsT0FBT0YsR0FBUCxLQUFnQixXQUFqQixHQUFnQ0EsR0FBaEMsR0FBc0NFLEdBRm5DLEVBR0YsT0FBT0QsR0FBUCxLQUFnQixXQUFqQixHQUFnQ0EsR0FBaEMsR0FBc0NDLEdBSG5DLENBQVA7QUFLSDs7OzZCQUVJTixNQUFNTyxNQUFNO0FBQ2JOLG1DQUFxQkQsSUFBckIsSUFBK0JPLElBQS9CO0FBQ0g7Ozs4QkFFS1AsTUFBTTtBQUNSQyx5QkFBYU8sVUFBYixXQUFnQ1IsSUFBaEM7QUFDQSxtQkFBTyxLQUFLUyxPQUFMLEVBQVA7QUFDSDs7Ozs7QUM5Qkw7QUFDQTs7OztBQUdBLFNBQVNuQyxTQUFULEdBQXFCO0FBQ3BCLE1BQUtvQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsTUFBS0MsU0FBTCxHQUFpQkMsUUFBUUMsS0FBekI7QUFDQSxNQUFLQyxXQUFMLEdBQW1CRixRQUFRQyxLQUEzQjs7QUFFQSxNQUFLaEMsSUFBTDtBQUNBOztBQUVEUCxVQUFVUSxTQUFWLEdBQXVCLFlBQVc7QUFDakMsS0FBSUMsYUFBSjs7QUFFQSxVQUFTZ0MsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7QUFDcEIsTUFBR0EsUUFBUUosUUFBUUssQ0FBbkIsRUFDQ0QsTUFBTUosUUFBUU0sRUFBZCxDQURELEtBRUssSUFBR0YsUUFBUUosUUFBUU8sQ0FBbkIsRUFDSkgsTUFBTUosUUFBUVEsSUFBZCxDQURJLEtBRUEsSUFBR0osUUFBUUosUUFBUVMsQ0FBbkIsRUFDSkwsTUFBTUosUUFBUVUsS0FBZCxDQURJLEtBRUEsSUFBR04sUUFBUUosUUFBUVcsQ0FBbkIsRUFDSlAsTUFBTUosUUFBUVksSUFBZDs7QUFFRCxTQUFPUixHQUFQO0FBQ0E7O0FBRURTLGtCQUFpQixTQUFqQixFQUE0QixVQUFTQyxDQUFULEVBQVk7QUFDdkMsTUFBSVYsTUFBTUQsT0FBT1csRUFBRUMsT0FBVCxDQUFWOztBQUVBLE1BQUcsQ0FBQzVDLEtBQUsyQixRQUFMLENBQWNNLEdBQWQsQ0FBSixFQUF3QjtBQUN2QmpDLFFBQUsrQixXQUFMLEdBQW1CRSxHQUFuQjtBQUNBakMsUUFBSzJCLFFBQUwsQ0FBY00sR0FBZCxJQUFxQixJQUFyQjtBQUNBOztBQUVEO0FBQ0EsRUFURDs7QUFXQVMsa0JBQWlCLE9BQWpCLEVBQTBCLFVBQVNDLENBQVQsRUFBWTtBQUNyQzNDLE9BQUs0QixTQUFMLEdBQWlCSSxPQUFPVyxFQUFFQyxPQUFULENBQWpCO0FBQ0EsU0FBTzVDLEtBQUsyQixRQUFMLENBQWMzQixLQUFLNEIsU0FBbkIsQ0FBUDtBQUNBLEVBSEQ7O0FBTUEsUUFBTztBQUNOOUIsUUFBTSxnQkFBVztBQUNoQkUsVUFBTyxJQUFQO0FBQ0EsR0FISzs7QUFLTkssVUFBUSxrQkFBVyxDQUVsQixDQVBLLENBT0w7O0FBRUQ7QUFDQTtBQUNBO0FBWE0sRUFBUDtBQWFBLENBOUNxQixFQUF0Qjs7QUFpREE7QUFDQSxJQUFJd0IsVUFBVWdCLE9BQU9DLE1BQVAsQ0FBYztBQUMzQmhCLFFBQU8sQ0FBQyxDQURtQjtBQUUzQmlCLFFBQU8sRUFGb0I7QUFHM0JDLE9BQU0sRUFIcUI7QUFJM0JDLE1BQUssRUFKc0I7QUFLM0JDLFdBQVUsRUFMaUI7QUFNM0JULE9BQU0sRUFOcUI7QUFPM0JOLEtBQUksRUFQdUI7QUFRM0JJLFFBQU8sRUFSb0I7QUFTM0JGLE9BQU0sRUFUcUI7QUFVM0JjLFNBQVEsRUFWbUI7QUFXM0JYLElBQUcsRUFYd0I7QUFZM0JGLElBQUcsRUFad0I7QUFhM0JjLElBQUcsRUFid0I7QUFjM0JDLElBQUcsRUFkd0I7QUFlM0JDLElBQUcsRUFmd0I7QUFnQjNCQyxJQUFHLEVBaEJ3QjtBQWlCM0JDLElBQUcsRUFqQndCO0FBa0IzQkMsSUFBRyxFQWxCd0I7QUFtQjNCQyxJQUFHLEVBbkJ3QjtBQW9CM0J0QixJQUFHLEVBcEJ3QjtBQXFCM0JGLElBQUc7QUFyQndCLENBQWQsQ0FBZDs7QUF3QkEsSUFBSXlCLGVBQWUsRUFBbkI7QUFDQUEsYUFBYSxDQUFDLENBQWQsSUFBbUIsT0FBbkI7QUFDQUEsYUFBYSxFQUFiLElBQW1CLE9BQW5CO0FBQ0FBLGFBQWEsRUFBYixJQUFtQixNQUFuQjtBQUNBQSxhQUFhLEVBQWIsSUFBbUIsS0FBbkI7QUFDQUEsYUFBYSxFQUFiLElBQW1CLFVBQW5CO0FBQ0FBLGFBQWEsRUFBYixJQUFtQixNQUFuQjtBQUNBQSxhQUFhLEVBQWIsSUFBbUIsSUFBbkI7QUFDQUEsYUFBYSxFQUFiLElBQW1CLE9BQW5CO0FBQ0FBLGFBQWEsRUFBYixJQUFtQixNQUFuQjtBQUNBQSxhQUFhLEVBQWIsSUFBbUIsUUFBbkI7QUFDQUEsYUFBYSxFQUFiLElBQW1CLEdBQW5CO0FBQ0FBLGFBQWEsRUFBYixJQUFtQixHQUFuQjtBQUNBQSxhQUFhLEVBQWIsSUFBbUIsR0FBbkI7QUFDQUEsYUFBYSxFQUFiLElBQW1CLEdBQW5CO0FBQ0FBLGFBQWEsRUFBYixJQUFtQixHQUFuQjtBQUNBQSxhQUFhLEVBQWIsSUFBbUIsR0FBbkI7QUFDQUEsYUFBYSxFQUFiLElBQW1CLEdBQW5CO0FBQ0FBLGFBQWEsRUFBYixJQUFtQixHQUFuQjtBQUNBQSxhQUFhLEVBQWIsSUFBbUIsR0FBbkI7QUFDQUEsYUFBYSxFQUFiLElBQW1CLEdBQW5CO0FBQ0FBLGFBQWEsRUFBYixJQUFtQixHQUFuQjs7O0FDM0dBOzs7QUFHQSxTQUFTaEUsU0FBVCxDQUFtQmlFLE9BQW5CLEVBQTRCO0FBQ3hCLFdBQU87QUFDSDs7OztBQUlBQyxvQkFBWSxvQkFBU0MsT0FBVCxFQUFrQjtBQUMxQkEsb0JBQVFoRSxJQUFSO0FBQ0E4RCxvQkFBUWhFLElBQVIsR0FBZWtFLE9BQWY7QUFDSDtBQVJFLEtBQVA7QUFVSDs7QUFFRDtBQUNBLElBQUlDLE1BQU1sQixPQUFPQyxNQUFQLENBQWM7QUFDcEJQLFdBQU8sQ0FEYTtBQUVwQkUsVUFBTTtBQUZjLENBQWQsQ0FBVjtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QkFBZCxFQUE4QyxJQUE5QyxDQUFoQjtBQUNBZ0UsY0FBVXJFLElBQVYsQ0FBZSxZQUFNO0FBQ2pCUSxhQUFLdEYsS0FBTCxDQUFXbUUsVUFBWCxDQUFzQmlGLFFBQXRCO0FBQ0gsS0FGRDs7QUFJQSxRQUFJQSxXQUFXLElBQUkxRCxZQUFKLEVBQWY7QUFDQTBELGFBQVN0RSxJQUFULENBQWMsZUFBTztBQUNqQixZQUFHdkMsUUFBUUosUUFBUW9CLEdBQW5CLEVBQXdCO0FBQ3BCK0IsaUJBQUt0RixLQUFMLENBQVdtRSxVQUFYLENBQXNCZ0YsU0FBdEI7QUFDSCxTQUZELE1BR0ssSUFBRzVHLFFBQVFKLFFBQVFrQixLQUFuQixFQUEwQjtBQUMzQmlDLGlCQUFLdEYsS0FBTCxDQUFXbUUsVUFBWCxDQUFzQmtGLE9BQXRCO0FBQ0g7QUFDSixLQVBEOztBQVNBLFFBQUlDLE9BQU8sSUFBSWpCLElBQUosRUFBWDtBQUNBLFFBQUlrQixPQUFPLElBQUk3QixNQUFKLEVBQVg7QUFDQSxRQUFJMkIsVUFBVSxJQUFJdEMsU0FBSixDQUFjdUMsSUFBZCxFQUFvQkMsSUFBcEIsQ0FBZDs7QUFFQWpFLFNBQUtwRixJQUFMLEdBQVlpSixTQUFaO0FBQ0gsQ0F6QkQiLCJmaWxlIjoicGFnZVZhbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWxzIGNhbnZhcywgY3R4LCBHYW1lSW5wdXQsIEdhbWVHcmFwaGljcywgR2FtZVV0aWxzLCBHYW1lVmlldyAqL1xuLypcbiAqICAgIERlY2xhcmVzIHR3byBnbG9iYWxzOiBjYW52YXMgYW5kIGN0eFxuICovXG5mdW5jdGlvbiBHYW1lRW5naW5lKCkge1xuICAgIC8vIGJhY2sgYnV0dG9uXG4gICAgbGV0IGJhY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYmFja0J0bi5ocmVmID0gJy8jZ2FtZXMnO1xuICAgIGJhY2tCdG4uaW5uZXJUZXh0ID0gJ0JhY2snO1xuICAgIGJhY2tCdG4uY2xhc3NOYW1lID0gJ2J0bkJhY2snO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmFja0J0bik7XG5cbiAgICAvLyBjYW52YXNXcmFwXG4gICAgbGV0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3cmFwLmNsYXNzTmFtZSA9ICdjYW52YXNXcmFwJztcblxuICAgIC8vIGNhbnZhc1xuICAgIHdpbmRvdy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDE2KjYzKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA5KjYzKTtcbiAgICB3cmFwLmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwKTtcblxuICAgIHdpbmRvdy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHRoaXMuaW5wdXQgPSBuZXcgR2FtZUlucHV0KHRoaXMpO1xuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgR2FtZUdyYXBoaWNzKHRoaXMpO1xuICAgIHRoaXMudXRpbHMgPSBuZXcgR2FtZVV0aWxzKHRoaXMpO1xuICAgIHRoaXMudmlldyA9IG5ldyBHYW1lVmlldyh0aGlzKTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5HYW1lRW5naW5lLnByb3RvdHlwZSA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgdGhhdCxcbiAgICAgICAgdXBkYXRlSW50ZXJ2YWwsXG4gICAgICAgIHJlbmRlclJBRixcbiAgICAgICAgb25VcGRhdGVTZXQgPSBmYWxzZSxcbiAgICAgICAgb25SZW5kZXJTZXQgPSBmYWxzZVxuICAgIDtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhhdC52aWV3LnVwZGF0ZSgpO1xuXG4gICAgICAgIGlmKG9uVXBkYXRlU2V0KSB7XG4gICAgICAgICAgICB0aGF0Lm9uVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJlbmRlclJBRiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB0aGF0LnZpZXcucmVuZGVyKCk7XG5cbiAgICAgICAgaWYob25SZW5kZXJTZXQpIHtcbiAgICAgICAgICAgIHRoYXQub25SZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0ID0gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uVXBkYXRlU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25VcGRhdGUgPSBjYWxsYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlbmRlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uUmVuZGVyU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXIgPSBjYWxsYmFjaztcbiAgICAgICAgfSxcblxuICAgICAgICBzdGFydDogKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGUsIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICByZW5kZXJSQUYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wOiAoKSA9PiB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHVwZGF0ZUludGVydmFsKTtcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlbmRlclJBRik7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qXG4gKlxuICovXG5jbGFzcyBHYW1lU2F2ZSB7XG4gICAgbG9hZChzbG90KSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2VbYHNsb3QgJHtzbG90fWBdO1xuICAgIH1cblxuICAgIGdldExpc3QoKSB7XG4gICAgICAgIHZhciB6ZXJvID0gdGhpcy5sb2FkKDApLFxuICAgICAgICAgICAgb25lID0gdGhpcy5sb2FkKDEpLFxuICAgICAgICAgICAgdHdvID0gdGhpcy5sb2FkKDIpLFxuICAgICAgICAgICAgZGVmID0gJy0tLSdcbiAgICAgICAgO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAodHlwZW9mKHplcm8pICE9PSAndW5kZWZpbmVkJykgPyB6ZXJvIDogZGVmLFxuICAgICAgICAgICAgKHR5cGVvZihvbmUpICE9PSAndW5kZWZpbmVkJykgPyBvbmUgOiBkZWYsXG4gICAgICAgICAgICAodHlwZW9mKHR3bykgIT09ICd1bmRlZmluZWQnKSA/IHR3byA6IGRlZlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHNhdmUoc2xvdCwgZGF0YSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2VbYHNsb3QgJHtzbG90fWBdID0gZGF0YTtcbiAgICB9XG5cbiAgICBlcmFzZShzbG90KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBzbG90ICR7c2xvdH1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdCgpO1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qXG4gKiBUaGUgaW5wdXQgY29tcG9uZW50IG9mIEdhbWVFbmdpbmUuXG4gKi9cbmZ1bmN0aW9uIEdhbWVJbnB1dCgpIHtcblx0dGhpcy5rZXlzRG93biA9IHt9O1xuXHR0aGlzLmxhc3RLZXlVcCA9IEtleUNvZGUuRU1QVFk7XG5cdHRoaXMubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuXG5cdHRoaXMuaW5pdCgpO1xufVxuXG5HYW1lSW5wdXQucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgdGhhdDtcblxuXHRmdW5jdGlvbiBmaXhLZXkoa2V5KSB7XG5cdFx0aWYoa2V5ID09PSBLZXlDb2RlLlcpXG5cdFx0XHRrZXkgPSBLZXlDb2RlLlVQO1xuXHRcdGVsc2UgaWYoa2V5ID09PSBLZXlDb2RlLlMpXG5cdFx0XHRrZXkgPSBLZXlDb2RlLkRPV047XG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuRClcblx0XHRcdGtleSA9IEtleUNvZGUuUklHSFQ7XG5cdFx0ZWxzZSBpZihrZXkgPT09IEtleUNvZGUuQSlcblx0XHRcdGtleSA9IEtleUNvZGUuTEVGVDtcblxuXHRcdHJldHVybiBrZXk7XG5cdH1cblxuXHRhZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXHRcdGxldCBrZXkgPSBmaXhLZXkoZS5rZXlDb2RlKTtcblxuXHRcdGlmKCF0aGF0LmtleXNEb3duW2tleV0pIHtcblx0XHRcdHRoYXQubGFzdEtleURvd24gPSBrZXk7XG5cdFx0XHR0aGF0LmtleXNEb3duW2tleV0gPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vdGhhdC5vbktleURvd24oa2V5KTtcblx0fSk7XG5cblx0YWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG5cdFx0dGhhdC5sYXN0S2V5VXAgPSBmaXhLZXkoZS5rZXlDb2RlKTtcblx0XHRkZWxldGUgdGhhdC5rZXlzRG93blt0aGF0Lmxhc3RLZXlVcF07XG5cdH0pO1xuXG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdHRoYXQgPSB0aGlzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0fS8vLFxuXG5cdFx0Ly8gb25LZXlEb3duOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdC8vICAgICB0aGlzLm9uS2V5RG93biA9IGNhbGxiYWNrO1xuXHRcdC8vIH1cblx0fTtcbn0pKCk7XG5cblxuLy8gZ2xvYmFsIGVudW1zXG52YXIgS2V5Q29kZSA9IE9iamVjdC5mcmVlemUoe1xuXHRFTVBUWTogLTEsXG5cdEVOVEVSOiAxMyxcblx0Q1RSTDogMTcsXG5cdEVTQzogMjcsXG5cdFNQQUNFQkFSOiAzMixcblx0TEVGVDogMzcsXG5cdFVQOiAzOCxcblx0UklHSFQ6IDM5LFxuXHRET1dOOiA0MCxcblx0REVMRVRFOiA0Nixcblx0QTogNjUsXG5cdEQ6IDY4LFxuXHRGOiA3MCxcblx0SDogNzIsXG5cdEo6IDc0LFxuXHRLOiA3NSxcblx0TTogNzcsXG5cdE86IDc5LFxuXHRSOiA4Mixcblx0UzogODMsXG5cdFc6IDg3XG59KTtcblxubGV0IEtleUNvZGVOYW1lcyA9IHt9O1xuS2V5Q29kZU5hbWVzWy0xXSA9ICdFTVBUWSc7XG5LZXlDb2RlTmFtZXNbMTNdID0gJ0VOVEVSJztcbktleUNvZGVOYW1lc1sxN10gPSAnQ1RSTCc7XG5LZXlDb2RlTmFtZXNbMjddID0gJ0VTQyc7XG5LZXlDb2RlTmFtZXNbMzJdID0gJ1NQQUNFQkFSJztcbktleUNvZGVOYW1lc1szN10gPSAnTEVGVCc7XG5LZXlDb2RlTmFtZXNbMzhdID0gJ1VQJztcbktleUNvZGVOYW1lc1szOV0gPSAnUklHSFQnO1xuS2V5Q29kZU5hbWVzWzQwXSA9ICdET1dOJztcbktleUNvZGVOYW1lc1s0Nl0gPSAnREVMRVRFJztcbktleUNvZGVOYW1lc1s2NV0gPSAnQSc7XG5LZXlDb2RlTmFtZXNbNjhdID0gJ0QnO1xuS2V5Q29kZU5hbWVzWzcwXSA9ICdGJztcbktleUNvZGVOYW1lc1s3Ml0gPSAnSCc7XG5LZXlDb2RlTmFtZXNbNzRdID0gJ0onO1xuS2V5Q29kZU5hbWVzWzc1XSA9ICdLJztcbktleUNvZGVOYW1lc1s3N10gPSAnTSc7XG5LZXlDb2RlTmFtZXNbNzldID0gJ08nO1xuS2V5Q29kZU5hbWVzWzgyXSA9ICdSJztcbktleUNvZGVOYW1lc1s4M10gPSAnUyc7XG5LZXlDb2RlTmFtZXNbODddID0gJ1cnO1xuIiwiLypcbiAgICBUaGUgdXRpbHMgY29tcG9uZW50IG9mIEdhbWVFbmdpbmUuXG4qL1xuZnVuY3Rpb24gR2FtZVV0aWxzKGdFbmdpbmUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAvKlxuICAgICAgICAgICAgUmVzZXRzIHRoZSBuZXdWaWV3J3MgcHJpdmF0ZSB2YXJpYWJsZXMuXG4gICAgICAgICAgICBDaGFuZ2VzIHRoZSB2aWV3LlxuICAgICAgICAqL1xuICAgICAgICBzd2l0Y2hWaWV3OiBmdW5jdGlvbihuZXdWaWV3KSB7XG4gICAgICAgICAgICBuZXdWaWV3LmluaXQoKTtcbiAgICAgICAgICAgIGdFbmdpbmUudmlldyA9IG5ld1ZpZXc7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBnbG9iYWwgZW51bXNcbnZhciBEaXIgPSBPYmplY3QuZnJlZXplKHtcbiAgICBSSUdIVDogMCxcbiAgICBMRUZUOiAxXG59KTsiLCIvLyBWZXJzaW9uIDAuMiAtIENvcHlyaWdodCAyMDEzIC0gIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+XG4vL1xuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2pyaWVja2VuL3NhdC1qc1xuLy9cbi8vIEEgc2ltcGxlIGxpYnJhcnkgZm9yIGRldGVybWluaW5nIGludGVyc2VjdGlvbnMgb2YgY2lyY2xlcyBhbmRcbi8vIHBvbHlnb25zIHVzaW5nIHRoZSBTZXBhcmF0aW5nIEF4aXMgVGhlb3JlbS5cbi8qKiBAcHJlc2VydmUgU0FULmpzIC0gVmVyc2lvbiAwLjIgLSBDb3B5cmlnaHQgMjAxMyAtIEppbSBSaWVja2VuIDxqaW1yQGppbXIuY2E+IC0gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBodHRwczovL2dpdGh1Yi5jb20vanJpZWNrZW4vc2F0LWpzICovXG5cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UqL1xuLypqc2hpbnQgc2hhZG93OnRydWUsIHN1Yjp0cnVlLCBmb3Jpbjp0cnVlLCBub2FyZzp0cnVlLCBub2VtcHR5OnRydWUsIFxuICBlcWVxZXE6dHJ1ZSwgYml0d2lzZTp0cnVlLCBzdHJpY3Q6dHJ1ZSwgdW5kZWY6dHJ1ZSwgXG4gIGN1cmx5OnRydWUsIGJyb3dzZXI6dHJ1ZSAqL1xuXG4vLyBDcmVhdGUgYSBVTUQgd3JhcHBlciBmb3IgU0FULiBXb3JrcyBpbjpcbi8vXG4vLyAgLSBQbGFpbiBicm93c2VyIHZpYSBnbG9iYWwgU0FUIHZhcmlhYmxlXG4vLyAgLSBBTUQgbG9hZGVyIChsaWtlIHJlcXVpcmUuanMpXG4vLyAgLSBOb2RlLmpzXG4vL1xuLy8gVGhlIHF1b3RlZCBwcm9wZXJ0aWVzIGFsbCBvdmVyIHRoZSBwbGFjZSBhcmUgdXNlZCBzbyB0aGF0IHRoZSBDbG9zdXJlIENvbXBpbGVyXG4vLyBkb2VzIG5vdCBtYW5nbGUgdGhlIGV4cG9zZWQgQVBJIGluIGFkdmFuY2VkIG1vZGUuXG4vKipcbiAqIEBwYXJhbSB7Kn0gcm9vdCAtIFRoZSBnbG9iYWwgc2NvcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZhY3RvcnkgLSBGYWN0b3J5IHRoYXQgY3JlYXRlcyBTQVQgbW9kdWxlXG4gKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgIGRlZmluZShmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290WydTQVQnXSA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBTQVQgPSB7fTtcblxuICAvL1xuICAvLyAjIyBWZWN0b3JcbiAgLy9cbiAgLy8gUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXG5cblxuICAvLyBDcmVhdGUgYSBuZXcgVmVjdG9yLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzLiBJZlxuICAvLyBhIGNvb3JkaW5hdGUgaXMgbm90IHNwZWNpZmllZCwgaXQgd2lsbCBiZSBzZXQgdG8gYDBgXG4gIC8qKiBcbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geCBUaGUgeCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geSBUaGUgeSBwb3NpdGlvbi5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBWZWN0b3IoeCwgeSkge1xuICAgIHRoaXNbJ3gnXSA9IHggfHwgMDtcbiAgICB0aGlzWyd5J10gPSB5IHx8IDA7XG4gIH1cbiAgU0FUWydWZWN0b3InXSA9IFZlY3RvcjtcbiAgLy8gQWxpYXMgYFZlY3RvcmAgYXMgYFZgXG4gIFNBVFsnViddID0gVmVjdG9yO1xuXG5cbiAgLy8gQ29weSB0aGUgdmFsdWVzIG9mIGFub3RoZXIgVmVjdG9yIGludG8gdGhpcyBvbmUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2NvcHknXSA9IFZlY3Rvci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdGhpc1sneCddID0gb3RoZXJbJ3gnXTtcbiAgICB0aGlzWyd5J10gPSBvdGhlclsneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIENoYW5nZSB0aGlzIHZlY3RvciB0byBiZSBwZXJwZW5kaWN1bGFyIHRvIHdoYXQgaXQgd2FzIGJlZm9yZS4gKEVmZmVjdGl2ZWx5XG4gIC8vIHJvYXRhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uKVxuICAvKipcbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3BlcnAnXSA9IFZlY3Rvci5wcm90b3R5cGUucGVycCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4ID0gdGhpc1sneCddO1xuICAgIHRoaXNbJ3gnXSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzWyd5J10gPSAteDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBSb3RhdGUgdGhpcyB2ZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKVxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncm90YXRlJ10gPSBWZWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xuICAgIHZhciB4ID0gdGhpc1sneCddO1xuICAgIHZhciB5ID0gdGhpc1sneSddO1xuICAgIHRoaXNbJ3gnXSA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xuICAgIHRoaXNbJ3knXSA9IHggKiBNYXRoLnNpbihhbmdsZSkgKyB5ICogTWF0aC5jb3MoYW5nbGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJldmVyc2UgdGhpcyB2ZWN0b3IuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncmV2ZXJzZSddID0gVmVjdG9yLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1sneCddID0gLXRoaXNbJ3gnXTtcbiAgICB0aGlzWyd5J10gPSAtdGhpc1sneSddO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcblxuICAvLyBOb3JtYWxpemUgdGhpcyB2ZWN0b3IuICAobWFrZSBpdCBoYXZlIGxlbmd0aCBvZiBgMWApXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnbm9ybWFsaXplJ10gPSBWZWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkID0gdGhpcy5sZW4oKTtcbiAgICBpZihkID4gMCkge1xuICAgICAgdGhpc1sneCddID0gdGhpc1sneCddIC8gZDtcbiAgICAgIHRoaXNbJ3knXSA9IHRoaXNbJ3knXSAvIGQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLy8gQWRkIGFub3RoZXIgdmVjdG9yIHRvIHRoaXMgb25lLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydhZGQnXSA9IFZlY3Rvci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICB0aGlzWyd4J10gKz0gb3RoZXJbJ3gnXTtcbiAgICB0aGlzWyd5J10gKz0gb3RoZXJbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIFN1YnRyYWN0IGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsnc3ViJ10gPSBWZWN0b3IucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdGhpc1sneCddIC09IG90aGVyWyd4J107XG4gICAgdGhpc1sneSddIC09IG90aGVyWyd5J107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvLyBTY2FsZSB0aGlzIHZlY3Rvci4gQW4gaW5kZXBlbmRhbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkXG4gIC8vIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHRoYXQgd2lsbCBzY2FsZSBib3RoIGB4YCBhbmQgYHlgLlxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB4IGRpcmVjdGlvbi5cbiAgICogQHBhcmFtIHs/bnVtYmVyPX0geSBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHkgZGlyZWN0aW9uLiAgSWYgdGhpc1xuICAgKiAgIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSB4IHNjYWxpbmcgZmFjdG9yIHdpbGwgYmUgdXNlZC5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3NjYWxlJ10gPSBWZWN0b3IucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24oeCx5KSB7XG4gICAgdGhpc1sneCddICo9IHg7XG4gICAgdGhpc1sneSddICo9IHkgfHwgeDtcbiAgICByZXR1cm4gdGhpczsgXG4gIH07XG4gIFxuICAvLyBQcm9qZWN0IHRoaXMgdmVjdG9yIG9uIHRvIGFub3RoZXIgdmVjdG9yLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxuICAgKiBAcmV0dXJuIHtWZWN0b3J9IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgVmVjdG9yLnByb3RvdHlwZVsncHJvamVjdCddID0gVmVjdG9yLnByb3RvdHlwZS5wcm9qZWN0ID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICB2YXIgYW10ID0gdGhpcy5kb3Qob3RoZXIpIC8gb3RoZXIubGVuMigpO1xuICAgIHRoaXNbJ3gnXSA9IGFtdCAqIG90aGVyWyd4J107XG4gICAgdGhpc1sneSddID0gYW10ICogb3RoZXJbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIFByb2plY3QgdGhpcyB2ZWN0b3Igb250byBhIHZlY3RvciBvZiB1bml0IGxlbmd0aC4gVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudFxuICAvLyB0aGFuIGBwcm9qZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCB1bml0IHZlY3RvcnMuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3Byb2plY3ROJ10gPSBWZWN0b3IucHJvdG90eXBlLnByb2plY3ROID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICB2YXIgYW10ID0gdGhpcy5kb3Qob3RoZXIpO1xuICAgIHRoaXNbJ3gnXSA9IGFtdCAqIG90aGVyWyd4J107XG4gICAgdGhpc1sneSddID0gYW10ICogb3RoZXJbJ3knXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8vIFJlZmxlY3QgdGhpcyB2ZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cbiAgICogQHJldHVybiB7VmVjdG9yfSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ3JlZmxlY3QnXSA9IFZlY3Rvci5wcm90b3R5cGUucmVmbGVjdCA9IGZ1bmN0aW9uKGF4aXMpIHtcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzLnByb2plY3QoYXhpcykuc2NhbGUoMik7XG4gICAgdGhpc1sneCddIC09IHg7XG4gICAgdGhpc1sneSddIC09IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvLyBSZWZsZWN0IHRoaXMgdmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzIChyZXByZXNlbnRlZCBieSBhIHVuaXQgdmVjdG9yKS4gVGhpcyBpc1xuICAvLyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGByZWZsZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCBhbiBheGlzIHRoYXQgaXMgYSB1bml0IHZlY3Rvci5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSB1bml0IHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXG4gICAqIEByZXR1cm4ge1ZlY3Rvcn0gVGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydyZWZsZWN0TiddID0gVmVjdG9yLnByb3RvdHlwZS5yZWZsZWN0TiA9IGZ1bmN0aW9uKGF4aXMpIHtcbiAgICB2YXIgeCA9IHRoaXNbJ3gnXTtcbiAgICB2YXIgeSA9IHRoaXNbJ3knXTtcbiAgICB0aGlzLnByb2plY3ROKGF4aXMpLnNjYWxlKDIpO1xuICAgIHRoaXNbJ3gnXSAtPSB4O1xuICAgIHRoaXNbJ3knXSAtPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLy8gR2V0IHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlci5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSAgb3RoZXIgVGhlIHZlY3RvciB0byBkb3QgdGhpcyBvbmUgYWdhaW5zdC5cbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgZG90IHByb2R1Y3QuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydkb3QnXSA9IFZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpc1sneCddICogb3RoZXJbJ3gnXSArIHRoaXNbJ3knXSAqIG90aGVyWyd5J107XG4gIH07XG4gIFxuICAvLyBHZXQgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAvKipcbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgbGVuZ3RoXjIgb2YgdGhpcyB2ZWN0b3IuXG4gICAqL1xuICBWZWN0b3IucHJvdG90eXBlWydsZW4yJ10gPSBWZWN0b3IucHJvdG90eXBlLmxlbjIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG4gIH07XG4gIFxuICAvLyBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgLyoqXG4gICAqIEByZXR1cm4ge251bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICovXG4gIFZlY3Rvci5wcm90b3R5cGVbJ2xlbiddID0gVmVjdG9yLnByb3RvdHlwZS5sZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcbiAgfTtcbiAgXG4gIC8vICMjIENpcmNsZVxuICAvL1xuICAvLyBSZXByZXNlbnRzIGEgY2lyY2xlIHdpdGggYSBwb3NpdGlvbiBhbmQgYSByYWRpdXMuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGNpcmNsZSwgb3B0aW9uYWxseSBwYXNzaW5nIGluIGEgcG9zaXRpb24gYW5kL29yIHJhZGl1cy4gSWYgbm8gcG9zaXRpb25cbiAgLy8gaXMgZ2l2ZW4sIHRoZSBjaXJjbGUgd2lsbCBiZSBhdCBgKDAsMClgLiBJZiBubyByYWRpdXMgaXMgcHJvdmlkZWQsIHRoZSBjaXJjbGUgd2lsbFxuICAvLyBoYXZlIGEgcmFkaXVzIG9mIGAwYC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlXG4gICAqIEBwYXJhbSB7P251bWJlcj19IHIgVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gQ2lyY2xlKHBvcywgcikge1xuICAgIHRoaXNbJ3BvcyddID0gcG9zIHx8IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzWydyJ10gPSByIHx8IDA7XG4gIH1cbiAgU0FUWydDaXJjbGUnXSA9IENpcmNsZTtcblxuICAvLyAjIyBQb2x5Z29uXG4gIC8vXG4gIC8vIFJlcHJlc2VudHMgYSAqY29udmV4KiBwb2x5Z29uIHdpdGggYW55IG51bWJlciBvZiBwb2ludHMgKHNwZWNpZmllZCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlcilcbiAgLy9cbiAgLy8gVGhlIGVkZ2VzL25vcm1hbHMgb2YgdGhlIHBvbHlnb24gd2lsbCBiZSBjYWxjdWxhdGVkIG9uIGNyZWF0aW9uIGFuZCBzdG9yZWQgaW4gdGhlXG4gIC8vIGBlZGdlc2AgYW5kIGBub3JtYWxzYCBwcm9wZXJ0aWVzLiBJZiB5b3UgY2hhbmdlIHRoZSBwb2x5Z29uJ3MgcG9pbnRzLCB5b3Ugd2lsbCBuZWVkXG4gIC8vIHRvIGNhbGwgYHJlY2FsY2AgdG8gcmVjYWxjdWxhdGUgdGhlIGVkZ2VzL25vcm1hbHMuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IHBvbHlnb24sIHBhc3NpbmcgaW4gYSBwb3NpdGlvbiB2ZWN0b3IsIGFuZCBhbiBhcnJheSBvZiBwb2ludHMgKHJlcHJlc2VudGVkXG4gIC8vIGJ5IHZlY3RvcnMgcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uXG4gIC8vIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yPX0gcG9zIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luIG9mIHRoZSBwb2x5Z29uLiAoYWxsIG90aGVyXG4gICAqICAgcG9pbnRzIGFyZSByZWxhdGl2ZSB0byB0aGlzIG9uZSlcbiAgICogQHBhcmFtIHtBcnJheS48VmVjdG9yPj19IHBvaW50cyBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLFxuICAgKiAgIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIFBvbHlnb24ocG9zLCBwb2ludHMpIHtcbiAgICB0aGlzWydwb3MnXSA9IHBvcyB8fCBuZXcgVmVjdG9yKCk7XG4gICAgdGhpc1sncG9pbnRzJ10gPSBwb2ludHMgfHwgW107XG4gICAgdGhpcy5yZWNhbGMoKTtcbiAgfVxuICBTQVRbJ1BvbHlnb24nXSA9IFBvbHlnb247XG4gIFxuICAvLyBSZWNhbGN1bGF0ZXMgdGhlIGVkZ2VzIGFuZCBub3JtYWxzIG9mIHRoZSBwb2x5Z29uLiBUaGlzICoqbXVzdCoqIGJlIGNhbGxlZFxuICAvLyBpZiB0aGUgYHBvaW50c2AgYXJyYXkgaXMgbW9kaWZpZWQgYXQgYWxsIGFuZCB0aGUgZWRnZXMgb3Igbm9ybWFscyBhcmUgdG8gYmVcbiAgLy8gYWNjZXNzZWQuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWydyZWNhbGMnXSA9IFBvbHlnb24ucHJvdG90eXBlLnJlY2FsYyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xuICAgIC8vIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhIGdpdmVuIGVkZ2UgZnJvbSB0aGUgZWRnZSB2YWx1ZSwgeW91IG11c3RcbiAgICAvLyBmaXJzdCB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICB0aGlzWydlZGdlcyddID0gW107XG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcbiAgICAvLyB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGFuIGVkZ2Ugbm9ybWFsLCB5b3UgbXVzdCBmaXJzdFxuICAgIC8vIHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgIHRoaXNbJ25vcm1hbHMnXSA9IFtdO1xuICAgIHZhciBwb2ludHMgPSB0aGlzWydwb2ludHMnXTtcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgcDEgPSBwb2ludHNbaV07IFxuICAgICAgdmFyIHAyID0gaSA8IGxlbiAtIDEgPyBwb2ludHNbaSArIDFdIDogcG9pbnRzWzBdO1xuICAgICAgdmFyIGUgPSBuZXcgVmVjdG9yKCkuY29weShwMikuc3ViKHAxKTtcbiAgICAgIHZhciBuID0gbmV3IFZlY3RvcigpLmNvcHkoZSkucGVycCgpLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpc1snZWRnZXMnXS5wdXNoKGUpO1xuICAgICAgdGhpc1snbm9ybWFscyddLnB1c2gobik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFJvdGF0ZXMgdGhpcyBwb2x5Z29uIGNvdW50ZXItY2xvY2t3aXNlIGFyb3VuZCB0aGUgb3JpZ2luIG9mICppdHMgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cbiAgLy9cbiAgLy8gTm90ZTogWW91IGRvICoqbm90KiogbmVlZCB0byBjYWxsIGByZWNhbGNgIGFmdGVyIHJvdGF0aW9uLlxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpXG4gICAqIEByZXR1cm4ge1BvbHlnb259IFRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgUG9seWdvbi5wcm90b3R5cGVbJ3JvdGF0ZSddID0gUG9seWdvbi5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24oYW5nbGUpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgcG9pbnRzID0gdGhpc1sncG9pbnRzJ107XG4gICAgdmFyIGVkZ2VzID0gdGhpc1snZWRnZXMnXTtcbiAgICB2YXIgbm9ybWFscyA9IHRoaXNbJ25vcm1hbHMnXTtcbiAgICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBvaW50c1tpXS5yb3RhdGUoYW5nbGUpO1xuICAgICAgZWRnZXNbaV0ucm90YXRlKGFuZ2xlKTtcbiAgICAgIG5vcm1hbHNbaV0ucm90YXRlKGFuZ2xlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gVHJhbnNsYXRlcyB0aGUgcG9pbnRzIG9mIHRoaXMgcG9seWdvbiBieSBhIHNwZWNpZmllZCBhbW91bnQgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiAqaXRzIG93biBjb29yZGluYXRlXG4gIC8vIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxuICAvL1xuICAvLyBUaGlzIGlzIG1vc3QgdXNlZnVsIHRvIGNoYW5nZSB0aGUgXCJjZW50ZXIgcG9pbnRcIiBvZiBhIHBvbHlnb24uXG4gIC8vXG4gIC8vIE5vdGU6IFlvdSBkbyAqKm5vdCoqIG5lZWQgdG8gY2FsbCBgcmVjYWxjYCBhZnRlciB0cmFuc2xhdGlvbi5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB2ZXJ0aWNhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBUaGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIFBvbHlnb24ucHJvdG90eXBlWyd0cmFuc2xhdGUnXSA9IFBvbHlnb24ucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIHBvaW50cyA9IHRoaXNbJ3BvaW50cyddO1xuICAgIHZhciBsZW4gPSBwb2ludHMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgcG9pbnRzW2ldLnggKz0geDtcbiAgICAgIHBvaW50c1tpXS55ICs9IHk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vICMjIEJveFxuICAvL1xuICAvLyBSZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3gsIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxuXG5cbiAgLy8gQ3JlYXRlIGEgbmV3IGJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC4gSWYgbm8gcG9zaXRpb25cbiAgLy8gaXMgZ2l2ZW4sIHRoZSBwb3NpdGlvbiB3aWxsIGJlIGAoMCwwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbFxuICAvLyBiZSBzZXQgdG8gYDBgLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3I9fSBwb3MgQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSB0b3AtbGVmdCBvZiB0aGUgYm94LlxuICAgKiBAcGFyYW0gez9udW1iZXI9fSB3IFRoZSB3aWR0aCBvZiB0aGUgYm94LlxuICAgKiBAcGFyYW0gez9udW1iZXI9fSBoIFRoZSBoZWlnaHQgb2YgdGhlIGJveC5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBCb3gocG9zLCB3LCBoKSB7XG4gICAgdGhpc1sncG9zJ10gPSBwb3MgfHwgbmV3IFZlY3RvcigpO1xuICAgIHRoaXNbJ3cnXSA9IHcgfHwgMDtcbiAgICB0aGlzWydoJ10gPSBoIHx8IDA7XG4gIH1cbiAgU0FUWydCb3gnXSA9IEJveDtcblxuICAvLyBSZXR1cm5zIGEgcG9seWdvbiB3aG9zZSBlZGdlcyBhcmUgdGhlIHNhbWUgYXMgdGhpcyBib3guXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIGJveC5cbiAgICovXG4gIEJveC5wcm90b3R5cGVbJ3RvUG9seWdvbiddID0gQm94LnByb3RvdHlwZS50b1BvbHlnb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcG9zID0gdGhpc1sncG9zJ107XG4gICAgdmFyIHcgPSB0aGlzWyd3J107XG4gICAgdmFyIGggPSB0aGlzWydoJ107XG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IocG9zWyd4J10sIHBvc1sneSddKSwgW1xuICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksIFxuICAgICBuZXcgVmVjdG9yKHcsaCksIG5ldyBWZWN0b3IoMCxoKVxuICAgIF0pO1xuICB9O1xuICBcbiAgLy8gIyMgUmVzcG9uc2VcbiAgLy9cbiAgLy8gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVzdWx0IG9mIGFuIGludGVyc2VjdGlvbi4gQ29udGFpbnM6XG4gIC8vICAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cbiAgLy8gIC0gVGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG1pbmltdW0gY2hhbmdlIG5lY2Vzc2FyeSB0byBleHRyYWN0IHRoZSBmaXJzdCBvYmplY3RcbiAgLy8gICAgZnJvbSB0aGUgc2Vjb25kIG9uZSAoYXMgd2VsbCBhcyBhIHVuaXQgdmVjdG9yIGluIHRoYXQgZGlyZWN0aW9uIGFuZCB0aGUgbWFnbml0dWRlXG4gIC8vICAgIG9mIHRoZSBvdmVybGFwKVxuICAvLyAgLSBXaGV0aGVyIHRoZSBmaXJzdCBvYmplY3QgaXMgZW50aXJlbHkgaW5zaWRlIHRoZSBzZWNvbmQsIGFuZCB2aWNlIHZlcnNhLlxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqLyAgXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKCkge1xuICAgIHRoaXNbJ2EnXSA9IG51bGw7XG4gICAgdGhpc1snYiddID0gbnVsbDtcbiAgICB0aGlzWydvdmVybGFwTiddID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXNbJ292ZXJsYXBWJ10gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG4gIFNBVFsnUmVzcG9uc2UnXSA9IFJlc3BvbnNlO1xuXG4gIC8vIFNldCBzb21lIHZhbHVlcyBvZiB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGVpciBkZWZhdWx0cy4gIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmXG4gIC8vIHlvdSBhcmUgZ29pbmcgdG8gcmV1c2UgYSBzaW5nbGUgUmVzcG9uc2Ugb2JqZWN0IGZvciBtdWx0aXBsZSBpbnRlcnNlY3Rpb24gdGVzdHMgKHJlY29tbWVudGVkXG4gIC8vIGFzIGl0IHdpbGwgYXZvaWQgYWxsY2F0aW5nIGV4dHJhIG1lbW9yeSlcbiAgLyoqXG4gICAqIEByZXR1cm4ge1Jlc3BvbnNlfSBUaGlzIGZvciBjaGFpbmluZ1xuICAgKi9cbiAgUmVzcG9uc2UucHJvdG90eXBlWydjbGVhciddID0gUmVzcG9uc2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1snYUluQiddID0gdHJ1ZTtcbiAgICB0aGlzWydiSW5BJ10gPSB0cnVlO1xuICAgIHRoaXNbJ292ZXJsYXAnXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gIyMgT2JqZWN0IFBvb2xzXG5cbiAgLy8gQSBwb29sIG9mIGBWZWN0b3JgIG9iamVjdHMgdGhhdCBhcmUgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWRcbiAgLy8gYWxsb2NhdGluZyBtZW1vcnkuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPFZlY3Rvcj59XG4gICAqL1xuICB2YXIgVF9WRUNUT1JTID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykgeyBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpOyB9XG4gIFxuICAvLyBBIHBvb2wgb2YgYXJyYXlzIG9mIG51bWJlcnMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZ1xuICAvLyBtZW1vcnkuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXkuPEFycmF5LjxudW1iZXI+Pn1cbiAgICovXG4gIHZhciBUX0FSUkFZUyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykgeyBUX0FSUkFZUy5wdXNoKFtdKTsgfVxuXG4gIC8vICMjIEhlbHBlciBGdW5jdGlvbnNcblxuICAvLyBGbGF0dGVucyB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHBvaW50cyBvbnRvIGEgdW5pdCB2ZWN0b3IgYXhpcyxcbiAgLy8gcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbmFsIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZFxuICAvLyBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBub3JtYWwgVGhlIHVuaXQgdmVjdG9yIGF4aXMgdG8gZmxhdHRlbiBvbi5cbiAgICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gcmVzdWx0IEFuIGFycmF5LiAgQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLFxuICAgKiAgIHJlc3VsdFswXSB3aWxsIGJlIHRoZSBtaW5pbXVtIHZhbHVlLFxuICAgKiAgIHJlc3VsdFsxXSB3aWxsIGJlIHRoZSBtYXhpbXVtIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gZmxhdHRlblBvaW50c09uKHBvaW50cywgbm9ybWFsLCByZXN1bHQpIHtcbiAgICB2YXIgbWluID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB2YXIgbWF4ID0gLU51bWJlci5NQVhfVkFMVUU7XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbFxuICAgICAgdmFyIGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcbiAgICAgIGlmIChkb3QgPCBtaW4pIHsgbWluID0gZG90OyB9XG4gICAgICBpZiAoZG90ID4gbWF4KSB7IG1heCA9IGRvdDsgfVxuICAgIH1cbiAgICByZXN1bHRbMF0gPSBtaW47IHJlc3VsdFsxXSA9IG1heDtcbiAgfVxuICBcbiAgLy8gQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZFxuICAvLyBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYlBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge0FycmF5LjxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXG4gICAqIEBwYXJhbSB7QXJyYXkuPFZlY3Rvcj59IGJQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgc2Vjb25kIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnNcbiAgICogICB3aWxsIGJlIHByb2plY3RlZCBvbnRvIHRoaXMgYXhpcy5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWRcbiAgICogICBpZiB0aGUgYXhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLFxuICAgKiAgIGFuZCBhIHJlc3BvbnNlIGlzIHBhc3NlZCBpbiwgaW5mb3JtYXRpb24gYWJvdXQgaG93IG11Y2ggb3ZlcmxhcCBhbmRcbiAgICogICB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvdmVybGFwIHdpbGwgYmUgcG9wdWxhdGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gaXNTZXBhcmF0aW5nQXhpcyhhUG9zLCBiUG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBheGlzLCByZXNwb25zZSkge1xuICAgIHZhciByYW5nZUEgPSBUX0FSUkFZUy5wb3AoKTtcbiAgICB2YXIgcmFuZ2VCID0gVF9BUlJBWVMucG9wKCk7XG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgb2Zmc2V0IGJldHdlZW4gdGhlIHR3byBwb2x5Z29uc1xuICAgIHZhciBvZmZzZXRWID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xuICAgIHZhciBwcm9qZWN0ZWRPZmZzZXQgPSBvZmZzZXRWLmRvdChheGlzKTtcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxuICAgIGZsYXR0ZW5Qb2ludHNPbihhUG9pbnRzLCBheGlzLCByYW5nZUEpO1xuICAgIGZsYXR0ZW5Qb2ludHNPbihiUG9pbnRzLCBheGlzLCByYW5nZUIpO1xuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxuICAgIHJhbmdlQlswXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XG4gICAgcmFuZ2VCWzFdICs9IHByb2plY3RlZE9mZnNldDtcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXG4gICAgaWYgKHJhbmdlQVswXSA+IHJhbmdlQlsxXSB8fCByYW5nZUJbMF0gPiByYW5nZUFbMV0pIHtcbiAgICAgIFRfVkVDVE9SUy5wdXNoKG9mZnNldFYpOyBcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTsgXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHZhciBvdmVybGFwID0gMDtcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcbiAgICAgIGlmIChyYW5nZUFbMF0gPCByYW5nZUJbMF0pIHtcbiAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA8IHJhbmdlQlsxXSkgeyBcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xuICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XG4gICAgICAgICAgdmFyIG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xuICAgICAgICB9XG4gICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZVsnYkluQSddID0gZmFsc2U7XG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7IFxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XG4gICAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xuICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICB2YXIgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cbiAgICAgIHZhciBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlWydvdmVybGFwJ10pIHtcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXAnXSA9IGFic092ZXJsYXA7XG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLmNvcHkoYXhpcyk7XG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkge1xuICAgICAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSAgICAgIFxuICAgIH1cbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTsgXG4gICAgVF9BUlJBWVMucHVzaChyYW5nZUEpOyBcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICAvLyBDYWxjdWxhdGVzIHdoaWNoIFZvcm5vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cbiAgLy8gSXQgaXMgYXNzdW1lZCB0aGF0IGJvdGggdGhlIGxpbmUgYW5kIHRoZSBwb2ludCBhcmUgcmVsYXRpdmUgdG8gYCgwLDApYFxuICAvL1xuICAvLyAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxuICAvLyAgICAgKC0xKSAgW1NdLS0tLS0tLS0tLS0tLS1bRV0gICgxKVxuICAvLyAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxuICAvKipcbiAgICogQHBhcmFtIHtWZWN0b3J9IGxpbmUgVGhlIGxpbmUgc2VnbWVudC5cbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludC5cbiAgICogQHJldHVybiAge251bWJlcn0gTEVGVF9WT1JOT0lfUkVHSU9OICgtMSkgaWYgaXQgaXMgdGhlIGxlZnQgcmVnaW9uLCBcbiAgICogICAgICAgICAgTUlERExFX1ZPUk5PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLCBcbiAgICogICAgICAgICAgUklHSFRfVk9STk9JX1JFR0lPTiAoMSkgaWYgaXQgaXMgdGhlIHJpZ2h0IHJlZ2lvbi5cbiAgICovXG4gIGZ1bmN0aW9uIHZvcm5vaVJlZ2lvbihsaW5lLCBwb2ludCkge1xuICAgIHZhciBsZW4yID0gbGluZS5sZW4yKCk7XG4gICAgdmFyIGRwID0gcG9pbnQuZG90KGxpbmUpO1xuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIHN0YXJ0IG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGVcbiAgICAvLyBsZWZ0IHZvcm5vaSByZWdpb24uXG4gICAgaWYgKGRwIDwgMCkgeyByZXR1cm4gTEVGVF9WT1JOT0lfUkVHSU9OOyB9XG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGVcbiAgICAvLyByaWdodCB2b3Jub2kgcmVnaW9uLlxuICAgIGVsc2UgaWYgKGRwID4gbGVuMikgeyByZXR1cm4gUklHSFRfVk9STk9JX1JFR0lPTjsgfVxuICAgIC8vIE90aGVyd2lzZSwgaXQncyBpbiB0aGUgbWlkZGxlIG9uZS5cbiAgICBlbHNlIHsgcmV0dXJuIE1JRERMRV9WT1JOT0lfUkVHSU9OOyB9XG4gIH1cbiAgLy8gQ29uc3RhbnRzIGZvciBWb3Jub2kgcmVnaW9uc1xuICAvKipcbiAgICogQGNvbnN0XG4gICAqL1xuICB2YXIgTEVGVF9WT1JOT0lfUkVHSU9OID0gLTE7XG4gIC8qKlxuICAgKiBAY29uc3RcbiAgICovXG4gIHZhciBNSURETEVfVk9STk9JX1JFR0lPTiA9IDA7XG4gIC8qKlxuICAgKiBAY29uc3RcbiAgICovXG4gIHZhciBSSUdIVF9WT1JOT0lfUkVHSU9OID0gMTtcbiAgXG4gIC8vICMjIENvbGxpc2lvbiBUZXN0c1xuXG4gIC8vIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYSBUaGUgZmlyc3QgY2lyY2xlLlxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcbiAgICogICB0aGUgY2lyY2xlcyBpbnRlcnNlY3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LiBcbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVDaXJjbGUoYSwgYiwgcmVzcG9uc2UpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvXG4gICAgLy8gY2lyY2xlcyBpcyBncmVhdGVyIHRoYW4gdGhlaXIgY29tYmluZWQgcmFkaXVzLlxuICAgIHZhciBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGJbJ3BvcyddKS5zdWIoYVsncG9zJ10pO1xuICAgIHZhciB0b3RhbFJhZGl1cyA9IGFbJ3InXSArIGJbJ3InXTtcbiAgICB2YXIgdG90YWxSYWRpdXNTcSA9IHRvdGFsUmFkaXVzICogdG90YWxSYWRpdXM7XG4gICAgdmFyIGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxuICAgIGlmIChkaXN0YW5jZVNxID4gdG90YWxSYWRpdXNTcSkge1xuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHsgXG4gICAgICB2YXIgZGlzdCA9IE1hdGguc3FydChkaXN0YW5jZVNxKTtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBhO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGI7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcCddID0gdG90YWxSYWRpdXMgLSBkaXN0O1xuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBOJ10uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5jb3B5KGRpZmZlcmVuY2VWKS5zY2FsZShyZXNwb25zZVsnb3ZlcmxhcCddKTtcbiAgICAgIHJlc3BvbnNlWydhSW5CJ109IGFbJ3InXSA8PSBiWydyJ10gJiYgZGlzdCA8PSBiWydyJ10gLSBhWydyJ107XG4gICAgICByZXNwb25zZVsnYkluQSddID0gYlsnciddIDw9IGFbJ3InXSAmJiBkaXN0IDw9IGFbJ3InXSAtIGJbJ3InXTtcbiAgICB9XG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFNBVFsndGVzdENpcmNsZUNpcmNsZSddID0gdGVzdENpcmNsZUNpcmNsZTtcbiAgXG4gIC8vIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZlxuICAgKiAgIHRoZXkgaW50ZXJzZXQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhleSBpbnRlcnNlY3QsIGZhbHNlIGlmIHRoZXkgZG9uJ3QuXG4gICAqL1xuICBmdW5jdGlvbiB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKSB7XG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxuICAgIHZhciBjaXJjbGVQb3MgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShjaXJjbGVbJ3BvcyddKS5zdWIocG9seWdvblsncG9zJ10pO1xuICAgIHZhciByYWRpdXMgPSBjaXJjbGVbJ3InXTtcbiAgICB2YXIgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcbiAgICB2YXIgcG9pbnRzID0gcG9seWdvblsncG9pbnRzJ107XG4gICAgdmFyIGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgdmFyIGVkZ2UgPSBUX1ZFQ1RPUlMucG9wKCk7XG4gICAgdmFyIHBvaW50ID0gVF9WRUNUT1JTLnBvcCgpO1xuICAgIFxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xuICAgICAgdmFyIHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xuICAgICAgdmFyIG92ZXJsYXAgPSAwO1xuICAgICAgdmFyIG92ZXJsYXBOID0gbnVsbDtcbiAgICAgIFxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxuICAgICAgZWRnZS5jb3B5KHBvbHlnb25bJ2VkZ2VzJ11baV0pO1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXG4gICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tpXSk7XG4gICAgICBcbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50XG4gICAgICAvLyBpcyBiaWdnZXIgdGhhbiB0aGUgcmFkaXVzLCB0aGUgcG9seWdvbiBpcyBkZWZpbml0ZWx5IG5vdCBmdWxseSBpblxuICAgICAgLy8gdGhlIGNpcmNsZS5cbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSB7XG4gICAgICAgIHJlc3BvbnNlWydhSW5CJ10gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIFZvcm5vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxuICAgICAgdmFyIHJlZ2lvbiA9IHZvcm5vaVJlZ2lvbihlZGdlLCBwb2ludCk7XG4gICAgICAvLyBJZiBpdCdzIHRoZSBsZWZ0IHJlZ2lvbjpcbiAgICAgIGlmIChyZWdpb24gPT09IExFRlRfVk9STk9JX1JFR0lPTikgeyBcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk5PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW3ByZXZdKTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcbiAgICAgICAgdmFyIHBvaW50MiA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XG4gICAgICAgIHJlZ2lvbiA9IHZvcm5vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JOT0lfUkVHSU9OKSB7XG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxuICAgICAgICAgIHZhciBkaXN0ID0gcG9pbnQubGVuKCk7XG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTsgXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTsgXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcbiAgICAgIC8vIElmIGl0J3MgdGhlIHJpZ2h0IHJlZ2lvbjpcbiAgICAgIH0gZWxzZSBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JOT0lfUkVHSU9OKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBsZWZ0IHJlZ2lvbiBvbiB0aGUgbmV4dCBlZGdlXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uWydlZGdlcyddW25leHRdKTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cbiAgICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbbmV4dF0pO1xuICAgICAgICByZWdpb24gPSB2b3Jub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk5PSV9SRUdJT04pIHtcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXG4gICAgICAgICAgdmFyIGRpc3QgPSBwb2ludC5sZW4oKTtcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpOyBcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpOyBcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICAgIFxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5lZWQgdG8gY2hlY2sgaWYgdGhlIGNpcmNsZSBpcyBpbnRlcnNlY3RpbmcgdGhlIGVkZ2UsXG4gICAgICAgIC8vIENoYW5nZSB0aGUgZWRnZSBpbnRvIGl0cyBcImVkZ2Ugbm9ybWFsXCIuXG4gICAgICAgIHZhciBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcbiAgICAgICAgLy8gRmluZCB0aGUgcGVycGVuZGljdWxhciBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIFxuICAgICAgICAvLyBjaXJjbGUgYW5kIHRoZSBlZGdlLlxuICAgICAgICB2YXIgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xuICAgICAgICB2YXIgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXG4gICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0QWJzID4gcmFkaXVzKSB7XG4gICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTsgXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gobm9ybWFsKTsgXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICBvdmVybGFwTiA9IG5vcm1hbDtcbiAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlXG4gICAgICAgICAgLy8gY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlLCB0aGUgY2lyY2xlIGlzIG5vdCBmdWxseSBpbnNpZGUgdGhlIHBvbHlnb24uXG4gICAgICAgICAgaWYgKGRpc3QgPj0gMCB8fCBvdmVybGFwIDwgMiAqIHJhZGl1cykge1xuICAgICAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuIFxuICAgICAgLy8gKG92ZXJsYXBOIG1heSBiZSBudWxsIGlmIHRoZSBjaXJjbGUgd2FzIGluIHRoZSB3cm9uZyBWb3Jub2kgcmVnaW9uKS5cbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlWydvdmVybGFwJ10pKSB7XG4gICAgICAgIHJlc3BvbnNlWydvdmVybGFwJ10gPSBvdmVybGFwO1xuICAgICAgICByZXNwb25zZVsnb3ZlcmxhcE4nXS5jb3B5KG92ZXJsYXBOKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgcmVzcG9uc2VbJ2EnXSA9IHBvbHlnb247XG4gICAgICByZXNwb25zZVsnYiddID0gY2lyY2xlO1xuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShyZXNwb25zZVsnb3ZlcmxhcE4nXSkuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XG4gICAgfVxuICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7IFxuICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpOyBcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgU0FUWyd0ZXN0UG9seWdvbkNpcmNsZSddID0gdGVzdFBvbHlnb25DaXJjbGU7XG4gIFxuICAvLyBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXG4gIC8vXG4gIC8vICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0XG4gIC8vIHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZyBhdCB0aGUgZW5kLlxuICAvKipcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmXG4gICAqICAgdGhleSBpbnRlcnNldC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCwgZmFsc2UgaWYgdGhleSBkb24ndC5cbiAgICovXG4gIGZ1bmN0aW9uIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZSwgcG9seWdvbiwgcmVzcG9uc2UpIHtcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cbiAgICB2YXIgcmVzdWx0ID0gdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSByZXNwb25zZS5cbiAgICAgIHZhciBhID0gcmVzcG9uc2VbJ2EnXTtcbiAgICAgIHZhciBhSW5CID0gcmVzcG9uc2VbJ2FJbkInXTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwTiddLnJldmVyc2UoKTtcbiAgICAgIHJlc3BvbnNlWydvdmVybGFwViddLnJldmVyc2UoKTtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSByZXNwb25zZVsnYiddO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGE7XG4gICAgICByZXNwb25zZVsnYUluQiddID0gcmVzcG9uc2VbJ2JJbkEnXTtcbiAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBhSW5CO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFNBVFsndGVzdENpcmNsZVBvbHlnb24nXSA9IHRlc3RDaXJjbGVQb2x5Z29uO1xuICBcbiAgLy8gQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYSBUaGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWZcbiAgICogICB0aGV5IGludGVyc2V0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0LCBmYWxzZSBpZiB0aGV5IGRvbid0LlxuICAgKi9cbiAgZnVuY3Rpb24gdGVzdFBvbHlnb25Qb2x5Z29uKGEsIGIsIHJlc3BvbnNlKSB7XG4gICAgdmFyIGFQb2ludHMgPSBhWydwb2ludHMnXTtcbiAgICB2YXIgYUxlbiA9IGFQb2ludHMubGVuZ3RoO1xuICAgIHZhciBiUG9pbnRzID0gYlsncG9pbnRzJ107XG4gICAgdmFyIGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcbiAgICAgIGlmIChpc1NlcGFyYXRpbmdBeGlzKGFbJ3BvcyddLCBiWydwb3MnXSwgYVBvaW50cywgYlBvaW50cywgYVsnbm9ybWFscyddW2ldLCByZXNwb25zZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBCIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yICh2YXIgaSA9IDA7aSA8IGJMZW47IGkrKykge1xuICAgICAgaWYgKGlzU2VwYXJhdGluZ0F4aXMoYVsncG9zJ10sIGJbJ3BvcyddLCBhUG9pbnRzLCBiUG9pbnRzLCBiWydub3JtYWxzJ11baV0sIHJlc3BvbnNlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNpbmNlIG5vbmUgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIG9yIEIgYXJlIGEgc2VwYXJhdGluZyBheGlzLCB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cbiAgICAvLyBhbmQgd2UndmUgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZSBzbWFsbGVzdCBvdmVybGFwIChpbiBpc1NlcGFyYXRpbmdBeGlzKS4gIENhbGN1bGF0ZSB0aGVcbiAgICAvLyBmaW5hbCBvdmVybGFwIHZlY3Rvci5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlWydhJ10gPSBhO1xuICAgICAgcmVzcG9uc2VbJ2InXSA9IGI7XG4gICAgICByZXNwb25zZVsnb3ZlcmxhcFYnXS5jb3B5KHJlc3BvbnNlWydvdmVybGFwTiddKS5zY2FsZShyZXNwb25zZVsnb3ZlcmxhcCddKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgU0FUWyd0ZXN0UG9seWdvblBvbHlnb24nXSA9IHRlc3RQb2x5Z29uUG9seWdvbjtcblxuICByZXR1cm4gU0FUO1xufSkpOyIsIi8qXG4gICAgVGhlIGdyYXBoaWNzIGNvbXBvbmVudCBvZiBHYW1lRW5naW5lLlxuKi9cbnZhciBHYW1lR3JhcGhpY3MgPSBmdW5jdGlvbihnRW5naW5lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNBbmltYXRpbmc6IGZhbHNlLFxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBAcGFyYW0obnVtYmVyKSB0aW1lU3RlcCBUaGUgd2FpdCB0aW1lIGJldHdlZW4gcnVubmluZyB0aGUgYWN0aW9uIChpbiBtcykuXG4gICAgICAgICAgICBAcGFyYW0obnVtYmVyKSBudW1UaW1lcyBUaGUgbnVtYmVyIHRvIHRpbWVzIHRvIHJ1biB0aGUgYWN0aW9uLlxuICAgICAgICAgICAgQHBhcmFtKGZ1bmN0aW9uKSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgICovXG4gICAgICAgIHJlcGVhdEFjdGlvbjogZnVuY3Rpb24odGltZVN0ZXAsIG51bVRpbWVzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHZhciBudW0gPSAwLFxuICAgICAgICAgICAgICAgIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHZhciB0aGVBbmltYXRpb24gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihudW0rKyA+IG51bVRpbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhlQW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aW1lU3RlcCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb25MaW5rZXIuanNcIiAvPlxuXG4vKlxuICAgIEEgZ2VuZXJpYyB2aWV3IGludGVyZmFjZS5cbiovXG5mdW5jdGlvbiBHYW1lVmlldyhnRW5naW5lKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHtcbiAgICAgICAgYmdDb2xvcjogXCIjY2NjXCJcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkdhbWVWaWV3LnByb3RvdHlwZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5wcml2YXRlcy5iZ0NvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbHMgZ2FtZSwgY2FudmFzLCBjdHgsIEtleUNvZGUgKi9cbi8qXG4gKiAgSW1wbGVtZW50cyBHYW1lVmlldy5cbiAqL1xuZnVuY3Rpb24gVGl0bGVWaWV3KHRpdGxlKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHtcbiAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5UaXRsZVZpZXcucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuICAgIGxldCB0aXRsZSxcbiAgICAgICAgY3RhID0gJ1ByZXNzIEVudGVyJ1xuICAgIDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aXRsZSA9IHRoaXMucHJpdmF0ZXMudGl0bGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuRU5URVIpIHtcbiAgICAgICAgICAgICAgICBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID0gS2V5Q29kZS5FTVBUWTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVuZGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gJzM2cHggQXJpYWwnO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aXRsZSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aXRsZSkud2lkdGggLyAyLCAxMDApO1xuXG4gICAgICAgICAgICBjdHguZm9udCA9ICcyNHB4IEFyaWFsJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChjdGEsIGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQoY3RhKS53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb25MaW5rZXIuanNcIiAvPlxuXG5mdW5jdGlvbiBHYW1lU2F2ZVZpZXcoKSB7XG4gICAgdGhpcy5wcml2YXRlcyA9IHt9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkdhbWVTYXZlVmlldy5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQsXG4gICAgICAgIHRpdGxlID0gXCJTZWxlY3QgYSBzYXZlIHNsb3RcIixcbiAgICAgICAgY3RhID0gXCJQcmVzcyBEZWxldGUgdG8gZXJhc2UgYSBzYXZlXCIsXG4gICAgICAgIHN0b3JhZ2UgPSBuZXcgR2FtZVNhdmUoKSxcbiAgICAgICAgbGlzdCA9IHN0b3JhZ2UuZ2V0TGlzdCgpLFxuICAgICAgICBhcnJvd1xuICAgIDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgYXJyb3cgPSB7XG4gICAgICAgICAgICAgICAgaW1nOiBcIj4+XCIsXG4gICAgICAgICAgICAgICAgc2xvdDogMCxcbiAgICAgICAgICAgICAgICB4OiBjYW52YXMud2lkdGggLyAyIC0gY3R4Lm1lYXN1cmVUZXh0KGxpc3RbMF0pLndpZHRoIC8gMiAtIDYwLCAgICAvLyBUT0RPOiBtYWtlIGluc3RhbmNlIHZhcj8/XG4gICAgICAgICAgICAgICAgeTogMjAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkVTQykge1xuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQubGFzdEtleURvd24gPSBLZXlDb2RlLkVNUFRZO1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soS2V5Q29kZS5FU0MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLkVOVEVSKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBkYXRlLmdldERheSgpO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gZGF0ZS5nZXRZZWFyKCk7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSBkYXRlLnRvTG9jYWxlVGltZVN0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5zYXZlKGFycm93LnNsb3QsIG0gKyAnLycgKyBkICsgJy8nICsgeSArICcgJyArIHQpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJpdmF0ZXMuY2FsbGJhY2soS2V5Q29kZS5FTlRFUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGdhbWUuaW5wdXQubGFzdEtleURvd24gPT09IEtleUNvZGUuREVMRVRFKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93bnAgPSBLZXlDb2RlLkVNUFRZO1xuXG4gICAgICAgICAgICAgICAgbGlzdCA9IHN0b3JhZ2UuZXJhc2UoYXJyb3cuc2xvdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFycm93LnNsb3QgIT09IDIgJiYgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9PT0gS2V5Q29kZS5ET1dOKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICArK2Fycm93LnNsb3Q7XG4gICAgICAgICAgICAgICAgYXJyb3cueCA9IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQobGlzdFthcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XG4gICAgICAgICAgICAgICAgYXJyb3cueSArPSA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJyb3cuc2xvdCAhPT0gMCAmJiBnYW1lLmlucHV0Lmxhc3RLZXlEb3duID09PSBLZXlDb2RlLlVQKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5pbnB1dC5sYXN0S2V5RG93biA9IEtleUNvZGUuRU1QVFk7XG5cbiAgICAgICAgICAgICAgICAtLWFycm93LnNsb3Q7XG4gICAgICAgICAgICAgICAgYXJyb3cueCA9IGNhbnZhcy53aWR0aCAvIDIgLSBjdHgubWVhc3VyZVRleHQobGlzdFthcnJvdy5zbG90XSkud2lkdGggLyAyIC0gNjA7XG4gICAgICAgICAgICAgICAgYXJyb3cueSAtPSA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzExMVwiO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gXCIzNnB4IEFyaWFsXCJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aXRsZSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dCh0aXRsZSkud2lkdGggLyAyLCA4MCk7XG5cbiAgICAgICAgICAgIGN0eC5mb250ID0gXCIyNHB4IEFyaWFsXCJcblxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQobGlzdFtpXSwgY2FudmFzLndpZHRoIC8gMiAtIGN0eC5tZWFzdXJlVGV4dChsaXN0W2ldKS53aWR0aCAvIDIsIDIwMCArIGkgKiA4MCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChhcnJvdy5pbWcsIGFycm93LngsIGFycm93LnkpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2xpbmtlci5qc1wiIC8+XG5cbmZ1bmN0aW9uIExldmVsVmlldyhwbGF5ZXIsIGN1ckx2bCkge1xuICAgIHRoaXMucHJpdmF0ZXMgPSB7fTtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICB0aGlzLmN1ckx2bCA9IGN1ckx2bDtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5MZXZlbFZpZXcucHJvdG90eXBlID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aGF0LFxuICAgICAgICBvblVwZGF0ZVNldCA9IGZhbHNlLFxuICAgICAgICBvblJlbmRlclNldCA9IGZhbHNlXG4gICAgO1xuXG5cbiAgICBmdW5jdGlvbiBjaGVja0NvbGxpc2lvbigpIHtcbiAgICAgICAgaWYodGhhdC5wbGF5ZXIuaW52aW5jaWJsZSkge1xuICAgICAgICAgICAgaWYodGhhdC5wbGF5ZXIuaW52aW5jaWJsZVRpbWVyLS0gPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXllci5pbnZpbmNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5ZXIuaW52aW5jaWJsZVRpbWVyID0gMTIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhhdC5jdXJMdmwucHJvamVjdGlsZXMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgdmFyIGNvbGxpZGVkID0gU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGF0LnBsYXllciwgdGhhdC5jdXJMdmwucHJvamVjdGlsZXNbaV0pO1xuICAgICAgICAgICAgaWYoY29sbGlkZWQpIHtcbiAgICAgICAgICAgICAgICAtLXRoYXQucGxheWVyLmhwO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheWVyLmludmluY2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAgICAgICB0aGlzLnByaXZhdGVzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoYXQgPSB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmN1ckx2bC51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAvL2lmKG9uVXBkYXRlU2V0KVxuICAgICAgICAgICAgLy8gICAgdGhpcy5vblVwZGF0ZSgpO1xuXG4gICAgICAgICAgICBjaGVja0NvbGxpc2lvbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgb25VcGRhdGVTZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZSA9IGNhbGxiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdXJMdmwucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5yZW5kZXIoKTtcblxuICAgICAgICAgICAgLy9pZihvblJlbmRlclNldClcbiAgICAgICAgICAgIC8vICAgIHRoaXMub25SZW5kZXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlbmRlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uUmVuZGVyU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXIgPSBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgIH07XG59KSgpOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9saW5rZXIuanNcIiAvPlxuXG5mdW5jdGlvbiBMZXZlbDEoKSB7XG4gICAgXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkxldmVsMS5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2plY3RpbGVzOiBbXSxcblxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDEwOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvamVjdGlsZSA9IG5ldyBTQVQuQm94KG5ldyBTQVQuVmVjdG9yKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoKSArIDApLCAgICAgIC8vIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAwIGFuZCBjYW52YXMud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodFxuICAgICAgICAgICAgICAgICksIDEwLCAyMCkudG9Qb2x5Z29uKCk7XG5cbiAgICAgICAgICAgICAgICBwcm9qZWN0aWxlLnNwZWVkID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwKSArIDMpICogMC4xO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlcy5wdXNoKHByb2plY3RpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RpbGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlc1tpXS5wb3MueSAtPSB0aGlzLnByb2plY3RpbGVzW2ldLnNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gcHJvamVjdGlsZXNcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwic2lsdmVyXCI7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0aWxlcy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucHJvamVjdGlsZXNbaV0ucG9zLngsIHRoaXMucHJvamVjdGlsZXNbaV0ucG9zLnksIDEwLCAyMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwibGlua2VyLmpzXCIgLz5cblxuZnVuY3Rpb24gVmFtcCgpIHtcbiAgICB0aGlzLmluaXQoKTtcbn1cblxuVmFtcC5wcm90b3R5cGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpLFxuICAgICAgICBpbWdSZWFkeSA9IGZhbHNlXG4gICAgO1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaW1nUmVhZHkgPSB0cnVlO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IFwiaW1nL3ZhbXAucG5nXCI7XG5cbiAgICB2YXIgc3BlZWQgPSA0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdzogNDAsXG4gICAgICAgIGg6IDQwLFxuICAgICAgICBocDogMyxcbiAgICAgICAgaW52aW5jaWJsZTogZmFsc2UsXG4gICAgICAgIGludmluY2libGVUaW1lcjogMTIwLFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkLmV4dGVuZCh0aGlzLCBuZXcgU0FULkJveChuZXcgU0FULlZlY3RvcigwLCAwKSwgdGhpcy53LCB0aGlzLmgpLnRvUG9seWdvbigpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaG9yaXpvbnRhbFxuICAgICAgICAgICAgaWYoZ2FtZS5pbnB1dC5rZXlzRG93bltLZXlDb2RlLlJJR0hUXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCArPSBzcGVlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZ2FtZS5pbnB1dC5rZXlzRG93bltLZXlDb2RlLkxFRlRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3MueCAtPSBzcGVlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdmVydGljYWxcbiAgICAgICAgICAgIGlmKGdhbWUuaW5wdXQua2V5c0Rvd25bS2V5Q29kZS5VUF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy55IC09IHNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihnYW1lLmlucHV0LmtleXNEb3duW0tleUNvZGUuRE9XTl0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcy55ICs9IHNwZWVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIllvdSBkaWVkXCIpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBib2R5XG4gICAgICAgICAgICB2YXIgZG9EcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKHRoaXMuaW52aW5jaWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5pbnZpbmNpYmxlVGltZXIgJSAzMDtcbiAgICAgICAgICAgICAgICBpZih0ID49IDAgJiYgdCA8IDE1KVxuICAgICAgICAgICAgICAgICAgICBkb0RyYXcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZG9EcmF3KSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMudywgdGhpcy5oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaGVhbHRoXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmhwOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCAtIDEwICsgaSoyMCwgdGhpcy5wb3MueSAtIDIwLCAyMCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWxzIGdhbWUsIEdhbWVFbmdpbmUsIFRpdGxlVmlldywgS2V5Q29kZSwgVmFtcCwgTGV2ZWwxLCBMZXZlbFZpZXcsIEdhbWVTYXZlVmlldyAqL1xuLypcbiAqICBUaGUgdmFtcCBnYW1lLlxuICogIERlY2xhcmVzIGdhbWUgYXMgYSBnbG9iYWwuXG4gKi9cbihmdW5jdGlvbiBNYWluKCkge1xuICAgIHdpbmRvdy5nYW1lID0gbmV3IEdhbWVFbmdpbmUoKTtcbiAgICBnYW1lLnN0YXJ0KCk7XG5cblxuICAgIGxldCB0aXRsZVZpZXcgPSBuZXcgVGl0bGVWaWV3KCdWYW1wOiBUaGUgR3JlYXQgYW5kIFBvd2VyZnVsJywgdHJ1ZSk7XG4gICAgdGl0bGVWaWV3LnRoZW4oKCkgPT4ge1xuICAgICAgICBnYW1lLnV0aWxzLnN3aXRjaFZpZXcoc2F2ZVZpZXcpO1xuICAgIH0pO1xuXG4gICAgbGV0IHNhdmVWaWV3ID0gbmV3IEdhbWVTYXZlVmlldygpO1xuICAgIHNhdmVWaWV3LnRoZW4oa2V5ID0+IHtcbiAgICAgICAgaWYoa2V5ID09PSBLZXlDb2RlLkVTQykge1xuICAgICAgICAgICAgZ2FtZS51dGlscy5zd2l0Y2hWaWV3KHRpdGxlVmlldyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihrZXkgPT09IEtleUNvZGUuRU5URVIpIHtcbiAgICAgICAgICAgIGdhbWUudXRpbHMuc3dpdGNoVmlldyhsdmxWaWV3KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IHZhbXAgPSBuZXcgVmFtcCgpO1xuICAgIGxldCBsdmwxID0gbmV3IExldmVsMSgpO1xuICAgIGxldCBsdmxWaWV3ID0gbmV3IExldmVsVmlldyh2YW1wLCBsdmwxKTtcblxuICAgIGdhbWUudmlldyA9IHRpdGxlVmlldztcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
