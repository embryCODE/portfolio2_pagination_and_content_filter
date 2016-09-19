var $students = $(".student-list li"); // Total students regardless of search selection.
var searchResults = $students; // Total students selected by search. Initialized as total students.
var studentsPerPage = 10; // Entered here as variable so it can be changed if desired.
var $studentName = $(".student-details h3");
var $studentEmail = $(".email");



// Create search div
var $searchDiv = $('<div class="student-search"></div>');
var $searchInput = $('<input placeholder="Search for students...">');
var $searchButton = $('<button>Search</button>');

$searchDiv.append($searchInput);
$searchDiv.append($searchButton);

$(".page-header").append($searchDiv);

// Create pagination div
var createPaginationDiv = function() {
	
	$(".pagination").remove();
	
	// Calculate number of pages necessary based on students in search results and students per page.
	var numberOfStudents = searchResults.length;
	var necessaryPages = Math.ceil(numberOfStudents / studentsPerPage);
	
	// Initialize new elements to build pagination div.	
	var $paginationDiv = $('<div class="pagination"></div>')
	var $paginationUl = $("<ul></ul>");
	var $paginationLi;
	var $paginationLink;
	
	// No pagination div created if only one page necessary.
	if (necessaryPages > 1) {
		
		// Create ul outside of loop.
		$paginationDiv.append($paginationUl);
		
		// Loop to create li and a.
		for (var i = 0; i < necessaryPages; i++) {
			$paginationLi = $("<li></li>");
			$paginationLink = $('<a href=#>' + (i + 1) + '</a>')
			
			// First link created has .active class
			if (i === 0) {
				$paginationLink.addClass("active");
			}
			
			$paginationLi.append($paginationLink);
			$paginationUl.append($paginationLi);
			
			// Set click handler on each link 
			$paginationLink.click(setActivePage);
		}
		
		$(".student-list").append($paginationDiv);
	}
}

// Displays students with necessary pagination
var displayStudents = function(startingStudent) {
	$students.hide(); // Hides all students first.
	searchResults.slice(startingStudent, (startingStudent + studentsPerPage)).show();
}

// Selects page by adding .active class and calls displayStudents with starting student
var setActivePage = function(e) {
	e.preventDefault();
	var linkNumber = this.text;
	var startingStudent = (linkNumber - 1) * studentsPerPage;
	
	// Remove .active class from previous page link then add .active class to clicked page link.
	$("div.pagination a.active").removeClass("active");
	$(this).addClass("active");
	
	displayStudents(startingStudent);
}

// Search button event listener
$(".student-search button").click(function() {
	var $foundPerson = $(""); 
	var searchInputText = $(".student-search input").val().toLowerCase();
	$students.each(function() {
		var studentNameText = $(this).find($studentName).text().toLowerCase();
		var studentEmailText = $(this).find($studentEmail).text().toLowerCase();
		if (studentNameText.indexOf(searchInputText) !== -1 || studentEmailText.indexOf(searchInputText) !== -1) {
			console.log("found it");
			$foundPerson = $foundPerson.add(this);
		}
	});
	searchResults = $foundPerson;
	createPaginationDiv();
	displayStudents(0);
});



// Create pagination div. Will not create if searchResults is <= 10.
createPaginationDiv();

// Show initial page of students
displayStudents(0);








