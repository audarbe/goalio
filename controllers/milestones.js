var Goal = require("../models/goal");
var Milestone = require("../models/milestone");
var Habit = require("../models/habit");

module.exports = {
  index,
  create,
  delete: removeMilestone,
  show,
  update
}

function index(req, res) {
  if (!req.user) {
    res.redirect("/");
  } else {
    Milestone
      .find({ userId: req.user._id })
      .populate('habits')
      .sort('-updatedAt')
      .exec(function (err, milestones) {
        res.render("milestones/index", {
          milestones
        })
      });
  };
};

function create(req, res) {
  const milestone = new Milestone(req.body);
  milestone.userId = req.user._id;
  milestone.goalId = req.params.id;
  milestone.save(function (err) {
    Goal.findById(req.params.id, function (err, goal) {
      goal.milestones.push(milestone);
      goal.save(function (err) {
        if (err) return res.redirect(`/goals/${req.params.id}`);
        res.redirect(`/goals/${req.params.id}`);
      });
    });
  });
};

function removeMilestone(req, res) {
  Milestone.findByIdAndRemove(req.params.id, function (err, milestone) {
    Goal.findById(milestone.goalId, function (err, goal) {
      goal.milestones.remove(milestone);
      goal.save(function (err) {
        if (err) return res.redirect(`/goals/${req.params.id}`);
        res.redirect(`/goals/${milestone.goalId}`);
      });
    });
  });
};

function show(req, res) {
  Milestone.findById(req.params.id, function (err, milestone) {
    Habit.find({ milestoneId: req.params.id }, function (err, habits) {
      Goal.findById(milestone.goalId, function (err, goal) {
        res.render('./milestones/show', {
          milestone,
          goal,
          habits
        });
      });
    });
  })
};

function update(req, res) {
  Milestone.findOneAndUpdate({ _id: req.params.id },
    {
      $set: {
        milestoneName: req.body.milestoneName,
        numberOfDays: req.body.numberOfDays,
      },
    },
    { new: true }
  ).exec(function (err, milestone) {
    if (err) return res.redirect('./milestones/edit');
      res.redirect(`./${milestone._id}`)
  });
}