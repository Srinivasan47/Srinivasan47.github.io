window.waggleui.notesController = (function(){
	
/**
 * 
 */
function getNotes (notesObject){
	window.waggleui.model.setAssignmentNotes(notesObject);
	var collectNotes = [],
		collectPager = [],
		count = 0,
		notesId = null,
		studentNoteId = null;
	
	//Set new count of Unread notes from server response to note icon.	
	/*if (notesObject.notes.showNotes == "on"){
		if (notesObject.notes.newNotes != '0'){
			$("#notesContainer").attr("newnotes",notesObject.notes.newNotes);
		}else{
			$("#notesContainer").attr("newnotes","0");
		}
	}else{
		$("#notesContainer").attr("shownotes","off");
	}*/
	
	
	for (i=0; i<notesObject.notes.notesArray.length; i++){
		count = count + 1;
		collectNotes.push( _markUpNotes(notesObject.notes.notesArray[i], "#getNotesDynamically", count ));
		notesId = notesObject.notes.notesArray[i]['noteId'];
		studentNoteId = notesObject.notes.notesArray[i]['studentNoteId'];
		collectPager.push ('<li><a rel="'+i+'" studentNoteId="'+studentNoteId+'" noteid="'+notesId+'" class="pagenum" href="#">'+ count +'</a></li>');		
	}
	$("#notesContainer").html(collectNotes.join(""));
	$("#notesPager").html(collectPager.join(""));
	
	var teacherMessage = window.waggleui.model.getWaggleProperties()['label.assignstatus.teacherNotes.message'];
	teacherMessage = teacherMessage.replace("@@@@", notesObject['notes']['notesArray'][0]['noteFrom']);
	$("#assignmentListingNote").attr("title",teacherMessage);
}

function _markUpNotes(notes,id, count){
	var row;
	rowData = $(id).html();
	row = rowData.replace(/@@([^@]+)@@/g, function (match, group) {			
		switch (group){
		case "viewed":
			if (notes[group] == 'true'){
				return "read-notes";
			}else{
				return "";	
			}			
			break;
		case "noteFrom":
				return (notes[group]?notes[group]:"Default Teacher");
			break;	
		case "assignedDate":
				return (notes[group]? notes[group].toUpperCase():"Default Date");
			break;
		case "notesScrollBar":
				return count;
			break;	
		case "message":
				return (notes[group]?notes[group]:"Default Message");
			break;		
		}
    });
	return row;
}

/*function updateNotesCount (noteObject){		//updateNotesCount: updateNotesCount
	var studentId = $('.avatar-name').attr('studentId'), 
		classid = $('.users-list').find("a.active").attr("classid"),
		responseStudentId = noteObject.notes.studentId,
		responseClassId = noteObject.notes.classId,		
		responseAssignmentId = noteObject.notes.assignmentId;
	if ( (studentId == responseStudentId) && (classid == responseClassId) ){
		if (noteObject.notes.showNotes == 'on'){
			if (noteObject.notes.newNotes == '0'){
				$(".assignment-block[assignment_id="+responseAssignmentId+"] .assignments-listing").html('');
			}else{			
			    $(".assignment-block[assignment_id="+responseAssignmentId+"] .assignments-listing").html('<div class="notes-count">'+noteObject.notes.newNotes+'</div>');			    
			}		
		}else{
			$(".assignment-block[assignment_id="+responseAssignmentId+"] .assignments-listing").remove();
		}
	}	
}*/
	
	return {
		getNotes : getNotes		
	} 
	
}());

