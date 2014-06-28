"use strict";

(function($){
	//Regex to verify if value to save is function
	var isFx = /\(\)$/,
		//Transform string in function
		_parseToFx = function( str ){
			 return ( new Function('return ' + str ) )();
		},
		//Convert value in string to save
		_parseToStr = function( value, isFunction ){
			console.log(value, isFunction);
			return !isFunction ? JSON.stringify(value) : value.toString(); 
		},
		//Convert value to return in get
		_parseToReturn = function( value, isFunction ){
			var toReturn = null;
			try {
				toReturn = !isFunction ? JSON.parse(value): _parseToFx(value);
			} catch( error ){
				toReturn = value;
			}
			return toReturn;
		}

	//Constructor
	function Session(){ 
		this.store = window.localStorage 
	};

	Session.prototype = {
		constructor: Session,

		//Return respective value
		get: function( key ){
			//If key exists, return data converted in object or function
			return this.has(key) ? _parseToReturn( this.store.getItem(key), isFx.test(key) ) : null;
		},

		//Get localStorage
		getAll: function(){
			var toReturn = {};
			for( key in this.store ){
				toReturn[key] = this.get(key); 
			}
			return toReturn;
		},

		// Set key and value
		set: function( key , value ){
			//Verify if is function, parse value to String and set in localStorage
			this.store.setItem( key, _parseToStr( value, isFx.test(key) ));
			return this;
		},

		// Has the key?
		has: function( key ){
			//key exists?
			return this.store.hasOwnProperty(key);
		},

		// Remove a value
		remove: function( key ){
			this.store.removeItem(key);
			return this;
		},

		//Remove all values
		reset: function(){
			var values = this.getAll();
			for( key in values ){
				this.remove(key);
			}
		}
	}
	//Access Global
	window.Session = new Session();

})();