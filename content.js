// Author by: Zaid Khraibut
// zkhraibu@edu.uwaterloo.ca


//  Appends any <html tag> and its content to a parent
//  appendCell: <html tag> string <html tag>
//  Example: appendCell("th", "Total", clickerTitles);
function appendElement(tag, inner, parent) {
  var cellData = document.createElement(tag);
  cellData.innerHTML = inner;
  cellData.style.textAlign = "center";
  parent.appendChild(cellData);
};


// Parses doc for tables
var tables = document.getElementsByTagName("table");

// Assigns variables to clicker table, 1st row (clickerTitle) and 2nd row (clickerMarksRow)
// and adjusts clicker table width
var clickerTable = tables[1];
clickerTable.style.width = "55%";
var clickerTableRows = clickerTable.getElementsByTagName("tr");
var clickerTitles = clickerTableRows[0];
var clickerMarksRow = clickerTableRows[1];
// Assigns variable to assignment table
var assTable = tables[2];
var assTableRows = assTable.getElementsByTagName("tr");


// Parses clickerMarksRow for marks, converts string of each cell to Int, used
// toFixed(2) to return percentage at 2 decimal places
var clickerMarks = clickerTable.getElementsByTagName("td");
var correct = parseInt(clickerMarks[0].innerHTML);
var answered = parseInt(clickerMarks[1].innerHTML);
var unanswered = parseInt(clickerMarks[2].innerHTML);
var incorrect = answered - correct;
var clickerGradeTotal = (correct * 2) + incorrect;
var totalMarksAvailable = (answered + unanswered) * 2;
var totalClickerPercentage = ((clickerGradeTotal/totalMarksAvailable).toFixed(2)) * 100;
var weightedClickerMark = ((totalClickerPercentage/75) * 100).toFixed(2);
if (weightedClickerMark >= 100) {
  weightedClickerMark = 100;
}
var clickerMarkCellText = clickerGradeTotal+"/"+totalMarksAvailable;
var participationCellText = totalClickerPercentage+"%"+" | <strong>W: "+weightedClickerMark+"</strong>";

// Appends "Total" and " Participation Mark" to titles row
appendElement("th", "Total", clickerTitles);
appendElement("th", "Participation Mark", clickerTitles);
// Appends clickerMarkCellText and totalClickerPercentage to clicker grade row
appendElement("td", clickerMarkCellText, clickerMarksRow);
appendElement("td", participationCellText, clickerMarksRow);


// Adds content of the third element of a  onto the next 3rd element of each row
// until the the end of the table
// getAssMarks: Int -> Float
function getAssMarks(row) {
  if (row >= assTableRows.length) {
    return 0;
  } else {
    var mark = parseFloat(assTableRows[row].getElementsByTagName("td")[2].innerHTML);
    return mark + getAssMarks(row + 1);
  }
};

// Collects marks starting from the third row, divides mark by total number of rows to determine average
totalAssMarks = getAssMarks(2);
var finalAssGrade = (totalAssMarks/(assTableRows.length - 2)).toFixed(2);

// Finds body of assignment table and appends three <td> tags to it with relevent text
var assTableBody = assTable.getElementsByTagName("tbody")[0];
var lastAssRowText = "<td><strong>Final</strong></td><td><strong>100</strong></td><td><strong>"+finalAssGrade+"</strong></td>"
appendElement("tr", lastAssRowText, assTableBody);
