const { Event } = require('../models');
const { Op } = require('sequelize');

/**
 * Basic overlap check
 * returns true if [start,end] overlaps any existing event (excluding optional id)
 */
async function hasOverlap(start, end, excludeId = null) {
  const where = {
    [Op.or]: [
      {
        start: { [Op.between]: [start, end] }
      },
      {
        end: { [Op.between]: [start, end] }
      },
      {
        start: { [Op.lte]: start },
        end: { [Op.gte]: end }
      }
    ]
  };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  const count = await Event.count({ where });
  return count > 0;
}

exports.list = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, start, end, allDay, color, recurrence } = req.body;
    if (!title || !start || !end) return res.status(400).json({ error: 'Missing fields' });

    // Basic overlap check (configurable)
    const overlapped = await hasOverlap(new Date(start), new Date(end));
    if (overlapped) {
      // for assignment, we just warn; you can change to reject
      // return res.status(409).json({ error: 'Event overlaps an existing event' });
      // we'll still allow but include a flag
      console.warn('Overlap detected while creating event');
    }

    const event = await Event.create({ title, description, start, end, allDay, color, recurrence });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, start, end, allDay, color, recurrence } = req.body;
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Not found' });

    const overlapped = await hasOverlap(new Date(start), new Date(end), id);
    if (overlapped) {
      console.warn('Overlap detected while updating event');
    }

    await event.update({ title, description, start, end, allDay, color, recurrence });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    await event.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
