var toDoList = {

    init: function() {
        //defineRegions
        console.log('in init');
        //add event listeners
        this.addEventListeners();
        this.goThroughItems();
        //reset/s
    },

    addEventListeners: function() {
        //input field
        var self = this;
          //when the form is submitted, pass a string value into addListItem
        $('form').submit(function(event) {
            event.preventDefault();
            $('.items').empty();
            var itemToAdd = $('.new-todo').val();
            $('.new-todo').val('');
            self.addListItem(itemToAdd);
            self.goThroughItems();
        });

        //markCompleted
    },

    createElements: function(itemNum) {
        var todoItem = this.arrayOfItems[itemNum].description;
        var completionItem = this.arrayOfItems[itemNum].completed;
        var source = $("#to-do-list").html();
        var template = Handlebars.compile(source);
        var context = {
            "to-do-text": todoItem,
            "completion-status": completionItem
        };
        var html = template(context);
        $('.items').append(html);
    },

    arrayOfItems: [{
        description: "walk the dog",
        completed: false,
    }, {
        description: "take out trash",
        completed: true,
    }],

    goThroughItems: function() {
        for (var index in this.arrayOfItems) {
            console.log("goThroughItems: " + this.arrayOfItems[index]);
            this.createElements(index);
        }
    },

    //add an item object to the array of items
    addListItem: function(inputText) {
        console.log('in addListItem');
        //create an object to add to TODOList
        var myObject = {};
        //add string inputText as the value for the key of description and set completed value to false
        myObject = {
            description: inputText,
            completed: false,
        };
        //push the object into the TODOList array
        toDoList.arrayOfItems.push(myObject);
        console.log(toDoList.arrayOfItems);
    }
};
// var someToDoList = new toDoList();
toDoList.init();
