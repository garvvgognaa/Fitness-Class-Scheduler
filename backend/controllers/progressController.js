const Progress = require('../models/Progress');

exports.getProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.userId });
    
    if (!progress) {
      progress = new Progress({ userId: req.userId, completedSessions: 0 });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { completedSessions } = req.body;
    
    let progress = await Progress.findOne({ userId: req.userId });
    
    if (!progress) {
      progress = new Progress({ userId: req.userId, completedSessions });
    } else {
      progress.completedSessions = completedSessions;
      progress.updatedAt = Date.now();
    }

    await progress.save();
    res.json({ message: 'Progress updated', progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};