var Goal = require('../models/goal');

module.exports = {
  index,
  new: newGoal,
  create,
  delete: deleteGoal
};

function index(req, res) {
  Goal.find({ userId: req.user._id }, function (err, goals) {
    res.render('goals/index', {
      goals
    });
  });
}

function newGoal(req, res) {
  res.render('goals/new');
};


function create(req, res) {
  const goal = new Goal(req.body);
  req.user.goals.push(goal)
  req.user.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      goal.save(function (err) {
        if (err) {
          console.log(err);
          return res.redirect('/goals/new');
        } else {
          res.redirect('/goals');
        }
      });
    };
  });
}

function deleteGoal(req, res) {
  Goal.findOneAndDelete({
    '_id': req.params.id
  }, function (err, goal) {
    res.redirect(`/goals/`)
  })
}

