//variables
var editGoalButton = document.getElementById('edit-goal-button')
var editMilestoneButton = document.getElementById('edit-milestone-button')
var headerTextArea = document.getElementById('header-textarea')

// Event Listeners
if (editGoalButton) editGoalButton.addEventListener('click', editGoal);
if (editMilestoneButton) editMilestoneButton.addEventListener('click', editMilestone);
if (headerTextArea) headerTextArea.addEventListener('keyup', autosize);

// Functions
function editGoal() {
  console.log('click')
  document.getElementById('edit-goal-form').style.display = 'flex';
  document.getElementById('goal-details-header').style.display = 'none';
  headerTextArea.style.height = Math.min(headerTextArea.scrollHeight) + "px";
}

function editMilestone() {
  console.log('click')
  document.getElementById('edit-milestone-form').style.display = 'flex';
  document.getElementById('milestone-details-header').style.display = 'none';
  headerTextArea.style.height = Math.min(headerTextArea.scrollHeight) + "px";
}

function autosize() {
  console.log('keydown')
  headerTextArea.style.height = Math.min(headerTextArea.scrollHeight) + "px";
};