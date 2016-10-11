$(document).ready(function(){
var toDoList = {

    init: function() {
        //defineRegions
        console.log('in init');
        //add event listeners
        this.addEventListeners();
        this.goThroughItems();
        //reset/s
    },

/* save this as self. add listeners. */
    addEventListeners: function() {
        //input field
        var self = this;
          /*when the form is submitted, pass a string value into addListItem array, then append all the items. */
        $('form').submit(function(event) {
            event.preventDefault();
            $('.items').empty();
            var itemToAdd = $('.new-todo').val();
            $('.new-todo').val('');
            self.addListItem(itemToAdd);
            self.goThroughItems();
        });
        /* when text in list item is edited, when enter is pressed, update info in array to match */
        $('.items').keypress('.edit-todo',function(event){
          if(event.keyCode == 13) {
            var updatedText = $(event.target).val();
            var indexToUpdate = $(event.target).parents('li').attr('id');
            //update array....
            self.arrayOfItems[indexToUpdate].description = updatedText;
            self.goThroughItems('all');
          }
        });

        /* when circle is clicked, add checkmark, collect id, update array */
        $(document).on('click', '.check', function(event){
          $(event.target).parent().toggleClass('true', 'false');
          var id = $(event.target).parents('li').attr('id');
          var objectFromArray = self.arrayOfItems[id];
          /* toggle array value. There is probably a much better way than this to do it. */
          if (objectFromArray.completed === false){
            objectFromArray.completed = true;
          } else {
            objectFromArray.completed = false;
          }

        });
        /* when item is hovered, show the red x */
        $('.items').on('mouseenter', 'article', function(event) {
          $(this).find('.delete').toggleClass('hidden');
        });
        $('.items').on('mouseleave', 'article', function(event) {
          $(this).find('.delete').toggleClass('hidden');
        });

        /* when x is clicked, remove item from array and reprint elements. */
        $(document).on('click', '.delete', function(event){
          var id = $(event.target).parents('li').attr('id');
          self.arrayOfItems.splice(id, 1);
          self.goThroughItems();
        });

        /* when 'Active" is clicked, show only incomplete items. */
        $('.show-active').on('click', function(event){
          self.goThroughItems('incomplete');
        });

        /* when 'Completed' is clicked, show only completed items. */
        $('.show-completed').on('click', function(event){
          self.goThroughItems('complete');
        });

        /* when 'All' is clicked, show all items. */
        $('.show-all').on('click', function(event){
          self.goThroughItems('all');
        });

        /* when 'Clear completed' is clicked, show only incomplete items. Update array.*/
        $('.clear').on('click', function(event){
          //update array
          var clearedArray = [];
          for(var index4 in self.arrayOfItems){
            if(self.arrayOfItems[index4].completed === false) {
              clearedArray.push(self.arrayOfItems[index4]);
            }
          }
          self.arrayOfItems = clearedArray;
          console.log(clearedArray);
          self.goThroughItems('incomplete');
        });

    },

    /* The index from goThroughItems is passed in and all the info from that array item is then passed into Handlebars template and appended to .items. */
    createElements: function(itemNum) {
        var todoItem = this.arrayOfItems[itemNum].description;
        var completionItem = this.arrayOfItems[itemNum].completed;
        var source = $("#to-do-list").html();
        var template = Handlebars.compile(source);
        var context = {
            "list-number": itemNum,
            "to-do-text": todoItem,
            "completion-status": completionItem
        };
        var html = template(context);
        $('.items').append(html);
    },

    /* holds objects that contain information about each to-do */
    arrayOfItems: [],

    /* go through each item in arrayOfItems, run createElements with the index of the item as the input. */
    goThroughItems: function(completionStatus) {
      $('.items').empty();
      completionStatus = completionStatus || 'all';

      /* if completionStatus is 'incomplete', the item is active and should be displayed */
      if(completionStatus === 'incomplete') {
        for (var index in this.arrayOfItems){
          if (this.arrayOfItems[index].completed === false) {
            this.createElements(index);
          }
        }
      }

      /* if completionStatus is 'complete', then item is completed and should be displayed. */
      if(completionStatus === 'complete') {
        for (var index3 in this.arrayOfItems){
          if (this.arrayOfItems[index3].completed === true) {
            this.createElements(index3);
            console.log("completed element: " + this.arrayOfItems[index3]);
          }
        }
      }

      /* if no completionStatus specified, display all items in arrayOfItems */
      if(completionStatus === 'all'){
      var count = 0;
      $('.items').empty();
        for (var index2 in this.arrayOfItems) {
            this.createElements(index2);
            if (this.arrayOfItems[index2].completed === false) {
              count ++;
            }
        }
        document.getElementById('incomplete-items').innerHTML = count;
      }
    },

    //add an item object to the array of items
    addListItem: function(inputText) {
        //create an object to add to TODOList
        var myObject = {};
        //add string inputText as the value for the key of description and set completed value to false
        myObject = {
            description: inputText,
            completed: false,
        };
        //push the object into the TODOList array
        toDoList.arrayOfItems.push(myObject);
    }
};
toDoList.init();
});
