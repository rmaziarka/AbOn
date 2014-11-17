
var db = require('../models')

module.exports = function(app){

    app.get('/api/offers/getOffers',function(req,res){
        var data = {
            offers: [
                {name: 'super oferta', producerPrice: 123.42, ourPrice: 100.00, saving: 23.42},
                {name: 'inna oferta', producerPrice: 150.3, ourPrice: 120.00, saving: 30.3}
            ],
            offersNumber: 2,
            selectedCategory: {
                id: 12,
                name: 'Główna kategoria',
                children: [
                    {id: 32, name: 'Pomniejsza', offersNumber: 1},
                    {id: 43, name: 'Jeszcze mniejsza', offersNumber: 1}
                ]
            }
        };

        res.json(data);
    });

    app.get('*', function(req, res){
        db.Category.findAll({include:[db.Offer]}).success(function(categories){

            db.Offer.count().success(function(count){
                res.locals.title = count;
                res.render('index.vash');
            });
        });

    });

}

