var Milestone = require("../models/milestone");
var Habit = require("../models/habit");

module.exports = {
  create,
  update,
  delete: removeHabit
};

function create(req, res) {
  const habit = new Habit(req.body);
  Milestone.findById(req.params.id, function (err, milestone) {
    milestone.habits.push(habit);
    milestone.save(function (err) {
      habit.milestoneId = req.params.id;
      for (let i = 0; i < habit.totalDays; i++) {
        const day = { day: i + 1, complete: false, habitId: habit._id }
        habit.dailyProgress.push(day);
      };
      habit.save(function (err) {
        res.redirect(`./`);
      });
    });
  });
};

function update(req, res) {
  Habit.findById(req.params.id, function (err, habit) {
    habit.dailyProgress.forEach(function (p) {
      if (req.body.dailyProgress.includes(p.day.toString())) {
        p.complete = true;
      } else {
        p.complete = false;
      }
    })
    habit.save(function (err) {
      res.redirect(`../`);
    });
  });
};

function removeHabit(req, res) {
  Habit.findByIdAndRemove(req.params.id, function (err, habit) {
    Milestone.findById(habit.milestoneId, function (err, milestone) {
      milestone.habits.remove(habit)
      milestone.save(function (err) {
        res.redirect(`../`);
      })
    });
  });
}