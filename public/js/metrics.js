//TODO
"use strict";
//Mock data -- not connected to DB
var xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var yValues = [8, 7, 12, 8, 12, 8, 7, 12, 8, 7, 12, 15, 18, 21];
var barColors = ["red", "orange", "yellow", "lime"];

grf = document.getElementsByClassName("graph");

for (let i = 0; i < grf.length; i++) {
  //Plot the data into the graphs
  new Chart(grf[i], {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      responsive: true,
      legend: { display: false },
      title: {
        display: true,
        text: "World Wine Production 2018",
      },
    },
  });
}

function expand(id) {
  //make graphs bigger
  var item = document.getElementById(id);
  if (item.style.width != "500px") {
    item.style.width = "500px";
  } else {
    item.style.width = "150px";
  }
}
