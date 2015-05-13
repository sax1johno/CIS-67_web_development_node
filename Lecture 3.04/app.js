var util = require('./util'),
    fs = require('fs'),
    sutil = require('util'),
    Parent = require('./Parent'),
    Student = require('./Student').Student,
    
    express = require('express');
    
var p = new Parent();

p.setPassword("Test");
