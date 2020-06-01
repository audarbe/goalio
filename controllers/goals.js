var Goal = require("../models/goal");

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
  Goal.find({ userId: req.user._id }, function (err, goals) {
    res.render("goals/index", {
      goals,
    });
  });
}

function newGoal(req, res) {
  res.render("goals/new");
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
          console.log(err, "goal.save");
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
    res.render("goals/show", {
      goal,
    });
  });
}

function edit(req, res) {
  Goal.findById(req.params.id, function (err, goal) {
    if (goal.userId !== req.user._id.toString()) {
      res.redirect("/goals");
    } else {
      res.render("goals/edit", {
        goal,
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
