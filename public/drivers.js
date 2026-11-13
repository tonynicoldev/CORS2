
async function loadDrivers(year = "2026") {

  const tableBody = document.querySelector("#driversTable tbody");
  tableBody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  try {

    // Demo CORS. Try to PUT to the site. Browser will preflight to check this is allowed - and it isn't
    // const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverstandings/`, { method: "PUT" });

    // Demo CORS with a non-simple GET by adding a non=standard header to force a preflight. This site is poor and must use something like app.use(cors())
    // const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverstandings/`, {headers: {"x-test": "Force a preflight options request"}});

    
    // Standard simple CORS request, browser assumes it will work so for efficiency, no preflight sent
    const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverstandings/`);
    const data = await response.json();
    
    const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    tableBody.innerHTML = "";

    for (let i = 0; i < standings.length; i++) {
      const row = document.createElement("tr");
      let standing = standings[i];

      row.innerHTML = `
        <td>${standing.position}</td>
        <td>${standing.Driver.familyName}</td>
        <td>${standing.points}</td>
      `;

      tableBody.appendChild(row);
    };

  } catch (error) {
    tableBody.innerHTML = "<tr><td colspan='4'>Error loading data</td></tr>";
  }
}

loadDrivers();

console.log(`Should see this before the table loads to show that it is async but there is nothing else to do but wait. Can still interact with the page`);