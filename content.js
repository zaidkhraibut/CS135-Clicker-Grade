// Parses doc for tables, gets mark table, parse for table rows, assigns
//   variable to each table row

var tables = document.getElementsByTagName("table");
var clickerTable = tables[1];
var tableRows = clickerTable.getElementsByTagName("tr");
var titles = tableRows[0];
var marksRow = tableRows[1];

// Creates <th>"Total"</th> element and appends to titles row
var totalTitle = document.createElement("th");
totalTitle.innerHTML = "Total";
titles.appendChild(totalTitle);

// Parses marks row for marks, converts string of each cell to Int, used
//   toFixed(2) to return percentage at 2 decimal places
var marks = clickerTable.getElementsByTagName("td");
var correct = parseInt(marks[0].innerHTML);
var answered = parseInt(marks[1].innerHTML);
var incorrect = answered - correct;
var unanswered = parseInt(marks[2].innerHTML);
var total = (correct * 2) + incorrect;
var totalMarksAvailable = (answered + unanswered) * 2;
var totalClickerPercentage = ((total/totalMarksAvailable).toFixed(2)) * 100;

// Creates <td>...</td> element and appends to titles row
var totalMarks = document.createElement("td");
totalMarks.style.textAlign = "center";
totalMarks.innerHTML = total+"/"+totalMarksAvailable + " (" +totalClickerPercentage+"%)";
marksRow.appendChild(totalMarks);
