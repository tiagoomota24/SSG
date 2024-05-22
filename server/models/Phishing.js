module.exports = (sequelize, DataTypes) => {
    const PhishingContent = sequelize.define("PhishingContent", {
      intro: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      howItWorks: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      howToIdentify: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    return PhishingContent;
  };
  