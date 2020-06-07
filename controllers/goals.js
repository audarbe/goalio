var Goal = require("../models/goal");
var Milestones = require("../models/milestone");
var Category = require("../models/category");
var User = require("../models/user");

module.exports = {
  index,
  new: newGoal,
  create,
  delete: deleteGoal,
  show,
  update,
};

function index(req, res) {
  if (!req.user) {
    res.redirect("/");
  } else {
    Goal
      .find({ userId: req.user._id })
      .populate('milestone')
      .sort('-updatedAt')
      .exec(function (err, goals) {
        res.render("goals/index", {
          goals
        });
      });
  };
};

function newGoal(req, res) {
  let category = Category.schema.path('category').enumValues;
  if (!req.user) {
    res.redirect("../index");
  } else {
    res.render("goals/new", {
      category
    });
  };
}

function create(req, res) {
  console.log('create')
  const goal = new Goal(req.body);
  //user
  req.user.goals.push(goal);
  goal.userId = req.user._id;
  req.user.save(function (err) {
    if (err) {
      console.log(err, "rep.user.save");
      res.redirect("/goals/new");
    } else {
      //goal
      goal.save(function (err) {
        if (err) {
          console.log(err, "error goal.save");
          return res.redirect("/goals/new");
        } else {
          res.redirect("/goals");
        }
      });
    }
  });
}

function deleteGoal(req, res) {
  Goal.findOneAndDelete({ _id: req.params.id, },
    function (err, goal) {
      if (err) {
        console.log(err, "delete error");
      } else {
        User.findById(req.user._id, function (err, user) {
          if (err) {
            console.log(err, 'error > user delete goal')
          } else {
            user.goals.remove(goal)
            user.save(function (err) {
              if (err) {
                console.log(err, "error goal.save");
                res.redirect(`/goals/`);
              } else {
                res.redirect(`/goals/`);
              }
            });
          }
        });
      }
    }
  );
}

function show(req, res) {
  let category = Category.schema.path('category').enumValues;
  Goal
    .findById(req.params.id)
    .populate('milestones')
    .sort('-updatedAt')
    .exec(function (err, goal) {
      const totalHabits = goal.milestones.reduce(function (acc, h) {
        return acc + h.habits.length;
      }, 0)
      res.render("goals/show", {
        goal,
        totalHabits,
        category
      });
    });
}

function update(req, res) {
  Goal.findOneAndUpdate({ _id: req.params.id, },
    {
      $set: {
        goalName: req.body.goalName,
        priority: req.body.priority,
        difficulty: req.body.difficulty,
        daysToComplete: req.body.daysToComplete,
        categories: req.body.categories,
      },
    },
    { new: true }
  ).exec(function (err, goal) {
    if (err) {
      console.log(err);
      res.redirect("/goals/edit");
    } else {
      res.redirect(`/goals/${goal._id}`);
    }
  });
}