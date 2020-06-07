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
    if (err) {
      console.log(err, "error goal.save");
    } else {
      Goal.findById(req.params.id, function (err, goal) {
        if (err) {
          console.log(err, 'error > milestone > goal.save')
        } else {
          goal.milestones.push(milestone);
          goal.save(function (err) {
            if (err) {
              console.log(err, "error goal.save");
              res.redirect(`/goals/${req.params.id}`);
            } else {
              res.redirect(`/goals/${req.params.id}`);
            }
          });
        }
      });
    };
  });
}

function removeMilestone(req, res) {
  Milestone.findByIdAndRemove(req.params.id,
    function (err, milestone) {
      if (err) {
        console.log(err, "delete milestone error");
      } else {
        Goal.findById(milestone.goalId, function (err, goal) {
          if (err) {
            console.log(err, 'error > milestone > goal.save')
          } else {
            goal.milestones.remove(milestone);
            goal.save(function (err) {
              if (err) {
                console.log(err, "error goal.save");
                res.redirect(`/goals/${req.params.id}`);
              } else {
                res.redirect(`/goals/${milestone.goalId}`);
              }
            });
          }
        })
      }
    }
  )
}

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
  Milestone.findOneAndUpdate(req.params.id,
    {
      $set: {
        milestoneName: req.body.milestoneName,
        numberOfDays: req.body.numberOfDays,
      },
    },
    { new: true }
  ).exec(function (err, milestone) {
    if (err) {
      console.log(err);
      res.redirect('./milestones/edit');
    } else {
      Goal.findById(milestone.goalId, function (err, goal) {
        res.redirect(`./${milestone._id}`)
      });
    }
  });
}