module.exports = function(sequelize, Sequelize){
    var Offer = sequelize.define('Offer',{
        name: Sequelize.STRING,
        producerPrice:  Sequelize.DECIMAL(10, 2),
        ourPrice: Sequelize.DECIMAL(10, 2)
    },{
        tableName: 'offer',
        timestamps: false,
        classMethods:{
            associate:function(models){
                Offer.belongsTo(models.Category,{foreignKeyConstraint:true, foreignKey:'category_id'});
            }
        }
    })
    return Offer;
}