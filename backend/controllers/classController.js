import FitnessClass from '../models/FitnessClass.js';

export const createClass = async (req, res) => {
  try {
    const fitnessClass = await FitnessClass.create(req.body);
    res.status(201).json({ success: true, data: fitnessClass });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const { filter } = req.query;
    let query = { status: 'active' };
    
    if (filter === 'upcoming') {
      query.date = { $gte: new Date() };
    } else if (filter === 'past') {
      query.date = { $lt: new Date() };
    }

    const classes = await FitnessClass.find(query).sort({ date: 1, time: 1 });
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getClass = async (req, res) => {
  try {
    const fitnessClass = await FitnessClass.findById(req.params.id);
    if (!fitnessClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ success: true, data: fitnessClass });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const fitnessClass = await FitnessClass.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!fitnessClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ success: true, data: fitnessClass });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const fitnessClass = await FitnessClass.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!fitnessClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ success: true, message: 'Class cancelled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};