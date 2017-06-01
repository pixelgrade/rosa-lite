/**
 * Generic tree implementation
 *
 * This class represents any node in the tree.
 */
var Node = function( val ) {

	this.val = val;
	this.children = [];
	this.parent = null;

	/**
	 * Sets the parent node of this node.
	 */
	this.setParentNode = function( node ) {
		this.parent = node;
		node.children[node.children.length] = this;
	}

	/**
	 * Gets the parent node of this node.
	 */
	this.getParentNode = function() {
		return this.parent;
	}

	/**
	 * Adds a child node of this node.
	 */
	this.addChild = function( node ) {
		node.parent = this;
		this.children[this.children.length] = node;
	}

	/**
	 * Gets the array of child nodes of this node.
	 */
	this.getChildren = function() {
		return this.children;
	}

	/**
	 * Removes all the children of this node.
	 */
	this.removeChildren = function() {
		var child;
		for ( var i = 0; i < this.children.length; i++ ) {
			child = this.children[i];
			child.parent = null;
		}
		this.children = [];
	}

	/**
	 * Recursively counts the number of all descendants, from children down, and
	 * returns the total number.
	 */
	this.getTotalDescendantCount = function() {
		var count = 0,
			child;
		for ( var i = 0; i < this.children.length; i++ ) {
			child = this.children[i];
			count += child.getTotalDescendantCount();
		}
		return count + this.children.length;
	}
}

/**
 * Protocol Buffer implementation, which extends the functionality of Node
 * while specifically typing the stored value
 */
var PrBufNode = function( id, type, value ) {
	this.val = {
		id: id,
		type: type,
		value: value
	};
	this.children = [];
	this.parent = null;
}

PrBufNode.prototype = new Node();
PrBufNode.prototype.constructor = PrBufNode;

PrBufNode.prototype.id = function() {
	return this.val.id;
}
PrBufNode.prototype.type = function() {
	return this.val.type;
}
PrBufNode.prototype.value = function() {
	return this.val.value;
}

/**
 * Compares the number of descendants with the value specified in the map element.
 * If all the children have not yet been added, we continue adding to this element.
 */
PrBufNode.prototype.findLatestIncompleteNode = function() {

	//if it's a branch (map) node ('m') and has room,
	//or if it's the root (identified by having a null parent), which has no element limit,
	//then return this node
	if ( (
		     (
			     this.val.type === 'm'
		     ) && (
			     this.val.value > this.getTotalDescendantCount()
		     )
	     )
	     || (
		     null === this.parent
	     ) ) {
		return this;
	}
	else {
		return this.parent.findLatestIncompleteNode();
	}
}

/**
 * Parses the input URL 'data' protocol buffer parameter into a tree
 */
PrBufNode.create = function( urlToParse ) {
	var rootNode = null;
	var re = /data=!([^?&]+)/;
	var dataArray = urlToParse.match( re );
	if ( dataArray && dataArray.length >= 1 ) {
		rootNode = new PrBufNode();
		var workingNode = rootNode;
		//we iterate through each of the elements, creating a node for it, and
		//deciding where to place it in the tree
		var elemArray = dataArray[1].split( "!" );
		for ( var i = 0; i < elemArray.length; i ++ ) {
			var elemRe = /^([0-9]+)([a-z])(.+)$/;
			var elemValsArray = elemArray[i].match( elemRe );
			if ( elemValsArray && elemValsArray.length > 3 ) {
				var elemNode = new PrBufNode( elemValsArray[1], elemValsArray[2], elemValsArray[3] );
				workingNode.addChild( elemNode );
				workingNode = elemNode.findLatestIncompleteNode();
			}
		}
	}
	return rootNode;
}


/**
 * Represents a basic waypoint, with latitude and longitude.
 *
 * If both are not specified, the waypoint is considered to be valid
 * but empty waypoint (these can exist in the data parameter, where
 * the coordinates have been specified in the URL path.
 */
var GmdpWaypoint = function( lat, lng, primary ) {
	this.lat = lat;
	this.lng = lng;
	this.primary = primary ? true : false;
}

/**
 * Represents a basic route, comprised of an ordered list of
 * GmdpWaypoint objects.
 */
var GmdpRoute = function() {
	this.route = new Array();
}

/**
 * Pushes a GmdpWaypoint on to the end of this GmdpRoute.
 */
GmdpRoute.prototype.pushWaypoint = function( wpt ) {
	if ( wpt instanceof GmdpWaypoint ) {
		this.route.push( wpt );
	}
}

/**
 * Sets the mode of transportation.
 * If the passed parameter represents one of the integers normally used by Google Maps,
 * it will be interpreted as the relevant transport mode, and set as a string:
 * "car", "bike", "foot", "transit", "flight"
 */
GmdpRoute.prototype.setTransportation = function( transportation ) {
	switch ( transportation ) {
		case '0':
			this.transportation = "car";
			break;
		case '1':
			this.transportation = "bike";
			break;
		case '2':
			this.transportation = "foot";
			break;
		case '3':
			this.transportation = "transit";
			break;
		case '4':
			this.transportation = "flight";
			break;
		default:
			this.transportation = transportation;
			break;
	}
}

/**
 * Returns the mode of transportation (if any) for the route.
 */
GmdpRoute.prototype.getTransportation = function() {
	return this.transportation;
}

GmdpRoute.prototype.setUnit = function( unit ) {
	switch ( unit ) {
		case '0':
			this.unit = "km";
			break;
		case '1':
			this.unit = "miles";
			break;
	}
}

GmdpRoute.prototype.getUnit = function() {
	return this.unit;
}

GmdpRoute.prototype.setRoutePref = function( routePref ) {
	switch ( routePref ) {
		case '0':
		case '1':
			this.routePref = "best route";
			break;
		case '2':
			this.routePref = "fewer transfers";
			break;
		case '3':
			this.routePref = "less walking";
			break;
	}
}

GmdpRoute.prototype.getRoutePref = function() {
	return this.routePref;
}

GmdpRoute.prototype.setArrDepTimeType = function( arrDepTimeType ) {
	switch ( arrDepTimeType ) {
		case '0':
			this.arrDepTimeType = "depart at";
			break;
		case '1':
			this.arrDepTimeType = "arrive by";
			break;
		case '2':
			this.arrDepTimeType = "last available";
			break;
	}
}

GmdpRoute.prototype.getArrDepTimeType = function() {
	return this.arrDepTimeType;
}

GmdpRoute.prototype.addTransitModePref = function( transitModePref ) {
	//there can be multiple preferred transit modes, so we store them in an array
	//we assume there will be no duplicate values, but it probably doesn't matter
	//even if there are
	switch ( transitModePref ) {
		case '0':
			this.transitModePref.push( "bus" );
			break;
		case '1':
			this.transitModePref.push( "subway" );
			break;
		case '2':
			this.transitModePref.push( "train" );
			break;
		case '3':
			this.transitModePref.push( "tram / light rail" );
			break;
	}
}

GmdpRoute.prototype.getTransitModePref = function() {
	return this.transitModePref;
}


/**
 * Returns the list of all waypoints belonging to this route.
 */
GmdpRoute.prototype.getAllWaypoints = function() {
	return this.route;
}


function GmdpException( message ) {
	this.message = message;
	// Use V8's native method if available, otherwise fallback
	if ( "captureStackTrace" in Error ) {
		Error.captureStackTrace( this, GmdpException );
	} else {
		this.stack = (
			new Error()
		).stack;
	}
}

GmdpException.prototype = Object.create( Error.prototype );
GmdpException.prototype.name = "GmdpException";

/**
 * Represents a google maps data parameter, constructed from the passed URL.
 *
 * Utility methods defined below allow the user to easily extract interesting
 * information from the data parameter.
 */
var Gmdp = function( url ) {
	this.prBufRoot = PrBufNode.create( url );
	this.mapType = "map";

	if ( this.prBufRoot == null ) {
		throw new GmdpException( "no parsable data parameter found" );
	}

	//the main top node for routes is 4m; other urls (eg. streetview) feature 3m etc.
	var routeTop = null;
	var streetviewTop = null;
	var rootChildren = this.prBufRoot.getChildren(),
		child;

	for ( var i = 0; i < rootChildren.length; i++ ) {
		child = rootChildren[i];
		if ( child.id() == 3 && child.type() == 'm' ) {
			var mapTypeChildren = child.getChildren();
			if ( mapTypeChildren && mapTypeChildren.length >= 1 ) {
				if ( mapTypeChildren[0].id() == 1 && mapTypeChildren[0].type() == 'e' ) {
					switch ( mapTypeChildren[0].value() ) {
						case '1':
							this.mapType = "streetview";
							streetviewTop = child;
							break;
						case '3':
							this.mapType = "earth";
							break;
					}
				}
			}
		} else if ( child.id() == 4 && child.type() == 'm' ) {
			routeTop = child;
		}
	}
	if ( routeTop ) {
		var directions = null,
			routeChildren = routeTop.getChildren();

		for ( var i = 0; i < routeChildren.length; i++ ) {
			child = routeChildren[i];
			if ( child.id() == 4 && child.type() == 'm' ) {
				directions = child;
			}
		}
		if ( directions ) {
			this.route = new GmdpRoute();
			this.route.arrDepTimeType = "leave now"; //default if no value is specified
			this.route.avoidHighways = false;
			this.route.avoidTolls = false;
			this.route.avoidFerries = false;
			this.route.transitModePref = [];

			var directionsChildren = directions.getChildren();

			for ( var i = 0; i < directionsChildren.length; i++ ) {
				child = directionsChildren[i];
				if ( primaryChild.id() == 1 && primaryChild.type() == 'm' ) {
					if ( primaryChild.value() == 0 ) {
						this.route.pushWaypoint( new GmdpWaypoint( undefined, undefined, true ) );
					}
					else {
						var addedPrimaryWpt = false;
						var wptNodes = primaryChild.getChildren(),
							wptNode;
						for ( var i = 0; i < wptNodes.length; i++ ) {
							wptNode = wptNodes[i];
							if ( wptNode.id() == 2 ) {
								//this is the primary wpt, add coords
								var coordNodes = wptNode.getChildren();
								if ( coordNodes &&
								     coordNodes.length >= 2 &&
								     coordNodes[0].id() == 1 &&
								     coordNodes[0].type() == 'd' &&
								     coordNodes[1].id() == 2 &&
								     coordNodes[1].type() == 'd' ) {
									this.route.pushWaypoint(
										new GmdpWaypoint( coordNodes[1].value(),
											coordNodes[0].value(),
											true ) );
								}
								addedPrimaryWpt = true;
							} else if ( wptNode.id() == 3 ) {
								//this is a secondary (unnamed) wpt
								//
								//but first, if we haven't yet added the primary wpt,
								//then the coordinates are apparently not specified,
								//so we should add an empty wpt
								if ( ! addedPrimaryWpt ) {
									this.route.pushWaypoint( new GmdpWaypoint( undefined, undefined, true ) );
									addedPrimaryWpt = true;
								}

								//now proceed with the secondary wpt itself
								var secondaryWpts = wptNode.getChildren();
								if ( secondaryWpts && secondaryWpts.length > 1 ) {
									var coordNodes = secondaryWpts[0].getChildren();
									if ( coordNodes &&
									     coordNodes.length >= 2 &&
									     coordNodes[0].id() == 1 &&
									     coordNodes[0].type() == 'd' &&
									     coordNodes[1].id() == 2 &&
									     coordNodes[1].type() == 'd' ) {
										this.route.pushWaypoint(
											new GmdpWaypoint( coordNodes[1].value(),
												coordNodes[0].value(),
												false ) );
									}
								}
							}
						}
					}
				} else if ( primaryChild.id() == 2 && primaryChild.type() == 'm' ) {
					var routeOptions = primaryChild.getChildren(),
						routeOption;
					for ( var i = 0; i < routeOptions.length; i++ ) {
						routeOption = routeOptions[i];

						if ( routeOption.id() == 1 && routeOption.type() == 'b' ) {
							this.route.avoidHighways = true;
						}
						else if ( routeOption.id() == 2 && routeOption.type() == 'b' ) {
							this.route.avoidTolls = true;
						}
						else if ( routeOption.id() == 3 && routeOption.type() == 'b' ) {
							this.route.avoidFerries = true;
						}
						else if ( routeOption.id() == 4 && routeOption.type() == 'e' ) {
							this.route.setRoutePref( routeOption.value() );
						}
						else if ( routeOption.id() == 5 && routeOption.type() == 'e' ) {
							this.route.addTransitModePref( routeOption.value() );
						}
						else if ( routeOption.id() == 6 && routeOption.type() == 'e' ) {
							this.route.setArrDepTimeType( routeOption.value() );
						}
						if ( routeOption.id() == 8 && routeOption.type() == 'j' ) {
							this.route.arrDepTime = routeOption.value(); //as a unix timestamp
						}
					}
				} else if ( primaryChild.id() == 3 && primaryChild.type() == 'e' ) {
					this.route.setTransportation( primaryChild.value() );
				} else if ( primaryChild.id() == 4 && primaryChild.type() == 'e' ) {
					this.route.setUnit( primaryChild.value() );
				}
			}
		}
	}
	if ( streetviewTop ) {
		var streetviewChildren = streetviewTop.getChildren(),
			streetviewChild;
		for ( var i = 0; i < streetviewChildren.length; i++ ) {
			streetviewChild = streetviewChildren[i];
			if ( streetviewChild.id() == 3 && streetviewChild.type() == 'm' ) {
				var svInfos = streetviewChild.getChildren(),
					svInfo;
				for ( var i = 0; i < svInfos.length; i++ ) {
					svInfo = svInfos[i];
					if ( svInfo.id() == 2 && svInfo.type() == 'e' ) {
						if ( svInfo.value() == 4 ) {
							//!2e4!3e11 indicates a photosphere, rather than standard streetview
							//but the 3e11 doesn't seem to matter too much (?)
							this.mapType = "photosphere";
						}
					}
					if ( svInfo.id() == 6 && svInfo.type() == 's' ) {
						this.svURL = decodeURIComponent( svInfo.value() );
					}
				}
			}
		}
	}
}

/**
 * Returns the route defined by this data parameter.
 */
Gmdp.prototype.getRoute = function() {
	return this.route;
}

/**
 * Returns the main map type ("map", "earth").
 */
Gmdp.prototype.getMapType = function() {
	return this.mapType;
}

/**
 * Returns the main map type ("map", "earth").
 */
Gmdp.prototype.getStreetviewURL = function() {
	return this.svURL;
}