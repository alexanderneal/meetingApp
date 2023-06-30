// Code for the popup window
// In popup.js

const membersList = document.getElementById("members-list");
const totalCostElement = document.getElementById("total-cost");

let members = [];
let meetingDuration = 2; // Meeting duration in hours

function calculateMeetingCost() {
  let totalCost = 0;
  members.forEach((member) => {
    totalCost += member.costPerHour * meetingDuration;
  });
  return totalCost.toFixed(2);
}

function renderMembersList() {
  membersList.innerHTML = "";

  members.forEach((member) => {
    const memberEl = document.createElement("div");
    memberEl.classList.add("member");
    memberEl.innerHTML = `
      <div class="member-icon"></div>
      <div class="member-name">${member.name}</div>
      <div class="member-cost">$${(member.costPerHour * meetingDuration).toFixed(2)}</div>
    `;
    membersList.appendChild(memberEl);
  });

  if (members.length === 0) {
    const emptyMessageEl = document.createElement("li");
    emptyMessageEl.classList.add("member-empty");
    emptyMessageEl.textContent = "No members added yet";
    membersList.appendChild(emptyMessageEl);
  }

  totalCostElement.textContent = `Total Cost: $${calculateMeetingCost()}`;
}

// Load and parse CSV file
const csvFilePath = 'team_salaries.csv';

fetch(csvFilePath)
  .then((response) => response.text())
  .then((data) => {
    const parsedData = Papa.parse(data, { header: true }).data;
    parsedData.forEach((row) => {
      const name = row.Name;
      const salary = parseInt(row.Salary);
      const costPerHour = salary / 52 / 40;

      const member = {
        name: name,
        salary: salary,
        costPerHour: costPerHour,
      };

      members.push(member);
    });

    renderMembersList();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
