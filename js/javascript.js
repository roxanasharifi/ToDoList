$(function(){
     var model={
     	   init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);          
            };
            if(!localStorage.donenotes){
            	localStorage.donenotes = JSON.stringify([]);
            };

        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);

        },
        addDoneNotes: function(obj) {
            var data = JSON.parse(localStorage.donenotes);
            data.push(obj);
            localStorage.donenotes = JSON.stringify(data);
            
        },

        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        },

        getAllDoneNotes:function(){
        	return JSON.parse(localStorage.donenotes);
        },
 
        remove: function(id) {
             var todos=model.getAllNotes();
             todos.splice(id, 1);
             localStorage.notes= JSON.stringify(todos);
             view.render();       
         },
          removedone: function(id) {
             var todos=model.getAllDoneNotes();
             todos.splice(id, 1);
             localStorage.donenotes= JSON.stringify(todos);
             view.render();       
         },
  
         update:function(id){
         	var newnote = prompt("Please enter new note", "");
         	if (newnote != null && newnote != ""){
         		var todos=model.getAllNotes();
         	todos[id].content=newnote;
         	localStorage.notes= JSON.stringify(todos);
         	};
         	octopus.render();
         },
         updatedonenote:function(id){
            var newnote = prompt("Please enter new note", "");
            if (newnote != null && newnote != ""){
                var todos=model.getAllDoneNotes();
            todos[id].content=newnote;
            localStorage.donenotes= JSON.stringify(todos);
            };
            octopus.render();

         },
         done:function(i){
         	var todos=model.getAllNotes();
         	octopus.addNewDoneNote(todos[i].content);
        	octopus.removenote(i);
        }
     };
     var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
		dateSubmitted: Date.now(),
            });
        octopus.render();
        },
        addNewDoneNote: function(noteStr) {
            model.addDoneNotes({
                content: noteStr,
		dateSubmitted: Date.now(),
            });
        octopus.render();
        },
        render:function(){
        	view.render();
        },
        getNotes: function() {
            return model.getAllNotes();
        },
        getDoneNotes:function(){
        	return model.getAllDoneNotes();
        },
        init: function() {
            model.init();
            view.init();
        },
        removenote:function(i){
        	model.remove(i);
        },
        removenote2:function(i){
        	model.removedone(i);
        },
        updatenote:function(i){
        	model.update(i);
        },
        updateDone:function(i){
            model.updatedonenote(i);
        },
        donenote:function(i){
        	model.done(i);
        },
        clearAll:function(){
        	localStorage.clear();
        	octopus.init();
        }
       
    };
     var view = {
        init: function() {
        	
            this.UndoneNoteList = $('#undone-notes');
            this.DoneNoteList = $('#done-notes');
            this.UndoneButton =$('#UndoneButton');
            this.DoneButton =$('#DoneButton');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var HtmlStrUndone = '';
            var HtmlStrBtn1 = '';

            octopus.getNotes().forEach(function(note){
                    
                 HtmlStrUndone += '<li class="note">' +
                 note.content +
                 '</li>' ;
                 HtmlStrBtn1 += '<li class="button">' +
                 '<button class="deletebtn btn btn-info "  id="deletebtn">Delete</button>' +'<button class="Updatebtn btn btn btn-success " id="Updatebtn" >update</button>' +'<button class="Donebtn btn btn btn-danger " id="Donebtn" >Done</button>' +
                 '</li>' ;
            		
            });

            this.UndoneNoteList.html( HtmlStrUndone );
            this.UndoneButton.html(HtmlStrBtn1);
            
            
            var delbuttons = document.getElementsByClassName('deletebtn');
             for (let i=0; i < delbuttons.length; i++) {
            delbuttons[i].addEventListener('click',() => octopus.removenote(i));};

            var upbuttons = document.getElementsByClassName('Updatebtn');
             for (let i=0; i < upbuttons.length; i++) {
            upbuttons[i].addEventListener('click',() => octopus.updatenote(i));};

            var donebuttons = document.getElementsByClassName('Donebtn');
             for (let i=0; i < donebuttons.length; i++) {
            donebuttons[i].addEventListener('click',() => octopus.donenote(i));};

            view.render2()
        },
        render2:function(){
        	var HtmlStrDone = '';
            var HtmlStrBtn2 = '';

            octopus.getDoneNotes().forEach(function(note){
                    
                 HtmlStrDone += '<li style="margin-left:25px;" class="note">' +
                 note.content +
                 '</li>' ;
                 HtmlStrBtn2 += '<li class="button">' +
                 '<button class="deletebtn2 btn btn-info"  id="deletebtn">delete</button>' +'<button class="Updatebtn2 btn btn btn-success" id="Updatebtn" >update</button>' +
                 '</li>' ;
            		
            });

        	this.DoneNoteList.html(HtmlStrDone);
            this.DoneButton.html(HtmlStrBtn2);

            var delbuttons = document.getElementsByClassName('deletebtn2');
             for (let i=0; i < delbuttons.length; i++) {
            delbuttons[i].addEventListener('click',() => octopus.removenote2(i));};

            var upbuttons = document.getElementsByClassName('Updatebtn2');
             for (let i=0; i < upbuttons.length; i++) {
            upbuttons[i].addEventListener('click',() => octopus.updateDone(i));};

        }

    };

    octopus.init();
    
});