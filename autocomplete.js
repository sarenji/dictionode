/*
 * This file generates a redis database that'll be used for autocompletion.
 * Currently takes words from a pre-defined list, but ideally, should be taken
 * from the Wiktionary XML file.
 * 
 * By David Peter
 */

var fs = require("fs"),
    redis = require("redis"),
    client = redis.createClient();

// Default words file (comes with Linux / Mac OS X)
var FILE  = "/usr/share/dict/words";
// The redis key to store the autocompletes under.
var REDIS_KEY = "compl";

console.log("Starting generation.");
console.log("Generating database...");
fs.readFile(FILE, "utf-8", function(err, data) {
    if (err) throw err;
    var words = data.split("\n");
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        for (var j = 1; j <= word.length; j++) {
            var prefix = word.substr(0, j);
            client.zadd(REDIS_KEY, 0, prefix);
        }
        client.zadd(REDIS_KEY, 0, word + "*");
    }
    console.log("Saving...");
    client.save();
    console.log("Done generating database.");
    client.quit();
});
