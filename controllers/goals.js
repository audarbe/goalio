var Goal = require("../models/goal");
var Milestones = require("../models/milestone");
var Category = require("../models/category");

module.exports = {
  index,
  new: newGoal,
  create,
  delete: deleteGoal,
  show,
  edit,
  update,
};

function index(req, res) {
  if (!req.user) {
    res.redirect("/");
  } else {
    Goal.find({ userId: req.user._id }, function (err, goals) {
      res.render("goals/index", {
        goals,
      });
    });
  };
}

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
  /* remove from users
   console.log(req.user.goals, 'goals before')
   const goalIdx = req.user.goals.indexOf(req.params.id)
   req.user.goals.splice(goalIdx, 1);
   or
   req.user.goals.remove(req.params.id)
   */
  Goal.findOneAndDelete({ _id: req.params.id, },
    function (err, goal) {
      if (err) {
        console.log(err, "delete error");
      } else {
        res.redirect(`/goals`);
      }
    }
  );
}

function show(req, res) {
  Goal.findById(req.params.id, function (err, goal) {
    Milestones.find({ goalId: req.params.id }, function(err, milestones) {
      res.render("goals/show", {
        goal,
        milestones
      });
    })
  });
}

function edit(req, res) {
  let category = Category.schema.path('category').enumValues;
  Goal.findById(req.params.id, function (err, goal) {
    if (goal.userId !== req.user._id.toString()) {
      res.redirect("/goals");
    } else {
      res.render("goals/edit", {
        goal,
        category
      });
    }
  });
}

function update(req, res) {
  Goal.findOneAndUpdate({ _id: req.params.id, },
    {
      $set: {
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
      res.render("goals/show", {
        goal,
      });
    }
  });
}