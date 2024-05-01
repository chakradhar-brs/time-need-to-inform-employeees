
document.getElementById("submit").addEventListener("click", function() {
    const n = parseInt(document.getElementById("nInput").value);
    const headID = parseInt(document.getElementById("headIDInput").value);
    const managerInput = document.getElementById("managerInput").value;
    const manager = managerInput.split(",").map(Number);
    const informTimeInput = document.getElementById("informTimeInput").value;
    const informTime = informTimeInput.split(",").map(Number);

    const result = numOfMinutes(n, headID, manager, informTime);

    document.getElementById("output").innerText =
      "Time needed to inform all employees: " + result;
  });

  document.getElementById("nInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

  document.getElementById("headIDInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

  document.getElementById("managerInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

  document.getElementById("informTimeInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });

  const numOfMinutes = function(n, headID, manager, informTime) {
    const map = {};

    // Build adjacency list representation of the hierarchy
    for (let i = 0; i < manager.length; i++) {
      if (!map[manager[i]]) {
        map[manager[i]] = [i];
      } else {
        map[manager[i]].push(i);
      }
    }

    let res = 0;

    // Depth-first search to calculate the time
    const dfs = (node, time) => {
      if (map[node]) {
        for (let curr of map[node]) {
          dfs(curr, time + informTime[curr]);
        }
      } else {
        res = Math.max(res, time);
      }
    };

    // Start DFS from the head
    dfs(headID, informTime[headID]);

    return res;
  };

  // Add this script to clear the input field on page load
  document.addEventListener('DOMContentLoaded', function() {
    var nInput = document.getElementById('nInput');
    nInput.value = ''; 
    var headIDInput = document.getElementById('headIDInput');
    headIDInput.value = ''; 
    var managerInput = document.getElementById('managerInput');
    managerInput.value = ''; 
    var informTimeInput = document.getElementById('informTimeInput');
    informTimeInput.value = ''; 
  });
