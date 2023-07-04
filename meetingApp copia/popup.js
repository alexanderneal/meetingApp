// Code for the popup window

const membersList = document.getElementById("members-list");
const totalCost = document.getElementById("total-cost");

let members = [];

// Load and parse CSV file
const csvFilePath = 'team_salaries.csv';

fetch(csvFilePath)
  .then((response) => response.text())
  .then((data) => {
    try {
      const rows = data.split('\n');
      const headers = rows[0].split(';');

      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(';');

        if (values.length === headers.length) {
          const member = {};

          for (let j = 0; j < headers.length; j++) {
            const header = headers[j].trim();
            const value = values[j].trim();
            member[header] = value;
          }

          // Calculate hourly cost based on salary
          member.costPerHour = (parseFloat(member.Salary) / 52 / 40).toFixed(2);

          members.push(member);
        }
      }

      renderMembersList();
      calculateTotalCost();
    } catch (error) {
      console.error('Error parsing CSV data:', error);
    }
  })
  .catch((error) => {
    console.error('Error loading CSV file:', error);
  });

function renderMembersList() {
  membersList.innerHTML = "";

  members.forEach((member) => {
    const memberEl = document.createElement("div");
    memberEl.classList.add("member");
    memberEl.innerHTML = `
      <div class="member-icon"></div>
      <div class="member-name">${member.Name}</div>
      <div class="member-cost">${member.costPerHour} €/hr</div>
    `;
    membersList.appendChild(memberEl);
  });

  if (members.length === 0) {
    const emptyMessageEl = document.createElement("div");
    emptyMessageEl.classList.add("member-empty");
    emptyMessageEl.textContent = "No members added yet";
    membersList.appendChild(emptyMessageEl);
  }
}

function calculateTotalCost() {
  let total = 0;

  members.forEach((member) => {
    total += parseFloat(member.costPerHour);
  });

  totalCost.innerHTML = `
    <div style="color: #6bbf6b; text-align: center; font-weight: bold; font-family: 'Source Sans Pro', sans-serif;">${total.toFixed(2)} €</div>
    <div style="color: black; text-align: center;">Total Cost:</div>
  `;
}
