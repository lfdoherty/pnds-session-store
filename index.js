
var persistent = require('persistent-native-ds')

exports.make = function(name, cb){
	persistent.makeStringStringMap(name, function(m){
		cb(new PndsSessionStore(m))
	})
}

function PndsSessionStore(m){
	this.m = m
}

PndsSessionStore.prototype.get = function(sid, cb){
	cb(this.m.get(sid))
}
PndsSessionStore.prototype.set = function(sid, session, cb){
	this.m.put(sid, session)
	cb()
}
PndsSessionStore.prototype.destroy = function(sid, cb){
	this.m.rm(sid)
	cb()
}

PndsSessionStore.prototype.length = function(cb){
	cb(this.m.size())	
}
PndsSessionStore.prototype.clear = function(cb){
	this.m.clear()
	cb()
}

PndsSessionStore.prototype.close = function(){
	this.m.close()
}
