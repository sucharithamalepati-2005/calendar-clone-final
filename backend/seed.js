const db = require('./models');

async function seed() {
  await db.sequelize.sync({ force: true });
  await db.Event.bulkCreate([
    {
      title: 'Orientation',
      description: 'Project orientation session',
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 0, 0, 0)),
      allDay: false,
      color: '#1e90ff'
    },
    {
      title: 'Study: Algorithms',
      description: 'Study session',
      start: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(16, 0, 0, 0),
      end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(18, 0, 0, 0),
      allDay: false,
      color: '#ff7f50'
    }
  ]);
  console.log('Seed complete');
  process.exit(0);
}

seed();
