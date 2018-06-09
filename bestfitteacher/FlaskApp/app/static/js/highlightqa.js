/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function makearrayofqanda(){
    // get all the inputs:
    var nodelist = document.getElementsByTagName("input").length;
    var i;
    for (i=0;i<nodelist;i++)
    {
    
    // for each inputs:
    // find its name:
    // find its number (N) and name (NM): 
    // if the NM contains q fill array column 1 and row N with the value in the element:
    // if the NM contains a:
    // Look if the N row and col 1 is filled:
    // if filled , fill the column 2
    // if not filled, append this value to the N row column 2 :
    
    }
    
}
function removetag(buttonid) {
    var c = document.getElementById(buttonid);
    var textvalue = c.value;

    document.getElementById(buttonid).outerHTML = textvalue;
    //    alert('success!');
    //return false;
}

function myFunc(id) {
    var element = document.getElementById(id);
    var elementname = document.getElementById(id).name;

    element.classList.toggle("mystyle");

}

function replaceSelectedText() {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode("replacementText"));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = "replacementText";
    }
}

function highlighttext() {

    var text, sel, range;

    if (window.getSelection) {
        text = window.getSelection().toString();
        sel = window.getSelection();
        if (sel.rangeCount) {

            if ((text.length > 0) && (document.getElementById("answer").checked == true)) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                counter++;
                $('#TextBox').val(counter);
                buttonumber = buttonumber + 1;
                range.insertNode(document.createTextNode('<input name=answername' + buttonumber + '"  class="mystyle" id= "buttonid' + counter + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

            }
            if ((text.length > 0) && (document.getElementById("question").checked == true)) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                counterquestion++;
                $('#TextBoxq').val(counterquestion);
                questionnumber = questionnumber + 1;
                range.text = '<input name=qname' + buttonumber + '"  class="mystyleQ" id= "qbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';
                // range.insertNode(range.createContextualFragment('<mark name=qname' + questionnumber + '" style="background-color :red; id= "markid' + questionnumber + ' oncontextmenu="removetag(this.id);return false;">' + text + '</mark>'));
               // range.insertNode(range.createContextualFragment('<input name=qname' + buttonumber + '"  class="mystyleQ" id= "qbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

            }
            //<mark style="background-color :red;">I am red</mark>
            //range.insertNode(range.createContextualFragment('<span class="highlight">'+text+'</span>'));
        }
    } else if (document.selection && document.selection.createRange) {

        text = document.selection.createRange().text;
        range = document.selection.createRange();
        if (text.length > 0 && (document.getElementById("answer").checked == true)) {
            counter++;
            $('#TextBox').val(counter);
            buttonumber = buttonumber + 1;
            range.innerHTML = '<input name=answername' + buttonumber + '" class="mystyle" id= "buttonid' + buttonumber + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';
        }//'<mark>'+text+'</mark>';//'<span class="highlight">'+text+'</span>';
        if (text.length > 0 && (document.getElementById("question").checked == true)) {
            counterquestion++;
            $('#TextBoxq').val(counterquestion);
            questionnumber = questionnumber + 1;
            range.innerHTML = '<input name=qname' + questionnumber + '" class="mystyleQ" id= "qbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';

//            range.insertNode(range.createContextualFragment('<mark name=qname' + questionnumber + '"  style="background-color :red; id= "markid' + questionnumber + ' oncontextmenu="removetag(this.id);return false;">' + text + '</mark>'));

        }
    }

    range.collapse();
}

function highlight() {

    var text, sel, range;

    if (window.getSelection) {
        text = window.getSelection().toString();
        sel = window.getSelection();
        if (sel.rangeCount) {

            if ((text.length > 0) && (document.getElementById("answer").checked == true)) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                counter++;
                $('#TextBox').val(counter);
                buttonumber = buttonumber + 1;
                range.insertNode(range.createContextualFragment('<input name=answername' + buttonumber + '"  class="mystyle" id= "buttonid' + counter + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

            }
            if ((text.length > 0) && (document.getElementById("question").checked == true)) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                counterquestion++;
                $('#TextBoxq').val(counterquestion);
                questionnumber = questionnumber + 1;
                // range.insertNode(range.createContextualFragment('<mark name=qname' + questionnumber + '" style="background-color :red; id= "markid' + questionnumber + ' oncontextmenu="removetag(this.id);return false;">' + text + '</mark>'));
                range.insertNode(range.createContextualFragment('<input name=qname' + buttonumber + '"  class="mystyleQ" id= "qbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

            }
            //<mark style="background-color :red;">I am red</mark>
            //range.insertNode(range.createContextualFragment('<span class="highlight">'+text+'</span>'));
        }
    } else if (document.selection && document.selection.createRange) {

        text = document.selection.createRange().text;
        range = document.selection.createRange();
        if (text.length > 0 && (document.getElementById("answer").checked == true)) {
            counter++;
            $('#TextBox').val(counter);
            buttonumber = buttonumber + 1;
            range.innerHTML = '<input name=answername' + buttonumber + '" class="mystyle" id= "buttonid' + buttonumber + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';
        }//'<mark>'+text+'</mark>';//'<span class="highlight">'+text+'</span>';
        if (text.length > 0 && (document.getElementById("question").checked == true)) {
            counterquestion++;
            $('#TextBoxq').val(counterquestion);
            questionnumber = questionnumber + 1;
            range.innerHTML = '<input name=qname' + questionnumber + '" class="mystyleQ" id= "qbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';

//            range.insertNode(range.createContextualFragment('<mark name=qname' + questionnumber + '"  style="background-color :red; id= "markid' + questionnumber + ' oncontextmenu="removetag(this.id);return false;">' + text + '</mark>'));

        }
    }

    range.collapse();
}
document.onmouseup = highlight;// highlight;
