var Goal = require("../models/goal");
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
  if (!req.user) return res.redirect("../index");
  res.render("goals/new", {
    category
  });
};

function create(req, res) {
  console.log('create')
  const goal = new Goal(req.body);
  req.user.goals.push(goal);
  goal.userId = req.user._id;
  req.user.save(function (err) {
    goal.save(function (err) {
      if (err) return res.redirect("/goals/new");
      res.redirect("/goals");
    });
  });
}

function deleteGoal(req, res) {
  Goal.findOneAndDelete({ _id: req.params.id, },
    function (err, goal) {
      User.findById(req.user._id, function (err, user) {
        user.goals.remove(goal)
        user.save(function (err) {
          if (err) return res.redirect(`/goals/`);
          res.redirect(`/goals/`);
        });
      });
    });
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
  Goal.findOneAndUpdate({ _id: req.params.id },
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
    if (err) return res.redirect("/goals/edit");
      res.redirect(`/goals/${goal._id}`);
  });
}