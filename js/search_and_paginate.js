var $search_input = $("<input type='text' name='search_input' id='search_input' placeholder='search student names' class='student-search'>");
$(".page-header").append($search_input)																				
$(".student-list").append($("<p class='no-results'>Sorry, there are no results to show</p>"));

$search_input.on('input',function() {  													// unlike 'changed', the 'input' event is triggered after each 
																						// keypress, and also on copy-paste events
	// first delete any existing pagination links

	$(".page-links").remove()

	// this function first hides any items that don't make it past the search filter

	jQuery.each($(".student-item"), function(){
		var student_name = $(this).children(".student-details").children("h3").text();
		if (student_name.includes($search_input.val().toLowerCase()) === false) {      // if this test condition evalutates to true, then the 
			$(this).hide();															   // student name doesn't match the search string
		} else {
			$(this).show();																
		};
	});

	// now we will calculate how many pagination links we need, based on the list items that remain

	var sum = 0

	jQuery.each($(".student-item"), function() {
		if ($(this).is(":visible")) {
		sum += 1
		};
	});

	var number_of_links = Math.ceil((sum / 10))

	// display a special message if there are no search results

	if (number_of_links === 0) {
		$(".no-results").show();
	} else {
		$(".no-results").hide();
	}

	
	// next we create and append the pagination links to the unordered list with class .student-list

	var $student_list = $(".student-list");
	var $pagination_links = $("<ul class='page-links'></ul>");
	for (i = 1; i <= number_of_links; i++) {
		var $ith_link = $("<li class='pagination-li'><a href=#" + i + " class='pagination-link'>" + i + "</a></li>");
		$pagination_links.append($ith_link)
	}
	$student_list.append($pagination_links)

	// hide the pagination link if there is only one to show

	if (number_of_links === 1) {
		$(".pagination-li").hide();
	}


	// next we set event handlers on the pagination links so that the most recently clicked link has the class 'active'

	var $pagination_links = $("a.pagination-link")

	jQuery.each($pagination_links, function () {
		$(this).on("click", function() {
			jQuery.each($pagination_links, function() {
				$(this).removeClass("active")
			});
		$(this).addClass("active")
		});
	});

	// next we assign to each list item in student-list a pagination page

	var pagination_map = {};
	var visible_count = 0;

	jQuery.each($(".student-item"), function(index) {
		if ($(this).is(":visible")) {
			visible_count += 1;
			page_number = String(Math.ceil(visible_count / 10.0))
			pagination_map[String(index)] = page_number
		}
	});

	// this binds event handlers to the pagination links to hide elements that don't conform to the pagination_map

	function hide_off_page() {
		jQuery.each($pagination_links, function() {
			$(this).on("click", function() {
				var active_link = $(".active").text();
				for (var i in pagination_map) { 
					var $ith_student = $(".student-item").eq(i);
					if (pagination_map[i] === active_link) {
						$ith_student.show();
					} else {
						$ith_student.hide();
					};
				};
			});
		});
	}

	hide_off_page();

	// then we click the first link, so if the search string changes we default back to the first page
	$("a.pagination-link:contains('1')").click();

});


// this ensures that the pagination links are added when the page first loads and the search_input hasn't been used yet

$("#search_input").trigger('input');