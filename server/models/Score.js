module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('Score', {
      time: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    });

    Score.associate = (models) => {
        Score.belongsTo(models.User);
        };
  
    return Score;
  };
  