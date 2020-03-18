var fs = require('fs');
var UglifyJS = require("uglify-js");
const { exec } = require('child_process');
if( !fs.existsSync( 'dist/' ) ) {
        fs.mkdirSync( 'dist' );
}

var dom = fs.readFileSync( 'lyte-dom.js', 'utf8' );
fs.writeFile( 'dist/lyte-dom.js', dom , ( err ) => {
    if( err ) {
        throw err;
	}
} );

var min = UglifyJS.minify( dom );
fs.writeFile( 'dist/lyte-dom.min.js', min.code , ( err ) => {
	if( err ) {
		throw err;
	}
} );

var migrate = fs.readFileSync( 'lyte-dom-migrate.js', 'utf-8' );

fs.writeFile( 'dist/lyte-dom-migrate.js', migrate, ( err ) => {
	if( err ) {
		throw err;
	}
} );

var migmin = UglifyJS.minify( migrate );

fs.writeFile( 'dist/lyte-dom-migrate.min.js', migmin.code, ( err ) => {
	if( err ) {
		throw err;
	}
} );

if( !fs.existsSync( 'dist/modules' ) ) {
	fs.mkdirSync( 'dist/modules' );
}

var events = fs.readFileSync( 'modules/lyte-dom-events.js', 'utf8' ),
utils = fs.readFileSync( 'modules/lyte-dom-utils.js', 'utf8' ),
ajax = fs.readFileSync( 'modules/lyte-dom-ajax.js', 'utf8' ),
traversal = fs.readFileSync( 'modules/lyte-dom-traversal.js', 'utf8' );


var eventsmin = UglifyJS.minify( events ),
utilsmin = UglifyJS.minify( utils ),
ajaxmin = UglifyJS.minify( ajax ),
traversalmin = UglifyJS.minify( traversal );

fs.writeFile( 'dist/modules/lyte-dom-events.js', events, ( err ) => {
	if( err ) {
		throw err;
	}
} );

fs.writeFile( 'dist/modules/lyte-dom-events.min.js', eventsmin.code, ( err ) => {
	if( err ) {
		throw err;
	}
} );

fs.writeFile( 'dist/modules/lyte-dom-utils.js', utils, ( err ) => {
	if( err ) {
		throw err;
	}
} );

fs.writeFile( 'dist/modules/lyte-dom-utils.min.js', utilsmin.code, ( err ) => {
	if( err ) {
		throw err;
	}
} );

fs.writeFile( 'dist/modules/lyte-dom-ajax.js', ajax, ( err ) => {
	if( err ) {
		throw err;
	}
} );

fs.writeFile( 'dist/modules/lyte-dom-ajax.min.js', ajaxmin.code, ( err ) => {
	if( err ) {
		throw err;
	}
} );

fs.writeFile( 'dist/modules/lyte-dom-traversal.js', traversal, ( err ) => {
	if( err ) {
		throw err;
	}
} );

fs.writeFile( 'dist/modules/lyte-dom-traversal.min.js', traversalmin.code, ( err ) => {
	if( err ) {
		throw err;
	}
} );
