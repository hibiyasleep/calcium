#!/usr/bin/env cake

{ exec } = require 'child_process'
fs = require 'fs'

task 'build', 'Build src/*.coffee files into lib/*.js and bin/*.bin.js', ->
    exec 'coffee -o lib/ -c src/calcium.coffee', (err, stdout, stderr) ->
        console.log 'coffee -o lib/ -c src/calcium.coffee'
        throw err if err
        console.log stdout
        console.error stderr

task 'clean', 'Clear all built files', ->
    fs.unlink 'lib/calcium.js', (err, done) ->
        console.log 'lib/calcium.js'
        throw err if err
