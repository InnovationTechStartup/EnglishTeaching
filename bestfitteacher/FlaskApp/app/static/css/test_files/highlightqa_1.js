/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function makearrayofqanda() {
    // get all the inputs:
    var nodelist = document.getElementsByTagName("input").length;
    var i;
    for (i = 0; i < nodelist; i++)
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
function removetag(buttonname) {
//    $("button[type=checkbox]")  // for all checkboxes
//    .each(function(){
//            var $current =$('[name=' + this.name+']');// $("#" + ansbuttonid);
//    $current.contents().unwrap();
//    }) 
$('label[title=' + buttonname+ ']').contents().unwrap();//.hide()
//$("."+ buttonname).hide();
//$("." + buttonname).remove();
//$( "button[name=" + buttonname + "]" ).each(function( index ) {
// $( this ).contents().unwrap();
//});
//    $('button[name=' + buttonname + ']').contents().unwrap();
    // var c = document.getElementById(ansbuttonid);
    // var textvalue = c.value;
    //$('#'+ansbuttonid).contents().unwrap();
    //document.getElementById(ansbuttonid).outerHTML = textvalue;
    //    alert('success!');
    //return false;
    // var eles = [];
//var inputs = document.getElementsByTagName(buttonname);
//for(var i = 0; i < inputs.length; i++) {
//    document.getElementsByTagName(buttonname)[i]
//    var $current =$('[name=' + buttonname+']');// $("#" + ansbuttonid);
//    $current.contents().unwrap();
//    }
}

//$current.replaceWith($current.text());
//      }
function removetagwithid(ansbuttonid) {
    var $current = $("#" + ansbuttonid);
    $current.contents().unwrap();

}

function myFunc(buttonname) {
    $('label[title=' + buttonname+ ']').toggleClass("mystyle","mystyleA");


}

function myFuncwithid(id) {
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
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}


function surroundSelection() {
    if (window.getSelection) {
        var text = getSelectionText();
        var sel = window.getSelection();
        var text1 = window.getSelection().toString();
        if (text1.length > 0) {

            if (document.getElementById("answer").checked == true) {
                var span = document.createElement("button");
                answernumber = answernumber + 1;
//                var answernumber = 3;
                $('#TextBoxa').val(answernumber);
                span.setAttribute('name', 'answername' + answernumber);
                span.setAttribute('class', 'mystyle','answername' + answernumber);
                span.setAttribute('id', 'answerid' + answernumber);
                span.setAttribute('onClick', 'myFunc(this.id);');
                span.setAttribute('onContextMenu', 'removetag(this.name);return false;');
            }

            if (document.getElementById("question").checked == true) {
                var span = document.createElement("button");
                questionnumber = questionnumber + 1;
                $('#TextBoxq').val(questionnumber);
                span.setAttribute('name', 'questionname' + questionnumber);
                span.setAttribute('class', 'mystyleQ', 'questionname' + questionnumber);
                span.setAttribute('id', 'questionid' + questionnumber);
                span.setAttribute('onClick', 'removetag(this.id);');
                span.setAttribute('onContextMenu', 'removetag(this.name);return false;');
            }
            // span.style.fontWeight = "bold";
            //  span.style.color = "green";


            if (sel.rangeCount) {

                var selection = window.getSelection().getRangeAt(0);
                var selectedText = selection.extractContents();
                var span = document.createElement("span");
                span.style.backgroundColor = "yellow";
                span.appendChild(selectedText);
                selection.insertNode(span);

//                var range = sel.getRangeAt(0).cloneRange();
//                alert("range :	" + range)
//                range.surroundContents(span);
//                alert("span range :	" + range)
//                sel.removeAllRanges();
//                sel.addRange(range);


            }

        }
    }
}
///////////////////////////////////////////////


function getNextNode(node) {
    var next = node.firstChild;
    if (next) {
        return next;
    }
    while (node) {
        if ((next = node.nextSibling)) {
            return next;
        }
        node = node.parentNode;
    }
}

function getNodesInRange(range) {
    var start = range.startContainer;
    var end = range.endContainer;
    var commonAncestor = range.commonAncestorContainer;
    var nodes = [];
    var node;

    // Walk parent nodes from start to common ancestor
    for (node = start.parentNode; node; node = node.parentNode) {
        nodes.push(node);
        if (node == commonAncestor) {
            break;
        }
    }
    nodes.reverse();

    // Walk children and siblings from start until end is found
    for (node = start; node; node = getNextNode(node)) {
        nodes.push(node);
        if (node == end) {
            break;
        }
    }

    return nodes;
}

function getNodeIndex(node) {
    var i = 0;
    while ((node = node.previousSibling)) {
        ++i;
    }
    return i;
}

function insertAfter(node, precedingNode) {
    var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
    if (nextNode) {
        parent.insertBefore(node, nextNode);
    } else {
        parent.appendChild(node);
    }
    return node;
}

// Note that we cannot use splitText() because it is bugridden in IE 9.
function splitDataNode(node, index) {
    var newNode = node.cloneNode(false);
    newNode.deleteData(0, index);
    node.deleteData(index, node.length - index);
    insertAfter(newNode, node);
    return newNode;
}

function isCharacterDataNode(node) {
    var t = node.nodeType;
    return t == 3 || t == 4 || t == 8; // Text, CDataSection or Comment
}

function splitRangeBoundaries(range) {
    var sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
    var startEndSame = (sc === ec);

    // Split the end boundary if necessary
    if (isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
        splitDataNode(ec, eo);
    }

    // Split the start boundary if necessary
    if (isCharacterDataNode(sc) && so > 0 && so < sc.length) {
        sc = splitDataNode(sc, so);
        if (startEndSame) {
            eo -= so;
            ec = sc;
        } else if (ec == sc.parentNode && eo >= getNodeIndex(sc)) {
            ++eo;
        }
        so = 0;
    }
    range.setStart(sc, so);
    range.setEnd(ec, eo);
}

function getTextNodesInRange(range) {
    var textNodes = [];
    var nodes = getNodesInRange(range);
    for (var i = 0, node, el; node = nodes[i++]; ) {
        if (node.nodeType == 3) {
            textNodes.push(node);
        }
    }
    return textNodes;
}

function surroundRangeContents(range, templateElement) {
    splitRangeBoundaries(range);
    var textNodes = getTextNodesInRange(range);
    if (textNodes.length == 0) {
        return;
    }
    for (var i = 0, node, el; node = textNodes[i++]; ) {
        if (node.nodeType == 3) {
            el = templateElement.cloneNode(false);
            node.parentNode.insertBefore(el, node);
            el.appendChild(node);
        }
    }
    range.setStart(textNodes[0], 0);
    var lastTextNode = textNodes[textNodes.length - 1];
    range.setEnd(lastTextNode, lastTextNode.length);
}

function callhighlight() {
    if (window.getSelection) {
        var templateElement = document.createElement("button");
        templateElement.className = "highlight";
        var sel = window.getSelection();
        var ranges = [];
        var range;
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            ranges.push(sel.getRangeAt(i));
        }
        sel.removeAllRanges();

        // Surround ranges in reverse document order to prevent surrounding subsequent ranges messing with already-surrounded ones
        i = ranges.length;
        while (i--) {
            range = ranges[i];
            surroundRangeContents(range, templateElement);
            sel.addRange(range);
        }
    }
}
;


function highlightasbutton() {
    var span;

    if (document.getElementById("answer").checked == true) {
        span = document.createElement("label");
        answernumber = answernumber + 1;
//                var answernumber = 3;
        $('#TextBoxa').val(answernumber);
        //span.setAttribute('name', 'answername' + answernumber);
        span.setAttribute('class', 'mystyle mystyleA');
        
        span.setAttribute('title', 'answerid' + answernumber);
        span.setAttribute('onClick', 'myFunc(this.title);');
        span.setAttribute('ondblclick', 'removetag(this.title);return false;');
    }

    if (document.getElementById("question").checked == true) {
        span = document.createElement("label");
        questionnumber = questionnumber + 1;
        $('#TextBoxq').val(questionnumber);
        //span.setAttribute('name', 'questionname' + questionnumber);
        span.setAttribute('class', 'mystyleQ');
        span.setAttribute('title', 'questionid' + questionnumber);
        //span.setAttribute('onClick', 'removetag(this.title);');
        span.setAttribute('ondblclick', 'removetag(this.title);return false;');
    }
    // span.style.fontWeight = "bold";
    //  span.style.color = "green";


    if (window.getSelection)
    {
        var text1 = window.getSelection().toString();
        if (text1.length > 0)
        {
            var templateElement = span;// document.createElement("button");
            // templateElement.className = "highlight";
            var sel = window.getSelection();
            var ranges = [];
            var range;
            for (var i = 0, len = sel.rangeCount; i < len; ++i)
            {
                ranges.push(sel.getRangeAt(i));
            }
            sel.removeAllRanges();

            // Surround ranges in reverse document order to prevent surrounding subsequent ranges messing with already-surrounded ones
            i = ranges.length;
           // alert(i);
            while (i--)
            {
                range = ranges[i];
                surroundRangeContents(range, templateElement);
                sel.addRange(range);
            }
            sel.removeAllRanges();
        }
    }

}







////////////////////////////////////////////////






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
                answernumber = answernumber + 1;

                range.insertNode(document.createTextNode('<input name=answername' + answernumber + '"  class="mystyle" id= "ansbuttonid' + counter + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

            }
            if ((text.length > 0) && (document.getElementById("question").checked == true)) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                counterquestion++;
                $('#TextBoxq').val(counterquestion);
                questionnumber = questionnumber + 1;
                range.text = '<input name=qname' + answernumber + '"  class="mystyleQ" id= "qansbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';
                // range.insertNode(range.createContextualFragment('<mark name=qname' + questionnumber + '" style="background-color :red; id= "markid' + questionnumber + ' oncontextmenu="removetag(this.id);return false;">' + text + '</mark>'));
                // range.insertNode(range.createContextualFragment('<input name=qname' + answernumber + '"  class="mystyleQ" id= "qansbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

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
            answernumber = answernumber + 1;
            range.innerHTML = '<input name=answername' + answernumber + '" class="mystyle" id= "ansbuttonid' + answernumber + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';
        }//'<mark>'+text+'</mark>';//'<span class="highlight">'+text+'</span>';
        if (text.length > 0 && (document.getElementById("question").checked == true)) {
            counterquestion++;
            $('#TextBoxq').val(counterquestion);
            questionnumber = questionnumber + 1;
            range.innerHTML = '<input name=qname' + questionnumber + '" class="mystyleQ" id= "qansbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';

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
                answernumber = answernumber + 1;
                range.insertNode(range.createContextualFragment('<input name=answername' + answernumber + '"  class="mystyle" id= "ansbuttonid' + counter + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

            }
            if ((text.length > 0) && (document.getElementById("question").checked == true)) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                counterquestion++;
                $('#TextBoxq').val(counterquestion);
                questionnumber = questionnumber + 1;
                // range.insertNode(range.createContextualFragment('<mark name=qname' + questionnumber + '" style="background-color :red; id= "markid' + questionnumber + ' oncontextmenu="removetag(this.id);return false;">' + text + '</mark>'));
                range.insertNode(range.createContextualFragment('<input name=qname' + answernumber + '"  class="mystyleQ" id= "qansbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>'));

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
            answernumber = answernumber + 1;
            range.innerHTML = '<input name=answername' + answernumber + '" class="mystyle" id= "ansbuttonid' + answernumber + '" type="button" value=" ' + text + '"onClick="myFunc(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';
        }//'<mark>'+text+'</mark>';//'<span class="highlight">'+text+'</span>';
        if (text.length > 0 && (document.getElementById("question").checked == true)) {
            counterquestion++;
            $('#TextBoxq').val(counterquestion);
            questionnumber = questionnumber + 1;
            range.innerHTML = '<input name=qname' + questionnumber + '" class="mystyleQ" id= "qansbuttonid' + questionnumber + '" type="button" value=" ' + text + '"onClick="removetag(this.id);" oncontextmenu="removetag(this.id);return false;"></input>';

//            range.insertNode(range.createContextualFragment('<mark name=qname' + questionnumber + '"  style="background-color :red; id= "markid' + questionnumber + ' oncontextmenu="removetag(this.id);return false;">' + text + '</mark>'));

        }
    }

    range.collapse();
}
document.onmouseup = highlightasbutton;//callhighlight;//highlight3;//surroundSelection;// highlight;// highlight;
