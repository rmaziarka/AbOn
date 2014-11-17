module.exports = function(sequelize,Sequelize){
    var Category = sequelize.define('Category',{
        name:Sequelize.STRING
    },{
        tableName: 'category',
        timestamps: false,
        classMethods:{
            associate: function(models){
                Category.hasMany(models.Offer,{foreignKeyConstraint:true, foreignKey:'category_id'});

                Category.belongsTo(Category, {as:'Parent', foreignKey:'parent_id', foreignKeyConstraint:true});
                Category.hasMany(Category, {as:'Children',foreignKey:'parent_id', foreignKeyConstraint:true});
            }
        }
    });

    return Category;
}