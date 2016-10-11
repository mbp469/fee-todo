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
        /* when circle is clicked, add checkmark, collect id, update array */
        $(document).on('click', '.check', function(event){
          $(event.target).parent().toggleClass('true', 'false');
          var id = $(event.target).parents('li').attr('id');
          var objectFromArray = self.arrayOfItems[id];
          objectFromArray.completed = true;
          console.log(objectFromArray);
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
    arrayOfItems: [{
        description: "walk the dog",
        completed: false,
    }, {
        description: "take out trash",
        completed: false,
    }],

    /* for each item in arrayOfItems, run createElements with the index of the item as the input. */
    goThroughItems: function() {
      var count = 0;
      $('.items').empty();
        for (var index in this.arrayOfItems) {
            this.createElements(index);
            count ++;
        }
        document.getElementById('incomplete-items').innerHTML = count;
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
