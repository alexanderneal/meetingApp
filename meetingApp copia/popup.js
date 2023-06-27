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
});

function renderMembersList() {
  membersList.innerHTML = "";

  members.forEach((member) => {
    const memberEl = document.createElement("div");
    memberEl.classList.add("member");
    memberEl.innerHTML = `
      <div class="member-icon"></div>
      <div class="member-name">${member.name}</div>
      <div class="member-cost">$${member.costPerHour.toFixed(2)} / hr</div>
    `;
    membersList.appendChild(memberEl);
  });
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
