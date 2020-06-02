var Goal = require("../models/goal");
var Milestone = require("../models/milestone");

module.exports = {
    create
}

function create(req, res) {
    const milestone = new Milestone(req.body);
    milestone.userId = req.user._id;
    milestone.goalId = req.params.id;
    milestone.save(function (err) {
        if (err) {
            console.log(err, "error goal.save");
        } else {
            Goal.findById(req.params.id, function(err, goal) {
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



