var fs = require('fs')
    ,path = require('path')
    ,Sequelize = require('sequelize')
    ,sequelize = new Sequelize('abon','postgres',123123,{
        dialect:'postgres',
        port: 5432
    })
    ,db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf('.') !== 0 ) && (file != 'index.js');
    })
    .forEach(function(file){
        var model = sequelize.import(path.join(__dirname,file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName){
    if('associate' in db[modelName]){
        db[modelName].associate(db);
    }
})

db.sequelize = sequelize;
db.Sequlelize = Sequelize;

module.exports = db;