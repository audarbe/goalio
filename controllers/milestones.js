var Goal = require("../models/goal");
var Milestone = require("../models/milestone");
var Habit = require("../models/habit");

module.exports = {
  create,
  delete: removeMilestone,
  show,
  edit,
  update
}

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

function edit(req, res) {
  Milestone.findById(req.params.id, function (err, milestone) {
    Goal.findById(milestone.goalId, function (err, goal) {
      if (milestone.goalId !== goal._id.toString()) {
        res.redirect("milestones/show");
      } else {
        res.render("./milestones/edit", {
          milestone,
          goal
        });
      }
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
        // res.render(`./milestones/show`, {
        //     milestone,
        //     goal,
        //     habits: milestone.habits,
        //     dailyProgress: milestone.habits.dailyProgress
        // });
      });
    }
  });
}