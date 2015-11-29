#!/usr/bin/env cake

{ exec } = require 'child_process'
fs = require 'fs'

task 'build', 'Build src/*.coffee files into lib/*.js and bin/*.bin.js', ->
    exec 'coffee -c src/calcium.coffee -o lib/calcium.js', (err, stdout, stderr) ->
        console.log 'coffee -c src/calcium.coffee -o lib/calcium.js'
        throw err if err
        console.log stdout
        console.error stderr
    exec 'coffee -c src/calcium.bin.coffee -o bin/calcium.js', (err, stdout, stderr) ->
        console.log 'coffee -c src/calcium.bin.coffee -o bin/calcium.js'
        throw err if err
        console.log stdout
        console.error stderr

task 'clean', 'Clear all built files', ->
    fs.unlink 'lib/calcium.js', (err, done) ->
        console.log 'lib/calcium.js'
        throw err if err
    fs.unlink 'bin/calcium.bin.js', (err, done) ->
        console.log 'bin/calcium.bin.js'
        throw err if err
