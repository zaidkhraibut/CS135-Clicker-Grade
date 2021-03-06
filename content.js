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
}


// Parses doc for tables
var tables = document.getElementsByTagName("table");

// Assigns variables to clicker table, 1st row (clickerTitle) and 2nd row (clickerMarksRow)
//   and adjusts clicker table width
var clickerTable = tables[1];
clickerTable.style.width = "55%";
var clickerTableRows = clickerTable.getElementsByTagName("tr");
var clickerTitles = clickerTableRows[0];
var clickerMarksRow = clickerTableRows[1];
// Assigns variable to assignment table
var assTable = tables[2];
var assTableRows = assTable.getElementsByTagName("tr");

// Parses clickerMarksRow for marks, converts string of each cell to Int, used
//   toFixed(2) to return percentage at 2 decimal places
var clickerMarks = clickerTable.getElementsByTagName("td");
var correct = parseInt(clickerMarks[0].innerHTML);
var answered = parseInt(clickerMarks[1].innerHTML);
var unanswered = parseInt(clickerMarks[2].innerHTML);
var incorrect = answered - correct;
var clickerGradeTotal = (correct * 2) + incorrect;
var totalMarksAvailable = (answered + unanswered) * 2;
var totalClickerPercentage = clickerGradeTotal/totalMarksAvailable * 100;
totalClickerPercentage = totalClickerPercentage.toFixed(2);
var weightedClickerMark = ((totalClickerPercentage/75) * 100);
if (weightedClickerMark >= 100) {
  weightedClickerMark = 100;
} else {
  weightedClickerMark = weightedClickerMark.toFixed(2);
}
var clickerMarkCellText = clickerGradeTotal+"/"+totalMarksAvailable;
var participationCellText = totalClickerPercentage+"%"+" | <strong>W: "+weightedClickerMark+"</strong>";

// Appends "Total" and " Participation Mark" to titles row
appendElement("th", "Total", clickerTitles);
appendElement("th", "Participation Mark", clickerTitles);
// Appends clickerMarkCellText and totalClickerPercentage to clicker grade row
appendElement("td", clickerMarkCellText, clickerMarksRow);
appendElement("td", participationCellText, clickerMarksRow);


// Definitions used in functions below
var assignments = Symbol("Assignments");
var midterms = Symbol("Midterms");
var mark = 0;
var numOf = 0;
var numOfAss = 0;
var MT1weight = .1;
var MT2weight = .2;
var twoMidterms = false;


// Adds together the marks on a row that begins with a specific letter. Updates
//   numOf to keep track of # of assessments. Manipulates midterm mark depending
//   on the weight of the midterm
// startsWithLetter should be "M" or "A" for midterm or assignment

function collectMarks(row, startsWithLetter) {
  if (assTableRows[row].getElementsByTagName("td")[0].innerHTML.startsWith(startsWithLetter)) {
    mark = parseFloat(assTableRows[row].getElementsByTagName("td")[2].innerHTML);
    numOf++;
    if (startsWithLetter == "M") {
      if (assTableRows[row].getElementsByTagName("td")[0].innerHTML.endsWith("1")) {
        mark = mark * MT1weight;
      } else {
        mark = mark * MT2weight;
        twoMidterms = true;
      }
    }
  } else {
    mark = 0;
  }
}


// Adds together assignment or midterm marks.
// type must be the variable assignments or midterms
function getMarksFn(row, type) {
  if (row >= assTableRows.length) {
    return 0;
  } else if (type == assignments) {
      collectMarks(row, "A");
      numOfAss = numOf;
  } else if (type == midterms) {
      collectMarks(row, "M");
  }
  return mark + getMarksFn((row + 1), type);
}


// Wrapper function for getMarksFn to start counting from the correct row
function getMarks(type) {
  return getMarksFn(2, type);
}


// Collects total number of marks earned and divides by number of that type
//   of assessment to make a final grade, rounded to 2 decimal places.
var totalAssMarks = getMarks(assignments);
var finalAssGrade = totalAssMarks/numOfAss;
finalAssGrade = finalAssGrade.toFixed(2);

// Determines midterm average using midterm weights
var finalMTMark = 0;
if (twoMidterms == true) {
  finalMTMark = getMarks(midterms);
  finalMTMark = finalMTMark/(MT1weight + MT2weight);
} else {
  finalMTMark = getMarks(midterms);
  finalMTMark = finalMTMark/MT1weight;
}
finalMTMark = finalMTMark.toFixed(2);

// Finds body of "Other Marks" table
var assTableBody = assTable.getElementsByTagName("tbody")[0];

// Content to go inside of <tr> tags that will be appended to assTableBody
var midtermTotalText = "<td><strong>Weighted Midterm Avg.</strong></td><td><strong>100</strong></td><td><strong>"+finalMTMark+"</strong></td>"
var assignmentTotalText = "<td><strong>Assignment Avg.</strong></td><td><strong>100</strong></td><td><strong>"+finalAssGrade+"</strong></td>"

appendElement("tr", midtermTotalText, assTableBody);
appendElement("tr", assignmentTotalText, assTableBody);
