// Code for the popup window

const membersList = document.getElementById("members-list");
const totalCost = document.getElementById("total-cost");

let members = [];

// Load and parse CSV file
const csvFilePath = 'team_salaries.csv';

fetch(csvFilePath)
  .then((response) => response.text())
  .then((data) => {
    const parsedData = Papa.parse(data, { header: true }).data;
    parsedData.forEach((row) => {
      const name = row.Name;
      const salary = parseFloat(row.Salary);
      const costPerHour = (salary / 52 / 40).toFixed(2);

      const member = {
        name: name,
        salary: salary,
        costPerHour: costPerHour,
      };

      members.push(member);
    });

    renderMembersList();
    calculateTotalCost();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function renderMembersList() {
  membersList.innerHTML = "";

  members.forEach((member) => {
    const memberEl = document.createElement("div");
    memberEl.classList.add("member");
    memberEl.innerHTML = `
      <div class="member-icon"></div>
      <div class="member-name">${member.name}</div>
      <div class="member-cost">${member.costPerHour} €/hr</div>
    `;
    membersList.appendChild(memberEl);
  });

  if (members.length === 0) {
    const emptyMessageEl = document.createElement("li");
    emptyMessageEl.classList.add("member-empty");
    emptyMessageEl.textContent = "No members added yet";
    membersList.appendChild(emptyMessageEl);
  }
}

function calculateTotalCost() {
  let total = 0;

  members.forEach((member) => {
    total += parseFloat(member.costPerHour) * 2; // Assuming meeting duration of 2 hours
  });

  totalCost.textContent = `Total Cost: ${total.toFixed(2)} €`;
}
