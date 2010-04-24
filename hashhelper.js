function HashHelper( delayOrFunc )
{
	this.delay = "number" === typeof delayOrFunc && window.NaN !== window.parseInt( delayOrFunc ) ? window.parseInt( delayOrFunc ) : 300;
	this.oldHash = this.get( );
	this.interval = null;
	this.onChange = "function" === typeof delayOrFunc ? delayOrFunc : function( ){ };
}

HashHelper.prototype.get = function( )
{
	return window.location.hash.slice( 1 );
};

HashHelper.prototype.set = function( arg )
{
	window.location.hash = ( '#' !== arg[ 0 ] ? '#' : '' ) + arg;
};

HashHelper.prototype.check = function( )
{
	var     newHash = this.get( ),
		changed = newHash !== this.oldHash;

	this.oldHash = newHash;

	if( true === changed ){ this.onChange( newHash ); }
};

HashHelper.prototype.start = function( )
{
	this.check( );

	if( null === this.interval )
	{
		var that = this;
		this.interval = window.setInterval( function( ){ that.check.call( that ); }, this.delay );
	}
};

HashHelper.prototype.stop = function( )
{
	if( null !== this.interval )
	{
		window.clearInterval( this.interval );
		this.interval = null;
	}
};
