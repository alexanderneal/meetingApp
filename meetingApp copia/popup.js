const membersList = document.getElementById("members-list");
const totalCostEl = document.getElementById("total-cost");

let members = [];

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

  if (members.length === 0) {
    const emptyMessageEl = document.createElement("li");
    emptyMessageEl.classList.add("member-empty");
    emptyMessageEl.textContent = "No members added yet";
    membersList.appendChild(emptyMessageEl);
  }
}

function calculateTotalCost() {
  const totalCost = members.reduce((sum, member) => {
    return sum + member.salary;
  }, 0);

  totalCostEl.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}

function loadDataFromCSV() {
  Papa.parse("team_salaries.csv", {
    download: true,
    header: true,
    complete: function (results) {
      members = results.data.map((row) => {
        const name = row.Name;
        const salary = parseInt(row.Salary);
        const costPerHour = salary / 52 / 40;

        return {
          name: name,
          salary: salary,
          costPerHour: costPerHour,
        };
      });

      renderMembersList();
      calculateTotalCost();
    },
    error: function (error) {
      console.error("Error:", error);
      members = [];
      renderMembersList();
      calculateTotalCost();
    },
  });
}

loadDataFromCSV();
