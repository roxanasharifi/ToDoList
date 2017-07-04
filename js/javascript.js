$(function(){
     var model={
     	   init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);          
            };
            if(!localStorage.donenotes){
            	localStorage.donenotes = JSON.stringify([]);
            };
             if(!localStorage.done2notes){
                localStorage.done2notes = JSON.stringify([]);
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
        addDone2Notes: function(obj) {
            var data = JSON.parse(localStorage.done2notes);
            data.push(obj);
            localStorage.done2notes = JSON.stringify(data);
            
        },

        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        },

        getAllDoneNotes:function(){
        	return JSON.parse(localStorage.donenotes);
        },
        getAllDone2Notes:function(){
            return JSON.parse(localStorage.done2notes);
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
          removedone2: function(id) {
             var todos=model.getAllDone2Notes();
             todos.splice(id, 1);
             localStorage.done2notes= JSON.stringify(todos);
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
        },
         done2:function(i){
            var todos=model.getAllNotes();
            octopus.addNewDone2Note(todos[i].content);
            octopus.removenote(i);
        },
        done3:function(i){
            var todos=model.getAllDoneNotes();
            octopus.addNewDone2Note(todos[i].content);
            octopus.removenote2(i);
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
        addNewDone2Note: function(noteStr) {
            model.addDone2Notes({
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
        getDone2Notes:function(){
            return model.getAllDone2Notes();
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
        removenote3:function(i){
            model.removedone2(i);
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
        done2note:function(i){
            model.done2(i);
        },
        done3note:function(i){
            model.done3(i);
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
            this.Done2NoteList =$('#done2-notes');
            this.UndoneButton =$('#UndoneButton');
            this.DoneButton =$('#DoneButton');
            this.Done2Button =$('#Done2Button');
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
                    
                HtmlStrUndone += '<li class="col-md-12 col-xs-12" style="list-style-type: none;padding:7px;">' + '<li class="note col-xs-3">' + note.content + '</li>' +
                   '<li class="button  col-xs-9" style="width:300px;">'+
                    '<button class="tmrbtn btn btn btn-danger " id="tmrbtn" >Tommorow</button>'+'<button class="Updatebtn btn btn btn-success " id="Updatebtn" >update</button>' + '<button class="Donebtn btn btn btn-warning " id="Donebtn" >Done</button>' + '<button class="deletebtn btn btn-info "  id="deletebtn" ">Delete</button>' +
                 '</li>'+'</li>';
            		
            });

            this.UndoneNoteList.html( HtmlStrUndone );
            
            
            var delbuttons = document.getElementsByClassName('deletebtn');
             for (let i=0; i < delbuttons.length; i++) {
            delbuttons[i].addEventListener('click',() => octopus.removenote(i));};

            var upbuttons = document.getElementsByClassName('Updatebtn');
             for (let i=0; i < upbuttons.length; i++) {
            upbuttons[i].addEventListener('click',() => octopus.updatenote(i));};

            var donebuttons = document.getElementsByClassName('tmrbtn');
             for (let i=0; i < donebuttons.length; i++) {
            donebuttons[i].addEventListener('click',() => octopus.donenote(i));};

            var donebuttons = document.getElementsByClassName('Donebtn');
             for (let i=0; i < donebuttons.length; i++) {
            donebuttons[i].addEventListener('click',() => octopus.done2note(i));};

            view.render2()
        },
        render2:function(){
        	var HtmlStrDone = '';
            var HtmlStrBtn2 = '';

            octopus.getDoneNotes().forEach(function(note){
                    
                HtmlStrDone += '<li class="col-md-12" style="list-style-type: none;padding:7px;">' + '<li class="note col-xs-9"  style="margin-left:25px;" >' + note.content + '</li>' +
                    '<li class="button col-xs-3" style="padding:0px;width:230px;margin-left:50px;">' +
                     '<button class="Updatebtn2 btn btn btn-success" id="Updatebtn" >update</button>' + '<button class="Donebtn2 btn btn btn-warning " id="Donebtn" >Done</button>' + '<button class="deletebtn2 btn btn-info"  id="deletebtn" ">delete</button>' +
                 '</li>' + '</li>';
            		
            });

        	this.DoneNoteList.html(HtmlStrDone);
            this.DoneButton.html(HtmlStrBtn2);

            var delbuttons = document.getElementsByClassName('deletebtn2');
             for (let i=0; i < delbuttons.length; i++) {
            delbuttons[i].addEventListener('click',() => octopus.removenote2(i));};

            var upbuttons = document.getElementsByClassName('Updatebtn2');
             for (let i=0; i < upbuttons.length; i++) {
            upbuttons[i].addEventListener('click',() => octopus.updateDone(i));};

            var donebuttons = document.getElementsByClassName('Donebtn2');
             for (let i=0; i < donebuttons.length; i++) {
            donebuttons[i].addEventListener('click',() => octopus.done3note(i));};

            view.render3()

        },
        render3:function(){
            var HtmlStrDone2 = '';

            octopus.getDone2Notes().forEach(function(note){
                    
                HtmlStrDone2 += '<li class="col-md-12" style="list-style-type: none;">' + '<li style="margin-left:25px;" class="Dnote col-xs-3">' + note.content + '</li>' +
                    '<li class="button  col-xs-9" style="width:100px;margin-left:200px;">' + '<button class="deletebtn3 btn btn-info"  id="deletebtn">delete</button>' +
                 '</li>' + '</li>';
                    
            });

            this.Done2NoteList.html(HtmlStrDone2);

            var delbuttons = document.getElementsByClassName('deletebtn3');
             for (let i=0; i < delbuttons.length; i++) {
            delbuttons[i].addEventListener('click',() => octopus.removenote3(i));};

        }

    };

    octopus.init();
    
});