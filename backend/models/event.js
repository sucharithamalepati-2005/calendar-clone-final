module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    allDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#3788d8'
    },
    recurrence: {
      type: DataTypes.STRING,
      allowNull: true
      // e.g. store RRULE or simple strings like "DAILY", "WEEKLY"
    }
  });

  return Event;
};
