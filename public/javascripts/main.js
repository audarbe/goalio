//variables
var editGoalButton = document.getElementById('edit-goal-button')
var headerTextArea = document.getElementById('page-header-textarea')

// Event Listeners
if (editGoalButton) editGoalButton.addEventListener('click', editGoal);
if (headerTextArea) headerTextArea.addEventListener('keyup', autosize);

// Functions
function editGoal() {
  console.log('click')
  document.getElementById('edit-goal-form').style.display = 'flex';
  document.getElementById('goal-details-header').style.display = 'none';
  headerTextArea.style.height = Math.min(headerTextArea.scrollHeight) + "px";
}

function autosize() {
  console.log('keydown')
  headerTextArea.style.height = Math.min(headerTextArea.scrollHeight) + "px";
};