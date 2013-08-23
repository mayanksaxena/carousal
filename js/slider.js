var SliderPlugin = {
	AnimatingFlag: false,
	itemsContainer: ".slidercontent",
	container: ".slider",
	nextButton: "#next",
	previousButton: "#previous",
	HiddenElementsContainer: ".someHiddenClass",
	pageNumbersContainer: ".pageNumbers",
	//Function to Init ther plugin
	setup: function() {
		currentPage = 1;
		var _this = this;
		totalPage = $(_this.itemsContainer).length;

		//Calculate width of outer div
		$(_this.container).attr("style", "width: "+$(_this.itemsContainer).length * $(_this.itemsContainer).first().outerWidth()+"px;");

		//Get the items widht which will move in one scroll.
		var oneScroll = $(_this.itemsContainer).first().outerWidth();

		//Bind Next Button Click Event
		$(_this.nextButton).unbind("click").bind("click", function() {
			if(currentPage < totalPage && !SliderPlugin.AnimatingFlag) {
				currentPage++;
				SliderPlugin.animatePage("right", "-="+oneScroll);
			}
			SliderPlugin.setNextPreviousButtons(currentPage, totalPage);
		});

		//Bind Previous button click
		$(_this.previousButton).unbind("click").bind("click", function() {
			if(currentPage > 1 && !SliderPlugin.AnimatingFlag) {
				$(this).removeClass("disabled");
				currentPage--;
				SliderPlugin.animatePage("left", "+="+oneScroll);
			}
			SliderPlugin.setNextPreviousButtons(currentPage, totalPage);
		});

		//Set the Next Previous button (enable disable state)
		SliderPlugin.setNextPreviousButtons(currentPage, totalPage);
	},
	//Function to animate the slide.
	animatePage: function(direction, size) {
		SliderPlugin.AnimatingFlag = true;
		AnimationProgress = true;
		var _this = this;
		//Set the scroll according to direction selected
		if(direction == "right") {
			//Animate Slider
			$(_this.container).animate({
			    left: size
			}, 1000, "easeInOutQuint", function(){
				SliderPlugin.AnimatingFlag = false;
			});
		} else {
			//Animate Slider
			$(_this.container).animate({
			    left: size
			}, 1000, "easeInOutQuint",function(){
				SliderPlugin.AnimatingFlag = false;
			});
		}
	},
	//Function to Set Content Items Per Page (Main logic of slider in diff modes)
	setcontent: function(ItemsPerPage) {
		var _this = this;
		$(_this.container).html("");
		tmpArray = '';
		totalItems = $(_this.HiddenElementsContainer).find("img").length;

		//Find the total elements from hidden container and then create slider.
		$(_this.HiddenElementsContainer).find("a").each(function(index, element) {
			
			tmpArray += $(this).context.outerHTML;
			
			if(index > 0 && (index+1)%ItemsPerPage == 0 && index != totalItems-1) {
				$(_this.container).append('<div class="'+_this.itemsContainer.substring(1)+' firstScene">'+tmpArray+'</div>');
				tmpArray = '';
			}

			if(index == totalItems-1) {
				$(_this.container).append('<div class="'+_this.itemsContainer.substring(1)+' firstScene">'+tmpArray+'</div>');
			}

			$(_this.pageNumbersContainer).html("Total Page Number: "+$(_this.container).find(_this.itemsContainer).length);
			$(_this.pageNumbersContainer).append("<br>Showing: "+ItemsPerPage+" Items Per Page.");
		});
	},
	//Function to set Next and Prvious Links
	setNextPreviousButtons: function(currentPage, totalPage) {
		var _this = this;
		//If current page is qual to total number of pages then disable this button
		if(currentPage == totalPage) {
			$(_this.nextButton).addClass("disabled");
		} else {
			$(_this.nextButton).removeClass("disabled");
		}

		if(currentPage == 1) {
			$(_this.previousButton).addClass("disabled");
		} else {
			$(_this.previousButton).removeClass("disabled");
		}
		if($(".currentPage").length > 0) {
			$(".currentPage").html("current page:-"+currentPage);
		}
	}
}

$.extend($.easing,
    {
        easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    }
});