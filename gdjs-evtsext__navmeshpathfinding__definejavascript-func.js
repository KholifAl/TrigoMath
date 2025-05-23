
if (typeof gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript !== "undefined") {
  gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript = {};


gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript.userFunc0xf2f620 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
// This code has been built from https://github.com/D8H/NavMesh-GDevelop-Extension
// If you need to make any modification, please open a PR on github.

if (gdjs.__NavMeshPathfinding) {
    return;
}

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Stripped down version of Phaser's Vector2 with just the functionality needed for navmeshes.
 *
 * @export
 * @class Vector2
 */
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.equals = function (v) {
        return this.x === v.x && this.y === v.y;
    };
    Vector2.prototype.angle = function (v) {
        return Math.atan2(v.y - this.y, v.x - this.x);
    };
    Vector2.prototype.distance = function (v) {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Vector2.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
    };
    Vector2.prototype.subtract = function (v) {
        this.x -= v.x;
        this.y -= v.y;
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    return Vector2;
}());

var GridNode = /** @class */ (function () {
    function GridNode(weight) {
        this.h = 0;
        this.g = 0;
        this.f = 0;
        this.closed = false;
        this.visited = false;
        this.parent = null;
        this.weight = weight;
    }
    GridNode.prototype.isWall = function () {
        return this.weight === 0;
    };
    GridNode.prototype.clean = function () {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.visited = false;
        this.closed = false;
        this.parent = null;
    };
    return GridNode;
}());

/**
 * A class that represents a navigable polygon with a navmesh. It is built on top of a
 * {@link Polygon}. It implements the properties and fields that javascript-astar needs - weight,
 * toString, isWall and getCost. See GPS test from astar repo for structure:
 * https://github.com/bgrins/javascript-astar/blob/master/test/tests.js
 */
var NavPoly = /** @class */ (function (_super) {
    __extends(NavPoly, _super);
    /**
     * Creates an instance of NavPoly.
     */
    function NavPoly(id, polygon) {
        var _this = _super.call(this, 1) || this;
        _this.id = id;
        _this.polygon = polygon;
        _this.edges = polygon.edges;
        _this.neighbors = [];
        _this.portals = [];
        _this.centroid = _this.calculateCentroid();
        _this.boundingRadius = _this.calculateRadius();
        return _this;
    }
    /**
     * Returns an array of points that form the polygon.
     */
    NavPoly.prototype.getPoints = function () {
        return this.polygon.points;
    };
    /**
     * Check if the given point-like object is within the polygon.
     */
    NavPoly.prototype.contains = function (point) {
        // Phaser's polygon check doesn't handle when a point is on one of the edges of the line. Note:
        // check numerical stability here. It would also be good to optimize this for different shapes.
        return this.polygon.contains(point.x, point.y) || this.isPointOnEdge(point);
    };
    /**
     * Only rectangles are supported, so this calculation works, but this is not actually the centroid
     * calculation for a polygon. This is just the average of the vertices - proper centroid of a
     * polygon factors in the area.
     */
    NavPoly.prototype.calculateCentroid = function () {
        var centroid = new Vector2(0, 0);
        var length = this.polygon.points.length;
        this.polygon.points.forEach(function (p) { return centroid.add(p); });
        centroid.x /= length;
        centroid.y /= length;
        return centroid;
    };
    /**
     * Calculate the radius of a circle that circumscribes the polygon.
     */
    NavPoly.prototype.calculateRadius = function () {
        var boundingRadius = 0;
        for (var _i = 0, _a = this.polygon.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var d = this.centroid.distance(point);
            if (d > boundingRadius)
                boundingRadius = d;
        }
        return boundingRadius;
    };
    /**
     * Check if the given point-like object is on one of the edges of the polygon.
     */
    NavPoly.prototype.isPointOnEdge = function (_a) {
        var x = _a.x, y = _a.y;
        for (var _i = 0, _b = this.edges; _i < _b.length; _i++) {
            var edge = _b[_i];
            if (edge.pointOnSegment(x, y))
                return true;
        }
        return false;
    };
    NavPoly.prototype.destroy = function () {
        this.neighbors = [];
        this.portals = [];
    };
    // === jsastar methods ===
    NavPoly.prototype.toString = function () {
        return "NavPoly(id: " + this.id + " at: " + this.centroid + ")";
    };
    NavPoly.prototype.isWall = function () {
        return false;
    };
    NavPoly.prototype.centroidDistance = function (navPolygon) {
        return this.centroid.distance(navPolygon.centroid);
    };
    NavPoly.prototype.getCost = function (navPolygon) {
        //TODO the cost method should not be in the Node
        return this.centroidDistance(navPolygon);
    };
    return NavPoly;
}(GridNode));

/**
 * A graph memory structure
 */
var Graph = /** @class */ (function () {
    /**
     * A graph memory structure
     * @param {Array} gridIn 2D array of input weights
     * @param {Object} [options]
     * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
     */
    function Graph(nodes, options) {
        this.dirtyNodes = [];
        options = options || {};
        this.nodes = nodes;
        this.diagonal = !!options.diagonal;
        this.init();
    }
    Graph.prototype.init = function () {
        this.dirtyNodes = [];
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clean();
        }
    };
    Graph.prototype.cleanDirty = function () {
        for (var i = 0; i < this.dirtyNodes.length; i++) {
            this.dirtyNodes[i].clean();
        }
        this.dirtyNodes = [];
    };
    Graph.prototype.markDirty = function (node) {
        this.dirtyNodes.push(node);
    };
    return Graph;
}());

/**
 * Graph for javascript-astar. It implements the functionality for astar. See GPS test from astar
 * repo for structure: https://github.com/bgrins/javascript-astar/blob/master/test/tests.js
 *
 * @class NavGraph
 * @private
 */
var NavGraph = /** @class */ (function (_super) {
    __extends(NavGraph, _super);
    function NavGraph(navPolygons) {
        var _this = _super.call(this, navPolygons) || this;
        _this.nodes = navPolygons;
        _this.init();
        return _this;
    }
    NavGraph.prototype.neighbors = function (navPolygon) {
        return navPolygon.neighbors;
    };
    NavGraph.prototype.navHeuristic = function (navPolygon1, navPolygon2) {
        return navPolygon1.centroidDistance(navPolygon2);
    };
    NavGraph.prototype.destroy = function () {
        this.cleanDirty();
        this.nodes = [];
    };
    return NavGraph;
}(Graph));

/**
 * Calculate the distance squared between two points. This is an optimization to a square root when
 * you just need to compare relative distances without needing to know the specific distance.
 * @param a
 * @param b
 */
function distanceSquared(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return dx * dx + dy * dy;
}
/**
 * Project a point onto a line segment.
 * JS Source: http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
 * @param point
 * @param line
 */
function projectPointToEdge(point, line) {
    var a = line.start;
    var b = line.end;
    // Consider the parametric equation for the edge's line, p = a + t (b - a). We want to find
    // where our point lies on the line by solving for t:
    //  t = [(p-a) . (b-a)] / |b-a|^2
    var l2 = distanceSquared(a, b);
    var t = ((point.x - a.x) * (b.x - a.x) + (point.y - a.y) * (b.y - a.y)) / l2;
    // We clamp t from [0,1] to handle points outside the segment vw.
    t = clamp(t, 0, 1);
    // Project onto the segment
    var p = new Vector2(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y));
    return p;
}
/**
 * Twice the area of the triangle formed by a, b and c.
 */
function triarea2(a, b, c) {
    var ax = b.x - a.x;
    var ay = b.y - a.y;
    var bx = c.x - a.x;
    var by = c.y - a.y;
    return bx * ay - ax * by;
}
/**
 * Clamp the given value between min and max.
 */
function clamp(value, min, max) {
    if (value < min)
        value = min;
    if (value > max)
        value = max;
    return value;
}
/**
 * Check if two values are within a small margin of one another.
 */
function almostEqual(value1, value2, errorMargin) {
    if (errorMargin === void 0) { errorMargin = 0.0001; }
    if (Math.abs(value1 - value2) <= errorMargin)
        return true;
    else
        return false;
}
/**
 * Find the smallest angle difference between two angles
 * https://gist.github.com/Aaronduino/4068b058f8dbc34b4d3a9eedc8b2cbe0
 */
function angleDifference(x, y) {
    var a = x - y;
    var i = a + Math.PI;
    var j = Math.PI * 2;
    a = i - Math.floor(i / j) * j; // (a+180) % 360; this ensures the correct sign
    a -= Math.PI;
    return a;
}
/**
 * Check if two lines are collinear (within a small error margin).
 */
function areCollinear(line1, line2, errorMargin) {
    if (errorMargin === void 0) { errorMargin = 0.0001; }
    // Figure out if the two lines are equal by looking at the area of the triangle formed
    // by their points
    var area1 = triarea2(line1.start, line1.end, line2.start);
    var area2 = triarea2(line1.start, line1.end, line2.end);
    if (almostEqual(area1, 0, errorMargin) && almostEqual(area2, 0, errorMargin)) {
        return true;
    }
    else
        return false;
}

// Mostly sourced from PatrolJS at the moment. TODO: come back and reimplement this as an incomplete
/**
 * @private
 */
var Channel = /** @class */ (function () {
    function Channel() {
        this.portals = [];
        this.path = [];
    }
    Channel.prototype.push = function (p1, p2) {
        if (p2 === undefined)
            p2 = p1;
        this.portals.push({
            left: p1,
            right: p2,
        });
    };
    Channel.prototype.stringPull = function () {
        var portals = this.portals;
        var pts = [];
        // Init scan state
        var apexIndex = 0;
        var leftIndex = 0;
        var rightIndex = 0;
        var portalApex = portals[0].left;
        var portalLeft = portals[0].left;
        var portalRight = portals[0].right;
        // Add start point.
        pts.push(portalApex);
        for (var i = 1; i < portals.length; i++) {
            // Find the next portal vertices
            var left = portals[i].left;
            var right = portals[i].right;
            // Update right vertex.
            if (triarea2(portalApex, portalRight, right) <= 0.0) {
                if (portalApex.equals(portalRight) || triarea2(portalApex, portalLeft, right) > 0.0) {
                    // Tighten the funnel.
                    portalRight = right;
                    rightIndex = i;
                }
                else {
                    // Right vertex just crossed over the left vertex, so the left vertex should
                    // now be part of the path.
                    pts.push(portalLeft);
                    // Restart scan from portal left point.
                    // Make current left the new apex.
                    portalApex = portalLeft;
                    apexIndex = leftIndex;
                    // Reset portal
                    portalLeft = portalApex;
                    portalRight = portalApex;
                    leftIndex = apexIndex;
                    rightIndex = apexIndex;
                    // Restart scan
                    i = apexIndex;
                    continue;
                }
            }
            // Update left vertex.
            if (triarea2(portalApex, portalLeft, left) >= 0.0) {
                if (portalApex.equals(portalLeft) || triarea2(portalApex, portalRight, left) < 0.0) {
                    // Tighten the funnel.
                    portalLeft = left;
                    leftIndex = i;
                }
                else {
                    // Left vertex just crossed over the right vertex, so the right vertex should
                    // now be part of the path
                    pts.push(portalRight);
                    // Restart scan from portal right point.
                    // Make current right the new apex.
                    portalApex = portalRight;
                    apexIndex = rightIndex;
                    // Reset portal
                    portalLeft = portalApex;
                    portalRight = portalApex;
                    leftIndex = apexIndex;
                    rightIndex = apexIndex;
                    // Restart scan
                    i = apexIndex;
                    continue;
                }
            }
        }
        if (pts.length === 0 || !pts[pts.length - 1].equals(portals[portals.length - 1].left)) {
            // Append last point to path.
            pts.push(portals[portals.length - 1].left);
        }
        this.path = pts;
        return pts;
    };
    return Channel;
}());

/**
 * Stripped down version of Phaser's Line with just the functionality needed for navmeshes.
 *
 * @export
 * @class Line
 */
var Line = /** @class */ (function () {
    function Line(x1, y1, x2, y2) {
        this.start = new Vector2(x1, y1);
        this.end = new Vector2(x2, y2);
        this.left = Math.min(x1, x2);
        this.right = Math.max(x1, x2);
        this.top = Math.min(y1, y2);
        this.bottom = Math.max(y1, y2);
    }
    Line.prototype.pointOnSegment = function (x, y) {
        return (x >= this.left &&
            x <= this.right &&
            y >= this.top &&
            y <= this.bottom &&
            this.pointOnLine(x, y));
    };
    Line.prototype.pointOnLine = function (x, y) {
        // Compare slope of line start -> xy to line start -> line end
        return (x - this.left) * (this.bottom - this.top) === (this.right - this.left) * (y - this.top);
    };
    return Line;
}());

/**
 * Stripped down version of Phaser's Polygon with just the functionality needed for navmeshes.
 *
 * @export
 * @class Polygon
 */
var Polygon = /** @class */ (function () {
    function Polygon(points, closed) {
        if (closed === void 0) { closed = true; }
        this.isClosed = closed;
        this.points = points;
        this.edges = [];
        for (var i = 1; i < points.length; i++) {
            var p1 = points[i - 1];
            var p2 = points[i];
            this.edges.push(new Line(p1.x, p1.y, p2.x, p2.y));
        }
        if (this.isClosed) {
            var first = points[0];
            var last = points[points.length - 1];
            this.edges.push(new Line(first.x, first.y, last.x, last.y));
        }
    }
    Polygon.prototype.contains = function (x, y) {
        var inside = false;
        for (var i = -1, j = this.points.length - 1; ++i < this.points.length; j = i) {
            var ix = this.points[i].x;
            var iy = this.points[i].y;
            var jx = this.points[j].x;
            var jy = this.points[j].y;
            if (((iy <= y && y < jy) || (jy <= y && y < iy)) &&
                x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
                inside = !inside;
            }
        }
        return inside;
    };
    return Polygon;
}());

var BinaryHeap = /** @class */ (function () {
    function BinaryHeap(scoreFunction) {
        this.content = new Array();
        this.scoreFunction = scoreFunction;
    }
    BinaryHeap.prototype.push = function (element) {
        // Add the new element to the end of the array.
        this.content.push(element);
        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    };
    BinaryHeap.prototype.pop = function () {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        if (!end)
            return;
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    };
    BinaryHeap.prototype.remove = function (node) {
        var i = this.content.indexOf(node);
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        if (!end)
            return;
        if (i !== this.content.length - 1) {
            this.content[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            }
            else {
                this.bubbleUp(i);
            }
        }
    };
    BinaryHeap.prototype.size = function () {
        return this.content.length;
    };
    BinaryHeap.prototype.rescoreElement = function (node) {
        this.sinkDown(this.content.indexOf(node));
    };
    BinaryHeap.prototype.sinkDown = function (n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];
        // When at 0, an element can not sink any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1;
            var parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }
            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    };
    BinaryHeap.prototype.bubbleUp = function (n) {
        // Look up the target element and its score.
        var length = this.content.length;
        var element = this.content[n];
        var elemScore = this.scoreFunction(element);
        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1;
            var child1N = child2N - 1;
            // This is used to store the new position of the element, if any.
            var swap = null;
            var child1Score = 0;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N];
                var child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }
            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
            // Otherwise, we are done.
            else {
                break;
            }
        }
    };
    return BinaryHeap;
}());

// The following implementation of the A* algorithm is from:
var AStar = /** @class */ (function () {
    function AStar() {
    }
    /**
     * Perform an A* Search on a graph given a start and end node.
     * @param {Graph} graph
     * @param {GridNode} start
     * @param {GridNode} end
     * @param {Object} [options]
     * @param {bool} [options.closest] Specifies whether to return the
     path to the closest node if the target is unreachable.
    * @param {Function} [options.heuristic] Heuristic function (see
    *          astar.heuristics).
    */
    AStar.prototype.search = function (graph, start, end, 
    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    heuristic, closest) {
        if (closest === void 0) { closest = false; }
        graph.cleanDirty();
        var openHeap = this.getHeap();
        var closestNode = start; // set the start node to be the closest if required
        start.h = heuristic(start, end);
        graph.markDirty(start);
        openHeap.push(start);
        while (openHeap.size() > 0) {
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = openHeap.pop();
            // never happen
            if (!currentNode)
                return [];
            // End case -- result has been found, return the traced path.
            if (currentNode === end) {
                return this.pathTo(currentNode);
            }
            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true;
            // Find all neighbors for the current node.
            var neighbors = graph.neighbors(currentNode);
            for (var i = 0, il = neighbors.length; i < il; ++i) {
                var neighbor = neighbors[i];
                if (neighbor.closed || neighbor.isWall()) {
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }
                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                var gScore = currentNode.g + neighbor.getCost(currentNode);
                var beenVisited = neighbor.visited;
                if (!beenVisited || gScore < neighbor.g) {
                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor, end);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    graph.markDirty(neighbor);
                    if (closest) {
                        // If the neighbor is closer than the current closestNode or if it's equally close but has
                        // a cheaper path than the current closest node then it becomes the closest node
                        if (neighbor.h < closestNode.h ||
                            (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                            closestNode = neighbor;
                        }
                    }
                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }
        if (closest) {
            return this.pathTo(closestNode);
        }
        // No result was found - empty array signifies failure to find path.
        return [];
    };
    AStar.prototype.pathTo = function (node) {
        var curr = node;
        var path = new Array();
        while (curr.parent) {
            path.unshift(curr);
            curr = curr.parent;
        }
        return path;
    };
    AStar.prototype.getHeap = function () {
        return new BinaryHeap(function (node) {
            return node.f;
        });
    };
    return AStar;
}());

/**
 * The `NavMesh` class is the workhorse that represents a navigation mesh built from a series of
 * polygons. Once built, the mesh can be asked for a path from one point to another point. Some
 * internal terminology usage:
 * - neighbor: a polygon that shares part of an edge with another polygon
 * - portal: when two neighbor's have edges that overlap, the portal is the overlapping line segment
 * - channel: the path of polygons from starting point to end point
 * - pull the string: run the funnel algorithm on the channel so that the path hugs the edges of the
 *   channel. Equivalent to having a string snaking through a hallway and then pulling it taut.
 */
var NavMesh = /** @class */ (function () {
    /**
     * @param meshPolygonPoints Array where each element is an array of point-like objects that
     * defines a polygon.
     * @param meshShrinkAmount The amount (in pixels) that the navmesh has been shrunk around
     * obstacles (a.k.a the amount obstacles have been expanded).
     */
    function NavMesh(meshPolygonPoints, meshShrinkAmount) {
        if (meshShrinkAmount === void 0) { meshShrinkAmount = 0; }
        this.meshShrinkAmount = meshShrinkAmount;
        // Convert the PolyPoints[] into NavPoly instances.
        this.navPolygons = meshPolygonPoints.map(function (polyPoints, i) { return new NavPoly(i, new Polygon(polyPoints)); });
        this.calculateNeighbors();
        // Astar graph of connections between polygons
        this.graph = new NavGraph(this.navPolygons);
    }
    /**
     * Get the NavPolys that are in this navmesh.
     */
    NavMesh.prototype.getPolygons = function () {
        return this.navPolygons;
    };
    /**
     * Cleanup method to remove references.
     */
    NavMesh.prototype.destroy = function () {
        this.graph.destroy();
        for (var _i = 0, _a = this.navPolygons; _i < _a.length; _i++) {
            var poly = _a[_i];
            poly.destroy();
        }
        this.navPolygons = [];
    };
    /**
     * Find if the given point is within any of the polygons in the mesh.
     * @param point
     */
    NavMesh.prototype.isPointInMesh = function (point) {
        return this.navPolygons.some(function (navPoly) { return navPoly.contains(point); });
    };
    /**
     * Find the closest point in the mesh to the given point. If the point is already in the mesh,
     * this will give you that point. If the point is outside of the mesh, this will attempt to
     * project this point into the mesh (up to the given maxAllowableDist). This returns an object
     * with:
     * - distance - from the given point to the mesh
     * - polygon - the one the point is closest to, or null
     * - point - the point inside the mesh, or null
     * @param point
     * @param maxAllowableDist
     */
    NavMesh.prototype.findClosestMeshPoint = function (point, maxAllowableDist) {
        if (maxAllowableDist === void 0) { maxAllowableDist = Number.POSITIVE_INFINITY; }
        var minDistance = maxAllowableDist;
        var closestPoly = null;
        var pointOnClosestPoly = null;
        for (var _i = 0, _a = this.navPolygons; _i < _a.length; _i++) {
            var navPoly = _a[_i];
            // If we are inside a poly, we've got the closest.
            if (navPoly.contains(point)) {
                minDistance = 0;
                closestPoly = navPoly;
                pointOnClosestPoly = point;
                break;
            }
            // Is the poly close enough to warrant a more accurate check? Point is definitely outside of
            // the polygon. Distance - Radius is the smallest possible distance to an edge of the poly.
            // This will underestimate distance, but that's perfectly fine.
            var r = navPoly.boundingRadius;
            var d = navPoly.centroid.distance(point);
            if (d - r < minDistance) {
                var result = this.projectPointToPolygon(point, navPoly);
                if (result.distance < minDistance) {
                    minDistance = result.distance;
                    closestPoly = navPoly;
                    pointOnClosestPoly = result.point;
                }
            }
        }
        return { distance: minDistance, polygon: closestPoly, point: pointOnClosestPoly };
    };
    /**
     * Find a path from the start point to the end point using this nav mesh.
     * @param startPoint A point-like object in the form {x, y}
     * @param endPoint A point-like object in the form {x, y}
     * @returns An array of points if a path is found, or null if no path
     */
    NavMesh.prototype.findPath = function (startPoint, endPoint) {
        var startPoly = null;
        var endPoly = null;
        var startDistance = Number.MAX_VALUE;
        var endDistance = Number.MAX_VALUE;
        var d, r;
        var startVector = new Vector2(startPoint.x, startPoint.y);
        var endVector = new Vector2(endPoint.x, endPoint.y);
        // Find the closest poly for the starting and ending point
        for (var _i = 0, _a = this.navPolygons; _i < _a.length; _i++) {
            var navPoly = _a[_i];
            r = navPoly.boundingRadius;
            // Start
            d = navPoly.centroid.distance(startVector);
            if (d <= startDistance && d <= r && navPoly.contains(startVector)) {
                startPoly = navPoly;
                startDistance = d;
            }
            // End
            d = navPoly.centroid.distance(endVector);
            if (d <= endDistance && d <= r && navPoly.contains(endVector)) {
                endPoly = navPoly;
                endDistance = d;
            }
        }
        // If the end point wasn't inside a polygon, run a more liberal check that allows a point
        // to be within meshShrinkAmount radius of a polygon
        if (!endPoly && this.meshShrinkAmount > 0) {
            for (var _b = 0, _c = this.navPolygons; _b < _c.length; _b++) {
                var navPoly = _c[_b];
                r = navPoly.boundingRadius + this.meshShrinkAmount;
                d = navPoly.centroid.distance(endVector);
                if (d <= r) {
                    var distance = this.projectPointToPolygon(endVector, navPoly).distance;
                    if (distance <= this.meshShrinkAmount && distance < endDistance) {
                        endPoly = navPoly;
                        endDistance = distance;
                    }
                }
            }
        }
        // No matching polygons locations for the end, so no path found
        // because start point is valid normally, check end point first
        if (!endPoly)
            return null;
        // Same check as above, but for the start point
        if (!startPoly && this.meshShrinkAmount > 0) {
            for (var _d = 0, _e = this.navPolygons; _d < _e.length; _d++) {
                var navPoly = _e[_d];
                // Check if point is within bounding circle to avoid extra projection calculations
                r = navPoly.boundingRadius + this.meshShrinkAmount;
                d = navPoly.centroid.distance(startVector);
                if (d <= r) {
                    // Check if projected point is within range of a polygon and is closer than the
                    // previous point
                    var distance = this.projectPointToPolygon(startVector, navPoly).distance;
                    if (distance <= this.meshShrinkAmount && distance < startDistance) {
                        startPoly = navPoly;
                        startDistance = distance;
                    }
                }
            }
        }
        // No matching polygons locations for the start, so no path found
        if (!startPoly)
            return null;
        // If the start and end polygons are the same, return a direct path
        if (startPoly === endPoly)
            return [startVector, endVector];
        // Search!
        var astarPath = new AStar().search(this.graph, startPoly, endPoly, this.graph.navHeuristic);
        // While the start and end polygons may be valid, no path between them
        if (astarPath.length === 0)
            return null;
        // jsastar drops the first point from the path, but the funnel algorithm needs it
        astarPath.unshift(startPoly);
        // We have a path, so now time for the funnel algorithm
        var channel = new Channel();
        channel.push(startVector);
        for (var i = 0; i < astarPath.length - 1; i++) {
            var navPolygon = astarPath[i];
            var nextNavPolygon = astarPath[i + 1];
            // Find the portal
            var portal = null;
            for (var i_1 = 0; i_1 < navPolygon.neighbors.length; i_1++) {
                if (navPolygon.neighbors[i_1].id === nextNavPolygon.id) {
                    portal = navPolygon.portals[i_1];
                }
            }
            if (!portal)
                throw new Error("Path was supposed to be found, but portal is missing!");
            // Push the portal vertices into the channel
            channel.push(portal.start, portal.end);
        }
        channel.push(endVector);
        // Pull a string along the channel to run the funnel
        channel.stringPull();
        // Clone path, excluding duplicates
        var lastPoint = null;
        var phaserPath = new Array();
        for (var _f = 0, _g = channel.path; _f < _g.length; _f++) {
            var p = _g[_f];
            var newPoint = p.clone();
            if (!lastPoint || !newPoint.equals(lastPoint))
                phaserPath.push(newPoint);
            lastPoint = newPoint;
        }
        return phaserPath;
    };
    NavMesh.prototype.calculateNeighbors = function () {
        // Fill out the neighbor information for each navpoly
        for (var i = 0; i < this.navPolygons.length; i++) {
            var navPoly = this.navPolygons[i];
            for (var j = i + 1; j < this.navPolygons.length; j++) {
                var otherNavPoly = this.navPolygons[j];
                // Check if the other navpoly is within range to touch
                var d = navPoly.centroid.distance(otherNavPoly.centroid);
                if (d > navPoly.boundingRadius + otherNavPoly.boundingRadius)
                    continue;
                // The are in range, so check each edge pairing
                for (var _i = 0, _a = navPoly.edges; _i < _a.length; _i++) {
                    var edge = _a[_i];
                    for (var _b = 0, _c = otherNavPoly.edges; _b < _c.length; _b++) {
                        var otherEdge = _c[_b];
                        // If edges aren't collinear, not an option for connecting navpolys
                        if (!areCollinear(edge, otherEdge))
                            continue;
                        // If they are collinear, check if they overlap
                        var overlap = this.getSegmentOverlap(edge, otherEdge);
                        if (!overlap)
                            continue;
                        // Connections are symmetric!
                        navPoly.neighbors.push(otherNavPoly);
                        otherNavPoly.neighbors.push(navPoly);
                        // Calculate the portal between the two polygons - this needs to be in
                        // counter-clockwise order, relative to each polygon
                        var p1 = overlap[0], p2 = overlap[1];
                        var edgeStartAngle = navPoly.centroid.angle(edge.start);
                        var a1 = navPoly.centroid.angle(overlap[0]);
                        var a2 = navPoly.centroid.angle(overlap[1]);
                        var d1 = angleDifference(edgeStartAngle, a1);
                        var d2 = angleDifference(edgeStartAngle, a2);
                        if (d1 < d2) {
                            navPoly.portals.push(new Line(p1.x, p1.y, p2.x, p2.y));
                        }
                        else {
                            navPoly.portals.push(new Line(p2.x, p2.y, p1.x, p1.y));
                        }
                        edgeStartAngle = otherNavPoly.centroid.angle(otherEdge.start);
                        a1 = otherNavPoly.centroid.angle(overlap[0]);
                        a2 = otherNavPoly.centroid.angle(overlap[1]);
                        d1 = angleDifference(edgeStartAngle, a1);
                        d2 = angleDifference(edgeStartAngle, a2);
                        if (d1 < d2) {
                            otherNavPoly.portals.push(new Line(p1.x, p1.y, p2.x, p2.y));
                        }
                        else {
                            otherNavPoly.portals.push(new Line(p2.x, p2.y, p1.x, p1.y));
                        }
                        // Two convex polygons shouldn't be connected more than once! (Unless
                        // there are unnecessary vertices...)
                    }
                }
            }
        }
    };
    // Check two collinear line segments to see if they overlap by sorting the points.
    // Algorithm source: http://stackoverflow.com/a/17152247
    NavMesh.prototype.getSegmentOverlap = function (line1, line2) {
        var points = [
            { line: line1, point: line1.start },
            { line: line1, point: line1.end },
            { line: line2, point: line2.start },
            { line: line2, point: line2.end },
        ];
        points.sort(function (a, b) {
            if (a.point.x < b.point.x)
                return -1;
            else if (a.point.x > b.point.x)
                return 1;
            else {
                if (a.point.y < b.point.y)
                    return -1;
                else if (a.point.y > b.point.y)
                    return 1;
                else
                    return 0;
            }
        });
        // If the first two points in the array come from the same line, no overlap
        var noOverlap = points[0].line === points[1].line;
        // If the two middle points in the array are the same coordinates, then there is a
        // single point of overlap.
        var singlePointOverlap = points[1].point.equals(points[2].point);
        if (noOverlap || singlePointOverlap)
            return null;
        else
            return [points[1].point, points[2].point];
    };
    /**
     * Project a point onto a polygon in the shortest distance possible.
     *
     * @param {Phaser.Point} point The point to project
     * @param {NavPoly} navPoly The navigation polygon to test against
     * @returns {{point: Phaser.Point, distance: number}}
     */
    NavMesh.prototype.projectPointToPolygon = function (point, navPoly) {
        var closestProjection = null;
        var closestDistance = Number.MAX_VALUE;
        for (var _i = 0, _a = navPoly.edges; _i < _a.length; _i++) {
            var edge = _a[_i];
            var projectedPoint = projectPointToEdge(point, edge);
            var d = point.distance(projectedPoint);
            if (closestProjection === null || d < closestDistance) {
                closestDistance = d;
                closestProjection = projectedPoint;
            }
        }
        return { point: closestProjection, distance: closestDistance };
    };
    return NavMesh;
}());

/**
 * This implementation is strongly inspired from CritterAI class "Geometry".
 */
var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    /**
     * Returns TRUE if line segment AB intersects with line segment CD in any
     * manner. Either collinear or at a single point.
     * @param ax The x-value for point (ax, ay) in line segment AB.
     * @param ay The y-value for point (ax, ay) in line segment AB.
     * @param bx The x-value for point (bx, by) in line segment AB.
     * @param by The y-value for point (bx, by) in line segment AB.
     * @param cx The x-value for point (cx, cy) in line segment CD.
     * @param cy The y-value for point (cx, cy) in line segment CD.
     * @param dx The x-value for point (dx, dy) in line segment CD.
     * @param dy The y-value for point (dx, dy) in line segment CD.
     * @return TRUE if line segment AB intersects with line segment CD in any
     * manner.
     */
    Geometry.segmentsIntersect = function (ax, ay, bx, by, cx, cy, dx, dy) {
        // This is modified 2D line-line intersection/segment-segment
        // intersection test.
        var deltaABx = bx - ax;
        var deltaABy = by - ay;
        var deltaCAx = ax - cx;
        var deltaCAy = ay - cy;
        var deltaCDx = dx - cx;
        var deltaCDy = dy - cy;
        var numerator = deltaCAy * deltaCDx - deltaCAx * deltaCDy;
        var denominator = deltaABx * deltaCDy - deltaABy * deltaCDx;
        // Perform early exit tests.
        if (denominator === 0 && numerator !== 0) {
            // If numerator is zero, then the lines are colinear.
            // Since it isn't, then the lines must be parallel.
            return false;
        }
        // Lines intersect. But do the segments intersect?
        // Forcing float division on both of these via casting of the
        // denominator.
        var factorAB = numerator / denominator;
        var factorCD = (deltaCAy * deltaABx - deltaCAx * deltaABy) / denominator;
        // Determine the type of intersection
        if (factorAB >= 0.0 &&
            factorAB <= 1.0 &&
            factorCD >= 0.0 &&
            factorCD <= 1.0) {
            return true; // The two segments intersect.
        }
        // The lines intersect, but segments to not.
        return false;
    };
    /**
     * Returns the distance squared from the point to the line segment.
     *
     * Behavior is undefined if the the closest distance is outside the
     * line segment.
     *
     * @param px The x-value of point (px, py).
     * @param py The y-value of point (px, py)
     * @param ax The x-value of the line segment's vertex A.
     * @param ay The y-value of the line segment's vertex A.
     * @param bx The x-value of the line segment's vertex B.
     * @param by The y-value of the line segment's vertex B.
     * @return The distance squared from the point (px, py) to line segment AB.
     */
    Geometry.getPointSegmentDistanceSq = function (px, py, ax, ay, bx, by) {
        // Reference: http://local.wasp.uwa.edu.au/~pbourke/geometry/pointline/
        //
        // The goal of the algorithm is to find the point on line segment AB
        // that is closest to P and then calculate the distance between P
        // and that point.
        var deltaABx = bx - ax;
        var deltaABy = by - ay;
        var deltaAPx = px - ax;
        var deltaAPy = py - ay;
        var segmentABLengthSq = deltaABx * deltaABx + deltaABy * deltaABy;
        if (segmentABLengthSq === 0) {
            // AB is not a line segment. So just return
            // distanceSq from P to A
            return deltaAPx * deltaAPx + deltaAPy * deltaAPy;
        }
        var u = (deltaAPx * deltaABx + deltaAPy * deltaABy) / segmentABLengthSq;
        if (u < 0) {
            // Closest point on line AB is outside outside segment AB and
            // closer to A. So return distanceSq from P to A.
            return deltaAPx * deltaAPx + deltaAPy * deltaAPy;
        }
        else if (u > 1) {
            // Closest point on line AB is outside segment AB and closer to B.
            // So return distanceSq from P to B.
            return (px - bx) * (px - bx) + (py - by) * (py - by);
        }
        // Closest point on lineAB is inside segment AB. So find the exact
        // point on AB and calculate the distanceSq from it to P.
        // The calculation in parenthesis is the location of the point on
        // the line segment.
        var deltaX = ax + u * deltaABx - px;
        var deltaY = ay + u * deltaABy - py;
        return deltaX * deltaX + deltaY * deltaY;
    };
    return Geometry;
}());

/**
 * A cell that holds data needed by the 1st steps of the NavMesh generation.
 */
var RasterizationCell = /** @class */ (function () {
    function RasterizationCell(x, y) {
        /**
         * 0 means there is an obstacle in the cell.
         * See {@link RegionGenerator}
         */
        this.distanceToObstacle = Number.MAX_VALUE;
        this.regionID = RasterizationCell.NULL_REGION_ID;
        this.distanceToRegionCore = 0;
        /**
         * If a cell is connected to one or more external regions then the
         *  flag will be a 4 bit value where connections are recorded as
         *  follows:
         *  - bit1 = neighbor0
         *  - bit2 = neighbor1
         *  - bit3 = neighbor2
         *  - bit4 = neighbor3
         *  With the meaning of the bits as follows:
         *  - 0 = neighbor in same region.
         *  - 1 = neighbor not in same region (neighbor may be the obstacle
         *    region or a real region).
         *
         * See {@link ContourBuilder}
         */
        this.contourFlags = 0;
        this.x = x;
        this.y = y;
        this.clear();
    }
    RasterizationCell.prototype.clear = function () {
        this.distanceToObstacle = Number.MAX_VALUE;
        this.regionID = RasterizationCell.NULL_REGION_ID;
        this.distanceToRegionCore = 0;
        this.contourFlags = 0;
    };
    /** A cell that has not been assigned to any region yet */
    RasterizationCell.NULL_REGION_ID = 0;
    /**
     * A cell that contains an obstacle.
     *
     * The value is the same as NULL_REGION_ID because the cells that are
     * not assigned to any region at the end of the flooding algorithm are
     * the obstacle cells.
     */
    RasterizationCell.OBSTACLE_REGION_ID = 0;
    return RasterizationCell;
}());

var RasterizationGrid = /** @class */ (function () {
    function RasterizationGrid(left, top, right, bottom, cellWidth, cellHeight) {
        this.regionCount = 0;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.originX = left - cellWidth;
        this.originY = top - cellHeight;
        var dimX = 2 + Math.ceil((right - left) / cellWidth);
        var dimY = 2 + Math.ceil((bottom - top) / cellHeight);
        this.cells = [];
        for (var y = 0; y < dimY; y++) {
            this.cells[y] = [];
            for (var x = 0; x < dimX; x++) {
                this.cells[y][x] = new RasterizationCell(x, y);
            }
        }
    }
    RasterizationGrid.prototype.clear = function () {
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var cell = row_1[_b];
                cell.clear();
            }
        }
        this.regionCount = 0;
    };
    /**
     *
     * @param position the position on the scene
     * @param gridPosition the position on the grid
     * @returns the position on the grid
     */
    RasterizationGrid.prototype.convertToGridBasis = function (position, gridPosition) {
        gridPosition.x = (position.x - this.originX) / this.cellWidth;
        gridPosition.y = (position.y - this.originY) / this.cellHeight;
        return gridPosition;
    };
    /**
     *
     * @param gridPosition the position on the grid
     * @param position the position on the scene
     * @returns the position on the scene
     */
    RasterizationGrid.prototype.convertFromGridBasis = function (gridPosition, position) {
        position.x = gridPosition.x * this.cellWidth + this.originX;
        position.y = gridPosition.y * this.cellHeight + this.originY;
        return position;
    };
    RasterizationGrid.prototype.get = function (x, y) {
        return this.cells[y][x];
    };
    RasterizationGrid.prototype.getNeighbor = function (cell, direction) {
        var delta = RasterizationGrid.neighbor8Deltas[direction];
        return this.cells[cell.y + delta.y][cell.x + delta.x];
    };
    RasterizationGrid.prototype.dimY = function () {
        return this.cells.length;
    };
    RasterizationGrid.prototype.dimX = function () {
        var firstColumn = this.cells[0];
        return firstColumn ? firstColumn.length : 0;
    };
    RasterizationGrid.prototype.obstacleDistanceMax = function () {
        var max = 0;
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cellRow = _a[_i];
            for (var _b = 0, cellRow_1 = cellRow; _b < cellRow_1.length; _b++) {
                var cell = cellRow_1[_b];
                if (cell.distanceToObstacle > max) {
                    max = cell.distanceToObstacle;
                }
            }
        }
        return max;
    };
    RasterizationGrid.neighbor4Deltas = [
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
    ];
    RasterizationGrid.neighbor8Deltas = [
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: -1 },
    ];
    return RasterizationGrid;
}());

/**
 * Builds a set of contours from the region information contained in
 * {@link RasterizationCell}. It does this by locating and "walking" the edges.
 *
 * This implementation is strongly inspired from CritterAI class "ContourSetBuilder".
 * http://www.critterai.org/projects/nmgen_study/contourgen.html
 */
var ContourBuilder = /** @class */ (function () {
    function ContourBuilder() {
        // These are working lists whose content changes with each iteration
        // of the up coming loop. They represent the detailed and simple
        // contour vertices.
        // Initial sizing is arbitrary.
        this.workingRawVertices = new Array(256);
        this.workingSimplifiedVertices = new Array(64);
    }
    /**
     * Generates a contour set from the provided {@link RasterizationGrid}
     *
     * The provided field is expected to contain region information.
     * Behavior is undefined if the provided field is malformed or incomplete.
     *
     * This operation overwrites the flag fields for all cells in the
     * provided field. So the flags must be saved and restored if they are
     * important.
     *
     * @param grid A fully generated field.
     * @param threshold The maximum distance (in cells) the edge of the contour
     * may deviate from the source geometry when the rastered obstacles are
     * vectorized.
     *
     * Setting it to:
     * - 1 ensure that an aliased edge won't be split to more edges.
     * - more that 1 will reduce the number of edges but the obstacles edges
     *   will be followed with less accuracy.
     * - less that 1 might be more accurate but it may try to follow the
     *   aliasing and be a lot less accurate.
     *
     * Values under 1 can be useful in specific cases:
     * - when edges are horizontal or vertical, there is no aliasing so value
     *   near 0 can do better results.
     * - when edges are 45° multiples, aliased vertex won't be farther than
     *   sqrt(2)/2 so values over 0.71 should give good results but not
     *   necessarily better than 1.
     *
     * @return The contours generated from the field.
     */
    ContourBuilder.prototype.buildContours = function (grid, threshold) {
        var contours = new Array(grid.regionCount);
        contours.length = 0;
        var contoursByRegion = new Array(grid.regionCount);
        var discardedContours = 0;
        //  Set the flags on all cells in non-obstacle regions to indicate which
        //  edges are connected to external regions.
        //
        //  Reference: Neighbor search and nomenclature.
        //  http://www.critterai.org/projects/nmgen_study/heightfields.html#nsearch
        //
        //  If a cell has no connections to external regions or is
        //  completely surrounded by other regions (a single cell island),
        //  its flag will be zero.
        //
        //  If a cell is connected to one or more external regions then the
        //  flag will be a 4 bit value where connections are recorded as
        //  follows:
        //      bit1 = neighbor0
        //      bit2 = neighbor1
        //      bit3 = neighbor2
        //      bit4 = neighbor3
        //  With the meaning of the bits as follows:
        //      0 = neighbor in same region.
        //      1 = neighbor not in same region (neighbor may be the obstacle
        //      region or a real region).
        for (var y = 1; y < grid.dimY() - 1; y++) {
            for (var x = 1; x < grid.dimX() - 1; x++) {
                var cell = grid.get(x, y);
                // Note:  This algorithm first sets the flag bits such that
                // 1 = "neighbor is in the same region". At the end it inverts
                // the bits so flags are as expected.
                // Default to "not connected to any external region".
                cell.contourFlags = 0;
                if (cell.regionID === RasterizationCell.OBSTACLE_REGION_ID)
                    // Don't care about cells in the obstacle region.
                    continue;
                for (var direction = 0; direction < RasterizationGrid.neighbor4Deltas.length; direction++) {
                    var delta = RasterizationGrid.neighbor4Deltas[direction];
                    var neighbor = grid.get(cell.x + delta.x, cell.y + delta.y);
                    if (cell.regionID === neighbor.regionID) {
                        // Neighbor is in same region as this cell.
                        // Set the bit for this neighbor to 1 (Will be inverted later).
                        cell.contourFlags |= 1 << direction;
                    }
                }
                // Invert the bits so a bit value of 1 indicates neighbor NOT in
                // same region.
                cell.contourFlags ^= 0xf;
                if (cell.contourFlags === 0xf) {
                    // This is an island cell (All neighbors are from other regions)
                    // Get rid of flags.
                    cell.contourFlags = 0;
                    console.warn("Discarded contour: Island cell. Can't form  a contour. Region: " +
                        cell.regionID);
                    discardedContours++;
                }
            }
        }
        // Loop through all cells looking for cells on the edge of a region.
        //
        // At this point, only cells with flags != 0 are edge cells that
        // are part of a region contour.
        //
        // The process of building a contour will clear the flags on all cells
        // that make up the contour to ensure they are only processed once.
        for (var y = 1; y < grid.dimY() - 1; y++) {
            for (var x = 1; x < grid.dimX() - 1; x++) {
                var cell = grid.get(x, y);
                if (cell.regionID === RasterizationCell.OBSTACLE_REGION_ID ||
                    cell.contourFlags === 0) {
                    // cell is either: Part of the obstacle region, does not
                    // represent an edge cell, or was already processed during
                    // an earlier iteration.
                    continue;
                }
                this.workingRawVertices.length = 0;
                this.workingSimplifiedVertices.length = 0;
                // The cell is part of an unprocessed region's contour.
                // Locate a direction of the cell's edge which points toward
                // another region (there is at least one).
                var startDirection = 0;
                while ((cell.contourFlags & (1 << startDirection)) === 0) {
                    startDirection++;
                }
                // We now have a cell that is part of a contour and a direction
                // that points to a different region (obstacle or real).
                // Build the contour.
                this.buildRawContours(grid, cell, startDirection, this.workingRawVertices);
                // Perform post processing on the contour in order to
                // create the final, simplified contour.
                this.generateSimplifiedContour(cell.regionID, this.workingRawVertices, this.workingSimplifiedVertices, threshold);
                // The CritterAI implementation filters polygons with less than
                // 3 vertices, but they are needed to filter vertices in the middle
                // (not on an obstacle region border).
                var contour = Array.from(this.workingSimplifiedVertices);
                contours.push(contour);
                contoursByRegion[cell.regionID] = contour;
            }
        }
        if (contours.length + discardedContours !== grid.regionCount - 1) {
            // The only valid state is one contour per region.
            //
            // The only time this should occur is if an invalid contour
            // was formed or if a region resulted in multiple
            // contours (bad region data).
            //
            // IMPORTANT: While a mismatch may not be a fatal error,
            // it should be addressed since it can result in odd,
            // hard to spot anomalies later in the pipeline.
            //
            // A known cause is if a region fully encompasses another
            // region. In such a case, two contours will be formed.
            // The normal outer contour and an inner contour.
            // The CleanNullRegionBorders algorithm protects
            // against internal encompassed obstacle regions.
            console.error("Contour generation failed: Detected contours does" +
                " not match the number of regions. Regions: " +
                (grid.regionCount - 1) +
                ", Detected contours: " +
                (contours.length + discardedContours) +
                " (Actual: " +
                contours.length +
                ", Discarded: " +
                discardedContours +
                ")");
            // The CritterAI implementation has more detailed logs.
            // They can be interesting for debugging.
        }
        this.filterNonObstacleVertices(contours, contoursByRegion);
        return contours;
    };
    /**
     * Search vertices that are not shared with the obstacle region and
     * remove them.
     *
     * Some contours will have no vertex left.
     *
     * @param contours
     * @param contoursByRegion Some regions may have been discarded
     * so contours index can't be used.
     */
    ContourBuilder.prototype.filterNonObstacleVertices = function (contours, contoursByRegion) {
        // This was not part of the CritterAI implementation.
        // The removed vertex is merged on the nearest of the edges other extremity
        // that is on an obstacle border.
        var commonVertexContours = new Array(5);
        var commonVertexIndexes = new Array(5);
        // Each pass only filter vertex that have an edge other extremity on an obstacle.
        // Vertex depth (in number of edges to reach an obstacle) is reduces by
        // at least one by each pass.
        var movedAnyVertex = false;
        do {
            movedAnyVertex = false;
            for (var _i = 0, contours_1 = contours; _i < contours_1.length; _i++) {
                var contour = contours_1[_i];
                for (var vertexIndex = 0; vertexIndex < contour.length; vertexIndex++) {
                    var vertex = contour[vertexIndex];
                    var nextVertex = contour[(vertexIndex + 1) % contour.length];
                    if (vertex.region !== RasterizationCell.OBSTACLE_REGION_ID &&
                        nextVertex.region !== RasterizationCell.OBSTACLE_REGION_ID) {
                        // This is a vertex in the middle. It must be removed.
                        // Search the contours around the vertex.
                        //
                        // Typically a contour point to its neighbor and it form a cycle.
                        //
                        //   \ C /
                        //    \ /
                        //  A  |  B
                        //     |
                        //
                        // C -> B -> A -> C
                        //
                        // There can be more than 3 contours even if it's rare.
                        commonVertexContours.length = 0;
                        commonVertexIndexes.length = 0;
                        commonVertexContours.push(contour);
                        commonVertexIndexes.push(vertexIndex);
                        var errorFound = false;
                        var commonVertex = vertex;
                        do {
                            var neighborContour = contoursByRegion[commonVertex.region];
                            if (!neighborContour) {
                                errorFound = true;
                                if (commonVertex.region !== RasterizationCell.OBSTACLE_REGION_ID) {
                                    console.warn("contour already discarded: " + commonVertex.region);
                                }
                                break;
                            }
                            var foundVertex = false;
                            for (var neighborVertexIndex = 0; neighborVertexIndex < neighborContour.length; neighborVertexIndex++) {
                                var neighborVertex = neighborContour[neighborVertexIndex];
                                if (neighborVertex.x === commonVertex.x &&
                                    neighborVertex.y === commonVertex.y) {
                                    commonVertexContours.push(neighborContour);
                                    commonVertexIndexes.push(neighborVertexIndex);
                                    commonVertex = neighborVertex;
                                    foundVertex = true;
                                    break;
                                }
                            }
                            if (!foundVertex) {
                                errorFound = true;
                                console.error("Can't find a common vertex with a neighbor contour. There is probably a superposition.");
                                break;
                            }
                        } while (commonVertex !== vertex);
                        if (errorFound) {
                            continue;
                        }
                        if (commonVertexContours.length < 3) {
                            console.error("The vertex is shared by only " + commonVertexContours.length + " regions.");
                        }
                        var shorterEdgeContourIndex = -1;
                        var edgeLengthMin = Number.MAX_VALUE;
                        for (var index = 0; index < commonVertexContours.length; index++) {
                            var vertexContour = commonVertexContours[index];
                            var vertexIndex_1 = commonVertexIndexes[index];
                            var previousVertex = vertexContour[(vertexIndex_1 - 1 + vertexContour.length) %
                                vertexContour.length];
                            if (previousVertex.region === RasterizationCell.OBSTACLE_REGION_ID) {
                                var deltaX = previousVertex.x - vertex.x;
                                var deltaY = previousVertex.y - vertex.y;
                                var lengthSq = deltaX * deltaX + deltaY * deltaY;
                                if (lengthSq < edgeLengthMin) {
                                    edgeLengthMin = lengthSq;
                                    shorterEdgeContourIndex = index;
                                }
                            }
                        }
                        if (shorterEdgeContourIndex === -1) {
                            // A vertex has no neighbor on an obstacle.
                            // It will be solved in next iterations.
                            continue;
                        }
                        // Merge the vertex on the other extremity of the smallest of the 3 edges.
                        //
                        //   \ C /
                        //    \ /
                        //  A  |  B
                        //     |
                        //
                        // - the shortest edge is between A and B
                        // - the Y will become a V
                        // - vertices are store clockwise
                        // - there can be more than one C (it's rare)
                        // This is B
                        var shorterEdgeContour = commonVertexContours[shorterEdgeContourIndex];
                        var shorterEdgeVertexIndex = commonVertexIndexes[shorterEdgeContourIndex];
                        var shorterEdgeExtremityVertex = shorterEdgeContour[(shorterEdgeVertexIndex - 1 + shorterEdgeContour.length) %
                            shorterEdgeContour.length];
                        // This is A
                        var shorterEdgeOtherContourIndex = (shorterEdgeContourIndex + 1) % commonVertexContours.length;
                        var shorterEdgeOtherContour = commonVertexContours[shorterEdgeOtherContourIndex];
                        var shorterEdgeOtherVertexIndex = commonVertexIndexes[shorterEdgeOtherContourIndex];
                        for (var index = 0; index < commonVertexContours.length; index++) {
                            if (index === shorterEdgeContourIndex ||
                                index === shorterEdgeOtherContourIndex) {
                                continue;
                            }
                            // These are C
                            var commonVertexContour = commonVertexContours[index];
                            var commonVertexIndex = commonVertexIndexes[index];
                            // Move the vertex to an obstacle border
                            var movedVertex = commonVertexContour[commonVertexIndex];
                            movedVertex.x = shorterEdgeExtremityVertex.x;
                            movedVertex.y = shorterEdgeExtremityVertex.y;
                            movedVertex.region = RasterizationCell.NULL_REGION_ID;
                        }
                        // There is no more border between A and B,
                        // update the region from B to C.
                        shorterEdgeOtherContour[(shorterEdgeOtherVertexIndex + 1) % shorterEdgeOtherContour.length].region =
                            shorterEdgeOtherContour[shorterEdgeOtherVertexIndex].region;
                        // Remove in A and B the vertex that's been move in C.
                        shorterEdgeContour.splice(shorterEdgeVertexIndex, 1);
                        shorterEdgeOtherContour.splice(shorterEdgeOtherVertexIndex, 1);
                        movedAnyVertex = true;
                    }
                }
            }
        } while (movedAnyVertex);
        // Clean the polygons from identical vertices.
        //
        // This can happen with 2 vertices regions.
        // 2 edges are superposed and there extremity is the same.
        // One is move over the other.
        // I could observe this with a region between 2 regions
        // where one of one of these 2 regions were also encompassed.
        // A bit like a rainbow, 2 big regions: the land, the sky
        // and 2 regions for the colors.
        //
        // The vertex can't be removed during the process because
        // they hold data used by other merging.
        //
        // Some contour will have no vertex left.
        // It more efficient to let the next step ignore them.
        for (var _a = 0, contours_2 = contours; _a < contours_2.length; _a++) {
            var contour = contours_2[_a];
            for (var vertexIndex = 0; vertexIndex < contour.length; vertexIndex++) {
                var vertex = contour[vertexIndex];
                var nextVertexIndex = (vertexIndex + 1) % contour.length;
                var nextVertex = contour[nextVertexIndex];
                if (vertex.x === nextVertex.x && vertex.y === nextVertex.y) {
                    contour.splice(nextVertexIndex, 1);
                    vertexIndex--;
                }
            }
        }
    };
    /**
     * Walk around the edge of this cell's region gathering vertices that
     * represent the corners of each cell on the sides that are external facing.
     *
     * There will be two or three vertices for each edge cell:
     * Two for cells that don't represent a change in edge direction. Three
     * for cells that represent a change in edge direction.
     *
     * The output array will contain vertices ordered as follows:
     * (x, y, z, regionID) where regionID is the region (obstacle or real) that
     * this vertex is considered to be connected to.
     *
     * WARNING: Only run this operation on cells that are already known
     * to be on a region edge. The direction must also be pointing to a
     * valid edge. Otherwise behavior will be undefined.
     *
     * @param grid the grid of cells
     * @param startCell A cell that is known to be on the edge of a region
     * (part of a region contour).
     * @param startDirection The direction of the edge of the cell that is
     * known to point
     * across the region edge.
     * @param outContourVertices The list of vertices that represent the edge
     * of the region.
     */
    ContourBuilder.prototype.buildRawContours = function (grid, startCell, startDirection, outContourVertices) {
        // Flaw in Algorithm:
        //
        // This method of contour generation can result in an inappropriate
        // impassable seam between two adjacent regions in the following case:
        //
        // 1. One region connects to another region on two sides in an
        // uninterrupted manner (visualize one region wrapping in an L
        // shape around the corner of another).
        // 2. At the corner shared by the two regions, a change in height
        // occurs.
        //
        // In this case, the two regions should share a corner vertex
        // (an obtuse corner vertex for one region and an acute corner
        // vertex for the other region).
        //
        // In reality, though this algorithm will select the same (x, z)
        // coordinates for each region's corner vertex, the vertex heights
        // may differ, eventually resulting in an impassable seam.
        // It is a bit hard to describe the stepping portion of this algorithm.
        // One way to visualize it is to think of a robot sitting on the
        // floor facing a known wall. It then does the following to skirt
        // the wall:
        // 1. If there is a wall in front of it, turn clockwise in 90 degrees
        //    increments until it finds the wall is gone.
        // 2. Move forward one step.
        // 3. Turn counter-clockwise by 90 degrees.
        // 4. Repeat from step 1 until it finds itself at its original
        //    location facing its original direction.
        //
        // See also: http://www.critterai.org/projects/nmgen_study/contourgen.html#robotwalk
        var cell = startCell;
        var direction = startDirection;
        var loopCount = 0;
        do {
            // Note: The design of this loop is such that the cell variable
            // will always reference an edge cell from the same region as
            // the start cell.
            if ((cell.contourFlags & (1 << direction)) !== 0) {
                // The current direction is pointing toward an edge.
                // Get this edge's vertex.
                var delta = ContourBuilder.leftVertexOfFacingCellBorderDeltas[direction];
                var neighbor = grid.get(cell.x + RasterizationGrid.neighbor4Deltas[direction].x, cell.y + RasterizationGrid.neighbor4Deltas[direction].y);
                outContourVertices.push({
                    x: cell.x + delta.x,
                    y: cell.y + delta.y,
                    region: neighbor.regionID,
                });
                // Remove the flag for this edge. We never need to consider
                // it again since we have a vertex for this edge.
                cell.contourFlags &= ~(1 << direction);
                // Rotate in clockwise direction.
                direction = (direction + 1) & 0x3;
            }
            else {
                // The current direction does not point to an edge. So it
                // must point to a neighbor cell in the same region as the
                // current cell. Move to the neighbor and swing the search
                // direction back one increment (counterclockwise).
                // By moving the direction back one increment we guarantee we
                // don't miss any edges.
                var neighbor = grid.get(cell.x + RasterizationGrid.neighbor4Deltas[direction].x, cell.y + RasterizationGrid.neighbor4Deltas[direction].y);
                cell = neighbor;
                direction = (direction + 3) & 0x3; // Rotate counterclockwise.
            }
            // The loop limit is arbitrary. It exists only to guarantee that
            // bad input data doesn't result in an infinite loop.
            // The only down side of this loop limit is that it limits the
            // number of detectable edge vertices (the longer the region edge
            // and the higher the number of "turns" in a region's edge, the less
            // edge vertices can be detected for that region).
        } while (!(cell === startCell && direction === startDirection) &&
            ++loopCount < 65535);
        return outContourVertices;
    };
    /**
     * Takes a group of vertices that represent a region contour and changes
     * it in the following manner:
     * - For any edges that connect to non-obstacle regions, remove all
     * vertices except the start and end vertices for that edge (this
     * smooths the edges between non-obstacle regions into a straight line).
     * - Runs an algorithm's against the contour to follow the edge more closely.
     *
     * @param regionID The region the contour was derived from.
     * @param sourceVertices  The source vertices that represent the complex
     * contour.
     * @param outVertices The simplified contour vertices.
     * @param threshold The maximum distance the edge of the contour may deviate
     * from the source geometry.
     */
    ContourBuilder.prototype.generateSimplifiedContour = function (regionID, sourceVertices, outVertices, threshold) {
        var noConnections = true;
        for (var _i = 0, sourceVertices_1 = sourceVertices; _i < sourceVertices_1.length; _i++) {
            var sourceVertex = sourceVertices_1[_i];
            if (sourceVertex.region !== RasterizationCell.OBSTACLE_REGION_ID) {
                noConnections = false;
                break;
            }
        }
        // Seed the simplified contour with the mandatory edges
        // (At least one edge).
        if (noConnections) {
            // This contour represents an island region surrounded only by the
            // obstacle region. Seed the simplified contour with the source's
            // lower left (ll) and upper right (ur) vertices.
            var lowerLeftX = sourceVertices[0].x;
            var lowerLeftY = sourceVertices[0].y;
            var lowerLeftIndex = 0;
            var upperRightX = sourceVertices[0].x;
            var upperRightY = sourceVertices[0].y;
            var upperRightIndex = 0;
            for (var index = 0; index < sourceVertices.length; index++) {
                var sourceVertex = sourceVertices[index];
                var x = sourceVertex.x;
                var y = sourceVertex.y;
                if (x < lowerLeftX || (x === lowerLeftX && y < lowerLeftY)) {
                    lowerLeftX = x;
                    lowerLeftY = y;
                    lowerLeftIndex = index;
                }
                if (x >= upperRightX || (x === upperRightX && y > upperRightY)) {
                    upperRightX = x;
                    upperRightY = y;
                    upperRightIndex = index;
                }
            }
            // The region attribute is used to store an index locally in this function.
            // TODO Maybe there is a way to do this cleanly and keep no memory footprint.
            // Seed the simplified contour with this edge.
            outVertices.push({
                x: lowerLeftX,
                y: lowerLeftY,
                region: lowerLeftIndex,
            });
            outVertices.push({
                x: upperRightX,
                y: upperRightY,
                region: upperRightIndex,
            });
        }
        else {
            // The contour shares edges with other non-obstacle regions.
            // Seed the simplified contour with a new vertex for every
            // location where the region connection changes. These are
            // vertices that are important because they represent portals
            // to other regions.
            for (var index = 0; index < sourceVertices.length; index++) {
                var sourceVert = sourceVertices[index];
                if (sourceVert.region !==
                    sourceVertices[(index + 1) % sourceVertices.length].region) {
                    // The current vertex has a different region than the
                    // next vertex. So there is a change in vertex region.
                    outVertices.push({
                        x: sourceVert.x,
                        y: sourceVert.y,
                        region: index,
                    });
                }
            }
        }
        this.matchObstacleRegionEdges(sourceVertices, outVertices, threshold);
        if (outVertices.length < 2) {
            // It will be ignored by the triangulation.
            // It should be rare enough not to handle it now.
            console.warn("A region is encompassed in another region. It will be ignored.");
        }
        // There can be polygons with only 2 vertices when a region is between
        // 2 non-obstacles regions. It's still a useful information to filter
        // vertices in the middle (not on an obstacle region border).
        // In this case, the CritterAI implementation adds a 3rd point to avoid
        // invisible polygons, but it makes it difficult to filter it later.
        // Replace the index pointers in the output list with region IDs.
        for (var _a = 0, outVertices_1 = outVertices; _a < outVertices_1.length; _a++) {
            var outVertex = outVertices_1[_a];
            outVertex.region = sourceVertices[outVertex.region].region;
        }
    };
    /**
     * Applies an algorithm to contours which results in obstacle-region edges
     * following the original detail source geometry edge more closely.
     * http://www.critterai.org/projects/nmgen_study/contourgen.html#nulledgesimple
     *
     * Adds vertices from the source list to the result list such that
     * if any obstacle region vertices are compared against the result list,
     * none of the vertices will be further from the obstacle region edges than
     * the allowed threshold.
     *
     * Only obstacle-region edges are operated on. All other edges are
     * ignored.
     *
     * The result vertices is expected to be seeded with at least two
     * source vertices.
     *
     * @param sourceVertices
     * @param inoutResultVertices
     * @param threshold The maximum distance the edge of the contour may deviate
     * from the source geometry.
     */
    ContourBuilder.prototype.matchObstacleRegionEdges = function (sourceVertices, inoutResultVertices, threshold) {
        // This implementation is strongly inspired from CritterAI class "MatchNullRegionEdges".
        // Loop through all edges in this contour.
        //
        // NOTE: The simplifiedVertCount in the loop condition
        // increases over iterations. That is what keeps the loop going beyond
        // the initial vertex count.
        var resultIndexA = 0;
        while (resultIndexA < inoutResultVertices.length) {
            var resultIndexB = (resultIndexA + 1) % inoutResultVertices.length;
            // The line segment's beginning vertex.
            var ax = inoutResultVertices[resultIndexA].x;
            var az = inoutResultVertices[resultIndexA].y;
            var sourceIndexA = inoutResultVertices[resultIndexA].region;
            // The line segment's ending vertex.
            var bx = inoutResultVertices[resultIndexB].x;
            var bz = inoutResultVertices[resultIndexB].y;
            var sourceIndexB = inoutResultVertices[resultIndexB].region;
            // The source index of the next vertex to test (the vertex just
            // after the current vertex in the source vertex list).
            var testedSourceIndex = (sourceIndexA + 1) % sourceVertices.length;
            var maxDeviation = 0;
            // Default to no index. No new vert to add.
            var toInsertSourceIndex = -1;
            if (sourceVertices[testedSourceIndex].region ===
                RasterizationCell.OBSTACLE_REGION_ID) {
                // This test vertex is part of a obstacle region edge.
                // Loop through the source vertices until the end vertex
                // is found, searching for the vertex that is farthest from
                // the line segment formed by the begin/end vertices.
                //
                // Visualizations:
                // http://www.critterai.org/projects/nmgen_study/contourgen.html#nulledgesimple
                while (testedSourceIndex !== sourceIndexB) {
                    var deviation = Geometry.getPointSegmentDistanceSq(sourceVertices[testedSourceIndex].x, sourceVertices[testedSourceIndex].y, ax, az, bx, bz);
                    if (deviation > maxDeviation) {
                        // A new maximum deviation was detected.
                        maxDeviation = deviation;
                        toInsertSourceIndex = testedSourceIndex;
                    }
                    // Move to the next vertex.
                    testedSourceIndex = (testedSourceIndex + 1) % sourceVertices.length;
                }
            }
            if (toInsertSourceIndex !== -1 && maxDeviation > threshold * threshold) {
                // A vertex was found that is further than allowed from the
                // current edge. Add this vertex to the contour.
                inoutResultVertices.splice(resultIndexA + 1, 0, {
                    x: sourceVertices[toInsertSourceIndex].x,
                    y: sourceVertices[toInsertSourceIndex].y,
                    region: toInsertSourceIndex,
                });
                // Not incrementing the vertex since we need to test the edge
                // formed by vertA  and this this new vertex on the next
                // iteration of the loop.
            }
            // This edge segment does not need to be altered. Move to
            // the next vertex.
            else
                resultIndexA++;
        }
    };
    ContourBuilder.leftVertexOfFacingCellBorderDeltas = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
    ];
    return ContourBuilder;
}());

/**
 * Builds convex polygons from the provided polygons.
 *
 * This implementation is strongly inspired from CritterAI class "PolyMeshFieldBuilder".
 * http://www.critterai.org/projects/nmgen_study/polygen.html
 */
var ConvexPolygonGenerator = /** @class */ (function () {
    function ConvexPolygonGenerator() {
    }
    /**
     * Builds convex polygons from the provided polygons.
     * @param concavePolygons The content is manipulated during the operation
     * and it will be left in an undefined state at the end of
     * the operation.
     * @param maxVerticesPerPolygon cap the vertex number in return polygons.
     * @return convex polygons.
     */
    ConvexPolygonGenerator.prototype.splitToConvexPolygons = function (concavePolygons, maxVerticesPerPolygon) {
        // The maximum possible number of polygons assuming that all will
        // be triangles.
        var maxPossiblePolygons = 0;
        // The maximum vertices found in a single contour.
        var maxVerticesPerContour = 0;
        for (var _i = 0, concavePolygons_1 = concavePolygons; _i < concavePolygons_1.length; _i++) {
            var contour = concavePolygons_1[_i];
            var count = contour.length;
            maxPossiblePolygons += count - 2;
            maxVerticesPerContour = Math.max(maxVerticesPerContour, count);
        }
        // Each list is initialized to a size that will minimize resizing.
        var convexPolygons = new Array(maxPossiblePolygons);
        convexPolygons.length = 0;
        // Various working variables.
        // (Values are meaningless outside of the iteration)
        var workingContourFlags = new Array(maxVerticesPerContour);
        workingContourFlags.length = 0;
        var workingPolygons = new Array(maxVerticesPerContour + 1);
        workingPolygons.length = 0;
        var workingMergeInfo = {
            lengthSq: -1,
            polygonAVertexIndex: -1,
            polygonBVertexIndex: -1,
        };
        var workingMergedPolygon = new Array(maxVerticesPerPolygon);
        workingMergedPolygon.length = 0;
        var _loop_1 = function (contour) {
            if (contour.length < 3) {
                return "continue";
            }
            // Initialize the working polygon array.
            workingPolygons.length = 0;
            // Triangulate the contour.
            var foundAnyTriangle = false;
            this_1.triangulate(contour, workingContourFlags, function (p1, p2, p3) {
                var workingPolygon = new Array(maxVerticesPerPolygon);
                workingPolygon.length = 0;
                workingPolygon.push(p1);
                workingPolygon.push(p2);
                workingPolygon.push(p3);
                workingPolygons.push(workingPolygon);
                foundAnyTriangle = true;
            });
            if (!foundAnyTriangle) {
                /*
                    * Failure of the triangulation.
                    * This is known to occur if the source polygon is
                    * self-intersecting or the source region contains internal
                    * holes. In both cases, the problem is likely due to bad
                    * region formation.
                    */
                console.error("Polygon generation failure: Could not triangulate contour.");
                console.error("contour:" +
                    contour.map(function (point) { return point.x + " " + point.y; }).join(" ; "));
                return "continue";
            }
            if (maxVerticesPerPolygon > 3) {
                // Merging of triangles into larger polygons is permitted.
                // Continue until no polygons can be found to merge.
                // http://www.critterai.org/nmgen_polygen#mergepolys
                while (true) {
                    var longestMergeEdge = -1;
                    var bestPolygonA = [];
                    var polygonAVertexIndex = -1; // Start of the shared edge.
                    var bestPolygonB = [];
                    var polygonBVertexIndex = -1; // Start of the shared edge.
                    var bestPolygonBIndex = -1;
                    // Loop through all but the last polygon looking for the
                    // best polygons to merge in this iteration.
                    for (var indexA = 0; indexA < workingPolygons.length - 1; indexA++) {
                        var polygonA = workingPolygons[indexA];
                        for (var indexB = indexA + 1; indexB < workingPolygons.length; indexB++) {
                            var polygonB = workingPolygons[indexB];
                            // Can polyB merge with polyA?
                            this_1.getPolyMergeInfo(polygonA, polygonB, maxVerticesPerPolygon, workingMergeInfo);
                            if (workingMergeInfo.lengthSq > longestMergeEdge) {
                                // polyB has the longest shared edge with
                                // polyA found so far. Save the merge
                                // information.
                                longestMergeEdge = workingMergeInfo.lengthSq;
                                bestPolygonA = polygonA;
                                polygonAVertexIndex = workingMergeInfo.polygonAVertexIndex;
                                bestPolygonB = polygonB;
                                polygonBVertexIndex = workingMergeInfo.polygonBVertexIndex;
                                bestPolygonBIndex = indexB;
                            }
                        }
                    }
                    if (longestMergeEdge <= 0)
                        // No valid merges found during this iteration.
                        break;
                    // Found polygons to merge. Perform the merge.
                    /*
                        * Fill the mergedPoly array.
                        * Start the vertex at the end of polygon A's shared edge.
                        * Add all vertices until looping back to the vertex just
                        * before the start of the shared edge. Repeat for
                        * polygon B.
                        *
                        * Duplicate vertices are avoided, while ensuring we get
                        * all vertices, since each loop  drops the vertex that
                        * starts its polygon's shared edge and:
                        *
                        * PolyAStartVert == PolyBEndVert and
                        * PolyAEndVert == PolyBStartVert.
                        */
                    var vertCountA = bestPolygonA.length;
                    var vertCountB = bestPolygonB.length;
                    workingMergedPolygon.length = 0;
                    for (var i = 0; i < vertCountA - 1; i++)
                        workingMergedPolygon.push(bestPolygonA[(polygonAVertexIndex + 1 + i) % vertCountA]);
                    for (var i = 0; i < vertCountB - 1; i++)
                        workingMergedPolygon.push(bestPolygonB[(polygonBVertexIndex + 1 + i) % vertCountB]);
                    // Copy the merged polygon over the top of polygon A.
                    bestPolygonA.length = 0;
                    Array.prototype.push.apply(bestPolygonA, workingMergedPolygon);
                    // Remove polygon B
                    workingPolygons.splice(bestPolygonBIndex, 1);
                }
            }
            // Polygon creation for this contour is complete.
            // Add polygons to the global polygon array
            Array.prototype.push.apply(convexPolygons, workingPolygons);
        };
        var this_1 = this;
        // Split every concave polygon into convex polygons.
        for (var _a = 0, concavePolygons_2 = concavePolygons; _a < concavePolygons_2.length; _a++) {
            var contour = concavePolygons_2[_a];
            _loop_1(contour);
        }
        // The original implementation builds polygon adjacency information.
        // but the library for the pathfinding already does it.
        return convexPolygons;
    };
    /**
     * Checks two polygons to see if they can be merged. If a merge is
     * allowed, provides data via the outResult argument (see {@link PolyMergeResult}).
     *
     * @param polygonA The polygon A
     * @param polygonB The polygon B
     * @param maxVerticesPerPolygon cap the vertex number in return polygons.
     * @param outResult contains merge information.
     */
    ConvexPolygonGenerator.prototype.getPolyMergeInfo = function (polygonA, polygonB, maxVerticesPerPolygon, outResult) {
        outResult.lengthSq = -1; // Default to invalid merge
        outResult.polygonAVertexIndex = -1;
        outResult.polygonBVertexIndex = -1;
        var vertexCountA = polygonA.length;
        var vertexCountB = polygonB.length;
        // If the merged polygon would would have to many vertices, do not
        // merge. Subtracting two since to take into account the effect of
        // a merge.
        if (vertexCountA + vertexCountB - 2 > maxVerticesPerPolygon)
            return;
        // Check if the polygons share an edge.
        for (var indexA = 0; indexA < vertexCountA; indexA++) {
            // Get the vertex indices for the polygonA edge
            var vertexA = polygonA[indexA];
            var nextVertexA = polygonA[(indexA + 1) % vertexCountA];
            // Search polygonB for matches.
            for (var indexB = 0; indexB < vertexCountB; indexB++) {
                // Get the vertex indices for the polygonB edge.
                var vertexB = polygonB[indexB];
                var nextVertexB = polygonB[(indexB + 1) % vertexCountB];
                // === can be used because vertices comme from the same concave polygon.
                if (vertexA === nextVertexB && nextVertexA === vertexB) {
                    // The vertex indices for this edge are the same and
                    // sequenced in opposite order. So the edge is shared.
                    outResult.polygonAVertexIndex = indexA;
                    outResult.polygonBVertexIndex = indexB;
                }
            }
        }
        if (outResult.polygonAVertexIndex === -1)
            // No common edge, cannot merge.
            return;
        // Check to see if the merged polygon would be convex.
        //
        // Gets the vertices near the section where the merge would occur.
        // Do they form a concave section?  If so, the merge is invalid.
        //
        // Note that the following algorithm is only valid for clockwise
        // wrapped convex polygons.
        var sharedVertMinus = polygonA[(outResult.polygonAVertexIndex - 1 + vertexCountA) % vertexCountA];
        var sharedVert = polygonA[outResult.polygonAVertexIndex];
        var sharedVertPlus = polygonB[(outResult.polygonBVertexIndex + 2) % vertexCountB];
        if (!ConvexPolygonGenerator.isLeft(sharedVert.x, sharedVert.y, sharedVertMinus.x, sharedVertMinus.y, sharedVertPlus.x, sharedVertPlus.y)) {
            // The shared vertex (center) is not to the left of segment
            // vertMinus->vertPlus. For a clockwise wrapped polygon, this
            // indicates a concave section. Merged polygon would be concave.
            // Invalid merge.
            return;
        }
        sharedVertMinus =
            polygonB[(outResult.polygonBVertexIndex - 1 + vertexCountB) % vertexCountB];
        sharedVert = polygonB[outResult.polygonBVertexIndex];
        sharedVertPlus =
            polygonA[(outResult.polygonAVertexIndex + 2) % vertexCountA];
        if (!ConvexPolygonGenerator.isLeft(sharedVert.x, sharedVert.y, sharedVertMinus.x, sharedVertMinus.y, sharedVertPlus.x, sharedVertPlus.y)) {
            // The shared vertex (center) is not to the left of segment
            // vertMinus->vertPlus. For a clockwise wrapped polygon, this
            // indicates a concave section. Merged polygon would be concave.
            // Invalid merge.
            return;
        }
        // Get the vertex indices that form the shared edge.
        sharedVertMinus = polygonA[outResult.polygonAVertexIndex];
        sharedVert = polygonA[(outResult.polygonAVertexIndex + 1) % vertexCountA];
        // Store the lengthSq of the shared edge.
        var deltaX = sharedVertMinus.x - sharedVert.x;
        var deltaZ = sharedVertMinus.y - sharedVert.y;
        outResult.lengthSq = deltaX * deltaX + deltaZ * deltaZ;
    };
    /**
     * Attempts to triangulate a polygon.
     *
     * @param vertices the polygon to be triangulate.
     * The content is manipulated during the operation
     * and it will be left in an undefined state at the end of
     * the operation.
     * @param vertexFlags only used internally
     * @param outTriangles is called for each triangle derived
     * from the original polygon.
     * @return The number of triangles generated. Or, if triangulation
     * failed, a negative number.
     */
    ConvexPolygonGenerator.prototype.triangulate = function (vertices, vertexFlags, outTriangles) {
        // Terminology, concepts and such:
        //
        // This algorithm loops around the edges of a polygon looking for
        // new internal edges to add that will partition the polygon into a
        // new valid triangle internal to the starting polygon. During each
        // iteration the shortest potential new edge is selected to form that
        // iteration's new triangle.
        //
        // Triangles will only be formed if a single new edge will create
        // a triangle. Two new edges will never be added during a single
        // iteration. This means that the triangulated portions of the
        // original polygon will only contain triangles and the only
        // non-triangle polygon will exist in the untriangulated portion
        // of the original polygon.
        //
        // "Partition edge" refers to a potential new edge that will form a
        // new valid triangle.
        //
        // "Center" vertex refers to the vertex in a potential new triangle
        // which, if the triangle is formed, will be external to the
        // remaining untriangulated portion of the polygon. Since it
        // is now external to the polygon, it can't be used to form any
        // new triangles.
        //
        // Some documentation refers to "iPlus2" even though the variable is
        // not in scope or does not exist for that section of code. For
        // documentation purposes, iPlus2 refers to the 2nd vertex after the
        // primary vertex.
        // E.g.: i, iPlus1, and iPlus2.
        //
        // Visualizations: http://www.critterai.org/projects/nmgen_study/polygen.html#triangulation
        // Loop through all vertices, flagging all indices that represent
        // a center vertex of a valid new triangle.
        vertexFlags.length = vertices.length;
        for (var i = 0; i < vertices.length; i++) {
            var iPlus1 = (i + 1) % vertices.length;
            var iPlus2 = (i + 2) % vertices.length;
            // A triangle formed by i, iPlus1, and iPlus2 will result
            // in a valid internal triangle.
            // Flag the center vertex (iPlus1) to indicate a valid triangle
            // location.
            vertexFlags[iPlus1] = ConvexPolygonGenerator.isValidPartition(i, iPlus2, vertices);
        }
        // Loop through the vertices creating triangles. When there is only a
        // single triangle left,  the operation is complete.
        //
        // When a valid triangle is formed, remove its center vertex. So for
        // each loop, a single vertex will be removed.
        //
        // At the start of each iteration the indices list is in the following
        // state:
        // - Represents a simple polygon representing the un-triangulated
        //   portion of the original polygon.
        // - All valid center vertices are flagged.
        while (vertices.length > 3) {
            // Find the shortest new valid edge.
            // NOTE: i and iPlus1 are defined in two different scopes in
            // this section. So be careful.
            // Loop through all indices in the remaining polygon.
            var minLengthSq = Number.MAX_VALUE;
            var minLengthSqVertexIndex = -1;
            for (var i_1 = 0; i_1 < vertices.length; i_1++) {
                if (vertexFlags[(i_1 + 1) % vertices.length]) {
                    // Indices i, iPlus1, and iPlus2 are known to form a
                    // valid triangle.
                    var vert = vertices[i_1];
                    var vertPlus2 = vertices[(i_1 + 2) % vertices.length];
                    // Determine the length of the partition edge.
                    // (i -> iPlus2)
                    var deltaX = vertPlus2.x - vert.x;
                    var deltaY = vertPlus2.y - vert.y;
                    var lengthSq = deltaX * deltaX + deltaY * deltaY;
                    if (lengthSq < minLengthSq) {
                        minLengthSq = lengthSq;
                        minLengthSqVertexIndex = i_1;
                    }
                }
            }
            if (minLengthSqVertexIndex === -1)
                // Could not find a new triangle. Triangulation failed.
                // This happens if there are three or more vertices
                // left, but none of them are flagged as being a
                // potential center vertex.
                return;
            var i = minLengthSqVertexIndex;
            var iPlus1 = (i + 1) % vertices.length;
            // Add the new triangle to the output.
            outTriangles(vertices[i], vertices[iPlus1], vertices[(i + 2) % vertices.length]);
            // iPlus1, the "center" vert in the new triangle, is now external
            // to the untriangulated portion of the polygon. Remove it from
            // the vertices list since it cannot be a member of any new
            // triangles.
            vertices.splice(iPlus1, 1);
            vertexFlags.splice(iPlus1, 1);
            if (iPlus1 === 0 || iPlus1 >= vertices.length) {
                // The vertex removal has invalidated iPlus1 and/or i. So
                // force a wrap, fixing the indices so they reference the
                // correct indices again. This only occurs when the new
                // triangle is formed across the wrap location of the polygon.
                // Case 1: i = 14, iPlus1 = 15, iPlus2 = 0
                // Case 2: i = 15, iPlus1 = 0, iPlus2 = 1;
                i = vertices.length - 1;
                iPlus1 = 0;
            }
            // At this point i and iPlus1 refer to the two indices from a
            // successful triangulation that will be part of another new
            // triangle. We now need to re-check these indices to see if they
            // can now be the center index in a potential new partition.
            vertexFlags[i] = ConvexPolygonGenerator.isValidPartition((i - 1 + vertices.length) % vertices.length, iPlus1, vertices);
            vertexFlags[iPlus1] = ConvexPolygonGenerator.isValidPartition(i, (i + 2) % vertices.length, vertices);
        }
        // Only 3 vertices remain.
        // Add their triangle to the output list.
        outTriangles(vertices[0], vertices[1], vertices[2]);
    };
    /**
     * Check if the line segment formed by vertex A and vertex B will
     * form a valid partition of the polygon.
     *
     * I.e. the line segment AB is internal to the polygon and will not
     * cross existing line segments.
     *
     * Assumptions:
     * - The vertices arguments define a valid simple polygon
     * with vertices wrapped clockwise.
     * - indexA != indexB
     *
     * Behavior is undefined if the arguments to not meet these
     * assumptions
     *
     * @param indexA the index of the vertex that will form the segment AB.
     * @param indexB the index of the vertex that will form the segment AB.
     * @param vertices a polygon wrapped clockwise.
     * @return true if the line segment formed by vertex A and vertex B will
     * form a valid partition of the polygon.
     */
    ConvexPolygonGenerator.isValidPartition = function (indexA, indexB, vertices) {
        //  First check whether the segment AB lies within the internal
        //  angle formed at A (this is the faster check).
        //  If it does, then perform the more costly check.
        return (ConvexPolygonGenerator.liesWithinInternalAngle(indexA, indexB, vertices) &&
            !ConvexPolygonGenerator.hasIllegalEdgeIntersection(indexA, indexB, vertices));
    };
    /**
     * Check if vertex B lies within the internal angle of the polygon
     * at vertex A.
     *
     * Vertex B does not have to be within the polygon border. It just has
     * be be within the area encompassed by the internal angle formed at
     * vertex A.
     *
     * This operation is a fast way of determining whether a line segment
     * can possibly form a valid polygon partition. If this test returns
     * FALSE, then more expensive checks can be skipped.
     *
     * Visualizations: http://www.critterai.org/projects/nmgen_study/polygen.html#anglecheck
     *
     * Special case:
     * FALSE is returned if vertex B lies directly on either of the rays
     * cast from vertex A along its associated polygon edges. So the test
     * on vertex B is exclusive of the polygon edges.
     *
     * Assumptions:
     * - The vertices and indices arguments define a valid simple polygon
     * with vertices wrapped clockwise.
     * -indexA != indexB
     *
     * Behavior is undefined if the arguments to not meet these
     * assumptions
     *
     * @param indexA the index of the vertex that will form the segment AB.
     * @param indexB the index of the vertex that will form the segment AB.
     * @param vertices a polygon wrapped clockwise.
     * @return true if vertex B lies within the internal angle of
     * the polygon at vertex A.
     */
    ConvexPolygonGenerator.liesWithinInternalAngle = function (indexA, indexB, vertices) {
        // Get pointers to the main vertices being tested.
        var vertexA = vertices[indexA];
        var vertexB = vertices[indexB];
        // Get pointers to the vertices just before and just after vertA.
        var vertexAMinus = vertices[(indexA - 1 + vertices.length) % vertices.length];
        var vertexAPlus = vertices[(indexA + 1) % vertices.length];
        // First, find which of the two angles formed by the line segments
        //  AMinus->A->APlus is internal to (pointing towards) the polygon.
        // Then test to see if B lies within the area formed by that angle.
        // TRUE if A is left of or on line AMinus->APlus
        if (ConvexPolygonGenerator.isLeftOrCollinear(vertexA.x, vertexA.y, vertexAMinus.x, vertexAMinus.y, vertexAPlus.x, vertexAPlus.y))
            // The angle internal to the polygon is <= 180 degrees
            // (non-reflex angle).
            // Test to see if B lies within this angle.
            return (ConvexPolygonGenerator.isLeft(
            // TRUE if B is left of line A->AMinus
            vertexB.x, vertexB.y, vertexA.x, vertexA.y, vertexAMinus.x, vertexAMinus.y) &&
                // TRUE if B is right of line A->APlus
                ConvexPolygonGenerator.isRight(vertexB.x, vertexB.y, vertexA.x, vertexA.y, vertexAPlus.x, vertexAPlus.y));
        // The angle internal to the polygon is > 180 degrees (reflex angle).
        // Test to see if B lies within the external (<= 180 degree) angle and
        // flip the result. (If B lies within the external angle, it can't
        // lie within the internal angle)
        return !(
        // TRUE if B is left of or on line A->APlus
        (ConvexPolygonGenerator.isLeftOrCollinear(vertexB.x, vertexB.y, vertexA.x, vertexA.y, vertexAPlus.x, vertexAPlus.y) &&
            // TRUE if B is right of or on line A->AMinus
            ConvexPolygonGenerator.isRightOrCollinear(vertexB.x, vertexB.y, vertexA.x, vertexA.y, vertexAMinus.x, vertexAMinus.y)));
    };
    /**
     * Check if the line segment AB intersects any edges not already
     * connected to one of the two vertices.
     *
     * Assumptions:
     * - The vertices and indices arguments define a valid simple polygon
     * with vertices wrapped clockwise.
     * - indexA != indexB
     *
     * Behavior is undefined if the arguments to not meet these
     * assumptions
     *
     * @param indexA the index of the vertex that will form the segment AB.
     * @param indexB the index of the vertex that will form the segment AB.
     * @param vertices a polygon wrapped clockwise.
     * @return true if the line segment AB intersects any edges not already
     * connected to one of the two vertices.
     */
    ConvexPolygonGenerator.hasIllegalEdgeIntersection = function (indexA, indexB, vertices) {
        // Get pointers to the primary vertices being tested.
        var vertexA = vertices[indexA];
        var vertexB = vertices[indexB];
        // Loop through the polygon edges.
        for (var edgeBeginIndex = 0; edgeBeginIndex < vertices.length; edgeBeginIndex++) {
            var edgeEndIndex = (edgeBeginIndex + 1) % vertices.length;
            if (edgeBeginIndex === indexA ||
                edgeBeginIndex === indexB ||
                edgeEndIndex === indexA ||
                edgeEndIndex === indexB) {
                continue;
            }
            // Neither of the test indices are endpoints of this edge.
            // Get this edge's vertices.
            var edgeBegin = vertices[edgeBeginIndex];
            var edgeEnd = vertices[edgeEndIndex];
            if ((edgeBegin.x === vertexA.x && edgeBegin.y === vertexA.y) ||
                (edgeBegin.x === vertexB.x && edgeBegin.y === vertexB.y) ||
                (edgeEnd.x === vertexA.x && edgeEnd.y === vertexA.y) ||
                (edgeEnd.x === vertexB.x && edgeEnd.y === vertexB.y)) {
                // One of the test vertices is co-located
                // with one of the endpoints of this edge (this is a
                // test of the actual position of the vertices rather than
                // simply the index check performed earlier).
                // Skip this edge.
                continue;
            }
            // This edge is not connected to either of the test vertices.
            // If line segment AB intersects  with this edge, then the
            // intersection is illegal.
            // I.e. New edges cannot cross existing edges.
            if (Geometry.segmentsIntersect(vertexA.x, vertexA.y, vertexB.x, vertexB.y, edgeBegin.x, edgeBegin.y, edgeEnd.x, edgeEnd.y)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if point P is to the left of line AB when looking
     * from A to B.
     * @param px The x-value of the point to test.
     * @param py The y-value of the point to test.
     * @param ax The x-value of the point (ax, ay) that is point A on line AB.
     * @param ay The y-value of the point (ax, ay) that is point A on line AB.
     * @param bx The x-value of the point (bx, by) that is point B on line AB.
     * @param by The y-value of the point (bx, by) that is point B on line AB.
     * @return TRUE if point P is to the left of line AB when looking
     * from A to B.
     */
    ConvexPolygonGenerator.isLeft = function (px, py, ax, ay, bx, by) {
        return ConvexPolygonGenerator.getSignedAreaX2(ax, ay, px, py, bx, by) < 0;
    };
    /**
     * Check if point P is to the left of line AB when looking
     * from A to B or is collinear with line AB.
     * @param px The x-value of the point to test.
     * @param py The y-value of the point to test.
     * @param ax The x-value of the point (ax, ay) that is point A on line AB.
     * @param ay The y-value of the point (ax, ay) that is point A on line AB.
     * @param bx The x-value of the point (bx, by) that is point B on line AB.
     * @param by The y-value of the point (bx, by) that is point B on line AB.
     * @return TRUE if point P is to the left of line AB when looking
     * from A to B, or is collinear with line AB.
     */
    ConvexPolygonGenerator.isLeftOrCollinear = function (px, py, ax, ay, bx, by) {
        return ConvexPolygonGenerator.getSignedAreaX2(ax, ay, px, py, bx, by) <= 0;
    };
    /**
     * Check if point P is to the right of line AB when looking
     * from A to B.
     * @param px The x-value of the point to test.
     * @param py The y-value of the point to test.
     * @param ax The x-value of the point (ax, ay) that is point A on line AB.
     * @param ay The y-value of the point (ax, ay) that is point A on line AB.
     * @param bx The x-value of the point (bx, by) that is point B on line AB.
     * @param by The y-value of the point (bx, by) that is point B on line AB.
     * @return TRUE if point P is to the right of line AB when looking
     * from A to B.
     */
    ConvexPolygonGenerator.isRight = function (px, py, ax, ay, bx, by) {
        return ConvexPolygonGenerator.getSignedAreaX2(ax, ay, px, py, bx, by) > 0;
    };
    /**
     * Check if point P is to the right of or on line AB when looking
     * from A to B.
     * @param px The x-value of the point to test.
     * @param py The y-value of the point to test.
     * @param ax The x-value of the point (ax, ay) that is point A on line AB.
     * @param ay The y-value of the point (ax, ay) that is point A on line AB.
     * @param bx The x-value of the point (bx, by) that is point B on line AB.
     * @param by The y-value of the point (bx, by) that is point B on line AB.
     * @return TRUE if point P is to the right of or on line AB when looking
     * from A to B.
     */
    ConvexPolygonGenerator.isRightOrCollinear = function (px, py, ax, ay, bx, by) {
        return ConvexPolygonGenerator.getSignedAreaX2(ax, ay, px, py, bx, by) >= 0;
    };
    /**
     * The absolute value of the returned value is two times the area of the
     * triangle defined by points (A, B, C).
     *
     * A positive value indicates:
     * - Counterclockwise wrapping of the points.
     * - Point B lies to the right of line AC, looking from A to C.
     *
     * A negative value indicates:
     * - Clockwise wrapping of the points.<
     * - Point B lies to the left of line AC, looking from A to C.
     *
     * A value of zero indicates that all points are collinear or
     * represent the same point.
     *
     * This is a fast operation.
     *
     * @param ax The x-value for point (ax, ay) for vertex A of the triangle.
     * @param ay The y-value for point (ax, ay) for vertex A of the triangle.
     * @param bx The x-value for point (bx, by) for vertex B of the triangle.
     * @param by The y-value for point (bx, by) for vertex B of the triangle.
     * @param cx The x-value for point (cx, cy) for vertex C of the triangle.
     * @param cy The y-value for point (cx, cy) for vertex C of the triangle.
     * @return The signed value of two times the area of the triangle defined
     * by the points (A, B, C).
     */
    ConvexPolygonGenerator.getSignedAreaX2 = function (ax, ay, bx, by, cx, cy) {
        // References:
        // http://softsurfer.com/Archive/algorithm_0101/algorithm_0101.htm#Modern%20Triangles
        // http://mathworld.wolfram.com/TriangleArea.html (Search for "signed")
        return (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);
    };
    return ConvexPolygonGenerator;
}());

var GridCoordinateConverter = /** @class */ (function () {
    function GridCoordinateConverter() {
    }
    /**
     *
     * @param gridPosition the position on the grid
     * @param position the position on the scene
     * @param scaleY for isometry
     * @returns the position on the scene
     */
    GridCoordinateConverter.prototype.convertFromGridBasis = function (grid, polygons) {
        // point can be shared so them must be copied to be scaled.
        return polygons.map(function (polygon) {
            return polygon.map(function (point) { return grid.convertFromGridBasis(point, { x: 0, y: 0 }); });
        });
    };
    return GridCoordinateConverter;
}());

/**
 * It rasterizes obstacles on a grid.
 *
 * It flags cells as obstacle to be used by {@link RegionGenerator}.
 */
var ObstacleRasterizer = /** @class */ (function () {
    function ObstacleRasterizer() {
        this.workingNodes = new Array(8);
        this.gridBasisIterable = new GridBasisIterable();
    }
    /**
     * Rasterize obstacles on a grid.
     * @param grid
     * @param obstacles
     */
    ObstacleRasterizer.prototype.rasterizeObstacles = function (grid, obstacles) {
        var obstaclesItr = obstacles[Symbol.iterator]();
        for (var next = obstaclesItr.next(); !next.done; next = obstaclesItr.next()) {
            var obstacle = next.value;
            this.gridBasisIterable.set(grid, obstacle);
            var vertices = this.gridBasisIterable;
            var minX = Number.MAX_VALUE;
            var maxX = -Number.MAX_VALUE;
            var minY = Number.MAX_VALUE;
            var maxY = -Number.MAX_VALUE;
            var verticesItr = vertices[Symbol.iterator]();
            for (var next_1 = verticesItr.next(); !next_1.done; next_1 = verticesItr.next()) {
                var vertex = next_1.value;
                minX = Math.min(minX, vertex.x);
                maxX = Math.max(maxX, vertex.x);
                minY = Math.min(minY, vertex.y);
                maxY = Math.max(maxY, vertex.y);
            }
            minX = Math.max(Math.floor(minX), 0);
            maxX = Math.min(Math.ceil(maxX), grid.dimX());
            minY = Math.max(Math.floor(minY), 0);
            maxY = Math.min(Math.ceil(maxY), grid.dimY());
            this.fillPolygon(vertices, minX, maxX, minY, maxY, function (x, y) { return (grid.get(x, y).distanceToObstacle = 0); });
        }
    };
    ObstacleRasterizer.prototype.fillPolygon = function (vertices, minX, maxX, minY, maxY, fill) {
        // The following implementation of the scan-line polygon fill algorithm
        // is strongly inspired from:
        // https://alienryderflex.com/polygon_fill/
        // The original implementation was under this license:
        // public-domain code by Darel Rex Finley, 2007
        // This implementation differ with the following:
        // - it handles float vertices
        //   so it focus on pixels center
        // - it is conservative to thin vertical or horizontal polygons
        var fillAnyPixels = false;
        this.scanY(vertices, minX, maxX, minY, maxY, function (pixelY, minX, maxX) {
            for (var pixelX = minX; pixelX < maxX; pixelX++) {
                fillAnyPixels = true;
                fill(pixelX, pixelY);
            }
        });
        if (fillAnyPixels) {
            return;
        }
        this.scanY(vertices, minX, maxX, minY, maxY, function (pixelY, minX, maxX) {
            // conserve thin (less than one cell large) horizontal polygons
            if (minX === maxX) {
                fill(minX, pixelY);
            }
        });
        this.scanX(vertices, minX, maxX, minY, maxY, function (pixelX, minY, maxY) {
            for (var pixelY = minY; pixelY < maxY; pixelY++) {
                fill(pixelX, pixelY);
            }
            // conserve thin (less than one cell large) vertical polygons
            if (minY === maxY) {
                fill(pixelX, minY);
            }
        });
    };
    ObstacleRasterizer.prototype.scanY = function (vertices, minX, maxX, minY, maxY, checkAndFillY) {
        var workingNodes = this.workingNodes;
        //  Loop through the rows of the image.
        for (var pixelY = minY; pixelY < maxY; pixelY++) {
            var pixelCenterY = pixelY + 0.5;
            //  Build a list of nodes.
            workingNodes.length = 0;
            //let j = vertices.length - 1;
            var verticesItr = vertices[Symbol.iterator]();
            var next = verticesItr.next();
            var vertex = next.value;
            // The iterator always return the same instance.
            // It must be copied to be save for later.
            var firstVertexX = vertex.x;
            var firstVertexY = vertex.y;
            while (!next.done) {
                var previousVertexX = vertex.x;
                var previousVertexY = vertex.y;
                next = verticesItr.next();
                if (next.done) {
                    vertex.x = firstVertexX;
                    vertex.y = firstVertexY;
                }
                else {
                    vertex = next.value;
                }
                if ((vertex.y <= pixelCenterY && pixelCenterY < previousVertexY) ||
                    (previousVertexY < pixelCenterY && pixelCenterY <= vertex.y)) {
                    workingNodes.push(Math.round(vertex.x +
                        ((pixelCenterY - vertex.y) / (previousVertexY - vertex.y)) *
                            (previousVertexX - vertex.x)));
                }
            }
            //  Sort the nodes, via a simple “Bubble” sort.
            {
                var i = 0;
                while (i < workingNodes.length - 1) {
                    if (workingNodes[i] > workingNodes[i + 1]) {
                        var swap = workingNodes[i];
                        workingNodes[i] = workingNodes[i + 1];
                        workingNodes[i + 1] = swap;
                        if (i > 0)
                            i--;
                    }
                    else {
                        i++;
                    }
                }
            }
            //  Fill the pixels between node pairs.
            for (var i = 0; i < workingNodes.length; i += 2) {
                if (workingNodes[i] >= maxX) {
                    break;
                }
                if (workingNodes[i + 1] <= minX) {
                    continue;
                }
                if (workingNodes[i] < minX) {
                    workingNodes[i] = minX;
                }
                if (workingNodes[i + 1] > maxX) {
                    workingNodes[i + 1] = maxX;
                }
                checkAndFillY(pixelY, workingNodes[i], workingNodes[i + 1]);
            }
        }
    };
    ObstacleRasterizer.prototype.scanX = function (vertices, minX, maxX, minY, maxY, checkAndFillX) {
        var workingNodes = this.workingNodes;
        //  Loop through the columns of the image.
        for (var pixelX = minX; pixelX < maxX; pixelX++) {
            var pixelCenterX = pixelX + 0.5;
            //  Build a list of nodes.
            workingNodes.length = 0;
            var verticesItr = vertices[Symbol.iterator]();
            var next = verticesItr.next();
            var vertex = next.value;
            // The iterator always return the same instance.
            // It must be copied to be save for later.
            var firstVertexX = vertex.x;
            var firstVertexY = vertex.y;
            while (!next.done) {
                var previousVertexX = vertex.x;
                var previousVertexY = vertex.y;
                next = verticesItr.next();
                if (next.done) {
                    vertex.x = firstVertexX;
                    vertex.y = firstVertexY;
                }
                else {
                    vertex = next.value;
                }
                if ((vertex.x < pixelCenterX && pixelCenterX < previousVertexX) ||
                    (previousVertexX < pixelCenterX && pixelCenterX < vertex.x)) {
                    workingNodes.push(Math.round(vertex.y +
                        ((pixelCenterX - vertex.x) / (previousVertexX - vertex.x)) *
                            (previousVertexY - vertex.y)));
                }
            }
            //  Sort the nodes, via a simple “Bubble” sort.
            {
                var i = 0;
                while (i < workingNodes.length - 1) {
                    if (workingNodes[i] > workingNodes[i + 1]) {
                        var swap = workingNodes[i];
                        workingNodes[i] = workingNodes[i + 1];
                        workingNodes[i + 1] = swap;
                        if (i > 0)
                            i--;
                    }
                    else {
                        i++;
                    }
                }
            }
            //  Fill the pixels between node pairs.
            for (var i = 0; i < workingNodes.length; i += 2) {
                if (workingNodes[i] >= maxY) {
                    break;
                }
                if (workingNodes[i + 1] <= minY) {
                    continue;
                }
                if (workingNodes[i] < minY) {
                    workingNodes[i] = minY;
                }
                if (workingNodes[i + 1] > maxY) {
                    workingNodes[i + 1] = maxY;
                }
                checkAndFillX(pixelX, workingNodes[i], workingNodes[i + 1]);
            }
        }
    };
    return ObstacleRasterizer;
}());
/**
 * Iterable that converts coordinates to the grid.
 *
 * This is an allocation free iterable
 * that can only do one iteration at a time.
 */
var GridBasisIterable = /** @class */ (function () {
    function GridBasisIterable() {
        this.grid = null;
        this.sceneVertices = [];
        this.verticesItr = this.sceneVertices[Symbol.iterator]();
        this.result = {
            value: { x: 0, y: 0 },
            done: false,
        };
    }
    GridBasisIterable.prototype.set = function (grid, sceneVertices) {
        this.grid = grid;
        this.sceneVertices = sceneVertices;
    };
    GridBasisIterable.prototype[Symbol.iterator] = function () {
        this.verticesItr = this.sceneVertices[Symbol.iterator]();
        return this;
    };
    GridBasisIterable.prototype.next = function () {
        var next = this.verticesItr.next();
        if (next.done) {
            return next;
        }
        this.grid.convertToGridBasis(next.value, this.result.value);
        return this.result;
    };
    return GridBasisIterable;
}());

/**
 * Build cohesive regions from the non-obstacle space. It uses the data
 * from the obstacles rasterization {@link ObstacleRasterizer}.
 *
 * This implementation is strongly inspired from CritterAI class "OpenHeightfieldBuilder".
 *
 * Introduction to Height Fields: http://www.critterai.org/projects/nmgen_study/heightfields.html
 *
 * Region Generation: http://www.critterai.org/projects/nmgen_study/regiongen.html
 */
var RegionGenerator = /** @class */ (function () {
    function RegionGenerator() {
        this.obstacleRegionBordersCleaner = new ObstacleRegionBordersCleaner();
        this.floodedCells = new Array(1024);
        this.workingStack = new Array(1024);
    }
    //TODO implement the smoothing pass on the distance field?
    /**
     * Groups cells into cohesive regions using an watershed based algorithm.
     *
     * This operation depends on neighbor and distance field information.
     * So {@link RegionGenerator.generateDistanceField} operations must be
     * run before this operation.
     *
     * @param grid A field with cell distance information fully generated.
     * @param obstacleCellPadding a padding in cells to apply around the
     * obstacles.
     */
    RegionGenerator.prototype.generateRegions = function (grid, obstacleCellPadding) {
        // Watershed Algorithm
        //
        // Reference: http://en.wikipedia.org/wiki/Watershed_%28algorithm%29
        // A good visualization:
        // http://artis.imag.fr/Publications/2003/HDS03/ (PDF)
        //
        // Summary:
        //
        // This algorithm utilizes the cell.distanceToObstacle value, which
        // is generated by the generateDistanceField() operation.
        //
        // Using the watershed analogy, the cells which are furthest from
        // a border (highest distance to border) represent the lowest points
        // in the watershed. A border cell represents the highest possible
        // water level.
        //
        // The main loop iterates, starting at the lowest point in the
        // watershed, then incrementing with each loop until the highest
        // allowed water level is reached. This slowly "floods" the cells
        // starting at the lowest points.
        //
        // During each iteration of the loop, cells that are below the
        // current water level are located and an attempt is made to either
        // add them to exiting regions or create new regions from them.
        //
        // During the region expansion phase, if a newly flooded cell
        // borders on an existing region, it is usually added to the region.
        //
        // Any newly flooded cell that survives the region expansion phase
        // is used as a seed for a new region.
        //
        // At the end of the main loop, a final region expansion is
        // performed which should catch any stray cells that escaped region
        // assignment during the main loop.
        // Represents the minimum distance to an obstacle that is considered
        // traversable. I.e. Can't traverse cells closer than this distance
        // to a border. This provides a way of artificially capping the
        // height to which watershed flooding can occur.
        // I.e. Don't let the algorithm flood all the way to the actual border.
        //
        // We add the minimum border distance to take into account the
        // blurring algorithm which can result in a border cell having a
        // border distance > 0.
        var distanceMin = obstacleCellPadding * 2;
        // TODO: EVAL: Figure out why this iteration limit is needed
        // (todo from the CritterAI sources).
        var expandIterations = 4 + distanceMin * 2;
        // Zero is reserved for the obstacle-region. So initializing to 1.
        var nextRegionID = 1;
        var floodedCells = this.floodedCells;
        // Search until the current distance reaches the minimum allowed
        // distance.
        //
        // Note: This loop will not necessarily complete all region
        // assignments. This is OK since a final region assignment step
        // occurs after the loop iteration is complete.
        for (
        // This value represents the current distance from the border which
        // is to be searched. The search starts at the maximum distance then
        // moves toward zero (toward borders).
        //
        // This number will always be divisible by 2.
        var distance = grid.obstacleDistanceMax() & ~1; distance > distanceMin; distance = Math.max(distance - 2, 0)) {
            // Find all cells that are at or below the current "water level"
            // and are not already assigned to a region. Add these cells to
            // the flooded cell list for processing.
            floodedCells.length = 0;
            for (var y = 1; y < grid.dimY() - 1; y++) {
                for (var x = 1; x < grid.dimX() - 1; x++) {
                    var cell = grid.get(x, y);
                    if (cell.regionID === RasterizationCell.NULL_REGION_ID &&
                        cell.distanceToObstacle >= distance) {
                        // The cell is not already assigned a region and is
                        // below the current "water level". So the cell can be
                        // considered for region assignment.
                        floodedCells.push(cell);
                    }
                }
            }
            if (nextRegionID > 1) {
                // At least one region has already been created, so first
                // try to  put the newly flooded cells into existing regions.
                if (distance > 0) {
                    this.expandRegions(grid, floodedCells, expandIterations);
                }
                else {
                    this.expandRegions(grid, floodedCells, -1);
                }
            }
            // Create new regions for all cells that could not be added to
            // existing regions.
            for (var _i = 0, floodedCells_1 = floodedCells; _i < floodedCells_1.length; _i++) {
                var floodedCell = floodedCells_1[_i];
                if (!floodedCell ||
                    floodedCell.regionID !== RasterizationCell.NULL_REGION_ID) {
                    // This cell was assigned to a newly created region
                    // during an earlier iteration of this loop.
                    // So it can be skipped.
                    continue;
                }
                // Fill to slightly more than the current "water level".
                // This improves efficiency of the algorithm.
                // And it is necessary with the conservative expansion to ensure that
                // more than one cell is added initially to a new regions otherwise
                // no cell could be added to it later because of the conservative
                // constraint.
                var fillTo = Math.max(distance - 2, distanceMin + 1, 1);
                if (this.floodNewRegion(grid, floodedCell, fillTo, nextRegionID)) {
                    nextRegionID++;
                }
            }
        }
        // Find all cells that haven't been assigned regions by the main loop
        // (up to the minimum distance).
        floodedCells.length = 0;
        for (var y = 1; y < grid.dimY() - 1; y++) {
            for (var x = 1; x < grid.dimX() - 1; x++) {
                var cell = grid.get(x, y);
                if (cell.distanceToObstacle > distanceMin &&
                    cell.regionID === RasterizationCell.NULL_REGION_ID) {
                    // Not a border or obstacle region cell. Should be in a region.
                    floodedCells.push(cell);
                }
            }
        }
        // Perform a final expansion of existing regions.
        // Allow more iterations than normal for this last expansion.
        if (distanceMin > 0) {
            this.expandRegions(grid, floodedCells, expandIterations * 8);
        }
        else {
            this.expandRegions(grid, floodedCells, -1);
        }
        grid.regionCount = nextRegionID;
        this.obstacleRegionBordersCleaner.fixObstacleRegion(grid);
        //TODO Also port FilterOutSmallRegions?
        // The algorithm to remove vertices in the middle (added at the end of
        // ContourBuilder.buildContours) may already filter them and contour are
        // faster to process than cells.
    };
    /**
     * Attempts to find the most appropriate regions to attach cells to.
     *
     * Any cells successfully attached to a region will have their list
     * entry set to null. So any non-null entries in the list will be cells
     * for which a region could not be determined.
     *
     * @param grid
     * @param inoutCells As input, the list of cells available for formation
     * of new regions. As output, the cells that could not be assigned
     * to new regions.
     * @param maxIterations If set to -1, will iterate through completion.
     */
    RegionGenerator.prototype.expandRegions = function (grid, inoutCells, iterationMax) {
        if (inoutCells.length === 0)
            return;
        var skipped = 0;
        for (var iteration = 0; (iteration < iterationMax || iterationMax === -1) &&
            // All cells have either been processed or could not be
            // processed during the last cycle.
            skipped < inoutCells.length; iteration++) {
            // The number of cells in the working list that have been
            // successfully processed or could not be processed successfully
            // for some reason.
            // This value controls when iteration ends.
            skipped = 0;
            for (var index = 0; index < inoutCells.length; index++) {
                var cell = inoutCells[index];
                if (cell === null) {
                    // The cell originally at this index location has
                    // already been successfully assigned a region. Nothing
                    // else to do with it.
                    skipped++;
                    continue;
                }
                // Default to unassigned.
                var cellRegion = RasterizationCell.NULL_REGION_ID;
                var regionCenterDist = Number.MAX_VALUE;
                for (var _i = 0, _a = RasterizationGrid.neighbor4Deltas; _i < _a.length; _i++) {
                    var delta = _a[_i];
                    var neighbor = grid.get(cell.x + delta.x, cell.y + delta.y);
                    if (neighbor.regionID !== RasterizationCell.NULL_REGION_ID) {
                        if (neighbor.distanceToRegionCore + 2 < regionCenterDist) {
                            // This neighbor is closer to its region core
                            // than previously detected neighbors.
                            // Conservative expansion constraint:
                            // Check to ensure that this neighbor has
                            // at least two other neighbors in its region.
                            // This makes sure that adding this cell to
                            // this neighbor's  region will not result
                            // in a single width line of cells.
                            var sameRegionCount = 0;
                            for (var neighborDirection = 0; neighborDirection < 4; neighborDirection++) {
                                var nnCell = grid.getNeighbor(neighbor, neighborDirection);
                                // There is a diagonal-neighbor
                                if (nnCell.regionID === neighbor.regionID) {
                                    // This neighbor has a neighbor in
                                    // the same region.
                                    sameRegionCount++;
                                }
                            }
                            if (sameRegionCount > 1) {
                                cellRegion = neighbor.regionID;
                                regionCenterDist = neighbor.distanceToRegionCore + 2;
                            }
                        }
                    }
                }
                if (cellRegion !== RasterizationCell.NULL_REGION_ID) {
                    // Found a suitable region for this cell to belong to.
                    // Mark this index as having been processed.
                    inoutCells[index] = null;
                    cell.regionID = cellRegion;
                    cell.distanceToRegionCore = regionCenterDist;
                }
                else {
                    // Could not find an existing region for this cell.
                    skipped++;
                }
            }
        }
    };
    /**
     * Creates a new region surrounding a cell, adding neighbor cells to the
     * new region as appropriate.
     *
     * The new region creation will fail if the root cell is on the
     * border of an existing region.
     *
     * All cells added to the new region as part of this process become
     * "core" cells with a distance to region core of zero.
     *
     * @param grid
     * @param rootCell The cell used to seed the new region.
     * @param fillToDist The watershed distance to flood to.
     * @param regionID The region ID to use for the new region
     * (if creation is successful).
     * @return true if a new region was created.
     */
    RegionGenerator.prototype.floodNewRegion = function (grid, rootCell, fillToDist, regionID) {
        var workingStack = this.workingStack;
        workingStack.length = 0;
        workingStack.push(rootCell);
        rootCell.regionID = regionID;
        rootCell.distanceToRegionCore = 0;
        var regionSize = 0;
        var cell;
        while ((cell = workingStack.pop())) {
            // Check regions of neighbor cells.
            //
            // If any neighbor is found to have a region assigned, then
            // the current cell can't be in the new region
            // (want standard flooding algorithm to handle deciding which
            // region this cell should go in).
            //
            // Up to 8 neighbors are checked.
            //
            // Neighbor searches:
            // http://www.critterai.org/projects/nmgen_study/heightfields.html#nsearch
            var isOnRegionBorder = false;
            for (var _i = 0, _a = RasterizationGrid.neighbor8Deltas; _i < _a.length; _i++) {
                var delta = _a[_i];
                var neighbor = grid.get(cell.x + delta.x, cell.y + delta.y);
                isOnRegionBorder =
                    neighbor.regionID !== RasterizationCell.NULL_REGION_ID &&
                        neighbor.regionID !== regionID;
                if (isOnRegionBorder)
                    break;
            }
            if (isOnRegionBorder) {
                cell.regionID = RasterizationCell.NULL_REGION_ID;
                continue;
            }
            regionSize++;
            // If got this far, we know the current cell is part of the new
            // region. Now check its neighbors to see if they should be
            // assigned to this new region.
            for (var _b = 0, _c = RasterizationGrid.neighbor4Deltas; _b < _c.length; _b++) {
                var delta = _c[_b];
                var neighbor = grid.get(cell.x + delta.x, cell.y + delta.y);
                if (neighbor.distanceToObstacle >= fillToDist &&
                    neighbor.regionID === RasterizationCell.NULL_REGION_ID) {
                    neighbor.regionID = regionID;
                    neighbor.distanceToRegionCore = 0;
                    workingStack.push(neighbor);
                }
            }
        }
        return regionSize > 0;
    };
    /**
     * Generates distance field information.
     * The {@link RasterizationCell.distanceToObstacle} information is generated
     * for all cells in the field.
     *
     * All distance values are relative and do not represent explicit
     * distance values (such as grid unit distance). The algorithm which is
     * used results in an approximation only. It is not exhaustive.
     *
     * The data generated by this operation is required by
     * {@link RegionGenerator.generateRegions}.
     *
     * @param grid A field with cells obstacle information already generated.
     */
    RegionGenerator.prototype.generateDistanceField = function (grid) {
        // close borders
        for (var x = 0; x < grid.dimX(); x++) {
            var leftCell = grid.get(x, 0);
            leftCell.distanceToObstacle = 0;
            var rightCell = grid.get(x, grid.dimY() - 1);
            rightCell.distanceToObstacle = 0;
        }
        for (var y = 1; y < grid.dimY() - 1; y++) {
            var topCell = grid.get(0, y);
            topCell.distanceToObstacle = 0;
            var bottomCell = grid.get(grid.dimX() - 1, y);
            bottomCell.distanceToObstacle = 0;
        }
        // The next two phases basically check the neighbors of a cell and
        // set the cell's distance field to be slightly greater than the
        // neighbor with the lowest border distance. Distance is increased
        // slightly more for diagonal-neighbors than for axis-neighbors.
        // 1st pass
        // During this pass, the following neighbors are checked:
        // (-1, 0) (-1, -1) (0, -1) (1, -1)
        for (var y = 1; y < grid.dimY() - 1; y++) {
            for (var x = 1; x < grid.dimX() - 1; x++) {
                var cell = grid.get(x, y);
                for (var _i = 0, _a = RegionGenerator.firstPassDeltas; _i < _a.length; _i++) {
                    var delta = _a[_i];
                    var distanceByNeighbor = grid.get(x + delta.x, y + delta.y).distanceToObstacle +
                        delta.distance;
                    if (cell.distanceToObstacle > distanceByNeighbor) {
                        cell.distanceToObstacle = distanceByNeighbor;
                    }
                }
            }
        }
        // 2nd pass
        // During this pass, the following neighbors are checked:
        //   (1, 0) (1, 1) (0, 1) (-1, 1)
        //
        // Besides checking different neighbors, this pass performs its
        // grid search in reverse order.
        for (var y = grid.dimY() - 2; y >= 1; y--) {
            for (var x = grid.dimX() - 2; x >= 1; x--) {
                var cell = grid.get(x, y);
                for (var _b = 0, _c = RegionGenerator.secondPassDeltas; _b < _c.length; _b++) {
                    var delta = _c[_b];
                    var distanceByNeighbor = grid.get(x + delta.x, y + delta.y).distanceToObstacle +
                        delta.distance;
                    if (cell.distanceToObstacle > distanceByNeighbor) {
                        cell.distanceToObstacle = distanceByNeighbor;
                    }
                }
            }
        }
    };
    RegionGenerator.firstPassDeltas = [
        { x: -1, y: 0, distance: 2 },
        { x: -1, y: -1, distance: 3 },
        { x: 0, y: -1, distance: 2 },
        { x: 1, y: -1, distance: 3 },
    ];
    RegionGenerator.secondPassDeltas = [
        { x: 1, y: 0, distance: 2 },
        { x: 1, y: 1, distance: 3 },
        { x: 0, y: 1, distance: 2 },
        { x: -1, y: 1, distance: 3 },
    ];
    return RegionGenerator;
}());
/**
 * Implements three algorithms that clean up issues that can
 * develop around obstacle region boarders.
 *
 * - Detect and fix encompassed obstacle regions:
 *
 * If a obstacle region is found that is fully encompassed by a single
 * region, then the region will be split into two regions at the
 * obstacle region border.
 *
 * - Detect and fix "short wrapping" of obstacle regions:
 *
 * Regions can sometimes wrap slightly around the corner of a obstacle region
 * in a manner that eventually results in the formation of self-intersecting
 * polygons.
 *
 * Example: Before the algorithm is applied:
 * http://www.critterai.org/projects/nmgen_study/media/images/ohfg_08_cornerwrapbefore.jpg"
 *
 * Example: After the algorithm is applied:
 * http://www.critterai.org/projects/nmgen_study/media/images/ohfg_09_cornerwrapafter.jpg
 *
 * - Detect and fix incomplete obstacle region connections:
 *
 * If a region touches obstacle region only diagonally, then contour detection
 * algorithms may not properly detect the obstacle region connection. This can
 * adversely effect other algorithms in the pipeline.
 *
 * Example: Before algorithm is applied:
 *
 *     b b a a a a
 *     b b a a a a
 *     a a x x x x
 *     a a x x x x
 *
 * Example: After algorithm is applied:
 *
 *     b b a a a a
 *     b b b a a a <-- Cell transferred to region B.
 *     a a x x x x
 *     a a x x x x
 *
 *
 * Region Generation: http://www.critterai.org/projects/nmgen_study/regiongen.html
 */
var ObstacleRegionBordersCleaner = /** @class */ (function () {
    function ObstacleRegionBordersCleaner() {
        this.workingUpLeftOpenCells = new Array(512);
        this.workingDownRightOpenCells = new Array(512);
        this.workingOpenCells = new Array(512);
    }
    /**
     * This operation utilizes {@link RasterizationCell.contourFlags}. It
     * expects the value to be zero on entry, and re-zero's the value
     * on exit.
     *
     * @param grid a grid with fully built regions.
     */
    ObstacleRegionBordersCleaner.prototype.fixObstacleRegion = function (grid) {
        var workingUpLeftOpenCells = this.workingUpLeftOpenCells;
        workingUpLeftOpenCells.length = 0;
        var workingDownRightOpenCells = this.workingDownRightOpenCells;
        workingDownRightOpenCells.length = 0;
        var workingOpenCells = this.workingOpenCells;
        workingOpenCells.length = 0;
        var extremeCells = [
            null,
            null,
        ];
        var nextRegionID = grid.regionCount;
        // Iterate over the cells, trying to find obstacle region borders.
        for (var y = 1; y < grid.dimY() - 1; y++) {
            for (var x = 1; x < grid.dimX() - 1; x++) {
                var cell = grid.get(x, y);
                if (cell.contourFlags !== 0)
                    // Cell was processed in a previous iteration.
                    // Ignore it.
                    continue;
                cell.contourFlags = 1;
                var workingCell = null;
                var edgeDirection = -1;
                if (cell.regionID !== RasterizationCell.OBSTACLE_REGION_ID) {
                    // Not interested in this cell.
                    continue;
                }
                // This is a obstacle region cell. See if it
                // connects to a cell in a non-obstacle region.
                edgeDirection = this.getNonNullBorderDirection(grid, cell);
                if (edgeDirection === -1)
                    // This cell is not a border cell. Ignore it.
                    continue;
                // This is a border cell. Step into the non-null
                // region and swing the direction around 180 degrees.
                workingCell = grid.getNeighbor(cell, edgeDirection);
                edgeDirection = (edgeDirection + 2) & 0x3;
                // Process the obstacle region contour. Detect and fix
                // local issues. Determine if the region is
                // fully encompassed by a single non-obstacle region.
                var isEncompassedNullRegion = this.processNullRegion(grid, workingCell, edgeDirection, extremeCells);
                if (isEncompassedNullRegion) {
                    // This cell is part of a group of obstacle region cells
                    // that is encompassed within a single non-obstacle region.
                    // This is not permitted. Need to fix it.
                    this.partialFloodRegion(grid, extremeCells[0], extremeCells[1], nextRegionID);
                    nextRegionID++;
                }
            }
        }
        grid.regionCount = nextRegionID;
        // Clear all flags.
        for (var y = 1; y < grid.dimY() - 1; y++) {
            for (var x = 1; x < grid.dimX() - 1; x++) {
                var cell = grid.get(x, y);
                cell.contourFlags = 0;
            }
        }
    };
    /**
     * Partially flood a region away from the specified direction.
     *
     * {@link RasterizationCell.contourFlags}
     * is set to zero for all flooded cells.
     *
     * @param grid
     * @param startCell The cell to start the flood from.
     * @param borderDirection  The hard border for flooding. No
     * cells in this direction from the startCell will be flooded.
     * @param newRegionID The region id to assign the flooded
     * cells to.
     */
    ObstacleRegionBordersCleaner.prototype.partialFloodRegion = function (grid, upLeftCell, downRightCell, newRegionID) {
        var upLeftOpenCells = this.workingUpLeftOpenCells;
        var downRightOpenCells = this.workingDownRightOpenCells;
        var workingOpenCells = this.workingOpenCells;
        // The implementation differs from CritterAI to avoid non-contiguous
        // sections. Instead of brushing in one direction, it floods from
        // 2 extremities of the encompassed obstacle region.
        var regionID = upLeftCell.regionID;
        if (regionID === newRegionID) {
            // avoid infinity loop
            console.error("Can't create a new region with an ID that already exist.");
            return;
        }
        // The 1st flooding set a new the regionID
        upLeftCell.regionID = newRegionID;
        upLeftCell.distanceToRegionCore = 0; // This information is lost.
        upLeftOpenCells.length = 0;
        upLeftOpenCells.push(upLeftCell);
        // The 2nd flooding keep the regionID and mark the cell as visited.
        downRightCell.contourFlags = 2;
        downRightCell.distanceToRegionCore = 0; // This information is lost.
        downRightOpenCells.length = 0;
        downRightOpenCells.push(downRightCell);
        var swap;
        workingOpenCells.length = 0;
        while (upLeftOpenCells.length !== 0 || downRightOpenCells.length !== 0) {
            for (var _i = 0, upLeftOpenCells_1 = upLeftOpenCells; _i < upLeftOpenCells_1.length; _i++) {
                var cell = upLeftOpenCells_1[_i];
                for (var direction = 0; direction < 4; direction++) {
                    var neighbor = grid.getNeighbor(cell, direction);
                    if (neighbor.regionID !== regionID || neighbor.contourFlags === 2) {
                        continue;
                    }
                    // Transfer the neighbor to the new region.
                    neighbor.regionID = newRegionID;
                    neighbor.distanceToRegionCore = 0; // This information is lost.
                    workingOpenCells.push(neighbor);
                }
            }
            // This allows to flood the nearest cells first without needing lifo queue.
            // But a queue would take less memory.
            swap = upLeftOpenCells;
            upLeftOpenCells = workingOpenCells;
            workingOpenCells = swap;
            workingOpenCells.length = 0;
            for (var _a = 0, downRightOpenCells_1 = downRightOpenCells; _a < downRightOpenCells_1.length; _a++) {
                var cell = downRightOpenCells_1[_a];
                for (var direction = 0; direction < 4; direction++) {
                    var neighbor = grid.getNeighbor(cell, direction);
                    if (neighbor.regionID !== regionID || neighbor.contourFlags === 2) {
                        continue;
                    }
                    // Keep the neighbor to the current region.
                    neighbor.contourFlags = 2;
                    neighbor.distanceToRegionCore = 0; // This information is lost.
                    workingOpenCells.push(neighbor);
                }
            }
            swap = downRightOpenCells;
            downRightOpenCells = workingOpenCells;
            workingOpenCells = swap;
            workingOpenCells.length = 0;
        }
    };
    /**
     * Detects and fixes bad cell configurations in the vicinity of a
     * obstacle region contour (See class description for details).
     * @param grid
     * @param startCell A cell in a non-obstacle region that borders a null
     * region.
     * @param startDirection The direction of the obstacle region border.
     * @return TRUE if the start cell's region completely encompasses
     * the obstacle region.
     */
    ObstacleRegionBordersCleaner.prototype.processNullRegion = function (grid, startCell, startDirection, extremeCells) {
        // This algorithm traverses the contour. As it does so, it detects
        // and fixes various known dangerous cell configurations.
        //
        // Traversing the contour:  A good way to  visualize it is to think
        // of a robot sitting on the floor facing  a known wall. It then
        // does the following to skirt the wall:
        // 1. If there is a wall in front of it, turn clockwise in 90 degrees
        //    increments until it finds the wall is gone.
        // 2. Move forward one step.
        // 3. Turn counter-clockwise by 90 degrees.
        // 4. Repeat from step 1 until it finds itself at its original
        //    location facing its original direction.
        //
        // See also: http://www.critterai.org/projects/nmgen_study/regiongen.html#robotwalk
        //
        // As the traversal occurs, the number of acute (90 degree) and
        // obtuse (270 degree) corners are monitored. If a complete contour is
        // detected and (obtuse corners > acute corners), then the null
        // region is inside the contour. Otherwise the obstacle region is
        // outside the contour, which we don't care about.
        var borderRegionID = startCell.regionID;
        // Prepare for loop.
        var cell = startCell;
        var neighbor = null;
        var direction = startDirection;
        var upLeftCell = cell;
        var downRightCell = cell;
        // Initialize monitoring variables.
        var loopCount = 0;
        var acuteCornerCount = 0;
        var obtuseCornerCount = 0;
        var stepsWithoutBorder = 0;
        var borderSeenLastLoop = false;
        var isBorder = true; // Initial value doesn't matter.
        // Assume a single region is connected to the obstacle region
        // until proven otherwise.
        var hasSingleConnection = true;
        // The loop limit exists for the sole reason of preventing
        // an infinite loop in case of bad input data.
        // It is set to a very high value because there is no way of
        // definitively determining a safe smaller value. Setting
        // the value too low can result in rescanning a contour
        // multiple times, killing performance.
        while (++loopCount < 1 << 30) {
            // Get the cell across the border.
            neighbor = grid.getNeighbor(cell, direction);
            // Detect which type of edge this direction points across.
            if (neighbor === null) {
                // It points across a obstacle region border edge.
                isBorder = true;
            }
            else {
                // We never need to perform contour detection
                // on this cell again. So mark it as processed.
                neighbor.contourFlags = 1;
                if (neighbor.regionID === RasterizationCell.OBSTACLE_REGION_ID) {
                    // It points across a obstacle region border edge.
                    isBorder = true;
                }
                else {
                    // This isn't a obstacle region border.
                    isBorder = false;
                    if (neighbor.regionID !== borderRegionID)
                        // It points across a border to a non-obstacle region.
                        // This means the current contour can't
                        // represent a fully encompassed obstacle region.
                        hasSingleConnection = false;
                }
            }
            // Process the border.
            if (isBorder) {
                // It is a border edge.
                if (borderSeenLastLoop) {
                    // A border was detected during the last loop as well.
                    // Two detections in a row indicates we passed an acute
                    // (inner) corner.
                    //
                    //     a x
                    //     x x
                    acuteCornerCount++;
                }
                else if (stepsWithoutBorder > 1) {
                    // We have moved at least two cells before detecting
                    // a border. This indicates we passed an obtuse
                    // (outer) corner.
                    //
                    //     a a
                    //     a x
                    obtuseCornerCount++;
                    stepsWithoutBorder = 0;
                    // Detect and fix cell configuration issue around this
                    // corner.
                    if (this.processOuterCorner(grid, cell, direction))
                        // A change was made and it resulted in the
                        // corner area having multiple region connections.
                        hasSingleConnection = false;
                }
                direction = (direction + 1) & 0x3; // Rotate in clockwise direction.
                borderSeenLastLoop = true;
                stepsWithoutBorder = 0;
            }
            else {
                // Not a obstacle region border.
                // Move to the neighbor and swing the search direction back
                // one increment (counterclockwise). By moving the direction
                // back one increment we guarantee we don't miss any edges.
                cell = neighbor;
                direction = (direction + 3) & 0x3; // Rotate counterclockwise direction.
                borderSeenLastLoop = false;
                stepsWithoutBorder++;
                if (cell.x < upLeftCell.x ||
                    (cell.x === upLeftCell.x && cell.y < upLeftCell.y)) {
                    upLeftCell = cell;
                }
                if (cell.x > downRightCell.x ||
                    (cell.x === downRightCell.x && cell.y > downRightCell.y)) {
                    downRightCell = cell;
                }
            }
            if (startCell === cell && startDirection === direction) {
                extremeCells[0] = upLeftCell;
                extremeCells[1] = downRightCell;
                // Have returned to the original cell and direction.
                // The search is complete.
                // Is the obstacle region inside the contour?
                return hasSingleConnection && obtuseCornerCount > acuteCornerCount;
            }
        }
        // If got here then the obstacle region boarder is too large to be fully
        // explored. So it can't be encompassed.
        return false;
    };
    /**
     * Detects and fixes cell configuration issues in the vicinity
     * of obtuse (outer) obstacle region corners.
     * @param grid
     * @param referenceCell The cell in a non-obstacle region that is
     * just past the outer corner.
     * @param borderDirection The direction of the obstacle region border.
     * @return TRUE if more than one region connects to the obstacle region
     * in the vicinity of the corner (this may or may not be due to
     * a change made by this operation).
     */
    ObstacleRegionBordersCleaner.prototype.processOuterCorner = function (grid, referenceCell, borderDirection) {
        var hasMultiRegions = false;
        // Get the previous two cells along the border.
        var backOne = grid.getNeighbor(referenceCell, (borderDirection + 3) & 0x3);
        var backTwo = grid.getNeighbor(backOne, borderDirection);
        var testCell;
        if (backOne.regionID !== referenceCell.regionID &&
            // This differ from the CritterAI implementation.
            // To filter vertices in the middle, this must be avoided too:
            //     a x
            //     b c
            backTwo.regionID !== backOne.regionID) {
            // Dangerous corner configuration.
            //
            //     a x
            //     b a
            //
            // Need to change to one of the following configurations:
            //
            //     b x        a x
            //     b a        b b
            //
            // Reason: During contour detection this type of configuration can
            // result in the region connection being detected as a
            // region-region portal, when it is not. The region connection
            // is actually interrupted by the obstacle region.
            //
            // This configuration has been demonstrated to result in
            // two regions being improperly merged to encompass an
            // internal obstacle region.
            //
            // Example:
            //
            //     a a x x x a
            //     a a x x a a
            //     b b a a a a
            //     b b a a a a
            //
            // During contour and connection detection for region b, at no
            // point will the obstacle region be detected. It will appear
            // as if a clean a-b portal exists.
            //
            // An investigation into fixing this issue via updates to the
            // watershed or contour detection algorithms did not turn
            // up a better way of resolving this issue.
            hasMultiRegions = true;
            // Determine how many connections backTwo has to backOne's region.
            testCell = grid.getNeighbor(backOne, (borderDirection + 3) & 0x3);
            var backTwoConnections = 0;
            if (testCell.regionID === backOne.regionID) {
                backTwoConnections++;
                testCell = grid.getNeighbor(testCell, borderDirection);
                if (testCell.regionID === backOne.regionID)
                    backTwoConnections++;
            }
            // Determine how many connections the reference cell has
            // to backOne's region.
            var referenceConnections = 0;
            testCell = grid.getNeighbor(backOne, (borderDirection + 2) & 0x3);
            if (testCell.regionID === backOne.regionID) {
                referenceConnections++;
                testCell = grid.getNeighbor(testCell, (borderDirection + 2) & 0x3);
                if (testCell.regionID === backOne.regionID)
                    backTwoConnections++;
            }
            // Change the region of the cell that has the most connections
            // to the target region.
            if (referenceConnections > backTwoConnections)
                referenceCell.regionID = backOne.regionID;
            else
                backTwo.regionID = backOne.regionID;
        }
        else if (backOne.regionID === referenceCell.regionID &&
            backTwo.regionID === referenceCell.regionID) {
            // Potential dangerous short wrap.
            //
            //  a x
            //  a a
            //
            //  Example of actual problem configuration:
            //
            //  b b x x
            //  b a x x <- Short wrap.
            //  b a a a
            //
            //  In the above case, the short wrap around the corner of the
            //  obstacle region has been demonstrated to cause self-intersecting
            //  polygons during polygon formation.
            //
            //  This algorithm detects whether or not one (and only one)
            //  of the axis neighbors of the corner should be re-assigned to
            //  a more appropriate region.
            //
            //  In the above example, the following configuration is more
            //  appropriate:
            //
            //  b b x x
            //  b b x x <- Change to this row.
            //  b a a a
            // Check to see if backTwo should be in a different region.
            var selectedRegion = this.selectedRegionID(grid, backTwo, (borderDirection + 1) & 0x3, (borderDirection + 2) & 0x3);
            if (selectedRegion === backTwo.regionID) {
                // backTwo should not be re-assigned. How about
                // the reference cell?
                selectedRegion = this.selectedRegionID(grid, referenceCell, borderDirection, (borderDirection + 3) & 0x3);
                if (selectedRegion !== referenceCell.regionID) {
                    // The reference cell should be reassigned
                    // to a new region.
                    referenceCell.regionID = selectedRegion;
                    hasMultiRegions = true;
                }
            }
            else {
                // backTwo should be re-assigned to a new region.
                backTwo.regionID = selectedRegion;
                hasMultiRegions = true;
            }
        }
        else
            hasMultiRegions = true;
        // No dangerous configurations detected. But definitely
        // has a change in regions at the corner. We know this
        // because one of the previous checks looked for a single
        // region for all wrap cells.
        return hasMultiRegions;
    };
    /**
     * Checks the cell to see if it should be reassigned to a new region.
     *
     * @param grid
     * @param referenceCell A cell on one side of an obstacle region contour's
     * outer corner. It is expected that the all cells that wrap the
     * corner are in the same region.
     * @param borderDirection  The direction of the obstacle region border.
     * @param cornerDirection The direction of the outer corner from the
     * reference cell.
     * @return The region the cell should be a member of. May be the
     * region the cell is currently a member of.
     */
    ObstacleRegionBordersCleaner.prototype.selectedRegionID = function (grid, referenceCell, borderDirection, cornerDirection) {
        // Initial example state:
        //
        // a - Known region.
        // x - Null region.
        // u - Unknown, not checked yet.
        //
        //     u u u
        //     u a x
        //     u a a
        // The only possible alternate region id is from
        // the cell that is opposite the border. So check it first.
        var regionID = grid.getNeighbor(referenceCell, (borderDirection + 2) & 0x3)
            .regionID;
        if (regionID === referenceCell.regionID ||
            regionID === RasterizationCell.OBSTACLE_REGION_ID)
            // The region away from the border is either a obstacle region
            // or the same region. So we keep the current region.
            //
            //     u u u      u u u
            //     a a x  or  x a x  <-- Potentially bad, but stuck with it.
            //     u a a      u a a
            return referenceCell.regionID;
        // Candidate region for re-assignment.
        var potentialRegion = regionID;
        // Next we check the region opposite from the corner direction.
        // If it is the current region, then we definitely can't
        // change the region id without risk of splitting the region.
        regionID = grid.getNeighbor(referenceCell, (cornerDirection + 2) & 0x3)
            .regionID;
        if (regionID === referenceCell.regionID ||
            regionID === RasterizationCell.OBSTACLE_REGION_ID)
            // The region opposite from the corner direction is
            // either a obstacle region or the same region. So we
            // keep the current region.
            //
            //     u a u      u x u
            //     b a x  or  b a x
            //     u a a      u a a
            return referenceCell.regionID;
        // We have checked the early exit special cases. Now a generalized
        // brute count is performed.
        //
        // Priority is given to the potential region. Here is why:
        // (Highly unlikely worst case scenario)
        //
        //     c c c    c c c
        //     b a x -> b b x  Select b even though b count == a count.
        //     b a a    b a a
        // Neighbors in potential region.
        // We know this will have a minimum value of 1.
        var potentialCount = 0;
        // Neighbors in the cell's current region.
        // We know this will have a minimum value of 2.
        var currentCount = 0;
        // Maximum edge case:
        //
        //     b b b
        //     b a x
        //     b a a
        //
        // The maximum edge case for region A can't exist. It
        // is filtered out during one of the earlier special cases
        // handlers.
        //
        // Other cases may exist if more regions are involved.
        // Such cases will tend to favor the current region.
        for (var direction = 0; direction < 8; direction++) {
            var regionID_1 = grid.getNeighbor(referenceCell, direction).regionID;
            if (regionID_1 === referenceCell.regionID)
                currentCount++;
            else if (regionID_1 === potentialRegion)
                potentialCount++;
        }
        return potentialCount < currentCount
            ? referenceCell.regionID
            : potentialRegion;
    };
    /**
     * Returns the direction of the first neighbor in a non-obstacle region.
     * @param grid
     * @param cell The cell to check.
     * @return The direction of the first neighbor in a non-obstacle region, or
     * -1 if all neighbors are in the obstacle region.
     */
    ObstacleRegionBordersCleaner.prototype.getNonNullBorderDirection = function (grid, cell) {
        // Search axis-neighbors.
        for (var direction = 0; direction < RasterizationGrid.neighbor4Deltas.length; direction++) {
            var delta = RasterizationGrid.neighbor4Deltas[direction];
            var neighbor = grid.get(cell.x + delta.x, cell.y + delta.y);
            if (neighbor.regionID !== RasterizationCell.OBSTACLE_REGION_ID)
                // The neighbor is a obstacle region.
                return direction;
        }
        // All neighbors are in a non-obstacle region.
        return -1;
    };
    return ObstacleRegionBordersCleaner;
}());

// This implementation is strongly inspired from a Java one
// by Stephen A. Pratt:
// http://www.critterai.org/projects/nmgen_study/
//
// Most of the comments were written by him and were adapted to fit this implementation.
// This implementation differs a bit from the original:
// - it's only 2D instead of 3D
// - it has less features (see TODO) and might have lesser performance
// - it uses objects for points instead of pointer-like in arrays of numbers
// - the rasterization comes from other sources because of the 2d focus
// - partialFloodRegion was rewritten to fix an issue
// - filterNonObstacleVertices was added
//
// The Java implementation was also inspired from Recast that can be found here:
// https://github.com/recastnavigation/recastnavigation
var NavMeshGenerator = /** @class */ (function () {
    function NavMeshGenerator(areaLeftBound, areaTopBound, areaRightBound, areaBottomBound, rasterizationCellSize, isometricRatio) {
        if (isometricRatio === void 0) { isometricRatio = 1; }
        this.grid = new RasterizationGrid(areaLeftBound, areaTopBound, areaRightBound, areaBottomBound, rasterizationCellSize, 
        // make cells square in the world
        rasterizationCellSize / isometricRatio);
        this.isometricRatio = isometricRatio;
        this.obstacleRasterizer = new ObstacleRasterizer();
        this.regionGenerator = new RegionGenerator();
        this.contourBuilder = new ContourBuilder();
        this.convexPolygonGenerator = new ConvexPolygonGenerator();
        this.gridCoordinateConverter = new GridCoordinateConverter();
    }
    NavMeshGenerator.prototype.buildNavMesh = function (obstacles, obstacleCellPadding) {
        var _this = this;
        this.grid.clear();
        this.obstacleRasterizer.rasterizeObstacles(this.grid, obstacles);
        this.regionGenerator.generateDistanceField(this.grid);
        this.regionGenerator.generateRegions(this.grid, obstacleCellPadding);
        // It's probably not a good idea to expose the vectorization threshold.
        // As stated in the parameter documentation, the value 1 gives good
        // results in any situations.
        var threshold = 1;
        var contours = this.contourBuilder.buildContours(this.grid, threshold);
        var meshField = this.convexPolygonGenerator.splitToConvexPolygons(contours, 16);
        var scaledMeshField = this.gridCoordinateConverter.convertFromGridBasis(this.grid, meshField);
        if (this.isometricRatio != 1) {
            // Rescale the mesh to have the same unit length on the 2 axis for the pathfinding.
            scaledMeshField.forEach(function (polygon) {
                return polygon.forEach(function (point) {
                    point.y *= _this.isometricRatio;
                });
            });
        }
        return scaledMeshField;
    };
    return NavMeshGenerator;
}());

/*
GDevelop - NavMesh Pathfinding Behavior Extension
    */
/**
 * PathfindingObstaclesManager manages the common objects shared by objects having a
 * pathfinding behavior: In particular, the obstacles behaviors are required to declare
 * themselves (see `PathfindingObstaclesManager.addObstacle`) to the manager of their associated scene
 * (see `NavMeshPathfindingRuntimeBehavior.obstaclesManagers`).
 */
var NavMeshPathfindingObstaclesManager = /** @class */ (function () {
    function NavMeshPathfindingObstaclesManager(instanceContainer, configuration) {
        /**
         * The navigation meshes by moving object size
         * (rounded on _cellSize)
         */
        this._navMeshes = new Map();
        /**
         * Used while NavMeshes update is disabled to remember to do the update
         * when it's enable back.
         */
        this._navMeshesAreUpToDate = true;
        /**
         * This allows to continue finding paths with the old NavMeshes while
         * moving obstacles.
         */
        this._navMeshesUpdateIsEnabled = true;
        var viewpoint = configuration._getViewpoint();
        if (viewpoint === 'Isometry 2:1 (26.565°)') {
            configuration._setIsometricRatio(2);
        }
        else if (viewpoint === 'True Isometry (30°)') {
            configuration._setIsometricRatio(Math.sqrt(3));
        }
        else {
            configuration._setIsometricRatio(1);
        }
        if (configuration._getCellSize() <= 0) {
            configuration._setCellSize(10);
        }
        if (configuration._getAreaLeftBound() === 0 &&
            configuration._getAreaTopBound() === 0 &&
            configuration._getAreaRightBound() === 0 &&
            configuration._getAreaBottomBound() === 0) {
            var game = instanceContainer.getGame();
            configuration._setAreaLeftBound(0);
            configuration._setAreaTopBound(0);
            configuration._setAreaRightBound(game.getGameResolutionWidth());
            configuration._setAreaBottomBound(game.getGameResolutionHeight());
        }
        this.configuration = configuration;
        this._obstacles = new Set();
        this._polygonIterableAdapter = new PolygonIterableAdapter();
        this._navMeshGenerator = new NavMeshGenerator(configuration._getAreaLeftBound(), configuration._getAreaTopBound(), configuration._getAreaRightBound(), configuration._getAreaBottomBound(), configuration._getCellSize(), 
        // make cells square in the world
        configuration._getIsometricRatio());
    }
    /**
     * Get the obstacles manager of a scene.
     */
    NavMeshPathfindingObstaclesManager.getManager = function (instanceContainer) {
        // @ts-ignore
        return instanceContainer.navMeshPathfindingObstaclesManager;
    };
    NavMeshPathfindingObstaclesManager.getManagerOrCreate = function (instanceContainer, configuration) {
        // @ts-ignore
        if (!instanceContainer.navMeshPathfindingObstaclesManager) {
            // Create the shared manager if necessary.
            // @ts-ignore
            instanceContainer.navMeshPathfindingObstaclesManager = new NavMeshPathfindingObstaclesManager(instanceContainer, configuration);
        }
        // @ts-ignore
        return instanceContainer.navMeshPathfindingObstaclesManager;
    };
    NavMeshPathfindingObstaclesManager.prototype.setNavMeshesUpdateEnabled = function (navMeshesUpdateIsEnabled) {
        this._navMeshesUpdateIsEnabled = navMeshesUpdateIsEnabled;
        if (navMeshesUpdateIsEnabled && !this._navMeshesAreUpToDate) {
            this._navMeshes.clear();
            this._navMeshesAreUpToDate = true;
        }
    };
    /**
     * Add a obstacle to the list of existing obstacles.
     */
    NavMeshPathfindingObstaclesManager.prototype.addObstacle = function (pathfindingObstacleBehavior) {
        this._obstacles.add(pathfindingObstacleBehavior.behavior.owner);
        this.invalidateNavMesh();
    };
    /**
     * Remove a obstacle from the list of existing obstacles. Be sure that the obstacle was
     * added before.
     */
    NavMeshPathfindingObstaclesManager.prototype.removeObstacle = function (pathfindingObstacleBehavior) {
        this._obstacles.delete(pathfindingObstacleBehavior.behavior.owner);
        this.invalidateNavMesh();
    };
    NavMeshPathfindingObstaclesManager.prototype.invalidateNavMesh = function () {
        if (this._navMeshesUpdateIsEnabled) {
            this._navMeshes.clear();
            this._navMeshesAreUpToDate = true;
        }
        else {
            this._navMeshesAreUpToDate = false;
        }
    };
    NavMeshPathfindingObstaclesManager.prototype.getNavMesh = function (obstacleCellPadding) {
        var navMesh = this._navMeshes.get(obstacleCellPadding);
        if (!navMesh) {
            var navMeshPolygons = this._navMeshGenerator.buildNavMesh(this._getVerticesIterable(this._obstacles), obstacleCellPadding);
            navMesh = new NavMesh(navMeshPolygons);
            this._navMeshes.set(obstacleCellPadding, navMesh);
        }
        return navMesh;
    };
    NavMeshPathfindingObstaclesManager.prototype._getVerticesIterable = function (objects) {
        this._polygonIterableAdapter.set(objects);
        return this._polygonIterableAdapter;
    };
    return NavMeshPathfindingObstaclesManager;
}());
/**
 * Iterable that adapts `RuntimeObject` to `Iterable<{x: float y: float}>`.
 *
 * This is an allocation free iterable
 * that can only do one iteration at a time.
 */
var PolygonIterableAdapter = /** @class */ (function () {
    function PolygonIterableAdapter() {
        this.objects = [];
        this.objectsItr = this.objects[Symbol.iterator]();
        this.polygonsItr = [][Symbol.iterator]();
        this.pointIterableAdapter = new PointIterableAdapter();
        this.result = {
            value: this.pointIterableAdapter,
            done: false,
        };
    }
    PolygonIterableAdapter.prototype.set = function (objects) {
        this.objects = objects;
    };
    PolygonIterableAdapter.prototype[Symbol.iterator] = function () {
        this.objectsItr = this.objects[Symbol.iterator]();
        this.polygonsItr = [][Symbol.iterator]();
        return this;
    };
    PolygonIterableAdapter.prototype.next = function () {
        var polygonNext = this.polygonsItr.next();
        while (polygonNext.done) {
            var objectNext = this.objectsItr.next();
            if (objectNext.done) {
                // IteratorReturnResult<gdjs.RuntimeObject> require a defined value
                // even though the spec state otherwise.
                // So, this class can't be typed as an iterable.
                this.result.value = undefined;
                this.result.done = true;
                return this.result;
            }
            this.polygonsItr = objectNext.value.getHitBoxes().values();
            polygonNext = this.polygonsItr.next();
        }
        this.pointIterableAdapter.set(polygonNext.value.vertices);
        this.result.value = this.pointIterableAdapter;
        this.result.done = false;
        return this.result;
    };
    return PolygonIterableAdapter;
}());
/**
 * Iterable that adapts coordinates from `[int, int]` to `{x: int, y: int}`.
 *
 * This is an allocation free iterable
 * that can only do one iteration at a time.
 */
var PointIterableAdapter = /** @class */ (function () {
    function PointIterableAdapter() {
        this.vertices = [];
        this.verticesItr = this.vertices[Symbol.iterator]();
        this.result = {
            value: { x: 0, y: 0 },
            done: false,
        };
    }
    PointIterableAdapter.prototype.set = function (vertices) {
        this.vertices = vertices;
    };
    PointIterableAdapter.prototype[Symbol.iterator] = function () {
        this.verticesItr = this.vertices[Symbol.iterator]();
        return this;
    };
    PointIterableAdapter.prototype.next = function () {
        var next = this.verticesItr.next();
        if (next.done) {
            return next;
        }
        this.result.value.x = next.value[0];
        this.result.value.y = next.value[1];
        return this.result;
    };
    return PointIterableAdapter;
}());

/*
GDevelop - NavMesh Pathfinding Behavior Extension
    */
/**
 * NavMeshPathfindingRuntimeBehavior represents a behavior allowing objects to
 * follow a path computed to avoid obstacles.
 */
var NavMeshRenderer = /** @class */ (function () {
    function NavMeshRenderer() {
        /** Used to draw traces for debugging */
        this._lastUsedObstacleCellPadding = null;
    }
    NavMeshRenderer.prototype.setLastUsedObstacleCellPadding = function (lastUsedObstacleCellPadding) {
        this._lastUsedObstacleCellPadding = lastUsedObstacleCellPadding;
    };
    NavMeshRenderer.prototype.render = function (instanceContainer, shapePainter) {
        if (this._lastUsedObstacleCellPadding === null) {
            return;
        }
        var manager = NavMeshPathfindingObstaclesManager.getManager(instanceContainer);
        if (!manager) {
            return;
        }
        var isometricRatio = manager.configuration._getIsometricRatio();
        // TODO find a way to rebuild drawing only when necessary.
        // Draw the navigation mesh on a shape painter object for debugging purpose
        var navMesh = manager.getNavMesh(this._lastUsedObstacleCellPadding);
        for (var _i = 0, _a = navMesh.getPolygons(); _i < _a.length; _i++) {
            var navPoly = _a[_i];
            var polygon = navPoly.getPoints();
            if (polygon.length === 0)
                continue;
            for (var index = 1; index < polygon.length; index++) {
                // It helps to spot vertices with 180° between edges.
                shapePainter.drawCircle(polygon[index].x, polygon[index].y / isometricRatio, 3);
            }
        }
        for (var _b = 0, _c = navMesh.getPolygons(); _b < _c.length; _b++) {
            var navPoly = _c[_b];
            var polygon = navPoly.getPoints();
            if (polygon.length === 0)
                continue;
            shapePainter.beginFillPath(polygon[0].x, polygon[0].y / isometricRatio);
            for (var index = 1; index < polygon.length; index++) {
                shapePainter.drawPathLineTo(polygon[index].x, polygon[index].y / isometricRatio);
            }
            shapePainter.closePath();
            shapePainter.endFillPath();
        }
    };
    return NavMeshRenderer;
}());

/**
 * NavMeshPathfindingRuntimeBehavior represents a behavior allowing objects to
 * follow a path computed to avoid obstacles.
 */
var PathFollower = /** @class */ (function () {
    function PathFollower(configuration) {
        // Attributes used for traveling on the path:
        this._path = [];
        this._speed = 0;
        this._distanceOnSegment = 0;
        this._totalSegmentDistance = 0;
        this._currentSegment = 0;
        this._movementAngle = 0;
        this.configuration = configuration;
    }
    PathFollower.prototype.setSpeed = function (speed) {
        this._speed = speed;
    };
    PathFollower.prototype.getSpeed = function () {
        return this._speed;
    };
    PathFollower.prototype.getMovementAngle = function () {
        return this._movementAngle;
    };
    PathFollower.prototype.movementAngleIsAround = function (degreeAngle, tolerance) {
        return (Math.abs(gdjs.evtTools.common.angleDifference(this._movementAngle, degreeAngle)) <= tolerance);
    };
    PathFollower.prototype.getNodeX = function (index) {
        if (index < this._path.length) {
            return this._path[index][0];
        }
        return 0;
    };
    PathFollower.prototype.getNodeY = function (index) {
        if (index < this._path.length) {
            return this._path[index][1];
        }
        return 0;
    };
    PathFollower.prototype.getNextNodeIndex = function () {
        return Math.min(this._currentSegment + 1, this._path.length - 1);
    };
    PathFollower.prototype.getNodeCount = function () {
        return this._path.length;
    };
    PathFollower.prototype.getNextNodeX = function () {
        if (this._path.length === 0) {
            return 0;
        }
        var nextIndex = Math.min(this._currentSegment + 1, this._path.length - 1);
        return this._path[nextIndex][0];
    };
    PathFollower.prototype.getNextNodeY = function () {
        if (this._path.length === 0) {
            return 0;
        }
        var nextIndex = Math.min(this._currentSegment + 1, this._path.length - 1);
        return this._path[nextIndex][1];
    };
    PathFollower.prototype.getPreviousNodeX = function () {
        if (this._path.length === 0) {
            return 0;
        }
        var previousIndex = Math.min(this._currentSegment, this._path.length - 1);
        return this._path[previousIndex][0];
    };
    PathFollower.prototype.getPreviousNodeY = function () {
        if (this._path.length === 0) {
            return 0;
        }
        var previousIndex = Math.min(this._currentSegment, this._path.length - 1);
        return this._path[previousIndex][1];
    };
    PathFollower.prototype.getDestinationX = function () {
        if (this._path.length === 0) {
            return 0;
        }
        return this._path[this._path.length - 1][0];
    };
    PathFollower.prototype.getDestinationY = function () {
        if (this._path.length === 0) {
            return 0;
        }
        return (this._path[this._path.length - 1][1]);
    };
    /**
     * Return true if the object reached its destination.
     */
    PathFollower.prototype.destinationReached = function () {
        return this._currentSegment >= this._path.length - 1;
    };
    /**
     * Compute and move on the path to the specified destination.
     */
    PathFollower.prototype.setPath = function (path) {
        this._path = path;
        this._enterSegment(0);
    };
    PathFollower.prototype._enterSegment = function (segmentNumber) {
        if (this._path.length === 0) {
            return;
        }
        this._currentSegment = segmentNumber;
        if (this._currentSegment < this._path.length - 1) {
            var pathX = this._path[this._currentSegment + 1][0] -
                this._path[this._currentSegment][0];
            var pathY = this._path[this._currentSegment + 1][1] -
                this._path[this._currentSegment][1];
            this._totalSegmentDistance = Math.sqrt(pathX * pathX + pathY * pathY);
            this._distanceOnSegment = 0;
            this._movementAngle =
                (gdjs.toDegrees(Math.atan2(pathY, pathX)) + 360) % 360;
        }
        else {
            this._speed = 0;
        }
    };
    PathFollower.prototype.isMoving = function () {
        return !(this._path.length === 0 || this.destinationReached());
    };
    PathFollower.prototype.step = function (timeDelta) {
        if (this._path.length === 0 || this.destinationReached()) {
            return;
        }
        // Update the speed of the object
        var previousSpeed = this._speed;
        var maxSpeed = this.configuration._getMaxSpeed();
        if (this._speed !== maxSpeed) {
            this._speed += this.configuration._getAcceleration() * timeDelta;
            if (this._speed > maxSpeed) {
                this._speed = maxSpeed;
            }
        }
        // Update the time on the segment and change segment if needed
        // Use a Verlet integration to be frame rate independent.
        this._distanceOnSegment +=
            ((this._speed + previousSpeed) / 2) * timeDelta;
        var remainingDistanceOnSegment = this._totalSegmentDistance - this._distanceOnSegment;
        if (remainingDistanceOnSegment <= 0 &&
            this._currentSegment < this._path.length) {
            this._enterSegment(this._currentSegment + 1);
            this._distanceOnSegment = -remainingDistanceOnSegment;
        }
    };
    PathFollower.prototype.getX = function () {
        return this._currentSegment < this._path.length - 1 ? gdjs.evtTools.common.lerp(this._path[this._currentSegment][0], this._path[this._currentSegment + 1][0], this._distanceOnSegment / this._totalSegmentDistance) : this._path[this._path.length - 1][0];
    };
    PathFollower.prototype.getY = function () {
        return this._currentSegment < this._path.length - 1 ? gdjs.evtTools.common.lerp(this._path[this._currentSegment][1], this._path[this._currentSegment + 1][1], this._distanceOnSegment / this._totalSegmentDistance) : this._path[this._path.length - 1][1];
    };
    return PathFollower;
}());

/**
 * NavMeshPathfindingRuntimeBehavior represents a behavior allowing objects to
 * follow a path computed to avoid obstacles.
 */
var NavMeshPathfindingBehavior = /** @class */ (function () {
    function NavMeshPathfindingBehavior(behavior) {
        // Attributes used for traveling on the path:
        this._pathFound = false;
        this.behavior = behavior;
        this.pathFollower = new PathFollower(behavior);
        this.navMeshRenderer = new NavMeshRenderer();
    }
    /**
     * Return true if the latest call to moveTo succeeded.
     */
    NavMeshPathfindingBehavior.prototype.pathFound = function () {
        return this._pathFound;
    };
    /**
     * Compute and move on the path to the specified destination.
     */
    NavMeshPathfindingBehavior.prototype.moveTo = function (instanceContainer, x, y) {
        var owner = this.behavior.owner;
        var manager = NavMeshPathfindingObstaclesManager.getManager(instanceContainer);
        if (!manager) {
            this._pathFound = true;
            this.pathFollower.setPath([[owner.getX(), owner.getY()], [x, y]]);
            return;
        }
        var isometricRatio = manager.configuration._getIsometricRatio();
        var cellSize = manager.configuration._getCellSize();
        var collisionShape = this.behavior._getCollisionShape();
        var extraBorder = this.behavior._getExtraBorder();
        var radiusSqMax = 0;
        if (collisionShape !== 'Dot at center') {
            var centerX = owner.getCenterXInScene();
            var centerY = owner.getCenterYInScene();
            for (var _i = 0, _a = owner.getHitBoxes(); _i < _a.length; _i++) {
                var hitBox = _a[_i];
                for (var _b = 0, _c = hitBox.vertices; _b < _c.length; _b++) {
                    var vertex = _c[_b];
                    var deltaX = vertex[0] - centerX;
                    // to have the same unit on x and y
                    var deltaY = (vertex[1] - centerY) * isometricRatio;
                    var radiusSq = deltaX * deltaX + deltaY * deltaY;
                    radiusSqMax = Math.max(radiusSq, radiusSqMax);
                }
            }
        }
        // Round to avoid to flicker between 2 NavMesh
        // because of trigonometry rounding errors.
        // Round the padding on cellSize to avoid almost identical NavMesh
        var obstacleCellPadding = Math.max(0, Math.round((Math.sqrt(radiusSqMax) + extraBorder) / cellSize));
        this.navMeshRenderer.setLastUsedObstacleCellPadding(obstacleCellPadding);
        var navMesh = manager.getNavMesh(obstacleCellPadding);
        // TODO avoid the path allocation
        var path = navMesh.findPath({
            x: owner.getX(),
            y: owner.getY() * isometricRatio,
        }, { x: x, y: y * isometricRatio }) || [];
        this._pathFound = path.length > 0;
        this.pathFollower.setPath(path.map(function (_a) {
            var x = _a.x, y = _a.y;
            return [x, y];
        }));
    };
    NavMeshPathfindingBehavior.prototype.doStepPreEvents = function (instanceContainer) {
        if (this.pathFollower.destinationReached()) {
            return;
        }
        var manager = NavMeshPathfindingObstaclesManager.getManager(instanceContainer);
        if (!manager) {
            return;
        }
        var isometricRatio = manager.configuration._getIsometricRatio();
        var owner = this.behavior.owner;
        var angleOffset = this.behavior._getAngleOffset();
        var angularMaxSpeed = this.behavior._getAngularMaxSpeed();
        var rotateObject = this.behavior._getRotateObject();
        var timeDelta = owner.getElapsedTime(instanceContainer) / 1000;
        this.pathFollower.step(timeDelta);
        // Position object on the segment and update its angle
        var movementAngle = this.pathFollower.getMovementAngle();
        if (rotateObject &&
            owner.getAngle() !== movementAngle + angleOffset) {
            owner.rotateTowardAngle(movementAngle + angleOffset, angularMaxSpeed, instanceContainer);
        }
        owner.setX(this.pathFollower.getX());
        // In case of isometry, convert coords back in screen.
        owner.setY(this.pathFollower.getY() / isometricRatio);
    };
    return NavMeshPathfindingBehavior;
}());

/*
GDevelop - NavMesh Pathfinding Behavior Extension
    */
/**
 * NavMeshPathfindingObstacleRuntimeBehavior represents a behavior allowing objects to be
 * considered as a obstacle by objects having Pathfinding Behavior.
 */
var NavMeshPathfindingObstacleBehavior = /** @class */ (function () {
    function NavMeshPathfindingObstacleBehavior(instanceContainer, behavior) {
        this._oldX = 0;
        this._oldY = 0;
        this._oldWidth = 0;
        this._oldHeight = 0;
        this._registeredInManager = false;
        this.behavior = behavior;
        this._manager = NavMeshPathfindingObstaclesManager.getManagerOrCreate(instanceContainer, 
        // @ts-ignore
        behavior._sharedData);
        //Note that we can't use getX(), getWidth()... of owner here:
        //The owner is not yet fully constructed.
    }
    NavMeshPathfindingObstacleBehavior.prototype.onDestroy = function () {
        if (this._manager && this._registeredInManager) {
            this._manager.removeObstacle(this);
        }
    };
    NavMeshPathfindingObstacleBehavior.prototype.doStepPreEvents = function (instanceContainer) {
        var owner = this.behavior.owner;
        //Make sure the obstacle is or is not in the obstacles manager.
        if (!this.behavior.activated() && this._registeredInManager) {
            this._manager.removeObstacle(this);
            this._registeredInManager = false;
        }
        else {
            if (this.behavior.activated() && !this._registeredInManager) {
                this._manager.addObstacle(this);
                this._registeredInManager = true;
            }
        }
        //Track changes in size or position
        if (this._oldX !== owner.getX() ||
            this._oldY !== owner.getY() ||
            this._oldWidth !== owner.getWidth() ||
            this._oldHeight !== owner.getHeight()) {
            if (this._registeredInManager) {
                this._manager.removeObstacle(this);
                this._manager.addObstacle(this);
            }
            this._oldX = owner.getX();
            this._oldY = owner.getY();
            this._oldWidth = owner.getWidth();
            this._oldHeight = owner.getHeight();
        }
    };
    NavMeshPathfindingObstacleBehavior.prototype.doStepPostEvents = function (instanceContainer) { };
    NavMeshPathfindingObstacleBehavior.prototype.onActivate = function () {
        if (this._registeredInManager) {
            return;
        }
        this._manager.addObstacle(this);
        this._registeredInManager = true;
    };
    NavMeshPathfindingObstacleBehavior.prototype.onDeActivate = function () {
        if (!this._registeredInManager) {
            return;
        }
        this._manager.removeObstacle(this);
        this._registeredInManager = false;
    };
    return NavMeshPathfindingObstacleBehavior;
}());

gdjs.__NavMeshPathfinding = {
    NavMeshPathfindingBehavior,
    NavMeshPathfindingObstacleBehavior,
}

};
gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript.userFunc0xf2f620(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("NavMeshPathfinding"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("NavMeshPathfinding"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__NavMeshPathfinding__DefineJavaScript.registeredGdjsCallbacks = [];