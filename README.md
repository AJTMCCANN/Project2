# Project2

First, looking at the grading scheme for this project, I see that that the following rules must be satisfied

--no inline Javascript

--don't modify the .html file directly, modify it dynamically using JavaScript

--code should be commented

The finished product should have a search bar, and pagination links that show 10 records per page.  
When a search yields 0 results, display a message informing the user that no results have been found.  

In the source files I first notice that there is no folder for JavaScript.  So, I create one and link it to the index.html file, just before the \</body>.  

Then, I think about whether to implement the pagination first, or the search box.  I decide to do the search box first, because however I implement that will likely change how I go about doing the pagination.  

I like what I've learned so far about JQuery.  So I insert the JQuery JavaScript file from the Google Content Delivery Network.  

Next I want to dynamically insert the input element, using JQuery.  

Now I want to bind an event handler for when the content in the search_input changes.  

Next, instead of printing the value to the console I want to iterate through all the list items and hide the ones that don't contain the text entered.

Next, I styled the search input (floated it right, added rounded corners).  I copy-pasted some stylings from stackoverflow that centers the input's placeholder text in a cross-platform way.  

In order to paginate, I'll need to know how many pagination links to create.  I can get this information by writing a function that iterates through the list items, counting the ones that are not hidden, dividing that sum by 10, and rounding up.  

I'll write another bit of code to create the correct number of links, dynamically.  

Now those links need to be styled.  

I'll need another function that assigns a page number to each of the non-hidden list items.  

Each pagination link should, when it is clicked, receive a flag indicating that it is the active (most recently selected) link.  After that I'll write a function that hides all the list items whose assigned page number doesn't match the active link's text value.  

That last bit (filtering list items by page) was the hardest part to do, mainly because of a bug where I used the wrong value for the index i -- instead of the key value from pagination_map, I was using a plain old iterator from i = 0 to i = pagination_map.length.  The result was that everything worked fine as long as there was no search string.  Otherwise, if there was, the pagination links would do strange things.  As well, instead of showing only the first 10 results all the results that matched the search string would be visible, however many.  It was a hard bug to fix.

	function hide_off_page_students() {
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

	hide_off_page_students();
