// Code for the popup window
// In popup.js

const membersList = document.getElementById("members-list");
const addMemberBtn = document.getElementById("add-member-btn");

let members = [];

addMemberBtn.addEventListener("click", () => {
  const name = prompt("Enter member name:");
  const salary = parseInt(prompt("Enter member salary:"));
  const costPerHour = salary / 52 / 40;

  const member = {
    name: name,
    salary: salary,
    costPerHour: costPerHour,
  };

  members.push(member);
  renderMembersList();
  updateTotalCost();
});

function renderMembersList() {
  membersList.innerHTML = "";

  members.forEach((member) => {
    const memberEl = document.createElement("div");
    memberEl.classList.add("member");
    memberEl.dataset.minutes = 0; // set data-minutes attribute to 0
    memberEl.innerHTML = `
      <div class="member-icon"></div>
      <div class="member-name">${member.name}</div>
      <div class="member-cost">$${member.costPerHour.toFixed(2)} / hr</div>
    `;
    membersList.appendChild(memberEl);
  });
}

// Define the hourly rate
const hourlyRate = 100;

// Calculate the total cost of the meeting
function calculateTotalCost() {
  const members = document.querySelectorAll('.member');
  const totalMinutes = Array.from(members)
    .map(member => Number(member.dataset.minutes))
    .reduce((acc, curr) => acc + curr, 0);
  const totalCost = hourlyRate * (totalMinutes / 60);
  return `$${totalCost.toFixed(2)}`;
}

// Update the total cost element with the calculated value
function updateTotalCost() {
  const totalCostEl = document.getElementById('total-cost');
  totalCostEl.textContent = calculateTotalCost();
}

// Observe changes to the membersList element and update data-minutes attributes
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length > 0) {
      const addedMemberEl = mutation.addedNodes[0];
      addedMemberEl.dataset.minutes = 0;
    } else if (mutation.removedNodes.length > 0) {
      const removedMemberEl = mutation.removedNodes[0];
      const minutes = Number(removedMemberEl.dataset.minutes);
      members.splice(minutes, 1);
    }
  });
  updateTotalCost();
});
observer.observe(membersList, { childList: true });

// Call the renderMembersList function on page load
renderMembersList();

//

